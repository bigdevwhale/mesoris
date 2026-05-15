<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  max?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
}>(), {
  max: 100,
  color: 'var(--color-brand-amber)',
  size: 'md',
})

const pct = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))

const heightMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
</script>

<template>
  <div class="w-full">
    <div v-if="label || showValue" class="flex justify-between items-center mb-1.5">
      <span v-if="label" class="text-body-sm">{{ label }}</span>
      <span v-if="showValue" class="text-body-sm font-semibold text-[var(--color-brand-amber)]">
        {{ Math.round(pct) }}%
      </span>
    </div>
    <div :class="[heightMap[size], 'w-full rounded-full bg-[rgba(154,150,133,0.12)] overflow-hidden']">
      <div
        :class="[heightMap[size], 'rounded-full transition-all duration-700 ease-out']"
        :style="{ width: `${pct}%`, backgroundColor: color }"
      />
    </div>
  </div>
</template>
