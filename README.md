# 🧗 ClimbCompare

ClimbCompare è una SPA sviluppata in React per esplorare e confrontare modelli di scarpette da arrampicata.

L’obiettivo del progetto è trasformare un catalogo tecnico in un’esperienza semplice e immediata, permettendo all’utente di cercare, filtrare, salvare e confrontare prodotti senza autenticazione.

---

## ✨ Overview

ClimbCompare nasce come progetto frontend focalizzato su:

- consultazione di una risorsa tramite API
- ricerca e filtro dei record
- confronto tra prodotti
- gestione dei preferiti
- persistenza dei dati lato client
- responsive design
- componentizzazione e separazione delle responsabilità

Il risultato è un’interfaccia pulita e responsive pensata per aiutare l’utente a scegliere tra diversi modelli di scarpette da arrampicata.

---

## 🎯 Funzionalità

### Catalogo

L’utente può:

- visualizzare tutti i modelli disponibili
- cercare per titolo
- filtrare per categoria
- ordinare per titolo A-Z / Z-A
- ordinare per categoria A-Z / Z-A
- resettare i filtri
- accedere alla pagina di dettaglio di ogni prodotto

La ricerca utilizza un debounce per evitare chiamate API non necessarie.

### Dettaglio prodotto

Ogni scarpetta ha una pagina dedicata con informazioni estese, tra cui:

- brand
- prezzo
- chiusura
- rigidità
- profilo
- livello
- utilizzo ideale
- descrizione
- immagine

Dalla pagina dettaglio è possibile aggiungere il prodotto ai preferiti o al comparatore.

### Preferiti

I prodotti possono essere aggiunti e rimossi dai preferiti in qualsiasi momento.

La lista viene salvata in `localStorage`, quindi resta disponibile anche dopo il refresh della pagina.

Il numero di preferiti è sempre visibile nella navbar.

### Comparatore

È possibile selezionare fino a due prodotti e confrontarli fianco a fianco.

Il confronto mostra:

- immagine
- categoria
- brand
- prezzo
- chiusura
- rigidità
- profilo
- livello
- utilizzo ideale

Anche il comparatore viene salvato in `localStorage`.

### Stati dell’interfaccia

Sono gestiti anche:

- loading
- errori API
- nessun risultato trovato
- preferiti vuoti
- comparatore vuoto
- comparatore con un solo elemento
- pagina 404

---

## 🛠️ Tech Stack

- React
- JavaScript
- Vite
- React Router DOM
- Bootstrap
- Bootstrap Icons
- Fetch API
- LocalStorage
- CSS

---

## 🧱 Architettura

La struttura del progetto separa logica, UI e accesso ai dati:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── ShoeCard.jsx
│   └── ShoeCard.css
│
├── contexts/
│   ├── FavoritesContext.jsx
│   └── CompareContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ShoesPage.jsx
│   ├── ShoeDetailsPage.jsx
│   ├── ComparePage.jsx
│   ├── FavoritesPage.jsx
│   └── NotFoundPage.jsx
│
├── services/
│   └── shoesApi.js
│
├── utils/
│   └── shoes.js
│
├── App.jsx
├── main.jsx
└── index.css
```

### Scelte architetturali

- `contexts/` gestisce lo stato globale di preferiti e comparatore
- `services/` centralizza le chiamate API
- `utils/` contiene funzioni pure come l’ordinamento
- `components/` contiene elementi riutilizzabili
- `pages/` contiene le viste associate alle rotte

È presente anche una piccola cache nel service per evitare richieste duplicate sui dettagli prodotto.

---

## 🗃️ Modello dati

La risorsa principale è `Shoe`.

```ts
export type Shoe = {
  title: string;
  category: string;
  brand: string;
  price: number;
  closure: string;
  stiffness: string;
  downturn: string;
  level: string;
  bestFor: string;
  description: string;
  image: string;
};
```

Il backend aggiunge automaticamente:

```text
id
createdAt
updatedAt
```

---

## 🔌 API

Il frontend utilizza:

```text
GET /shoes
GET /shoes/:id
```

La lista supporta anche:

```text
GET /shoes?search=...
GET /shoes?category=...
GET /shoes?search=...&category=...
```

La base URL viene configurata tramite variabile d’ambiente.

```env
VITE_API_URL=http://localhost:3001
```

---

## 📱 Responsive Design

L’interfaccia è realizzata con Bootstrap e si adatta ai principali breakpoint:

```text
Mobile  → 1 card per riga
Tablet  → 2 card per riga
Desktop → 3 card per riga
```

Anche la navbar e la tabella del comparatore sono responsive.

---

## 🖼️ Product Experience

Le card prodotto mostrano:

- immagine
- categoria
- titolo
- brand
- prezzo
- stato preferito
- stato confronto

La selezione di un prodotto nel comparatore viene evidenziata anche visivamente, così come la presenza nei preferiti.

---

## 🚀 Avvio del progetto

Installa le dipendenze:

```bash
pnpm install
```

Avvia il frontend:

```bash
pnpm run dev
```

Il frontend sarà disponibile normalmente su:

```text
http://localhost:5173
```

Il backend deve essere avviato separatamente su:

```text
http://localhost:3001
```

---

## 📦 Dati inclusi

Il progetto utilizza almeno 10 modelli di scarpette da arrampicata, tra cui:

- La Sportiva Skwama
- La Sportiva Solution Comp
- La Sportiva Theory
- Scarpa Drago
- Scarpa Instinct VS
- Scarpa Veloce
- Tenaya Oasi
- Tenaya Mastia
- Five Ten Hiangle
- Five Ten NIAD VCS

---

## 💡 Cosa ho approfondito con questo progetto

Questo progetto mi ha permesso di lavorare su:

- gestione dello stato globale con Context API
- persistenza con `localStorage`
- chiamate asincrone con Fetch API
- debounce della ricerca
- routing dinamico
- componentizzazione
- gestione degli stati vuoti
- responsive design con Bootstrap
- organizzazione del codice per responsabilità
- esperienza utente applicata a ricerca, confronto e preferiti

---

## 👩‍💻 Autrice

**Alessia Smeraglia**

Frontend project built with React and JavaScript.
