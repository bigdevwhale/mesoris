<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/useGameStore'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { useRecentDinos } from '@/composables/useRecentDinos'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DinoDetailModal from '@/components/encyclopedia/DinoDetailModal.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const { translateDino } = useDinoTranslator()
const gameStore = useGameStore()
const router = useRouter()
const { pickRandomDino } = useRecentDinos()

const dino = ref(pickRandomDino())
const translatedDino = computed(() => translateDino(dino.value))
const showDinoModal = ref(false)

function openDinoCard() { showDinoModal.value = true }
function onAddToCompare(id: string) {
  showDinoModal.value = false
  router.push(localRoute({ name: 'compare', query: { a: id } }))
}
type Difficulty = 'easy' | 'medium' | 'hard'
const difficultyMap: Record<Difficulty, number> = { easy: 3, medium: 4, hard: 5 }
const difficulty = ref<Difficulty>('easy')
const gridSize = computed(() => difficultyMap[difficulty.value])
const tileCount = computed(() => gridSize.value * gridSize.value)
const moves = ref(0)
const completed = ref(false)

interface Tile { id: number; pos: number }
const tiles = ref<Tile[]>([])
const selectedTile = ref<number | null>(null)

function initPuzzle() {
  dino.value = pickRandomDino()
  const arr: Tile[] = Array.from({ length: tileCount.value }, (_, i) => ({ id: i, pos: i }))
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i].pos, arr[j].pos] = [arr[j].pos, arr[i].pos]
  }
  tiles.value = arr
  moves.value = 0
  completed.value = false
  selectedTile.value = null
}

initPuzzle()

const isComplete = computed(() => tiles.value.every((t, i) => t.pos === i))

function clickTile(index: number) {
  if (completed.value) return
  if (selectedTile.value === null) {
    selectedTile.value = index
  } else if (selectedTile.value === index) {
    selectedTile.value = null
  } else {
    const a = tiles.value.find(t => t.pos === selectedTile.value)!
    const b = tiles.value.find(t => t.pos === index)!
    const tmp = a.pos; a.pos = b.pos; b.pos = tmp
    selectedTile.value = null
    moves.value++
    if (isComplete.value) {
      completed.value = true
      gameStore.recordGameCompletion('puzzle', Math.max(0, 100 - moves.value * 2))
    }
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <router-link :to="localRoute({ name: 'games' })" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <span class="text-sm text-[var(--color-text-secondary)]">{{ t('games.puzzleGame.moves', { count: moves }) }}</span>
    </div>

    <h1 class="text-display-md pb-6 text-center">{{ t('games.puzzleGame.title') }}</h1>

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
        @click="difficulty = lvl; initPuzzle()"
      >
        {{ t('games.difficulty.' + lvl) }} ({{ difficultyMap[lvl] }}x{{ difficultyMap[lvl] }})
      </button>
    </div>
    <SeoHead
      :title="t('games.puzzleGame.title')"
      :description="t('games.puzzleGame.description')"
    />

    <!-- Puzzle Grid -->
    <div v-if="!completed" class="grid gap-1.5 mb-8" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
      <button
        v-for="i in tileCount"
        :key="i"
        type="button"
        class="aspect-[4/3] bg-[var(--color-bg-elevated)] border-2 rounded-[var(--radius-sm)] overflow-hidden transition-all duration-200"
        :class="[
          selectedTile === i - 1
            ? 'border-[var(--color-brand-amber)] shadow-[0_0_12px_rgba(212,164,58,0.4)]'
            : 'border-[var(--glass-border)] hover:border-[var(--color-text-tertiary)]',
        ]"
        @click="clickTile(i - 1)"
      >
        <div
          class="w-full h-full"
          :style="{
            backgroundImage: `url(${translatedDino.images.hero})`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${((tiles.find(t => t.pos === i - 1)?.id ?? 0) % gridSize) * (100 / (gridSize - 1))}% ${Math.floor((tiles.find(t => t.pos === i - 1)?.id ?? 0) / gridSize) * (100 / (gridSize - 1))}%`,
          }"
        />
      </button>
    </div>

    <!-- Complete -->
    <div v-else class="space-y-6">
      <div class="text-center py-8">
        <div class="text-6xl mb-4 animate-celebration-pop">🧩</div>
        <h2 class="text-display-md mb-2">{{ t('games.puzzleGame.complete') }}</h2>
        <p class="text-body-md">{{ t('games.puzzleGame.solved', { moves }) }}</p>
      </div>

      <!-- Dino info card -->
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)]">
        <div class="aspect-[2/1] overflow-hidden">
          <BaseLazyImage
            :src="translatedDino.images.hero"
            :alt="translatedDino.name"
            aspect-ratio="2/1"
            class="w-full h-full"
          />
        </div>
        <div class="p-5">
          <h3 class="text-heading-md mb-4">{{ t('games.puzzleGame.aboutDino') }}</h3>
          <p class="text-body-md mb-4">{{ translatedDino.name }} &mdash; {{ translatedDino.nameMeaning }}</p>

          <div class="bg-[rgba(212,164,58,0.08)] border border-[rgba(212,164,58,0.15)] rounded-[var(--radius-md)] p-3 mb-4">
            <span class="text-xs font-semibold text-[var(--color-brand-amber)]">{{ t('games.puzzleGame.funFact') }}</span>
            <p class="text-sm text-[var(--color-text-primary)] mt-1">{{ translatedDino.description }}</p>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" @click="initPuzzle">{{ t('games.puzzleGame.playAgain') }}</BaseButton>
            <BaseButton variant="ghost" @click="openDinoCard">{{ t('games.puzzleGame.openCard') }}</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <DinoDetailModal
      :is-open="showDinoModal"
      :dino="translatedDino"
      @close="showDinoModal = false"
      @add-to-compare="onAddToCompare"
    />
  </div>
</template>
