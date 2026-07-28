<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useEncyclopediaStore, type SortOption} from '@/stores/useEncyclopediaStore'
import type {DinosaurCategory} from '@/types/dinosaur'
import {dinosaurs} from '@/data/dinosaurs'
import {useDinoTranslator} from '@/composables/useDinoTranslation'
import {useLocale} from '@/composables/useLocale'
import {useModeStore} from '@/stores/useModeStore'
import {useStaggerReveal} from '@/composables/useScrollAnimation'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const {t, locale} = useI18n()
const store = useEncyclopediaStore()
const modeStore = useModeStore()
const {translateDino} = useDinoTranslator()

watch(locale, (loc) => store.setLocale(loc), {immediate: true})

// Era accent colors match the Open Design prototype: teal / moss / ember.
const ERA_ACCENT: Record<string, string> = {
  triassic: '#2d8a7b',
  jurassic: '#4a7c3f',
  cretaceous: '#e85d2c',
}

const DIET_ICON: Record<string, string> = {
  carnivore: '🦷',
  herbivore: '🌿',
  omnivore: '🌾',
}

const DIET_BADGE_CLASS: Record<string, string> = {
  carnivore: 'bg-[rgba(232,93,44,0.14)] text-[#f0906a]',
  herbivore: 'bg-[rgba(74,124,63,0.18)] text-[#8cc47a]',
  omnivore: 'bg-[rgba(196,168,124,0.15)] text-[var(--color-brand-sand)]',
}

const ERA_DOT_CLASS: Record<string, string> = {
  triassic: 'dot-triassic',
  jurassic: 'dot-jurassic',
  cretaceous: 'dot-cretaceous',
}

const DIET_TAG_CLASS: Record<string, string> = {
  carnivore: 'carnivore',
  herbivore: 'herbivore',
  omnivore: 'omnivore',
}

const sortOptions = computed<{label: string, value: SortOption}[]>(() => [
  {label: t('ui.encyclopedia.sortName'), value: 'name-asc'},
  {label: t('ui.encyclopedia.sortNameDesc'), value: 'name-desc'},
  {label: t('ui.encyclopedia.sortEra'), value: 'era-asc'},
  {label: t('ui.encyclopedia.sortSize'), value: 'size-desc'},
])

const eraChips = computed(() => [
  {label: t('ui.encyclopedia.triassic'), value: 'triassic' as const},
  {label: t('ui.encyclopedia.jurassic'), value: 'jurassic' as const},
  {label: t('ui.encyclopedia.cretaceous'), value: 'cretaceous' as const},
])

const dietChips = computed(() => [
  {label: t('ui.encyclopedia.all'), value: 'all' as const},
  {label: t('ui.encyclopedia.carnivore'), value: 'carnivore' as const},
  {label: t('ui.encyclopedia.herbivore'), value: 'herbivore' as const},
  {label: t('ui.encyclopedia.omnivore'), value: 'omnivore' as const},
])

const sizeChips = computed(() => [
  {label: t('ui.encyclopedia.small'), value: 'small' as const},
  {label: t('ui.encyclopedia.medium'), value: 'medium' as const},
  {label: t('ui.encyclopedia.large'), value: 'large' as const},
  {label: t('ui.encyclopedia.gigantic'), value: 'gigantic' as const},
])

// Static length ranges (meters) for the size scale-bar cells.
const SIZE_RANGE: Record<'small' | 'medium' | 'large' | 'gigantic', string> = {
  small: '≤ 2 m',
  medium: '2–6 m',
  large: '6–15 m',
  gigantic: '15 m+',
}

const categoryChips = computed(() => [
  {label: t('ui.home.categories.flyingReptiles'), value: 'flying-reptile' as const},
  {label: t('ui.home.categories.marineReptiles'), value: 'marine-reptile' as const},
])

const translatedPaginatedDinosaurs = computed(() =>
    store.paginatedDinosaurs.map(translateDino)
)

// ── Records strip (computed dynamically from the catalog) ─────────────────
const records = computed(() => {
  const longest = [...dinosaurs].sort((a, b) => b.dimensions.lengthMeters - a.dimensions.lengthMeters)[0]
  const heaviest = [...dinosaurs].sort((a, b) => b.dimensions.weightKg - a.dimensions.weightKg)[0]
  const fastest = [...dinosaurs].sort((a, b) => b.dimensions.speedKmh - a.dimensions.speedKmh)[0]
  const oldest = [...dinosaurs].sort((a, b) => a.periodRangeMya[1] - b.periodRangeMya[1])[0]
  return [
    {label: t('ui.encyclopedia.records.longest'), value: `${longest.dimensions.lengthMeters} m`, holder: translateDino(longest).displayName},
    {label: t('ui.encyclopedia.records.heaviest'), value: `~${Math.round(heaviest.dimensions.weightKg / 1000)} t`, holder: translateDino(heaviest).displayName},
    {label: t('ui.encyclopedia.records.fastest'), value: `~${fastest.dimensions.speedKmh} km/h`, holder: translateDino(fastest).displayName},
    {label: t('ui.encyclopedia.records.oldest'), value: `${oldest.periodRangeMya[1]} Ma`, holder: translateDino(oldest).displayName},
  ]
})

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef, '.dino-card', {stagger: 0.08, duration: 0.55, y: 32})

