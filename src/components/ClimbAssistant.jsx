import { useState } from "react";
import { sendRecommendationMessage } from "../services/recommenderApi";
import "./ClimbAssistant.css";

function ClimbAssistant() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Ciao! 👋 Raccontami che tipo di arrampicata fai e ti aiuterò a trovare una scarpetta adatta a te."
        }
    ]);

    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const message = input.trim();

        if (!message || loading) {
            return;
        }

        setMessages((current) => [
            ...current,
            {
                role: "user",
                text: message
            }
        ]);

        setInput("");
        setLoading(true);

        try {
            const data = await sendRecommendationMessage(
                message,
                conversationId
            );

            if (data.conversationId) {
                setConversationId(data.conversationId);
            }

            if (data.status === "needs_more_information") {
                setMessages((current) => [
                    ...current,
                    {
                        role: "assistant",
                        text: data.question
                    }
                ]);
            }

            if (data.status === "complete") {
                setRecommendations(data.recommendations || []);

                setMessages((current) => [
                    ...current,
                    {
                        role: "assistant",
                        text: data.aiExplanation
                    }
                ]);
            }
        } catch (error) {
            console.error(error);

            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    text: "Si è verificato un errore. Riprova."
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="climb-assistant container py-5">
            <div className="text-center mb-4">
                <span className="assistant-badge">
                    AI Assistant
                </span>

                <h1 className="mt-3">
                    Trova la tua scarpetta
                </h1>

                <p className="text-muted">
                    Raccontami come arrampichi e ClimbCompare
                    confronterà i modelli disponibili per te.
                </p>
            </div>

            <div className="assistant-card">
                <div className="assistant-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`assistant-message ${
                                message.role === "user"
                                    ? "user-message"
                                    : "bot-message"
                            }`}
                        >
                            {message.text}
                        </div>
                    ))}

                    {loading && (
                        <div className="assistant-message bot-message">
                            Sto analizzando le tue preferenze...
                        </div>
                    )}
                </div>

                <form
                    className="assistant-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        placeholder="Es. Faccio boulder, livello 6B, ho il piede largo..."
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={loading || !input.trim()}
                    >
                        Invia
                    </button>
                </form>
            </div>

            {recommendations.length > 0 && (
                <div className="mt-5">
                    <h2 className="h3 mb-4">
                        Modelli consigliati
                    </h2>

                    <div className="row g-4">
                        {recommendations.map((shoe) => (
                            <div
                                key={shoe.id}
                                className="col-12 col-md-4"
                            >
                                <div className="card h-100 recommendation-card">
                                    <div className="card-body">
                                        <span className="text-muted small">
                                            {shoe.brand}
                                        </span>

                                        <h3 className="h5 mt-1">
                                            {shoe.name}
                                        </h3>

                                        <p>
                                            Compatibilità:{" "}
                                            <strong>
                                                {shoe.score}/100
                                            </strong>
                                        </p>

                                        <p className="small text-muted mb-0">
                                            {shoe.stiffness} ·{" "}
                                            {shoe.footWidth} ·{" "}
                                            €{shoe.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ClimbAssistant;