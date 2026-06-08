<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import {
  BOARDS,
  createInitialState,
  rollDice,
  planMove,
  getCellEffect,
  didBounce,
  type GameState,
  type BoardLength,
  type Player,
  type CellType,
} from '@/logic/meteor-run-engine'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import MeteorRunBoard from '@/components/games/MeteorRunBoard.vue'
import MeteorRunDice from '@/components/games/MeteorRunDice.vue'
import MeteorRunPawn from '@/components/games/MeteorRunPawn.vue'
import MeteorRunLegend from '@/components/games/MeteorRunLegend.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

const state = ref<GameState>(createInitialState(50))
const showConfetti = ref(false)
const showResultModal = ref(false)
const lastDice = ref(0)
const lastAiDice = ref(0)

interface LogEntry {
  id: number
  text: string
  kind: 'dino' | 'meteor' | 'info' | 'success' | 'warn' | 'danger' | 'celebrate'
}
const eventLog = ref<LogEntry[]>([])
let logIdCounter = 0
const logContainer = ref<HTMLElement | null>(null)
const logContainerMobile = ref<HTMLElement | null>(null)
function pushLog(kind: LogEntry['kind'], key: string, params?: Record<string, unknown>) {
  eventLog.value.push({ id: ++logIdCounter, text: t(key, params as Record<string, string | number>), kind })
  // Cap log at 100 entries to keep DOM light
  if (eventLog.value.length > 100) eventLog.value.splice(0, eventLog.value.length - 100)
  // Auto-scroll the log to the bottom on next tick (only visible container)
  void nextTick(() => {
    const targets = [logContainer.value, logContainerMobile.value].filter(
      (el): el is HTMLElement => !!el && el.offsetParent !== null,
    )
    for (const el of targets) {
      el.scrollTop = el.scrollHeight
    }
  })
}

const isRolling = computed(() => state.value.isDiceRolling.dino)
const isAiRolling = computed(() => state.value.isDiceRolling.meteor)
const isDinoTurn = computed(() => state.value.currentTurn === 'dino')
const isMeteorTurn = computed(() => state.value.currentTurn === 'meteor')
const boardConfig = computed(() => BOARDS[state.value.boardLength])

const canRoll = computed(() => {
  if (state.value.phase !== 'playing') return false
  if (state.value.isAnimating) return false
  if (state.value.currentTurn !== 'dino') return false
  if (state.value.winner) return false
  return true
})

function startGame(length: BoardLength) {
  state.value = createInitialState(length)
  state.value.phase = 'playing'
  state.value.message = t('games.meteorRun.yourTurn')
  state.value.messageTone = 'info'
  eventLog.value = []
  showResultModal.value = false
  pushLog('info', 'games.meteorRun.log.started', { n: length })
}

function setBoardLength(l: BoardLength) {
  state.value = createInitialState(l)
}

/** Wait helper — used between dice roll and effect application. */
function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setMessage(text: string, tone: GameState['messageTone'] = 'info') {
  state.value.message = text
  state.value.messageTone = tone
}

/**
 * Core turn logic. Plays a full turn for the given player:
 * rolls dice, plans path, animates the move, applies effect, switches turn.
 */
