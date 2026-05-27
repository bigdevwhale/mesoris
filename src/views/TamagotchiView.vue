<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

// ─── Types ────────────────────────────────────────────────────────────────────
type DinoKind  = 'trex' | 'triceratops' | 'diplodocus'
type AnimState = 'walk' | 'eat' | 'play' | 'sleep' | 'dead'
type Stage     = 'baby' | 'juvenile' | 'teen' | 'adult'
type Phase     = 'select' | 'playing' | 'grown' | 'dead'

// ─── Canvas ───────────────────────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
const W      = 560
const H      = 320
const GROUND = 258

// ─── Reactive state ───────────────────────────────────────────────────────────
const phase     = ref<Phase>('select')
const dinoKind  = ref<DinoKind>('trex')
const hunger    = ref(80)
const happiness = ref(80)
const energy    = ref(80)
const health    = ref(100)
const age       = ref(0)
const ticks     = ref(0)
const message   = ref('')

// ─── Computed ─────────────────────────────────────────────────────────────────
const stageName = computed<Stage>(() => {
  if (age.value < 3)  return 'baby'
  if (age.value < 6)  return 'juvenile'
  if (age.value < 9)  return 'teen'
  return 'adult'
})

const stageScale = computed(() => {
  const map: Record<Stage, number> = { baby: 0.52, juvenile: 0.70, teen: 0.88, adult: 1.06 }
  return map[stageName.value]
})

const stageLabel = computed(() => t(`games.tamagotchiGame.stage${cap(stageName.value)}`))
const stageEmoji = computed(() => ({ baby: '🥚', juvenile: '🐣', teen: '🦎', adult: '🦕' }[stageName.value]))

const dayProgress = computed(() => {
  const pos = ticks.value % TICKS_PER_DAY
  return (pos / TICKS_PER_DAY) * 100
})

// ─── Mutable animation state (non-reactive, canvas-only) ─────────────────────
let animState: AnimState = 'walk'
let animTimer  = 0   // ms left for current timed anim

let dinoX      = W / 2
let dinoVx     = 1.5
let facingRight = true

let legFrame   = 0
let legTimer   = 0

let jumpY      = 0
let jumpVy     = 0
let eatDip     = 0   // 0–1 head dip for eating

interface Zzz  { x: number; y: number; alpha: number }
let zzzs: Zzz[]  = []
let zzzTimer   = 0

interface Star { x: number; y: number; vx: number; vy: number; alpha: number; hue: number }
let stars: Star[] = []
let starTimer  = 0

let growthFlash = 0  // countdown frames for stage-up flash
let lastStage: Stage = 'baby'

let bobOffset = 0

// ─── Timers ───────────────────────────────────────────────────────────────────
const SAVE_KEY       = 'dino-tamago-v3'
const TICK_MS        = 4000
const TICKS_PER_DAY  = 20   // 20 × 4 s = 80 s per day; adult at day 9 → ~12 min total

let tickTimer:    ReturnType<typeof setInterval> | null = null
let messageTimer: ReturnType<typeof setTimeout>  | null = null
let raf = 0
let lastTs = 0

// ─── Background decorations ───────────────────────────────────────────────────
interface Plant { x: number; h: number; kind: 0 | 1 | 2 }
const plants: Plant[] = [
  { x: 50,  h: 58, kind: 0 },
  { x: 140, h: 42, kind: 1 },
  { x: 265, h: 72, kind: 2 },
  { x: 385, h: 46, kind: 1 },
  { x: 488, h: 62, kind: 0 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

function flash(msg: string) {
  message.value = msg
  if (messageTimer) clearTimeout(messageTimer)
  messageTimer = setTimeout(() => { message.value = '' }, 2500)
}

function barColor(v: number) {
  return v > 60 ? 'bg-emerald-400' : v > 30 ? 'bg-amber-400' : 'bg-red-500'
}

function spawnStars() {
  for (let i = 0; i < 14; i++) {
    stars.push({
      x: dinoX + (Math.random() - 0.5) * 200,
      y: GROUND - 80 * stageScale.value - Math.random() * 70,
      vx: (Math.random() - 0.5) * 4,
      vy: -3 - Math.random() * 3,
      alpha: 1,
      hue: Math.random() * 360,
    })
  }
}

// ─── Persistence ──────────────────────────────────────────────────────────────
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    kind: dinoKind.value, hunger: hunger.value, happiness: happiness.value,
    energy: energy.value, health: health.value, age: age.value,
    ticks: ticks.value, phase: phase.value, savedAt: Date.now(),
  }))
}

