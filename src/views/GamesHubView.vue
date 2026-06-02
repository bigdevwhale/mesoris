<script setup lang="ts">
import { computed, ref } from 'vue'
import { games } from '@/data/games'
import { useModeStore } from '@/stores/useModeStore'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function onScroll() {
  const el = scrollContainer.value
  if (!el) return
  const children = Array.from(el.children) as HTMLElement[]
  const scrollMid = el.scrollLeft + 16
  let closest = 0
  let minDist = Infinity
  children.forEach((child, i) => {
    const dist = Math.abs(child.offsetLeft - scrollMid)
    if (dist < minDist) { minDist = dist; closest = i }
  })
  activeIndex.value = closest
}

function scrollTo(index: number) {
  const el = scrollContainer.value
  if (!el) return
  const card = el.children[index] as HTMLElement | null
  if (!card) return
  el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
}

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
      :title="t('games.hub.title')"
      :description="t('games.hub.description')"
    />
    <h1 class="text-display-lg mb-4">{{ t('ui.games.title') }}</h1>
    <p class="text-body-lg mb-10">
      {{ t('ui.games.description') }}
    </p>

    <div
      ref="scrollContainer"
      class="games-scroll -mx-4 flex gap-4 overflow-x-auto scroll-pl-4 snap-x snap-mandatory px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
      @scroll.passive="onScroll"
    >
      <router-link
        v-for="game in localizedGames"
        :key="game.id"
        :to="game.route"
        class="group flex-none w-[75vw] snap-start bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] sm:w-auto"
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

    <!-- Mobile pagination dots -->
    <div class="flex justify-center items-center gap-2 mt-4 sm:hidden">
      <button
        v-for="(game, i) in localizedGames"
        :key="game.id"
        class="h-2 rounded-full transition-all duration-300"
        :class="activeIndex === i
          ? 'w-5 bg-[var(--color-brand-amber)]'
          : 'w-2 bg-[var(--color-text-tertiary)]'"
        :aria-label="gameTitle(game)"
        @click="scrollTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.games-scroll::-webkit-scrollbar {
  display: none;
}
.games-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
