import { useState, useEffect, useCallback, useRef } from 'react'
import { Player, Participant, LiveScore } from '../types'
import { fetchLiveScores, ApiProvider } from '../services/scoresApi'
import { players as mockPlayers, computeParticipants } from '../data/mockData'

const RAW_PROVIDER = import.meta.env.VITE_API_PROVIDER as string | undefined
const PROVIDER = (RAW_PROVIDER === 'espn' || RAW_PROVIDER === 'api')
  ? RAW_PROVIDER as ApiProvider
  : null

const REFRESH_MS = parseInt(import.meta.env.VITE_REFRESH_INTERVAL ?? '180000', 10)

// ── Name normalisation ────────────────────────────────────────────────────────
function normaliseName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
}

const NAME_ALIASES: Record<string, string> = {
  'jon rahm':        'jon rahm',
  'collin morikawa': 'collin morikawa',
  'jj spaun':        'jj spaun',
  'j j spaun':       'jj spaun',
  'si woo kim':      'si woo kim',
  'sungjae im':      'sungjae im',
}

// ── Patch fantasy roster with live scores ─────────────────────────────────────
function patchScores(roster: Player[], liveScores: LiveScore[]): Player[] {
  const liveMap = new Map(
    liveScores.map(s => {
      const n = normaliseName(s.name)
      return [NAME_ALIASES[n] ?? n, s]
    })
  )
  return roster.map(player => {
    const n = normaliseName(player.name)
    const live = liveMap.get(NAME_ALIASES[n] ?? n)
    if (!live) return player
    return {
      ...player,
      positionDisplay: live.positionDisplay,
      total:           live.total,
      today:           live.today,
      thru:            live.thru,
      r1:              live.r1,
      r2:              live.r2,
      r3:              live.r3,
      r4:              live.r4,
      madeCut:         live.madeCut,
    }
  })
}

// ── Convert full ESPN leaderboard to Player[] for the Golfer Scores tab ───────
let _nextId = 9000
function liveScoresToPlayers(liveScores: LiveScore[]): Player[] {
  return liveScores.map(s => ({
    id:              _nextId++,
    tier:            0,
    positionDisplay: s.positionDisplay,
    name:            s.name,
    country:         s.country,
    flag:            s.flag,
    r1:              s.r1,
    r2:              s.r2,
    r3:              s.r3,
    r4:              s.r4,
    total:           s.total,
    today:           s.today,
    thru:            s.thru,
    madeCut:         s.madeCut,
  }))
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export interface ScoresState {
  players: Player[]          // fantasy roster (patched with live scores)
  fullLeaderboard: Player[]  // full ESPN leaderboard for the Golfer Scores tab
  participants: Participant[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  isLive: boolean
  refresh: () => void
}

export function useScores(): ScoresState {
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [fullLeaderboard, setFullLeaderboard] = useState<Player[]>(mockPlayers)
  const [participants, setParticipants] = useState<Participant[]>(() => computeParticipants(mockPlayers))
  const [loading, setLoading] = useState(PROVIDER !== null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchAndApply = useCallback(async () => {
    if (!PROVIDER) return
    setLoading(true)
    setError(null)
    try {
      _nextId = 9000
      const liveScores = await fetchLiveScores(PROVIDER)
      const patched = patchScores(mockPlayers, liveScores)
      setPlayers(patched)
      setFullLeaderboard(liveScoresToPlayers(liveScores))
      setParticipants(computeParticipants(patched))
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live scores')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!PROVIDER) return
    fetchAndApply()
    intervalRef.current = setInterval(fetchAndApply, REFRESH_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchAndApply])

  return {
    players,
    fullLeaderboard,
    participants,
    loading,
    error,
    lastUpdated,
    isLive: PROVIDER !== null,
    refresh: fetchAndApply,
  }
}
