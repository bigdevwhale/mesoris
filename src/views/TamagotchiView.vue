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
const GROUND = 260

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
  if (age.value < 3) return 'baby'
  if (age.value < 6) return 'juvenile'
  if (age.value < 9) return 'teen'
  return 'adult'
})

const stageScale = computed(() => {
  const map: Record<Stage, number> = { baby: 0.52, juvenile: 0.70, teen: 0.88, adult: 1.06 }
  return map[stageName.value]
})

const stageLabel  = computed(() => t(`games.tamagotchiGame.stage${cap(stageName.value)}`))
const stageEmoji  = computed(() => ({ baby:'🥚', juvenile:'🐣', teen:'🦎', adult:'🦕' }[stageName.value]))
const dayProgress = computed(() => ((ticks.value % TICKS_PER_DAY) / TICKS_PER_DAY) * 100)

// ─── Animation state (non-reactive, canvas only) ─────────────────────────────
let animState: AnimState = 'walk'
let animTimer   = 0

let dinoX       = W / 2
let dinoVx      = 1.5
let facingRight = true

let jumpY  = 0
let jumpVy = 0

interface Zzz  { x: number; y: number; alpha: number; sz: number }
interface Star { x: number; y: number; vx: number; vy: number; alpha: number; hue: number; sz: number }
interface Cloud { x: number; y: number; sz: number; spd: number }

let zzzs: Zzz[]   = []
let zzzTimer      = 0
let stars: Star[] = []
let starTimer     = 0
let growthFlash   = 0
let lastStage: Stage = 'baby'

