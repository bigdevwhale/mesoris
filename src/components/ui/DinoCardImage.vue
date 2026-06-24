<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Dinosaur } from '@/types/dinosaur'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useAutoplayGate } from '@/composables/useAutoplayGate'

const { t } = useI18n()
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
/** Whether the lightweight animated GIF preview has finished loading. */
const gifLoaded = ref(false)

// ── Video state ────────────────────────────────────────────────────────────
const rootEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const videoLoaded = ref(false)
const videoErrored = ref(false)
const isInViewport = ref(false)
/** Sound is off by default — browsers require a user gesture for unmuted playback. */
const isMuted = ref(true)

// Touch devices get autoplay-on-mount; desktop needs a user gesture on the
// page before autoplay is permitted. Both are gated by viewport visibility.
const isTouchDevice: boolean =
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

const { hasInteracted } = useAutoplayGate()

const hasVideo = computed(() => Boolean(props.dino.images?.video))
const videoSrc = computed(() => props.dino.images?.video)
const hasGif = computed(() => Boolean(props.dino.images?.previewGif))
const gifSrc = computed(() => props.dino.images?.previewGif)

/**
 * In the card variant (grid / FeaturedSpecimen) prefer a lightweight looping
 * GIF over the heavier MP4 — GIFs are ~500 KB vs ~10 MB and don't require
 * autoplay permission, so they animate immediately even on cold load. The
 * hero variant (detail modal) always uses the full-quality video so the
 * user gets the smooth, high-FPS playback with optional sound.
 *
 * If the GIF is missing (e.g. older entry) the card falls back to the MP4.
 */
const useGif = computed(
  () => props.variant !== 'hero' && hasGif.value && hasVideo.value,
)

/** Whether autoplay is allowed in the current environment. */
const canAutoplay = computed(() => isTouchDevice || hasInteracted.value)

/** Whether the video should currently be playing. */
const shouldPlay = computed(() => {
  if (!hasVideo.value || videoErrored.value) return false
  if (!isInViewport.value) return false
  return canAutoplay.value
})

/** Whether the <video> element should be mounted at all. */
const showVideo = computed(
  () => hasVideo.value && !videoErrored.value && !useGif.value,
)

/** Whether the mute-toggle button overlay should be visible. */
const showMuteButton = computed(() => {
  if (!showVideo.value) return false
  // On touch there's no hover — always show so the user can find the control.
  if (isTouchDevice) return true
  // On desktop: show when the card is visible and playing, or persistently
  // once the user has unmuted.
  return (isInViewport.value && shouldPlay.value) || !isMuted.value
})

/** i18n key for the button's aria-label / title. */
const muteButtonTitle = computed(() =>
  isMuted.value ? 'ui.encyclopedia.videoUnmute' : 'ui.encyclopedia.videoMute',
)

// ── IntersectionObserver: only play videos in the viewport ────────────────
let io: IntersectionObserver | null = null
const VIEWPORT_THRESHOLD = 0.5

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: assume always visible. Better to play than to never play.
    isInViewport.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isInViewport.value = entry.intersectionRatio >= VIEWPORT_THRESHOLD
      }
    },
    { threshold: [0, VIEWPORT_THRESHOLD, 1] },
  )
  if (rootEl.value) io.observe(rootEl.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
  // Make sure no media is left playing after the component is gone.
  if (videoEl.value) {
    videoEl.value.pause()
    videoEl.value.src = ''
  }
})

function onVideoLoaded() {
  videoLoaded.value = true
  syncPlayback()
}

function onVideoError() {
  videoErrored.value = true
}

async function syncPlayback() {
  const el = videoEl.value
  if (!el) return
  try {
    if (shouldPlay.value) {
      // Muted autoplay may still be blocked briefly — catch the rejection.
      await el.play()
    } else {
      el.pause()
    }
  } catch {
    // Autoplay blocked or play() interrupted — fall back to paused state.
  }
}

