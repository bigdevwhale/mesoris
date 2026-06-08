<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  type BoardConfig,
  type CellType,
  type Player,
} from '@/logic/meteor-run-engine'
import MeteorRunCell, { type TooltipPosition } from './MeteorRunCell.vue'
import MeteorRunPawn from './MeteorRunPawn.vue'

const props = withDefaults(defineProps<{
  boardConfig: BoardConfig
  cells: CellType[]
  positions: { dino: number; meteor: number }
  lastLanded: { dino: number; meteor: number }
  activePlayer?: Player | null
  currentTurn?: Player
  isDanger?: boolean
}>(), {
  activePlayer: null,
  currentTurn: 'dino',
  isDanger: false,
})

interface CellData {
  index: number
  type: CellType
  row: number
  col: number
  isCurrent: 'dino' | 'meteor' | 'both' | null
  isLastLanded: boolean
  tooltipPosition: TooltipPosition
}

const cellsData = computed<CellData[]>(() => {
  const cfg = props.boardConfig
  const layout = cfg.layout
  const cols = cfg.cols
  const rows = cfg.rows
  const halfC = cols / 2
  const halfR = rows / 2
  const result: CellData[] = []
  for (let i = 0; i < props.cells.length; i++) {
    const pos = layout[i]
    if (!pos) continue
    const { row, col } = pos

    let isCurrent: 'dino' | 'meteor' | 'both' | null = null
    if (props.positions.dino === i && props.positions.meteor === i) isCurrent = 'both'
    else if (props.positions.dino === i) isCurrent = 'dino'
    else if (props.positions.meteor === i) isCurrent = 'meteor'

    // Pick tooltip side so the bubble doesn't get clipped by the board edge.
    // Verticals get priority because tooltips are wider than tall.
    let tooltipPosition: TooltipPosition
    if (row < halfR - 0.5) tooltipPosition = 'bottom'  // top rows → bubble below
    else if (row > halfR + 0.5) tooltipPosition = 'top'  // bottom rows → bubble above
    else if (col < halfC) tooltipPosition = 'right'    // left columns → bubble to the right
    else tooltipPosition = 'left'                       // right columns → bubble to the left

    result.push({
      index: i,
      type: props.cells[i],
      row,
      col,
      isCurrent,
      isLastLanded: props.lastLanded.dino === i || props.lastLanded.meteor === i,
      tooltipPosition,
    })
  }
  return result
})

/** Tooltip state — board-level so it doesn't blink when moving between cells. */
const tooltipIndex = ref<number | null>(null)
function showTooltip(index: number) { tooltipIndex.value = index }
function hideTooltip() { tooltipIndex.value = null }
function toggleTooltip(index: number) {
  tooltipIndex.value = tooltipIndex.value === index ? null : index
}

/** Cell size as a percentage of the board's smaller dimension. */
const cellWPct = computed(() => 100 / props.boardConfig.cols)
const cellHPct = computed(() => 100 / props.boardConfig.rows)

/** Build the SVG path that traces the spiral from cell 0 to cell N-1. */
const spiralPathD = computed(() => {
  const cfg = props.boardConfig
  const points = cfg.layout.map((pos) => ({
    x: (pos.col + 0.5) * cellWPct.value,
    y: (pos.row + 0.5) * cellHPct.value,
  }))
  if (points.length === 0) return ''
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`
  }
  return d
})
</script>

<template>
  <div
    class="relative w-full max-w-[560px] mx-auto rounded-[var(--radius-xl)]"
    :style="{ aspectRatio: `${boardConfig.cols} / ${boardConfig.rows}` }"
    role="grid"
    :aria-label="`Meteor Run board, ${boardConfig.size} tiles`"
  >
    <!-- Background layer (clipped to rounded corners) -->
    <div
      class="absolute inset-0 rounded-[var(--radius-xl)] border shadow-[var(--shadow-card)] overflow-hidden transition-colors duration-500"
      :class="isDanger
        ? 'bg-gradient-to-br from-red-950/80 via-orange-900/60 to-red-950/80 border-red-500/60 shadow-[0_0_32px_rgba(232,93,44,0.45)]'
        : 'bg-gradient-to-br from-[var(--color-bg-deep)] via-[var(--color-bg-base)] to-[var(--color-bg-deep)] border-[var(--glass-border)]'"
    >
      <!-- Decorative concentric ring guides -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="currentColor" stroke-width="0.15"
          stroke-dasharray="0.6 0.4" class="text-[var(--color-text-tertiary)]" rx="1" />
        <rect x="16" y="16" width="68" height="68" fill="none" stroke="currentColor" stroke-width="0.15"
          stroke-dasharray="0.6 0.4" class="text-[var(--color-text-tertiary)]" rx="1" />
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="0.15"
          stroke-dasharray="0.6 0.4" class="text-[var(--color-text-tertiary)]" rx="1" />
      </svg>
    </div>

    <!-- Spiral path (clipped to the rounded background) -->
    <div
      class="absolute inset-0 rounded-[var(--radius-xl)] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          :d="spiralPathD"
          fill="none"
          :stroke="isDanger ? '#fca5a5' : 'var(--color-brand-amber)'"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          :opacity="isDanger ? 0.5 : 0.3"
        />
        <path
          :d="spiralPathD"
          fill="none"
          :stroke="isDanger ? '#ef4444' : 'var(--color-brand-amber)'"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          :opacity="isDanger ? 0.9 : 0.85"
        />
      </svg>
    </div>

    <!-- Cells layer (overflow visible so tooltips can escape) -->
    <div class="absolute inset-0">
      <div
        v-for="cell in cellsData"
        :key="cell.index"
        class="absolute"
        :style="{
          top: `calc(${cell.row * cellHPct}% + 3%)`,
          left: `calc(${cell.col * cellWPct}% + 3%)`,
          width: `calc(${cellWPct}% - 6%)`,
          height: `calc(${cellHPct}% - 6%)`,
        }"
        @mouseenter="showTooltip(cell.index)"
        @mouseleave="hideTooltip"
        @click.stop="toggleTooltip(cell.index)"
      >
        <MeteorRunCell
          :type="cell.type"
          :index="cell.index"
          :is-current="cell.isCurrent"
          :is-last-landed="cell.isLastLanded"
          :show-tooltip="tooltipIndex === cell.index"
          :tooltip-position="cell.tooltipPosition"
          class="!aspect-auto h-full"
        >
          <div
            v-if="cell.isCurrent === 'dino' || cell.isCurrent === 'both'"
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <MeteorRunPawn
              player="dino"
              :is-active="activePlayer === 'dino' && currentTurn === 'dino'"
              :is-stacked="cell.isCurrent === 'both'"
              size="sm"
            />
          </div>
          <div
            v-if="cell.isCurrent === 'meteor' || cell.isCurrent === 'both'"
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <MeteorRunPawn
              player="meteor"
              :is-active="activePlayer === 'meteor' && currentTurn === 'meteor'"
              :is-stacked="cell.isCurrent === 'both'"
              size="sm"
            />
          </div>
        </MeteorRunCell>
      </div>
    </div>
  </div>
</template>
