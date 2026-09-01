import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShoesPage() {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/shoes`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero delle scarpette");
                }

                return res.json();
            })
            .then((data) => {
                setShoes(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section>
            <h1>Scarpette</h1>

            {shoes.map((shoe) => (
                <div key={shoe.id}>
                    <h2>{shoe.title}</h2>
                    <p>{shoe.category}</p>
                    
                    <Link to={`/shoes/${shoe.id}`}>
                        Dettagli
                    </Link>
                </div>
            ))}
        </section>
    );
}

export default ShoesPage;