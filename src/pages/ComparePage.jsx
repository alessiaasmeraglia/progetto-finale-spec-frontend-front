import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../contexts/CompareContext";

function ComparePage() {
    const { compareItems, toggleCompare } = useCompare();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (compareItems.length !== 2) {
            setDetails([]);
            return;
        }

        setLoading(true);
        setError("");

        Promise.all(
            compareItems.map((shoe) =>
                fetch(`${API_URL}/shoes/${shoe.id}`).then((res) => {
                    if (!res.ok) {
                        throw new Error("Errore nel recupero dei dettagli");
                    }

                    return res.json().then((data) => data.shoe);
                })
            )
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
    }, [compareItems, API_URL]);

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
        <section>
            <h1>Confronta scarpette</h1>

            {details.length === 2 && (
                <table>
                    <thead>
                        <tr>
                            <th>Caratteristica</th>
                            <th>{details[0].title}</th>
                            <th>{details[1].title}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Categoria</th>
                            <td>{details[0].category}</td>
                            <td>{details[1].category}</td>
                        </tr>

                        <tr>
                            <th>Brand</th>
                            <td>{details[0].brand}</td>
                            <td>{details[1].brand}</td>
                        </tr>

                        <tr>
                            <th>Prezzo</th>
                            <td>€{details[0].price}</td>
                            <td>€{details[1].price}</td>
                        </tr>

                        <tr>
                            <th>Chiusura</th>
                            <td>{details[0].closure}</td>
                            <td>{details[1].closure}</td>
                        </tr>

                        <tr>
                            <th>Rigidità</th>
                            <td>{details[0].stiffness}</td>
                            <td>{details[1].stiffness}</td>
                        </tr>

                        <tr>
                            <th>Profilo</th>
                            <td>{details[0].downturn}</td>
                            <td>{details[1].downturn}</td>
                        </tr>

                        <tr>
                            <th>Livello</th>
                            <td>{details[0].level}</td>
                            <td>{details[1].level}</td>
                        </tr>

                        <tr>
                            <th>Ideale per</th>
                            <td>{details[0].bestFor}</td>
                            <td>{details[1].bestFor}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <div>
                {compareItems.map((shoe) => (
                    <button
                        key={shoe.id}
                        onClick={() => toggleCompare(shoe)}
                    >
                        Rimuovi {shoe.title}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default ComparePage;