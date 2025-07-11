import { useState, useEffect } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds, fetchPizzas } from "../utils/utils";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

    const refreshPizzas = async () => {
		if (isLoading) return;
		setIsLoading(true);
		await waitSeconds(200);
        let data = [];
        try {
            data = await fetchPizzas();
        } catch (error) {
            console.log(error);
        }
        setPizzas(data);
		setIsLoading(false);
    }

    useEffect(() => {refreshPizzas()}, []);

    const isEmpty = pizzas.length === 0;

    return <main>
        <Header />
        <Container>
            <Row xs={1} md={3} className={(isEmpty || isLoading) ? "d-none" : "g-4 align-items-center p-5"}>
                {pizzas.map(pizza => (
                    <Col key={pizza.id}>
                        <CardPizza
                            id={pizza.id}
                            name={pizza.name}
                            price={pizza.price}
                            ingredients={pizza.ingredients}
                            img={pizza.img}
                            desc={pizza.desc}
                        />
                    </Col>
                ))}
            </Row>
            <Row className={((!isEmpty) || (!isLoading)) ? "d-none" : "align-items-center p-5"}>
                <Col xs={12} className="align-self-center p-5 text-center">
                    <Spinner animation="border" role="status"><span className="visually-hidden">Buscando menú...</span></Spinner>
                    <p>Buscando menú...</p>
                </Col>
            </Row>
            <Row className={((!isEmpty) || isLoading) ? "d-none" : "align-items-center p-5"}>
                <Col xs={12} className="align-self-center p-5 text-center">
                    <p>Algo salió mal :(</p>
                    <p>Inténtalo de nuevo.</p>
                </Col>
            </Row>
        </Container>
    </main>;
}

export default Home;