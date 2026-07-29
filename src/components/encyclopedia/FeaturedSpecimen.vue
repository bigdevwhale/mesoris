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

const ERA_ACCENT: Record<string, string> = {
  triassic: '#a855f7',
  jurassic: '#4ade80',
  cretaceous: '#d4a43a',
}

const eraAccent = computed(() => ERA_ACCENT[props.dinosaur.era] ?? '#d4a43a')

const dangerLabel = computed(() => {
  if (props.dinosaur.dangerLevel >= 8) return t('ui.featured.apexPredator')
  if (props.dinosaur.dangerLevel >= 5) return t('ui.featured.formidable')
  return t('ui.featured.gentleGiant')
})

const dangerStyle = computed(() => {
  if (props.dinosaur.dangerLevel >= 8)
    return { bg: 'rgba(232,93,44,0.18)', border: 'rgba(232,93,44,0.38)', color: 'var(--color-brand-ember)' }
  if (props.dinosaur.dangerLevel >= 5)
    return { bg: 'rgba(212,164,58,0.15)', border: 'rgba(212,164,58,0.32)', color: 'var(--color-brand-amber)' }
  return { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.28)', color: 'var(--color-brand-teal)' }
})

const categoryLabel = computed(() => {
  const cat = props.dinosaur.category
  if (cat === 'flying-reptile') return t('ui.featured.flyingReptile')
  if (cat === 'marine-reptile') return t('ui.featured.marineReptile')
  return t(`ui.encyclopedia.${translated.value.diet}`)
})

const massDisplay = computed(() => {
  const kg = props.dinosaur.dimensions.weightKg
  return kg >= 1000 ? `${(kg / 1000).toFixed(1)}t` : `${kg}kg`
})

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.fs-image', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.7 })
  tl.fromTo('.fs-content', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
  tl.fromTo('.fs-stats > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
})
</script>

<template>
  <div class="rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] shadow-[var(--shadow-modal)] overflow-hidden">

    <!-- Image — full width, fixed height -->
    <div class="fs-image relative overflow-hidden" style="height: 280px;">
      <DinoCardImage
        :dino="dinosaur"
        variant="hero"
        :priority="true"
        class="absolute inset-0 w-full h-full"
      />

      <!-- Top: header label + danger badge -->
      <div class="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pt-3 pb-8"
        style="background: linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-amber)] animate-pulse" />
          <span class="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-brand-amber)]">
            {{ t('ui.featured.title') }}
          </span>
        </div>
        <div
          class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border"
          :style="{
            background: dangerStyle.bg,
            borderColor: dangerStyle.border,
            color: dangerStyle.color,
          }"
        >
          {{ dangerLabel }}
        </div>
      </div>

      <!-- Bottom: name overlay -->
      <div class="absolute bottom-0 inset-x-0 z-20 px-5 pb-4 pt-10"
        style="background: linear-gradient(to top, var(--card-fade-1) 0%, var(--card-fade-2) 60%, transparent 100%)">
        <div
          class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide mb-2"
          :class="{
            'bg-[rgba(232,93,44,0.18)] text-[var(--color-brand-ember)]': dinosaur.category === 'carnivore',
            'bg-[rgba(74,222,128,0.15)] text-[var(--color-brand-teal)]': dinosaur.category === 'herbivore',
            'bg-[rgba(212,164,58,0.18)] text-[var(--color-brand-amber)]': dinosaur.category === 'omnivore',
            'bg-[rgba(96,165,250,0.18)] text-blue-300': dinosaur.category === 'flying-reptile',
            'bg-[rgba(167,139,250,0.18)] text-purple-300': dinosaur.category === 'marine-reptile',
          }"
        >
          {{ categoryLabel }}
        </div>
        <h2 class="text-heading-lg leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {{ translated.displayName }}
        </h2>
        <p v-if="translated.nameMeaning" class="text-[11px] italic text-white/50 mt-0.5">
          {{ translated.nameMeaning }}
        </p>
      </div>

      <!-- Era accent line -->
      <div
        class="absolute bottom-0 inset-x-0 h-0.5 z-30"
        :style="{ background: `linear-gradient(to right, ${eraAccent}cc, ${eraAccent}44, transparent)` }"
      />
    </div>

    <!-- Content section -->
    <div class="fs-content relative overflow-hidden px-5 py-5 flex flex-col gap-4">
      <!-- Ambient era glow -->
      <div
        class="absolute inset-0 pointer-events-none"
        :style="{ background: `radial-gradient(ellipse at 100% 0%, ${eraAccent}0f 0%, transparent 55%)` }"
      />

      <!-- Description -->
      <p class="relative text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {{ modeStore.isKidsMode ? translated.kidsDescription : translated.description }}
      </p>

      <!-- Quick stats -->
      <div class="fs-stats relative grid grid-cols-3 gap-2.5">
        <div class="rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] px-3 py-3 text-center">
          <div class="text-sm font-bold text-[var(--color-brand-amber)] leading-tight mb-1 capitalize">{{ t(`ui.encyclopedia.${translated.era}`) }}</div>
          <div class="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)]">{{ t('ui.featured.era') }}</div>
        </div>
        <div class="rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] px-3 py-3 text-center">
          <div class="text-sm font-bold text-[var(--color-brand-ember)] leading-tight mb-1">{{ translated.dimensions.lengthMeters }} {{ t('ui.encyclopedia.units.meters') }}</div>
          <div class="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)]">{{ t('ui.featured.length') }}</div>
        </div>
        <div class="rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] px-3 py-3 text-center">
          <div class="text-sm font-bold text-[var(--color-brand-teal)] leading-tight mb-1">{{ massDisplay }}</div>
          <div class="text-[10px] uppercase tracking-wide text-[var(--color-text-tertiary)]">{{ t('ui.featured.mass') }}</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="relative">
        <BaseButton
          :to="`/encyclopedia/${dinosaur.id}`"
          size="sm"
          icon="book-open"
          class="w-full justify-center"
        >
          {{ t('ui.featured.discover', { name: translated.displayName }) }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
