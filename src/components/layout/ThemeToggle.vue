<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/useThemeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
const themeStore = useThemeStore()

// In dark mode the button offers light (sun), in light mode it offers dark (moon).
const icon = computed(() => (themeStore.isDark ? 'sun' : 'moon'))
const targetTheme = computed(() => (themeStore.isDark ? 'light' : 'dark'))
const ariaLabel = computed(() =>
  t('ui.header.toggleTheme', { theme: t(`ui.header.${targetTheme.value}Theme`) }),
)
</script>

<template>
  <button
    type="button"
    class="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.08)] transition-colors"
    :aria-label="ariaLabel"
    :aria-pressed="themeStore.isLight"
    :title="ariaLabel"
    @click="themeStore.toggleTheme()"
  >
    <BaseIcon :name="icon" :size="18" />
  </button>
</template>