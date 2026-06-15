/**
 * Dino Match-3 — pure TypeScript engine (no Vue/DOM deps).
 *
 * 8×8 grid, 6 dino "species" (emoji), 3-in-a-row matching.
 * Player swaps two adjacent cells; if the swap forms a row/column of
 * 3+ identical tiles, those tiles pop, score is awarded, the player
 * gains a few "moves" depending on cascade size, and gravity refills
 * the board with random new tiles.
 *
 * Special pieces (formed when 4 or 5 match in a row):
 *  - 4 in a row → "dino-egg" 🦖 (line-bomb: clears its row and column)
 *  - 5 in a row → "meteor" ☄️ (color-bomb: clears all tiles of one color)
 *
 * The game tracks score, moves, cascades, and combo multiplier.
 */

export type TileId = 0 | 1 | 2 | 3 | 4 | 5

export const TILE_KINDS: TileId[] = [0, 1, 2, 3, 4, 5]

export const TILE_EMOJI: Record<TileId, string> = {
  0: '🦖', // T-Rex
  1: '🦕', // Brontosaurus
  2: '🦴', // Fossil
  3: '🐊', // Spinosaurus-ish croc
  4: '🦅', // Pterodactyl
  5: '🐢', // Ankylosaurus
}

export const TILE_NAMES_EN: Record<TileId, string> = {
  0: 'T-Rex',
  1: 'Brontosaurus',
  2: 'Fossil',
  3: 'Spinosaurus',
  4: 'Pterodactyl',
  5: 'Ankylosaurus',
}

export const GRID_SIZE = 8

export type Special = null | 'dino-egg' | 'meteor'

export interface Tile {
  id: TileId
  special: Special
}

export type Cell = Tile | null
export type Grid = Cell[][] // [row][col]

export interface MatchInfo {
  /** tiles to remove: list of {row, col} */
  cells: { row: number; col: number }[]
  /** spawned specials (row,col → kind) */
  specials: { row: number; col: number; special: Exclude<Special, null> }[]
  /** color id of any color-bomb used in this cascade step (consumes the color) */
  consumedColor: TileId | null
}

export interface ClearedCell {
  row: number
  col: number
  id: TileId
  /** Whether this cell had a special placed on it (it still pops here). */
  wasSpecial: Special
}

export interface TileFall {
  id: TileId
  special: Special
  /** Row the tile was sitting at BEFORE gravity. */
  fromRow: number
  /** Row the tile ended up at AFTER gravity. */
  toRow: number
  col: number
}

export interface TileSpawn {
  row: number
  col: number
  id: TileId
  special: Special
}

export interface CascadeStep {
  matches: MatchInfo
  cleared: number
  /** score for this cascade step (after multiplier) */
  score: number
  /** multiplier used (1, 2, 3, …) */
  multiplier: number
  /** Pre-clear snapshot of which tiles are about to pop, with their species & special state. */
  clearedCells: ClearedCell[]
  /** Existing tiles that fell down to fill empty cells (one entry per tile that moved). */
  falls: TileFall[]
  /** Brand-new tiles spawned from above to fill the top of each column. */
  spawns: TileSpawn[]
}

export interface SwapResult {
  ok: boolean
  reason?: 'not-adjacent' | 'no-match'
  cascade: CascadeStep[]
  comboMax: number
  scoreGained: number
  /** special pieces that should be spawned at the location of the swap (a
   *  match formed by swapping 5 may need a meteor placed there) */
  spawned: { row: number; col: number; id: TileId; special: Exclude<Special, null> }[]
}

export interface BoardState {
  grid: Grid
  score: number
  moves: number
  cascades: number
  comboMax: number
  gameOver: boolean
}

const SCORE_PER_TILE_BASE = 10
const SCORE_PER_SPECIAL = 25

/** Deterministic PRNG (mulberry32) — seeded so tests/regenerations are stable. */
export function makeRng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function cloneGrid(grid: Grid): Grid {
  return grid.map(row => row.map(c => (c ? { ...c } : null)))
}

