import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DinoFact, Dinosaur } from '@/types/dinosaur'

type LocalizedDinoFact = Omit<DinoFact, 'icon'> & { icon?: string }
type DinosaurTranslation = Partial<Omit<Dinosaur, 'facts'>> & { facts?: LocalizedDinoFact[] }

function mergeDinoTranslation(dino: Dinosaur, translation: DinosaurTranslation | undefined): Dinosaur {
  if (!translation) return dino

  const translatedFacts = translation.facts
    ? dino.facts.map((fact, index) => ({ ...fact, ...(translation.facts?.[index] ?? {}) }))
    : dino.facts

  return { ...dino, ...translation, facts: translatedFacts }
}

// Lazy-loaded locale content cache: locale -> dinosaur-id -> translation
const localeContent = ref<Record<string, Record<string, DinosaurTranslation>>>({})
const loadPromises = new Map<string, Promise<void>>()

async function loadLocaleContent(targetLocale: string) {
  if (targetLocale === 'en' || localeContent.value[targetLocale]) return
  if (!loadPromises.has(targetLocale)) {
    const promise = import(`@/locales/${targetLocale}/dinosaurs/index.ts`).then(m => {
      localeContent.value = {
        ...localeContent.value,
        [targetLocale]: (m as { default: Record<string, DinosaurTranslation> }).default,
      }
    })
    loadPromises.set(targetLocale, promise)
  }
  return loadPromises.get(targetLocale)!
}

/**
 * Returns a translateDino function that merges locale-specific overrides for non-English locales.
 */
export function useDinoTranslator() {
  const { locale } = useI18n()

  watch(locale, (newLocale) => {
    if (newLocale !== 'en') loadLocaleContent(newLocale)
  }, { immediate: true })

  function translateDino(dino: Dinosaur): Dinosaur {
    if (locale.value === 'en') return dino
    const content = localeContent.value[locale.value]
    if (!content) return dino
    // Prefer direct id/slug matches; attempt to load locale if missing
    const translation = content[dino.id] ?? content[dino.slug] ?? content[dino.id.replace(/_/g, '-')] ?? content[dino.slug.replace(/_/g, '-')]
    if (!translation) return dino
    return mergeDinoTranslation(dino, translation as DinosaurTranslation)
  }

  return { translateDino }
}

export function useDinoTranslation(dino: Dinosaur) {
  const { locale } = useI18n()
  const { translateDino } = useDinoTranslator()

  watch(locale, (newLocale) => {
    if (newLocale !== 'en') loadLocaleContent(newLocale)
  }, { immediate: true })

  return {
    translated: computed(() => translateDino(dino)),
  }
}
