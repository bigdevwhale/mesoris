<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import {
  createWorld,
  resetForReplay,
  update,
  draw,
  handleEggPointerDown,
  handleAbility,
  handleDive,
  dismissFact,
  ARCHETYPES,
  W,
  H,
  type World,
  type Archetype,
  type Input,
} from '@/logic/dino-life-engine'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const BEST_KEY = 'dino-dino-life-best'
const best = ref(parseInt(localStorage.getItem(BEST_KEY) || '0'))

// ── Reactive mirror of the world (for the overlay UI) ──
const phase = ref<World['phase']>('idle')
const score = ref(0)
const day = ref(1)
const bars = ref({ warmth: 1, eggHealth: 1, health: 1, hunger: 1, energy: 1, altitude: 1, breath: 1, growth: 0 })
const factText = ref('')
const archetype = ref<Archetype>('herbivore')
const combo = ref(0)
const comboMax = ref(0)
const milestoneFlash = ref(0)
const abilityCd = ref(0)
const showConfetti = ref(false)

// combo banner (centered pill, auto-clears)
const comboFlash = ref<{ text: string; tone: 'gold' | 'purple' | 'red'; id: number } | null>(null)
let comboFlashTimer = 0
let comboFlashId = 0
let lastCombo = 0
function flashCombo(text: string, tone: 'gold' | 'purple' | 'red'): void {
  comboFlash.value = { text, tone, id: ++comboFlashId }
  comboFlashTimer = 1100
}
function tickComboFlash(dt: number): void {
  if (comboFlashTimer > 0) {
    comboFlashTimer -= dt
    if (comboFlashTimer <= 0) comboFlash.value = null
  }
}
function comboMult(c: number): number {
  return Math.min(5, 1 + Math.floor(c / 3))
}

// stage transition banner (visual flair)
const STAGE_EMOJI: Record<string, string> = { egg: '🥚', juvenile: '🐣', adult: '🦖' }
const banner = ref<{ emoji: string; id: number; howTo?: string } | null>(null)
let lastPhase: World['phase'] = 'idle'
let bannerTimer = 0
let bannerId = 0

// ── Engine world ──
let world: World | null = null
let raf = 0
let lastTs = 0
let reducedMotion = false

const pointer = { x: W / 2, y: H / 2, active: false }
const tap = { downX: 0, downY: 0, downT: 0, moved: false }

const input: Input = {
  pointerActive: false,
  pointerX: W / 2,
  pointerY: H / 2,
  keys: { up: false, down: false, left: false, right: false },
}

// Archetype selection cards (localized labels via i18n)
function chooseArchetype(a: Archetype) {
  world = createWorld(a)
  archetype.value = a
  lastCombo = 0
  showConfetti.value = false
  comboFlash.value = null
  comboFlashTimer = 0
  syncMirror()
  lastTs = performance.now()
  raf = requestAnimationFrame(loop)
}

function restart() {
  if (!world) return
  resetForReplay(world)
  lastCombo = 0
  showConfetti.value = false
  comboFlash.value = null
  comboFlashTimer = 0
  syncMirror()
  lastTs = performance.now()
  raf = requestAnimationFrame(loop)
}

function syncMirror() {
  if (!world) return
  phase.value = world.phase
  score.value = world.score
  day.value = world.day
  bars.value = {
    warmth: world.warmth,
    eggHealth: world.eggHealth,
    health: world.health,
    hunger: world.hunger,
    energy: world.energy,
    altitude: world.altitude,
    breath: world.breath,
    growth: world.growth,
  }
  factText.value = world.factText
  combo.value = world.combo
  comboMax.value = world.comboMax
  milestoneFlash.value = world.milestoneFlash
  abilityCd.value = world.abilityCd
  // combo banner on rising combo
  if (world.combo > lastCombo && world.combo >= 2) {
    const mult = comboMult(world.combo)
    if (world.combo >= 6) flashCombo(t('games.dinoLife.comboHuge', { n: mult }), world.combo >= 9 ? 'red' : 'purple')
    else flashCombo(t('games.dinoLife.combo', { n: mult }), 'gold')
  }
  lastCombo = world.combo
  // fire a stage banner when entering egg/juvenile/adult
  if (world.phase !== lastPhase) {
    const emo = STAGE_EMOJI[world.phase]
    if (emo) {
      const howTo = world.phase === 'juvenile' || world.phase === 'adult' ? howToPlay(world.archetype) : undefined
      banner.value = { emoji: emo, id: ++bannerId, howTo }
      bannerTimer = 1800
    }
    if (world.phase === 'win') showConfetti.value = true
    lastPhase = world.phase
  }
}

