import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../contexts/CompareContext";
import { getShoeById } from "../services/shoesApi";

function ComparePage() {
    const { compareItems, toggleCompare } = useCompare();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (compareItems.length !== 2) {
            setDetails([]);
            return;
        }

        setLoading(true);
        setError("");

        Promise.all(
            compareItems.map((shoe) => getShoeById(shoe.id))
        )
            .then((data) => {
                setDetails(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [compareItems]);

    if (compareItems.length === 0) {
        return (
            <section>
                <h1>Confronta scarpette</h1>

                <p>Non hai ancora selezionato nessuna scarpetta da confrontare.</p>

                <Link to="/shoes">
                    Vai alle scarpette
                </Link>
            </section>
        );
    }

    if (compareItems.length === 1) {
        return (
            <section>
                <h1>Confronta scarpette</h1>

                <p>Seleziona una seconda scarpetta per iniziare il confronto.</p>

                <div>
                    <h2>{compareItems[0].title}</h2>
                    <p>{compareItems[0].category}</p>

                    <button onClick={() => toggleCompare(compareItems[0])}>
                        Rimuovi dal confronto
                    </button>
                </div>

                <Link to="/shoes">
                    Scegli un'altra scarpetta
                </Link>
            </section>
        );
    }

    if (loading) {
        return <p>Caricamento confronto...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="container py-5">
            <div className="mb-4">
                <h1 className="display-6 fw-bold">
                    Confronta scarpette
                </h1>

                <p className="text-body-secondary mb-0">
                    Metti a confronto caratteristiche, utilizzo e prezzo.
                </p>
            </div>

            {compareItems.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-arrow-left-right fs-1 text-body-secondary"></i>

                    <h2 className="h4 mt-3">
                        Nessuna scarpetta selezionata
                    </h2>

                    <p className="text-body-secondary">
                        Aggiungi due scarpette per iniziare il confronto.
                    </p>

                    <Link to="/shoes" className="btn btn-primary">
                        Vai alle scarpette
                    </Link>
                </div>
            )}

            {compareItems.length === 1 && (
                <div className="text-center py-5">
                    <h2 className="h4">
                        Seleziona una seconda scarpetta
                    </h2>

                    <p className="text-body-secondary">
                        Hai selezionato {compareItems[0].title}.
                    </p>

                    <div className="d-flex justify-content-center gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => toggleCompare(compareItems[0])}
                        >
                            Rimuovi
                        </button>

                        <Link to="/shoes" className="btn btn-primary">
                            Scegli la seconda
                        </Link>
                    </div>
                </div>
            )}

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Caricamento confronto...
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {!loading &&
                !error &&
                compareItems.length === 2 &&
                details.length === 2 && (
                    <>
                        <div className="table-responsive">
                            <table className="table table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Caratteristica</th>

                                        <th scope="col" className="text-center">
                                            <img
                                                src={details[0].image}
                                                alt={details[0].title}
                                                className="compare-shoe-image mb-2"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/img/shoes/placeholder.jpg";
                                                }}
                                            />

                                            <div>{details[0].title}</div>
                                        </th>

                                        <th scope="col" className="text-center">
                                            <img
                                                src={details[1].image}
                                                alt={details[1].title}
                                                className="compare-shoe-image mb-2"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/img/shoes/placeholder.jpg";
                                                }}
                                            />

                                            <div>{details[1].title}</div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th scope="row">Categoria</th>
                                        <td>{details[0].category}</td>
                                        <td>{details[1].category}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Brand</th>
                                        <td>{details[0].brand}</td>
                                        <td>{details[1].brand}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Prezzo</th>
                                        <td>€{details[0].price}</td>
                                        <td>€{details[1].price}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Chiusura</th>
                                        <td>{details[0].closure}</td>
                                        <td>{details[1].closure}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Rigidità</th>
                                        <td>{details[0].stiffness}</td>
                                        <td>{details[1].stiffness}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Profilo</th>
                                        <td>{details[0].downturn}</td>
                                        <td>{details[1].downturn}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Livello</th>
                                        <td>{details[0].level}</td>
                                        <td>{details[1].level}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Ideale per</th>
                                        <td>{details[0].bestFor}</td>
                                        <td>{details[1].bestFor}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex flex-column flex-md-row gap-2 mt-4">
                            {compareItems.map((shoe) => (
                                <button
                                    key={shoe.id}
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => toggleCompare(shoe)}
                                >
                                    <i className="bi bi-x-circle me-2"></i>
                                    Rimuovi {shoe.title}
                                </button>
                            ))}
                        </div>
                    </>
                )}
        </section>
    );
}

export default ComparePage;