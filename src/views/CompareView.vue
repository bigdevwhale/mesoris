<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useComparisonStore } from '@/stores/useComparisonStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { dinosaurs } from '@/data/dinosaurs'
import type { ComparisonStat } from '@/types/comparison'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const store = useComparisonStore()
const route = useRoute()
const { t } = useI18n()
const { translateDino } = useDinoTranslator()

// Pre-fill slot A when navigating from a dino card (/compare?a=id)
watch(() => route.query.a as string | undefined, (id) => {
  if (id) store.selectA(id)
}, { immediate: true })

// Options exclude whichever dino is already picked for the other slot, so the
// same specimen can't occupy both sides.
const dinoOptions = computed(() =>
  dinosaurs
    .filter(d => d.id !== store.dinoIdA && d.id !== store.dinoIdB)
    .map(d => ({ label: translateDino(d).name, value: d.id })),
)

const comparison = computed(() => store.comparisonResult)
const translatedDinoA = computed(() => store.dinosaurA ? translateDino(store.dinosaurA) : null)
const translatedDinoB = computed(() => store.dinosaurB ? translateDino(store.dinosaurB) : null)
const translatedComparison = computed(() => {
  if (!comparison.value) return null
  return {
    ...comparison.value,
    dinosaurA: translateDino(comparison.value.dinosaurA),
    dinosaurB: translateDino(comparison.value.dinosaurB),
  }
})

// Animate the stat bars each time a fresh comparison appears.
const revealed = ref(false)
watch(() => store.bothSelected, (selected) => {
  revealed.value = false
  if (selected) {
    nextTick(() => requestAnimationFrame(() => { revealed.value = true }))
  }
})

type Side = 'a' | 'b' | 'tie'
function winnerOf(stat: ComparisonStat): Side {
  if (stat.valueA === stat.valueB) return 'tie'
  const aWins = stat.higherIsBetter ? stat.valueA > stat.valueB : stat.valueA < stat.valueB
  return aWins ? 'a' : 'b'
}

function barWidth(pct: number) {
  return revealed.value ? `${Math.max(pct, 4)}%` : '0%'
}

function unitKey(stat: ComparisonStat) {
  if (stat.unit === 'kg') return 'kgUnit'
  if (stat.unit === 'km/h') return 'kmhUnit'
  return 'metersUnit'
}
function statUnit(stat: ComparisonStat) {
  return t(`ui.compare.${unitKey(stat)}`)
}

function fmtValue(v: number) {
  return v.toLocaleString()
}

type Row =
  | { key: string; kind: 'num'; label: string; unit: string; valueA: number; valueB: number; pctA: number; pctB: number; winner: Side }
  | { key: string; kind: 'diet'; label: string; dietA: string; dietB: string }
  | { key: string; kind: 'era'; label: string; eraA: string; eraB: string }

const rows = computed<Row[]>(() => {
  const c = translatedComparison.value
  if (!c) return []
  const a = c.dinosaurA
  const b = c.dinosaurB
  const byLabel = Object.fromEntries(c.stats.map(s => [s.label, s]))
  const out: Row[] = []
  const pushNum = (label: string) => {
    const s = byLabel[label]
    if (!s) return
    out.push({
      key: label, kind: 'num', label: t(`ui.compare.${label}Label`), unit: statUnit(s),
      valueA: s.valueA, valueB: s.valueB, pctA: s.percentageA, pctB: s.percentageB, winner: winnerOf(s),
    })
  }
  pushNum('length')
  pushNum('weight')
  out.push({ key: 'diet', kind: 'diet', label: t('ui.compare.dietLabel'), dietA: a.diet, dietB: b.diet })
  out.push({ key: 'era', kind: 'era', label: t('ui.compare.eraLabel'), eraA: t(`ui.encyclopedia.${a.era}`), eraB: t(`ui.encyclopedia.${b.era}`) })
  pushNum('height')
  pushNum('speed')
  return out
})

// "Did you know?" — surface the stat with the biggest gap, composed from
// existing localized keys so no extra i18n strings are needed.
const dykFact = computed(() => {
  const c = translatedComparison.value
  if (!c || c.stats.length === 0) return ''
  const s = [...c.stats].sort((x, y) =>
    Math.abs(y.percentageA - y.percentageB) - Math.abs(x.percentageA - x.percentageB),
  )[0]
  const w = winnerOf(s)
  const winnerName = w === 'b' ? c.dinosaurB.name : c.dinosaurA.name
  const loserName = w === 'b' ? c.dinosaurA.name : c.dinosaurB.name
  const wVal = w === 'b' ? s.valueB : s.valueA
  const lVal = w === 'b' ? s.valueA : s.valueB
  const label = t(`ui.compare.${s.label}Label`)
  const unit = statUnit(s)
  const vs = t('ui.compare.vs')
  return `${winnerName} · ${label} ${fmtValue(wVal)} ${unit} ${vs} ${loserName} · ${fmtValue(lVal)} ${unit}`
})

