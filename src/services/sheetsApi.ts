// ── Google Sheets CSV integration ─────────────────────────────────────────────
//
// HOW TO SET UP:
// 1. Open your Google Sheet of picks
// 2. File → Share → Publish to web
// 3. Select your sheet tab → "Comma-separated values (.csv)" → Publish
// 4. Copy the URL
// 5. Add it to Vercel: Dashboard → Project → Settings → Environment Variables
//    Name:  VITE_SHEETS_CSV_URL
//    Value: https://docs.google.com/spreadsheets/d/...
//
// EXPECTED SHEET COLUMNS (column names are flexible, matched case-insensitively):
//   Name           → participant's display name  (required)
//   Tier 1 Pick    → golfer name for tier 1       (required)
//   Tier 2 Pick    → golfer name for tier 2       (required)
//   Tier 3 Pick    → golfer name for tier 3       (required)
//   Tier 4 Pick    → golfer name for tier 4       (required)
//   Tier 5 Pick    → golfer name for tier 5       (required)
//   Tier 6 Pick    → golfer name for tier 6       (required)
//   Wildcard       → golfer name for wildcard     (optional 7th pick)
//
// Any extra columns (Timestamp, Email, etc.) are automatically ignored.
// ─────────────────────────────────────────────────────────────────────────────

export interface SheetParticipant {
  name: string
  picks: string[] // golfer names in tier order [t1, t2, t3, t4, t5, t6, wildcard?]
}

// Parse a raw CSV string into rows of key→value objects
function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split('\n').filter(l => l.trim())
  if (lines.length < 2) return []

  const headers = splitCSVLine(lines[0]).map(h => h.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map(line => {
    const values = splitCSVLine(line)
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? '').trim()]))
  })
}

// Split a single CSV line, respecting double-quoted fields
function splitCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      // Handle escaped quotes ""
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; continue }
      inQuotes = !inQuotes
      continue
    }
    if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
      continue
    }
    current += ch
  }
  result.push(current)
  return result
}

// Column name patterns that map to each tier (matched case-insensitively)
const TIER_PATTERNS = [
  ['tier 1', 't1', 'tier1', 'pick 1', 'pick1'],
  ['tier 2', 't2', 'tier2', 'pick 2', 'pick2'],
  ['tier 3', 't3', 'tier3', 'pick 3', 'pick3'],
  ['tier 4', 't4', 'tier4', 'pick 4', 'pick4'],
  ['tier 5', 't5', 'tier5', 'pick 5', 'pick5'],
  ['tier 6', 't6', 'tier6', 'pick 6', 'pick6'],
  ['wildcard', 'wild card', 'wild', 'bonus', 'pick 7', 'pick7', 't7', 'tier 7'],
]

const NAME_PATTERNS = ['name', 'your name', 'full name', 'player name', 'entrant']

function findCol(headers: string[], patterns: string[]): string | undefined {
  return headers.find(h => patterns.some(p => h.toLowerCase().includes(p)))
}

export async function fetchSheetParticipants(csvUrl: string): Promise<SheetParticipant[]> {
  const res = await fetch(csvUrl)
  if (!res.ok) throw new Error(`Google Sheets fetch failed (${res.status}). Check the URL and that the sheet is published.`)

  const csv = await res.text()
  const rows = parseCSV(csv)
  if (rows.length === 0) throw new Error('Google Sheet returned no rows — check it is published correctly.')

  const headers = Object.keys(rows[0])
  const nameCol = findCol(headers, NAME_PATTERNS)
  if (!nameCol) {
    throw new Error(
      `Could not find a "Name" column. Headers found: ${headers.join(', ')}. ` +
      'Rename the column to "Name" in your sheet.'
    )
  }

  // Find a column for each tier (some may be undefined if sheet only has 6 tiers)
  const pickCols = TIER_PATTERNS.map(patterns => findCol(headers, patterns))

  return rows
    .filter(row => row[nameCol]?.trim())
    .map(row => ({
      name:  row[nameCol].trim(),
      picks: pickCols
        .map(col => (col ? row[col]?.trim() : '') ?? '')
        .filter(Boolean),
    }))
}
