<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

// ─── Types ────────────────────────────────────────────────────────────────────
type DinoKind  = 'trex' | 'triceratops' | 'diplodocus'
type AnimState = 'walk' | 'eat' | 'play' | 'sleep' | 'dead'
type Stage     = 'baby' | 'juvenile' | 'teen' | 'adult'
type Phase        = 'select' | 'playing' | 'grown' | 'dead'
type Difficulty    = 'easy' | 'medium' | 'hard'
type Mood           = 'happy' | 'neutral' | 'sad' | 'angry' | 'sick' | 'sleeping' | 'dead'
type HealthStatus   = 'healthy' | 'sick' | 'critical'
type EventKind      = 'sickness' | 'found_item' | 'scared' | 'happy_surprise' | 'lucky'
type ReactionAnim   = 'none' | 'bounce' | 'sparkle' | 'tears' | 'shake' | 'heart'

interface LogEntry {
  id: number
  text: string
  time: number
  icon: string
  category: 'action' | 'event' | 'warning' | 'life' | 'death'
}

interface EventDef {
  kind: EventKind
  weight: number
  statEffects: Partial<Record<'hunger' | 'happiness' | 'energy' | 'health', number>>
  msgKey: string
  icon: string
  reaction: ReactionAnim
  reactionMs: number
}

// ─── Canvas ───────────────────────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
const DISP_W = 560
const DISP_H = 320
const ART_W = 280
const ART_H = 160
const ART_GROUND = 130

const STAGE_SCALE: Record<Stage, number> = { baby: 1, juvenile: 2, teen: 2, adult: 3 }

// ─── Reactive state ───────────────────────────────────────────────────────────
const phase      = ref<Phase>('select')
const dinoKind   = ref<DinoKind>('trex')
const difficulty = ref<Difficulty>('medium')
const hunger    = ref(80)
const happiness = ref(80)
const energy    = ref(80)
const health    = ref(100)
const age       = ref(0)
const ticks     = ref(0)

const eventLog      = ref<LogEntry[]>([])
const showEventLog  = ref(false)
const reactionAnim  = ref<ReactionAnim>('none')

// ─── Computed ─────────────────────────────────────────────────────────────────
const stageName = computed<Stage>(() => {
  if (age.value < 3) return 'baby'
  if (age.value < 6) return 'juvenile'
  if (age.value < 9) return 'teen'
  return 'adult'
})
const stageScale = computed(() => STAGE_SCALE[stageName.value])

const DIFF_PARAMS: Record<Difficulty, { dH: number; dHa: number; dE: number; hThr: number; hdrain: number; eventChance: number; eventInterval: number }> = {
  easy:   { dH: 1,   dHa: 0.5, dE: 0.5, hThr: 25, hdrain: 0.6, eventChance: 0.15, eventInterval: 6 },
  medium: { dH: 2,   dHa: 1,   dE: 1,   hThr: 35, hdrain: 1.2, eventChance: 0.25, eventInterval: 5 },
  hard:   { dH: 3.5, dHa: 2,   dE: 1.8, hThr: 45, hdrain: 2.5, eventChance: 0.35, eventInterval: 4 },
}
const dp = computed(() => DIFF_PARAMS[difficulty.value])

const stageLabel  = computed(() => t(`games.tamagotchiGame.stage${cap(stageName.value)}`))
const stageEmoji  = computed(() => ({ baby:'🥚', juvenile:'🐣', teen:'🦎', adult:'🦕' }[stageName.value]))
const dayProgress = computed(() => ((ticks.value % TICKS_PER_DAY) / TICKS_PER_DAY) * 100)

const currentMood = computed<Mood>(() => {
  if (phase.value === 'dead') return 'dead'
  if (animState.value === 'sleep') return 'sleeping'
  if (health.value < 25) return 'sick'
  if (happiness.value > 70 && hunger.value > 50 && energy.value > 40) return 'happy'
  if (happiness.value < 10 && hunger.value < 10) return 'angry'
  if (happiness.value < 20 || hunger.value < 20 || energy.value < 10) return 'sad'
  return 'neutral'
})

const healthStatus = computed<HealthStatus>(() => {
  if (health.value < 25) return 'critical'
  if (health.value < 60) return 'sick'
  return 'healthy'
})

const moodEmoji = computed(() =>
  ({ happy: '😄', neutral: '😐', sad: '😢', angry: '😤', sick: '🤒', sleeping: '💤', dead: '💀' } as Record<Mood, string>)[currentMood.value])

const activityText = computed(() => {
  if (phase.value !== 'playing') return ''
  if (reactionAnim.value === 'tears')    return t('games.tamagotchiGame.activityScared')
  if (reactionAnim.value === 'sparkle')  return t('games.tamagotchiGame.activityCelebrating')
  if (animState.value === 'eat')              return t('games.tamagotchiGame.activityEating')
  if (animState.value === 'play')             return t('games.tamagotchiGame.activityPlaying')
  if (animState.value === 'sleep')            return t('games.tamagotchiGame.activitySleeping')
  return t('games.tamagotchiGame.activityWalking')
})

const eventLogCount = computed(() => eventLog.value.length)

// ─── Non-reactive animation state ─────────────────────────────────────────────
const animState = ref<AnimState>('walk')
let animTimer  = 0
let walkFrame  = false
let walkTimer  = 0

let dinoX = ART_W / 2
let dinoVx = 0.75
let facingRight = true

let jumpY = 0
let jumpVy = 0

interface Zzz  { x: number; y: number; alpha: number; sz: number }
interface Star { x: number; y: number; vx: number; vy: number; alpha: number; hue: number }
interface Cloud { x: number; y: number; sz: number; spd: number }

let zzzs: Zzz[] = []
let zzzTimer = 0
let stars: Star[] = []
let starTimer = 0
let growthFlash = 0
let lastStage: Stage = 'baby'

const clouds: Cloud[] = [
  { x: 38,  y: 14, sz: 4, spd: 0.006 },
  { x: 128, y: 8,  sz: 3, spd: 0.004 },
  { x: 214, y: 19, sz: 5, spd: 0.007 },
]

let reactionTimer   = 0
let eventTickCounter = 0
let logIdCounter    = 0

// ─── Constants ────────────────────────────────────────────────────────────────
const SAVE_KEY = 'dino-tamago-v7'
const TICK_MS = 4000
const TICKS_PER_DAY = 20

const EVENT_POOL: EventDef[] = [
  {
    kind: 'sickness', weight: 8,
    statEffects: { health: -45, happiness: -15 },
    msgKey: 'eventSickness', icon: '🤒', reaction: 'shake', reactionMs: 3000,
  },
  {
    kind: 'found_item', weight: 12,
    statEffects: { happiness: 15, hunger: 10 },
    msgKey: 'eventFoundItem', icon: '🍎', reaction: 'heart', reactionMs: 2500,
  },
  {
    kind: 'scared', weight: 10,
    statEffects: { happiness: -20, energy: -10 },
    msgKey: 'eventScared', icon: '😱', reaction: 'tears', reactionMs: 3000,
  },
  {
    kind: 'happy_surprise', weight: 10,
    statEffects: { happiness: 25, health: 5 },
    msgKey: 'eventHappySurprise', icon: '🎁', reaction: 'sparkle', reactionMs: 3500,
  },
  {
    kind: 'lucky', weight: 3,
    statEffects: { hunger: 15, happiness: 15, energy: 15, health: 15 },
    msgKey: 'eventLucky', icon: '⭐', reaction: 'bounce', reactionMs: 4000,
  },
]
const EVENT_TOTAL_WEIGHT = EVENT_POOL.reduce((sum, e) => sum + e.weight, 0)

