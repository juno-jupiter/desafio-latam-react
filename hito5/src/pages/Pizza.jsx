import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds } from "../utils/utils";

const fetchPizza = async (pizzaId) => {
    const res = await fetch("http://localhost:5000/api/pizzas/"+pizzaId);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data;
}

const defaultPizza = { id: "", name: "", img: null, desc: "", ingredients: null, price: 0 }

const Pizza = () => {
	let { id } = useParams();
    const [pizza, setPizza] = useState({...defaultPizza});
    const [descShow, setDescShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => { loadPizza(id) }, []);

    return <main className="p-3">
		<Container>
			<h1 className="text-capitalize">Detalle pizza:</h1>
			<Row className={(pizza.id && (!isLoading)) ? "p-5" : "d-none"}>
				<Col xs={12} md={6} className="px-3">
					<Card id={"detail-"+pizza.id}>
						{pizza.img ? <Card.Img variant="top" src={pizza.img} alt={pizza.name} /> : <></>}
						<Card.Body>
							<Card.Title className="text-capitalize">{pizza.name}</Card.Title>
							<Card.Subtitle></Card.Subtitle>
							<Card.Text>
								{descShow ? pizza.desc : pizza.desc.substring(0, 50) + "..."}
								<br/>
								(
								{descShow ? <a href={"#"+pizza.id} onClick={()=>setDescShow(false)}>Mostrar menos</a> :
									<a href={"#"+pizza.id} onClick={()=>setDescShow(true)}>Mostrar más</a>}
								)
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
								<Button variant="dark">Añadir &#x1f6d2;</Button>
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