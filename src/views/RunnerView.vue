<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

const canvasRef = ref<HTMLCanvasElement | null>(null)

// ─── Reactive display values ──────────────────────────────────────────────
type Phase = 'idle' | 'playing' | 'over'
const phase = ref<Phase>('idle')
const score = ref(0)
const best = ref(parseInt(localStorage.getItem('dino-runner-best') || '0'))

// ─── Constants ────────────────────────────────────────────────────────────
const W = 800
const H = 300
const GROUND = H - 50         // y = 250
const DINO_X = 80
const GRAVITY = 0.85
const JUMP_V = -17
const MAX_JUMPS = 2
const BASE_SPEED = 4.5
const MAX_SPEED = 13

// ─── Mutable game state ────────────────────────────────────────────────────
let raf = 0
let lastTs = 0
let gameSpeed = BASE_SPEED
let scoreTick = 0
let spawnIn = 1500
let milestoneFlash = 0  // frames to show milestone flash

const dino = { y: GROUND, vy: 0, jumps: 0, legFrame: 0, legTimer: 0 }

type Kind = 'smRock' | 'lgRock' | 'dblRock' | 'ptero'
interface Obs { kind: Kind; x: number; centerY: number; w: number; h: number }
let obstacles: Obs[] = []

interface Cloud { x: number; y: number; r: number }
let clouds: Cloud[] = []

// ─── One-time geometry ────────────────────────────────────────────────────
const mtnPts: [number, number][] = []
let mx = 0
while (mx < W + 80) {
  mtnPts.push([mx, GROUND - 35 - Math.random() * 75])
  mx += 22 + Math.random() * 48
}

for (let i = 0; i < 6; i++)
  clouds.push({ x: Math.random() * W, y: 12 + Math.random() * 55, r: 18 + Math.random() * 32 })

const OBS_SIZE: Record<Kind, { w: number; h: number }> = {
  smRock:  { w: 26, h: 32 },
  lgRock:  { w: 20, h: 46 },
  dblRock: { w: 50, h: 34 },
  ptero:   { w: 46, h: 26 },
}

// pterodactyl center-Y options (all below dino's head = must jump over)
const PTERO_YS = [GROUND - 48, GROUND - 62, GROUND - 52]  // 202, 188, 198

// ─── Game flow ────────────────────────────────────────────────────────────
function resetState() {
  score.value = 0
  gameSpeed = BASE_SPEED
  scoreTick = 0
  spawnIn = 1500
  milestoneFlash = 0
  obstacles = []
  Object.assign(dino, { y: GROUND, vy: 0, jumps: 0, legFrame: 0, legTimer: 0 })
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
    localStorage.setItem('dino-runner-best', String(score.value))
  }
  draw(lastTs)
}

function handleJump() {
  if (phase.value === 'idle' || phase.value === 'over') { startGame(); return }
  if (dino.jumps < MAX_JUMPS) { dino.vy = JUMP_V; dino.jumps++ }
}

// ─── Loop ─────────────────────────────────────────────────────────────────
function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(dt)
  if (phase.value !== 'playing') return  // endGame() was called — stop here
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
    if (score.value % 100 === 0) milestoneFlash = 30
  }
  if (milestoneFlash > 0) milestoneFlash--

  // Speed ramp (slower progression — reaches max speed only after score ~340)
  gameSpeed = Math.min(BASE_SPEED + score.value * 0.025, MAX_SPEED)

  // Dino physics
  dino.vy += GRAVITY
  dino.y += dino.vy
  if (dino.y >= GROUND) { dino.y = GROUND; dino.vy = 0; dino.jumps = 0 }

  // Leg animation
  if (dino.y === GROUND) {
    dino.legTimer += dt
    if (dino.legTimer >= 110) { dino.legFrame ^= 1; dino.legTimer = 0 }
  }

  // Spawn obstacles — longer gaps so the game is approachable
  spawnIn -= dt
  if (spawnIn <= 0) {
    spawnObstacle()
    const gap = 1100 + Math.random() * 1400
    spawnIn = gap * (BASE_SPEED / gameSpeed) * 0.95
  }

  // Move obstacles + clouds
  const dx = gameSpeed * dt / 16
  for (const o of obstacles) o.x -= dx
  obstacles = obstacles.filter(o => o.x + o.w > -30)
  for (const c of clouds) {
    c.x -= gameSpeed * 0.22 * dt / 16
    if (c.x + c.r < 0) { c.x = W + c.r + Math.random() * 80; c.y = 12 + Math.random() * 55 }
  }

  // Collision detection
  for (const o of obstacles) {
    if (collides(o)) { endGame(); return }
  }
}