async function playTurn(player: Player, diceOverride?: number) {
  if (state.value.winner) return

  // Honor skip-turn
  if (state.value.skipNext[player]) {
    state.value.skipNext[player] = false
    setMessage(
      player === 'dino' ? t('games.meteorRun.youSkipped') : t('games.meteorRun.meteorSkipped'),
      'warn',
    )
    pushLog(
      player === 'dino' ? 'dino' : 'meteor',
      player === 'dino' ? 'games.meteorRun.log.dinoSkipped' : 'games.meteorRun.log.meteorSkipped',
    )
    await sleep(900)
    endTurn(player)
    return
  }

  state.value.activePlayer = player
  state.value.isAnimating = true
  state.value.turnCount++

  // Apply double-move multiplier: 2× dice for this many future rolls
  const multiplier = state.value.doubleMove[player] > 0 ? 2 : 1
  if (multiplier === 2) state.value.doubleMove[player]--

  // Phase 1: spin the dice (pawns stay put).
  // We don't set `lastDice` yet — MeteorRunDice uses `is-rolling` to animate
  // and only snaps to the final face once the flag goes false.
  state.value.isDiceRolling[player] = true
  const dice = diceOverride ?? rollDice(6) * multiplier
  await sleep(reducedMotion() ? 100 : 800)
  if (state.value.winner) return
  state.value.isDiceRolling[player] = false

  // Phase 2: reveal the number and pause so the player can read it.
  state.value.lastDice = dice
  if (player === 'dino') lastDice.value = dice
  else lastAiDice.value = dice
  if (player === 'dino') {
    setMessage(t('games.meteorRun.diceResult', { n: dice }), 'info')
  } else {
    setMessage(t('games.meteorRun.meteorTurn'), 'info')
  }
  await sleep(reducedMotion() ? 0 : 500)
  if (state.value.winner) return

  // Phase 3: animate the pawn step-by-step.
  const stepDelay = reducedMotion() ? 60 : 220
  const steps = planMove(state.value.cells, state.value.positions[player], dice)
  state.value.lastMoveSteps = steps

  // Log the dice result as soon as the player can read it.
  pushLog(
    player === 'dino' ? 'dino' : 'meteor',
    player === 'dino' ? 'games.meteorRun.log.dinoRolled' : 'games.meteorRun.log.meteorRolled',
    { n: dice },
  )

  for (const step of steps) {
    state.value.positions[player] = step.to
    if (!reducedMotion()) await sleep(stepDelay)
  }

  if (didBounce(state.value.positions[player] - dice, dice, state.value.boardSize)) {
    setMessage(t('games.meteorRun.bounces'), 'warn')
    pushLog(
      player === 'dino' ? 'dino' : 'meteor',
      'games.meteorRun.log.bounced',
    )
    await sleep(reducedMotion() ? 0 : 500)
  }

  const finalIndex = state.value.positions[player]
  const finalCell = state.value.cells[finalIndex]
  const onSafeZone = finalCell === 'safe_zone'

  // Log landing on the cell (1-based for human-friendly numbering).
  pushLog(
    player === 'dino' ? 'dino' : 'meteor',
    player === 'dino' ? 'games.meteorRun.log.dinoLanded' : 'games.meteorRun.log.meteorLanded',
    { cell: finalIndex + 1 },
  )

  // Check for finish
  if (finalIndex === state.value.boardSize - 1) {
    state.value.winner = player
    state.value.lastLanded[player] = finalIndex
    state.value.isAnimating = false
    setMessage(
      player === 'dino' ? t('games.meteorRun.dinoWins') : t('games.meteorRun.meteorWins'),
      'celebrate',
    )
    pushLog(
      'celebrate',
      player === 'dino' ? 'games.meteorRun.log.dinoWins' : 'games.meteorRun.log.meteorWins',
    )
    if (player === 'dino') showConfetti.value = true
    const score = player === 'dino' ? 100 : 25
    gameStore.recordGameCompletion('meteor-run', score)
    return
  }

  const effect = getCellEffect(finalCell, onSafeZone)
  applyEffect(player, finalIndex, effect)
  state.value.lastLanded[player] = finalIndex

  await sleep(reducedMotion() ? 0 : 700)

  if (effect.delta !== 0) {
    await applyDeltaMove(player, effect.delta)
  } else if (effect.sendToStart) {
    await applyDeltaMove(player, -state.value.positions[player])
  }

  state.value.isAnimating = false

  if (state.value.winner) return

  if (effect.rollsAgain) {
    await sleep(reducedMotion() ? 0 : 400)
    if (player === 'dino') {
      // dino rolls again on click
    } else {
      await sleep(700 + Math.random() * 500)
      await playTurn('meteor')
    }
  } else {
    endTurn(player)
  }
}
function applyEffect(player: Player, finalIndex: number, effect: ReturnType<typeof getCellEffect>) {
  const cellKey = state.value.cells[finalIndex]
  const opponent: Player = player === 'dino' ? 'meteor' : 'dino'

  if (effect.blocked) {
    setMessage(t(`games.meteorRun.effects.${cellKey}`), 'success')
    pushLog('success', `games.meteorRun.effects.${cellKey}`)
    return
  }

  if (effect.skipOpponent) {
    state.value.skipNext[opponent] = true
    setMessage(t(`games.meteorRun.effects.${cellKey}`), 'warn')
    pushLog('warn', `games.meteorRun.effects.${cellKey}`)
    return
  }

  if (effect.rollsAgain) {
    setMessage(t(`games.meteorRun.effects.${cellKey}`), 'success')
    pushLog('success', `games.meteorRun.effects.${cellKey}`)
    return
  }

  if (effect.doubleMove > 0) {
    state.value.doubleMove[player] = effect.doubleMove
    setMessage(t(`games.meteorRun.effects.${cellKey}`), 'success')
    pushLog('success', `games.meteorRun.effects.${cellKey}`)
    return
  }

  if (effect.delta !== 0 || effect.sendToStart) {
    const verb = effect.delta > 0 ? 'success' : 'danger'
    setMessage(t(`games.meteorRun.effects.${cellKey}`), verb)
    pushLog(verb, `games.meteorRun.effects.${cellKey}`)
    return
  }

  if (cellKey === 'safe_zone') {
    setMessage(t(`games.meteorRun.effects.${cellKey}`), 'success')
    pushLog('success', `games.meteorRun.effects.${cellKey}`)
  }
}

