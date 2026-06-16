import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import ru from '@/locales/ru'
import es from '@/locales/es'
import de from '@/locales/de'
import fr from '@/locales/fr'
import it from '@/locales/it'
import ja from '@/locales/ja'
import zh from '@/locales/zh'
import ko from '@/locales/ko'
import kk from '@/locales/kk'
import hi from '@/locales/hi'

const SUPPORTED = ['en', 'ru', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'kk', 'hi']
const LOCALE_CHOSEN_KEY = 'dino-locale-chosen'
const LOCALE_STORAGE_KEY = 'dino-locale'

function getInitialLocale(): string {
  if (localStorage.getItem(LOCALE_CHOSEN_KEY) === '1') {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  }

  const nav = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ''
  const code = nav.toLowerCase().split('-')[0]
  return SUPPORTED.includes(code) ? code : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: { en, ru, es, de, fr, it, ja, zh, ko, kk, hi },
})

export default i18n
