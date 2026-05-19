<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useUiStore } from '@/stores/useUiStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import MainNav from './MainNav.vue'
import MobileNav from './MobileNav.vue'
import ModeSwitcher from './ModeSwitcher.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const uiStore = useUiStore()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-30 bg-[var(--color-bg-deep)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
      <!-- Logo -->
      <router-link :to="localRoute({ name: 'home' })" class="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-brand-amber)] transition-colors shrink-0">
        <span class="text-2xl">🦖</span>
        <span class="text-lg font-bold hidden sm:inline" style="font-family: var(--font-heading)">Dinosaurs</span>
      </router-link>

      <!-- Desktop Nav -->
      <MainNav />

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.08)] transition-colors"
          @click="uiStore.openSearch()"
          :aria-label="t('ui.header.search')"
        >
          <BaseIcon name="search" :size="18" />
        </button>

        <LanguageSwitcher />
        <ModeSwitcher />

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          @click="uiStore.toggleMobileNav()"
          :aria-label="uiStore.isMobileNavOpen ? t('ui.header.closeMenu') : t('ui.header.openMenu')"
        >
          <BaseIcon :name="uiStore.isMobileNavOpen ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
  </header>

  <MobileNav :is-open="uiStore.isMobileNavOpen" @close="uiStore.closeMobileNav()" />
</template>
