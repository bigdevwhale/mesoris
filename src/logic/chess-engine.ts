/**
 * Chess engine — pure TypeScript implementation of all standard FIDE rules.
 *
 * Board representation: 8x8 array. board[row][col] where row 0 = rank 8 (black back rank),
 * row 7 = rank 1 (white back rank). col 0 = file a, col 7 = file h.
 *
 * Each cell holds a Piece or null. A Piece has: type, color, hasMoved.
 */

export type Color = 'w' | 'b'
export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p'

export interface Piece {
  type: PieceType
  color: Color
  hasMoved: boolean
}

export type Square = Piece | null
export type Board = Square[][] // 8x8

export interface Move {
  from: { row: number; col: number }
  to: { row: number; col: number }
  piece: Piece
  captured?: Piece | null
  // Special move flags
  castle?: 'k' | 'q' // king-side or queen-side castling
  enPassant?: boolean
  promotion?: PieceType
}

export interface GameState {
  board: Board
  turn: Color
  // For en passant: square that can be captured en passant (the square the pawn passed over)
  enPassantTarget: { row: number; col: number } | null
  // For castling tracking (also uses piece.hasMoved)
  castlingRights: { wk: boolean; wq: boolean; bk: boolean; bq: boolean }
  // Move history for undo
  history: Move[]
  // Captured pieces (for display)
  capturedByWhite: Piece[] // black pieces captured by white
  capturedByBlack: Piece[] // white pieces captured by black
  // Result tracking
  status: 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw'
  winner: Color | null
  // Position repetition counter (for 50-move / 3-fold)
  halfMoveClock: number
  fullMoveNumber: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function cloneBoard(board: Board): Board {
  return board.map(row => row.map(sq => (sq ? { ...sq } : null)))
}

export function inBounds(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8
}

export function pieceValue(type: PieceType): number {
  return { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }[type]
}

export function squareName(row: number, col: number): string {
  return `${String.fromCharCode(97 + col)}${8 - row}`
}

// ─── Initial board setup ─────────────────────────────────────────────────────

export function createInitialBoard(): Board {
  const empty: Board = Array.from({ length: 8 }, () => Array<Square>(8).fill(null))
  const backRank: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
  for (let c = 0; c < 8; c++) {
    empty[0][c] = { type: backRank[c], color: 'b', hasMoved: false }
    empty[1][c] = { type: 'p', color: 'b', hasMoved: false }
    empty[6][c] = { type: 'p', color: 'w', hasMoved: false }
    empty[7][c] = { type: backRank[c], color: 'w', hasMoved: false }
  }
  return empty
}

export function createInitialState(): GameState {
  return {
    board: createInitialBoard(),
    turn: 'w',
    enPassantTarget: null,
    castlingRights: { wk: true, wq: true, bk: true, bq: true },
    history: [],
    capturedByWhite: [],
    capturedByBlack: [],
    status: 'playing',
    winner: null,
    halfMoveClock: 0,
    fullMoveNumber: 1,
  }
}

// ─── Move generation ─────────────────────────────────────────────────────────

// Returns true if a piece at (r, c) of given color attacks the square (tr, tc).
// Used for check detection. Considers en passant capture and pawn attacks.
function squareAttackedBy(board: Board, tr: number, tc: number, byColor: Color, enPassant: { row: number; col: number } | null = null): boolean {
  // Pawn attacks
  const dir = byColor === 'w' ? 1 : -1
  for (const dc of [-1, 1]) {
    const r = tr - dir
    const c = tc - dc
    if (inBounds(r, c) && board[r][c]?.type === 'p' && board[r][c]?.color === byColor) return true
  }
  // Knight attacks
  const knightOffsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
  for (const [dr, dc] of knightOffsets) {
    const r = tr + dr, c = tc + dc
    if (inBounds(r, c) && board[r][c]?.type === 'n' && board[r][c]?.color === byColor) return true
  }
  // Sliding: bishop/rook/queen
  const slidingDirs: Array<{ dr: number; dc: number; types: PieceType[] }> = [
    { dr: -1, dc: 0, types: ['r', 'q'] }, { dr: 1, dc: 0, types: ['r', 'q'] },
    { dr: 0, dc: -1, types: ['r', 'q'] }, { dr: 0, dc: 1, types: ['r', 'q'] },
    { dr: -1, dc: -1, types: ['b', 'q'] }, { dr: -1, dc: 1, types: ['b', 'q'] },
    { dr: 1, dc: -1, types: ['b', 'q'] }, { dr: 1, dc: 1, types: ['b', 'q'] },
  ]
  for (const { dr, dc, types } of slidingDirs) {
    let r = tr + dr, c = tc + dc
    while (inBounds(r, c)) {
      const p = board[r][c]
      if (p) {
        if (p.color === byColor && types.includes(p.type)) return true
        break
      }
      r += dr; c += dc
    }
  }
  // King attacks
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const r = tr + dr, c = tc + dc
      if (inBounds(r, c) && board[r][c]?.type === 'k' && board[r][c]?.color === byColor) return true
    }
  }
  return false
}

