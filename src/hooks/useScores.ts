import { useState, useEffect, useCallback, useRef } from 'react'
import { Player, Participant, LiveScore } from '../types'
import { fetchLiveScores, ApiProvider } from '../services/scoresApi'
import { players as mockPlayers, computeParticipants } from '../data/mockData'

// ── Env config ────────────────────────────────────────────────────────────────
// Set VITE_API_PROVIDER in Vercel dashboard (or .env.local for dev)
// Values: 'espn' | 'api' | leave unset to use mock data
const RAW_PROVIDER = import.meta.env.VITE_API_PROVIDER as string | undefined
const PROVIDER = (RAW_PROVIDER === 'espn' || RAW_PROVIDER === 'api')
  ? RAW_PROVIDER as ApiProvider
  : null  // null = mock mode

// How often to poll for updates. Default: 3 minutes.
const REFRESH_MS = parseInt(import.meta.env.VITE_REFRESH_INTERVAL ?? '180000', 10)

// ── Score patching ────────────────────────────────────────────────────────────
// Live API data is matched onto the known player roster by name (case-insensitive).
// This preserves tier assignments and fantasy pick IDs while updating scores.
function patchScores(roster: Player[], liveScores: LiveScore[]): Player[] {
  const liveMap = new Map(liveScores.map(s => [s.name.toLowerCase().trim(), s]))
  return roster.map(player => {
    const live = liveMap.get(player.name.toLowerCase().trim())
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

// ── Hook ──────────────────────────────────────────────────────────────────────
export interface ScoresState {
  players: Player[]
  participants: Participant[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  isLive: boolean
  refresh: () => void
}

export function useScores(): ScoresState {
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
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
      const liveScores = await fetchLiveScores(PROVIDER)
      const patched = patchScores(mockPlayers, liveScores)
      setPlayers(patched)
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
    participants,
    loading,
    error,
    lastUpdated,
    isLive: PROVIDER !== null,
    refresh: fetchAndApply,
  }
}