let tickTimer: ReturnType<typeof setInterval> | null = null
let flashTimer: ReturnType<typeof setTimeout> | null = null
let raf = 0
let running = false
let lastTs = 0
let artCanvas: HTMLCanvasElement | null = null

// ─── Flash message (drawn on canvas) ──────────────────────────────────────────
let flashText = ''

function flash(msg: string) {
  flashText = msg
  if (flashTimer) clearTimeout(flashTimer)
  flashTimer = setTimeout(() => { flashText = '' }, 2500)
}

// ─── Page visibility (mobile battery saving) ──────────────────────────────────
let visibilityPaused = false

function onVisibilityChange() {
  if (document.hidden) {
    if (tickTimer) clearInterval(tickTimer)
    tickTimer = null
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    running = false
    visibilityPaused = true
  } else {
    if (visibilityPaused && phase.value === 'playing') {
      running = true
      lastTs = performance.now()
      startTick()
      raf = requestAnimationFrame(loop)
    }
    visibilityPaused = false
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function barColor(v: number) {
  return v > 60 ? 'bg-emerald-400' : v > 30 ? 'bg-amber-400' : 'bg-red-500'
}

function pickRandomEvent(): EventDef | null {
  let roll = Math.random() * EVENT_TOTAL_WEIGHT
  for (const e of EVENT_POOL) { roll -= e.weight; if (roll <= 0) return e }
  return null
}

function getMargins(kind: DinoKind, s: number) {
  const sides: Record<DinoKind, [number, number]> = {
    trex:        [14, 16],
    triceratops: [17, 22],
    diplodocus:  [24, 20],
  }
  const [l, r] = sides[kind]
  return { left: l * s + 4, right: r * s + 4 }
}

function spawnStars() {
  for (let i = 0; i < 16; i++) {
    stars.push({
      x: dinoX + (Math.random() - 0.5) * 120,
      y: ART_GROUND - 40 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 2.5,
      vy: -1.5 - Math.random() * 2,
      alpha: 1,
      hue: Math.random() * 360,
    })
  }
}

const MAX_LOG_ENTRIES = 50

function addLogEntry(text: string, icon: string, category: LogEntry['category']) {
  eventLog.value.unshift({ id: ++logIdCounter, text, time: Date.now(), icon, category })
  if (eventLog.value.length > MAX_LOG_ENTRIES) eventLog.value.length = MAX_LOG_ENTRIES
}

// ─── Persistence ─────────────────────────────────────────────────────────────
function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    version: 7,
    kind: dinoKind.value, difficulty: difficulty.value,
    hunger: hunger.value, happiness: happiness.value,
    energy: energy.value, health: health.value, age: age.value,
    ticks: ticks.value, phase: phase.value,
    eventLog: eventLog.value.map(e => ({ text: e.text, time: e.time, icon: e.icon, category: e.category })),
    savedAt: Date.now(),
  }))
}

function load(): boolean {
  try {
    let raw = localStorage.getItem(SAVE_KEY)
    if (!raw) {
      // Migrate from v6
      const oldRaw = localStorage.getItem('dino-tamago-v6')
      if (oldRaw) {
        const old = JSON.parse(oldRaw)
        raw = JSON.stringify({
          version: 7,
          kind: old.kind ?? 'trex', difficulty: old.difficulty ?? 'medium',
          hunger: old.hunger ?? 80, happiness: old.happiness ?? 80,
          energy: old.energy ?? 80, health: old.health ?? 100,
          age: old.age ?? 0, ticks: old.ticks ?? 0, phase: old.phase ?? 'select',
          eventLog: [], savedAt: old.savedAt ?? Date.now(),
        })
        localStorage.removeItem('dino-tamago-v6')
      } else return false
    }

    const s = JSON.parse(raw)
    dinoKind.value     = s.kind       ?? 'trex'
    difficulty.value   = s.difficulty ?? 'medium'
    hunger.value       = s.hunger     ?? 80
    happiness.value    = s.happiness  ?? 80
    energy.value       = s.energy     ?? 80
    health.value       = s.health     ?? 100
    age.value          = s.age        ?? 0
    ticks.value        = s.ticks      ?? 0
    phase.value        = s.phase      ?? 'select'
    lastStage          = stageName.value

    // Restore event log
    eventLog.value = (s.eventLog || []).map((e: LogEntry) => ({
      id: ++logIdCounter,
      text: e.text, time: e.time, icon: e.icon, category: e.category,
    }))

    if (s.phase === 'playing') {
      const elapsed = Date.now() - (s.savedAt ?? Date.now())
      const missed = Math.min(Math.floor(elapsed / TICK_MS), 30)
      // Inactivity penalty: if gone > 10 min, apply health drain
      if (elapsed > 10 * 60 * 1000) {
        const penaltyTicks = Math.min(Math.floor(elapsed / 600000), 5)
        health.value = Math.max(0, health.value - penaltyTicks * 10)
        if (penaltyTicks > 0) addLogEntry(t('games.tamagotchiGame.msgInactivePenalty'), '⏰', 'warning')
      }
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
        phase.value = 'grown'; animState.value ='play'
        spawnStars(); stopTick(); save()
        addLogEntry(t('games.tamagotchiGame.grownMessage'), '🎉', 'life')
        return
      }
      growthFlash = 90
      addLogEntry(
        `${t(`games.tamagotchiGame.stage${cap(stageName.value)}`)}! (${t('games.tamagotchiGame.age', { n: age.value })})`,
        '🦕', 'life',
      )
    }
    const prevHunger    = hunger.value
    const prevHappiness = happiness.value
    const prevEnergy    = energy.value
    const d             = dp.value

    hunger.value    = Math.max(0, hunger.value    - d.dH)
    happiness.value = Math.max(0, happiness.value - d.dHa)
    if (animState.value !== 'sleep') energy.value = Math.max(0, energy.value - d.dE)
    // Health drain when any core stat is low
    if (hunger.value < d.hThr || happiness.value < d.hThr || energy.value < d.hThr / 2)
      health.value = Math.max(0, health.value - d.hdrain)
    // Compounding: low health drains even faster (sickness spiral)
    if (health.value < 35)
      health.value = Math.max(0, health.value - d.hdrain * 0.8)
    // Recovery when well-fed and happy
    if (hunger.value > 60 && happiness.value > 60 && energy.value > 30)
      health.value = Math.min(100, health.value + 0.4)

    if (prevHunger    > 10 && hunger.value    <= 10) flash(t('games.tamagotchiGame.warnHunger'))
    if (prevHappiness > 10 && happiness.value <= 10) flash(t('games.tamagotchiGame.warnHappiness'))
    if (prevEnergy    > 10 && energy.value    <= 10) flash(t('games.tamagotchiGame.warnEnergy'))
    if (health.value  > 10 && health.value    <= 10) flash(t('games.tamagotchiGame.warnHealth'))

    const isDead =
        health.value    <= 0 ||
        hunger.value    <= 0 ||
        happiness.value <= 0 ||
        energy.value    <= 0

    if (isDead) { phase.value = 'dead'; animState.value ='dead'; stopTick(); save(); addLogEntry(t('games.tamagotchiGame.deadMessage'), '💀', 'death'); return }

    // Random event check (once per tick, not per iteration)
    eventTickCounter++
    const d2 = dp.value
    if (eventTickCounter >= d2.eventInterval) {
      eventTickCounter = 0
      if (Math.random() < d2.eventChance) {
        const eventDef = pickRandomEvent()
        if (eventDef) {
          if (eventDef.statEffects.hunger)    hunger.value    = Math.max(0, Math.min(100, hunger.value    + eventDef.statEffects.hunger))
          if (eventDef.statEffects.happiness) happiness.value = Math.max(0, Math.min(100, happiness.value + eventDef.statEffects.happiness))
          if (eventDef.statEffects.energy)    energy.value    = Math.max(0, Math.min(100, energy.value    + eventDef.statEffects.energy))
          if (eventDef.statEffects.health)    health.value    = Math.max(0, Math.min(100, health.value    + eventDef.statEffects.health))
          reactionAnim.value = eventDef.reaction
          reactionTimer = eventDef.reactionMs
          const msg = t(`games.tamagotchiGame.${eventDef.msgKey}`)
          flash(msg)
          addLogEntry(msg, eventDef.icon, 'event')
        }
      }
    }
  }
}

