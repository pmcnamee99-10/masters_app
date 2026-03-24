import { TournamentInfo } from '../types'

interface Props {
  tournament: TournamentInfo
}

export function Header({ tournament }: Props) {
  const statusLabel =
    tournament.status === 'in-progress'
      ? `Round ${tournament.currentRound} In Progress`
      : tournament.status === 'complete'
      ? 'Tournament Complete'
      : `Round ${tournament.currentRound} Starting Soon`

  return (
    <header className="bg-masters-green header-safe">
      <div className="px-4 pt-5 pb-6 text-center">
        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-masters-gold opacity-60" />
          <span className="text-masters-gold text-xs tracking-[0.35em] uppercase font-light opacity-90">
            Augusta National
          </span>
          <div className="h-px w-10 bg-masters-gold opacity-60" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-masters-gold text-4xl md:text-5xl tracking-widest font-normal mb-1">
          THE MASTERS
        </h1>

        <p className="text-green-200 text-sm tracking-wider">
          {tournament.year}&nbsp;·&nbsp;{tournament.location}
        </p>

        {/* Live badge */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 bg-masters-gold text-masters-green-dark text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 bg-masters-green-dark rounded-full animate-pulse" />
            {statusLabel}
          </span>
        </div>
      </div>
    </header>
  )
}
