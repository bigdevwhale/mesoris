<script setup lang="ts">
import { computed } from 'vue'
import type { Player } from '@/logic/meteor-run-engine'

const props = withDefaults(defineProps<{
  player: Player
  isActive?: boolean
  isStacked?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  isActive: false,
  isStacked: false,
  size: 'md',
})

const sizeClasses = computed(() => {
  const map = {
    sm: 'w-7 h-7 text-base',
    md: 'w-9 h-9 text-2xl',
    lg: 'w-12 h-12 text-3xl',
  }
  return map[props.size]
})

const gradient = computed(() => {
  if (props.player === 'dino') {
    return 'from-emerald-400 to-emerald-700'
  }
  return 'from-orange-400 to-red-700'
})

const stackOffset = computed(() =>
  props.isStacked ? (props.player === 'meteor' ? '-translate-y-3 translate-x-2' : '-translate-y-1 -translate-x-1') : '',
)
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 transition-all duration-300"
    :class="[
      sizeClasses,
      `bg-gradient-to-br ${gradient}`,
      stackOffset,
      isActive ? 'ring-2 ring-amber-300 animate-pulse-amber scale-110' : '',
    ]"
    :aria-label="player === 'dino' ? 'Dinosaur pawn' : 'Meteor pawn'"
  >
    <span class="leading-none drop-shadow-md">
      {{ player === 'dino' ? '🦖' : '☄️' }}
    </span>
  </div>
</template>
