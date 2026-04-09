import { Player } from '../types'

interface Props {
  player: Player
  index: number
  showCutLine: boolean
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

function totalClass(n: number, madeCut: boolean): string {
  if (!madeCut) return 'text-gray-400'
  if (n < 0) return 'text-red-600 font-bold'
  if (n === 0) return 'text-gray-700 font-semibold'
  return 'text-gray-600'
}

function todayClass(n: number | null): string {
  if (n === null) return 'text-gray-400'
  if (n < 0) return 'text-red-500'
  return 'text-gray-500'
}

// Colour each round score relative to par (72)
function roundClass(n: number | null): string {
  if (n === null) return 'text-gray-300'
  const d = n - 72
  if (d <= -2) return 'text-yellow-500 font-bold'  // eagle+
  if (d === -1) return 'text-red-500'               // birdie
  if (d === 0)  return 'text-gray-600'              // par
  if (d === 1)  return 'text-blue-500'              // bogey
  return 'text-blue-700 font-semibold'              // double bogey+
}

function posClass(pos: string): string {
  if (pos === '1')              return 'text-masters-gold font-bold text-base'
  if (pos === '2' || pos === 'T2') return 'text-gray-400 font-semibold'
  if (pos === '3' || pos === 'T3') return 'text-amber-600 font-semibold'
  if (pos === 'MC' || pos === 'WD' || pos === 'DQ') return 'text-gray-400 text-xs'
  return 'text-gray-600 font-medium'
}

export function PlayerRow({ player, index, showCutLine }: Props) {
  const even = index % 2 === 0
  const bg = player.madeCut
    ? (even ? 'bg-white' : 'bg-masters-off-white')
    : (even ? 'bg-gray-50' : 'bg-gray-100/50')

  return (
    <>
      {showCutLine && (
        <tr>
          <td colSpan={9} className="bg-gray-200 py-1 text-center">
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase">
              — Missed Cut —
            </span>
          </td>
        </tr>
      )}
      <tr className={`${bg} border-b border-gray-100 transition-colors hover:bg-masters-cream/60`}>

        {/* Position */}
        <td className="px-3 py-3 text-center w-12">
          <span className={posClass(player.positionDisplay)}>
            {player.positionDisplay}
          </span>
        </td>

        {/* Player */}
        <td className="px-2 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none" aria-label={player.country}>
              {player.flag}
            </span>
            <div className="min-w-0">
              <p className={`text-sm font-semibold leading-tight truncate ${!player.madeCut ? 'text-gray-400' : 'text-gray-800'}`}>
                {player.name}
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                {player.country}
                {player.thru !== '-' && (
                  <span className="sm:hidden">
                    {' · '}
                    {player.thru === 'F' ? 'F' : `H${player.thru}`}
                  </span>
                )}
              </p>
            </div>
          </div>
        </td>

        {/* Total to par */}
        <td className="px-3 py-3 text-center w-16">
          <span className={`text-sm ${totalClass(player.total, player.madeCut)}`}>
            {fmtTotal(player.total)}
          </span>
        </td>

        {/* Today */}
        <td className="px-2 py-3 text-center w-12 hidden sm:table-cell">
          <span className={`text-xs ${todayClass(player.today)}`}>
            {fmtToday(player.today)}
          </span>
        </td>

        {/* Thru */}
        <td className="px-2 py-3 text-center w-10 hidden sm:table-cell">
          <span className="text-xs text-gray-400">{player.thru}</span>
        </td>

        {/* R1 – R4 (desktop only) */}
        {([player.r1, player.r2, player.r3, player.r4] as (number | null)[]).map((score, i) => (
          <td key={i} className="px-2 py-3 text-center w-10 hidden md:table-cell">
            <span className={`text-xs ${roundClass(score)}`}>{fmtRound(score)}</span>
          </td>
        ))}

      </tr>
    </>
  )
}
