<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
</script>

<template>
  <footer class="bg-[var(--color-bg-deep)] border-t border-[var(--glass-border)] mt-24">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <router-link :to="localRoute({ name: 'home' })" class="flex items-center gap-2 text-[var(--color-text-primary)] mb-3">
            <span class="text-2xl">🦖</span>
            <span class="text-lg font-bold" style="font-family: var(--font-heading)">Mesoris</span>
          </router-link>
          <p class="text-body-sm">{{ t('ui.footer.tagline') }}</p>
        </div>

        <!-- Explore -->
        <div>
          <h4 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3">{{ t('ui.nav.encyclopedia') }}</h4>
          <nav class="flex flex-col gap-2">
            <router-link :to="localRoute({ name: 'encyclopedia' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('ui.footer.encyclopedia') }}</router-link>
            <router-link :to="localRoute({ name: 'timeline' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('ui.footer.timeline') }}</router-link>
            <router-link :to="localRoute({ name: 'compare' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('ui.footer.compare') }}</router-link>
          </nav>
        </div>

        <!-- Play -->
        <div>
          <h4 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3">{{ t('ui.footer.play') }}</h4>
          <nav class="flex flex-col gap-2">
            <router-link :to="localRoute({ name: 'quiz' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('games.quiz') }}</router-link>
            <router-link :to="localRoute({ name: 'puzzle' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('games.puzzle') }}</router-link>
            <router-link :to="localRoute({ name: 'excavation' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('games.excavation') }}</router-link>
            <router-link :to="localRoute({ name: 'excavation' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('games.skeleton') }}</router-link>
          </nav>
        </div>

        <!-- Learn -->
        <div>
          <h4 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3">{{ t('ui.footer.learn') }}</h4>
          <nav class="flex flex-col gap-2">
            <router-link :to="localRoute({ name: 'science' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('ui.footer.scienceCenter') }}</router-link>
            <router-link :to="localRoute({ name: 'about' })" class="text-body-sm hover:text-[var(--color-brand-amber)] transition-colors">{{ t('ui.footer.about') }}</router-link>
          </nav>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-body-sm">{{ t('ui.footer.copyright', { year: new Date().getFullYear() }) }}</p>
        <div class="flex items-center gap-4">
          <a href="#" class="text-[var(--color-text-tertiary)] hover:text-[var(--color-brand-amber)] transition-colors" aria-label="GitHub">
            <BaseIcon name="github" :size="18" />
          </a>
          <a href="#" class="text-[var(--color-text-tertiary)] hover:text-[var(--color-brand-amber)] transition-colors" aria-label="Twitter">
            <BaseIcon name="twitter" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
