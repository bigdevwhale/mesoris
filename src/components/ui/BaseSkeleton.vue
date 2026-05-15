<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  variant?: 'text' | 'circle' | 'card' | 'rect'
  count?: number
}>(), {
  variant: 'text',
  count: 1,
})

const items = computed(() => Array.from({ length: props.count }, (_, i) => i))

const classes = computed(() => {
  const base = 'animate-pulse rounded bg-[rgba(154,150,133,0.12)]'

  const variantMap: Record<string, string> = {
    text: 'h-4 w-full',
    circle: 'rounded-full',
    card: 'h-48 w-full rounded-[var(--radius-md)]',
    rect: '',
  }

  return `${base} ${variantMap[props.variant]}`
})

const style = computed(() => ({
  width: props.width || undefined,
  height: props.height || undefined,
}))
</script>

<template>
  <div
    v-for="i in items"
    :key="i"
    :class="classes"
    :style="style"
    aria-hidden="true"
  />
</template>
