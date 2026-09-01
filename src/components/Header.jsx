import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

function Header() {
    const { favorites } = useFavorites();

    return (
        <header>
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/shoes">
                    Scarpette
                </NavLink>

                <NavLink to="/compare">
                    Confronta
                </NavLink>

                <NavLink to="/favorites">
                    Preferiti ({favorites.length})
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;