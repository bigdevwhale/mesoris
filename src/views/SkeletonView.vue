<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/useGameStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const gameStore = useGameStore()
const score = ref(0)
const completed = ref(false)

type BonePiece = { id: string; label: string; correctX: number; correctY: number; x: number; y: number; placed: boolean }
const bones = ref<BonePiece[]>([
  { id: 'skull', label: 'Skull', correctX: 50, correctY: 15, x: 10, y: 80, placed: false },
  { id: 'spine', label: 'Spine', correctX: 50, correctY: 40, x: 85, y: 30, placed: false },
  { id: 'ribs', label: 'Ribs', correctX: 50, correctY: 30, x: 85, y: 70, placed: false },
  { id: 'leg-front', label: 'Front Leg', correctX: 40, correctY: 60, x: 15, y: 30, placed: false },
  { id: 'leg-back', label: 'Hind Leg', correctX: 60, correctY: 60, x: 10, y: 60, placed: false },
  { id: 'tail', label: 'Tail', correctX: 50, correctY: 65, x: 85, y: 80, placed: false },
])
const dragging = ref<string | null>(null)
const snapThreshold = 20

function dragStart(id: string) { if (!bones.value.find(b => b.id === id)?.placed) dragging.value = id }
function onDrop(e: DragEvent) {
  if (!dragging.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  const bone = bones.value.find(b => b.id === dragging.value)
  if (!bone) return

  const dist = Math.sqrt((x - bone.correctX) ** 2 + (y - bone.correctY) ** 2)
  if (dist < snapThreshold) {
    bone.x = bone.correctX
    bone.y = bone.correctY
    bone.placed = true
    score.value++
    if (score.value === bones.value.length) {
      completed.value = true
      gameStore.recordGameCompletion('skeleton', 100)
    }
  } else {
    bone.x = x
    bone.y = y
  }
  dragging.value = null
}

function restart() {
  bones.value.forEach(b => {
    b.placed = false
    b.x = b.id === 'skull' ? 10 : b.id === 'spine' ? 85 : b.id === 'ribs' ? 85 : b.id === 'leg-front' ? 15 : b.id === 'leg-back' ? 10 : 85
    b.y = b.id === 'skull' ? 80 : b.id === 'spine' ? 30 : b.id === 'ribs' ? 70 : b.id === 'leg-front' ? 30 : b.id === 'leg-back' ? 60 : 80
  })
  score.value = 0
  completed.value = false
}
</script>

<template>
  <div class="max-w-lg mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <router-link to="/games" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">Back to Games</span>
      </router-link>
      <span class="text-sm text-[var(--color-text-secondary)]">Bones: {{ score }}/{{ bones.length }}</span>
    </div>

    <h1 class="text-display-md mb-8 text-center">Build a Skeleton</h1>
    <SeoHead
      title="Build a Skeleton — Assemble Dinosaur Bones"
      description="Drag and drop dinosaur bones into their correct positions. Learn about dinosaur anatomy by assembling a complete skeleton."
    />

    <!-- Drop zone -->
    <div
      class="relative aspect-[4/5] bg-[var(--color-bg-elevated)] border-2 border-dashed rounded-[var(--radius-xl)] mb-6 overflow-hidden"
      :class="[completed ? 'border-[var(--color-success)]' : 'border-[var(--glass-border)]']"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <!-- Silhouette outline -->
      <div class="absolute inset-0 flex items-center justify-center opacity-10">
        <BaseIcon name="bone" :size="160" />
      </div>

      <!-- Placed / dragged bones -->
      <div
        v-for="bone in bones"
        :key="bone.id"
        class="absolute px-2 py-1 rounded text-xs font-bold transition-all duration-300 pointer-events-none"
        :class="bone.placed ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30' : 'bg-[var(--color-bg-overlay)]/80 text-[var(--color-text-secondary)]'"
        :style="{ left: `${bone.x}%`, top: `${bone.y}%`, transform: 'translate(-50%, -50%)' }"
      >
        {{ bone.label }}
      </div>
    </div>

    <!-- Bone palette -->
    <div class="flex flex-wrap gap-2 justify-center mb-8">
      <div
        v-for="bone in bones"
        :key="bone.id"
        :draggable="!bone.placed"
        class="px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium cursor-grab active:cursor-grabbing select-none transition-all"
        :class="bone.placed
          ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]/60 border border-[var(--color-success)]/15 cursor-default'
          : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] border border-[var(--glass-border)] hover:border-[var(--color-brand-amber)]'"
        @dragstart="dragStart(bone.id)"
      >
        🦴 {{ bone.label }}
      </div>
    </div>

    <div v-if="completed" class="text-center">
      <div class="text-4xl mb-4 animate-celebration-pop">🦴</div>
      <h2 class="text-heading-md mb-2">Skeleton Complete!</h2>
      <p class="text-body-md mb-4">You assembled the entire skeleton!</p>
      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">Build Again</BaseButton>
        <BaseButton variant="ghost" to="/games">Back to Games</BaseButton>
      </div>
    </div>
  </div>
</template>
