export interface Player {
  id: number
  positionDisplay: string
  name: string
  country: string
  flag: string
  tier: number
  r1: number | null
  r2: number | null
  r3: number | null
  r4: number | null
  total: number
  today: number | null
  thru: string
  madeCut: boolean
}

export interface TournamentInfo {
  name: string
  year: number
  course: string
  location: string
  currentRound: number
  status: 'upcoming' | 'in-progress' | 'complete'
  par: number
  lastUpdated: string
}

export interface Tier {
  number: number
  label: string
  description: string
  playerIds: number[]
}

// Normalised live score from any API provider — matched onto the roster by player name
export interface LiveScore {
  name: string
  country: string
  flag: string
  positionDisplay: string
  total: number
  today: number | null
  thru: string
  r1: number | null
  r2: number | null
  r3: number | null
  r4: number | null
  madeCut: boolean
}

export interface Participant {
  id: number
  name: string
  flag: string
  pickIds: number[]  // 7 player IDs — one per tier (T1–T6 + Wildcard)
  position: number
  totalScore: number // sum of all 7 picks' total (relative to par)
  r1Total: number | null
  r2Total: number | null
  r3Total: number | null
  r4Total: number | null
  todayTotal: number | null
  golfersDone: number    // finished today's round (thru = 'F')
  golfersActive: number  // currently on the course
  golfersNotStarted: number // yet to tee off
}
