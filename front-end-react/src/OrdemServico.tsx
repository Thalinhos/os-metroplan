import { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

export const OrdemServico = () => {
  const [formData, setFormData] = useState({
    equipamento: '',
    numeroSerie: '',
    descricaoProblema: '',
    reparoRealizado: '',
    status: '',
    dataInicio: '',
    dataConclusao: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [nota, setNota] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/ordemdeservico', formData);
      setNota(response.data); 
      
      setShowModal(true);

      setFormData({
        equipamento: '',
        numeroSerie: '',
        descricaoProblema: '',
        reparoRealizado: '',
        status: '',
        dataInicio: '',
        dataConclusao: '',
      });

    } catch (error) {
      console.error('Erro ao enviar a ordem de serviço:', error);
    }
  };


  const imprime = () => {
    const elements = document.querySelectorAll('.no-print');
    elements.forEach(element => { element.style.display = 'none' }); // Oculta botões na impressão

    window.print();
    
    // Após a impressão, restaura a exibição dos botões
    elements.forEach(element => { element.style.display = 'block' });
  }

  return (
    <Container className='mt-5'>
      {/* Renderiza o formulário apenas se o modal não estiver aberto */}
      {!showModal && (
        <Row>
          <Col md={6} className="offset-md-3">
            <h2>Ordem de Serviço</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formEquipamento">
                <Form.Label>Equipamento</Form.Label>
                <Form.Control
                  type="text"
                  name="equipamento"
                  value={formData.equipamento}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNumeroSerie">
                <Form.Label>Número de Série</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDescricaoProblema">
                <Form.Label>Descrição do Problema</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricaoProblema"
                  value={formData.descricaoProblema}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formReparoRealizado">
                <Form.Label>Reparo Realizado</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reparoRealizado"
                  value={formData.reparoRealizado}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formDataInicio">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDataConclusao">
                <Form.Label>Data de Conclusão</Form.Label>
                <Form.Control
                  type="date"
                  name="dataConclusao"
                  value={formData.dataConclusao}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className='mt-2'>
                Salvar
              </Button>
            </Form>
          </Col>
        </Row>
      )}

      {/* Modal para exibir a Nota */}
      {showModal && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Nota da Ordem de Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {nota && (
              <>
                <p><strong>Equipamento:</strong> {nota.equipamento}</p>
                <p><strong>Número de Série:</strong> {nota.numeroSerie}</p>
                <p><strong>Descrição do Problema:</strong> {nota.descricaoProblema}</p>
                <p><strong>Reparo Realizado:</strong> {nota.reparoRealizado}</p>
                <p><strong>Status:</strong> {nota.status}</p>
                <p><strong>Data de Início:</strong> {nota.dataInicio}</p>
                <p><strong>Data de Conclusão:</strong> {nota.dataConclusao}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* Botões de Fechar e Imprimir */}
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              className="no-print"
            >
              Fechar
            </Button>
        
            <Button
              variant="success"
              onClick={imprime}
              className="no-print"
            >
              Imprimir Nota
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};
