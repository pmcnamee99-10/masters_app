export interface Player {
  id: number
  positionDisplay: string
  name: string
  country: string
  flag: string
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
