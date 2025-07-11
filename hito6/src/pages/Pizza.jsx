import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds, fetchPizza } from "../utils/utils";

const defaultPizza = { id: "", name: "", img: null, desc: "", ingredients: null, price: 0 }

const Pizza = () => {
	let { id } = useParams();
    const [pizza, setPizza] = useState({...defaultPizza});
    const [descShow, setDescShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
    const {cart, setCart} = useContext(CartContext);

    const addPizza = async (pizzaId) => {
		if (isButtonLoading) return;
		setIsButtonLoading(true);
		await waitSeconds(200);
        const newCart = cart.slice(0);
        newCart.push(pizzaId);
        setCart(newCart);
		setIsButtonLoading(false);
    };

    const loadPizza = async (pizzaId) => {
		if (isLoading) return;
		setIsLoading(true);
		await waitSeconds(200);
        let data = {...defaultPizza};
        try {
            data = await fetchPizza(pizzaId);
        } catch (error) {
            console.log(error);
        }
        setPizza(data);
		setIsLoading(false);
    }

    useEffect(() => { loadPizza(id) }, [id]);

    return <main className="p-3">
		<Container>
			<h1 className="text-capitalize">Detalle pizza:</h1>
			<Row className={(pizza.id && (!isLoading)) ? "p-5" : "d-none"}>
				<Col xs={12} md={6} className="px-3">
					<Card id={"detail-"+pizza.id}>
						{pizza.img ? <Card.Img variant="top" src={pizza.img} alt={pizza.name} /> : <></>}
						<Card.Body>
							<Card.Title className="text-capitalize">{pizza.name}</Card.Title>
							<Card.Text name="descripcion">
								{descShow ? pizza.desc : pizza.desc.substring(0, 50) + "..."}
								<br/>
								<a href="#descripcion" onClick={()=>setDescShow(!descShow)}>{descShow ? "(Mostrar menos)" : "(Mostrar más)"}</a>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={6} className="px-3">
					<Card id={"shop-"+pizza.id}>
						<Card.Body>
							{pizza.ingredients ? <Card.Text>
								<b>Ingredientes:</b>
								<ul>
									{pizza.ingredients.map((ingredient, index) => (
										<li key={pizza.id + "-i" + index} className="pizza-ul text-capitalize">&#x1F355; {ingredient}</li>
									))}
								</ul>
							</Card.Text> : <></>}
							<Card.Text className="text-center">
								<Card.Title>Precio: ${pizza.price.toLocaleString("es-CL")}</Card.Title>
								<Button variant="dark" onClick={() => addPizza(id)}>
									{isButtonLoading ?
										<span>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<Spinner animation="border" role="status" size="sm">
												<span className="visually-hidden">Añadiendo...</span>
											</Spinner>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</span>
										: <span>Añadir &#x1f6d2;</span>}
								</Button>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className={(pizza.id || (!isLoading)) ? "d-none" : "align-items-center p-5"}>
				<Col xs={12} className="align-self-center p-5 text-center">
					<Spinner animation="border" role="status"><span className="visually-hidden">Buscando detalles...</span></Spinner>
					<p>Buscando detalles...</p>
				</Col>
			</Row>
			<Row className={(pizza.id || isLoading) ? "d-none" : "align-items-center p-5"}>
				<Col xs={12} className="align-self-center p-5 text-center">
					<p>Algo salió mal :(</p>
					<p>Inténtalo de nuevo.</p>
				</Col>
			</Row>
		</Container>
    </main>;
}

export default Pizza;