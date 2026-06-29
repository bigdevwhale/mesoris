<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import { useUiStore } from '@/stores/useUiStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()
const uiStore = useUiStore()

// ─── Canvas geometry (landscape lawn) ──
const COLS = 9
const ROWS = 5
const CELL = 92
const GRID_X = 36
const GRID_Y = 20
const W = GRID_X + COLS * CELL + 36 // 900
const H = GRID_Y + ROWS * CELL + 20 // 500
const LOSE_X = GRID_X - 22 // dinos reaching here win the round (player loses)

const canvasRef = ref<HTMLCanvasElement | null>(null)

type Phase = 'idle' | 'playing' | 'over'
const phase = ref<Phase>('idle')
const score = ref(0)
const wave = ref(1)
const sun = ref(175)
const best = ref(parseInt(localStorage.getItem('dino-defense-best') || '0'))
const bestWave = ref(parseInt(localStorage.getItem('dino-defense-wave') || '0'))

type PlantKind = 'sunfern' | 'shooter' | 'wall' | 'freeze' | 'bomb'
type DinoKind = 'compy' | 'raptor' | 'carno' | 'rex'

interface PlantDef {
  kind: PlantKind
  cost: number
  hp: number
  recharge: number
  emoji: string
  color: string
  fireRate?: number
  dmg?: number
  projSpeed?: number
  freeze?: boolean
  fuse?: number
  radius?: number
}
const PLANT_ORDER: PlantKind[] = ['sunfern', 'shooter', 'wall', 'freeze', 'bomb']
const PLANTS: Record<PlantKind, PlantDef> = {
  sunfern: { kind: 'sunfern', cost: 50, hp: 300, recharge: 7000, emoji: '🌻', color: '#facc15' },
  shooter: { kind: 'shooter', cost: 100, hp: 300, recharge: 7000, emoji: '🌱', color: '#22c55e', fireRate: 1400, dmg: 22, projSpeed: 380 },
  wall: { kind: 'wall', cost: 50, hp: 1400, recharge: 25000, emoji: '🪵', color: '#a16207' },
  freeze: { kind: 'freeze', cost: 175, hp: 300, recharge: 30000, emoji: '❄️', color: '#38bdf8', fireRate: 1600, dmg: 10, projSpeed: 380, freeze: true },
  bomb: { kind: 'bomb', cost: 150, hp: 1, recharge: 30000, emoji: '🌺', color: '#ef4444', fuse: 1100, radius: CELL * 1.7, dmg: 1800 },
}

interface DinoDef {
  kind: DinoKind
  hp: number
  speed: number
  dmg: number
  color: string
  belly: string
  scale: number
}
const DINOS: Record<DinoKind, DinoDef> = {
  compy: { kind: 'compy', hp: 95, speed: 34, dmg: 12, color: '#65a30d', belly: '#a3e635', scale: 0.55 },
  raptor: { kind: 'raptor', hp: 270, speed: 26, dmg: 22, color: '#b45309', belly: '#fbbf24', scale: 0.82 },
  carno: { kind: 'carno', hp: 640, speed: 16, dmg: 36, color: '#b91c1c', belly: '#fca5a5', scale: 1.05 },
  rex: { kind: 'rex', hp: 1400, speed: 13, dmg: 55, color: '#334155', belly: '#94a3b8', scale: 1.35 },
}

// ─── Entities ──
interface Plant {
  id: number
  kind: PlantKind
  row: number
  col: number
  x: number
  y: number
  hp: number
  maxHp: number
  fireCd: number
  sunCd: number
  fuse: number
  pulse: number
}
interface Dino {
  id: number
  kind: DinoKind
  row: number
  x: number
  hp: number
  maxHp: number
  speed: number
  dmg: number
  slowUntil: number
  eating: boolean
  chew: number
  wobble: number
}
interface Proj {
  id: number
  row: number
  x: number
  y: number
  dmg: number
  freeze: boolean
}
interface SunToken {
  id: number
  x: number
  y: number
  targetY: number
  vy: number
  value: number
  life: number
  pop: number
}
interface Boom {
  x: number
  y: number
  r: number
  maxR: number
  a: number
}

let plants: Plant[] = []
let dinos: Dino[] = []
let projs: Proj[] = []
let suns: SunToken[] = []
let booms: Boom[] = []
let grid: (Plant | null)[][] = []
let raf = 0
let lastTs = 0
let timeAlive = 0
let spawnTimer = 21000
let skyTimer = 5500
let waveTimer = 25000
let nextId = 1
let shake = 0
let reducedMotion = false
let waveBanner = 0 // ms remaining on "Wave N" banner