async function applyDeltaMove(player: Player, delta: number) {
  if (delta === 0) return
  state.value.isAnimating = true
  const steps = planMove(state.value.cells, state.value.positions[player], delta)
  const stepDelay = reducedMotion() ? 60 : 200
  for (const step of steps) {
    state.value.positions[player] = step.to
    if (!reducedMotion()) await sleep(stepDelay)
  }
  if (state.value.positions[player] === state.value.boardSize - 1) {
    state.value.winner = player
    state.value.lastLanded[player] = state.value.boardSize - 1
    setMessage(
      player === 'dino' ? t('games.meteorRun.dinoWins') : t('games.meteorRun.meteorWins'),
      'celebrate',
    )
    pushLog(
      'celebrate',
      player === 'dino' ? 'games.meteorRun.log.dinoWins' : 'games.meteorRun.log.meteorWins',
    )
    if (player === 'dino') showConfetti.value = true
    const score = player === 'dino' ? 100 : 25
    gameStore.recordGameCompletion('meteor-run', score)
    return
  }
  const newCell = state.value.cells[state.value.positions[player]] as CellType
  if (newCell === 'boost_small' || newCell === 'boost_big' || newCell === 'teleport_fwd' || newCell === 'penalty' || newCell === 'pit') {
    const eff = getCellEffect(newCell, false)
    applyEffect(player, state.value.positions[player], eff)
    if (eff.delta !== 0) {
      await applyDeltaMove(player, eff.delta)
    } else if (eff.sendToStart) {
      await applyDeltaMove(player, -state.value.positions[player])
    }
  }
  state.value.isAnimating = false
}

function endTurn(player: Player) {
  if (state.value.winner) return
  const next: Player = player === 'dino' ? 'meteor' : 'dino'
  state.value.currentTurn = next
  if (next === 'dino') {
    setMessage(t('games.meteorRun.yourTurn'), 'info')
  } else {
    void runMeteorTurn()
  }
}

async function runMeteorTurn() {
  if (state.value.winner) return
  // Hold the dino's result on screen so the player can read the number
  // and the tile effect before the meteor takes over the board.
  setMessage(t('games.meteorRun.meteorIncoming'), 'warn')
  await sleep(reducedMotion() ? 800 : 2500)
  if (state.value.winner) return
  setMessage(t('games.meteorRun.meteorTurn'), 'info')
  await sleep(reducedMotion() ? 400 : 1000)
  if (state.value.winner) return
  let dice = rollDice(6)
  if (state.value.doubleMove.meteor > 0) {
    dice *= 2
    state.value.doubleMove.meteor--
  }
  await playTurn('meteor', dice)
}

function rollDinoDice() {
  if (!canRoll.value) return
  void playTurn('dino')
}

function resetGame() {
  showConfetti.value = false
  showResultModal.value = false
  state.value = createInitialState(state.value.boardLength)
  eventLog.value = []
}

// Back to the length-picker screen (intro phase) without resetting the
// player’s saved track length — the user can pick a different one there.
function goToLengthPicker() {
  showConfetti.value = false
  showResultModal.value = false
  // Reset to intro with the same length as the default, so the picker
  // shows the most recently played length pre-selected.
  state.value = createInitialState(state.value.boardLength)
  eventLog.value = []
}

// Open the result modal as soon as a winner appears. Keeps the board
// and event log visible underneath so the player can review the path.
watch(
  () => state.value.winner,
  (winner) => {
    if (winner) {
      // Tiny delay so the pawn finishes its arrival animation first.
      void nextTick(() => {
        showResultModal.value = true
      })
    }
  },
)

