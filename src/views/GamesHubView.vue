<script setup lang="ts">
import { games } from '@/data/games'
import { useModeStore } from '@/stores/useModeStore'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const modeStore = useModeStore()
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
        v-for="game in games"
        :key="game.id"
        :to="game.route"
        class="group bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]"
      >
        <div class="aspect-[4/3] bg-gradient-to-br flex items-center justify-center" :class="game.colorClass">
          <BaseIcon :name="game.icon" :size="64" class="text-white/80" />
        </div>
        <div class="p-5">
          <h3 class="text-heading-md mb-2">{{ locale === 'ru' ? game.titleRu : game.title }}</h3>
          <p class="text-body-sm mb-3">{{ locale === 'ru' ? game.descriptionRu : game.description }}</p>
          <span class="text-xs text-[var(--color-text-tertiary)]">{{ t('games.difficulty.' + game.difficulty) }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