function tickBanner(dt: number): void {
  if (bannerTimer > 0) {
    bannerTimer -= dt
    if (bannerTimer <= 0) banner.value = null
  }
}

function endRun() {
  if (!world) return
  cancelAnimationFrame(raf)
  if (world.score > best.value) {
    best.value = world.score
    localStorage.setItem(BEST_KEY, String(world.score))
  }
  gameStore.recordGameCompletion('dino-life', world.score)
}

function loop(ts: number) {
  if (!world) return
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(world, dt, input)
  syncMirror()
  tickBanner(dt)
  tickComboFlash(dt)
  draw(world, ctx())
  // pause the loop on non-sim phases
  if (world.phase === 'idle' || world.phase === 'fact' || world.phase === 'over' || world.phase === 'win') {
    if (world.phase === 'over' || world.phase === 'win') endRun()
    return
  }
  raf = requestAnimationFrame(loop)
}

function ctx(): CanvasRenderingContext2D {
  const c = canvasRef.value
  return c!.getContext('2d')!
}

// ── Input ──
function onKey(e: KeyboardEvent) {
  const c = e.code
  if (c === 'Space' || c === 'Enter') {
    e.preventDefault()
    if (phase.value === 'fact') dismiss()
    else if (phase.value === 'idle') chooseArchetype('herbivore')
    else if (phase.value === 'over' || phase.value === 'win') restart()
    return
  }
  if (c === 'ArrowUp' || c === 'KeyW') {
    input.keys.up = true
    e.preventDefault()
  }
  if (c === 'ArrowDown' || c === 'KeyS') input.keys.down = true
  if (c === 'ArrowLeft' || c === 'KeyA') input.keys.left = true
  if (c === 'ArrowRight' || c === 'KeyD') input.keys.right = true
}
function onKeyUp(e: KeyboardEvent) {
  const c = e.code
  if (c === 'ArrowUp' || c === 'KeyW') input.keys.up = false
  if (c === 'ArrowDown' || c === 'KeyS') input.keys.down = false
  if (c === 'ArrowLeft' || c === 'KeyA') input.keys.left = false
  if (c === 'ArrowRight' || c === 'KeyD') input.keys.right = false
}

function canvasPoint(clientX: number, clientY: number) {
  const c = canvasRef.value
  if (!c) return
  const rect = c.getBoundingClientRect()
  pointer.x = ((clientX - rect.left) / rect.width) * W
  pointer.y = ((clientY - rect.top) / rect.height) * H
  input.pointerX = pointer.x
  input.pointerY = pointer.y
}

function onPointerDown(e: PointerEvent) {
  if (!world) return
  // idle / fact / over overlays handle their own taps via @pointerdown on the overlay div
  if (world.phase === 'idle' || world.phase === 'fact' || world.phase === 'over' || world.phase === 'win') return
  canvasPoint(e.clientX, e.clientY)
  tap.downX = pointer.x
  tap.downY = pointer.y
  tap.downT = performance.now()
  tap.moved = false
  if (world.phase === 'egg') {
    handleEggPointerDown(world, pointer.x, pointer.y)
    return
  }
  // juvenile / adult — begin steering
  pointer.active = true
  input.pointerActive = true
}

function onPointerMove(e: PointerEvent) {
  if (!world) return
  if (world.phase !== 'juvenile' && world.phase !== 'adult') return
  if (!pointer.active) return
  canvasPoint(e.clientX, e.clientY)
  if (Math.hypot(pointer.x - tap.downX, pointer.y - tap.downY) > 12) tap.moved = true
}

function onPointerUp(e: PointerEvent) {
  if (!world) return
  if (world.phase !== 'juvenile' && world.phase !== 'adult') {
    pointer.active = false
    input.pointerActive = false
    return
  }
  canvasPoint(e.clientX, e.clientY)
  const dt = performance.now() - tap.downT
  // long-press → flyer DIVE; quick tap → archetype ability
  if (!tap.moved && dt >= 500 && world.archetype === 'flyer') {
    handleDive(world)
    syncMirror()
  } else if (!tap.moved && dt < 220) {
    handleAbility(world, pointer.x, pointer.y)
    syncMirror()
  }
  pointer.active = false
  input.pointerActive = false
}

