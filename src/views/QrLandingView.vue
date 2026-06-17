<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type Locale } from '@/router'
import SeoHead from '@/components/layout/SeoHead.vue'

const route = useRoute()
const router = useRouter()

const SUPPORTED = SUPPORTED_LOCALES as readonly Locale[]

const META: Record<Locale, { native: string; en: string }> = {
  ru: { native: 'Русский',  en: 'Russian'  },
  kk: { native: 'Қазақша',   en: 'Kazakh'   },
  en: { native: 'English',   en: 'English'  },
  es: { native: 'Español',   en: 'Spanish'  },
  de: { native: 'Deutsch',   en: 'German'   },
  fr: { native: 'Français',  en: 'French'   },
  it: { native: 'Italiano',  en: 'Italian'  },
  ja: { native: '日本語',    en: 'Japanese' },
  zh: { native: '中文',      en: 'Chinese'  },
  ko: { native: '한국어',    en: 'Korean'   },
  hi: { native: 'हिन्दी',   en: 'Hindi'    },
}

const FLAGS: Record<Locale, string> = {
  ru: '🇷🇺', kk: '🇰🇿', en: '🇬🇧', es: '🇪🇸', de: '🇩🇪',
  fr: '🇫🇷', it: '🇮🇹', ja: '🇯🇵', zh: '🇨🇳', ko: '🇰🇷', hi: '🇮🇳',
}

// ru, kk, en first (in that order), then the rest alphabetically by native name.
const ORDERED_LOCALES = computed<Locale[]>(() => {
  const head: Locale[] = ['ru', 'kk', 'en']
  const tail = SUPPORTED.filter((c) => !head.includes(c))
    .slice()
    .sort((a, b) => META[a].native.localeCompare(META[b].native))
  return [...head, ...tail]
})

const SLUG_RE = /^[a-z0-9-]{1,64}$/i

// Accept slug from either the path (/qr/:slug) or a query param (?slug=...).
// Both forms are scanned by QR codes, so both must resolve to the dinosaur.
const slug = computed(() => {
  const paramSlug = (route.params.slug as string | undefined) || ''
  const querySlug = (route.query.slug as string | undefined) || ''
  const raw = paramSlug || querySlug
  return SLUG_RE.test(raw) ? raw : ''
})

const navLangs = computed<{ tag: string; q: number }[]>(() => {
  const raw = (navigator.languages && navigator.languages.length)
    ? navigator.languages.join(',')
    : (navigator.language || '')
  if (!raw) return []
  return raw
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const baseTag = tag.toLowerCase().split('-')[0]
      let q = 1
      for (const p of params) {
        const [k, v] = p.split('=')
        if (k.trim() === 'q' && v != null) {
          const n = parseFloat(v)
          if (!Number.isNaN(n)) q = n
        }
      }
      return { tag: baseTag, q }
    })
    .filter((e) => e.tag)
    .sort((a, b) => b.q - a.q)
})

const labelLocale = computed<Locale>(() => {
  const tags = new Set(navLangs.value.map((e) => e.tag))
  return (['ru', 'kk', 'en'].find((code) => tags.has(code)) as Locale) || 'en'
})

const T = computed(() => {
  const loc = labelLocale.value
  return {
    title: ({
      ru: 'Выберите язык',
      kk: 'Тілді таңдаңыз',
      en: 'Choose language',
      es: 'Elige idioma',
      de: 'Sprache wählen',
      fr: 'Choisir la langue',
      it: 'Scegli lingua',
      ja: '言語を選択',
      zh: '选择语言',
      ko: '언어 선택',
      hi: 'भाषा चुनें',
    } as Record<Locale, string>)[loc],
    sub: ({
      ru: 'Открыть динозавра: ',
      kk: 'Динозаврды ашу: ',
      en: 'Open dinosaur: ',
      es: 'Abrir dinosaurio: ',
      de: 'Dinosaurier öffnen: ',
      fr: 'Ouvrir le dinosaure : ',
      it: 'Apri dinosauro: ',
      ja: '恐竜を開く: ',
      zh: '打开恐龙: ',
      ko: '공룡 열기: ',
      hi: 'डायनासोर खोलें: ',
    } as Record<Locale, string>)[loc],
  }
})

function displayName(code: Locale): string {
  const m = META[code]
  return m.native === m.en ? m.native : `${m.native} — ${m.en}`
}

function targetHref(code: Locale): string {
  return slug.value ? `/${code}/encyclopedia/${slug.value}` : `/${code}/`
}

function pickLocale(code: Locale) {
  try {
    localStorage.setItem('dino-locale', code)
    localStorage.setItem('dino-locale-chosen', '1')
  } catch {
    /* ignore */
  }
  // Navigate. App.vue's watcher will sync i18n.locale from the URL param,
  // so we don't set locale.value directly — single source of truth is the URL.
  router.replace(targetHref(code))
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh] px-4 py-10">
    <SeoHead
      :title="T.title + ' · Mesoris'"
      :description="T.sub + (slug || '')"
      og-type="website"
    />
    <div class="w-full max-w-md rounded-2xl border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] p-6 sm:p-7 shadow-xl">
      <h1 class="text-heading-lg mb-2">{{ T.title }}</h1>
      <p class="text-body-sm text-[var(--color-text-secondary)] mb-6">
        {{ T.sub }}<span v-if="slug" class="text-[var(--color-brand-amber)] font-semibold">{{ slug }}</span><span v-else>—</span>
      </p>

      <ul class="grid gap-2.5" aria-label="Available languages">
        <li v-for="code in ORDERED_LOCALES" :key="code">
          <a
            :href="targetHref(code)"
            class="lang-tile"
            @click.prevent="pickLocale(code)"
          >
            <span class="lang-tile__label">
              <span class="lang-tile__flag" aria-hidden="true">{{ FLAGS[code] }}</span>
              <span class="lang-tile__name">{{ displayName(code) }}</span>
            </span>
          </a>
        </li>
      </ul>

      <p class="mt-6 text-center text-xs text-[var(--color-text-tertiary)]">
        <a :href="`/${labelLocale}/`" class="hover:underline">{{ $t('ui.footer.about') }} →</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.lang-tile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.12s ease, border-color 0.12s ease, transform 0.06s ease;
}
.lang-tile:hover,
.lang-tile:focus-visible {
  background: var(--color-bg-elevated);
  border-color: var(--color-brand-amber);
  outline: none;
}
.lang-tile:active { transform: scale(0.99); }
.lang-tile__label { display: flex; align-items: center; gap: 12px; min-width: 0; }
.lang-tile__flag { font-size: 22px; line-height: 1; }
.lang-tile__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
