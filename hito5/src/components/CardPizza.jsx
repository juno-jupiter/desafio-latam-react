import { useState } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardPizza = (props) => {
    const [descShow, setDescShow] = useState(false);

    return <Card id={props.id}>
        {props.img ? <Card.Img variant="top" src={props.img} alt={props.name} /> : <></>}
        <Card.Body>
            <Card.Title className="text-capitalize">{props.name}</Card.Title>
            <Card.Subtitle></Card.Subtitle>
            <Card.Text>
                {descShow ? props.desc : props.desc.substring(0, 50) + "..."}
                <br/>
                (
                {descShow ? <a href={"#"+props.id} onClick={()=>setDescShow(false)}>Mostrar menos</a> :
                    <a href={"#"+props.id} onClick={()=>setDescShow(true)}>Mostrar más</a>}
                )
            </Card.Text>
            {props.ingredients.length > 0 ? <Card.Text>
                <b>Ingredientes:</b>
                <ul>
                    {props.ingredients.map((ingredient, index) => (
                        <li key={props.id + "-i" + index} className="pizza-ul text-capitalize">&#x1F355; {ingredient}</li>
                    ))}
                </ul>
            </Card.Text> : <></>}
            <Card.Text className="text-center">
                <Card.Title>Precio: ${props.price.toLocaleString("es-CL")}</Card.Title>
                <Button variant="outline-dark" as={Link} to={`/pizza/${props.id}`}>Ver Más &#x1F440;</Button>
                <Button variant="dark">Añadir &#x1f6d2;</Button>
            </Card.Text>
        </Card.Body>
    </Card>;
}

export default CardPizza;