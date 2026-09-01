import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";

function ShoeCard({ shoe }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    const {
        toggleCompare,
        isInCompare,
        compareItems,
    } = useCompare();

    return (
        <div>
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

            <button
                onClick={() => toggleCompare(shoe)}
                disabled={
                    !isInCompare(shoe.id) &&
                    compareItems.length >= 2
                }
            >
                {isInCompare(shoe.id)
                    ? "Rimuovi dal confronto"
                    : "Confronta"}
            </button>
        </div>
    );
}

export default ShoeCard;