function spawnObstacle() {
  const kinds: Kind[] = ['smRock', 'lgRock', 'dblRock', 'ptero']
  const kind = kinds[Math.floor(Math.random() * kinds.length)]
  const s = OBS_SIZE[kind]
  obstacles.push({
    kind, x: W + 20, w: s.w, h: s.h,
    centerY: PTERO_YS[Math.floor(Math.random() * PTERO_YS.length)],
  })
}

function collides(o: Obs): boolean {
  // Dino hitbox — generously shrunk for fair feel
  const dx = DINO_X + 14,  dy = dino.y - 70,  dw = 20,  dh = 64

  let ox: number, oy: number, ow: number, oh: number
  if (o.kind === 'ptero') {
    ox = o.x + 8;  oy = o.centerY - 7;  ow = o.w - 16;  oh = 14
  } else {
    ox = o.x + 5;  oy = GROUND - o.h + 5;  ow = o.w - 10;  oh = o.h - 8
  }
  return dx < ox + ow && dx + dw > ox && dy < oy + oh && dy + dh > oy
}

// ─── Draw ─────────────────────────────────────────────────────────────────
function draw(ts: number) {
  const cv = canvasRef.value
  if (!cv) return
  const ctx = cv.getContext('2d')!

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND)
  sky.addColorStop(0, '#0d1b2a')
  sky.addColorStop(1, '#1e3a5f')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GROUND)

  // Mountains
  ctx.fillStyle = 'rgba(10,22,40,0.75)'
  ctx.beginPath()
  ctx.moveTo(0, GROUND)
  for (const [px, py] of mtnPts) ctx.lineTo(px, py)
  ctx.lineTo(W, GROUND)
  ctx.closePath()
  ctx.fill()

  // Clouds
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  for (const c of clouds) {
    ctx.beginPath(); ctx.ellipse(c.x, c.y, c.r, c.r * 0.42, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(c.x - c.r * 0.44, c.y + c.r * 0.2, c.r * 0.46, c.r * 0.3, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(c.x + c.r * 0.44, c.y + c.r * 0.2, c.r * 0.46, c.r * 0.3, 0, 0, Math.PI * 2); ctx.fill()
  }

  // Ground base
  ctx.fillStyle = '#1c150a'
  ctx.fillRect(0, GROUND, W, H - GROUND)
  ctx.fillStyle = '#5c4a1e'
  ctx.fillRect(0, GROUND, W, 5)
  ctx.fillStyle = '#7a6030'
  ctx.fillRect(0, GROUND + 1, W, 2)

  // Scrolling ground texture
  const off = (ts * 0.055) % 55
  ctx.fillStyle = 'rgba(120,95,40,0.45)'
  for (let gx = -off; gx < W; gx += 55) {
    ctx.fillRect(gx,      GROUND + 9,  4, 2)
    ctx.fillRect(gx + 27, GROUND + 20, 3, 2)
    ctx.fillRect(gx + 12, GROUND + 33, 5, 2)
  }

  // Obstacles
  for (const o of obstacles) drawObstacle(ctx, o, ts)

  // Dino
  drawDino(ctx, DINO_X, dino.y, dino.legFrame, dino.y < GROUND, phase.value === 'over')

  // HUD — score
  ctx.textAlign = 'right'
  ctx.font = `bold 16px monospace`
  const scoreColor = milestoneFlash > 0 ? '#fbbf24' : 'rgba(255,255,255,0.9)'
  ctx.fillStyle = scoreColor
  ctx.fillText(String(score.value).padStart(5, '0'), W - 16, 26)
  if (best.value > 0) {
    ctx.font = '12px monospace'
    ctx.fillStyle = 'rgba(251,191,36,0.7)'
    ctx.fillText('HI ' + String(best.value).padStart(5, '0'), W - 16, 42)
  }
  ctx.textAlign = 'left'

  // Overlays
  if (phase.value === 'idle') {
    drawOverlay(ctx, '🦖  DINO RUN', t('games.runnerGame.tapToStart'))
  } else if (phase.value === 'over') {
    drawOverlay(ctx, t('games.runnerGame.gameOver'), t('games.runnerGame.tapToRestart'), true, score.value)
  }
}

function drawOverlay(
  ctx: CanvasRenderingContext2D,
  title: string,
  sub: string,
  red = false,
  scoreVal?: number,
) {
  ctx.fillStyle = 'rgba(0,0,0,0.52)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = 'bold 30px system-ui, sans-serif'
  ctx.fillStyle = red ? '#f87171' : '#fff'
  ctx.fillText(title, W / 2, H / 2 - 14)
  ctx.font = '15px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fillText(sub, W / 2, H / 2 + 14)
  if (red && scoreVal !== undefined) {
    ctx.font = '13px monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.fillText(String(scoreVal).padStart(5, '0'), W / 2, H / 2 + 36)
  }
  ctx.textAlign = 'left'
}

// ─── Dino sprite ──────────────────────────────────────────────────────────
function drawDino(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  leg: number,
  inAir: boolean,
  isDead: boolean,
) {
  const amber  = isDead ? '#9a6a00' : '#f59e0b'
  const dark   = isDead ? '#7a5000' : '#d97706'
  const light  = isDead ? '#c08020' : '#fcd34d'

  if (isDead) {
    // Stumped pose: body same, but legs both splayed + X eyes
    drawDinoBody(ctx, x, y, 0, false, amber, dark, light)
    // Override eye with X
    ctx.fillStyle = amber
    ctx.fillRect(x + 34, y - 84, 5, 5)  // erase normal eye
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 2
    const ex = x + 36, ey = y - 82
    ctx.beginPath(); ctx.moveTo(ex - 3, ey - 3); ctx.lineTo(ex + 3, ey + 3); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ex + 3, ey - 3); ctx.lineTo(ex - 3, ey + 3); ctx.stroke()
    return
  }

  drawDinoBody(ctx, x, y, leg, inAir, amber, dark, light)
}

