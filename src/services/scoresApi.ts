import { LiveScore } from '../types'

// ── ESPN unofficial API ───────────────────────────────────────────────────────
// Free, no API key, works directly from the browser.
// Covers all PGA Tour events including The Masters during tournament week.
// Note: unofficial — ESPN can change the response shape without notice.
const ESPN_URL = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard'

// ── Vercel serverless proxy ───────────────────────────────────────────────────
// Used for paid APIs (SportsRadar, API-Sports, etc.) whose keys must stay
// server-side. The /api/scores endpoint in this repo proxies and normalises
// the paid API response before sending it back as LiveScore[].
const PROXY_URL = '/api/scores'

// ─────────────────────────────────────────────────────────────────────────────

const COUNTRY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'Northern Ireland': '🇬🇧',
  'Ireland': '🇮🇪',
  'England': '🇬🇧',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Spain': '🇪🇸',
  'Norway': '🇳🇴',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Australia': '🇦🇺',
  'Sweden': '🇸🇪',
  'Germany': '🇩🇪',
  'South Africa': '🇿🇦',
  'Canada': '🇨🇦',
  'Argentina': '🇦🇷',
  'France': '🇫🇷',
  'Belgium': '🇧🇪',
  'Denmark': '🇩🇰',
  'Austria': '🇦🇹',
  'China': '🇨🇳',
  'Thailand': '🇹🇭',
  'Fiji': '🇫🇯',
  'Italy': '🇮🇹',
}

function flagEmoji(country: string): string {
  return COUNTRY_FLAGS[country] ?? '🏳️'
}

// Parse a round score string like "66" or "--" into number | null
function parseRound(val: string | undefined | null): number | null {
  if (!val || val === '--' || val === 'E' || val === '-') return null
  const n = parseInt(val, 10)
  return isNaN(n) ? null : n
}

// Parse a score-vs-par string like "-13", "+2", "E" into a number
function parseToPar(val: string | undefined | null): number {
  if (!val || val === '--') return 0
  if (val === 'E') return 0
  const n = parseInt(val, 10)
  return isNaN(n) ? 0 : n
}

// ── ESPN adapter ──────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptEspnCompetitor(c: any): LiveScore {
  // ESPN linescores: array of { period: { number: 1|2|3|4 }, value: "66" }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ls = (c.linescores ?? []) as any[]
  const byRound = (n: number) => ls.find(l => l.period?.number === n)?.value as string | undefined

  const r1 = parseRound(byRound(1))
  const r2 = parseRound(byRound(2))
  const r3 = parseRound(byRound(3))
  const r4 = parseRound(byRound(4))

  const totalStr = c.score?.displayValue as string | undefined
  const total = parseToPar(totalStr)

  // thru: ESPN returns a number (holes played) or "F" for finished
  const thruRaw = c.status?.thru
  const thru = thruRaw === 18 ? 'F' : thruRaw === 0 ? '-' : String(thruRaw ?? '-')

  const posDisplay = (c.status?.position?.displayName ?? '-') as string
  const madeCut = !['MC', 'WD', 'DQ', 'CUT'].includes(posDisplay)

  // "today" score: ESPN may provide it; otherwise derive from active round vs par (72)
  const todayStr = c.status?.todayScore as string | undefined
  const today = todayStr ? parseToPar(todayStr) : null

  const countryName = (c.athlete?.flag?.alt ?? '') as string

  return {
    name: (c.athlete?.displayName ?? 'Unknown') as string,
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

  // ESPN wraps everything in events[0].competitions[0].competitors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const competitors: any[] = data.events?.[0]?.competitions?.[0]?.competitors ?? []
  if (competitors.length === 0) throw new Error('ESPN returned no competitors — tournament may not be live yet')

  return competitors.map(adaptEspnCompetitor)
}

// ── Vercel proxy (paid APIs) ──────────────────────────────────────────────────
export async function fetchProxyScores(): Promise<LiveScore[]> {
  const res = await fetch(PROXY_URL)
  if (!res.ok) throw new Error(`Proxy API ${res.status}: ${res.statusText}`)
  return res.json() as Promise<LiveScore[]>
}

// ── Unified fetch ─────────────────────────────────────────────────────────────
export type ApiProvider = 'espn' | 'api'

export async function fetchLiveScores(provider: ApiProvider): Promise<LiveScore[]> {
  if (provider === 'espn') return fetchEspnScores()
  return fetchProxyScores()
}
