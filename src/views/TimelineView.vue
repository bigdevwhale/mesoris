<script setup lang="ts">
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {eras} from '@/data/eras'
import type {EraInfo} from '@/types/dinosaur'
import {useModeStore} from '@/stores/useModeStore'
import {dinosaurs} from '@/data/dinosaurs'
import {useDinoTranslator} from '@/composables/useDinoTranslation'
import {useLocale} from '@/composables/useLocale'
import SeoHead from '@/components/layout/SeoHead.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import {useStaggerReveal} from '@/composables/useScrollAnimation'

const {t, locale} = useI18n()
const modeStore = useModeStore()
const {translateDino} = useDinoTranslator()
const {localRoute} = useLocale()

// ── Locale-aware era field helpers (data is localized per-era) ────────────────
const LOCALE_FIELD: Record<string, 'Hi' | 'Kk' | 'Ko' | 'Zh' | 'Ja' | 'It' | 'Fr' | 'De' | 'Es' | 'Ru'> = {
  hi: 'Hi', kk: 'Kk', ko: 'Ko', zh: 'Zh', ja: 'Ja', it: 'It', fr: 'Fr', de: 'De', es: 'Es', ru: 'Ru',
}
function eraName(era: EraInfo) {
  const sfx = LOCALE_FIELD[locale.value]
  return sfx ? (era as unknown as Record<string, string>)[`name${sfx}`] : era.name
}
function eraDesc(era: EraInfo) {
  const sfx = LOCALE_FIELD[locale.value]
  return sfx ? (era as unknown as Record<string, string>)[`description${sfx}`] : era.description
}
function eraDinos(eraId: string) {
  return dinosaurs.filter(d => d.era === eraId)
}

// ── Era filter (All / Triassic / Jurassic / Cretaceous) ───────────────────────
type EraFilter = 'all' | 'triassic' | 'jurassic' | 'cretaceous'
const activeFilter = ref<EraFilter>('all')
function setFilter(era: EraFilter) {
  activeFilter.value = era
}
function isVisible(era: string) {
  return activeFilter.value === 'all' || activeFilter.value === era
}

// ── Milestones: dated events from the existing timeline data, minus the
//    K-Pg extinction which is rendered as the dedicated impact card. ──────────
const milestones = [
  {key: 'firstDinosaurs', mya: 230, era: 'triassic'},
  {key: 'firstMammals', mya: 225, era: 'triassic'},
  {key: 'firstBirds', mya: 150, era: 'jurassic'},
  {key: 'firstFlowers', mya: 130, era: 'cretaceous'},
] as const

type MilestoneItem = {
  key: string
  mya: number
  era: string
  label: string
  description: string
  side: 'side-left' | 'side-right'
}

const milestoneItems = computed<MilestoneItem[]>(() =>
    milestones.map((m, i) => ({
      ...m,
      label: t(`ui.timeline.events.${m.key}`),
      description: t(`ui.timeline.events.${m.key}Desc`),
      side: i % 2 === 0 ? 'side-left' : 'side-right',
    })),
)

function milestonesByEra(eraId: string) {
  return milestoneItems.value.filter(m => m.era === eraId)
}

// ── K-Pg impact facts (values are language-neutral) ───────────────────────────
const impactFacts = computed(() => [
  {label: t('ui.timeline.impactFacts.impactor'), value: '~10 km'},
  {label: t('ui.timeline.impactFacts.crater'), value: '180 km'},
  {label: t('ui.timeline.impactFacts.site'), value: 'Chicxulub'},
  {label: t('ui.timeline.impactFacts.speciesLost'), value: '~75%'},
])

const filterChips = computed(() => [
  {label: t('ui.timeline.allPeriods'), value: 'all' as const},
  {label: eraName(eras[0]), value: 'triassic' as const},
  {label: eraName(eras[1]), value: 'jurassic' as const},
  {label: eraName(eras[2]), value: 'cretaceous' as const},
])

