import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShoesPage() {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/shoes?search=${search}&category=${category}`)
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
    }, [search, category, API_URL]);

    return (
        <section>
            <h1>Scarpette</h1>

            <input
                type="text"
                placeholder="Cerca una scarpetta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Tutte le categorie</option>
                <option value="Boulder">Boulder</option>
                <option value="Sport">Sport</option>
                <option value="Indoor">Indoor</option>
                <option value="All-round">All-round</option>
            </select>

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