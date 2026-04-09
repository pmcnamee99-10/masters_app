import { Player, TournamentInfo, Tier, Participant } from '../types'

export const tournament: TournamentInfo = {
  name: 'The Masters',
  year: 2026,
  course: 'Augusta National Golf Club',
  location: 'Augusta, Georgia',
  currentRound: 1,
  status: 'in-progress',
  par: 72,
  lastUpdated: 'Round 1 In Progress',
}

export const players: Player[] = [
  // ── Tier 1 ───────────────────────────────────────────────────────────────
  { id: 1,  tier: 1, positionDisplay: '-', name: 'Scottie Scheffler',  country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 2,  tier: 1, positionDisplay: '-', name: 'Rory McIlroy',       country: 'NIR', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 3,  tier: 1, positionDisplay: '-', name: 'Jon Rahm',           country: 'ESP', flag: '🇪🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 13, tier: 1, positionDisplay: '-', name: 'Bryson DeChambeau',  country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Tier 2 ───────────────────────────────────────────────────────────────
  { id: 4,  tier: 2, positionDisplay: '-', name: 'Xander Schauffele',  country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 5,  tier: 2, positionDisplay: '-', name: 'Collin Morikawa',    country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 8,  tier: 2, positionDisplay: '-', name: 'Tommy Fleetwood',    country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 10, tier: 2, positionDisplay: '-', name: 'Matt Fitzpatrick',   country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 16, tier: 2, positionDisplay: '-', name: 'Ludvig Åberg',       country: 'SWE', flag: '🇸🇪', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 27, tier: 2, positionDisplay: '-', name: 'Cameron Young',      country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Tier 3 ───────────────────────────────────────────────────────────────
  { id: 6,  tier: 3, positionDisplay: '-', name: 'Brooks Koepka',      country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 15, tier: 3, positionDisplay: '-', name: 'Hideki Matsuyama',   country: 'JPN', flag: '🇯🇵', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 29, tier: 3, positionDisplay: '-', name: 'Justin Rose',        country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 34, tier: 3, positionDisplay: '-', name: 'Min Woo Lee',        country: 'AUS', flag: '🇦🇺', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 35, tier: 3, positionDisplay: '-', name: 'Patrick Reed',       country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 50, tier: 3, positionDisplay: '-', name: 'Jordan Spieth',      country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Tier 4 ───────────────────────────────────────────────────────────────
  { id: 9,  tier: 4, positionDisplay: '-', name: 'Viktor Hovland',     country: 'NOR', flag: '🇳🇴', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 12, tier: 4, positionDisplay: '-', name: 'Shane Lowry',        country: 'IRL', flag: '🇮🇪', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 30, tier: 4, positionDisplay: '-', name: 'Bob MacIntyre',      country: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 36, tier: 4, positionDisplay: '-', name: 'Chris Gotterup',     country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 39, tier: 4, positionDisplay: '-', name: 'Akshay Bhatia',      country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 51, tier: 4, positionDisplay: '-', name: 'Jake Knapp',         country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Tier 5 ───────────────────────────────────────────────────────────────
  { id: 7,  tier: 5, positionDisplay: '-', name: 'Justin Thomas',      country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 11, tier: 5, positionDisplay: '-', name: 'Patrick Cantlay',    country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 26, tier: 5, positionDisplay: '-', name: 'Russell Henley',     country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 31, tier: 5, positionDisplay: '-', name: 'Joaquín Niemann',    country: 'CHI', flag: '🇨🇱', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 42, tier: 5, positionDisplay: '-', name: 'Sepp Straka',        country: 'AUT', flag: '🇦🇹', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 45, tier: 5, positionDisplay: '-', name: 'Si Woo Kim',         country: 'KOR', flag: '🇰🇷', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Tier 6 ───────────────────────────────────────────────────────────────
  { id: 19, tier: 6, positionDisplay: '-', name: 'Sam Burns',          country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 21, tier: 6, positionDisplay: '-', name: 'Adam Scott',         country: 'AUS', flag: '🇦🇺', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 23, tier: 6, positionDisplay: '-', name: 'Jason Day',          country: 'AUS', flag: '🇦🇺', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 32, tier: 6, positionDisplay: '-', name: 'Marco Penge',        country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 33, tier: 6, positionDisplay: '-', name: 'Tyrrell Hatton',     country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 38, tier: 6, positionDisplay: '-', name: 'Corey Conners',      country: 'CAN', flag: '🇨🇦', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 41, tier: 6, positionDisplay: '-', name: 'Christo Bridgeman',  country: 'RSA', flag: '🇿🇦', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  // ── Wildcard pool (Tier 7) ────────────────────────────────────────────────
  { id: 14, tier: 7, positionDisplay: '-', name: 'Sungjae Im',         country: 'KOR', flag: '🇰🇷', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 17, tier: 7, positionDisplay: '-', name: 'Max Homa',           country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 18, tier: 7, positionDisplay: '-', name: 'Cameron Smith',      country: 'AUS', flag: '🇦🇺', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 37, tier: 7, positionDisplay: '-', name: 'Ben Griffin',        country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 40, tier: 7, positionDisplay: '-', name: 'Aaron Rai',          country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 43, tier: 7, positionDisplay: '-', name: 'Harris English',     country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 44, tier: 7, positionDisplay: '-', name: 'Nicolai Højgaard',   country: 'DEN', flag: '🇩🇰', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 46, tier: 7, positionDisplay: '-', name: 'J.J. Spaun',         country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 53, tier: 7, positionDisplay: '-', name: 'Ryan Gerard',        country: 'USA', flag: '🇺🇸', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
  { id: 54, tier: 7, positionDisplay: '-', name: 'Danny Willett',      country: 'ENG', flag: '🇬🇧', r1: null, r2: null, r3: null, r4: null, total: 0, today: null, thru: '-', madeCut: true },
]

export const tiers: Tier[] = [
  { number: 1, label: 'Tier 1',   description: 'Elite',       playerIds: [1, 2, 3, 13] },
  { number: 2, label: 'Tier 2',   description: 'Contenders',  playerIds: [4, 5, 8, 10, 16, 27] },
  { number: 3, label: 'Tier 3',   description: 'Dark Horses', playerIds: [6, 15, 29, 34, 35, 50] },
  { number: 4, label: 'Tier 4',   description: 'Solid Picks', playerIds: [9, 12, 30, 36, 39, 51] },
  { number: 5, label: 'Tier 5',   description: 'Value Picks', playerIds: [7, 11, 26, 31, 42, 45] },
  { number: 6, label: 'Tier 6',   description: 'Longshots',   playerIds: [19, 21, 23, 32, 33, 38, 41] },
  { number: 7, label: 'Wildcard', description: 'Wildcard',    playerIds: [14, 17, 18, 37, 40, 43, 44, 46, 53, 54] },
]

// ── Participants — pickIds: [T1, T2, T3, T4, T5, T6, Wildcard] ───────────────
export const rawParticipants = [
  { id: 1,  name: 'Phillip McNamee',   flag: '🇮🇪', pickIds: [13, 10, 50, 51, 11, 23, 43] },
  { id: 2,  name: 'Tom Dunford',       flag: '🇮🇪', pickIds: [13, 16,  6, 30,  7, 32, 17] },
  { id: 3,  name: 'Paul Flynn',        flag: '🇮🇪', pickIds: [13, 16, 29, 12,  7, 33, 17] },
  { id: 4,  name: 'Joe Blaney',        flag: '🇮🇪', pickIds: [13, 10, 34, 12,  7, 33, 18] },
  { id: 5,  name: 'Callum Small',      flag: '🇮🇪', pickIds: [ 1,  8, 29, 36, 11, 38, 37] },
  { id: 6,  name: 'Breannan Conlon',   flag: '🇮🇪', pickIds: [13, 27, 29, 39, 42, 41, 40] },
  { id: 7,  name: 'Oliver Swords',     flag: '🇮🇪', pickIds: [ 2, 27, 29, 30,  7, 38, 17] },
  { id: 8,  name: 'Patrick Monaghan',  flag: '🇮🇪', pickIds: [ 2,  8, 35, 12, 11, 41, 14] },
  { id: 9,  name: 'Ben Watson',        flag: '🇮🇪', pickIds: [ 3, 16, 29,  9, 42, 38, 43] },
  { id: 10, name: 'Tom Campbell',      flag: '🇮🇪', pickIds: [ 3,  4, 34,  9,  7, 38, 44] },
  { id: 11, name: 'Breandan McGroovy', flag: '🇮🇪', pickIds: [ 1,  4, 35, 30, 45, 38, 44] },
  { id: 12, name: 'Dan Savage',        flag: '🇬🇧', pickIds: [ 3, 10, 29,  9, 42, 33, 46] },
  { id: 13, name: 'Dylan Stronge',     flag: '🇮🇪', pickIds: [ 3,  8, 35, 30, 45, 33, 43] },
  { id: 14, name: 'Owen Miller',       flag: '🇬🇧', pickIds: [ 1,  4, 15, 30, 45, 21, 46] },
  { id: 15, name: 'Ryan Murtagh',      flag: '🇮🇪', pickIds: [ 2, 10, 29, 36,  7, 33, 46] },
  { id: 16, name: 'Oliver Monaghan',   flag: '🇮🇪', pickIds: [13, 27, 35, 39, 42, 21, 44] },
  { id: 17, name: 'Micheal Glynn',     flag: '🇮🇪', pickIds: [13,  5, 29,  9,  7, 33, 46] },
  { id: 18, name: 'Donal Healy',       flag: '🇮🇪', pickIds: [ 2, 16, 29, 12, 26, 33, 44] },
  { id: 19, name: 'Ben Tweedy',        flag: '🇮🇪', pickIds: [13,  8, 29, 30, 42, 23, 44] },
  { id: 20, name: "Liam O'Keefe",      flag: '🇮🇪', pickIds: [ 1, 16, 29, 39, 11, 21, 44] },
  { id: 21, name: 'John Toner',        flag: '🇮🇪', pickIds: [ 3,  4, 34, 36, 26, 19, 53] },
  { id: 22, name: 'Ryan Tweedy',       flag: '🇮🇪', pickIds: [ 3,  4, 29,  9, 26, 38, 46] },
  { id: 23, name: 'David Connolly',    flag: '🇮🇪', pickIds: [ 3, 27, 35, 36, 45, 21, 44] },
  { id: 24, name: 'Oran Boyle',        flag: '🇮🇱', pickIds: [ 1, 16,  6, 30, 45, 38, 14] },
  { id: 25, name: 'Frank McCormack',   flag: '🇮🇪', pickIds: [ 2,  8, 29, 12, 42, 33, 14] },
  { id: 26, name: 'Conor Maguire',     flag: '🇧🇹', pickIds: [ 1, 10, 15, 30, 45, 38, 44] },
  { id: 27, name: 'PJ Lavery',         flag: '🇮🇪', pickIds: [ 1,  8, 35, 12, 42, 21, 54] },
]

// ── Score aggregation ─────────────────────────────────────────────────────────
function sumRound(picks: Player[], getter: (p: Player) => number | null): number | null {
  const vals = picks.map(getter)
  if (vals.every(v => v === null)) return null
  return vals.reduce<number>((acc, v) => acc + (v ?? 0), 0)
}

export function computeParticipants(playerList: Player[]): Participant[] {
  const map: Record<number, Player> = {}
  playerList.forEach(p => { map[p.id] = p })
  return buildParticipantsFromMap(map)
}

function buildParticipantsFromMap(map: Record<number, Player>): Participant[] {
  const derived = rawParticipants.map(rp => {
    const picks = rp.pickIds.map(id => map[id]).filter(Boolean)
    const totalScore = picks.reduce((sum, p) => sum + p.total, 0)
    const todayTotal = sumRound(picks, p => p.today)
    const golfersDone = picks.filter(p => p.thru === 'F').length
    const golfersActive = picks.filter(p => p.thru !== 'F' && p.thru !== '-').length
    const golfersNotStarted = picks.filter(p => p.thru === '-').length
    return {
      id: rp.id,
      name: rp.name,
      flag: rp.flag,
      pickIds: rp.pickIds,
      position: 0,
      totalScore,
      r1Total: sumRound(picks, p => p.r1),
      r2Total: sumRound(picks, p => p.r2),
      r3Total: sumRound(picks, p => p.r3),
      r4Total: sumRound(picks, p => p.r4),
      todayTotal,
      golfersDone,
      golfersActive,
      golfersNotStarted,
    }
  })
  return derived
    .sort((a, b) => a.totalScore - b.totalScore)
    .map((p, i) => ({ ...p, position: i + 1 }))
}

const playerMap: Record<number, Player> = {}
players.forEach(p => { playerMap[p.id] = p })
export const participants: Participant[] = buildParticipantsFromMap(playerMap)
