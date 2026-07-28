<script setup lang="ts">
import { computed, ref } from 'vue'
import { games } from '@/data/games'
import type { GameDefinition } from '@/types/game'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const modeStore = useModeStore()

type GameCategory = 'all' | 'quiz' | 'puzzle' | 'arcade' | 'strategy' | 'sim'

const CATEGORY_MAP: Record<Exclude<GameCategory, 'all'>, (g: GameDefinition) => boolean> = {
  quiz: g => g.type === 'quiz' || g.type === 'personality' || g.type === 'dino-duel' || g.type === 'diet-detective' || g.type === 'dino-map',
  puzzle: g => g.type === 'puzzle' || g.type === 'memory' || g.type === 'excavation' || g.type === 'skeleton' || g.type === 'dino-match3',
  arcade: g => g.type === 'runner' || g.type === 'meteor-run' || g.type === 'ptero-glide' || g.type === 'predator-prey' || g.type === 'dino-defense',
  strategy: g => g.type === 'battle' || g.type === 'dino-duel' || g.type === 'dino-map' || g.type === 'diet-detective' || g.type === 'dino-defense',
  sim: g => g.type === 'tamagotchi',
}

// Single primary category shown as the card's cat-tag (reuses hub.categories.* i18n).
const TYPE_CATEGORY: Record<string, GameCategory> = {
  quiz: 'quiz',
  puzzle: 'puzzle',
  memory: 'puzzle',
  excavation: 'puzzle',
  'dino-match3': 'puzzle',
  personality: 'quiz',
  'diet-detective': 'quiz',
  'dino-map': 'quiz',
  runner: 'arcade',
  'meteor-run': 'arcade',
  'ptero-glide': 'arcade',
  'predator-prey': 'arcade',
  battle: 'strategy',
  'dino-duel': 'strategy',
  'dino-defense': 'strategy',
  tamagotchi: 'sim',
}

const PIP_COUNT: Record<string, number> = { easy: 1, medium: 2, hard: 3 }

// Map a game's Tailwind gradient (colorClass) to one of the 6 prototype color
// families by reading the leading `from-<hue>-` token.
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

const activeCategory = ref<GameCategory>('all')

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

const localizedGames = computed(() =>
  games.map(g => ({ ...g, route: localRoute(g.route) })),
)

const filteredGames = computed(() => {
  if (activeCategory.value === 'all') return localizedGames.value
  const predicate = CATEGORY_MAP[activeCategory.value]
  return localizedGames.value.filter(predicate)
})

const featuredGame = computed(() =>
  localizedGames.value.find(g => g.type === 'meteor-run'),
)

function catLabel(g: GameDefinition) {
  const cat = TYPE_CATEGORY[g.type] ?? 'arcade'
  return t(`games.hub.categories.${cat}`)
}
function pipsOn(g: GameDefinition) {
  return PIP_COUNT[g.difficulty] ?? 1
}

const categories: { key: GameCategory; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'quiz', label: 'quiz' },
  { key: 'puzzle', label: 'puzzle' },
  { key: 'arcade', label: 'arcade' },
  { key: 'strategy', label: 'strategy' },
  { key: 'sim', label: 'sim' },
]

const howtoSteps = computed(() => [
  { title: t('games.hub.howto1Title'), desc: t('games.hub.howto1Desc') },
  { title: t('games.hub.howto2Title'), desc: t('games.hub.howto2Desc') },
  { title: t('games.hub.howto3Title'), desc: t('games.hub.howto3Desc') },
])
</script>