const messageClasses = computed(() => {
  const tone = state.value.messageTone
  if (tone === 'success') return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
  if (tone === 'warn') return 'bg-amber-500/10 border-amber-500/40 text-amber-300'
  if (tone === 'danger') return 'bg-red-500/10 border-red-500/40 text-red-300'
  if (tone === 'celebrate') return 'bg-amber-400/15 border-amber-400/60 text-amber-200 text-lg sm:text-xl font-bold'
  return 'bg-[var(--color-bg-elevated)] border-[var(--glass-border)] text-[var(--color-text-secondary)]'
})

function logClass(kind: LogEntry['kind']): string {
  switch (kind) {
    case 'dino':
      return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200'
    case 'meteor':
      return 'border-red-500/30 bg-red-500/5 text-red-200'
    case 'success':
      return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
    case 'warn':
      return 'border-amber-500/40 bg-amber-500/10 text-amber-200'
    case 'danger':
      return 'border-red-500/40 bg-red-500/10 text-red-200'
    case 'celebrate':
      return 'border-amber-400/60 bg-amber-400/15 text-amber-200 font-semibold'
    case 'info':
    default:
      return 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'
  }
}

const lengthOptions: { key: BoardLength; labelKey: string; descKey: string }[] = [
  { key: 30, labelKey: 'games.meteorRun.boardLengthShort', descKey: 'games.meteorRun.boardLengthDescShort' },
  { key: 50, labelKey: 'games.meteorRun.boardLengthMedium', descKey: 'games.meteorRun.boardLengthDescMedium' },
  { key: 80, labelKey: 'games.meteorRun.boardLengthLong', descKey: 'games.meteorRun.boardLengthDescLong' },
]

