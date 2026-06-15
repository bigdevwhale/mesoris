<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import {
  GRID_SIZE,
  TILE_EMOJI,
  TILE_NAMES_EN,
  type BoardState,
  type Grid,
  type TileId,
  newGame,
  trySwap,
  hasAnyValidMove,
  shuffleBoard,
  makeRng,
} from '@/logic/dino-match3-engine'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

// Mutable RNG — start fresh on each new game
let rng: () => number = makeRng((Date.now() & 0xffffffff) >>> 0)

function freshBoard(): BoardState {
  const seed = ((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0)
  rng = makeRng(seed)
  const { state } = newGame(seed)
  return state
}

const board = ref<BoardState>(freshBoard())

/** The grid that the template actually renders. We keep this separate from
 *  `board.value.grid` (the engine state) so we can drive animations without
 *  immediately applying the engine's "already cleared and refilled" snapshot
 *  to the DOM — that snapshot is the *result* of the animation, not its
 *  starting point. */
let counter = 0
type DisplayTile = { key: string; id: TileId; special: 'dino-egg' | 'meteor' | null; row: number; col: number }
type DisplayGrid = (DisplayTile | null)[][]
const displayGrid = ref<DisplayGrid>(gridToDisplay(board.value.grid))

function gridToDisplay(grid: Grid): DisplayGrid {
  const out: DisplayGrid = []
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: (DisplayTile | null)[] = []
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r][c]
      row.push(t ? { key: `r${r}c${c}-${counter++}`, id: t.id, special: t.special, row: r, col: c } : null)
    }
    out.push(row)
  }
  return out
}

type Phase = 'intro' | 'playing' | 'result'
const phase = ref<Phase>('intro')

const best = ref(parseInt(localStorage.getItem('dino-match3-best') || '0'))
const lastScore = ref(0)
const showConfetti = ref(false)
const showResultModal = ref(false)
const animating = ref(false)

/** Cells that are currently playing the pop animation. We keep them rendered
 *  (with the same key as the cell) but apply a CSS animation that scales them
 *  up, flashes, and fades out. */
const popping = ref<Set<string>>(new Set())
/** Per-tile "fall from row N" markers. Keyed by tile key → fromRow offset in
 *  grid units. Consumed by the gravity-fall keyframe. */
const fallingFromRow = ref<Map<string, number>>(new Map())
/** Cells where a brand-new tile just dropped in from above — they should fade
 *  in slightly after the gravity animation begins. */
const spawning = ref<Set<string>>(new Set())
/** Whole-board fade for the shuffle (no matches) animation. */
const shuffleFade = ref<0 | 1>(1)
/** Tiles that were just swapped in a non-matching attempt. We briefly shake
 *  them red so the player understands "those two don't match" without making
 *  the board jump back and forth. */
const rejecting = ref<Set<string>>(new Set())

interface FloatingScore {
  id: number
  text: string
  row: number
  col: number
  tone: 'gold' | 'purple' | 'red'
}
const floatingScores = ref<FloatingScore[]>([])
let floatId = 0

interface ComboFlash {
  text: string
  tone: 'gold' | 'purple' | 'red'
  key: number
}
const comboFlash = ref<ComboFlash | null>(null)
let comboKey = 0

const selected = ref<{ row: number; col: number } | null>(null)
const hoverCell = ref<{ row: number; col: number } | null>(null)

