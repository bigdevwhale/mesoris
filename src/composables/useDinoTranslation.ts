import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DinoFact, Dinosaur } from '@/types/dinosaur'

type LocalizedDinoFact = Omit<DinoFact, 'icon'> & { icon?: string }
type DinosaurTranslation = Omit<Partial<Dinosaur>, 'facts'> & { facts?: LocalizedDinoFact[] }

function mergeDinoTranslation(dino: Dinosaur, translation: DinosaurTranslation | undefined): Dinosaur {
  if (!translation) return dino

  const translatedFacts = translation.facts
    ? dino.facts.map((fact, index) => ({ ...fact, ...(translation.facts?.[index] ?? {}) }))
    : dino.facts

  return { ...dino, ...translation, facts: translatedFacts }
}

// Lazy-loaded when locale switches to Russian
const ruContent = ref<Record<string, DinosaurTranslation> | null>(null)
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

/**
 * Returns a translateDino function that merges Russian overrides when locale === 'ru'.
 * Calling translateDino inside a computed() will correctly track locale and ruContent
 * as reactive dependencies.
 */
export function useDinoTranslator() {
  const { locale } = useI18n()

  watch(locale, (newLocale) => {
    if (newLocale === 'ru') loadRussianContent()
  }, { immediate: true })

  function translateDino(dino: Dinosaur): Dinosaur {
    if (locale.value !== 'ru' || !ruContent.value) return dino
    return mergeDinoTranslation(dino, ruContent.value[dino.id])
  }

  return { translateDino }
}

export function useDinoTranslation(dino: Dinosaur) {
  const { locale } = useI18n()

  const translated = computed<Dinosaur>(() => {
    if (locale.value !== 'ru') return dino
    if (!ruContent.value) return dino // fallback to English while loading
    return mergeDinoTranslation(dino, ruContent.value[dino.id])
  })

  // Trigger load when locale switches to Russian
  watch(locale, (newLocale) => {
    if (newLocale === 'ru') loadRussianContent()
  }, { immediate: true })

  return { translated }
}
