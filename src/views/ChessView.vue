<script setup lang="ts">
import { computed, ref, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ChessPiece from '@/components/games/ChessPiece.vue'
import {
  type Color,
  type PieceType,
  type GameState,
  type Move,
  createInitialState,
  applyMove,
  legalMovesForPiece,
  updateStatus,
  moveToAlgebraic,
  squareName,
  pieceValue,
} from '@/logic/chess-engine'
import { useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const { localRoute } = useLocale()

const state = ref<GameState>(createInitialState())
const selected = ref<{ row: number; col: number } | null>(null)
const lastMove = ref<{ from: { row: number; col: number }; to: { row: number; col: number } } | null>(null)
const playerColor = ref<Color>('w')
// Pending pawn promotion: store from/to + show modal
const promotion = ref<{ from: { row: number; col: number }; to: { row: number; col: number } } | null>(null)
const showResignConfirm = ref(false)
const boardEl = ref<HTMLDivElement | null>(null)

const gameOver = computed(() => state.value.status === 'checkmate' || state.value.status === 'stalemate' || state.value.status === 'draw')
const myTurn = computed(() => state.value.turn === playerColor.value && !gameOver.value)
const inCheck = computed(() => state.value.status === 'check' && !gameOver.value)

// Legal targets for the selected piece (in board coords)
const legalTargets = computed<Array<{ row: number; col: number; special?: string }>>(() => {
  if (!selected.value) return []
  if (state.value.turn !== playerColor.value) return []
  return legalMovesForPiece(state.value, selected.value.row, selected.value.col)
})

// Build a 2D array of squares for rendering. Flip orientation if playing black.
interface RenderSquare {
  row: number
  col: number
  piece: GameState['board'][number][number]
  isLight: boolean
  isSelected: boolean
  isLegal: boolean
  isLegalCapture: boolean
  isLastFrom: boolean
  isLastTo: boolean
  isCheckSquare: boolean
}

function isCheckOnSquare(row: number, col: number): boolean {
  if (!inCheck.value) return false
  const p = state.value.board[row][col]
  return p?.type === 'k' && p.color === state.value.turn
}

function isLightSquare(r: number, c: number) {
  return (r + c) % 2 === 0
}

const rows = computed<RenderSquare[][]>(() => {
  // For 'w' (default) show row 0 (black) at top; for 'b' flip.
  const range = playerColor.value === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0]
  return range.map((row) => {
    const colRange = playerColor.value === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0]
    return colRange.map((col) => {
      const t = legalTargets.value.find((m) => m.row === row && m.col === col)
      const p = state.value.board[row][col]
      return {
        row,
        col,
        piece: p,
        isLight: isLightSquare(row, col),
        isSelected: selected.value?.row === row && selected.value?.col === col,
        isLegal: !!t,
        isLegalCapture: !!t && !!p && p.color !== playerColor.value,
        isLastFrom: lastMove.value?.from.row === row && lastMove.value?.from.col === col,
        isLastTo: lastMove.value?.to.row === row && lastMove.value?.to.col === col,
        isCheckSquare: isCheckOnSquare(row, col),
      }
    })
  })
})

const files = computed(() => playerColor.value === 'w' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'])
const ranks = computed(() => playerColor.value === 'w' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8])

// Captured pieces: combine both sides and group by type for display, sorted by value
const capturedDisplay = computed(() => {
  const all: Array<{ type: PieceType; color: Color }> = [
    ...state.value.capturedByWhite.map((p) => ({ type: p.type, color: p.color as Color })),
    ...state.value.capturedByBlack.map((p) => ({ type: p.type, color: p.color as Color })),
  ]
  return all
})

const materialAdvantage = computed(() => {
  let white = 0, black = 0
  for (const c of capturedDisplay.value) {
    const v = pieceValue(c.type)
    if (c.color === 'b') white += v
    else black += v
  }
  return white - black // positive = white ahead
})

