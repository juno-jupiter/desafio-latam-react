import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { waitSeconds, fetchPizzas } from "../utils/utils";
import { pizzaCart } from '../utils/pizzas.js';

const Cart = () => {
    const {cart, setCart} = useContext(CartContext);
    const [currentCart, setCurrentCart] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    // const [cart, setCart] = useState(pizzaCart);

    const fetchCurrentCart = async () => {
		if (isLoading) return;
		setIsLoading(true);
		await waitSeconds(200);
        const newCart = [];
        const pizzaInCart = [];
        let data = [];
        try {
            data = await fetchPizzas();
        } catch (error) {
            console.log(error);
        }
        cart.forEach(element => {
            if (pizzaInCart.includes(element)) {
                const filteredCart = newCart.filter((pizza) => pizza?.id === element);
                const pizza = ((!filteredCart) || (filteredCart.length < 1)) ? null : filteredCart[0];
                if (!pizza) return;
                pizza.count = pizza.count + 1;
            } else {
                const filteredData = data.filter((pizza) => pizza?.id === element);
                const pizza = ((!filteredData) || (filteredData.length < 1)) ? null : filteredData[0];
                if (!pizza) return;
                pizza.count = 1;
                pizzaInCart.push(element);
                newCart.push(pizza);
            }
        });
        setCurrentCart(newCart);
		setIsLoading(false);
    }

    const getTotal = (cartFrom) => {
        let currTotal = 0;
        cartFrom.map(pizza => currTotal = currTotal + (pizza.price * pizza.count));
        return currTotal;
    }

    const setCount = (index, count) => {
        const modCart = [...currentCart];
        if (count <= 0) {
            modCart.splice(index, 1);
        } else {
            modCart[index].count = count;
        }
        setCurrentCart(modCart);
    }

    useEffect(() => {fetchCurrentCart()}, [cart]);

    return <main className="p-3">
        <Container>
            <h1>Carrito</h1>
            <Row><Col><h3>Detalles del pedido:</h3></Col></Row>
            {currentCart.length > 0 ? currentCart.map((pizza, index) => (
                <Row key={pizza.id}>
                    <Col xs={12} md={4} className="text-center">
                        <img src={pizza.img} alt={pizza.name} className="cart-img py-3"/>
                    </Col>
                    <Col xs={12} md={3} className="text-capitalize fw-bold fs-4 text-center py-3">{pizza.name}</Col>
                    <Col xs={6} md={3} className="fw-bold fs-4 text-center py-3">
                        ${(pizza.price * pizza.count).toLocaleString("es-CL")}
                    </Col>
                    <Col xs={6} md={2} className="text-center py-3">
                        <Button variant="outline-danger" onClick={() => setCount(index, currentCart[index].count - 1)}>
                            &nbsp;-&nbsp;
                        </Button>
                        <b>&nbsp;&nbsp;{pizza.count}&nbsp;&nbsp;</b>
                        <Button variant="outline-info" onClick={() => setCount(index, currentCart[index].count + 1)}>
                            &nbsp;+&nbsp;
                        </Button>
                    </Col>
                </Row>
            )) : <Row className="text-center"><Col className="py-3">No hay productos en el carrito.</Col></Row>}
            <Row className="py-3">
                <Col xs={12} className="fs-1">Total: ${getTotal(currentCart).toLocaleString("es-CL")}</Col>
                <Col className="text-center" xs={12}><Button variant="dark">&nbsp;&nbsp;Pagar&nbsp;&nbsp;</Button></Col>
            </Row>
        </Container>
    </main>
}

export default Cart;