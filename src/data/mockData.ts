import { Player, TournamentInfo, Tier, Participant } from '../types'

export const tournament: TournamentInfo = {
  name: 'The Masters',
  year: 2025,
  course: 'Augusta National Golf Club',
  location: 'Augusta, Georgia',
  currentRound: 4,
  status: 'in-progress',
  par: 72,
  lastUpdated: 'Round 3 Complete · Round 4 Starting',
}

// tier = which tier pool this golfer belongs to (1–6, or 7 for wildcard)
// total = score relative to par across completed rounds
// today = today's round score relative to par (R3)
export const players: Player[] = [
  // ── Tier 1 — Elite (World Top 5) ──────────────────────────────────────────
  { id: 1,  tier: 1, positionDisplay: '1',   name: 'Scottie Scheffler',  country: 'USA', flag: '🇺🇸', r1: 66, r2: 67, r3: 68, r4: null, total: -15, today: -4, thru: 'F', madeCut: true },
  { id: 2,  tier: 1, positionDisplay: '2',   name: 'Rory McIlroy',       country: 'NIR', flag: '🇬🇧', r1: 67, r2: 69, r3: 67, r4: null, total: -13, today: -5, thru: 'F', madeCut: true },
  { id: 4,  tier: 1, positionDisplay: 'T3',  name: 'Xander Schauffele',  country: 'USA', flag: '🇺🇸', r1: 69, r2: 67, r3: 69, r4: null, total: -11, today: -3, thru: 'F', madeCut: true },

  // ── Tier 2 — Contenders (World 6–20) ──────────────────────────────────────
  { id: 3,  tier: 2, positionDisplay: 'T3',  name: 'Jon Rahm',           country: 'ESP', flag: '🇪🇸', r1: 68, r2: 68, r3: 69, r4: null, total: -11, today: -3, thru: 'F', madeCut: true },
  { id: 5,  tier: 2, positionDisplay: 'T5',  name: 'Collin Morikawa',    country: 'USA', flag: '🇺🇸', r1: 70, r2: 68, r3: 68, r4: null, total: -10, today: -4, thru: 'F', madeCut: true },
  { id: 8,  tier: 2, positionDisplay: 'T7',  name: 'Tommy Fleetwood',    country: 'ENG', flag: '🇬🇧', r1: 71, r2: 67, r3: 69, r4: null, total: -9,  today: -3, thru: 'F', madeCut: true },
  { id: 9,  tier: 2, positionDisplay: 'T9',  name: 'Viktor Hovland',     country: 'NOR', flag: '🇳🇴', r1: 70, r2: 70, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },

  // ── Tier 3 — Dark Horses (World 21–40) ────────────────────────────────────
  { id: 6,  tier: 3, positionDisplay: 'T5',  name: 'Brooks Koepka',      country: 'USA', flag: '🇺🇸', r1: 70, r2: 69, r3: 67, r4: null, total: -10, today: -5, thru: 'F', madeCut: true },
  { id: 7,  tier: 3, positionDisplay: 'T7',  name: 'Justin Thomas',      country: 'USA', flag: '🇺🇸', r1: 69, r2: 70, r3: 68, r4: null, total: -9,  today: -4, thru: 'F', madeCut: true },
  { id: 11, tier: 3, positionDisplay: 'T9',  name: 'Patrick Cantlay',    country: 'USA', flag: '🇺🇸', r1: 71, r2: 69, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },
  { id: 12, tier: 3, positionDisplay: 'T9',  name: 'Shane Lowry',        country: 'IRL', flag: '🇮🇪', r1: 71, r2: 68, r3: 69, r4: null, total: -8,  today: -3, thru: 'F', madeCut: true },

  // ── Tier 4 — Solid Picks (World 41–60) ────────────────────────────────────
  { id: 10, tier: 4, positionDisplay: 'T9',  name: 'Matt Fitzpatrick',   country: 'ENG', flag: '🇬🇧', r1: 72, r2: 68, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },
  { id: 13, tier: 4, positionDisplay: 'T13', name: 'Bryson DeChambeau',  country: 'USA', flag: '🇺🇸', r1: 70, r2: 72, r3: 67, r4: null, total: -7,  today: -5, thru: 'F', madeCut: true },
  { id: 14, tier: 4, positionDisplay: 'T13', name: 'Sungjae Im',         country: 'KOR', flag: '🇰🇷', r1: 71, r2: 70, r3: 68, r4: null, total: -7,  today: -4, thru: 'F', madeCut: true },
  { id: 15, tier: 4, positionDisplay: 'T13', name: 'Hideki Matsuyama',   country: 'JPN', flag: '🇯🇵', r1: 73, r2: 68, r3: 68, r4: null, total: -7,  today: -4, thru: 'F', madeCut: true },
  { id: 16, tier: 4, positionDisplay: 'T16', name: 'Ludvig Åberg',       country: 'SWE', flag: '🇸🇪', r1: 70, r2: 72, r3: 68, r4: null, total: -6,  today: -4, thru: 'F', madeCut: true },

  // ── Tier 5 — Value Picks (World 61–100) ───────────────────────────────────
  { id: 17, tier: 5, positionDisplay: 'T16', name: 'Max Homa',           country: 'USA', flag: '🇺🇸', r1: 71, r2: 70, r3: 69, r4: null, total: -6,  today: -3, thru: 'F', madeCut: true },
  { id: 18, tier: 5, positionDisplay: 'T16', name: 'Cameron Smith',      country: 'AUS', flag: '🇦🇺', r1: 72, r2: 69, r3: 69, r4: null, total: -6,  today: -3, thru: 'F', madeCut: true },
  { id: 19, tier: 5, positionDisplay: 'T19', name: 'Sam Burns',          country: 'USA', flag: '🇺🇸', r1: 73, r2: 71, r3: 69, r4: null, total: -3,  today: -3, thru: 'F', madeCut: true },
  { id: 20, tier: 5, positionDisplay: 'T19', name: 'Wyndham Clark',      country: 'USA', flag: '🇺🇸', r1: 72, r2: 72, r3: 69, r4: null, total: -3,  today: -3, thru: 'F', madeCut: true },
  { id: 21, tier: 5, positionDisplay: 'T21', name: 'Adam Scott',         country: 'AUS', flag: '🇦🇺', r1: 73, r2: 70, r3: 71, r4: null, total: -2,  today: -1, thru: 'F', madeCut: true },

  // ── Tier 6 — Longshots (Past champions / field) ────────────────────────────
  { id: 22, tier: 6, positionDisplay: 'T21', name: 'Keegan Bradley',     country: 'USA', flag: '🇺🇸', r1: 74, r2: 69, r3: 71, r4: null, total: -2,  today: -1, thru: 'F', madeCut: true },
  { id: 23, tier: 6, positionDisplay: '23',  name: 'Jason Day',          country: 'AUS', flag: '🇦🇺', r1: 73, r2: 72, r3: 71, r4: null, total:  0,  today: -1, thru: 'F', madeCut: true },
  { id: 24, tier: 6, positionDisplay: 'MC',  name: 'Dustin Johnson',     country: 'USA', flag: '🇺🇸', r1: 75, r2: 73, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 27, tier: 6, positionDisplay: 'MC',  name: 'Cameron Young',      country: 'USA', flag: '🇺🇸', r1: 77, r2: 72, r3: null, r4: null, total:  5,  today: null, thru: '-', madeCut: false },

  // ── Wildcard (Tier 7) — Darkhorse picks ───────────────────────────────────
  { id: 25, tier: 7, positionDisplay: 'MC',  name: 'Stephan Jaeger',     country: 'GER', flag: '🇩🇪', r1: 76, r2: 72, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 26, tier: 7, positionDisplay: 'MC',  name: 'Russell Henley',     country: 'USA', flag: '🇺🇸', r1: 74, r2: 74, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 28, tier: 7, positionDisplay: 'MC',  name: 'Sahith Theegala',    country: 'USA', flag: '🇺🇸', r1: 75, r2: 74, r3: null, r4: null, total:  5,  today: null, thru: '-', madeCut: false },
]

