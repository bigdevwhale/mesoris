<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { dinosaurs } from '@/data/dinosaurs'
import { useGameStore } from '@/stores/useGameStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'

const { t } = useI18n()
const gameStore = useGameStore()
const { translateDino } = useDinoTranslator()

function randomDino() { return dinosaurs[Math.floor(Math.random() * dinosaurs.length)] }
const dino = ref(randomDino())
const translatedDino = computed(() => translateDino(dino.value))

const imageCanvasRef = ref<HTMLCanvasElement>()
const sandCanvasRef = ref<HTMLCanvasElement>()
const progress = ref(0)
const completed = ref(false)
const isDrawing = ref(false)

let imgCtx: CanvasRenderingContext2D | null = null
let sandCtx: CanvasRenderingContext2D | null = null
const W = 400, H = 300
const SAND = '#c4a87c'

function loadDinoImage(ctx: CanvasRenderingContext2D) {
  const img = new Image()
  img.onload = () => ctx.drawImage(img, 0, 0, W, H)
  img.src = dino.value.images.skeleton ?? dino.value.images.hero
}

function fillSand() {
  if (!sandCtx) return
  sandCtx.globalCompositeOperation = 'source-over'
  sandCtx.fillStyle = SAND
  sandCtx.fillRect(0, 0, W, H)
}

onMounted(() => {
  imgCtx = imageCanvasRef.value?.getContext('2d') ?? null
  sandCtx = sandCanvasRef.value?.getContext('2d') ?? null
  if (imgCtx) loadDinoImage(imgCtx)
  fillSand()
})

function getPos(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
  if (!sandCanvasRef.value) return null
  const rect = sandCanvasRef.value.getBoundingClientRect()
  const scaleX = W / rect.width
  const scaleY = H / rect.height
  if ('touches' in e) {
    const touch = e.touches[0]
    return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY }
  }
  return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
}

function brush(e: MouseEvent | TouchEvent) {
  if (!isDrawing.value || !sandCtx || completed.value) return
  const pos = getPos(e)
  if (!pos) return

  sandCtx.globalCompositeOperation = 'destination-out'
  sandCtx.beginPath()
  sandCtx.arc(pos.x, pos.y, 30, 0, Math.PI * 2)
  sandCtx.fill()
  sandCtx.globalCompositeOperation = 'source-over'

  const imageData = sandCtx.getImageData(0, 0, W, H)
  let transparent = 0
  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) transparent++
  }
  progress.value = Math.round((transparent / (W * H)) * 100)

  if (progress.value >= 75 && !completed.value) {
    completed.value = true
    gameStore.recordGameCompletion('excavation', Math.round(progress.value))
  }
}

function startBrush(e: MouseEvent | TouchEvent) {
  isDrawing.value = true
  brush(e)
}
function stopBrush() { isDrawing.value = false }

function restart() {
  if (!imgCtx || !sandCtx) return
  dino.value = randomDino()
  imgCtx.clearRect(0, 0, W, H)
  loadDinoImage(imgCtx)
  fillSand()
  progress.value = 0
  completed.value = false
}
</script>

<template>
  <div class="max-w-lg mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-8">
      <router-link to="/games" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
    </div>

    <h1 class="text-display-md mb-4 text-center">{{ t('games.excavationGame.title') }}</h1>
    <SeoHead
      title="Fossil Excavation — Dig Up Dinosaurs"
      description="Use your brush to carefully excavate a dinosaur fossil. Reveal the skeleton hidden beneath the sand and discover which dinosaur you've uncovered."
    />
    <p class="text-body-md text-center mb-6">{{ t('games.excavationGame.description') }}</p>

    <BaseProgressBar :value="progress" :show-value="true" :label="t('games.excavationGame.progress')" color="var(--color-brand-amber)" class="mb-6" />

    <div class="relative rounded-[var(--radius-lg)] overflow-hidden border-2 border-[var(--glass-border)] bg-[#c4a87c]">
      <!-- Bottom canvas: dino image drawn here, revealed as sand is brushed away -->
      <canvas ref="imageCanvasRef" width="400" height="300" class="absolute inset-0 w-full h-full" />
      <!-- Top canvas: sand overlay, erased by brushing to reveal image below -->
      <canvas
        ref="sandCanvasRef"
        width="400"
        height="300"
        class="relative w-full h-auto touch-none cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22><circle cx=%2216%22 cy=%2216%22 r=%2214%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 opacity=%220.6%22/></svg>')_16_16,auto]"
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
      <h2 class="text-heading-md mb-2">{{ t('games.excavationGame.complete') }}</h2>
      <p class="text-body-md mb-4">{{ t('games.excavationGame.revealed', { name: translatedDino.name }) }}</p>
      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">{{ t('games.excavationGame.digAgain') }}</BaseButton>
        <BaseButton variant="ghost" to="/games">{{ t('ui.games.backToGames') }}</BaseButton>
      </div>
    </div>
  </div>
</template>
