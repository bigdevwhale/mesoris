<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { dinosaurs } from '@/data/dinosaurs'
import type { Dinosaur } from '@/types/dinosaur'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { useGameStore } from '@/stores/useGameStore'
import { useLocalStorage } from '@/composables/useLocalStorage'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DinoDetailModal from '@/components/encyclopedia/DinoDetailModal.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const router = useRouter()
const { localRoute } = useLocale()
const { translateDino } = useDinoTranslator()
const gameStore = useGameStore()
const bestScore = useLocalStorage<number>('duel-best', 0)

type Stat = 'weight' | 'height' | 'speed'

interface Duelist {
  id: string
  name: string
  image: string
  weightKg: number
  height: number
  speed: number
  color: string
  original: Dinosaur
}

const COLORS = [
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-rose-500 to-red-600',
  'from-lime-500 to-green-600',
  'from-violet-500 to-indigo-600',
  'from-fuchsia-500 to-purple-600',
]

const TOTAL_ROUNDS = 10
const TIME_PER_ROUND = 15 // seconds

const STAT_ICONS: Record<Stat, string> = {
  weight: 'weight',
  height: 'ruler',
  speed: 'zap',
}

const round = ref(0)
const score = ref(0)
const currentStat = ref<Stat>('weight')
const left = ref<Duelist | null>(null)
const right = ref<Duelist | null>(null)
const answered = ref(false)
const lastResult = ref<'correct' | 'wrong' | 'tie' | null>(null)
const timeLeft = ref(TIME_PER_ROUND)
const gameOver = ref(false)
const showIntro = ref(true)
const cardModal = ref<'left' | 'right' | null>(null)
let timerHandle: number | null = null

const progressPct = computed(() => Math.round((round.value / TOTAL_ROUNDS) * 100))

const statLabel = computed(() => {
  if (currentStat.value === 'weight') return t('games.duelGame.whoIsHeavier')
  if (currentStat.value === 'height') return t('games.duelGame.whoIsTaller')
  return t('games.duelGame.whoIsFaster')
})

const statHint = computed(() => {
  if (currentStat.value === 'weight') return t('games.duelGame.tonnes')
  if (currentStat.value === 'height') return t('games.duelGame.meters')
  return t('games.duelGame.kmh')
})

function statValue(d: Duelist): number {
  if (currentStat.value === 'weight') return d.weightKg
  if (currentStat.value === 'height') return d.height
  return d.speed
}

function formatValue(d: Duelist): string {
  if (currentStat.value === 'weight') {
    // Show kg for sub-tonne dinosaurs, tonnes for heavier ones
    if (d.weightKg < 1000) {
      return `${d.weightKg.toLocaleString('ru-RU')} ${t('games.duelGame.kg')}`
    }
    const tonnes = d.weightKg / 1000
    return `${tonnes.toLocaleString('ru-RU', { maximumFractionDigits: 1 })} ${t('games.duelGame.tonnes')}`
  }
  if (currentStat.value === 'height') return `${d.height} ${t('games.duelGame.meters')}`
  return `${d.speed} ${t('games.duelGame.kmh')}`
}

function pickDuelist(excludeIds: Set<string> = new Set()): Duelist {
  const pool = dinosaurs.filter(d => !excludeIds.has(d.id) && d.dimensions.weightKg > 0 && d.dimensions.heightMeters > 0 && d.dimensions.speedKmh > 0)
  const pick: Dinosaur = pool[Math.floor(Math.random() * pool.length)]
  return {
    id: pick.id,
    name: translateDino(pick).name,
    image: pick.images.hero,
    weightKg: pick.dimensions.weightKg,
    height: pick.dimensions.heightMeters,
    speed: pick.dimensions.speedKmh,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    original: pick,
  }
}

function pickStat(): Stat {
  const opts: Stat[] = ['weight', 'height', 'speed']
  return opts[Math.floor(Math.random() * opts.length)]
}

function nextRound() {
  if (round.value >= TOTAL_ROUNDS) {
    endGame()
    return
  }
  round.value++
  const a = pickDuelist()
  const b = pickDuelist(new Set([a.id]))
  left.value = a
  right.value = b
  currentStat.value = pickStat()
  answered.value = false
  lastResult.value = null
  cardModal.value = null
  timeLeft.value = TIME_PER_ROUND
  startTimer()
}