function load(): boolean {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return false
    const s = JSON.parse(raw)
    dinoKind.value  = s.kind       ?? 'trex'
    hunger.value    = s.hunger     ?? 80
    happiness.value = s.happiness  ?? 80
    energy.value    = s.energy     ?? 80
    health.value    = s.health     ?? 100
    age.value       = s.age        ?? 0
    ticks.value     = s.ticks      ?? 0
    phase.value     = s.phase      ?? 'select'
    lastStage       = stageName.value
    if (s.phase === 'playing') {
      const missed = Math.min(Math.floor((Date.now() - (s.savedAt ?? Date.now())) / TICK_MS), 20)
      if (missed > 0) applyTicks(missed)
    }
    return s.phase !== 'select'
  } catch { return false }
}

// ─── Tick logic ───────────────────────────────────────────────────────────────
function applyTicks(n: number) {
  for (let i = 0; i < n; i++) {
    if (phase.value !== 'playing') break
    ticks.value++

    if (ticks.value % TICKS_PER_DAY === 0) {
      age.value++
      if (stageName.value === 'adult') {
        phase.value = 'grown'
        animState = 'play'
        spawnStars()
        stopTick(); save(); return
      }
      growthFlash = 80
    }

    hunger.value    = Math.max(0, hunger.value    - 2)
    happiness.value = Math.max(0, happiness.value - 1)
    if (animState !== 'sleep') energy.value = Math.max(0, energy.value - 1)

    if (hunger.value < 20 || happiness.value < 20)
      health.value = Math.max(0, health.value - 1)
    if (hunger.value > 60 && happiness.value > 60)
      health.value = Math.min(100, health.value + 0.4)

    if (health.value <= 0) {
      phase.value = 'dead'; animState = 'dead'
      stopTick(); save(); return
    }
  }
}

function startTick() {
  tickTimer = setInterval(() => { applyTicks(1); save() }, TICK_MS)
}
function stopTick() {
  if (tickTimer) { clearInterval(tickTimer); tickTimer = null }
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function startGame(kind: DinoKind) {
  dinoKind.value = kind
  hunger.value = 80; happiness.value = 80; energy.value = 80; health.value = 100
  age.value = 0; ticks.value = 0
  phase.value = 'playing'
  animState = 'walk'; animTimer = 0
  dinoX = W / 2; dinoVx = 1.5; facingRight = true
  lastStage = 'baby'; growthFlash = 0; stars = []; zzzs = []
  jumpY = 0; jumpVy = 0
  save(); startTick()
  lastTs = performance.now()
  if (raf) cancelAnimationFrame(raf)
  raf = requestAnimationFrame(loop)
}

function feed() {
  if (phase.value !== 'playing' || animState === 'sleep') return
  hunger.value    = Math.min(100, hunger.value + 28)
  happiness.value = Math.min(100, happiness.value + 5)
  energy.value    = Math.max(0,   energy.value - 3)
  setAnim('eat', 2400)
  flash(t('games.tamagotchiGame.msgFed')); save()
}

function doPlay() {
  if (phase.value !== 'playing' || animState === 'sleep') return
  if (energy.value < 10) { flash(t('games.tamagotchiGame.msgTired')); return }
  happiness.value = Math.min(100, happiness.value + 22)
  energy.value    = Math.max(0,   energy.value - 16)
  hunger.value    = Math.max(0,   hunger.value - 8)
  setAnim('play', 3000); jumpVy = -12
  flash(t('games.tamagotchiGame.msgPlaying')); save()
}

function doRest() {
  if (phase.value !== 'playing' || animState === 'sleep') return
  setAnim('sleep', 8000)
  zzzs = []; zzzTimer = 0
  flash(t('games.tamagotchiGame.msgResting'))
}

function doMedicine() {
  if (phase.value !== 'playing' || animState === 'sleep') return
  if (health.value >= 100) { flash(t('games.tamagotchiGame.msgHealthy')); return }
  health.value    = Math.min(100, health.value + 30)
  happiness.value = Math.max(0,   happiness.value - 5)
  flash(t('games.tamagotchiGame.msgMedicine')); save()
}

function newGame() {
  stopTick(); cancelAnimationFrame(raf); raf = 0
  localStorage.removeItem(SAVE_KEY)
  phase.value = 'select'
  age.value = 0; ticks.value = 0
  hunger.value = 80; happiness.value = 80; energy.value = 80; health.value = 100
  animState = 'walk'; stars = []; zzzs = []
}

function setAnim(state: AnimState, ms: number) {
  animState = state; animTimer = ms
  if (state === 'sleep') energy.value = Math.min(100, energy.value + 40)
}

// ─── Game loop ────────────────────────────────────────────────────────────────
function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(dt, ts)
  draw(ts)
  raf = requestAnimationFrame(loop)
}

