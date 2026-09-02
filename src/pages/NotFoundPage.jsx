import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="container py-5">
            <div className="text-center py-5">
                <div className="display-1 fw-bold mb-3">
                    404
                </div>

                <h1 className="h3 mb-3">
                    Pagina non trovata
                </h1>

                <p className="text-body-secondary mb-4">
                    La pagina che stai cercando non esiste oppure è stata spostata.
                </p>

                <Link to="/" className="btn btn-primary">
                    <i className="bi bi-house me-2"></i>
                    Torna alla Home
                </Link>
            </div>
        </section>
    );
}

export default NotFoundPage;