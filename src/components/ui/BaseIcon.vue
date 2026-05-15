<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  strokeWidth?: number | string
}>(), {
  size: 20,
  strokeWidth: 2,
})

const iconComponent = computed(() => {
  const iconMap = LucideIcons as Record<string, any>
  const pascalName = props.name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
  return iconMap[pascalName] ?? iconMap['HelpCircle'] ?? null
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>
