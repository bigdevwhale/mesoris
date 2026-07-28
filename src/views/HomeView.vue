<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import gsap from 'gsap'
import { useModeStore } from '@/stores/useModeStore'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import { dinosaurs, popularDinoIds } from '@/data/dinosaurs'
import { games } from '@/data/games'
import type { GameDefinition } from '@/types/game'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import FeaturedSpecimen from '@/components/encyclopedia/FeaturedSpecimen.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import { useScrollAnimation, useStaggerReveal } from '@/composables/useScrollAnimation'

const { t, tm, locale } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

const popularDinos = dinosaurs.filter(d => popularDinoIds.includes(d.id))

const { translateDino } = useDinoTranslator()
const translatedPopularDinos = computed(() => popularDinos.map(translateDino))

const featuredDinos = dinosaurs.filter(d => d.images?.previewGif && d.images?.video)

function pickRandomDino() {
  // Pick from the subset that has both a video (for the modal) and a GIF
  // preview (for the card thumbnail). Without both, the hero variant would
  // show a static still — defeating the point of the featured specimen.
  return featuredDinos[Math.floor(Math.random() * featuredDinos.length)]
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
const todayFact = computed(() => dailyFacts.value[Math.floor(Math.random() * dailyFacts.value.length)])

// ── Explore cards (link to main pages) ──
const exploreCards = computed(() => [
  {
    to: localRoute('/encyclopedia'),
    icon: 'book-open',
    tone: 'amber',
    title: t('ui.home.explore.encyclopedia.title'),
    desc: t('ui.home.explore.encyclopedia.desc'),
  },
  {
    to: localRoute('/timeline'),
    icon: 'clock',
    tone: 'teal',
    title: t('ui.home.explore.timeline.title'),
    desc: t('ui.home.explore.timeline.desc'),
  },
  {
    to: localRoute('/compare'),
    icon: 'scale',
    tone: 'moss',
    title: t('ui.home.explore.compare.title'),
    desc: t('ui.home.explore.compare.desc'),
  },
  {
    to: localRoute({ name: 'dino-map' }),
    icon: 'map',
    tone: 'sand',
    title: t('ui.home.explore.dinoMap.title'),
    desc: t('ui.home.explore.dinoMap.desc'),
  },
  {
    to: localRoute('/science'),
    icon: 'flask-conical',
    tone: 'ember',
    title: t('ui.home.explore.science.title'),
    desc: t('ui.home.explore.science.desc'),
  },
])

// ── Games preview (six featured games) ──
const FEATURED_GAME_IDS = ['memory', 'meteor-run', 'dino-duel', 'diet-detective', 'excavation', 'predator-prey']

function colorFamily(colorClass: string): string {
  const m = colorClass.match(/from-([a-z]+)-/i)
  const hue = m?.[1] ?? 'amber'
  if (hue === 'amber' || hue === 'yellow') return 'g-amber'
  if (hue === 'orange' || hue === 'red') return 'g-ember'
  if (['pink', 'rose', 'violet', 'purple', 'fuchsia'].includes(hue)) return 'g-lava'
  if (['lime', 'emerald', 'green'].includes(hue)) return 'g-moss'
  if (['sky', 'cyan', 'blue', 'teal', 'indigo'].includes(hue)) return 'g-teal'
  return 'g-sand'
}

function gameTitle(g: GameDefinition) {
  if (locale.value === 'hi') return g.titleHi ?? g.title
  if (locale.value === 'kk') return g.titleKk ?? g.title
  if (locale.value === 'ko') return g.titleKo
  if (locale.value === 'zh') return g.titleZh
  if (locale.value === 'ja') return g.titleJa
  if (locale.value === 'it') return g.titleIt
  if (locale.value === 'fr') return g.titleFr
  if (locale.value === 'de') return g.titleDe
  if (locale.value === 'es') return g.titleEs
  if (locale.value === 'ru') return g.titleRu
  return g.title
}
function gameDesc(g: GameDefinition) {
  if (locale.value === 'hi') return g.descriptionHi ?? g.description
  if (locale.value === 'kk') return g.descriptionKk ?? g.description
  if (locale.value === 'ko') return g.descriptionKo
  if (locale.value === 'zh') return g.descriptionZh
  if (locale.value === 'ja') return g.descriptionJa
  if (locale.value === 'it') return g.descriptionIt
  if (locale.value === 'fr') return g.descriptionFr
  if (locale.value === 'de') return g.descriptionDe
  if (locale.value === 'es') return g.descriptionEs
  if (locale.value === 'ru') return g.descriptionRu
  return g.description
}

const previewGames = computed(() =>
  FEATURED_GAME_IDS
    .map(id => games.find(g => g.id === id))
    .filter((g): g is GameDefinition => Boolean(g))
    .map(g => ({ ...g, route: localRoute(g.route) })),
)

// Pre-compute ember positions so they don't randomize on every re-render
const embers = Array.from({ length: 7 }, (_, i) => ({
  left: [12, 28, 45, 61, 74, 86, 52][i] + '%',
  delay: [0, 2.5, 5, 1.2, 6.4, 3.8, 8][i] + 's',
  duration: [10, 9, 12, 10, 11, 10, 11][i] + 's',
  size: [5, 4, 5, 3, 5, 4, 3][i] + 'px',
}))

// Scroll animation refs
const exploreRef = ref<HTMLElement | null>(null)
const popularRef = ref<HTMLElement | null>(null)
const dailyFactRef = ref<HTMLElement | null>(null)

useScrollAnimation(exploreRef, { animation: { y: 48, duration: 0.9, ease: 'power3.out' } })
useScrollAnimation(dailyFactRef, { animation: { y: 32, duration: 0.7, ease: 'power3.out' } })
useStaggerReveal(popularRef, '.dino-card', { stagger: 0.12, duration: 0.6, y: 36 })

// Hero text animation on mount
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
  tl.fromTo('.display-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
  tl.fromTo('.hero-tagline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  tl.fromTo('.hero-ctas', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  tl.fromTo('.hero-stats', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
})
</script>

<template>
  <div>
    <SeoHead
      :title="t('ui.home.seoTitle')"
      :description="t('ui.home.seoDescription')"
    />

    <!-- ════════ HERO (two-column: text + featured specimen) ════════ -->
    <section class="hero" aria-label="Welcome">
      <div class="hero-scene" aria-hidden="true">
        <!-- far ridge + volcano glow -->
        <svg class="ridge-far" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="ridgeFarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="var(--hero-scene-2)" />
              <stop offset="1" stop-color="var(--hero-scene-1)" />
            </linearGradient>
            <radialGradient id="craterGlow" cx="0.5" cy="0.1" r="0.9">
              <stop offset="0" stop-color="var(--color-brand-ember)" stop-opacity="0.85" />
              <stop offset="0.4" stop-color="var(--color-brand-ember)" stop-opacity="0.25" />
              <stop offset="1" stop-color="var(--color-brand-ember)" stop-opacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="1080" cy="118" rx="190" ry="120" fill="url(#craterGlow)" />
          <path fill="url(#ridgeFarFill)" d="M0 320V220l120-60 90 40 130-85 110 55 160-30 100-70 60 8 50 62-42 10 96 40 130-45 150 60 86-25 200 90v50H0z" />
        </svg>
        <!-- near ridge with ferns -->
        <svg class="ridge-near" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="ridgeNearFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="var(--silhouette)" />
              <stop offset="1" stop-color="var(--color-bg-deep)" />
            </linearGradient>
          </defs>
          <path fill="url(#ridgeNearFill)" d="M0 200V120l90-24 70 18 110-40 140 34 120-18 150 30 130-26 120 22 150-36 110 30 130-20 120 30v80H0z" />
          <g :style="{ fill: 'var(--ridge-fill)' }">
            <path d="M180 128c-8-34-2-62 14-84-4 30 0 56 10 78l-24 6z" />
            <path d="M204 126c2-28 12-50 30-64-10 24-12 46-8 62l-22 2z" />
            <path d="M1210 118c-10-30-6-58 8-80-2 28 2 52 14 72l-22 8z" />
          </g>
        </svg>
        <div class="fog-drift" />
        <div class="fog" />
        <div class="embers">
          <span
            v-for="(e, i) in embers"
            :key="i"
            class="ember"
            :style="{ left: e.left, animationDelay: e.delay, animationDuration: e.duration, width: e.size, height: e.size }"
          />
        </div>
      </div>

      <div class="hero-grid">
        <!-- LEFT: hero text -->
        <div class="hero-text">
          <span class="hero-eyebrow">
            <span class="dot" aria-hidden="true" />
            {{ t('ui.home.heroEyebrow') }}
          </span>
          <h1 class="display-title">{{ t('ui.home.title') }}</h1>
          <p class="hero-tagline">
            {{ modeStore.isKidsMode ? t('ui.home.kidsText') : t('ui.home.adultsText') }}
          </p>
          <div class="hero-ctas">
            <BaseButton to="/encyclopedia" size="lg" icon="book-open" class="btn-primary">
              {{ t('ui.home.exploreBtn') }}
            </BaseButton>
            <BaseButton to="/games" variant="ghost" size="lg" icon="gamepad-2" class="btn-secondary">
              {{ t('ui.home.gamesBtn') }}
            </BaseButton>
          </div>
          <div class="hero-stats">
            <div>
              <strong>{{ dinosaurs.length }}+</strong>
              {{ t('ui.home.stats.speciesLabel') }}
            </div>
            <div>
              <strong>{{ t('ui.home.stats.yearsCount') }}</strong>
              {{ t('ui.home.stats.yearsLabel') }}
            </div>
            <div>
              <strong>{{ t('ui.home.stats.gamesCount') }}</strong>
              {{ t('ui.home.stats.gamesLabel') }}
            </div>
          </div>
        </div>

        <!-- RIGHT: featured specimen card -->
        <FeaturedSpecimen v-if="featuredDino" :dinosaur="featuredDino" class="hero-specimen" />
      </div>
    </section>

    <!-- ════════ EXPLORE ════════ -->
    <section ref="exploreRef" class="section">
      <div class="wrap">
        <div class="section-head">
          <span class="kicker">{{ t('ui.home.exploreKicker') }}</span>
          <h2>{{ t('ui.home.exploreTitle') }}</h2>
          <p>{{ t('ui.home.exploreDesc') }}</p>
        </div>
        <div class="explore-grid">
          <router-link
            v-for="card in exploreCards"
            :key="card.title"
            :to="card.to"
            class="explore-card"
          >
            <span class="explore-icon" :class="`icon-${card.tone}`" aria-hidden="true">
              <BaseIcon :name="card.icon" :size="24" />
            </span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ════════ GAMES PREVIEW ════════ -->
    <section class="section games">
      <div class="wrap">
        <div class="section-head">
          <span class="kicker">{{ t('ui.home.gamesKicker') }}</span>
          <h2>{{ t('ui.home.gamesTitle') }}</h2>
          <p>{{ t('ui.home.gamesDesc') }}</p>
        </div>
        <div class="games-grid">
          <router-link
            v-for="game in previewGames"
            :key="game.id"
            :to="game.route"
            class="game-card"
            :class="colorFamily(game.colorClass)"
          >
            <span class="game-icon" aria-hidden="true">
              <BaseIcon :name="game.icon" :size="22" />
            </span>
            <h3>{{ gameTitle(game) }}</h3>
            <p>{{ gameDesc(game) }}</p>
            <span class="game-play">
              {{ t('games.hub.play') }}
              <BaseIcon name="arrow-right" :size="16" />
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ════════ POPULAR DINOSAURS ════════ -->
    <section class="section">
      <div class="wrap">
        <div class="popular-head">
          <div class="section-head popular-section-head">
            <span class="kicker">{{ t('ui.home.popularKicker') }}</span>
            <h2>{{ t('ui.home.popularDinosaurs') }}</h2>
            <p>{{ t('ui.home.popularDesc') }}</p>
          </div>
          <BaseButton to="/encyclopedia" variant="ghost" size="sm" icon-right="arrow-right">
            {{ t('ui.home.viewAll') }}
          </BaseButton>
        </div>
        <div ref="popularRef" class="popular-grid">
          <div
            v-for="dino in translatedPopularDinos"
            :key="dino.id"
            class="dino-card"
            @click="$router.push(localRoute({ name: 'encyclopedia-detail', params: { id: dino.id } }))"
          >
            <div class="dino-card-inner">
              <div class="dino-card-media">
                <DinoCardImage :dino="dino" class="dino-card-img" />
              </div>
              <div class="dino-card-body">
                <h3>{{ dino.name }}</h3>
                <p class="dino-meaning">{{ dino.nameMeaning }}</p>
                <p class="dino-desc">
                  {{ modeStore.isKidsMode ? dino.kidsDescription : dino.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ DAILY FACT ════════ -->
    <section class="section daily-section">
      <div class="wrap">
        <div ref="dailyFactRef" class="daily-card">
          <span class="daily-icon" aria-hidden="true">
            <BaseIcon name="lightbulb" :size="28" />
          </span>
          <h3>{{ t('ui.home.didYouKnow') }}</h3>
          <p>{{ todayFact }}</p>
        </div>
      </div>
    </section>

    <!-- ════════ SUPPORT THE PROJECT ════════ -->
    <section class="section support-section">
      <div class="wrap">
        <div class="support-card">
          <div class="support-glow" aria-hidden="true" />
          <div class="support-body">
            <span class="support-icon" aria-hidden="true">
              <BaseIcon name="heart" :size="28" />
            </span>
            <div class="support-text">
              <h3>{{ t('ui.support.title') }}</h3>
              <p>{{ t('ui.support.tagline') }}</p>
            </div>
            <div class="support-actions">
              <a
                href="https://boosty.to/mesoris"
                target="_blank"
                rel="noopener noreferrer"
                class="support-link support-boosty"
              >
                {{ t('ui.support.boosty') }}
                <BaseIcon name="external-link" :size="14" />
              </a>
              <a
                href="https://www.paypal.com/paypalme/AyratBadykov"
                target="_blank"
                rel="noopener noreferrer"
                class="support-link support-paypal"
              >
                {{ t('ui.support.paypal') }}
                <BaseIcon name="external-link" :size="14" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ════════ HERO ════════ */
.hero {
  position: relative;
  min-height: clamp(600px, 92svh, 860px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(120% 70% at 50% 108%, rgba(232, 93, 44, 0.28) 0%, rgba(139, 58, 42, 0.14) 34%, transparent 62%),
    radial-gradient(90% 55% at 78% 100%, rgba(212, 164, 58, 0.16) 0%, transparent 55%),
    linear-gradient(180deg, var(--hero-sky-1) 0%, var(--hero-sky-2) 55%, var(--hero-sky-3) 100%);
}
:global(html[data-theme='light']) .hero {
  background:
    radial-gradient(120% 70% at 50% 108%, rgba(232, 93, 44, 0.22) 0%, rgba(191, 69, 23, 0.1) 36%, transparent 62%),
    radial-gradient(90% 55% at 78% 100%, rgba(212, 164, 58, 0.2) 0%, transparent 55%),
    linear-gradient(180deg, var(--hero-sky-1) 0%, var(--hero-sky-2) 55%, var(--hero-sky-3) 100%);
}
.hero::before {
  content: '';
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle at 24% 30%, rgba(74, 124, 63, 0.09) 0%, transparent 26%),
    radial-gradient(circle at 80% 18%, rgba(45, 138, 123, 0.07) 0%, transparent 24%),
    radial-gradient(circle at 60% 70%, rgba(212, 164, 58, 0.05) 0%, transparent 30%);
  pointer-events: none;
}
.hero-scene {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-scene svg {
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: auto;
}
.ridge-far { opacity: 0.9; }
.ridge-near { opacity: 1; }
.fog {
  position: absolute;
  left: -10%;
  right: -10%;
  height: 34%;
  bottom: 0;
  background: linear-gradient(180deg, transparent, var(--hero-fog) 70%);
}
.fog-drift {
  position: absolute;
  bottom: 4%;
  left: -30%;
  width: 160%;
  height: 22%;
  background: radial-gradient(50% 100% at 50% 100%, rgba(196, 168, 124, 0.07), transparent 70%);
  animation: fog-drift 26s ease-in-out infinite alternate;
}
@keyframes fog-drift {
  from { transform: translateX(-4%); opacity: 0.7; }
  to   { transform: translateX(6%);  opacity: 1; }
}
.embers { position: absolute; inset: 0; overflow: hidden; }
.ember {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffb054 0%, var(--color-brand-ember) 60%, transparent 100%);
  filter: blur(0.5px);
  opacity: 0;
  animation: ember-rise 9s linear infinite;
}
@keyframes ember-rise {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 0.9; }
  60%  { opacity: 0.5; }
  100% { transform: translateY(-72vh) translateX(30px); opacity: 0; }
}

.hero-grid {
  position: relative;
  z-index: 2;
  width: min(var(--wrap, 1160px), 100% - 2.5rem);
  margin-inline: auto;
  display: grid;
  gap: clamp(2.25rem, 5vw, 3.5rem);
  align-items: center;
  padding-block: clamp(5rem, 14vh, 8rem) clamp(7rem, 20vh, 11rem);
}
.hero-text { max-width: 620px; }
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: var(--eyebrow-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.95rem 0.35rem 0.6rem;
  font-size: 0.8125rem;
  color: var(--color-brand-sand);
  backdrop-filter: blur(8px);
  margin-bottom: 1.4rem;
}
.hero-eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-ember);
  box-shadow: 0 0 10px var(--color-brand-ember);
  animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.display-title {
  font-size: clamp(3rem, 9vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.05;
  background: linear-gradient(160deg, var(--title-from) 30%, var(--title-amber) 72%, var(--title-ember) 105%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 6px 30px rgba(212, 164, 58, 0.18));
}
:global(html[data-theme='light']) .display-title {
  filter: drop-shadow(0 4px 18px rgba(168, 118, 31, 0.16));
}
.hero-tagline {
  margin-top: 1.1rem;
  font-size: clamp(1.1rem, 2.6vw, 1.4rem);
  color: var(--color-text-secondary);
  max-width: 40ch;
  text-wrap: pretty;
}
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.2rem;
}
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  margin-top: 2.8rem;
  color: var(--color-text-tertiary);
  font-size: 0.8125rem;
}
.hero-stats strong {
  display: block;
  font-weight: 600;
  font-size: 1.35rem;
  color: var(--color-text-primary);
}
.hero-specimen { width: 100%; }

