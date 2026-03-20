# App Innovators – Signatur Generator

Ein Web-Tool zur Erstellung CI-konformer E-Mail-Signaturen für App-Innovators.

---

## 🚀 Ziel

Erstellung von E-Mail-Signaturen, die:
- visuell der Corporate Identity entsprechen
- in Outlook und anderen Mailprogrammen korrekt funktionieren
- per Copy & Paste übernommen werden können

---

## 🧪 Demo

Eine vereinfachte Demo-Version befindet sich im Repository:

`DEMOindex.html`

Diese Version dient ausschließlich dazu, das Tool direkt im Browser zu testen:
- ohne Setup
- ohne Entwickler-Umgebung
- sofort klickbar über GitHub Pages

👉 Wichtig:  
Die Demo ist funktional korrekt, aber technisch vereinfacht und **nicht für die Weiterentwicklung gedacht**.

---

## 🧠 Produktive Version (für Entwickler)

Die eigentliche, weiterzuentwickelnde Version liegt hier:

`app/signature-generator.tsx`

Diese Version enthält:
- die vollständige Logik
- strukturierte Komponenten
- die Grundlage für eine produktive Integration

👉 Für die Weiterentwicklung und den finalen Einsatz sollte **ausschließlich diese Version verwendet werden**.

---

## 🧠 Technische Learnings

Wichtige Erkenntnisse aus der Entwicklung:

- Base64-Bilder funktionieren nicht zuverlässig in Outlook
- Lokale Bildpfade funktionieren nicht
- SVG wird in Outlook oft nicht korrekt dargestellt
- **Nur öffentlich erreichbare PNG-URLs funktionieren stabil**

Daher werden alle Assets über GitHub Pages bereitgestellt:

https://tim-app-innovators.github.io/app-innovators-signature-generator/assets/

- assets/ → Icons und Logo (öffentlich erreichbar)
- demoindex.html → klickbare Demo für Stakeholder
- app/ → eigentliche Generator-Logik (React)

---

## 🧩 Funktionsweise

1. Nutzer gibt Name, Position, Telefonnummer und E-Mail ein
2. Live Preview wird aktualisiert
3. HTML-Signatur wird generiert
4. Signatur wird in die Zwischenablage kopiert
5. Nutzer fügt sie in sein Mailprogramm ein

---

## ⚠️ Hinweis zur Nutzung

Nach dem Einfügen sollte die Signatur kurz geprüft werden:
- Darstellung
- Links
- Zeilenumbrüche

---

## 🔄 Nächste Schritte (für interne Weiterentwicklung)

Für einen produktiven Einsatz wird empfohlen:

- Migration des Repositories in das App-Inventors-GitHub
- Hosting der Assets über Firmen-Infrastruktur (z. B. CDN oder Webserver)
- Anpassung der Asset-URLs im Code
- Integration der React-Version in bestehende Systeme oder Deployment als internes Tool

---

## 👤 Autor

Prototyp entwickelt von  
Tim Weisheit
