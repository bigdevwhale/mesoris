<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { articles } from '@/data/articles'
import { useModeStore } from '@/stores/useModeStore'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const route = useRoute()
const { localRoute } = useLocale()
const modeStore = useModeStore()
const { t, locale } = useI18n()

function pickLocale<T>(en: T, ru: T, es: T, de: T, fr: T, it: T, ja: T, zh: T, ko: T, kk: T): T {
  if (locale.value === 'kk') return kk
  if (locale.value === 'ko') return ko
  if (locale.value === 'zh') return zh
  if (locale.value === 'ja') return ja
  if (locale.value === 'it') return it
  if (locale.value === 'fr') return fr
  if (locale.value === 'de') return de
  if (locale.value === 'es') return es
  if (locale.value === 'ru') return ru
  return en
}

const article = computed(() => articles.find(a => a.id === route.params.id))

const seoTitle = computed(() => {
  if (!article.value) return ''
  const title = pickLocale(article.value.title, article.value.titleRu, article.value.titleEs, article.value.titleDe, article.value.titleFr, article.value.titleIt, article.value.titleJa, article.value.titleZh, article.value.titleKo, article.value.titleKk)
  return pickLocale(
    `${title} — Dinosaur Science`,
    `${title} — Наука о динозаврах`,
    `${title} — Ciencia de los Dinosaurios`,
    `${title} — Dinosaurier-Wissenschaft`,
    `${title} — Science des Dinosaures`,
    `${title} — Scienza dei Dinosauri`,
    `${title} — 恐竜の科学`,
    `${title} — 恐龙科学`,
    `${title} — 공룡 과학`,
    `${title} — Динозавр ғылымы`,
  )
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  const raw = modeStore.isKidsMode
    ? pickLocale(article.value.kidsVersion, article.value.kidsVersionRu, article.value.kidsVersionEs, article.value.kidsVersionDe, article.value.kidsVersionFr, article.value.kidsVersionIt, article.value.kidsVersionJa, article.value.kidsVersionZh, article.value.kidsVersionKo, article.value.kidsVersionKk)
    : pickLocale(article.value.content, article.value.contentRu, article.value.contentEs, article.value.contentDe, article.value.contentFr, article.value.contentIt, article.value.contentJa, article.value.contentZh, article.value.contentKo, article.value.contentKk)
  marked.setOptions({ breaks: true })
  return DOMPurify.sanitize(
    marked.parse(raw, { async: false }),
    { USE_PROFILES: { html: true } },
  )
})
</script>

<template>
  <div v-if="article" class="max-w-3xl mx-auto px-4 py-10">
    <SeoHead :title="seoTitle" :description="pickLocale(article.summary, article.summaryRu, article.summaryEs, article.summaryDe, article.summaryFr, article.summaryIt, article.summaryJa, article.summaryZh, article.summaryKo, article.summaryKk)" :og-type="'article'" />
    <router-link :to="localRoute({ name: 'science' })" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8">
      <BaseIcon name="arrow-left" :size="16" />
      <span class="text-sm">{{ t('ui.science.backToScience') }}</span>
    </router-link>

    <div class="aspect-[2/1] rounded-[var(--radius-xl)] overflow-hidden mb-8">
      <BaseLazyImage
        :src="article.image"
        :alt="pickLocale(article.title, article.titleRu, article.titleEs, article.titleDe, article.titleFr, article.titleIt, article.titleJa, article.titleZh, article.titleKo, article.titleKk)"
        aspect-ratio="2/1"
        :priority="true"
        class="w-full h-full"
      />
    </div>

    <div class="flex items-center gap-3 pb-4">
      <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[rgba(45,122,140,0.12)] text-[var(--color-info)] capitalize">
        {{ pickLocale(article.category, article.categoryRu, article.categoryEs, article.categoryDe, article.categoryFr, article.categoryIt, article.categoryJa, article.categoryZh, article.categoryKo, article.categoryKk) }}
      </span>
    </div>

    <h1 class="text-display-md pb-4">{{ pickLocale(article.title, article.titleRu, article.titleEs, article.titleDe, article.titleFr, article.titleIt, article.titleJa, article.titleZh, article.titleKo, article.titleKk) }}</h1>
    <p class="text-body-lg mb-8">{{ pickLocale(article.summary, article.summaryRu, article.summaryEs, article.summaryDe, article.summaryFr, article.summaryIt, article.summaryJa, article.summaryZh, article.summaryKo, article.summaryKk) }}</p>

    <div
      class="prose-prehistoric [&_h2]:text-display-md [&_h2]:mt-10 [&_h2]:pb-4 [&_h3]:text-heading-md [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-body-md [&_p]:pb-4 [&_li]:text-body-md"
      v-html="renderedContent"
    />

    <!-- Sources -->
    <div class="mt-12 pt-8 border-t border-[var(--glass-border)]">
      <h3 class="text-heading-md pb-4">{{ t('ui.science.sources') }}</h3>
      <div v-for="source in article.sources" :key="source.title" class="mb-3">
        <a :href="source.url" target="_blank" class="text-sm text-[var(--color-brand-teal)] hover:text-[var(--color-brand-amber)] transition-colors">
          {{ source.title }}
        </a>
        <div class="text-xs text-[var(--color-text-tertiary)]">
          {{ source.author ? `${source.author}, ` : '' }}{{ source.year }}
        </div>
      </div>
    </div>
  </div>
</template>
