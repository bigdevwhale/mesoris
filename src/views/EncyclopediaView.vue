<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEncyclopediaStore, type SortOption } from '@/stores/useEncyclopediaStore'
import type { DinosaurCategory } from '@/types/dinosaur'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { useLocale } from '@/composables/useLocale'
import { useModeStore } from '@/stores/useModeStore'
import { useStaggerReveal } from '@/composables/useScrollAnimation'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseChip from '@/components/ui/BaseChip.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import ModeSwitcher from '@/components/layout/ModeSwitcher.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const store = useEncyclopediaStore()
const modeStore = useModeStore()
const { translateDino } = useDinoTranslator()

watch(locale, (loc) => store.setLocale(loc), { immediate: true })

const ERA_ACCENT: Record<string, string> = {
  triassic: '#a855f7',
  jurassic: '#4ade80',
  cretaceous: '#d4a43a',
}

const DIET_BADGE_CLASS: Record<string, string> = {
  carnivore: 'bg-[rgba(232,93,44,0.12)] text-[var(--color-brand-ember)]',
  herbivore: 'bg-[rgba(74,124,63,0.12)] text-[#4ade80]',
  omnivore: 'bg-[rgba(212,164,58,0.12)] text-[var(--color-brand-amber)]',
}

const sortOptions = computed(() => [
  { label: t('ui.encyclopedia.sortName'), value: 'name-asc' },
  { label: t('ui.encyclopedia.sortNameDesc'), value: 'name-desc' },
  { label: t('ui.encyclopedia.sortEra'), value: 'era-asc' },
  { label: t('ui.encyclopedia.sortSize'), value: 'size-desc' },
])

const eraChips = computed(() => [
  { label: t('ui.encyclopedia.triassic'), value: 'triassic' as const, icon: 'sun' },
  { label: t('ui.encyclopedia.jurassic'), value: 'jurassic' as const, icon: 'leaf' },
  { label: t('ui.encyclopedia.cretaceous'), value: 'cretaceous' as const, icon: 'flame' },
])

const dietChips = computed(() => [
  { label: t('ui.encyclopedia.carnivore'), value: 'carnivore' as const, icon: 'skull' },
  { label: t('ui.encyclopedia.herbivore'), value: 'herbivore' as const, icon: 'leaf' },
  { label: t('ui.encyclopedia.omnivore'), value: 'omnivore' as const, icon: 'utensils-crossed' },
])

const sizeChips = computed(() => [
  { label: t('ui.encyclopedia.small'), value: 'small' as const, icon: 'ruler' },
  { label: t('ui.encyclopedia.medium'), value: 'medium' as const, icon: 'ruler' },
  { label: t('ui.encyclopedia.large'), value: 'large' as const, icon: 'ruler' },
  { label: t('ui.encyclopedia.gigantic'), value: 'gigantic' as const, icon: 'maximize' },
])

const translatedPaginatedDinosaurs = computed(() =>
  store.paginatedDinosaurs.map(translateDino)
)

const dinoDetail = computed(() => {
  if (!store.selectedDinoId) return null
  const dino = store.filteredDinosaurs.find(d => d.id === store.selectedDinoId)
  return dino ? translateDino(dino) : null
})

const categoryChips = computed(() => [
  { label: t('ui.home.categories.flyingReptiles'), value: 'flying-reptile' as const, icon: 'bird' },
  { label: t('ui.home.categories.marineReptiles'), value: 'marine-reptile' as const, icon: 'waves' },
])

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef, '.dino-card', { stagger: 0.08, duration: 0.55, y: 32 })

const router = useRouter()
const { localRoute } = useLocale()

const navigatingToCompare = ref(false)

function addToCompare(id: string) {
  navigatingToCompare.value = true
  store.closeDetail()
  router.push(localRoute({ name: 'compare', query: { a: id } }))
}

const route = useRoute()

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
  { immediate: true },
)

// When navigating to /encyclopedia/:id, open the detail modal
watch(
  () => route.params.id,
  (id) => {
    if (id && typeof id === 'string') {
      store.openDetail(id)
    }
  },
  { immediate: true },
)

