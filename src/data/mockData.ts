import { Player, TournamentInfo } from '../types'

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

// All totals are relative to par. Par per round = 72, par for 3 rounds = 216.
// today = R3 score relative to par (most recently completed round).
export const players: Player[] = [
  // ── Made Cut ──────────────────────────────────────────────────────────────
  { id: 1,  positionDisplay: '1',   name: 'Scottie Scheffler',  country: 'USA', flag: '🇺🇸', r1: 66, r2: 67, r3: 68, r4: null, total: -15, today: -4, thru: 'F', madeCut: true },
  { id: 2,  positionDisplay: '2',   name: 'Rory McIlroy',       country: 'NIR', flag: '🇬🇧', r1: 67, r2: 69, r3: 67, r4: null, total: -13, today: -5, thru: 'F', madeCut: true },
  { id: 3,  positionDisplay: 'T3',  name: 'Jon Rahm',           country: 'ESP', flag: '🇪🇸', r1: 68, r2: 68, r3: 69, r4: null, total: -11, today: -3, thru: 'F', madeCut: true },
  { id: 4,  positionDisplay: 'T3',  name: 'Xander Schauffele',  country: 'USA', flag: '🇺🇸', r1: 69, r2: 67, r3: 69, r4: null, total: -11, today: -3, thru: 'F', madeCut: true },
  { id: 5,  positionDisplay: 'T5',  name: 'Collin Morikawa',    country: 'USA', flag: '🇺🇸', r1: 70, r2: 68, r3: 68, r4: null, total: -10, today: -4, thru: 'F', madeCut: true },
  { id: 6,  positionDisplay: 'T5',  name: 'Brooks Koepka',      country: 'USA', flag: '🇺🇸', r1: 70, r2: 69, r3: 67, r4: null, total: -10, today: -5, thru: 'F', madeCut: true },
  { id: 7,  positionDisplay: 'T7',  name: 'Justin Thomas',      country: 'USA', flag: '🇺🇸', r1: 69, r2: 70, r3: 68, r4: null, total: -9,  today: -4, thru: 'F', madeCut: true },
  { id: 8,  positionDisplay: 'T7',  name: 'Tommy Fleetwood',    country: 'ENG', flag: '🇬🇧', r1: 71, r2: 67, r3: 69, r4: null, total: -9,  today: -3, thru: 'F', madeCut: true },
  { id: 9,  positionDisplay: 'T9',  name: 'Viktor Hovland',     country: 'NOR', flag: '🇳🇴', r1: 70, r2: 70, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },
  { id: 10, positionDisplay: 'T9',  name: 'Matt Fitzpatrick',   country: 'ENG', flag: '🇬🇧', r1: 72, r2: 68, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },
  { id: 11, positionDisplay: 'T9',  name: 'Patrick Cantlay',    country: 'USA', flag: '🇺🇸', r1: 71, r2: 69, r3: 68, r4: null, total: -8,  today: -4, thru: 'F', madeCut: true },
  { id: 12, positionDisplay: 'T9',  name: 'Shane Lowry',        country: 'IRL', flag: '🇮🇪', r1: 71, r2: 68, r3: 69, r4: null, total: -8,  today: -3, thru: 'F', madeCut: true },
  { id: 13, positionDisplay: 'T13', name: 'Bryson DeChambeau',  country: 'USA', flag: '🇺🇸', r1: 70, r2: 72, r3: 67, r4: null, total: -7,  today: -5, thru: 'F', madeCut: true },
  { id: 14, positionDisplay: 'T13', name: 'Sungjae Im',         country: 'KOR', flag: '🇰🇷', r1: 71, r2: 70, r3: 68, r4: null, total: -7,  today: -4, thru: 'F', madeCut: true },
  { id: 15, positionDisplay: 'T13', name: 'Hideki Matsuyama',   country: 'JPN', flag: '🇯🇵', r1: 73, r2: 68, r3: 68, r4: null, total: -7,  today: -4, thru: 'F', madeCut: true },
  { id: 16, positionDisplay: 'T16', name: 'Ludvig Åberg',       country: 'SWE', flag: '🇸🇪', r1: 70, r2: 72, r3: 68, r4: null, total: -6,  today: -4, thru: 'F', madeCut: true },
  { id: 17, positionDisplay: 'T16', name: 'Max Homa',           country: 'USA', flag: '🇺🇸', r1: 71, r2: 70, r3: 69, r4: null, total: -6,  today: -3, thru: 'F', madeCut: true },
  { id: 18, positionDisplay: 'T16', name: 'Cameron Smith',      country: 'AUS', flag: '🇦🇺', r1: 72, r2: 69, r3: 69, r4: null, total: -6,  today: -3, thru: 'F', madeCut: true },
  { id: 19, positionDisplay: 'T19', name: 'Sam Burns',          country: 'USA', flag: '🇺🇸', r1: 73, r2: 71, r3: 69, r4: null, total: -3,  today: -3, thru: 'F', madeCut: true },
  { id: 20, positionDisplay: 'T19', name: 'Wyndham Clark',      country: 'USA', flag: '🇺🇸', r1: 72, r2: 72, r3: 69, r4: null, total: -3,  today: -3, thru: 'F', madeCut: true },
  { id: 21, positionDisplay: 'T21', name: 'Adam Scott',         country: 'AUS', flag: '🇦🇺', r1: 73, r2: 70, r3: 71, r4: null, total: -2,  today: -1, thru: 'F', madeCut: true },
  { id: 22, positionDisplay: 'T21', name: 'Keegan Bradley',     country: 'USA', flag: '🇺🇸', r1: 74, r2: 69, r3: 71, r4: null, total: -2,  today: -1, thru: 'F', madeCut: true },
  { id: 23, positionDisplay: '23',  name: 'Jason Day',          country: 'AUS', flag: '🇦🇺', r1: 73, r2: 72, r3: 71, r4: null, total:  0,  today: -1, thru: 'F', madeCut: true },
  // ── Missed Cut (36-hole total, cut at +3) ─────────────────────────────────
  { id: 24, positionDisplay: 'MC',  name: 'Dustin Johnson',     country: 'USA', flag: '🇺🇸', r1: 75, r2: 73, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 25, positionDisplay: 'MC',  name: 'Stephan Jaeger',     country: 'GER', flag: '🇩🇪', r1: 76, r2: 72, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 26, positionDisplay: 'MC',  name: 'Russell Henley',     country: 'USA', flag: '🇺🇸', r1: 74, r2: 74, r3: null, r4: null, total:  4,  today: null, thru: '-', madeCut: false },
  { id: 27, positionDisplay: 'MC',  name: 'Cameron Young',      country: 'USA', flag: '🇺🇸', r1: 77, r2: 72, r3: null, r4: null, total:  5,  today: null, thru: '-', madeCut: false },
  { id: 28, positionDisplay: 'MC',  name: 'Sahith Theegala',    country: 'USA', flag: '🇺🇸', r1: 75, r2: 74, r3: null, r4: null, total:  5,  today: null, thru: '-', madeCut: false },
]