export const tiers: Tier[] = [
  { number: 1, label: 'Tier 1',    description: 'Elite — World Top 5',         playerIds: [1, 2, 4] },
  { number: 2, label: 'Tier 2',    description: 'Contenders — World 6–20',     playerIds: [3, 5, 8, 9] },
  { number: 3, label: 'Tier 3',    description: 'Dark Horses — World 21–40',   playerIds: [6, 7, 11, 12] },
  { number: 4, label: 'Tier 4',    description: 'Solid Picks — World 41–60',   playerIds: [10, 13, 14, 15, 16] },
  { number: 5, label: 'Tier 5',    description: 'Value Picks — World 61–100',  playerIds: [17, 18, 19, 20, 21] },
  { number: 6, label: 'Tier 6',    description: 'Longshots — Field',           playerIds: [22, 23, 24, 27] },
  { number: 7, label: 'Wildcard',  description: 'Darkhorse — Any remaining',   playerIds: [25, 26, 28] },
]

// ── Derive participant data from picks ────────────────────────────────────────
// Sums non-null round scores; null only when every pick has null for that round.
function sumRound(picks: Player[], getter: (p: Player) => number | null): number | null {
  const vals = picks.map(getter)
  if (vals.every(v => v === null)) return null
  return vals.reduce<number>((acc, v) => acc + (v ?? 0), 0)
}