/** Toggle the sound on/off. Must be triggered by a user click/tap. */
async function toggleMuted() {
  isMuted.value = !isMuted.value
  // Mirror onto the actual <video> element. The `muted` attribute already
  // reflects isMuted via :muted binding, but setting it imperatively here
  // guarantees the iOS Safari quirk is handled.
  if (videoEl.value) {
    videoEl.value.muted = isMuted.value
  }
  // Unmuting is always a fresh user gesture — make sure the video is playing
  // so the user can actually hear the change.
  if (!isMuted.value && shouldPlay.value && videoEl.value) {
    try {
      await videoEl.value.play()
    } catch {
      /* ignored — browser may still block; UI is consistent regardless */
    }
  }
}

// React to changes in shouldPlay and to global autoplay-gate state.
watch(shouldPlay, () => syncPlayback())
watch(hasInteracted, () => syncPlayback())
watch(() => props.dino.id, () => {
  videoLoaded.value = false
  videoErrored.value = false
  gifLoaded.value = false
  // New dino → always start muted (a user gesture is required to unmute anyway).
  isMuted.value = true
  // Wait a tick for the new <video src> to bind before syncing.
  syncPlayback()
})

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

function onGifLoad() {
  gifLoaded.value = true
}

/** GIF failed — fall back to the still image (don't kill the card). */
function onGifError() {
  gifLoaded.value = false
}
</script>

<template>
  <div
    ref="rootEl"
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
        class="rounded-full flex items-center justify-center border"
        :class="variant === 'hero' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16 sm:w-20 sm:h-20'"
        :style="{
          borderColor: `${era.accentColor}40`,
          background: `radial-gradient(circle, ${era.accentColor}18, transparent 70%)`,
          boxShadow: `0 0 24px ${era.accentColor}22`,
        }"
      >
        <span
          class="leading-none"
          :class="variant === 'hero' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'"
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
          {{ t(`ui.encyclopedia.${dino.era}`) }}
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
        // Hide the still once the video OR the GIF has loaded.
        (showVideo && videoLoaded) || gifLoaded ? 'opacity-0' : (imageLoaded ? 'opacity-100' : 'opacity-0'),
      ]"
      @load="onLoad"
      @error="onError"
    />

    <!-- ── Lightweight animated GIF preview (cards only) ────── -->
    <img
      v-if="useGif"
      :src="gifSrc"
      :alt="''"
      aria-hidden="true"
      :loading="priority ? 'eager' : 'lazy'"
      decoding="async"
      :class="[
        'absolute inset-0 z-20 w-full h-full object-cover transition-opacity duration-700',
        gifLoaded ? 'opacity-100' : 'opacity-0',
      ]"
      @load="onGifLoad"
      @error="onGifError"
    />

    <!-- ── Looping muted video (sits above the still) ───────── -->
    <video
      v-if="showVideo"
      ref="videoEl"
      :src="videoSrc"
      :muted="isMuted"
      loop
      playsinline
      :preload="isTouchDevice || hasInteracted ? 'metadata' : 'none'"
      :poster="variant === 'hero' ? dino.images.hero : dino.images.card"
      aria-hidden="true"
      :class="[
        'absolute inset-0 z-20 w-full h-full object-cover transition-opacity duration-700',
        videoLoaded ? 'opacity-100' : 'opacity-0',
      ]"
      @loadeddata="onVideoLoaded"
      @error="onVideoError"
    />

    <!-- ── Mute / unmute toggle (overlay, video only) ───────── -->
    <button
      v-if="showVideo"
      type="button"
      :aria-label="t(muteButtonTitle)"
      :title="t(muteButtonTitle)"
      :aria-pressed="!isMuted"
      class="absolute bottom-2 right-2 z-30 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/75 text-white shadow-lg backdrop-blur-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-amber)]"
      :class="showMuteButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      @click.stop="toggleMuted"
    >
      <BaseIcon :name="isMuted ? 'volume-x' : 'volume-2'" :size="18" />
    </button>
  </div>
</template>