function drawDinoBody(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  leg: number,
  inAir: boolean,
  amber: string,
  dark: string,
  light: string,
) {

  // Tail
  ctx.fillStyle = amber;  ctx.fillRect(x - 2, y - 42, 14, 8)
  ctx.fillStyle = dark;   ctx.fillRect(x - 8, y - 36, 8, 6)

  // Body
  ctx.fillStyle = amber;  ctx.fillRect(x + 6, y - 54, 30, 24)

  // Highlight stripe on body
  ctx.fillStyle = light;  ctx.fillRect(x + 9, y - 52, 9, 5)

  // Neck
  ctx.fillStyle = amber;  ctx.fillRect(x + 24, y - 72, 12, 20)

  // Head
  ctx.fillRect(x + 22, y - 86, 22, 16)

  // Snout / jaw
  ctx.fillRect(x + 36, y - 76, 10, 9)

  // Eye
  ctx.fillStyle = '#fff';  ctx.fillRect(x + 34, y - 84, 5, 5)
  ctx.fillStyle = '#111';  ctx.fillRect(x + 35, y - 83, 3, 3)

  // Tiny arm
  ctx.fillStyle = amber;  ctx.fillRect(x + 26, y - 38, 10, 6)

  // Legs
  if (!inAir) {
    if (leg === 0) {
      ctx.fillRect(x + 10, y - 30, 11, 22);  ctx.fillRect(x + 5,  y - 10, 16, 6)
      ctx.fillRect(x + 24, y - 26, 11, 18);  ctx.fillRect(x + 22, y - 10, 13, 5)
    } else {
      ctx.fillRect(x + 10, y - 26, 11, 18);  ctx.fillRect(x + 8,  y - 10, 13, 5)
      ctx.fillRect(x + 24, y - 30, 11, 22);  ctx.fillRect(x + 24, y - 10, 16, 6)
    }
  } else {
    // Tucked in air
    ctx.fillRect(x + 10, y - 32, 11, 22)
    ctx.fillRect(x + 24, y - 32, 11, 22)
  }
}

// ─── Obstacle sprites ─────────────────────────────────────────────────────
function drawObstacle(ctx: CanvasRenderingContext2D, o: Obs, ts: number) {
  if (o.kind === 'ptero') drawPtero(ctx, o.x, o.centerY, ts)
  else drawRock(ctx, o.x, o.kind)
}