export const rawParticipants = [
  // pickIds: [T1, T2, T3, T4, T5, T6, Wildcard]
  { id: 1, name: 'Ciara Murphy',   pickIds: [1,  9,  6,  15, 18, 23, 28] },
  { id: 2, name: "James O'Brien",  pickIds: [2,  3,  7,  10, 19, 24, 25] },
  { id: 3, name: 'Aoife Kelly',    pickIds: [4,  5,  12, 13, 17, 22, 26] },
  { id: 4, name: 'Darragh Finn',   pickIds: [1,  8,  11, 14, 20, 27, 28] },
  { id: 5, name: 'Niamh Walsh',    pickIds: [2,  9,  12, 16, 21, 23, 25] },
  { id: 6, name: 'Cormac Byrne',   pickIds: [4,  3,  6,  10, 18, 22, 26] },
  { id: 7, name: 'Sinéad Moore',   pickIds: [1,  5,  7,  13, 19, 27, 26] },
  { id: 8, name: 'Ronan Hughes',   pickIds: [2,  8,  11, 15, 17, 23, 28] },
]

const playerMap: Record<number, Player> = {}
players.forEach(p => { playerMap[p.id] = p })

export function computeParticipants(playerList: Player[]): Participant[] {
  const map: Record<number, Player> = {}
  playerList.forEach(p => { map[p.id] = p })
  return buildParticipantsFromMap(map)
}

function buildParticipantsFromMap(map: Record<number, Player>): Participant[] {
  const derived = rawParticipants.map(rp => {
    const picks = rp.pickIds.map(id => map[id])
    const totalScore = picks.reduce((sum, p) => sum + p.total, 0)
    const todayTotal = sumRound(picks, p => p.today)
    const golfersDone = picks.filter(p => p.thru === 'F' || p.thru === '-').length
    return {
      id: rp.id,
      name: rp.name,
      pickIds: rp.pickIds,
      position: 0,
      totalScore,
      r1Total: sumRound(picks, p => p.r1),
      r2Total: sumRound(picks, p => p.r2),
      r3Total: sumRound(picks, p => p.r3),
      r4Total: sumRound(picks, p => p.r4),
      todayTotal,
      golfersDone,
    }
  })

  return derived
    .sort((a, b) => a.totalScore - b.totalScore)
    .map((p, i) => ({ ...p, position: i + 1 }))
}

export const participants: Participant[] = buildParticipantsFromMap(playerMap)