const rechargeStart: Record<PlantKind, number> = {
  sunfern: -999999,
  shooter: -999999,
  wall: -999999,
  freeze: -999999,
  bomb: -999999,
}

const selected = ref<PlantKind | 'shovel' | null>(null)
// reactive clock so seed-bank cooldown overlays tick smoothly every frame
const nowTick = ref(performance.now())

function cx(col: number) {
  return GRID_X + col * CELL + CELL / 2
}
function cy(row: number) {
  return GRID_Y + row * CELL + CELL / 2
}

// ─── Flow ──
function resetState() {
  plants = []
  dinos = []
  projs = []
  suns = []
  booms = []
  grid = Array.from({ length: ROWS }, () => Array<Plant | null>(COLS).fill(null))
  timeAlive = 0
  spawnTimer = 21000
  skyTimer = 5500
  waveTimer = 25000
  wave.value = 1
  score.value = 0
  sun.value = 175
  shake = 0
  waveBanner = 0
  selected.value = null
  for (const k of PLANT_ORDER) rechargeStart[k] = -999999
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
    localStorage.setItem('dino-defense-best', String(score.value))
  }
  if (wave.value > bestWave.value) {
    bestWave.value = wave.value
    localStorage.setItem('dino-defense-wave', String(wave.value))
  }
  gameStore.recordGameCompletion('dino-defense', score.value)
  draw()
}

function press() {
  if (phase.value !== 'playing') startGame()
}

function selectCard(kind: PlantKind | 'shovel') {
  selected.value = selected.value === kind ? null : kind
}

// ─── Spawning ──
function pickDinoKind(w: number): DinoKind {
  const r = Math.random()
  if (w >= 5 && r < 0.1 + Math.min(0.08, (w - 5) * 0.01)) return 'rex'
  if (w >= 3 && r < 0.4) return 'carno'
  if (w >= 2 && r < 0.72) return 'raptor'
  return 'compy'
}

function spawnDino() {
  const row = (Math.random() * ROWS) | 0
  const kind = pickDinoKind(wave.value)
  const def = DINOS[kind]
  dinos.push({
    id: nextId++,
    kind,
    row,
    x: W + 30 + Math.random() * 30,
    hp: def.hp,
    maxHp: def.hp,
    speed: def.speed,
    dmg: def.dmg,
    slowUntil: 0,
    eating: false,
    chew: 0,
    wobble: Math.random() * Math.PI * 2,
  })
}

function spawnSkySun() {
  const x = GRID_X + 30 + Math.random() * (COLS * CELL - 60)
  const targetY = GRID_Y + 40 + Math.random() * (ROWS * CELL - 80)
  suns.push({
    id: nextId++,
    x,
    y: -10,
    targetY,
    vy: 60,
    value: 25,
    life: 11000,
    pop: 0,
  })
}

function spawnPlantSun(p: Plant) {
  // pop up and to the side of the flower head so it doesn't overlap it
  const offsetX = (Math.random() - 0.5) * 36
  suns.push({
    id: nextId++,
    x: p.x + offsetX,
    y: p.y - 4,
    targetY: p.y - 46,
    vy: -170,
    value: 25,
    life: 11000,
    pop: 1,
  })
}

// ─── Placement ──
function tryPlace(col: number, row: number) {
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return
  if (selected.value === 'shovel') {
    const existing = grid[row][col]
    if (existing) {
      grid[row][col] = null
      plants = plants.filter(p => p.id !== existing.id)
    }
    selected.value = null
    return
  }
  const kind = selected.value
  if (!kind) return
  const def = PLANTS[kind]
  const now = performance.now()
  if (sun.value < def.cost) return
  if (now - rechargeStart[kind] < def.recharge) return
  if (grid[row][col]) return
  const p: Plant = {
    id: nextId++,
    kind,
    row,
    col,
    x: cx(col),
    y: cy(row),
    hp: def.hp,
    maxHp: def.hp,
    fireCd: (def.fireRate ?? 0) * Math.random(),
    sunCd: 3500 + Math.random() * 1500,
    fuse: def.fuse ?? 0,
    pulse: 0,
  }
  grid[row][col] = p
  plants.push(p)
  sun.value -= def.cost
  rechargeStart[kind] = now
}