// — Helpers ——————————————————————————————————————————————————————————————
function tileName(id: TileId): string {
  if (locale.value === 'ru') {
    const map: Record<TileId, string> = {
      0: 'Ти-Рекс',
      1: 'Бронтозавр',
      2: 'Окаменелость',
      3: 'Спинозавр',
      4: 'Птеродактиль',
      5: 'Анкилозавр',
    }
    return map[id]
  }
  if (locale.value === 'de') {
    const map: Record<TileId, string> = {
      0: 'T-Rex',
      1: 'Brontosaurus',
      2: 'Fossil',
      3: 'Spinosaurus',
      4: 'Pterodaktylus',
      5: 'Ankylosaurus',
    }
    return map[id]
  }
  if (locale.value === 'es') {
    const map: Record<TileId, string> = {
      0: 'T-Rex',
      1: 'Brontosaurio',
      2: 'Fósil',
      3: 'Espinosaurio',
      4: 'Pterodáctilo',
      5: 'Anquilosaurio',
    }
    return map[id]
  }
  if (locale.value === 'fr') {
    const map: Record<TileId, string> = {
      0: 'T-Rex',
      1: 'Brontosaure',
      2: 'Fossile',
      3: 'Spinosaure',
      4: 'Ptérodactyle',
      5: 'Ankylosaure',
    }
    return map[id]
  }
  if (locale.value === 'it') {
    const map: Record<TileId, string> = {
      0: 'T-Rex',
      1: 'Brontosauro',
      2: 'Fossile',
      3: 'Spinosauro',
      4: 'Pterodattilo',
      5: 'Anchilosauro',
    }
    return map[id]
  }
  if (locale.value === 'ja') {
    const map: Record<TileId, string> = {
      0: 'ティラノサウルス',
      1: 'ブロントサウルス',
      2: '化石',
      3: 'スピノサウルス',
      4: 'プテラノドン',
      5: 'アンキロサウルス',
    }
    return map[id]
  }
  if (locale.value === 'zh') {
    const map: Record<TileId, string> = {
      0: '霸王龙',
      1: '雷龙',
      2: '化石',
      3: '棘龙',
      4: '翼龙',
      5: '甲龙',
    }
    return map[id]
  }
  if (locale.value === 'ko') {
    const map: Record<TileId, string> = {
      0: '티라노사우루스',
      1: '브론토사우루스',
      2: '화석',
      3: '스피노사우루스',
      4: '프테라노돈',
      5: '안킬로사우루스',
    }
    return map[id]
  }
  if (locale.value === 'kk') {
    const map: Record<TileId, string> = {
      0: 'Ти-Рекс',
      1: 'Бронтозавр',
      2: 'Қазба',
      3: 'Спинозавр',
      4: 'Птеродактиль',
      5: 'Анкилозавр',
    }
    return map[id]
  }
  return TILE_NAMES_EN[id]
}

function tileColorClass(id: TileId): string {
  const colors: Record<TileId, string> = {
    0: 'from-rose-400 to-red-600',
    1: 'from-emerald-400 to-green-600',
    2: 'from-amber-300 to-amber-500',
    3: 'from-cyan-400 to-blue-600',
    4: 'from-violet-400 to-purple-600',
    5: 'from-lime-400 to-emerald-600',
  }
  return colors[id]
}

const isAdjacent = (a: { row: number; col: number }, b: { row: number; col: number }) => {
  const dr = Math.abs(a.row - b.row)
  const dc = Math.abs(a.col - b.col)
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1)
}

// — Drag-to-swap (for touch + mouse) —————————————————————————————————————
// We listen for pointermove/pointerup on `window` so we keep tracking even when
// the cursor leaves the original cell. We do NOT use setPointerCapture on a
// <button> — that intercepts pointerenter on sibling cells and breaks the
// drag on desktop browsers.
type DragState = { row: number; col: number } | null
const dragStart = ref<DragState>(null)
const dragCurrent = ref<{ row: number; col: number } | null>(null)

function cellFromPoint(x: number, y: number): { row: number; col: number } | null {
  const el = document.elementFromPoint(x, y) as HTMLElement | null
  if (!el) return null
  const btn = el.closest('[data-cell]') as HTMLElement | null
  if (!btn) return null
  const r = Number(btn.dataset.row)
  const c = Number(btn.dataset.col)
  if (Number.isNaN(r) || Number.isNaN(c)) return null
  return { row: r, col: c }
}

