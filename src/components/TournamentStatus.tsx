import { TournamentInfo } from '../types'

interface Props {
  tournament: TournamentInfo
}

export function TournamentStatus({ tournament }: Props) {
  return (
    <div className="bg-masters-green-dark border-b border-masters-gold/20">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        <span className="text-green-300 text-xs tracking-wide">
          {tournament.course}
        </span>
        <span className="text-masters-gold/70 text-xs">
          {tournament.lastUpdated}
        </span>
      </div>
    </div>
  )
}