function pickId(rng: () => number): TileId {
  return TILE_KINDS[Math.floor(rng() * TILE_KINDS.length)] as TileId
}

/** Build a fresh grid with no starting matches.
 *  We construct row-by-row, left-to-right. For each new cell we forbid any
 *  tile id that would create a horizontal run of 3 (cols c-2..c) or a vertical
 *  run of 3 (rows r-2..r). Because we are filling top-down, we never need to
 *  look ahead at "L" shapes or unplaced rows.
 */
export function buildGrid(rng: () => number = Math.random): Grid {
  const grid: Grid = []
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Cell[] = []
    for (let c = 0; c < GRID_SIZE; c++) {
      // Build a list of forbidden ids given the already-placed neighbours
      const forbidden = new Set<TileId>()
      if (c >= 2 && row[c - 1] && row[c - 2] && row[c - 1]!.id === row[c - 2]!.id) {
        forbidden.add(row[c - 1]!.id)
      }
      if (r >= 2 && grid[r - 1][c] && grid[r - 2][c] && grid[r - 1][c]!.id === grid[r - 2][c]!.id) {
        forbidden.add(grid[r - 1][c]!.id)
      }
      // Pick any non-forbidden tile
      const allowed = TILE_KINDS.filter(k => !forbidden.has(k))
      // allowed is guaranteed non-empty: with 6 kinds and at most 2 forbidden
      // (a horizontal pair and a vertical pair could match or differ; either
      // way at most 2 distinct forbidden ids), there are at least 4 left.
      const id = allowed[Math.floor(rng() * allowed.length)] as TileId
      row.push({ id, special: null })
    }
    grid.push(row)
  }
  return grid
}

export function newGame(seed = Date.now() & 0xffffffff): { state: BoardState; rng: () => number } {
  const rng = makeRng(seed)
  let grid = buildGrid(rng)
  // Sanity check: rebuild until no starting matches exist. With the
  // construction rules above this is effectively never needed, but we keep it
  // as a safety net against future changes.
  let safety = 0
  while (findMatches(grid).cells.length > 0 && safety < 20) {
    grid = buildGrid(rng)
    safety++
  }
  // Make sure there is at least one valid move (so the player is not stuck on
  // move #1).
  safety = 0
  while (!hasAnyValidMove(grid) && safety < 20) {
    grid = buildGrid(rng)
    safety++
  }
  return {
    state: {
      grid,
      score: 0,
      moves: 0,
      cascades: 0,
      comboMax: 0,
      gameOver: false,
    },
    rng,
  }
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE
}

function isAdj(a: { row: number; col: number }, b: { row: number; col: number }): boolean {
  const dr = Math.abs(a.row - b.row)
  const dc = Math.abs(a.col - b.col)
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1)
}

export function isAdjacent(a: { row: number; col: number }, b: { row: number; col: number }): boolean {
  return isAdj(a, b)
}

/**
 * Find all matches on the current grid. Returns a list of horizontal/vertical
 * runs of length >= 3. Each run may spawn a special at its center if length
 * is 4 (dino-egg) or 5 (meteor).
 */
