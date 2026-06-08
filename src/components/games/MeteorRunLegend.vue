<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CellType } from '@/logic/meteor-run-engine'

const { t } = useI18n()

interface LegendItem {
  type: CellType
  emoji: string
  swatchClass: string
}

const items: LegendItem[] = [
  { type: 'start',       emoji: '🦖', swatchClass: 'bg-emerald-500/30 border-emerald-500/60' },
  { type: 'boost_small', emoji: '⭐', swatchClass: 'bg-amber-500/30 border-amber-500/60' },
  { type: 'boost_big',   emoji: '🌟', swatchClass: 'bg-amber-400/40 border-amber-400/70' },
  { type: 'penalty',     emoji: '🌋', swatchClass: 'bg-red-500/30 border-red-500/60' },
  { type: 'skip_turn',   emoji: '🪨', swatchClass: 'bg-stone-500/40 border-stone-500/60' },
  { type: 'teleport_fwd',emoji: '🌀', swatchClass: 'bg-violet-500/30 border-violet-500/60' },
  { type: 'extra_dice',  emoji: '🎲', swatchClass: 'bg-emerald-500/30 border-emerald-500/60' },
  { type: 'double_move', emoji: '⚡', swatchClass: 'bg-yellow-400/40 border-yellow-400/70' },
  { type: 'pit',         emoji: '🕳️', swatchClass: 'bg-stone-900/70 border-stone-700/70' },
  { type: 'safe_zone',   emoji: '🛡️', swatchClass: 'bg-sky-500/30 border-sky-500/60' },
  { type: 'finish',      emoji: '🏁', swatchClass: 'bg-amber-400/40 border-amber-400/80' },
]
</script>

<template>
  <aside
    class="p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]"
    :aria-label="t('games.meteorRun.title') + ' — legend'"
  >
    <h3 class="text-label text-[var(--color-text-tertiary)] flex items-center gap-1.5 pb-2">
      <span>📜</span>
      <span>{{ t('games.meteorRun.legend') }}</span>
    </h3>

    <ul class="grid grid-cols-1 gap-1.5">
      <li
        v-for="item in items"
        :key="item.type"
        class="flex items-center gap-2 text-xs"
      >
        <span
          class="w-6 h-6 flex items-center justify-center rounded-md border text-sm leading-none flex-shrink-0"
          :class="item.swatchClass"
        >
          {{ item.emoji }}
        </span>
        <span class="flex-1 min-w-0 text-[var(--color-text-secondary)] leading-tight">
          {{ t(`games.meteorRun.effects.${item.type}`) }}
        </span>
      </li>
    </ul>
  </aside>
</template>
