/**
 * Meteor Run — board race game engine (pure TypeScript, no Vue/DOM deps).
 *
 * Variable-length inward spiral. Player rolls a single d6, moves along the
 * spiral toward the finish, and tries to reach it before the computer-
 * controlled meteor does.
 */

export type CellType =
  | 'start'
  | 'finish'
  | 'normal'
  | 'boost_small'
  | 'boost_big'
  | 'penalty'
  | 'skip_turn'
  | 'teleport_fwd'
  | 'extra_dice'
  | 'double_move'
  | 'pit'
  | 'safe_zone'

export type Player = 'dino' | 'meteor'
export type Phase = 'intro' | 'playing' | 'result'
export type Winner = Player | null

export type BoardLength = 30 | 50 | 80

export interface BoardConfig {
  size: number
  rows: number
  cols: number
  layout: readonly { row: number; col: number }[]
}

export const DEFAULT_BOARD: BoardLength = 50

/**
 * Build an inward spiral layout on a cols×rows grid.
 * Index 0 = top-left (start), index cols*rows-1 = end of spiral.
 * Traversal is clockwise on the outer ring, then spirals inward.
 */
export function buildSpiralLayout(cols: number, rows: number): { row: number; col: number }[] {
  const out: { row: number; col: number }[] = []
  let top = 0
  let bottom = rows - 1
  let left = 0
  let right = cols - 1
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push({ row: top, col: c })
    for (let r = top + 1; r <= bottom; r++) out.push({ row: r, col: right })
    if (top < bottom && left < right) {
      for (let c = right - 1; c >= left; c--) out.push({ row: bottom, col: c })
      for (let r = bottom - 1; r > top; r--) out.push({ row: r, col: left })
    }
    top++
    bottom--
    left++
    right--
  }
  return out
}

/**
 * Pre-baked boards. For sizes 30 and 80 the spiral fits the grid exactly.
 * For 50 the grid holds 56 cells and the inner tail is dropped so the
 * finish lands near the visual center.
 */
export const BOARDS: Record<BoardLength, BoardConfig> = (() => {
  const b30 = buildSpiralLayout(6, 5)  // 30
  const b50 = buildSpiralLayout(8, 7)  // 56 → keep first 50
  const b80 = buildSpiralLayout(9, 9)  // 81 → keep first 80
  return {
    30: { size: 30, rows: 5, cols: 6, layout: b30 },
    50: { size: 50, rows: 7, cols: 8, layout: b50.slice(0, 50) },
    80: { size: 80, rows: 9, cols: 9, layout: b80.slice(0, 80) },
  }
})()

/** Deterministic PRNG (mulberry32) for stable board generation per length. */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/** Generate the effect array for a board of `size` cells. */
export function generateCells(size: number, seed = size * 7919): CellType[] {
  const cells: CellType[] = new Array(size)
  cells[0] = 'start'
  cells[size - 1] = 'finish'

  // Special tiles (counts that fit any board ≥ 30)
  const specials: CellType[] = [
    'safe_zone',       // 1
    'pit',             // 1
    'double_move',     // 1
    'boost_big',       // 2
    'boost_big',
    'teleport_fwd',    // 2
    'teleport_fwd',
    'extra_dice',      // 2
    'extra_dice',
    'skip_turn',       // 3
    'skip_turn',
    'skip_turn',
    'boost_small',     // 4
    'boost_small',
    'boost_small',
    'boost_small',
    'penalty',         // 4
    'penalty',
    'penalty',
    'penalty',
  ]

  // Shuffle deterministically, drop extras if board is too small
  const rng = mulberry32(seed)
  const pool = [...specials]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  // Reserve middle ~70% of cells for specials (skip the first 3 and last 3)
  const reserveStart = 3
  const reserveEnd = size - 4
  const slots: number[] = []
  for (let i = reserveStart; i <= reserveEnd; i++) slots.push(i)

  // Place specials in shuffled order
  for (const special of pool) {
    if (slots.length === 0) break
    const idx = Math.floor(rng() * slots.length)
    const cellIdx = slots.splice(idx, 1)[0]
    cells[cellIdx] = special
  }

  // Fill remaining with normal
  for (let i = 0; i < size; i++) {
    if (cells[i] === undefined) cells[i] = 'normal'
  }
  return cells
}

/** Convert a cell index to (row, col) on the active board layout. */
export function indexToCell(layout: readonly { row: number; col: number }[], index: number): { row: number; col: number } {
  const pos = layout[index]
  if (!pos) return { row: 0, col: 0 }
  return { row: pos.row, col: pos.col }
}

/**
 * Center percentage for a cell — used by the UI to absolutely position tiles.
 */
