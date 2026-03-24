import { Player } from '../types'
import { PlayerRow } from './PlayerRow'

interface Props {
  players: Player[]
}

export function Leaderboard({ players }: Props) {
  const made   = players.filter(p => p.madeCut)
  const missed = players.filter(p => !p.madeCut)
  const all    = [...made, ...missed]

  return (
    <div className="mx-2 mt-3 mb-8 rounded-xl overflow-hidden shadow-md border border-gray-200">

      {/* Title bar */}
      <div className="bg-masters-green px-4 py-2 flex items-center justify-between">
        <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
          Leaderboard
        </span>
        <span className="text-green-300 text-xs">Par 72 · Augusta National</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-masters-green-dark text-masters-gold text-xs font-bold tracking-wider">
              <th className="px-3 py-2.5 text-center w-12">POS</th>
              <th className="px-2 py-2.5 text-left">PLAYER</th>
              <th className="px-3 py-2.5 text-center w-16">TO PAR</th>
              <th className="px-2 py-2.5 text-center w-12 hidden sm:table-cell">TODAY</th>
              <th className="px-2 py-2.5 text-center w-10 hidden sm:table-cell">THRU</th>
              <th className="px-2 py-2.5 text-center w-10 hidden md:table-cell">R1</th>
              <th className="px-2 py-2.5 text-center w-10 hidden md:table-cell">R2</th>
              <th className="px-2 py-2.5 text-center w-10 hidden md:table-cell">R3</th>
              <th className="px-2 py-2.5 text-center w-10 hidden md:table-cell">R4</th>
            </tr>
          </thead>
          <tbody>
            {all.map((player, idx) => (
              <PlayerRow
                key={player.id}
                player={player}
                index={idx}
                showCutLine={idx === made.length && missed.length > 0}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Score legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 footer-safe">
        <p className="text-xs text-gray-400 text-center space-x-2">
          <span className="text-yellow-500 font-bold">●</span>
          <span>Eagle</span>
          <span className="text-gray-300">·</span>
          <span className="text-red-500 font-medium">●</span>
          <span>Birdie</span>
          <span className="text-gray-300">·</span>
          <span>● Par</span>
          <span className="text-gray-300">·</span>
          <span className="text-blue-500">●</span>
          <span>Bogey</span>
        </p>
      </div>
    </div>
  )
}
