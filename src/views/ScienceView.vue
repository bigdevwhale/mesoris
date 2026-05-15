<script setup lang="ts">
import { ref } from 'vue'
import { articles } from '@/data/articles'
import { myths } from '@/data/myths'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseAccordion from '@/components/ui/BaseAccordion.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const modeStore = useModeStore()

const flippedCards = ref<Set<string>>(new Set())

function toggleCard(id: string) {
  if (flippedCards.value.has(id)) {
    flippedCards.value.delete(id)
  } else {
    flippedCards.value.add(id)
  }
}

const explainers = [
  { title: 'How do fossils form?', content: 'When a dinosaur died, its body needed to be quickly buried by sand or mud. Over millions of years, minerals from groundwater slowly replaced the organic material in the bones, turning them into stone. This extremely rare process preserved the shape of bones for us to discover today.' },
  { title: 'How do we know what dinosaurs looked like?', content: 'Scientists reconstruct dinosaur appearance from fossil evidence: bone structure, fossilized skin impressions, feather traces, and even preserved color pigments (melanosomes) in some extraordinary fossils. They also compare with modern relatives — birds and crocodilians.' },
  { title: 'Why did dinosaurs go extinct?', content: 'A 10-kilometer asteroid struck Earth 66 million years ago near modern-day Mexico. The impact caused global wildfires, mega-tsunamis, and an "impact winter" that blocked sunlight for years. Combined with massive volcanic eruptions in India, this caused the extinction of about 75% of all species.' },
  { title: 'Are birds really dinosaurs?', content: 'Yes! Birds are the direct descendants of theropod dinosaurs. They survived the K-Pg extinction 66 million years ago. Chickens, pigeons, and eagles are literally modern dinosaurs — sharing hundreds of skeletal features, feather genes, and behaviors with their prehistoric relatives.' },
  { title: 'How do scientists infer behavior?', content: 'Trackways, nests, bite marks, bone beds, and anatomy all help paleontologists infer social behavior, hunting style, and parental care. Scientists always separate direct evidence from educated inference.' },
  { title: 'Why do some dinosaurs have feathers?', content: 'Feathers likely evolved first for insulation and display, long before flight. In some species they later became useful for brooding, courtship, and eventually powered flight in bird ancestors.' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Science Center — Dinosaur Research & Myths"
      description="Read science articles about dinosaurs, bust common myths with evidence, and explore simple explanations of complex paleontology topics."
    />
    <h1 class="text-display-lg mb-2">Science Center</h1>
    <p class="text-body-lg mb-10">Real science explained clearly. Myths busted with evidence. For curious minds of all ages.</p>

    <!-- Articles -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Articles</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="`/science/${article.id}`"
          class="group bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
          <div class="aspect-[2/1] overflow-hidden">
            <BaseLazyImage
              :src="article.image"
              :alt="article.title"
              :srcset="`${article.image} 960w`"
              sizes="(max-width: 1024px) 100vw, 33vw"
              class="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5">
            <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[rgba(45,122,140,0.12)] text-[var(--color-info)]">{{ article.category }}</span>
            <h3 class="text-heading-md mt-2 mb-2">{{ article.title }}</h3>
            <p class="text-body-sm mb-3">{{ article.summary }}</p>
            <div class="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <span>{{ article.readingTimeMinutes }} min read</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Myths vs Facts -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Myths vs. Facts</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="myth in myths"
          :key="myth.id"
          class="myth-card"
        >
          <button
            type="button"
            class="myth-inner w-full text-left"
            :class="{ flipped: flippedCards.has(myth.id) }"
            :aria-pressed="flippedCards.has(myth.id)"
            :aria-label="`${flippedCards.has(myth.id) ? 'Fact: ' + myth.fact : 'Myth: ' + myth.myth} — click to ${flippedCards.has(myth.id) ? 'show myth' : 'reveal fact'}`"
            @click="toggleCard(myth.id)"
          >
            <div class="myth-front bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3">
              <span class="text-2xl shrink-0" aria-hidden="true">❓</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-error)] mb-1">MYTH</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ myth.myth }}</p>
                <p class="text-xs text-[var(--color-text-tertiary)] mt-2">Click to reveal the fact →</p>
              </div>
            </div>
            <div class="myth-back bg-[rgba(61,140,64,0.08)] border border-[rgba(61,140,64,0.2)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3" aria-hidden="true">
              <span class="text-2xl shrink-0">✅</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-success)] mb-1">FACT</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ myth.fact }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Explainers -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Simple Explanations</h2>
      <div class="max-w-2xl">
        <BaseAccordion :items="explainers" />
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-display-md mb-6">Learning Paths</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-amber)] mb-2">For Kids</div>
          <p class="text-body-md">Short, playful explanations with strong visuals, quick facts, and myth-busting that feels fun first.</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-teal)] mb-2">For Curious Adults</div>
          <p class="text-body-md">Deeper context, uncertainty notes, and evidence-based explanations that avoid oversimplifying the science.</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-ember)] mb-2">For Classrooms</div>
          <p class="text-body-md">Structured topics that can be used as lesson starters, discussion prompts, or revision material.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.myth-card {
  perspective: 900px;
  min-height: 7rem;
}

.myth-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 7rem;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.myth-inner.flipped {
  transform: rotateY(180deg);
}

.myth-front,
.myth-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.myth-back {
  transform: rotateY(180deg);
}
</style>
