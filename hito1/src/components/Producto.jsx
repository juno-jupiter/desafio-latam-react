const Producto = (props) => {
  return (
    <div>
        <h2>{props.nombre}</h2>
        <p>${props.precio}</p>
        <p>{props.descripcion}</p>
        <p>Stock: {props.stock}</p>
    </div>
  )
}

export default Producto