/* ════════ SHARED SECTION ════════ */
.section {
  padding-block: clamp(4rem, 10vw, 7.5rem);
  position: relative;
}
.wrap {
  width: min(var(--wrap, 1160px), 100% - 2.5rem);
  margin-inline: auto;
}
.kicker {
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
  content: '';
  width: 24px;
  height: 2px;
  background: var(--color-brand-amber);
  border-radius: 2px;
  opacity: 0.7;
}
.section-head {
  max-width: 640px;
  margin-bottom: clamp(2rem, 5vw, 3.25rem);
}
.section-head h2 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 600;
  margin-top: 0.6rem;
  line-height: 1.15;
}
.section-head p {
  color: var(--color-text-secondary);
  margin-top: 0.6rem;
  max-width: 52ch;
}

/* ════════ EXPLORE GRID ════════ */
.explore-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.explore-card {
  display: block;
  text-decoration: none;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.explore-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover), 0 0 0 1px rgba(212, 164, 58, 0.25);
  border-color: rgba(212, 164, 58, 0.35);
}
.explore-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
.icon-amber { background: rgba(212, 164, 58, 0.14); color: var(--color-brand-amber); }
.icon-teal  { background: rgba(45, 138, 123, 0.16); color: #4fb3a2; }
.icon-moss  { background: rgba(74, 124, 63, 0.18);  color: #7bb26b; }
.icon-sand  { background: rgba(196, 168, 124, 0.14); color: var(--color-brand-sand); }
.icon-ember { background: rgba(232, 93, 44, 0.14);  color: #f08a5e; }
:global(html[data-theme='light']) .icon-teal  { color: #1f6b5e; }
:global(html[data-theme='light']) .icon-moss  { color: #3f6a35; }
:global(html[data-theme='light']) .icon-ember { color: #bf4517; }
.explore-card h3 {
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  font-weight: 600;
}
.explore-card p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-top: 0.4rem;
}

/* ════════ GAMES PREVIEW ════════ */
.games {
  background:
    radial-gradient(80% 60% at 50% 0%, rgba(45, 138, 123, 0.08) 0%, transparent 60%),
    var(--color-bg-base);
}
.games-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.game-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-decoration: none;
  border-radius: var(--radius-lg);
  padding: 1.4rem 1.4rem 1.2rem;
  border: 1px solid var(--glass-border);
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.game-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 100% at 100% 0%, var(--game-glow) 0%, transparent 55%);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}
.game-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--game-border);
}
.game-card:hover::before { opacity: 1; }
.game-card > * { position: relative; }
.game-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: var(--game-chip);
  color: var(--game-fg);
  margin-bottom: 0.5rem;
}
.game-card h3 {
  font-size: 1.15rem;
  font-weight: 600;
}
.game-card p {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}
.game-play {
  margin-top: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--game-fg);
}
:deep(.game-play svg) { transition: transform 0.2s ease; }
.game-card:hover :deep(.game-play svg) { transform: translateX(3px); }

