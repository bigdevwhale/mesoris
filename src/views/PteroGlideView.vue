<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

const canvasRef = ref<HTMLCanvasElement | null>(null)

type Phase = 'idle' | 'playing' | 'over'
const phase = ref<Phase>('idle')
const score = ref(0)
const best = ref(parseInt(localStorage.getItem('dino-ptero-glide-best') || '0'))

// ─── Canvas constants ──────────────────────────────────────────────────────
const W = 800
const H = 300
const GRAVITY = 0.42         // gentler than runner — keeps the glide feel
const FLAP_V = -7.5
const BASE_SPEED = 3.2
const MAX_SPEED = 9.5

// Ptero state
const PTERO_X = 110
const ptero = { y: H / 2, vy: 0, wingFrame: 0, wingTimer: 0 }

// Rock arches
type Arch = { x: number; gapY: number; gapH: number; w: number; passed: boolean }
let arches: Arch[] = []

// Background layers
type Cloud = { x: number; y: number; r: number; speed: number }
let clouds: Cloud[] = []
type Mountain = { x: number; h: number }
let farMountains: Mountain[] = []
let nearMountains: Mountain[] = []

// Game loop state
let raf = 0
let lastTs = 0
let gameSpeed = BASE_SPEED
let scoreTick = 0
let spawnIn = 1400
let milestoneFlash = 0
let reducedMotion = false

// ─── Setup background once ─────────────────────────────────────────────────
function initBackground() {
  clouds = []
  for (let i = 0; i < 7; i++) {
    clouds.push({
      x: Math.random() * W,
      y: 10 + Math.random() * 80,
      r: 16 + Math.random() * 28,
      speed: 0.3 + Math.random() * 0.4,
    })
  }

  farMountains = []
  let fx = 0
  while (fx < W + 120) {
    farMountains.push({ x: fx, h: 40 + Math.random() * 60 })
    fx += 60 + Math.random() * 40
  }

  nearMountains = []
  let nx = 0
  while (nx < W + 120) {
    nearMountains.push({ x: nx, h: 60 + Math.random() * 90 })
    nx += 80 + Math.random() * 60
  }
}

initBackground()

// ─── Game flow ─────────────────────────────────────────────────────────────
function resetState() {
  score.value = 0
  gameSpeed = BASE_SPEED
  scoreTick = 0
  spawnIn = 1400
  milestoneFlash = 0
  arches = []
  Object.assign(ptero, { y: H / 2, vy: 0, wingFrame: 0, wingTimer: 0 })
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
    localStorage.setItem('dino-ptero-glide-best', String(score.value))
  }
  draw(lastTs)
}

function flap() {
  if (phase.value === 'idle' || phase.value === 'over') { startGame(); return }
  // In flappy-bird style, a single tap gives an upward impulse.
  ptero.vy = FLAP_V
}

// ─── Loop ─────────────────────────────────────────────────────────────────
function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(dt)
  if (phase.value !== 'playing') return
  draw(ts)
  raf = requestAnimationFrame(loop)
}

// ─── Update ───────────────────────────────────────────────────────────────
function update(dt: number) {
  // Score
  scoreTick += dt
  while (scoreTick >= 100) {
    score.value++
    scoreTick -= 100
    if (score.value % 50 === 0) milestoneFlash = 25
  }
  if (milestoneFlash > 0) milestoneFlash--

  // Speed ramp
  gameSpeed = Math.min(BASE_SPEED + score.value * 0.022, MAX_SPEED)

  // Ptero physics
  ptero.vy += GRAVITY
  ptero.y += ptero.vy

  // Ceiling / floor collision
  if (ptero.y < 14) { ptero.y = 14; ptero.vy = 0 }
  if (ptero.y > H - 18) { endGame(); return }

  // Wing animation
  ptero.wingTimer += dt
  if (ptero.wingTimer >= 90) {
    ptero.wingFrame ^= 1
    ptero.wingTimer = 0
  }

  // Spawn arches
  spawnIn -= dt
  if (spawnIn <= 0) {
    spawnArch()
    const gap = 1000 + Math.random() * 1100
    spawnIn = gap * (BASE_SPEED / gameSpeed) * 0.95
  }

  // Move arches
  const dx = gameSpeed * dt / 16
  for (const a of arches) {
    if (!a.passed && a.x + a.w < PTERO_X) {
      a.passed = true
      score.value += 2  // bonus for clearing an arch
    }
    a.x -= dx
  }
  arches = arches.filter(a => a.x + a.w > -40)

  // Move clouds
  for (const c of clouds) {
    c.x -= gameSpeed * c.speed * dt / 16
    if (c.x + c.r < 0) {
      c.x = W + c.r + Math.random() * 100
      c.y = 10 + Math.random() * 80
    }
  }
  // Move mountains
  for (const m of farMountains)  m.x -= gameSpeed * 0.15 * dt / 16
  for (const m of nearMountains) m.x -= gameSpeed * 0.4  * dt / 16
  if (farMountains[0] && farMountains[0].x < -120)  farMountains.shift()
  if (nearMountains[0] && nearMountains[0].x < -160) nearMountains.shift()
  // Recycle mountains: append when right edge exposed
  const lastFar = farMountains[farMountains.length - 1]
  if (lastFar && lastFar.x < W - 40) {
    const step = 60 + Math.random() * 40
    farMountains.push({ x: lastFar.x + step, h: 40 + Math.random() * 60 })
  }
  const lastNear = nearMountains[nearMountains.length - 1]
  if (lastNear && lastNear.x < W - 60) {
    const step = 80 + Math.random() * 60
    nearMountains.push({ x: lastNear.x + step, h: 60 + Math.random() * 90 })
  }

  // Collision with arches
  for (const a of arches) {
    if (collidesArch(a)) { endGame(); return }
  }
}

