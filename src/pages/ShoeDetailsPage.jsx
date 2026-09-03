import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";
import { getShoeById } from "../services/shoesApi";

function ShoeDetailsPage() {
    const { id } = useParams();

    const [shoe, setShoe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { toggleFavorite, isFavorite } = useFavorites();
    const { toggleCompare, isInCompare, compareItems } = useCompare();

    useEffect(() => {
        setLoading(true);
        setError("");

        getShoeById(id)
            .then((data) => {
                setShoe(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!shoe) {
        return null;
    }

    return (
        <section className="container py-5">
            <div className="row g-5 align-items-start">
                <div className="col-12 col-lg-5">
                    <img
                        src={shoe.image}
                        alt={shoe.title}
                        className="img-fluid rounded-4 border"
                    />
                </div>

                <div className="col-12 col-lg-7">
                    <span className="badge text-bg-light border mb-3">
                        {shoe.category}
                    </span>

                    <h1 className="display-6 fw-bold mb-3">
                        {shoe.title}
                    </h1>

                    <p className="lead text-body-secondary">
                        {shoe.description}
                    </p>

                    <div className="row g-3 my-4">
                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Brand
                                </small>

                                <strong>{shoe.brand}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Prezzo
                                </small>

                                <strong>€{shoe.price}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Chiusura
                                </small>

                                <strong>{shoe.closure}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Rigidità
                                </small>

                                <strong>{shoe.stiffness}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Profilo
                                </small>

                                <strong>{shoe.downturn}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="border rounded-3 p-3 h-100">
                                <small className="text-body-secondary d-block">
                                    Livello
                                </small>

                                <strong>{shoe.level}</strong>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="border rounded-3 p-3">
                                <small className="text-body-secondary d-block">
                                    Ideale per
                                </small>

                                <strong>{shoe.bestFor}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                        <button
                            type="button"
                            className={`btn ${isFavorite(shoe.id)
                                ? "btn-danger"
                                : "btn-outline-danger"
                                }`}
                            onClick={() => toggleFavorite(shoe)}
                        >
                            <i
                                className={`bi ${isFavorite(shoe.id)
                                    ? "bi-heart-fill"
                                    : "bi-heart"
                                    } me-2`}
                            ></i>

                            {isFavorite(shoe.id)
                                ? "Rimuovi dai preferiti"
                                : "Aggiungi ai preferiti"}
                        </button>

                        <button
                            type="button"
                            className={`btn ${isInCompare(shoe.id)
                                ? "btn-dark"
                                : "btn-outline-dark"
                                }`}
                            onClick={() => toggleCompare(shoe)}
                            disabled={
                                !isInCompare(shoe.id) &&
                                compareItems.length >= 2
                            }
                        >
                            <i className="bi bi-arrow-left-right me-2"></i>

                            {isInCompare(shoe.id)
                                ? "Rimuovi dal confronto"
                                : "Confronta"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShoeDetailsPage;