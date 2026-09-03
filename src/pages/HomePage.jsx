import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <section className="container py-5">
                <div className="row align-items-center g-5">
                    <div className="col-12 col-lg-6">
                        <span className="badge text-bg-light border mb-3">
                            Climbing shoes comparator
                        </span>

                        <h1 className="display-4 fw-bold mb-3">
                            Trova la scarpetta giusta per il tuo stile di arrampicata
                        </h1>

                        <p className="lead text-body-secondary mb-4">
                            Cerca, filtra e confronta modelli diversi per scegliere la
                            scarpetta più adatta alle tue esigenze.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
                            <Link to="/shoes" className="btn btn-primary btn-lg">
                                <i className="bi bi-search me-2"></i>
                                Esplora le scarpette
                            </Link>

                            <Link to="/compare" className="btn btn-outline-dark btn-lg">
                                <i className="bi bi-arrow-left-right me-2"></i>
                                Confronta modelli
                            </Link>
                        </div>

                        <div className="d-flex flex-wrap gap-4">
                            <div>
                                <div className="h4 fw-bold mb-0">10+</div>
                                <small className="text-body-secondary">Modelli</small>
                            </div>

                            <div>
                                <div className="h4 fw-bold mb-0">4</div>
                                <small className="text-body-secondary">Categorie</small>
                            </div>

                            <div>
                                <div className="h4 fw-bold mb-0">2</div>
                                <small className="text-body-secondary">
                                    Modelli confrontabili
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="border rounded-4 bg-body-tertiary p-4 p-lg-5 text-center">
                            <img
                                src="/img/shoes/LaSportivaSkwama.jpg"
                                alt="La Sportiva Skwama"
                                className="img-fluid home-hero-shoe"
                            />

                            <h2 className="h4 mt-4 mb-3">
                                Scegli in base a ciò che conta davvero
                            </h2>

                            <p className="text-body-secondary mb-0">
                                Prezzo, rigidità, profilo, livello, chiusura e utilizzo ideale:
                                tutte le caratteristiche principali in un unico confronto.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-body-tertiary border-top border-bottom">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Tutto quello che ti serve per scegliere
                        </h2>

                        <p className="text-body-secondary mb-0">
                            Un percorso semplice dalla ricerca alla scelta finale.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="bg-body border rounded-4 p-4 h-100">
                                <i className="bi bi-search fs-2"></i>

                                <h3 className="h5 mt-3">
                                    Cerca e filtra
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Cerca per nome, filtra per categoria e ordina i risultati
                                    per trovare rapidamente i modelli che ti interessano.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="bg-body border rounded-4 p-4 h-100">
                                <i className="bi bi-heart fs-2"></i>

                                <h3 className="h5 mt-3">
                                    Salva i preferiti
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Conserva le scarpette che ti interessano e ritrovale anche
                                    dopo aver ricaricato la pagina.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="bg-body border rounded-4 p-4 h-100">
                                <i className="bi bi-arrow-left-right fs-2"></i>

                                <h3 className="h5 mt-3">
                                    Confronta
                                </h3>

                                <p className="text-body-secondary mb-0">
                                    Metti due modelli fianco a fianco e confronta le
                                    caratteristiche principali in modo immediato.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container py-5">
                <div className="border rounded-4 p-4 p-md-5 text-center">
                    <i className="bi bi-compass fs-1"></i>

                    <h2 className="fw-bold mt-3">
                        Trova il modello più adatto a te
                    </h2>

                    <p className="text-body-secondary mb-4">
                        Esplora il catalogo e inizia a confrontare le scarpette.
                    </p>

                    <Link to="/shoes" className="btn btn-primary btn-lg">
                        Vai al catalogo
                    </Link>
                </div>
            </section>
        </>
    );
}

export default HomePage;