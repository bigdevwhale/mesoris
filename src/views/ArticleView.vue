<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { articles } from '@/data/articles'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const route = useRoute()
const modeStore = useModeStore()

const article = computed(() => articles.find(a => a.id === route.params.id))

function renderMarkdown(md: string): string {
  marked.setOptions({ breaks: true })
  return DOMPurify.sanitize(
    marked.parse(md, { async: false }),
    {
      USE_PROFILES: { html: true },
    }
  )
}
</script>

<template>
  <div v-if="article" class="max-w-3xl mx-auto px-4 py-10">
    <SeoHead
      :title="`${article.title} — Dinosaurs Science`"
      :description="article.summary"
      :og-type="'article'"
    />
    <router-link to="/science" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8">
      <BaseIcon name="arrow-left" :size="16" />
      <span class="text-sm">Back to Science Center</span>
    </router-link>

    <div class="aspect-[2/1] rounded-[var(--radius-xl)] overflow-hidden mb-8">
      <BaseLazyImage
        :src="article.image"
        :alt="article.title"
        aspect-ratio="2/1"
        :priority="true"
        class="w-full h-full"
      />
    </div>

    <div class="flex items-center gap-3 mb-4">
      <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[rgba(45,122,140,0.12)] text-[var(--color-info)] capitalize">{{ article.category }}</span>
      <span class="text-xs text-[var(--color-text-tertiary)]">{{ article.readingTimeMinutes }} min read</span>
    </div>

    <h1 class="text-display-md mb-4">{{ article.title }}</h1>
    <p class="text-body-lg mb-8">{{ article.summary }}</p>

    <div
      class="prose-prehistoric [&_h2]:text-display-md [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-heading-md [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-body-md [&_p]:mb-4 [&_li]:text-body-md"
      v-html="renderMarkdown(modeStore.isKidsMode ? (article.kidsVersion || article.content) : article.content)"
    />

    <!-- Sources -->
    <div class="mt-12 pt-8 border-t border-[var(--glass-border)]">
      <h3 class="text-heading-md mb-4">Sources</h3>
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
