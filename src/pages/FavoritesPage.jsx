import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    if (favorites.length === 0) {
        return (
            <section>
                <h1>Preferiti</h1>
                <p>Non hai ancora aggiunto nessuna scarpetta ai preferiti.</p>

                <Link to="/shoes">
                    Vai alle scarpette
                </Link>
            </section>
        );
    }

    return (
        <section>
            <h1>Preferiti</h1>

            {favorites.map((shoe) => (
                <div key={shoe.id}>
                    <h2>{shoe.title}</h2>
                    <p>{shoe.category}</p>

                    <Link to={`/shoes/${shoe.id}`}>
                        Dettagli
                    </Link>

                    <button onClick={() => toggleFavorite(shoe)}>
                        Rimuovi dai preferiti
                    </button>
                </div>
            ))}
        </section>
    );
}

export default FavoritesPage;