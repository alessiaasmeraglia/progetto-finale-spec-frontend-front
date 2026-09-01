import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCompare } from "../contexts/CompareContext";

function Header() {
    const { favorites } = useFavorites();
    const { compareItems } = useCompare();

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
                    Confronta ({compareItems.length})
                </NavLink>

                <NavLink to="/favorites">
                    Preferiti ({favorites.length})
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;