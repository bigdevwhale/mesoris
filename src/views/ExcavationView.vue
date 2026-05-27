<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/useGameStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { useLocale } from '@/composables/useLocale'
import { useI18n } from 'vue-i18n'
import { useRecentDinos } from '@/composables/useRecentDinos'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import DinoDetailModal from '@/components/encyclopedia/DinoDetailModal.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()
const { translateDino } = useDinoTranslator()
const { pickRandomDino } = useRecentDinos()
const router = useRouter()

const dino = ref(pickRandomDino())
const translatedDino = computed(() => translateDino(dino.value))
const showDinoModal = ref(false)

function openDinoCard() { showDinoModal.value = true }
function onAddToCompare(id: string) {
  showDinoModal.value = false
  router.push(localRoute({ name: 'compare', query: { a: id } }))
}

// Era and diet translated via encyclopedia i18n keys
const eraLabel = computed(() => t(`ui.encyclopedia.${translatedDino.value.era}`))
const dietLabel = computed(() => t(`ui.encyclopedia.${translatedDino.value.diet}`))

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
  if (!isDrawing.value || !sandCtx) return
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
  dino.value = pickRandomDino()
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
      <router-link :to="localRoute({ name: 'games' })" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
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
      <canvas ref="imageCanvasRef" width="400" height="300" class="absolute inset-0 w-full h-full" />
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

    <!-- After 75%+ revealed: dino info card -->
    <div v-if="completed" class="mt-8 space-y-6">
      <div class="text-center">
        <div class="text-4xl mb-3 animate-celebration-pop">{{ progress >= 90 ? '🦴' : '⛏️' }}</div>
        <h2 class="text-heading-md mb-1">{{ t('games.excavationGame.complete') }}</h2>
        <p class="text-body-md">{{ t('games.excavationGame.revealed', { name: translatedDino.name }) }}</p>
        <p v-if="progress < 90" class="text-sm text-[var(--color-text-tertiary)] mt-1">{{ t('games.excavationGame.keepBrushing') }}</p>
      </div>

      <!-- Dino info summary card -->
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
          <h3 class="text-heading-md mb-4">{{ t('games.excavationGame.aboutDino') }}</h3>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('games.excavationGame.era') }}</span>
              <span class="text-sm font-semibold text-[var(--color-text-primary)]">{{ eraLabel }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('games.excavationGame.diet') }}</span>
              <span class="text-sm font-semibold text-[var(--color-text-primary)]">{{ dietLabel }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('ui.compare.lengthLabel') }}</span>
              <span class="text-sm font-semibold text-[var(--color-text-primary)]">{{ translatedDino.dimensions.lengthMeters }} {{ t('ui.compare.metersUnit') }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('ui.compare.weightLabel') }}</span>
              <span class="text-sm font-semibold text-[var(--color-text-primary)]">{{ translatedDino.dimensions.weightKg.toLocaleString(locale === 'ko' ? 'ko-KR' : locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'it' ? 'it-IT' : locale === 'fr' ? 'fr-FR' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : locale === 'ru' ? 'ru-RU' : 'en-US') }} {{ t('ui.compare.kgUnit') }}</span>
            </div>
          </div>

          <div class="bg-[rgba(212,164,58,0.08)] border border-[rgba(212,164,58,0.15)] rounded-[var(--radius-md)] p-3 mb-4">
            <span class="text-xs font-semibold text-[var(--color-brand-amber)]">{{ t('games.excavationGame.funFact') }}</span>
            <p class="text-sm text-[var(--color-text-primary)] mt-1">{{ translatedDino.description }}</p>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" @click="restart">{{ t('games.excavationGame.digAgain') }}</BaseButton>
            <BaseButton variant="ghost" @click="openDinoCard">{{ t('games.excavationGame.openCard') }}</BaseButton>
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