// Move history (algebraic)
const moveHistory = computed<Array<{ index: number; white?: string; black?: string; number: number }>>(() => {
  const hist: Array<{ index: number; white?: string; black?: string; number: number }> = []
  for (let i = 0; i < state.value.history.length; i += 2) {
    const num = i / 2 + 1
    const w = state.value.history[i]
    const b = state.value.history[i + 1]
    hist.push({
      index: i,
      number: num,
      white: w ? moveToAlgebraic(state.value, w) : undefined,
      black: b ? moveToAlgebraic(state.value, b) : undefined,
    })
  }
  return hist
})

function onSquareClick(row: number, col: number) {
  if (gameOver.value) return
  if (state.value.turn !== playerColor.value) return
  const piece = state.value.board[row][col]

  // If a piece is already selected
  if (selected.value) {
    const target = legalTargets.value.find((m) => m.row === row && m.col === col)
    if (target) {
      // Check for pawn promotion
      const movingPiece = state.value.board[selected.value.row][selected.value.col]
      const isPromotion =
        movingPiece?.type === 'p' &&
        ((movingPiece.color === 'w' && row === 0) || (movingPiece.color === 'b' && row === 7))
      if (isPromotion) {
        promotion.value = { from: { row: selected.value.row, col: selected.value.col }, to: { row, col } }
        selected.value = null
        return
      }
      applyPlayerMove({ from: selected.value, to: { row, col } })
      selected.value = null
      return
    }
    // If clicked own piece, switch selection
    if (piece && piece.color === playerColor.value) {
      selected.value = { row, col }
      return
    }
    // Otherwise deselect
    selected.value = null
    return
  }

  // Select a piece if it belongs to current player
  if (piece && piece.color === playerColor.value) {
    selected.value = { row, col }
  }
}

function applyPlayerMove(args: { from: { row: number; col: number }; to: { row: number; col: number }; promotion?: PieceType }) {
  const piece = state.value.board[args.from.row][args.from.col]
  if (!piece) return
  const legal = legalTargets.value.find((m) => m.row === args.to.row && m.col === args.to.col)
  if (!legal && !args.promotion) return
  // Build Move for engine
  const mv: Move = {
    from: args.from,
    to: args.to,
    piece,
    captured: state.value.board[args.to.row][args.to.col],
    enPassant: legal?.special === 'ep',
    castle: legal?.special === 'castle-k' ? 'k' : legal?.special === 'castle-q' ? 'q' : undefined,
    promotion: args.promotion,
  }
  const next = applyMove(state.value, mv)
  state.value = updateStatus(next)
  lastMove.value = { from: args.from, to: args.to }
}

function onPromotionChoose(p: PieceType) {
  if (!promotion.value) return
  const piece = state.value.board[promotion.value.from.row][promotion.value.from.col]
  if (!piece) {
    promotion.value = null
    return
  }
  const mv: Move = {
    from: promotion.value.from,
    to: promotion.value.to,
    piece,
    captured: state.value.board[promotion.value.to.row][promotion.value.to.col],
    promotion: p,
  }
  const next = applyMove(state.value, mv)
  state.value = updateStatus(next)
  lastMove.value = { from: promotion.value.from, to: promotion.value.to }
  promotion.value = null
}

function newGame() {
  state.value = createInitialState()
  selected.value = null
  lastMove.value = null
  promotion.value = null
  showResignConfirm.value = false
  scrollToTop()
}

function resign() {
  if (gameOver.value) return
  const winner: Color = playerColor.value === 'w' ? 'b' : 'w'
  state.value = { ...state.value, status: 'checkmate', winner }
  showResignConfirm.value = false
}

function flipSides() {
  playerColor.value = playerColor.value === 'w' ? 'b' : 'w'
  selected.value = null
}

const fullmoveNumber = computed(() => state.value.fullMoveNumber)
const opponentColor = computed<Color>(() => playerColor.value === 'w' ? 'b' : 'w')