export function cellCenter(
  layout: readonly { row: number; col: number }[],
  cols: number,
  rows: number,
  index: number,
): { topPct: number; leftPct: number } {
  const { row, col } = indexToCell(layout, index)
  const cellWPct = 100 / cols
  const cellHPct = 100 / rows
  return {
    topPct: (row + 0.5) * cellHPct,
    leftPct: (col + 0.5) * cellWPct,
  }
}

export interface GameState {
  phase: Phase
  boardLength: BoardLength
  boardSize: number
  cells: CellType[]
  positions: { dino: number; meteor: number }
  currentTurn: Player
  skipNext: { dino: boolean; meteor: boolean }
  doubleMove: { dino: number; meteor: number }
  rollsAgain: { dino: boolean; meteor: boolean }
  turnCount: number
  lastDice: number
  lastMoveSteps: MoveStep[]
  lastLanded: { dino: number; meteor: number }
  message: string
  messageTone: 'info' | 'success' | 'warn' | 'danger' | 'celebrate'
  isAnimating: boolean
  isDiceRolling: { dino: boolean; meteor: boolean }
  winner: Winner
  activePlayer: Player
}

/** A single step in an animated move — the UI replays these. */
export interface MoveStep {
  from: number
  to: number
  cell: CellType
  isFinal: boolean
}

/** Single d6 roll, optionally doubled by double-move. */
export function rollDice(sides: 6 = 6): number {
  return 1 + Math.floor(Math.random() * sides)
}

export function createInitialState(boardLength: BoardLength = DEFAULT_BOARD): GameState {
  const cfg = BOARDS[boardLength]
  return {
    phase: 'intro',
    boardLength,
    boardSize: cfg.size,
    cells: generateCells(cfg.size),
    positions: { dino: 0, meteor: 0 },
    currentTurn: 'dino',
    skipNext: { dino: false, meteor: false },
    doubleMove: { dino: 0, meteor: 0 },
    rollsAgain: { dino: false, meteor: false },
    turnCount: 0,
    lastDice: 0,
    lastMoveSteps: [],
    lastLanded: { dino: 0, meteor: 0 },
    message: '',
    messageTone: 'info',
    isAnimating: false,
    isDiceRolling: { dino: false, meteor: false },
    winner: null,
    activePlayer: 'dino',
  }
}

/**
 * Plan a move from `from` for `dice` steps. Handles bounce at the finish.
 */
export function planMove(cells: CellType[], from: number, dice: number): MoveStep[] {
  const finish = cells.length - 1
  const steps: MoveStep[] = []
  let target = from + dice

  if (target > finish) {
    target = finish - (target - finish)
  }
  target = Math.max(0, Math.min(finish, target))

  const direction = target >= from ? 1 : -1
  let cursor = from
  while (cursor !== target) {
    cursor += direction
    const isFinal = cursor === target
    steps.push({ from: cursor - direction, to: cursor, cell: cells[cursor], isFinal })
  }
  if (steps.length === 0) {
    steps.push({ from, to: from, cell: cells[from], isFinal: true })
  }
  return steps
}

export interface CellEffect {
  key: string
  delta: number
  skipOpponent: boolean
  rollsAgain: boolean
  doubleMove: number
  sendToStart: boolean
  blocked: boolean
  isFinish: boolean
}

export function getCellEffect(cell: CellType, isOnSafeZone: boolean): CellEffect {
  const base: CellEffect = {
    key: cell,
    delta: 0,
    skipOpponent: false,
    rollsAgain: false,
    doubleMove: 0,
    sendToStart: false,
    blocked: false,
    isFinish: cell === 'finish',
  }

  switch (cell) {
    case 'start':
    case 'normal':
    case 'finish':
      return base
    case 'boost_small':
      return { ...base, delta: isOnSafeZone ? 0 : 2 }
    case 'boost_big':
      return { ...base, delta: isOnSafeZone ? 0 : 5 }
    case 'penalty':
      if (isOnSafeZone) return { ...base, blocked: true }
      return { ...base, delta: -2 }
    case 'skip_turn':
      return { ...base, skipOpponent: true }
    case 'teleport_fwd':
      return { ...base, delta: isOnSafeZone ? 0 : 6 }
    case 'extra_dice':
      return { ...base, rollsAgain: true }
    case 'double_move':
      return { ...base, doubleMove: 2 }
    case 'pit':
      if (isOnSafeZone) return { ...base, blocked: true }
      return { ...base, sendToStart: true }
    case 'safe_zone':
      return base
  }
}

/** Compute the bounce/overshoot message when a player overshoots FINISH. */
export function didBounce(from: number, dice: number, boardSize: number): boolean {
  return from + dice > boardSize - 1
}