function startTick() { tickTimer = setInterval(() => { applyTicks(1); save() }, TICK_MS) }
function stopTick()  { if (tickTimer) { clearInterval(tickTimer); tickTimer = null } }

// ─── Actions ─────────────────────────────────────────────────────────────────
function startGame(kind: DinoKind, diff: Difficulty) {
  dinoKind.value   = kind
  difficulty.value = diff
  hunger.value    = 80; happiness.value = 80; energy.value = 80; health.value = 100
  age.value       = 0; ticks.value = 0; phase.value = 'playing'
  animState.value  = 'walk'; animTimer = 0; walkFrame = false; walkTimer = 0
  dinoX           = ART_W / 2; dinoVx = 0.75; facingRight = true
  lastStage       = 'baby'; growthFlash = 0; stars = []; zzzs = []; jumpY = 0; jumpVy = 0
  flashText = ''; if (flashTimer) clearTimeout(flashTimer)
  eventLog.value = []; logIdCounter = 0
  reactionAnim.value = 'none'; reactionTimer = 0; eventTickCounter = 0; showEventLog.value = false
  save(); startTick()
  lastTs = performance.now()
  if (raf) cancelAnimationFrame(raf)
  running = true
  raf = requestAnimationFrame(loop)
}

function feed() {
  if (phase.value !== 'playing' || animState.value === 'sleep') return
  hunger.value    = Math.min(100, hunger.value + 28)
  happiness.value = Math.min(100, happiness.value + 5)
  energy.value    = Math.max(0,   energy.value - 3)
  setAnim('eat', 2400)
  flash(t('games.tamagotchiGame.msgFed')); save()
  addLogEntry(t('games.tamagotchiGame.msgFed'), '🍖', 'action')
}

function doPlay() {
  if (phase.value !== 'playing' || animState.value === 'sleep') return
  if (energy.value < 10) { flash(t('games.tamagotchiGame.msgTired')); return }
  happiness.value = Math.min(100, happiness.value + 22)
  energy.value    = Math.max(0,   energy.value - 16)
  hunger.value    = Math.max(0,   hunger.value - 8)
  setAnim('play', 3000); jumpVy = -3
  flash(t('games.tamagotchiGame.msgPlaying')); save()
  addLogEntry(t('games.tamagotchiGame.msgPlaying'), '🎮', 'action')
}

function doRest() {
  if (phase.value !== 'playing' || animState.value === 'sleep') return
  setAnim('sleep', 8000); zzzs = []; zzzTimer = 0
  flash(t('games.tamagotchiGame.msgResting'))
  addLogEntry(t('games.tamagotchiGame.msgResting'), '💤', 'action')
}

function doMedicine() {
  if (phase.value !== 'playing' || animState.value === 'sleep') return
  if (health.value >= 100) { flash(t('games.tamagotchiGame.msgHealthy')); return }
  health.value    = Math.min(100, health.value + 30)
  happiness.value = Math.max(0,   happiness.value - 5)
  flash(t('games.tamagotchiGame.msgMedicine')); save()
  addLogEntry(t('games.tamagotchiGame.msgMedicine'), '💊', 'action')
}

function onCanvasClick(e: MouseEvent) {
  if (phase.value !== 'playing' || animState.value === 'sleep') return
  const cv = canvasRef.value; if (!cv) return
  const rect = cv.getBoundingClientRect()
  const scaleX = ART_W / rect.width
  const scaleY = ART_H / rect.height
  const clickX = (e.clientX - rect.left) * scaleX
  const clickY = (e.clientY - rect.top) * scaleY
  const s = stageScale.value
  const dist = Math.sqrt((clickX - dinoX) ** 2 + (clickY - (ART_GROUND - 20 * s)) ** 2)
  if (dist < 40 * s) {
    reactionAnim.value = 'heart'
    reactionTimer = 2000
    happiness.value = Math.min(100, happiness.value + 3)
    flash(t('games.tamagotchiGame.msgPetted'))
    addLogEntry(t('games.tamagotchiGame.msgPetted'), '❤️', 'action')
    save()
  }
}

function newGame() {
  running = false; stopTick(); cancelAnimationFrame(raf); raf = 0
  localStorage.removeItem(SAVE_KEY)
  phase.value = 'select'; age.value = 0; ticks.value = 0
  hunger.value = 80; happiness.value = 80; energy.value = 80; health.value = 100
  animState.value ='walk'; stars = []; zzzs = []
  flashText = ''; if (flashTimer) clearTimeout(flashTimer)
  eventLog.value = []; logIdCounter = 0
  reactionAnim.value = 'none'; reactionTimer = 0; eventTickCounter = 0; showEventLog.value = false
}

const showExitConfirm = ref(false)

function exitGame() { showExitConfirm.value = true }

function confirmExit() {
  showExitConfirm.value = false
  running = false; stopTick(); cancelAnimationFrame(raf); raf = 0
  localStorage.removeItem(SAVE_KEY)
  phase.value = 'select'; age.value = 0; ticks.value = 0
  hunger.value = 80; happiness.value = 80; energy.value = 80; health.value = 100
  animState.value ='walk'; stars = []; zzzs = []
  flashText = ''; if (flashTimer) clearTimeout(flashTimer)
  eventLog.value = []; logIdCounter = 0
  reactionAnim.value = 'none'; reactionTimer = 0; eventTickCounter = 0; showEventLog.value = false
}

