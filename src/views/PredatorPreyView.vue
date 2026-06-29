<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
import { dinosaurs } from '@/data/dinosaurs'
import type { Dinosaur } from '@/types/dinosaur'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

// ─── Canvas ── (portrait arena — fills a phone screen, letterboxed on desktop)
const W = 540
const H = 720
const canvasRef = ref<HTMLCanvasElement | null>(null)

type Phase = 'idle' | 'playing' | 'over'
const phase = ref<Phase>('idle')
const score = ref(0)
const best = ref(parseInt(localStorage.getItem('dino-predator-prey-best') || '0'))

// ─── Dino pool (land species with a positive weight) ──
const pool = dinosaurs.filter(
  d =>
    (d.category === 'carnivore' || d.category === 'herbivore' || d.category === 'omnivore') &&
    d.dimensions.weightKg > 0,
)
const carnivores = pool
  .filter(d => d.category === 'carnivore')
  .sort((a, b) => a.dimensions.weightKg - b.dimensions.weightKg)

const START_MASS = 3

// radius from mass — sub-linear so a T-Rex isn't 100x a Compy visually
function radius(mass: number): number {
  return Math.max(12, Math.min(60, 12 * Math.pow(mass, 0.22)))
}

// the biggest carnivore not heavier than `mass` becomes the player's body
function choosePlayerSpecies(mass: number): Dinosaur {
  if (!carnivores.length) return pool[0]
  let chosen = carnivores[0]
  for (const c of carnivores) {
    if (c.dimensions.weightKg <= mass) chosen = c
    else break
  }
  return chosen
}

// ─── Image cache ──
interface ImgEntry {
  img: HTMLImageElement
  ok: boolean
}
const imgCache = new Map<string, ImgEntry>()
function getImg(slug: string): ImgEntry {
  let e = imgCache.get(slug)
  if (!e) {
    const img = new Image()
    e = { img, ok: false }
    img.onload = () => {
      e!.ok = true
    }
    img.onerror = () => {
      e!.ok = false
    }
    img.src = `/images/dinosaurs/${slug}/card.webp`
    imgCache.set(slug, e)
  }
  return e
}

// ─── State ──
interface Boid {
  slug: string
  mass: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  wander: number
}
interface Pop {
  x: number
  y: number
  r: number
  a: number
  color: string
}

let player = {
  x: W / 2,
  y: H / 2,
  vx: 0,
  vy: 0,
  mass: START_MASS,
  r: radius(START_MASS),
  species: carnivores[0] ?? pool[0],
}
let boids: Boid[] = []
let pops: Pop[] = []
let raf = 0
let lastTs = 0
let spawnTimer = 0
let targetCount = 11
let timeAlive = 0
let shake = 0
let reducedMotion = false

const pointer = { x: W / 2, y: H / 2, active: false }
const keys = { up: false, down: false, left: false, right: false }

// ─── Flow ──
function resetState() {
  player = {
    x: W / 2,
    y: H / 2,
    vx: 0,
    vy: 0,
    mass: START_MASS,
    r: radius(START_MASS),
    species: choosePlayerSpecies(START_MASS),
  }
  boids = []
  pops = []
  spawnTimer = 0
  targetCount = 11
  timeAlive = 0
  score.value = 0
  shake = 0
  pointer.active = false
  for (let i = 0; i < 9; i++) spawnBoid()
}

function startGame() {
  resetState()
  phase.value = 'playing'
  lastTs = performance.now()
  raf = requestAnimationFrame(loop)
}

function endGame() {
  phase.value = 'over'
  cancelAnimationFrame(raf)
  if (score.value > best.value) {
    best.value = score.value
    localStorage.setItem('dino-predator-prey-best', String(score.value))
  }
  gameStore.recordGameCompletion('predator-prey', score.value)
  draw()
}

function press() {
  if (phase.value !== 'playing') startGame()
}