function update(dt: number, ts: number) {
  // Anim timer
  if (animTimer > 0) {
    animTimer -= dt
    if (animTimer <= 0) {
      animTimer = 0
      if (phase.value === 'playing') animState = 'walk'
    }
  }

  // Growth flash countdown
  if (growthFlash > 0) growthFlash--

  // Stage change detection
  if (lastStage !== stageName.value) lastStage = stageName.value

  // Walking movement
  if (animState === 'walk') {
    const speed = 1.5 * (energy.value > 30 ? 1 : 0.5)
    dinoX += dinoVx * (dt / 16) * speed
    const margin = 30 + 60 * stageScale.value
    if (dinoX < margin)       { dinoX = margin;       dinoVx =  Math.abs(dinoVx); facingRight = true  }
    if (dinoX > W - margin)   { dinoX = W - margin;   dinoVx = -Math.abs(dinoVx); facingRight = false }
    legTimer += dt
    if (legTimer >= 160) { legFrame ^= 1; legTimer = 0 }
  } else if (animState === 'eat') {
    legTimer += dt
    if (legTimer >= 220) { legFrame ^= 1; legTimer = 0 }
  }

  // Body bob while walking
  bobOffset = animState === 'walk' ? Math.sin(ts * 0.005) * 2 : 0

  // Jump physics
  if (animState === 'play') {
    jumpVy += 0.9; jumpY += jumpVy
    if (jumpY >= 0) { jumpY = 0; jumpVy = -10 }
  } else if (phase.value === 'grown') {
    jumpVy += 0.5; jumpY += jumpVy
    if (jumpY >= 0) { jumpY = 0; jumpVy = -7 }
  } else {
    jumpY = 0; jumpVy = 0
  }

  // Eating head dip (oscillation)
  eatDip = animState === 'eat' ? Math.sin(ts * 0.004) * 0.5 + 0.5 : 0

  // Zzz bubbles
  if (animState === 'sleep') {
    zzzTimer += dt
    if (zzzTimer > 1000) {
      zzzTimer = 0
      const dir = facingRight ? 1 : -1
      zzzs.push({ x: dinoX + dir * 35 * stageScale.value, y: GROUND - 100 * stageScale.value, alpha: 1 })
    }
    for (const z of zzzs) { z.y -= 0.45 * (dt / 16); z.alpha -= 0.006 * (dt / 16); z.x += 0.35 }
    zzzs = zzzs.filter(z => z.alpha > 0.05)
  } else {
    zzzs = []
  }

  // Stars
  if (phase.value === 'grown') {
    starTimer += dt
    if (starTimer > 500 && stars.length < 20) { starTimer = 0; spawnStars() }
  }
  for (const s of stars) {
    s.x += s.vx * (dt / 16); s.y += s.vy * (dt / 16); s.vy += 0.07; s.alpha -= 0.012 * (dt / 16)
  }
  stars = stars.filter(s => s.alpha > 0.05)
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw(ts: number) {
  const cv = canvasRef.value
  if (!cv) return
  const ctx = cv.getContext('2d')!

  // Sky — gradually darker as dino ages (day→twilight)
  const skyShift = Math.min(age.value * 8, 40)
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND)
  sky.addColorStop(0, `hsl(${218 - skyShift}, 55%, ${32 - skyShift * 0.4}%)`)
  sky.addColorStop(1, `hsl(${205 - skyShift * 0.5}, 48%, ${44 - skyShift * 0.3}%)`)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GROUND)

  // Celestial body
  if (age.value < 6) {
    ctx.fillStyle = 'rgba(255,218,80,0.72)'
    ctx.beginPath(); ctx.arc(480, 42, 24, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = 'rgba(255,218,80,0.3)'; ctx.lineWidth = 2
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(480 + Math.cos(a) * 28, 42 + Math.sin(a) * 28)
      ctx.lineTo(480 + Math.cos(a) * 40, 42 + Math.sin(a) * 40)
      ctx.stroke()
    }
  } else {
    ctx.fillStyle = 'rgba(200,220,255,0.65)'
    ctx.beginPath(); ctx.arc(480, 42, 20, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = `hsl(${218 - skyShift}, 55%, ${32 - skyShift * 0.4}%)`
    ctx.beginPath(); ctx.arc(490, 38, 16, 0, Math.PI * 2); ctx.fill()
  }

  // Background plants
  for (const p of plants) drawPlant(ctx, p)

  // Ground
  ctx.fillStyle = '#2b1b08'
  ctx.fillRect(0, GROUND, W, H - GROUND)
  ctx.fillStyle = '#4a7a2e'
  ctx.fillRect(0, GROUND, W, 7)
  ctx.fillStyle = '#5e9838'
  ctx.fillRect(0, GROUND, W, 3)
  ctx.fillStyle = 'rgba(25,45,12,0.35)'
  const off = (ts * 0.008) % 55
  for (let gx = -off; gx < W; gx += 55) {
    ctx.fillRect(gx,      GROUND + 14, 3, 2)
    ctx.fillRect(gx + 28, GROUND + 26, 4, 2)
    ctx.fillRect(gx + 10, GROUND + 38, 3, 2)
  }

  // Growth flash
  if (growthFlash > 0) {
    ctx.fillStyle = `rgba(255,240,80,${(growthFlash / 80) * 0.4})`
    ctx.fillRect(0, 0, W, H)
  }

  // Food bowl during eating
  if (animState === 'eat') {
    const sc = stageScale.value
    const bx = facingRight ? dinoX + 26 * sc : dinoX - 56 * sc
    drawBowl(ctx, bx, GROUND, sc)
  }

  // Zzz
  ctx.font = `bold ${Math.round(15 * stageScale.value)}px sans-serif`
  for (const z of zzzs) {
    ctx.globalAlpha = Math.max(0, z.alpha)
    ctx.fillStyle = '#bfdbfe'
    ctx.fillText('z', z.x, z.y)
  }
  ctx.globalAlpha = 1

  // Stars / confetti
  for (const s of stars) {
    ctx.globalAlpha = Math.max(0, s.alpha)
    ctx.fillStyle = `hsl(${s.hue},90%,65%)`
    ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1

  // Dino
  const groundY = GROUND + bobOffset + jumpY
  drawDino(ctx, dinoX, groundY, dinoKind.value, stageScale.value, animState, legFrame, facingRight, eatDip)

  // Overlays
  if (phase.value === 'dead') {
    drawOverlay(ctx, '💀 ' + t('games.tamagotchiGame.deadTitle'), t('games.tamagotchiGame.deadMessage'), '#f87171')
  } else if (phase.value === 'grown') {
    const name = t(`games.tamagotchiGame.kind${cap(dinoKind.value)}`)
    drawOverlay(ctx, '🎉 ' + name + ' grew up!', t('games.tamagotchiGame.grownMessage'), '#fbbf24')
  }
}

function drawOverlay(ctx: CanvasRenderingContext2D, title: string, sub: string, color: string) {
  ctx.fillStyle = 'rgba(0,0,0,0.52)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = 'bold 24px system-ui,sans-serif'
  ctx.fillStyle = color
  ctx.fillText(title, W / 2, H / 2 - 14)
  ctx.font = '14px system-ui,sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.82)'
  ctx.fillText(sub, W / 2, H / 2 + 12)
  ctx.textAlign = 'left'
}

function drawPlant(ctx: CanvasRenderingContext2D, p: Plant) {
  if (p.kind === 0) {
    ctx.fillStyle = '#7a5520'
    ctx.fillRect(p.x - 4, GROUND - p.h, 8, p.h)
    ctx.fillStyle = '#1e6018'
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2
      ctx.save(); ctx.translate(p.x, GROUND - p.h); ctx.rotate(a)
      ctx.fillRect(-3, -p.h * 0.5, 6, p.h * 0.5)
      ctx.restore()
    }
  } else if (p.kind === 1) {
    ctx.fillStyle = '#1e6018'
    for (let i = 0; i < 3; i++) {
      const hw = p.h * 0.48 - i * 9
      ctx.beginPath()
      ctx.ellipse(p.x, GROUND - (i + 1) * (p.h / 3.5), hw, p.h * 0.22, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  } else {
    ctx.fillStyle = '#7a5520'
    ctx.fillRect(p.x - 3, GROUND - p.h, 6, p.h)
    ctx.fillStyle = '#1e6018'
    for (let i = 0; i < 3; i++) {
      const w = p.h * (0.5 - i * 0.12)
      const baseY = GROUND - p.h + i * (p.h * 0.3)
      ctx.beginPath()
      ctx.moveTo(p.x, baseY - 8)
      ctx.lineTo(p.x + w, baseY + p.h * 0.25)
      ctx.lineTo(p.x - w, baseY + p.h * 0.25)
      ctx.closePath(); ctx.fill()
    }
  }
}

function drawBowl(ctx: CanvasRenderingContext2D, x: number, y: number, sc: number) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc)
  ctx.fillStyle = '#92400e'
  ctx.beginPath(); ctx.ellipse(12, 0, 20, 9, 0, 0, Math.PI); ctx.fill()
  ctx.fillStyle = '#fbbf24'
  ctx.beginPath(); ctx.ellipse(12, -3, 13, 5, 0, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

// ─── Dino dispatcher ──────────────────────────────────────────────────────────
function drawDino(
  ctx: CanvasRenderingContext2D, x: number, y: number,
  kind: DinoKind, sc: number, state: AnimState,
  leg: number, right: boolean, eat: number,
) {
  ctx.save()
  ctx.translate(x, y)
  if (!right) ctx.scale(-1, 1)
  ctx.scale(sc, sc)
  if (kind === 'trex')        drawTrex(ctx, state, leg, eat)
  else if (kind === 'triceratops') drawTriceratops(ctx, state, leg, eat)
  else                        drawDiplodocus(ctx, state, leg, eat)
  ctx.restore()
}

// ─── T-Rex (anchor: feet at 0,0) ─────────────────────────────────────────────
function drawTrex(ctx: CanvasRenderingContext2D, state: AnimState, leg: number, eat: number) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const G  = dead ? '#608050' : '#5a9c48'
  const DK = dead ? '#3a5030' : '#387030'
  const LT = dead ? '#80a060' : '#78c860'

  // Tail
  ctx.fillStyle = G
  ctx.beginPath()
  ctx.moveTo(-10, -32); ctx.lineTo(-64, -26); ctx.lineTo(-72, -16)
  ctx.lineTo(-62, -10); ctx.lineTo(-10, -14)
  ctx.closePath(); ctx.fill()

  // Body
  ctx.fillStyle = G; ctx.fillRect(-14, -92, 58, 60)
  ctx.fillStyle = LT; ctx.fillRect(-8,  -90, 20, 12)

  // Neck
  ctx.fillStyle = G; ctx.fillRect(24, -118, 22, 32)

  // Head (dips toward bowl when eating)
  const hy = -144 + eat * 30
  ctx.fillStyle = G
  ctx.fillRect(18, hy, 54, 34)
  ctx.fillRect(52, hy + 12, 24, 24)   // jaw
  // Teeth
  ctx.fillStyle = '#fff'
  ctx.fillRect(56, hy + 22, 4, 7); ctx.fillRect(62, hy + 22, 4, 7); ctx.fillRect(68, hy + 22, 4, 6)
  // Nostril
  ctx.fillStyle = DK; ctx.fillRect(66, hy + 6, 4, 3)
  // Eye
  if (sleep) {
    ctx.fillStyle = DK; ctx.fillRect(36, hy + 10, 16, 5)
  } else if (dead) {
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(34, hy + 5); ctx.lineTo(46, hy + 17); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(46, hy + 5); ctx.lineTo(34, hy + 17); ctx.stroke()
  } else {
    ctx.fillStyle = '#fff'; ctx.fillRect(34, hy + 5, 16, 16)
    ctx.fillStyle = '#111'; ctx.fillRect(36, hy + 7, 11, 11)
    ctx.fillStyle = '#fff'; ctx.fillRect(37, hy + 8, 4, 4)
  }

  // Tiny arms
  ctx.fillStyle = G
  ctx.fillRect(24, -76, 18, 10); ctx.fillRect(38, -70, 16, 16)
  ctx.fillStyle = DK
  ctx.fillRect(39, -57, 3, 6); ctx.fillRect(43, -57, 3, 6); ctx.fillRect(47, -57, 3, 5)

  // Legs
  ctx.fillStyle = DK
  const l1 = leg === 0 ? 5 : 0
  const l2 = leg === 0 ? 0 : 5
  ctx.fillRect(-10, -35 - l1, 24, 35 + l1); ctx.fillRect(-14, -4, 30, 10)
  ctx.fillRect(18,  -31 - l2, 22, 31 + l2); ctx.fillRect(14,  -4, 30, 10)
}

// ─── Triceratops (anchor: feet at 0,0) ───────────────────────────────────────
function drawTriceratops(ctx: CanvasRenderingContext2D, state: AnimState, leg: number, eat: number) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const G  = dead ? '#9a8068' : '#b09070'
  const DK = dead ? '#5a4030' : '#6a4820'
  const LT = dead ? '#b09878' : '#d0b088'
  const FR = dead ? '#7a3828' : '#c04838'
  const HN = '#d4b030'

  // Body (quadruped, lower centre of mass)
  ctx.fillStyle = G;  ctx.fillRect(-65, -68, 100, 54)
  ctx.fillStyle = LT; ctx.fillRect(-58, -46, 86, 28)  // belly

  // Neck
  ctx.fillStyle = G; ctx.fillRect(20, -92, 24, 30)

  // Head
  const hy = -122 + eat * 30
  ctx.fillStyle = G; ctx.fillRect(14, hy, 60, 36)
  ctx.fillRect(58, hy + 12, 22, 22)   // snout

  // Beak
  ctx.fillStyle = HN
  ctx.beginPath(); ctx.moveTo(80, hy + 14); ctx.lineTo(94, hy + 20); ctx.lineTo(80, hy + 30)
  ctx.closePath(); ctx.fill()

  // Frill
  ctx.fillStyle = FR
  ctx.beginPath(); ctx.ellipse(12, hy + 10, 24, 30, -0.25, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,120,60,0.3)'
  ctx.beginPath(); ctx.arc(8,  hy + 2,  6, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(16, hy + 18, 5, 0, Math.PI * 2); ctx.fill()

  // 3 Horns
  ctx.fillStyle = HN
  ctx.beginPath(); ctx.moveTo(32, hy - 2); ctx.lineTo(38, hy - 30); ctx.lineTo(46, hy - 2); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(18, hy + 4); ctx.lineTo(13, hy - 18); ctx.lineTo(26, hy + 2); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(52, hy + 4); ctx.lineTo(58, hy - 14); ctx.lineTo(64, hy + 2); ctx.closePath(); ctx.fill()

  // Eye
  if (sleep) {
    ctx.fillStyle = DK; ctx.fillRect(46, hy + 8, 16, 6)
  } else if (dead) {
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(44, hy + 6); ctx.lineTo(56, hy + 18); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(56, hy + 6); ctx.lineTo(44, hy + 18); ctx.stroke()
  } else {
    ctx.fillStyle = '#fff'; ctx.fillRect(44, hy + 6, 18, 16)
    ctx.fillStyle = '#111'; ctx.fillRect(46, hy + 8, 12, 12)
    ctx.fillStyle = '#fff'; ctx.fillRect(47, hy + 9, 5, 5)
  }

  // Tail
  ctx.fillStyle = G
  ctx.beginPath()
  ctx.moveTo(-62, -54); ctx.lineTo(-98, -42); ctx.lineTo(-106, -30)
  ctx.lineTo(-92, -22); ctx.lineTo(-60, -32)
  ctx.closePath(); ctx.fill()

  // 4 Legs
  ctx.fillStyle = DK
  const fo = leg === 0 ? 5 : 0
  const bo = leg === 0 ? 0 : 5
  ctx.fillRect(-54, -22, 20, 22 + fo); ctx.fillRect(-56, -3, 24, 10)
  ctx.fillRect(-30, -20, 20, 20 + bo); ctx.fillRect(-32, -3, 24, 10)
  ctx.fillRect(10,  -22, 20, 22 + bo); ctx.fillRect(8,   -3, 24, 10)
  ctx.fillRect(32,  -20, 20, 20 + fo); ctx.fillRect(30,  -3, 24, 10)
}

// ─── Diplodocus (anchor: feet at 0,0) ────────────────────────────────────────
function drawDiplodocus(ctx: CanvasRenderingContext2D, state: AnimState, leg: number, eat: number) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const G  = dead ? '#688060' : '#7aaa68'
  const DK = dead ? '#425038' : '#507848'
  const LT = dead ? '#88a070' : '#98c882'

  // Whip tail
  ctx.fillStyle = G
  ctx.beginPath()
  ctx.moveTo(-54, -40); ctx.lineTo(-110, -28); ctx.lineTo(-145, -18)
  ctx.lineTo(-160, -10); ctx.lineTo(-157, -4); ctx.lineTo(-148, -4)
  ctx.lineTo(-132, -10); ctx.lineTo(-52, -20)
  ctx.closePath(); ctx.fill()

  // Body
  ctx.fillStyle = G; ctx.fillRect(-60, -66, 104, 50)
  // Dorsal spines
  ctx.fillStyle = DK
  for (let i = 0; i < 5; i++) ctx.fillRect(-48 + i * 20, -70, 10, 8)
  // Belly
  ctx.fillStyle = LT; ctx.fillRect(-52, -48, 88, 26)

  // 4 Legs
  ctx.fillStyle = DK
  const fo = leg === 0 ? 5 : 0
  const bo = leg === 0 ? 0 : 5
  ctx.fillRect(-46, -24, 20, 24 + fo); ctx.fillRect(-48, -3, 24, 10)
  ctx.fillRect(-22, -22, 20, 22 + bo); ctx.fillRect(-24, -3, 24, 10)
  ctx.fillRect(10,  -24, 20, 24 + bo); ctx.fillRect(8,   -3, 24, 10)
  ctx.fillRect(34,  -22, 20, 22 + fo); ctx.fillRect(32,  -3, 24, 10)

  // Long neck (slightly tilted forward)
  ctx.save()
  ctx.translate(30, -68)
  ctx.rotate(-0.22)
  ctx.fillStyle = G; ctx.fillRect(-8, -92, 17, 94)
  ctx.fillStyle = DK; ctx.fillRect(-2, -90, 4, 86)  // dorsal line

  // Head at top of neck (dips toward food)
  const hy = -92 + eat * 38
  ctx.fillStyle = G
  ctx.fillRect(-5, hy, 32, 14)
  ctx.fillRect(22, hy + 2, 15, 10)   // snout
  // Nostrils
  ctx.fillStyle = DK
  ctx.fillRect(24, hy + 3, 3, 3); ctx.fillRect(30, hy + 3, 3, 3)
  // Eye
  if (sleep) {
    ctx.fillStyle = DK; ctx.fillRect(-4, hy - 1, 12, 5)
  } else if (dead) {
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(-4, hy - 3); ctx.lineTo(6, hy + 7); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(6, hy - 3); ctx.lineTo(-4, hy + 7); ctx.stroke()
  } else {
    ctx.fillStyle = '#fff'; ctx.fillRect(-4, hy - 4, 14, 14)
    ctx.fillStyle = '#111'; ctx.fillRect(-2, hy - 2, 9, 9)
    ctx.fillStyle = '#fff'; ctx.fillRect(-2, hy - 2, 3, 3)
  }
  ctx.restore()
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  const hadSave = load()
  if (hadSave && phase.value !== 'select') {
    lastTs = performance.now()
    if (phase.value === 'playing') startTick()
    if (phase.value === 'grown') { animState = 'play'; spawnStars() }
    if (phase.value === 'dead')  animState = 'dead'
    raf = requestAnimationFrame(loop)
  }
})

