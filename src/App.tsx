import { useState } from 'react'
import { Header } from './components/Header'
import { TournamentStatus } from './components/TournamentStatus'
import { FantasyLeaderboard } from './components/FantasyLeaderboard'
import { Leaderboard } from './components/Leaderboard'
import { useScores } from './hooks/useScores'
import { tournament } from './data/mockData'

type Tab = 'fantasy' | 'golfers'

function App() {
  const [tab, setTab] = useState<Tab>('fantasy')
  const { players, participants, loading, error, lastUpdated, isLive, refresh } = useScores()

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