const winnerText = computed(() => {
  if (state.value.status === 'checkmate') {
    return t('games.chessGame.winnerIs', { name: state.value.winner === 'w' ? t('games.chessGame.white') : t('games.chessGame.black') })
  }
  if (state.value.status === 'stalemate') return t('games.chessGame.stalemate')
  if (state.value.status === 'draw') return t('games.chessGame.draw')
  return ''
})

function scrollToTop() {
  nextTick(() => {
    if (boardEl.value) boardEl.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

// Keyboard: Escape to deselect, arrow keys (optional, light)
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') selected.value = null
}
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}
</script>

<template>
  <SeoHead
    :title="t('games.chessGame.title')"
    :description="t('games.chessGame.description')"
  />

  <div ref="boardEl" class="mx-auto max-w-6xl px-4 py-6 md:py-10">
    <!-- Header -->
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl md:text-4xl font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          ♞ {{ t('games.chessGame.title') }}
        </h1>
        <p class="text-sm text-stone-600 dark:text-stone-400 mt-1">
          {{ t('games.chessGame.description') }}
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <BaseButton variant="ghost" size="sm" @click="flipSides">
          {{ t('games.chessGame.flipSides') }}
        </BaseButton>
        <BaseButton variant="ghost" size="sm" @click="newGame">
          {{ t('games.chessGame.newGame') }}
        </BaseButton>
        <BaseButton
          v-if="!gameOver"
          variant="ghost"
          size="sm"
          class="text-red-600 dark:text-red-400"
          @click="showResignConfirm = true"
        >
          {{ t('games.chessGame.resign') }}
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6">
      <!-- Board area -->
      <div class="flex flex-col items-center">
        <!-- Opponent bar -->
        <div
          class="w-full max-w-[min(92vw,560px)] mb-2 flex items-center justify-between px-3 py-2 rounded-lg bg-stone-200/60 dark:bg-stone-800/60 backdrop-blur"
        >
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :class="opponentColor === 'w' ? 'bg-amber-100 border border-stone-500' : 'bg-stone-800 border border-stone-500'" />
            <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {{ opponentColor === 'w' ? t('games.chessGame.white') : t('games.chessGame.black') }}
            </span>
          </div>
          <div v-if="inCheck && state.turn === opponentColor" class="text-xs font-bold text-red-600">
            {{ t('games.chessGame.check') }}!
          </div>
        </div>

        <!-- Board -->
        <div class="relative w-full max-w-[min(92vw,560px)] aspect-square select-none">
          <div
            class="grid grid-cols-8 grid-rows-8 w-full h-full rounded-md overflow-hidden ring-2 ring-amber-900/40 dark:ring-amber-500/40 shadow-2xl"
          >
            <button
              v-for="(sq, i) in rows.flat()"
              :key="i"
              type="button"
              class="relative aspect-square flex items-center justify-center transition-colors"
              :class="[
                sq.isLight ? 'bg-amber-100' : 'bg-amber-700',
                sq.isSelected ? 'ring-4 ring-yellow-400 z-10' : '',
                sq.isLastFrom || sq.isLastTo ? 'ring-4 ring-blue-400/70 z-10' : '',
                sq.isCheckSquare ? 'ring-4 ring-red-500 z-10' : '',
                !gameOver && state.turn === playerColor && sq.piece && sq.piece.color === playerColor ? 'cursor-pointer' : '',
                !gameOver && state.turn === playerColor && !sq.piece && sq.isLegal ? 'cursor-pointer' : '',
                !gameOver && state.turn === playerColor && sq.piece && sq.piece.color !== playerColor && sq.isLegal ? 'cursor-pointer' : '',
              ]"
              :aria-label="`${squareName(sq.row, sq.col)}${sq.piece ? ' ' + sq.piece.type + ' ' + sq.piece.color : ''}`"
              @click="onSquareClick(sq.row, sq.col)"
            >
              <!-- Piece -->
              <ChessPiece
                v-if="sq.piece"
                :type="sq.piece.type"
                :color="sq.piece.color"
                :size="64"
                class="relative z-[2]"
              />

              <!-- Legal move dot -->
              <span
                v-if="sq.isLegal && !sq.isLegalCapture && !sq.piece"
                class="absolute w-1/3 h-1/3 rounded-full bg-stone-900/40 dark:bg-stone-100/40 pointer-events-none z-[1]"
              />
              <!-- Legal capture ring -->
              <span
                v-if="sq.isLegalCapture || (sq.isLegal && sq.piece)"
                class="absolute inset-1 rounded-full ring-4 ring-stone-900/40 dark:ring-stone-100/40 pointer-events-none z-[1]"
              />

              <!-- File label (bottom row) -->
              <span
                v-if="(playerColor === 'w' && sq.row === 7) || (playerColor === 'b' && sq.row === 0)"
                class="absolute bottom-0.5 right-1 text-[10px] font-bold pointer-events-none"
                :class="sq.isLight ? 'text-amber-700' : 'text-amber-100'"
              >
                {{ files[i % 8] }}
              </span>
              <!-- Rank label (left col) -->
              <span
                v-if="(playerColor === 'w' && sq.col === 0) || (playerColor === 'b' && sq.col === 7)"
                class="absolute top-0.5 left-1 text-[10px] font-bold pointer-events-none"
                :class="sq.isLight ? 'text-amber-700' : 'text-amber-100'"
              >
                {{ ranks[Math.floor(i / 8)] }}
              </span>
            </button>
          </div>
        </div>

        <!-- Player bar -->
        <div
          class="w-full max-w-[min(92vw,560px)] mt-2 flex items-center justify-between px-3 py-2 rounded-lg bg-amber-100/80 dark:bg-amber-900/30"
        >
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :class="playerColor === 'w' ? 'bg-amber-100 border border-stone-500' : 'bg-stone-800 border border-stone-500'" />
            <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {{ playerColor === 'w' ? t('games.chessGame.white') : t('games.chessGame.black') }}
              <span class="text-stone-500 dark:text-stone-400 ml-1">({{ t('games.chessGame.you') }})</span>
            </span>
          </div>
          <div class="text-xs text-stone-600 dark:text-stone-400">
            <span v-if="!gameOver">
              {{ myTurn ? t('games.chessGame.yourTurn') : `${opponentColor === 'w' ? t('games.chessGame.white') : t('games.chessGame.black')} ${t('games.chessGame.thinking')}` }}
            </span>
            <span v-else-if="state.status === 'checkmate'" class="text-amber-700 dark:text-amber-300 font-bold">
              🏆 {{ winnerText }}
            </span>
            <span v-else class="text-stone-500 font-bold">
              🤝 {{ winnerText }}
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="flex flex-col gap-3">
        <!-- Captured pieces -->
        <div class="rounded-lg bg-white/70 dark:bg-stone-800/60 p-3 ring-1 ring-stone-300 dark:ring-stone-700">
          <h3 class="text-sm font-bold mb-2 text-stone-700 dark:text-stone-200">
            {{ t('games.chessGame.capturedPieces') }}
          </h3>
          <div class="flex items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-400 mb-1">
            <span>↑ {{ playerColor === 'w' ? t('games.chessGame.black') : t('games.chessGame.white') }}</span>
            <span v-if="materialAdvantage > 0" class="font-bold">+{{ materialAdvantage }}</span>
            <span v-else-if="materialAdvantage < 0" class="font-bold text-red-500">{{ materialAdvantage }}</span>
            <span v-else>±0</span>
          </div>
          <div class="flex flex-wrap gap-0.5 min-h-[28px] items-center">
            <template v-for="(c, idx) in capturedDisplay.filter(c => c.color !== playerColor)" :key="'a'+idx">
              <ChessPiece :type="c.type" :color="c.color" :size="22" />
            </template>
          </div>
          <div class="border-t border-stone-300 dark:border-stone-700 my-2"></div>
          <div class="flex items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-400 mb-1">
            <span>↓ {{ playerColor === 'w' ? t('games.chessGame.white') : t('games.chessGame.black') }}</span>
            <span>({{ t('games.chessGame.you') }})</span>
          </div>
          <div class="flex flex-wrap gap-0.5 min-h-[28px] items-center">
            <template v-for="(c, idx) in capturedDisplay.filter(c => c.color === playerColor)" :key="'b'+idx">
              <ChessPiece :type="c.type" :color="c.color" :size="22" />
            </template>
          </div>
        </div>

        <!-- Move history -->
        <div class="rounded-lg bg-white/70 dark:bg-stone-800/60 p-3 ring-1 ring-stone-300 dark:ring-stone-700 flex-1 min-h-[180px] max-h-[360px] overflow-y-auto">
          <h3 class="text-sm font-bold mb-2 text-stone-700 dark:text-stone-200">
            {{ t('games.chessGame.moveHistory') }}
            <span class="text-stone-500 font-normal ml-1">— {{ fullmoveNumber }}</span>
          </h3>
          <div v-if="moveHistory.length === 0" class="text-xs text-stone-500 italic">
            {{ t('games.chessGame.noMovesYet') }}
          </div>
          <table v-else class="w-full text-xs">
            <tbody>
              <tr v-for="m in moveHistory" :key="m.index" class="border-b border-stone-200/50 dark:border-stone-700/50">
                <td class="py-0.5 pr-1 text-stone-500 w-6">{{ m.number }}.</td>
                <td class="py-0.5 pr-1 font-mono font-semibold text-stone-800 dark:text-stone-200">{{ m.white }}</td>
                <td class="py-0.5 font-mono font-semibold text-stone-800 dark:text-stone-200">{{ m.black || '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <BaseButton variant="ghost" @click="localRoute('/games')">
          ← {{ t('games.chessGame.backToGames') }}
        </BaseButton>
      </aside>
    </div>

    <!-- Promotion modal -->
    <Teleport to="body">
      <div
        v-if="promotion"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="promotion = null"
      >
        <div class="bg-white dark:bg-stone-900 rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <h2 class="text-lg font-bold mb-4 text-stone-800 dark:text-stone-100 text-center">
            {{ t('games.chessGame.promoteTitle') }}
          </h2>
          <div class="grid grid-cols-4 gap-3">
            <button
              v-for="p in (['q', 'r', 'b', 'n'] as PieceType[])"
              :key="p"
              class="flex flex-col items-center gap-1 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-stone-700 transition"
              @click="onPromotionChoose(p)"
            >
              <ChessPiece :type="p" :color="playerColor" :size="56" />
              <span class="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {{ p === 'q' ? t('games.chessGame.promotionQueen') : p === 'r' ? t('games.chessGame.promotionRook') : p === 'b' ? t('games.chessGame.promotionBishop') : t('games.chessGame.promotionKnight') }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Resign confirm modal -->
      <div
        v-if="showResignConfirm"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="showResignConfirm = false"
      >
        <div class="bg-white dark:bg-stone-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
          <h2 class="text-lg font-bold mb-2 text-stone-800 dark:text-stone-100">
            {{ t('games.chessGame.resignConfirmTitle') }}
          </h2>
          <p class="text-sm text-stone-600 dark:text-stone-400 mb-4">
            {{ t('games.chessGame.resignConfirmDesc') }}
          </p>
          <div class="flex gap-2 justify-end">
            <BaseButton variant="ghost" @click="showResignConfirm = false">
              {{ t('games.chessGame.cancel') }}
            </BaseButton>
            <BaseButton variant="danger" @click="resign">
              {{ t('games.chessGame.resign') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