// ─── Update ──
function update(dt: number) {
  const dts = dt / 1000
  timeAlive += dt

  // waves
  waveTimer -= dt
  if (waveTimer <= 0) {
    wave.value++
    waveTimer = 25000
    waveBanner = 2200
  }
  if (waveBanner > 0) waveBanner -= dt

  // spawns
  spawnTimer -= dt
  if (spawnTimer <= 0) {
    spawnDino()
    const base = Math.max(1900, 5600 - wave.value * 430)
    spawnTimer = base + Math.random() * 1400
    // small burst later in the game
    if (wave.value >= 4 && Math.random() < 0.25) spawnDino()
  }
  skyTimer -= dt
  if (skyTimer <= 0) {
    spawnSkySun()
    skyTimer = 9500 + Math.random() * 4000
  }

  const now = timeAlive

  // plants
  for (const p of plants) {
    const def = PLANTS[p.kind]
    p.pulse += dts * 3
    if (p.kind === 'sunfern') {
      p.sunCd -= dt
      if (p.sunCd <= 0) {
        spawnPlantSun(p)
        p.sunCd = 6500 + Math.random() * 1500
      }
    } else if (p.kind === 'shooter' || p.kind === 'freeze') {
      // only fire if there's a dino ahead in this lane
      const hasTarget = dinos.some(d => d.row === p.row && d.x > p.x && d.x < W + 60)
      if (hasTarget) {
        p.fireCd -= dt
        if (p.fireCd <= 0) {
          projs.push({
            id: nextId++,
            row: p.row,
            x: p.x + 18,
            y: p.y - 6,
            dmg: def.dmg ?? 0,
            freeze: !!def.freeze,
          })
          p.fireCd = def.fireRate ?? 1400
        }
      } else {
        p.fireCd = Math.min(p.fireCd, 400)
      }
    } else if (p.kind === 'bomb') {
      p.fuse -= dt
      if (p.fuse <= 0) {
        const radius = def.radius ?? CELL * 1.6
        for (const d of dinos) {
          if (Math.hypot(d.x - p.x, cy(d.row) - p.y) <= radius) {
            d.hp -= def.dmg ?? 0
          }
        }
        booms.push({ x: p.x, y: p.y, r: 10, maxR: radius, a: 1 })
        grid[p.row][p.col] = null
        p.hp = 0
        shake = 12
      }
    }
  }
  // remove dead plants AND free their grid cells (otherwise eaten plants
  // leave an invisible blocker that prevents replanting on that cell)
  for (const p of plants) {
    if (p.hp <= 0 && grid[p.row]?.[p.col] === p) grid[p.row][p.col] = null
  }
  plants = plants.filter(p => p.hp > 0)

  // projectiles
  for (const pr of projs) {
    pr.x += (PLANTS.shooter.projSpeed ?? 380) * dts
    for (const d of dinos) {
      if (d.row !== pr.row) continue
      const drx = 16 + DINOS[d.kind].scale * 18
      if (pr.x >= d.x - drx && pr.x <= d.x + drx) {
        d.hp -= pr.dmg
        if (pr.freeze) d.slowUntil = now + 3200
        pr.x = W + 999 // mark for removal
        break
      }
    }
  }
  projs = projs.filter(pr => pr.x < W + 50)

  // dinos
  for (const d of dinos) {
    const def = DINOS[d.kind]
    const drx = 16 + def.scale * 18
    // find plant ahead (smaller x) in same row, closest one
    let target: Plant | null = null
    for (const p of plants) {
      if (p.row !== d.row) continue
      if (p.x < d.x) {
        if (!target || p.x > target.x) target = p
      }
    }
    const reach = drx + 26
    if (target && d.x - target.x <= reach) {
      d.eating = true
      d.chew += dts * 8
      target.hp -= d.dmg * dts
    } else {
      d.eating = false
      const slow = now < d.slowUntil ? 0.4 : 1
      d.x -= d.speed * slow * dts
      d.wobble += dts * 9
    }
    // breach
    if (d.x < LOSE_X) {
      shake = 18
      endGame()
      return
    }
  }
  // remove dead dinos
  for (let i = dinos.length - 1; i >= 0; i--) {
    if (dinos[i].hp <= 0) {
      dinos.splice(i, 1)
      score.value++
    }
  }

  // suns
  for (const s of suns) {
    if (s.pop > 0) {
      // popped from a plant: rise and settle above the flower head
      s.y += s.vy * dts
      s.vy += 240 * dts
      if (s.y <= s.targetY || s.vy >= 0) {
        s.y = s.targetY
        s.vy = 0
        s.pop = 0
      }
    } else if (s.y < s.targetY) {
      // sky sun falling down to its rest point
      s.y += s.vy * dts
      if (s.y >= s.targetY) s.y = s.targetY
    }
    s.life -= dt
  }
  suns = suns.filter(s => s.life > 0)

  // booms
  for (const b of booms) {
    b.r += (b.maxR - b.r) * Math.min(1, dts * 10)
    b.a -= dts * 1.8
  }
  booms = booms.filter(b => b.a > 0)

  if (shake > 0) shake -= dts * 30
}

