/**
 * Dino Life — life-cycle simulation engine.
 *
 * Pure TypeScript, no Vue. The view owns the RAF loop and polls
 * `world.phase` + bar values each frame to mirror into reactive refs.
 *
 * Life cycle: idle → egg → juvenile → adult → win/over.
 * A "fact" interlude pauses between stages for the educational beat.
 */
import type { Dinosaur } from '@/types/dinosaur'
import { dinosaurs } from '@/data/dinosaurs'

export type Phase = 'idle' | 'egg' | 'juvenile' | 'adult' | 'fact' | 'over' | 'win'
export type Archetype = 'herbivore' | 'carnivore' | 'flyer' | 'swimmer'

export const W = 540
export const H = 720

// Flagship species per archetype (slugs verified to exist in src/data/dinosaurs).
export const ARCHETYPE_SPECIES: Record<Archetype, string> = {
  herbivore: 'triceratops',
  carnivore: 'tyrannosaurus-rex',
  flyer: 'pteranodon',
  swimmer: 'plesiosaurus',
}

export interface ArchetypeCard {
  id: Archetype
  emoji: string
  ring: string // accent color
  bg: string // canvas background base
  bgAccent: string
}

export const ARCHETYPES: ArchetypeCard[] = [
  { id: 'herbivore', emoji: '🦕', ring: '#22c55e', bg: '#1a3d1f', bgAccent: '#2d5a2f' },
  { id: 'carnivore', emoji: '🦖', ring: '#ef4444', bg: '#3d1a1a', bgAccent: '#5a2d2d' },
  { id: 'flyer', emoji: '🪶', ring: '#38bdf8', bg: '#1a2a3d', bgAccent: '#2d3d5a' },
  { id: 'swimmer', emoji: '🌊', ring: '#06b6d4', bg: '#0c2a3d', bgAccent: '#13455f' },
]

// ─── Entity ──
export interface Boid {
  kind: 'prey' | 'predator' | 'rival' | 'herd' | 'fish' | 'scavenger'
  slug: string
  mass: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  wander: number
  hp?: number // for strikable predators
  scared?: number // scavenger fear timer
}

export interface Food {
  x: number
  y: number
  r: number
  kind: 'plant' | 'fish'
}

export interface Particle {
  x: number
  y: number
  r: number
  a: number
  color: string
  kind?: 'ring' | 'boom' | 'spark' // default 'ring'
  vx?: number
  vy?: number
  maxR?: number
}

export interface FloatingText {
  x: number
  y: number
  vy: number
  life: number
  maxLife: number
  text: string
  color: string
  size: number
}

export interface TrailSample {
  x: number
  y: number
  t: number
}

export interface Player {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  mass: number
}

export interface Input {
  pointerActive: boolean
  pointerX: number
  pointerY: number
  keys: { up: boolean; down: boolean; left: boolean; right: boolean }
}

export interface Decor {
  stars: { x: number; y: number; r: number; a: number }[]
  grass: { x: number; y: number; h: number }[]
  trees: { x: number; y: number; h: number; w: number }[]
  mesas: { x: number; y: number; w: number; h: number }[]
  clouds: { x: number; y: number; s: number; spd: number }[]
  bubbles: { x: number; y: number; r: number; spd: number }[]
  thermals: { x: number; w: number }[]
  dust: { x: number; y: number; r: number; spd: number; phase: number }[]
  rays: { x: number; w: number }[]
}

export interface World {
  phase: Phase
  archetype: Archetype
  species: Dinosaur
  // timers
  t: number // ms spent in current stage
  elapsed: number // never-reset animation clock (ms)
  dayTime: number // 0..1 across a full day
  day: number
  score: number
  // bars (0..1)
  warmth: number // egg
  eggHealth: number // egg
  hunger: number // 1 = full
  health: number
  energy: number
  altitude: number // flyer
  breath: number // swimmer
  growth: number // juvenile → adult
  // entities
  player: Player
  boids: Boid[]
  food: Food[]
  particles: Particle[]
  decor: Decor
  shake: number
  facing: number // player last horizontal facing (-1 | 1)
  // fact interlude
  factText: string
  factNext: Phase | 'continue'
  // transient UI message
  message: string
  messageTimer: number
  // ability cooldown
  abilityCd: number
  lungeTimer: number
  ended: boolean
  // ── juice / game-feel ──
  hitstop: number // ms; world sim paused while > 0, juice keeps animating
  flash: { color: string; alpha: number }
  combo: number // consecutive eats/kills within comboTimer window
  comboTimer: number // ms until combo resets
  comboMax: number
  floatingTexts: FloatingText[]
  trail: TrailSample[]
  lastTrailT: number
  squash: number // horizontal scale factor, eases back to 1
  stretch: number // vertical scale factor, eases back to 1
  milestoneFlash: number // ms; HUD score recolor
  abilityName: string // localized in the view via archetype lookup
  charging: number // herbivore charge timer (ms)
  diveTimer: number // flyer dive timer (ms)
  energyLock: number // carnivore: ms of paused energy regen after a lunge
  goreCount: number // per-charge gore cap
  lastScore: number // for milestone threshold detection
}

const TARGET_DAYS = 5
const EGG_DURATION = 26000 // ms to hatch
const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// ─── Dino pools ──
const land = dinosaurs.filter(
  d => (d.category === 'carnivore' || d.category === 'herbivore' || d.category === 'omnivore') && d.dimensions.weightKg > 0,
)
const landCarnivores = land.filter(d => d.category === 'carnivore').sort((a, b) => a.dimensions.weightKg - b.dimensions.weightKg)
const landHerbivores = land.filter(d => d.category === 'herbivore').sort((a, b) => a.dimensions.weightKg - b.dimensions.weightKg)

// radius from mass — sub-linear (same idea as predator-prey)
function radius(mass: number): number {
  return Math.max(12, Math.min(60, 12 * Math.pow(Math.max(0.1, mass), 0.22)))
}

function bySlug(slug: string): Dinosaur {
  return dinosaurs.find(d => d.slug === slug) ?? dinosaurs[0]
}

// pick a short, kid-friendly fact string for the species
export function pickFact(d: Dinosaur): string {
  if (d.funFact) return d.funFact
  if (d.facts?.length) {
    const f = d.facts.find(f => f.description) ?? d.facts[0]
    return f.description || `${f.label}: ${f.value}`
  }
  if (d.kidsDescription) return d.kidsDescription
  if (d.childFriendlyText) return d.childFriendlyText
  return d.description || d.displayName
}

// ─── RNG ──
function rand(a: number, b: number): number {
  return a + Math.random() * (b - a)
}
function pick<T>(arr: T[]): T {
  return arr[(Math.random() * arr.length) | 0]
}

// ─── World construction ──
function seedDecor(a: Archetype): Decor {
  const stars = Array.from({ length: 70 }, () => ({
    x: rand(0, W),
    y: rand(0, H * 0.6),
    r: rand(0.5, 1.8),
    a: rand(0.3, 1),
  }))
  const grass = Array.from({ length: 26 }, () => ({
    x: rand(0, W),
    y: rand(H * 0.62, H - 10),
    h: rand(10, 26),
  }))
  const trees = Array.from({ length: 7 }, () => ({
    x: rand(-20, W + 20),
    y: rand(H * 0.55, H * 0.7),
    h: rand(60, 120),
    w: rand(30, 56),
  }))
  const mesas = Array.from({ length: 4 }, () => ({
    x: rand(-30, W + 30),
    y: rand(H * 0.58, H * 0.66),
    w: rand(120, 220),
    h: rand(70, 140),
  }))
  const clouds = Array.from({ length: 5 }, () => ({
    x: rand(0, W),
    y: rand(30, H * 0.4),
    s: rand(0.7, 1.6),
    spd: rand(0.06, 0.18) * (Math.random() < 0.5 ? -1 : 1),
  }))
  const bubbles = Array.from({ length: 22 }, () => ({
    x: rand(0, W),
    y: rand(0, H),
    r: rand(2, 6),
    spd: rand(0.2, 0.7),
  }))
  const thermals = Array.from({ length: 3 }, (_, i) => ({
    x: (W / 4) * (i + 1) + rand(-30, 30),
    w: rand(60, 110),
  }))
  const dust = Array.from({ length: 40 }, () => ({
    x: rand(0, W),
    y: rand(0, H),
    r: rand(1, 2.5),
    spd: rand(0.1, 0.4),
    phase: rand(0, Math.PI * 2),
  }))
  const rays = Array.from({ length: 6 }, (_, i) => ({
    x: (W / 6) * i + rand(-10, 10),
    w: rand(40, 80),
  }))
  return { stars, grass, trees, mesas, clouds, bubbles, thermals, dust, rays }
}

export function createWorld(archetype: Archetype): World {
  const species = bySlug(ARCHETYPE_SPECIES[archetype])
  const w: World = {
    phase: 'egg',
    archetype,
    species,
    t: 0,
    elapsed: 0,
    dayTime: 0.25,
    day: 1,
    score: 0,
    warmth: 1,
    eggHealth: 1,
    hunger: 1,
    health: 1,
    energy: 1,
    altitude: 1,
    breath: 1,
    growth: 0,
    player: { x: W / 2, y: H / 2, vx: 0, vy: 0, r: 18, mass: species.dimensions.weightKg || 50 },
    boids: [],
    food: [],
    particles: [],
    decor: seedDecor(archetype),
    shake: 0,
    facing: 1,
    factText: '',
    factNext: 'idle',
    message: '',
    messageTimer: 0,
    abilityCd: 0,
    lungeTimer: 0,
    ended: false,
    hitstop: 0,
    flash: { color: '#ef4444', alpha: 0 },
    combo: 0,
    comboTimer: 0,
    comboMax: 0,
    floatingTexts: [],
    trail: [],
    lastTrailT: 0,
    squash: 1,
    stretch: 1,
    milestoneFlash: 0,
    abilityName: '',
    charging: 0,
    diveTimer: 0,
    energyLock: 0,
    goreCount: 0,
    lastScore: 0,
  }
  enterEgg(w)
  return w
}

export function resetForReplay(w: World): void {
  const arch = w.archetype
  const fresh = createWorld(arch)
  Object.assign(w, fresh)
}

// ─── Stages ──
function enterEgg(w: World): void {
  w.phase = 'egg'
  w.t = 0
  w.warmth = 1
  w.eggHealth = 1
  w.boids = []
  w.food = []
  // seed a few scavengers
  for (let i = 0; i < 3; i++) spawnScavenger(w)
}

function enterJuvenile(w: World): void {
  w.phase = 'juvenile'
  w.t = 0
  w.growth = 0
  w.hunger = 0.7
  w.health = 1
  w.energy = 1
  w.altitude = 1
  w.breath = 1
  w.player.x = W / 2
  w.player.y = H / 2
  w.player.r = 16
  w.boids = []
  w.food = []
  // archetype-appropriate starting food so every juvenile can feed right away
  if (w.archetype === 'herbivore') {
    seedFood(w, 7)
    for (let i = 0; i < 2; i++) spawnBoid(w, 'mixed') // occasional threat
  } else if (w.archetype === 'carnivore') {
    for (let i = 0; i < 5; i++) spawnBoid(w, 'prey')
    for (let i = 0; i < 1; i++) spawnBoid(w, 'predator')
  } else {
    // flyer & swimmer — fish to hunt
    for (let i = 0; i < 5; i++) spawnFish(w)
  }
}

function enterAdult(w: World): void {
  w.phase = 'adult'
  w.t = 0
  w.day = 1
  w.dayTime = 0.25
  w.player.r = 26
  w.boids = []
  w.food = []
  seedFood(w, 6)
  // archetype-specific seeds
  if (w.archetype === 'herbivore') {
    // gather a small herd
    for (let i = 0; i < 3; i++) spawnHerdAlly(w)
    for (let i = 0; i < 2; i++) spawnBoid(w, 'predator')
  } else if (w.archetype === 'carnivore') {
    for (let i = 0; i < 4; i++) spawnBoid(w, 'prey')
    for (let i = 0; i < 1; i++) spawnBoid(w, 'rival')
  } else if (w.archetype === 'flyer') {
    w.altitude = 0.7
    for (let i = 0; i < 4; i++) spawnFish(w)
    for (let i = 0; i < 1; i++) spawnBoid(w, 'predator')
  } else if (w.archetype === 'swimmer') {
    w.breath = 1
    for (let i = 0; i < 5; i++) spawnFish(w)
    for (let i = 0; i < 1; i++) spawnBoid(w, 'predator')
  }
}

