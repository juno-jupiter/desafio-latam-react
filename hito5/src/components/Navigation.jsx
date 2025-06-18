import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    const total = 25000;
    const token = false;

    return  <Navbar expand="lg" className="bg-dark">
        <Container>
            <Navbar.Brand as={Link} to="/" className="text-white">Pizzería Mamma Mia!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="text-white">&#x1F355; Home</Nav.Link>
                    {
                        token ?
                        <Nav.Link as={Link} to="/profile" className="text-white">&#x1F513; Profile</Nav.Link>
                        : <Nav.Link as={Link} to="/login" className="text-white">&#x1F510; Login</Nav.Link>
                    }
                    {
                        token ?
                        <Nav.Link as={Link} to="/logout" className="text-white">&#x1F512; Logout</Nav.Link>
                        : <Nav.Link as={Link} to="/register" className="text-white">&#x1F510; Register</Nav.Link>
                    }
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/cart" className="text-white">&#x1f6d2; Total: $ {total.toLocaleString("es-CL")}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;
}

export default Navigation;