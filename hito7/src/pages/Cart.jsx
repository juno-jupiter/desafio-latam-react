import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds, fetchPizzas } from "../utils/utils";

const Cart = () => {
    const [total, setTotal] = useState(0);
    const [currentCart, setCurrentCart] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonLoading, setIsButtonLoading] = useState("");
    const {cart, setCart} = useContext(CartContext);
    const {token, user, actions} = useContext(UserContext);

    const fetchCurrentCart = async () => {
		if (isLoading) return;
		setIsLoading(true);
		await waitSeconds(200);
        let newTotal = 0;
        const newCart = [];
        let data = [];
        try {
            data = await fetchPizzas();
        } catch (error) {
            console.log(error);
        }
        cart.forEach(element => {
            const filteredCart = data.filter((pizza) => pizza?.id === element.id);
            if ((!filteredCart) || (filteredCart.length < 1)) return;
            const pizza = {...filteredCart[0], count: element.count}
            newCart.push(pizza);
            newTotal = newTotal + pizza?.price * pizza.count;
        });
        setCurrentCart(newCart);
        setTotal(newTotal);
		setIsLoading(false);
    }

    const addPizza = async (pizzaId) => {
		if (isButtonLoading) return;
		setIsButtonLoading(pizzaId);
		await waitSeconds(200);
        const newCart = cart.slice(0);
        const filteredCart = newCart.filter((pizza) => pizza?.id === pizzaId);
        if ((!filteredCart) || (filteredCart.length === 0)) {
            newCart.push({id: pizzaId, count: 1})
        } else {
            const pizzaCount = filteredCart[0];
            pizzaCount.count = pizzaCount.count + 1;
        }
        setCart(newCart);
		setIsButtonLoading(false);
    };

    const removePizza = async (pizzaId) => {
		if (isButtonLoading) return;
		setIsButtonLoading(pizzaId);
		await waitSeconds(200);
        const newCart = cart.slice(0);
        const filteredCart = newCart.filter((pizza) => pizza?.id === pizzaId);
        if ((!filteredCart) || (filteredCart.length === 0)) {
		    setIsButtonLoading(false);
            return;
        }
        const pizzaCount = filteredCart[0];
        pizzaCount.count = pizzaCount.count - 1;
        setCart((pizzaCount.count > 0) ? newCart : newCart.filter((pizza) => pizza?.id !== pizzaId));
		setIsButtonLoading(false);
    };

    useEffect(() => {fetchCurrentCart()}, [cart]);

    return <main className="p-3">
        <Container>
            <h1>Carrito</h1>
            <Row><Col><h3>Detalles del pedido:</h3><hr/></Col></Row>
            {isLoading ? <Row className="align-items-center p-5">
                    <Col xs={12} className="align-self-center p-5 text-center">
                        <Spinner animation="border" role="status"><span className="visually-hidden">Cargando carro de compras...</span></Spinner>
                        <p>Cargando carro de compras...</p>
                        <hr/>
                    </Col>
                </Row> :
                <>
                    {currentCart.length > 0 ? currentCart.map(pizza => (
                        <Row key={pizza.id} className="align-items-center">
                            <Col xs={12} md={4} className="text-center">
                                <img src={pizza.img} alt={pizza.name} className="cart-img py-1"/>
                            </Col>
                            <Col xs={12} md={3} className="text-capitalize fw-bold fs-4 text-center py-1">
                                {pizza.name}
                            </Col>
                            <Col xs={6} md={3} className="fw-bold fs-4 text-center py-1">
                                ${(pizza.price * pizza.count).toLocaleString("es-CL")}
                            </Col>
                            <Col xs={6} md={2} className="text-center py-1">
                                <Button variant="outline-danger" onClick={() => removePizza(pizza.id)}>
                                    &nbsp;-&nbsp;
                                </Button>
                                <b>&nbsp;&nbsp;
                                {isButtonLoading === pizza.id ? <>
                                        <Spinner animation="border" role="status" size="sm">
												<span className="visually-hidden">Calculando...</span>
                                        </Spinner>
                                    </>
                                    : <>{pizza.count}</>}
                                &nbsp;&nbsp;</b>
                                <Button variant="outline-info" onClick={() => addPizza(pizza.id)}>
                                    &nbsp;+&nbsp;
                                </Button>
                            </Col>
                            <Col xs={12}><hr/></Col>
                        </Row>
                    ))
                    : <Row className="text-center align-items-center">
                        <Col className="py-5">No hay productos en el carrito.<hr/></Col>
                    </Row>}
                </>}
            <Row className="py-3">
                <Col xs={12} className="fs-1">
                    Total: $&nbsp;
                    {isButtonLoading ?
                        <span className="fs-6">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Calculando...</span>
                            </Spinner>
                        </span>
                        : <span>{total.toLocaleString("es-CL")}</span>}
                </Col>
                <Col className="text-center" xs={12}>
                    <Button variant="dark" disabled={!token}>
                        &nbsp;&nbsp;Pagar&nbsp;&nbsp;
                    </Button>
                </Col>
            </Row>
        </Container>
    </main>
}

export default Cart;