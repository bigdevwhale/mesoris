<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { SUPPORTED_LOCALES } from '@/router'

type JsonLd = Record<string, unknown> | Record<string, unknown>[]

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  image?: string
  ogType?: 'website' | 'article' | 'profile' | 'video.other'
  canonicalUrl?: string
  /** Schema.org JSON-LD payload (object or array). Rendered as <script type="application/ld+json">. */
  jsonLd?: JsonLd
  /** Article-specific metadata. When ogType === 'article' these become og:article:* tags. */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
  /** Override the robots directive. Defaults to "index, follow, max-image-preview:large". */
  robots?: string
}>(), {
  title: 'Dinosaurs — Interactive Prehistoric World',
  description: 'Explore the amazing world of dinosaurs. Interactive encyclopedia, games, comparisons, and science for kids and adults.',
  image: '/images/ui/og-image.webp',
  ogType: 'website',
  canonicalUrl: undefined,
  jsonLd: undefined,
  article: undefined,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
})

const route = useRoute()

const SITE_NAME = 'Mesoris'
const SITE_URL = 'https://dinosaurs.app'

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  ja: 'ja_JP',
  zh: 'zh_CN',
  ko: 'ko_KR',
  kk: 'kk_KZ',
  hi: 'hi_IN',
}

const currentLocale = computed(() => {
  const match = route.path.match(/^\/(en|ru|es|de|fr|it|ja|zh|ko|kk|hi)(\/|$)/)
  return match ? match[1] : 'en'
})

const fullUrl = computed(() => {
  if (props.canonicalUrl) return props.canonicalUrl
  return `${SITE_URL}${route.path}`
})

const fullImage = computed(() => {
  const img = props.image
  if (img.startsWith('http://') || img.startsWith('https://')) return img
  return `${SITE_URL}${img}`
})

const alternateLinks = computed(() =>
  SUPPORTED_LOCALES.map((locale) => {
    const altPath = route.path.replace(/^\/[a-z]{2}/, `/${locale}`)
    return { rel: 'alternate', hreflang: locale, href: altPath }
  }),
)

const linkTags = computed(() => {
  const tags: Array<{ rel: string; hreflang?: string; href: string }> = [
    ...alternateLinks.value,
    { rel: 'alternate', hreflang: 'x-default', href: route.path.replace(/^\/[a-z]{2}/, '/en') },
  ]
  tags.push({ rel: 'canonical', href: fullUrl.value })
  return tags
})

const metaTags = computed(() => {
  const meta: Array<Record<string, string>> = [
    { name: 'description', content: props.description },
    { name: 'robots', content: props.robots },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: fullImage.value },
    { property: 'og:image:alt', content: props.title },
    { property: 'og:type', content: props.ogType },
    { property: 'og:url', content: fullUrl.value },
    { property: 'og:locale', content: OG_LOCALE_MAP[currentLocale.value] ?? 'en_US' },
    ...SUPPORTED_LOCALES
      .filter(l => l !== currentLocale.value)
      .map(l => ({ property: 'og:locale:alternate', content: OG_LOCALE_MAP[l] ?? 'en_US' })),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: fullImage.value },
    { name: 'twitter:image:alt', content: props.title },
    { name: 'twitter:site', content: '@Mesoris_com' },
    { name: 'twitter:creator', content: '@Mesoris_com' },
  ]

  if (props.ogType === 'article' && props.article) {
    if (props.article.publishedTime) {
      meta.push({ property: 'article:published_time', content: props.article.publishedTime })
    }
    if (props.article.modifiedTime) {
      meta.push({ property: 'article:modified_time', content: props.article.modifiedTime })
    }
    if (props.article.author) {
      meta.push({ property: 'article:author', content: props.article.author })
    }
    if (props.article.section) {
      meta.push({ property: 'article:section', content: props.article.section })
    }
    if (props.article.tags) {
      for (const tag of props.article.tags) {
        meta.push({ property: 'article:tag', content: tag })
      }
    }
  }

  return meta
})

const jsonLdScript = computed(() => {
  if (!props.jsonLd) return []
  const payload = Array.isArray(props.jsonLd) ? props.jsonLd : [props.jsonLd]
  const enriched = payload.map((node) => {
    const n = node as Record<string, unknown>
    return {
      ...n,
      '@context': n['@context'] ?? 'https://schema.org',
      url: n.url ?? fullUrl.value,
      inLanguage: n.inLanguage ?? currentLocale.value,
    }
  })
  return [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify(enriched.length === 1 ? enriched[0] : enriched),
    key: `jsonld-${currentLocale.value}-${route.path}`,
  }]
})

useHead({
  title: props.title,
  htmlAttrs: { lang: currentLocale.value },
  meta: metaTags,
  link: linkTags,
  script: jsonLdScript,
})
</script>

<template>
  <div style="display: none" />
</template>