const jumpLinks = computed(() => [
  {label: eraName(eras[0]), href: '#era-triassic', dot: 'dot-triassic'},
  {label: eraName(eras[1]), href: '#era-jurassic', dot: 'dot-jurassic'},
  {label: eraName(eras[2]), href: '#era-cretaceous', dot: 'dot-cretaceous'},
  {label: t('ui.timeline.impactLabel'), href: '#impact', dot: null},
])

const spineRef = ref<HTMLElement | null>(null)
useStaggerReveal(spineRef, '.tl-card', {stagger: 0.1, duration: 0.55, y: 28})
</script>

<template>
  <div class="timeline-page">
    <SeoHead :title="t('ui.timeline.title')" :description="t('ui.timeline.description')"/>

    <!-- ============ PAGE HEAD ============ -->
    <section class="page-head">
      <div class="wrap">
        <span class="kicker">{{ t('ui.nav.timeline') }}</span>
        <h1>{{ t('ui.timeline.title') }}</h1>
        <p class="lede">
          {{ modeStore.isKidsMode ? t('ui.timeline.ledeKids') : t('ui.timeline.ledeAdults') }}
        </p>
        <nav class="jump-row" aria-label="Jump to era">
          <span class="jump-label">{{ t('ui.timeline.jumpLabel') }}</span>
          <a v-for="link in jumpLinks" :key="link.href" class="jump-link" :href="link.href">
            <span v-if="link.dot" class="era-dot" :class="link.dot" aria-hidden="true"></span>
            {{ link.label }}
          </a>
        </nav>
      </div>
    </section>

    <!-- ============ TIMELINE SPINE ============ -->
    <section class="timeline-section">
      <div class="wrap">
        <!-- Filter chips -->
        <div class="filter-row" role="group" aria-label="Filter by era">
          <span class="jump-label">{{ t('ui.timeline.filterLabel') }}</span>
          <button
              v-for="chip in filterChips"
              :key="chip.value"
              type="button"
              class="chip era-chip"
              :class="{'is-active': activeFilter === chip.value}"
              :aria-pressed="activeFilter === chip.value"
              @click="setFilter(chip.value)"
          >
            <span v-if="chip.value !== 'all'" class="era-dot" :class="`dot-${chip.value}`" aria-hidden="true"></span>
            {{ chip.label }}
          </button>
        </div>

        <div ref="spineRef" class="timeline">
          <!-- ERA BANDS + MILESTONES -->
          <template v-for="era in eras" :key="era.id">
            <div
                :id="`era-${era.id}`"
                class="era-band"
                :class="`band-${era.id}`"
                v-show="isVisible(era.id)"
            >
              <span class="band-pill">
                <h2>{{ eraName(era) }}</h2>
                <span class="band-range">{{ era.rangeMya[0] }} – {{ era.rangeMya[1] }} {{ t('ui.encyclopedia.units.ma') }}</span>
              </span>
              <p class="band-note">{{ eraDesc(era) }}</p>
            </div>

            <article
                v-for="m in milestonesByEra(era.id)"
                :key="m.key"
                class="tl-item"
                :class="[`n-${era.id}`, m.side]"
                v-show="isVisible(era.id)"
            >
              <span class="tl-dot" aria-hidden="true"></span>
              <div class="tl-card">
                <span class="tl-age">{{ m.mya }} {{ t('ui.encyclopedia.units.ma') }}</span>
                <h3>{{ m.label }}</h3>
                <p>{{ m.description }}</p>
              </div>
            </article>

            <!-- Era dinosaurs: final useful block per period -->
            <div
                v-if="eraDinos(era.id).length > 0"
                class="era-outro"
                :class="`n-${era.id}`"
                v-show="isVisible(era.id)"
            >
              <span class="outro-dot" aria-hidden="true"></span>
              <div class="outro-card dinos-card">
                <div class="dinos-head">
                  <h3>{{ t('ui.timeline.dinosaursOfEra', {era: eraName(era)}) }}</h3>
                  <span class="dinos-count">{{ eraDinos(era.id).length }} {{ t('ui.timeline.speciesFound') }}</span>
                </div>
                <div class="dinos-strip">
                  <router-link
                      v-for="d in eraDinos(era.id)"
                      :key="d.id"
                      :to="localRoute({name: 'encyclopedia-detail', params: {id: d.id}})"
                      class="dino-tile"
                  >
                    <div class="dino-tile-img"><DinoCardImage :dino="d" class="dino-tile-img-el"/></div>
                    <span class="dino-tile-name">{{ translateDino(d).name }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </template>

          <!-- K-Pg IMPACT MARKER -->
          <div id="impact" class="impact" v-show="isVisible('cretaceous')">
            <span class="impact-dot" aria-hidden="true"></span>
            <div class="impact-card">
              <span class="impact-streak" aria-hidden="true"></span>
              <span class="impact-tag">{{ t('ui.timeline.impactTag') }}</span>
              <h2>{{ t('ui.timeline.yearsAgo', {n: 66}) }}</h2>
              <p>{{ t('ui.timeline.extinctionText') }}</p>
              <ul class="impact-facts">
                <li v-for="fact in impactFacts" :key="fact.label">
                  <span class="fact-label">{{ fact.label }}</span>
                  <span class="fact-value">{{ fact.value }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Aftermath -->
          <p class="aftermath" v-show="isVisible('cretaceous')">
            <strong>{{ t('ui.timeline.aftermathLead') }}</strong>
            {{ t('ui.timeline.aftermath') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.timeline-page {
  min-height: 100vh;
}
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
      radial-gradient(90% 70% at 15% 0%, rgba(45, 138, 123, 0.12) 0%, transparent 55%),
      radial-gradient(90% 70% at 90% 100%, rgba(232, 93, 44, 0.12) 0%, transparent 55%),
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
  max-width: 58ch;
  text-wrap: pretty;
}

/* Jump links */
.jump-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1.6rem;
}
.jump-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-right: 0.2rem;
}
.jump-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  padding: 0.25rem 0.15rem;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.jump-link:hover {
  color: var(--color-brand-amber);
  border-bottom-color: rgba(212, 164, 58, 0.4);
}
.era-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: none;
}
.dot-triassic { background: var(--color-brand-teal); }
.dot-jurassic { background: var(--color-brand-moss); }
.dot-cretaceous { background: var(--color-brand-ember); }

