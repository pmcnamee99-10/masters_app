# The Masters 2025 — Live Leaderboard

Mobile-first golf leaderboard webapp. Masters green/gold theme, built for iOS Safari, hosted off a local laptop via ngrok.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| Build tool | Vite 5 |
| Server (recommended) | Flask (Python) |
| Server (alternative) | `npx serve` (Node, no Python needed) |
| Mobile tunnel | ngrok |

---

## Prerequisites

### Node.js 18+ (required)
Download: https://nodejs.org/
Verify: `node --version` → should show v18 or higher

### Python 3.8+ (Flask hosting only)
Download: https://python.org/
Verify: `python --version`

### ngrok (for mobile/external access)
Download: https://ngrok.com/download
After installing, authenticate once:
```
ngrok config add-authtoken <your-token>
```
Your token is shown on the ngrok dashboard after signing up (free).

---

## Installation

```bash
# 1. Install Node dependencies
npm install

# 2. (Flask only) Create and activate a Python virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate

# Install Flask
pip install -r requirements.txt
```

---

## Development (hot reload)

```bash
npm run dev
```

Open `http://localhost:5173`. No Flask needed in dev mode — Vite handles it.

---

## Production Build

Compile the React app into static files:

```bash
npm run build
```

Output goes to `dist/`. This is what the server hosts.

---

## Deploy to Vercel (Recommended)

Vercel hosts the app for free, permanently, with HTTPS and a shareable URL. No server, no laptop, no ngrok needed.

### Prerequisites

Create a free account at https://vercel.com (sign up with GitHub — you'll need GitHub for the easiest flow).

---

### Option 1 — GitHub integration (best for ongoing updates)

Every time you push to GitHub, Vercel auto-rebuilds and redeploys. Share the URL once — it never changes.

**Step 1 — Push to GitHub**

Create a new repo at https://github.com/new (name it `masters-app`, set to Private if you prefer), then run:

```bash
git remote add origin https://github.com/<your-username>/masters-app.git
git push -u origin main
```

**Step 2 — Connect to Vercel**

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `masters-app` repo
4. Vercel auto-detects Vite — click **Deploy**

Done. You'll get a URL like `https://masters-app.vercel.app`.

To update the app later (e.g. add real scores):
```bash
git add .
git commit -m "update scores"
git push
```
Vercel rebuilds automatically within ~30 seconds.

---

### Option 2 — CLI deploy (fastest, no GitHub needed)

```bash
# Install Vercel CLI once
npm install -g vercel

# First deploy — follow the prompts (log in, confirm project name)
vercel

# All future deploys
npm run deploy
```

The first `vercel` command walks you through login and project setup interactively. After that, `npm run deploy` redeploys in one command.

---

### Sharing the URL

After deploying, copy the URL from the Vercel dashboard or terminal output and share it with your group. The URL is permanent and works on any device with no sign-in required.

> **PWA install on iPhone:** Open the URL in Safari → Share → Add to Home Screen. The app installs like a native app. Requires HTTPS — Vercel provides this automatically.

---

## Local Hosting Options

### Option A — Flask (recommended for old laptop)

Lightweight, ~50 MB RAM. Easy to extend later with a Python backend for live score scraping.

```bash
# Activate virtual environment first
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

npm run build
python server.py
```

App runs at: `http://localhost:5000`

---

### Option B — npx serve (no Python required)

```bash
npm run build
npm run serve:node
```

App runs at: `http://localhost:5000`

---

### Option C — Vite preview (simplest, dev-only)

```bash
npm run build
npm run preview
```

App runs at: `http://localhost:4173`

---

## Mobile Access via ngrok

ngrok tunnels your laptop server to a public HTTPS URL so any phone can access it — no shared Wi-Fi required.

**Step 1** — Start your local server (Option A, B, or C above)

**Step 2** — Open a new terminal window and run:

```bash
# For Flask or serve (port 5000):
ngrok http 5000

# For Vite preview (port 4173):
ngrok http 4173
```

**Step 3** — ngrok prints a URL like:
```
Forwarding  https://abc123.ngrok-free.app  →  http://localhost:5000
```

Open that URL on any phone browser.

> **Note:** The free ngrok URL changes each restart. Keep the same terminal session running to keep the URL stable.

---

## iOS Safari — Install as Home Screen App (PWA)

1. Open the ngrok URL in **Safari** (not Chrome or Firefox)
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down → tap **"Add to Home Screen"**
4. Name it **Masters** → tap **Add**

The app opens fullscreen with no browser UI, like a native app.
Requires iOS 16.4+ for full standalone PWA support.

---

## Project Structure

```
masters_app/
├── public/
│   ├── manifest.json          # PWA install config
│   └── icons/                 # App icons — add icon-192.png + icon-512.png here
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Masters branding header
│   │   ├── TournamentStatus.tsx  # Course name + last updated bar
│   │   ├── Leaderboard.tsx    # Full leaderboard table
│   │   └── PlayerRow.tsx      # Single player row with score colouring
│   ├── data/
│   │   └── mockData.ts        # Mock player data — replace with live feed
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces (Player, TournamentInfo)
│   ├── App.tsx                # Root component
│   ├── index.css              # Tailwind directives + iOS safe-area utilities
│   └── main.tsx               # React entry point
├── dist/                      # Built app (git-ignored, generated by npm run build)
├── server.py                  # Flask server (serves dist/)
├── index.html                 # HTML shell with PWA meta tags
├── vite.config.ts             # Vite config (host 0.0.0.0 for LAN access)
├── tailwind.config.js         # Masters colour theme
├── tsconfig.json
├── package.json
└── requirements.txt           # Python deps (Flask)
```

