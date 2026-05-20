<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import gsap from 'gsap'
import { useModeStore } from '@/stores/useModeStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { dinosaurs, popularDinoIds } from '@/data/dinosaurs'
import { games } from '@/data/games'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import FeaturedSpecimen from '@/components/encyclopedia/FeaturedSpecimen.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import { useScrollAnimation, useStaggerReveal } from '@/composables/useScrollAnimation'

const { t, tm } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

const popularDinos = dinosaurs.filter(d => popularDinoIds.includes(d.id))

const { translateDino } = useDinoTranslator()
const translatedPopularDinos = computed(() => popularDinos.map(translateDino))

function pickRandomDino() {
  return dinosaurs[Math.floor(Math.random() * dinosaurs.length)]
}
const featuredDino = ref(pickRandomDino())

const dailyFacts = computed(() => {
  const msgs = tm('ui.home.dailyFacts')
  return Array.isArray(msgs) ? msgs.map(String) : [
    'A dinosaur called Microraptor had four wings — two on its arms and two on its legs!',
    'Some dinosaurs swallowed stones called gastroliths to help grind food in their stomachs.',
    'The largest dinosaur eggs were about the size of a basketball.',
    'Dinosaur fossils have been found on every continent, including Antarctica.',
    'Sauropods like Brachiosaurus could live over 100 years!',
  ]
})
const todayFact = computed(() => dailyFacts.value[new Date().getDay() % dailyFacts.value.length])

const categoryKeys = ['carnivore', 'herbivore', 'omnivore', 'flying-reptile', 'marine-reptile'] as const
const categoryIconMap: Record<string, string> = {
  carnivore: 'skull', herbivore: 'leaf', omnivore: 'utensils-crossed', 'flying-reptile': 'bird', 'marine-reptile': 'waves',
}
const categoryColorMap: Record<string, string> = {
  carnivore: 'var(--color-brand-ember)', herbivore: 'var(--color-brand-teal)', omnivore: 'var(--color-brand-amber)', 'flying-reptile': '#60a5fa', 'marine-reptile': '#a78bfa',
}
const categoryBgMap: Record<string, string> = {
  carnivore: 'rgba(232,93,44,0.08)', herbivore: 'rgba(74,222,128,0.08)', omnivore: 'rgba(212,164,58,0.08)', 'flying-reptile': 'rgba(96,165,250,0.08)', 'marine-reptile': 'rgba(167,139,250,0.08)',
}
const categoryBorderMap: Record<string, string> = {
  carnivore: 'rgba(232,93,44,0.16)', herbivore: 'rgba(74,222,128,0.14)', omnivore: 'rgba(212,164,58,0.16)', 'flying-reptile': 'rgba(96,165,250,0.14)', 'marine-reptile': 'rgba(167,139,250,0.14)',
}