<template>
  <div class="games-page">
    <SeoHead :title="t('games.hub.title')" :description="t('games.hub.description')" />

    <!-- ============ PAGE HEAD + FEATURED HERO ============ -->
    <section class="page-head">
      <div class="wrap">
        <span class="kicker">{{ t('games.hub.kicker') }}</span>
        <h1 class="page-title">{{ t('games.hub.heading') }}</h1>
        <p class="lede">
          {{ modeStore.isKidsMode ? t('games.hub.ledeKids') : t('games.hub.ledeAdults') }}
        </p>

        <article
          v-if="featuredGame"
          class="featured-hero"
          :class="colorFamily(featuredGame.colorClass)"
        >
          <div class="meteor-scene" aria-hidden="true">
            <span class="meteor"></span><span class="meteor"></span><span class="meteor"></span>
            <svg class="hero-ridge" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice">
              <path d="M0 120V70l110-28 90 22 140-40 120 30 150-22 130 26 140-34 130 28 150-20 120 26 160-30v92H0z"/>
            </svg>
            <svg class="hero-runner" viewBox="0 0 260 140">
              <g>
                <path d="M18 46 Q22 32 38 32 Q54 32 58 44 Q76 58 92 74 Q108 90 126 96 Q168 88 210 100 Q238 106 252 122 L246 128 Q230 114 204 110 Q170 104 134 110 L138 138 -0 138 Q6 132 24 130 L28 108 Q20 84 16 62 Q14 52 18 46 Z"/>
                <path d="M116 100 L104 126 L92 138 L106 138 L120 116 Z"/>
                <path d="M148 108 L152 128 L144 138 L160 138 L164 112 Z"/>
              </g>
            </svg>
          </div>
          <div class="featured-content">
            <span class="featured-tag">{{ t('games.hub.featuredTag') }}</span>
            <h2 class="featured-title">{{ gameTitle(featuredGame) }}</h2>
            <p class="featured-desc">{{ gameDesc(featuredGame) }}</p>
            <div class="featured-meta">
              <span class="cat-tag">{{ catLabel(featuredGame) }}</span>
              <span class="difficulty">
                {{ t('games.difficulty.label') }}
                <span
                  class="pips"
                  role="img"
                  :aria-label="t('games.difficulty.ariaLevel', { on: pipsOn(featuredGame) })"
                >
                  <i v-for="n in 3" :key="n" :class="{ on: n <= pipsOn(featuredGame) }"></i>
                </span>
              </span>
            </div>
            <div class="featured-ctas">
              <router-link class="btn-primary" :to="featuredGame.route">
                {{ t('games.hub.featuredCta', { name: gameTitle(featuredGame) }) }}
                <BaseIcon name="play" :size="18" />
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ============ ALL GAMES ============ -->
    <section class="games-section">
      <div class="wrap">
        <div class="filter-row" role="group" aria-label="Filter games by category">
          <span class="chip-group-label">{{ t('games.hub.categoryLabel') }}</span>
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            class="chip"
            :aria-pressed="activeCategory === cat.key"
            @click="activeCategory = cat.key"
          >
            {{ t(`games.hub.categories.${cat.label}`) }}
          </button>
        </div>

        <div v-if="filteredGames.length" class="games-grid">
          <router-link
            v-for="game in filteredGames"
            :key="game.id"
            :to="game.route"
            class="game-card"
            :class="colorFamily(game.colorClass)"
          >
            <span class="game-icon" aria-hidden="true">
              <BaseIcon :name="game.icon" :size="22" />
            </span>
            <h3 class="game-title">{{ gameTitle(game) }}</h3>
            <p class="game-desc">{{ gameDesc(game) }}</p>
            <span class="difficulty">
              {{ t('games.difficulty.label') }}
              <span
                class="pips"
                role="img"
                :aria-label="t('games.difficulty.ariaLevel', { on: pipsOn(game) })"
              >
                <i v-for="n in 3" :key="n" :class="{ on: n <= pipsOn(game) }"></i>
              </span>
            </span>
            <span class="game-foot">
              <span class="cat-tag">{{ catLabel(game) }}</span>
              <span class="game-play">
                {{ t('games.hub.play') }}
                <BaseIcon name="arrow-right" :size="16" />
              </span>
            </span>
          </router-link>

          <div v-if="activeCategory === 'all'" class="ghost-card">
            <BaseIcon name="egg" :size="38" />
            <strong>{{ t('games.hub.ghostTitle') }}</strong>
            <span>{{ t('games.hub.ghostDesc') }}</span>
          </div>
        </div>

        <div v-else class="empty-state">
          {{ t('games.hub.empty') }}
        </div>

        <!-- ============ HOW TO PLAY ============ -->
        <div class="howto">
          <span class="kicker">{{ t('games.hub.howtoKicker') }}</span>
          <h2 class="howto-title">{{ t('games.hub.howtoTitle') }}</h2>
          <div class="howto-grid">
            <div v-for="(step, i) in howtoSteps" :key="i" class="howto-step">
              <span class="step-num" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.games-page { width: 100%; }
.wrap { width: min(1160px, 100% - 2.5rem); margin-inline: auto; }

/* ============ PAGE HEAD ============ */
.page-head {
  padding-block: clamp(3rem, 8vw, 4.5rem) 0;
  background: linear-gradient(180deg, var(--color-bg-deep) 0%, var(--color-bg-base) 100%);
}
.page-title {
  font-size: clamp(2rem, 6vw, 3.25rem);
  font-weight: 600;
  margin-top: 0.6rem;
  line-height: 1.1;
}
.lede {
  color: var(--color-text-secondary);
  margin-top: 0.7rem;
  max-width: 56ch;
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
  content: "";
  width: 24px;
  height: 2px;
  background: var(--color-brand-amber);
  border-radius: 2px;
  opacity: 0.7;
}