// Proportional height visual: scale so the tallest subject (either dino, or the
// 1.7 m human reference) fills up to 220px, keeping all three to scale.
const heightVisual = computed(() => {
  const c = translatedComparison.value
  if (!c) return null
  const aH = c.dinosaurA.dimensions.heightMeters
  const bH = c.dinosaurB.dimensions.heightMeters
  const human = 1.7
  const maxH = Math.max(aH, bH, human)
  const pxPerM = 220 / maxH
  return {
    aPx: Math.round(aH * pxPerM),
    bPx: Math.round(bH * pxPerM),
    humanPx: Math.round(human * pxPerM),
    aH, bH, human,
  }
})

function pickRandomPair() {
  const pool = [...dinosaurs]
  // Fisher–Yates is overkill for two picks; just draw two distinct indices.
  const i = Math.floor(Math.random() * pool.length)
  let j = Math.floor(Math.random() * pool.length)
  while (j === i) j = Math.floor(Math.random() * pool.length)
  store.selectA(pool[i].id)
  store.selectB(pool[j].id)
}
</script>

<template>
  <div class="compare-page">
    <SeoHead :title="t('ui.compare.title')" :description="t('ui.compare.description')"/>

    <!-- ============ PAGE HEAD ============ -->
    <section class="page-head">
      <div class="wrap">
        <span class="kicker">{{ t('ui.nav.compare') }}</span>
        <h1>{{ t('ui.compare.title') }}</h1>
        <p class="lede">{{ t('ui.compare.subtitle') }}</p>
      </div>
    </section>

    <!-- ============ COMPARE SECTION ============ -->
    <section class="compare-section">
      <div class="wrap">

        <!-- Toolbar -->
        <div class="compare-toolbar">
          <BaseButton
            variant="ghost"
            size="sm"
            icon="arrow-left-right"
            :disabled="!store.bothSelected"
            @click="store.swap()"
          >
            {{ t('ui.compare.swap') }}
          </BaseButton>
          <BaseButton variant="primary" size="sm" icon="shuffle" @click="pickRandomPair()">
            {{ t('ui.compare.randomPair') }}
          </BaseButton>
        </div>

        <!-- Selection panels -->
        <div class="compare-arena">
          <!-- Panel A -->
          <div class="compare-panel side-a" :class="{ 'is-filled': !!store.dinoIdA }">
            <span class="panel-slot"><span class="dot" aria-hidden="true"></span>{{ t('ui.compare.dinoA') }}</span>
            <div class="panel-portrait">
              <DinoCardImage v-if="store.dinosaurA" :dino="store.dinosaurA" class="panel-portrait-img"/>
              <span v-else class="glyph" aria-hidden="true">🦖</span>
            </div>
            <div class="panel-body">
              <BaseSelect
                :model-value="store.dinoIdA ?? ''"
                :options="dinoOptions"
                :placeholder="t('ui.compare.chooseDino')"
                @update:model-value="store.selectA($event)"
              />
              <div v-if="translatedDinoA" class="panel-info">
                <h2 class="panel-name">{{ translatedDinoA.name }}</h2>
                <div class="panel-pills">
                  <span class="pill pill-era">{{ t(`ui.encyclopedia.${translatedDinoA.era}`) }}</span>
                  <span class="pill pill-diet">{{ t(`ui.encyclopedia.${translatedDinoA.diet}`) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- VS divider -->
          <div class="compare-vs" aria-hidden="true">
            <span class="vs-badge">{{ t('ui.compare.vs') }}</span>
          </div>

          <!-- Panel B -->
          <div class="compare-panel side-b" :class="{ 'is-filled': !!store.dinoIdB }">
            <span class="panel-slot"><span class="dot" aria-hidden="true"></span>{{ t('ui.compare.dinoB') }}</span>
            <div class="panel-portrait">
              <DinoCardImage v-if="store.dinosaurB" :dino="store.dinosaurB" class="panel-portrait-img"/>
              <span v-else class="glyph" aria-hidden="true">🦕</span>
            </div>
            <div class="panel-body">
              <BaseSelect
                :model-value="store.dinoIdB ?? ''"
                :options="dinoOptions"
                :placeholder="t('ui.compare.chooseDino')"
                @update:model-value="store.selectB($event)"
              />
              <div v-if="translatedDinoB" class="panel-info">
                <h2 class="panel-name">{{ translatedDinoB.name }}</h2>
                <div class="panel-pills">
                  <span class="pill pill-era">{{ t(`ui.encyclopedia.${translatedDinoB.era}`) }}</span>
                  <span class="pill pill-diet">{{ t(`ui.encyclopedia.${translatedDinoB.diet}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison table -->
        <div v-if="translatedComparison" class="compare-table-wrap">
          <div class="compare-legend">
            <span class="legend-name legend-a">
              <span class="dot" aria-hidden="true"></span>
              <span>{{ translatedComparison.dinosaurA.name }}</span>
            </span>
            <span class="legend-name legend-b">
              <span class="dot" aria-hidden="true"></span>
              <span>{{ translatedComparison.dinosaurB.name }}</span>
            </span>
          </div>

          <div
            v-for="row in rows"
            :key="row.key"
            class="compare-row"
          >
            <div class="row-head">
              <span class="row-label">{{ row.label }}<template v-if="row.kind === 'num'"> · {{ row.unit }}</template></span>
            </div>

            <!-- A line -->
            <div class="cmp-line cmp-a">
              <span class="cmp-dot" aria-hidden="true"></span>
              <template v-if="row.kind === 'num'">
                <div class="cmp-track">
                  <div class="cmp-fill" :class="{ win: row.winner === 'a' }" :style="{ width: barWidth(row.pctA) }"></div>
                </div>
                <span class="cmp-value" :class="{ win: row.winner === 'a' }">{{ fmtValue(row.valueA) }}</span>
              </template>
              <span v-else-if="row.kind === 'diet'" class="diet-chip" :class="row.dietA">{{ t(`ui.encyclopedia.${row.dietA}`) }}</span>
              <span v-else class="cmp-text">{{ row.eraA }}</span>
            </div>

            <!-- B line -->
            <div class="cmp-line cmp-b">
              <span class="cmp-dot" aria-hidden="true"></span>
              <template v-if="row.kind === 'num'">
                <div class="cmp-track">
                  <div class="cmp-fill" :class="{ win: row.winner === 'b' }" :style="{ width: barWidth(row.pctB) }"></div>
                </div>
                <span class="cmp-value" :class="{ win: row.winner === 'b' }">{{ fmtValue(row.valueB) }}</span>
              </template>
              <span v-else-if="row.kind === 'diet'" class="diet-chip" :class="row.dietB">{{ t(`ui.encyclopedia.${row.dietB}`) }}</span>
              <span v-else class="cmp-text">{{ row.eraB }}</span>
            </div>
          </div>
        </div>

        <!-- Height comparison visual (vs a 1.7 m human) -->
        <div v-if="translatedComparison && heightVisual" class="height-card">
          <h2 class="block-title">{{ t('ui.compare.heightComparison') }}</h2>
          <div class="height-stage">
            <div class="height-col">
              <div class="height-figure fig-a" :style="{ height: `${heightVisual.aPx}px` }"></div>
              <div class="height-label">
                <div class="height-name">{{ translatedComparison.dinosaurA.name }}</div>
                <div class="height-m">{{ heightVisual.aH }} m</div>
              </div>
            </div>
            <div class="height-col">
              <div class="height-figure fig-human" :style="{ height: `${heightVisual.humanPx}px` }"></div>
              <div class="height-label">
                <div class="height-name">{{ t('ui.compare.human') }}</div>
                <div class="height-m">1.7 m</div>
              </div>
            </div>
            <div class="height-col">
              <div class="height-figure fig-b" :style="{ height: `${heightVisual.bPx}px` }"></div>
              <div class="height-label">
                <div class="height-name">{{ translatedComparison.dinosaurB.name }}</div>
                <div class="height-m">{{ heightVisual.bH }} m</div>
              </div>
            </div>
            <div class="ground-line" aria-hidden="true"></div>
          </div>
        </div>

        <!-- Did you know strip -->
        <div v-if="translatedComparison && dykFact" class="dyk-strip" aria-live="polite">
          <span class="dyk-glyph" aria-hidden="true">💡</span>
          <p>{{ dykFact }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="!store.dinoIdA && !store.dinoIdB" class="empty">
          <div class="empty-glyph" aria-hidden="true">⚖️</div>
          <h2 class="empty-title">{{ t('ui.compare.selectTwo') }}</h2>
          <p class="empty-text">{{ t('ui.compare.selectTwoDesc') }}</p>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.compare-page { min-height: 100vh; }
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
  max-width: 58ch;
  text-wrap: pretty;
}

/* ============ COMPARE SECTION ============ */
.compare-section { padding-block: 2.5rem 5rem; }

/* ── Toolbar ───────────────────────────────────────────── */
.compare-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-bottom: 1.75rem;
}

/* ── Arena + panels ────────────────────────────────────── */
.compare-arena {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: stretch;
}
.compare-panel {
  --panel-accent: var(--color-brand-amber);
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.side-b { --panel-accent: var(--color-brand-teal); }
.compare-panel.is-filled {
  border-color: color-mix(in srgb, var(--panel-accent) 45%, var(--glass-border));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--panel-accent) 18%, transparent), var(--shadow-card);
}
.panel-slot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--panel-accent);
}
.panel-slot .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--panel-accent);
  box-shadow: 0 0 8px var(--panel-accent);
  flex: none;
}
.panel-portrait {
  position: relative;
  margin-top: 0.85rem;
  height: clamp(150px, 22vw, 200px);
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(120% 140% at 50% 0%, color-mix(in srgb, var(--panel-accent) 20%, transparent) 0%, transparent 60%),
    var(--color-bg-overlay);
}
.panel-portrait .glyph {
  font-size: clamp(3.2rem, 8vw, 4.4rem);
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.35));
}
.panel-portrait-img { width: 100%; height: 100%; }
.panel-portrait::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(to right, var(--panel-accent), transparent);
}
.panel-body {
  padding: 1.1rem 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
}
.panel-info { display: flex; flex-direction: column; gap: 0.45rem; }
.panel-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  line-height: 1.2;
  color: var(--color-text-primary);
}
.panel-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.pill {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--input-bg);
}
.pill-era {
  color: var(--color-brand-ember);
  border-color: color-mix(in srgb, var(--color-brand-ember) 30%, var(--glass-border));
}
.pill-diet {
  color: var(--color-brand-moss);
  border-color: color-mix(in srgb, var(--color-brand-moss) 30%, var(--glass-border));
}

/* ── VS divider ────────────────────────────────────────── */
.compare-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 0.25rem;
}
.compare-vs::before,
.compare-vs::after {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(212, 164, 58, 0.45), transparent);
}
.vs-badge {
  flex: none;
  min-width: 52px;
  height: 52px;
  padding-inline: 0.9rem;
  margin-inline: 0.9rem;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  white-space: nowrap;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  background: linear-gradient(135deg, var(--color-brand-ember), var(--color-brand-amber));
  color: #1a1305;
  box-shadow: 0 0 26px rgba(232, 93, 44, 0.35), var(--shadow-card);
}

/* ── Comparison table ──────────────────────────────────── */
.compare-table-wrap {
  margin-top: clamp(2.75rem, 6vw, 4rem);
}
.compare-legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 0.4rem;
  border-bottom: 2px solid var(--glass-border);
}
.legend-name {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text-primary);
}
.legend-name .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
}
.legend-a .dot {
  background: var(--color-brand-amber);
  box-shadow: 0 0 8px var(--color-brand-amber);
}
.legend-b .dot {
  background: var(--color-brand-teal);
  box-shadow: 0 0 8px var(--color-brand-teal);
}
.legend-b { flex-direction: row-reverse; text-align: right; }

.compare-row {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--glass-border);
}
.compare-row:last-child { border-bottom: 0; }
.row-head { text-align: center; }
.row-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.cmp-line {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.cmp-dot {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.cmp-a .cmp-dot {
  background: var(--color-brand-amber);
  box-shadow: 0 0 8px var(--color-brand-amber);
}
.cmp-b .cmp-dot {
  background: var(--color-brand-teal);
  box-shadow: 0 0 8px var(--color-brand-teal);
}
.cmp-track {
  flex: 1;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-bg-overlay);
  overflow: hidden;
}
.cmp-fill {
  height: 100%;
  border-radius: var(--radius-full);
  opacity: 0.4;
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.cmp-a .cmp-fill { background: var(--color-brand-amber); }
.cmp-b .cmp-fill { background: var(--color-brand-teal); }
.cmp-fill.win { opacity: 1; }
.cmp-a .cmp-fill.win { box-shadow: 0 0 10px rgba(212, 164, 58, 0.45); }
.cmp-b .cmp-fill.win { box-shadow: 0 0 10px rgba(45, 138, 123, 0.45); }
.cmp-value {
  flex: none;
  min-width: 3.5rem;
  text-align: right;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text-tertiary);
  transition: color 0.25s ease;
}
.cmp-a .cmp-value.win { color: var(--color-brand-amber); }
.cmp-b .cmp-value.win { color: var(--color-brand-teal); }
.cmp-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* Diet chips */
.diet-chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  padding: 0.28rem 0.75rem;
  border-radius: var(--radius-full);
}
.diet-chip.carnivore {
  background: rgba(232, 93, 44, 0.16);
  color: var(--color-brand-ember);
  border: 1px solid rgba(232, 93, 44, 0.35);
}
.diet-chip.herbivore {
  background: rgba(74, 124, 63, 0.18);
  color: var(--color-brand-moss);
  border: 1px solid rgba(74, 124, 63, 0.35);
}
.diet-chip.omnivore {
  background: rgba(212, 164, 58, 0.16);
  color: var(--color-brand-amber);
  border: 1px solid rgba(212, 164, 58, 0.35);
}

/* ── Height comparison visual ──────────────────────────── */
.height-card {
  margin-top: clamp(2rem, 5vw, 3rem);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--shadow-card);
}
.height-card .block-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
  color: var(--color-text-primary);
}
.height-stage {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(1.5rem, 8vw, 5rem);
  min-height: 260px;
  padding-bottom: 2.5rem;
  padding-top: 1rem;
}
.height-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.height-figure {
  width: clamp(3rem, 10vw, 5rem);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  transition: height 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig-a {
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-brand-amber) 55%, transparent), color-mix(in srgb, var(--color-brand-amber) 22%, transparent));
  border: 2px solid color-mix(in srgb, var(--color-brand-amber) 50%, transparent);
  border-bottom: none;
}
.fig-b {
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-brand-teal) 55%, transparent), color-mix(in srgb, var(--color-brand-teal) 22%, transparent));
  border: 2px solid color-mix(in srgb, var(--color-brand-teal) 50%, transparent);
  border-bottom: none;
}
.fig-human {
  width: clamp(2rem, 6vw, 3rem);
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-brand-moss) 55%, transparent), color-mix(in srgb, var(--color-brand-moss) 22%, transparent));
  border: 2px solid color-mix(in srgb, var(--color-brand-moss) 50%, transparent);
  border-bottom: none;
}
.height-label {
  position: absolute;
  bottom: 0;
  text-align: center;
  max-width: 8rem;
}
.height-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.height-m { font-size: 0.72rem; color: var(--color-text-tertiary); }
.ground-line {
  position: absolute;
  bottom: 2.1rem;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--glass-border) 12%, var(--glass-border) 88%, transparent);
}

/* ── Did you know strip ────────────────────────────────── */
.dyk-strip {
  margin-top: clamp(2rem, 5vw, 3rem);
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.4rem;
  box-shadow: var(--shadow-card);
}
.dyk-glyph {
  font-size: 1.4rem;
  line-height: 1;
  flex: none;
}
.dyk-strip p {
  font-size: 0.95rem;
  color: var(--color-text-primary);
  line-height: 1.55;
}

/* ── Empty state ───────────────────────────────────────── */
.empty {
  text-align: center;
  padding: clamp(3rem, 10vw, 5rem) 1rem;
}
.empty-glyph {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}
.empty-text {
  color: var(--color-text-secondary);
  max-width: 48ch;
  margin-inline: auto;
}

/* ============ RESPONSIVE ============ */
@media (min-width: 760px) {
  .compare-arena {
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
  }
  .compare-vs {
    flex-direction: column;
    padding-inline: 0.5rem;
  }
  .compare-vs::before,
  .compare-vs::after {
    width: 2px;
    height: auto;
    background: linear-gradient(to bottom, transparent, rgba(212, 164, 58, 0.45), transparent);
  }
  .vs-badge {
    margin-inline: 0;
    margin-block: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cmp-fill,
  .height-figure { transition: none; }
}

/* ============ LIGHT THEME OVERRIDES ============ */
:global(html[data-theme='light']) .pill-era { color: #b04820; }
:global(html[data-theme='light']) .pill-diet { color: #3d6b32; }
:global(html[data-theme='light']) .kicker { color: #a87515; }
:global(html[data-theme='light']) .kicker::before { background: #a87515; }
</style>