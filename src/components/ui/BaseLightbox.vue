<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(defineProps<{
  isOpen: boolean
  images: string[]
  initialIndex?: number
}>(), {
  initialIndex: 0,
})

const emit = defineEmits<{ close: [] }>()

const currentIndex = ref(props.initialIndex)

watch(() => props.initialIndex, (val) => {
  currentIndex.value = val
})

watch(() => props.isOpen, (val) => {
  if (val) {
    currentIndex.value = props.initialIndex
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function goTo(index: number) {
  if (index >= 0 && index < props.images.length) {
    currentIndex.value = index
  }
}

function prev() {
  goTo(currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1)
}

function next() {
  goTo(currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return }
  if (e.key === 'ArrowLeft') { prev(); return }
  if (e.key === 'ArrowRight') { next(); return }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          @click="emit('close')"
          aria-label="Close lightbox"
        >
          <BaseIcon name="x" :size="24" />
        </button>

        <!-- Counter -->
        <div class="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/50 text-white/80 text-sm font-medium">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <!-- Prev button -->
        <button
          v-if="images.length > 1"
          class="absolute left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          @click.stop="prev"
          aria-label="Previous image"
        >
          <BaseIcon name="chevron-left" :size="28" />
        </button>

        <!-- Image -->
        <div class="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
          <img
            :src="images[currentIndex]"
            :alt="`Image ${currentIndex + 1}`"
            class="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>

        <!-- Next button -->
        <button
          v-if="images.length > 1"
          class="absolute right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          @click.stop="next"
          aria-label="Next image"
        >
          <BaseIcon name="chevron-right" :size="28" />
        </button>

        <!-- Thumbnail strip -->
        <div
          v-if="images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        >
          <button
            v-for="(img, i) in images"
            :key="img"
            class="w-14 h-10 rounded-md overflow-hidden border-2 transition-all flex-shrink-0"
            :class="i === currentIndex ? 'border-white' : 'border-white/30 hover:border-white/60 opacity-60 hover:opacity-100'"
            @click.stop="goTo(i)"
          >
            <img :src="img" class="w-full h-full object-cover" :alt="`Thumbnail ${i + 1}`" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
