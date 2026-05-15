<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isRu = computed(() => locale.value === 'ru')
const label = computed(() => isRu.value ? 'RU' : 'EN')

function toggleLocale() {
  locale.value = isRu.value ? 'en' : 'ru'
  localStorage.setItem('dino-locale', locale.value)
}
</script>

<template>
  <button
    type="button"
    class="w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer"
    :class="isRu
      ? 'bg-[rgba(240,192,64,0.15)] text-[var(--color-brand-amber)] border-[rgba(240,192,64,0.3)]'
      : 'bg-[rgba(154,150,133,0.08)] text-[var(--color-text-secondary)] border-[var(--glass-border)]'"
    @click="toggleLocale()"
    :aria-label="`Switch to ${isRu ? 'English' : 'Russian'}`"
  >
    {{ label }}
  </button>
</template>
