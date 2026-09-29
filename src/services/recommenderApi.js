const API_URL = import.meta.env.VITE_RECOMMENDER_API_URL;

export async function sendRecommendationMessage(
    message,
    conversationId = null
) {
    const response = await fetch(
        `${API_URL}/api/chat/recommend`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
                conversationId
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            "Errore durante la comunicazione con ClimbCompare Recommender"
        );
    }

    return response.json();
}