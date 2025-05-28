const CardPizza = (props) => {
    return <div>
        <p><img src={props.img} alt={props.name}/></p>
        <p>{props.name}</p>
        <p>Ingredientes:</p>
        <p>&#x1F355; {props.ingredients.join(", ")}</p>
        <p>Precio: ${props.price.toLocaleString("es-CL")}</p>
        <p>
            <button>Ver Más &#x1F440;</button>
            <button>Añadir &#x1f6d2;</button>
        </p>
    </div>;
};

export default CardPizza;