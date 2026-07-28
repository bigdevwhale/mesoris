<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { articles } from '@/data/articles'
import { myths } from '@/data/myths'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseAccordion from '@/components/ui/BaseAccordion.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, tm, locale } = useI18n()
const { localRoute } = useLocale()

// Per-locale field suffix on the data records (title/titleRu, myth/mythRu, …).
const LOCALE_SUFFIX: Record<string, string> = {
  en: '', ru: 'Ru', es: 'Es', de: 'De', fr: 'Fr', it: 'It',
  ja: 'Ja', zh: 'Zh', ko: 'Ko', kk: 'Kk', hi: 'Hi',
}
function loc<T extends object>(obj: T, field: string): string {
  const sfx = LOCALE_SUFFIX[locale.value] ?? ''
  const key = sfx ? `${field}${sfx}` : field
  const rec = obj as unknown as Record<string, unknown>
  return (rec[key] as string) ?? (rec[field] as string) ?? ''
}

const flippedCards = ref<Set<string>>(new Set())
function toggleCard(id: string) {
  if (flippedCards.value.has(id)) flippedCards.value.delete(id)
  else flippedCards.value.add(id)
}

const explainers = computed(() => {
  const items = tm('ui.science.explainerItems')
  return (Array.isArray(items) ? items : []) as { title: string; content: string }[]
})

const paths = computed(() => [
  { icon: 'sparkles', label: t('ui.science.forKids'), desc: t('ui.science.forKidsDesc'), cls: 'path-kids' },
  { icon: 'book-open', label: t('ui.science.forAdults'), desc: t('ui.science.forAdultsDesc'), cls: 'path-adults' },
  { icon: 'graduation-cap', label: t('ui.science.forClassrooms'), desc: t('ui.science.forClassroomsDesc'), cls: 'path-classrooms' },
])
</script>

<template>
  <div class="science-page">
    <SeoHead :title="t('ui.science.title')" :description="t('ui.science.description')"/>

    <!-- ============ PAGE HEAD ============ -->
    <section class="page-head">
      <div class="wrap">
        <span class="kicker">{{ t('ui.nav.science') }}</span>
        <h1>{{ t('ui.science.title') }}</h1>
        <p class="lede">{{ t('ui.science.description') }}</p>
      </div>
    </section>

    <!-- ============ SCIENCE SECTION ============ -->
    <section class="science-section">
      <div class="wrap">

        <!-- Articles -->
        <div class="block">
          <h2 class="block-title">{{ t('ui.science.articles') }}</h2>
          <div class="articles-grid">
            <router-link
              v-for="article in articles"
              :key="article.id"
              :to="localRoute({ name: 'article', params: { id: article.id } })"
              class="article-card"
            >
              <div class="article-media">
                <BaseLazyImage
                  :src="article.image"
                  :alt="loc(article, 'title')"
                  :srcset="`${article.image} 960w`"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  class="article-media-img"
                />
              </div>
              <div class="article-body">
                <span class="pill pill-cat">{{ loc(article, 'category') }}</span>
                <h3 class="article-title">{{ loc(article, 'title') }}</h3>
                <p class="article-summary">{{ loc(article, 'summary') }}</p>
                <span class="article-cta">{{ t('ui.encyclopedia.viewDetail') }}</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Myths vs Facts -->
        <div class="block">
          <h2 class="block-title">{{ t('ui.science.mythsAndFacts') }}</h2>
          <p class="block-sub">{{ t('ui.science.clickToReveal') }}</p>
          <div class="myths-grid">
            <div v-for="myth in myths" :key="myth.id" class="myth-card">
              <button
                type="button"
                class="myth-inner"
                :class="{ flipped: flippedCards.has(myth.id) }"
                :aria-pressed="flippedCards.has(myth.id)"
                :aria-label="`${t('ui.science.fact')}: ${loc(myth, 'fact')}`"
                @click="toggleCard(myth.id)"
              >
                <div class="myth-face myth-front">
                  <span class="myth-glyph" aria-hidden="true">❓</span>
                  <div class="myth-text">
                    <span class="myth-tag myth-tag-myth">{{ t('ui.science.myth') }}</span>
                    <p class="myth-body">{{ loc(myth, 'myth') }}</p>
                    <span class="myth-hint">{{ t('ui.science.clickToReveal') }}</span>
                  </div>
                </div>
                <div class="myth-face myth-back" aria-hidden="true">
                  <span class="myth-glyph" aria-hidden="true">✅</span>
                  <div class="myth-text">
                    <span class="myth-tag myth-tag-fact">{{ t('ui.science.fact') }}</span>
                    <p class="myth-body">{{ loc(myth, 'fact') }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Explainers -->
        <div class="block">
          <h2 class="block-title">{{ t('ui.science.explainers') }}</h2>
          <div class="explainers-wrap">
            <BaseAccordion :items="explainers"/>
          </div>
        </div>

        <!-- Learning paths -->
        <div class="block">
          <h2 class="block-title">{{ t('ui.science.learningPaths') }}</h2>
          <div class="paths-grid">
            <div v-for="p in paths" :key="p.cls" class="path-card" :class="p.cls">
              <BaseIcon :name="p.icon" class="path-icon"/>
              <div class="path-label">{{ p.label }}</div>
              <p class="path-desc">{{ p.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.science-page { min-height: 100vh; }
.wrap {
  width: min(var(--wrap, 1160px), 100% - 2.5rem);
  margin-inline: auto;
}

/* ============ PAGE HEAD ============ */
.page-head {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3rem, 8vw, 4.5rem) clamp(1.5rem, 4vw, 2.5rem);
  background:
      radial-gradient(90% 70% at 12% 0%, rgba(45, 138, 123, 0.12) 0%, transparent 55%),
      radial-gradient(90% 70% at 88% 100%, rgba(212, 164, 58, 0.12) 0%, transparent 55%),
      linear-gradient(180deg, var(--color-bg-deep) 0%, var(--color-bg-base) 100%);
}
.kicker {
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-brand-amber);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.kicker::before {
  content: "";
  width: 24px;
  height: 2px;
  background: var(--color-brand-amber);
  border-radius: 2px;
  opacity: 0.7;
}
.page-head h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.25rem);
  font-weight: 600;
  line-height: 1.15;
  margin-top: 0.6rem;
  text-wrap: balance;
}
.lede {
  color: var(--color-text-secondary);
  margin-top: 0.7rem;
  max-width: 62ch;
  text-wrap: pretty;
}