function findMatches(grid: Grid): MatchInfo {
  const toRemove = new Set<string>()
  const specials: { row: number; col: number; special: Exclude<Special, null> }[] = []
  const key = (r: number, c: number) => `${r},${c}`

  // Horizontal runs
  for (let r = 0; r < GRID_SIZE; r++) {
    let runStart = 0
    for (let c = 1; c <= GRID_SIZE; c++) {
      const end = c === GRID_SIZE
      const prev = grid[r][c - 1]
      const cur = end ? null : grid[r][c]
      const same = !end && prev && cur && prev.id === cur.id
      if (!same) {
        const len = c - runStart
        if (len >= 3 && prev) {
          for (let k = runStart; k < c; k++) toRemove.add(key(r, k))
          if (len === 4) specials.push({ row: r, col: runStart + 1, special: 'dino-egg' })
          else if (len >= 5) specials.push({ row: r, col: runStart + Math.floor(len / 2), special: 'meteor' })
        }
        runStart = c
      }
    }
  }

  // Vertical runs
  for (let c = 0; c < GRID_SIZE; c++) {
    let runStart = 0
    for (let r = 1; r <= GRID_SIZE; r++) {
      const end = r === GRID_SIZE
      const prev = grid[r - 1][c]
      const cur = end ? null : grid[r][c]
      const same = !end && prev && cur && prev.id === cur.id
      if (!same) {
        const len = r - runStart
        if (len >= 3 && prev) {
          for (let k = runStart; k < r; k++) toRemove.add(key(k, c))
          if (len === 4) specials.push({ row: runStart + 1, col: c, special: 'dino-egg' })
          else if (len >= 5) specials.push({ row: runStart + Math.floor(len / 2), col: c, special: 'meteor' })
        }
        runStart = r
      }
    }
  }

  const cells: { row: number; col: number }[] = []
  for (const k of toRemove) {
    const [r, c] = k.split(',').map(Number)
    cells.push({ row: r, col: c })
  }
  return { cells, specials, consumedColor: null }
}

/**
 * Apply special-piece effects to the grid (in place on a copy). Returns the
 * additional cells to remove. We always expand specials in step-order so a
 * row-bomb followed by a color-bomb both fire.
 *
 * This walks the freshly-found matches and, for any cleared cell that
 * contained a special, expands its effect into more cells.
 */
function expandSpecials(grid: Grid, match: MatchInfo): { row: number; col: number }[] {
  const extra = new Set<string>()
  const key = (r: number, c: number) => `${r},${c}`

  for (const { row, col } of match.cells) {
    const t = grid[row][col]
    if (!t || !t.special) continue
    if (t.special === 'dino-egg') {
      // Cross: full row and column
      for (let i = 0; i < GRID_SIZE; i++) {
        extra.add(key(row, i))
        extra.add(key(i, col))
      }
    } else if (t.special === 'meteor') {
      // Color bomb: clear all of the *other* color we touched. In practice we
      // pick the most common non-this color in the grid.
      const counts: Record<TileId, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      for (let r = 0; r < GRID_SIZE; r++)
        for (let c = 0; c < GRID_SIZE; c++) {
          const ct = grid[r][c]
          if (ct) counts[ct.id]++
        }
      let best: TileId = 0
      let bestN = -1
      for (const k of TILE_KINDS) {
        if (k === t.id) continue
        if (counts[k] > bestN) {
          bestN = counts[k]
          best = k
        }
      }
      for (let r = 0; r < GRID_SIZE; r++)
        for (let c = 0; c < GRID_SIZE; c++) {
          const ct = grid[r][c]
          if (ct && ct.id === best) extra.add(key(r, c))
        }
    }
  }
  return Array.from(extra).map(k => {
    const [r, c] = k.split(',').map(Number)
    return { row: r, col: c }
  })
}

/** Build a "creator" tile for a special-piece position. The tile has the
 *  same id as the run it came from, with the given special flag. The view
 *  layer can then render a different glyph on top of it (🥚/☄️). */
function makeSpecialTile(id: TileId, special: Exclude<Special, null>): Tile {
  return { id, special }
}

/**
 * Resolve where each special should be created, and which cells should be
 * cleared. The convention is: a 4- or 5-in-a-row becomes a special at the
 * "creator" position. The creator position is NOT cleared — it is replaced
 * by a special tile of the same id.
 *
 * Returns:
 *  - `cleared`: cells to delete (everything in `cells` minus `creatorKeys`)
 *  - `creators`: positions where a new special tile should be placed
 */
