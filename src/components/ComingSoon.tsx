import { useState, useEffect } from 'react'

// ── Tournament start: Round 1 tee-off, Augusta National ───────────────────────
const TOURNAMENT_START = new Date('2026-04-09T07:30:00-04:00') // 12:30 BST (UK)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(): TimeLeft {
  const diff = TOURNAMENT_START.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

export function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tiles = [
    { value: timeLeft.days,    label: 'Days'  },
    { value: timeLeft.hours,   label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins'  },
    { value: timeLeft.seconds, label: 'Secs'  },
  ]

  return (
    <div className="min-h-screen bg-masters-green flex flex-col items-center justify-center px-6 py-12 select-none">

      {/* Top rule */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-16 bg-masters-gold/40" />
        <span className="text-masters-gold/60 text-[11px] tracking-[0.4em] uppercase font-light">
          Augusta National Golf Club
        </span>
        <div className="h-px w-16 bg-masters-gold/40" />
      </div>

      {/* Title */}
      <h1 className="font-serif text-masters-gold text-5xl md:text-7xl tracking-widest font-normal text-center mb-2">
        THE MASTERS
      </h1>
      <p className="text-green-300 text-base tracking-[0.3em] mb-14">
        2026 · Augusta, Georgia
      </p>

      {/* Countdown label */}
      <p className="text-masters-gold/50 text-[11px] tracking-[0.35em] uppercase text-center mb-6">
        First round begins in
      </p>

      {/* Countdown tiles */}
      <div className="flex items-start gap-3 md:gap-5 mb-14">
        {tiles.map(({ value, label }, i) => (
          <div key={label} className="flex items-start gap-3 md:gap-5">
            {i > 0 && (
              <span className="text-masters-gold/25 text-3xl md:text-5xl font-thin mt-2 md:mt-3">:</span>
            )}
            <div className="text-center">
              <div className="bg-masters-green-dark border border-masters-gold/25 rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[64px] md:min-w-[88px] shadow-lg">
                <span className="font-serif text-masters-gold text-4xl md:text-6xl tabular-nums leading-none">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <p className="text-masters-gold/40 text-[10px] tracking-[0.3em] uppercase mt-2">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fantasy info card */}
      <div className="border border-masters-gold/20 rounded-2xl px-7 py-5 max-w-xs w-full text-center mb-10 bg-masters-green-dark/40">
        <p className="text-masters-gold text-sm font-semibold tracking-wider mb-2">
          Fantasy Competition
        </p>
        <p className="text-green-300 text-xs leading-relaxed">
          Deadline for picks 12:25pm. Standings go live when the first ball is struck on Thursday morning.
        </p>
      </div>

      {/* Bottom rule */}
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-masters-gold/15" />
        <span className="text-masters-gold/25 text-[10px] tracking-widest uppercase">
          A tradition unlike any other
        </span>
        <div className="h-px w-12 bg-masters-gold/15" />
      </div>
    </div>
  )
}