function setAnim(state: AnimState, ms: number) {
  animState.value =state; animTimer = ms
  if (state === 'sleep') energy.value = Math.min(100, energy.value + 40)
}

// ─── Game loop ────────────────────────────────────────────────────────────────
function loop(ts: number) {
  if (!running) return
  const dt = Math.min(ts - lastTs, 50); lastTs = ts
  update(dt); draw()
  raf = requestAnimationFrame(loop)
}

function update(dt: number) {
  if (animTimer > 0) {
    animTimer -= dt
    if (animTimer <= 0) {
      animTimer = 0
      if (phase.value === 'playing') {
        if (animState.value === 'sleep') { flash(t('games.tamagotchiGame.msgRested')); addLogEntry(t('games.tamagotchiGame.msgRested'), '⚡', 'action') }
        animState.value ='walk'
      }
    }
  }
  if (growthFlash > 0) growthFlash--
  if (reactionTimer > 0) {
    reactionTimer -= dt
    if (reactionTimer <= 0) { reactionTimer = 0; reactionAnim.value = 'none' }
  }
  if (lastStage !== stageName.value) lastStage = stageName.value

  if (animState.value === 'walk' || animState.value === 'play') {
    walkTimer += dt
    if (walkTimer >= 200) { walkTimer = 0; walkFrame = !walkFrame }
  } else { walkFrame = false; walkTimer = 0 }

  if (animState.value === 'walk') {
    const s   = stageScale.value
    const spd = dinoVx * (energy.value > 30 ? 1 : 0.5) * (dt / 16)
    dinoX += spd
    const m = getMargins(dinoKind.value, s)
    if (dinoX < m.left)          { dinoX = m.left;          dinoVx =  Math.abs(dinoVx); facingRight = true  }
    if (dinoX > ART_W - m.right) { dinoX = ART_W - m.right; dinoVx = -Math.abs(dinoVx); facingRight = false }
  }

  if (animState.value === 'play') {
    jumpVy += 0.15; jumpY += jumpVy * (dt / 16)
    if (jumpY >= 0) { jumpY = 0; jumpVy = -3 }
  } else if (phase.value === 'grown') {
    jumpVy += 0.10; jumpY += jumpVy * (dt / 16)
    if (jumpY >= 0) { jumpY = 0; jumpVy = -2 }
  } else { jumpY = 0; jumpVy = 0 }

  if (animState.value === 'sleep') {
    zzzTimer += dt
    if (zzzTimer > 1300) {
      zzzTimer = 0
      const s   = stageScale.value
      const dir = facingRight ? 1 : -1
      const hdx: Record<DinoKind, number> = { trex: 10, triceratops: 14, diplodocus: 14 }
      const hdy: Record<DinoKind, number> = { trex: 21, triceratops: 18, diplodocus: 27 }
      zzzs.push({
        x: dinoX + dir * hdx[dinoKind.value] * s,
        y: ART_GROUND - hdy[dinoKind.value] * s - 2,
        alpha: 1,
        sz: Math.max(1, Math.round(s * 1.2)),
      })
    }
    for (const z of zzzs) { z.y -= 0.22 * (dt / 16); z.alpha -= 0.006 * (dt / 16) }
    zzzs = zzzs.filter(z => z.alpha > 0.05)
  } else { zzzs = [] }

  if (phase.value === 'grown') {
    starTimer += dt
    if (starTimer > 600 && stars.length < 24) { starTimer = 0; spawnStars() }
  }
  for (const s of stars) {
    s.x += s.vx * (dt / 16); s.y += s.vy * (dt / 16)
    s.vy += 0.05; s.alpha -= 0.012 * (dt / 16)
  }
  stars = stars.filter(s => s.alpha > 0.05)

  for (const c of clouds) {
    c.x += c.spd * (dt / 16)
    if (c.x > ART_W + c.sz * 8) c.x = -c.sz * 8
  }
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  const cv = canvasRef.value; if (!cv || !artCanvas) return
  const dc = cv.getContext('2d')!
  const ac = artCanvas.getContext('2d')!

  ac.clearRect(0, 0, ART_W, ART_H)

  drawBG(ac)

  if (growthFlash > 0) {
    ac.fillStyle = `rgba(255,220,50,${(growthFlash / 70) * 0.4})`
    ac.fillRect(0, 0, ART_W, ART_H)
  }

  if (animState.value === 'eat') {
    const s   = stageScale.value
    const dir = facingRight ? 1 : -1
    drawBowl(ac, Math.round(dinoX + dir * 14 * s), ART_GROUND, s)
  }

  const s = stageScale.value
  ac.fillStyle = 'rgba(0,0,0,0.20)'
  ac.fillRect(Math.round(dinoX - 8 * s), ART_GROUND - 1, 16 * s, 2)

  ac.save()
  ac.translate(Math.round(dinoX), Math.round(ART_GROUND + jumpY))
  if (!facingRight) ac.scale(-1, 1)
  if (dinoKind.value === 'trex')             drawTrex(ac, s, animState.value, walkFrame)
  else if (dinoKind.value === 'triceratops') drawTriceratops(ac, s, animState.value, walkFrame)
  else                                        drawDiplodocus(ac, s, animState.value, walkFrame)
  ac.restore()

  // Reaction effects
  if (reactionAnim.value === 'heart') {
    const hx = Math.round(dinoX)
    const hy = Math.round(ART_GROUND + jumpY - 28 * s)
    ac.fillStyle = '#ff4d6a'
    ac.font = `${Math.round(10 * s)}px monospace`
    ac.textAlign = 'center'
    ac.fillText('❤️', hx, hy)
    ac.textAlign = 'left'
  } else if (reactionAnim.value === 'tears') {
    const dir = facingRight ? 1 : -1
    const tx = Math.round(dinoX + dir * 6 * s)
    const ty = Math.round(ART_GROUND + jumpY - 22 * s)
    ac.fillStyle = '#6cb4ee'
    for (let i = 0; i < 3; i++) {
      ac.fillRect(tx + i * 3, ty + i * 4, 2, 3)
    }
  } else if (reactionAnim.value === 'shake') {
    // Slight horizontal oscillation is applied in update via walkTimer acceleration
    if (Math.random() < 0.3 && stars.length < 30) spawnStars()
  } else if (reactionAnim.value === 'sparkle') {
    if (Math.random() < 0.4 && stars.length < 30) spawnStars()
  }

  // Zzz particles
  for (const z of zzzs) {
    const sz = z.sz
    const gx = Math.round(z.x), gy = Math.round(z.y)
    ac.globalAlpha = Math.max(0, Math.min(1, z.alpha))
    ac.fillStyle   = '#a0c0ff'
    ac.fillRect(gx,          gy,          sz * 4, sz)
    ac.fillRect(gx + sz * 3, gy + sz,     sz,     sz)
    ac.fillRect(gx + sz * 2, gy + sz * 2, sz,     sz)
    ac.fillRect(gx + sz,     gy + sz * 3, sz,     sz)
    ac.fillRect(gx,          gy + sz * 4, sz * 4, sz)
    ac.globalAlpha = 1
  }

  // Confetti
  for (const st of stars) {
    ac.globalAlpha = Math.max(0, Math.min(1, st.alpha))
    ac.fillStyle   = `hsl(${st.hue},90%,65%)`
    ac.fillRect(Math.round(st.x), Math.round(st.y), 2, 2)
    ac.globalAlpha = 1
  }

  // Flash message (drawn on canvas)
  if (flashText) {
    ac.save()
    ac.font = 'bold 10px monospace'
    const tw = ac.measureText(flashText).width
    const px = ART_W / 2 - tw / 2 - 6
    const py = 18
    ac.fillStyle = 'rgba(0,0,0,0.65)'
    ac.fillRect(px - 2, py - 10, tw + 12, 18)
    ac.fillStyle = '#ffffff'
    ac.textAlign = 'left'
    ac.fillText(flashText, px, py)
    ac.restore()
  }

  // Overlays (dead / grown)
  if (phase.value === 'dead') {
    drawOverlay(ac, '💀 ' + t('games.tamagotchiGame.deadTitle'), t('games.tamagotchiGame.deadMessage'), '#f87171')
  } else if (phase.value === 'grown') {
    const nm = t(`games.tamagotchiGame.kind${cap(dinoKind.value)}`)
    drawOverlay(ac, '🎉 ' + nm + ' grew up!', t('games.tamagotchiGame.grownMessage'), '#fbbf24')
  }

  dc.imageSmoothingEnabled = false
  dc.clearRect(0, 0, DISP_W, DISP_H)
  dc.drawImage(artCanvas, 0, 0, DISP_W, DISP_H)
}