// Pre-compute particle positions so they don't randomize on every re-render
const particles = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${3 + Math.random() * 4}s`,
}))

// Scroll animation refs
const categoryGridRef = ref<HTMLElement | null>(null)
const popularRef = ref<HTMLElement | null>(null)
const dailyFactRef = ref<HTMLElement | null>(null)

useScrollAnimation(categoryGridRef, { animation: { y: 48, duration: 0.9, ease: 'power3.out' } })
useScrollAnimation(dailyFactRef, { animation: { y: 32, duration: 0.7, ease: 'power3.out' } })
useStaggerReveal(popularRef, '.dino-card', { stagger: 0.12, duration: 0.6, y: 36 })

// Hero text animation on mount
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-dino', { opacity: 0, scale: 0.5, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8 })
  tl.fromTo('.hero-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
  tl.fromTo('.hero-text', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  tl.fromTo('.hero-actions', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
})
</script>

<template>
  <div>
    <SeoHead
      title="Dinosaurs — Explore the Prehistoric World"
      description="Discover amazing dinosaurs through an interactive encyclopedia, timeline, comparison tools, games, and science articles. For curious minds of all ages."
    />
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] via-[var(--color-bg-base)] to-[var(--color-bg-deep)]" />
      <div class="absolute inset-0 opacity-20" style="background: radial-gradient(ellipse at 60% 40%, rgba(212,164,58,0.15) 0%, transparent 70%), radial-gradient(ellipse at 30% 70%, rgba(74,124,63,0.1) 0%, transparent 60%);" />

      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          v-for="(p, i) in particles"
          :key="i"
          class="absolute w-1 h-1 rounded-full bg-[var(--color-brand-amber)]/20 animate-float"
          :style="{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }"
        />
      </div>

      <!-- Hero content -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-[rgba(212,164,58,0.08)] text-xs font-semibold text-[var(--color-brand-amber)] mb-6">
              <span class="w-2 h-2 rounded-full bg-[var(--color-brand-amber)] animate-pulse" />
              {{ t('ui.home.badge') }}
            </div>
            <div class="hero-dino text-8xl mb-6 lg:hidden">🦖</div>
            <h1 class="hero-title text-display-xl !mb-4">
              <span class="bg-gradient-to-r from-[var(--color-brand-amber)] via-[var(--color-brand-ember)] to-[var(--color-brand-sand)] bg-clip-text text-transparent">
                {{ t('ui.home.title') }}
              </span>
            </h1>
            <p class="hero-text text-body-lg max-w-2xl mx-auto lg:mx-0 mb-8">
              {{ modeStore.isKidsMode
                ? t('ui.home.kidsText')
                : t('ui.home.adultsText')
              }}
            </p>
            <div class="hero-actions flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <BaseButton to="/encyclopedia" size="lg" icon="book-open">
                {{ t('ui.home.exploreBtn') }}
              </BaseButton>
              <BaseButton to="/games" variant="ghost" size="lg" icon="gamepad-2">
                {{ t('ui.home.gamesBtn') }}
              </BaseButton>
            </div>
          </div>

          <FeaturedSpecimen :dinosaur="featuredDino" />
        </div>

        <!-- Scroll indicator -->
        <div class="flex justify-center mt-8 animate-bounce">
          <BaseIcon name="chevron-down" :size="24" class="text-[var(--color-text-tertiary)]" />
        </div>
      </div>
    </section>

    <!-- Browse by Category -->
    <section ref="categoryGridRef" class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-display-md text-center mb-2">{{ t('ui.home.browseByCategory') }}</h2>
      <p class="text-body-md text-center text-[var(--color-text-secondary)] mb-8">
        {{ t('ui.home.browseByCategoryDesc') }}
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <router-link
          v-for="catKey in categoryKeys"
          :key="catKey"
          :to="localRoute(`/encyclopedia?category=${catKey}`)"
          class="group flex flex-col items-center gap-3 p-6 rounded-[var(--radius-xl)] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
          :style="{
            background: categoryBgMap[catKey],
            borderColor: categoryBorderMap[catKey],
          }"
        >
          <BaseIcon :name="categoryIconMap[catKey]" :size="28" class="transition-transform duration-300 group-hover:scale-110" :style="{ color: categoryColorMap[catKey] }" />
          <span
            class="text-sm font-bold"
            :style="{ color: categoryColorMap[catKey] }"
          >{{ t(`ui.home.categories.${catKey === 'flying-reptile' ? 'flyingReptiles' : catKey === 'marine-reptile' ? 'marineReptiles' : catKey + 's'}`) }}</span>
        </router-link>
      </div>
    </section>

    <!-- Popular Dinosaurs -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-display-md">{{ t('ui.home.popularDinosaurs') }}</h2>
          <p class="text-body-md mt-2">{{ t('ui.home.popularDesc') }}</p>
        </div>
        <BaseButton to="/encyclopedia" variant="ghost" size="sm" icon-right="arrow-right">
          {{ t('ui.home.viewAll') }}
        </BaseButton>
      </div>
      <div ref="popularRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="dino in translatedPopularDinos"
          :key="dino.id"
          class="dino-card group cursor-pointer"
          @click="$router.push(localRoute({ name: 'encyclopedia-detail', params: { id: dino.id } }))"
        >
          <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-card-hover)] group-hover:border-[var(--glass-border-hover)]">
            <!-- Image block -->
            <div class="aspect-[4/3] overflow-hidden">
              <DinoCardImage
                :dino="dino"
                class="w-full h-full transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
            <!-- Description block -->
            <div class="p-5 flex flex-col gap-2">
              <h3 class="font-bold text-[var(--color-text-primary)] text-sm leading-tight">{{ dino.name }}</h3>
              <p class="text-[11px] text-[var(--color-text-tertiary)] italic leading-tight">{{ dino.nameMeaning }}</p>
              <p class="text-[12px] text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mt-1">
                {{ modeStore.isKidsMode ? dino.kidsDescription : dino.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Fact -->
    <section class="max-w-5xl mx-auto px-4 py-16">
      <div ref="dailyFactRef" class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-8 text-center">
        <div class="text-3xl mb-4">💡</div>
        <h3 class="text-heading-md mb-3">{{ t('ui.home.didYouKnow') }}</h3>
        <p class="text-body-lg">{{ todayFact }}</p>
      </div>
    </section>
  </div>
</template>
