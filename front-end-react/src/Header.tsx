import { Navbar, Container, Row, Col, Image } from 'react-bootstrap';

export const HeaderComponent = () => {
    return (
        <>
        <style>
            {
            `
                .mobileHeaderHide{
                    display: block;
                }
                @media(max-width: 576px){
                    .mobileHeaderHide{
                    display: none;
                }
            `
            }
        </style>

            <div className='no-print'>
                <header className="bg-white text-center">
                    <Container>
                        <Row className="justify-content-center align-items-center">
                            <Col xs="auto" sm="auto" md="auto" className=''>
                                <Image src="./images/cropped-logo_metroplan-1.png" alt="Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
                            </Col>
                            <Col className='mobileHeaderHide'>
                            </Col>
                            <Col xs="auto" sm="auto" md="auto" className='mobileHeaderHide'>
                                <Image src="./images/28095927_1267705_GD.png" className="img-fluid" alt="GD" style={{ maxWidth: '200px' }} />
                            </Col>
                        </Row>
                    </Container>
                </header>
                <Navbar bg="primary" variant="dark" className="p-1 mb-3 mt-2">
                </Navbar>
            </div>
        </>
    );
};
