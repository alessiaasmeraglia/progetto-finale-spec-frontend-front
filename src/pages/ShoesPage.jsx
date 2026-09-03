import { useEffect, useState } from "react";
import { sortShoes } from "../utils/shoes";
import { getShoes } from "../services/shoesApi";

import ShoeCard from "../components/ShoeCard";

function ShoesPage() {
    const [shoes, setShoes] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("title-asc");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

        getShoes(debouncedSearch, category)
            .then((data) => {
                setShoes(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debouncedSearch, category]);

    function resetFilters() {
        setSearch("");
        setCategory("");
        setSort("title-asc");
    }

    return (
        <section className="container py-5">
            <div className="mb-4">
                <h1 className="display-6 fw-bold">
                    Scarpette
                </h1>

                <p className="text-body-secondary mb-0">
                    Cerca, filtra e confronta le scarpette da arrampicata.
                </p>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                    <label
                        htmlFor="search"
                        className="form-label"
                    >
                        Cerca
                    </label>

                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            id="search"
                            type="text"
                            className="form-control"
                            placeholder="Cerca una scarpetta..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label
                        htmlFor="category"
                        className="form-label"
                    >
                        Categoria
                    </label>

                    <select
                        id="category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">
                            Tutte le categorie
                        </option>

                        <option value="Boulder">
                            Boulder
                        </option>

                        <option value="Sport">
                            Sport
                        </option>

                        <option value="Indoor">
                            Indoor
                        </option>

                        <option value="All-round">
                            All-round
                        </option>
                    </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label
                        htmlFor="sort"
                        className="form-label"
                    >
                        Ordina per
                    </label>

                    <select
                        id="sort"
                        className="form-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="title-asc">
                            Titolo A-Z
                        </option>

                        <option value="title-desc">
                            Titolo Z-A
                        </option>

                        <option value="category-asc">
                            Categoria A-Z
                        </option>

                        <option value="category-desc">
                            Categoria Z-A
                        </option>
                    </select>
                </div>
            </div>

            <div className="col-12 mb-4">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetFilters}
                >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Reset filtri
                </button>
            </div>

            {loading && (
                <div className="text-center py-5">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Caricamento...
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {!loading &&
                !error &&
                sortedShoes.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-search fs-1 text-body-secondary"></i>

                        <h2 className="h4 mt-3">
                            Nessuna scarpetta trovata
                        </h2>

                        <p className="text-body-secondary">
                            Prova a modificare la ricerca o i filtri.
                        </p>
                    </div>
                )}

            {!loading &&
                !error &&
                sortedShoes.length > 0 && (
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