onUnmounted(() => {
  stopTick()
  cancelAnimationFrame(raf)
  if (messageTimer) clearTimeout(messageTimer)
  if (phase.value === 'playing') save()
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <SeoHead
      title="Dino Tamagotchi — Raise Your Dinosaur Pet"
      description="Choose a dinosaur, keep it fed, happy and healthy, and watch it grow from baby to adult!"
    />

    <!-- Back link -->
    <div class="flex items-center justify-between mb-6">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
    </div>

    <h1 class="text-display-md mb-2 text-center">{{ t('games.tamagotchiGame.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-8">
      {{ t('games.tamagotchiGame.subtitle') }}
    </p>

    <!-- ══════ SELECT SCREEN ══════ -->
    <div v-if="phase === 'select'" class="space-y-6">
      <p class="text-center text-lg font-semibold">{{ t('games.tamagotchiGame.selectTitle') }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          v-for="opt in ([
            { kind: 'trex',        emoji: '🦖', color: 'from-emerald-500 to-green-700'   },
            { kind: 'triceratops', emoji: '🦏', color: 'from-amber-500  to-yellow-700'   },
            { kind: 'diplodocus',  emoji: '🦕', color: 'from-teal-500   to-cyan-700'     },
          ] as const)"
          :key="opt.kind"
          class="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--glass-border)]
                 bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]
                 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]
                 transition-all duration-200 cursor-pointer"
          @click="startGame(opt.kind)"
        >
          <div
            class="w-20 h-20 rounded-xl bg-gradient-to-br flex items-center justify-center text-5xl"
            :class="opt.color"
          >
            {{ opt.emoji }}
          </div>
          <span class="font-bold text-[var(--color-text-primary)]">
            {{ t(`games.tamagotchiGame.kind${opt.kind.charAt(0).toUpperCase() + opt.kind.slice(1)}`) }}
          </span>
          <span class="text-xs text-center text-[var(--color-text-secondary)]">
            {{ t(`games.tamagotchiGame.kind${opt.kind.charAt(0).toUpperCase() + opt.kind.slice(1)}Desc`) }}
          </span>
          <span class="mt-1 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r transition-opacity"
                :class="opt.color">
            {{ t('games.tamagotchiGame.select') }}
          </span>
        </button>
      </div>
    </div>

    <!-- ══════ GAME SCREEN ══════ -->
    <div v-else class="space-y-4">

      <!-- Stage + age bar -->
      <div class="flex items-center justify-between text-sm">
        <span class="font-semibold text-[var(--color-text-primary)]">
          {{ stageEmoji }} {{ stageLabel }}
        </span>
        <span class="text-[var(--color-text-secondary)]">
          {{ t('games.tamagotchiGame.age', { n: age }) }}
        </span>
      </div>

      <!-- Day progress bar -->
      <div class="h-1.5 rounded-full bg-[var(--color-bg-base)] overflow-hidden">
        <div
          class="h-full rounded-full bg-amber-400 transition-all duration-1000"
          :style="{ width: dayProgress + '%' }"
        />
      </div>

      <!-- Canvas -->
      <div class="rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)]">
        <canvas
          ref="canvasRef"
          :width="560"
          :height="320"
          class="block w-full select-none"
          style="image-rendering: pixelated; cursor: default"
        />
      </div>

      <!-- Flash message -->
      <Transition name="msg">
        <p
          v-if="message"
          class="text-center text-sm font-medium text-[var(--color-text-primary)]
                 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]
                 rounded-full px-4 py-1.5 w-fit mx-auto"
        >
          {{ message }}
        </p>
      </Transition>

      <!-- Stat bars -->
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-4 space-y-2.5">
        <div
          v-for="stat in [
            { key: 'hunger',    val: hunger,    icon: '🍖' },
            { key: 'happiness', val: happiness, icon: '😊' },
            { key: 'energy',    val: energy,    icon: '⚡' },
            { key: 'health',    val: health,    icon: '❤️' },
          ]"
          :key="stat.key"
          class="flex items-center gap-2"
        >
          <span class="text-base w-6 text-center">{{ stat.icon }}</span>
          <span class="text-xs text-[var(--color-text-secondary)] w-20">
            {{ t(`games.tamagotchiGame.${stat.key}`) }}
          </span>
          <div class="flex-1 h-2.5 rounded-full bg-[var(--color-bg-base)] overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="barColor(stat.val)"
              :style="{ width: stat.val + '%' }"
            />
          </div>
          <span class="text-xs text-[var(--color-text-tertiary)] w-7 text-right">{{ Math.round(stat.val) }}</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div v-if="phase === 'playing'" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          class="flex flex-col items-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300
                 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="phase !== 'playing'"
          @click="feed"
        >
          <span class="text-2xl">🍖</span>
          {{ t('games.tamagotchiGame.feed') }}
        </button>
        <button
          class="flex flex-col items-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                 bg-purple-500/15 hover:bg-purple-500/25 text-purple-300
                 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="phase !== 'playing'"
          @click="doPlay"
        >
          <span class="text-2xl">🎮</span>
          {{ t('games.tamagotchiGame.play') }}
        </button>
        <button
          class="flex flex-col items-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                 bg-blue-500/15 hover:bg-blue-500/25 text-blue-300
                 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="phase !== 'playing'"
          @click="doRest"
        >
          <span class="text-2xl">💤</span>
          {{ t('games.tamagotchiGame.rest') }}
        </button>
        <button
          class="flex flex-col items-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300
                 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="phase !== 'playing'"
          @click="doMedicine"
        >
          <span class="text-2xl">💊</span>
          {{ t('games.tamagotchiGame.medicine') }}
        </button>
      </div>

      <!-- New Game (dead / grown) -->
      <div v-else class="flex justify-center">
        <button
          class="px-8 py-3 rounded-xl font-bold text-white
                 bg-gradient-to-r from-amber-500 to-orange-500
                 hover:from-amber-400 hover:to-orange-400
                 transition-all duration-200 shadow-lg"
          @click="newGame"
        >
          {{ t('games.tamagotchiGame.newGame') }}
        </button>
      </div>

      <!-- Hint -->
      <p class="text-center text-xs text-[var(--color-text-tertiary)]">
        {{ t('games.tamagotchiGame.hint') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.msg-enter-active, .msg-leave-active { transition: opacity 0.35s, transform 0.35s; }
.msg-enter-from, .msg-leave-to       { opacity: 0; transform: translateY(-6px); }
</style>
