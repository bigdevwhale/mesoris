<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import { dinosaurs } from '@/data/dinosaurs'
import { continents, type ContinentId } from '@/data/continents'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { findContinentForLatLng, localizeCountry, MAP_WIDTH, MAP_HEIGHT } from '@/composables/useWorldMap'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import DinoDetailModal from '@/components/encyclopedia/DinoDetailModal.vue'
import type { Dinosaur } from '@/types/dinosaur'

const { t, locale } = useI18n()
const router = useRouter()
const { localRoute } = useLocale()
const gameStore = useGameStore()
const { translateDino } = useDinoTranslator()

const TOTAL_ROUNDS = 5
const PASS_THRESHOLD = 3 // 60%

type Phase = 'intro' | 'playing' | 'result'
const phase = ref<Phase>('intro')

const currentIdx = ref(0)
const score = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const lastResult = ref<'correct' | 'wrong' | null>(null)
const showCelebration = ref(false)
const roundDinos = ref<Dinosaur[]>([])
const showDinoModal = ref(false)
/** true when the current dino card has been "picked up" — waiting for a continent tap */
const dinoSelected = ref(false)

const correctContinentId = ref<ContinentId | null>(null)
const countryText = ref<string>('')

/** Filter dinosaurs that have a real continent on land (skip marine/flying). */
function isMappable(d: Dinosaur): boolean {
  if (!d.fossilLocations?.length) return false
  // Coordinates are stored as [latitude, longitude] in the data files.
  const [lat, lng] = d.fossilLocations[0].coordinates
  return findContinentForLatLng(lat, lng) !== null
}

function pickRandomDinos(): Dinosaur[] {
  const pool = [...dinosaurs].filter(isMappable)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  // Prefer continent diversity across the 5 rounds
  const result: Dinosaur[] = []
  const seen = new Set<ContinentId | null>()
  for (const d of pool) {
    const [lat, lng] = d.fossilLocations[0].coordinates
    const c = findContinentForLatLng(lat, lng)
    if (seen.has(c)) continue
    seen.add(c)
    result.push(d)
    if (result.length >= TOTAL_ROUNDS) break
  }
  for (const d of pool) {
    if (result.length >= TOTAL_ROUNDS) break
    if (!result.includes(d)) result.push(d)
  }
  return result.slice(0, TOTAL_ROUNDS)
}

const currentDino = computed(() => roundDinos.value[currentIdx.value])
const progress = computed(() => Math.round((currentIdx.value / TOTAL_ROUNDS) * 100))
const isLast = computed(() => currentIdx.value === TOTAL_ROUNDS - 1)
const passed = computed(() => score.value >= PASS_THRESHOLD)
const accuracy = computed(() => {
  if (currentIdx.value === 0) return 0
  return Math.round((score.value / currentIdx.value) * 100)
})

const currentDinoName = computed(() => {
  const d = currentDino.value
  return d ? translateDino(d).name : ''
})

const currentDinoImage = computed(() => {
  const d = currentDino.value
  return d ? d.images.card : ''
})

const translatedCurrentDino = computed(() => {
  const d = currentDino.value
  return d ? translateDino(d) : null
})

const eraBorderClass = computed(() => {
  const d = currentDino.value
  if (!d) return 'border-[var(--glass-border)]'
  if (d.era === 'triassic') return 'border-amber-700'
  if (d.era === 'jurassic') return 'border-emerald-600'
  return 'border-sky-600'
})

const eraLabel = computed(() => {
  const d = currentDino.value
  if (!d) return ''
  return t(`ui.encyclopedia.${d.era}`)
})

function continentName(id: ContinentId | null | undefined): string {
  if (!id) return ''
  return t(`games.dinoMap.continents.${id}` as `games.dinoMap.continents.${ContinentId}`)
}

function startGame() {
  roundDinos.value = pickRandomDinos()
  currentIdx.value = 0
  score.value = 0
  streak.value = 0
  bestStreak.value = 0
  lastResult.value = null
  dinoSelected.value = false
  recomputeCorrect()
  phase.value = 'playing'
}