/* ============ TIMELINE SECTION ============ */
.timeline-section {
  position: relative;
  padding-block: 2rem 5rem;
  /* scene tokens come from tokens.css (dark/light), no local overrides needed */
  background:
      repeating-linear-gradient(180deg, var(--tl-tex) 0px, var(--tl-tex) 2px, transparent 2px, transparent 78px),
      linear-gradient(180deg, var(--color-bg-base) 0%, var(--tl-deep-1) 45%, var(--tl-deep-2) 100%);
}

/* Filter chips */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin-bottom: 2.5rem;
}
.chip {
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.42rem 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.chip:hover {
  border-color: rgba(212, 164, 58, 0.35);
  color: var(--color-text-primary);
}
.chip.is-active {
  background: linear-gradient(135deg, var(--color-brand-amber), #b8862a);
  border-color: transparent;
  color: #1a1305;
}
.chip.is-active .era-dot {
  outline: 1.5px solid rgba(26, 19, 5, 0.4);
}

/* Spine */
.timeline {
  position: relative;
}
.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 2px;
  background: linear-gradient(180deg,
    var(--color-brand-teal) 0%, var(--color-brand-teal) 26%,
    var(--color-brand-moss) 34%, var(--color-brand-moss) 56%,
    var(--color-brand-ember) 64%, var(--color-brand-ember) 92%,
    rgba(139, 58, 42, 0.2) 100%);
  opacity: 0.55;
}

/* Era band header */
.era-band {
  position: relative;
  padding-left: 56px;
  margin-block: 2.2rem 1.4rem;
  scroll-margin-top: 96px;
}
.era-band:first-of-type {
  margin-top: 0;
}
.band-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 0.7rem;
  flex-wrap: wrap;
  border-radius: var(--radius-full);
  padding: 0.5rem 1.2rem;
  background: var(--band-bg);
  border: 1px solid var(--band-border);
}
.band-pill h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--band-fg);
  letter-spacing: 0.02em;
}
.band-range {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}
.band-note {
  color: var(--color-text-tertiary);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  max-width: 48ch;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.band-triassic {
  --band-bg: var(--band-bg-triassic);
  --band-border: var(--band-border-triassic);
  --band-fg: var(--era-fg-triassic);
}
.band-jurassic {
  --band-bg: var(--band-bg-jurassic);
  --band-border: var(--band-border-jurassic);
  --band-fg: var(--era-fg-jurassic);
}
.band-cretaceous {
  --band-bg: var(--band-bg-cretaceous);
  --band-border: var(--band-border-cretaceous);
  --band-fg: var(--era-fg-cretaceous);
}

/* Milestone card */
.tl-item {
  position: relative;
  padding-left: 56px;
  margin-bottom: 1.1rem;
}
.tl-dot {
  position: absolute;
  left: 11px;
  top: 24px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--node-color);
  border: 3px solid var(--color-bg-base);
  box-shadow: 0 0 12px var(--node-glow);
}
.tl-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.2rem 1.3rem;
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.tl-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--node-border);
}
.tl-age {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--node-color);
}
.tl-card h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.25rem;
}
.tl-card p {
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  margin-top: 0.4rem;
  text-wrap: pretty;
}
.n-triassic {
  --node-color: var(--era-fg-triassic);
  --node-glow: rgba(45, 138, 123, 0.5);
  --node-border: rgba(45, 138, 123, 0.5);
}
.n-jurassic {
  --node-color: var(--era-fg-jurassic);
  --node-glow: rgba(74, 124, 63, 0.5);
  --node-border: rgba(74, 124, 63, 0.55);
}
.n-cretaceous {
  --node-color: var(--era-fg-cretaceous);
  --node-glow: rgba(232, 93, 44, 0.5);
  --node-border: rgba(232, 93, 44, 0.5);
}