// ─── Background drawing (unchanged) ───────────────────────────────────────────
function drawBG(ac: CanvasRenderingContext2D) {
  const af = Math.min(age.value / 9, 1)
  const [sk0, sk1, sk2] = af < 0.34
      ? ['#1040a8', '#2868cc', '#4a90e0'] as const
      : af < 0.67
          ? ['#401888', '#6830be', '#9058e0'] as const
          : ['#b02808', '#d04818', '#e87028'] as const

  const bH = Math.floor(ART_GROUND / 3)
  ac.fillStyle = sk0; ac.fillRect(0, 0,      ART_W, bH)
  ac.fillStyle = sk1; ac.fillRect(0, bH,     ART_W, bH)
  ac.fillStyle = sk2; ac.fillRect(0, bH * 2, ART_W, ART_GROUND - bH * 2)

  if (af > 0.55) {
    ac.fillStyle = '#ffffff'
    const seeds = [7,23,41,67,89,113,143,167,199,223,251,271,13,37,57,83]
    const now   = Date.now()
    for (const sd of seeds) {
      if (Math.sin(now / 900 + sd) > 0.1)
        ac.fillRect((sd * 19 + 7) % ART_W, (sd * 13 + 5) % (bH * 2 + 10), 1, 1)
    }
  }

  const csx = Math.round(26 + af * (ART_W - 52))
  if (af < 0.85) {
    ac.fillStyle = '#f8e030'
    ac.fillRect(csx - 3, 13, 6, 6)
    ac.fillRect(csx - 1, 10, 2, 3);  ac.fillRect(csx - 1, 19, 2, 3)
    ac.fillRect(csx - 6, 15, 3, 2);  ac.fillRect(csx + 3, 15, 3, 2)
    ac.fillRect(csx - 4, 12, 2, 2);  ac.fillRect(csx + 2, 12, 2, 2)
    ac.fillRect(csx - 4, 19, 2, 2);  ac.fillRect(csx + 2, 19, 2, 2)
    ac.fillStyle = '#fff8a0'
    ac.fillRect(csx - 1, 14, 2, 4);  ac.fillRect(csx - 2, 15, 6, 2)
  } else {
    ac.fillStyle = '#dce8ff'; ac.fillRect(csx - 3, 13, 6, 6)
    ac.fillStyle = sk0;        ac.fillRect(csx - 1, 13, 4, 6)
  }

  const mFar = af < 0.5 ? '#3858a8' : '#5828a0'
  for (const [mx, mh] of [[18,22],[64,28],[115,17],[165,24],[215,19],[262,22]] as [number,number][])
    drawMtn(ac, mx, ART_GROUND, mh, mFar)

  const mNear = af < 0.5 ? '#1a5828' : '#112a16'
  for (const [mx, mh] of [[4,12],[48,16],[98,11],[146,15],[195,11],[244,14]] as [number,number][])
    drawMtn(ac, mx, ART_GROUND, mh, mNear)

  for (const c of clouds) drawCloud(ac, Math.round(c.x), Math.round(c.y), c.sz)

  ac.fillStyle = '#3a2008'; ac.fillRect(0, ART_GROUND, ART_W, ART_H - ART_GROUND)

  ac.fillStyle = af < 0.5 ? '#1e8030' : '#125020'
  ac.fillRect(0, ART_GROUND - 3, ART_W, 4)
  ac.fillStyle = af < 0.5 ? '#2ecc50' : '#1a8038'
  for (let gx = 1; gx < ART_W - 1; gx += 5) {
    const bh = 2 + (gx * 7 % 3)
    ac.fillRect(gx, ART_GROUND - 3 - bh, 1, bh)
  }

  const treeClr  = af < 0.5 ? '#166422' : '#0d3a14'
  const trunkClr = '#5a3010'
  for (const [tx, th] of [[12,12],[48,9],[232,11],[265,8]] as [number,number][]) {
    ac.fillStyle = trunkClr
    ac.fillRect(tx - 1, ART_GROUND - Math.floor(th * 0.4), 2, Math.floor(th * 0.4))
    ac.fillStyle = treeClr
    const hw = Math.ceil(th * 0.45)
    ac.fillRect(tx - hw, ART_GROUND - th, hw * 2, Math.floor(th * 0.65))
    ac.fillRect(tx - Math.floor(hw * 0.6), ART_GROUND - th - Math.floor(th * 0.3),
        Math.floor(hw * 1.2), Math.floor(th * 0.38))
  }
}

function drawMtn(ac: CanvasRenderingContext2D, cx: number, baseY: number, h: number, color: string) {
  ac.fillStyle = color
  for (let row = 0; row < h; row++) {
    const w = row * 2 + 1
    ac.fillRect(cx - Math.floor(w / 2), baseY - h + row, w, 1)
  }
}

function drawCloud(ac: CanvasRenderingContext2D, x: number, y: number, sz: number) {
  const s = Math.round(sz)
  ac.fillStyle = '#c8daf0'
  ac.fillRect(x + s, y - s,     s * 4, s * 3)
  ac.fillRect(x,     y,         s * 6, s * 2)
  ac.fillStyle = '#ecf4ff'
  ac.fillRect(x + s,     y - s + 1, s * 4 - 1, s * 3 - 1)
  ac.fillRect(x + 1,     y + 1,     s * 6 - 2, s * 2 - 2)
}

