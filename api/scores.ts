// Vercel serverless function — proxies paid golf APIs to the frontend.
// Runs on Vercel's servers, so API keys never reach the browser.
//
// Set these in your Vercel dashboard under Project → Settings → Environment Variables:
//   SCORES_API_PROVIDER  →  'sportradar' | 'apisports' | 'rapidapi'
//   SCORES_API_KEY       →  your API key
//
// The function normalises each provider's response into the LiveScore[] shape
// that the frontend expects (defined in src/types/index.ts).

import type { VercelRequest, VercelResponse } from '@vercel/node'

// ── Provider adapters ─────────────────────────────────────────────────────────

// SportsRadar Golf API
// Docs:  https://developer.sportradar.com/golf
// Cost:  Trial free (1000 calls), paid plans from ~$150/month
// Note:  Most accurate real-time data. Rate limit on trial.
async function fetchSportsRadar(key: string) {
  const url = `https://api.sportradar.com/golf/trial/v3/en/tournaments/masters-tournament-2025/leaderboard.json?api_key=${key}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`SportsRadar ${res.status}`)
  const data = await res.json()

  // SportsRadar leaderboard shape (verify with their docs for your plan version):
  // data.leaderboard.players[] → { first_name, last_name, position, score, strokes, rounds[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.leaderboard?.players ?? []).map((p: any) => ({
    name:            `${p.first_name} ${p.last_name}`,
    positionDisplay: String(p.tied ? `T${p.position}` : p.position),
    total:           p.score ?? 0,
    today:           p.rounds?.at(-1)?.score ?? null,
    thru:            p.thru === 18 ? 'F' : String(p.thru ?? '-'),
    r1:              p.rounds?.[0]?.strokes ?? null,
    r2:              p.rounds?.[1]?.strokes ?? null,
    r3:              p.rounds?.[2]?.strokes ?? null,
    r4:              p.rounds?.[3]?.strokes ?? null,
    madeCut:         p.status !== 'cut' && p.status !== 'wd',
  }))
}

// API-Sports Golf API (via RapidAPI)
// Docs:  https://rapidapi.com/api-sports/api/golf-leaderboards/
// Cost:  Free tier 10 req/day, paid from ~$10/month
async function fetchApiSports(key: string) {
  const url = 'https://golf-leaderboards1.p.rapidapi.com/leaderboard?tournamentId=401353233'
  const res = await fetch(url, {
    headers: { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': 'golf-leaderboards1.p.rapidapi.com' },
  })
  if (!res.ok) throw new Error(`API-Sports ${res.status}`)
  const data = await res.json()

  // Adjust field names to match the actual response from your RapidAPI plan
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results ?? []).map((p: any) => ({
    name:            p.playerName,
    positionDisplay: p.position,
    total:           p.totalScore ?? 0,
    today:           p.todayScore ?? null,
    thru:            p.thru ?? '-',
    r1:              p.r1 ?? null,
    r2:              p.r2 ?? null,
    r3:              p.r3 ?? null,
    r4:              p.r4 ?? null,
    madeCut:         p.madeCut !== false,
  }))
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const provider = process.env.SCORES_API_PROVIDER
  const key      = process.env.SCORES_API_KEY

  if (!provider || !key) {
    return res.status(500).json({ error: 'SCORES_API_PROVIDER and SCORES_API_KEY must be set in Vercel env vars' })
  }

  try {
    let scores
    if (provider === 'sportradar')  scores = await fetchSportsRadar(key)
    else if (provider === 'apisports') scores = await fetchApiSports(key)
    else return res.status(400).json({ error: `Unknown provider: ${provider}` })

    // Cache for 60 seconds so rapid page loads don't burn API quota
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    return res.status(200).json(scores)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return res.status(502).json({ error: msg })
  }
}
