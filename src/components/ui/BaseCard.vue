<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  as?: string
  to?: string
  clickable?: boolean
  padding?: 'compact' | 'normal' | 'spacious'
}>(), {
  as: 'div',
  padding: 'normal',
})

const tag = computed(() => {
  if (props.to) return 'router-link'
  return props.as || 'div'
})

const classes = computed(() => {
  const base = 'block rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] backdrop-blur-[var(--glass-blur)] shadow-[var(--shadow-card)] overflow-hidden'

  const padMap = {
    compact: 'p-3',
    normal: 'p-5',
    spacious: 'p-7',
  }

  const hover = (props.clickable || props.to)
    ? 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]'
    : ''

  return `${base} ${padMap[props.padding]} ${hover}`
})
</script>

<template>
  <component :is="tag" :to="to" :class="classes">
    <div v-if="$slots.media" class="mb-4 -mx-5 -mt-5">
      <slot name="media" />
    </div>
    <div v-if="$slots.header" class="mb-3">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4 pt-3 border-t border-[var(--glass-border)]">
      <slot name="footer" />
    </div>
  </component>
</template>