function startTimer() {
  if (timerHandle) {
    window.clearInterval(timerHandle)
  }
  timerHandle = window.setInterval(() => {
    if (answered.value) return
    timeLeft.value--
    if (timeLeft.value <= 0) {
      handleAnswer(null) // time out = wrong
    }
  }, 1000)
}

function stopTimer() {
  if (timerHandle) {
    window.clearInterval(timerHandle)
    timerHandle = null
  }
}

function handleAnswer(choice: 'left' | 'right' | null) {
  if (answered.value || !left.value || !right.value) return
  answered.value = true
  stopTimer()

  const lv = statValue(left.value)
  const rv = statValue(right.value)

  if (lv === rv) {
    lastResult.value = 'tie'
    // tie = no score, just show stats
  } else {
    const leftWins = lv > rv
    const correct = (choice === 'left' && leftWins) || (choice === 'right' && !leftWins)
    if (correct) {
      score.value++
      lastResult.value = 'correct'
    } else {
      lastResult.value = 'wrong'
    }
  }
}

function next() {
  nextRound()
}

function startGame() {
  showIntro.value = false
  gameOver.value = false
  round.value = 0
  score.value = 0
  nextRound()
}

function endGame() {
  stopTimer()
  gameOver.value = true
  if (score.value > bestScore.value) {
    bestScore.value = score.value
  }
  gameStore.recordGameCompletion('dino-duel', Math.round((score.value / TOTAL_ROUNDS) * 100))
}

const accuracy = computed(() => {
  if (round.value === 0) return 0
  return Math.round((score.value / round.value) * 100)
})

const isNewRecord = computed(() => score.value === bestScore.value && score.value > 0)

function openCard(side: 'left' | 'right', e?: Event) {
  // Don't let the click bubble up to the card's @click (which would re-trigger handleAnswer)
  e?.stopPropagation()
  if (!answered.value) return
  cardModal.value = side
}

const modalDino = computed(() => {
  if (cardModal.value === 'left' && left.value) return translateDino(left.value.original)
  if (cardModal.value === 'right' && right.value) return translateDino(right.value.original)
  return null
})

function onAddToCompare(id: string) {
  cardModal.value = null
  router.push(localRoute({ name: 'compare', query: { a: id } }))
}

