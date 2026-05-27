import { ref } from 'vue'
import type { Dinosaur } from '@/types/dinosaur'

interface LocaleTranslation {
  name?: string
  displayName?: string
}

type LocaleContent = Record<string, LocaleTranslation>

const content = ref<Record<string, LocaleContent>>({})
const loadPromises = new Map<string, Promise<void>>()

function loadLocale(locale: 'ja' | 'zh' | 'ko') {
  if (content.value[locale] || loadPromises.has(locale)) return
  const promise = import(`@/locales/${locale}/dinosaurs/index.ts`).then(m => {
    content.value = {
      ...content.value,
      [locale]: (m as { default: LocaleContent }).default,
    }
  })
  loadPromises.set(locale, promise)
}

export function useForeignNames() {
  loadLocale('ja')
  loadLocale('zh')
  loadLocale('ko')

  function getName(dino: Dinosaur, locale: 'ja' | 'zh' | 'ko'): string | undefined {
    const localeContent = content.value[locale]
    if (!localeContent) return undefined
    const entry = localeContent[dino.id] ?? localeContent[dino.slug]
    return entry?.displayName ?? entry?.name
  }

  function getJapaneseName(dino: Dinosaur) { return getName(dino, 'ja') }
  function getChineseName(dino: Dinosaur) { return getName(dino, 'zh') }
  function getKoreanName(dino: Dinosaur) { return getName(dino, 'ko') }

  return { getJapaneseName, getChineseName, getKoreanName }
}
