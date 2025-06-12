import { useState, useEffect } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { pizzas } from '../assets/js/pizzas.js';

const fetchPizzas = async () => {
    const res = await fetch("http://localhost:5000/api/pizzas");
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data;
}

const Home = () => {
    const [pizzas, setPizzas] = useState([]);

    const refreshPizzas = async () => {
        let data = [];
        try {
            data = await fetchPizzas();
        } catch (error) {
            console.log(error);
        }
        setPizzas(data);
    }

    useEffect(() => {refreshPizzas()}, [])

    return <main>
        <Header />
        <Row xs={2} md={3} className="g-4 align-items-center p-5">
            {pizzas.length > 0 ? pizzas.map(pizza => (
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
            )) : <Col xs={12} className="py-3 text-center">Algo salió mal :(<br/>Inténtalo de nuevo.</Col>}
        </Row>
    </main>;
}

export default Home;