/* ════════ POPULAR DINOSAURS ════════ */
.popular-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: clamp(2rem, 5vw, 3.25rem);
}
.popular-section-head { margin-bottom: 0; }
.popular-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
.dino-card { cursor: pointer; }
.dino-card-inner {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.dino-card:hover .dino-card-inner {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--glass-border-hover);
}
.dino-card-media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.dino-card-img {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}
.dino-card:hover .dino-card-img { transform: scale(1.05); }
.dino-card-body {
  padding: 1.1rem 1.25rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.dino-card-body h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}
.dino-meaning {
  font-size: 0.7rem;
  font-style: italic;
  color: var(--color-text-tertiary);
  line-height: 1.2;
}
.dino-desc {
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-top: 0.35rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ════════ DAILY FACT ════════ */
.daily-section { padding-block: clamp(2rem, 5vw, 4rem); }
.daily-card {
  max-width: 720px;
  margin-inline: auto;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}
.daily-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(212, 164, 58, 0.08) 0%, transparent 60%);
  pointer-events: none;
}
.daily-card > * { position: relative; }
.daily-icon {
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: rgba(212, 164, 58, 0.14);
  color: var(--color-brand-amber);
  margin-bottom: 1rem;
}
.daily-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}
.daily-card p {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 60ch;
  margin-inline: auto;
}