// ─── Draw ──
function drawLawn(ctx: CanvasRenderingContext2D) {
  // house strip (left)
  ctx.fillStyle = '#3b2a1a'
  ctx.fillRect(0, 0, GRID_X, H)
  ctx.fillStyle = '#2a1d12'
  for (let y = 0; y < H; y += 18) ctx.fillRect(0, y, GRID_X, 9)

  // lawn stripes
  for (let r = 0; r < ROWS; r++) {
    ctx.fillStyle = r % 2 === 0 ? '#3f6d33' : '#37642d'
    ctx.fillRect(GRID_X, GRID_Y + r * CELL, COLS * CELL, CELL)
  }
  // right edge fade (where dinos enter)
  ctx.fillStyle = 'rgba(0,0,0,0.18)'
  ctx.fillRect(W - GRID_X, GRID_Y, GRID_X, ROWS * CELL)

  // grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  ctx.lineWidth = 1
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath()
    ctx.moveTo(GRID_X + c * CELL, GRID_Y)
    ctx.lineTo(GRID_X + c * CELL, GRID_Y + ROWS * CELL)
    ctx.stroke()
  }
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath()
    ctx.moveTo(GRID_X, GRID_Y + r * CELL)
    ctx.lineTo(GRID_X + COLS * CELL, GRID_Y + r * CELL)
    ctx.stroke()
  }
}

