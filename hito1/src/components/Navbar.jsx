const Navbar = () => {
    const total = 25000;
    const token = false;

    return <section>
        <ul>
            <li><a href="/">Pizzería Mamma Mia!</a></li>
            <li><a href="/">&#x1F355; Home</a></li>
            {token ? <li><a href="/">&#x1F513; Profile</a></li> : <li><a href="/">&#x1F510; Login</a></li>}
            {token ? <li><a href="/">&#x1F512; Logout</a></li> : <li><a href="/">&#x1F510; Register</a></li>}
            <li><a href="/">&#x1f6d2; Total: $ {total.toLocaleString("es-CL")}</a></li>
        </ul>
    </section>;
};

export default Navbar;