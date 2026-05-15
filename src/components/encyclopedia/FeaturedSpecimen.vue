<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { useModeStore } from '@/stores/useModeStore'
import { useDinoTranslation } from '@/composables/useDinoTranslation'
import type { Dinosaur } from '@/types/dinosaur'
import BaseButton from '@/components/ui/BaseButton.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'

const props = defineProps<{
  dinosaur: Dinosaur
}>()

const { t } = useI18n()
const modeStore = useModeStore()
const { translated } = useDinoTranslation(props.dinosaur)

const dangerLabel = computed(() => {
  if (props.dinosaur.dangerLevel >= 8) return t('ui.featured.apexPredator')
  if (props.dinosaur.dangerLevel >= 5) return t('ui.featured.formidable')
  return t('ui.featured.gentleGiant')
})

const categoryLabel = computed(() => {
  const cat = props.dinosaur.category
  if (cat === 'flying-reptile') return t('ui.featured.flyingReptile')
  if (cat === 'marine-reptile') return t('ui.featured.marineReptile')
  return translated.value.diet
})

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.fs-image', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.7 })
  tl.fromTo('.fs-content', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
  tl.fromTo('.fs-stats > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
})
</script>

<template>
  <div
    class="rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[rgba(23,34,22,0.72)] shadow-[var(--shadow-modal)] overflow-hidden"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
      <!-- Artwork column -->
      <div class="fs-image relative overflow-hidden">
        <div class="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]">
          <DinoCardImage
            :dino="dinosaur"
            variant="hero"
            :priority="true"
            class="w-full h-full"
          />
        </div>
        <!-- Rarity badge overlay -->
        <div
          class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border"
          :style="{
            background: dinosaur.dangerLevel >= 8 ? 'rgba(232,93,44,0.18)' : dinosaur.dangerLevel >= 5 ? 'rgba(212,164,58,0.15)' : 'rgba(74,222,128,0.12)',
            borderColor: dinosaur.dangerLevel >= 8 ? 'rgba(232,93,44,0.3)' : dinosaur.dangerLevel >= 5 ? 'rgba(212,164,58,0.25)' : 'rgba(74,222,128,0.2)',
            color: dinosaur.dangerLevel >= 8 ? 'var(--color-brand-ember)' : dinosaur.dangerLevel >= 5 ? 'var(--color-brand-amber)' : 'var(--color-brand-teal)',
          }"
        >
          {{ dangerLabel }}
        </div>
      </div>

      <!-- Content column -->
      <div class="fs-content p-6 sm:p-8 flex flex-col justify-center">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide mb-3"
          :class="{
            'bg-[rgba(232,93,44,0.12)] text-[var(--color-brand-ember)]': dinosaur.category === 'carnivore',
            'bg-[rgba(74,222,128,0.1)] text-[var(--color-brand-teal)]': dinosaur.category === 'herbivore',
            'bg-[rgba(212,164,58,0.12)] text-[var(--color-brand-amber)]': dinosaur.category === 'omnivore',
            'bg-[rgba(96,165,250,0.12)] text-blue-300': dinosaur.category === 'flying-reptile',
            'bg-[rgba(167,139,250,0.12)] text-purple-300': dinosaur.category === 'marine-reptile',
          }"
        >
          {{ categoryLabel }}
        </div>

        <h2 class="text-display-md mb-1">{{ translated.displayName }}</h2>
        <p class="text-body-sm text-[var(--color-text-tertiary)] italic mb-4">{{ translated.pronunciation }}</p>

        <p class="text-body-md text-[var(--color-text-secondary)] mb-5 leading-relaxed">
          {{ modeStore.isKidsMode ? translated.kidsDescription : translated.description }}
        </p>

        <!-- Quick stats -->
        <div class="fs-stats grid grid-cols-3 gap-3 mb-5">
          <div class="rounded-[var(--radius-md)] bg-[var(--color-bg-overlay)]/80 border border-[var(--glass-border)] p-3 text-center">
            <div class="text-sm font-bold text-[var(--color-brand-amber)]">{{ translated.era }}</div>
            <div class="text-[10px] text-[var(--color-text-tertiary)]">{{ t('ui.featured.era') }}</div>
          </div>
          <div class="rounded-[var(--radius-md)] bg-[var(--color-bg-overlay)]/80 border border-[var(--glass-border)] p-3 text-center">
            <div class="text-sm font-bold text-[var(--color-brand-ember)]">{{ translated.dimensions.lengthMeters }}m</div>
            <div class="text-[10px] text-[var(--color-text-tertiary)]">{{ t('ui.featured.length') }}</div>
          </div>
          <div class="rounded-[var(--radius-md)] bg-[var(--color-bg-overlay)]/80 border border-[var(--glass-border)] p-3 text-center">
            <div class="text-sm font-bold text-[var(--color-brand-teal)]">{{ translated.dimensions.weightKg.toLocaleString() }}kg</div>
            <div class="text-[10px] text-[var(--color-text-tertiary)]">{{ t('ui.featured.mass') }}</div>
          </div>
        </div>

        <!-- Fun fact callout -->
        <div class="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[rgba(212,164,58,0.06)] border border-[rgba(212,164,58,0.12)] mb-5">
          <span class="text-lg flex-shrink-0">💡</span>
          <p class="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">{{ translated.funFact }}</p>
        </div>

        <BaseButton
          :to="`/encyclopedia/${dinosaur.id}`"
          size="lg"
          icon="book-open"
        >
          {{ t('ui.featured.discover', { name: translated.displayName }) }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