function onWindowPointerMove(e: PointerEvent) {
  if (!dragStart.value) return
  const c = cellFromPoint(e.clientX, e.clientY)
  if (c) dragCurrent.value = c
  else dragCurrent.value = null
}

async function onWindowPointerUp(e: PointerEvent) {
  if (!dragStart.value) return
  // Always clean up window listeners first
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerUp)

  const start = dragStart.value
  dragStart.value = null
  dragCurrent.value = null
  const target = cellFromPoint(e.clientX, e.clientY)
  if (!target) return

  // Same-cell tap: let the synthetic click handle selection.
  if (start.row === target.row && start.col === target.col) return

  // Cross-cell drag. Always suppress the trailing synthetic click.
  suppressClick = true
  if (!isAdjacent(start, target)) {
    // Non-adjacent drag: just move the selection to the target
    selected.value = target
    return
  }
  await attemptSwap(start, target)
  selected.value = null
}

function onCellPointerDown(r: number, c: number, e: PointerEvent) {
  if (phase.value !== 'playing' || animating.value) return
  // Only react to primary button / touch / pen
  if (e.pointerType === 'mouse' && e.button !== 0) return
  e.preventDefault()
  // Highlight the start cell as the user grabs it
  dragStart.value = { row: r, col: c }
  dragCurrent.value = { row: r, col: c }
  // NB: do NOT set `selected` here — the click handler does that for
  // same-cell taps. Setting it here would cause the click to immediately
  // toggle it off.
  window.addEventListener('pointermove', onWindowPointerMove, { passive: true })
  window.addEventListener('pointerup', onWindowPointerUp, { passive: true })
  window.addEventListener('pointercancel', onWindowPointerUp, { passive: true })
}

// Synthetic click events follow pointerup. After a drag we already handled
// the interaction, so we must ignore the trailing click — otherwise the
// click handler will run with the post-swap state and confuse the player.
let suppressClick = false

function onCellPointerEnter(r: number, c: number) {
  // While dragging, the global pointermove handler updates dragCurrent; we
  // do not need to do anything here. Outside of drag, this is just hover.
  hoverCell.value = { row: r, col: c }
}

// — Click-to-swap fallback —————————————————————————————————————————————————
async function onCellClick(r: number, c: number) {
  if (phase.value !== 'playing' || animating.value) return
  if (dragStart.value) return
  if (suppressClick) { suppressClick = false; return }
  const sel = selected.value
  if (!sel) {
    selected.value = { row: r, col: c }
    return
  }
  if (sel.row === r && sel.col === c) {
    selected.value = null
    return
  }
  if (!isAdjacent(sel, { row: r, col: c })) {
    selected.value = { row: r, col: c }
    return
  }
  await attemptSwap(sel, { row: r, col: c })
  selected.value = null
}

async function attemptSwap(a: { row: number; col: number }, b: { row: number; col: number }) {
  if (!isAdjacent(a, b)) {
    selected.value = null
    return
  }
  animating.value = true
  // Clear any in-flight reject animation from a previous attempt.
  rejecting.value = new Set()
  try {
    // trySwap clones the grid internally, swaps a<->b on the clone, checks
    // for matches, resolves the cascade (clear + gravity + refill), and
    // assigns the final grid back to state.grid on success. It mutates the
    // state in place. On failure it returns ok:false and leaves the grid
    // untouched.
    const result = trySwap(board.value, a, b, rng)
    if (!result.ok) {
      // The swap didn't form a match. We do NOT actually move the tiles —
      // we briefly shake the two involved cells in red so the player sees
      // "no match" without the board jumping back and forth.
      const tileA = displayGrid.value[a.row][a.col]
      const tileB = displayGrid.value[b.row][b.col]
      const set = new Set<string>()
      if (tileA) set.add(tileA.key)
      if (tileB) set.add(tileB.key)
      rejecting.value = set
      await sleep(380)
      rejecting.value = new Set()
      return
    }
    // Engine already wrote the resolved grid into board.value.grid. Animate
    // the cascade step-by-step against displayGrid.
    await animateCascade(result)
    // Re-sync displayGrid to the engine's resolved grid. animateCascade drives
    // the visual state step-by-step, but we also want the two to be in lock-
    // step at the end so subsequent `findSwap` calls (used for validation and
    // by tests) see what the engine sees.
    displayGrid.value = gridToDisplay(board.value.grid)
    popping.value = new Set()
    fallingFromRow.value = new Map()
    spawning.value = new Set()
    lastScore.value = board.value.score

    // Check for stuck board
    if (!hasAnyValidMove(board.value.grid)) {
      await runShuffleAnimation()
    }
  } finally {
    animating.value = false
  }
}

