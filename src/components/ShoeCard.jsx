import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";
import "./ShoeCard.css";

function ShoeCard({ shoe }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    const {
        toggleCompare,
        isInCompare,
        compareItems,
    } = useCompare();

    const favorite = isFavorite(shoe.id);
    const compared = isInCompare(shoe.id);
    const compareFull = compareItems.length >= 2 && !compared;

    const [details, setDetails] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/shoes/${shoe.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero della scarpetta");
                }

                return res.json();
            })
            .then((data) => {
                setDetails(data.shoe);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [shoe.id, API_URL]);

    return (
        <article
            className={`card h-100 shadow-sm ${compared ? "border-dark border-2" : ""
                }`}
        >
            {details?.image && (
                <img
                    src={details.image}
                    className="card-img-top shoe-card-image"
                    alt={shoe.title}

                />
            )}

            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge text-bg-light border">
                        {shoe.category}
                    </span>

                    <div className="d-flex gap-2">
                        {favorite && (
                            <span
                                className="badge text-bg-danger"
                                title="Nei preferiti"
                            >
                                <i className="bi bi-heart-fill"></i>
                            </span>
                        )}

                        {compared && (
                            <span
                                className="badge text-bg-dark"
                                title="Nel confronto"
                            >
                                <i className="bi bi-arrow-left-right"></i>
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="h5 card-title">
                    {shoe.title}
                </h2>

                {details && (
                    <>
                        <p className="text-body-secondary mb-2">
                            {details.brand}
                        </p>

                        <p className="fw-bold mb-3">
                            €{details.price}
                        </p>
                    </>
                )}

                <div className="mt-auto pt-3 d-grid gap-2">
                    <Link
                        to={`/shoes/${shoe.id}`}
                        className="btn btn-primary"
                    >
                        Vedi dettagli
                    </Link>

                    <button
                        type="button"
                        className={`btn ${favorite
                            ? "btn-danger"
                            : "btn-outline-danger"
                            }`}
                        onClick={() => toggleFavorite(shoe)}
                    >
                        <i
                            className={`bi ${favorite ? "bi-heart-fill" : "bi-heart"
                                } me-2`}
                        ></i>

                        {favorite
                            ? "Rimuovi dai preferiti"
                            : "Aggiungi ai preferiti"}
                    </button>

                    <button
                        type="button"
                        className={`btn ${compared
                            ? "btn-dark"
                            : "btn-outline-dark"
                            }`}
                        onClick={() => toggleCompare(shoe)}
                        disabled={compareFull}
                    >
                        <i className="bi bi-arrow-left-right me-2"></i>

                        {compared
                            ? "Rimuovi dal confronto"
                            : "Confronta"}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ShoeCard;