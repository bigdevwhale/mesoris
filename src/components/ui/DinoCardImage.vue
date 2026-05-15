<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Dinosaur } from '@/types/dinosaur'

const props = withDefaults(defineProps<{
  dino: Dinosaur
  /** Aspect ratio applied to the container, e.g. '4/3' or '16/9' */
  aspectRatio?: string
  /** Set true for LCP images that should load eagerly */
  priority?: boolean
  /** Variant: 'card' for grid/card view, 'hero' for full-size display */
  variant?: 'card' | 'hero'
}>(), {
  variant: 'card',
})

const imageLoaded = ref(false)
const imageErrored = ref(false)

// ── Visual identity per era ──────────────────────────────────────────────────
type EraVisual = {
  gradient: string
  glow: string
  accentColor: string
  label: string
  dotColor: string
}

const ERA_VISUALS: Record<string, EraVisual> = {
  triassic: {
    gradient: 'linear-gradient(145deg, #1a0a2e 0%, #2d1448 45%, #1a0a2e 100%)',
    glow: 'radial-gradient(ellipse at 75% 20%, rgba(155,89,182,0.28) 0%, transparent 65%)',
    accentColor: '#a855f7',
    label: '252–201 MYA',
    dotColor: 'rgba(168,85,247,0.12)',
  },
  jurassic: {
    gradient: 'linear-gradient(145deg, #0a1f0d 0%, #173d1c 45%, #0a1f0d 100%)',
    glow: 'radial-gradient(ellipse at 75% 20%, rgba(74,124,63,0.35) 0%, transparent 65%)',
    accentColor: '#4ade80',
    label: '201–145 MYA',
    dotColor: 'rgba(74,222,128,0.1)',
  },
  cretaceous: {
    gradient: 'linear-gradient(145deg, #2d1105 0%, #3d1a0a 45%, #1a0a05 100%)',
    glow: 'radial-gradient(ellipse at 75% 20%, rgba(212,164,58,0.3) 0%, transparent 65%)',
    accentColor: '#d4a43a',
    label: '145–66 MYA',
    dotColor: 'rgba(212,164,58,0.1)',
  },
}

const EMOJI_MAP: Record<string, string> = {
  'tyrannosaurus-rex': '🦖',
  triceratops: '🛡️',
  velociraptor: '🦖',
  brachiosaurus: '🦕',
  stegosaurus: '🦕',
  spinosaurus: '🦖',
  ankylosaurus: '🦕',
  parasaurolophus: '🎺',
  diplodocus: '🦕',
  allosaurus: '🦖',
  pteranodon: '🦅',
  mosasaurus: '🌊',
}

const DIET_GLOW: Record<string, string> = {
  carnivore: 'radial-gradient(ellipse at 25% 80%, rgba(232,93,44,0.2) 0%, transparent 60%)',
  herbivore: 'radial-gradient(ellipse at 25% 80%, rgba(74,124,63,0.18) 0%, transparent 60%)',
  omnivore: 'radial-gradient(ellipse at 25% 80%, rgba(212,164,58,0.18) 0%, transparent 60%)',
}

const era = computed(() => ERA_VISUALS[props.dino.era] ?? ERA_VISUALS.cretaceous)
const emoji = computed(() => EMOJI_MAP[props.dino.id] ?? (props.dino.diet === 'carnivore' ? '🦖' : '🦕'))

const containerStyle = computed(() => ({
  aspectRatio: props.aspectRatio ?? undefined,
}))

const dotPattern = computed(() => {
  const c = era.value.dotColor
  return `radial-gradient(${c} 1.5px, transparent 1.5px)`
})

function onLoad() {
  imageLoaded.value = true
}

function onError() {
  imageErrored.value = true
}
</script>

<template>
  <div
    class="relative overflow-hidden select-none"
    :style="containerStyle"
  >
    <!-- ── Era gradient base ──────────────────────────────────── -->
    <div
      class="absolute inset-0"
      :style="{ background: era.gradient }"
    />

    <!-- Dot texture overlay -->
    <div
      class="absolute inset-0 opacity-100"
      :style="{
        backgroundImage: dotPattern,
        backgroundSize: '22px 22px',
      }"
    />

    <!-- Era glow sphere -->
    <div
      class="absolute inset-0"
      :style="{ background: era.glow }"
    />

    <!-- Diet-colored counter-glow -->
    <div
      class="absolute inset-0"
      :style="{ background: DIET_GLOW[dino.diet] ?? '' }"
    />

    <!-- ── Emoji + era label (shows while loading / on error) ── -->
    <div
      :class="[
        'absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 px-4',
        imageLoaded && !imageErrored ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ]"
    >
      <!-- Fossil ring -->
      <div
        class="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border"
        :style="{
          borderColor: `${era.accentColor}40`,
          background: `radial-gradient(circle, ${era.accentColor}18, transparent 70%)`,
          boxShadow: `0 0 24px ${era.accentColor}22`,
        }"
      >
        <span
          class="text-3xl sm:text-4xl leading-none"
          role="img"
          :aria-label="dino.name"
        >{{ emoji }}</span>
      </div>

      <!-- Era period badge -->
      <div class="text-center">
        <div
          class="text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5"
          :style="{ color: era.accentColor }"
        >
          {{ dino.era }}
        </div>
        <div class="text-[9px] text-white/30 tracking-wider">{{ era.label }}</div>
      </div>
    </div>

    <!-- Bottom gradient for text legibility -->
    <div
      class="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
      :style="{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }"
    />

    <!-- ── Real image (crossfades on top) ──────────────────── -->
    <img
      v-if="!imageErrored"
      :src="variant === 'hero' ? dino.images.hero : dino.images.card"
      :alt="dino.name"
      :loading="priority ? 'eager' : 'lazy'"
      decoding="async"
      :class="[
        'absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-700',
        imageLoaded ? 'opacity-100' : 'opacity-0',
      ]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>