async function animateCascade(result: ReturnType<typeof trySwap>): Promise<void> {
  // Per-step durations. The total per step is popDuration + fallDuration.
  const popDuration = 280
  const fallDuration = 260

  for (let i = 0; i < result.cascade.length; i++) {
    const step = result.cascade[i]!
    const mult = step.multiplier

    // Floating score at the centroid of the popped cells
    const cent = centroid(step.clearedCells.map(c => ({ row: c.row, col: c.col })))
    if (cent) {
      const tone = mult >= 3 ? 'red' : mult === 2 ? 'purple' : 'gold'
      const text =
        mult >= 3
          ? `×${mult}  +${step.score}`
          : mult === 2
            ? `×2  +${step.score}`
            : `+${step.score}`
      const id = ++floatId
      floatingScores.value.push({
        id,
        text,
        row: cent.row,
        col: cent.col,
        tone,
      })
      setTimeout(() => {
        floatingScores.value = floatingScores.value.filter(f => f.id !== id)
      }, 950)
    }

    // 1) POP — mark every cleared cell so its tile plays the pop animation.
    //    The cell still has a tile in displayGrid (and the same Vue key) so
    //    CSS can scale+fade it. Vue will keep the DOM node alive.
    const popSet = new Set<string>()
    for (const cc of step.clearedCells) {
      const tile = displayGrid.value[cc.row][cc.col]
      if (tile) popSet.add(tile.key)
    }
    popping.value = popSet

    // Wait for the pop animation to play
    await sleep(popDuration)

    // 2) APPLY — clear popped cells, fall surviving tiles, spawn new ones.
    //    Reset popping so any in-flight animation finishes cleanly.
    popping.value = new Set()

    // Clear popped cells
    for (const cc of step.clearedCells) {
      displayGrid.value[cc.row][cc.col] = null
    }

    // Build a map from (row,col) → DisplayTile for tiles that exist now,
    // so we can find the source of each fall.
    const tileAt = new Map<string, DisplayTile>()
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const t = displayGrid.value[r][c]
        if (t) tileAt.set(`${r},${c}`, t)
      }
    }

    // Apply falls: move the existing tile from fromRow to toRow, keeping its
    // key/identity so Vue reuses the DOM node. Record fromRow for the CSS
    // animation.
    const fallMap = new Map<string, number>()
    for (const f of step.falls) {
      const src = tileAt.get(`${f.fromRow},${f.col}`)
      if (!src) continue
      // Detach from source row
      displayGrid.value[f.fromRow][f.col] = null
      // Place at target row (mutate in place to keep key)
      src.row = f.toRow
      src.col = f.col
      displayGrid.value[f.toRow][f.col] = src
      fallMap.set(src.key, f.fromRow)
    }

    // Apply spawns: brand-new tiles that fell in from above. They get new
    // keys so the DOM nodes are created fresh, and they're flagged as
    // "spawning" so the spawnDrop animation runs.
    const spawnSet = new Set<string>()
    for (const s of step.spawns) {
      const t: DisplayTile = {
        key: `spawn-${counter++}`,
        id: s.id,
        special: s.special,
        row: s.row,
        col: s.col,
      }
      displayGrid.value[s.row][s.col] = t
      spawnSet.add(t.key)
    }
    spawning.value = spawnSet
    fallingFromRow.value = fallMap

    // Trigger Vue reactivity for the nested displayGrid
    displayGrid.value = [...displayGrid.value]

    // Wait for the fall/spawn animations to play
    await sleep(fallDuration)

    // 3) CLEANUP — clear the per-tile animation flags so the next step starts
    //    from a clean state.
    fallingFromRow.value = new Map()
    spawning.value = new Set()
  }

  // Trim old floating scores
  floatingScores.value = floatingScores.value.slice(-8)
  if (result.comboMax >= 2) {
    const txt = result.comboMax >= 3
      ? t('games.dinoMatch3.comboHuge', { n: result.comboMax })
      : t('games.dinoMatch3.combo', { n: result.comboMax })
    flashCombo(txt, result.comboMax >= 3 ? 'red' : 'purple')
  }
}