onMounted(() => {
  // No timer on intro screen
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6 sm:py-10">
    <SeoHead
      :title="t('games.duelGame.title')"
      :description="t('games.duelGame.description')"
    />

    <div class="flex items-center justify-between mb-6 sm:mb-8">
      <router-link :to="localRoute({ name: 'games' })" class="flex items-center gap-1.5 sm:gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors min-h-[44px] px-2 -ml-2 rounded-lg active:bg-[var(--color-bg-elevated)]">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <span v-if="!showIntro && !gameOver" class="text-xs sm:text-sm text-[var(--color-text-secondary)] tabular-nums">
        <span class="hidden sm:inline">{{ t('games.duelGame.round', { current: round, total: TOTAL_ROUNDS }) }} · </span>
        <span class="font-semibold text-[var(--color-brand-amber)]">{{ score }}</span>
        <span class="opacity-70">/ {{ TOTAL_ROUNDS }}</span>
      </span>
    </div>

    <h1 class="text-display-md pb-3 sm:pb-6 text-center">{{ t('games.duelGame.title') }}</h1>

    <!-- INTRO -->
    <div v-if="showIntro" class="space-y-6">
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5 sm:p-6 text-center">
        <div class="text-5xl sm:text-6xl mb-4">⚖️🦕</div>
        <p class="text-body-md mb-4">{{ t('games.duelGame.intro') }}</p>
        <ul class="text-sm text-[var(--color-text-secondary)] space-y-1 mb-6 text-left max-w-md mx-auto">
          <li>• {{ t('games.duelGame.intro1') }}</li>
          <li>• {{ t('games.duelGame.intro2') }}</li>
          <li>• {{ t('games.duelGame.intro3') }}</li>
        </ul>
        <p v-if="bestScore > 0" class="text-sm text-[var(--color-text-tertiary)] mb-4">
          {{ t('games.duelGame.best') }}: <span class="font-bold text-[var(--color-brand-amber)]">{{ bestScore }}/{{ TOTAL_ROUNDS }}</span>
        </p>
        <BaseButton variant="primary" size="lg" class="w-full sm:w-auto" @click="startGame">
          {{ t('games.duelGame.start') }}
        </BaseButton>
      </div>
    </div>

    <!-- GAME -->
    <div v-else-if="!gameOver && left && right" class="space-y-5 sm:space-y-6">
      <!-- Progress + timer -->
      <div class="flex items-center gap-3">
        <div class="flex-1 h-2 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden border border-[var(--glass-border)]">
          <div
            class="h-full bg-gradient-to-r from-[var(--color-brand-amber)] to-orange-500 transition-all duration-300"
            :style="{ width: `${progressPct}%` }"
          />
        </div>
        <div
          class="text-sm font-mono font-bold w-12 text-center tabular-nums"
          :class="timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[var(--color-text-secondary)]'"
        >
          ⏱ {{ timeLeft }}
        </div>
      </div>

      <!-- Question prompt -->
      <div class="flex justify-center">
        <div class="inline-flex items-center gap-2 sm:gap-2.5 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-full pl-2 pr-4 sm:pr-5 py-1.5 sm:py-2.5 shadow-[var(--shadow-card)] max-w-full">
          <span class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-brand-amber)]/15 text-[var(--color-brand-amber)] shrink-0">
            <BaseIcon :name="STAT_ICONS[currentStat]" :size="16" class="sm:hidden" />
            <BaseIcon :name="STAT_ICONS[currentStat]" :size="18" class="hidden sm:block" />
          </span>
          <span class="text-sm sm:text-heading-md font-semibold truncate">{{ statLabel }}</span>
          <span class="hidden sm:inline text-[var(--color-text-tertiary)] text-sm shrink-0">({{ statHint }})</span>
        </div>
      </div>

      <!-- Two cards -->
      <div class="grid grid-cols-2 gap-2 sm:gap-4">
        <button
          type="button"
          :disabled="answered"
          class="duel-card group relative rounded-xl sm:rounded-[var(--radius-xl)] border-2 transition-all duration-300 overflow-hidden bg-[var(--color-bg-elevated)] text-left"
          :class="[
            answered
              ? (statValue(left) > statValue(right) ? 'border-[var(--color-brand-amber)] shadow-[0_0_20px_rgba(212,164,58,0.4)]' : 'border-[var(--glass-border)] opacity-60')
              : 'border-[var(--glass-border)] active:border-[var(--color-brand-amber)] hover:border-[var(--color-brand-amber)] hover:-translate-y-1 cursor-pointer hover:shadow-[var(--shadow-card-hover)]',
          ]"
          @click="handleAnswer('left')"
        >
          <div class="relative aspect-square">
            <div
              class="absolute inset-0 bg-gradient-to-br opacity-30"
              :class="left.color"
            />
            <img
              :src="left.image"
              :alt="left.name"
              class="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <template v-if="answered">
              <div class="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 sm:gap-3 px-1.5 sm:px-3 py-2">
                <div class="text-base sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
                  {{ formatValue(left) }}
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/30 text-white text-[10px] sm:text-xs md:text-sm font-semibold backdrop-blur-sm transition-colors min-h-[28px] sm:min-h-[36px]"
                  :aria-label="t('games.duelGame.openCard') + ': ' + left.name"
                  @click="openCard('left', $event)"
                >
                  <BaseIcon name="book-open" :size="12" class="sm:hidden" />
                  <BaseIcon name="book-open" :size="14" class="hidden sm:block" />
                  <span class="hidden sm:inline">{{ t('games.duelGame.openCard') }}</span>
                  <span class="sm:hidden">Open</span>
                </button>
              </div>
            </template>
          </div>
          <div class="px-2 sm:px-4 py-1.5 sm:py-3 text-center border-t border-[var(--glass-border)]">
            <div class="text-xs sm:text-base md:text-lg font-bold truncate">{{ left.name }}</div>
          </div>
        </button>

        <button
          type="button"
          :disabled="answered"
          class="duel-card group relative rounded-xl sm:rounded-[var(--radius-xl)] border-2 transition-all duration-300 overflow-hidden bg-[var(--color-bg-elevated)] text-left"
          :class="[
            answered
              ? (statValue(right) > statValue(left) ? 'border-[var(--color-brand-amber)] shadow-[0_0_20px_rgba(212,164,58,0.4)]' : 'border-[var(--glass-border)] opacity-60')
              : 'border-[var(--glass-border)] active:border-[var(--color-brand-amber)] hover:border-[var(--color-brand-amber)] hover:-translate-y-1 cursor-pointer hover:shadow-[var(--shadow-card-hover)]',
          ]"
          @click="handleAnswer('right')"
        >
          <div class="relative aspect-square">
            <div
              class="absolute inset-0 bg-gradient-to-br opacity-30"
              :class="right.color"
            />
            <img
              :src="right.image"
              :alt="right.name"
              class="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <template v-if="answered">
              <div class="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 sm:gap-3 px-1.5 sm:px-3 py-2">
                <div class="text-base sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
                  {{ formatValue(right) }}
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/30 text-white text-[10px] sm:text-xs md:text-sm font-semibold backdrop-blur-sm transition-colors min-h-[28px] sm:min-h-[36px]"
                  :aria-label="t('games.duelGame.openCard') + ': ' + right.name"
                  @click="openCard('right', $event)"
                >
                  <BaseIcon name="book-open" :size="12" class="sm:hidden" />
                  <BaseIcon name="book-open" :size="14" class="hidden sm:block" />
                  <span class="hidden sm:inline">{{ t('games.duelGame.openCard') }}</span>
                  <span class="sm:hidden">Open</span>
                </button>
              </div>
            </template>
          </div>
          <div class="px-2 sm:px-4 py-1.5 sm:py-3 text-center border-t border-[var(--glass-border)]">
            <div class="text-xs sm:text-base md:text-lg font-bold truncate">{{ right.name }}</div>
          </div>
        </button>
      </div>

      <!-- Result + next -->
      <div v-if="answered" class="space-y-3 sm:space-y-4">
        <div class="text-center">
          <div
            v-if="lastResult === 'correct'"
            class="inline-flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl md:text-2xl font-bold text-green-500 animate-celebration-pop"
          >
            <span>✓</span>
            <span>{{ t('games.duelGame.correct') }}</span>
          </div>
          <div
            v-else-if="lastResult === 'wrong'"
            class="inline-flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl md:text-2xl font-bold text-red-500"
          >
            <span>✗</span>
            <span>{{ t('games.duelGame.wrong') }}</span>
          </div>
          <div
            v-else-if="lastResult === 'tie'"
            class="inline-flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl md:text-2xl font-bold text-[var(--color-text-secondary)]"
          >
            <span>=</span>
            <span>{{ t('games.duelGame.tie') }}</span>
          </div>
        </div>

        <div class="flex justify-center">
          <BaseButton variant="primary" class="w-full sm:w-auto" @click="next">
            {{ round < TOTAL_ROUNDS ? t('games.duelGame.next') : t('games.duelGame.finish') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- RESULT -->
    <div v-else-if="gameOver" class="space-y-6">
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6 sm:p-8 text-center">
        <div class="text-5xl sm:text-6xl mb-4 animate-celebration-pop">
          {{ isNewRecord ? '🏆' : score >= TOTAL_ROUNDS * 0.7 ? '🎉' : '🦴' }}
        </div>
        <h2 class="text-display-md mb-2">{{ t('games.duelGame.results') }}</h2>
        <div class="text-display-md sm:text-display-lg text-[var(--color-brand-amber)] my-3 sm:my-4 tabular-nums">
          {{ score }} / {{ TOTAL_ROUNDS }}
        </div>
        <p class="text-sm sm:text-body-md text-[var(--color-text-secondary)] mb-2">
          {{ t('games.duelGame.accuracy', { pct: accuracy }) }}
        </p>
        <p v-if="isNewRecord" class="text-sm text-green-500 font-semibold mb-4">
          🎉 {{ t('games.duelGame.newRecord') }}
        </p>
        <p v-else class="text-sm text-[var(--color-text-tertiary)] mb-4">
          {{ t('games.duelGame.best') }}: {{ bestScore }}/{{ TOTAL_ROUNDS }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <BaseButton variant="primary" class="w-full sm:w-auto" @click="startGame">
            {{ t('games.duelGame.playAgain') }}
          </BaseButton>
          <BaseButton variant="ghost" class="w-full sm:w-auto" :to="localRoute({ name: 'games' })">
            {{ t('ui.games.backToGames') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <DinoDetailModal
      :is-open="cardModal !== null"
      :dino="modalDino"
      @close="cardModal = null"
      @add-to-compare="onAddToCompare"
    />
  </div>
</template>

<style scoped>
.duel-card:disabled {
  cursor: default;
}
</style>