// ─── Spawners ──
function spawnScavenger(w: World): void {
  const slug = 'compsognathus'
  const fromLeft = Math.random() < 0.5
  const x = fromLeft ? -20 : W + 20
  const y = rand(80, H - 80)
  w.boids.push({
    kind: 'scavenger',
    slug,
    mass: 3,
    x,
    y,
    vx: 0,
    vy: 0,
    r: 16,
    wander: 0,
    scared: 0,
  })
}

function spawnHerdAlly(w: World): void {
  const pool = landHerbivores.filter(d => d.dimensions.weightKg < 4000)
  const d = pool.length ? pick(pool) : landHerbivores[0]
  const ang = Math.random() * Math.PI * 2
  w.boids.push({
    kind: 'herd',
    slug: d.slug,
    mass: d.dimensions.weightKg,
    x: rand(40, W - 40),
    y: rand(40, H - 40),
    vx: Math.cos(ang),
    vy: Math.sin(ang),
    r: radius(d.dimensions.weightKg),
    wander: ang,
  })
}

function spawnBoid(w: World, flavor: 'prey' | 'predator' | 'rival' | 'mixed'): void {
  const pm = w.player.mass
  let cand: Dinosaur[]
  let kind: Boid['kind']
  if (flavor === 'prey') {
    kind = 'prey'
    cand = land.filter(d => d.dimensions.weightKg > 1 && d.dimensions.weightKg < pm * 0.9)
  } else if (flavor === 'predator') {
    kind = 'predator'
    cand = landCarnivores.filter(d => d.dimensions.weightKg > pm * 0.8)
  } else if (flavor === 'rival') {
    kind = 'rival'
    cand = landCarnivores.filter(d => d.dimensions.weightKg > pm * 0.7 && d.dimensions.weightKg < pm * 1.5)
  } else {
    // mixed — juvenile stage: mostly prey, sometimes a threat
    const threat = Math.random() < 0.3
    if (threat) {
      kind = 'predator'
      cand = landCarnivores.filter(d => d.dimensions.weightKg > pm * 0.6)
    } else {
      kind = 'prey'
      cand = land.filter(d => d.dimensions.weightKg > 1 && d.dimensions.weightKg < pm * 0.9)
    }
  }
  if (!cand.length) cand = land
  const d = pick(cand)
  const mass = d.dimensions.weightKg
  const r = radius(mass)
  let x = 0
  let y = 0
  const minDist = Math.max(90, w.player.r + r + 40)
  for (let tries = 0; tries < 15; tries++) {
    x = r + Math.random() * (W - 2 * r)
    y = r + Math.random() * (H - 2 * r)
    if (Math.hypot(x - w.player.x, y - w.player.y) > minDist) break
  }
  const ang = Math.random() * Math.PI * 2
  w.boids.push({
    kind,
    slug: d.slug,
    mass,
    x,
    y,
    vx: Math.cos(ang),
    vy: Math.sin(ang),
    r,
    wander: ang,
    hp: kind === 'predator' || kind === 'rival' ? 2 : undefined,
  })
}

function spawnFish(w: World): void {
  // small marine/fish proxy: use a small marine reptile or compsognathus image
  const slug = 'compsognathus'
  const fromLeft = Math.random() < 0.5
  w.boids.push({
    kind: 'fish',
    slug,
    mass: 2,
    x: fromLeft ? -20 : W + 20,
    y: rand(60, H - 60),
    vx: fromLeft ? 1.4 : -1.4,
    vy: rand(-0.3, 0.3),
    r: 13,
    wander: 0,
  })
}

function seedFood(w: World, n: number): void {
  if (w.archetype === 'herbivore') {
    for (let i = 0; i < n; i++) {
      w.food.push({ x: rand(40, W - 40), y: rand(40, H - 40), r: 12, kind: 'plant' })
    }
  }
}

// ─── Update ──
export function update(w: World, dt: number, input: Input): void {
  if (w.phase === 'idle' || w.phase === 'fact' || w.phase === 'over' || w.phase === 'win') return
  const f = dt / 16.6667

  // ── Juice decay always runs (so hit-feedback animates even during a freeze) ──
  if (w.shake > 0) w.shake -= f * 0.8
  // particles: ring fades; boom grows toward maxR then fades; spark flies & fades
  for (const p of w.particles) {
    if (p.kind === 'boom') {
      p.r += ((p.maxR ?? p.r * 2) - p.r) * Math.min(1, f * 0.18)
      p.a -= f * 0.11
    } else if (p.kind === 'spark') {
      p.x += (p.vx ?? 0) * f
      p.y += (p.vy ?? 0) * f
      ;(p.vx as number) = (p.vx ?? 0) * Math.pow(0.92, f)
      ;(p.vy as number) = (p.vy ?? 0) * Math.pow(0.92, f)
      p.a -= f * 0.06
    } else {
      p.a -= f * 0.05
    }
  }
  w.particles = w.particles.filter(p => p.a > 0)
  // floating texts rise + slow + fade
  for (const t of w.floatingTexts) {
    t.y += t.vy * f
    t.vy *= Math.pow(0.94, f)
    t.life -= dt
  }
  w.floatingTexts = w.floatingTexts.filter(t => t.life > 0)
  // damage flash fades
  if (w.flash.alpha > 0) w.flash.alpha = Math.max(0, w.flash.alpha - f * 0.08)
  // combo window
  if (w.comboTimer > 0) {
    w.comboTimer -= dt
    if (w.comboTimer <= 0) w.combo = 0
  }
  if (w.milestoneFlash > 0) w.milestoneFlash -= dt
  // squash/stretch ease back to 1
  w.squash += (1 - w.squash) * Math.min(1, f * 0.18)
  w.stretch += (1 - w.stretch) * Math.min(1, f * 0.18)

  // hit-stop gates the world sim (but not the juice above)
  if (w.hitstop > 0) {
    w.hitstop -= dt
    return
  }

  w.t += dt
  w.elapsed += dt
  // day cycle: a full day every ~28s in adult, slower elsewhere
  const dayLen = w.phase === 'adult' ? 28000 : 40000
  w.dayTime = (w.dayTime + dt / dayLen) % 1
  updateDecor(w, f)
  if (w.messageTimer > 0) w.messageTimer -= dt
  if (w.abilityCd > 0) w.abilityCd -= dt
  if (w.lungeTimer > 0) w.lungeTimer -= dt
  if (w.charging > 0) w.charging -= dt
  if (w.diveTimer > 0) w.diveTimer -= dt
  if (w.energyLock > 0) w.energyLock -= dt

  // motion trail sampling (flyer/swimmer only, when moving & motion allowed)
  if (!reducedMotion && (w.archetype === 'flyer' || w.archetype === 'swimmer')) {
    const sp = Math.hypot(w.player.vx, w.player.vy)
    if (sp > 1.4 && w.elapsed - w.lastTrailT > 50) {
      w.trail.push({ x: w.player.x, y: w.player.y, t: w.elapsed })
      w.lastTrailT = w.elapsed
      if (w.trail.length > 6) w.trail.shift()
    }
  } else if (w.trail.length) {
    w.trail.length = 0
  }
  // age out stale trail samples
  if (w.trail.length && w.elapsed - w.trail[0].t > 360) w.trail.shift()

  if (w.phase === 'egg') updateEgg(w, dt, f)
  else if (w.phase === 'juvenile') updateJuvenile(w, dt, f, input)
  else if (w.phase === 'adult') updateAdult(w, dt, f, input)
}

function updateDecor(w: World, f: number): void {
  const d = w.decor
  for (const c of d.clouds) {
    c.x += c.spd * f
    if (c.x > W + 80) c.x = -80
    if (c.x < -80) c.x = W + 80
  }
  for (const b of d.bubbles) {
    b.y -= b.spd * f
    b.x += Math.sin((b.y + b.r * 30) / 40) * 0.2 * f
    if (b.y < -10) {
      b.y = H + rand(0, 40)
      b.x = rand(0, W)
    }
  }
  for (const du of d.dust) {
    du.phase += 0.02 * f
    du.x += Math.sin(du.phase) * 0.3 * f
    du.y += du.spd * f * 0.2
    if (du.y > H) du.y = 0
  }
}

function nightFactor(w: World): number {
  // 1 at midnight, 0 at noon — used to ramp danger / warmth drain
  const t = w.dayTime
  // treat 0.0..0.5 as day, 0.5..1 as night
  if (t < 0.5) return Math.max(0, (0.25 - t) * 4) // gentle
  return Math.min(1, (t - 0.5) * 2)
}

function updateEgg(w: World, dt: number, f: number): void {
  const night = nightFactor(w)
  // warmth drains faster at night
  w.warmth -= (0.00006 + night * 0.0001) * dt
  if (w.warmth < 0) w.warmth = 0
  // warming handled in handleEggPointer; small passive regen in daylight
  if (night < 0.3) w.warmth += 0.00004 * dt
  // a freezing egg takes damage
  if (w.warmth <= 0) w.eggHealth -= 0.00025 * dt

  // scavengers approach the egg; when close, drain eggHealth
  const ex = W / 2
  const ey = H / 2 + 40
  for (const b of w.boids) {
    if (b.kind !== 'scavenger') continue
    if (b.scared && b.scared > 0) {
      b.scared -= dt
      // flee outward
      const ang = Math.atan2(b.y - ey, b.x - ex)
      b.x += Math.cos(ang) * 3 * f
      b.y += Math.sin(ang) * 3 * f
      continue
    }
    const dx = ex - b.x
    const dy = ey - b.y
    const d = Math.hypot(dx, dy) || 1
    const sp = 1.1 + night * 0.6
    b.x += (dx / d) * sp * f
    b.y += (dy / d) * sp * f
    if (d < 36) {
      w.eggHealth -= 0.00045 * dt
      w.shake = Math.max(w.shake, 4)
      if (Math.random() < 0.04) w.particles.push({ x: ex + rand(-10, 10), y: ey + rand(-10, 10), r: 6, a: 1, color: '#ef4444' })
    }
  }
  // respawn scavengers
  const scavCount = w.boids.filter(b => b.kind === 'scavenger' && (!b.scared || b.scared <= 0)).length
  if (scavCount < 2 + Math.floor(w.t / 9000)) {
    if (Math.random() < 0.02) spawnScavenger(w)
  }
  // remove scavengers that fled off-screen
  w.boids = w.boids.filter(b => !(b.kind === 'scavenger' && (b.x < -60 || b.x > W + 60 || b.y < -60 || b.y > H + 60)))

  if (w.eggHealth <= 0) {
    w.eggHealth = 0
    w.factText = pickFact(w.species)
    w.factNext = 'over'
    w.phase = 'fact'
    return
  }
  if (w.t >= EGG_DURATION) {
    w.factText = pickFact(w.species)
    w.factNext = 'juvenile'
    w.phase = 'fact'
  }
}

function movePlayer(w: World, f: number, input: Input, maxSpeed: number, accel = 0.6): void {
  let tx = 0
  let ty = 0
  if (input.pointerActive) {
    const dx = input.pointerX - w.player.x
    const dy = input.pointerY - w.player.y
    const d = Math.hypot(dx, dy)
    if (d > 4) {
      tx = dx / d
      ty = dy / d
    }
  } else {
    if (input.keys.up) ty -= 1
    if (input.keys.down) ty += 1
    if (input.keys.left) tx -= 1
    if (input.keys.right) tx += 1
    const l = Math.hypot(tx, ty)
    if (l > 0) {
      tx /= l
      ty /= l
    }
  }
  const boost = w.lungeTimer > 0 || w.charging > 0 ? 1.8 : 1
  w.player.vx += tx * accel * boost * f
  w.player.vy += ty * accel * boost * f
  w.player.vx *= Math.pow(0.9, f)
  w.player.vy *= Math.pow(0.9, f)
  const sp = Math.hypot(w.player.vx, w.player.vy)
  const ms = maxSpeed * boost
  if (sp > ms) {
    w.player.vx = (w.player.vx / sp) * ms
    w.player.vy = (w.player.vy / sp) * ms
  }
  // currents for swimmer
  if (w.archetype === 'swimmer') {
    w.player.vx += Math.sin(w.t / 900) * 0.12 * f
  }
  w.player.x += w.player.vx * f
  w.player.y += w.player.vy * f
  if (Math.abs(w.player.vx) > 0.25) w.facing = w.player.vx > 0 ? 1 : -1
  const r = w.player.r
  if (w.player.x < r) {
    w.player.x = r
    w.player.vx = Math.abs(w.player.vx) * 0.5
  }
  if (w.player.x > W - r) {
    w.player.x = W - r
    w.player.vx = -Math.abs(w.player.vx) * 0.5
  }
  if (w.player.y < r) {
    w.player.y = r
    w.player.vy = Math.abs(w.player.vy) * 0.5
  }
  if (w.player.y > H - r) {
    w.player.y = H - r
    w.player.vy = -Math.abs(w.player.vy) * 0.5
  }
}