function drawBowl(ac: CanvasRenderingContext2D, bx: number, by: number, s: number) {
  const bw = Math.round(7 * s), bh = Math.round(4 * s)
  const ox = bx - Math.floor(bw / 2)
  ac.fillStyle = '#3a1408'; ac.fillRect(ox - 1, by - bh - 1, bw + 2, bh + 2)
  ac.fillStyle = '#7c380e'; ac.fillRect(ox, by - bh, bw, bh)
  ac.fillStyle = '#d03020'; ac.fillRect(ox + 1, by - bh + 1, bw - 2, bh - 2)
  ac.fillStyle = '#e85030'; ac.fillRect(ox + 1, by - bh + 1, bw - 2, Math.max(1, Math.round(s * 0.8)))
}

function drawOverlay(ac: CanvasRenderingContext2D, title: string, sub: string, color: string) {
  ac.fillStyle = 'rgba(0,0,0,0.62)'; ac.fillRect(0, 0, ART_W, ART_H)
  ac.textAlign = 'center'
  ac.font = 'bold 11px monospace'; ac.fillStyle = color
  ac.fillText(title, ART_W / 2, ART_H / 2 - 6)
  ac.font = '8px monospace'; ac.fillStyle = 'rgba(255,255,255,0.9)'
  ac.fillText(sub, ART_W / 2, ART_H / 2 + 8)
  ac.textAlign = 'left'
}

function makeDrawers(ac: CanvasRenderingContext2D, s: number, K: string) {
  const o = (x: number, y: number, w: number, h: number, c: string) => {
    const rx = Math.round(x * s), ry = Math.round(y * s)
    const rw = Math.max(1, Math.round(w * s)), rh = Math.max(1, Math.round(h * s))
    ac.fillStyle = K; ac.fillRect(rx - 1, ry - 1, rw + 2, rh + 2)
    ac.fillStyle = c; ac.fillRect(rx, ry, rw, rh)
  }
  const b = (x: number, y: number, w: number, h: number, c: string) => {
    ac.fillStyle = c
    ac.fillRect(Math.round(x * s), Math.round(y * s),
        Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s)))
  }
  return { o, b }
}

// ─── Dino sprite drawing functions (unchanged) ────────────────────────────────
function drawTrex(ac: CanvasRenderingContext2D, s: number, state: AnimState, frame: boolean) {
  const dead = state === 'dead'
  const K  = '#0d1810'
  const G  = dead ? '#2a5028' : '#1e7830'
  const Gm = dead ? '#3a6838' : '#2ea040'
  const GL = dead ? '#508058' : '#52c464'
  const Gd = dead ? '#1a3020' : '#166020'
  const W  = '#f0f0d0', P = '#080808', R = '#c01818'
  const { o, b } = makeDrawers(ac, s, K)

  const move = state === 'walk' || state === 'play'
  const fl   = move ? (frame ?  2 : -2) : 0
  const bl2  = move ? (frame ? -2 :  2) : 0
  const bob  = move && frame ? -1 : 0

  o(-4 + bl2, -9, 5, 4, Gd);  o(-3 + bl2, -5, 4, 5, Gd);  o(-5 + bl2, -1, 7, 1, Gd)
  o(-14, -8, 5, 2, G);  o(-10, -9, 5, 3, G);  o(-6, -10, 4, 3, Gm)
  o(-6, -14 + bob, 14, 6, Gm);  b(-4, -13 + bob, 10, 4, GL)
  o(7, -14 + bob, 3, 2, G);  b(9, -12 + bob, 2, 1, Gd)
  o(4, -17 + bob, 5, 3, Gm)
  o(3, -21 + bob, 11, 5, Gm)
  o(10, -19 + bob, 6, 2, Gm)
  const jd = state === 'eat' ? 3 : 0
  o(10, -17 + bob + jd, 6, 2, Gm)
  if (state === 'eat') {
    b(11, -19 + bob,      4, 1, W)
    b(11, -17 + bob + jd, 4, 1, W)
    b(11, -18 + bob,      4, 1, R)
  }
  if (dead) {
    b(5,-21+bob,1,1,R); b(7,-21+bob,1,1,R); b(6,-20+bob,1,1,R)
    b(5,-19+bob,1,1,R); b(7,-19+bob,1,1,R)
  } else if (state === 'sleep') {
    b(5, -20 + bob, 3, 1, K)
  } else {
    b(5,-21+bob,3,3,W); b(6,-21+bob,2,3,P); b(5,-21+bob,1,1,W)
  }
  b(14, -18 + bob, 1, 1, K)
  o(1 + fl, -9, 5, 4, Gm);  o(2 + fl, -5, 4, 5, Gm);  o(0 + fl, -1, 7, 1, Gm)
}

function drawTriceratops(ac: CanvasRenderingContext2D, s: number, state: AnimState, frame: boolean) {
  const dead = state === 'dead'
  const K   = '#140d08'
  const B1  = dead ? '#5c4630' : '#8b6338'
  const B2  = dead ? '#7a5c40' : '#ad7a42'
  const BL  = dead ? '#9a7b58' : '#d7a35a'
  const FR  = dead ? '#5c2a22' : '#b93a28'
  const FRL = dead ? '#7a463c' : '#e35b46'
  const HN  = '#e8d28a'
  const W   = '#f5f1dc'
  const P   = '#111'
  const { o, b } = makeDrawers(ac, s, K)

  const moving = state === 'walk' || state === 'play'
  const stepA = moving ? (frame ? 1 : -1) : 0
  const stepB = moving ? -stepA : 0
  const bob = moving && frame ? -1 : 0

  o(-14, -8 + bob, 5, 2, B1);  o(-11, -9 + bob, 4, 2, B2);  b(-10, -8 + bob, 2, 1, BL)
  o(-8 + stepB, -5, 4, 6, B1); o(-9 + stepB,  1, 5, 1, B1)
  o(-2 + stepB, -5, 4, 6, B2); o(-3 + stepB,  1, 5, 1, B2)
  b(-8 + stepB, 1, 1, 1, K); b(-6 + stepB, 1, 1, 1, K)
  b(-2 + stepB, 1, 1, 1, K); b( 0 + stepB, 1, 1, 1, K)
  o(-9, -13 + bob, 18, 8, B2); b(-6, -11 + bob, 13, 3, BL)
  o(2, -14 + bob, 7, 5, B1); b(-4, -7 + bob, 11, 1, B1)
  o(10, -23 + bob, 11, 12, FR); o(12, -21 + bob, 7, 8, FRL)
  b(11, -24 + bob, 1, 2, HN); b(14, -25 + bob, 1, 2, HN); b(17, -25 + bob, 1, 2, HN); b(20, -24 + bob, 1, 2, HN)
  b(13, -20 + bob, 1, 1, FR); b(17, -18 + bob, 1, 1, FR); b(15, -15 + bob, 1, 1, FR)
  o(14, -17 + bob, 9, 5, B2); o(20, -15 + bob, 4, 3, B1); b(18, -14 + bob, 2, 2, BL)
  o(18, -21 + bob, 2, 4, HN)
  o(19, -24 + bob, 6, 2, HN); o(19, -20 + bob, 6, 2, HN)
  b(24, -24 + bob, 1, 2, '#fff8cc'); b(24, -20 + bob, 1, 2, '#fff8cc')
  b(22, -14 + bob, 2, 1, K)
  if (state === 'eat') { o(21, -12 + bob, 4, 2, B1); b(22, -11 + bob, 2, 1, W) }
  if (dead) { b(16, -16 + bob, 2, 2, '#ef4444') }
  else if (state === 'sleep') { b(16, -15 + bob, 3, 1, K) }
  else { b(16, -16 + bob, 3, 3, W); b(17, -16 + bob, 1, 3, P); b(16, -16 + bob, 1, 1, W) }
  o(5 + stepA, -5, 4, 6, B2); o(4 + stepA,  1, 5, 1, B2)
  o(11 + stepA, -5, 4, 6, B2); o(10 + stepA, 1, 5, 1, B2)
  b(5 + stepA,  1, 1, 1, K); b(7 + stepA,  1, 1, 1, K)
  b(11 + stepA, 1, 1, 1, K); b(13 + stepA, 1, 1, 1, K)
}