// ─── Spawn ──
function spawnBoid() {
  const pm = player.mass
  const wantThreat = Math.random() < 0.35 + Math.min(0.25, timeAlive / 120000)
  const targetMass = wantThreat
    ? pm * (1.2 + Math.random() * 1.6)
    : pm * (0.15 + Math.random() * 0.7)
  const cand = pool.filter(d => {
    const m = d.dimensions.weightKg
    return wantThreat ? m > pm * 1.05 && m < pm * 3 : m < pm * 0.92 && m > pm * 0.02
  })
  const dino = cand.length
    ? cand[(Math.random() * cand.length) | 0]
    : pool[(Math.random() * pool.length) | 0]
  const mass = dino.dimensions.weightKg
  const r = radius(mass)
  // place away from the player
  let x = 0
  let y = 0
  const minDist = Math.max(80, player.r + r + 40)
  for (let tries = 0; tries < 15; tries++) {
    x = r + Math.random() * (W - 2 * r)
    y = r + Math.random() * (H - 2 * r)
    if (Math.hypot(x - player.x, y - player.y) > minDist) break
  }
  const ang = Math.random() * Math.PI * 2
  boids.push({
    slug: dino.slug,
    mass,
    x,
    y,
    vx: Math.cos(ang),
    vy: Math.sin(ang),
    r,
    wander: ang,
  })
}

// ─── Update ──
function update(dt: number) {
  const f = dt / 16.6667
  timeAlive += dt

  // difficulty: more dinos over time
  targetCount = Math.min(18, 11 + Math.floor(timeAlive / 12000))
  spawnTimer -= dt
  if (spawnTimer <= 0 && boids.length < targetCount) {
    spawnBoid()
    spawnTimer = 550 + Math.random() * 350
  }

  // player thrust
  let tx = 0
  let ty = 0
  if (pointer.active) {
    const dx = pointer.x - player.x
    const dy = pointer.y - player.y
    const d = Math.hypot(dx, dy)
    if (d > 4) {
      tx = dx / d
      ty = dy / d
    }
  } else {
    if (keys.up) ty -= 1
    if (keys.down) ty += 1
    if (keys.left) tx -= 1
    if (keys.right) tx += 1
    const l = Math.hypot(tx, ty)
    if (l > 0) {
      tx /= l
      ty /= l
    }
  }
  const accel = 0.6
  player.vx += tx * accel * f
  player.vy += ty * accel * f
  player.vx *= Math.pow(0.9, f)
  player.vy *= Math.pow(0.9, f)
  const maxSpeed = 4.2 * Math.pow(START_MASS / player.mass, 0.18)
  const sp = Math.hypot(player.vx, player.vy)
  if (sp > maxSpeed) {
    player.vx = (player.vx / sp) * maxSpeed
    player.vy = (player.vy / sp) * maxSpeed
  }
  player.x += player.vx * f
  player.y += player.vy * f
  if (player.x < player.r) {
    player.x = player.r
    player.vx = Math.abs(player.vx) * 0.5
  }
  if (player.x > W - player.r) {
    player.x = W - player.r
    player.vx = -Math.abs(player.vx) * 0.5
  }
  if (player.y < player.r) {
    player.y = player.r
    player.vy = Math.abs(player.vy) * 0.5
  }
  if (player.y > H - player.r) {
    player.y = H - player.r
    player.vy = -Math.abs(player.vy) * 0.5
  }

  // boids wander; bigger ones occasionally drift toward the player
  for (const b of boids) {
    b.wander += (Math.random() - 0.5) * 0.3 * f
    const bsp = 1.7 / (1 + b.r * 0.025)
    if (b.mass > player.mass * 1.05 && Math.random() < 0.012) {
      const dx = player.x - b.x
      const dy = player.y - b.y
      if (Math.hypot(dx, dy) < 190) b.wander = Math.atan2(dy, dx)
    }
    b.vx = Math.cos(b.wander) * bsp
    b.vy = Math.sin(b.wander) * bsp
    b.x += b.vx * f
    b.y += b.vy * f
    if (b.x < b.r) {
      b.x = b.r
      b.wander = Math.PI - b.wander
    }
    if (b.x > W - b.r) {
      b.x = W - b.r
      b.wander = Math.PI - b.wander
    }
    if (b.y < b.r) {
      b.y = b.r
      b.wander = -b.wander
    }
    if (b.y > H - b.r) {
      b.y = H - b.r
      b.wander = -b.wander
    }
  }

  // collisions
  for (let i = boids.length - 1; i >= 0; i--) {
    const b = boids[i]
    const d = Math.hypot(b.x - player.x, b.y - player.y)
    if (d < (b.r + player.r) * 0.82) {
      if (b.mass < player.mass * 0.95) {
        player.mass += b.mass * 0.55
        player.r = radius(player.mass)
        player.species = choosePlayerSpecies(player.mass)
        score.value++
        pops.push({ x: b.x, y: b.y, r: b.r, a: 1, color: '#22c55e' })
        boids.splice(i, 1)
      } else if (b.mass > player.mass * 1.05) {
        pops.push({ x: player.x, y: player.y, r: player.r, a: 1, color: '#ef4444' })
        shake = 14
        endGame()
        return
      } else {
        const ang = Math.atan2(player.y - b.y, player.x - b.x)
        player.x += Math.cos(ang) * 2.5
        player.y += Math.sin(ang) * 2.5
      }
    }
  }

  for (const p of pops) p.a -= 0.05 * f
  pops = pops.filter(p => p.a > 0)
  if (shake > 0) shake -= f * 0.8
}