// Find the king of the given color. Returns [row, col] or null.
function findKing(board: Board, color: Color): [number, number] | null {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.type === 'k' && board[r][c]?.color === color) return [r, c]
    }
  }
  return null
}

export function isInCheck(state: GameState, color: Color = state.turn): boolean {
  const king = findKing(state.board, color)
  if (!king) return false
  return squareAttackedBy(state.board, king[0], king[1], color === 'w' ? 'b' : 'w', state.enPassantTarget)
}

// Generate pseudo-legal moves for a piece (not filtering for check).
// Returns list of {row, col} target squares.
function generatePseudoMoves(board: Board, r: number, c: number, enPassant: { row: number; col: number } | null): Array<{ row: number; col: number; special?: 'ep' | 'castle-k' | 'castle-q' }> {
  const piece = board[r][c]
  if (!piece) return []
  const moves: Array<{ row: number; col: number; special?: 'ep' | 'castle-k' | 'castle-q' }> = []
  const myColor = piece.color
  const enemy = (c: Color) => c !== myColor

  const add = (tr: number, tc: number) => {
    if (!inBounds(tr, tc)) return false
    const target = board[tr][tc]
    if (target && target.color === myColor) return false
    moves.push({ row: tr, col: tc })
    return !target // can continue sliding if empty
  }

  if (piece.type === 'p') {
    const dir = myColor === 'w' ? -1 : 1
    const startRow = myColor === 'w' ? 6 : 1
    // Forward 1
    if (inBounds(r + dir, c) && !board[r + dir][c]) {
      moves.push({ row: r + dir, col: c })
      // Forward 2 from start
      if (r === startRow && !board[r + 2 * dir][c]) {
        moves.push({ row: r + 2 * dir, col: c })
      }
    }
    // Diagonal captures
    for (const dc of [-1, 1]) {
      const tr = r + dir, tc = c + dc
      if (inBounds(tr, tc)) {
        if (board[tr][tc] && enemy(board[tr][tc]!.color)) {
          moves.push({ row: tr, col: tc })
        } else if (enPassant && enPassant.row === tr && enPassant.col === tc) {
          moves.push({ row: tr, col: tc, special: 'ep' })
        }
      }
    }
  } else if (piece.type === 'n') {
    const offsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
    for (const [dr, dc] of offsets) add(r + dr, c + dc)
  } else if (piece.type === 'b' || piece.type === 'r' || piece.type === 'q') {
    const dirs: number[][] = []
    if (piece.type === 'b' || piece.type === 'q') dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1])
    if (piece.type === 'r' || piece.type === 'q') dirs.push([-1, 0], [1, 0], [0, -1], [0, 1])
    for (const [dr, dc] of dirs) {
      let tr = r + dr, tc = c + dc
      while (inBounds(tr, tc)) {
        if (!add(tr, tc)) break
        tr += dr; tc += dc
      }
    }
  } else if (piece.type === 'k') {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        add(r + dr, c + dc)
      }
    }
  }
  return moves
}

// Generate all legal moves for a piece (filters out moves that leave own king in check).
export function legalMovesForPiece(state: GameState, r: number, c: number): Array<{ row: number; col: number; special?: 'ep' | 'castle-k' | 'castle-q' }> {
  const piece = state.board[r][c]
  if (!piece || piece.color !== state.turn) return []
  const pseudo = generatePseudoMoves(state.board, r, c, state.enPassantTarget)
  const legal: typeof pseudo = []
  for (const mv of pseudo) {
    const next = applyMove(state, { from: { row: r, col: c }, to: { row: mv.row, col: mv.col }, piece, special: mv.special }, true)
    if (!isInCheck(next, piece.color)) {
      legal.push(mv)
    }
  }
  return legal
}

export function allLegalMoves(state: GameState, color: Color = state.turn): Array<{ from: { row: number; col: number }; to: { row: number; col: number }; piece: Piece; captured?: Piece | null; special?: 'ep' | 'castle-k' | 'castle-q' }> {
  const moves: Array<{ from: { row: number; col: number }; to: { row: number; col: number }; piece: Piece; captured?: Piece | null; special?: 'ep' | 'castle-k' | 'castle-q' }> = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = state.board[r][c]
      if (!p || p.color !== color) continue
      const targets = legalMovesForPiece(state, r, c)
      for (const t of targets) {
        moves.push({
          from: { row: r, col: c },
          to: { row: t.row, col: t.col },
          piece: p,
          captured: state.board[t.row][t.col],
          special: t.special,
        })
      }
    }
  }
  return moves
}

