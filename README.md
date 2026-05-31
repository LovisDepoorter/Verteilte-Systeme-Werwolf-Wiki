# 🐺 Werwölfe von Düsterwald Wiki

Ein Wiki-Projekt für das Kartenspiel "Werwölfe von Düsterwald", entwickelt im Rahmen der Vorlesung **Verteilte Systeme** an der DHBW.

Die Anwendung ist erreichbar unter: **[werwolf-wiki.de](http://werwolf-wiki.de)**

---

## Architektur

```
Internet
  → werwolf-wiki.de (Domain via IONOS)
  → Strato VPS (Nginx Reverse Proxy)
  → WireGuard Tunnel (VPN)
  → Heimlaptop (Spring Boot Backend + PostgreSQL)
```

Das System besteht aus zwei physisch getrennten Maschinen, die über einen verschlüsselten WireGuard-Tunnel verbunden sind. Der VPS übernimmt die Rolle des Reverse Proxys und leitet alle Anfragen an den Heimlaptop weiter, auf dem das eigentliche Backend und die Datenbank laufen.

---

## Projektstruktur

```
repo/
├── src/                        ← Angular Frontend (Angular 18)
│   └── app/
│       ├── components/         ← Login, Kartenübersicht, Kartendetail
│       ├── services/           ← AuthService, CardService
│       ├── models/             ← WerwolfCard Model
│       └── guards/             ← Auth Guard
├── werwolf-wiki/               ← Spring Boot Backend
│   └── src/main/java/com/werwolfwiki/
│       ├── controller/         ← ArtikelController, AuthController
│       ├── service/            ← ArtikelService
│       ├── repository/         ← ArtikelRepository
│       ├── model/              ← Artikel Entity
│       ├── security/           ← JWT Filter, SecurityConfig
│       └── dto/                ← LoginRequest, LoginResponse, ArtikelDTO
├── design-system/              ← Design System Dokumentation
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Technologie-Stack

### Frontend
- **Angular 18** – Standalone Components, Routing, Guards
- **TypeScript** – Typsicheres JavaScript
- **CSS3** – Dark/Blood Theme mit CSS Variablen

### Backend
- **Java 21** – Programmiersprache
- **Spring Boot 3.3** – Web Framework
- **Spring Security** – Authentifizierung & Autorisierung
- **JWT (JSON Web Token)** – Stateless Authentifizierung
- **Spring Data JPA / Hibernate** – Datenbankzugriff
- **PostgreSQL** – Relationale Datenbank
- **Swagger/OpenAPI** – API Dokumentation

### Infrastruktur
- **Docker & Docker Compose** – Containerisierung
- **Nginx** – Reverse Proxy
- **WireGuard** – VPN Tunnel zwischen VPS und Heimlaptop
- **Strato VPS** – Cloud Server als Reverse Proxy
- **IONOS** – Domain Provider

---

## Features

- Übersichtsseite mit allen Werwolf-Karten
- Suchfunktion nach Titel
- Filterung nach Kategorie (Werwolf, Dorfbewohner, Neutral)
- Detailseite pro Karte
- Passwortschutz (globales Passwort, JWT-basiert)
- REST API mit vollständigem CRUD
- Swagger UI unter `/swagger-ui.html`

---

## Erreichte Ziele

- ✅ Erreichbar per URL (`werwolf-wiki.de`)
- ✅ Übersichtsseite mit Kartenauswahl
- ✅ Detailseiten pro Karte
- ✅ Suchfunktion
- ✅ Passwortschutz über Backend (JWT)
- ✅ Spring Boot Backend
- ✅ PostgreSQL Datenbank
- ✅ Verteiltes System (VPS + Heimlaptop via WireGuard)
- ✅ Docker Compose Deployment
- ✅ Besonders gute UX/UI (Dark Theme, Animationen, Responsive)

---

## Lokale Entwicklung

### Voraussetzungen
- Node.js 20+
- Java 21
- Docker & Docker Compose

### Frontend starten
```bash
npm install
npm start
```
Frontend läuft unter `http://localhost:4200`

### Backend starten
```bash
cd werwolf-wiki
docker compose up -d
```
Backend läuft unter `http://localhost:8080`
Swagger UI: `http://localhost:8080/swagger-ui.html`

---

## API Endpunkte

| Methode | URL | Beschreibung | Auth |
|---------|-----|--------------|------|
| POST | `/api/auth/login` | Login, gibt JWT Token zurück | Nein |
| GET | `/api/artikel` | Alle Artikel abrufen | JWT |
| GET | `/api/artikel/{id}` | Artikel nach ID | JWT |
| GET | `/api/artikel/suche?q=Begriff` | Artikel suchen | JWT |
| GET | `/api/artikel/kategorie/{kat}` | Nach Kategorie filtern | JWT |
| POST | `/api/artikel` | Neuen Artikel erstellen | JWT |
| PUT | `/api/artikel/{id}` | Artikel bearbeiten | JWT |
| DELETE | `/api/artikel/{id}` | Artikel löschen | JWT |

---

## Authentifizierung

Die Wiki-Seite ist durch ein globales Passwort geschützt. Nach erfolgreichem Login gibt das Backend einen **JWT Token** zurück, der bei allen weiteren API-Anfragen im `Authorization: Bearer <token>` Header mitgeschickt wird. Der Token ist 24 Stunden gültig.

---

## Entwickelt von Leonhard Zeller und Lovis Depoorter

Entwickelt im Rahmen des Kurses **Verteilte Systeme** an der DHBW.