// ─── Draw ──
function drawDino(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  slug: string,
  ring: string,
  isPlayer = false,
) {
  // halo + ring (the color-coded cue that needs no text)
  ctx.beginPath()
  ctx.arc(x, y, r + 4, 0, Math.PI * 2)
  ctx.fillStyle = ring + '33'
  ctx.fill()
  ctx.lineWidth = isPlayer ? 4 : 3
  ctx.strokeStyle = ring
  ctx.stroke()

  const e = getImg(slug)
  if (e.ok) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.clip()
    try {
      ctx.drawImage(e.img, x - r, y - r, 2 * r, 2 * r)
    } catch {
      ctx.fillStyle = ring
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  } else {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = ring
    ctx.fill()
  }

  if (isPlayer) {
    ctx.beginPath()
    ctx.arc(x, y, r + 7, 0, Math.PI * 2)
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 4])
    ctx.stroke()
    ctx.setLineDash([])
  }
}

function draw() {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  ctx.save()
  if (shake > 0 && !reducedMotion) {
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake)
  }
  ctx.fillStyle = '#0c2417'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  for (let x = 20; x < W; x += 44) {
    for (let y = 20; y < H; y += 44) ctx.fillRect(x, y, 2, 2)
  }

  for (const b of boids) {
    const danger = b.mass > player.mass * 1.05
    const safe = b.mass < player.mass * 0.95
    const ring = danger ? '#ef4444' : safe ? '#22c55e' : '#94a3b8'
    drawDino(ctx, b.x, b.y, b.r, b.slug, ring)
  }
  drawDino(ctx, player.x, player.y, player.r, player.species.slug, '#fbbf24', true)

  for (const p of pops) {
    ctx.globalAlpha = Math.max(0, p.a)
    ctx.strokeStyle = p.color
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * (1.6 - p.a * 0.5) * 1.5, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
  ctx.restore()
}

function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(dt)
  if (phase.value !== 'playing') return
  draw()
  raf = requestAnimationFrame(loop)
}