function drawPlant(ctx: CanvasRenderingContext2D, p: Plant) {
  const def = PLANTS[p.kind]
  const x = p.x
  const y = p.y
  ctx.save()
  ctx.translate(x, y)

  if (p.kind === 'sunfern') {
    // stem
    ctx.strokeStyle = '#15803d'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(0, 26)
    ctx.lineTo(0, 4)
    ctx.stroke()
    // petals
    const pet = 10
    ctx.fillStyle = '#facc15'
    for (let i = 0; i < pet; i++) {
      const a = (i / pet) * Math.PI * 2 + p.pulse * 0.2
      ctx.beginPath()
      ctx.ellipse(Math.cos(a) * 16, Math.sin(a) * 16 - 4, 8, 5, a, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = '#92400e'
    ctx.beginPath()
    ctx.arc(0, -4, 11, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fbbf24'
    ctx.beginPath()
    ctx.arc(0, -4, 7, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.kind === 'shooter') {
    ctx.strokeStyle = '#15803d'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(-4, 28)
    ctx.lineTo(-4, 6)
    ctx.stroke()
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(2, -2, 16, 0, Math.PI * 2)
    ctx.fill()
    // mouth (facing right)
    ctx.fillStyle = '#166534'
    ctx.beginPath()
    ctx.ellipse(14, -2, 7, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#bbf7d0'
    ctx.beginPath()
    ctx.arc(-2, -7, 3, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.kind === 'wall') {
    ctx.fillStyle = '#78350f'
    ctx.beginPath()
    ctx.roundRect(-22, -26, 44, 52, 8)
    ctx.fill()
    ctx.strokeStyle = '#5c2a0a'
    ctx.lineWidth = 2
    for (let i = -16; i <= 16; i += 10) {
      ctx.beginPath()
      ctx.moveTo(-22, i)
      ctx.lineTo(22, i)
      ctx.stroke()
    }
    ctx.fillStyle = '#a16207'
    ctx.beginPath()
    ctx.ellipse(0, -26, 18, 8, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.kind === 'freeze') {
    ctx.strokeStyle = '#0e7490'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(-2, 28)
    ctx.lineTo(-2, 6)
    ctx.stroke()
    ctx.fillStyle = '#38bdf8'
    ctx.beginPath()
    ctx.arc(2, -2, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#bae6fd'
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2
      ctx.beginPath()
      ctx.ellipse(2 + Math.cos(a) * 8, -2 + Math.sin(a) * 8, 3, 6, a, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = '#e0f2fe'
    ctx.beginPath()
    ctx.arc(2, -2, 4, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.kind === 'bomb') {
    const pulse = 1 + Math.sin(p.pulse * 4) * 0.08
    ctx.fillStyle = '#dc2626'
    ctx.beginPath()
    ctx.arc(0, 0, 16 * pulse, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#f97316'
    ctx.beginPath()
    ctx.arc(0, 0, 10 * pulse, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fde047'
    ctx.beginPath()
    ctx.arc(0, 0, 4 * pulse, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()

  // health bar
  if (p.hp < p.maxHp && p.kind !== 'bomb') {
    const w = 40
    const ratio = Math.max(0, p.hp / p.maxHp)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(x - w / 2, y - 34, w, 5)
    ctx.fillStyle = ratio > 0.5 ? '#4ade80' : ratio > 0.25 ? '#facc15' : '#ef4444'
    ctx.fillRect(x - w / 2, y - 34, w * ratio, 5)
  }
}

function drawDino(ctx: CanvasRenderingContext2D, d: Dino) {
  const def = DINOS[d.kind]
  const s = def.scale
  const y = cy(d.row)
  const drx = 16 + s * 18
  const dry = 12 + s * 14
  const bob = d.eating ? Math.sin(d.chew * 2) * 3 : Math.sin(d.wobble) * 1.5
  ctx.save()
  ctx.translate(d.x, y + bob)

  const slowed = timeAlive < d.slowUntil
  if (slowed) {
    ctx.fillStyle = 'rgba(56,189,248,0.25)'
    ctx.beginPath()
    ctx.ellipse(0, 0, drx + 8, dry + 8, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // tail
  ctx.strokeStyle = def.color
  ctx.lineWidth = 6 * s
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(drx - 2, 0)
  ctx.quadraticCurveTo(drx + 18 * s, -10 * s, drx + 26 * s, -2 * s)
  ctx.stroke()

  // legs
  ctx.strokeStyle = def.color
  ctx.lineWidth = 5 * s
  const legSwing = d.eating ? 0 : Math.sin(d.wobble * 1.4) * 4 * s
  ctx.beginPath()
  ctx.moveTo(-4 * s, dry - 2)
  ctx.lineTo(-4 * s + legSwing, dry + 14 * s)
  ctx.moveTo(8 * s, dry - 2)
  ctx.lineTo(8 * s - legSwing, dry + 14 * s)
  ctx.stroke()

  // body
  ctx.fillStyle = def.color
  ctx.beginPath()
  ctx.ellipse(0, 0, drx, dry, 0, 0, Math.PI * 2)
  ctx.fill()
  // belly
  ctx.fillStyle = def.belly
  ctx.beginPath()
  ctx.ellipse(-2 * s, 3 * s, drx * 0.6, dry * 0.55, 0, 0, Math.PI * 2)
  ctx.fill()

  // head + jaw (facing left)
  const jawOpen = d.eating ? 6 + Math.abs(Math.sin(d.chew * 2)) * 8 : 2
  ctx.fillStyle = def.color
  ctx.beginPath()
  ctx.arc(-drx - 2 * s, -6 * s, 11 * s, 0, Math.PI * 2)
  ctx.fill()
  // lower jaw
  ctx.beginPath()
  ctx.ellipse(-drx - 4 * s, -2 * s + jawOpen, 9 * s, 5 * s, 0, 0, Math.PI * 2)
  ctx.fill()
  // teeth
  ctx.fillStyle = '#fff'
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(-drx - 8 * s - i * 4 * s, -2 * s + jawOpen - 2)
    ctx.lineTo(-drx - 8 * s - i * 4 * s + 2, -2 * s + jawOpen - 2)
    ctx.lineTo(-drx - 8 * s - i * 4 * s + 1, -2 * s + jawOpen + 2)
    ctx.fill()
  }
  // eye
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(-drx + 2 * s, -10 * s, 3.4 * s, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(-drx + 1 * s, -10 * s, 1.8 * s, 0, Math.PI * 2)
  ctx.fill()

  // carno horns
  if (d.kind === 'carno') {
    ctx.strokeStyle = '#f1f5f9'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(-drx - 6 * s, -14 * s)
    ctx.lineTo(-drx - 14 * s, -22 * s)
    ctx.moveTo(-drx + 2 * s, -14 * s)
    ctx.lineTo(-drx - 4 * s, -22 * s)
    ctx.stroke()
  }
  ctx.restore()

  // health bar
  if (d.hp < d.maxHp) {
    const w = 38 * s
    const ratio = Math.max(0, d.hp / d.maxHp)
    const bx = d.x - w / 2
    const by = y - dry - 16
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(bx, by, w, 5)
    ctx.fillStyle = ratio > 0.5 ? '#4ade80' : ratio > 0.25 ? '#facc15' : '#ef4444'
    ctx.fillRect(bx, by, w * ratio, 5)
  }
}

function drawSun(ctx: CanvasRenderingContext2D, s: SunToken) {
  const blink = s.life < 2500 ? 0.5 + Math.abs(Math.sin(s.life / 120)) * 0.5 : 1
  const pulse = 1 + Math.sin(s.life / 300) * 0.06
  ctx.globalAlpha = blink
  ctx.save()
  ctx.translate(s.x, s.y)

  // soft glow halo so it pops against the lawn / flower
  const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, 22)
  glow.addColorStop(0, 'rgba(253, 224, 71, 0.55)')
  glow.addColorStop(1, 'rgba(253, 224, 71, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(0, 0, 22, 0, Math.PI * 2)
  ctx.fill()

  ctx.rotate(s.life / 900)
  // rays
  ctx.strokeStyle = '#fde68a'
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * 13, Math.sin(a) * 13)
    ctx.lineTo(Math.cos(a) * 19, Math.sin(a) * 19)
    ctx.stroke()
  }

  const r = 13 * pulse
  // dark rim — the key contrast against a yellow flower
  ctx.fillStyle = '#b45309'
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  ctx.fill()
  // bright body
  ctx.fillStyle = '#facc15'
  ctx.beginPath()
  ctx.arc(0, 0, r - 2.5, 0, Math.PI * 2)
  ctx.fill()
  // hot highlight
  ctx.fillStyle = '#fffbeb'
  ctx.beginPath()
  ctx.arc(-3, -3, r * 0.4, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
  ctx.globalAlpha = 1
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
  ctx.fillStyle = '#1c2b14'
  ctx.fillRect(0, 0, W, H)
  drawLawn(ctx)

  // hover highlight for placement
  if (phase.value === 'playing' && selected.value && selected.value !== 'shovel') {
    const def = PLANTS[selected.value]
    const ok = sun.value >= def.cost
    ctx.fillStyle = ok ? 'rgba(255,255,255,0.10)' : 'rgba(239,68,68,0.10)'
    for (let r = 0; r < ROWS; r++) {
      for (let col = 0; col < COLS; col++) {
        if (!grid[r][col]) ctx.fillRect(GRID_X + col * CELL, GRID_Y + r * CELL, CELL, CELL)
      }
    }
  }

  for (const p of plants) drawPlant(ctx, p)
  for (const pr of projs) {
    ctx.fillStyle = pr.freeze ? '#7dd3fc' : '#86efac'
    ctx.beginPath()
    ctx.arc(pr.x, pr.y, pr.freeze ? 6 : 5, 0, Math.PI * 2)
    ctx.fill()
    if (pr.freeze) {
      ctx.strokeStyle = '#e0f2fe'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(pr.x, pr.y, 6, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  for (const d of dinos) drawDino(ctx, d)
  for (const s of suns) drawSun(ctx, s)

  for (const b of booms) {
    ctx.globalAlpha = Math.max(0, b.a)
    ctx.fillStyle = '#f97316'
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = Math.max(0, b.a * 0.8)
    ctx.fillStyle = '#fde047'
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r * 0.6, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }
  ctx.restore()

  // wave banner
  if (waveBanner > 0) {
    const a = Math.min(1, waveBanner / 600)
    ctx.globalAlpha = a
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.fillRect(W / 2 - 130, H / 2 - 26, 260, 52)
    ctx.fillStyle = '#fbbf24'
    ctx.font = 'bold 26px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(t('games.dinoDefense.waveBanner', { n: wave.value }), W / 2, H / 2)
    ctx.globalAlpha = 1
  }
}

function loop(ts: number) {
  const dt = Math.min(ts - lastTs, 50)
  lastTs = ts
  update(dt)
  nowTick.value = ts
  if (phase.value !== 'playing') return
  draw()
  raf = requestAnimationFrame(loop)
}

// ─── Input ──
// The canvas uses `object-fit: contain`, so the bitmap is letterboxed inside
// the element box. Map a client point to bitmap coordinates accordingly.
function canvasPoint(clientX: number, clientY: number) {
  const c = canvasRef.value
  if (!c) return null
  const rect = c.getBoundingClientRect()
  const scale = Math.min(rect.width / W, rect.height / H)
  if (scale <= 0) return null
  const drawW = W * scale
  const drawH = H * scale
  const offX = (rect.width - drawW) / 2
  const offY = (rect.height - drawH) / 2
  const x = (clientX - rect.left - offX) / scale
  const y = (clientY - rect.top - offY) / scale
  if (x < 0 || x > W || y < 0 || y > H) return null
  return { x, y }
}

function onCanvasPointerDown(e: PointerEvent) {
  if (phase.value !== 'playing') {
    press()
    return
  }
  const pt = canvasPoint(e.clientX, e.clientY)
  if (!pt) return
  // collect a sun token first (top priority)
  for (let i = suns.length - 1; i >= 0; i--) {
    const s = suns[i]
    if (Math.hypot(pt.x - s.x, pt.y - s.y) <= 34) {
      sun.value += s.value
      suns.splice(i, 1)
      return
    }
  }
  // place / shovel
  const col = Math.floor((pt.x - GRID_X) / CELL)
  const row = Math.floor((pt.y - GRID_Y) / CELL)
  if (selected.value) tryPlace(col, row)
}

function onKey(e: KeyboardEvent) {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault()
    press()
    return
  }
  if (e.code === 'Escape') {
    selected.value = null
    return
  }
  const map: Record<string, PlantKind | 'shovel'> = {
    Digit1: 'sunfern',
    Digit2: 'shooter',
    Digit3: 'wall',
    Digit4: 'freeze',
    Digit5: 'bomb',
    KeyS: 'shovel',
  }
  const k = map[e.code]
  if (k) {
    e.preventDefault()
    selectCard(k)
  }
}

function onVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(raf)
  } else if (phase.value === 'playing') {
    lastTs = performance.now()
    raf = requestAnimationFrame(loop)
  }
}

function cardReady(kind: PlantKind) {
  return nowTick.value - rechargeStart[kind] >= PLANTS[kind].recharge
}
function cardCooldownRatio(kind: PlantKind) {
  const def = PLANTS[kind]
  const elapsed = nowTick.value - rechargeStart[kind]
  if (elapsed >= def.recharge) return 0
  return 1 - elapsed / def.recharge
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('keydown', onKey)
  document.addEventListener('visibilitychange', onVisibility)
  uiStore.setImmersive(true)
  resetState()
  draw()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('visibilitychange', onVisibility)
  cancelAnimationFrame(raf)
  uiStore.setImmersive(false)
})
</script>

<template>
  <div
    class="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-4 h-[100svh] flex flex-col gap-2 sm:gap-3 overflow-hidden overscroll-contain select-none"
  >
    <SeoHead
      :title="t('games.dinoDefense.title')"
      :description="t('games.dinoDefense.tagline')"
    />

    <div class="flex items-center justify-between flex-shrink-0">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm hidden sm:inline">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div class="flex gap-2 sm:gap-5 text-xs sm:text-sm font-semibold">
        <span class="flex items-center gap-1 text-[var(--color-brand-amber)]">
          <BaseIcon name="sun" :size="14" class="sm:hidden" />
          <BaseIcon name="sun" :size="16" class="hidden sm:block" /> {{ sun }}
        </span>
        <span class="flex items-center gap-1">
          <BaseIcon name="waves" :size="14" class="text-sky-400 sm:hidden" />
          <BaseIcon name="waves" :size="16" class="text-sky-400 hidden sm:block" /> {{ wave }}
        </span>
        <span class="flex items-center gap-1 text-[var(--color-text-secondary)]">
          💀 {{ score }}
        </span>
        <span class="flex items-center gap-1 text-[var(--color-text-secondary)]">🏆 {{ best }}</span>
      </div>
    </div>

    <h1
      class="text-display-sm sm:text-display-md text-center flex-shrink-0 [@media(max-height:640px)]:hidden"
    >
      {{ t('games.dinoDefense.title') }}
    </h1>
    <p
      class="text-body-sm text-center text-[var(--color-text-secondary)] hidden sm:block flex-shrink-0 [@media(max-height:640px)]:hidden"
    >
      {{ t('games.dinoDefense.tagline') }}
    </p>

    <!-- Seed bank (horizontal scroll on narrow screens, never wraps) -->
    <div
      class="flex items-stretch gap-1.5 sm:gap-2 flex-shrink-0 overflow-x-auto overscroll-x-contain py-1 -mx-3 px-3 sm:mx-0 sm:px-0"
      style="scrollbar-width: thin"
    >
      <button
        v-for="kind in (['sunfern','shooter','wall','freeze','bomb'] as PlantKind[])"
        :key="kind"
        type="button"
        class="seed-card relative flex flex-col items-center justify-center gap-0.5 flex-shrink-0 w-[56px] sm:w-[78px] py-1.5 sm:py-2 rounded-xl border-2 transition-all overflow-hidden"
        style="touch-action: manipulation"
        :class="[
          selected === kind
            ? 'border-[var(--color-brand-amber)] bg-[var(--color-brand-amber)]/15'
            : 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--glass-border-hover)]',
          !cardReady(kind) ? 'opacity-60' : '',
        ]"
        :disabled="sun < PLANTS[kind].cost || !cardReady(kind)"
        :aria-label="t(`games.dinoDefense.plant${kind.charAt(0).toUpperCase()}${kind.slice(1)}`)"
        @click="selectCard(kind)"
      >
        <span class="text-xl sm:text-3xl leading-none">{{ PLANTS[kind].emoji }}</span>
        <span class="hidden sm:block text-xs font-semibold text-center leading-tight">
          {{ t(`games.dinoDefense.plant${kind.charAt(0).toUpperCase()}${kind.slice(1)}`) }}
        </span>
        <span
          class="flex items-center gap-0.5 text-[11px] sm:text-xs font-bold"
          :class="sun >= PLANTS[kind].cost ? 'text-[var(--color-brand-amber)]' : 'text-rose-400'"
        >
          <BaseIcon name="sun" :size="11" /> {{ PLANTS[kind].cost }}
        </span>
        <div
          v-if="cardCooldownRatio(kind) > 0"
          class="absolute inset-x-0 bottom-0 bg-black/55 pointer-events-none"
          :style="{ height: `${cardCooldownRatio(kind) * 100}%` }"
        />
      </button>

      <!-- Shovel -->
      <button
        type="button"
        class="seed-card relative flex flex-col items-center justify-center gap-0.5 flex-shrink-0 w-[56px] sm:w-[78px] py-1.5 sm:py-2 rounded-xl border-2 transition-all"
        style="touch-action: manipulation"
        :class="selected === 'shovel'
          ? 'border-rose-500 bg-rose-500/15'
          : 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--glass-border-hover)]'"
        :aria-label="t('games.dinoDefense.shovel')"
        @click="selectCard('shovel')"
      >
        <BaseIcon name="shovel" :size="22" class="text-amber-300 sm:hidden" />
        <BaseIcon name="shovel" :size="26" class="text-amber-300 hidden sm:block" />
        <span class="hidden sm:block text-xs font-semibold">{{ t('games.dinoDefense.shovel') }}</span>
      </button>
    </div>

    <div
      class="relative flex-1 min-h-0 rounded-[var(--radius-xl)] overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)] bg-[#1c2b14]"
    >
      <canvas
        ref="canvasRef"
        :width="W"
        :height="H"
        class="block absolute inset-0 select-none"
        style="touch-action: none; cursor: pointer; object-fit: contain; width: 100%; height: 100%"
        @pointerdown="onCanvasPointerDown"
      />

      <!-- idle / game-over overlay -->
      <div
        v-if="phase !== 'playing'"
        class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center px-4 cursor-pointer"
        @pointerdown="press"
      >
        <div class="text-5xl sm:text-6xl mb-2 sm:mb-3">{{ phase === 'over' ? '🦖' : '🌻' }}</div>
        <p v-if="phase === 'over'" class="text-base sm:text-lg font-semibold mb-1">
          {{ t('games.dinoDefense.finalScore', { n: score }) }}
        </p>
        <p v-if="phase === 'over'" class="text-sm opacity-80 mb-1">
          {{ t('games.dinoDefense.finalWave', { n: wave }) }}
        </p>
        <p class="text-xs sm:text-sm opacity-80">
          {{ phase === 'over' ? t('games.dinoDefense.tapToRestart') : t('games.dinoDefense.tapToStart') }}
        </p>
        <div v-if="phase === 'over'" class="mt-2 text-xs opacity-70 flex items-center gap-2">
          <span>🏆 {{ best }}</span>
          <span>·</span>
          <span>{{ t('games.dinoDefense.bestWaveLabel') }} {{ bestWave }}</span>
        </div>
      </div>
    </div>

    <div
      class="hidden sm:flex justify-center gap-8 mt-1 text-xs text-[var(--color-text-tertiary)] flex-shrink-0 [@media(max-height:640px)]:hidden"
    >
      <span>🖱️ {{ t('games.dinoDefense.controls') }}</span>
      <span>⌨️ 1–5 / S</span>
    </div>
  </div>
</template>