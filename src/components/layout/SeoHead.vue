<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { SUPPORTED_LOCALES } from '@/router'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  image?: string
  ogType?: string
  canonicalUrl?: string
}>(), {
  title: 'Dinosaurs — Interactive Prehistoric World',
  description: 'Explore the amazing world of dinosaurs. Interactive encyclopedia, games, comparisons, and science for kids and adults.',
  image: '/images/ui/og-image.webp',
  ogType: 'website',
})

const route = useRoute()

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
}

const currentLocale = computed(() => {
  const match = route.path.match(/^\/(en|ru|es|de|fr|it|ja|zh|ko|kk)(\/|$)/)
  return match ? match[1] : 'en'
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
  if (props.canonicalUrl) {
    tags.push({ rel: 'canonical', href: props.canonicalUrl })
  } else {
    tags.push({ rel: 'canonical', href: route.path })
  }
  return tags
})

useHead(computed(() => ({
  title: props.title,
  htmlAttrs: { lang: currentLocale.value },
  meta: [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:type', content: props.ogType },
    { property: 'og:locale', content: OG_LOCALE_MAP[currentLocale.value] ?? 'en_US' },
    ...SUPPORTED_LOCALES
      .filter(l => l !== currentLocale.value)
      .map(l => ({ property: 'og:locale:alternate', content: OG_LOCALE_MAP[l] ?? 'en_US' })),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image },
  ],
  link: linkTags.value,
})))
</script>

<template>
  <div style="display: none" />
</template>
