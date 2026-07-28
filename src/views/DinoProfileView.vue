<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {dinosaurs} from '@/data/dinosaurs'
import {useDinoTranslator} from '@/composables/useDinoTranslation'
import {useLocale} from '@/composables/useLocale'
import {useModeStore} from '@/stores/useModeStore'
import {useSpeechSynthesis} from '@/composables/useSpeechSynthesis'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const {t, locale} = useI18n()
const route = useRoute()
const router = useRouter()
const {localRoute} = useLocale()
const modeStore = useModeStore()
const {translateDino} = useDinoTranslator()
const {isSupported: ttsSupported, isSpeaking, speak, stop} = useSpeechSynthesis()

const rawDino = computed(() => dinosaurs.find(d => d.id === route.params.id) ?? null)
const dino = computed(() => (rawDino.value ? translateDino(rawDino.value) : null))

// Pills accent classes (era / diet / size) — prototype palette
const ERA_PILL_CLASS: Record<string, string> = {
  triassic: 'pill-era-triassic',
  jurassic: 'pill-era-jurassic',
  cretaceous: 'pill-era-cretaceous',
}
const DIET_PILL_CLASS: Record<string, string> = {
  carnivore: 'pill-diet-carnivore',
  herbivore: 'pill-diet-herbivore',
  omnivore: 'pill-diet-omnivore',
}
const SIZE_PILL_CLASS: Record<string, string> = {
  small: 'pill-size-small',
  medium: 'pill-size-medium',
  large: 'pill-size-large',
  gigantic: 'pill-size-gigantic',
}

const activeImage = computed(() => rawDino.value?.images.hero)

// Meter fills — animate from 0 on mount
const mounted = ref(false)
onMounted(() => {
  nextTick(() => {
    mounted.value = true
  })
})
const dangerFill = computed(() => (rawDino.value ? rawDino.value.dangerLevel * 10 : 0))
const intelligenceFill = computed(() => (rawDino.value ? rawDino.value.intelligence * 10 : 0))
const birdFill = computed(() => (rawDino.value?.birdRelation ? 65 : 0))

// Stat strip — data-driven
const stats = computed(() => {
  const d = dino.value
  const r = rawDino.value
  if (!d || !r) return []
  const firstFact = d.facts[0]
  const firstYear = r.discoveries[0]?.year
  return [
    {tone: 'ember', value: `${r.periodRangeMya[0]}–${r.periodRangeMya[1]} Mya`, label: t('ui.encyclopedia.profile.statLived')},
    {tone: 'amber', value: firstFact?.value ?? '—', label: firstFact?.label ?? t('ui.encyclopedia.facts')},
    {tone: 'teal', value: `${r.dimensions.speedKmh} ${t('ui.compare.kmhUnit')}`, label: t('ui.compare.speedLabel')},
    {tone: 'moss', value: firstYear != null ? String(firstYear) : '—', label: t('ui.encyclopedia.profile.statFirstDescribed')},
  ]
})

// Related dinosaurs — lookup full records
const related = computed(() => {
  const d = dino.value
  if (!d) return []
  return d.relatedDinosaurs
      .map(r => {
        const found = dinosaurs.find(x => x.id === r.id)
        if (!found) return null
        return {dino: translateDino(found), relationship: r.relationship}
      })
      .filter(Boolean) as {dino: ReturnType<typeof translateDino>, relationship: string}[]
})

// Taxonomy rows — scientific rank labels are kept as-is (Latin-derived)
const taxonomyRows = computed(() => {
  const tx = rawDino.value?.taxonomy
  if (!tx) return []
  return [
    {rk: t('ui.encyclopedia.taxonomyRanks.clade'), tv: tx.clade},
    {rk: t('ui.encyclopedia.taxonomyRanks.order'), tv: tx.order},
    {rk: t('ui.encyclopedia.taxonomyRanks.suborder'), tv: tx.suborder},
    {rk: t('ui.encyclopedia.taxonomyRanks.family'), tv: tx.family},
    {rk: t('ui.encyclopedia.taxonomyRanks.genus'), tv: tx.genus},
    {rk: t('ui.encyclopedia.taxonomyRanks.species'), tv: `${tx.genus[0] ?? ''}. ${tx.species}`},
  ].filter(r => r.tv)
})

