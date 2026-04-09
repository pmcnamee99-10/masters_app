import { LiveScore } from '../types'

// ── ESPN unofficial API ───────────────────────────────────────────────────────
// Free, no key required. Tournament ID 401811941 = The Masters 2026.
// Pinned to this ID so it always fetches Masters data, not just the current tour event.
const ESPN_URL = 'https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?tournamentId=401811941'

const PROXY_URL = '/api/scores'

// ── Parsers ───────────────────────────────────────────────────────────────────

// Round score: "66" → 66, "--" / "-" / null → null
function parseRound(val: string | number | undefined | null): number | null {
  if (val === null || val === undefined || val === '--' || val === '-') return null
  if (typeof val === 'number') return isNaN(val) ? null : val
  const n = parseInt(val, 10)
  return isNaN(n) ? null : n
}

// Score vs par: "-13" → -13, "E" → 0, "+" → 0
function parseToPar(val: string | number | undefined | null): number {
  if (val === null || val === undefined || val === '--' || val === '-') return 0
  if (typeof val === 'number') return isNaN(val) ? 0 : val
  if (val === 'E') return 0
  const n = parseInt(val, 10)
  return isNaN(n) ? 0 : n
}

// ── Country flag lookup ───────────────────────────────────────────────────────
const COUNTRY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸', 'Northern Ireland': '🇬🇧', 'Ireland': '🇮🇪',
  'England': '🇬🇧', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Spain': '🇪🇸', 'Norway': '🇳🇴', 'Japan': '🇯🇵', 'South Korea': '🇰🇷',
  'Australia': '🇦🇺', 'Sweden': '🇸🇪', 'Germany': '🇩🇪', 'South Africa': '🇿🇦',
  'Canada': '🇨🇦', 'Argentina': '🇦🇷', 'France': '🇫🇷', 'Belgium': '🇧🇪',
  'Denmark': '🇩🇰', 'Austria': '🇦🇹', 'China': '🇨🇳', 'Thailand': '🇹🇭',
  'Fiji': '🇫🇯', 'Italy': '🇮🇹', 'Chile': '🇨🇱', 'Colombia': '🇨🇴',
  'Venezuela': '🇻🇪', 'New Zealand': '🇳🇿', 'Zimbabwe': '🇿🇼',
}

// ── ESPN adapter ──────────────────────────────────────────────────────────────
// Actual response shape (confirmed against live 2026 API):
//   competitor.athlete.displayName       — player name
//   competitor.score.displayValue        — total score vs par ("-13", "E", "-")
//   competitor.status.position.displayName — position ("1", "T3", "MC", "-")
//   competitor.status.thru               — holes played (number) or 0 if not started
//   competitor.status.type.name          — "STATUS_SCHEDULED" | "STATUS_IN_PROGRESS" | "STATUS_FINISHED"
//   competitor.linescores[]              — one per round, { period: 1|2|3|4, value: "66" | "--" }
//   competitor.statistics[0]             — { name: "scoreToPar", value: -13, displayValue: "-13" }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptEspnCompetitor(c: any): LiveScore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ls = (c.linescores ?? []) as any[]

  // Linescores use period (1–4) as the round index; value is the raw score string
  const byRound = (n: number) => {
    const entry = ls.find((l: any) => l.period === n)
    return entry?.value ?? null
  }

  const r1 = parseRound(byRound(1))
  const r2 = parseRound(byRound(2))
  const r3 = parseRound(byRound(3))
  const r4 = parseRound(byRound(4))

  // Total vs par — prefer statistics[scoreToPar].value (number), fall back to score.displayValue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scoreToParStat = (c.statistics ?? []).find((s: any) => s.name === 'scoreToPar')
  const total = scoreToParStat?.value !== undefined
    ? parseToPar(scoreToParStat.value)
    : parseToPar(c.score?.displayValue)

  // Thru: 0 = not started, 18 = finished, otherwise holes completed
  const thruRaw = c.status?.thru as number | undefined
  const statusName = c.status?.type?.name as string | undefined
  const thru = statusName === 'STATUS_FINISHED' || thruRaw === 18
    ? 'F'
    : !thruRaw || thruRaw === 0
      ? '-'
      : String(thruRaw)

  const posDisplay = (c.status?.position?.displayName ?? '-') as string
  const madeCut = !['MC', 'WD', 'DQ', 'CUT'].includes(posDisplay)

  // Today's score: derive from most recent completed round vs par 72
  // ESPN doesn't expose a direct todayScore field in this endpoint
  const currentRound = c.status?.period as number | undefined
  let today: number | null = null
  if (currentRound && currentRound >= 1) {
    const currentScore = parseRound(byRound(currentRound))
    if (currentScore !== null) today = currentScore - 72
  }

  const countryName = (c.athlete?.flag?.alt ?? '') as string

  return {
    name: (c.athlete?.displayName ?? 'Unknown') as string,
    country: countryName,
    flag: COUNTRY_FLAGS[countryName] ?? '🏳️',
    positionDisplay: posDisplay,
    total,
    today,
    thru,
    r1, r2, r3, r4,
    madeCut,
  }
}

export async function fetchEspnScores(): Promise<LiveScore[]> {
  const res = await fetch(ESPN_URL)
  if (!res.ok) throw new Error(`ESPN API ${res.status}: ${res.statusText}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await res.json() as any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const competitors: any[] = data.events?.[0]?.competitions?.[0]?.competitors ?? []
  if (competitors.length === 0) throw new Error('ESPN returned no competitors')

  return competitors.map(adaptEspnCompetitor)
}

// ── Vercel proxy (for paid APIs if ever needed) ───────────────────────────────
export async function fetchProxyScores(): Promise<LiveScore[]> {
  const res = await fetch(PROXY_URL)
  if (!res.ok) throw new Error(`Proxy API ${res.status}: ${res.statusText}`)
  return res.json() as Promise<LiveScore[]>
}

export type ApiProvider = 'espn' | 'api'

export async function fetchLiveScores(provider: ApiProvider): Promise<LiveScore[]> {
  if (provider === 'espn') return fetchEspnScores()
  return fetchProxyScores()
}