function dismiss() {
  if (!world) return
  dismissFact(world)
  syncMirror()
  draw(world, ctx())
  if (world.phase === 'idle' || world.phase === 'fact' || world.phase === 'over' || world.phase === 'win') {
    if (world.phase === 'over' || world.phase === 'win') endRun()
    return
  }
  lastTs = performance.now()
  raf = requestAnimationFrame(loop)
}

function onVisibility() {
  if (!world) return
  if (document.hidden) {
    cancelAnimationFrame(raf)
  } else if (world.phase !== 'idle' && world.phase !== 'fact' && world.phase !== 'over' && world.phase !== 'win') {
    lastTs = performance.now()
    raf = requestAnimationFrame(loop)
  }
}

// Which bar to show per phase/archetype
const barDefs = computedBarDefs()

function computedBarDefs() {
  return () => {
    if (!world) return []
    const list: { key: string; label: string; color: string; value: number }[] = []
    if (world.phase === 'egg') {
      list.push({ key: 'warmth', label: t('games.dinoLife.warmth'), color: '#fbbf24', value: bars.value.warmth })
      list.push({ key: 'eggHealth', label: t('games.dinoLife.eggHealth'), color: '#ef4444', value: bars.value.eggHealth })
    } else {
      list.push({ key: 'health', label: t('games.dinoLife.health'), color: '#ef4444', value: bars.value.health })
      list.push({ key: 'hunger', label: t('games.dinoLife.hunger'), color: '#f97316', value: bars.value.hunger })
      if (world.archetype === 'flyer')
        list.push({ key: 'altitude', label: t('games.dinoLife.altitude'), color: '#38bdf8', value: bars.value.altitude })
      if (world.archetype === 'swimmer')
        list.push({ key: 'breath', label: t('games.dinoLife.breath'), color: '#06b6d4', value: bars.value.breath })
      if (world.phase === 'juvenile')
        list.push({ key: 'growth', label: t('games.dinoLife.growth'), color: '#22c55e', value: bars.value.growth })
      if (world.phase === 'adult')
        list.push({ key: 'day', label: t('games.dinoLife.day', { n: world.day, target: 5 }), color: '#a78bfa', value: Math.min(1, world.day / 5) })
    }
    return list
  }
}

function archetypeLabel(a: Archetype): string {
  return t(`games.dinoLife.${a}`)
}
function archetypeDesc(a: Archetype): string {
  return t(`games.dinoLife.${a}Desc`)
}
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function howToPlay(a: Archetype): string {
  return t(`games.dinoLife.howToPlay${cap(a)}`)
}
function abilityLabel(a: Archetype): string {
  return t(`games.dinoLife.ability${cap(a)}`)
}
const ABILITY_CD_MAX: Record<Archetype, number> = {
  herbivore: 900,
  carnivore: 350,
  flyer: 250,
  swimmer: 350,
}

onMounted(() => {
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('pointerup', onPointerUp)
  document.addEventListener('visibilitychange', onVisibility)
  // draw an idle background
  drawIdle()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('visibilitychange', onVisibility)
  cancelAnimationFrame(raf)
})

