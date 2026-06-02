<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import type { NavLink } from '@/types/ui'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

const links = computed<NavLink[]>(() => [
  { label: t('ui.nav.encyclopedia'), to: localRoute({ name: 'encyclopedia' }), icon: 'book-open' },
  { label: t('ui.nav.timeline'), to: localRoute({ name: 'timeline' }), icon: 'clock' },
  { label: t('ui.nav.compare'), to: localRoute({ name: 'compare' }), icon: 'scaling' },
  { label: t('ui.nav.games'), to: localRoute({ name: 'games' }), icon: 'gamepad-2' },
  { label: t('ui.nav.science'), to: localRoute({ name: 'science' }), icon: 'flask-conical' },
  { label: t('ui.nav.about'), to: localRoute({ name: 'about' }), icon: 'info' },
])
</script>

<template>
  <nav class="hidden lg:flex items-center gap-1">
    <router-link
      v-for="link in links"
      :key="link.label"
      :to="link.to"
      class="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(212,164,58,0.06)] transition-colors duration-200"
      active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.1)]"
      exact-active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.1)]"
    >
      <BaseIcon :name="link.icon" :size="16" />
      {{ link.label }}
    </router-link>
  </nav>
</template>
