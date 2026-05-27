<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/router'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const FLAG: Record<string, string> = { en: '🇬🇧', ru: '🇷🇺', es: '🇪🇸', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹', ja: '🇯🇵', zh: '🇨🇳', ko: '🇰🇷' }
const NAME: Record<string, string> = { en: 'English', ru: 'Русский', es: 'Espanol', de: 'Deutsch', fr: 'Francais', it: 'Italiano', ja: '日本語', zh: '中文', ko: '한국어' }

const isOpen = ref(false)
const btnRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLDivElement | null>(null)

const currentFlag = computed(() => FLAG[locale.value as string] ?? '')
const currentLabel = computed(() => (locale.value as string).toUpperCase())

function toggleOpen() {
  isOpen.value = !isOpen.value
}

function selectLocale(newLocale: string) {
  if (newLocale === locale.value) {
    isOpen.value = false
    return
  }
  locale.value = newLocale
  localStorage.setItem('dino-locale', newLocale)
  localStorage.setItem('dino-locale-chosen', '1')
  isOpen.value = false
  const newPath = route.path.replace(/^\/[a-z]{2}/, `/${newLocale}`)
  router.push(newPath)
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node
  if (btnRef.value?.contains(target) || menuRef.value?.contains(target)) return
  isOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
    btnRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="relative">
    <button
      ref="btnRef"
      type="button"
      class="w-9 h-9 flex items-center justify-center rounded-full text-sm border transition-all duration-300 cursor-pointer bg-[rgba(154,150,133,0.08)] text-[var(--color-text-secondary)] border-[var(--glass-border)] hover:border-[var(--color-text-tertiary)]"
      :class="{ 'border-[var(--color-brand-amber)] bg-[rgba(240,192,64,0.12)] text-[var(--color-brand-amber)]': isOpen }"
      @click="toggleOpen()"
      :aria-label="`Select language (current: ${locale})`"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      {{ currentLabel }}
    </button>
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="absolute right-0 top-full mt-2 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-modal)] py-1 min-w-[130px] z-50"
        role="listbox"
        :aria-label="'Select language'"
      >
        <button
          v-for="l in SUPPORTED_LOCALES"
          :key="l"
          type="button"
          role="option"
          :aria-selected="locale === l"
          class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors cursor-pointer"
          :class="locale === l
            ? 'bg-[rgba(212,164,58,0.12)] text-[var(--color-brand-amber)] font-semibold'
            : 'text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.04)]'"
          @click="selectLocale(l)"
        >
          <span class="text-base">{{ FLAG[l] }}</span>
          <span>{{ NAME[l] }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