function resolveSpecials(
  grid: Grid,
  match: MatchInfo,
): {
  cleared: { row: number; col: number }[]
  creators: { row: number; col: number; id: TileId; special: Exclude<Special, null> }[]
} {
  const cleared: { row: number; col: number }[] = []
  const creators: { row: number; col: number; id: TileId; special: Exclude<Special, null> }[] = []
  const creatorKey = (r: number, c: number) => `${r},${c}`
  const creatorSet = new Set<string>()
  for (const s of match.specials) {
    const t = grid[s.row][s.col]
    if (t) creators.push({ row: s.row, col: s.col, id: t.id, special: s.special })
    else creators.push({ row: s.row, col: s.col, id: 0, special: s.special })
    creatorSet.add(creatorKey(s.row, s.col))
  }
  for (const cell of match.cells) {
    if (!creatorSet.has(creatorKey(cell.row, cell.col))) cleared.push(cell)
  }
  return { cleared, creators }
}

/** Apply gravity: drop existing tiles down to fill empty cells. Does NOT refill the
 *  top — that is done by `refillFromAbove` so the view layer can render a "fall
 *  in from above" animation for the new tiles.
 *  Returns, for each tile that moved, where it came from and where it ended up. */
function applyGravity(grid: Grid): TileFall[] {
  const falls: TileFall[] = []
  for (let c = 0; c < GRID_SIZE; c++) {
    // First read column: which tiles are alive, in top-down order.
    const survivors: { id: TileId; special: Special; fromRow: number }[] = []
    for (let r = 0; r < GRID_SIZE; r++) {
      const t = grid[r][c]
      if (t) survivors.push({ id: t.id, special: t.special, fromRow: r })
      grid[r][c] = null
    }
    // Drop them to the bottom
    let writeRow = GRID_SIZE - 1
    for (let i = survivors.length - 1; i >= 0; i--) {
      const s = survivors[i]!
      const toRow = writeRow
      grid[toRow][c] = { id: s.id, special: s.special }
      if (toRow !== s.fromRow) {
        falls.push({ id: s.id, special: s.special, fromRow: s.fromRow, toRow, col: c })
      }
      writeRow--
    }
  }
  return falls
}

/** Fill the top of each column with fresh tiles. Returns the list of newly
 *  spawned tiles so the view layer can render a "drop from above" animation. */
function refillFromAbove(
  grid: Grid,
  rng: () => number,
  specials: { row: number; col: number; special: Exclude<Special, null> }[],
): TileSpawn[] {
  const spawns: TileSpawn[] = []
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE; r++) {
      if (grid[r][c]) continue
      const id = pickId(rng)
      // If a special was placed at this (row,col), use it; otherwise the tile is plain.
      const specialEntry = specials.find(s => s.row === r && s.col === c)
      const special: Special = specialEntry ? specialEntry.special : null
      grid[r][c] = { id, special }
      spawns.push({ row: r, col: c, id, special })
    }
  }
  return spawns
}

function placeSpecials_REMOVED() { /* dead code — see resolveSpecials */ }

/**
 * Try to swap two cells. If the swap forms at least one match, resolve the
 * full cascade chain and return the result. Otherwise, swap back.
 */
