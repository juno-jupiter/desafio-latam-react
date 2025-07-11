import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Profile = () => {
    const {token, user, actions} = useContext(UserContext);

    return <main className="p-3">
        <Container>
            <h1>Profile</h1>
            <Row className="my-3 text-center">
                <Col xs={12} className="mb-3">
                    <span className="fw-bold">Correo: </span><span>{user?.email}</span>
                </Col>
                <Col xs={12}>
                    <Button variant="dark" onClick={actions.logout}>Cerrar Sesión</Button>
                </Col>
            </Row>
        </Container>
    </main>;
}

export default Profile