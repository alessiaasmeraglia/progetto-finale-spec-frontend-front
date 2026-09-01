import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>

                <NavLink to="/shoes">Scarpette</NavLink>

                <NavLink to="/compare">Confronta</NavLink>

                <NavLink to="/favorites">Preferiti</NavLink>
            </nav>
        </header>
    );
}

export default Header;