onMounted(() => { /* start screen is shown until user clicks Start */ })
onBeforeUnmount(() => { /* no timers to clean up */ })
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 sm:py-10">
    <SeoHead
      :title="t('games.meteorRun.title')"
      :description="t('games.meteorRun.description')"
    />

    <!-- Top bar -->
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div v-if="state.phase === 'playing'" class="flex items-center gap-3 sm:gap-4 text-sm text-[var(--color-text-secondary)]">
        <span class="hidden sm:inline">🎲 {{ t('games.meteorRun.turns', { n: state.turnCount }) }}</span>
        <span v-if="state.doubleMove.dino > 0" class="text-yellow-400 font-bold">⚡ ×{{ state.doubleMove.dino + 1 }}</span>
        <span v-if="state.doubleMove.meteor > 0" class="text-red-400 font-bold">☄️ ×{{ state.doubleMove.meteor + 1 }}</span>
      </div>
    </div>

    <h1 class="text-display-md pb-1 text-center">☄️ {{ t('games.meteorRun.title') }}</h1>
    <p class="text-body-md text-center text-[var(--color-text-secondary)] mb-6 sm:mb-8">
      {{ t('games.meteorRun.tagline') }}
    </p>

    <!-- INTRO -->
    <div v-if="state.phase === 'intro'" class="max-w-xl mx-auto text-center space-y-5 sm:space-y-6">
      <div class="flex justify-center items-center gap-4 sm:gap-6">
        <MeteorRunPawn player="dino" size="lg" class="animate-float" />
        <span class="text-3xl sm:text-5xl font-bold text-[var(--color-brand-amber)]">VS</span>
        <MeteorRunPawn player="meteor" size="lg" class="animate-float-slow" />
      </div>
      <p class="text-body-md sm:text-body-lg text-[var(--color-text-secondary)]">
        {{ t('games.meteorRun.description') }}
      </p>

      <!-- Board length selector -->
      <div class="space-y-3">
        <p class="text-label text-[var(--color-text-tertiary)]">{{ t('games.meteorRun.boardLengthTitle') }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <button
            v-for="opt in lengthOptions"
            :key="opt.key"
            type="button"
            class="px-3 py-3 sm:px-4 sm:py-3 rounded-[var(--radius-md)] text-left border-2 transition-all duration-200"
            :class="state.boardLength === opt.key
              ? 'bg-[var(--color-brand-ember)]/15 border-[var(--color-brand-ember)] shadow-[0_0_16px_rgba(232,93,44,0.3)]'
              : 'border-[var(--glass-border)] hover:border-[var(--color-brand-amber)]'"
            @click="setBoardLength(opt.key)"
          >
            <p
              class="text-sm sm:text-base font-bold"
              :class="state.boardLength === opt.key ? 'text-[var(--color-brand-amber)]' : 'text-[var(--color-text-primary)]'"
            >
              {{ t(opt.labelKey) }}
            </p>
            <p class="text-[11px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">
              {{ t(opt.descKey) }}
            </p>
          </button>
        </div>
      </div>

      <BaseButton size="lg" icon="play" @click="startGame(state.boardLength)">
        {{ t('games.meteorRun.start') }}
      </BaseButton>
    </div>

    <!-- PLAYING -->
    <div v-else-if="state.phase === 'playing'" class="space-y-4 sm:space-y-6">
      <div class="grid lg:grid-cols-[260px_1fr_300px] gap-4 sm:gap-5 items-start">
        <div class="lg:sticky lg:top-6 order-2 lg:order-1">
          <MeteorRunLegend class="hidden lg:block" />
        </div>

        <div class="order-1 lg:order-2">
          <MeteorRunBoard
            :board-config="boardConfig"
            :cells="state.cells"
            :positions="state.positions"
            :last-landed="state.lastLanded"
            :active-player="state.activePlayer"
            :current-turn="state.currentTurn"
            :is-danger="state.currentTurn === 'meteor'"
          />
          <div class="mt-3 sm:mt-4 flex justify-center items-center gap-2 text-xs sm:text-sm text-[var(--color-text-tertiary)]">
            <MeteorRunPawn player="dino" size="sm" />
            <span>{{ t('games.meteorRun.title') }}</span>
            <span class="mx-2">·</span>
            <MeteorRunPawn player="meteor" size="sm" />
            <span>☄️</span>
          </div>
        </div>

        <div class="space-y-3 sm:space-y-4 lg:sticky lg:top-6 order-3">
          <div
            class="p-3 sm:p-4 rounded-[var(--radius-lg)] border-2 transition-all duration-300"
            :class="isDinoTurn
              ? 'bg-emerald-500/10 border-emerald-500/60 shadow-[0_0_24px_rgba(34,197,94,0.25)]'
              : 'bg-orange-500/10 border-orange-500/60 shadow-[0_0_24px_rgba(232,93,44,0.25)]'"
          >
            <div class="flex items-center gap-3">
              <MeteorRunPawn
                :player="isDinoTurn ? 'dino' : 'meteor'"
                :is-active="true"
                size="lg"
              />
              <div class="flex-1 min-w-0">
                <p class="text-label text-[var(--color-text-tertiary)]">
                  {{ isDinoTurn ? '🦖' : '☄️' }} {{ isDinoTurn ? t('games.meteorRun.yourTurn').split(' — ')[0] : 'Meteor' }}
                </p>
                <p class="text-sm sm:text-base font-semibold leading-tight">
                  {{ isDinoTurn ? t('games.meteorRun.yourTurn') : t('games.meteorRun.meteorTurn') }}
                </p>
              </div>
            </div>
          </div>

          <div class="p-3 sm:p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] space-y-3">
            <MeteorRunDice
              :value="isDinoTurn ? lastDice : lastAiDice"
              :is-rolling="(isDinoTurn ? isRolling : isAiRolling)"
              :dice-count="1"
              size="md"
            />
            <!-- Persist the dino's roll so the player can read it while the
                 meteor is preparing/thinking. -->
            <p
              v-if="!isDinoTurn && lastDice > 0 && lastAiDice === 0"
              class="text-center text-xs sm:text-sm text-emerald-300/90"
            >
              🦖 {{ t('games.meteorRun.yourRollWas', { n: lastDice }) }}
            </p>
            <BaseButton
              v-if="isDinoTurn"
              size="lg"
              icon="dice-5"
              class="w-full"
              :disabled="!canRoll"
              @click="rollDinoDice"
            >
              {{ canRoll ? t('games.meteorRun.rollDice') : t('games.meteorRun.rolling') }}
            </BaseButton>
            <div v-else class="text-center text-sm text-[var(--color-text-secondary)] py-2">
              <BaseIcon name="loader-circle" :size="18" class="inline animate-spin mr-1" />
              {{ t('games.meteorRun.meteorTurn') }}
            </div>
          </div>

          <div
            class="p-3 sm:p-4 rounded-[var(--radius-lg)] border min-h-[60px] flex items-center justify-center text-center text-sm sm:text-base transition-all duration-300"
            :class="messageClasses"
            aria-live="polite"
          >
            {{ state.message }}
          </div>

          <div class="flex flex-wrap gap-2 text-xs">
            <span
              v-if="state.skipNext.dino"
              class="px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300"
            >
              ⏭ {{ t('games.meteorRun.youSkipped') }}
            </span>
            <span
              v-if="state.skipNext.meteor"
              class="px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300"
            >
              ⏭ {{ t('games.meteorRun.meteorSkipped') }}
            </span>
          </div>

          <!-- Event log (desktop) -->
          <section
            v-if="eventLog.length"
            class="hidden lg:block p-3 rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] space-y-2"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-semibold text-[var(--color-text-secondary)]">
                📜 {{ t('games.meteorRun.log.title') }}
              </h3>
              <span class="text-[10px] text-[var(--color-text-tertiary)]">{{ eventLog.length }}</span>
            </div>
            <div ref="logContainer" class="max-h-40 xl:max-h-48 space-y-1.5 overflow-y-auto pr-1">
              <div
                v-for="entry in eventLog"
                :key="entry.id"
                class="rounded-md border px-2.5 py-1.5 text-xs leading-snug transition-colors"
                :class="logClass(entry.kind)"
              >
                {{ entry.text }}
              </div>
            </div>
          </section>
        </div>
      </div>

      <MeteorRunLegend class="lg:hidden" />

      <!-- Event log (mobile) -->
      <section
        v-if="eventLog.length"
        class="lg:hidden p-3 rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] space-y-2"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-[var(--color-text-secondary)]">
            📜 {{ t('games.meteorRun.log.title') }}
          </h3>
          <span class="text-xs text-[var(--color-text-tertiary)]">{{ eventLog.length }}</span>
        </div>
        <div ref="logContainerMobile" class="max-h-48 sm:max-h-64 space-y-1.5 overflow-y-auto pr-1">
          <div
            v-for="entry in eventLog"
            :key="entry.id"
            class="rounded-md border px-2.5 py-1.5 text-xs leading-snug transition-colors"
            :class="logClass(entry.kind)"
          >
            {{ entry.text }}
          </div>
        </div>
      </section>
    </div>

    <!-- RESULT MODAL: appears over the board/journal as soon as a winner
         is set. Three actions: race again (same length), pick a different
         length, or back to the games hub. The <BaseModal> teleports its
         content to <body>, so it lives inside this div for a single root
         template only — Vue's <transition> refuses to animate a
         multi-root component and that broke navigation. -->
    <BaseModal
      :is-open="showResultModal"
      :title="state.winner === 'dino' ? t('games.meteorRun.dinoWins') : t('games.meteorRun.meteorWins')"
      size="sm"
      :close-on-overlay="false"
      @close="showResultModal = false"
    >
      <div class="text-center space-y-4">
        <BaseConfetti v-if="showConfetti" />
        <div class="text-5xl sm:text-6xl" aria-hidden="true">
          {{ state.winner === 'dino' ? '🎉' : '💥' }}
        </div>
        <p class="text-sm sm:text-base text-[var(--color-text-secondary)]">
          {{ t('games.meteorRun.finalScore', { n: state.turnCount }) }}
        </p>

        <div class="grid grid-cols-3 gap-2">
          <div class="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg-base)] border border-[var(--glass-border)]">
            <p class="text-lg sm:text-xl font-bold text-[var(--color-brand-amber)]">{{ state.turnCount }}</p>
            <p class="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{{ t('games.meteorRun.stats.turns') }}</p>
          </div>
          <div class="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg-base)] border border-[var(--glass-border)]">
            <p class="text-lg sm:text-xl">
              <MeteorRunPawn :player="state.winner ?? 'dino'" size="sm" class="inline-block" />
            </p>
            <p class="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{{ t('games.meteorRun.stats.winner') }}</p>
          </div>
          <div class="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg-base)] border border-[var(--glass-border)]">
            <p class="text-lg sm:text-xl font-bold text-[var(--color-brand-amber)]">{{ state.boardLength }}</p>
            <p class="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{{ t('games.meteorRun.stats.track') }}</p>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col sm:flex-row gap-2">
          <BaseButton
            variant="primary"
            icon="refresh-ccw"
            class="flex-1"
            @click="resetGame"
          >
            {{ t('games.meteorRun.playAgain') }}
          </BaseButton>
          <BaseButton
            variant="ghost"
            icon="sliders"
            class="flex-1"
            @click="goToLengthPicker"
          >
            {{ t('games.meteorRun.pickLength') }}
          </BaseButton>
          <BaseButton
            variant="ghost"
            icon="home"
            class="flex-1"
            :to="localRoute({ name: 'games' })"
          >
            {{ t('games.meteorRun.backToGames') }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