const router = useRouter()
const {localRoute} = useLocale()

const route = useRoute()

// ── View mode (grid / list) with localStorage persistence ──────────────────
const viewMode = ref<'grid' | 'list'>(
    (() => {
      try {
        return typeof localStorage !== 'undefined' && localStorage.getItem('dino-view') === 'list' ? 'list' : 'grid'
      } catch {
        return 'grid'
      }
    })(),
)
function setView(mode: 'grid' | 'list') {
  viewMode.value = mode
  try {
    localStorage.setItem('dino-view', mode)
  } catch {
    /* ignore */
  }
}

// Diet filter uses a single "all" + per-diet toggle, matching the prototype's
// mutually-exclusive diet chips. The store keeps sets, so we map here.
const dietActive = computed(() => {
  if (store.dietFilters.length === 0) return 'all'
  return store.dietFilters[0]
})
function setDiet(value: string) {
  if (value === 'all') {
    // clear all diet filters
    store.dietFilters.slice().forEach(d => store.toggleDietFilter(d))
  } else {
    // replace current selection with this single diet
    store.dietFilters.slice().forEach(d => store.toggleDietFilter(d))
    store.toggleDietFilter(value as 'carnivore' | 'herbivore' | 'omnivore')
  }
}

const visiblePages = computed(() => {
  const total = store.totalPages
  const current = store.currentPage

  if (total <= 5) {
    return Array.from({length: total}, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  pages.push(1)
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})

// Apply category filter from query parameter (e.g. /encyclopedia?category=carnivore)
watch(
    () => route.query.category,
    (cat) => {
      const validCategories: DinosaurCategory[] = ['carnivore', 'herbivore', 'omnivore', 'flying-reptile', 'marine-reptile']
      if (cat && typeof cat === 'string' && validCategories.includes(cat as DinosaurCategory)) {
        store.setCategoryFilter(cat as DinosaurCategory)
      } else if (!cat) {
        store.setCategoryFilter(null)
      }
    },
    {immediate: true},
)
</script>

<template>
  <div class="encyclopedia-page">
    <SeoHead
        :title="t('ui.encyclopedia.title')"
        :description="t('ui.encyclopedia.description')"
    />

    <!-- ============ PAGE HEAD ============ -->
    <section class="page-head">
      <div class="wrap">
        <span class="kicker">{{ t('ui.nav.encyclopedia') }}</span>
        <h1 class="page-title">{{ t('ui.encyclopedia.title') }}</h1>
        <p class="lede">
          {{ modeStore.isKidsMode ? t('ui.encyclopedia.kidsDescription') : t('ui.encyclopedia.description') }}
        </p>
        <div class="records">
          <div v-for="rec in records" :key="rec.label" class="record-tile">
            <span class="record-label">{{ rec.label }}</span>
            <span class="record-value">{{ rec.value }}</span>
            <span class="record-holder">{{ rec.holder }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CATALOG ============ -->
    <section class="catalog">
      <div class="wrap">
        <div class="toolbar">
          <div class="toolbar-row">
            <div class="search-box">
              <BaseIcon name="search" class="search-icon" />
              <input
                  type="search"
                  class="search-input"
                  :value="store.searchQuery"
                  :placeholder="t('ui.encyclopedia.searchPlaceholder')"
                  :aria-label="t('ui.encyclopedia.search')"
                  @input="store.setSearch(($event.target as HTMLInputElement).value)"
              />
            </div>
            <select
                class="sort-select"
                :value="store.sortBy"
                :aria-label="t('ui.encyclopedia.sortBy')"
                @change="store.setSort(($event.target as HTMLSelectElement).value as SortOption)"
            >
              <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <div class="view-toggle" role="group" :aria-label="t('ui.encyclopedia.sortBy')">
              <button
                  type="button"
                  :aria-pressed="viewMode === 'grid'"
                  :aria-label="t('ui.encyclopedia.gridView')"
                  @click="setView('grid')"
              >
                <BaseIcon name="grid-2x2" />
              </button>
              <button
                  type="button"
                  :aria-pressed="viewMode === 'list'"
                  :aria-label="t('ui.encyclopedia.listView')"
                  @click="setView('list')"
              >
                <BaseIcon name="list" />
              </button>
            </div>
          </div>

          <div class="toolbar-row filters">
            <div class="filter-grid">
              <!-- Diet: pill-buttons with emoji icon + diet-tinted active state -->
              <div class="filter-block diet-block" role="group" :aria-label="t('ui.encyclopedia.diet')">
                <span class="filter-block-label">
                  <BaseIcon name="utensils" class="filter-block-icon" />
                  {{ t('ui.encyclopedia.diet') }}
                </span>
                <div class="diet-pills">
                  <button
                      v-for="chip in dietChips"
                      :key="chip.value"
                      type="button"
                      class="diet-pill"
                      :class="{active: dietActive === chip.value, 'is-all': chip.value === 'all'}"
                      :aria-pressed="dietActive === chip.value"
                      @click="setDiet(chip.value)"
                  >
                    <span v-if="chip.value !== 'all'" class="diet-pill-icon" aria-hidden="true">{{ DIET_ICON[chip.value] }}</span>
                    <span v-else class="diet-pill-icon" aria-hidden="true">∞</span>
                    <span class="diet-pill-label">{{ chip.label }}</span>
                  </button>
                </div>
              </div>

              <!-- Era: pill-buttons with colored dot + colored underline when active -->
              <div class="filter-block era-block" role="group" :aria-label="t('ui.encyclopedia.era')">
                <span class="filter-block-label">
                  <BaseIcon name="clock" class="filter-block-icon" />
                  {{ t('ui.encyclopedia.era') }}
                </span>
                <div class="era-pills">
                  <button
                      v-for="chip in eraChips"
                      :key="chip.value"
                      type="button"
                      class="era-pill"
                      :style="{ '--era-accent': ERA_ACCENT[chip.value] }"
                      :aria-pressed="store.eraFilters.includes(chip.value)"
                      @click="store.toggleEraFilter(chip.value)"
                  >
                    <span class="era-dot" :class="ERA_DOT_CLASS[chip.value]" aria-hidden="true" />
                    {{ chip.label }}
                  </button>
                </div>
              </div>

              <!-- Size: scale-bar (4 cells of increasing width) -->
              <div class="filter-block size-block" role="group" :aria-label="t('ui.encyclopedia.size')">
                <span class="filter-block-label">
                  <BaseIcon name="ruler" class="filter-block-icon" />
                  {{ t('ui.encyclopedia.size') }}
                </span>
                <div class="scale-bar">
                  <button
                      v-for="(chip, idx) in sizeChips"
                      :key="chip.value"
                      type="button"
                      class="scale-cell"
                      :class="{active: store.sizeFilters.includes(chip.value)}"
                      :style="{ '--cell-w': `${20 + idx * 12}%` }"
                      :aria-pressed="store.sizeFilters.includes(chip.value)"
                      @click="store.toggleSizeFilter(chip.value)"
                  >
                    <span class="scale-cell-label">{{ chip.label }}</span>
                    <span class="scale-cell-range">{{ SIZE_RANGE[chip.value] }}</span>
                  </button>
                </div>
              </div>

              <!-- Category: two big toggle tiles -->
              <div class="filter-block category-block" role="group" :aria-label="t('ui.encyclopedia.category')">
                <span class="filter-block-label">
                  <BaseIcon name="shapes" class="filter-block-icon" />
                  {{ t('ui.encyclopedia.category') }}
                </span>
                <div class="toggle-tiles">
                  <button
                      v-for="chip in categoryChips"
                      :key="chip.value"
                      type="button"
                      class="toggle-tile"
                      :class="{active: store.categoryFilter === chip.value, [chip.value]: true}"
                      :aria-pressed="store.categoryFilter === chip.value"
                      @click="store.toggleCategoryFilter(chip.value)"
                  >
                    <span class="toggle-tile-icon" aria-hidden="true">
                      {{ chip.value === 'flying-reptile' ? '🦅' : '🐟' }}
                    </span>
                    <span class="toggle-tile-label">{{ chip.label }}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
                v-if="store.hasActiveFilters || store.searchQuery"
                type="button"
                class="reset-link"
                @click="store.clearFilters()"
            >
              <BaseIcon name="x" />
              {{ t('ui.encyclopedia.clearFilters') }}
            </button>
          </div>
        </div>

        <!-- Results meta -->
        <div class="results-meta">
          <span aria-live="polite">
            {{ t('ui.encyclopedia.found', {count: store.filteredDinosaurs.length}) }}
          </span>
          <span>{{ t('ui.encyclopedia.fullCatalog', {count: dinosaurs.length}) }}</span>
        </div>

        <!-- Grid -->
        <div
            v-if="store.paginatedDinosaurs.length > 0"
            ref="gridRef"
            class="dino-grid"
            :class="{'list-view': viewMode === 'list'}"
        >
          <article
              v-for="dino in translatedPaginatedDinosaurs"
              :key="dino.id"
              class="dino-card"
              tabindex="0"
              @click="router.push(localRoute({ name: 'encyclopedia-detail', params: { id: dino.id } }))"
              @keydown.enter="router.push(localRoute({ name: 'encyclopedia-detail', params: { id: dino.id } }))"
          >
            <div class="dino-media">
              <span class="era-badge" :class="dino.era">{{ t(`ui.encyclopedia.${dino.era}`) }}</span>
              <span class="diet-badge" aria-hidden="true">{{ DIET_ICON[dino.diet] }}</span>
              <DinoCardImage :dino="dino" aspect-ratio="16/10" />
            </div>
            <div
                class="era-accent-line"
                :style="{ background: `linear-gradient(to right, ${ERA_ACCENT[dino.era]}80, ${ERA_ACCENT[dino.era]}20, transparent)` }"
            />
            <div class="dino-body">
              <div class="dino-head">
                <h3>{{ dino.displayName }}</h3>
                <span class="dino-period">{{ dino.periodRangeMya[0] }}–{{ dino.periodRangeMya[1] }} Ma</span>
              </div>
              <p v-if="dino.genusName !== dino.displayName" class="dino-genus">{{ dino.genusName }}</p>
              <p v-if="dino.nameMeaning" class="dino-meaning">{{ dino.nameMeaning }}</p>
              <div class="dino-meta">
                <span
                    :class="['diet-tag', DIET_BADGE_CLASS[dino.diet] ?? 'len-tag']"
                >{{ t(`ui.encyclopedia.${dino.diet}`) }}</span>
                <span class="len-tag">{{ t(`ui.encyclopedia.${dino.size}`) }}</span>
              </div>
              <p class="dino-desc">
                {{ modeStore.isKidsMode ? dino.kidsDescription : dino.description }}
              </p>
              <div class="dino-footer">
                <span class="dino-dims">{{ dino.dimensions.lengthMeters }}m · {{ (dino.dimensions.weightKg / 1000).toFixed(1) }}t</span>
                <span class="dino-link">
                  {{ t('ui.encyclopedia.viewDetail') }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <BaseEmptyState
            v-else
            :title="t('ui.encyclopedia.noDinosFound')"
            :description="store.hasActiveFilters || store.searchQuery ? t('ui.encyclopedia.adjustFilters') : ''"
            icon="search"
            :action-label="store.hasActiveFilters || store.searchQuery ? t('ui.encyclopedia.clearFilters') : undefined"
            @action="store.clearFilters()"
        />

        <!-- Pagination -->
        <div v-if="store.totalPages > 1" class="pagination">
          <BaseButton
              variant="ghost"
              size="sm"
              class="px-2 sm:px-3"
              :disabled="store.currentPage === 1"
              @click="store.setPage(store.currentPage - 1)"
          >
            <span class="hidden sm:inline">{{ t('ui.encyclopedia.previous') }}</span>
            <span class="sm:hidden">←</span>
          </BaseButton>

          <template v-for="(p, index) in visiblePages" :key="`${p}-${index}`">
            <span v-if="p === '...'" class="ellipsis">…</span>
            <button
                v-else
                type="button"
                class="page-btn"
                :class="{active: store.currentPage === p}"
                @click="store.setPage(Number(p))"
            >{{ p }}</button>
          </template>

          <BaseButton
              variant="ghost"
              size="sm"
              class="px-2 sm:px-3"
              :disabled="store.currentPage === store.totalPages"
              @click="store.setPage(store.currentPage + 1)"
          >
            <span class="hidden sm:inline">{{ t('ui.encyclopedia.next') }}</span>
            <span class="sm:hidden">→</span>
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.encyclopedia-page {
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
  padding: clamp(3rem, 8vw, 5rem) 0 clamp(2rem, 5vw, 3rem);
  background:
      radial-gradient(100% 80% at 80% -20%, rgba(212, 164, 58, 0.1) 0%, transparent 55%),
      radial-gradient(90% 70% at 10% 110%, rgba(74, 124, 63, 0.12) 0%, transparent 60%),
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
.page-title {
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
  max-width: 56ch;
  text-wrap: pretty;
}

/* ============ RECORDS STRIP ============ */
.records {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2.2rem;
}
.record-tile {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 0.9rem 1.1rem;
}
.record-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.record-value {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--color-brand-amber);
}
.record-holder {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

/* ============ CATALOG ============ */
.catalog {
  background: var(--color-bg-base);
  padding-block: 1.5rem 5rem;
}
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.1rem 1.2rem;
  margin-bottom: 1.6rem;
}
.toolbar-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}
.search-box {
  position: relative;
  flex: 1 1 220px;
}
.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}
:deep(.search-icon svg) {
  width: 16px;
  height: 16px;
}
.search-input {
  width: 100%;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.6rem 1rem 0.6rem 2.4rem;
  transition: border-color 0.2s ease;
}
.search-input::placeholder {
  color: var(--color-text-tertiary);
}
.search-input:hover {
  border-color: rgba(212, 164, 58, 0.3);
}
.search-input:focus-visible {
  outline: 2px solid var(--color-brand-amber);
  outline-offset: 2px;
  border-color: var(--color-brand-amber);
}
.sort-select {
  appearance: none;
  -webkit-appearance: none;
  background: var(--input-bg) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9685' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 0.9rem center;
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.6rem 2.4rem 0.6rem 1rem;
  cursor: pointer;
}
:global(html[data-theme='light']) .sort-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234d5340' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}
.view-toggle {
  display: inline-flex;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  padding: 3px;
}
.view-toggle button {
  appearance: none;
  border: 0;
  cursor: pointer;
  background: transparent;
  color: var(--color-text-tertiary);
  padding: 0.42rem 0.7rem;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  transition: background 0.2s ease, color 0.2s ease;
}
.view-toggle button :deep(svg) {
  width: 16px;
  height: 16px;
}
.view-toggle button[aria-pressed='true'] {
  background: rgba(212, 164, 58, 0.18);
  color: var(--color-brand-amber);
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}
.chip-group-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-right: 0.2rem;
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
.chip[aria-pressed='true'] {
  background: linear-gradient(135deg, var(--color-brand-amber), #b8862a);
  border-color: transparent;
  color: #1a1305;
}
.era-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: none;
}
.chip[aria-pressed='true'] .era-dot {
  outline: 1.5px solid rgba(26, 19, 5, 0.4);
}
.dot-triassic { background: var(--color-brand-teal); }
.dot-jurassic { background: var(--color-brand-moss); }
.dot-cretaceous { background: var(--color-brand-ember); }

.reset-link {
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 0;
  color: var(--color-brand-amber);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.42rem 0.6rem;
  margin-left: auto;
}
.reset-link :deep(svg) {
  width: 15px;
  height: 15px;
}

/* ============ FILTER GRID (2×2 of distinct widgets) ============ */
.filter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  flex: 1 1 100%;
}
.filter-block {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.8rem 0.9rem 0.9rem;
  background: linear-gradient(180deg, rgba(212, 164, 58, 0.08), rgba(196, 168, 124, 0.05));
  border: 1px solid rgba(212, 164, 58, 0.12);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.filter-block:hover {
  border-color: rgba(212, 164, 58, 0.24);
  background: linear-gradient(180deg, rgba(212, 164, 58, 0.12), rgba(196, 168, 124, 0.07));
}
.filter-block-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.filter-block-icon {
  width: 13px;
  height: 13px;
  color: var(--color-brand-amber);
  opacity: 0.85;
}

/* ---- Diet: pills with icon + diet-tinted active state ---- */
.diet-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.diet-pill {
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.82rem;
  padding: 0.38rem 0.8rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.diet-pill:hover {
  border-color: rgba(212, 164, 58, 0.32);
  color: var(--color-text-primary);
}
.diet-pill-icon {
  font-size: 0.95rem;
  line-height: 1;
}
.diet-pill.is-all {
  font-weight: 600;
}
.diet-pill.is-all .diet-pill-icon {
  font-weight: 700;
  color: var(--color-brand-amber);
}
.diet-pill.active[aria-pressed='true'] {
  background: rgba(232, 93, 44, 0.18);
  border-color: rgba(232, 93, 44, 0.5);
  color: #f0906a;
}
.diet-block .diet-pill.active[aria-pressed='true']:has(.diet-pill-icon:nth-of-type(1)):nth-of-type(2) {
  /* herbivore */
  background: rgba(74, 124, 63, 0.22);
  border-color: rgba(74, 124, 63, 0.55);
  color: #8cc47a;
}
.diet-block .diet-pill.active[aria-pressed='true']:has(.diet-pill-icon:nth-of-type(1)):nth-of-type(3) {
  /* omnivore */
  background: rgba(196, 168, 124, 0.2);
  border-color: rgba(196, 168, 124, 0.55);
  color: var(--color-brand-sand);
}
.diet-block .diet-pill.active[aria-pressed='true']:nth-of-type(1) {
  /* all */
  background: linear-gradient(135deg, rgba(212, 164, 58, 0.25), rgba(212, 164, 58, 0.1));
  border-color: rgba(212, 164, 58, 0.5);
  color: var(--color-brand-amber);
}

/* ---- Era: pills with colored dot + colored underline when active ---- */
.era-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.era-pill {
  appearance: none;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.82rem;
  padding: 0.4rem 0.85rem 0.55rem;
  overflow: hidden;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.era-pill::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--era-accent, var(--color-brand-amber));
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}
.era-pill[aria-pressed='true']::after {
  transform: scaleX(1);
}
.era-pill[aria-pressed='true'] {
  background: color-mix(in srgb, var(--era-accent) 18%, transparent);
  border-color: color-mix(in srgb, var(--era-accent) 50%, transparent);
  color: var(--color-text-primary);
}
.era-pill .era-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: none;
}

/* ---- Size: scale-bar with cells of increasing width ---- */
.scale-bar {
  display: flex;
  gap: 0.3rem;
  align-items: stretch;
  width: 100%;
}
.scale-cell {
  appearance: none;
  cursor: pointer;
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  padding: 0.45rem 0.4rem;
  min-height: 56px;
  text-align: center;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.scale-cell:hover {
  transform: translateY(-1px);
  border-color: rgba(212, 164, 58, 0.32);
  color: var(--color-text-primary);
}
.scale-cell[aria-pressed='true'] {
  background: linear-gradient(180deg, rgba(212, 164, 58, 0.22), rgba(212, 164, 58, 0.08));
  border-color: var(--color-brand-amber);
  color: var(--color-brand-amber);
  box-shadow: 0 0 0 1px rgba(212, 164, 58, 0.25) inset;
}
.scale-cell-label {
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.1;
}
.scale-cell-range {
  font-size: 0.62rem;
  color: var(--color-text-tertiary);
  letter-spacing: 0.04em;
}
.scale-cell[aria-pressed='true'] .scale-cell-range {
  color: var(--color-brand-amber);
  opacity: 0.85;
}

/* ---- Category: two big toggle tiles ---- */
.toggle-tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.toggle-tile {
  appearance: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: var(--input-bg);
  border: 1.5px dashed rgba(212, 164, 58, 0.22);
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.78rem;
  padding: 0.75rem 0.5rem;
  min-height: 78px;
  text-align: center;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.toggle-tile:hover {
  border-color: rgba(212, 164, 58, 0.45);
  color: var(--color-text-secondary);
  transform: translateY(-1px);
}
.toggle-tile-icon {
  font-size: 1.4rem;
  line-height: 1;
  filter: grayscale(0.4);
  opacity: 0.7;
  transition: filter 0.2s ease, opacity 0.2s ease;
}
.toggle-tile:hover .toggle-tile-icon {
  filter: grayscale(0);
  opacity: 1;
}
.toggle-tile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(212, 164, 58, 0.22), rgba(212, 164, 58, 0.06));
  border-style: solid;
  border-color: var(--color-brand-amber);
  color: var(--color-brand-amber);
  box-shadow: 0 0 0 1px rgba(212, 164, 58, 0.2) inset, 0 4px 12px rgba(212, 164, 58, 0.15);
}
.toggle-tile[aria-pressed='true'] .toggle-tile-icon {
  filter: grayscale(0);
  opacity: 1;
}
.toggle-tile.flying-reptile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(135, 200, 220, 0.22), rgba(135, 200, 220, 0.06));
  border-color: #87c8dc;
  color: #87c8dc;
  box-shadow: 0 0 0 1px rgba(135, 200, 220, 0.2) inset, 0 4px 12px rgba(135, 200, 220, 0.15);
}
.toggle-tile.marine-reptile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(80, 140, 200, 0.22), rgba(80, 140, 200, 0.06));
  border-color: #6aa3d9;
  color: #6aa3d9;
  box-shadow: 0 0 0 1px rgba(80, 140, 200, 0.2) inset, 0 4px 12px rgba(80, 140, 200, 0.15);
}