// Apply a move to a state, returning a new state. If `dryRun` is true, don't update history/turn/captures.
export function applyMove(state: GameState, mv: { from: { row: number; col: number }; to: { row: number; col: number }; piece: Piece; special?: 'ep' | 'castle-k' | 'castle-q'; promotion?: PieceType }, dryRun = false): GameState {
  const next: GameState = {
    board: cloneBoard(state.board),
    turn: state.turn,
    enPassantTarget: null,
    castlingRights: { ...state.castlingRights },
    history: dryRun ? state.history : [...state.history, mv as Move],
    capturedByWhite: dryRun ? state.capturedByWhite : [...state.capturedByWhite],
    capturedByBlack: dryRun ? state.capturedByBlack : [...state.capturedByBlack],
    status: state.status,
    winner: state.winner,
    halfMoveClock: state.halfMoveClock,
    fullMoveNumber: state.fullMoveNumber,
  }
  const movingPiece = { ...state.board[mv.from.row][mv.from.col]! }
  const capturedPiece = state.board[mv.to.row][mv.to.col]
  movingPiece.hasMoved = true

  // Handle special moves
  if (mv.special === 'ep') {
    // En passant: captured pawn is behind the target square
    const capRow = mv.from.row
    const capCol = mv.to.col
    const cap = state.board[capRow][capCol]
    next.board[capRow][capCol] = null
    if (!dryRun) {
      if (state.turn === 'w') next.capturedByWhite.push(cap!)
      else next.capturedByBlack.push(cap!)
    }
  } else if (capturedPiece) {
    next.board[mv.to.row][mv.to.col] = null
    if (!dryRun) {
      if (state.turn === 'w') next.capturedByWhite.push(capturedPiece)
      else next.capturedByBlack.push(capturedPiece)
    }
  }

  // Move the piece (with promotion override)
  if (mv.promotion) {
    next.board[mv.to.row][mv.to.col] = { type: mv.promotion, color: movingPiece.color, hasMoved: true }
  } else {
    next.board[mv.to.row][mv.to.col] = movingPiece
  }
  next.board[mv.from.row][mv.from.col] = null

  // Castling: also move the rook
  if (mv.special === 'castle-k') {
    const r = mv.from.row
    next.board[r][5] = next.board[r][7]
    next.board[r][7] = null
    if (next.board[r][5]) (next.board[r][5] as Piece).hasMoved = true
  } else if (mv.special === 'castle-q') {
    const r = mv.from.row
    next.board[r][3] = next.board[r][0]
    next.board[r][0] = null
    if (next.board[r][3]) (next.board[r][3] as Piece).hasMoved = true
  }

  // Set en passant target if pawn moved 2 squares
  if (movingPiece.type === 'p' && Math.abs(mv.to.row - mv.from.row) === 2) {
    next.enPassantTarget = { row: (mv.from.row + mv.to.row) / 2, col: mv.from.col }
  }

  // Update castling rights: king moves → lose both for that color; rook moves → lose that side
  if (movingPiece.type === 'k') {
    if (movingPiece.color === 'w') { next.castlingRights.wk = false; next.castlingRights.wq = false }
    else { next.castlingRights.bk = false; next.castlingRights.bq = false }
  }
  if (movingPiece.type === 'r') {
    if (movingPiece.color === 'w' && mv.from.row === 7) {
      if (mv.from.col === 0) next.castlingRights.wq = false
      if (mv.from.col === 7) next.castlingRights.wk = false
    }
    if (movingPiece.color === 'b' && mv.from.row === 0) {
      if (mv.from.col === 0) next.castlingRights.bq = false
      if (mv.from.col === 7) next.castlingRights.bk = false
    }
  }
  // If a rook is captured on its starting square, opponent loses that right
  if (capturedPiece?.type === 'r') {
    if (mv.to.row === 7 && mv.to.col === 0) next.castlingRights.wq = false
    if (mv.to.row === 7 && mv.to.col === 7) next.castlingRights.wk = false
    if (mv.to.row === 0 && mv.to.col === 0) next.castlingRights.bq = false
    if (mv.to.row === 0 && mv.to.col === 7) next.castlingRights.bk = false
  }

  // Update turn
  next.turn = state.turn === 'w' ? 'b' : 'w'

  // Update half-move clock
  if (movingPiece.type === 'p' || capturedPiece) next.halfMoveClock = 0
  else if (!dryRun) next.halfMoveClock = state.halfMoveClock + 1

  if (!dryRun && state.turn === 'b') next.fullMoveNumber = state.fullMoveNumber + 1

  return next
}

