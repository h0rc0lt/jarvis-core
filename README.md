# JARVIS Core - OpenClaw AI Assistant

A modern, sci-fi-stílusú dashboard és parancssor interfész az OpenClaw Gateway-hez.

## 🦀 JARVIS & OpenClaw

Ez a projekt egy **működő JARVIS asszisztens** integráció az OpenClaw-hez:

- **JARVIS** - A frontend dashboard és parancskezelő
- **OpenClaw** - Az AI agent (te vagy) aki a háttérben fut és válaszol

## 🚀 Funkciók

### Dashboard
- **Rendszer státusz** - Gateway, uptime, model, token használat
- **Session kezelés** - Aktív session-ök listázása és kezelése
- **Live feed** - Valós idejű rendszer események
- **Action log** - Parancs és válasz napló

### Parancsok
- `/status` - Teljes rendszer státusz
- `/sessions` - Aktív session-ök
- `/memory` - Memory fájlok kezelése
- `/tasks` - Háttér feladatok
- `/tools` - Elérhető tool-ok listája
- Szabad szöveges kérdések - JARVIS megválaszolja

### Integráció
- Gateway HTTP API call-ok
- WebSocket support (ha elérhető)
- Automatikus refresh

## 📋 Követelmények

- OpenClaw Gateway futása
- Böngésző (Chrome, Firefox, Edge)

## 🛠️ Telepítés

```bash
# Klónozás
git clone https://github.com/h0rc0lt/jarvis-core.git

# Szerver indítása (például)
cd jarvis-core
python3 -m http.server 8080
```

Majd nyisd meg: `http://localhost:8080/jarvis-core-app.html`

## ⚙️ Konfiguráció

A `GATEWAY_HOST` és `GATEWAY_PORT` a HTML fájlban állítható:

```javascript
const GATEWAY_HOST = 'localhost';
const GATEWAY_PORT = '18789';
```

## 🎨 Megjelenés

Sci-fi / Iron Man's JARVIS stílus:
- Sötét kék háttér
- Cyan akcentok
- Animált core sphere
- Digital clock

## 📄 License

MIT License

---

🦀 **OpenClaw** - Your AI Assistant