// Discovery list
const discoveryItems = computed(() => {
  const d = dino.value
  if (!d) return []
  const items: {yr: string, txt: string}[] = []
  for (const disc of d.discoveries) {
    items.push({yr: String(disc.year), txt: `${disc.discoveredBy} — ${disc.note}`})
  }
  for (const fl of d.fossilLocations) {
    items.push({yr: fl.country, txt: `${fl.region}${fl.specimenName ? ` · ${fl.specimenName}` : ''}`})
  }
  return items
})

const livedInText = computed(() => {
  const d = rawDino.value
  if (!d) return ''
  return d.livedIn.map(loc => t(`ui.encyclopedia.locations.${loc}`, loc)).join(', ')
})

const description = computed(() => {
  const d = dino.value
  if (!d) return ''
  return modeStore.isKidsMode ? d.kidsDescription : d.description
})

const ttsText = computed(() => {
  const d = dino.value
  const r = rawDino.value
  if (!d || !r) return ''
  const facts = d.facts.map((f, i) => `${t('ui.encyclopedia.ttsFact', {n: i + 1})}. ${f.label}: ${f.value}. ${f.description}`).join('. ')
  return [
    d.displayName,
    description.value,
    t('ui.encyclopedia.dimensionsText', {length: r.dimensions.lengthMeters, height: r.dimensions.heightMeters}),
    `${r.dimensions.weightKg.toLocaleString()} ${t('ui.compare.kgUnit')}.`,
    t('ui.encyclopedia.speedText', {speed: `${r.dimensions.speedKmh} ${t('ui.compare.kmhUnit')}`}),
    facts,
    d.funFact,
  ].filter(Boolean).join('. ')
})

function toggleSpeech() {
  if (isSpeaking.value) {
    stop()
  } else {
    speak(ttsText.value, locale.value)
  }
}

function goToCompare() {
  if (!rawDino.value) return
  router.push(localRoute({name: 'compare', query: {a: rawDino.value.id}}))
}

function openRelated(id: string) {
  router.push(localRoute({name: 'encyclopedia-detail', params: {id}}))
}

watch(() => route.params.id, () => stop())
</script>

