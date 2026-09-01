import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sortShoes } from "../utils/shoes";
import { useFavorites } from "../contexts/FavoritesContext";

function ShoesPage() {
    const [shoes, setShoes] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("title-asc");

    const { toggleFavorite, isFavorite } = useFavorites();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const sortedShoes = sortShoes(shoes, sort);

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

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="title-asc">Titolo A-Z</option>
                <option value="title-desc">Titolo Z-A</option>
                <option value="category-asc">Categoria A-Z</option>
                <option value="category-desc">Categoria Z-A</option>
            </select>

            {sortedShoes.map((shoe) => (
                <div key={shoe.id}>
                    <h2>{shoe.title}</h2>
                    <p>{shoe.category}</p>

                    <Link to={`/shoes/${shoe.id}`}>
                        Dettagli
                    </Link>

                    <button onClick={() => toggleFavorite(shoe)}>
                        {isFavorite(shoe.id)
                            ? "Rimuovi dai preferiti"
                            : "Aggiungi ai preferiti"}
                    </button>
                </div>
            ))}
        </section>
    );
}

export default ShoesPage;