async function runShuffleAnimation() {
  flashCombo(t('games.dinoMatch3.shuffled'), 'purple')
  shuffleFade.value = 0
  await sleep(180)
  shuffleBoard(board.value, rng)
  displayGrid.value = gridToDisplay(board.value.grid)
  // Mark all new tiles as "spawning" so they fade/drop in
  const allKeys = new Set<string>()
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = displayGrid.value[r][c]
      if (t) allKeys.add(t.key)
    }
  }
  spawning.value = allKeys
  shuffleFade.value = 1
  await sleep(260)
  spawning.value = new Set()
}

function flashCombo(text: string, tone: 'gold' | 'purple' | 'red') {
  comboFlash.value = { text, tone, key: ++comboKey }
  setTimeout(() => {
    if (comboFlash.value && comboFlash.value.key === comboKey) comboFlash.value = null
  }, 1100)
}

function centroid(cells: { row: number; col: number }[]): { row: number; col: number } | null {
  if (cells.length === 0) return null
  let r = 0, c = 0
  for (const x of cells) { r += x.row; c += x.col }
  return { row: r / cells.length, col: c / cells.length }
}

function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms))
}

// — Game flow —————————————————————————————————————————————————————————————
function startGame() {
  board.value = freshBoard()
  displayGrid.value = gridToDisplay(board.value.grid)
  popping.value = new Set()
  fallingFromRow.value = new Map()
  spawning.value = new Set()
  rejecting.value = new Set()
  shuffleFade.value = 1
  phase.value = 'playing'
  showResultModal.value = false
  lastScore.value = 0
  showConfetti.value = false
  floatingScores.value = []
  comboFlash.value = null
}

function endGame() {
  phase.value = 'result'
  if (board.value.score > best.value) {
    best.value = board.value.score
    localStorage.setItem('dino-match3-best', String(board.value.score))
  }
  // Track in store
  gameStore.recordGameCompletion('dino-match3', board.value.score)
  showConfetti.value = true
  showResultModal.value = true
}

// — Auto-end detection —————————————————————————————————————————————————
const movesTarget = ref(20)
const reachedTarget = computed(() => board.value.moves >= movesTarget.value)
watch(() => board.value.moves, (n) => { if (n >= movesTarget.value && phase.value === 'playing') endGame() })

// — Keyboard —————————————————————————————————————————————————————————————
function onKey(e: KeyboardEvent) {
  if (e.code === 'KeyR') {
    startGame()
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerUp)
})