function drawRock(ctx: CanvasRenderingContext2D, x: number, kind: Kind) {
  if (kind === 'smRock') {
    ctx.fillStyle = '#92400e'
    ctx.beginPath()
    ctx.moveTo(x + 3,  GROUND);      ctx.lineTo(x,      GROUND - 18)
    ctx.lineTo(x + 5,  GROUND - 30); ctx.lineTo(x + 13, GROUND - 32)
    ctx.lineTo(x + 23, GROUND - 24); ctx.lineTo(x + 26, GROUND - 10)
    ctx.lineTo(x + 26, GROUND);      ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#b45309'
    ctx.fillRect(x + 7, GROUND - 26, 8, 10)

  } else if (kind === 'lgRock') {
    ctx.fillStyle = '#92400e'
    ctx.beginPath()
    ctx.moveTo(x + 2,  GROUND);      ctx.lineTo(x,      GROUND - 30)
    ctx.lineTo(x + 4,  GROUND - 44); ctx.lineTo(x + 10, GROUND - 46)
    ctx.lineTo(x + 18, GROUND - 40); ctx.lineTo(x + 20, GROUND - 20)
    ctx.lineTo(x + 20, GROUND);      ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#b45309'
    ctx.fillRect(x + 5, GROUND - 40, 7, 20)

  } else {
    // Double rocks
    ctx.fillStyle = '#78350f'
    ctx.beginPath()
    ctx.moveTo(x + 2,  GROUND);      ctx.lineTo(x,      GROUND - 20)
    ctx.lineTo(x + 4,  GROUND - 32); ctx.lineTo(x + 14, GROUND - 34)
    ctx.lineTo(x + 22, GROUND - 22); ctx.lineTo(x + 22, GROUND)
    ctx.closePath(); ctx.fill()

    ctx.fillStyle = '#92400e'
    ctx.beginPath()
    ctx.moveTo(x + 18, GROUND);      ctx.lineTo(x + 20, GROUND - 16)
    ctx.lineTo(x + 24, GROUND - 28); ctx.lineTo(x + 34, GROUND - 30)
    ctx.lineTo(x + 46, GROUND - 20); ctx.lineTo(x + 50, GROUND)
    ctx.closePath(); ctx.fill()

    ctx.fillStyle = '#b45309'
    ctx.fillRect(x + 26, GROUND - 24, 8, 12)
  }
}

function drawPtero(ctx: CanvasRenderingContext2D, x: number, cy: number, ts: number) {
  const frame = Math.floor(ts / 190) % 2
  const purple = '#7c3aed'

  // Body
  ctx.fillStyle = purple
  ctx.beginPath(); ctx.ellipse(x + 23, cy, 10, 6, 0, 0, Math.PI * 2); ctx.fill()

  // Head
  ctx.fillRect(x + 30, cy - 5, 10, 8)

  // Beak
  ctx.fillStyle = '#fbbf24'
  ctx.beginPath()
  ctx.moveTo(x + 40, cy - 2); ctx.lineTo(x + 46, cy + 1); ctx.lineTo(x + 40, cy + 4)
  ctx.closePath(); ctx.fill()

  // Wings
  ctx.fillStyle = purple
  if (frame === 0) {
    ctx.beginPath(); ctx.moveTo(x + 18, cy); ctx.lineTo(x + 2,  cy - 20); ctx.lineTo(x + 15, cy - 5); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(x + 28, cy); ctx.lineTo(x + 44, cy - 20); ctx.lineTo(x + 31, cy - 5); ctx.closePath(); ctx.fill()
  } else {
    ctx.beginPath(); ctx.moveTo(x + 18, cy); ctx.lineTo(x + 3,  cy + 14); ctx.lineTo(x + 15, cy + 4); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(x + 28, cy); ctx.lineTo(x + 43, cy + 14); ctx.lineTo(x + 31, cy + 4); ctx.closePath(); ctx.fill()
  }

  // Eye
  ctx.fillStyle = '#fff';  ctx.beginPath(); ctx.arc(x + 33, cy - 1, 2.5, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#111';  ctx.beginPath(); ctx.arc(x + 33, cy - 1, 1.2, 0, Math.PI * 2); ctx.fill()
}

// ─── Input ────────────────────────────────────────────────────────────────
function onKey(e: KeyboardEvent) {
  if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); handleJump() }
}

onMounted(() => {
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
      :title="t('games.runnerGame.title')"
      :description="t('games.runnerGame.hint')"
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

    <h1 class="text-display-md mb-2 text-center">{{ t('games.runnerGame.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-6">
      {{ t('games.runnerGame.hint') }}
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
        @click="handleJump"
        @touchstart.prevent="handleJump"
      />
    </div>

    <!-- Controls hint -->
    <div class="flex justify-center gap-8 mt-4 text-xs text-[var(--color-text-tertiary)]">
      <span>⌨️ {{ t('games.runnerGame.controlsKey') }}</span>
      <span>👆 {{ t('games.runnerGame.controlsTap') }}</span>
      <span>🦘 {{ t('games.runnerGame.controlsDouble') }}</span>
    </div>
  </div>
</template>