function spawnArch() {
  const gapH = 130 - Math.min(40, score.value * 0.12)  // shrinks a bit
  const gapY = 30 + Math.random() * (H - 60 - gapH)
  arches.push({
    x: W + 20,
    gapY,
    gapH,
    w: 70,
    passed: false,
  })
}

function collidesArch(a: Arch): boolean {
  // Generous ptero hitbox
  const px = PTERO_X - 14
  const py = ptero.y - 10
  const pw = 28
  const ph = 20

  // Check top rock
  if (px < a.x + a.w && px + pw > a.x && py < a.gapY) return true
  // Check bottom rock
  const bottomY = a.gapY + a.gapH
  if (px < a.x + a.w && px + pw > a.x && py + ph > bottomY) return true
  return false
}

// ─── Draw ─────────────────────────────────────────────────────────────────
function draw(_ts: number) {
  const cv = canvasRef.value
  if (!cv) return
  const ctx = cv.getContext('2d')!

  // Sky — warm dusk of the Mesozoic
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0,   '#fcd9a6')
  sky.addColorStop(0.5, '#f0a868')
  sky.addColorStop(1,   '#c66e3a')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // Sun
  const sunY = 70
  const sunX = 640
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 90)
  sunGrad.addColorStop(0, 'rgba(255, 240, 200, 0.95)')
  sunGrad.addColorStop(0.3, 'rgba(255, 200, 120, 0.6)')
  sunGrad.addColorStop(1, 'rgba(255, 200, 120, 0)')
  ctx.fillStyle = sunGrad
  ctx.beginPath(); ctx.arc(sunX, sunY, 90, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255, 250, 220, 0.9)'
  ctx.beginPath(); ctx.arc(sunX, sunY, 26, 0, Math.PI * 2); ctx.fill()

  // Far mountains (lighter)
  ctx.fillStyle = 'rgba(120, 60, 50, 0.55)'
  for (const m of farMountains) {
    ctx.beginPath()
    ctx.moveTo(m.x, H)
    ctx.lineTo(m.x + 50, H - m.h)
    ctx.lineTo(m.x + 100, H)
    ctx.closePath()
    ctx.fill()
  }

  // Clouds
  ctx.fillStyle = 'rgba(255, 240, 220, 0.7)'
  for (const c of clouds) {
    ctx.beginPath(); ctx.ellipse(c.x, c.y, c.r, c.r * 0.4, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(c.x - c.r * 0.45, c.y + c.r * 0.18, c.r * 0.45, c.r * 0.28, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(c.x + c.r * 0.45, c.y + c.r * 0.18, c.r * 0.45, c.r * 0.28, 0, 0, Math.PI * 2); ctx.fill()
  }

  // Near mountains (darker, larger)
  ctx.fillStyle = 'rgba(70, 35, 30, 0.85)'
  for (const m of nearMountains) {
    ctx.beginPath()
    ctx.moveTo(m.x, H)
    ctx.lineTo(m.x + 60, H - m.h)
    ctx.lineTo(m.x + 120, H)
    ctx.closePath()
    ctx.fill()
  }

  // Arches (rock columns top + bottom)
  for (const a of arches) drawArch(ctx, a)

  // Ptero
  drawPtero(ctx, PTERO_X, ptero.y, ptero.wingFrame, phase.value === 'over')

  // HUD — score
  ctx.textAlign = 'right'
  ctx.font = 'bold 16px monospace'
  const scoreColor = milestoneFlash > 0 ? '#fef3c7' : 'rgba(255, 255, 255, 0.95)'
  ctx.fillStyle = scoreColor
  ctx.fillText(String(score.value).padStart(5, '0'), W - 16, 26)
  if (best.value > 0) {
    ctx.font = '12px monospace'
    ctx.fillStyle = 'rgba(254, 243, 199, 0.85)'
    ctx.fillText('HI ' + String(best.value).padStart(5, '0'), W - 16, 42)
  }
  ctx.textAlign = 'left'

  // Overlays
  if (phase.value === 'idle') {
    drawOverlay(ctx, '🦅  PTERO GLIDE', t('games.pteroGlide.tapToStart'))
  } else if (phase.value === 'over') {
    drawOverlay(ctx, t('games.pteroGlide.gameOver'), t('games.pteroGlide.tapToRestart'), true, score.value)
  }
}

function drawOverlay(
  ctx: CanvasRenderingContext2D,
  title: string,
  sub: string,
  red = false,
  scoreVal?: number,
) {
  ctx.fillStyle = 'rgba(20, 10, 5, 0.45)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = 'bold 30px system-ui, sans-serif'
  ctx.fillStyle = red ? '#fca5a5' : '#fffaf0'
  ctx.fillText(title, W / 2, H / 2 - 14)
  ctx.font = '15px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255, 250, 240, 0.85)'
  ctx.fillText(sub, W / 2, H / 2 + 14)
  if (red && scoreVal !== undefined) {
    ctx.font = '13px monospace'
    ctx.fillStyle = 'rgba(255, 250, 240, 0.55)'
    ctx.fillText(String(scoreVal).padStart(5, '0'), W / 2, H / 2 + 36)
  }
  ctx.textAlign = 'left'
}

// ─── Rock arch (column) sprites ────────────────────────────────────────────
function drawArch(ctx: CanvasRenderingContext2D, a: Arch) {
  // Top column
  ctx.fillStyle = '#7c2d12'
  ctx.fillRect(a.x, 0, a.w, a.gapY)
  // Bottom column
  ctx.fillRect(a.x, a.gapY + a.gapH, a.w, H - (a.gapY + a.gapH))

  // Lighter highlight stripe
  ctx.fillStyle = '#9a3412'
  ctx.fillRect(a.x + 4, 0, 6, a.gapY)
  ctx.fillRect(a.x + 4, a.gapY + a.gapH, 6, H - (a.gapY + a.gapH))

  // Dark shadow stripe
  ctx.fillStyle = '#431407'
  ctx.fillRect(a.x + a.w - 8, 0, 8, a.gapY)
  ctx.fillRect(a.x + a.w - 8, a.gapY + a.gapH, 8, H - (a.gapY + a.gapH))

  // Top cap
  ctx.fillStyle = '#5b1d0a'
  ctx.fillRect(a.x - 4, a.gapY - 6, a.w + 8, 6)
  ctx.fillStyle = '#a04525'
  ctx.fillRect(a.x - 4, a.gapY - 6, a.w + 8, 2)

  // Bottom cap
  ctx.fillStyle = '#5b1d0a'
  ctx.fillRect(a.x - 4, a.gapY + a.gapH, a.w + 8, 6)
  ctx.fillStyle = '#a04525'
  ctx.fillRect(a.x - 4, a.gapY + a.gapH, a.w + 8, 2)
}

// ─── Pterodactyl sprite ───────────────────────────────────────────────────
function drawPtero(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wing: number,
  isDead: boolean,
) {
  const body = isDead ? '#6b4a8a' : '#8b5cf6'
  const dark = isDead ? '#4c3565' : '#6d28d9'
  const light = isDead ? '#a78bba' : '#c4b5fd'
  const beak = isDead ? '#a16207' : '#fbbf24'

  // Wings (big — they are the main thing)
  ctx.fillStyle = body
  if (isDead) {
    // Wings drooped down
    ctx.beginPath()
    ctx.moveTo(x - 6, y - 2); ctx.lineTo(x - 28, y + 14); ctx.lineTo(x - 4, y + 4); ctx.closePath(); ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x + 6, y - 2); ctx.lineTo(x + 28, y + 14); ctx.lineTo(x + 4, y + 4); ctx.closePath(); ctx.fill()
  } else if (wing === 0) {
    // Wings up
    ctx.beginPath()
    ctx.moveTo(x - 4, y - 4); ctx.lineTo(x - 30, y - 22); ctx.lineTo(x - 4, y - 10); ctx.closePath(); ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x + 4, y - 4); ctx.lineTo(x + 30, y - 22); ctx.lineTo(x + 4, y - 10); ctx.closePath(); ctx.fill()
  } else {
    // Wings mid/down
    ctx.beginPath()
    ctx.moveTo(x - 4, y - 4); ctx.lineTo(x - 32, y + 6); ctx.lineTo(x - 4, y + 2); ctx.closePath(); ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x + 4, y - 4); ctx.lineTo(x + 32, y + 6); ctx.lineTo(x + 4, y + 2); ctx.closePath(); ctx.fill()
  }

  // Wing membrane lines
  ctx.strokeStyle = dark
  ctx.lineWidth = 1
  if (isDead) {
    ctx.beginPath(); ctx.moveTo(x - 4, y - 2); ctx.lineTo(x - 24, y + 12); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x + 4, y - 2); ctx.lineTo(x + 24, y + 12); ctx.stroke()
  } else {
    const wingTipY = wing === 0 ? y - 22 : y + 6
    ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x - 28, wingTipY); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x + 28, wingTipY); ctx.stroke()
  }

  // Body
  ctx.fillStyle = body
  ctx.beginPath(); ctx.ellipse(x, y, 10, 6, 0, 0, Math.PI * 2); ctx.fill()

  // Body highlight
  ctx.fillStyle = light
  ctx.beginPath(); ctx.ellipse(x - 2, y - 2, 5, 2, 0, 0, Math.PI * 2); ctx.fill()

  // Head
  ctx.fillStyle = body
  ctx.fillRect(x + 6, y - 7, 10, 9)

  // Long ptero beak
  ctx.fillStyle = beak
  ctx.beginPath()
  ctx.moveTo(x + 14, y - 5); ctx.lineTo(x + 26, y - 2); ctx.lineTo(x + 14, y - 1); ctx.closePath(); ctx.fill()

  // Head crest
  ctx.fillStyle = beak
  ctx.beginPath()
  ctx.moveTo(x + 8, y - 7); ctx.lineTo(x + 6, y - 14); ctx.lineTo(x + 12, y - 7); ctx.closePath(); ctx.fill()

  // Eye
  if (isDead) {
    // X eye
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 1.5
    const ex = x + 10, ey = y - 4
    ctx.beginPath(); ctx.moveTo(ex - 2.5, ey - 2.5); ctx.lineTo(ex + 2.5, ey + 2.5); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ex + 2.5, ey - 2.5); ctx.lineTo(ex - 2.5, ey + 2.5); ctx.stroke()
  } else {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 10, y - 4, 2.5, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x + 10, y - 4, 1.2, 0, Math.PI * 2); ctx.fill()
  }

  // Small tail
  ctx.fillStyle = dark
  ctx.beginPath()
  ctx.moveTo(x - 8, y - 1); ctx.lineTo(x - 16, y + 1); ctx.lineTo(x - 8, y + 3); ctx.closePath(); ctx.fill()
}

