import { useState, useEffect } from 'react'
import { TournamentInfo } from '../types'
import { getTournamentPhase, formatCountdown } from '../utils/tournamentPhase'

interface Props {
  tournament: TournamentInfo
}

export function Header({ tournament }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const phase = getTournamentPhase(now)

  let badgeText = ''
  let pulse = false

  if (phase.type === 'pre-round') {
    badgeText = `Round ${phase.round} starts in ${formatCountdown(phase.startsAt, now)}`
  } else if (phase.type === 'in-progress') {
    badgeText = `Round ${phase.round} In Progress`
    pulse = true
  } else if (phase.type === 'between') {
    badgeText = `Round ${phase.completedRound} Complete · R${phase.nextRound} in ${formatCountdown(phase.nextStartsAt, now)}`
  } else {
    badgeText = 'Tournament Complete'
  }

  return (
    <header className="bg-masters-green header-safe">
      <div className="px-4 pt-5 pb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-masters-gold opacity-60" />
          <span className="text-masters-gold text-xs tracking-[0.35em] uppercase font-light opacity-90">
            Augusta National
          </span>
          <div className="h-px w-10 bg-masters-gold opacity-60" />
        </div>

        <h1 className="font-serif text-masters-gold text-4xl md:text-5xl tracking-widest font-normal mb-1">
          THE MASTERS
        </h1>

        <p className="text-green-200 text-sm tracking-wider">
          {tournament.year}&nbsp;·&nbsp;{tournament.location}
        </p>

        <div className="mt-4">
          <span className="inline-flex items-center gap-2 bg-masters-gold text-masters-green-dark text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
            {pulse && <span className="w-1.5 h-1.5 bg-masters-green-dark rounded-full animate-pulse" />}
            {badgeText}
          </span>
        </div>
      </div>
    </header>
  )
}
