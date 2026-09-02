import { Link } from "react-router-dom";
import ShoeCard from "../components/ShoeCard";
import { useFavorites } from "../contexts/FavoritesContext";

function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <section className="container py-5">
            <div className="mb-4">
                <h1 className="display-6 fw-bold">
                    Preferiti
                </h1>

                <p className="text-body-secondary mb-0">
                    Qui trovi le scarpette che hai salvato.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-heart fs-1 text-body-secondary"></i>

                    <h2 className="h4 mt-3">
                        Nessun preferito
                    </h2>

                    <p className="text-body-secondary">
                        Aggiungi qualche scarpetta ai preferiti per ritrovarla qui.
                    </p>

                    <Link to="/shoes" className="btn btn-primary">
                        Vai alle scarpette
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {favorites.map((shoe) => (
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

export default FavoritesPage;