import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    function toggleFavorite(shoe) {
        const isFavorite = favorites.some(
            (favorite) => favorite.id === shoe.id
        );

        if (isFavorite) {
            setFavorites(
                favorites.filter((favorite) => favorite.id !== shoe.id)
            );
        } else {
            setFavorites([...favorites, shoe]);
        }
    }

    function isFavorite(id) {
        return favorites.some((favorite) => favorite.id === id);
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}