---

## Colour Theme

| Token | Hex | Used for |
|-------|-----|----------|
| `masters-green` | `#006747` | Header, table headers |
| `masters-green-dark` | `#004d35` | Subheader, hover |
| `masters-gold` | `#FFD700` | Title, badges, accents |
| `masters-cream` | `#f5f0e8` | Page background |
| `masters-off-white` | `#fafaf7` | Alternating table rows |

---

## Score Colour Coding

| Round score vs par | Colour | Meaning |
|-------------------|--------|---------|
| -2 or better | Gold | Eagle or better |
| -1 | Red | Birdie |
| E | Gray | Par |
| +1 | Blue | Bogey |
| +2 or more | Dark blue | Double bogey+ |

Total score column: red = under par, gray = even or over par.

---

## Adding Live Data

The app uses mock data in `src/data/mockData.ts`. To wire in real scores:

**1. Add a Flask API route in `server.py`:**
```python
import json

@app.route('/api/scores')
def scores():
    # fetch / scrape / read from file
    data = { "players": [...], "tournament": {...} }
    return app.response_class(
        response=json.dumps(data),
        mimetype='application/json'
    )
```

**2. Fetch it in `App.tsx`:**
```tsx
import { useEffect, useState } from 'react'
import { Player, TournamentInfo } from './types'

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [info, setInfo] = useState<TournamentInfo | null>(null)

  useEffect(() => {
    fetch('/api/scores')
      .then(r => r.json())
      .then(d => { setPlayers(d.players); setInfo(d.tournament) })
  }, [])

  if (!info) return <div>Loading...</div>
  // ...rest of render
}
```

---

## Running on an Old Laptop — Tips

- **RAM**: Flask + a static React build uses ~50–80 MB. Very laptop-friendly.
- **Keep server running (Windows)**: Minimise the terminal — don't close it. Or use:
  ```
  pythonw server.py
  ```
  `pythonw` runs Python without a terminal window (background process).
- **Auto-start on boot**: Open Task Scheduler → create a Basic Task → Action: Start a Program → `pythonw` → Arguments: `C:\path\to\masters_app\server.py`
- **ngrok session limits**: Free tier allows unlimited tunnels but sessions may disconnect after ~2 hours of inactivity. Keep a browser tab open to prevent idle timeout.
- **LAN-only option**: If your phone is on the same Wi-Fi as the laptop, skip ngrok and use your laptop's local IP:
  ```
  # Find your IP:
  ipconfig           # Windows
  # Look for "IPv4 Address" under your Wi-Fi adapter, e.g. 192.168.1.42
  ```
  Then open `http://192.168.1.42:5000` on your phone. No ngrok needed.

---

## npm Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `vite` | Dev server with hot reload (port 5173) |
| `npm run build` | `tsc -b && vite build` | Compile TypeScript + bundle for production |
| `npm run preview` | `vite preview` | Preview production build (port 4173) |
| `npm run serve:flask` | `python server.py` | Start Flask server (port 5000) |
| `npm run serve:node` | `npx serve dist` | Node static server, no Python (port 5000) |
| `npm run deploy` | `vercel --prod` | Deploy to Vercel (requires `npm install -g vercel`) |

---

## Node.js Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | DOM rendering |
| vite | ^5.4.11 | Build tool & dev server |
| @vitejs/plugin-react | ^4.3.4 | JSX + Fast Refresh |
| tailwindcss | ^3.4.15 | Utility CSS framework |
| postcss | ^8.4.47 | CSS processing pipeline |
| autoprefixer | ^10.4.20 | CSS vendor prefixes |
| typescript | ^5.6.3 | Type checking |
| @types/react | ^18.3.12 | React TypeScript definitions |
| @types/react-dom | ^18.3.1 | ReactDOM TypeScript definitions |

## Python Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| flask | >=3.0.0 | Lightweight web server |

---

## Troubleshooting

**`npm install` fails**
- Check Node version: `node --version` (needs 18+)
- Clear cache: `npm cache clean --force` then retry

**`npm run build` fails with TypeScript errors**
- Read the error output — it will point to the exact file and line
- Common cause: unused import or wrong type

**Flask server won't start — "dist not found"**
- Run `npm run build` first

**Port already in use**
- Windows: `netstat -aon | findstr :5000` → find the PID → `taskkill /PID <pid> /F`

**ngrok URL shows "Visit Site" warning on mobile**
- This is ngrok's free-tier interstitial. Tap "Visit Site" to proceed. Only appears on first load.

**PWA not installing on iPhone**
- Must use Safari (not Chrome)
- Must be on HTTPS (ngrok provides this — `http://` localhost won't work for PWA install)
- iOS 16.4+ required
