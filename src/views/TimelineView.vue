<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { eras } from '@/data/eras'
import { dinosaurs } from '@/data/dinosaurs'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const activeEraIndex = ref(0)
const timelineRef = ref<HTMLElement | null>(null)
const eraDetailRef = ref<HTMLElement | null>(null)

useScrollAnimation(timelineRef, { animation: { y: 40, duration: 0.8, ease: 'power3.out' }, threshold: 0.1 })
useScrollAnimation(eraDetailRef, { animation: { y: 48, duration: 0.7, ease: 'power3.out' } })

watch(activeEraIndex, () => {
  nextTick(() => {
    if (!eraDetailRef.value) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    gsap.fromTo(eraDetailRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  })
})

const selectedEra = computed(() => eras[activeEraIndex.value])

const eraDinos = computed(() => {
  const era = selectedEra.value
  return era ? dinosaurs.filter(d => era.dinosaurs.includes(d.id)) : []
})

const totalSpan = 252 // Mya from start of Triassic to present
const eraBarWidth = (era: typeof eras[0]) => (era.durationMillionYears / totalSpan) * 100
const eraOffset = (index: number) => {
  return eras.slice(0, index).reduce((sum, e) => sum + (e.durationMillionYears / totalSpan) * 100, 0)
}

const timelineEvents = [
  { label: 'First Dinosaurs', mya: 230, icon: 'footprints', description: 'The earliest true dinosaurs appear in the fossil record during the Late Triassic.' },
  { label: 'First Mammals', mya: 225, icon: 'paw-print', description: 'Small, shrew-like mammals coexist with early dinosaurs.' },
  { label: 'First Birds', mya: 150, icon: 'bird', description: 'Archaeopteryx, the first bird, evolves from theropod dinosaurs.' },
  { label: 'First Flowers', mya: 130, icon: 'flower', description: 'Angiosperms (flowering plants) appear and begin to diversify.' },
  { label: 'K-Pg Extinction', mya: 66, icon: 'flame', description: 'A massive asteroid impact ends the Mesozoic Era. All non-avian dinosaurs go extinct.' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Prehistoric Timeline — Mesozoic Era"
      description="Travel through 186 million years of dinosaur history. From the Triassic to the Cretaceous, explore key events, eras, and the dinosaurs that lived during each period."
    />
    <h1 class="text-display-lg mb-2">Prehistoric Timeline</h1>
    <p class="text-body-lg max-w-3xl mb-10">Travel through 186 million years of dinosaur history — from the first tiny dinosaurs to the catastrophic asteroid impact.</p>

    <!-- Timeline Scale -->
    <div ref="timelineRef" class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6 sm:p-10 mb-12 overflow-hidden">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 class="text-heading-md">Mesozoic Era (252 - 66 MYA)</h2>
          <p class="text-body-sm">Tap an era to see its climate, key events, and related dinosaurs.</p>
        </div>
        <div class="text-xs text-[var(--color-text-tertiary)]">Horizontal on desktop · stacked on mobile</div>
      </div>

      <!-- Mobile era stack -->
      <div class="md:hidden space-y-3 mb-8">
        <button
          v-for="(era, idx) in eras"
          :key="era.id"
          type="button"
          class="w-full text-left rounded-[var(--radius-lg)] border p-4 transition-all"
          :class="activeEraIndex === idx ? 'border-[rgba(212,164,58,0.45)] bg-[rgba(212,164,58,0.08)]' : 'border-[var(--glass-border)] bg-[var(--color-bg-overlay)]/60'"
          @click="activeEraIndex = idx"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="text-heading-md">{{ era.name }}</div>
              <div class="text-xs text-[var(--color-text-tertiary)]">{{ era.rangeMya[0] }}–{{ era.rangeMya[1] }} MYA · {{ era.durationMillionYears }} million years</div>
            </div>
            <BaseIcon :name="era.icon" :size="18" class="text-[var(--color-brand-amber)]" />
          </div>
          <div class="mt-3 h-2 rounded-full bg-[var(--color-bg-deep)] overflow-hidden">
            <div class="h-full rounded-full" :class="era.colorClass" :style="{ width: `${eraBarWidth(era)}%` }" />
          </div>
        </button>
      </div>

      <!-- Era bar -->
      <div class="relative hidden md:block h-14 rounded-full bg-[var(--color-bg-overlay)] mb-4 overflow-visible">
        <div
          v-for="(era, idx) in eras"
          :key="era.id"
          class="absolute top-0 h-full cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-lg rounded-full"
          :class="[era.colorClass, activeEraIndex === idx ? 'ring-2 ring-white/35 z-10 opacity-100' : 'opacity-75']"
          :style="{
            left: `${eraOffset(idx)}%`,
            width: `${eraBarWidth(era)}%`,
          }"
          @click="activeEraIndex = idx"
        >
          <span class="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white/95 truncate px-2">
            {{ era.name }}
          </span>
        </div>
      </div>

      <!-- Scale labels -->
      <div class="hidden md:flex justify-between text-xs text-[var(--color-text-tertiary)] mb-8">
        <span>252 MYA</span>
        <span>201 MYA</span>
        <span>145 MYA</span>
        <span>66 MYA</span>
      </div>

      <!-- Timeline events -->
      <div class="hidden md:grid relative h-28 mb-8">
        <div class="absolute top-10 left-0 right-0 h-px bg-[var(--glass-border)]" />
        <div
          v-for="event in timelineEvents"
          :key="event.label"
          class="absolute top-0 w-56 -translate-x-1/2"
          :style="{ left: `${((totalSpan - event.mya) / totalSpan) * 100}%` }"
        >
          <div class="flex flex-col items-center text-center group">
            <div class="w-4 h-4 rounded-full bg-[var(--color-brand-amber)] shadow-[0_0_12px_rgba(212,164,58,0.45)] group-hover:scale-125 transition-transform" />
            <span class="mt-2 text-[11px] text-[var(--color-text-tertiary)]">{{ event.mya }} MYA</span>
            <span class="text-xs font-semibold text-[var(--color-text-primary)] mt-1">{{ event.label }}</span>
            <p class="mt-2 text-[11px] leading-snug text-[var(--color-text-tertiary)]">{{ event.description }}</p>
          </div>
        </div>
      </div>

      <div class="md:hidden space-y-3 mb-8">
        <div v-for="event in timelineEvents" :key="event.label" class="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--color-bg-overlay)]/60 p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-[rgba(212,164,58,0.14)] flex items-center justify-center text-[var(--color-brand-amber)]">
              <BaseIcon :name="event.icon" :size="16" />
            </div>
            <div>
              <div class="text-sm font-semibold text-[var(--color-text-primary)]">{{ event.label }}</div>
              <div class="text-xs text-[var(--color-text-tertiary)]">{{ event.mya }} MYA</div>
            </div>
          </div>
          <p class="text-body-sm">{{ event.description }}</p>
        </div>
      </div>
    </div>

    <!-- Active Era Details -->
    <div ref="eraDetailRef" class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6 sm:p-10 mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="selectedEra.colorClass">
          <BaseIcon :name="selectedEra.icon" :size="22" class="text-white" />
        </div>
        <div>
          <h2 class="text-heading-lg">{{ selectedEra.name }}</h2>
          <p class="text-body-sm text-[var(--color-text-tertiary)]">
            {{ selectedEra.rangeMya[0] }} - {{ selectedEra.rangeMya[1] }} MYA
            &middot; {{ selectedEra.durationMillionYears }} million years
          </p>
        </div>
      </div>

      <p class="text-body-md mb-6">{{ selectedEra.description }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Climate</h3>
          <p class="text-body-sm">{{ selectedEra.climateDescription }}</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Key Events</h3>
          <ul class="space-y-2">
            <li v-for="event in selectedEra.keyEvents" :key="event" class="flex items-start gap-2 text-body-sm">
              <span class="text-[var(--color-brand-amber)] mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-amber)] shrink-0" />
              {{ event }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Era Dinosaurs -->
      <div v-if="eraDinos.length > 0">
        <h3 class="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Dinosaurs of the {{ selectedEra.name }}</h3>
        <div class="flex gap-4 overflow-x-auto pb-2">
          <router-link
            v-for="dino in eraDinos"
            :key="dino.id"
            :to="`/encyclopedia/${dino.id}`"
            class="flex-shrink-0 w-32 text-center group"
          >
            <div class="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2 border-2 border-[var(--glass-border)] group-hover:border-[var(--color-brand-amber)] transition-colors">
              <BaseLazyImage
                :src="dino.images.card"
                :alt="dino.name"
                aspect-ratio="1/1"
                class="w-full h-full"
              />
            </div>
            <span class="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{{ dino.name }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Extinction Event -->
    <div class="bg-gradient-to-r from-[rgba(196,56,45,0.1)] to-[rgba(212,164,58,0.08)] border border-[rgba(196,56,45,0.2)] rounded-[var(--radius-xl)] p-6 sm:p-10 text-center">
      <div class="text-4xl mb-4">☄️</div>
      <h2 class="text-display-md mb-3">The K-Pg Extinction</h2>
      <p class="text-body-lg max-w-2xl mx-auto">
        66 million years ago, a 10-kilometer asteroid struck Earth near modern-day Mexico.
        The impact triggered mass extinction that ended the 180-million-year reign of the dinosaurs —
        but allowed mammals (and eventually humans) to thrive.
      </p>
    </div>
  </div>
</template>
