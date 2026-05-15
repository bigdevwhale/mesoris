<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(defineProps<{
  variant?: 'era' | 'diet' | 'size' | 'default' | 'success'
  size?: 'sm' | 'md'
  icon?: string
  colorClass?: string
}>(), {
  variant: 'default',
  size: 'sm',
})

const classes = computed(() => {
  const base = 'inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap'

  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  const variantMap: Record<string, string> = {
    era: 'bg-[rgba(212,164,58,0.15)] text-[var(--color-brand-amber)] border border-[rgba(212,164,58,0.25)]',
    diet: 'bg-[rgba(74,124,63,0.15)] text-[var(--color-brand-moss)] border border-[rgba(74,124,63,0.25)]',
    size: 'bg-[rgba(139,58,42,0.15)] text-[var(--color-brand-lava)] border border-[rgba(139,58,42,0.25)]',
    success: 'bg-[rgba(61,140,64,0.15)] text-[var(--color-success)] border border-[rgba(61,140,64,0.25)]',
    default: 'bg-[rgba(154,150,133,0.12)] text-[var(--color-text-secondary)] border border-[rgba(154,150,133,0.18)]',
  }

  return `${base} ${sizeMap[props.size]} ${props.colorClass || variantMap[props.variant]}`
})
</script>

<template>
  <span :class="classes">
    <BaseIcon v-if="icon" :name="icon" :size="size === 'sm' ? 12 : 14" />
    <slot />
  </span>
</template>
