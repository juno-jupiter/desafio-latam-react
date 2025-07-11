import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFound = () => {
    return <main className="p-3">
        <Container>
            <Row className="align-items-center p-5">
                <Col xs={12} className="align-self-center p-5 text-center">
                    <p className='display-1'>404</p>
                    <p className='display-6 fw-light'>No encontrado :(</p>
                </Col>
            </Row>
        </Container>
    </main>;
}

export default NotFound