/* ============ SCIENCE SECTION (uses global --sc-* tokens) ============ */
.science-section {
  position: relative;
  padding-block: 2.5rem 5rem;
  background:
      repeating-linear-gradient(0deg, var(--sc-grid) 0px, var(--sc-grid) 1px, transparent 1px, transparent 64px),
      repeating-linear-gradient(90deg, var(--sc-grid) 0px, var(--sc-grid) 1px, transparent 1px, transparent 64px),
      linear-gradient(180deg, var(--sc-deep-1) 0%, var(--sc-deep-2) 100%);
}
.block { margin-top: 3.5rem; }
.block:first-child { margin-top: 0; }
.block-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.5vw, 1.85rem);
  font-weight: 600;
  color: var(--sc-card-fg);
  margin-bottom: 1.5rem;
  text-wrap: balance;
}
.block-sub {
  color: var(--color-text-secondary);
  margin-top: -1rem;
  margin-bottom: 1.2rem;
  max-width: 56ch;
  text-wrap: pretty;
}

/* ── Article cards ─────────────────────────────────────── */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.article-card {
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: color-mix(in srgb, var(--color-brand-amber) 35%, var(--glass-border));
}
.article-media { aspect-ratio: 2 / 1; overflow: hidden; background: var(--color-bg-deep); }
.article-media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.article-card:hover .article-media-img { transform: scale(1.06); }
.article-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.55rem; }
.pill {
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--input-bg);
}
.pill-cat {
  color: var(--sc-pill-cat);
  border-color: color-mix(in srgb, var(--sc-pill-cat) 30%, var(--glass-border));
}
.article-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.3;
  color: var(--color-text-primary);
}
.article-summary {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-cta {
  margin-top: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--sc-cta);
}

/* ── Myth flip cards ────────────────────────────────────── */
.myths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.1rem;
}
.myth-card { perspective: 900px; min-height: 9.5rem; }
.myth-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 9.5rem;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}
.myth-inner.flipped { transform: rotateY(180deg); }
.myth-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.myth-front {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}
.myth-back {
  background: color-mix(in srgb, var(--color-brand-moss) 10%, var(--color-bg-elevated));
  border-color: color-mix(in srgb, var(--color-brand-moss) 28%, var(--glass-border));
  transform: rotateY(180deg);
}
.myth-glyph { font-size: 1.5rem; line-height: 1; flex: none; margin-top: 0.1rem; }
.myth-text { display: flex; flex-direction: column; gap: 0.35rem; }
.myth-tag {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.myth-tag-myth { color: var(--sc-myth-myth); }
.myth-tag-fact { color: var(--sc-myth-fact); }
.myth-body {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-text-primary);
}
.myth-hint {
  font-size: 0.72rem;
  color: var(--color-text-tertiary);
  margin-top: 0.2rem;
}

/* ── Explainers ─────────────────────────────────────────── */
.explainers-wrap {
  max-width: 48rem;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 0.5rem 1.25rem;
  box-shadow: var(--shadow-card);
}

/* ── Learning paths ─────────────────────────────────────── */
.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}
.path-card {
  --accent: var(--color-brand-amber);
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  border-top: 3px solid var(--accent);
}
.path-kids { --accent: var(--color-brand-amber); }
.path-adults { --accent: var(--color-brand-teal); }
.path-classrooms { --accent: var(--color-brand-ember); }
.path-icon { width: 1.75rem; height: 1.75rem; color: var(--accent); margin-bottom: 0.9rem; }
.path-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.6rem;
}
.path-desc {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 620px) {
  .articles-grid, .myths-grid, .paths-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .myth-inner { transition: none; }
  .article-card:hover { transform: none; }
  .article-card:hover .article-media-img { transform: none; }
}
</style>