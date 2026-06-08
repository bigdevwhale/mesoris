<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CellType } from '@/logic/meteor-run-engine'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(defineProps<{
  type: CellType
  index: number
  isCurrent?: 'dino' | 'meteor' | 'both' | null
  isLastLanded?: boolean
  isLastFrom?: boolean
  showTooltip?: boolean
  tooltipPosition?: TooltipPosition
}>(), {
  isCurrent: null,
  isLastLanded: false,
  isLastFrom: false,
  showTooltip: false,
  tooltipPosition: 'top',
})

const { t } = useI18n()

const cellEmoji: Record<CellType, string> = {
  start: '',
  finish: '',
  normal: '',
  boost_small: '⭐',
  boost_big: '🌟',
  penalty: '🌋',
  skip_turn: '🪨',
  teleport_fwd: '🌀',
  extra_dice: '🎲',
  double_move: '⚡',
  pit: '🕳️',
  safe_zone: '🛡️',
}

const cellClasses = computed(() => {
  const map: Record<CellType, string> = {
    start: 'bg-emerald-500/25 border-emerald-400/70',
    finish: 'bg-amber-400/40 border-amber-400/90 animate-pulse-amber',
    normal: 'bg-[var(--color-bg-elevated)] border-[var(--color-text-tertiary)]/40',
    boost_small: 'bg-amber-500/20 border-amber-400/60',
    boost_big: 'bg-amber-400/30 border-amber-300/80 animate-shimmer',
    penalty: 'bg-red-500/20 border-red-400/60',
    skip_turn: 'bg-stone-500/30 border-stone-400/60',
    teleport_fwd: 'bg-violet-500/25 border-violet-400/70 animate-float-slow',
    extra_dice: 'bg-emerald-500/20 border-emerald-400/60',
    double_move: 'bg-yellow-400/25 border-yellow-300/70',
    pit: 'bg-stone-900/70 border-stone-700/80',
    safe_zone: 'bg-sky-500/25 border-sky-400/70',
  }
  const base = `${map[props.type]} border-2 shadow-sm shadow-black/30`

  if (props.isLastLanded) {
    return `${base} ring-2 ring-cyan-300/80 animate-celebration-pop z-10`
  }
  if (props.isCurrent === 'both') {
    return `${base} ring-2 ring-amber-300 shadow-[0_0_18px_rgba(212,164,58,0.55)] z-10`
  }
  if (props.isCurrent) {
    return `${base} ring-2 ring-amber-300 shadow-[0_0_18px_rgba(212,164,58,0.55)] z-10`
  }
  return base
})

const tooltipText = computed(() => {
  if (props.type === 'normal') return null
  return t(`games.meteorRun.effects.${props.type}`)
})

/**
 * Tooltip wrapper classes per position. Each variant places the bubble on a
 * different side of the cell so it never gets clipped by the board edge.
 * The arrow is a small rotated square (border-r + border-b + rotate-45).
 */
const tooltipWrapClass = computed(() => {
  switch (props.tooltipPosition) {
    case 'bottom':
      return 'left-1/2 top-full mt-1.5 -translate-x-1/2'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-1.5'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-1.5'
    case 'top':
    default:
      return 'left-1/2 bottom-full mb-1.5 -translate-x-1/2'
  }
})

const tooltipArrowClass = computed(() => {
  switch (props.tooltipPosition) {
    case 'bottom':
      // Arrow points up at the cell above the bubble
      return 'left-1/2 bottom-full mb-[-5px] -translate-x-1/2 rotate-45 border-l border-t'
    case 'left':
      // Arrow points right at the cell on the right
      return 'right-[-5px] top-1/2 -translate-y-1/2 rotate-45 border-t border-r'
    case 'right':
      // Arrow points left at the cell on the left
      return 'left-[-5px] top-1/2 -translate-y-1/2 -rotate-45 border-b border-l'
    case 'top':
    default:
      // Arrow points down at the cell below
      return 'left-1/2 top-full -mt-px -translate-x-1/2 rotate-45 border-r border-b'
  }
})
</script>

<template>
  <div class="relative aspect-square cursor-help" :aria-label="`Cell ${index + 1}, ${type}`">
    <div
      class="relative w-full h-full rounded-[var(--radius-md)] flex flex-col items-center justify-center gap-0.5 select-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      :class="cellClasses"
    >
      <!-- Number badge — sits in the flex column above the emoji -->
      <span
        class="text-[9px] sm:text-[10px] font-bold opacity-70 leading-none"
        :class="type === 'pit' || type === 'finish' ? 'text-white/80' : 'text-[var(--color-text-secondary)]'"
      >
        {{ index + 1 }}
      </span>

      <!-- Emoji / symbol -->
      <span
        v-if="cellEmoji[type]"
        class="text-base sm:text-xl md:text-2xl leading-none"
      >
        {{ cellEmoji[type] }}
      </span>

      <!-- Slot for pawns (rendered by parent board) -->
      <slot />
    </div>

    <!-- Tooltip (hover or click) — flips position to avoid clipping -->
    <Transition
      enter-active-class="transition-all duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showTooltip && tooltipText"
        class="pointer-events-none absolute z-40 w-max max-w-[180px] sm:max-w-[220px]"
        :class="tooltipWrapClass"
      >
        <div
          class="rounded-md bg-[var(--color-bg-deep)]/95 border border-[var(--glass-border-hover)] px-2 py-1.5 text-[11px] sm:text-xs text-[var(--color-text-primary)] text-center leading-tight shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        >
          {{ tooltipText }}
        </div>
        <!-- Arrow pointing at the cell -->
        <div
          class="absolute w-2 h-2 bg-[var(--color-bg-deep)]/95 border-[var(--glass-border-hover)]"
          :class="tooltipArrowClass"
        />
      </div>
    </Transition>
  </div>
</template>
