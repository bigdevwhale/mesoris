<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { articles } from '@/data/articles'
import { myths } from '@/data/myths'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseAccordion from '@/components/ui/BaseAccordion.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, tm, locale } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

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

const flippedCards = ref<Set<string>>(new Set())

function toggleCard(id: string) {
  if (flippedCards.value.has(id)) {
    flippedCards.value.delete(id)
  } else {
    flippedCards.value.add(id)
  }
}

const explainers = computed(() => {
  const items = tm('ui.science.explainerItems')
  return (Array.isArray(items) ? items : []) as { title: string; content: string }[]
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead :title="t('ui.science.title')" :description="t('ui.science.description')" />
    <h1 class="text-display-lg mb-4">{{ t('ui.science.title') }}</h1>
    <p class="text-body-lg mb-10">{{ t('ui.science.description') }}</p>

    <!-- Articles -->
    <section class="mb-16">
      <h2 class="text-display-md pb-6">{{ t('ui.science.articles') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="localRoute({ name: 'article', params: { id: article.id } })"
          class="group bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
          <div class="aspect-[2/1] overflow-hidden">
            <BaseLazyImage
              :src="article.image"
              :alt="pickLocale(article.title, article.titleRu, article.titleEs, article.titleDe, article.titleFr, article.titleIt, article.titleJa, article.titleZh, article.titleKo, article.titleKk)"
              :srcset="`${article.image} 960w`"
              sizes="(max-width: 1024px) 100vw, 33vw"
              class="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5">
            <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[rgba(45,122,140,0.12)] text-[var(--color-info)]">
              {{ pickLocale(article.category, article.categoryRu, article.categoryEs, article.categoryDe, article.categoryFr, article.categoryIt, article.categoryJa, article.categoryZh, article.categoryKo, article.categoryKk) }}
            </span>
            <h3 class="text-heading-md mt-2 mb-2">{{ pickLocale(article.title, article.titleRu, article.titleEs, article.titleDe, article.titleFr, article.titleIt, article.titleJa, article.titleZh, article.titleKo, article.titleKk) }}</h3>
            <p class="text-body-sm mb-3">{{ pickLocale(article.summary, article.summaryRu, article.summaryEs, article.summaryDe, article.summaryFr, article.summaryIt, article.summaryJa, article.summaryZh, article.summaryKo, article.summaryKk) }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Myths vs Facts -->
    <section class="mb-16">
      <h2 class="text-display-md pb-6">{{ t('ui.science.mythsAndFacts') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="myth in myths"
          :key="myth.id"
          class="myth-card"
        >
          <button
            type="button"
            class="myth-inner w-full text-left"
            :class="{ flipped: flippedCards.has(myth.id) }"
            :aria-pressed="flippedCards.has(myth.id)"
            :aria-label="`${t('ui.science.fact')}: ${pickLocale(myth.fact, myth.factRu, myth.factEs, myth.factDe, myth.factFr, myth.factIt, myth.factJa, myth.factZh, myth.factKo, myth.factKk)} — ${t('ui.science.clickToReveal').replace(' →', '')}`"
            @click="toggleCard(myth.id)"
          >
            <div class="myth-front bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3">
              <span class="text-2xl shrink-0" aria-hidden="true">❓</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-error)] mb-1">{{ t('ui.science.myth') }}</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ pickLocale(myth.myth, myth.mythRu, myth.mythEs, myth.mythDe, myth.mythFr, myth.mythIt, myth.mythJa, myth.mythZh, myth.mythKo, myth.mythKk) }}</p>
                <p class="text-xs text-[var(--color-text-tertiary)] mt-2">{{ t('ui.science.clickToReveal') }}</p>
              </div>
            </div>
            <div class="myth-back bg-[rgba(61,140,64,0.08)] border border-[rgba(61,140,64,0.2)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3" aria-hidden="true">
              <span class="text-2xl shrink-0">✅</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-success)] mb-1">{{ t('ui.science.fact') }}</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ pickLocale(myth.fact, myth.factRu, myth.factEs, myth.factDe, myth.factFr, myth.factIt, myth.factJa, myth.factZh, myth.factKo, myth.factKk) }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Explainers -->
    <section class="mb-16">
      <h2 class="text-display-md pb-6">{{ t('ui.science.explainers') }}</h2>
      <div class="max-w-2xl">
        <BaseAccordion :items="explainers" />
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-display-md pb-6">{{ t('ui.science.learningPaths') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-amber)] mb-2">{{ t('ui.science.forKids') }}</div>
          <p class="text-body-md">{{ t('ui.science.forKidsDesc') }}</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-teal)] mb-2">{{ t('ui.science.forAdults') }}</div>
          <p class="text-body-md">{{ t('ui.science.forAdultsDesc') }}</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-ember)] mb-2">{{ t('ui.science.forClassrooms') }}</div>
          <p class="text-body-md">{{ t('ui.science.forClassroomsDesc') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.myth-card {
  perspective: 900px;
  min-height: 7rem;
}

.myth-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 7rem;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.myth-inner.flipped {
  transform: rotateY(180deg);
}

.myth-front,
.myth-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.myth-back {
  transform: rotateY(180deg);
}
</style>
