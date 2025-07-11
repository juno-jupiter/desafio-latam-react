import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Profile = () => {
    const userEmail = "nombre@ejemplo.com";

    return <main className="p-3">
        <Container>
            <h1>Profile</h1>
            <Row className="my-3 text-center">
                <Col xs={12} className="mb-3">
                    <span className="fw-bold">Correo: </span><span>{userEmail}</span>
                </Col>
                <Col xs={12}>
                    <Button variant="dark">Cerrar Sesión</Button>
                </Col>
            </Row>
        </Container>
    </main>;
}

export default Profile