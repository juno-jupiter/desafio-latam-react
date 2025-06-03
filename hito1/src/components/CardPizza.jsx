import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardPizza = (props) => {
    return <Card>
        <Card.Img variant="top" src={props.img} alt={props.name} />
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Subtitle className="text-center">Ingredientes:</Card.Subtitle>
            <Card.Text>
                &#x1F355; {props.ingredients.join(", ")}
            </Card.Text>
        </Card.Body>
        <Card.Body className="text-center">
            <Card.Title>Precio: ${props.price.toLocaleString("es-CL")}</Card.Title>
            <Button variant="outline-dark">Ver Más &#x1F440;</Button>
            <Button variant="dark">Añadir &#x1f6d2;</Button>
        </Card.Body>
    </Card>;
};

export default CardPizza;