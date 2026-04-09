// ── Masters 2026 schedule (ET = UTC-4) ───────────────────────────────────────
// Round starts at first tee time. Round is considered "in progress" until
// the next round starts (or 13 hours after R4 starts for final round).
const ROUNDS = [
  { round: 1, start: new Date('2026-04-09T07:30:00-04:00') },
  { round: 2, start: new Date('2026-04-10T07:30:00-04:00') },
  { round: 3, start: new Date('2026-04-11T07:30:00-04:00') },
  { round: 4, start: new Date('2026-04-12T07:30:00-04:00') },
]
const TOURNAMENT_END = new Date('2026-04-12T20:00:00-04:00')

export type Phase =
  | { type: 'pre-round';    round: number; startsAt: Date }
  | { type: 'in-progress';  round: number }
  | { type: 'between';      completedRound: number; nextRound: number; nextStartsAt: Date }
  | { type: 'complete' }

export function getTournamentPhase(now: Date = new Date()): Phase {
  const t = now.getTime()

  // Before R1
  if (t < ROUNDS[0].start.getTime()) {
    return { type: 'pre-round', round: 1, startsAt: ROUNDS[0].start }
  }

  // After tournament end
  if (t >= TOURNAMENT_END.getTime()) {
    return { type: 'complete' }
  }

  // Walk through rounds
  for (let i = 0; i < ROUNDS.length; i++) {
    const roundStart = ROUNDS[i].start.getTime()
    const nextStart  = i < ROUNDS.length - 1 ? ROUNDS[i + 1].start.getTime() : TOURNAMENT_END.getTime()

    if (t >= roundStart && t < nextStart) {
      return { type: 'in-progress', round: ROUNDS[i].round }
    }
  }

  return { type: 'complete' }
}

// ── Countdown formatter ───────────────────────────────────────────────────────
export function formatCountdown(target: Date, now: Date = new Date()): string {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return '0h 0m'
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1_000)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}
