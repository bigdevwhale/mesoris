<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  text: string
  position?: 'top' | 'bottom'
}>(), {
  position: 'top',
})

const show = ref(false)
</script>

<template>
  <div class="relative inline-flex" @mouseenter="show = true" @mouseleave="show = false" @focusin="show = true" @focusout="show = false">
    <div>
      <slot />
    </div>
    <Transition name="tt-fade">
      <div
        v-if="show"
        class="absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)] border border-[var(--glass-border)] shadow-[var(--shadow-card)] whitespace-nowrap pointer-events-none"
        :class="position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-1/2 -translate-x-1/2 mt-2'"
      >
        {{ text }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tt-fade-enter-active, .tt-fade-leave-active { transition: opacity 0.15s; }
.tt-fade-enter-from, .tt-fade-leave-to { opacity: 0; }
</style>