function drawDiplodocus(ac: CanvasRenderingContext2D, s: number, state: AnimState, frame: boolean) {
  const dead = state === 'dead'
  const K  = '#0f100a'
  const G1 = dead ? '#2a3a18' : '#3a6a18'
  const G2 = dead ? '#3a5028' : '#52882a'
  const G3 = dead ? '#5a7040' : '#78b840'
  const W  = '#f0f0d0', P = '#080808'
  const { o, b } = makeDrawers(ac, s, K)

  const move = state === 'walk' || state === 'play'
  const f1   = move ? (frame ?  1 : -1) : 0
  const f2   = move ? (frame ? -1 :  1) : 0
  const bob  = move && frame ? -1 : 0

  o(-24, -5, 5, 2, G1);  o(-20, -6, 5, 2, G1)
  o(-16, -7, 5, 3, G2);  o(-12, -8, 5, 3, G2)
  o(-7 + f2, -7, 3, 6, G1);  o(-8 + f2, -1, 5, 1, G1)
  o(-3 + f2, -7, 3, 6, G2);  o(-4 + f2, -1, 5, 1, G2)
  o(-8, -11 + bob, 16, 6, G2);  b(-6, -10 + bob, 12, 4, G3)
  for (let i = 0; i < 5; i++) b(-5 + i * 3, -13 + bob, 1, 2, G1)
  o(6,  -14 + bob, 4, 4, G2)
  o(9,  -19 + bob, 4, 6, G2)
  o(12, -25 + bob, 4, 7, G2)
  b(9, -21 + bob, 1, 3, G1);  b(12, -27 + bob, 1, 3, G1)
  o(13, -28 + bob, 7, 4, G2)
  b(19, -27 + bob, 1, 1, K);  b(18, -26 + bob, 1, 1, K)
  if (state === 'eat') b(18, -25 + bob, 2, 1, W)
  if (dead) {
    b(14,-28+bob,1,1,'#ef4444'); b(16,-28+bob,1,1,'#ef4444'); b(15,-27+bob,1,1,'#ef4444')
    b(14,-26+bob,1,1,'#ef4444'); b(16,-26+bob,1,1,'#ef4444')
  } else if (state === 'sleep') { b(14, -27 + bob, 3, 1, K) }
  else { b(14,-28+bob,3,3,W); b(15,-28+bob,2,3,P); b(14,-28+bob,1,1,W) }
  o(2 + f1, -7, 3, 6, G2);  o(1 + f1, -1, 5, 1, G2)
  o(6 + f1, -7, 3, 6, G2);  o(5 + f1, -1, 5, 1, G2)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  artCanvas = document.createElement('canvas')
  artCanvas.width = ART_W
  artCanvas.height = ART_H

  const hadSave = load()
  if (hadSave && phase.value !== 'select') {
    dinoX = ART_W / 2
    dinoVx = 0.75
    facingRight = true
    walkFrame = false
    walkTimer = 0
    jumpY = 0
    jumpVy = 0
    zzzs = []
    zzzTimer = 0
    stars = []
    starTimer = 0
    animTimer = 0
    animState.value =phase.value === 'dead' ? 'dead' : 'walk'
    nextTick(() => {
      lastTs = performance.now()
      running = true
      if (phase.value === 'playing')  startTick()
      if (phase.value === 'grown')   { animState.value ='play'; spawnStars() }
      if (phase.value === 'dead')      animState.value ='dead'
      raf = requestAnimationFrame(loop)
    })
  }
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
  running = false; stopTick(); cancelAnimationFrame(raf)
  if (flashTimer) clearTimeout(flashTimer)
  if (phase.value === 'playing') save()
})
</script>

