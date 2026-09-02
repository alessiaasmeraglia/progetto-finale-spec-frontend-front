import { Link } from "react-router-dom";

function HomePage() {
    return (
        <section className="container py-5">
            <div className="row align-items-center g-5">
                <div className="col-12 col-lg-7">
                    <span className="badge text-bg-light border mb-3">
                        Climbing shoes comparator
                    </span>

                    <h1 className="display-4 fw-bold mb-3">
                        Trova la scarpetta giusta per il tuo stile di arrampicata
                    </h1>

                    <p className="lead text-body-secondary mb-4">
                        Cerca, filtra, salva i preferiti e confronta le caratteristiche
                        delle scarpette da arrampicata in modo semplice e veloce.
                    </p>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                        <Link to="/shoes" className="btn btn-primary btn-lg">
                            <i className="bi bi-search me-2"></i>
                            Esplora le scarpette
                        </Link>

                        <Link to="/compare" className="btn btn-outline-dark btn-lg">
                            <i className="bi bi-arrow-left-right me-2"></i>
                            Vai al confronto
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="border rounded-4 p-4 bg-body-tertiary">
                        <h2 className="h4 mb-4">
                            Cosa puoi fare
                        </h2>

                        <div className="d-flex gap-3 mb-4">
                            <i className="bi bi-search fs-3"></i>

                            <div>
                                <h3 className="h6 mb-1">
                                    Cerca e filtra
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Trova rapidamente i modelli più adatti alle tue esigenze.
                                </p>
                            </div>
                        </div>

                        <div className="d-flex gap-3 mb-4">
                            <i className="bi bi-heart fs-3"></i>

                            <div>
                                <h3 className="h6 mb-1">
                                    Salva i preferiti
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Conserva i modelli che ti interessano anche dopo il refresh.
                                </p>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <i className="bi bi-arrow-left-right fs-3"></i>

                            <div>
                                <h3 className="h6 mb-1">
                                    Confronta
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Metti due scarpette fianco a fianco e confrontane le
                                    caratteristiche principali.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;