import { players, rawParticipants, tiers } from '../data/mockData'
import { Player } from '../types'

// ── Ownership calculation ─────────────────────────────────────────────────────
// For each tier, count how many participants picked each golfer
interface OwnershipEntry {
  player: Player
  count: number
  pct: number
  contrarian: boolean // low ownership + high tier ranking = contrarian value
}

function computeOwnership(): Map<number, OwnershipEntry[]> {
  const totalParticipants = rawParticipants.length
  const map = new Map<number, OwnershipEntry[]>()

  for (const tier of tiers) {
    const entries: OwnershipEntry[] = tier.playerIds.map(pid => {
      const player = players.find(p => p.id === pid)!
      const count = rawParticipants.filter(rp => rp.pickIds.includes(pid)).length
      const pct = Math.round((count / totalParticipants) * 100)
      return { player, count, pct, contrarian: false }
    })

    // Sort by ownership descending
    entries.sort((a, b) => b.pct - a.pct)

    // Flag contrarian: bottom half of ownership in the tier (but not 0%)
    const mid = Math.ceil(entries.length / 2)
    entries.forEach((e, i) => {
      e.contrarian = i >= mid && e.count > 0
    })

    map.set(tier.number, entries)
  }

  return map
}

// ── Field overlap ─────────────────────────────────────────────────────────────
// For each pair of participants, count shared picks
function computeFieldOverlap() {
  return rawParticipants.map(rp => {
    const overlaps = rawParticipants
      .filter(other => other.id !== rp.id)
      .map(other => {
        const shared = rp.pickIds.filter(id => other.pickIds.includes(id)).length
        return { name: other.name, shared }
      })
      .sort((a, b) => b.shared - a.shared)

    const avgOverlap = overlaps.reduce((s, o) => s + o.shared, 0) / overlaps.length
    return { participant: rp, overlaps, avgOverlap: Math.round(avgOverlap * 10) / 10 }
  })
}

// ── Optimal lineup suggestion ─────────────────────────────────────────────────
// Pick the lowest-owned player in each tier as the "contrarian" suggestion
function computeOptimalLineup(ownership: Map<number, OwnershipEntry[]>) {
  return tiers.map(tier => {
    const entries = ownership.get(tier.number) ?? []
    const sorted = [...entries].sort((a, b) => a.pct - b.pct)
    const leastOwned = sorted[0]
    const mostOwned = entries[0]
    return { tier, leastOwned, mostOwned }
  })
}

// ── Colour helpers ────────────────────────────────────────────────────────────
function ownershipColour(pct: number): string {
  if (pct >= 50) return 'text-red-500 font-bold'
  if (pct >= 30) return 'text-orange-500 font-semibold'
  if (pct >= 15) return 'text-yellow-600'
  return 'text-green-600 font-semibold'
}

