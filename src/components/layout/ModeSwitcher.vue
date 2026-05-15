<script setup lang="ts">
import { computed } from 'vue'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const modeStore = useModeStore()
const icon = computed(() => modeStore.isKidsMode ? 'egg' : 'book-open')
const label = computed(() => modeStore.isKidsMode ? 'Kids' : 'Adults')
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer"
    :class="modeStore.isKidsMode
      ? 'bg-[rgba(240,192,64,0.15)] text-[var(--color-brand-amber)] border-[rgba(240,192,64,0.3)]'
      : 'bg-[rgba(154,150,133,0.08)] text-[var(--color-text-secondary)] border-[var(--glass-border)]'"
    @click="modeStore.toggleMode()"
    :aria-label="`Switch to ${modeStore.isKidsMode ? 'Adults' : 'Kids'} mode`"
  >
    <BaseIcon :name="icon" :size="16" />
    <span class="hidden sm:inline">{{ label }}</span>
  </button>
</template>
