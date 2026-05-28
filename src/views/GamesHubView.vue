<script setup lang="ts">
import { computed } from 'vue'
import { games } from '@/data/games'
import { useModeStore } from '@/stores/useModeStore'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

function gameTitle(g: typeof games[0]) {
  if (locale.value === 'kk') return g.titleKk
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
function gameDesc(g: typeof games[0]) {
  if (locale.value === 'kk') return g.descriptionKk
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
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Dinosaur Games — Play & Learn"
      description="Play educational dinosaur games: quiz, puzzle, fossil excavation, and skeleton building. Test your knowledge and have fun learning about prehistoric life."
    />
    <h1 class="text-display-lg mb-4">{{ t('ui.games.title') }}</h1>
    <p class="text-body-lg mb-10">
      {{ t('ui.games.description') }}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <router-link
        v-for="game in localizedGames"
        :key="game.id"
        :to="game.route"
        class="group bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]"
      >
        <div class="aspect-[4/3] bg-gradient-to-br flex items-center justify-center" :class="game.colorClass">
          <BaseIcon :name="game.icon" :size="64" class="text-white/80" />
        </div>
        <div class="p-5">
          <h3 class="text-heading-md mb-2">{{ gameTitle(game) }}</h3>
          <p class="text-body-sm mb-3">{{ gameDesc(game) }}</p>
          <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('games.difficulty.' + game.difficulty) }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
