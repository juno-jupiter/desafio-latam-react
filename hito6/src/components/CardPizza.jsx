import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { waitSeconds } from "../utils/utils";

const CardPizza = (props) => {
    const [descShow, setDescShow] = useState(false);
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

    return <Card id={props.id}>
        {props.img ? <Card.Img variant="top" src={props.img} alt={props.name} /> : <></>}
        <Card.Body>
            <Card.Title className="text-capitalize">{props.name}</Card.Title>
            <Card.Text>
                {descShow ? props.desc : props.desc.substring(0, 50) + "..."}
                <br/>
                <a href={"#"+props.id} onClick={()=>setDescShow(!descShow)}>{descShow ? "(Mostrar menos)" : "(Mostrar más)"}</a>
            </Card.Text>
            <Card.Text className={props.ingredients.length > 0 ? "" : "d-none"}>
                <b>Ingredientes:</b>
                <ul>
                    {props.ingredients.map((ingredient, index) => (
                        <li key={props.id + "-i" + index} className="pizza-ul text-capitalize">&#x1F355; {ingredient}</li>
                    ))}
                </ul>
            </Card.Text>
            <Card.Text className="text-center">
                <Card.Title>Precio: ${props.price.toLocaleString("es-CL")}</Card.Title>
                <Button variant="outline-dark" as={Link} to={`/pizza/${props.id}`}>Ver Más &#x1F440;</Button>
                <Button variant="dark" onClick={() => addPizza(props.id)}>
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
    </Card>;
}

export default CardPizza;