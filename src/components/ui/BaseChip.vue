<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

defineProps<{
  label: string
  selected?: boolean
  disabled?: boolean
  icon?: string
}>()

const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
      selected
        ? 'bg-[var(--color-brand-amber)] text-black border-[var(--color-brand-amber)] shadow-[0_0_12px_rgba(212,164,58,0.3)]'
        : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--glass-border)] hover:border-[var(--color-brand-amber)] hover:text-[var(--color-text-primary)]',
      disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="emit('toggle')"
  >
    <BaseIcon v-if="icon" :name="icon" :size="14" />
    {{ label }}
  </button>
</template>
