<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useUiStore } from '@/stores/useUiStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import MainNav from './MainNav.vue'
import MobileNav from './MobileNav.vue'
import BottomNav from './BottomNav.vue'
import ModeSwitcher from './ModeSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const uiStore = useUiStore()

const supportOpen = ref(false)
const supportRef = ref<HTMLElement | null>(null)

function onDocClick(e: MouseEvent) {
  if (!supportRef.value) return
  if (!supportRef.value.contains(e.target as Node)) {
    supportOpen.value = false
  }
}
function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') supportOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onEsc)
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-30 bg-[var(--color-bg-deep)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
      <!-- Logo -->
      <router-link :to="localRoute({ name: 'home' })" class="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-brand-amber)] transition-colors shrink-0">
        <span class="text-2xl">🦖</span>
        <span class="text-lg font-bold hidden sm:inline" style="font-family: var(--font-heading)">Mesoris</span>
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
        <ThemeToggle />
        <ModeSwitcher />

        <!-- Support / Donate — subtle heart button that opens a popover with both links -->
        <div class="relative" ref="supportRef">
          <button
            type="button"
            class="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-brand-ember)] hover:bg-[rgba(232,93,44,0.08)] transition-colors"
            @click="supportOpen = !supportOpen"
            :aria-label="t('ui.support.heartTooltip')"
            :aria-expanded="supportOpen"
            aria-haspopup="true"
          >
            <BaseIcon name="heart" :size="18" />
          </button>
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="supportOpen"
              class="absolute right-0 top-full mt-2 w-56 rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card-hover)] p-3 z-40"
              role="menu"
            >
              <p class="text-xs text-[var(--color-text-secondary)] mb-2 px-1">{{ t('ui.support.tagline') }}</p>
              <a
                href="https://boosty.to/mesoris"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[rgba(255,90,60,0.1)] transition-colors"
                role="menuitem"
              >
                <span class="text-sm font-semibold">{{ t('ui.support.boosty') }}</span>
                <BaseIcon name="external-link" :size="14" class="text-[var(--color-text-tertiary)]" />
              </a>
              <a
                href="https://www.paypal.com/paypalme/AyratBadykov"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[rgba(59,130,246,0.1)] transition-colors"
                role="menuitem"
              >
                <span class="text-sm font-semibold">{{ t('ui.support.paypal') }}</span>
                <BaseIcon name="external-link" :size="14" class="text-[var(--color-text-tertiary)]" />
              </a>
            </div>
          </transition>
        </div>

        <!-- Mobile hamburger: hidden on mobile (BottomNav handles it), shown only on md if needed -->
        <button
          type="button"
          class="hidden w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          @click="uiStore.toggleMobileNav()"
          :aria-label="uiStore.isMobileNavOpen ? t('ui.header.closeMenu') : t('ui.header.openMenu')"
        >
          <BaseIcon :name="uiStore.isMobileNavOpen ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
  </header>

  <MobileNav :is-open="uiStore.isMobileNavOpen" @close="uiStore.closeMobileNav()" />
  <BottomNav />
</template>