function overlapColour(avg: number): string {
  if (avg >= 4) return 'text-red-500 font-bold'
  if (avg >= 3) return 'text-orange-500'
  if (avg >= 2) return 'text-yellow-600'
  return 'text-green-600 font-semibold'
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

// ─────────────────────────────────────────────────────────────────────────────

export function PickAnalysis() {
  const ownership = computeOwnership()
  const fieldOverlap = computeFieldOverlap()
  const optimal = computeOptimalLineup(ownership)
  const total = rawParticipants.length

  return (
    <div className="min-h-screen bg-masters-cream pb-16">

      {/* Header */}
      <div className="bg-masters-green px-4 py-5 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-10 bg-masters-gold opacity-60" />
          <span className="text-masters-gold text-xs tracking-[0.35em] uppercase font-light opacity-90">
            Private Analysis
          </span>
          <div className="h-px w-10 bg-masters-gold opacity-60" />
        </div>
        <h1 className="font-serif text-masters-gold text-3xl tracking-widest">
          PICK ANALYSIS
        </h1>
        <p className="text-green-300 text-xs mt-1">{total} participants · field ownership & contrarian value</p>
      </div>

      <div className="max-w-4xl mx-auto px-3 mt-4 space-y-4">

        {/* ── Ownership by tier ── */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <div className="bg-masters-green px-4 py-2">
            <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
              Field Ownership by Tier
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {tiers.map(tier => {
              const entries = ownership.get(tier.number) ?? []
              return (
                <div key={tier.number} className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${TIER_COLOURS[tier.number]}`}>
                      {tier.number === 7 ? 'WC' : `T${tier.number}`}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">{tier.description}</span>
                  </div>
                  <div className="space-y-1.5">
                    {entries.map(e => (
                      <div key={e.player.id} className="flex items-center gap-2">
                        {/* Ownership bar */}
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-xs text-gray-700 w-36 truncate font-medium">
                            {e.player.flag} {e.player.name}
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[120px]">
                            <div
                              className={`h-2 rounded-full ${e.pct >= 50 ? 'bg-red-400' : e.pct >= 30 ? 'bg-orange-400' : e.pct >= 15 ? 'bg-yellow-400' : 'bg-green-500'}`}
                              style={{ width: `${e.pct}%` }}
                            />
                          </div>
                          <span className={`text-xs w-16 ${ownershipColour(e.pct)}`}>
                            {e.pct}% ({e.count}/{total})
                          </span>
                        </div>
                        {/* Contrarian badge */}
                        {e.contrarian && e.count > 0 && (
                          <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded border border-green-200">
                            CONTRARIAN
                          </span>
                        )}
                        {e.count === 0 && (
                          <span className="text-[9px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded">
                            UNPICKED
                          </span>
                        )}
                        {e.pct >= 40 && (
                          <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-200">
                            HIGH OWNED
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Contrarian lineup ── */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <div className="bg-masters-green px-4 py-2 flex items-center justify-between">
            <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
              Contrarian Lineup
            </span>
            <span className="text-green-300 text-xs">Lowest owned per tier</span>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              If these players perform equally well, picking the lowest-owned option gives you the most to gain vs the field. High-owned players only move the field together — they can't win you the competition alone.
            </p>
            <div className="space-y-2">
              {optimal.map(({ tier, leastOwned, mostOwned }) => (
                <div key={tier.number} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${TIER_COLOURS[tier.number]}`}>
                    {tier.number === 7 ? 'WC' : `T${tier.number}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-green-700 truncate">
                        {leastOwned?.player.flag} {leastOwned?.player.name}
                      </span>
                      <span className="text-[10px] text-green-600 shrink-0">({leastOwned?.pct}%)</span>
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <span>vs most owned:</span>
                      <span className="text-red-500 font-medium">{mostOwned?.player.name} ({mostOwned?.pct}%)</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-masters-green">
                      +{(mostOwned?.pct ?? 0) - (leastOwned?.pct ?? 0)}%
                    </div>
                    <div className="text-[9px] text-gray-400">leverage</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Field overlap per participant ── */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <div className="bg-masters-green px-4 py-2 flex items-center justify-between">
            <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
              Field Overlap
            </span>
            <span className="text-green-300 text-xs">Avg shared picks with rest of field</span>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-3">
              Lower overlap = more differentiated team = more to gain (and lose). High overlap = you move with the crowd.
            </p>
            <div className="space-y-1.5">
              {fieldOverlap.sort((a, b) => a.avgOverlap - b.avgOverlap).map(({ participant, avgOverlap }) => (
                <div key={participant.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 w-36 truncate">{participant.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[120px]">
                    <div
                      className={`h-2 rounded-full ${avgOverlap >= 4 ? 'bg-red-400' : avgOverlap >= 3 ? 'bg-orange-400' : avgOverlap >= 2 ? 'bg-yellow-400' : 'bg-green-500'}`}
                      style={{ width: `${(avgOverlap / 7) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs w-32 ${overlapColour(avgOverlap)}`}>
                    {avgOverlap} / 7 avg shared
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                <span className="text-green-600 font-semibold">Green</span> = most differentiated ·
                <span className="text-red-500 font-semibold"> Red</span> = most similar to the field
              </p>
            </div>
          </div>
        </div>

        {/* ── Each participant's picks with ownership context ── */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <div className="bg-masters-green px-4 py-2">
            <span className="text-masters-gold text-xs font-bold tracking-widest uppercase">
              Everyone's Picks + Ownership %
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {rawParticipants.map(rp => {
              const picks = rp.pickIds.map(pid => {
                const player = players.find(p => p.id === pid)!
                const tierNum = player.tier
                const tierEntries = ownership.get(tierNum) ?? []
                const entry = tierEntries.find(e => e.player.id === pid)
                return { player, pct: entry?.pct ?? 0, tierNum }
              })
              const avgPct = Math.round(picks.reduce((s, p) => s + p.pct, 0) / picks.length)

              return (
                <div key={rp.id} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">{rp.flag} {rp.name}</span>
                    <span className={`text-xs font-bold ${overlapColour(avgPct / 10)}`}>
                      avg {avgPct}% owned
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {picks.map(({ player, pct, tierNum }) => (
                      <div key={player.id} className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1 border border-gray-100">
                        <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${TIER_COLOURS[tierNum]}`}>
                          {tierNum === 7 ? 'WC' : `T${tierNum}`}
                        </span>
                        <span className="text-xs text-gray-700">{player.name.split(' ').pop()}</span>
                        <span className={`text-[10px] font-semibold ${ownershipColour(pct)}`}>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