function updateJuvenile(w: World, dt: number, f: number, input: Input): void {
  const sp = w.species.dimensions.speedKmh || 30
  const maxSpeed = 3.4 + Math.min(1.5, sp / 30)
  movePlayer(w, f, input, maxSpeed)

  // hunger drains; if starving, health drains
  w.hunger -= 0.0001 * dt
  if (w.hunger <= 0) {
    w.hunger = 0
    w.health -= 0.0002 * dt
  } else if (w.hunger > 0.5) {
    // regen health when fed
    w.health = Math.min(1, w.health + 0.00008 * dt)
  }

  // food: herbivore eats plants
  if (w.archetype === 'herbivore') {
    for (let i = w.food.length - 1; i >= 0; i--) {
      const fd = w.food[i]
      if (Math.hypot(fd.x - w.player.x, fd.y - w.player.y) < w.player.r + fd.r) {
        w.food.splice(i, 1)
        w.hunger = Math.min(1, w.hunger + 0.28)
        eatFood(w, fd.x, fd.y, '#22c55e', true)
        if (w.food.length < 4) seedFood(w, 1)
      }
    }
  }

  // boids wander; predators chase; prey flees
  for (const b of w.boids) {
    steerBoid(w, b, f)
  }
  // cull off-screen fish
  w.boids = w.boids.filter(b => !(b.kind === 'fish' && (b.x < -50 || b.x > W + 50)))
  // food maintenance for the juvenile
  const jPrey = w.boids.filter(b => b.kind === 'prey').length
  const jFish = w.boids.filter(b => b.kind === 'fish').length
  if (w.archetype === 'herbivore') {
    if (w.food.length < 5 && Math.random() < 0.05) seedFood(w, 1)
  } else if (w.archetype === 'carnivore') {
    if (jPrey < 4 && Math.random() < 0.06) spawnBoid(w, 'prey')
  } else {
    if (jFish < 4 && Math.random() < 0.07) spawnFish(w)
  }
  // collisions
  resolveCollisions(w)

  // visibly grow: body scales up with the growth bar (juvenile 16 → adult 26)
  w.player.r = 16 + w.growth * 10

  // grow up
  if (w.growth >= 1) {
    w.factText = pickFact(w.species)
    w.factNext = 'adult'
    w.phase = 'fact'
  }
  if (w.health <= 0) {
    w.factText = pickFact(w.species)
    w.factNext = 'over'
    w.phase = 'fact'
  }
}

function updateAdult(w: World, dt: number, f: number, input: Input): void {
  const sp = w.species.dimensions.speedKmh || 30
  const maxSpeed = 3.6 + Math.min(2, sp / 30)
  movePlayer(w, f, input, maxSpeed)

  // day/night danger ramps spawns
  const night = nightFactor(w)
  const dayChanged = w.dayTime < 0.02 && w.t > 1000
  if (dayChanged) {
    w.day += 1
    w.dayTime = 0.05 // push past the threshold so we don't re-fire on resume
    w.factText = pickFact(w.species)
    if (w.day >= TARGET_DAYS) {
      w.factNext = 'win'
    } else {
      w.factNext = 'continue' // resume adult without resetting
    }
    w.phase = 'fact'
    return
  }

  // archetype-specific bars
  if (w.archetype === 'flyer') {
    // thermals: riding a thermal column at altitude lifts you & refills altitude
    let overThermal = false
    for (const th of w.decor.thermals) {
      if (Math.abs(w.player.x - th.x) < th.w / 2) { overThermal = true; break }
    }
    if (overThermal && w.altitude > 0.15) {
      w.altitude = Math.min(1, w.altitude + 0.0004 * dt)
      w.player.vy -= 0.04 * f
    } else {
      w.altitude -= 0.00009 * dt
      if (w.altitude < 0) w.altitude = 0
    }
    if (w.energyLock <= 0) w.energy = Math.min(1, w.energy + 0.00008 * dt)
    // DIVE: plummet sweeps up nearby fish; ground impact hurts
    if (w.diveTimer > 0) {
      for (let i = w.boids.length - 1; i >= 0; i--) {
        const b = w.boids[i]
        if (b.kind !== 'fish') continue
        if (Math.hypot(b.x - w.player.x, b.y - w.player.y) < 78) {
          w.boids.splice(i, 1)
          const gained = addScore(w, 2)
          spawnBoom(w, b.x, b.y, '#38bdf8', 30)
          addFloatingText(w, b.x, b.y - 8, '+' + gained, '#38bdf8')
          w.hunger = Math.min(1, w.hunger + 0.18)
        }
      }
      if (w.player.y > H - w.player.r - 6) {
        // hit the ground
        w.diveTimer = 0
        w.health -= 0.15
        hitReact(w, { shake: 16, flash: '#ef4444', flashAlpha: 0.3, hitstop: 60, squashX: 1.25, squashY: 0.7 })
        spawnBoom(w, w.player.x, w.player.y + 10, '#a16207', 42)
        spawnSpark(w, w.player.x, w.player.y + 8, '#a16207', 10)
        w.combo = 0
        w.player.vy = -3.5
      }
    }
  } else if (w.archetype === 'swimmer') {
    // breath drains; refill near surface (top); deep water drains faster
    const nearSurface = w.player.y < 90
    const deep = w.player.y > H * 0.55
    if (nearSurface) w.breath = Math.min(1, w.breath + 0.0009 * dt)
    else w.breath -= (deep ? 0.00022 : 0.00014) * dt
    if (w.breath <= 0) {
      w.breath = 0
      w.health -= 0.0003 * dt
    }
  } else if (w.archetype === 'carnivore') {
    // stamina regen, paused briefly after a lunge
    if (w.energyLock <= 0) w.energy = Math.min(1, w.energy + 0.00012 * dt)
  }

  // hunger (carnivore/herbivore) — flyer/swimmer use it too for fish
  w.hunger -= 0.00009 * dt
  if (w.hunger <= 0) {
    w.hunger = 0
    w.health -= 0.0002 * dt
  } else if (w.hunger > 0.5) {
    w.health = Math.min(1, w.health + 0.00006 * dt)
  }

  // food (plants for herbivore)
  if (w.archetype === 'herbivore') {
    for (let i = w.food.length - 1; i >= 0; i--) {
      const fd = w.food[i]
      if (Math.hypot(fd.x - w.player.x, fd.y - w.player.y) < w.player.r + fd.r) {
        w.food.splice(i, 1)
        w.hunger = Math.min(1, w.hunger + 0.25)
        eatFood(w, fd.x, fd.y, '#22c55e', false)
        if (w.food.length < 5) seedFood(w, 1)
      }
    }
  }

  // herd follow (herbivore)
  if (w.archetype === 'herbivore') {
    for (const b of w.boids) {
      if (b.kind === 'herd') {
        const dx = w.player.x - b.x
        const dy = w.player.y - b.y
        const d = Math.hypot(dx, dy) || 1
        if (d > 70) {
          b.vx = (dx / d) * 1.6
          b.vy = (dy / d) * 1.6
        } else {
          b.vx *= 0.9
          b.vy *= 0.9
        }
        b.x += b.vx * f
        b.y += b.vy * f
        b.x = Math.max(b.r, Math.min(W - b.r, b.x))
        b.y = Math.max(b.r, Math.min(H - b.r, b.y))
      }
    }
  }

  // boid AI + fish
  for (const b of w.boids) steerBoid(w, b, f)

  // cull fish that swam off-screen
  w.boids = w.boids.filter(b => !(b.kind === 'fish' && (b.x < -50 || b.x > W + 50)))

  // food maintenance — keep a reliable supply so the player can always feed
  const predators = w.boids.filter(b => b.kind === 'predator' || b.kind === 'rival').length
  const fishCount = w.boids.filter(b => b.kind === 'fish').length
  const preyCount = w.boids.filter(b => b.kind === 'prey').length
  if (w.archetype === 'carnivore') {
    // always keep at least 4 prey; top up to 8 slowly; rare rival
    if (preyCount < 4) { if (Math.random() < 0.06) spawnBoid(w, 'prey') }
    else if (preyCount < 8 && Math.random() < 0.012) spawnBoid(w, Math.random() < 0.85 ? 'prey' : 'rival')
  } else if (w.archetype === 'herbivore') {
    if (w.food.length < 5 && Math.random() < 0.05) seedFood(w, 1)
    if (predators < 3 && Math.random() < 0.004 + night * 0.006) spawnBoid(w, 'predator')
    const herdCount = w.boids.filter(b => b.kind === 'herd').length
    if (herdCount < 3 && Math.random() < 0.02) spawnHerdAlly(w)
  } else {
    // flyer & swimmer — keep fish plentiful, occasional sea/sky predator
    if (fishCount < 4) { if (Math.random() < 0.08) spawnFish(w) }
    else if (fishCount < 8 && Math.random() < 0.03) spawnFish(w)
    if (predators < 2 && Math.random() < 0.003 + night * 0.004) spawnBoid(w, 'predator')
  }
  // global cap (keep herd allies)
  if (w.boids.length > 24) {
    const idx = w.boids.findIndex(b => b.kind !== 'herd')
    if (idx >= 0) w.boids.splice(idx, 1)
  }

  resolveCollisions(w)

  // herbivore: predators can snatch a herd member that strays too close — protect them!
  if (w.archetype === 'herbivore') {
    for (let i = w.boids.length - 1; i >= 0; i--) {
      const pred = w.boids[i]
      if (pred.kind !== 'predator' && pred.kind !== 'rival') continue
      for (let j = w.boids.length - 1; j >= 0; j--) {
        const h = w.boids[j]
        if (h.kind !== 'herd') continue
        if (Math.hypot(h.x - pred.x, h.y - pred.y) < (h.r + pred.r) * 0.8) {
          w.boids.splice(j, 1)
          w.health -= 0.08
          w.combo = 0
          spawnBoom(w, h.x, h.y, '#fbbf24', 26)
          addFloatingText(w, h.x, h.y - 8, '-herd', '#fbbf24', 14)
          hitReact(w, { shake: 6, flash: '#ef4444', flashAlpha: 0.18 })
          break
        }
      }
    }
  }

  // win condition
  if (w.day >= TARGET_DAYS) {
    w.factText = pickFact(w.species)
    w.factNext = 'win'
    w.phase = 'fact'
  }
  if (w.health <= 0) {
    w.factText = pickFact(w.species)
    w.factNext = 'over'
    w.phase = 'fact'
  }
}

