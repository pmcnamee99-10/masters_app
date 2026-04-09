import { Participant, Player } from '../types'
import { ParticipantRow } from './ParticipantRow'

interface Props {
  participants: Participant[]
  players: Player[]
}

export function FantasyLeaderboard({ participants, players }: Props) {
  const playerMap: Record<number, Player> = {}
  players.forEach(p => { playerMap[p.id] = p })

  return (
    <div className="mx-2 mt-3 mb-4 rounded-xl overflow-hidden shadow-md border border-gray-200">

      {/* Title bar */}
      <div className="bg-masters-green px-4 py-2 flex items-center justify-between">
        <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
          Fantasy Standings
        </span>
        <span className="text-green-300 text-xs">Combined score · 7 picks</span>
      </div>

      {/* How-to hint */}
      <div className="bg-masters-green/10 border-b border-masters-green/10 px-4 py-1.5">
        <p className="text-[11px] text-masters-green font-medium text-center">
          Tap any row to see a player's 7 picks
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-masters-green-dark text-masters-gold text-xs font-bold tracking-wider">
              <th className="px-3 py-2.5 text-center w-12">POS</th>
              <th className="px-2 py-2.5 text-left">PARTICIPANT</th>
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
            {participants.map((participant, idx) => (
              <ParticipantRow
                key={participant.id}
                participant={participant}
                index={idx}
                playerMap={playerMap}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Tier legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 footer-safe">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {[
            { label: 'T1', desc: 'Elite',       cls: 'bg-masters-gold text-masters-green-dark' },
            { label: 'T2', desc: 'Contenders', cls: 'bg-green-700 text-white' },
            { label: 'T3', desc: 'Dark Horses',cls: 'bg-green-800 text-white' },
            { label: 'T4', desc: 'Solid',      cls: 'bg-teal-700 text-white' },
            { label: 'T5', desc: 'Value',      cls: 'bg-slate-600 text-white' },
            { label: 'T6', desc: 'Longshots',  cls: 'bg-slate-700 text-white' },
            { label: 'WC', desc: 'Wildcard',   cls: 'bg-purple-700 text-white' },
          ].map(t => (
            <span key={t.label} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${t.cls}`}>{t.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
