export const waitSeconds = (ms) => (new Promise(resolve => setTimeout(resolve, ms)));

export const fetchPizzas = async () => {
    const res = await fetch("http://localhost:5000/api/pizzas");
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data;
};

export const fetchPizza = async (pizzaId) => {
    const res = await fetch("http://localhost:5000/api/pizzas/"+pizzaId);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data;
};