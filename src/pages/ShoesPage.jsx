import { useEffect, useState } from "react";
import { sortShoes } from "../utils/shoes";

import ShoeCard from "../components/ShoeCard";

function ShoesPage() {
    const [shoes, setShoes] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("title-asc");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const sortedShoes = sortShoes(shoes, sort);

    // Debounce della ricerca
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Recupero delle scarpette
    useEffect(() => {
        setLoading(true);
        setError("");

        fetch(
            `${API_URL}/shoes?search=${debouncedSearch}&category=${category}`
        )
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
    }, [debouncedSearch, category, API_URL]);

    return (
        <section>
            <h1>Scarpette</h1>

            <div>
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
            </div>

            {loading && <p>Caricamento...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && sortedShoes.length === 0 && (
                <p>Nessuna scarpetta trovata.</p>
            )}

            {!loading && !error && sortedShoes.length > 0 && (
                <div className="row g-4">
                    {sortedShoes.map((shoe) => (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={shoe.id}
                        >
                            <ShoeCard shoe={shoe} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ShoesPage;