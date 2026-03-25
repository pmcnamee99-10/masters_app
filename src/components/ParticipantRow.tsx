import { useState } from 'react'
import { Participant, Player } from '../types'

interface Props {
  participant: Participant
  index: number
  playerMap: Record<number, Player>
}

const TIER_LABELS: Record<number, string> = {
  1: 'T1', 2: 'T2', 3: 'T3', 4: 'T4', 5: 'T5', 6: 'T6', 7: 'WC',
}
const TIER_COLOURS: Record<number, string> = {
  1: 'bg-masters-gold text-masters-green-dark',
  2: 'bg-green-700 text-white',
  3: 'bg-green-800 text-white',
  4: 'bg-teal-700 text-white',
  5: 'bg-slate-600 text-white',
  6: 'bg-slate-700 text-white',
  7: 'bg-purple-700 text-white',
}

function fmtTotal(n: number): string {
  if (n < 0) return n.toString()
  if (n === 0) return 'E'
  return `+${n}`
}

function fmtToday(n: number | null): string {
  if (n === null) return '-'
  if (n < 0) return n.toString()
  if (n === 0) return 'E'
  return `+${n}`
}

function fmtRound(n: number | null): string {
  return n === null ? '-' : n.toString()
}

function totalClass(n: number): string {
  if (n < 0) return 'text-red-600 font-bold'
  if (n === 0) return 'text-gray-700 font-semibold'
  return 'text-gray-600'
}

function todayClass(n: number | null): string {
  if (n === null) return 'text-gray-400'
  if (n < 0) return 'text-red-500'
  return 'text-gray-500'
}

function roundClass(n: number | null): string {
  if (n === null) return 'text-gray-300'
  const d = n - 72
  if (d <= -2) return 'text-yellow-500 font-bold'
  if (d === -1) return 'text-red-500'
  if (d === 0)  return 'text-gray-600'
  if (d === 1)  return 'text-blue-500'
  return 'text-blue-700 font-semibold'
}

function posClass(pos: number): string {
  if (pos === 1) return 'text-masters-gold font-bold text-base'
  if (pos === 2) return 'text-gray-400 font-semibold'
  if (pos === 3) return 'text-amber-600 font-semibold'
  return 'text-gray-600 font-medium'
}

export function ParticipantRow({ participant, index, playerMap }: Props) {
  const [expanded, setExpanded] = useState(false)
  const even = index % 2 === 0
  const bg = even ? 'bg-white' : 'bg-masters-off-white'

  const picks = participant.pickIds.map(id => playerMap[id]).filter(Boolean)

  return (
    <>
      {/* Main participant row */}
      <tr
        className={`${bg} border-b border-gray-100 transition-colors hover:bg-masters-cream/60 cursor-pointer active:bg-masters-cream select-none`}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Position */}
        <td className="px-3 py-3 text-center w-12">
          <span className={posClass(participant.position)}>
            {participant.position}
          </span>
        </td>

        {/* Name + expand indicator */}
        <td className="px-2 py-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`text-xs transition-transform duration-200 text-gray-400 ${expanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                {participant.name}
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                {participant.golfersDone}/7 finished
              </p>
            </div>
          </div>
        </td>

        {/* Total to par */}
        <td className="px-3 py-3 text-center w-16">
          <span className={`text-sm ${totalClass(participant.totalScore)}`}>
            {fmtTotal(participant.totalScore)}
          </span>
        </td>

        {/* Today */}
        <td className="px-2 py-3 text-center w-12 hidden sm:table-cell">
          <span className={`text-xs ${todayClass(participant.todayTotal)}`}>
            {fmtToday(participant.todayTotal)}
          </span>
        </td>

        {/* Thru */}
        <td className="px-2 py-3 text-center w-10 hidden sm:table-cell">
          <span className="text-xs text-gray-400">
            {participant.golfersDone === 7 ? 'F' : `${participant.golfersDone}/7`}
          </span>
        </td>

        {/* R1–R4 */}
        {([participant.r1Total, participant.r2Total, participant.r3Total, participant.r4Total] as (number | null)[]).map((score, i) => (
          <td key={i} className="px-2 py-3 text-center w-10 hidden md:table-cell">
            <span className="text-xs text-gray-500">{fmtRound(score)}</span>
          </td>
        ))}
      </tr>

      {/* Expanded picks sub-table */}
      {expanded && (
        <tr className="border-b border-gray-200">
          <td colSpan={9} className="p-0">
            <div className="bg-masters-green/5 border-t border-masters-green/20">

              {/* Sub-table header */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] text-[10px] font-bold tracking-wider text-masters-green uppercase px-4 py-1.5 border-b border-masters-green/10">
                <span className="w-8 text-center">TIER</span>
                <span className="pl-2">GOLFER</span>
                <span className="w-12 text-center">POS</span>
                <span className="w-12 text-center">TO PAR</span>
                <span className="w-12 text-center hidden sm:block">TODAY</span>
                <span className="w-10 text-center hidden sm:block">THRU</span>
                <span className="w-8 text-center hidden md:block">R1</span>
                <span className="w-8 text-center hidden md:block">R2</span>
                <span className="w-8 text-center hidden md:block">R3</span>
              </div>

              {/* Pick rows */}
              {picks.map((player, i) => (
                <div
                  key={player.id}
                  className={`grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] items-center px-4 py-2 text-xs border-b border-masters-green/5 last:border-0 ${!player.madeCut ? 'opacity-50' : ''}`}
                >
                  {/* Tier badge */}
                  <div className="w-8 flex justify-center">
                    <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${TIER_COLOURS[player.tier]}`}>
                      {TIER_LABELS[player.tier]}
                    </span>
                  </div>

                  {/* Player name + flag */}
                  <div className="pl-2 flex items-center gap-1.5 min-w-0">
                    <span className="text-base leading-none">{player.flag}</span>
                    <span className={`font-medium truncate ${player.madeCut ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                      {player.name}
                    </span>
                    {!player.madeCut && (
                      <span className="text-[9px] text-gray-400 font-semibold shrink-0">MC</span>
                    )}
                  </div>

                  {/* Position */}
                  <div className="w-12 text-center">
                    <span className={posClass(parseInt(player.positionDisplay) || 99)}>
                      {player.positionDisplay}
                    </span>
                  </div>

                  {/* TO PAR */}
                  <div className="w-12 text-center">
                    <span className={totalClass(player.total)}>{fmtTotal(player.total)}</span>
                  </div>

                  {/* TODAY */}
                  <div className="w-12 text-center hidden sm:block">
                    <span className={todayClass(player.today)}>{fmtToday(player.today)}</span>
                  </div>

                  {/* THRU */}
                  <div className="w-10 text-center hidden sm:block">
                    <span className="text-gray-400">{player.thru}</span>
                  </div>

                  {/* R1 R2 R3 */}
                  {[player.r1, player.r2, player.r3].map((score, j) => (
                    <div key={j} className="w-8 text-center hidden md:block">
                      <span className={roundClass(score)}>{fmtRound(score)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