// ─── Input ────────────────────────────────────────────────────────────────
function onKey(e: KeyboardEvent) {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    e.preventDefault()
    flap()
  }
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('keydown', onKey)
  draw(performance.now())
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('games.pteroGlide.title')"
      :description="t('games.pteroGlide.hint')"
    />

    <div class="flex items-center justify-between mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
    </div>

    <h1 class="text-display-md mb-2 text-center">{{ t('games.pteroGlide.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-6">
      {{ t('games.pteroGlide.hint') }}
    </p>

    <!-- Canvas -->
    <div
      class="relative rounded-[var(--radius-xl)] overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)]"
    >
      <canvas
        ref="canvasRef"
        :width="800"
        :height="300"
        class="block w-full select-none"
        style="cursor: pointer; image-rendering: pixelated"
        @click="flap"
        @touchstart.prevent="flap"
      />
    </div>

    <!-- Controls hint -->
    <div class="flex justify-center gap-8 mt-4 text-xs text-[var(--color-text-tertiary)]">
      <span>⌨️ {{ t('games.pteroGlide.controlsKey') }}</span>
      <span>👆 {{ t('games.pteroGlide.controlsTap') }}</span>
      <span>⛰️ {{ t('games.pteroGlide.controlsObstacle') }}</span>
    </div>
  </div>
</template>