/* ============ LIGHT THEME OVERRIDES ============ */
:global(html[data-theme='light']) .filter-block {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(74, 92, 50, 0.14);
}
:global(html[data-theme='light']) .filter-block:hover {
  border-color: rgba(74, 92, 50, 0.28);
}
:global(html[data-theme='light']) .filter-block-label {
  color: #4d5340;
}
:global(html[data-theme='light']) .filter-block-icon {
  color: #7a5418;
}

:global(html[data-theme='light']) .diet-pill {
  background: #ffffff;
  border-color: rgba(74, 92, 50, 0.18);
  color: #4d5340;
}
:global(html[data-theme='light']) .diet-pill:hover {
  border-color: rgba(74, 92, 50, 0.35);
  color: #1f2a14;
}
:global(html[data-theme='light']) .diet-pill.is-all .diet-pill-icon {
  color: #7a5418;
}
:global(html[data-theme='light']) .diet-pill.active[aria-pressed='true'] {
  /* carnivore */
  background: rgba(232, 93, 44, 0.12);
  border-color: #bf4517;
  color: #bf4517;
}
:global(html[data-theme='light']) .diet-pill.active[aria-pressed='true']:nth-of-type(2) {
  /* herbivore */
  background: rgba(74, 124, 63, 0.14);
  border-color: #3f6a35;
  color: #3f6a35;
}
:global(html[data-theme='light']) .diet-pill.active[aria-pressed='true']:nth-of-type(3) {
  /* omnivore */
  background: rgba(150, 110, 50, 0.14);
  border-color: #8b6630;
  color: #6e4e22;
}
:global(html[data-theme='light']) .diet-pill.active[aria-pressed='true']:nth-of-type(1) {
  /* all */
  background: rgba(212, 164, 58, 0.18);
  border-color: #7a5418;
  color: #7a5418;
}