/* Era outro — final "key events" block at the end of each period */
.era-outro {
  position: relative;
  padding-left: 56px;
  margin-top: 1.4rem;
  margin-bottom: 0.5rem;
}
.era-outro .outro-dot {
  position: absolute;
  left: 11px;
  top: 22px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--node-color);
  border: 3px solid var(--color-bg-base);
  box-shadow: 0 0 12px var(--node-glow);
}
.outro-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-left: 3px solid var(--node-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.2rem 1.3rem;
}
.outro-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--node-color);
  letter-spacing: 0.02em;
  margin: 0;
}
.dinos-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}
.dinos-count {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.dinos-strip {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  margin-inline: -0.2rem;
  padding-inline: 0.2rem;
  scrollbar-width: thin;
}
.dino-tile {
  flex: none;
  width: 5.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
.dino-tile-img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 0.5rem;
  border: 2px solid var(--glass-border);
  background: var(--color-bg-deep);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.dino-tile:hover .dino-tile-img {
  border-color: var(--node-color);
  box-shadow: 0 0 12px var(--node-glow);
}
.dino-tile-img-el { width: 100%; height: 100%; }
.dino-tile-name {
  display: block;
  font-size: 0.75rem;
  line-height: 1.2;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}
.dino-tile:hover .dino-tile-name { color: var(--color-text-primary); }

/* ============ K-Pg IMPACT MARKER ============ */
.impact {
  position: relative;
  padding-left: 56px;
  margin-top: 2.5rem;
  scroll-margin-top: 96px;
}
.impact-dot {
  position: absolute;
  left: 5px;
  top: 40px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd9a8 0%, var(--color-brand-ember) 45%, var(--color-brand-lava) 100%);
  border: 3px solid var(--color-bg-base);
  box-shadow: 0 0 24px rgba(232, 93, 44, 0.8);
  animation: impactPulse 3.2s ease-in-out infinite;
}
@keyframes impactPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(232, 93, 44, 0.6); }
  50% { box-shadow: 0 0 40px rgba(232, 93, 44, 0.95); }
}
.impact-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(232, 93, 44, 0.45);
  box-shadow: var(--shadow-card);
  padding: clamp(1.5rem, 4vw, 2.6rem);
  background:
      radial-gradient(100% 120% at 90% 0%, var(--impact-rad-1) 0%, var(--impact-rad-2) 40%, transparent 70%),
      linear-gradient(200deg, var(--impact-scene-1) 0%, var(--impact-scene-2) 60%, var(--impact-scene-3) 100%);
}
.impact-streak {
  position: absolute;
  top: 8%;
  right: 6%;
  width: 190px;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(232, 93, 44, 0.75) 55%, #ffd9a8);
  border-radius: var(--radius-full);
  transform: rotate(38deg);
  filter: blur(0.4px);
  animation: streakIn 6s ease-in-out infinite;
}
.impact-streak::after {
  content: "";
  position: absolute;
  right: -5px;
  top: -4px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff0d8 0%, var(--color-brand-ember) 60%, transparent 100%);
}
@keyframes streakIn {
  0% { transform: rotate(38deg) translateX(-40px); opacity: 0; }
  25% { opacity: 1; }
  60% { transform: rotate(38deg) translateX(60px); opacity: 0; }
  100% { transform: rotate(38deg) translateX(60px); opacity: 0; }
}
.impact-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--impact-tag-bg);
  border: 1px solid var(--impact-tag-border);
  color: var(--impact-tag-fg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.32rem 0.8rem;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
}
.impact-card h2 {
  position: relative;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4.5vw, 2.6rem);
  font-weight: 700;
  background: linear-gradient(150deg, var(--impact-title-from) 25%, var(--color-brand-amber) 70%, var(--color-brand-ember) 105%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.impact-card p {
  position: relative;
  color: var(--color-text-secondary);
  margin-top: 0.7rem;
  max-width: 50ch;
  text-wrap: pretty;
}
.impact-facts {
  position: relative;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.6rem;
  list-style: none;
}
.impact-facts li {
  background: var(--input-bg);
  border: 1px solid rgba(232, 93, 44, 0.16);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
}
.fact-label {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.fact-value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-text-primary);
}

