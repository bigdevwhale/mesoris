<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { eras } from '@/data/eras'
import { dinosaurs } from '@/data/dinosaurs'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t, locale } = useI18n()

const activeEraIndex = ref(0)
const timelineRef = ref<HTMLElement | null>(null)
const eraDetailRef = ref<HTMLElement | null>(null)

useScrollAnimation(timelineRef, { animation: { y: 40, duration: 0.8, ease: 'power3.out' }, threshold: 0.1 })

function selectEra(idx: number) {
  activeEraIndex.value = idx
}

watch(activeEraIndex, () => {
  nextTick(() => {
    if (!eraDetailRef.value) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    gsap.fromTo(eraDetailRef.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
  })
})

const selectedEra = computed(() => eras[activeEraIndex.value])

// Locale-aware era field helpers
const eraName = (era: typeof eras[0]) => {
  if (locale.value === 'it') return era.nameIt
  if (locale.value === 'fr') return era.nameFr
  if (locale.value === 'de') return era.nameDe
  if (locale.value === 'es') return era.nameEs
  if (locale.value === 'ru') return era.nameRu
  return era.name
}
const eraDesc = (era: typeof eras[0]) => {
  if (locale.value === 'it') return era.descriptionIt
  if (locale.value === 'fr') return era.descriptionFr
  if (locale.value === 'de') return era.descriptionDe
  if (locale.value === 'es') return era.descriptionEs
  if (locale.value === 'ru') return era.descriptionRu
  return era.description
}
const eraKeyEvents = (era: typeof eras[0]) => {
  if (locale.value === 'it') return era.keyEventsIt
  if (locale.value === 'fr') return era.keyEventsFr
  if (locale.value === 'de') return era.keyEventsDe
  if (locale.value === 'es') return era.keyEventsEs
  if (locale.value === 'ru') return era.keyEventsRu
  return era.keyEvents
}
const eraClimate = (era: typeof eras[0]) => {
  if (locale.value === 'it') return era.climateDescriptionIt
  if (locale.value === 'fr') return era.climateDescriptionFr
  if (locale.value === 'de') return era.climateDescriptionDe
  if (locale.value === 'es') return era.climateDescriptionEs
  if (locale.value === 'ru') return era.climateDescriptionRu
  return era.climateDescription
}

const { translateDino } = useDinoTranslator()
const eraDinos = computed(() => {
  const era = selectedEra.value
  return era ? dinosaurs.filter(d => d.era === era.id) : []
})
const translatedEraDinos = computed(() => eraDinos.value.map(translateDino))

const totalSpan = 252
const eraBarWidth = (era: typeof eras[0]) => (era.durationMillionYears / totalSpan) * 100
const eraOffset = (index: number) =>
  eras.slice(0, index).reduce((sum, e) => sum + (e.durationMillionYears / totalSpan) * 100, 0)

const timelineEventsData = [
  { key: 'firstDinosaurs', mya: 230, icon: 'footprints' },
  { key: 'firstMammals',   mya: 225, icon: 'paw-print'  },
  { key: 'firstBirds',     mya: 150, icon: 'bird'        },
  { key: 'firstFlowers',   mya: 130, icon: 'flower'      },
  { key: 'kpgExtinction',  mya: 66,  icon: 'flame'       },
] as const

const timelineEvents = computed(() =>
  timelineEventsData.map(e => ({
    ...e,
    label:       t(`ui.timeline.events.${e.key}`),
    description: t(`ui.timeline.events.${e.key}Desc`),
  }))
)

const mya = computed(() => t('ui.timeline.millionsOfYears'))
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('ui.timeline.title')"
      :description="t('ui.timeline.description')"
    />

    <!-- Page heading -->
    <h1 class="text-display-lg mb-3">{{ t('ui.timeline.title') }}</h1>
    <p class="text-body-lg max-w-3xl mb-10 text-[var(--color-text-secondary)]">{{ t('ui.timeline.description') }}</p>

    <!-- Timeline card -->
    <div ref="timelineRef" class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6 sm:p-10 mb-12">

      <!-- Card header -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 class="text-heading-md">{{ t('ui.timeline.mesozoicTitle') }}</h2>
          <p class="text-body-sm mt-1">{{ t('ui.timeline.selectEraHint') }}</p>
        </div>
        <span class="text-xs font-medium text-[var(--color-brand-amber)] bg-[rgba(212,164,58,0.1)] border border-[rgba(212,164,58,0.2)] rounded-full px-3 py-1 hidden sm:inline-flex items-center gap-1.5 self-start sm:self-auto">
          <BaseIcon name="clock" :size="12" />
          {{ t('ui.timeline.historySpan') }}
        </span>
      </div>

      <!-- Mobile era stack -->
      <div class="md:hidden space-y-3 mb-6">
        <button
          v-for="(era, idx) in eras"
          :key="era.id"
          type="button"
          class="w-full text-left rounded-[var(--radius-lg)] border p-4 transition-all"
          :class="activeEraIndex === idx
            ? 'border-[rgba(212,164,58,0.45)] bg-[rgba(212,164,58,0.08)] shadow-sm'
            : 'border-[var(--glass-border)] bg-[var(--color-bg-overlay)]/60'"
          @click="selectEra(idx)"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="text-heading-md">{{ eraName(era) }}</div>
              <div class="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                {{ era.rangeMya[0] }}–{{ era.rangeMya[1] }} {{ mya }} · {{ t('ui.timeline.millionYearsCount', { n: era.durationMillionYears }) }}
              </div>
            </div>
            <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0" :class="era.colorClass">
              <BaseIcon :name="era.icon" :size="16" class="text-white" />
            </div>
          </div>
          <div class="mt-3 h-1.5 rounded-full bg-[var(--color-bg-deep)] overflow-hidden">
            <div class="h-full rounded-full transition-all" :class="era.colorClass" :style="{ width: `${eraBarWidth(era)}%` }" />
          </div>
        </button>
      </div>

      <!-- Era bar (desktop) -->
      <div class="relative hidden md:block h-14 rounded-full bg-[var(--color-bg-overlay)] mb-3 overflow-hidden">
        <div
          v-for="(era, idx) in eras"
          :key="era.id"
          class="absolute top-0 h-full cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-lg"
          :class="[era.colorClass, activeEraIndex === idx ? 'ring-2 ring-white/35 z-10 opacity-100' : 'opacity-70']"
          :style="{ left: `${eraOffset(idx)}%`, width: `${eraBarWidth(era)}%` }"
          @click="selectEra(idx)"
        >
          <span class="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white/95 truncate px-2">
            {{ eraName(era) }}
          </span>
        </div>
      </div>

      <!-- Scale labels -->
      <div class="hidden md:flex justify-between text-xs text-[var(--color-text-tertiary)] mb-8">
        <span>252 {{ mya }}</span>
        <span>201 {{ mya }}</span>
        <span>145 {{ mya }}</span>
        <span>66 {{ mya }}</span>
      </div>

      <!-- Timeline events (desktop) -->
      <div class="hidden md:block relative mb-8" style="height: 148px;">
        <div class="absolute inset-x-0 h-px bg-[var(--glass-border)]" style="top: 74px;" />
        <template v-for="(event, idx) in timelineEvents" :key="event.key">
          <div
            class="absolute z-10 -translate-x-1/2 group"
            :style="{ left: `${((totalSpan - event.mya) / totalSpan) * 100}%`, top: '67px' }"
          >
            <div class="w-3.5 h-3.5 rounded-full bg-[var(--color-brand-amber)] shadow-[0_0_10px_rgba(212,164,58,0.45)] group-hover:scale-150 transition-transform cursor-default" />
          </div>
          <div
            v-if="idx % 2 === 0"
            class="absolute -translate-x-1/2 flex flex-col items-center text-center"
            :style="{ left: `${((totalSpan - event.mya) / totalSpan) * 100}%`, top: '4px' }"
          >
            <p class="text-[11px] font-semibold text-[var(--color-text-primary)] whitespace-nowrap leading-tight">{{ event.label }}</p>
            <p class="text-[10px] text-[var(--color-text-tertiary)] whitespace-nowrap mt-0.5">{{ event.mya }} {{ mya }}</p>
            <div class="w-px flex-1 bg-[var(--glass-border)] mt-1.5" style="min-height: 16px;" />
          </div>
          <div
            v-else
            class="absolute -translate-x-1/2 flex flex-col items-center text-center"
            :style="{ left: `${((totalSpan - event.mya) / totalSpan) * 100}%`, top: '82px' }"
          >
            <div class="w-px bg-[var(--glass-border)] mb-1.5" style="height: 16px;" />
            <p class="text-[11px] font-semibold text-[var(--color-text-primary)] whitespace-nowrap leading-tight">{{ event.label }}</p>
            <p class="text-[10px] text-[var(--color-text-tertiary)] whitespace-nowrap mt-0.5">{{ event.mya }} {{ mya }}</p>
          </div>
        </template>
      </div>

      <!-- Timeline events (mobile) -->
      <div class="md:hidden space-y-3 mb-6">
        <div
          v-for="event in timelineEvents"
          :key="event.key"
          class="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-overlay)]/60 p-4"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="w-9 h-9 rounded-full bg-[rgba(212,164,58,0.14)] flex items-center justify-center text-[var(--color-brand-amber)] shrink-0">
              <BaseIcon :name="event.icon" :size="16" />
            </div>
            <div>
              <div class="text-sm font-semibold text-[var(--color-text-primary)]">{{ event.label }}</div>
              <div class="text-xs text-[var(--color-text-tertiary)]">{{ event.mya }} {{ mya }}</div>
            </div>
          </div>
          <p class="text-body-sm">{{ event.description }}</p>
        </div>
      </div>

      <!-- Era details -->
      <div class="border-t border-[var(--glass-border)] pt-6">
        <div ref="eraDetailRef">

          <!-- Era header with stats -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :class="selectedEra.colorClass">
              <BaseIcon :name="selectedEra.icon" :size="20" class="text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-heading-md leading-tight mb-1">{{ eraName(selectedEra) }}</h2>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="inline-flex items-center gap-1 text-xs bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] rounded-full px-2.5 py-1 text-[var(--color-text-secondary)]">
                  <BaseIcon name="calendar" :size="11" />
                  {{ selectedEra.rangeMya[0] }}–{{ selectedEra.rangeMya[1] }} {{ mya }}
                </span>
                <span class="inline-flex items-center gap-1 text-xs bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] rounded-full px-2.5 py-1 text-[var(--color-text-secondary)]">
                  <BaseIcon name="hourglass" :size="11" />
                  {{ t('ui.timeline.millionYearsCount', { n: selectedEra.durationMillionYears }) }}
                </span>
                <span
                  v-if="eraDinos.length > 0"
                  class="inline-flex items-center gap-1 text-xs bg-[rgba(212,164,58,0.1)] border border-[rgba(212,164,58,0.2)] rounded-full px-2.5 py-1 text-[var(--color-brand-amber)]"
                >
                  <BaseIcon name="dna" :size="11" />
                  {{ eraDinos.length }} {{ t('ui.timeline.speciesFound') }}
                </span>
              </div>
            </div>
          </div>

          <p class="text-body-md mb-6 text-[var(--color-text-secondary)]">{{ eraDesc(selectedEra) }}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div class="bg-[var(--color-bg-overlay)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-4">
              <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <BaseIcon name="thermometer" :size="14" class="text-[var(--color-brand-amber)]" />
                {{ t('ui.timeline.climate') }}
              </h3>
              <p class="text-body-sm">{{ eraClimate(selectedEra) }}</p>
            </div>
            <div class="bg-[var(--color-bg-overlay)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-4">
              <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <BaseIcon name="zap" :size="14" class="text-[var(--color-brand-amber)]" />
                {{ t('ui.timeline.keyEvents') }}
              </h3>
              <ul class="space-y-2">
                <li v-for="event in eraKeyEvents(selectedEra)" :key="event" class="flex items-start gap-2 text-body-sm">
                  <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-amber)] shrink-0" />
                  {{ event }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Era dinosaurs -->
          <div v-if="eraDinos.length > 0">
            <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <BaseIcon name="footprints" :size="14" class="text-[var(--color-brand-amber)]" />
              {{ t('ui.timeline.dinosaursOfEra', { era: eraName(selectedEra) }) }}
            </h3>
            <div class="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              <router-link
                v-for="dino in translatedEraDinos"
                :key="dino.id"
                :to="`/encyclopedia/${dino.id}`"
                class="flex-shrink-0 w-28 text-center group"
              >
                <div class="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-[var(--glass-border)] group-hover:border-[var(--color-brand-amber)] group-hover:shadow-[0_0_12px_rgba(212,164,58,0.3)] transition-all">
                  <BaseLazyImage
                    :src="dino.images.card"
                    :alt="dino.name"
                    aspect-ratio="1/1"
                    class="w-full h-full"
                  />
                </div>
                <span class="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors leading-tight block">{{ dino.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Extinction event banner -->
    <div class="bg-gradient-to-r from-[rgba(196,56,45,0.12)] to-[rgba(212,164,58,0.08)] border border-[rgba(196,56,45,0.25)] rounded-[var(--radius-xl)] p-6 sm:p-10 text-center">
      <div class="text-5xl mb-4">☄️</div>
      <h2 class="text-display-md mb-3">{{ t('ui.timeline.extinctionTitle') }}</h2>
      <p class="text-body-lg max-w-2xl mx-auto text-[var(--color-text-secondary)]">{{ t('ui.timeline.extinctionText') }}</p>
    </div>
  </div>
</template>
