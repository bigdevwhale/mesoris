<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import { dinosaurs } from '@/data/dinosaurs'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import DinoDetailModal from '@/components/encyclopedia/DinoDetailModal.vue'
import type { Dinosaur } from '@/types/dinosaur'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()
const { translateDino } = useDinoTranslator()

type BinKey = 'herbivore' | 'carnivore' | 'omnivore' | 'piscivore'

const TOTAL_ROUNDS = 8
const PASS_THRESHOLD = 6 // 75%

interface Bin {
  key: BinKey
  icon: string
}

const bins: Bin[] = [
  { key: 'herbivore', icon: 'leaf' },
  { key: 'omnivore', icon: 'apple' },
  { key: 'piscivore', icon: 'fish' },
  { key: 'carnivore', icon: 'beef' },
]

interface DinoFact {
  label: string
  value: string
  icon: string
  description: string
}

function pickRandomDinos(): Dinosaur[] {
  const pool = [...dinosaurs]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  // Prefer diversity: avoid 3+ of the same diet in a row
  const result: Dinosaur[] = []
  const dietCount: Record<string, number> = { herbivore: 0, carnivore: 0, omnivore: 0, piscivore: 0 }
  for (const d of pool) {
    const key = classifyDino(d)
    if (dietCount[key] >= 3) continue
    result.push(d)
    dietCount[key]++
    if (result.length >= TOTAL_ROUNDS) break
  }
  // Top up if we didn't get enough variety
  for (const d of pool) {
    if (result.length >= TOTAL_ROUNDS) break
    if (!result.includes(d)) result.push(d)
  }
  return result.slice(0, TOTAL_ROUNDS)
}

function classifyDino(d: Dinosaur): BinKey {
  // Prefer explicit diet when possible
  if (d.diet === 'herbivore') return 'herbivore'
  if (d.diet === 'carnivore') {
    // Piscivores: marine-reptiles & spinosaurids with 'fish' in description, also known fish-eaters
    const lc = (d.longDescription + ' ' + d.description + ' ' + d.name).toLowerCase()
    const isMarine = d.category === 'marine-reptile'
    const isSpinosaurid = ['spinosaurus', 'baryonyx', 'suchomimus'].includes(d.id)
    const isPlesiosaur = ['plesiosaurus', 'kronosaurus', 'liopleurodon', 'elasmosaurus', 'mosasaurus', 'tylosaurus', 'nothosaurus'].includes(d.id)
    const fishHint = /fish|piscivor|aquatic|river|sea|ocean/i.test(lc)
    if (isMarine || isPlesiosaur || isSpinosaurid || fishHint) return 'piscivore'
    return 'carnivore'
  }
  if (d.diet === 'omnivore') return 'omnivore'
  return 'omnivore'
}

type Phase = 'intro' | 'playing' | 'result'
const phase = ref<Phase>('intro')
const currentIdx = ref(0)
const score = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const lastResult = ref<'correct' | 'wrong' | null>(null)
const roundDinos = ref<Dinosaur[]>([])
const showCelebration = ref(false)
const selectedBin = ref<BinKey | null>(null)
const showDinoModal = ref(false)
const feedbackRef = ref<HTMLElement | null>(null)

const currentDino = computed(() => roundDinos.value[currentIdx.value])
const progress = computed(() => Math.round((currentIdx.value / TOTAL_ROUNDS) * 100))
const isLast = computed(() => currentIdx.value === TOTAL_ROUNDS - 1)
const passed = computed(() => score.value >= PASS_THRESHOLD)

const currentDinoName = computed(() => {
  const d = currentDino.value
  if (!d) return ''
  return translateDino(d).name
})

const currentDinoImage = computed(() => {
  const d = currentDino.value
  if (!d) return ''
  return d.images.hero
})

const correctBin = computed<BinKey | null>(() => {
  const d = currentDino.value
  if (!d) return null
  return classifyDino(d)
})

const accuracy = computed(() => {
  if (currentIdx.value === 0) return 0
  return Math.round((score.value / currentIdx.value) * 100)
})

function startGame() {
  roundDinos.value = pickRandomDinos()
  currentIdx.value = 0
  score.value = 0
  streak.value = 0
  bestStreak.value = 0
  lastResult.value = null
  selectedBin.value = null
  phase.value = 'playing'
}