function recomputeCorrect() {
  const d = roundDinos.value[currentIdx.value]
  if (!d) {
    correctContinentId.value = null
    countryText.value = ''
    return
  }
  // Coordinates are stored as [latitude, longitude] in the data files.
  const [lat, lng] = d.fossilLocations[0].coordinates
  correctContinentId.value = findContinentForLatLng(lat, lng)
  countryText.value = localizeCountry(d.fossilLocations[0].country, String(locale.value))
}

function pickDino() {
  if (lastResult.value !== null) return
  dinoSelected.value = true
}

function placeDino(continentId: ContinentId) {
  if (lastResult.value !== null) return
  if (!dinoSelected.value) return
  const correct = correctContinentId.value
  if (!correct) return
  if (continentId === correct) {
    score.value++
    streak.value++
    if (streak.value > bestStreak.value) bestStreak.value = streak.value
    lastResult.value = 'correct'
  } else {
    streak.value = 0
    lastResult.value = 'wrong'
  }
  dinoSelected.value = false
}

function nextRound() {
  if (isLast.value) {
    phase.value = 'result'
    if (passed.value) showCelebration.value = true
    gameStore.recordGameCompletion('dino-map', score.value * 10)
    return
  }
  currentIdx.value++
  lastResult.value = null
  dinoSelected.value = false
  recomputeCorrect()
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function playAgain() {
  startGame()
}

function onAddToCompare(id: string) {
  showDinoModal.value = false
  router.push(localRoute({ name: 'compare', query: { a: id } }))
}

/** Continent path color: depends on game state */
function continentFillClass(id: ContinentId): string {
  // Result highlight
  if (lastResult.value !== null) {
    if (id === correctContinentId.value) {
      return lastResult.value === 'correct' ? 'fill-green-500/85' : 'fill-green-500/40'
    }
    return 'fill-emerald-200/30 dark:fill-emerald-800/30'
  }
  // Selected: highlight the continent the player is about to tap
  if (dinoSelected.value) return 'fill-amber-400/40 hover:fill-amber-400/65'
  return 'fill-emerald-200/85 hover:fill-emerald-300 dark:fill-emerald-700/60 dark:hover:fill-emerald-600/70'
}

function continentStrokeClass(id: ContinentId): string {
  if (lastResult.value !== null && id === correctContinentId.value) {
    return lastResult.value === 'correct' ? 'stroke-green-600 dark:stroke-green-300' : 'stroke-red-500 dark:stroke-red-300'
  }
  if (dinoSelected.value) return 'stroke-amber-500 dark:stroke-amber-300'
  return 'stroke-emerald-700/50 dark:stroke-emerald-400/40'
}

onMounted(() => {
  // No-op; game starts on user click
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6 sm:py-10">
    <div class="flex items-center justify-between mb-4 sm:mb-8">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div v-if="phase === 'playing'" class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <span>{{ t('games.dinoMap.round', { current: currentIdx + 1, total: TOTAL_ROUNDS }) }}</span>
        <span class="font-semibold text-[var(--color-brand-amber)]">{{ t('games.dinoMap.score', { score }) }}</span>
        <span v-if="streak >= 2" class="text-[var(--color-brand-ember)]">🔥 {{ streak }}</span>
      </div>
    </div>

    <h1 class="text-display-md pb-2 text-center">{{ t('games.dinoMap.title') }}</h1>
    <p v-if="phase === 'intro'" class="text-body-md text-center text-[var(--color-text-secondary)] mb-6 sm:mb-8">
      {{ t('games.dinoMap.tagline') }}
    </p>
    <SeoHead
      :title="t('games.dinoMap.title')"
      :description="t('games.dinoMap.description')"
    />

    <!-- Intro screen -->
    <div v-if="phase === 'intro'" class="max-w-xl mx-auto text-center space-y-6 sm:space-y-8">
      <div class="text-6xl sm:text-7xl mb-1 sm:mb-2">🌍</div>
      <p class="text-body-md sm:text-body-lg text-[var(--color-text-secondary)]">
        {{ t('games.dinoMap.description') }}
      </p>

      <svg :viewBox="`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`" class="w-full max-w-md mx-auto h-auto rounded-[var(--radius-lg)] bg-sky-200/60 dark:bg-sky-900/30">
        <path
          v-for="c in continents"
          :key="c.id"
          :d="c.svgPath"
          class="fill-emerald-200/80 stroke-emerald-700/50 stroke-1 dark:fill-emerald-700/60 dark:stroke-emerald-400/40"
        />
      </svg>

      <BaseButton size="lg" icon="play" @click="startGame">
        {{ t('games.dinoMap.start') }}
      </BaseButton>
    </div>

    <!-- Playing -->
    <div v-else-if="phase === 'playing' && currentDino" class="space-y-3 sm:space-y-5">
      <BaseProgressBar :value="progress" />

      <!-- Dino card (tap to "pick up") -->
      <button
        type="button"
        class="w-full rounded-[var(--radius-xl)] overflow-hidden border-2 bg-[var(--color-bg-elevated)] transition-all duration-300 disabled:cursor-default"
        :class="[
          eraBorderClass,
          dinoSelected ? 'shadow-[0_0_30px_rgba(212,164,58,0.55)] scale-[1.01] ring-2 ring-amber-400' : '',
          lastResult === 'correct' ? 'border-green-500' : '',
          lastResult === 'wrong' ? 'border-red-500' : '',
        ]"
        :disabled="lastResult !== null"
        @click="pickDino"
      >
        <div class="flex flex-col items-center text-center p-3 sm:p-4 gap-2">
          <div
            class="w-32 h-32 sm:w-40 sm:h-40 rounded-[var(--radius-lg)] bg-cover bg-center bg-[var(--color-bg-base)]"
            :style="{ backgroundImage: `url(${currentDinoImage})` }"
          />
          <h2 class="text-base sm:text-lg font-bold leading-tight mt-1">{{ currentDinoName }}</h2>
          <p class="text-xs text-[var(--color-text-secondary)] leading-snug">
            {{ eraLabel }}
          </p>
          <p
            v-if="!dinoSelected && !lastResult"
            class="text-[11px] sm:text-xs text-[var(--color-brand-amber)] font-semibold"
          >
            👆 {{ t('games.dinoMap.dragHere') }}
          </p>
          <p
            v-else-if="dinoSelected && !lastResult"
            class="text-[11px] sm:text-xs text-amber-600 dark:text-amber-300 font-semibold"
          >
            → {{ t('games.dinoMap.tapContinent') }}
          </p>
        </div>
      </button>

      <!-- Map -->
      <div class="rounded-[var(--radius-xl)] bg-sky-200/60 dark:bg-sky-900/30 border border-[var(--glass-border)] p-2 sm:p-3">
        <svg
          :viewBox="`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`"
          class="w-full h-auto min-h-[260px] sm:min-h-[340px] block select-none touch-manipulation"
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- Ocean grid for visual depth -->
          <g class="pointer-events-none" opacity="0.3">
            <line v-for="lng in [0, 90, 180, 270, 360]" :key="`vl-${lng}`"
              :x1="(lng/360)*1000" y1="0" :x2="(lng/360)*1000" y2="500"
              class="stroke-sky-300 dark:stroke-sky-700" stroke-width="0.5" stroke-dasharray="2 4" />
            <line v-for="lat in [0, 30, 60, 90, 120, 150, 180]" :key="`hl-${lat}`"
              x1="0" :y1="(lat/180)*500" x2="1000" :y2="(lat/180)*500"
              class="stroke-sky-300 dark:stroke-sky-700" stroke-width="0.5" stroke-dasharray="2 4" />
          </g>
          <!-- Continents -->
          <path
            v-for="c in continents"
            :key="c.id"
            :d="c.svgPath"
            :class="[continentFillClass(c.id), continentStrokeClass(c.id), 'stroke-1 transition-all duration-200', dinoSelected ? 'cursor-pointer' : '']"
            @click="placeDino(c.id)"
          />
          <!-- Continent labels -->
          <g class="pointer-events-none">
            <text
              v-for="c in continents"
              :key="`l-${c.id}`"
              :x="c.labelPos[0]"
              :y="c.labelPos[1]"
              text-anchor="middle"
              dominant-baseline="middle"
              class="fill-[var(--color-text-secondary)]"
              style="font-size: 13px; font-weight: 600; paint-order: stroke; stroke: var(--color-bg-base); stroke-width: 3px; stroke-linejoin: round;"
            >
              {{ continentName(c.id) }}
            </text>
          </g>
        </svg>
      </div>

      <!-- Feedback -->
      <div
        v-if="lastResult === 'correct'"
        class="text-center py-4 px-3 rounded-[var(--radius-md)] bg-green-500/10 border border-green-500/30"
      >
        <p class="text-lg font-semibold text-green-500 mb-1">✓ {{ t('games.dinoMap.correct') }}</p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-3">
          {{ t('games.dinoMap.correctWas', { continent: continentName(correctContinentId), country: countryText }) }}
        </p>
        <div class="flex justify-center gap-2 flex-wrap">
          <BaseButton variant="ghost" icon="book-open" @click="showDinoModal = true">
            {{ t('games.dinoMap.openCard') }}
          </BaseButton>
          <BaseButton variant="primary" @click="nextRound">
            {{ isLast ? t('games.dinoMap.seeResult') : t('games.dinoMap.next') }}
          </BaseButton>
        </div>
      </div>
      <div
        v-else-if="lastResult === 'wrong'"
        class="text-center py-4 px-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30"
      >
        <p class="text-lg font-semibold text-red-500 mb-1">✗ {{ t('games.dinoMap.wrong') }}</p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-3">
          {{ t('games.dinoMap.correctWas', { continent: continentName(correctContinentId), country: countryText }) }}
        </p>
        <div class="flex justify-center gap-2 flex-wrap">
          <BaseButton variant="ghost" icon="book-open" @click="showDinoModal = true">
            {{ t('games.dinoMap.openCard') }}
          </BaseButton>
          <BaseButton variant="primary" @click="nextRound">
            {{ isLast ? t('games.dinoMap.seeResult') : t('games.dinoMap.next') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-else-if="phase === 'result'" class="max-w-xl mx-auto text-center space-y-5 sm:space-y-6">
      <BaseConfetti v-if="showCelebration" />
      <div class="text-5xl sm:text-6xl mb-2 sm:mb-4">
        {{ passed ? '🏆' : '🗺️' }}
      </div>
      <h2 class="text-display-sm sm:text-display-md">
        {{ passed ? t('games.dinoMap.passed') : t('games.dinoMap.keepLearning') }}
      </h2>
      <p class="text-body-md sm:text-body-lg text-[var(--color-text-secondary)]">
        {{ t('games.dinoMap.finalScore', { score, total: TOTAL_ROUNDS }) }}
      </p>

      <div class="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">{{ score }}/{{ TOTAL_ROUNDS }}</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dinoMap.stats.correct') }}</p>
        </div>
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">{{ accuracy }}%</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dinoMap.stats.accuracy') }}</p>
        </div>
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">🔥 {{ bestStreak }}</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dinoMap.stats.bestStreak') }}</p>
        </div>
      </div>

      <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
        <BaseButton variant="primary" icon="refresh-ccw" @click="playAgain">
          {{ t('games.dinoMap.playAgain') }}
        </BaseButton>
        <BaseButton variant="ghost" :to="localRoute({ name: 'games' })">
          {{ t('games.dinoMap.backToGames') }}
        </BaseButton>
      </div>
    </div>

    <DinoDetailModal
      :is-open="showDinoModal"
      :dino="translatedCurrentDino"
      @close="showDinoModal = false"
      @add-to-compare="onAddToCompare"
    />
  </div>
</template>
