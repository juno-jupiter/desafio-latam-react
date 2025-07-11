import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds, fetchPizzas } from "../utils/utils";

const Navigation = () => {
    const [total, setTotal] = useState(0);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
    const {cart, setCart} = useContext(CartContext);
    const {token, user, actions} = useContext(UserContext);

    const recalculateTotal = async () => {
		if (isButtonLoading) return;
		setIsButtonLoading(true);
		await waitSeconds(200);
        let newTotal = 0;
        let data = [];
        try {
            data = await fetchPizzas();
        } catch (error) {
            console.log(error);
        }
        cart.forEach(element => {
            const pizzaData = data.filter((pizza) => pizza.id === element.id);
            if ((!pizzaData) || (pizzaData.length === 0)) return;
            newTotal = newTotal + pizzaData[0]?.price * element.count;
        });
        setTotal(newTotal);
		setIsButtonLoading(false);
    }

    useEffect(() => {recalculateTotal()}, [cart]);

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
                        <Nav.Link as={Link} to="/logout" className="text-white" onClick={actions.logout}>
                            &#x1F512; Logout
                        </Nav.Link>
                        : <Nav.Link as={Link} to="/register" className="text-white">&#x1F510; Register</Nav.Link>
                    }
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/cart" className="text-white">
                        &#x1f6d2; Total: $&nbsp;
                        {isButtonLoading ?
                            <span>
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Añadiendo...</span>
                                </Spinner>
                            </span>
                            : <span>{total.toLocaleString("es-CL")}</span>}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;
}

export default Navigation;