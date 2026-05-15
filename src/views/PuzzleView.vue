<script setup lang="ts">
import { ref, computed } from 'vue'
import { dinosaurs } from '@/data/dinosaurs'
import { useGameStore } from '@/stores/useGameStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const gameStore = useGameStore()
const dino = dinosaurs[Math.floor(Math.random() * dinosaurs.length)]
const gridSize = 3
const tileCount = gridSize * gridSize
const moves = ref(0)
const completed = ref(false)

interface Tile { id: number; pos: number }
const tiles = ref<Tile[]>([])
const selectedTile = ref<number | null>(null)

function initPuzzle() {
  const arr: Tile[] = Array.from({ length: tileCount }, (_, i) => ({ id: i, pos: i }))
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
      <router-link to="/games" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">Back to Games</span>
      </router-link>
      <span class="text-sm text-[var(--color-text-secondary)]">Moves: {{ moves }}</span>
    </div>

    <h1 class="text-display-md mb-8 text-center">Dino Puzzle</h1>
    <SeoHead
      title="Dino Puzzle — Solve the Picture"
      description="Solve a sliding puzzle featuring dinosaur illustrations. Swap tiles to reconstruct the picture in as few moves as possible."
    />

    <!-- Puzzle Grid -->
    <div v-if="!completed" class="grid grid-cols-3 gap-1.5 mb-8">
      <button
        v-for="i in tileCount"
        :key="i"
        type="button"
        class="aspect-square bg-[var(--color-bg-elevated)] border-2 rounded-[var(--radius-sm)] overflow-hidden transition-all duration-200"
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
            backgroundImage: `url(${dino.images.hero})`,
            backgroundSize: `${gridSize * 100}%`,
            backgroundPosition: `${((tiles.find(t => t.pos === i - 1)?.id ?? 0) % gridSize) * (100 / (gridSize - 1))}% ${Math.floor((tiles.find(t => t.pos === i - 1)?.id ?? 0) / gridSize) * (100 / (gridSize - 1))}%`,
          }"
        />
      </button>
    </div>

    <!-- Complete -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4 animate-celebration-pop">🧩</div>
      <h2 class="text-display-md mb-2">Puzzle Complete!</h2>
      <p class="text-body-md mb-6">You solved it in {{ moves }} moves!</p>
      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="initPuzzle">Play Again</BaseButton>
        <BaseButton variant="ghost" to="/games">Back to Games</BaseButton>
      </div>
    </div>
  </div>
</template>