export function trySwap(
  state: BoardState,
  a: { row: number; col: number },
  b: { row: number; col: number },
  rng: () => number,
): SwapResult {
  if (!inBounds(a.row, a.col) || !inBounds(b.row, b.col)) {
    return { ok: false, reason: 'not-adjacent', cascade: [], comboMax: 0, scoreGained: 0, spawned: [] }
  }
  if (!isAdj(a, b)) {
    return { ok: false, reason: 'not-adjacent', cascade: [], comboMax: 0, scoreGained: 0, spawned: [] }
  }

  const grid = cloneGrid(state.grid)
  // Swap
  const tmp = grid[a.row][a.col]
  grid[a.row][a.col] = grid[b.row][b.col]
  grid[b.row][b.col] = tmp

  // Check for matches
  let firstMatch = findMatches(grid)
  if (firstMatch.cells.length === 0) {
    return { ok: false, reason: 'no-match', cascade: [], comboMax: 0, scoreGained: 0, spawned: [] }
  }

  // Update moves
  state.moves += 1

  const cascade: CascadeStep[] = []
  let comboMax = 0
  let totalGained = 0
  const spawned: { row: number; col: number; id: TileId; special: Exclude<Special, null> }[] = []
  let safety = 0

  while (firstMatch.cells.length > 0 && safety < 50) {
    safety++

    // Expand specials first
    const extra = expandSpecials(grid, firstMatch)
    for (const e of extra) {
      if (!firstMatch.cells.find(x => x.row === e.row && x.col === e.col)) {
        firstMatch.cells.push(e)
      }
    }

    // Snapshot every cell that is about to pop, so the view can animate them
    // before they are removed.
    const clearedCells: ClearedCell[] = []
    for (const { row, col } of firstMatch.cells) {
      const t = grid[row][col]
      if (!t) continue
      clearedCells.push({ row, col, id: t.id, wasSpecial: t.special })
    }

    // Score: tiles in matches + bonus for specials
    const mult = cascade.length + 1
    comboMax = Math.max(comboMax, mult)
    let stepScore = 0
    for (const { row, col } of firstMatch.cells) {
      const t = grid[row][col]
      if (!t) continue
      stepScore += SCORE_PER_TILE_BASE
      if (t.special) stepScore += SCORE_PER_SPECIAL
    }
    stepScore *= mult
    totalGained += stepScore
    state.score += stepScore

    // Clear cells (skipping the "creator" positions for 4/5-in-a-row) and
    // resolve any specials that should be spawned in their place.
    const { cleared: cellsToClear, creators } = resolveSpecials(grid, firstMatch)
    let cleared = 0
    for (const { row, col } of cellsToClear) {
      if (grid[row][col]) {
        grid[row][col] = null
        cleared++
      }
    }
    // Place creator specials on the surviving positions.
    for (const c of creators) {
      grid[c.row][c.col] = makeSpecialTile(c.id, c.special)
      spawned.push(c)
    }

    // Apply gravity: existing tiles drop into the holes. The new tiles that
    // are placed at the top of each column have not been spawned yet — that
    // happens in refillFromAbove, which also returns the spawn list.
    const falls = applyGravity(grid)
    const spawnsHere = refillFromAbove(grid, rng, [])

    cascade.push({
      matches: firstMatch,
      cleared,
      score: stepScore,
      multiplier: mult,
      clearedCells,
      falls,
      spawns: spawnsHere,
    })

    // Next matches
    firstMatch = findMatches(grid)
  }

  state.cascades += cascade.length
  state.comboMax = Math.max(state.comboMax, comboMax)
  state.grid = grid

  return {
    ok: true,
    cascade,
    comboMax,
    scoreGained: totalGained,
    spawned,
  }
}

/**
 * Detect whether the board has any swap that would form a match. Used to
 * decide if the game is "stuck" (and to give a "shuffle" hint). Cheap
 * O(rows*cols) scan.
 */
export function hasAnyValidMove(grid: Grid): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c + 1 < GRID_SIZE) {
        swapInPlace(grid, r, c, r, c + 1)
        const m = findMatches(grid)
        swapInPlace(grid, r, c, r, c + 1)
        if (m.cells.length > 0) return true
      }
      if (r + 1 < GRID_SIZE) {
        swapInPlace(grid, r, c, r + 1, c)
        const m = findMatches(grid)
        swapInPlace(grid, r, c, r + 1, c)
        if (m.cells.length > 0) return true
      }
    }
  }
  return false
}

function swapInPlace(grid: Grid, r1: number, c1: number, r2: number, c2: number): void {
  const tmp = grid[r1][c1]
  grid[r1][c1] = grid[r2][c2]
  grid[r2][c2] = tmp
}

/** Shuffle the board in place (used when no valid moves remain). */
export function shuffleBoard(state: BoardState, rng: () => number): void {
  // Fisher-Yates on the flattened tiles
  const flat: Tile[] = []
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = state.grid[r][c]
      if (t) flat.push({ ...t })
    }
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = flat[i]!
    flat[i] = flat[j]!
    flat[j] = tmp
  }
  let i = 0
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++) {
      state.grid[r][c] = flat[i++] ?? { id: pickId(rng), special: null }
    }
}