/* Aftermath */
.aftermath {
  position: relative;
  padding-left: 56px;
  margin-top: 1.6rem;
  color: var(--color-text-tertiary);
  font-size: 0.9rem;
}
.aftermath strong {
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 600;
}

/* ============ MOTION SAFETY ============ */
@media (prefers-reduced-motion: reduce) {
  .impact-streak { display: none; }
  .impact-dot { animation: none; }
}

/* ============ DESKTOP ≥1024px — centered spine, alternating cards ============ */
@media (min-width: 1024px) {
  .timeline::before {
    left: 50%;
    transform: translateX(-1px);
  }
  .era-band {
    padding: 1.15rem 1.5rem 1.3rem;
    text-align: center;
    margin-block: 3rem 1.8rem;
    background: var(--color-bg-elevated);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    max-width: 560px;
    margin-inline: auto;
    z-index: 1;
  }
  .band-pill {
    justify-content: center;
  }
  .band-note {
    margin-inline: auto;
  }
  .tl-item {
    width: calc(50% - 44px);
    padding-left: 0;
    margin-bottom: 1.4rem;
  }
  .tl-item.side-left {
    margin-right: auto;
    text-align: right;
  }
  .tl-item.side-right {
    margin-left: auto;
  }
  .tl-item.side-left .tl-dot {
    left: auto;
    right: -53px;
  }
  .tl-item.side-right .tl-dot {
    left: -53px;
  }
  .impact {
    padding-left: 0;
    margin-top: 4rem;
  }
  .impact-dot {
    left: 50%;
    transform: translateX(-50%);
    top: -46px;
  }
  .impact-facts {
    grid-template-columns: repeat(4, 1fr);
  }
  .aftermath {
    padding-left: 0;
    text-align: center;
    margin-top: 2rem;
  }
  .era-outro {
    padding-left: 0;
    max-width: 620px;
    margin-inline: auto;
  }
  .era-outro .outro-dot {
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }
}
</style>