// — Stats —————————————————————————————————————————————————————————————
const progressPct = computed(() => Math.min(100, Math.round((board.value.moves / movesTarget.value) * 100)))
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('games.dinoMatch3.title')"
      :description="t('games.dinoMatch3.hint')"
    />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
    </div>

    <h1 class="text-display-md mb-2 text-center">{{ t('games.dinoMatch3.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
      {{ t('games.dinoMatch3.hint') }}
    </p>

    <!-- HUD -->
    <div class="grid grid-cols-3 gap-3 mb-4 max-w-md mx-auto">
      <div class="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/60 p-3 text-center">
        <div class="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)]">{{ t('games.dinoMatch3.score') }}</div>
        <div class="text-2xl font-bold tabular-nums">{{ board.score }}</div>
      </div>
      <div class="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/60 p-3 text-center">
        <div class="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)]">{{ t('games.dinoMatch3.moves') }}</div>
        <div class="text-2xl font-bold tabular-nums">{{ board.moves }} / {{ movesTarget }}</div>
      </div>
      <div class="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/60 p-3 text-center">
        <div class="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)]">{{ t('games.dinoMatch3.best') }}</div>
        <div class="text-2xl font-bold tabular-nums text-amber-300">{{ best }}</div>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="max-w-md mx-auto mb-6">
      <div class="h-2 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden border border-[var(--glass-border)]">
        <div
          class="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-[width] duration-300"
          :style="{ width: progressPct + '%' }"
        />
      </div>
    </div>

    <!-- Board or intro -->
    <div
      v-if="phase === 'intro'"
      class="max-w-md mx-auto text-center rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/40 p-8 mb-6"
    >
      <div class="text-7xl mb-3">🦖🦕🦴</div>
      <p class="text-body-sm text-[var(--color-text-secondary)] mb-6">
        {{ t('games.dinoMatch3.intro') }}
      </p>
      <BaseButton variant="primary" @click="startGame">
        {{ t('games.dinoMatch3.start') }}
      </BaseButton>
    </div>

    <div
      v-else
      class="relative max-w-[min(92vw,520px)] mx-auto mb-6 rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-gradient-to-br from-stone-900/40 to-amber-950/30 p-3 shadow-[var(--shadow-card)]"
      :style="{ opacity: shuffleFade, transition: 'opacity 180ms ease-out' }"
    >
      <div
        class="relative grid gap-1 board-grid"
        :style="{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }"
      >
        <template v-for="(row, r) in displayGrid" :key="r">
          <div
            v-for="(tile, c) in row"
            :key="`${r}-${c}`"
            class="relative aspect-square"
          >
            <button
              v-if="tile"
              type="button"
              :data-cell="1"
              :data-row="r"
              :data-col="c"
              class="cell-btn absolute inset-0 rounded-md flex items-center justify-center text-2xl sm:text-3xl select-none"
              :class="[
                `bg-gradient-to-br ${tileColorClass(tile.id)}`,
                tile.special === 'dino-egg' ? 'ring-2 ring-amber-300' : '',
                tile.special === 'meteor' ? 'ring-2 ring-rose-300 animate-pulse' : '',
                selected && selected.row === r && selected.col === c ? 'ring-2 ring-white scale-95' : '',
                dragCurrent && dragStart && dragStart.row === r && dragStart.col === c ? 'ring-2 ring-amber-200' : '',
                dragCurrent && dragCurrent.row === r && dragCurrent.col === c && dragStart && (dragStart.row !== r || dragStart.col !== c) ? 'ring-2 ring-emerald-200' : '',
                'cursor-pointer hover:scale-105 active:scale-95',
                popping.has(tile.key) ? 'is-popping' : '',
                fallingFromRow.has(tile.key) ? 'is-falling' : '',
                spawning.has(tile.key) ? 'is-spawning' : '',
                rejecting.has(tile.key) ? 'is-rejecting' : '',
              ]"
              :style="fallingFromRow.has(tile.key) ? ({ '--fall-from': String(fallingFromRow.get(tile.key)) } as Record<string, string>) : {}"
              :disabled="animating"
              :aria-label="tileName(tile.id)"
              @pointerdown="(e) => onCellPointerDown(r, c, e as PointerEvent)"
              @pointerenter="onCellPointerEnter(r, c)"
              @click="onCellClick(r, c)"
            >
              <span>
                <span>{{ TILE_EMOJI[tile.id] }}</span>
                <span
                  v-if="tile.special === 'dino-egg'"
                  class="absolute -top-1 -right-1 text-sm"
                >🥚</span>
                <span
                  v-else-if="tile.special === 'meteor'"
                  class="absolute -top-1 -right-1 text-sm"
                >☄️</span>
              </span>
            </button>
            <div
              v-else
              class="cell-empty absolute inset-0 rounded-md bg-stone-800/30"
            />
            <!-- Floating score -->
            <div
              v-for="fs in floatingScores.filter(f => Math.round(f.row) === r && Math.round(f.col) === c)"
              :key="fs.id"
              class="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-extrabold"
              :class="{
                'text-amber-200': fs.tone === 'gold',
                'text-fuchsia-200': fs.tone === 'purple',
                'text-rose-200': fs.tone === 'red',
              }"
              style="animation: popScore 0.9s ease-out forwards"
            >
              {{ fs.text }}
            </div>
          </div>
        </template>
      </div>

      <!-- Combo flash -->
      <Transition name="combo">
        <div
          v-if="comboFlash"
          :key="comboFlash.key"
          class="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            class="px-5 py-2 rounded-full text-base sm:text-lg font-extrabold shadow-xl border-2 backdrop-blur-md"
            :class="{
              'bg-amber-300/30 text-amber-100 border-amber-200': comboFlash.tone === 'gold',
              'bg-fuchsia-400/30 text-fuchsia-100 border-fuchsia-200': comboFlash.tone === 'purple',
              'bg-rose-400/30 text-rose-100 border-rose-200': comboFlash.tone === 'red',
            }"
            style="animation: popCombo 1.1s ease-out forwards"
          >
            {{ comboFlash.text }}
          </div>
        </div>
      </Transition>
    </div>

    <!-- Controls -->
    <div v-if="phase === 'playing'" class="flex flex-wrap justify-center gap-3 mb-6">
      <BaseButton variant="ghost" @click="startGame" class="whitespace-nowrap">
        <BaseIcon name="rotate-ccw" :size="14" class="shrink-0" />
        <span>{{ t('games.dinoMatch3.restart') }}</span>
      </BaseButton>
    </div>

    <!-- Legend -->
    <div class="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[var(--color-text-secondary)] mb-6">
      <div class="flex items-center gap-2">
        <span class="text-lg">🦖</span> <span>{{ tileName(0) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🦕</span> <span>{{ tileName(1) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🦴</span> <span>{{ tileName(2) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🐊</span> <span>{{ tileName(3) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🦅</span> <span>{{ tileName(4) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🐢</span> <span>{{ tileName(5) }}</span>
      </div>
    </div>

    <!-- Specials legend -->
    <div class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-text-tertiary)]">
      <div class="rounded-md border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/40 p-2 flex items-start gap-2">
        <span class="text-base">🥚</span>
        <span>{{ t('games.dinoMatch3.legendEgg') }}</span>
      </div>
      <div class="rounded-md border border-[var(--glass-border)] bg-[var(--color-bg-elevated)]/40 p-2 flex items-start gap-2">
        <span class="text-base">☄️</span>
        <span>{{ t('games.dinoMatch3.legendMeteor') }}</span>
      </div>
    </div>

    <!-- Result modal -->
    <BaseModal :is-open="showResultModal" :title="t('games.dinoMatch3.gameOver')" @close="showResultModal = false">
      <div class="text-center">
        <div class="text-6xl mb-3">🏆</div>
        <p class="text-body-md mb-1">
          {{ t('games.dinoMatch3.finalScore', { score: board.score }) }}
        </p>
        <p class="text-body-sm text-[var(--color-text-tertiary)] mb-4">
          {{ t('games.dinoMatch3.movesUsed', { moves: board.moves }) }}
          · {{ t('games.dinoMatch3.cascades', { n: board.cascades }) }}
          · {{ t('games.dinoMatch3.comboMax', { n: board.comboMax }) }}
        </p>
        <div class="flex justify-center gap-3">
          <BaseButton variant="primary" @click="startGame">
            {{ t('games.dinoMatch3.playAgain') }}
          </BaseButton>
          <router-link :to="localRoute({ name: 'games' })">
            <BaseButton variant="ghost">
              {{ t('games.dinoMatch3.backToGames') }}
            </BaseButton>
          </router-link>
        </div>
      </div>
    </BaseModal>

    <BaseConfetti v-if="showConfetti" :pieces="80" @done="showConfetti = false" />
  </div>
</template>

<style scoped>
.cell-btn {
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  transition: filter 120ms ease-out;
}

.board-grid {
  --cell-h: 56px;
  --grid-gap: 4px;
}

.cell-btn.is-popping {
  animation: popTile 280ms ease-out forwards;
  pointer-events: none;
  z-index: 2;
}
@keyframes popTile {
  0%   { transform: scale(1)    rotate(0deg);   opacity: 1; filter: brightness(1); }
  35%  { transform: scale(1.25) rotate(6deg);   opacity: 1; filter: brightness(1.6) saturate(1.4); }
  70%  { transform: scale(0.6)  rotate(-8deg);  opacity: 0.6; filter: brightness(2) saturate(0.6); }
  100% { transform: scale(0)    rotate(-12deg); opacity: 0; filter: brightness(0.4); }
}
.cell-btn.is-popping::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.375rem;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.6) 35%, transparent 70%);
  animation: popFlash 280ms ease-out forwards;
  pointer-events: none;
}
@keyframes popFlash {
  0%   { transform: scale(0.4); opacity: 0; }
  40%  { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(1.9); opacity: 0; }
}

.cell-btn.is-falling {
  animation: gravityFall 260ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
  z-index: 1;
}
@keyframes gravityFall {
  0%   { transform: translateY(calc(var(--fall-from, 0) * (var(--cell-h, 56px) + var(--grid-gap, 4px)) * -1)); opacity: 0; }
  15%  { opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}

.cell-btn.is-spawning {
  animation: spawnDrop 280ms cubic-bezier(0.34, 1.4, 0.64, 1) 80ms both;
}
@keyframes spawnDrop {
  0%   { transform: translateY(calc(-1.2 * (var(--cell-h, 56px) + var(--grid-gap, 4px)))); opacity: 0; }
  60%  { opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}

/* REJECT — swap attempt that did not form a match. Tile stays in place but
   shakes left/right and flashes red. */
.cell-btn.is-rejecting {
  animation: rejectShake 380ms ease-in-out;
  z-index: 2;
}
@keyframes rejectShake {
  0%   { transform: translateX(0)   scale(1);    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); filter: brightness(1); }
  20%  { transform: translateX(-4px) scale(0.97); }
  40%  { transform: translateX(4px)  scale(0.97); box-shadow: 0 0 0 6px rgba(244, 63, 94, 0.55); filter: brightness(1.15); }
  60%  { transform: translateX(-3px) scale(0.98); box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.35); filter: brightness(1.05); }
  80%  { transform: translateX(2px)  scale(0.99); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
  100% { transform: translateX(0)   scale(1);    filter: brightness(1); }
}
@keyframes popScore {
  0%   { transform: translateY(0)    scale(0.6); opacity: 0; }
  20%  { transform: translateY(-6px) scale(1.1); opacity: 1; }
  100% { transform: translateY(-40px) scale(1);   opacity: 0; }
}
@keyframes popCombo {
  0%   { transform: scale(0.4); opacity: 0; }
  20%  { transform: scale(1.1); opacity: 1; }
  80%  { transform: scale(1);   opacity: 1; }
  100% { transform: scale(0.95); opacity: 0; }
}
.combo-enter-active, .combo-leave-active {
  transition: opacity 0.2s;
}
</style>