// When modal is closed, navigate back to the encyclopedia list
watch(
  () => store.isModalOpen,
  (open) => {
    if (!open && route.params.id && !navigatingToCompare.value) {
      router.replace(localRoute({ name: 'encyclopedia' }))
    }
  },
)

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Dinosaur Encyclopedia"
      description="Browse the complete dinosaur database with detailed information. Filter by era, diet, and size. Search and compare dinosaurs side by side."
    />
    <h1 class="text-display-lg mb-4">{{ t('ui.encyclopedia.title') }}</h1>
    <p class="text-body-lg mb-8">
      {{ modeStore.isKidsMode
        ? t('ui.encyclopedia.kidsDescription')
        : t('ui.encyclopedia.description')
      }}
    </p>

    <!-- Search + Sort row -->
    <div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
      <div class="flex-1">
        <BaseInput
          :model-value="store.searchQuery"
          :placeholder="t('ui.encyclopedia.searchPlaceholder')"
          :label="t('ui.encyclopedia.search')"
          icon-left="search"
          @update:model-value="store.setSearch"
        />
      </div>
      <div class="w-full sm:w-48">
        <BaseSelect
          :model-value="store.sortBy"
          :options="sortOptions"
          :label="t('ui.encyclopedia.sortBy')"
          @update:model-value="(v: string) => store.setSort(v as SortOption)"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="space-y-4 mb-8">
      <div>
        <div class="text-label text-[var(--color-text-secondary)] mb-2">{{ t('ui.encyclopedia.era') }}</div>
        <div class="flex flex-wrap gap-2">
          <BaseChip
            v-for="chip in eraChips"
            :key="chip.value"
            :label="chip.label"
            :icon="chip.icon"
            :selected="store.eraFilters.includes(chip.value)"
            @toggle="store.toggleEraFilter(chip.value)"
          />
        </div>
      </div>
      <div>
        <div class="text-label text-[var(--color-text-secondary)] mb-2">{{ t('ui.encyclopedia.diet') }}</div>
        <div class="flex flex-wrap gap-2">
          <BaseChip
            v-for="chip in dietChips"
            :key="chip.value"
            :label="chip.label"
            :icon="chip.icon"
            :selected="store.dietFilters.includes(chip.value)"
            @toggle="store.toggleDietFilter(chip.value)"
          />
        </div>
      </div>
      <div>
        <div class="text-label text-[var(--color-text-secondary)] mb-2">{{ t('ui.encyclopedia.size') }}</div>
        <div class="flex flex-wrap gap-2">
          <BaseChip
            v-for="chip in sizeChips"
            :key="chip.value"
            :label="chip.label"
            :icon="chip.icon"
            :selected="store.sizeFilters.includes(chip.value)"
            @toggle="store.toggleSizeFilter(chip.value)"
          />
        </div>
      </div>
      <div>
        <div class="text-label text-[var(--color-text-secondary)] mb-2">{{ t('ui.encyclopedia.category') }}</div>
        <div class="flex flex-wrap gap-2">
          <BaseChip
            v-for="chip in categoryChips"
            :key="chip.value"
            :label="chip.label"
            :icon="chip.icon"
            :selected="store.categoryFilter === chip.value"
            @toggle="store.toggleCategoryFilter(chip.value)"
          />
        </div>
      </div>

      <div v-if="store.hasActiveFilters || store.searchQuery" class="pt-2">
        <BaseButton variant="ghost" size="sm" icon="x" @click="store.clearFilters()">
          {{ t('ui.encyclopedia.clearFilters') }}
        </BaseButton>
      </div>
    </div>

    <!-- Results count -->
    <p class="text-body-sm text-[var(--color-text-tertiary)] mb-4">
      {{ t('ui.encyclopedia.found', { count: store.filteredDinosaurs.length, plural: store.filteredDinosaurs.length !== 1 ? 's' : '' }) }}
    </p>

    <!-- Grid -->
    <div v-if="store.paginatedDinosaurs.length > 0" ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
      <div
        v-for="dino in translatedPaginatedDinosaurs"
        :key="dino.id"
        class="dino-card group cursor-pointer"
        @click="router.push(localRoute({ name: 'encyclopedia-detail', params: { id: dino.id } }))"
      >
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-card-hover)] group-hover:border-[var(--glass-border-hover)]">
          <!-- Image area -->
          <div class="aspect-[4/3] overflow-hidden relative">
            <DinoCardImage
              :dino="dino"
              class="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <!-- Era accent pill floating on image -->
            <div
              class="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              :style="{
                background: `${ERA_ACCENT[dino.era]}22`,
                color: ERA_ACCENT[dino.era],
                border: `1px solid ${ERA_ACCENT[dino.era]}40`,
                backdropFilter: 'blur(6px)',
              }"
            >
              {{ t(`ui.encyclopedia.${dino.era}`) }}
            </div>
            <!-- Diet icon badge -->
            <div class="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center text-[11px]"
              style="background: rgba(0,0,0,0.45); backdrop-filter: blur(6px);"
            >
              {{ dino.diet === 'carnivore' ? '🦷' : dino.diet === 'herbivore' ? '🌿' : '🌾' }}
            </div>
          </div>

          <!-- Era accent line -->
          <div
            class="h-[2px] w-full"
            :style="{ background: `linear-gradient(to right, ${ERA_ACCENT[dino.era]}80, ${ERA_ACCENT[dino.era]}20, transparent)` }"
          />

          <!-- Card info -->
          <div class="p-4">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="font-bold text-[var(--color-text-primary)] leading-tight text-sm">{{ dino.name }}</h3>
              <span class="shrink-0 text-[10px] text-[var(--color-text-tertiary)] mt-0.5 whitespace-nowrap">
                {{ dino.periodRangeMya[0] }}–{{ dino.periodRangeMya[1] }} Ma
              </span>
            </div>
            <p class="text-[10px] text-[var(--color-text-tertiary)] mb-3 italic">{{ dino.nameMeaning }}</p>
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span :class="['px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide', DIET_BADGE_CLASS[dino.diet] ?? 'bg-[rgba(255,255,255,0.06)] text-[var(--color-text-tertiary)]']">
                {{ t(`ui.encyclopedia.${dino.diet}`) }}
              </span>
              <span class="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide bg-[rgba(255,255,255,0.05)] text-[var(--color-text-tertiary)]">
                {{ t(`ui.encyclopedia.${dino.size}`) }}
              </span>
            </div>
            <p class="text-[11px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
              {{ modeStore.isKidsMode ? dino.kidsDescription : dino.description }}
            </p>
          </div>

          <!-- View detail footer -->
          <div class="px-4 pb-3 flex items-center justify-between">
            <span class="text-[10px] text-[var(--color-text-tertiary)]">
              {{ dino.dimensions.lengthMeters }}m · {{ (dino.dimensions.weightKg / 1000).toFixed(1) }}t
            </span>
            <span
              class="text-[10px] font-semibold transition-colors group-hover:text-[var(--color-brand-amber)]"
              :style="{ color: `${ERA_ACCENT[dino.era]}99` }"
            >
              {{ t('ui.encyclopedia.viewDetail') }}
            </span>
          </div>
        </div>
      </div>
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
    <div v-if="store.totalPages > 1" class="flex items-center justify-center gap-2">
      <BaseButton
        variant="ghost" size="sm"
        :disabled="store.currentPage === 1"
        @click="store.setPage(store.currentPage - 1)"
      >
        {{ t('ui.encyclopedia.previous') }}
      </BaseButton>
      <span
        v-for="p in store.totalPages"
        :key="p"
        class="w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors"
        :class="store.currentPage === p ? 'bg-[var(--color-brand-amber)] text-black' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
        @click="store.setPage(p)"
      >
        {{ p }}
      </span>
      <BaseButton
        variant="ghost" size="sm"
        :disabled="store.currentPage === store.totalPages"
        @click="store.setPage(store.currentPage + 1)"
      >
        {{ t('ui.encyclopedia.next') }}
      </BaseButton>
    </div>

    <!-- Detail Modal -->
    <BaseModal
      :is-open="store.isModalOpen"
      :title="dinoDetail?.name"
      size="lg"
      @close="store.closeDetail()"
    >
      <template v-if="dinoDetail">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div class="aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden mb-4">
              <DinoCardImage
                :dino="dinoDetail"
                aspect-ratio="4/3"
                :priority="true"
                class="w-full h-full"
              />
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(212,164,58,0.12)] text-[var(--color-brand-amber)]">{{ t(`ui.encyclopedia.${dinoDetail.era}`) }}</span>
              <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(232,93,44,0.1)] text-[var(--color-brand-ember)]">{{ t(`ui.encyclopedia.${dinoDetail.diet}`) }}</span>
              <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(139,58,42,0.1)] text-[var(--color-brand-lava)]">{{ t(`ui.encyclopedia.${dinoDetail.size}`) }}</span>
            </div>
          </div>
          <div>
            <h3 class="text-heading-md mb-1">{{ dinoDetail.nameMeaning }}</h3>
            <p class="text-body-sm text-[var(--color-text-tertiary)] mb-4 italic">{{ dinoDetail.pronunciation }}</p>

            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                {{ modeStore.isKidsMode ? t('ui.header.kidsMode') : t('ui.header.adultsMode') }}
              </span>
              <ModeSwitcher />
            </div>
            <p class="text-body-md mb-6">{{ modeStore.isKidsMode ? dinoDetail.kidsDescription : dinoDetail.description }}</p>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3">
                <BaseIcon name="ruler" :size="16" class="text-[var(--color-text-tertiary)]" />
                <span class="text-sm text-[var(--color-text-secondary)]">
                  {{ t('ui.encyclopedia.dimensionsText', { length: dinoDetail.dimensions.lengthMeters, height: dinoDetail.dimensions.heightMeters }) }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <BaseIcon name="weight" :size="16" class="text-[var(--color-text-tertiary)]" />
                <span class="text-sm text-[var(--color-text-secondary)]">
                  {{ dinoDetail.dimensions.weightKg.toLocaleString() }} kg
                </span>
              </div>
              <div class="flex items-center gap-3">
                <BaseIcon name="zap" :size="16" class="text-[var(--color-text-tertiary)]" />
                <span class="text-sm text-[var(--color-text-secondary)]">
                  {{ t('ui.encyclopedia.speedText', { speed: dinoDetail.dimensions.speedKmh }) }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <BaseIcon name="map-pin" :size="16" class="text-[var(--color-text-tertiary)]" />
                <span class="text-sm text-[var(--color-text-secondary)]">
                  {{ dinoDetail.livedIn.map(loc => t(`ui.encyclopedia.locations.${loc}`, loc)).join(', ') }}
                </span>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <h4 class="text-sm font-semibold text-[var(--color-text-primary)] !mb-2">{{ t('ui.encyclopedia.keyFacts') }}</h4>
              <div v-for="fact in dinoDetail.facts" :key="fact.label" class="flex items-start gap-3">
                <BaseIcon :name="fact.icon" :size="16" class="text-[var(--color-brand-amber)] mt-0.5 shrink-0" />
                <div>
                  <div class="text-sm font-medium text-[var(--color-text-primary)]">{{ fact.label }}: {{ fact.value }}</div>
                  <div class="text-xs text-[var(--color-text-tertiary)]">{{ fact.description }}</div>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-[var(--radius-md)] bg-[rgba(212,164,58,0.06)] border border-[rgba(212,164,58,0.1)] mb-4">
              <div class="text-xs font-semibold text-[var(--color-brand-amber)] mb-1">{{ t('ui.encyclopedia.funFact') }}</div>
              <p class="text-sm text-[var(--color-text-secondary)]">{{ dinoDetail.funFact }}</p>
            </div>

            <BaseButton variant="ghost" size="sm" icon-right="arrow-right" @click="addToCompare(dinoDetail.id)">
              {{ t('ui.encyclopedia.addToCompare') }}
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
