import { useState } from 'react'
import { Header } from './components/Header'
import { TournamentStatus } from './components/TournamentStatus'
import { FantasyLeaderboard } from './components/FantasyLeaderboard'
import { Leaderboard } from './components/Leaderboard'
import { ComingSoon } from './components/ComingSoon'
import { useScores } from './hooks/useScores'
import { tournament } from './data/mockData'

// ── Mode detection ────────────────────────────────────────────────────────────
// Automatically shows the Coming Soon screen before the tournament starts.
// Override any time via Vercel env var: VITE_APP_MODE = 'live' | 'coming-soon'
const TOURNAMENT_START = new Date('2026-04-09T07:30:00-04:00') // 12:30 BST (UK)
const FORCED_MODE = import.meta.env.VITE_APP_MODE as string | undefined
const APP_MODE: 'coming-soon' | 'live' =
  FORCED_MODE === 'live'         ? 'live'         :
  FORCED_MODE === 'coming-soon'  ? 'coming-soon'  :
  Date.now() < TOURNAMENT_START.getTime() ? 'coming-soon' : 'live'

type Tab = 'fantasy' | 'golfers'

function App() {
  const [tab, setTab] = useState<Tab>('fantasy')
  const { players, participants, loading, error, lastUpdated, isLive, refresh } = useScores()

  if (APP_MODE === 'coming-soon') return <ComingSoon />

  return (
    <div className="min-h-screen bg-masters-cream">
      <Header tournament={tournament} />
      <TournamentStatus
        tournament={tournament}
        isLive={isLive}
        loading={loading}
        error={error}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
      />

      {/* Tab bar */}
      <div className="max-w-4xl mx-auto px-2 pt-3">
        <div className="flex rounded-lg overflow-hidden border border-masters-green/30 shadow-sm">
          <button
            onClick={() => setTab('fantasy')}
            className={`flex-1 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors ${
              tab === 'fantasy'
                ? 'bg-masters-green text-masters-gold'
                : 'bg-white text-masters-green hover:bg-masters-cream'
            }`}
          >
            Fantasy Standings
          </button>
          <button
            onClick={() => setTab('golfers')}
            className={`flex-1 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors border-l border-masters-green/30 ${
              tab === 'golfers'
                ? 'bg-masters-green text-masters-gold'
                : 'bg-white text-masters-green hover:bg-masters-cream'
            }`}
          >
            Golfer Scores
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto">
        {tab === 'fantasy' && (
          <FantasyLeaderboard participants={participants} players={players} />
        )}
        {tab === 'golfers' && (
          <Leaderboard players={players} />
        )}
      </main>
    </div>
  )
}

export default App
