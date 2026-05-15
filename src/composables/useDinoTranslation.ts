import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Dinosaur } from '@/types/dinosaur'

// Lazy-loaded when locale switches to Russian
const ruContent = ref<Record<string, Partial<Dinosaur>> | null>(null)
let loadPromise: Promise<void> | null = null

async function loadRussianContent() {
  if (ruContent.value) return
  if (!loadPromise) {
    loadPromise = import('@/locales/ru/encyclopedia').then(m => {
      ruContent.value = m.default
    })
  }
  return loadPromise
}

export function useDinoTranslation(dino: Dinosaur) {
  const { locale } = useI18n()

  const translated = computed<Dinosaur>(() => {
    if (locale.value !== 'ru') return dino
    if (!ruContent.value) return dino // fallback to English while loading
    return { ...dino, ...ruContent.value[dino.id] }
  })

  // Trigger load when locale switches to Russian
  watch(locale, (newLocale) => {
    if (newLocale === 'ru') loadRussianContent()
  }, { immediate: true })

  return { translated }
}
