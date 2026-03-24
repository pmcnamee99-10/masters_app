import { Header } from './components/Header'
import { TournamentStatus } from './components/TournamentStatus'
import { Leaderboard } from './components/Leaderboard'
import { tournament, players } from './data/mockData'

function App() {
  return (
    <div className="min-h-screen bg-masters-cream">
      <Header tournament={tournament} />
      <TournamentStatus tournament={tournament} />
      <main className="max-w-4xl mx-auto">
        <Leaderboard players={players} />
      </main>
    </div>
  )
}

export default App
