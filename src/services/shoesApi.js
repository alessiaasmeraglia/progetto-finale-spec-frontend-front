const API_URL = import.meta.env.VITE_API_URL;

export async function getShoes(search = "", category = "") {
    const response = await fetch(
        `${API_URL}/shoes?search=${search}&category=${category}`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero delle scarpette");
    }

    return response.json();
}

export async function getShoeById(id) {
    const response = await fetch(`${API_URL}/shoes/${id}`);

    if (!response.ok) {
        throw new Error("Errore nel recupero della scarpetta");
    }

    const data = await response.json();

    return data.shoe;
}