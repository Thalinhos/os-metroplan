import { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { HeaderComponent } from './Header.jsx'

const OrdemServico = () => {
  const [formData, setFormData] = useState({
    equipamento: '',
    numeroSerie: '',
    descricaoProblema: '',
    reparoRealizado: '',
    status: '',
    nome: '',
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

  const cleanFields = () => {
    setFormData({
      equipamento: '',
      numeroSerie: '',
      descricaoProblema: '',
      reparoRealizado: '',
      status: '',
      nome: '',
      dataInicio: '',
      dataConclusao: '',
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = confirm('Confirme para imprimir.');

    if(next === false){ return }

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
        nome: '',
        dataInicio: '',
        dataConclusao: '',
      });

    } catch (error) {

      alert('Erro ao criar nota, verifique com o administrador.')
      console.error('Erro ao enviar a ordem de serviço:', error);
    }
  };


  const imprime = () => {
    const elements = document.querySelectorAll('.no-print');
    elements.forEach(element => { element.style.display = 'none' }); 

    window.print();
    
    elements.forEach(element => { element.style.display = 'block' });
  }

  return (

     

    <Container className='mt-2'>
      {!showModal && (
      <div>
      <HeaderComponent /> 

        <Row>
          <Col md={6} className="offset-md-3">
            <h2>Ordem de Serviço</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formEquipamento" className='mb-2'>
                <Form.Label>Equipamento</Form.Label>
                <Form.Control
                  type="text"
                  name="equipamento"
                  value={formData.equipamento}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNumeroSerie" className='mb-2'>
                <Form.Label>Número de Série</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDescricaoProblema" className='mb-2'>
                <Form.Label>Descrição do Problema</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricaoProblema"
                  value={formData.descricaoProblema}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formReparoRealizado" className='mb-2'>
                <Form.Label>Reparo Realizado</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reparoRealizado"
                  value={formData.reparoRealizado}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStatus" className='mb-2'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formStatus" className='mb-2'>
                <Form.Label>Nome do Responsável</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formDataInicio" className='mb-2'>
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDataConclusao" className='mb-2'>
                <Form.Label>Data de Conclusão</Form.Label>
                <Form.Control
                  type="date"
                  name="dataConclusao"
                  value={formData.dataConclusao}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className='mt-3 mb-2 d-flex flex-row-reverse gap-2'>              
              <Button variant="primary" type="submit" >
                Salvar
              </Button>
              <Button variant='warning' className='' onClick={cleanFields}>
                Limpar
              </Button>
              </div>
            </Form>
          </Col>

          
        </Row>
        <footer className="bg-primary variant-dark p-1 m-2 no-print">
        </footer>
        </div>
        
      )}

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
                <p><strong>Status:</strong> {nota.nome}</p>
                <p><strong>Data de Início:</strong> {nota.dataInicio}</p>
                <p><strong>Data de Conclusão:</strong> {nota.dataConclusao}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
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


export default OrdemServico;