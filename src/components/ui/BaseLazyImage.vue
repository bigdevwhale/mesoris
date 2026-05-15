<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  /** Omit to let the parent control dimensions via class/style */
  aspectRatio?: string
  sizes?: string
  srcset?: string
  priority?: boolean
  fallbackSrc?: string
  placeholderSrc?: string
}>(), {
  fallbackSrc: '/images/ui/placeholder.svg',
  placeholderSrc: '/images/ui/placeholder.svg',
})

const loaded = ref(false)
const errored = ref(false)
const currentSrc = ref(props.src)

watch(
  () => props.src,
  (src) => {
    currentSrc.value = src
    loaded.value = false
    errored.value = false
  }
)

const loading = computed(() => props.priority ? 'eager' : 'lazy')

const rootStyle = computed(() => {
  if (props.aspectRatio) return { aspectRatio: props.aspectRatio }
  return {}
})

function onLoad() {
  loaded.value = true
}

function onError() {
  if (currentSrc.value !== props.fallbackSrc) {
    currentSrc.value = props.fallbackSrc
    errored.value = false
    return
  }
  errored.value = true
}
</script>

<template>
  <div class="relative overflow-hidden bg-[var(--color-bg-overlay)]" :style="rootStyle">
    <!-- Shimmer skeleton while loading -->
    <div
      v-if="!loaded && !errored"
      class="absolute inset-0 animate-shimmer"
    />
    <!-- Blurred placeholder shown until main image loads -->
    <img
      v-if="placeholderSrc && !loaded && !errored"
      :src="placeholderSrc"
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover blur-2xl scale-110 opacity-30"
      loading="eager"
      decoding="async"
      alt=""
    />
    <img
      v-if="!errored"
      :src="currentSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      :srcset="srcset"
      :loading="loading"
      decoding="async"
      :class="['absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0']"
      @load="onLoad"
      @error="onError"
    />
    <!-- Error fallback -->
    <div
      v-if="errored"
      class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--color-text-tertiary)]"
    >
      <svg class="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span class="text-xs">Image not available</span>
    </div>
  </div>
</template>
