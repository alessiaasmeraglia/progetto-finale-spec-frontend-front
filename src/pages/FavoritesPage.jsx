import { Link } from "react-router-dom";
import ShoeCard from "../components/ShoeCard";
import { useFavorites } from "../contexts/FavoritesContext";

function FavoritesPage() {
    const { favorites } = useFavorites();

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
                <ShoeCard
                    key={shoe.id}
                    shoe={shoe}
                />
            ))}
        </section>
    );
}

export default FavoritesPage;