import { TournamentInfo } from '../types'

interface Props {
  tournament: TournamentInfo
  isLive: boolean
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  onRefresh: () => void
}

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000)
  if (secs < 60)  return 'just now'
  if (secs < 120) return '1 min ago'
  return `${Math.floor(secs / 60)} mins ago`
}

export function TournamentStatus({ tournament, isLive, loading, error, lastUpdated, onRefresh }: Props) {
  return (
    <div className="bg-masters-green-dark border-b border-gold/20">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-2">

        {/* Left: course name */}
        <span className="text-green-300 text-xs tracking-wide shrink-0">
          {tournament.course}
        </span>

        {/* Right: live status */}
        <div className="flex items-center gap-2 min-w-0">
          {loading && (
            <span className="text-masters-gold/60 text-xs animate-pulse">Updating…</span>
          )}

          {error && !loading && (
            <span className="text-red-400 text-xs truncate" title={error}>
              ⚠ Data error
            </span>
          )}

          {isLive && !loading && !error && lastUpdated && (
            <span className="text-masters-gold/70 text-xs">
              Updated {timeAgo(lastUpdated)}
            </span>
          )}

          {!isLive && (
            <span className="text-masters-gold/50 text-xs italic">Mock data</span>
          )}

          {/* Manual refresh button (live mode only) */}
          {isLive && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="text-masters-gold/60 hover:text-masters-gold text-xs px-1.5 py-0.5 rounded border border-masters-gold/20 hover:border-masters-gold/50 transition-colors disabled:opacity-40"
              aria-label="Refresh scores"
            >
              ↻
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
