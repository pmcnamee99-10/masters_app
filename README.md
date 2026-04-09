# The Masters 2026 — Fantasy Leaderboard

Live fantasy golf leaderboard for the 2026 Masters Tournament. Pulls real-time scores from ESPN's API, calculates fantasy standings for 27 participants (7 picks each, tier-based draft), and displays a full golfer leaderboard. Built for iOS Safari, deployed on Vercel.

---

## What It Does

- **Fantasy Leaderboard** — 27 participants ranked by the sum of their 7 golfers' scores relative to par. Expandable rows show each pick with tier badge, position, score, and round-by-round breakdown.
- **Full Golfer Leaderboard** — All ~96 Masters competitors sorted by score (active players above not-yet-started), with cut line indicator.
- **Live Scores** — ESPN unofficial API, polled every 3 minutes. No API key required.
- **Round Status Badge** — Header shows countdown to next round, "In Progress" during play, or "Tournament Complete".
- **Coming Soon Screen** — Auto-shown before R1 tee time (April 9, 07:30 ET). Switches to live app automatically.
- **PWA** — Installable on iPhone via Safari → Add to Home Screen.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| Build tool | Vite 5 |
| Hosting | Vercel (free tier) |
| Live scores | ESPN unofficial API (no key) |

---

## Prerequisites

**Node.js 18+**
Download: https://nodejs.org/
Verify: `node --version` → should show v18 or higher

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev
```

Open `http://localhost:5173`.

---

## Environment Variables

| Variable | Values | Purpose |
|----------|--------|---------|
| `VITE_APP_MODE` | `live` / `coming-soon` | Force a specific mode (overrides date-based auto-detection) |
| `VITE_API_PROVIDER` | `espn` / `mock` | Use ESPN live data or mock data |

**`.env.local`** — local development settings (not committed):
```
VITE_APP_MODE=live
VITE_API_PROVIDER=espn
```

**`.env.production`** — Vercel production settings (committed):
```
VITE_APP_MODE=live
VITE_API_PROVIDER=espn
```

If `VITE_APP_MODE` is not set, the app auto-detects: shows "Coming Soon" before R1 tee time, "Live" after.

---

## Deploying to Vercel

The app is connected to GitHub. Every push to `main` triggers an automatic redeploy (~30 seconds).

```bash
git add .
git commit -m "your message"
git push
```

For a manual one-off deploy:
```bash
npm run deploy
```

---

## App Modes

| Mode | When | What shows |
|------|------|-----------|
| `coming-soon` | Before April 9 07:30 ET | Countdown screen with competition details |
| `live` | During/after tournament | Fantasy leaderboard + golfer leaderboard tabs |

---

## Project Structure

```
masters_app/
├── public/
│   └── manifest.json            # PWA install config
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Masters branding + round status badge
│   │   ├── ComingSoon.tsx       # Pre-tournament countdown screen
│   │   ├── FantasyLeaderboard.tsx  # Fantasy standings table
│   │   ├── ParticipantRow.tsx   # Expandable participant row with picks
│   │   ├── Leaderboard.tsx      # Full golfer leaderboard
│   │   └── PlayerRow.tsx        # Single golfer row
│   ├── data/
│   │   └── mockData.ts          # Participant roster, pick assignments, score aggregation
│   ├── hooks/
│   │   └── useScores.ts         # ESPN fetch + name matching + score patching
│   ├── services/
│   │   └── scoresApi.ts         # ESPN API adapter (parses linescores, positions)
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── tournamentPhase.ts   # Round schedule + phase detection + countdown formatter
│   ├── App.tsx                  # Root component, tab routing, mode detection
│   ├── index.css                # Tailwind directives + iOS safe-area utilities
│   └── main.tsx                 # React entry point
├── .env.production              # Vercel env vars (committed)
├── vercel.json                  # SPA rewrite rule
├── index.html                   # HTML shell with PWA meta tags
├── vite.config.ts
├── tailwind.config.js           # Masters colour tokens
└── package.json
```

---

## Updating Participant Picks

All picks live in `src/data/mockData.ts` in the `rawParticipants` array.

Each participant has:
```ts
{
  id: 1,
  name: 'Participant Name',
  flag: '🇮🇪',
  pickIds: [T1_id, T2_id, T3_id, T4_id, T5_id, T6_id, WC_id]
}
```

`pickIds` order is **T1, T2, T3, T4, T5, T6, Wildcard** — each value is the ESPN athlete ID from the `PLAYERS` array at the top of the same file.

---

## Tier Structure

| Tier | Label | Colour | Description |
|------|-------|--------|-------------|
| 1 | T1 | Gold | Elite (world top ~6) |
| 2 | T2 | Dark green | Strong contenders |
| 3 | T3 | Deeper green | Mid-tier |
| 4 | T4 | Teal | Value picks |
| 5 | T5 | Slate | Longshots |
| 6 | T6 | Dark slate | Outsiders |
| 7 | WC | Purple | Wildcard |

---

## Live Score API

Scores are fetched from ESPN's unofficial API:
```
https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?tournamentId=401811941
```

- No API key required
- Polled every 3 minutes (`useScores.ts`)
- Name matching uses NFD normalisation to handle accented characters (e.g. "Ludvig Åberg" → "Ludvig Aberg")
- Known name variants handled via `NAME_ALIASES` map in `useScores.ts`

---

## Pick Analysis Page

Hidden page at `/#analysis` — not linked from the main UI. Shows optimal pick combinations based on current scores. For internal use during pick selection period.

---

## Design Tokens

| Token | Hex | Used for |
|-------|-----|---------|
| `masters-green` | `#006747` | Header, table headers |
| `masters-green-dark` | `#004d35` | Subheader rows |
| `masters-gold` | `#FFD700` | Title, badges, T1 tier |
| `masters-cream` | `#f5f0e8` | Page background |
| `masters-off-white` | `#fafaf7` | Alternating table rows |

---

## Score Colour Coding

| Score vs par | Colour |
|-------------|--------|
| -2 or better (eagle+) | Gold |
| -1 (birdie) | Red |
| E (par) | Gray |
| +1 (bogey) | Blue |
| +2+ (double+) | Dark blue bold |

---

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with hot reload (port 5173) |
| `npm run build` | TypeScript compile + Vite bundle |
| `npm run preview` | Preview production build locally (port 4173) |
| `npm run deploy` | Deploy to Vercel production |

---

## Troubleshooting

**Scores not updating**
- Check browser console for fetch errors
- ESPN API has no uptime guarantee — if it's down, the last cached scores remain displayed

**Wrong player matched**
- Add an entry to `NAME_ALIASES` in `src/hooks/useScores.ts`:
  ```ts
  'ESPN Name As Displayed': 'Roster Name In mockData'
  ```

**Build fails with TypeScript errors**
- Run `npm run build` locally and read the error — it points to the exact file and line
- Common cause: unused import or mismatched type after editing `mockData.ts`

**Vercel not updating after push**
- Check the Vercel dashboard for build logs — a TypeScript error will block the deploy
- Fix locally, confirm `npm run build` passes, then push again

**PWA not installing on iPhone**
- Must use Safari (not Chrome or Firefox)
- Must be on HTTPS — Vercel provides this automatically
- iOS 16.4+ required for full standalone PWA support
