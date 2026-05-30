# 🐺 Werwolf Wiki

Ein umfassendes Wiki für das Werwolf-Spiel, entwickelt mit Angular. Diese Anwendung bietet eine übersichtliche Darstellung aller Werwolf-Karten mit detaillierten Informationen, Suchfunktion und benutzerfreundlichem UI.

Repository for a wiki like project for a lecture at the DHBW

## ✨ Features

- 📋 **Übersichtsseite** mit allen Werwolf-Karten
- 🔍 **Suchfunktion** zum Durchsuchen der Karten nach Namen, Rollen und Fähigkeiten
- 🏷️ **Filterung** nach Teams (Dorfbewohner, Werwölfe, Neutral, Liebende)
- 📱 **Detailseiten** für jede Karte mit:
  - Beschreibung der Rolle
  - Besondere Fähigkeiten
  - Aufwachreihenfolge in der Nacht
  - Interaktionen mit anderen Rollen
  - Tipps & Strategien
- 🎨 **Modernes, responsives Design** für optimale UX/UI
- 📱 **Mobile-First** Ansatz für alle Geräte

## 🚀 Installation & Start

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm (kommt mit Node.js)

### Schritt 1: Abhängigkeiten installieren

```bash
npm install
```

### Schritt 2: Entwicklungsserver starten

```bash
npm start
```

Die Anwendung ist nun unter `http://localhost:4200` erreichbar.

### Schritt 3: Production Build erstellen

```bash
npm run build
```

Die Build-Dateien befinden sich im Ordner `dist/werwolf-wiki`.

## 📁 Projektstruktur

```
src/
├── app/
│   ├── components/
│   │   ├── card-overview/         # Übersichtsseite
│   │   └── card-detail/           # Detailansicht
│   ├── models/
│   │   └── werwolf-card.model.ts  # Datenmodell
│   ├── services/
│   │   └── card.service.ts        # Datenservice
│   ├── app.component.ts           # Hauptkomponente
│   ├── app.routes.ts              # Routing
│   └── app.config.ts              # App-Konfiguration
├── index.html
├── main.ts
└── styles.css
```

## 🎮 Verwendung

### Hauptseite

Die Hauptseite zeigt alle verfügbaren Werwolf-Karten in einer Grid-Ansicht:
- Jede Karte zeigt Name, Team und eine Kurzbeschreibung
- Klicke auf "Details ansehen", um zur Detailseite zu gelangen

### Suchfunktion

Die Suchfunktion durchsucht:
- Kartennamen
- Rollenbeschreibungen
- Fähigkeiten
- Team-Zugehörigkeiten

### Filterung

Filtere Karten nach Teams:
- **Alle**: Zeigt alle Karten
- **Dorfbewohner**: Zeigt nur Dorfbewohner-Karten
- **Werwölfe**: Zeigt nur Werwolf-Karten
- **Neutral**: Zeigt neutrale Rollen
- **Liebende**: Zeigt Liebenden-bezogene Karten

### Detailansicht

Jede Karte hat eine dedizierte Detailseite mit:
- Großem Kartenbildbereich (Platzhalter)
- Vollständiger Beschreibung
- Liste der besonderen Fähigkeiten
- Aufwachreihenfolge (falls zutreffend)
- Interaktionen mit anderen Rollen
- Strategische Tipps

## 🎨 Design & UX

Das Design fokussiert sich auf:
- **Klare Hierarchie**: Wichtige Informationen sind sofort sichtbar
- **Farbcodierung**: Jedes Team hat eigene Farben (Werwölfe: Rot, Dorfbewohner: Grün, etc.)
- **Smooth Animations**: Sanfte Übergänge für bessere UX
- **Responsive Layout**: Optimiert für Desktop, Tablet und Mobile
- **Accessibility**: Kontrastreiche Farben und lesbare Schriftgrößen

## 🛠️ Technologie-Stack

- **Angular 18**: Moderne Web-Framework
- **TypeScript**: Typsicheres JavaScript
- **RxJS**: Reaktive Programmierung
- **Standalone Components**: Moderne Angular-Architektur
- **CSS3**: Modernes Styling mit Flexbox und Grid

## 📝 Verfügbare Karten

Aktuell sind folgende Karten implementiert:
- Werwolf
- Seherin
- Hexe
- Jäger
- Amor
- Leibwächter
- Einfacher Dorfbewohner
- Mädchen

Weitere Karten können einfach im `CardService` hinzugefügt werden.

## 🔒 Passwortschutz

Für den Produktionsbetrieb kann ein Passwortschutz implementiert werden:
1. HTTP Basic Auth über den Webserver (nginx/Apache)
2. Angular Guard für zusätzliche Sicherheit
3. Backend-Integration für robuste Authentifizierung

## 🌐 Deployment

### Lokales Netzwerk (mit Port Forwarding)

1. Build erstellen: `npm run build`
2. Dateien aus `dist/werwolf-wiki` auf Server kopieren
3. Webserver (z.B. nginx) konfigurieren
4. Port Forwarding im Router einrichten
5. Domain via freedns.afraid.org einrichten

### Beispiel nginx Konfiguration

```nginx
server {
    listen 80;
    server_name deine-domain.com;

    root /pfad/zu/dist/werwolf-wiki/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📄 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.

## 👤 Autor

Entwickelt im Rahmen des Kurses "Verteilte Systeme" an der DHBW

## 🤝 Beitragen

Weitere Karten können durch Erweiterung des `cards`-Arrays im `CardService` hinzugefügt werden
