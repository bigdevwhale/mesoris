<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/useGameStore'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useRecentDinos } from '@/composables/useRecentDinos'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()
const { pickRandomDino } = useRecentDinos()

type Difficulty = 'easy' | 'medium' | 'hard'
const difficultyMap: Record<Difficulty, { cols: number; rows: number }> = {
  easy: { cols: 3, rows: 4 },
  medium: { cols: 4, rows: 4 },
  hard: { cols: 6, rows: 4 },
}
const difficulty = ref<Difficulty>('easy')
const cols = computed(() => difficultyMap[difficulty.value].cols)
const rows = computed(() => difficultyMap[difficulty.value].rows)
const pairCount = computed(() => (cols.value * rows.value) / 2)

interface Card {
  id: number
  dinoId: string
  image: string
  name: string
  flipped: boolean
  matched: boolean
}

const cards = ref<Card[]>([])
const moves = ref(0)
const completed = ref(false)
const flippedIndices = ref<number[]>([])
const isChecking = ref(false)

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

function initGame() {
  const dinos: { id: string; image: string; name: string }[] = []
  for (let i = 0; i < pairCount.value; i++) {
    const d = pickRandomDino()
    dinos.push({ id: d.id, image: d.images.hero, name: d.name })
  }

  const deck: Card[] = []
  for (let i = 0; i < pairCount.value; i++) {
    deck.push({ id: i, dinoId: dinos[i].id, image: dinos[i].image, name: dinos[i].name, flipped: false, matched: false })
    deck.push({ id: i, dinoId: dinos[i].id, image: dinos[i].image, name: dinos[i].name, flipped: false, matched: false })
  }
  shuffle(deck)

  cards.value = deck
  moves.value = 0
  completed.value = false
  flippedIndices.value = []
  isChecking.value = false
}

initGame()

const isComplete = computed(() => cards.value.length > 0 && cards.value.every(c => c.matched))

function flipCard(index: number) {
  if (completed.value || isChecking.value) return
  const card = cards.value[index]
  if (!card || card.flipped || card.matched) return

  card.flipped = true
  flippedIndices.value.push(index)

  if (flippedIndices.value.length === 2) {
    moves.value++
    isChecking.value = true
    const [i1, i2] = flippedIndices.value
    const c1 = cards.value[i1]
    const c2 = cards.value[i2]

    if (c1.dinoId === c2.dinoId) {
      c1.matched = true
      c2.matched = true
      flippedIndices.value = []
      isChecking.value = false
      if (isComplete.value) {
        completed.value = true
        gameStore.recordGameCompletion('memory', Math.max(0, 100 - moves.value * 2))
      }
    } else {
      setTimeout(() => {
        c1.flipped = false
        c2.flipped = false
        flippedIndices.value = []
        isChecking.value = false
      }, 700)
    }
  }
}

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, 1fr)`,
}))
</script>

<template>
  <div class="max-w-xl mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <router-link :to="localRoute({ name: 'games' })" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <span class="text-sm text-[var(--color-text-secondary)]">{{ t('games.memoryGame.moves', { count: moves }) }}</span>
    </div>

    <h1 class="text-display-md mb-6 text-center">{{ t('games.memoryGame.title') }}</h1>
    <SeoHead
      title="Memory Match — Find the Pairs"
      description="Flip cards to find matching dinosaur pairs. Train your memory by uncovering beautiful prehistoric illustrations."
    />

    <!-- Difficulty Selector -->
    <div class="flex justify-center gap-2 mb-8">
      <button
        v-for="lvl in (['easy', 'medium', 'hard'] as const)"
        :key="lvl"
        type="button"
        class="px-4 py-1.5 text-sm font-semibold rounded-full border transition-all duration-200"
        :class="difficulty === lvl
          ? 'bg-[var(--color-brand-amber)] text-black border-[var(--color-brand-amber)]'
          : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border-[var(--glass-border)] hover:border-[var(--color-text-tertiary)]'"
        @click="difficulty = lvl; initGame()"
      >
        {{ t('games.difficulty.' + lvl) }} ({{ difficultyMap[lvl].cols }}x{{ difficultyMap[lvl].rows }})
      </button>
    </div>

    <!-- Game Grid -->
    <div v-if="!completed" class="grid gap-2 mb-8" :style="gridStyle">
      <button
        v-for="(card, i) in cards"
        :key="i"
        type="button"
        class="aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden transition-all duration-300 cursor-pointer"
        :class="card.flipped || card.matched
          ? 'border-2 border-[var(--color-brand-amber)] shadow-[0_0_8px_rgba(212,164,58,0.3)]'
          : 'border-2 border-[var(--glass-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-tertiary)]'"
        @click="flipCard(i)"
      >
        <!-- Card back -->
        <div
          v-if="!card.flipped && !card.matched"
          class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-teal)] to-[var(--color-brand-green)]"
        >
          <span class="text-3xl select-none">&#x1F995;</span>
        </div>
        <!-- Card front -->
        <div
          v-else
          class="w-full h-full"
          :style="{
            backgroundImage: `url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        />
      </button>
    </div>

    <!-- Complete -->
    <div v-else class="space-y-6">
      <div class="text-center py-8">
        <div class="text-6xl mb-4 animate-celebration-pop">&#x1F9E0;</div>
        <h2 class="text-display-md mb-2">{{ t('games.memoryGame.complete') }}</h2>
        <p class="text-body-md">{{ t('games.memoryGame.solved', { moves }) }}</p>
      </div>

      <div class="flex justify-center">
        <BaseButton variant="primary" @click="initGame">{{ t('games.memoryGame.playAgain') }}</BaseButton>
      </div>
    </div>
  </div>
</template>