// ─── Input ──
function onKey(e: KeyboardEvent) {
  const c = e.code
  if (c === 'Space' || c === 'Enter') {
    e.preventDefault()
    press()
    return
  }
  if (c === 'ArrowUp' || c === 'KeyW') {
    keys.up = true
    e.preventDefault()
  }
  if (c === 'ArrowDown' || c === 'KeyS') keys.down = true
  if (c === 'ArrowLeft' || c === 'KeyA') keys.left = true
  if (c === 'ArrowRight' || c === 'KeyD') keys.right = true
}
function onKeyUp(e: KeyboardEvent) {
  const c = e.code
  if (c === 'ArrowUp' || c === 'KeyW') keys.up = false
  if (c === 'ArrowDown' || c === 'KeyS') keys.down = false
  if (c === 'ArrowLeft' || c === 'KeyA') keys.left = false
  if (c === 'ArrowRight' || c === 'KeyD') keys.right = false
}
function canvasPoint(clientX: number, clientY: number) {
  const c = canvasRef.value
  if (!c) return
  const rect = c.getBoundingClientRect()
  pointer.x = ((clientX - rect.left) / rect.width) * W
  pointer.y = ((clientY - rect.top) / rect.height) * H
}
function onPointerDown(e: PointerEvent) {
  if (phase.value !== 'playing') {
    press()
    return
  }
  canvasPoint(e.clientX, e.clientY)
  pointer.active = true
}
function onPointerMove(e: PointerEvent) {
  if (!pointer.active) return
  canvasPoint(e.clientX, e.clientY)
}
function onPointerUp() {
  pointer.active = false
}
function onVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(raf)
  } else if (phase.value === 'playing') {
    lastTs = performance.now()
    raf = requestAnimationFrame(loop)
  }
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  document.addEventListener('visibilitychange', onVisibility)
  resetState()
  draw()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('visibilitychange', onVisibility)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4 sm:py-10 overscroll-contain">
    <SeoHead
      :title="t('games.predatorPrey.title')"
      :description="t('games.predatorPrey.tagline')"
    />

    <div class="flex items-center justify-between mb-3 sm:mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm hidden sm:inline">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div class="flex gap-4 text-sm font-medium">
        <span class="flex items-center gap-1.5">
          <BaseIcon name="utensils" :size="16" class="text-[var(--color-brand-amber)]" />
          {{ score }}
        </span>
        <span class="flex items-center gap-1.5 text-[var(--color-text-secondary)]">🏆 {{ best }}</span>
      </div>
    </div>

    <h1 class="text-display-sm sm:text-display-md mb-1 sm:mb-2 text-center">
      {{ t('games.predatorPrey.title') }}
    </h1>
    <p
      class="text-body-sm text-center text-[var(--color-text-secondary)] mb-3 sm:mb-4 hidden sm:block"
    >
      {{ t('games.predatorPrey.tagline') }}
    </p>

    <!-- pictographic legend (readable without any text) -->
    <div
      class="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3 sm:mb-4 text-xs text-[var(--color-text-secondary)]"
    >
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-500/30" />
        {{ t('games.predatorPrey.legendEat') }}
      </span>
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-500/30" />
        {{ t('games.predatorPrey.legendAvoid') }}
      </span>
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
        {{ t('games.predatorPrey.youLabel') }}
      </span>
    </div>

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
        />

        <!-- idle / game-over overlay -->
        <div
          v-if="phase !== 'playing'"
          class="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-white text-center px-4 cursor-pointer"
          @pointerdown="press"
        >
          <div class="text-5xl sm:text-6xl mb-2 sm:mb-3">{{ phase === 'over' ? '💀' : '🦖' }}</div>
          <p v-if="phase === 'over'" class="text-base sm:text-lg font-semibold mb-1">
            {{ t('games.predatorPrey.finalScore', { n: score }) }}
          </p>
          <p class="text-xs sm:text-sm opacity-80">
            {{ phase === 'over' ? t('games.predatorPrey.tapToRestart') : t('games.predatorPrey.tapToStart') }}
          </p>
          <div
            v-if="phase === 'over'"
            class="mt-2 sm:mt-3 text-xs opacity-70 flex items-center gap-2"
          >
            <span>🏆 {{ best }}</span>
            <span>·</span>
            <span>{{ t('games.predatorPrey.eaten') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hidden sm:flex justify-center gap-8 mt-4 text-xs text-[var(--color-text-tertiary)]"
    >
      <span>⌨️ {{ t('games.predatorPrey.controlsKey') }}</span>
      <span>👆 {{ t('games.predatorPrey.controlsTap') }}</span>
    </div>
  </div>
</template>