:global(html[data-theme='light']) .era-pill {
  background: #ffffff;
  border-color: rgba(74, 92, 50, 0.18);
  color: #4d5340;
}
:global(html[data-theme='light']) .era-pill:hover {
  border-color: rgba(74, 92, 50, 0.35);
  color: #1f2a14;
}
:global(html[data-theme='light']) .era-pill[aria-pressed='true'] {
  background: color-mix(in srgb, var(--era-accent) 14%, #ffffff);
  border-color: var(--era-accent);
  color: #1f2a14;
}

:global(html[data-theme='light']) .scale-cell {
  background: #ffffff;
  border-color: rgba(74, 92, 50, 0.18);
  color: #4d5340;
}
:global(html[data-theme='light']) .scale-cell:hover {
  border-color: rgba(122, 84, 24, 0.45);
  color: #1f2a14;
}
:global(html[data-theme='light']) .scale-cell[aria-pressed='true'] {
  background: linear-gradient(180deg, rgba(212, 164, 58, 0.28), rgba(212, 164, 58, 0.12));
  border-color: #7a5418;
  color: #7a5418;
  box-shadow: 0 0 0 1px rgba(122, 84, 24, 0.2) inset;
}
:global(html[data-theme='light']) .scale-cell[aria-pressed='true'] .scale-cell-range {
  color: #7a5418;
}
:global(html[data-theme='light']) .scale-cell-range {
  color: #6a6f5b;
}

:global(html[data-theme='light']) .toggle-tile {
  background: #ffffff;
  border-color: rgba(74, 92, 50, 0.25);
  color: #6a6f5b;
}
:global(html[data-theme='light']) .toggle-tile:hover {
  border-color: rgba(74, 92, 50, 0.5);
  color: #4d5340;
}
:global(html[data-theme='light']) .toggle-tile-icon {
  filter: grayscale(0.6);
  opacity: 0.65;
}
:global(html[data-theme='light']) .toggle-tile:hover .toggle-tile-icon {
  filter: grayscale(0);
  opacity: 1;
}
:global(html[data-theme='light']) .toggle-tile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(212, 164, 58, 0.25), rgba(212, 164, 58, 0.08));
  border-color: #7a5418;
  color: #7a5418;
}
:global(html[data-theme='light']) .toggle-tile.flying-reptile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(135, 200, 220, 0.32), rgba(135, 200, 220, 0.1));
  border-color: #4a8aa3;
  color: #2c5d72;
}
:global(html[data-theme='light']) .toggle-tile.marine-reptile[aria-pressed='true'] {
  background: linear-gradient(160deg, rgba(80, 140, 200, 0.32), rgba(80, 140, 200, 0.1));
  border-color: #3a6f9a;
  color: #1f4a6e;
}