function chooseBin(bin: BinKey) {
  if (lastResult.value !== null) return // wait for transition
  const correct = correctBin.value
  if (!correct) return
  selectedBin.value = bin
  if (bin === correct) {
    score.value++
    streak.value++
    if (streak.value > bestStreak.value) bestStreak.value = streak.value
    lastResult.value = 'correct'
  } else {
    streak.value = 0
    lastResult.value = 'wrong'
  }
  // Scroll the feedback panel into view on mobile so the action button is visible
  nextTick(() => {
    feedbackRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

function nextRound() {
  if (isLast.value) {
    phase.value = 'result'
    if (passed.value) showCelebration.value = true
    gameStore.recordGameCompletion('diet-detective', score.value * 10)
    return
  }
  currentIdx.value++
  lastResult.value = null
  selectedBin.value = null
  // Scroll back to top of the game area on next round
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function playAgain() {
  startGame()
}

onMounted(() => {
  // No-op; game starts on user click to keep state clean
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div v-if="phase === 'playing'" class="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
        <span>{{ t('games.dietDetective.round', { current: currentIdx + 1, total: TOTAL_ROUNDS }) }}</span>
        <span class="font-semibold text-[var(--color-brand-amber)]">{{ t('games.dietDetective.score', { score }) }}</span>
        <span v-if="streak >= 2" class="text-[var(--color-brand-ember)]">🔥 {{ streak }}</span>
      </div>
    </div>

    <h1 class="text-display-md pb-2 text-center">{{ t('games.dietDetective.title') }}</h1>
    <p class="text-body-md text-center text-[var(--color-text-secondary)] mb-8">
      {{ t('games.dietDetective.tagline') }}
    </p>
    <SeoHead
      :title="t('games.dietDetective.title')"
      :description="t('games.dietDetective.description')"
    />

    <!-- Intro screen -->
    <div v-if="phase === 'intro'" class="max-w-xl mx-auto text-center space-y-6 sm:space-y-8">
      <div class="text-6xl sm:text-7xl mb-1 sm:mb-2">🥩</div>
      <p class="text-body-md sm:text-body-lg text-[var(--color-text-secondary)]">
        {{ t('games.dietDetective.description') }}
      </p>

      <div class="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm mx-auto text-xs sm:text-sm">
        <div class="flex items-center gap-2 p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <BaseIcon name="leaf" :size="18" class="text-green-500 flex-shrink-0" />
          <span>{{ t('games.dietDetective.bins.herbivore') }}</span>
        </div>
        <div class="flex items-center gap-2 p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <BaseIcon name="beef" :size="18" class="text-red-500 flex-shrink-0" />
          <span>{{ t('games.dietDetective.bins.carnivore') }}</span>
        </div>
        <div class="flex items-center gap-2 p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <BaseIcon name="apple" :size="18" class="text-orange-500 flex-shrink-0" />
          <span>{{ t('games.dietDetective.bins.omnivore') }}</span>
        </div>
        <div class="flex items-center gap-2 p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <BaseIcon name="fish" :size="18" class="text-blue-500 flex-shrink-0" />
          <span>{{ t('games.dietDetective.bins.piscivore') }}</span>
        </div>
      </div>

      <BaseButton size="lg" icon="play" @click="startGame">
        {{ t('games.dietDetective.start') }}
      </BaseButton>
    </div>

    <!-- Playing -->
    <div v-else-if="phase === 'playing' && currentDino" class="space-y-3 sm:space-y-6">
      <BaseProgressBar :value="progress" />

      <!-- Dino card -->
      <div
        class="relative rounded-[var(--radius-xl)] overflow-hidden border-2 transition-all duration-300"
        :class="lastResult === 'correct'
          ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
          : lastResult === 'wrong'
          ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
          : 'border-[var(--glass-border)]'"
      >
        <div
          class="aspect-[16/9] sm:aspect-[21/9] bg-cover bg-center"
          :style="{ backgroundImage: `url(${currentDinoImage})` }"
        />

        <div class="p-3 sm:p-6 bg-[var(--color-bg-elevated)]">
          <h2 class="text-heading-md sm:text-heading-lg mb-0.5 sm:mb-1 text-center">{{ currentDinoName }}</h2>
          <p class="text-xs sm:text-body-sm text-center text-[var(--color-text-secondary)] italic">
            {{ t('games.dietDetective.question') }}
          </p>
        </div>
      </div>

      <!-- Bins (clickable) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <button
          v-for="bin in bins"
          :key="bin.key"
          type="button"
          class="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-[var(--radius-lg)] border-2 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed"
          :class="lastResult === null
            ? 'bg-[var(--color-bg-elevated)] border-[var(--glass-border)] hover:border-[var(--color-brand-amber)] cursor-pointer'
            : bin.key === correctBin
            ? 'bg-green-500/10 border-green-500'
            : bin.key === selectedBin
            ? 'bg-red-500/10 border-red-500'
            : 'bg-[var(--color-bg-elevated)] border-[var(--glass-border)] opacity-50'"
          :disabled="lastResult !== null"
          @click="chooseBin(bin.key)"
        >
          <BaseIcon :name="bin.icon" :size="28" class="sm:hidden" />
          <BaseIcon :name="bin.icon" :size="32" class="hidden sm:block" />
          <span class="text-xs sm:text-sm font-semibold">{{ t('games.dietDetective.bins.' + bin.key) }}</span>
        </button>
      </div>

      <!-- Feedback -->
      <div
        v-if="lastResult === 'correct'"
        ref="feedbackRef"
        class="text-center py-4 px-3 rounded-[var(--radius-md)] bg-green-500/10 border border-green-500/30"
      >
        <p class="text-lg font-semibold text-green-500 mb-1">✓ {{ t('games.dietDetective.correct') }}</p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-3">
          {{ t('games.dietDetective.explanation.' + correctBin!) }}
        </p>
        <div class="flex justify-center gap-2 flex-wrap">
          <BaseButton variant="ghost" icon="book-open" @click="showDinoModal = true">
            {{ t('games.dietDetective.openCard') }}
          </BaseButton>
          <BaseButton variant="primary" @click="nextRound">
            {{ isLast ? t('games.dietDetective.seeResult') : t('games.dietDetective.next') }}
          </BaseButton>
        </div>
      </div>
      <div
        v-else-if="lastResult === 'wrong'"
        ref="feedbackRef"
        class="text-center py-4 px-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30"
      >
        <p class="text-lg font-semibold text-red-500 mb-1">✗ {{ t('games.dietDetective.wrong') }}</p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-1">
          {{ t('games.dietDetective.correctWas', { bin: t('games.dietDetective.bins.' + correctBin!) }) }}
        </p>
        <p class="text-sm text-[var(--color-text-secondary)] mb-3">
          {{ t('games.dietDetective.explanation.' + correctBin!) }}
        </p>
        <div class="flex justify-center gap-2 flex-wrap">
          <BaseButton variant="ghost" icon="book-open" @click="showDinoModal = true">
            {{ t('games.dietDetective.openCard') }}
          </BaseButton>
          <BaseButton variant="primary" @click="nextRound">
            {{ isLast ? t('games.dietDetective.seeResult') : t('games.dietDetective.next') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-else-if="phase === 'result'" class="max-w-xl mx-auto text-center space-y-5 sm:space-y-6">
      <BaseConfetti v-if="showCelebration" />
      <div class="text-5xl sm:text-6xl mb-2 sm:mb-4">
        {{ passed ? '🏆' : '📚' }}
      </div>
      <h2 class="text-display-sm sm:text-display-md">
        {{ passed ? t('games.dietDetective.passed') : t('games.dietDetective.keepLearning') }}
      </h2>
      <p class="text-body-md sm:text-body-lg text-[var(--color-text-secondary)]">
        {{ t('games.dietDetective.finalScore', { score, total: TOTAL_ROUNDS }) }}
      </p>

      <div class="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">{{ score }}/{{ TOTAL_ROUNDS }}</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dietDetective.stats.correct') }}</p>
        </div>
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">{{ accuracy }}%</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dietDetective.stats.accuracy') }}</p>
        </div>
        <div class="p-3 sm:p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]">
          <p class="text-xl sm:text-2xl font-bold text-[var(--color-brand-amber)]">🔥 {{ bestStreak }}</p>
          <p class="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-1">{{ t('games.dietDetective.stats.bestStreak') }}</p>
        </div>
      </div>

      <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
        <BaseButton variant="primary" icon="refresh-ccw" @click="playAgain">
          {{ t('games.dietDetective.playAgain') }}
        </BaseButton>
        <BaseButton variant="ghost" :to="localRoute({ name: 'games' })">
          {{ t('games.dietDetective.backToGames') }}
        </BaseButton>
      </div>
    </div>

    <DinoDetailModal
      :is-open="showDinoModal"
      :dino="currentDino"
      @close="showDinoModal = false"
    />
  </div>
</template>