/* ============ FEATURED HERO ============ */
.featured-hero {
  position: relative;
  overflow: hidden;
  margin-top: 2.2rem;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(139, 58, 42, 0.45);
  box-shadow: var(--shadow-card);
  background:
    radial-gradient(110% 90% at 85% 110%, rgba(232, 93, 44, 0.32) 0%, rgba(139, 58, 42, 0.18) 40%, transparent 70%),
    radial-gradient(60% 50% at 70% 0%, rgba(212, 164, 58, 0.08) 0%, transparent 60%),
    linear-gradient(200deg, var(--hero-scene-1) 0%, var(--hero-scene-2) 55%, var(--hero-scene-3) 100%);
  min-height: 340px;
  display: flex;
  align-items: flex-end;
}
:global(html[data-theme="light"]) .featured-hero {
  background:
    radial-gradient(110% 90% at 85% 110%, rgba(232, 93, 44, 0.24) 0%, rgba(191, 69, 23, 0.1) 40%, transparent 70%),
    radial-gradient(60% 50% at 70% 0%, rgba(212, 164, 58, 0.18) 0%, transparent 60%),
    linear-gradient(200deg, var(--hero-scene-1) 0%, var(--hero-scene-2) 55%, var(--hero-scene-3) 100%);
}
.meteor-scene { position: absolute; inset: 0; pointer-events: none; }
.meteor {
  position: absolute;
  width: 130px; height: 2.5px;
  background: linear-gradient(90deg, transparent, rgba(232, 93, 44, 0.7) 60%, #ffcf9e);
  border-radius: var(--radius-full);
  transform: rotate(32deg);
  opacity: 0;
  animation: meteorFall 5.5s linear infinite;
}
.meteor::after {
  content: "";
  position: absolute; right: -4px; top: -2.5px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe4c0 0%, var(--color-brand-ember) 55%, transparent 100%);
}
.meteor:nth-child(1) { top: 6%; left: 8%; animation-delay: 0s; }
.meteor:nth-child(2) { top: -4%; left: 42%; animation-delay: 1.8s; width: 90px; }
.meteor:nth-child(3) { top: 12%; left: 64%; animation-delay: 3.4s; width: 110px; }
@keyframes meteorFall {
  0%   { transform: rotate(32deg) translateX(0); opacity: 0; }
  6%   { opacity: 1; }
  45%  { opacity: 0.9; }
  70%  { transform: rotate(32deg) translateX(46vw); opacity: 0; }
  100% { transform: rotate(32deg) translateX(46vw); opacity: 0; }
}
.hero-ridge { position: absolute; bottom: -2px; left: 0; width: 100%; height: auto; }
.hero-ridge path { fill: var(--ridge-fill); }
.hero-runner {
  position: absolute; bottom: 6%; right: 4%;
  width: clamp(140px, 26vw, 260px);
  opacity: 0.9;
}
.hero-runner g path { fill: var(--silhouette); }
.featured-content {
  position: relative; z-index: 2;
  padding: clamp(1.6rem, 5vw, 3rem);
  max-width: 640px;
}
.featured-tag {
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: rgba(139, 58, 42, 0.3);
  border: 1px solid rgba(232, 93, 44, 0.5);
  color: #f5a081;
  font-weight: 600; font-size: 0.7rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  padding: 0.32rem 0.8rem;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
}
:global(html[data-theme="light"]) .featured-tag {
  background: rgba(122, 47, 32, 0.18);
  border-color: rgba(191, 69, 23, 0.5);
  color: #bf4517;
}
.featured-title { font-size: clamp(1.9rem, 5vw, 3rem); font-weight: 700; line-height: 1.1; }
.featured-desc { color: var(--color-text-secondary); margin-top: 0.7rem; max-width: 44ch; }
.featured-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 1.1rem; margin-top: 1.2rem; }
.featured-ctas { margin-top: 1.6rem; }

/* ============ DIFFICULTY PIPS ============ */
.difficulty {
  --pip-color: var(--game-fg);
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}
.pips { display: inline-flex; gap: 4px; }
.pips i {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--pip-off);
}
.pips i.on {
  background: var(--pip-color, var(--color-brand-amber));
  box-shadow: 0 0 6px var(--pip-color, var(--color-brand-amber));
}

/* ============ CAT TAG ============ */
.cat-tag {
  font-weight: 500; font-size: 0.72rem;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.22rem 0.65rem;
  border-radius: var(--radius-full);
  background: var(--input-bg);
  color: var(--color-text-secondary);
  border: 1px solid rgba(212, 164, 58, 0.12);
}

