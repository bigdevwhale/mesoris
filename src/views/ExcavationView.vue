<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { dinosaurs } from '@/data/dinosaurs'
import { useGameStore } from '@/stores/useGameStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'

const gameStore = useGameStore()
const dino = dinosaurs[Math.floor(Math.random() * dinosaurs.length)]
const canvasRef = ref<HTMLCanvasElement>()
const progress = ref(0)
const completed = ref(false)
const isDrawing = ref(false)

let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#c4a87c'
  ctx.fillRect(0, 0, 400, 300)
})

function getPos(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
  if (!canvasRef.value) return null
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = 400 / rect.width
  const scaleY = 300 / rect.height
  if ('touches' in e) {
    const t = e.touches[0]
    return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY }
  }
  return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
}

function brush(e: MouseEvent | TouchEvent) {
  if (!isDrawing.value || !ctx || completed.value) return
  const pos = getPos(e)
  if (!pos) return

  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2)
  ctx.fill()

  const imageData = ctx.getImageData(0, 0, 400, 300)
  let transparent = 0
  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) transparent++
  }
  progress.value = Math.round((transparent / (400 * 300)) * 100)

  if (progress.value >= 75 && !completed.value) {
    completed.value = true
    const score = Math.round(progress.value)
    gameStore.recordGameCompletion('excavation', score)
  }
}

function startBrush(e: MouseEvent | TouchEvent) {
  isDrawing.value = true
  brush(e)
}
function stopBrush() { isDrawing.value = false }

function restart() {
  if (!ctx) return
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#c4a87c'
  ctx.fillRect(0, 0, 400, 300)
  progress.value = 0
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
    </div>

    <h1 class="text-display-md mb-4 text-center">Fossil Excavation</h1>
    <SeoHead
      title="Fossil Excavation — Dig Up Dinosaurs"
      description="Use your brush to carefully excavate a dinosaur fossil. Reveal the skeleton hidden beneath the sand and discover which dinosaur you've uncovered."
    />
    <p class="text-body-md text-center mb-6">Brush away the sand to reveal the fossil!</p>

    <BaseProgressBar :value="progress" :show-value="true" label="Revealed" color="var(--color-brand-amber)" class="mb-6" />

    <div class="relative rounded-[var(--radius-lg)] overflow-hidden border-2 border-[var(--glass-border)] bg-[var(--color-bg-overlay)]">
      <BaseLazyImage
        :src="dino.images.skeleton ?? dino.images.hero"
        :alt="dino.name"
        :priority="true"
        aspect-ratio="4/3"
        class="absolute inset-0 w-full h-full"
      />
      <canvas
        ref="canvasRef"
        width="400"
        height="300"
        class="w-full h-auto touch-none cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22><circle cx=%2216%22 cy=%2216%22 r=%2214%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 opacity=%220.6%22/></svg>')_16_16,auto]"
        @mousedown="startBrush"
        @mousemove="brush"
        @mouseup="stopBrush"
        @mouseleave="stopBrush"
        @touchstart.prevent="startBrush"
        @touchmove.prevent="brush"
        @touchend="stopBrush"
      />
    </div>

    <div v-if="completed" class="text-center mt-8">
      <div class="text-4xl mb-4 animate-celebration-pop">⛏️</div>
      <h2 class="text-heading-md mb-2">Fossil Revealed!</h2>
      <p class="text-body-md mb-4">It's a {{ dino.name }} fossil!</p>
      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">Dig Again</BaseButton>
        <BaseButton variant="ghost" to="/games">Back to Games</BaseButton>
      </div>
    </div>
  </div>
</template>
