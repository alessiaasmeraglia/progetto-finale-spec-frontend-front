import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";

function Header() {
    const { favorites } = useFavorites();
    const { compareItems } = useCompare();

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold" to="/">
                        ClimbCompare
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Apri navigazione"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="mainNavbar"
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/shoes"
                                >
                                    Scarpette
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/compare"
                                >
                                    <i className="bi bi-arrow-left-right me-1"></i>
                                    Confronta
                                    <span className="badge text-bg-secondary ms-1">
                                        {compareItems.length}
                                    </span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/favorites"
                                >
                                    <i className="bi bi-heart me-1"></i>
                                    Preferiti
                                    <span className="badge text-bg-secondary ms-1">
                                        {favorites.length}
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;