// Check for castling availability (returns 'k' / 'q' suffix on the king's legal moves)
// Used by UI to render castling indicators.
export function getCastlingMoves(state: GameState, r: number, c: number): Array<'k' | 'q'> {
  const piece = state.board[r][c]
  if (!piece || piece.type !== 'k' || piece.hasMoved || piece.color !== state.turn) return []
  if (isInCheck(state, piece.color)) return []
  const rights = state.castlingRights
  const backRank = piece.color === 'w' ? 7 : 0
  if (r !== backRank || c !== 4) return []
  const enemy = piece.color === 'w' ? 'b' : 'w'
  const result: Array<'k' | 'q'> = []
  // King-side
  const canK = piece.color === 'w' ? rights.wk : rights.bk
  if (canK && !state.board[backRank][5] && !state.board[backRank][6]) {
    if (!squareAttackedBy(state.board, backRank, 5, enemy, state.enPassantTarget) &&
        !squareAttackedBy(state.board, backRank, 6, enemy, state.enPassantTarget)) {
      result.push('k')
    }
  }
  // Queen-side
  const canQ = piece.color === 'w' ? rights.wq : rights.bq
  if (canQ && !state.board[backRank][1] && !state.board[backRank][2] && !state.board[backRank][3]) {
    if (!squareAttackedBy(state.board, backRank, 2, enemy, state.enPassantTarget) &&
        !squareAttackedBy(state.board, backRank, 3, enemy, state.enPassantTarget)) {
      result.push('q')
    }
  }
  return result
}

// After a move, check for check / checkmate / stalemate / 50-move draw.
export function updateStatus(state: GameState): GameState {
  if (state.status === 'checkmate' || state.status === 'stalemate' || state.status === 'draw') return state
  const moves = allLegalMoves(state, state.turn)
  const inCheck = isInCheck(state, state.turn)
  let status: GameState['status'] = 'playing'
  let winner: Color | null = null
  if (moves.length === 0) {
    if (inCheck) {
      status = 'checkmate'
      winner = state.turn === 'w' ? 'b' : 'w'
    } else {
      status = 'stalemate'
    }
  } else if (inCheck) {
    status = 'check'
  }
  // 50-move rule
  if (state.halfMoveClock >= 100) status = 'draw'
  // Insufficient material (basic)
  if (isInsufficientMaterial(state.board)) status = 'draw'
  return { ...state, status, winner }
}

function isInsufficientMaterial(board: Board): boolean {
  const pieces: Piece[] = []
  for (const row of board) for (const sq of row) if (sq) pieces.push(sq)
  if (pieces.length === 2) return true // K vs K
  if (pieces.length === 3) {
    const nonKing = pieces.find(p => p.type !== 'k')
    if (nonKing && (nonKing.type === 'b' || nonKing.type === 'n')) return true // K+B vs K or K+N vs K
  }
  return false
}

// Undo last move (simple — restore from history). Not used in current build but kept for future.
export function undoLastMove(state: GameState): GameState {
  if (state.history.length === 0) return state
  // For simplicity, rebuild from scratch: walk history with a fresh state and replay all but last.
  const fresh = createInitialState()
  for (let i = 0; i < state.history.length - 1; i++) {
    const mv = state.history[i]
    const updated = applyMove(fresh, mv)
    Object.assign(fresh, updateStatus(updated))
  }
  return fresh
}

// ─── Move notation (algebraic) ───────────────────────────────────────────────

export function moveToAlgebraic(state: GameState, mv: Move): string {
  const piece = mv.piece
  const from = squareName(mv.from.row, mv.from.col)
  const to = squareName(mv.to.row, mv.to.col)
  if (mv.castle === 'k') return 'O-O'
  if (mv.castle === 'q') return 'O-O-O'
  const pieceLetter = piece.type === 'p' ? '' : piece.type.toUpperCase()
  const capture = mv.captured || mv.enPassant ? 'x' : ''
  const pawnFile = piece.type === 'p' && (mv.captured || mv.enPassant) ? from[0] : ''
  const promo = mv.promotion ? `=${mv.promotion.toUpperCase()}` : ''
  return `${pieceLetter}${pawnFile}${capture}${to}${promo}`
}

// Material advantage: positive = white is ahead
export function materialBalance(state: GameState): number {
  let balance = 0
  for (const row of state.board) {
    for (const sq of row) {
      if (!sq) continue
      const v = pieceValue(sq.type)
      balance += sq.color === 'w' ? v : -v
    }
  }
  return balance
}