/* ════════ SUPPORT ════════ */
.support-section { padding-block: clamp(2rem, 5vw, 4rem) clamp(4rem, 10vw, 7.5rem); }
.support-card {
  max-width: 920px;
  margin-inline: auto;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: clamp(1.75rem, 4vw, 2.5rem);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}
.support-glow {
  position: absolute;
  top: -4rem;
  left: -4rem;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  background: rgba(232, 93, 44, 0.1);
  filter: blur(3rem);
  pointer-events: none;
}
.support-body {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}
.support-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: rgba(232, 93, 44, 0.12);
  color: var(--color-brand-ember);
}
.support-text h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.support-text p {
  color: var(--color-text-secondary);
}
.support-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
.support-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.support-boosty {
  border: 1px solid rgba(255, 90, 60, 0.35);
  background: rgba(255, 90, 60, 0.1);
  color: var(--color-text-primary);
}
.support-boosty:hover {
  background: rgba(255, 90, 60, 0.18);
  border-color: rgba(255, 90, 60, 0.5);
}
.support-paypal {
  border: 1px solid rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-text-primary);
}
.support-paypal:hover {
  background: rgba(59, 130, 246, 0.18);
  border-color: rgba(59, 130, 246, 0.5);
}

/* ════════ HERO CTA BUTTONS — tint BaseButton primary/secondary ════════ */
.hero-ctas :deep(.btn-primary) {
  background: linear-gradient(135deg, var(--color-brand-ember) 0%, #c74518 100%);
  color: #fff5ec;
  box-shadow: var(--shadow-button);
}
.hero-ctas :deep(.btn-primary:hover) {
  box-shadow: 0 4px 24px rgba(232, 93, 44, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}
.hero-ctas :deep(.btn-secondary) {
  background: var(--secondary-btn-bg);
  color: var(--color-text-primary);
  border: 1px solid rgba(212, 164, 58, 0.35);
  backdrop-filter: blur(8px);
}
.hero-ctas :deep(.btn-secondary:hover) {
  border-color: var(--color-brand-amber);
  box-shadow: 0 0 20px rgba(212, 164, 58, 0.18);
  transform: translateY(-2px);
}

/* ════════ RESPONSIVE ════════ */
@media (min-width: 700px) {
  .explore-grid { grid-template-columns: repeat(2, 1fr); }
  .games-grid { grid-template-columns: repeat(2, 1fr); }
  .popular-grid { grid-template-columns: repeat(2, 1fr); }
  .support-body { flex-direction: row; text-align: left; }
  .support-actions { justify-content: flex-end; margin-left: auto; }
}
@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.05fr 0.95fr;
    padding-block: 7rem 11rem;
    gap: 3.5rem;
  }
  .hero-text { max-width: none; }
  .explore-grid { grid-template-columns: repeat(6, 1fr); }
  .explore-card:nth-child(1), .explore-card:nth-child(2) { grid-column: span 3; }
  .explore-card:nth-child(3), .explore-card:nth-child(4), .explore-card:nth-child(5) { grid-column: span 2; }
  .games-grid { grid-template-columns: repeat(3, 1fr); }
  .popular-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .fog-drift, .ember { display: none; }
  .hero-eyebrow .dot { animation: none; }
}
</style>