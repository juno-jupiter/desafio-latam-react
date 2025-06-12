import Header from "./Header";
import CardPizza from "./CardPizza";
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { pizzas } from '../assets/js/pizzas.js';

const Home = () => {
    return <main>
        <Header />
        <CardGroup className="p-5">
        <Row xs={2} md={3} className="g-4">
            {pizzas.map(pizza => (
                <Col key={pizza.id}>
                    <CardPizza
                        name={pizza.name}
                        price={pizza.price}
                        ingredients={pizza.ingredients}
                        img={pizza.img}
                        desc={pizza.desc}
                    />
                </Col>
            ))}
        </Row>
        </CardGroup>
    </main>;
}

export default Home;