function drawIdle() {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#10243a')
  g.addColorStop(0.5, '#1a3a2e')
  g.addColorStop(1, '#0c2417')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  // a few twinkling stars
  ctx.fillStyle = '#eaf2ff'
  for (let i = 0; i < 40; i++) {
    const x = (i * 53) % W
    const y = (i * 37) % (H * 0.5)
    ctx.globalAlpha = 0.3 + ((i * 7) % 10) / 20
    ctx.beginPath()
    ctx.arc(x, y, 1.2, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
  // distant horizon glow
  const hg = ctx.createRadialGradient(W / 2, H, 40, W / 2, H, 360)
  hg.addColorStop(0, 'rgba(120,180,120,0.25)')
  hg.addColorStop(1, 'rgba(120,180,120,0)')
  ctx.fillStyle = hg
  ctx.fillRect(0, H - 360, W, 360)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 sm:py-10 overscroll-contain">
    <SeoHead :title="t('games.dinoLife.title')" :description="t('games.dinoLife.tagline')" />

    <div class="flex items-center justify-between mb-3 sm:mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm hidden sm:inline">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div class="flex gap-4 text-sm font-medium items-center">
        <span class="flex items-center gap-1.5" :class="{ 'dino-score-flash': milestoneFlash > 0 }">
          <BaseIcon name="star" :size="16" class="text-[var(--color-brand-amber)]" />
          {{ score }}
        </span>
        <span
          v-if="combo >= 2"
          class="dino-combo-pill"
          :style="{ background: comboMult(combo) >= 3 ? '#7c3aed' : '#f59e0b' }"
        >
          ×{{ comboMult(combo) }} · {{ combo }}
        </span>
        <span class="flex items-center gap-1.5 text-[var(--color-text-secondary)]">🏆 {{ best }}</span>
      </div>
    </div>

    <h1 class="text-display-sm sm:text-display-md mb-1 sm:mb-2 text-center">{{ t('games.dinoLife.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-3 sm:mb-4 hidden sm:block">
      {{ t('games.dinoLife.tagline') }}
    </p>

    <div class="flex justify-center">
      <div
        class="relative inline-block rounded-[var(--radius-xl)] overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)] bg-[#0c2417]"
      >
        <canvas
          ref="canvasRef"
          :width="W"
          :height="H"
          class="block select-none"
          style="touch-action: none; cursor: crosshair; max-width: 100%; max-height: 70vh; width: auto; height: auto"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
        />

        <!-- stage transition banner -->
        <Transition name="dino-banner">
          <div
            v-if="banner"
            :key="banner.id"
            class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]"
          >
            <span class="dino-banner-pop text-7xl sm:text-8xl">{{ banner.emoji }}</span>
            <p
              v-if="banner.howTo"
              class="dino-banner-howto mt-2 max-w-[80%] text-center text-sm sm:text-base font-semibold text-white"
            >
              {{ banner.howTo }}
            </p>
          </div>
        </Transition>

        <!-- combo banner -->
        <Transition name="dino-banner">
          <div
            v-if="comboFlash"
            :key="comboFlash.id"
            class="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center"
          >
            <span
              class="dino-combo-flash"
              :class="{
                'dino-combo-gold': comboFlash.tone === 'gold',
                'dino-combo-purple': comboFlash.tone === 'purple',
                'dino-combo-red': comboFlash.tone === 'red',
              }"
            >
              {{ comboFlash.text }}
            </span>
          </div>
        </Transition>

        <!-- win confetti -->
        <BaseConfetti v-if="showConfetti" />

        <!-- Idle: choose an archetype -->
        <div
          v-if="phase === 'idle'"
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-white p-3 overflow-auto"
          @pointerdown.stop
        >
          <div class="text-3xl mb-1">🥚➜🦖</div>
          <p class="text-sm font-semibold mb-2 text-center">{{ t('games.dinoLife.chooseArchetype') }}</p>
          <div class="grid grid-cols-2 gap-2 w-full max-w-[360px]">
            <button
              v-for="a in ARCHETYPES"
              :key="a.id"
              class="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-transform active:scale-95"
              :style="{ borderColor: a.ring, background: a.ring + '22' }"
              @pointerdown.stop="chooseArchetype(a.id)"
            >
              <span class="text-3xl">{{ a.emoji }}</span>
              <span class="text-xs font-semibold">{{ archetypeLabel(a.id) }}</span>
              <span class="text-[10px] opacity-80 text-center leading-tight">{{ archetypeDesc(a.id) }}</span>
            </button>
          </div>
          <p class="text-[11px] opacity-70 mt-2 text-center">{{ t('games.dinoLife.controlsTap') }}</p>
        </div>

        <!-- Fact interlude -->
        <div
          v-else-if="phase === 'fact'"
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/65 text-white p-4 text-center"
          @pointerdown.stop="dismiss"
        >
          <div class="text-4xl mb-2">📖</div>
          <p class="text-xs uppercase tracking-wide opacity-70 mb-1">{{ world?.species?.displayName }}</p>
          <p class="text-sm sm:text-base max-w-[320px] leading-relaxed">{{ factText }}</p>
          <p class="text-xs opacity-70 mt-3">{{ t('games.dinoLife.tapToContinue') }}</p>
        </div>

        <!-- Game over / win -->
        <div
          v-else-if="phase === 'over' || phase === 'win'"
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center p-4 cursor-pointer"
          @pointerdown.stop="restart"
        >
          <div class="text-5xl mb-2">{{ phase === 'win' ? '🏆' : '💀' }}</div>
          <p class="text-base sm:text-lg font-semibold mb-1">
            {{ phase === 'win' ? t('games.dinoLife.victory') : t('games.dinoLife.gameOver') }}
          </p>
          <p class="text-sm opacity-90 mb-1">{{ t('games.dinoLife.finalScore', { n: score }) }}</p>
          <p class="text-xs opacity-70">{{ t('games.dinoLife.tapToRestart') }}</p>
          <div class="mt-2 text-xs opacity-70 flex items-center gap-2"><span>🏆 {{ best }}</span></div>
        </div>
      </div>
    </div>

    <!-- Bars overlay (below canvas) -->
    <div v-if="phase === 'egg' || phase === 'juvenile' || phase === 'adult'" class="flex flex-col items-center gap-1 mt-3 max-w-[420px] mx-auto w-full">
      <div v-for="b in barDefs()" :key="b.key" class="flex items-center gap-2 w-full">
        <span class="text-[11px] w-20 text-right text-[var(--color-text-secondary)] truncate">{{ b.label }}</span>
        <div class="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            class="h-full rounded-full transition-[width] duration-200"
            :style="{ width: Math.max(0, Math.min(1, b.value)) * 100 + '%', background: b.color }"
          />
        </div>
      </div>
    </div>

    <!-- ability + legend + controls -->
    <div
      v-if="phase === 'juvenile' || phase === 'adult'"
      class="flex flex-col items-center gap-2 mt-3 max-w-[460px] mx-auto w-full"
    >
      <div class="flex items-center gap-2 w-full">
        <span class="text-[11px] font-semibold w-20 text-right text-[var(--color-text-secondary)] truncate">
          {{ abilityLabel(archetype) }}
        </span>
        <div class="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            class="h-full rounded-full transition-[width] duration-150"
            :style="{
              width: Math.max(0, 1 - abilityCd / ABILITY_CD_MAX[archetype]) * 100 + '%',
              background: abilityCd > 0 ? '#64748b' : '#22c55e',
            }"
          />
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-[var(--color-text-tertiary)]">
        <span><span class="text-[#22c55e]">●</span> {{ t('games.dinoLife.legendFood') }}</span>
        <span><span class="text-[#38bdf8]">●</span> {{ t('games.dinoLife.legendFish') }}</span>
        <span><span class="text-[#ef4444]">●</span> {{ t('games.dinoLife.legendPredator') }}</span>
        <span><span class="text-[#f97316]">●</span> {{ t('games.dinoLife.legendRival') }}</span>
        <span><span class="text-[#a78bfa]">●</span> {{ t('games.dinoLife.legendScavenger') }}</span>
        <span><span class="text-[#fbbf24]">●</span> {{ t('games.dinoLife.legendHerd') }}</span>
      </div>
      <div class="flex flex-wrap justify-center gap-x-4 text-[11px] text-[var(--color-text-tertiary)]">
        <span>⌨️ {{ t('games.dinoLife.controlsKey') }}</span>
        <span>👆 {{ t('games.dinoLife.controlsTap') }}</span>
        <span v-if="archetype === 'flyer'">⏬ {{ t('games.dinoLife.diveHint') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dino-banner-pop {
  display: inline-block;
  animation: dino-pop 1.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  filter: drop-shadow(0 0 24px rgba(251, 191, 36, 0.6));
}
@keyframes dino-pop {
  0% {
    transform: scale(0.2) rotate(-12deg);
    opacity: 0;
  }
  18% {
    transform: scale(1.15) rotate(4deg);
    opacity: 1;
  }
  30% {
    transform: scale(0.95) rotate(-2deg);
  }
  45% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  78% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1.4) translateY(-30px);
    opacity: 0;
  }
}
.dino-banner-enter-active,
.dino-banner-leave-active {
  transition: opacity 0.25s ease;
}
.dino-banner-enter-from,
.dino-banner-leave-to {
  opacity: 0;
}
.dino-banner-howto {
  animation: dino-howto 1.8s ease-out forwards;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}
@keyframes dino-howto {
  0% { opacity: 0; transform: translateY(8px); }
  20% { opacity: 1; transform: translateY(0); }
  78% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-6px); }
}
.dino-combo-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
.dino-score-flash {
  animation: dino-score-flash 0.6s ease-out;
}
@keyframes dino-score-flash {
  0% { color: #fbbf24; transform: scale(1.25); }
  100% { color: inherit; transform: scale(1); }
}
.dino-combo-flash {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  animation: dino-pop-combo 1.1s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
}
.dino-combo-gold { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
.dino-combo-purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
.dino-combo-red { background: linear-gradient(135deg, #dc2626, #f97316); }
@keyframes dino-pop-combo {
  0% { transform: scale(0.4) translateY(10px); opacity: 0; }
  20% { transform: scale(1.15) translateY(0); opacity: 1; }
  60% { transform: scale(1) translateY(0); opacity: 1; }
  100% { transform: scale(0.95) translateY(-14px); opacity: 0; }
}
</style>