.results-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  color: var(--color-text-tertiary);
  font-size: 0.8125rem;
  margin-bottom: 1rem;
}

/* ============ SPECIES GRID ============ */
.dino-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.dino-card {
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.dino-card:hover,
.dino-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover), 0 0 0 1px rgba(212, 164, 58, 0.25);
  border-color: rgba(212, 164, 58, 0.35);
  outline: none;
}
.dino-media {
  position: relative;
  aspect-ratio: 16 / 10;
  flex: none;
}
.dino-media :deep(.dino-card-image),
.dino-media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dino-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(200deg, transparent 55%, var(--media-fade) 100%);
  pointer-events: none;
}
.era-badge {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  z-index: 2;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
}
.diet-badge {
  position: absolute;
  top: 0.7rem;
  right: 0.8rem;
  z-index: 2;
  width: 1.65rem;
  height: 1.65rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  font-size: 0.85rem;
  line-height: 1;
}
.era-accent-line {
  height: 2px;
  width: 100%;
  flex: none;
  flex-shrink: 0;
}
.era-badge.triassic {
  background: rgba(45, 138, 123, 0.24);
  border: 1px solid rgba(45, 138, 123, 0.55);
  color: #6fd0bd;
}
.era-badge.jurassic {
  background: rgba(74, 124, 63, 0.26);
  border: 1px solid rgba(74, 124, 63, 0.6);
  color: #97cc85;
}
.era-badge.cretaceous {
  background: rgba(232, 93, 44, 0.22);
  border: 1px solid rgba(232, 93, 44, 0.55);
  color: #f5a081;
}
:global(html[data-theme='light']) .era-badge.triassic { color: #1f6b5e; }
:global(html[data-theme='light']) .era-badge.jurassic { color: #3f6a35; }
:global(html[data-theme='light']) .era-badge.cretaceous { color: #bf4517; }

.dino-body {
  padding: 0.9rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}
.dino-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}
.dino-body h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
}
.dino-period {
  flex: none;
  font-size: 0.7rem;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.dino-genus {
  font-style: italic;
  color: var(--color-text-tertiary);
  font-size: 0.7rem;
}
.dino-meaning {
  font-style: italic;
  color: var(--color-text-tertiary);
  font-size: 0.7rem;
  line-height: 1.4;
}
.dino-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}
.diet-tag,
.len-tag {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  text-transform: uppercase;
}
.diet-tag.carnivore {
  background: rgba(232, 93, 44, 0.14);
  color: #f0906a;
}
.diet-tag.herbivore {
  background: rgba(74, 124, 63, 0.18);
  color: #8cc47a;
}
.diet-tag.omnivore {
  background: rgba(196, 168, 124, 0.15);
  color: var(--color-brand-sand);
}
.len-tag {
  background: var(--input-bg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}
:global(html[data-theme='light']) .diet-tag.carnivore { color: #bf4517; }
:global(html[data-theme='light']) .diet-tag.herbivore { color: #3f6a35; }

.dino-desc {
  margin-top: 0.55rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dino-footer {
  margin-top: auto;
  padding-top: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.dino-dims {
  font-size: 0.72rem;
  color: var(--color-text-tertiary);
  font-family: var(--font-display);
}
.dino-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--color-brand-amber);
  transition: gap 0.2s ease;
}
.dino-link :deep(svg) {
  width: 14px;
  height: 14px;
}
.dino-card:hover .dino-link {
  gap: 0.7rem;
}

/* List view */
.dino-grid.list-view {
  grid-template-columns: 1fr !important;
}
.list-view .dino-card {
  flex-direction: row;
  align-items: stretch;
}
.list-view .dino-media {
  width: clamp(140px, 18vw, 160px);
  aspect-ratio: 1 / 1;
  flex: none;
}
.list-view .dino-media :deep(.dino-card-image),
.list-view .dino-media :deep(img) {
  object-fit: cover;
  object-position: center 25%;
}
.list-view .era-accent-line {
  display: none;
}
.list-view .dino-body {
  flex: 1 1 0;
  min-width: 0;
  padding: 0.9rem 1.1rem;
}
.list-view .dino-body h3 {
  font-size: 1.2rem;
}
.list-view .dino-desc {
  -webkit-line-clamp: 3;
}
.list-view .era-badge,
.list-view .diet-badge {
  transform: scale(0.92);
}

/* ============ PAGINATION ============ */
.pagination {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem 0.5rem;
  flex-wrap: wrap;
}
.ellipsis {
  padding-inline: 0.25rem;
  color: var(--color-text-tertiary);
  user-select: none;
}
.page-btn {
  min-width: 36px;
  height: 36px;
  padding-inline: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-secondary);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.page-btn:hover {
  color: var(--color-text-primary);
  background: rgba(212, 164, 58, 0.08);
}
.page-btn.active {
  background: var(--color-brand-amber);
  color: #1a1305;
  box-shadow: 0 2px 12px rgba(212, 164, 58, 0.35);
}

/* ============ BREAKPOINTS ============ */
@media (min-width: 700px) {
  .dino-grid { grid-template-columns: repeat(2, 1fr); }
  .records { grid-template-columns: repeat(4, 1fr); }
  .toolbar { flex-direction: row; flex-wrap: wrap; align-items: center; }
  .toolbar-row { flex: 1 1 100%; }
  .toolbar-row.filters { flex-basis: auto; }
}
@media (min-width: 1024px) {
  .dino-grid { grid-template-columns: repeat(3, 1fr); }
  .filter-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1400px) {
  .dino-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>