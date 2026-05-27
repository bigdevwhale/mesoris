<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import type { NavLink } from '@/types/ui'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

const isMoreOpen = ref(false)
const toggleMore = () => { isMoreOpen.value = !isMoreOpen.value }
const closeMore = () => { isMoreOpen.value = false }

const primaryLinks = computed<NavLink[]>(() => [
  { label: t('ui.nav.home'), to: localRoute({ name: 'home' }), icon: 'home' },
  { label: t('ui.nav.encyclopedia'), to: localRoute({ name: 'encyclopedia' }), icon: 'book-open' },
  { label: t('ui.nav.timeline'), to: localRoute({ name: 'timeline' }), icon: 'clock' },
  { label: t('ui.nav.games'), to: localRoute({ name: 'games' }), icon: 'gamepad-2' },
])

const moreLinks = computed<NavLink[]>(() => [
  { label: t('ui.nav.compare'), to: localRoute({ name: 'compare' }), icon: 'scaling' },
  { label: t('ui.nav.science'), to: localRoute({ name: 'science' }), icon: 'flask-conical' },
  { label: t('ui.nav.about'), to: localRoute({ name: 'about' }), icon: 'info' },
])
</script>

<template>
  <Teleport to="body">
    <!-- Invisible backdrop to dismiss popup -->
    <Transition name="fade">
      <div
        v-if="isMoreOpen"
        class="fixed inset-0 z-[35] md:hidden"
        aria-hidden="true"
        @click="closeMore"
      />
    </Transition>

    <!-- More popup: slides up above the bottom bar -->
    <Transition name="slide-up">
      <div
        v-if="isMoreOpen"
        class="fixed left-0 right-0 z-[36] md:hidden popup-bottom"
        role="menu"
        aria-label="More navigation options"
      >
        <div class="mx-3 mb-2 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-modal)] overflow-hidden">
          <router-link
            v-for="link in moreLinks"
            :key="link.label"
            :to="link.to"
            role="menuitem"
            class="flex items-center gap-3 px-5 py-4 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(212,164,58,0.06)] transition-colors border-b border-[var(--glass-border)] last:border-b-0 active:bg-[rgba(212,164,58,0.1)]"
            active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.08)]"
            exact-active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.08)]"
            @click="closeMore"
          >
            <span class="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(212,164,58,0.08)]">
              <BaseIcon :name="link.icon" :size="17" />
            </span>
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Bottom navigation bar -->
  <nav
    class="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl border-t border-[var(--glass-border)] safe-bottom"
    aria-label="Mobile navigation"
  >
    <div class="flex items-stretch h-16">
      <router-link
        v-for="link in primaryLinks"
        :key="link.label"
        :to="link.to"
        class="flex-1 flex flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)] transition-colors"
        active-class="!text-[var(--color-brand-amber)]"
        exact-active-class="!text-[var(--color-brand-amber)]"
        :aria-label="link.label"
        @click="closeMore"
      >
        <BaseIcon :name="link.icon" :size="20" />
        <span class="truncate w-full text-center leading-tight">{{ link.label }}</span>
      </router-link>

      <!-- More button -->
      <button
        type="button"
        class="flex-1 flex flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium transition-colors"
        :class="isMoreOpen ? 'text-[var(--color-brand-amber)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)]'"
        :aria-label="isMoreOpen ? t('ui.header.closeMenu') : t('ui.header.openMenu')"
        :aria-expanded="isMoreOpen"
        @click="toggleMore"
      >
        <BaseIcon :name="isMoreOpen ? 'x' : 'ellipsis'" :size="20" />
        <span class="truncate w-full text-center leading-tight">{{ t('ui.nav.more') }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Popup sits right above the nav bar, accounting for iOS safe area */
.popup-bottom {
  bottom: calc(4rem + env(safe-area-inset-bottom, 0px));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

