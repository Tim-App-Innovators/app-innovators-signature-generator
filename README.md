# App Innovators – Signatur Generator

Ein Web-Tool zur Erstellung CI-konformer E-Mail-Signaturen für App Innovators.

## 🚀 Ziel

Erstellung von E-Mail-Signaturen, die:
- visuell der Corporate Identity entsprechen
- in Outlook und anderen Mailprogrammen korrekt funktionieren
- per Copy & Paste übernommen werden können

---

## 🧪 Aktueller Status

- ✅ Generator-Logik implementiert
- ✅ Live Preview vorhanden
- ✅ Copy-to-Clipboard funktioniert
- ✅ Outlook-Kompatibilität sichergestellt
- ✅ Icons und Logo über öffentliche URLs eingebunden (GitHub Pages)

---

## 🧠 Technische Learnings

Wichtige Erkenntnisse aus der Entwicklung:

- Base64-Bilder funktionieren nicht zuverlässig in Outlook
- Lokale Bildpfade funktionieren nicht
- SVG wird in Outlook oft nicht korrekt dargestellt
- **Nur öffentlich erreichbare PNG-URLs funktionieren stabil**

Daher werden alle Assets über GitHub Pages bereitgestellt:

https://tim-app-innovators.github.io/app-innovators-signature-generator/assets/

---

## 📁 Projektstruktur
assets/ → Icons und Logo (öffentlich erreichbar über GitHub Pages)
app/ → Generator-Code (React-Komponente)

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

- Migration des Repositories in das Firmen-GitHub
- Hosting der Assets über Firmen-Infrastruktur (z. B. CDN oder Webserver)
- Anpassung der Asset-URLs im Code
- Optional: Deployment auf Firmen-Domain

---

## 👤 Autor

Prototyp entwickelt von Tim Weisheit
