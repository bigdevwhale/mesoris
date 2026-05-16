<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useComparisonStore } from '@/stores/useComparisonStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { dinosaurs } from '@/data/dinosaurs'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const store = useComparisonStore()
const route = useRoute()
const { t } = useI18n()

// Pre-fill slot A when navigating from a dino card (/compare?a=id)
watch(() => route.query.a as string | undefined, (id) => {
  if (id) store.selectA(id)
}, { immediate: true })
const { translateDino } = useDinoTranslator()

const dinoOptions = computed(() =>
  dinosaurs
    .filter(d => d.id !== store.dinoIdA && d.id !== store.dinoIdB)
    .map(d => ({ label: translateDino(d).name, value: d.id }))
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

// Animate comparison section when it appears
watch(() => store.bothSelected, (selected) => {
  if (selected) {
    requestAnimationFrame(() => {
      const bars = document.querySelectorAll('.stat-bar-fill')
      bars.forEach((bar) => {
        const el = bar as HTMLElement
        const targetWidth = el.style.width
        el.style.width = '0%'
        requestAnimationFrame(() => {
          el.style.width = targetWidth
        })
      })
    })
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Compare Dinosaurs"
      description="Compare any two dinosaurs side by side. See how they stack up in size, weight, speed, and height with interactive visual comparison bars."
    />
    <h1 class="text-display-lg mb-4">{{ t('ui.compare.title') }}</h1>
    <p class="text-body-lg mb-10">{{ t('ui.compare.subtitle') }}</p>

    <!-- Selectors -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6">
        <h3 class="text-heading-md mb-4">{{ t('ui.compare.dinoA') }}</h3>
        <BaseSelect
          :model-value="store.dinoIdA ?? ''"
          :options="dinoOptions"
          :placeholder="t('ui.compare.chooseDino')"
          @update:model-value="store.selectA($event)"
        />
        <div v-if="translatedDinoA" class="mt-4 flex items-center gap-4">
          <div class="w-16 h-16 rounded-full overflow-hidden shrink-0">
            <DinoCardImage
              :dino="store.dinosaurA!"
              class="w-full h-full"
            />
          </div>
          <div>
            <div class="font-semibold text-[var(--color-text-primary)]">{{ translatedDinoA.name }}</div>
            <div class="text-sm text-[var(--color-text-tertiary)]">{{ t(`ui.encyclopedia.${translatedDinoA.era}`) }} &middot; {{ t(`ui.encyclopedia.${translatedDinoA.diet}`) }}</div>
          </div>
        </div>
      </div>

      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6">
        <h3 class="text-heading-md mb-4">{{ t('ui.compare.dinoB') }}</h3>
        <BaseSelect
          :model-value="store.dinoIdB ?? ''"
          :options="dinoOptions"
          :placeholder="t('ui.compare.chooseDino')"
          @update:model-value="store.selectB($event)"
        />
        <div v-if="translatedDinoB" class="mt-4 flex items-center gap-4">
          <div class="w-16 h-16 rounded-full overflow-hidden shrink-0">
            <DinoCardImage
              :dino="store.dinosaurB!"
              class="w-full h-full"
            />
          </div>
          <div>
            <div class="font-semibold text-[var(--color-text-primary)]">{{ translatedDinoB.name }}</div>
            <div class="text-sm text-[var(--color-text-tertiary)]">{{ t(`ui.encyclopedia.${translatedDinoB.era}`) }} &middot; {{ t(`ui.encyclopedia.${translatedDinoB.diet}`) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="store.bothSelected" class="flex gap-3 mb-8">
      <BaseButton variant="ghost" size="sm" icon="arrow-left-right" @click="store.swap()">{{ t('ui.compare.swap') }}</BaseButton>
      <BaseButton variant="ghost" size="sm" icon="x" @click="store.clear()">{{ t('ui.compare.clear') }}</BaseButton>
    </div>

    <!-- Comparison results -->
    <div v-if="translatedComparison" class="space-y-6">
      <div v-for="stat in translatedComparison.stats" :key="stat.label" class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold text-[var(--color-text-primary)]">{{ t(`ui.compare.${stat.label}Label`) }}</span>
          <span class="text-xs text-[var(--color-text-tertiary)]">{{ t(`ui.compare.${stat.label === 'weight' ? 'kg' : stat.label === 'speed' ? 'kmh' : 'meters'}Unit`) }}</span>
        </div>

        <!-- Bar A -->
        <div class="flex items-center gap-3 mb-2">
          <span class="w-28 text-right text-sm font-medium text-[var(--color-text-secondary)] shrink-0 truncate">{{ translatedComparison.dinosaurA.name }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <div class="flex-1 h-6 rounded-full bg-[var(--color-bg-overlay)] overflow-hidden">
                <div
                  class="stat-bar-fill h-full rounded-full transition-all duration-700 ease-out"
                  :class="stat.percentageA >= stat.percentageB ? 'bg-[var(--color-brand-amber)]' : 'bg-[var(--color-text-tertiary)]'"
                  :style="{ width: `${stat.percentageA}%` }"
                />
              </div>
              <span class="text-sm font-semibold text-[var(--color-text-primary)] w-16 text-right">{{ stat.valueA.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- Bar B -->
        <div class="flex items-center gap-3">
          <span class="w-28 text-right text-sm font-medium text-[var(--color-text-secondary)] shrink-0 truncate">{{ translatedComparison.dinosaurB.name }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <div class="flex-1 h-6 rounded-full bg-[var(--color-bg-overlay)] overflow-hidden">
                <div
                  class="stat-bar-fill h-full rounded-full transition-all duration-700 ease-out"
                  :class="stat.percentageB >= stat.percentageA ? 'bg-[var(--color-brand-amber)]' : 'bg-[var(--color-text-tertiary)]'"
                  :style="{ width: `${stat.percentageB}%` }"
                />
              </div>
              <span class="text-sm font-semibold text-[var(--color-text-primary)] w-16 text-right">{{ stat.valueB.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Visual comparison -->
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-8">
        <h3 class="text-heading-md mb-6 text-center">{{ t('ui.compare.heightComparison') }}</h3>
        <div class="flex items-end justify-center gap-8 sm:gap-16">
          <!-- Dino A -->
          <div class="flex flex-col items-center">
            <div
              class="w-20 sm:w-28 rounded-t-lg transition-all duration-700 bg-[var(--color-brand-amber)]/30 border-2 border-b-0 border-[var(--color-brand-amber)]/40"
              :style="{ height: `${Math.min(translatedComparison.dinosaurA.dimensions.heightMeters * 30, 240)}px` }"
            />
            <div class="text-xs text-[var(--color-text-secondary)] mt-2 text-center">
              <div class="font-semibold">{{ translatedComparison.dinosaurA.name }}</div>
              <div>{{ translatedComparison.dinosaurA.dimensions.heightMeters }}m</div>
            </div>
          </div>

          <!-- Human -->
          <div class="flex flex-col items-center">
            <div
              class="w-12 sm:w-16 rounded-t-lg transition-all duration-700 bg-[var(--color-brand-teal)]/30 border-2 border-b-0 border-[var(--color-brand-teal)]/40"
              :style="{ height: `${1.7 * 30}px` }"
            />
            <div class="text-xs text-[var(--color-text-secondary)] mt-2 text-center">
              <div class="font-semibold">{{ t('ui.compare.human') }}</div>
              <div>1.7m</div>
            </div>
          </div>

          <!-- Dino B -->
          <div class="flex flex-col items-center">
            <div
              class="w-20 sm:w-28 rounded-t-lg transition-all duration-700 bg-[var(--color-brand-moss)]/30 border-2 border-b-0 border-[var(--color-brand-moss)]/40"
              :style="{ height: `${Math.min(translatedComparison.dinosaurB.dimensions.heightMeters * 30, 240)}px` }"
            />
            <div class="text-xs text-[var(--color-text-secondary)] mt-2 text-center">
              <div class="font-semibold">{{ translatedComparison.dinosaurB.name }}</div>
              <div>{{ translatedComparison.dinosaurB.dimensions.heightMeters }}m</div>
            </div>
          </div>
        </div>

        <!-- Ground line -->
        <div class="mt-4 h-0.5 bg-[var(--glass-border)] rounded-full" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!store.dinoIdA && !store.dinoIdB" class="text-center py-20">
      <div class="text-5xl mb-4">⚖️</div>
      <h2 class="text-heading-md mb-2">{{ t('ui.compare.selectTwo') }}</h2>
      <p class="text-body-md text-[var(--color-text-secondary)]">{{ t('ui.compare.selectTwoDesc') }}</p>
    </div>
  </div>
</template>
