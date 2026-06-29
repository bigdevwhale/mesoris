<script setup lang="ts">
import { computed, ref } from 'vue'
import { games } from '@/data/games'
import type { GameDefinition } from '@/types/game'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()

type GameCategory = 'all' | 'quiz' | 'puzzle' | 'arcade' | 'strategy' | 'sim'

const CATEGORY_MAP: Record<Exclude<GameCategory, 'all'>, (g: GameDefinition) => boolean> = {
  quiz: g => g.type === 'quiz' || g.type === 'personality' || g.type === 'dino-duel' || g.type === 'diet-detective' || g.type === 'dino-map',
  puzzle: g => g.type === 'puzzle' || g.type === 'memory' || g.type === 'excavation' || g.type === 'skeleton' || g.type === 'dino-match3',
  arcade: g => g.type === 'runner' || g.type === 'meteor-run' || g.type === 'ptero-glide' || g.type === 'predator-prey',
  strategy: g => g.type === 'battle' || g.type === 'dino-duel' || g.type === 'dino-map' || g.type === 'diet-detective',
  sim: g => g.type === 'tamagotchi',
}

const activeCategory = ref<GameCategory>('all')

function gameTitle(g: GameDefinition) {
  if (locale.value === 'hi') return g.titleHi ?? g.title
  if (locale.value === 'kk') return g.titleKk ?? g.title
  if (locale.value === 'ko') return g.titleKo
  if (locale.value === 'zh') return g.titleZh
  if (locale.value === 'ja') return g.titleJa
  if (locale.value === 'it') return g.titleIt
  if (locale.value === 'fr') return g.titleFr
  if (locale.value === 'de') return g.titleDe
  if (locale.value === 'es') return g.titleEs
  if (locale.value === 'ru') return g.titleRu
  return g.title
}
function gameDesc(g: GameDefinition) {
  if (locale.value === 'hi') return g.descriptionHi ?? g.description
  if (locale.value === 'kk') return g.descriptionKk ?? g.description
  if (locale.value === 'ko') return g.descriptionKo
  if (locale.value === 'zh') return g.descriptionZh
  if (locale.value === 'ja') return g.descriptionJa
  if (locale.value === 'it') return g.descriptionIt
  if (locale.value === 'fr') return g.descriptionFr
  if (locale.value === 'de') return g.descriptionDe
  if (locale.value === 'es') return g.descriptionEs
  if (locale.value === 'ru') return g.descriptionRu
  return g.description
}

const localizedGames = computed(() =>
  games.map(g => ({ ...g, route: localRoute(g.route) })),
)

const filteredGames = computed(() => {
  if (activeCategory.value === 'all') return localizedGames.value
  const predicate = CATEGORY_MAP[activeCategory.value]
  return localizedGames.value.filter(predicate)
})

const categories: { key: GameCategory; label: string; icon: string }[] = [
  { key: 'all', label: 'all', icon: 'layout-grid' },
  { key: 'quiz', label: 'quiz', icon: 'help-circle' },
  { key: 'puzzle', label: 'puzzle', icon: 'puzzle' },
  { key: 'arcade', label: 'arcade', icon: 'gamepad-2' },
  { key: 'strategy', label: 'strategy', icon: 'swords' },
  { key: 'sim', label: 'sim', icon: 'heart' },
]

const DIFFICULTY_STYLES: Record<'easy' | 'medium' | 'hard', string> = {
  easy: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  hard: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('games.hub.title')"
      :description="t('games.hub.description')"
    />
    <div class="mb-10 text-center sm:text-left">
      <h1 class="text-display-lg mb-3">{{ t('ui.games.title') }}</h1>
      <p class="text-body-lg max-w-2xl sm:mx-0 mx-auto">
        {{ t('ui.games.description') }}
      </p>
    </div>

    <!-- Category filter -->
    <div class="mb-6 flex flex-wrap items-center gap-2" role="tablist">
      <button
        v-for="cat in categories"
        :key="cat.key"
        type="button"
        role="tab"
        :aria-selected="activeCategory === cat.key"
        class="category-chip inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200"
        :class="activeCategory === cat.key
          ? 'is-active border-[var(--color-brand-amber)] bg-[var(--color-brand-amber)]/15 text-[var(--color-brand-amber)]'
          : 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--glass-border-hover)]'"
        @click="activeCategory = cat.key"
      >
        <BaseIcon :name="cat.icon" :size="16" />
        <span>{{ t(`games.hub.categories.${cat.label}`) }}</span>
      </button>
    </div>

    <div
      v-if="filteredGames.length"
      class="games-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      <router-link
        v-for="game in filteredGames"
        :key="game.id"
        :to="game.route"
        class="game-card group relative flex flex-col bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--glass-border-hover)]"
      >
        <div
          class="game-card__cover aspect-[4/3] bg-gradient-to-br flex items-center justify-center relative overflow-hidden"
          :class="game.colorClass"
        >
          <div class="game-card__glow absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          <BaseIcon :name="game.icon" :size="56" class="text-white/85 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          <span
            class="game-card__difficulty absolute top-3 right-3 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border backdrop-blur-sm"
            :class="DIFFICULTY_STYLES[game.difficulty]"
          >
            {{ t('games.difficulty.' + game.difficulty) }}
          </span>
        </div>
        <div class="p-5 flex flex-col gap-2 flex-1">
          <h3 class="game-card__title text-heading-md leading-snug">{{ gameTitle(game) }}</h3>
          <p class="game-card__desc text-body-sm line-clamp-3">{{ gameDesc(game) }}</p>
          <span
            class="game-card__cta mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-amber)] transition-transform duration-300 group-hover:translate-x-1"
          >
            {{ t('games.hub.play') }}
            <BaseIcon name="arrow-right" :size="14" />
          </span>
        </div>
      </router-link>
    </div>
    <div
      v-else
      class="rounded-[var(--radius-xl)] border border-dashed border-[var(--glass-border)] p-10 text-center text-body-md"
    >
      {{ t('games.hub.empty') }}
    </div>
  </div>
</template>

<style scoped>
.category-chip {
  white-space: nowrap;
}
.category-chip:focus-visible {
  outline: 2px solid var(--color-brand-amber);
  outline-offset: 2px;
}
.games-grid > .game-card {
  min-width: 0;
}
</style>