/* ============ PRIMARY BUTTON ============ */
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  font-weight: 600; font-size: 1rem;
  text-decoration: none; cursor: pointer; border: 0;
  padding: 0.85rem 1.7rem;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-brand-ember) 0%, #c74518 100%);
  color: #fff5ec;
  box-shadow: var(--shadow-button);
  transition: transform 0.2s ease, box-shadow 0.25s ease;
}
.btn-primary:hover {
  box-shadow: 0 4px 24px rgba(232, 93, 44, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}
.btn-primary:active { transform: translateY(1px); }

/* ============ GAMES SECTION ============ */
.games-section { background: var(--color-bg-base); padding-block: 2.5rem 5rem; }
.filter-row {
  display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center;
  margin-bottom: 1.6rem;
}
.chip-group-label {
  font-weight: 600; font-size: 0.72rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-right: 0.2rem;
}
.chip {
  appearance: none; cursor: pointer;
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: var(--input-bg);
  border: 1px solid rgba(212, 164, 58, 0.14);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-weight: 500; font-size: 0.85rem;
  padding: 0.42rem 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.chip:hover { border-color: rgba(212, 164, 58, 0.35); color: var(--color-text-primary); }
.chip[aria-pressed='true'] {
  background: linear-gradient(135deg, var(--color-brand-amber), #b8862a);
  border-color: transparent;
  color: #1a1305;
}
.chip:focus-visible { outline: 2px solid var(--color-brand-amber); outline-offset: 2px; }

/* ============ GAME CARDS ============ */
.games-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
.game-card {
  position: relative;
  display: flex; flex-direction: column; gap: 0.35rem;
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
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(120% 100% at 100% 0%, var(--game-glow) 0%, transparent 55%);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}
.game-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); border-color: var(--game-border); }
.game-card:hover::before { opacity: 1; }
.game-card:focus-visible { outline: 2px solid var(--color-brand-amber); outline-offset: 2px; }
.game-card > * { position: relative; }
.game-icon {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border-radius: var(--radius-md);
  background: var(--game-chip);
  color: var(--game-fg);
  margin-bottom: 0.5rem;
}
.game-title { font-size: 1.15rem; font-weight: 600; line-height: 1.2; }
.game-desc { color: var(--color-text-secondary); font-size: 0.85rem; }
.game-card .difficulty { margin-top: 0.55rem; }
.game-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 0.9rem; }
.game-play {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-weight: 600; font-size: 0.85rem;
  color: var(--game-fg);
}
.game-play :deep(svg) { transition: transform 0.2s ease; }
.game-card:hover .game-play :deep(svg) { transform: translateX(3px); }

/* ============ GHOST CARD ============ */
.ghost-card {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  text-align: center;
  border-radius: var(--radius-lg);
  padding: 2rem 1.4rem;
  border: 1.5px dashed rgba(212, 164, 58, 0.35);
  color: var(--color-text-tertiary);
  min-height: 200px;
}
.ghost-card :deep(svg) { color: rgba(212, 164, 58, 0.5); }
.ghost-card strong { font-weight: 600; color: var(--color-text-secondary); }
.ghost-card span { font-size: 0.82rem; max-width: 24ch; }

/* ============ EMPTY STATE ============ */
.empty-state {
  border-radius: var(--radius-xl);
  border: 1px dashed var(--glass-border);
  padding: 2.5rem;
  text-align: center;
  color: var(--color-text-secondary);
}

/* ============ HOW TO PLAY ============ */
.howto { margin-top: 3.5rem; }
.howto-title { font-size: clamp(1.4rem, 3.5vw, 1.9rem); font-weight: 600; margin-top: 0.6rem; line-height: 1.2; }
.howto-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-top: 1.5rem; }
.howto-step {
  display: flex; gap: 1rem; align-items: flex-start;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.2rem;
}
.step-num {
  flex: none;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: rgba(212, 164, 58, 0.14);
  color: var(--color-brand-amber);
  font-weight: 600;
}
.howto-step h3 { font-size: 1rem; font-weight: 600; }
.howto-step p { color: var(--color-text-secondary); font-size: 0.85rem; margin-top: 0.2rem; }

/* ============ MOTION SAFETY ============ */
@media (prefers-reduced-motion: reduce) {
  .meteor { display: none; }
}

/* ============ BREAKPOINTS ============ */
@media (min-width: 700px) {
  .games-grid { grid-template-columns: repeat(2, 1fr); }
  .howto-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {
  .games-grid { grid-template-columns: repeat(3, 1fr); }
  .featured-hero { min-height: 400px; }
}
</style>