const clouds: Cloud[] = [
  { x: 70,  y: 48, sz: 54, spd: 0.014 },
  { x: 240, y: 34, sz: 40, spd: 0.010 },
  { x: 430, y: 62, sz: 47, spd: 0.017 },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const SAVE_KEY      = 'dino-tamago-v5'
const TICK_MS       = 4000
const TICKS_PER_DAY = 20

let tickTimer:    ReturnType<typeof setInterval> | null = null
let messageTimer: ReturnType<typeof setTimeout>  | null = null
let raf  = 0
let lastTs = 0

// ─── Helpers ─────────────────────────────────────────────────────────────────
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function flash(msg: string) {
  message.value = msg
  if (messageTimer) clearTimeout(messageTimer)
  messageTimer = setTimeout(() => { message.value = '' }, 2500)
}

function barColor(v: number) {
  return v > 60 ? 'bg-emerald-400' : v > 30 ? 'bg-amber-400' : 'bg-red-500'
}

function lerpColor(a: string, b: string, t: number): string {
  t = Math.max(0, Math.min(1, t))
  const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${bl.toString(16).padStart(2,'0')}`
}

function spawnStars() {
  const sc = stageScale.value
  for (let i = 0; i < 18; i++) {
    stars.push({
      x: dinoX + (Math.random() - 0.5) * 240,
      y: GROUND - 85 * sc - Math.random() * 80,
      vx: (Math.random() - 0.5) * 5,
      vy: -3 - Math.random() * 4,
      alpha: 1,
      hue: Math.random() * 360,
      sz: 3 + Math.random() * 4,
    })
  }
}

// ─── Persistence ─────────────────────────────────────────────────────────────
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
        phase.value = 'grown'; animState = 'play'
        spawnStars(); stopTick(); save(); return
      }
      growthFlash = 90
    }
    hunger.value    = Math.max(0, hunger.value    - 2)
    happiness.value = Math.max(0, happiness.value - 1)
    if (animState !== 'sleep') energy.value = Math.max(0, energy.value - 1)
    if (hunger.value < 20 || happiness.value < 20) health.value = Math.max(0, health.value - 1)
    if (hunger.value > 60 && happiness.value > 60)  health.value = Math.min(100, health.value + 0.4)
    if (health.value <= 0) { phase.value = 'dead'; animState = 'dead'; stopTick(); save(); return }
  }
}

function startTick() { tickTimer = setInterval(() => { applyTicks(1); save() }, TICK_MS) }
function stopTick()  { if (tickTimer) { clearInterval(tickTimer); tickTimer = null } }

// ─── Actions ─────────────────────────────────────────────────────────────────
function startGame(kind: DinoKind) {
  dinoKind.value  = kind
  hunger.value    = 80; happiness.value = 80; energy.value = 80; health.value = 100
  age.value       = 0; ticks.value = 0; phase.value = 'playing'
  animState       = 'walk'; animTimer = 0
  dinoX           = W / 2; dinoVx = 1.5; facingRight = true
  lastStage       = 'baby'; growthFlash = 0; stars = []; zzzs = []; jumpY = 0; jumpVy = 0
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
  setAnim('sleep', 8000); zzzs = []; zzzTimer = 0
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
  phase.value = 'select'; age.value = 0; ticks.value = 0
  hunger.value = 80; happiness.value = 80; energy.value = 80; health.value = 100
  animState = 'walk'; stars = []; zzzs = []
}

function setAnim(state: AnimState, ms: number) {
  animState = state; animTimer = ms
  if (state === 'sleep') energy.value = Math.min(100, energy.value + 40)
}

// ─── Game loop ────────────────────────────────────────────────────────────────
function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50); lastTs = ts
  update(dt, ts); draw(ts)
  raf = requestAnimationFrame(loop)
}

function update(dt: number, _ts: number) {
  if (animTimer > 0) {
    animTimer -= dt
    if (animTimer <= 0) { animTimer = 0; if (phase.value === 'playing') animState = 'walk' }
  }
  if (growthFlash > 0) growthFlash--
  if (lastStage !== stageName.value) lastStage = stageName.value

  if (animState === 'walk') {
    const speed = 1.5 * (energy.value > 30 ? 1 : 0.5)
    dinoX += dinoVx * (dt / 16) * speed
    const margin = 32 + 68 * stageScale.value
    if (dinoX < margin)     { dinoX = margin;     dinoVx =  Math.abs(dinoVx); facingRight = true  }
    if (dinoX > W - margin) { dinoX = W - margin; dinoVx = -Math.abs(dinoVx); facingRight = false }
  }

  if (animState === 'play') {
    jumpVy += 0.9; jumpY += jumpVy
    if (jumpY >= 0) { jumpY = 0; jumpVy = -10 }
  } else if (phase.value === 'grown') {
    jumpVy += 0.5; jumpY += jumpVy
    if (jumpY >= 0) { jumpY = 0; jumpVy = -7 }
  } else { jumpY = 0; jumpVy = 0 }

  if (animState === 'sleep') {
    zzzTimer += dt
    if (zzzTimer > 1000) {
      zzzTimer = 0
      const sc = stageScale.value
      const dir = facingRight ? 1 : -1
      zzzs.push({ x: dinoX + dir * 40 * sc, y: GROUND - 110 * sc, alpha: 1, sz: 12 + Math.random() * 6 })
    }
    for (const z of zzzs) { z.y -= 0.5 * (dt / 16); z.x += 0.35 * (dt / 16); z.alpha -= 0.007 * (dt / 16) }
    zzzs = zzzs.filter(z => z.alpha > 0.04)
  } else { zzzs = [] }

  if (phase.value === 'grown') {
    starTimer += dt
    if (starTimer > 550 && stars.length < 28) { starTimer = 0; spawnStars() }
  }
  for (const s of stars) { s.x += s.vx * (dt / 16); s.y += s.vy * (dt / 16); s.vy += 0.08; s.alpha -= 0.011 * (dt / 16) }
  stars = stars.filter(s => s.alpha > 0.04)

  for (const c of clouds) {
    c.x += c.spd * (dt / 16)
    if (c.x > W + c.sz * 2) c.x = -c.sz * 2
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  DRAW
// ══════════════════════════════════════════════════════════════════════════════
function draw(ts: number) {
  const cv = canvasRef.value; if (!cv) return
  const ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, W, H)

  drawBackground(ctx, ts)

  if (growthFlash > 0) {
    ctx.fillStyle = `rgba(255,228,60,${(growthFlash / 90) * 0.4})`
    ctx.fillRect(0, 0, W, H)
  }

  if (animState === 'eat') {
    const sc  = stageScale.value
    const dir = facingRight ? 1 : -1
    drawBowl(ctx, dinoX + dir * 58 * sc, GROUND, sc)
  }

  // Drop shadow
  const sc = stageScale.value
  ctx.save()
  ctx.translate(dinoX, GROUND + 2)
  ctx.scale(1, 0.22)
  const shGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 38 * sc)
  shGrad.addColorStop(0, 'rgba(0,0,0,0.32)')
  shGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = shGrad
  ctx.beginPath(); ctx.arc(0, 0, 38 * sc, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  drawDino(ctx, dinoX, GROUND + jumpY, dinoKind.value, sc, animState, ts, facingRight)

  // Zzz bubbles
  ctx.textBaseline = 'middle'
  for (const z of zzzs) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, z.alpha)
    ctx.font = `bold ${Math.round(z.sz)}px sans-serif`
    ctx.fillStyle = '#bfdbfe'
    ctx.strokeStyle = 'rgba(30,80,160,0.3)'; ctx.lineWidth = 2
    ctx.strokeText('Z', z.x, z.y)
    ctx.fillText('Z', z.x, z.y)
    ctx.restore()
  }
  ctx.textBaseline = 'alphabetic'

  // Confetti stars
  for (const s of stars) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, s.alpha)
    ctx.fillStyle = `hsl(${s.hue},90%,65%)`
    ctx.beginPath(); ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }

  if (phase.value === 'dead')
    drawOverlay(ctx, '💀 ' + t('games.tamagotchiGame.deadTitle'), t('games.tamagotchiGame.deadMessage'), '#f87171')
  else if (phase.value === 'grown') {
    const nm = t(`games.tamagotchiGame.kind${cap(dinoKind.value)}`)
    drawOverlay(ctx, '🎉 ' + nm + ' grew up!', t('games.tamagotchiGame.grownMessage'), '#fbbf24')
  }
}

// ─── Background ───────────────────────────────────────────────────────────────
function drawBackground(ctx: CanvasRenderingContext2D, _ts: number) {
  const af = Math.min(age.value / 9, 1)   // 0 = baby, 1 = adult

  // Sky gradient: morning blue → afternoon → golden hour
  const topA = '#3a7fbf', topB = '#7b3fa0', topC = '#c0522e'
  const botA = '#8ec8f0', botB = '#b08ad0', botC = '#f0a84a'
  const skyTop = af < 0.5 ? lerpColor(topA, topB, af * 2) : lerpColor(topB, topC, (af - 0.5) * 2)
  const skyBot = af < 0.5 ? lerpColor(botA, botB, af * 2) : lerpColor(botB, botC, (af - 0.5) * 2)

  const sky = ctx.createLinearGradient(0, 0, 0, GROUND)
  sky.addColorStop(0, skyTop)
  sky.addColorStop(1, skyBot)
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, GROUND)

  // Sun / moon (travels across sky)
  const cx = 60 + af * (W - 120), cy = 52
  if (af < 0.88) {
    const sg = ctx.createRadialGradient(cx, cy, 10, cx, cy, 52)
    sg.addColorStop(0, 'rgba(255,248,140,1)')
    sg.addColorStop(0.42, 'rgba(255,220,60,0.55)')
    sg.addColorStop(1, 'rgba(255,180,0,0)')
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#fffce0'; ctx.beginPath(); ctx.arc(cx, cy, 17, 0, Math.PI * 2); ctx.fill()
  } else {
    ctx.fillStyle = 'rgba(215,232,255,0.88)'
    ctx.beginPath(); ctx.arc(cx, cy, 19, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = skyTop
    ctx.beginPath(); ctx.arc(cx + 9, cy - 5, 14, 0, Math.PI * 2); ctx.fill()
  }

  // Far mountains
  ctx.fillStyle = `rgba(135,165,210,${0.28 + af * 0.18})`
  drawMtnRange(ctx, [70, 52, 80, 62, 55, 72, 68, 58, 48, 80, 60, 55, 70, 62, 60])

  // Near hills
  ctx.fillStyle = `rgba(42,82,52,${0.52 + af * 0.22})`
  drawMtnRange(ctx, [38, 46, 28, 54, 36, 42, 52, 30, 45, 48, 32, 58, 44, 36, 40])

  // Clouds
  for (const c of clouds) drawCloud(ctx, c.x, c.y, c.sz, af)

  // Ground (earth)
  const earthCol = lerpColor('#3d2208', '#261405', af * 0.5)
  ctx.fillStyle = earthCol; ctx.fillRect(0, GROUND, W, H - GROUND)

  // Grass strip
  const gg = ctx.createLinearGradient(0, GROUND - 12, 0, GROUND + 5)
  gg.addColorStop(0, lerpColor('#48b85e', '#2e7840', af * 0.6))
  gg.addColorStop(1, lerpColor('#2a7838', '#16502a', af * 0.6))
  ctx.fillStyle = gg; ctx.fillRect(0, GROUND - 8, W, 16)

  // Grass blades
  ctx.lineCap = 'round'
  for (let gx = 4; gx < W; gx += 13) {
    const h   = 9 + (gx * 6.8 % 8)
    const lean = (gx % 5 - 2) * 0.22
    ctx.strokeStyle = lerpColor('#5ad46e', '#30884a', af * 0.5)
    ctx.lineWidth   = 1.5
    ctx.beginPath()
    ctx.moveTo(gx, GROUND - 4)
    ctx.quadraticCurveTo(gx + lean * h, GROUND - 4 - h * 0.55, gx + lean * h * 1.6, GROUND - 4 - h)
    ctx.stroke()
  }
  ctx.lineCap = 'butt'

  // Foreground plants
  const px = [45, 135, 265, 385, 490]
  const ph = [55,  40,  72,  46,  58]
  const pk: (0|1|2)[] = [0, 1, 2, 1, 0]
  for (let i = 0; i < px.length; i++) drawPlant(ctx, px[i], ph[i], pk[i], af)
}

function drawMtnRange(ctx: CanvasRenderingContext2D, heights: number[]) {
  const n = heights.length
  const xs = Array.from({ length: n }, (_, i) => (i / (n - 1)) * W)
  ctx.beginPath()
  ctx.moveTo(0, GROUND)
  ctx.lineTo(xs[0], GROUND - heights[0])
  for (let i = 1; i < n; i++) {
    const mx = (xs[i-1] + xs[i]) / 2, my = (GROUND - heights[i-1] + GROUND - heights[i]) / 2
    ctx.quadraticCurveTo(xs[i-1], GROUND - heights[i-1], mx, my)
  }
  ctx.lineTo(W, GROUND - heights[n-1])
  ctx.lineTo(W, GROUND)
  ctx.closePath(); ctx.fill()
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, sz: number, af: number) {
  const a = Math.max(0.25, 0.82 - af * 0.55)
  ctx.fillStyle = `rgba(255,255,255,${a})`
  const blob = (cx: number, cy: number, r: number) => {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
  }
  blob(x,            y,            sz * 0.52)
  blob(x + sz*0.48,  y - sz*0.13,  sz * 0.46)
  blob(x + sz*0.96,  y,            sz * 0.48)
  blob(x + sz*0.24,  y + sz*0.18,  sz * 0.36)
  blob(x + sz*0.70,  y + sz*0.16,  sz * 0.33)
}

function drawPlant(ctx: CanvasRenderingContext2D, x: number, h: number, kind: 0|1|2, af: number) {
  const leaf = lerpColor('#1d8c32', '#155522', af * 0.4)
  const stem = '#8b5e3c'
  if (kind === 0) {
    ctx.fillStyle = stem; ctx.fillRect(x - 3, GROUND - h, 6, h)
    for (let i = 0; i < 6; i++) {
      ctx.save(); ctx.translate(x, GROUND - h); ctx.rotate((i / 6) * Math.PI * 2 - 0.5)
      ctx.fillStyle = leaf
      ctx.beginPath(); ctx.ellipse(0, -h * 0.33, 5, h * 0.36, 0, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
  } else if (kind === 1) {
    for (let i = 0; i < 4; i++) {
      ctx.save(); ctx.translate(x, GROUND - h * 0.28); ctx.rotate(-0.75 + i * 0.48)
      ctx.fillStyle = leaf
      ctx.beginPath(); ctx.ellipse(0, -h * 0.36, h * 0.13, h * 0.44, 0, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
  } else {
    ctx.fillStyle = stem; ctx.fillRect(x - 3, GROUND - h * 0.35, 6, h * 0.35)
    for (let i = 0; i < 3; i++) {
      const ly = GROUND - h * (0.28 + i * 0.28), lw = h * (0.34 - i * 0.07), lh = h * (0.44 - i * 0.1)
      ctx.fillStyle = leaf
      ctx.beginPath(); ctx.moveTo(x - lw, ly + lh * 0.5); ctx.lineTo(x, ly - lh * 0.5); ctx.lineTo(x + lw, ly + lh * 0.5)
      ctx.closePath(); ctx.fill()
    }
  }
}

function drawBowl(ctx: CanvasRenderingContext2D, x: number, y: number, sc: number) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc)
  ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.ellipse(0, -2, 19, 10, 0, 0, Math.PI); ctx.fill()
  ctx.fillStyle = '#c07840'; ctx.beginPath(); ctx.ellipse(0, -5, 15, 8, 0, 0, Math.PI); ctx.fill()
  ctx.fillStyle = '#b01818'; ctx.beginPath(); ctx.ellipse(0, -9, 10, 6, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#e02828'; ctx.beginPath(); ctx.ellipse(-2, -11, 5, 3.5, -0.3, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawOverlay(ctx: CanvasRenderingContext2D, title: string, sub: string, color: string) {
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = 'bold 24px system-ui,sans-serif'; ctx.fillStyle = color; ctx.fillText(title, W/2, H/2 - 12)
  ctx.font = '14px system-ui,sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(sub, W/2, H/2 + 14)
  ctx.textAlign = 'left'
}

// ─── Dino dispatcher ──────────────────────────────────────────────────────────
function drawDino(
  ctx: CanvasRenderingContext2D, x: number, y: number,
  kind: DinoKind, sc: number, state: AnimState, ts: number, right: boolean,
) {
  ctx.save()
  ctx.translate(x, y)
  if (!right) ctx.scale(-1, 1)
  ctx.scale(sc, sc)
  if (kind === 'trex')            drawTrex(ctx, ts, state)
  else if (kind === 'triceratops') drawTriceratops(ctx, ts, state)
  else                             drawDiplodocus(ctx, ts, state)
  ctx.restore()
}

// ─── Eye helper ───────────────────────────────────────────────────────────────
function drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, sleep: boolean, dead: boolean, irisColor = '#c07818') {
  ctx.save()
  if (dead) {
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(x-7, y-7); ctx.lineTo(x+7, y+7)
    ctx.moveTo(x+7, y-7); ctx.lineTo(x-7, y+7); ctx.stroke()
  } else if (sleep) {
    ctx.strokeStyle = '#1a3020'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.arc(x, y, 6, Math.PI*0.08, Math.PI*0.92); ctx.stroke()
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(x - 4, y + 3); ctx.lineTo(x - 3, y + 7)
    ctx.moveTo(x,     y + 5); ctx.lineTo(x + 1, y + 9)
    ctx.moveTo(x + 4, y + 3); ctx.lineTo(x + 5, y + 7)
    ctx.stroke()
  } else {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(x, y, 8, 8, 0, 0, Math.PI*2); ctx.fill()
    ctx.fillStyle = irisColor; ctx.beginPath(); ctx.ellipse(x+1, y, 5, 6, 0, 0, Math.PI*2); ctx.fill()
    ctx.fillStyle = '#080808'; ctx.beginPath(); ctx.ellipse(x+1, y, 3, 5, 0, 0, Math.PI*2); ctx.fill()
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(x-1, y-3, 2.5, 2.5, 0, 0, Math.PI*2); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(x+4, y+2, 1.5, 1.5, 0, 0, Math.PI*2); ctx.fill()
  }
  ctx.restore()
}

// ──────────────────────────────────────────────────────────────────────────────
//  T-REX  (anchor: feet at 0,0, faces right)
// ──────────────────────────────────────────────────────────────────────────────
function drawTrex(ctx: CanvasRenderingContext2D, ts: number, state: AnimState) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const eat   = state === 'eat'
  const move  = state === 'walk' || state === 'play'

  const G1 = dead ? '#3a5a40' : '#1a6836'
  const G2 = dead ? '#527060' : '#28904e'
  const G3 = dead ? '#8aaa90' : '#52d870'
  const tk = ts * 0.001
  const bob  = move ? Math.sin(tk * 8) * 2.5 : 0
  const lp   = move ? Math.sin(tk * 5.5) : 0
  const fa   = lp * 0.40, ba = -lp * 0.40
  const tail = move ? Math.sin(tk * 5.5 + Math.PI) * 11 : 0

  // TAIL
  ctx.save(); ctx.translate(-22, -50 + bob)
  ctx.fillStyle = G2
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-38, tail*0.3 - 6, -82, tail*0.75, -112, tail*0.5)
  ctx.lineTo(-108, tail*0.5 + 13)
  ctx.bezierCurveTo(-72, tail*0.55 + 15, -30, 16, 0, 14)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = G3   // belly underside of tail
  ctx.beginPath()
  ctx.moveTo(0, 7)
  ctx.bezierCurveTo(-30, tail*0.3 + 5, -68, tail*0.6 + 7, -102, tail*0.5 + 10)
  ctx.lineTo(-102, tail*0.5 + 13)
  ctx.bezierCurveTo(-64, tail*0.5 + 13, -24, 14, 0, 12)
  ctx.closePath(); ctx.fill()
  ctx.restore()

  // BACK LEG
  drawTrexLeg(ctx, -12, -44 + bob, ba, G2, G1, sleep || dead)

  // BODY
  ctx.save(); ctx.translate(0, -66 + bob)
  ctx.fillStyle = G1
  ctx.beginPath(); ctx.ellipse(3, 5, 37, 29, 0.18, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = G2
  ctx.beginPath(); ctx.ellipse(0, 0, 35, 27, 0.18, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = G3  // belly
  ctx.beginPath(); ctx.ellipse(12, 5, 20, 16, 0.18, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.13)'
  ctx.beginPath(); ctx.ellipse(-8, -12, 16, 9, 0.1, 0, Math.PI*2); ctx.fill()
  ctx.restore()

  // TINY ARMS
  const ay = -80 + bob
  ctx.fillStyle = G2; ctx.beginPath(); ctx.ellipse(28, ay, 10, 6, 0.5, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = G1; ctx.beginPath(); ctx.ellipse(37, ay+5, 7, 5, 0.4, 0, Math.PI*2); ctx.fill()
  ctx.strokeStyle = G1; ctx.lineWidth = 1.5; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(42, ay+2); ctx.lineTo(47, ay-2)
  ctx.moveTo(42, ay+6); ctx.lineTo(47, ay+5); ctx.stroke()
  ctx.lineCap = 'butt'

  // FRONT LEG
  drawTrexLeg(ctx, 8, -44 + bob, fa, G2, G1, sleep || dead)

  // NECK + HEAD
  const eatTilt = eat ? Math.sin(ts * 0.004) * 0.48 : 0
  ctx.save(); ctx.translate(22, -82 + bob); ctx.rotate(-0.08 + eatTilt)
  ctx.fillStyle = G2
  ctx.beginPath()
  ctx.moveTo(-10, 0); ctx.bezierCurveTo(-12, -16, -5, -30, -2, -38)
  ctx.lineTo(12, -38); ctx.bezierCurveTo(14, -28, 10, -12, 10, 0)
  ctx.closePath(); ctx.fill()

  ctx.translate(4, -40)
  // Head
  ctx.fillStyle = G2; ctx.beginPath(); ctx.ellipse(16, -6, 34, 21, -0.08, 0, Math.PI*2); ctx.fill()
  // Snout
  ctx.beginPath(); ctx.moveTo(28,-4); ctx.lineTo(62,-8); ctx.bezierCurveTo(66,-7,66,-1,62,5); ctx.lineTo(28,6); ctx.closePath(); ctx.fill()
  // Lower jaw
  const jaw = eat ? Math.sin(ts * 0.004) * 0.5 + 0.55 : 0.1
  ctx.save(); ctx.translate(42, 8); ctx.rotate(jaw * 0.5)
  ctx.fillStyle = G1
  ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(22,0); ctx.bezierCurveTo(26,0,26,9,22,11); ctx.lineTo(-14,9); ctx.closePath(); ctx.fill()
  if (jaw > 0.18) {
    ctx.fillStyle = '#b53040'
    ctx.beginPath(); ctx.moveTo(-10,0); ctx.bezierCurveTo(-4,-7,14,-7,19,0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#d84058'
    ctx.beginPath(); ctx.ellipse(4, -1, 7, 4, 0, 0, Math.PI); ctx.fill()
    ctx.fillStyle = '#fffee0'
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(-9+i*6.5,-1); ctx.lineTo(-7+i*6.5,-8); ctx.lineTo(-5+i*6.5,-1); ctx.fill()
    }
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(-5+i*7,1); ctx.lineTo(-3+i*7,7); ctx.lineTo(-1+i*7,1); ctx.fill()
    }
  }
  ctx.restore()
  // Nostril
  ctx.fillStyle = G1; ctx.beginPath(); ctx.ellipse(48, -12, 3.5, 2.5, -0.2, 0, Math.PI*2); ctx.fill()
  // Head shine
  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(5, -18, 14, 8, -0.1, 0, Math.PI*2); ctx.fill()
  drawEye(ctx, 5, -16, sleep, dead, '#c07818')
  ctx.restore()
}

function drawTrexLeg(ctx: CanvasRenderingContext2D, hx: number, hy: number, angle: number, col: string, dark: string, still: boolean) {
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(still ? 0 : angle)
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 14, 12, 18, 0, 0, Math.PI*2); ctx.fill()
  ctx.save(); ctx.translate(0, 30); ctx.rotate(still ? -0.22 : -angle*0.65 - 0.28)
  ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(0, 10, 8, 14, 0, 0, Math.PI*2); ctx.fill()
  ctx.save(); ctx.translate(4, 22); ctx.rotate(still ? 0.18 : angle*0.35 + 0.14)
  ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(7, 0, 17, 5, 0, 0, Math.PI*2); ctx.fill()
  ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(15,-2); ctx.lineTo(23,-6); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(17,1); ctx.lineTo(25,0); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(14,4); ctx.lineTo(21,8); ctx.stroke()
  ctx.lineCap = 'butt'
  ctx.restore(); ctx.restore(); ctx.restore()
}

// ──────────────────────────────────────────────────────────────────────────────
//  TRICERATOPS  (anchor: feet at 0,0, faces right)
// ──────────────────────────────────────────────────────────────────────────────
function drawTriceratops(ctx: CanvasRenderingContext2D, ts: number, state: AnimState) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const eat   = state === 'eat'
  const move  = state === 'walk' || state === 'play'

  const B1 = dead ? '#5a4832' : '#7a5230'
  const B2 = dead ? '#8a7050' : '#b07240'
  const B3 = dead ? '#c0a878' : '#d4b060'
  const FR = dead ? '#6a3020' : '#c04030'
  const HN = dead ? '#a08040' : '#d4b028'

  const tk = ts * 0.001
  const bob  = move ? Math.sin(tk * 7) * 2 : 0
  const lp   = move ? Math.sin(tk * 5) : 0
  const fa   = lp * 0.27, ba = -lp * 0.27
  const tail = move ? Math.sin(tk * 5 + Math.PI) * 7 : 0

  // SHORT TAIL
  ctx.save(); ctx.translate(-60, -35 + bob)
  ctx.fillStyle = B2
  ctx.beginPath()
  ctx.moveTo(0,0); ctx.bezierCurveTo(-22, tail*0.3-3, -46, tail*0.7, -60, tail*0.5)
  ctx.lineTo(-58, tail*0.5+10); ctx.bezierCurveTo(-36, tail*0.4+10, -14,12, 0,10)
  ctx.closePath(); ctx.fill()
  ctx.restore()

  // BACK PAIR OF LEGS
  drawQuadLeg(ctx, -42, -22 + bob, ba, B2, B1, sleep||dead)
  drawQuadLeg(ctx, -20, -22 + bob, ba * 0.75, B2, B1, sleep||dead)

  // BODY
  ctx.save(); ctx.translate(0, -40 + bob)
  ctx.fillStyle = B1; ctx.beginPath(); ctx.ellipse(-12, 5, 60, 32, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = B2; ctx.beginPath(); ctx.ellipse(-14, 0, 58, 30, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = B3; ctx.beginPath(); ctx.ellipse(-10, 6, 46, 20, 0, 0, Math.PI*2); ctx.fill()
  // Dorsal bumps
  ctx.fillStyle = B1
  for (let i = 0; i < 5; i++) {
    ctx.beginPath(); ctx.ellipse(-36+i*14, -28, 5, 4, 0, 0, Math.PI*2); ctx.fill()
  }
  ctx.fillStyle = 'rgba(255,255,255,0.10)'
  ctx.beginPath(); ctx.ellipse(-22, -18, 18, 10, -0.1, 0, Math.PI*2); ctx.fill()
  ctx.restore()

  // FRONT PAIR OF LEGS
  drawQuadLeg(ctx, 14, -22 + bob, fa * 0.75, B2, B1, sleep||dead)
  drawQuadLeg(ctx, 34, -22 + bob, fa, B2, B1, sleep||dead)

  // NECK
  const eatTilt = eat ? Math.sin(ts * 0.004) * 0.42 : 0
  ctx.save(); ctx.translate(30, -62 + bob); ctx.rotate(0.04 + eatTilt)
  ctx.fillStyle = B2
  ctx.beginPath()
  ctx.moveTo(-12,0); ctx.bezierCurveTo(-14,-16,-8,-28,-6,-34)
  ctx.lineTo(8,-34); ctx.bezierCurveTo(10,-26,12,-12,12,0)
  ctx.closePath(); ctx.fill()

  // HEAD
  ctx.translate(4, -36)

  // FRILL (behind head)
  ctx.save(); ctx.translate(-6, -4)
  ctx.fillStyle = FR
  ctx.beginPath(); ctx.ellipse(-18, -4, 30, 24, 0.15, 0, Math.PI*2); ctx.fill()
  // Frill pattern spots
  ctx.fillStyle = 'rgba(255,100,50,0.35)'
  const sp: [number,number,number][] = [[-28,-10,6],[-14,-20,5],[-22,6,4],[-8,4,5]]
  for (const [sx, sy, sr] of sp) { ctx.beginPath(); ctx.ellipse(sx,sy,sr,sr,0,0,Math.PI*2); ctx.fill() }
  ctx.restore()

  // Head shape
  ctx.fillStyle = B2; ctx.beginPath(); ctx.ellipse(14,-6,36,22,-0.06,0,Math.PI*2); ctx.fill()
  // Snout
  ctx.beginPath(); ctx.moveTo(30,-4); ctx.lineTo(58,-6); ctx.bezierCurveTo(64,-5,64,2,58,8); ctx.lineTo(30,8); ctx.closePath(); ctx.fill()
  // Beak
  const jawA = eat ? Math.sin(ts * 0.004) * 0.45 + 0.35 : 0.08
  ctx.fillStyle = HN
  ctx.save(); ctx.translate(54, 4); ctx.rotate(jawA * 0.4)
  ctx.beginPath(); ctx.moveTo(0,-5); ctx.lineTo(14,0); ctx.lineTo(0,10); ctx.closePath(); ctx.fill()
  if (jawA > 0.15) {
    ctx.fillStyle = '#b53040'; ctx.beginPath(); ctx.ellipse(5, 3, 5, 3, 0, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()

  // 3 HORNS
  ctx.fillStyle = HN
  // Nose horn
  ctx.beginPath(); ctx.moveTo(40,-2); ctx.lineTo(44,-22); ctx.lineTo(52,-2); ctx.closePath(); ctx.fill()
  // Left brow horn
  ctx.beginPath(); ctx.moveTo(14,-10); ctx.lineTo(10,-28); ctx.lineTo(22,-8); ctx.closePath(); ctx.fill()
  // Right brow horn
  ctx.beginPath(); ctx.moveTo(26,-12); ctx.lineTo(24,-30); ctx.lineTo(34,-10); ctx.closePath(); ctx.fill()

  // Eye
  drawEye(ctx, 12, -16, sleep, dead, '#6040a0')

  // Head shine
  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(8,-18,14,8,-0.08,0,Math.PI*2); ctx.fill()

  ctx.restore() // end neck+head
}

function drawQuadLeg(ctx: CanvasRenderingContext2D, hx: number, hy: number, angle: number, col: string, dark: string, still: boolean) {
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(still ? 0 : angle)
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 10, 9, 13, 0, 0, Math.PI*2); ctx.fill()
  ctx.save(); ctx.translate(0, 22); ctx.rotate(still ? 0.15 : -angle*0.5 + 0.1)
  ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(0, 7, 6, 10, 0, 0, Math.PI*2); ctx.fill()
  ctx.save(); ctx.translate(2, 16); ctx.rotate(still ? -0.1 : angle*0.3 - 0.05)
  ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(5, 0, 13, 4, 0, 0, Math.PI*2); ctx.fill()
  ctx.restore(); ctx.restore(); ctx.restore()
}

// ──────────────────────────────────────────────────────────────────────────────
//  DIPLODOCUS  (anchor: feet at 0,0, faces right)
// ──────────────────────────────────────────────────────────────────────────────
function drawDiplodocus(ctx: CanvasRenderingContext2D, ts: number, state: AnimState) {
  const dead  = state === 'dead'
  const sleep = state === 'sleep'
  const eat   = state === 'eat'
  const move  = state === 'walk' || state === 'play'

  const D1 = dead ? '#3a5848' : '#1a6850'
  const D2 = dead ? '#527868' : '#28a870'
  const D3 = dead ? '#8ab8a0' : '#60d898'

  const tk = ts * 0.001
  const bob  = move ? Math.sin(tk * 6) * 2 : 0
  const lp   = move ? Math.sin(tk * 4.5) : 0
  const fa   = lp * 0.24, ba = -lp * 0.24

  // WHIP TAIL
  const tswing = move ? Math.sin(tk * 4.5 + Math.PI) * 14 : 0
  ctx.save(); ctx.translate(-60, -38 + bob)
  ctx.fillStyle = D2
  ctx.beginPath()
  ctx.moveTo(0,0)
  ctx.bezierCurveTo(-38, tswing*0.3-4, -88, tswing*0.75, -130, tswing*0.55)
  ctx.bezierCurveTo(-148, tswing*0.6, -165, tswing*0.5, -172, tswing*0.4)
  ctx.lineTo(-170, tswing*0.4+8)
  ctx.bezierCurveTo(-150, tswing*0.5+10, -120, tswing*0.6+10, -88, tswing*0.75+12)
  ctx.bezierCurveTo(-50, tswing*0.4+12, -20, 14, 0, 12)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = D3  // belly stripe on tail
  ctx.beginPath()
  ctx.moveTo(0, 6)
  ctx.bezierCurveTo(-35, tswing*0.3+5, -78, tswing*0.7+6, -120, tswing*0.5+8)
  ctx.lineTo(-120, tswing*0.5+11)
  ctx.bezierCurveTo(-72, tswing*0.6+10, -30, 13, 0, 11)
  ctx.closePath(); ctx.fill()
  ctx.restore()

  // BACK LEG PAIR
  drawQuadLeg(ctx, -42, -22 + bob, ba, D2, D1, sleep||dead)
  drawQuadLeg(ctx, -18, -22 + bob, ba * 0.75, D2, D1, sleep||dead)

  // BODY
  ctx.save(); ctx.translate(0, -40 + bob)
  ctx.fillStyle = D1; ctx.beginPath(); ctx.ellipse(-12, 5, 62, 32, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = D2; ctx.beginPath(); ctx.ellipse(-14, 0, 60, 30, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = D3; ctx.beginPath(); ctx.ellipse(-8, 6, 48, 20, 0, 0, Math.PI*2); ctx.fill()
  // Dorsal spines
  ctx.fillStyle = D1
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.moveTo(-44+i*14, -28); ctx.lineTo(-40+i*14, -40); ctx.lineTo(-36+i*14, -28); ctx.closePath(); ctx.fill()
  }
  ctx.fillStyle = 'rgba(255,255,255,0.10)'; ctx.beginPath(); ctx.ellipse(-22, -18, 20, 10, -0.1, 0, Math.PI*2); ctx.fill()
  ctx.restore()

  // FRONT LEG PAIR
  drawQuadLeg(ctx, 16, -22 + bob, fa * 0.75, D2, D1, sleep||dead)
  drawQuadLeg(ctx, 38, -22 + bob, fa, D2, D1, sleep||dead)

  // LONG NECK
  const neckSway = move ? Math.sin(tk * 2.5) * 0.06 : 0
  const eatDip   = eat  ? Math.sin(ts * 0.003) * 0.7 : 0
  ctx.save(); ctx.translate(32, -62 + bob)
  ctx.rotate(-0.22 + neckSway + eatDip * 0.55)

  // Neck as bezier fill
  ctx.fillStyle = D2
  ctx.beginPath()
  ctx.moveTo(-8, 0); ctx.bezierCurveTo(-10, -48, -7, -82, -6, -100)
  ctx.lineTo(7, -100); ctx.bezierCurveTo(8, -82, 10, -48, 8, 0)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = D3
  ctx.beginPath()
  ctx.moveTo(-2, 0); ctx.bezierCurveTo(-4, -48, -2, -82, -1, -100)
  ctx.lineTo(2, -100); ctx.bezierCurveTo(3, -82, 5, -48, 3, 0)
  ctx.closePath(); ctx.fill()
  // Dorsal ridge on neck
  ctx.fillStyle = D1
  ctx.beginPath()
  ctx.moveTo(-3,-30); ctx.bezierCurveTo(-3,-55,-2,-80,-2,-98); ctx.lineTo(0,-98); ctx.bezierCurveTo(0,-80,0,-55,0,-30)
  ctx.closePath(); ctx.fill()

  // HEAD
  ctx.translate(0, -102)
  ctx.fillStyle = D2; ctx.beginPath(); ctx.ellipse(8, -5, 22, 10, 0.1, 0, Math.PI*2); ctx.fill()
  // Snout
  ctx.fillStyle = D2
  ctx.beginPath(); ctx.moveTo(18,-4); ctx.lineTo(36,-6); ctx.bezierCurveTo(40,-5,40,1,36,5); ctx.lineTo(18,5); ctx.closePath(); ctx.fill()
  // Lower jaw
  const dipJaw = eat ? Math.sin(ts * 0.003) * 0.5 + 0.35 : 0.08
  ctx.save(); ctx.translate(28, 4); ctx.rotate(dipJaw * 0.4)
  ctx.fillStyle = D1
  ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(12,0); ctx.bezierCurveTo(16,0,16,6,12,8); ctx.lineTo(-10,7); ctx.closePath(); ctx.fill()
  if (dipJaw > 0.15) {
    ctx.fillStyle = '#b03050'; ctx.beginPath(); ctx.ellipse(2,2,7,3,0,0,Math.PI*2); ctx.fill()
  }
  ctx.restore()
  // Nostrils
  ctx.fillStyle = D1
  ctx.beginPath(); ctx.ellipse(28, -8, 2.5, 2, 0, 0, Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.ellipse(34, -8, 2.5, 2, 0, 0, Math.PI*2); ctx.fill()
  // Head shine
  ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(5, -8, 12, 6, 0.1, 0, Math.PI*2); ctx.fill()
  drawEye(ctx, -2, -10, sleep, dead, '#2060c0')
  ctx.restore()
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  const hadSave = load()
  if (hadSave && phase.value !== 'select') {
    lastTs = performance.now()
    if (phase.value === 'playing')  startTick()
    if (phase.value === 'grown')   { animState = 'play'; spawnStars() }
    if (phase.value === 'dead')      animState = 'dead'
    raf = requestAnimationFrame(loop)
  }
})

onUnmounted(() => {
  stopTick(); cancelAnimationFrame(raf)
  if (messageTimer) clearTimeout(messageTimer)
  if (phase.value === 'playing') save()
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <SeoHead
      title="Dino Tamagotchi — Raise Your Dinosaur"
      description="Pick a dinosaur, keep it fed and happy, watch it grow from baby to adult!"
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

    <h1 class="text-display-md mb-2 text-center">{{ t('games.tamagotchiGame.title') }}</h1>
    <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-8">
      {{ t('games.tamagotchiGame.subtitle') }}
    </p>

    <!-- ══════ SELECT ══════ -->
    <div v-if="phase === 'select'" class="space-y-6">
      <p class="text-center text-lg font-semibold text-[var(--color-text-primary)]">
        {{ t('games.tamagotchiGame.selectTitle') }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          v-for="opt in ([
            { kind:'trex',        emoji:'🦖', gradient:'from-emerald-500 to-green-700',  ring:'ring-emerald-400' },
            { kind:'triceratops', emoji:'🦏', gradient:'from-amber-500  to-yellow-700',  ring:'ring-amber-400'   },
            { kind:'diplodocus',  emoji:'🦕', gradient:'from-teal-500   to-cyan-700',    ring:'ring-teal-400'    },
          ] as const)"
          :key="opt.kind"
          class="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--glass-border)]
                 bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]
                 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]
                 hover:ring-2 transition-all duration-200 cursor-pointer"
          :class="opt.ring"
          @click="startGame(opt.kind)"
        >
          <div class="w-20 h-20 rounded-xl bg-gradient-to-br flex items-center justify-center text-5xl shadow-lg"
               :class="opt.gradient">
            {{ opt.emoji }}
          </div>
          <span class="font-bold text-[var(--color-text-primary)]">
            {{ t(`games.tamagotchiGame.kind${opt.kind.charAt(0).toUpperCase()+opt.kind.slice(1)}`) }}
          </span>
          <span class="text-xs text-center text-[var(--color-text-secondary)] leading-relaxed">
            {{ t(`games.tamagotchiGame.kind${opt.kind.charAt(0).toUpperCase()+opt.kind.slice(1)}Desc`) }}
          </span>
          <span class="mt-1 px-5 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r shadow"
                :class="opt.gradient">
            {{ t('games.tamagotchiGame.select') }}
          </span>
        </button>
      </div>
    </div>

    <!-- ══════ GAME ══════ -->
    <div v-else class="space-y-4">

      <!-- Stage + age -->
      <div class="flex items-center justify-between text-sm">
        <span class="font-semibold text-[var(--color-text-primary)]">{{ stageEmoji }} {{ stageLabel }}</span>
        <span class="text-[var(--color-text-secondary)]">{{ t('games.tamagotchiGame.age', { n: age }) }}</span>
      </div>

      <!-- Day progress bar -->
      <div class="h-1.5 rounded-full bg-[var(--color-bg-base)] overflow-hidden">
        <div class="h-full rounded-full bg-amber-400 transition-all duration-1000"
             :style="{ width: dayProgress + '%' }" />
      </div>

      <!-- Canvas -->
      <div class="rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)]">
        <canvas ref="canvasRef" :width="560" :height="320"
                class="block w-full select-none"
                style="image-rendering: auto; cursor: default" />
      </div>

      <!-- Flash message -->
      <Transition name="msg">
        <p v-if="message"
           class="text-center text-sm font-medium text-[var(--color-text-primary)]
                  bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]
                  rounded-full px-4 py-1.5 w-fit mx-auto shadow">
          {{ message }}
        </p>
      </Transition>

      <!-- Stat bars -->
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-4 space-y-2.5">
        <div v-for="stat in [
               { key:'hunger',    val:hunger,    icon:'🍖' },
               { key:'happiness', val:happiness, icon:'😊' },
               { key:'energy',    val:energy,    icon:'⚡' },
               { key:'health',    val:health,    icon:'❤️' },
             ]"
             :key="stat.key"
             class="flex items-center gap-2">
          <span class="text-base w-6 text-center">{{ stat.icon }}</span>
          <span class="text-xs text-[var(--color-text-secondary)] w-20">
            {{ t(`games.tamagotchiGame.${stat.key}`) }}
          </span>
          <div class="flex-1 h-2.5 rounded-full bg-[var(--color-bg-base)] overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500"
                 :class="barColor(stat.val)"
                 :style="{ width: stat.val + '%' }" />
          </div>
          <span class="text-xs text-[var(--color-text-tertiary)] w-7 text-right">{{ Math.round(stat.val) }}</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div v-if="phase === 'playing'" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button v-for="btn in [
                  { action:feed,       icon:'🍖', key:'feed',     cls:'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300'   },
                  { action:doPlay,     icon:'🎮', key:'play',     cls:'bg-purple-500/15 hover:bg-purple-500/25 text-purple-300' },
                  { action:doRest,     icon:'💤', key:'rest',     cls:'bg-blue-500/15 hover:bg-blue-500/25 text-blue-300'       },
                  { action:doMedicine, icon:'💊', key:'medicine', cls:'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300'       },
                ]"
                :key="btn.key"
                class="flex flex-col items-center gap-1.5 py-3 rounded-xl font-semibold text-sm
                       transition-all duration-200 active:scale-95"
                :class="btn.cls"
                @click="btn.action()">
          <span class="text-2xl">{{ btn.icon }}</span>
          {{ t(`games.tamagotchiGame.${btn.key}`) }}
        </button>
      </div>

      <!-- New Game (dead / grown) -->
      <div v-else class="flex justify-center">
        <button
          class="px-8 py-3 rounded-xl font-bold text-white shadow-lg
                 bg-gradient-to-r from-amber-500 to-orange-500
                 hover:from-amber-400 hover:to-orange-400 transition-all duration-200 active:scale-95"
          @click="newGame">
          {{ t('games.tamagotchiGame.newGame') }}
        </button>
      </div>

      <p class="text-center text-xs text-[var(--color-text-tertiary)]">{{ t('games.tamagotchiGame.hint') }}</p>
    </div>
  </div>
</template>

<style scoped>
.msg-enter-active, .msg-leave-active { transition: opacity 0.3s, transform 0.3s; }
.msg-enter-from, .msg-leave-to       { opacity: 0; transform: translateY(-6px); }
</style>