<template>
  <div v-if="dino && rawDino" class="profile-page">
    <SeoHead :title="dino.displayName" :description="dino.description"/>

    <!-- ============ PROFILE HERO ============ -->
    <section class="prof-hero" aria-label="Specimen profile">
      <div class="wrap">
        <nav class="crumb" aria-label="Breadcrumb">
          <router-link :to="localRoute({name: 'encyclopedia'})">{{ t('ui.nav.encyclopedia') }}</router-link>
          <span class="sep">/</span>
          <span>{{ t(`ui.encyclopedia.${rawDino.era}`) }}</span>
          <span class="sep">/</span>
          <span class="cur">{{ dino.displayName }}</span>
        </nav>

        <div class="prof-grid">
          <!-- LEFT: media -->
          <div class="prof-media">
            <div class="prof-image">
              <div class="prof-pills">
                <span class="pill" :class="ERA_PILL_CLASS[rawDino.era]">{{ t(`ui.encyclopedia.${rawDino.era}`) }}</span>
                <span class="pill" :class="DIET_PILL_CLASS[rawDino.diet]">{{ t(`ui.encyclopedia.${rawDino.diet}`) }}</span>
                <span class="pill" :class="SIZE_PILL_CLASS[rawDino.size]">{{ t(`ui.encyclopedia.${rawDino.size}`) }}</span>
              </div>
              <img v-if="activeImage" :src="activeImage" :alt="dino.displayName" width="900" height="700">
            </div>
          </div>

          <!-- RIGHT: info -->
          <div class="prof-info">
            <div class="prof-titleblock">
              <h1 class="prof-name">{{ dino.displayName }}</h1>
              <p class="prof-pron">{{ dino.pronunciation }}</p>
              <p class="prof-meaning">{{ dino.nameMeaning }}</p>
            </div>

            <div class="prof-tools">
              <button
                  v-if="ttsSupported"
                  type="button"
                  class="btn btn-secondary"
                  :aria-pressed="isSpeaking"
                  @click="toggleSpeech"
              >
                <BaseIcon :name="isSpeaking ? 'volume-x' : 'volume-2'" :size="18"/>
                {{ isSpeaking ? t('ui.encyclopedia.ttsStop') : t('ui.encyclopedia.ttsPlay') }}
              </button>
              <button type="button" class="btn btn-ghost" @click="goToCompare">
                <BaseIcon name="scale" :size="18"/>
                {{ t('ui.nav.compare') }}
              </button>
            </div>

            <p class="prof-desc">{{ description }}</p>

            <ul class="dim-list">
              <li>
                <span class="dim-ico"><BaseIcon name="ruler" :size="17"/></span>
                {{ t('ui.compare.lengthLabel') }} <strong>{{ dino.dimensions.lengthMeters }} {{ t('ui.compare.metersUnit') }}</strong>
                · {{ t('ui.compare.heightLabel') }} <strong>{{ dino.dimensions.heightMeters }} {{ t('ui.compare.metersUnit') }}</strong>
              </li>
              <li>
                <span class="dim-ico"><BaseIcon name="weight" :size="17"/></span>
                {{ t('ui.compare.weightLabel') }} <strong>{{ dino.dimensions.weightKg.toLocaleString() }} {{ t('ui.compare.kgUnit') }}</strong>
              </li>
              <li>
                <span class="dim-ico"><BaseIcon name="zap" :size="17"/></span>
                {{ t('ui.compare.speedLabel') }} <strong>{{ dino.dimensions.speedKmh }} {{ t('ui.compare.kmhUnit') }}</strong>
              </li>
              <li v-if="livedInText">
                <span class="dim-ico"><BaseIcon name="map-pin" :size="17"/></span>
                {{ t('ui.encyclopedia.profile.dimLivedIn') }} <strong>{{ livedInText }}</strong>
              </li>
            </ul>

            <div class="meters">
              <div class="meter">
                <div class="meter-row">
                  <span class="label">{{ t('ui.compare.dangerLevel') }}</span>
                  <span class="val">{{ rawDino.dangerLevel }} / 10</span>
                </div>
                <div class="meter-track">
                  <div class="meter-fill ember" :style="{width: mounted ? dangerFill + '%' : '0'}"></div>
                </div>
              </div>
              <div class="meter">
                <div class="meter-row">
                  <span class="label">{{ t('ui.compare.intelligence') }}</span>
                  <span class="val">{{ rawDino.intelligence }} / 10</span>
                </div>
                <div class="meter-track">
                  <div class="meter-fill" :style="{width: mounted ? intelligenceFill + '%' : '0'}"></div>
                </div>
              </div>
              <div v-if="rawDino.birdRelation" class="meter">
                <div class="meter-row">
                  <span class="label">{{ t('ui.encyclopedia.profile.meterBirdRelation') }}</span>
                  <span class="val">{{ rawDino.birdRelation }}</span>
                </div>
                <div class="meter-track">
                  <div class="meter-fill teal" :style="{width: mounted ? birdFill + '%' : '0'}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ STAT STRIP ============ -->
    <section class="section no-top">
      <div class="wrap">
        <div class="stat-strip">
          <div v-for="s in stats" :key="s.label" class="stat-tile" :class="s.tone">
            <div class="sv">{{ s.value }}</div>
            <div class="sl">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FACTS ============ -->
    <section v-if="rawDino.facts.length" class="section no-top">
      <div class="wrap">
        <div class="section-head">
          <span class="kicker">{{ t('ui.home.didYouKnow') }}</span>
          <h2>{{ t('ui.encyclopedia.facts') }}</h2>
        </div>
        <div class="facts-grid">
          <article v-for="fact in dino.facts" :key="fact.label" class="fact-card">
            <div class="fact-head">
              <span class="fact-ico"><BaseIcon :name="fact.icon" :size="20"/></span>
              <h3>{{ fact.label }}</h3>
            </div>
            <div class="fact-val">{{ fact.value }}</div>
            <p>{{ fact.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============ FUN FACT ============ -->
    <section v-if="dino.funFact" class="section no-top">
      <div class="wrap">
        <div class="funfact">
            <span class="funfact-emoji" aria-hidden="true">🦖</span>
          <div>
            <span class="kicker ember">{{ t('ui.encyclopedia.funFact') }}</span>
            <p>{{ dino.funFact }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TAXONOMY + DISCOVERY ============ -->
    <section v-if="taxonomyRows.length || discoveryItems.length" class="section no-top">
      <div class="wrap">
        <div class="two-col">
          <div v-if="taxonomyRows.length" class="panel">
            <h3>{{ t('ui.encyclopedia.taxonomy') }}</h3>
            <ul class="taxonomy">
              <li v-for="row in taxonomyRows" :key="row.rk">
                <span class="rk">{{ row.rk }}</span>
                <span class="tv">{{ row.tv }}</span>
              </li>
            </ul>
          </div>
          <div v-if="discoveryItems.length" class="panel">
            <h3>{{ t('ui.encyclopedia.profile.discovery') }}</h3>
            <ul class="disc-list">
              <li v-for="(item, i) in discoveryItems" :key="i">
                <span class="dot"></span>
                <div><span class="yr">{{ item.yr }}</span> — {{ item.txt }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ RELATED ============ -->
    <section v-if="related.length" class="section no-top">
      <div class="wrap">
        <div class="section-head">
          <span class="kicker">{{ t('ui.encyclopedia.profile.familyTree') }}</span>
          <h2>{{ t('ui.encyclopedia.relatedDinosaurs') }}</h2>
        </div>
        <div class="related-grid">
          <a
              v-for="rel in related"
              :key="rel.dino.id"
              class="related-card"
              href="javascript:void(0)"
              @click="openRelated(rel.dino.id)"
          >
            <img :src="rel.dino.images.card" :alt="rel.dino.displayName" loading="lazy">
            <div>
              <h4>{{ rel.dino.displayName }}</h4>
              <p class="rel">{{ rel.relationship }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ============ COMPARE CTA ============ -->
    <section class="section no-top">
      <div class="wrap">
        <div class="compare-cta">
          <div>
            <div class="ct">{{ t('ui.encyclopedia.profile.compareCta', {name: dino.displayName}) }}</div>
            <p>{{ t('ui.encyclopedia.profile.compareCtaDesc') }}</p>
          </div>
          <div class="cta-actions">
            <BaseButton variant="primary" icon-right="arrow-right" @click="goToCompare">
              {{ t('ui.encyclopedia.profile.compareWithAnother') }}
            </BaseButton>
            <router-link :to="localRoute({name: 'encyclopedia'})" class="btn btn-ghost">
              {{ t('ui.encyclopedia.profile.backToEncyclopedia') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Not found -->
  <div v-else class="not-found">
    <SeoHead :title="t('ui.encyclopedia.profile.notFound')"/>
    <div class="wrap nf-card">
      <p>{{ t('ui.encyclopedia.profile.notFound') }}</p>
      <router-link :to="localRoute({name: 'encyclopedia'})" class="btn btn-secondary">
        {{ t('ui.encyclopedia.profile.backToEncyclopedia') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
}
.wrap {
  width: min(var(--wrap, 1160px), 100% - 2.5rem);
  margin-inline: auto;
}

/* ============ HERO ============ */
.prof-hero {
  position: relative;
  padding-block: clamp(1rem, 3vw, 2rem) var(--space-section, clamp(3rem, 8vw, 5.5rem));
  overflow: hidden;
  background:
      radial-gradient(80% 60% at 80% 0%, rgba(232, 93, 44, 0.1) 0%, transparent 60%),
      radial-gradient(60% 50% at 10% 20%, rgba(212, 164, 58, 0.06) 0%, transparent 60%),
      linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-deep) 100%);
}
.crumb {
  padding-block: 1.1rem 0;
  color: var(--color-text-tertiary);
  font-size: 0.85rem;
}
.crumb a {
  text-decoration: none;
  color: var(--color-text-secondary);
}
.crumb a:hover {
  color: var(--color-brand-amber);
}
.crumb .sep {
  margin-inline: 0.5rem;
  opacity: 0.5;
}
.crumb .cur {
  color: var(--color-text-secondary);
}

.prof-grid {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
}
.prof-media {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.prof-image {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-modal);
}
.prof-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.prof-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, var(--media-fade) 100%);
  pointer-events: none;
}
.prof-pills {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.pill {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  backdrop-filter: blur(6px);
}
.pill-era-triassic { background: rgba(45, 138, 123, 0.18); color: #6fd0bd; border: 1px solid rgba(45, 138, 123, 0.4); }
.pill-era-jurassic { background: rgba(74, 124, 63, 0.18); color: #97cc85; border: 1px solid rgba(74, 124, 63, 0.4); }
.pill-era-cretaceous { background: rgba(232, 93, 44, 0.18); color: #f5b08e; border: 1px solid rgba(232, 93, 44, 0.4); }
.pill-diet-carnivore { background: rgba(232, 93, 44, 0.12); color: #f39469; border: 1px solid rgba(232, 93, 44, 0.3); }
.pill-diet-herbivore { background: rgba(74, 124, 63, 0.14); color: #8cc47a; border: 1px solid rgba(74, 124, 63, 0.3); }
.pill-diet-omnivore { background: rgba(196, 168, 124, 0.14); color: var(--color-brand-sand); border: 1px solid rgba(196, 168, 124, 0.3); }
.pill-size-small { background: rgba(45, 138, 123, 0.14); color: #6fd0bd; border: 1px solid rgba(45, 138, 123, 0.3); }
.pill-size-medium { background: rgba(74, 124, 63, 0.14); color: #8cc47a; border: 1px solid rgba(74, 124, 63, 0.3); }
.pill-size-large { background: rgba(212, 164, 58, 0.14); color: var(--color-brand-amber); border: 1px solid rgba(212, 164, 58, 0.3); }
.pill-size-gigantic { background: rgba(139, 58, 42, 0.22); color: #d97e64; border: 1px solid rgba(139, 58, 42, 0.5); }
:global(html[data-theme='light']) .pill-era-cretaceous { background: rgba(191, 69, 23, 0.14); border-color: rgba(191, 69, 23, 0.45); color: #bf4517; }
:global(html[data-theme='light']) .pill-diet-carnivore { background: rgba(191, 69, 23, 0.1); border-color: rgba(191, 69, 23, 0.35); color: #bf4517; }
:global(html[data-theme='light']) .pill-size-gigantic { background: rgba(122, 47, 32, 0.16); border-color: rgba(122, 47, 32, 0.5); color: #7a2f20; }

.prof-info {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.prof-name {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.prof-pron {
  font-style: italic;
  color: var(--color-text-tertiary);
  font-size: 1rem;
  margin-top: 0.35rem;
}
.prof-meaning {
  color: var(--color-brand-amber);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.prof-tools {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.prof-desc {
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  max-width: 56ch;
}

/* buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-full);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.btn:active {
  transform: translateY(1px);
}
.btn-secondary {
  background: var(--secondary-btn-bg);
  color: var(--color-text-primary);
  border: 1px solid rgba(212, 164, 58, 0.35);
  backdrop-filter: blur(8px);
}
.btn-secondary:hover {
  border-color: var(--color-brand-amber);
  box-shadow: 0 0 20px rgba(212, 164, 58, 0.18);
  transform: translateY(-2px);
}
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--glass-border);
}
.btn-ghost:hover {
  color: var(--color-brand-amber);
  border-color: rgba(212, 164, 58, 0.4);
}

/* dimensions list */
.dim-list {
  display: grid;
  gap: 0.7rem;
  list-style: none;
}
.dim-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
.dim-ico {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-overlay);
  border: 1px solid var(--glass-border);
  color: var(--color-brand-amber);
  flex: none;
}
.dim-list strong {
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: 600;
}

/* meters */
.meters {
  display: grid;
  gap: 1rem;
}
.meter {
  display: grid;
  gap: 0.4rem;
}
.meter-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.85rem;
}
.meter-row .label {
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
}
.meter-row .val {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-text-primary);
}
.meter-track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-bg-overlay);
  border: 1px solid var(--glass-border);
  overflow: hidden;
}
.meter-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-brand-amber), var(--color-brand-ember));
  width: 0;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.meter-fill.ember {
  background: linear-gradient(90deg, var(--color-brand-ember), var(--color-brand-lava));
}
.meter-fill.teal {
  background: linear-gradient(90deg, var(--color-brand-teal), #4fb3a2);
}

/* sections */
.section {
  padding-block: var(--space-section, clamp(3rem, 8vw, 5.5rem));
  position: relative;
}
.section.no-top {
  padding-top: 0;
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
.kicker.ember {
  color: var(--color-brand-ember);
}
.kicker.ember::before {
  background: var(--color-brand-ember);
}
.section-head {
  max-width: 640px;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
}
.section-head h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 600;
  margin-top: 0.6rem;
}

/* stat strip */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
}
.stat-tile {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-card);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 96px;
}
.stat-tile .sv {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--color-text-primary);
  line-height: 1;
}
.stat-tile .sl {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-top: 0.45rem;
}
.stat-tile.amber .sv { color: var(--color-brand-amber); }
.stat-tile.ember .sv { color: var(--color-brand-ember); }
.stat-tile.teal .sv { color: var(--color-brand-teal); }
.stat-tile.moss .sv { color: #8cc47a; }
:global(html[data-theme='light']) .stat-tile.moss .sv { color: #3f6a35; }

/* facts */
.facts-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.fact-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.4rem;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.fact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(212, 164, 58, 0.32);
}
.fact-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}
.fact-ico {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(212, 164, 58, 0.12);
  color: var(--color-brand-amber);
  flex: none;
}
.fact-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
}
.fact-val {
  color: var(--color-brand-amber);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.4rem;
}
.fact-card p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* fun fact */
.funfact {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--funfact-profile-border);
  background: linear-gradient(135deg, var(--funfact-profile-bg-from), var(--funfact-profile-bg-to));
  box-shadow: 0 4px 24px var(--funfact-profile-glow);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
.funfact::before {
  content: "";
  position: absolute;
  right: -40px;
  top: -40px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, var(--funfact-profile-glow), transparent 65%);
  pointer-events: none;
}
.funfact-emoji {
  font-size: 2.6rem;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(232, 93, 44, 0.4));
}
.funfact p {
  font-size: clamp(1.05rem, 2.4vw, 1.3rem);
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--funfact-profile-text);
  margin-top: 0.5rem;
  max-width: 60ch;
}
.funfact .kicker.ember {
  color: var(--funfact-profile-kicker);
}

/* taxonomy + discovery */
.two-col {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.panel {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
}
.panel h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.taxonomy {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}
.taxonomy li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  background: var(--color-bg-overlay);
  border: 1px solid rgba(212, 164, 58, 0.06);
  font-size: 0.9rem;
}
.taxonomy .rk {
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
}
.taxonomy .tv {
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: 500;
}
.disc-list {
  list-style: none;
  display: grid;
  gap: 0.8rem;
}
.disc-list li {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
}
.disc-list .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-brand-amber);
  margin-top: 6px;
  flex: none;
  box-shadow: 0 0 8px rgba(212, 164, 58, 0.5);
}
.disc-list .yr {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-brand-amber);
}
.disc-list .txt {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* related */
.related-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.related-card {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  text-decoration: none;
  background: var(--color-bg-elevated);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 0.9rem;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.related-card:hover {
  transform: translateY(-3px);
  border-color: rgba(212, 164, 58, 0.35);
  box-shadow: var(--shadow-card-hover);
}
.related-card img {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  object-fit: cover;
  flex: none;
}
.related-card h4 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
}
.related-card .rel {
  color: var(--color-text-tertiary);
  font-size: 0.78rem;
  margin-top: 0.15rem;
}

/* compare CTA */
.compare-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(45, 138, 123, 0.1), rgba(74, 124, 63, 0.06));
  border: 1px solid rgba(45, 138, 123, 0.3);
  border-radius: var(--radius-xl);
  padding: clamp(1.4rem, 4vw, 2rem);
}
.compare-cta .ct {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
}
.compare-cta p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-top: 0.25rem;
  max-width: 48ch;
}
.cta-actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

/* not found */
.not-found {
  padding-block: clamp(4rem, 12vw, 8rem);
}
.nf-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-text-secondary);
}

/* breakpoints */
@media (min-width: 700px) {
  .stat-strip { grid-template-columns: repeat(4, 1fr); }
  .facts-grid { grid-template-columns: repeat(2, 1fr); }
  .two-col { grid-template-columns: 1fr 1fr; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .prof-grid { grid-template-columns: 1.05fr 0.95fr; }
  .prof-media { position: sticky; top: 84px; }
}

@media (prefers-reduced-motion: reduce) {
  .meter-fill { transition: none; }
}
</style>