function steerBoid(w: World, b: Boid, f: number): void {
  if (b.kind === 'fish') {
    b.x += b.vx * f
    b.y += b.vy * f + Math.sin(w.t / 600 + b.x) * 0.2 * f
    return
  }
  if (b.kind === 'scavenger') return // handled in egg stage
  if (b.kind === 'herd') return // handled in adult
  if (b.scared && b.scared > 0) {
    b.scared -= 16.6667 * f
    // flee from player
    b.wander = Math.atan2(b.y - w.player.y, b.x - w.player.x)
  } else {
    b.wander += (Math.random() - 0.5) * 0.3 * f
  }
  let bsp = 1.7 / (1 + b.r * 0.02)
  // swimmer: predators hunt faster in deep water
  if (w.archetype === 'swimmer' && (b.kind === 'predator' || b.kind === 'rival') && b.y > H * 0.55) bsp *= 1.3
  const dx = w.player.x - b.x
  const dy = w.player.y - b.y
  const dist = Math.hypot(dx, dy) || 1
  if (b.kind === 'predator') {
    if (!(b.scared && b.scared > 0)) {
      // herbivore: predators prefer the nearest herd member (protect your herd!)
      let target: { x: number; y: number } | null = null
      if (w.archetype === 'herbivore') {
        let bestD = 170
        for (const h of w.boids) {
          if (h.kind !== 'herd') continue
          const hd = Math.hypot(h.x - b.x, h.y - b.y)
          if (hd < bestD) { bestD = hd; target = h }
        }
      }
      if (target) b.wander = Math.atan2(target.y - b.y, target.x - b.x)
      else if (dist < 220) b.wander = Math.atan2(dy, dx)
    }
  } else if (b.kind === 'prey') {
    // flee from a carnivore player — radius scales with player speed (creep to stalk, sprint scares them)
    if (w.archetype === 'carnivore') {
      const psp = Math.hypot(w.player.vx, w.player.vy)
      const fleeR = Math.min(190, 70 + psp * 20)
      if (dist < fleeR) b.wander = Math.atan2(-dy, -dx)
    }
  } else if (b.kind === 'rival') {
    if (dist < 200) b.wander = Math.atan2(dy, dx)
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

// ── Juice helpers ──
function spawnBoom(w: World, x: number, y: number, color: string, maxR: number): void {
  w.particles.push({ x, y, r: 0, a: 1, color, kind: 'boom', maxR })
}
function spawnSpark(w: World, x: number, y: number, color: string, n: number): void {
  for (let i = 0; i < n; i++) {
    const ang = Math.random() * Math.PI * 2
    const sp = rand(1.5, 4)
    w.particles.push({
      x, y, r: rand(1.5, 3), a: 1, color, kind: 'spark',
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
    })
  }
}
function addFloatingText(w: World, x: number, y: number, text: string, color: string, size = 18): void {
  w.floatingTexts.push({ x, y, vy: -0.7, life: 900, maxLife: 900, text, color, size })
}
// combo-aware score gain: returns the amount gained so callers can show "+N"
function addScore(w: World, base: number): number {
  const mult = Math.min(5, 1 + Math.floor(w.combo / 3))
  const gained = base * mult
  w.score += gained
  w.combo += 1
  w.comboTimer = 2200
  if (w.combo > w.comboMax) w.comboMax = w.combo
  // milestone flash every 25 points crossed
  if (Math.floor(w.score / 25) > Math.floor(w.lastScore / 25)) w.milestoneFlash = 600
  w.lastScore = w.score
  return gained
}
interface HitReact {
  shake?: number
  flash?: string
  flashAlpha?: number
  hitstop?: number
  squashX?: number
  squashY?: number
}
function hitReact(w: World, o: HitReact): void {
  if (o.shake) w.shake = Math.max(w.shake, o.shake)
  if (o.flash) { w.flash.color = o.flash; w.flash.alpha = o.flashAlpha ?? 0.4 }
  if (o.hitstop) w.hitstop = Math.max(w.hitstop, o.hitstop)
  if (o.squashX) w.squash = o.squashX
  if (o.squashY) w.stretch = o.squashY
}

// shared "eat something" juice: score + boom + ring + popup + squash
function eatFood(w: World, x: number, y: number, color: string, growthBump = false): void {
  const gained = addScore(w, 1)
  spawnBoom(w, x, y, color, 26)
  w.particles.push({ x, y, r: 12, a: 1, color })
  addFloatingText(w, x, y - 8, '+' + gained, color)
  w.squash = 1.15
  w.stretch = 0.9
  if (growthBump && w.phase === 'juvenile') w.growth = Math.min(1, w.growth + 0.18)
}

function resolveCollisions(w: World): void {
  const p = w.player
  const charging = w.charging > 0
  const lunging = w.lungeTimer > 0
  for (let i = w.boids.length - 1; i >= 0; i--) {
    const b = w.boids[i]
    if (b.kind === 'scavenger' || b.kind === 'herd') continue
    const d = Math.hypot(b.x - p.x, b.y - p.y)
    const reach = (b.r + p.r) * 0.82
    if (d > reach) continue

    if (b.kind === 'fish') {
      // eat fish on contact (flyer & swimmer) — deep-water fish score double
      w.boids.splice(i, 1)
      const deep = w.archetype === 'swimmer' && p.y > H * 0.55
      w.hunger = Math.min(1, w.hunger + 0.3)
      const gained = addScore(w, deep ? 2 : 1)
      spawnBoom(w, b.x, b.y, '#38bdf8', 28)
      w.particles.push({ x: b.x, y: b.y, r: b.r, a: 1, color: '#38bdf8' })
      addFloatingText(w, b.x, b.y - 8, '+' + gained, '#38bdf8')
      w.squash = 1.15
      w.stretch = 0.9
      if (w.phase === 'juvenile') w.growth = Math.min(1, w.growth + 0.18)
      continue
    }

    const dangerous = b.kind === 'predator' || b.kind === 'rival'

    // herbivore CHARGE gore: plow through a predator/rival
    if (charging && dangerous && w.goreCount < 3) {
      w.goreCount += 1
      w.boids.splice(i, 1)
      const gained = addScore(w, 3)
      spawnBoom(w, b.x, b.y, '#fbbf24', 34)
      spawnSpark(w, b.x, b.y, '#fbbf24', 10)
      addFloatingText(w, b.x, b.y - 10, '+' + gained, '#fbbf24', 22)
      hitReact(w, { shake: 10, hitstop: 60, squashX: 1.2, squashY: 0.85 })
      // knock the gored predator away
      const ang = Math.atan2(b.y - p.y, b.x - p.x)
      b.x += Math.cos(ang) * 40
      b.y += Math.sin(ang) * 40
      continue
    }

    if (w.archetype === 'carnivore' && b.kind === 'prey') {
      // eat prey — lunge grants a bigger reward
      w.boids.splice(i, 1)
      w.hunger = Math.min(1, w.hunger + 0.3)
      const gained = addScore(w, lunging ? 2 : 1)
      spawnBoom(w, b.x, b.y, '#22c55e', 28)
      w.particles.push({ x: b.x, y: b.y, r: b.r, a: 1, color: '#22c55e' })
      addFloatingText(w, b.x, b.y - 8, '+' + gained, '#22c55e')
      w.squash = 1.15
      w.stretch = 0.9
      if (w.phase === 'juvenile') w.growth = Math.min(1, w.growth + 0.18)
      continue
    }

    // carnivore LUNGE wins a rival duel; otherwise rival/predator contact hurts
    if (w.archetype === 'carnivore' && b.kind === 'rival' && lunging) {
      w.boids.splice(i, 1)
      const gained = addScore(w, 3)
      spawnBoom(w, b.x, b.y, '#f97316', 36)
      spawnSpark(w, b.x, b.y, '#f97316', 12)
      addFloatingText(w, b.x, b.y - 10, '+' + gained, '#f97316', 22)
      hitReact(w, { shake: 12, hitstop: 70, squashX: 1.2, squashY: 0.85 })
      continue
    }

    if (dangerous) {
      // damage from predator/rival
      w.health -= 0.18
      hitReact(w, { shake: 14, flash: '#ef4444', flashAlpha: 0.4, hitstop: 70, squashX: 0.85, squashY: 1.15 })
      w.combo = 0
      w.comboTimer = 0
      spawnBoom(w, p.x, p.y, '#ef4444', p.r * 2.4)
      spawnSpark(w, p.x, p.y, '#ef4444', 8)
      addFloatingText(w, p.x, p.y - p.r - 6, '-HP', '#ef4444', 16)
      // knockback
      const ang = Math.atan2(p.y - b.y, p.x - b.x)
      p.x += Math.cos(ang) * 22
      p.y += Math.sin(ang) * 22
      if (w.health <= 0) return
    }
  }
}

// ─── Input handlers (called by the view) ──
// Egg stage: holding warms; tapping a scavenger scares it.
export function handleEggPointerDown(w: World, x: number, y: number): void {
  if (w.phase !== 'egg') return
  // scare nearest scavenger near tap
  for (const b of w.boids) {
    if (b.kind !== 'scavenger') continue
    if (b.scared && b.scared > 0) continue
    if (Math.hypot(b.x - x, b.y - y) < 50) {
      b.scared = 1200
      const gained = addScore(w, 1)
      spawnBoom(w, b.x, b.y, '#fbbf24', 22)
      addFloatingText(w, b.x, b.y - 8, '+' + gained, '#fbbf24')
      return
    }
  }
  // otherwise warm the egg
  w.warmth = Math.min(1, w.warmth + 0.12)
  w.particles.push({ x: W / 2, y: H / 2 + 40, r: 10, a: 1, color: '#fbbf24' })
}

// Adult/juvenile tap ability (a quick tap, not a drag).
export function handleAbility(w: World, x: number, y: number): void {
  if (w.phase !== 'adult' && w.phase !== 'juvenile') return
  if (w.abilityCd > 0) return
  if (w.archetype === 'herbivore') {
    // CHARGE: directional speed burst; gore predators/rivals touched en route
    w.abilityCd = 900
    w.charging = 350
    w.goreCount = 0
    const dx = x - w.player.x
    const dy = y - w.player.y
    const d = Math.hypot(dx, dy) || 1
    w.player.vx += (dx / d) * 5.5
    w.player.vy += (dy / d) * 5.5
    if (Math.abs(dx) > 4) w.facing = dx > 0 ? 1 : -1
    w.squash = 0.85
    w.stretch = 1.2
    spawnBoom(w, w.player.x, w.player.y, '#fbbf24', 30)
    spawnSpark(w, w.player.x, w.player.y, '#fde68a', 8)
    w.shake = 6
  } else if (w.archetype === 'carnivore') {
    // LUNGE: stamina-gated dash; catches prey in path, wins rival duels
    if (w.energy < 0.25) {
      addFloatingText(w, w.player.x, w.player.y - w.player.r - 8, '...', '#fca5a5', 14)
      return
    }
    w.abilityCd = 350
    w.lungeTimer = 450
    w.energy -= 0.25
    w.energyLock = 1000
    const dx = x - w.player.x
    const dy = y - w.player.y
    const d = Math.hypot(dx, dy) || 1
    w.player.vx += (dx / d) * 4.5
    w.player.vy += (dy / d) * 4.5
    if (Math.abs(dx) > 4) w.facing = dx > 0 ? 1 : -1
    w.squash = 0.9
    w.stretch = 1.15
    spawnBoom(w, w.player.x, w.player.y, '#ef4444', 24)
    w.shake = 5
  } else if (w.archetype === 'flyer') {
    // FLAP: gain altitude, costs energy
    if (w.energy < 0.1) {
      addFloatingText(w, w.player.x, w.player.y - w.player.r - 8, '...', '#fca5a5', 14)
      return
    }
    w.abilityCd = 250
    w.altitude = Math.min(1, w.altitude + 0.28)
    w.energy -= 0.1
    w.player.vy -= 1.2 // small upward pop
    w.squash = 1.1
    w.stretch = 0.9
    spawnBoom(w, w.player.x, w.player.y + 12, '#bae6fd', 22)
  } else if (w.archetype === 'swimmer') {
    // DASH: burst in tap direction
    w.abilityCd = 350
    const dx = x - w.player.x
    const dy = y - w.player.y
    const d = Math.hypot(dx, dy) || 1
    w.player.vx += (dx / d) * 4
    w.player.vy += (dy / d) * 4
    w.squash = 0.9
    w.stretch = 1.2
    // backward bubble burst
    for (let i = 0; i < 6; i++) {
      const ang = Math.atan2(-dy, -dx) + rand(-0.4, 0.4)
      const sp = rand(1, 2.5)
      w.particles.push({
        x: w.player.x, y: w.player.y, r: rand(2, 4), a: 1, color: '#bae6fd', kind: 'spark',
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
      })
    }
  }
}

// Flyer DIVE (long-press): plummet and sweep up fish; hitting the ground hurts.
export function handleDive(w: World): void {
  if (w.phase !== 'adult' && w.phase !== 'juvenile') return
  if (w.archetype !== 'flyer') return
  if (w.abilityCd > 0) return
  w.abilityCd = 700
  w.diveTimer = 600
  w.player.vy += 5.5 // downward plummet
  w.squash = 0.8
  w.stretch = 1.25
  spawnBoom(w, w.player.x, w.player.y - 10, '#38bdf8', 20)
}

export function dismissFact(w: World): void {
  const next = w.factNext
  w.factText = ''
  if (next === 'juvenile') enterJuvenile(w)
  else if (next === 'adult') enterAdult(w)
  else if (next === 'over') {
    w.phase = 'over'
    w.ended = true
  } else if (next === 'win') {
    w.phase = 'win'
    w.ended = true
  } else if (next === 'continue') {
    // mid-stage interlude: resume the stage we were in
    w.phase = 'adult'
  } else {
    w.phase = next as Phase
  }
}

// ─── Draw ──
// color helpers
function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function lerpHex(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bl = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r},${g},${bl})`
}

// day/night palettes per archetype: [skyTopDay, skyBotDay, skyTopNight, skyBotNight, groundDay, groundNight]
const PALETTE: Record<Archetype, [string, string, string, string, string, string]> = {
  herbivore: ['#7ec850', '#d8ee9a', '#1b2a4a', '#2c3a5a', '#3f6b34', '#1f3a22'],
  carnivore: ['#e8a04a', '#f6dca8', '#2a1a3a', '#3a2a4a', '#7a5230', '#3a2a1a'],
  flyer: ['#4aa3e8', '#c5e8f7', '#16164a', '#2a2a5e', '#5a7c4a', '#26331f'],
  swimmer: ['#2bb8d6', '#0a4a6a', '#0a3a5a', '#04243a', '#0a3a4a', '#04202e'],
}

function drawSky(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  const p = PALETTE[w.archetype]
  const top = lerpHex(p[0], p[2], night)
  const bot = lerpHex(p[1], p[3], night)
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, top)
  g.addColorStop(1, bot)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
}

// parallax offset for distant silhouettes (subtle)
function parallax(w: World, strength: number): number {
  return (w.player.x - W / 2) * strength
}

function drawStars(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  if (night <= 0) return
  for (const s of w.decor.stars) {
    const tw = 0.6 + 0.4 * Math.sin(w.elapsed / 600 + s.a * 8)
    ctx.globalAlpha = Math.min(1, night * s.a * tw)
    ctx.fillStyle = '#eaf2ff'
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawSunMoon(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  // sun arcs across the day half, moon across the night half
  const isDay = night < 0.5
  const prog = isDay ? w.dayTime / 0.5 : (w.dayTime - 0.5) / 0.5
  const x = 40 + prog * (W - 80)
  const y = 110 - Math.sin(prog * Math.PI) * 70
  ctx.save()
  if (isDay) {
    const grd = ctx.createRadialGradient(x, y, 6, x, y, 60)
    grd.addColorStop(0, 'rgba(255,236,170,0.95)')
    grd.addColorStop(1, 'rgba(255,236,170,0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.arc(x, y, 60, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffe9a8'
    ctx.beginPath()
    ctx.arc(x, y, 18, 0, Math.PI * 2)
    ctx.fill()
  } else {
    ctx.fillStyle = '#e6ecff'
    ctx.beginPath()
    ctx.arc(x, y, 16, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = PALETTE[w.archetype][3]
    ctx.beginPath()
    ctx.arc(x + 6, y - 4, 13, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

function drawClouds(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  ctx.fillStyle = lerpHex('#ffffff', '#3a4a6a', night)
  ctx.globalAlpha = 0.85
  for (const c of w.decor.clouds) {
    const s = c.s
    ctx.beginPath()
    ctx.ellipse(c.x, c.y, 30 * s, 14 * s, 0, 0, Math.PI * 2)
    ctx.ellipse(c.x + 24 * s, c.y + 4 * s, 22 * s, 12 * s, 0, 0, Math.PI * 2)
    ctx.ellipse(c.x - 22 * s, c.y + 5 * s, 20 * s, 11 * s, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawTrees(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  const col = lerpHex('#2f5a2a', '#10231a', night)
  ctx.fillStyle = col
  const ox = parallax(w, 0.06)
  for (const t of w.decor.trees) {
    const x = t.x + ox
    // trunk
    ctx.fillRect(x - 3, t.y, 6, t.h * 0.4)
    // canopy
    ctx.beginPath()
    ctx.ellipse(x, t.y, t.w * 0.5, t.h * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawMesas(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  const col = lerpHex('#8a5a32', '#3a2418', night)
  ctx.fillStyle = col
  const ox = parallax(w, 0.05)
  for (const m of w.decor.mesas) {
    const x = m.x + ox
    ctx.beginPath()
    ctx.moveTo(x, m.y + m.h)
    ctx.lineTo(x + m.w * 0.15, m.y)
    ctx.lineTo(x + m.w * 0.85, m.y)
    ctx.lineTo(x + m.w, m.y + m.h)
    ctx.closePath()
    ctx.fill()
  }
}

function drawGrass(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  const col = lerpHex('#3f8f3a', '#1c4626', night)
  ctx.strokeStyle = col
  ctx.lineWidth = 2
  for (const g of w.decor.grass) {
    const sway = Math.sin(w.elapsed / 700 + g.x * 0.05) * 3
    ctx.beginPath()
    ctx.moveTo(g.x, g.y)
    ctx.quadraticCurveTo(g.x + sway, g.y - g.h * 0.6, g.x + sway * 1.4, g.y - g.h)
    ctx.stroke()
  }
}

function drawGround(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  const p = PALETTE[w.archetype]
  const col = lerpHex(p[4], p[5], night)
  const y0 = H - 56
  const g = ctx.createLinearGradient(0, y0, 0, H)
  g.addColorStop(0, col)
  g.addColorStop(1, lerpHex(p[5], '#000000', 0.3))
  ctx.fillStyle = g
  ctx.fillRect(0, y0, W, 56)
}

function drawThermals(ctx: CanvasRenderingContext2D, w: World): void {
  for (const th of w.decor.thermals) {
    const grd = ctx.createLinearGradient(0, H, 0, 0)
    grd.addColorStop(0, 'rgba(255,240,200,0.18)')
    grd.addColorStop(1, 'rgba(255,240,200,0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.moveTo(th.x - th.w / 2, H)
    ctx.lineTo(th.x + th.w / 2, H)
    ctx.lineTo(th.x + th.w / 6, 0)
    ctx.lineTo(th.x - th.w / 6, 0)
    ctx.closePath()
    ctx.fill()
  }
}

function drawLightRays(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  if (night > 0.4) return
  ctx.globalAlpha = (0.4 - night) * 0.5
  ctx.fillStyle = '#fff6d8'
  for (const r of w.decor.rays) {
    ctx.beginPath()
    ctx.moveTo(r.x, 0)
    ctx.lineTo(r.x + r.w, 0)
    ctx.lineTo(r.x + r.w * 1.6, H)
    ctx.lineTo(r.x + r.w * 0.6, H)
    ctx.closePath()
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawBubbles(ctx: CanvasRenderingContext2D, w: World): void {
  ctx.strokeStyle = 'rgba(220,245,255,0.5)'
  ctx.lineWidth = 1
  for (const b of w.decor.bubbles) {
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function drawDust(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  ctx.fillStyle = lerpHex('#f6e2b8', '#9a8a6a', night)
  for (const du of w.decor.dust) {
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.arc(du.x, du.y, du.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawSurface(ctx: CanvasRenderingContext2D, w: World): void {
  // shimmering water surface at the very top for swimmer
  ctx.fillStyle = 'rgba(180,235,255,0.25)'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for (let x = 0; x <= W; x += 12) {
    ctx.lineTo(x, 18 + Math.sin(w.elapsed / 250 + x * 0.06) * 4)
  }
  ctx.lineTo(W, 0)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = 'rgba(220,245,255,0.5)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  for (let x = 0; x <= W; x += 12) {
    const y = 18 + Math.sin(w.elapsed / 250 + x * 0.06) * 4
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawSeaweed(ctx: CanvasRenderingContext2D, w: World, night: number): void {
  ctx.strokeStyle = lerpHex('#1c6a4a', '#0a3326', night)
  ctx.lineWidth = 4
  for (let i = 0; i < 7; i++) {
    const x = (W / 7) * i + 30
    const sway = Math.sin(w.elapsed / 600 + i) * 10
    ctx.beginPath()
    ctx.moveTo(x, H)
    ctx.quadraticCurveTo(x + sway, H - 50, x + sway * 0.6, H - 90)
    ctx.stroke()
  }
}

// ── Procedural dinosaur models ──
// Instead of the rectangular card.webp art (which has no alpha and read as a
// colored disc / floating rectangle), we draw each dinosaur as a stylized
// canvas model: a body plan chosen from the species' slug + category, shaded
// with a naturalistic palette. The colored ring around the model still encodes
// the gameplay role (green = eat, red = avoid, orange = rival, blue = catch,
// purple = scavenger, gold = herd / you).
type ModelKey =
  | 'theropod'
  | 'ceratopsian'
  | 'sauropod'
  | 'hadrosaur'
  | 'flyer'
  | 'plesiosaur'
  | 'fish'
  | 'small-biped'

interface DinoPalette {
  body: string
  belly: string
  back: string
  detail: string
  eye: string
}

const DINO_PAL: Record<ModelKey, DinoPalette> = {
  theropod: { body: '#7c9b4a', belly: '#cfe0a0', back: '#4a6628', detail: '#3a4f22', eye: '#f7d34a' },
  ceratopsian: { body: '#8a9669', belly: '#c2c9a3', back: '#5f6a48', detail: '#ece4cc', eye: '#1c2230' },
  sauropod: { body: '#94a86b', belly: '#cdd9a8', back: '#62724a', detail: '#4d5a3a', eye: '#1c2230' },
  hadrosaur: { body: '#5aa07e', belly: '#a3ccba', back: '#3c7a5e', detail: '#2e6149', eye: '#1c2230' },
  flyer: { body: '#d8b88a', belly: '#ecd7b0', back: '#b8946a', detail: '#5b3d22', eye: '#1c2230' },
  plesiosaur: { body: '#3f7e8a', belly: '#84b3bc', back: '#2a5e6e', detail: '#1f4650', eye: '#1c2230' },
  fish: { body: '#aebfd0', belly: '#e3edf5', back: '#7d93a8', detail: '#3a4a5a', eye: '#1c2230' },
  'small-biped': { body: '#7a9b4a', belly: '#bcd29a', back: '#4f6b2c', detail: '#3a4f22', eye: '#f7d34a' },
}

const modelCache = new Map<string, ModelKey>()
function modelForSlug(slug: string): ModelKey {
  const cached = modelCache.get(slug)
  if (cached) return cached
  const d = bySlug(slug)
  const mass = d.dimensions.weightKg || 0
  let m: ModelKey
  if (slug === 'pteranodon') m = 'flyer'
  else if (slug === 'plesiosaurus') m = 'plesiosaur'
  else if (slug === 'triceratops') m = 'ceratopsian'
  else if (slug === 'tyrannosaurus-rex') m = 'theropod'
  else if (slug === 'compsognathus') m = 'small-biped'
  else if (d.category === 'carnivore') m = mass > 900 ? 'theropod' : 'small-biped'
  else if (d.category === 'herbivore') m = mass >= 8000 ? 'sauropod' : 'hadrosaur'
  else if (d.category === 'omnivore') m = 'small-biped'
  else m = 'small-biped'
  modelCache.set(slug, m)
  return m
}

// lighten (t>0) or darken (t<0) a #rrggbb color toward white/black
function shade(hex: string, t: number): string {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  if (t < 0) {
    const k = -t
    r = Math.round(r * (1 - k)); g = Math.round(g * (1 - k)); b = Math.round(b * (1 - k))
  } else {
    r = Math.round(r + (255 - r) * t); g = Math.round(g + (255 - g) * t); b = Math.round(b + (255 - b) * t)
  }
  return `rgb(${r},${g},${b})`
}

// a friendly cartoon eye: white sclera, colored pupil, glossy highlight
function drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, pal: DinoPalette): void {
  ctx.fillStyle = '#fff'
  ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = Math.max(0.6, rad * 0.18)
  ctx.stroke()
  ctx.fillStyle = pal.eye
  ctx.beginPath(); ctx.arc(x + rad * 0.16, y, rad * 0.58, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.beginPath(); ctx.arc(x - rad * 0.28, y - rad * 0.28, rad * 0.24, 0, Math.PI * 2); ctx.fill()
}

// Draw a dinosaur model centered at the current origin, fitting in a w×h box.
// Style: smooth bezier silhouette + vertical gradient body shading + dark
// outline (the unifying "storybook sticker" look) + soft belly patch + back
// spots + clean eye. `facing` flips horizontally (1 = right, -1 = left).
function drawDinoModel(
  ctx: CanvasRenderingContext2D,
  model: ModelKey,
  w: number,
  h: number,
  facing: number,
  pal: DinoPalette,
): void {
  ctx.save()
  ctx.scale(facing, 1)
  const out = shade(pal.body, -0.42)
  const lw = Math.max(1.4, w * 0.03)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  // one vertical light gradient reused across the body
  const bodyGrad = ctx.createLinearGradient(0, -0.4 * h, 0, 0.4 * h)
  bodyGrad.addColorStop(0, shade(pal.body, 0.18))
  bodyGrad.addColorStop(0.5, pal.body)
  bodyGrad.addColorStop(1, shade(pal.body, -0.2))
  const fillBody = () => {
    ctx.fillStyle = bodyGrad; ctx.fill()
    ctx.strokeStyle = out; ctx.lineWidth = lw; ctx.stroke()
  }
  const fillFlat = (c: string) => {
    ctx.fillStyle = c; ctx.fill()
    ctx.strokeStyle = out; ctx.lineWidth = lw; ctx.stroke()
  }
  // soft belly patch + back spots, drawn without outlines
  const belly = (bx: number, by: number, rx: number, ry: number, rot = 0) => {
    ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = pal.belly
    ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, rot, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }
  const spots = (pts: [number, number][], rx: number, ry: number) => {
    ctx.save(); ctx.globalAlpha = 0.4; ctx.fillStyle = shade(pal.back, 0.08)
    for (const [px, py] of pts) {
      ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
  }

  switch (model) {
    case 'fish': {
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, -0.2 * h)
      ctx.lineTo(-0.3 * w, -0.05 * h)
      ctx.quadraticCurveTo(-0.1 * w, -0.3 * h, 0.2 * w, -0.22 * h)
      ctx.quadraticCurveTo(0.38 * w, -0.08 * h, 0.38 * w, 0)
      ctx.quadraticCurveTo(0.38 * w, 0.08 * h, 0.2 * w, 0.22 * h)
      ctx.quadraticCurveTo(-0.1 * w, 0.3 * h, -0.3 * w, 0.05 * h)
      ctx.lineTo(-0.5 * w, 0.2 * h)
      ctx.closePath()
      fillBody()
      // dorsal fin
      ctx.fillStyle = shade(pal.back, 0.05)
      ctx.beginPath()
      ctx.moveTo(-0.05 * w, -0.18 * h); ctx.lineTo(0.06 * w, -0.34 * h); ctx.lineTo(0.14 * w, -0.16 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // pectoral fin
      ctx.beginPath()
      ctx.moveTo(0.02 * w, 0.08 * h); ctx.lineTo(-0.06 * w, 0.24 * h); ctx.lineTo(0.12 * w, 0.14 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // gill + belly
      ctx.strokeStyle = shade(pal.body, -0.35); ctx.lineWidth = Math.max(0.8, w * 0.012)
      ctx.beginPath(); ctx.arc(0.1 * w, 0, 0.1 * w, -1, 1); ctx.stroke()
      belly(0.08 * w, 0.1 * h, 0.16 * w, 0.08 * h)
      drawEye(ctx, 0.22 * w, -0.05 * h, Math.max(1.8, w * 0.03), pal)
      break
    }
    case 'plesiosaur': {
      // far flippers behind body
      ctx.fillStyle = shade(pal.body, -0.16)
      ctx.beginPath(); ctx.ellipse(-0.12 * w, 0.22 * h, 0.12 * w, 0.05 * h, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.ellipse(0.1 * w, 0.2 * h, 0.13 * w, 0.055 * h, 0.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      // body + tail + neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.46 * w, 0.16 * h)                                  // tail tip
      ctx.quadraticCurveTo(-0.2 * w, 0.08 * h, -0.16 * w, 0.12 * h)     // tail to body back
      ctx.quadraticCurveTo(0.06 * w, 0.26 * h, 0.2 * w, 0.14 * h)       // belly to shoulder
      ctx.quadraticCurveTo(0.26 * w, 0.0, 0.34 * w, -0.3 * h)           // neck rise
      ctx.quadraticCurveTo(0.4 * w, -0.42 * h, 0.46 * w, -0.38 * h)     // head top
      ctx.quadraticCurveTo(0.5 * w, -0.34 * h, 0.44 * w, -0.32 * h)     // snout
      ctx.quadraticCurveTo(0.3 * w, -0.26 * h, 0.22 * w, -0.06 * h)     // throat back down neck
      ctx.quadraticCurveTo(0.1 * w, 0.06 * h, -0.06 * w, 0.06 * h)      // chest
      ctx.quadraticCurveTo(-0.24 * w, 0.04 * h, -0.3 * w, 0.08 * h)     // belly under
      ctx.quadraticCurveTo(-0.4 * w, 0.1 * h, -0.46 * w, 0.16 * h)      // back to tail tip
      ctx.closePath()
      fillBody()
      belly(0.0, 0.16 * h, 0.16 * w, 0.07 * h)
      // mouth
      ctx.strokeStyle = shade(pal.body, -0.5); ctx.lineWidth = Math.max(1, w * 0.016)
      ctx.beginPath(); ctx.moveTo(0.34 * w, -0.34 * h); ctx.lineTo(0.46 * w, -0.34 * h); ctx.stroke()
      drawEye(ctx, 0.4 * w, -0.38 * h, Math.max(1.4, w * 0.022), pal)
      break
    }
    case 'flyer': {
      // far wing behind
      ctx.fillStyle = shade(pal.back, -0.05)
      ctx.beginPath()
      ctx.moveTo(0.04 * w, -0.04 * h)
      ctx.quadraticCurveTo(0.32 * w, -0.42 * h, 0.5 * w, -0.04 * h)
      ctx.quadraticCurveTo(0.26 * w, 0.06 * h, 0.04 * w, 0.02 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // body + near wing as one silhouette
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, -0.04 * h)                                   // near wing tip (left)
      ctx.quadraticCurveTo(-0.28 * w, -0.42 * h, -0.06 * w, -0.1 * h)   // wing membrane top to body
      ctx.quadraticCurveTo(-0.04 * w, 0.14 * h, 0.04 * w, 0.14 * h)     // body belly
      ctx.quadraticCurveTo(0.12 * w, 0.06 * h, 0.1 * w, -0.06 * h)      // chest to throat
      ctx.quadraticCurveTo(0.34 * w, -0.08 * h, 0.34 * w, -0.12 * h)    // beak top
      ctx.quadraticCurveTo(0.36 * w, -0.16 * h, 0.28 * w, -0.14 * h)    // beak tip
      ctx.quadraticCurveTo(0.12 * w, -0.08 * h, 0.04 * w, -0.04 * h)    // under beak to wing root
      ctx.quadraticCurveTo(-0.26 * w, -0.42 * h, -0.5 * w, -0.04 * h)   // near wing membrane back to tip
      ctx.closePath()
      fillBody()
      // crest
      ctx.fillStyle = pal.detail
      ctx.beginPath()
      ctx.moveTo(-0.02 * w, -0.06 * h); ctx.lineTo(-0.26 * w, -0.22 * h); ctx.lineTo(-0.04 * w, -0.02 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // wing strut lines
      ctx.strokeStyle = shade(pal.detail, -0.2); ctx.lineWidth = Math.max(1, w * 0.014)
      ctx.beginPath(); ctx.moveTo(-0.04 * w, -0.02 * h); ctx.lineTo(-0.46 * w, -0.06 * h); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0.04 * w, -0.02 * h); ctx.lineTo(0.46 * w, -0.06 * h); ctx.stroke()
      drawEye(ctx, 0.06 * w, -0.05 * h, Math.max(1.3, w * 0.02), pal)
      break
    }
    case 'theropod': {
      // far leg (behind body)
      ctx.fillStyle = shade(pal.body, -0.18)
      ctx.beginPath()
      ctx.moveTo(-0.02 * w, 0.14 * h); ctx.lineTo(-0.04 * w, 0.4 * h)
      ctx.lineTo(0.06 * w, 0.4 * h); ctx.lineTo(0.08 * w, 0.14 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // body + tail + neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, 0.18 * h)                                    // tail tip
      ctx.quadraticCurveTo(-0.3 * w, -0.08 * h, -0.12 * w, -0.08 * h)   // upper tail to hip
      ctx.quadraticCurveTo(0.02 * w, -0.18 * h, 0.1 * w, -0.14 * h)     // back to shoulder
      ctx.quadraticCurveTo(0.16 * w, -0.3 * h, 0.24 * w, -0.32 * h)     // neck to back of head
      ctx.quadraticCurveTo(0.32 * w, -0.36 * h, 0.4 * w, -0.3 * h)      // crown
      ctx.quadraticCurveTo(0.48 * w, -0.24 * h, 0.48 * w, -0.16 * h)    // snout tip
      ctx.quadraticCurveTo(0.46 * w, -0.1 * h, 0.36 * w, -0.08 * h)     // jaw front
      ctx.quadraticCurveTo(0.2 * w, -0.04 * h, 0.14 * w, 0.06 * h)      // throat to chest
      ctx.quadraticCurveTo(0.1 * w, 0.22 * h, -0.04 * w, 0.24 * h)      // belly
      ctx.quadraticCurveTo(-0.2 * w, 0.24 * h, -0.34 * w, 0.26 * h)     // under tail
      ctx.quadraticCurveTo(-0.44 * w, 0.26 * h, -0.5 * w, 0.18 * h)     // back to tail tip
      ctx.closePath()
      fillBody()
      // mouth line + teeth
      ctx.strokeStyle = shade(pal.body, -0.5); ctx.lineWidth = Math.max(1, w * 0.016)
      ctx.beginPath(); ctx.moveTo(0.22 * w, -0.1 * h); ctx.lineTo(0.48 * w, -0.13 * h); ctx.stroke()
      ctx.fillStyle = '#fff'
      for (let i = 0; i < 3; i++) {
        const tx = (0.34 + i * 0.05) * w
        ctx.beginPath(); ctx.moveTo(tx, -0.13 * h); ctx.lineTo(tx + 0.02 * w, -0.07 * h); ctx.lineTo(tx + 0.04 * w, -0.13 * h); ctx.closePath(); ctx.fill()
      }
      belly(0.02 * w, 0.16 * h, 0.13 * w, 0.06 * h, -0.1)
      spots([[-0.16 * w, 0.02 * h], [-0.04 * w, -0.04 * h], [0.06 * w, -0.08 * h]], 0.03 * w, 0.02 * h)
      // near leg + foot
      ctx.fillStyle = pal.body
      ctx.beginPath()
      ctx.moveTo(0.06 * w, 0.14 * h); ctx.lineTo(0.04 * w, 0.4 * h)
      ctx.lineTo(0.14 * w, 0.4 * h); ctx.lineTo(0.16 * w, 0.14 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      ctx.fillStyle = shade(pal.body, -0.1)
      ctx.beginPath(); ctx.ellipse(0.09 * w, 0.4 * h, 0.06 * w, 0.022 * h, 0, 0, Math.PI * 2); ctx.fill()
      // tiny arm
      ctx.strokeStyle = out; ctx.lineWidth = Math.max(1.3, w * 0.018)
      ctx.beginPath(); ctx.moveTo(0.1 * w, 0.0); ctx.lineTo(0.14 * w, 0.06 * h); ctx.lineTo(0.11 * w, 0.1 * h); ctx.stroke()
      drawEye(ctx, 0.3 * w, -0.24 * h, Math.max(1.5, w * 0.024), pal)
      break
    }
    case 'ceratopsian': {
      // far legs
      ctx.fillStyle = shade(pal.body, -0.18)
      for (const lx of [-0.12, 0.0]) {
        ctx.beginPath()
        ctx.moveTo(lx * w, 0.24 * h); ctx.lineTo((lx - 0.01) * w, 0.42 * h)
        ctx.lineTo((lx + 0.07) * w, 0.42 * h); ctx.lineTo((lx + 0.08) * w, 0.24 * h); ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
      // frill (behind head, drawn before head silhouette)
      ctx.fillStyle = shade(pal.body, 0.05)
      ctx.beginPath(); ctx.ellipse(0.24 * w, -0.12 * h, 0.18 * w, 0.2 * h, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.fillStyle = shade(pal.back, 0.05)
      ctx.beginPath(); ctx.ellipse(0.24 * w, -0.1 * h, 0.12 * w, 0.14 * h, -0.2, 0, Math.PI * 2); ctx.fill()
      // body + tail + neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.46 * w, 0.24 * h)                                   // tail tip
      ctx.quadraticCurveTo(-0.22 * w, 0.08 * h, -0.14 * w, 0.1 * h)     // tail to hip
      ctx.quadraticCurveTo(0.08 * w, 0.28 * h, 0.2 * w, 0.16 * h)       // belly to chest
      ctx.quadraticCurveTo(0.28 * w, 0.08 * h, 0.3 * w, 0.0)            // chest to jaw
      ctx.quadraticCurveTo(0.34 * w, -0.06 * h, 0.28 * w, -0.08 * h)    // jaw/beak
      ctx.quadraticCurveTo(0.22 * w, -0.04 * h, 0.16 * w, 0.0)          // cheek back to neck
      ctx.quadraticCurveTo(0.1 * w, 0.08 * h, -0.04 * w, 0.1 * h)       // neck to belly
      ctx.quadraticCurveTo(-0.2 * w, 0.1 * h, -0.3 * w, 0.14 * h)       // belly under
      ctx.quadraticCurveTo(-0.4 * w, 0.16 * h, -0.46 * w, 0.24 * h)     // back to tail tip
      ctx.closePath()
      fillBody()
      // horns (ivory)
      ctx.fillStyle = pal.detail
      const horn = (bx: number, by: number, tx: number, ty: number) => {
        ctx.beginPath()
        ctx.moveTo(bx - 0.03 * w, by); ctx.lineTo(tx, ty); ctx.lineTo(bx + 0.03 * w, by); ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
      horn(0.26 * w, -0.04 * h, 0.34 * w, -0.32 * h)
      horn(0.32 * w, -0.02 * h, 0.42 * w, -0.28 * h)
      horn(0.34 * w, 0.04 * h, 0.44 * w, -0.06 * h)
      // beak
      ctx.fillStyle = shade(pal.detail, -0.1)
      ctx.beginPath()
      ctx.moveTo(0.28 * w, 0.0); ctx.lineTo(0.34 * w, 0.06 * h); ctx.lineTo(0.28 * w, 0.06 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      belly(0.02 * w, 0.2 * h, 0.15 * w, 0.07 * h)
      spots([[-0.18 * w, 0.04 * h], [-0.06 * w, 0.0], [0.06 * w, -0.02 * h]], 0.035 * w, 0.022 * h)
      // near legs
      ctx.fillStyle = pal.body
      for (const lx of [0.06, 0.16]) {
        ctx.beginPath()
        ctx.moveTo(lx * w, 0.24 * h); ctx.lineTo((lx - 0.01) * w, 0.42 * h)
        ctx.lineTo((lx + 0.07) * w, 0.42 * h); ctx.lineTo((lx + 0.08) * w, 0.24 * h); ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
      drawEye(ctx, 0.32 * w, -0.04 * h, Math.max(1.3, w * 0.02), pal)
      break
    }
    case 'sauropod': {
      // far legs
      ctx.fillStyle = shade(pal.body, -0.18)
      for (const lx of [-0.14, 0.02, 0.16]) {
        ctx.beginPath()
        ctx.moveTo(lx * w, 0.24 * h); ctx.lineTo((lx - 0.01) * w, 0.42 * h)
        ctx.lineTo((lx + 0.07) * w, 0.42 * h); ctx.lineTo((lx + 0.08) * w, 0.24 * h); ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
      // body + tail + long neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, 0.26 * h)                                    // tail tip
      ctx.quadraticCurveTo(-0.24 * w, 0.1 * h, -0.16 * w, 0.12 * h)     // tail to hip
      ctx.quadraticCurveTo(0.1 * w, 0.3 * h, 0.24 * w, 0.16 * h)        // belly to shoulder
      ctx.quadraticCurveTo(0.3 * w, -0.1 * h, 0.36 * w, -0.4 * h)       // long neck rise
      ctx.quadraticCurveTo(0.4 * w, -0.46 * h, 0.44 * w, -0.44 * h)     // head top
      ctx.quadraticCurveTo(0.48 * w, -0.4 * h, 0.42 * w, -0.38 * h)     // snout
      ctx.quadraticCurveTo(0.28 * w, -0.3 * h, 0.22 * w, -0.06 * h)     // throat down neck
      ctx.quadraticCurveTo(0.12 * w, 0.08 * h, -0.04 * w, 0.1 * h)      // chest
      ctx.quadraticCurveTo(-0.2 * w, 0.12 * h, -0.32 * w, 0.16 * h)     // belly under
      ctx.quadraticCurveTo(-0.42 * w, 0.18 * h, -0.5 * w, 0.26 * h)     // back to tail tip
      ctx.closePath()
      fillBody()
      belly(0.02 * w, 0.2 * h, 0.18 * w, 0.08 * h)
      spots([[-0.18 * w, 0.04 * h], [-0.06 * w, 0.0], [0.08 * w, -0.02 * h], [0.18 * w, -0.06 * h]], 0.04 * w, 0.025 * h)
      // near legs
      ctx.fillStyle = pal.body
      for (const lx of [-0.06, 0.1]) {
        ctx.beginPath()
        ctx.moveTo(lx * w, 0.24 * h); ctx.lineTo((lx - 0.01) * w, 0.42 * h)
        ctx.lineTo((lx + 0.07) * w, 0.42 * h); ctx.lineTo((lx + 0.08) * w, 0.24 * h); ctx.closePath()
        ctx.fill(); ctx.stroke()
      }
      drawEye(ctx, 0.4 * w, -0.44 * h, Math.max(1.2, w * 0.018), pal)
      break
    }
    case 'hadrosaur': {
      // far leg
      ctx.fillStyle = shade(pal.body, -0.18)
      ctx.beginPath()
      ctx.moveTo(-0.02 * w, 0.2 * h); ctx.lineTo(-0.04 * w, 0.42 * h)
      ctx.lineTo(0.06 * w, 0.42 * h); ctx.lineTo(0.08 * w, 0.2 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // body + tail + neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, 0.2 * h)                                     // tail tip
      ctx.quadraticCurveTo(-0.26 * w, -0.04 * h, -0.1 * w, -0.06 * h)   // tail to hip
      ctx.quadraticCurveTo(0.04 * w, -0.18 * h, 0.12 * w, -0.12 * h)    // back to shoulder
      ctx.quadraticCurveTo(0.2 * w, -0.26 * h, 0.26 * w, -0.26 * h)     // neck to back of head
      ctx.quadraticCurveTo(0.34 * w, -0.3 * h, 0.4 * w, -0.22 * h)      // crown
      ctx.quadraticCurveTo(0.48 * w, -0.16 * h, 0.46 * w, -0.1 * h)     // snout/beak
      ctx.quadraticCurveTo(0.42 * w, -0.06 * h, 0.34 * w, -0.06 * h)    // jaw
      ctx.quadraticCurveTo(0.22 * w, -0.02 * h, 0.16 * w, 0.08 * h)     // throat to chest
      ctx.quadraticCurveTo(0.12 * w, 0.22 * h, -0.02 * w, 0.24 * h)     // belly
      ctx.quadraticCurveTo(-0.2 * w, 0.24 * h, -0.34 * w, 0.26 * h)     // under tail
      ctx.quadraticCurveTo(-0.44 * w, 0.26 * h, -0.5 * w, 0.2 * h)      // back to tail tip
      ctx.closePath()
      fillBody()
      // crest
      ctx.fillStyle = pal.detail
      ctx.beginPath()
      ctx.moveTo(0.22 * w, -0.24 * h); ctx.lineTo(0.14 * w, -0.36 * h); ctx.lineTo(0.28 * w, -0.22 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // beak line
      ctx.strokeStyle = shade(pal.body, -0.5); ctx.lineWidth = Math.max(1, w * 0.014)
      ctx.beginPath(); ctx.moveTo(0.34 * w, -0.06 * h); ctx.lineTo(0.46 * w, -0.1 * h); ctx.stroke()
      belly(0.04 * w, 0.18 * h, 0.13 * w, 0.06 * h, -0.2)
      spots([[-0.16 * w, 0.02 * h], [-0.04 * w, -0.06 * h], [0.06 * w, -0.1 * h]], 0.03 * w, 0.02 * h)
      // near leg + arm
      ctx.fillStyle = pal.body
      ctx.beginPath()
      ctx.moveTo(0.06 * w, 0.2 * h); ctx.lineTo(0.04 * w, 0.42 * h)
      ctx.lineTo(0.14 * w, 0.42 * h); ctx.lineTo(0.16 * w, 0.2 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      ctx.strokeStyle = out; ctx.lineWidth = Math.max(1.2, w * 0.016)
      ctx.beginPath(); ctx.moveTo(0.1 * w, 0.06 * h); ctx.lineTo(0.14 * w, 0.12 * h); ctx.stroke()
      drawEye(ctx, 0.3 * w, -0.22 * h, Math.max(1.3, w * 0.02), pal)
      break
    }
    case 'small-biped':
    default: {
      // far leg
      ctx.fillStyle = shade(pal.body, -0.18)
      ctx.beginPath()
      ctx.moveTo(0.0, 0.16 * h); ctx.lineTo(-0.02 * w, 0.4 * h)
      ctx.lineTo(0.05 * w, 0.4 * h); ctx.lineTo(0.06 * w, 0.16 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      // body + long tail + neck + head silhouette
      ctx.beginPath()
      ctx.moveTo(-0.5 * w, 0.18 * h)                                    // tail tip
      ctx.quadraticCurveTo(-0.3 * w, -0.06 * h, -0.1 * w, -0.06 * h)    // upper tail to hip
      ctx.quadraticCurveTo(0.04 * w, -0.16 * h, 0.1 * w, -0.12 * h)     // back to shoulder
      ctx.quadraticCurveTo(0.18 * w, -0.28 * h, 0.26 * w, -0.3 * h)     // neck to head
      ctx.quadraticCurveTo(0.34 * w, -0.34 * h, 0.4 * w, -0.28 * h)     // crown
      ctx.quadraticCurveTo(0.46 * w, -0.22 * h, 0.42 * w, -0.16 * h)    // snout
      ctx.quadraticCurveTo(0.38 * w, -0.12 * h, 0.3 * w, -0.1 * h)      // jaw
      ctx.quadraticCurveTo(0.18 * w, -0.04 * h, 0.12 * w, 0.06 * h)     // throat to chest
      ctx.quadraticCurveTo(0.08 * w, 0.2 * h, -0.04 * w, 0.22 * h)      // belly
      ctx.quadraticCurveTo(-0.2 * w, 0.22 * h, -0.34 * w, 0.24 * h)     // under tail
      ctx.quadraticCurveTo(-0.44 * w, 0.24 * h, -0.5 * w, 0.18 * h)     // back to tail tip
      ctx.closePath()
      fillBody()
      // mouth line
      ctx.strokeStyle = shade(pal.body, -0.5); ctx.lineWidth = Math.max(0.9, w * 0.013)
      ctx.beginPath(); ctx.moveTo(0.2 * w, -0.1 * h); ctx.lineTo(0.42 * w, -0.14 * h); ctx.stroke()
      belly(0.03 * w, 0.14 * h, 0.12 * w, 0.05 * h, -0.15)
      spots([[-0.14 * w, 0.0], [-0.02 * w, -0.06 * h], [0.06 * w, -0.1 * h]], 0.028 * w, 0.018 * h)
      // near leg
      ctx.fillStyle = pal.body
      ctx.beginPath()
      ctx.moveTo(0.06 * w, 0.16 * h); ctx.lineTo(0.04 * w, 0.4 * h)
      ctx.lineTo(0.12 * w, 0.4 * h); ctx.lineTo(0.13 * w, 0.16 * h); ctx.closePath()
      ctx.fill(); ctx.stroke()
      ctx.fillStyle = shade(pal.body, -0.1)
      ctx.beginPath(); ctx.ellipse(0.08 * w, 0.4 * h, 0.05 * w, 0.02 * h, 0, 0, Math.PI * 2); ctx.fill()
      drawEye(ctx, 0.3 * w, -0.24 * h, Math.max(1.3, w * 0.02), pal)
      break
    }
  }
  ctx.restore()
}

// entity: shadow + colored gameplay halo + procedural dinosaur model + ring.
function drawEntity(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  slug: string,
  ring: string,
  facing: number,
  bob: number,
  isPlayer = false,
  glow = 0,
  kind?: Boid['kind'],
  sx = 1,
  sy = 1,
): void {
  const model: ModelKey = kind === 'fish' ? 'fish' : modelForSlug(slug)
  const w = r * 2.4
  const h = r * 1.95
  const cx = x
  const cy = y + bob

  // soft ground shadow
  const shY = y + r * 0.92
  const shGrad = ctx.createRadialGradient(x, shY, r * 0.1, x, shY, r * 1.1)
  shGrad.addColorStop(0, 'rgba(0,0,0,0.32)')
  shGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = shGrad
  ctx.beginPath()
  ctx.ellipse(x, shY, r * 1.0, r * 0.34, 0, 0, Math.PI * 2)
  ctx.fill()

  // colored gameplay halo (green eat / red avoid / blue catch / purple scavenger / gold herd)
  const halo = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.55)
  halo.addColorStop(0, ring + (glow > 0 ? '55' : '33'))
  halo.addColorStop(1, ring + '00')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, r * 1.55, 0, Math.PI * 2)
  ctx.fill()

  if (glow > 0) {
    const g = ctx.createRadialGradient(cx, cy, r, cx, cy, r + 18 + glow * 12)
    g.addColorStop(0, ring + 'aa')
    g.addColorStop(1, ring + '00')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(cx, cy, r + 18 + glow * 12, 0, Math.PI * 2)
    ctx.fill()
  }

  // palette — scavengers get a purple tint to match their role ring
  let pal = DINO_PAL[model]
  if (kind === 'scavenger') {
    pal = { body: '#9a7bbf', belly: '#c9b5e0', back: '#6a4f8f', detail: '#4a3470', eye: '#f7d34a' }
  }

  // the dinosaur model itself (squash/stretch applied around the body center only)
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(sx, sy)
  drawDinoModel(ctx, model, w, h, facing, pal)
  ctx.restore()

  // thin gameplay ring outline
  ctx.strokeStyle = ring
  ctx.globalAlpha = 0.85
  ctx.lineWidth = isPlayer ? 3 : 2
  ctx.beginPath()
  ctx.arc(cx, cy, r * 1.28, 0, Math.PI * 2)
  ctx.stroke()
  ctx.globalAlpha = 1

  if (isPlayer) {
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    ctx.arc(cx, cy, r * 1.45, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
  }
}

function drawPlant(ctx: CanvasRenderingContext2D, fd: { x: number; y: number }, sway: number): void {
  // a little fern bush
  ctx.strokeStyle = '#16a34a'
  ctx.lineWidth = 2
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath()
    ctx.moveTo(fd.x, fd.y + 6)
    ctx.quadraticCurveTo(fd.x + i * 4 + sway, fd.y - 6, fd.x + i * 6 + sway * 1.4, fd.y - 14)
    ctx.stroke()
  }
  ctx.fillStyle = '#22c55e'
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath()
    ctx.arc(fd.x + i * 6 + sway * 1.4, fd.y - 14, 4, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.fillStyle = '#4ade80'
  ctx.beginPath()
  ctx.arc(fd.x, fd.y - 4, 5, 0, Math.PI * 2)
  ctx.fill()
}

export function draw(w: World, ctx: CanvasRenderingContext2D): void {
  const night = nightFactor(w)
  ctx.save()
  if (w.shake > 0 && !reducedMotion) {
    ctx.translate((Math.random() - 0.5) * w.shake, (Math.random() - 0.5) * w.shake)
  }

  // ── sky / water base ──
  drawSky(ctx, w, night)

  // ── habitat-specific backdrop layers ──
  if (w.archetype === 'flyer') {
    drawStars(ctx, w, night)
    drawSunMoon(ctx, w, night)
    drawClouds(ctx, w, night)
    drawThermals(ctx, w)
    drawGround(ctx, w, night)
  } else if (w.archetype === 'swimmer') {
    drawLightRays(ctx, w, night)
    drawSeaweed(ctx, w, night)
    drawBubbles(ctx, w)
    drawSurface(ctx, w)
  } else if (w.archetype === 'herbivore') {
    drawStars(ctx, w, night)
    drawSunMoon(ctx, w, night)
    drawTrees(ctx, w, night)
    drawGround(ctx, w, night)
    drawGrass(ctx, w, night)
  } else {
    // carnivore — plains / scrub
    drawStars(ctx, w, night)
    drawSunMoon(ctx, w, night)
    drawMesas(ctx, w, night)
    drawGround(ctx, w, night)
    drawDust(ctx, w, night)
  }

  // ── food (plants) ──
  const sway = Math.sin(w.elapsed / 600) * 3
  for (const fd of w.food) drawPlant(ctx, fd, sway)

  // ── egg ──
  if (w.phase === 'egg') drawEgg(w, ctx)

  // ── boids ──
  const bobAmp = w.archetype === 'flyer' ? 3 : w.archetype === 'swimmer' ? 2.5 : 1.2
  for (const b of w.boids) {
    let ring = '#94a3b8'
    if (b.kind === 'predator') ring = '#ef4444'
    else if (b.kind === 'rival') ring = '#f97316'
    else if (b.kind === 'prey') ring = '#22c55e'
    else if (b.kind === 'fish') ring = '#38bdf8'
    else if (b.kind === 'scavenger') ring = '#a78bfa'
    else if (b.kind === 'herd') ring = '#fbbf24'
    const facing = b.vx > 0.1 ? 1 : b.vx < -0.1 ? -1 : 1
    const bob = Math.sin(w.elapsed / 320 + b.x * 0.04) * bobAmp
    const glow = b.kind === 'scavenger' && (!b.scared || b.scared <= 0) ? 0.4 : 0
    drawEntity(ctx, b.x, b.y, b.r, b.slug, ring, facing, bob, false, glow, b.kind)
  }

  // ── player (not in egg stage) ──
  if (w.phase !== 'egg') {
    const bob = Math.sin(w.elapsed / 300) * bobAmp
    // motion trail (flyer/swimmer) — translucent ellipses, cheap
    if (w.trail.length && !reducedMotion) {
      for (const s of w.trail) {
        const age = (w.elapsed - s.t) / 360
        const a = Math.max(0, 0.26 * (1 - age))
        if (a <= 0) continue
        ctx.globalAlpha = a
        ctx.fillStyle = '#fbbf24'
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, w.player.r * 0.8, w.player.r * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    drawEntity(ctx, w.player.x, w.player.y, w.player.r, w.species.slug, '#fbbf24', w.facing, bob, true, 0, undefined, w.squash, w.stretch)
    // altitude indicator ring for flyer
    if (w.archetype === 'flyer') {
      ctx.globalAlpha = 0.45
      ctx.strokeStyle = '#38bdf8'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(w.player.x, w.player.y + bob, w.player.r + 12 + w.altitude * 12, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    // target hint when hungry
    if (!reducedMotion && w.hunger < 0.3) {
      let target: { x: number; y: number } | null = null
      let bd = 260
      if (w.archetype === 'herbivore') {
        for (const fd of w.food) {
          const d = Math.hypot(fd.x - w.player.x, fd.y - w.player.y)
          if (d < bd) { bd = d; target = fd }
        }
      } else {
        const want: Boid['kind'] = w.archetype === 'carnivore' ? 'prey' : 'fish'
        for (const b of w.boids) {
          if (b.kind !== want) continue
          const d = Math.hypot(b.x - w.player.x, b.y - w.player.y)
          if (d < bd) { bd = d; target = b }
        }
      }
      if (target) {
        const pulse = 0.5 + 0.5 * Math.sin(w.elapsed / 200)
        ctx.globalAlpha = 0.5 + pulse * 0.4
        ctx.fillStyle = '#fde047'
        ctx.font = '18px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('👇', target.x, target.y - 26 - pulse * 4)
        ctx.globalAlpha = 1
        ctx.textAlign = 'start'
      }
    }
  }

  // ── particles (ring / boom / spark) ──
  for (const p of w.particles) {
    const a = Math.max(0, p.a)
    if (p.kind === 'boom') {
      ctx.globalAlpha = a
      ctx.fillStyle = p.color
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = a * 0.7
      ctx.fillStyle = '#ffffff'
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2); ctx.fill()
    } else if (p.kind === 'spark') {
      ctx.globalAlpha = a
      ctx.fillStyle = p.color
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
    } else {
      ctx.globalAlpha = a
      ctx.strokeStyle = p.color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * (1.6 - a * 0.5) * 1.5, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  ctx.globalAlpha = 1

  // ── floating score texts ──
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const t of w.floatingTexts) {
    const a = Math.max(0, t.life / t.maxLife)
    ctx.globalAlpha = a
    ctx.font = `bold ${t.size}px system-ui, sans-serif`
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillText(t.text, t.x + 1, t.y + 1)
    ctx.fillStyle = t.color
    ctx.fillText(t.text, t.x, t.y)
  }
  ctx.globalAlpha = 1
  ctx.textAlign = 'start'
  ctx.textBaseline = 'alphabetic'

  // ── vignette ──
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75)
  vg.addColorStop(0, 'rgba(0,0,0,0)')
  vg.addColorStop(1, 'rgba(0,0,0,0.35)')
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, W, H)

  // ── damage / event flash ──
  if (w.flash.alpha > 0) {
    ctx.globalAlpha = w.flash.alpha
    ctx.fillStyle = w.flash.color
    ctx.fillRect(0, 0, W, H)
    ctx.globalAlpha = 1
  }

  ctx.restore()
}

function drawEgg(w: World, ctx: CanvasRenderingContext2D): void {
  const ex = W / 2
  const ey = H / 2 + 40
  const pulse = 0.5 + 0.5 * Math.sin(w.elapsed / 300)

  // warmth aura — bigger & warmer when warm
  if (w.warmth > 0.05) {
    const ar = 60 + w.warmth * 30 + pulse * 6
    const g = ctx.createRadialGradient(ex, ey, 20, ex, ey, ar)
    g.addColorStop(0, `rgba(255,180,60,${0.25 * w.warmth})`)
    g.addColorStop(1, 'rgba(255,180,60,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(ex, ey, ar, 0, Math.PI * 2)
    ctx.fill()
  }

  // nest — woven twigs
  ctx.fillStyle = '#5b3417'
  ctx.beginPath()
  ctx.ellipse(ex, ey + 30, 78, 26, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#8b5a2b'
  ctx.lineWidth = 3
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2
    ctx.beginPath()
    ctx.ellipse(ex + Math.cos(a) * 70, ey + 30 + Math.sin(a) * 20, 12, 5, a, 0, Math.PI * 2)
    ctx.stroke()
  }
  // nest rim shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)'
  ctx.beginPath()
  ctx.ellipse(ex, ey + 34, 60, 16, 0, 0, Math.PI * 2)
  ctx.fill()

  // egg shell with shading — tint shifts white → cold blue as warmth drops
  const cold = 1 - w.warmth
  const baseTop = lerpHex('#fff7e6', '#cfe0ff', cold)
  const baseBot = lerpHex('#e9d6b0', '#9fb6da', cold)
  const grd = ctx.createLinearGradient(ex, ey - 44, ex, ey + 44)
  grd.addColorStop(0, baseTop)
  grd.addColorStop(1, baseBot)
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.ellipse(ex, ey, 34, 44, 0, 0, Math.PI * 2)
  ctx.fill()
  // specular highlight
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.beginPath()
  ctx.ellipse(ex - 10, ey - 18, 9, 14, -0.3, 0, Math.PI * 2)
  ctx.fill()
  // outline
  ctx.strokeStyle = 'rgba(120,80,30,0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.ellipse(ex, ey, 34, 44, 0, 0, Math.PI * 2)
  ctx.stroke()
  // spots
  ctx.fillStyle = 'rgba(150,90,30,0.6)'
  for (const [sx, sy] of [[-10, -8], [8, 4], [-4, 14], [12, -14], [-14, 6]]) {
    ctx.beginPath()
    ctx.arc(ex + sx, ey + sy, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // cracks that grow toward hatching
  const crack = Math.min(1, w.t / EGG_DURATION)
  if (crack > 0.4) {
    const k = (crack - 0.4) / 0.6
    ctx.strokeStyle = `rgba(60,40,20,${0.4 + k * 0.5})`
    ctx.lineWidth = 2
    const cracks = [
      [[-18, -20], [-6, -4], [-12, 10], [2, 24]],
      [[14, -22], [6, -2], [16, 14]],
    ]
    for (const seg of cracks) {
      ctx.beginPath()
      ctx.moveTo(ex + seg[0][0], ey + seg[0][1])
      for (let i = 1; i < seg.length; i++) ctx.lineTo(ex + seg[i][0], ey + seg[i][1])
      ctx.stroke()
    }
    // near-hatch glow from inside
    if (crack > 0.75) {
      ctx.globalAlpha = (crack - 0.75) * 4
      ctx.fillStyle = 'rgba(255,220,120,0.8)'
      for (const seg of cracks) {
        const m = seg[Math.floor(seg.length / 2)]
        ctx.beginPath()
        ctx.arc(ex + m[0], ey + m[1], 3 + pulse * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
  }

  // "keep warm" hint arrow when cold
  if (w.warmth < 0.35) {
    ctx.globalAlpha = 0.5 + pulse * 0.4
    ctx.fillStyle = '#fbbf24'
    ctx.font = '20px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('👆', ex, ey - 60 + pulse * 4)
    ctx.globalAlpha = 1
  }
}