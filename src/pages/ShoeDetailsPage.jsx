import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";

function ShoeDetailsPage() {
    const { id } = useParams();

    const [shoe, setShoe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { toggleFavorite, isFavorite } = useFavorites();
    const { toggleCompare, isInCompare, compareItems } = useCompare();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/shoes/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Scarpetta non trovata");
                }

                return res.json();
            })
            .then((data) => {
                setShoe(data.shoe);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, API_URL]);

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
        <section>
            <h1>{shoe.title}</h1>

            <p>Categoria: {shoe.category}</p>
            <p>Brand: {shoe.brand}</p>
            <p>Prezzo: €{shoe.price}</p>
            <p>Chiusura: {shoe.closure}</p>
            <p>Rigidità: {shoe.stiffness}</p>
            <p>Profilo: {shoe.downturn}</p>
            <p>Livello: {shoe.level}</p>
            <p>Ideale per: {shoe.bestFor}</p>
            <p>{shoe.description}</p>
            
            <button onClick={() => toggleFavorite(shoe)}>
                {isFavorite(shoe.id)
                    ? "Rimuovi dai preferiti"
                    : "Aggiungi ai preferiti"}
            </button>

            <button
                onClick={() => toggleCompare(shoe)}
                disabled={!isInCompare(shoe.id) && compareItems.length >= 2}
            >
                {isInCompare(shoe.id)
                    ? "Rimuovi dal confronto"
                    : "Confronta"}
            </button>
        </section>
    );
}

export default ShoeDetailsPage;