<template>
  <div>
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

      <h1 class="text-display-md mb-2 text-center">{{ t('games.tamagotchiGame.title') }} (Beta)</h1>
      <p class="text-body-sm text-center text-[var(--color-text-secondary)] mb-8">
        {{ t('games.tamagotchiGame.subtitle') }}
      </p>

      <!-- SELECT -->
      <div v-if="phase === 'select'" class="space-y-8">
        <div class="space-y-3">
          <p class="text-center text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
            {{ t('games.tamagotchiGame.difficultyTitle') }}
          </p>
          <div class="flex justify-center gap-3">
            <button
                v-for="d in ([
                { key:'easy',   icon:'🌿', cls:'border-emerald-500 bg-emerald-500/15 text-emerald-400', active:'ring-2 ring-emerald-400' },
                { key:'medium', icon:'⚡', cls:'border-amber-500   bg-amber-500/15   text-amber-400',   active:'ring-2 ring-amber-400'   },
                { key:'hard',   icon:'💀', cls:'border-red-500     bg-red-500/15     text-red-400',     active:'ring-2 ring-red-400'     },
              ] as const)"
                :key="d.key"
                class="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border font-semibold text-sm
                     transition-all duration-200 active:scale-95"
                :class="[d.cls, difficulty === d.key ? d.active : 'opacity-60 hover:opacity-90']"
                @click="difficulty = d.key"
            >
              <span class="text-xl">{{ d.icon }}</span>
              {{ t(`games.tamagotchiGame.difficulty${d.key.charAt(0).toUpperCase()+d.key.slice(1)}`) }}
            </button>
          </div>
          <p class="text-center text-xs text-[var(--color-text-secondary)]">
            {{ t(`games.tamagotchiGame.difficultyDesc${difficulty.charAt(0).toUpperCase()+difficulty.slice(1)}`) }}
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-center text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
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
                @click="startGame(opt.kind, difficulty)"
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
      </div>

      <!-- GAME -->
      <div v-else class="space-y-4">
        <div class="flex items-center justify-between text-sm flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-[var(--color-text-primary)]">{{ stageEmoji }} {{ stageLabel }}</span>
            <BaseBadge
              :variant="currentMood === 'happy' ? 'success' : currentMood === 'sad' || currentMood === 'angry' ? 'era' : currentMood === 'sick' ? 'size' : 'default'"
              size="sm"
            >
              {{ moodEmoji }} {{ t(`games.tamagotchiGame.mood${cap(currentMood)}`) }}
            </BaseBadge>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                  :class="{
                    'bg-emerald-500/15 text-emerald-400': difficulty === 'easy',
                    'bg-amber-500/15 text-amber-400':     difficulty === 'medium',
                    'bg-red-500/15 text-red-400':         difficulty === 'hard',
                  }">
              {{ { easy:'🌿', medium:'⚡', hard:'💀' }[difficulty] }}
              {{ t(`games.tamagotchiGame.difficulty${cap(difficulty)}`) }}
            </span>
            <span class="text-[var(--color-text-secondary)]">{{ t('games.tamagotchiGame.age', { n: age }) }}</span>
          </div>
        </div>

        <div class="h-1.5 rounded-full bg-[var(--color-bg-base)] overflow-hidden">
          <div class="h-full rounded-full bg-amber-400 transition-all duration-1000"
               :style="{ width: dayProgress + '%' }" />
        </div>

        <!-- Activity & health status -->
        <div v-if="phase === 'playing'" class="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
          <span>{{ activityText }}</span>
          <span>
            {{ t('games.tamagotchiGame.healthStatus') }}:
            <span :class="{
              'text-emerald-400': healthStatus === 'healthy',
              'text-amber-400': healthStatus === 'sick',
              'text-red-400': healthStatus === 'critical',
            }">
              {{ t(`games.tamagotchiGame.status${cap(healthStatus)}`) }}
            </span>
          </span>
        </div>

        <div class="rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--shadow-card)]">
          <canvas
              ref="canvasRef"
              width="560"
              height="320"
              class="block w-full h-auto select-none"
              :style="{ imageRendering: 'pixelated', cursor: phase === 'playing' ? 'pointer' : 'default' }"
              @click="onCanvasClick"
          />
        </div>

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
        <div v-if="phase === 'playing'" class="flex flex-row gap-2 sm:gap-3">
          <button
              v-for="btn in [
      { action: feed,       icon: '🍖', key: 'feed'     },
      { action: doPlay,     icon: '🎮', key: 'play'     },
      { action: doRest,     icon: '💤', key: 'rest'     },
      { action: doMedicine, icon: '💊', key: 'medicine' }
    ]"
              :key="btn.key"
              class="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl font-semibold text-sm
           transition-all duration-200 active:scale-95
           bg-amber-500/15 hover:bg-amber-500/25 text-amber-300"
              @click="btn.action()"
          >
            <span class="text-2xl">{{ btn.icon }}</span>
            <span class="hidden sm:inline text-xs mt-0.5">
      {{ t(`games.tamagotchiGame.${btn.key}`) }}
    </span>
          </button>
        </div>

        <div v-else class="flex justify-center gap-3">
          <button
              class="px-8 py-3 rounded-xl font-bold text-white shadow-lg
                   bg-gradient-to-r from-amber-500 to-orange-500
                   hover:from-amber-400 hover:to-orange-400 transition-all duration-200 active:scale-95"
              @click="newGame">
            {{ t('games.tamagotchiGame.newGame') }}
          </button>
        </div>

        <div class="flex justify-center pt-1 gap-3">
          <!-- Event Log button -->
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]
                 hover:border-[var(--color-text-tertiary)]
                 transition-all duration-200 active:scale-95"
            @click="showEventLog = true"
          >
            📋 {{ t('games.tamagotchiGame.log') }}
            <span v-if="eventLogCount > 0"
                  class="text-xs px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
              {{ eventLogCount }}
            </span>
          </button>
          <button
              class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
                   text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                   bg-[var(--color-bg-elevated)] border border-[var(--glass-border)]
                   hover:border-[var(--color-text-tertiary)]
                   transition-all duration-200 active:scale-95"
              @click="exitGame">
            <BaseIcon name="arrow-left" :size="14" />
            {{ t('games.tamagotchiGame.exitGame') }}
          </button>
        </div>

        <p class="text-center text-xs text-[var(--color-text-tertiary)]">{{ t('games.tamagotchiGame.hint') }}</p>
      </div>
    </div>

    <!-- Exit confirmation modal -->
    <BaseModal
      :is-open="showExitConfirm"
      :title="t('games.tamagotchiGame.exitTitle')"
      size="sm"
      @close="showExitConfirm = false"
    >
      <div class="text-center space-y-4">
        <div class="text-4xl">🦕</div>
        <p class="text-sm text-[var(--color-text-secondary)]">
          {{ t('games.tamagotchiGame.exitDesc') }}
        </p>
      </div>
      <template #footer>
        <div class="flex gap-3 justify-center">
          <button
              class="flex-1 py-2.5 rounded-xl font-semibold text-sm
                   bg-[var(--color-bg-base)] border border-[var(--glass-border)]
                   text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                   transition-all duration-200 active:scale-95"
              @click="showExitConfirm = false">
            {{ t('games.tamagotchiGame.exitCancel') }}
          </button>
          <button
              class="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white
                   bg-gradient-to-r from-red-500 to-rose-600
                   hover:from-red-400 hover:to-rose-500
                   transition-all duration-200 active:scale-95"
              @click="confirmExit">
            {{ t('games.tamagotchiGame.exitConfirm') }}
          </button>
        </div>
      </template>
    </BaseModal>

    <!-- Event Log modal -->
    <BaseModal
      :is-open="showEventLog"
      :title="t('games.tamagotchiGame.eventLog')"
      size="md"
      @close="showEventLog = false"
    >
      <div v-if="eventLog.length === 0" class="text-center py-8 text-[var(--color-text-tertiary)]">
        {{ t('games.tamagotchiGame.eventLogEmpty') }}
      </div>
      <div v-else class="space-y-2 max-h-96 overflow-y-auto">
        <div
          v-for="entry in eventLog"
          :key="entry.id"
          class="flex items-start gap-3 px-3 py-2 rounded-lg text-sm"
          :class="{
            'bg-amber-500/5': entry.category === 'event',
            'bg-red-500/5': entry.category === 'warning' || entry.category === 'death',
            'bg-emerald-500/5': entry.category === 'life',
          }"
        >
          <span class="text-lg flex-shrink-0">{{ entry.icon }}</span>
          <span class="flex-1 text-[var(--color-text-primary)]">{{ entry.text }}</span>
          <span class="text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
            {{ new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <button
            class="px-4 py-2 rounded-xl font-semibold text-sm text-white
                 bg-gradient-to-r from-amber-500 to-orange-500
                 hover:from-amber-400 hover:to-orange-400
                 transition-all duration-200 active:scale-95"
            @click="showEventLog = false">
            {{ t('games.tamagotchiGame.close') }}
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
button {
  touch-action: manipulation;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>