<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { dinosaurs } from '@/data/dinosaurs'
import type { Dinosaur } from '@/types/dinosaur'
import { useLocale } from '@/composables/useLocale'
import { useDinoTranslator } from '@/composables/useDinoTranslation'

type Phase = 'select' | 'intro' | 'battle' | 'result'
type FighterSide = 'a' | 'b'
type SpecialMoveKey = 'specialSavageBite' | 'specialShieldStance' | 'specialAerialStrike' | 'specialCrushingGrip'
type LogKind = 'system' | 'round' | 'turn'

interface BattleStats {
  hp: number
  attack: number
  defense: number
  speed: number
  dodgePct: number
}

interface BattleTurn {
  round: number
  attacker: FighterSide
  defender: FighterSide
  damage: number
  missed: boolean
  critical: boolean
  attackerSpecials: SpecialMoveKey[]
  defenderSpecials: SpecialMoveKey[]
  defenderHpAfter: number
}

interface BattleSummary {
  stats: Record<FighterSide, BattleStats>
  turns: BattleTurn[]
  winner: FighterSide | null
  timeout: boolean
  finalHp: Record<FighterSide, number>
  totalDamage: Record<FighterSide, number>
  rounds: number
}

interface LogEntry {
  id: number
  text: string
  kind: LogKind
}

interface StatRow {
  key: keyof BattleStats
  label: string
  value: number
  max: number
  colorClass: string
  suffix?: string
}

const TURN_DELAY_MS = 1200
const INTRO_DELAY_MS = 3500
const MAX_ROUNDS = 30
const statCaps: Record<keyof BattleStats, number> = {
  hp: 1000,
  attack: 180,
  defense: 100,
  speed: 120,
  dodgePct: 40,
}

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const { translateDino } = useDinoTranslator()

function dinoName(dino: Dinosaur): string {
  return translateDino(dino).displayName
}

const phase = ref<Phase>('select')
const searchTerm = ref('')
const selectedSlots = ref<[string | null, string | null]>([null, null])
const introReady = ref(false)
const battleSummary = ref<BattleSummary | null>(null)
const displayedLogs = ref<LogEntry[]>([])
const currentHp = ref<Record<FighterSide, number>>({ a: 0, b: 0 })
const damageDealt = ref<Record<FighterSide, number>>({ a: 0, b: 0 })
const activeHit = ref<FighterSide | null>(null)
const currentRound = ref(0)
const logContainer = ref<HTMLDivElement | null>(null)

const dinoMap = new Map(dinosaurs.map(dino => [dino.id, dino] as const))
const statsMap = new Map(dinosaurs.map(dino => [dino.id, computeStats(dino)] as const))

let introTimer: ReturnType<typeof setTimeout> | null = null
let battleTimer: ReturnType<typeof setTimeout> | null = null
let resultTimer: ReturnType<typeof setTimeout> | null = null
let hitTimer: ReturnType<typeof setTimeout> | null = null
let playbackIndex = 0
let logId = 0

const fighterA = computed(() => selectedSlots.value[0] ? dinoMap.get(selectedSlots.value[0]) ?? null : null)
const fighterB = computed(() => selectedSlots.value[1] ? dinoMap.get(selectedSlots.value[1]) ?? null : null)
const fighterStats = computed(() => ({
  a: fighterA.value ? getStats(fighterA.value) : null,
  b: fighterB.value ? getStats(fighterB.value) : null,
}))
const canFight = computed(() => Boolean(fighterA.value && fighterB.value))
const winnerSide = computed(() => battleSummary.value?.winner ?? null)
const winnerDino = computed(() => {
  if (winnerSide.value === 'a') return fighterA.value
  if (winnerSide.value === 'b') return fighterB.value
  return null
})
const resultTitle = computed(() => {
  if (!battleSummary.value) return ''
  return winnerDino.value
    ? t('games.battleGame.winner', { name: dinoName(winnerDino.value) })
    : t('games.battleGame.draw')
})
const resultTurnsText = computed(() => battleSummary.value ? t('games.battleGame.turns', { n: battleSummary.value.rounds }) : '')
const timeoutText = computed(() => {
  if (!battleSummary.value?.timeout || !winnerDino.value) return ''
  return t('games.battleGame.timeoutWinner', { name: dinoName(winnerDino.value) })
})
const filteredDinosaurs = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  return [...dinosaurs]
    .filter((dino) => {
      if (!term) return true
      return [dinoName(dino), dino.id, dino.category, dino.diet].some(value => value.toLowerCase().includes(term))
    })
    .sort((left, right) => {
      const leftSelected = selectedSlots.value.includes(left.id) ? 1 : 0
      const rightSelected = selectedSlots.value.includes(right.id) ? 1 : 0
      if (leftSelected !== rightSelected) return rightSelected - leftSelected
      if (right.dangerLevel !== left.dangerLevel) return right.dangerLevel - left.dangerLevel
      return dinoName(left).localeCompare(dinoName(right))
    })
})

watch(() => displayedLogs.value.length, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
})

onBeforeUnmount(() => {
  clearTimers()
})

function computeStats(dino: Dinosaur): BattleStats {
  const hp = Math.round(dino.dimensions.weightKg * 0.05 + dino.dangerLevel * 50 + 100)
  const attack = Math.round(dino.dangerLevel * 8 + dino.dimensions.weightKg * 0.003 + dino.dimensions.lengthMeters * 4)
  const defense = Math.round(dino.dimensions.weightKg * 0.002 + dino.dimensions.heightMeters * 6)
  const speed = dino.dimensions.speedKmh
  const dodgePct = Math.min(40, Math.round(dino.dimensions.speedKmh * 0.4 + dino.intelligence * 2))
  return { hp, attack, defense, speed, dodgePct }
}

function getStats(dino: Dinosaur): BattleStats {
  return statsMap.get(dino.id) ?? computeStats(dino)
}

function selectDino(dino: Dinosaur) {
  if (selectedSlots.value.includes(dino.id)) return

  const [first, second] = selectedSlots.value
  if (!first) {
    selectedSlots.value = [dino.id, second]
  } else if (!second) {
    selectedSlots.value = [first, dino.id]
  } else {
    selectedSlots.value = [first, dino.id]
  }

  resetPlaybackState(false)
}

function deselect(slotIndex: 0 | 1) {
  const [first, second] = selectedSlots.value
  selectedSlots.value = slotIndex === 0 ? [second, null] : [first, null]
  resetPlaybackState(false)
}

function isSelected(id: string) {
  return selectedSlots.value.includes(id)
}

function prepareBattle() {
  if (!fighterA.value || !fighterB.value) return

  clearTimers()
  battleSummary.value = simulateBattle(fighterA.value, fighterB.value)
  displayedLogs.value = []
  logId = 0
  currentRound.value = 0
  playbackIndex = 0
  currentHp.value = {
    a: battleSummary.value.stats.a.hp,
    b: battleSummary.value.stats.b.hp,
  }
  damageDealt.value = { a: 0, b: 0 }
  activeHit.value = null
  phase.value = 'intro'
  introReady.value = false

  nextTick(() => {
    introReady.value = true
  })

  introTimer = setTimeout(() => {
    startBattle()
  }, INTRO_DELAY_MS)
}

function startBattle() {
  if (!battleSummary.value) return

  clearIntroTimer()
  clearBattleTimer()
  clearResultTimer()
  displayedLogs.value = []
  logId = 0
  currentRound.value = 0
  playbackIndex = 0
  currentHp.value = {
    a: battleSummary.value.stats.a.hp,
    b: battleSummary.value.stats.b.hp,
  }
  damageDealt.value = { a: 0, b: 0 }
  phase.value = 'battle'
  addLog(t('games.battleGame.battleStart'), 'system')
  scheduleNextTurn(700)
}

function scheduleNextTurn(delay = TURN_DELAY_MS) {
  clearBattleTimer()
  battleTimer = setTimeout(() => {
    playNextTurn()
  }, delay)
}

function playNextTurn() {
  if (phase.value !== 'battle' || !battleSummary.value) return

  const turn = battleSummary.value.turns[playbackIndex]
  if (!turn) {
    finishBattle()
    return
  }

  if (currentRound.value !== turn.round) {
    currentRound.value = turn.round
    addLog(t('games.battleGame.roundLabel', { n: turn.round }), 'round')
  }

  for (const special of turn.attackerSpecials) {
    addLog(t(`games.battleGame.${special}`))
  }
  for (const special of turn.defenderSpecials) {
    addLog(t(`games.battleGame.${special}`))
  }

  const attacker = getSideDino(turn.attacker)
  const defender = getSideDino(turn.defender)
  if (!attacker || !defender) return

  if (turn.missed) {
    addLog(t('games.battleGame.miss', { attacker: dinoName(attacker) }))
    addLog(t('games.battleGame.dodge', { defender: dinoName(defender) }))
  } else {
    if (turn.critical) {
      addLog(t('games.battleGame.crit'))
    }
    addLog(t('games.battleGame.hit', {
      attacker: dinoName(attacker),
      defender: dinoName(defender),
      dmg: turn.damage,
    }))

    currentHp.value = {
      ...currentHp.value,
      [turn.defender]: turn.defenderHpAfter,
    }
    damageDealt.value = {
      ...damageDealt.value,
      [turn.attacker]: damageDealt.value[turn.attacker] + turn.damage,
    }
    triggerHit(turn.defender)
  }

  playbackIndex += 1
  if (playbackIndex >= battleSummary.value.turns.length || turn.defenderHpAfter <= 0) {
    finishBattle()
    return
  }

  scheduleNextTurn()
}

function finishBattle() {
  clearBattleTimer()
  clearResultTimer()
  addLog(t('games.battleGame.battleEnd'), 'system')

  if (battleSummary.value?.timeout && winnerDino.value) {
    addLog(t('games.battleGame.timeoutWinner', { name: dinoName(winnerDino.value) }), 'system')
  }

  resultTimer = setTimeout(() => {
    phase.value = 'result'
  }, 800)
}

function skipToResult() {
  if (!battleSummary.value) return

  clearTimers()
  currentHp.value = { ...battleSummary.value.finalHp }
  damageDealt.value = { ...battleSummary.value.totalDamage }
  phase.value = 'result'
}

function battleAgain() {
  resetPlaybackState(false)
  phase.value = 'select'
}

function newBattle() {
  resetPlaybackState(true)
  phase.value = 'select'
}

function resetPlaybackState(clearSelection: boolean) {
  clearTimers()
  battleSummary.value = null
  displayedLogs.value = []
  currentRound.value = 0
  playbackIndex = 0
  activeHit.value = null
  introReady.value = false
  logId = 0
  if (clearSelection) {
    selectedSlots.value = [null, null]
    searchTerm.value = ''
  }
}

function clearTimers() {
  clearIntroTimer()
  clearBattleTimer()
  clearResultTimer()
  clearHitTimer()
}

function clearIntroTimer() {
  if (introTimer) {
    clearTimeout(introTimer)
    introTimer = null
  }
}

function clearBattleTimer() {
  if (battleTimer) {
    clearTimeout(battleTimer)
    battleTimer = null
  }
}

function clearResultTimer() {
  if (resultTimer) {
    clearTimeout(resultTimer)
    resultTimer = null
  }
}

function clearHitTimer() {
  if (hitTimer) {
    clearTimeout(hitTimer)
    hitTimer = null
  }
}

function triggerHit(side: FighterSide) {
  activeHit.value = side
  clearHitTimer()
  hitTimer = setTimeout(() => {
    activeHit.value = null
    hitTimer = null
  }, 450)
}

function simulateBattle(left: Dinosaur, right: Dinosaur): BattleSummary {
  const stats: Record<FighterSide, BattleStats> = {
    a: getStats(left),
    b: getStats(right),
  }
  const hp: Record<FighterSide, number> = {
    a: stats.a.hp,
    b: stats.b.hp,
  }
  const totalDamage: Record<FighterSide, number> = { a: 0, b: 0 }
  const turns: BattleTurn[] = []
  let rounds = 0

  while (hp.a > 0 && hp.b > 0 && rounds < MAX_ROUNDS) {
    rounds += 1
    const order = determineRoundOrder(stats)

    for (const attacker of order) {
      const defender: FighterSide = attacker === 'a' ? 'b' : 'a'
      if (hp.a <= 0 || hp.b <= 0) break

      const attackerDino = attacker === 'a' ? left : right
      const defenderDino = defender === 'a' ? left : right
      const attackerStats = stats[attacker]
      const defenderStats = stats[defender]
      let damageMultiplier = 1
      let dodgeBonus = 0
      const attackerSpecials: SpecialMoveKey[] = []
      const defenderSpecials: SpecialMoveKey[] = []

      if (attackerDino.diet === 'carnivore' && Math.random() < 0.22) {
        damageMultiplier *= 1.2
        attackerSpecials.push('specialSavageBite')
      }
      if (attackerDino.category === 'marine-reptile' && Math.random() < 0.18) {
        damageMultiplier *= 1.15
        attackerSpecials.push('specialCrushingGrip')
      }
      if (defenderDino.diet === 'herbivore' && Math.random() < 0.2) {
        damageMultiplier *= 0.5
        defenderSpecials.push('specialShieldStance')
      }
      if (defenderDino.category === 'flying-reptile' && Math.random() < 0.2) {
        dodgeBonus += 12
        defenderSpecials.push('specialAerialStrike')
      }

      const missed = Math.random() * 100 < Math.min(60, defenderStats.dodgePct + dodgeBonus)
      let damage = 0
      let critical = false

      if (!missed) {
        damage = Math.max(1, attackerStats.attack - defenderStats.defense + randomBetween(-8, 15))
        damage = Math.max(1, Math.round(damage * damageMultiplier))

        if (Math.random() < 0.15) {
          critical = true
          damage = Math.max(1, Math.round(damage * 1.8))
        }

        hp[defender] = Math.max(0, hp[defender] - damage)
        totalDamage[attacker] += damage
      }

      turns.push({
        round: rounds,
        attacker,
        defender,
        damage,
        missed,
        critical,
        attackerSpecials,
        defenderSpecials,
        defenderHpAfter: hp[defender],
      })

      if (hp[defender] <= 0) break
    }
  }

  const timeout = hp.a > 0 && hp.b > 0 && rounds >= MAX_ROUNDS
  const winner = hp.a === hp.b ? null : hp.a > hp.b ? 'a' : 'b'

  return {
    stats,
    turns,
    winner,
    timeout,
    finalHp: hp,
    totalDamage,
    rounds,
  }
}

function determineRoundOrder(stats: Record<FighterSide, BattleStats>): FighterSide[] {
  if (stats.a.speed === stats.b.speed) {
    return Math.random() < 0.5 ? ['a', 'b'] : ['b', 'a']
  }
  return stats.a.speed > stats.b.speed ? ['a', 'b'] : ['b', 'a']
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getSideDino(side: FighterSide) {
  return side === 'a' ? fighterA.value : fighterB.value
}

function addLog(text: string, kind: LogKind = 'turn') {
  displayedLogs.value.push({
    id: ++logId,
    text,
    kind,
  })
}

function getHealthPercent(side: FighterSide) {
  const stats = battleSummary.value?.stats[side]
  if (!stats) return 0
  return Math.max(0, Math.min(100, (currentHp.value[side] / stats.hp) * 100))
}

function getStatRows(stats: BattleStats): StatRow[] {
  return [
    { key: 'hp', label: t('games.battleGame.statHp'), value: stats.hp, max: statCaps.hp, colorClass: 'from-rose-500 to-pink-500' },
    { key: 'attack', label: t('games.battleGame.statAtk'), value: stats.attack, max: statCaps.attack, colorClass: 'from-amber-500 to-orange-500' },
    { key: 'defense', label: t('games.battleGame.statDef'), value: stats.defense, max: statCaps.defense, colorClass: 'from-sky-500 to-cyan-500' },
    { key: 'speed', label: t('games.battleGame.statSpd'), value: stats.speed, max: statCaps.speed, colorClass: 'from-emerald-500 to-lime-500' },
    { key: 'dodgePct', label: t('games.battleGame.statDodge'), value: stats.dodgePct, max: statCaps.dodgePct, colorClass: 'from-violet-500 to-fuchsia-500', suffix: '%' },
  ]
}

function statPercent(row: StatRow) {
  return Math.max(4, Math.min(100, (row.value / row.max) * 100))
}

function dinoEmoji(dino: Dinosaur) {
  if (dino.category === 'flying-reptile') return '🪽'
  if (dino.category === 'marine-reptile') return '🌊'
  if (dino.diet === 'herbivore') return '🦕'
  return '🦖'
}

function numberText(value: number) {
  return new Intl.NumberFormat(locale.value).format(Math.round(value))
}

function shortNum(value: number): string {
  const v = Math.round(value)
  if (v >= 1000) return `${(v / 1000).toFixed(1).replace('.0', '')}k`
  return String(v)
}

function massText(weightKg: number) {
  return `${numberText(weightKg)} kg`
}

function speedText(speedKmh: number) {
  return `${numberText(speedKmh)} km/h`
}

function logClass(kind: LogKind) {
  if (kind === 'system') return 'border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100'
  if (kind === 'round') return 'border-sky-200 bg-sky-50/80 text-sky-900 dark:border-sky-900/70 dark:bg-sky-950/30 dark:text-sky-100'
  return 'border-slate-200 bg-white/80 text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200'
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
    <SeoHead :title="t('games.battleGame.title')" :description="t('games.battleGame.subtitle')" />

    <div class="mb-4 sm:mb-8">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        <span>←</span>
        <span>{{ t('games.battleGame.backToGames') }}</span>
      </router-link>
      <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {{ t('games.battleGame.title') }}
      </h1>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-300 sm:mt-2 sm:text-base">
        {{ t('games.battleGame.subtitle') }}
      </p>
    </div>

    <div v-if="phase === 'select'" class="space-y-4">
      <!-- Fighter slots — always 2-column on mobile -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_auto]">
        <!-- Fighter A -->
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {{ t('games.battleGame.fighter1') }}
          </p>
          <div v-if="fighterA" class="relative flex items-center gap-2 sm:gap-4">
            <img :src="fighterA.images.card" :alt="dinoName(fighterA)" class="h-14 w-14 flex-shrink-0 rounded-xl object-cover sm:h-20 sm:w-20 sm:rounded-2xl" />
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-lg">{{ dinoName(fighterA) }}</div>
              <div class="mt-1 flex flex-wrap gap-1 text-xs text-slate-600 dark:text-slate-300 sm:gap-2 sm:text-sm">
                <span>⚖️ {{ massText(fighterA.dimensions.weightKg) }}</span>
                <span>⚡ {{ fighterA.dimensions.speedKmh }}</span>
              </div>
            </div>
            <button
              type="button"
              class="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white sm:h-9 sm:w-9"
              @click="deselect(0)"
            >×</button>
          </div>
          <div v-else class="flex min-h-[3.5rem] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-900 sm:min-h-20 sm:rounded-2xl sm:text-sm">
            {{ t('games.battleGame.fighter1') }}
          </div>
        </div>

        <!-- Fighter B -->
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {{ t('games.battleGame.fighter2') }}
          </p>
          <div v-if="fighterB" class="relative flex items-center gap-2 sm:gap-4">
            <img :src="fighterB.images.card" :alt="dinoName(fighterB)" class="h-14 w-14 flex-shrink-0 rounded-xl object-cover sm:h-20 sm:w-20 sm:rounded-2xl" />
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-lg">{{ dinoName(fighterB) }}</div>
              <div class="mt-1 flex flex-wrap gap-1 text-xs text-slate-600 dark:text-slate-300 sm:gap-2 sm:text-sm">
                <span>⚖️ {{ massText(fighterB.dimensions.weightKg) }}</span>
                <span>⚡ {{ fighterB.dimensions.speedKmh }}</span>
              </div>
            </div>
            <button
              type="button"
              class="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white sm:h-9 sm:w-9"
              @click="deselect(1)"
            >×</button>
          </div>
          <div v-else class="flex min-h-[3.5rem] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-900 sm:min-h-20 sm:rounded-2xl sm:text-sm">
            {{ t('games.battleGame.fighter2') }}
          </div>
        </div>

        <!-- Fight button — full width on mobile, aligned right on desktop -->
        <div class="col-span-2 flex items-center justify-center lg:col-span-1 lg:justify-end">
          <BaseButton v-if="canFight" size="lg" class="w-full sm:w-auto" @click="prepareBattle">
            {{ t('games.battleGame.fight') }}
          </BaseButton>
          <div v-else class="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-3 py-3 text-center text-xs font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 sm:py-4 sm:text-sm">
            {{ t('games.battleGame.selectHint') }}
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4">
        <input
          v-model="searchTerm"
          type="search"
          :placeholder="t('games.battleGame.searchPlaceholder')"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:rounded-2xl"
        >
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-x-4 gap-y-1.5 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
        <span class="font-semibold text-slate-700 dark:text-slate-200">{{ t('games.battleGame.legend') }}:</span>
        <span>⚖️ {{ t('games.battleGame.legendWeight') }}</span>
        <span>⚡ {{ t('games.battleGame.legendSpeed') }}</span>
        <span>🧠 {{ t('games.battleGame.legendIntelligence') }}</span>
        <span>🔴 {{ t('games.battleGame.legendDanger') }}</span>
      </div>

      <div class="max-h-[32rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:rounded-3xl sm:p-4">
        <div class="grid grid-cols-2 gap-3 xl:grid-cols-3">
          <button
            v-for="dino in filteredDinosaurs"
            :key="dino.id"
            type="button"
            class="group overflow-hidden rounded-2xl border text-left transition duration-200 active:scale-95 sm:rounded-3xl sm:hover:-translate-y-1 sm:hover:shadow-xl"
            :class="isSelected(dino.id)
              ? 'border-red-400 bg-red-50 shadow-lg shadow-red-500/10 dark:border-red-500 dark:bg-red-950/30'
              : 'border-slate-200 bg-white hover:border-red-300 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-red-700'"
            @click="selectDino(dino)"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img :src="dino.images.card" :alt="dinoName(dino)" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              <div class="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold text-white">
                {{ dinoEmoji(dino) }} {{ dino.dangerLevel }}
              </div>
            </div>
            <div class="space-y-2 p-2 sm:p-3">
              <div class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ dinoName(dino) }}</div>
              <div class="grid grid-cols-3 gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div class="rounded-lg bg-slate-100 py-1 text-center dark:bg-slate-800">
                  <div>⚖️</div>
                  <div class="truncate">{{ numberText(dino.dimensions.weightKg) }}</div>
                </div>
                <div class="rounded-lg bg-slate-100 py-1 text-center dark:bg-slate-800">
                  <div>⚡</div>
                  <div>{{ dino.dimensions.speedKmh }}</div>
                </div>
                <div class="rounded-lg bg-slate-100 py-1 text-center dark:bg-slate-800">
                  <div>🧠</div>
                  <div>{{ dino.intelligence }}</div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="phase === 'intro' && fighterA && fighterB && fighterStats.a && fighterStats.b" class="rounded-2xl border border-red-200 bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 p-4 text-white shadow-2xl dark:border-red-900/70 sm:rounded-[2rem] sm:p-8">
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
        <!-- Fighter A -->
        <div class="transition-all duration-700" :class="introReady ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
          <div class="rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:rounded-3xl sm:p-5">
            <img :src="fighterA.images.card" :alt="dinoName(fighterA)" class="mb-2 h-28 w-full rounded-xl object-cover sm:mb-4 sm:h-48 sm:rounded-3xl lg:h-56" />
            <div class="text-base font-black sm:text-2xl lg:text-3xl">{{ dinoName(fighterA) }}</div>
            <div class="mt-2 hidden space-y-2 sm:block sm:mt-5 sm:space-y-3">
              <div v-for="row in getStatRows(fighterStats.a)" :key="row.key">
                <div class="mb-1 flex items-center justify-between text-xs font-semibold sm:text-sm">
                  <span>{{ row.label }}</span>
                  <span>{{ row.value }}{{ row.suffix ?? '' }}</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-white/10 sm:h-3">
                  <div class="h-full rounded-full bg-gradient-to-r transition-all duration-700" :class="row.colorClass" :style="{ width: `${statPercent(row)}%` }" />
                </div>
              </div>
            </div>
            <!-- Compact stats for mobile -->
            <div class="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] font-bold leading-tight sm:hidden">
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">❤️<br>{{ shortNum(fighterStats.a.hp) }}</div>
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">⚔️<br>{{ shortNum(fighterStats.a.attack) }}</div>
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">🛡️<br>{{ shortNum(fighterStats.a.defense) }}</div>
            </div>
          </div>
        </div>

        <!-- VS -->
        <div class="text-center transition-all duration-700 delay-100" :class="introReady ? 'scale-100 opacity-100' : 'scale-75 opacity-0'">
          <div class="text-3xl font-black tracking-[0.2em] text-red-300 drop-shadow-[0_0_30px_rgba(248,113,113,0.7)] sm:text-6xl lg:text-8xl">VS</div>
          <div class="mt-2 text-2xl sm:mt-4 sm:text-5xl">⚔️</div>
        </div>

        <!-- Fighter B -->
        <div class="transition-all duration-700 delay-150" :class="introReady ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'">
          <div class="rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:rounded-3xl sm:p-5">
            <img :src="fighterB.images.card" :alt="dinoName(fighterB)" class="mb-2 h-28 w-full rounded-xl object-cover sm:mb-4 sm:h-48 sm:rounded-3xl lg:h-56" />
            <div class="text-base font-black sm:text-2xl lg:text-3xl">{{ dinoName(fighterB) }}</div>
            <div class="mt-2 hidden space-y-2 sm:block sm:mt-5 sm:space-y-3">
              <div v-for="row in getStatRows(fighterStats.b)" :key="row.key">
                <div class="mb-1 flex items-center justify-between text-xs font-semibold sm:text-sm">
                  <span>{{ row.label }}</span>
                  <span>{{ row.value }}{{ row.suffix ?? '' }}</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-white/10 sm:h-3">
                  <div class="h-full rounded-full bg-gradient-to-r transition-all duration-700" :class="row.colorClass" :style="{ width: `${statPercent(row)}%` }" />
                </div>
              </div>
            </div>
            <!-- Compact stats for mobile -->
            <div class="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] font-bold leading-tight sm:hidden">
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">❤️<br>{{ shortNum(fighterStats.b.hp) }}</div>
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">⚔️<br>{{ shortNum(fighterStats.b.attack) }}</div>
              <div class="rounded-lg bg-white/10 px-0.5 py-1.5">🛡️<br>{{ shortNum(fighterStats.b.defense) }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else-if="phase === 'battle' && fighterA && fighterB && battleSummary" class="space-y-3 sm:space-y-6">
      <!-- HP Bars — always side-by-side -->
      <div class="grid grid-cols-2 gap-2 sm:gap-4">
        <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div class="mb-1.5 flex items-center justify-between gap-2">
            <div class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ dinoName(fighterA) }}</div>
            <div class="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ numberText(currentHp.a) }}</div>
          </div>
          <div class="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all duration-700" :style="{ width: `${getHealthPercent('a')}%` }" />
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div class="mb-1.5 flex items-center justify-between gap-2">
            <div class="truncate text-sm font-bold text-slate-900 dark:text-white">{{ dinoName(fighterB) }}</div>
            <div class="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ numberText(currentHp.b) }}</div>
          </div>
          <div class="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div class="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-700" :style="{ width: `${getHealthPercent('b')}%` }" />
          </div>
        </div>
      </div>

      <!-- Battle arena — always 3-column layout -->
      <div class="rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-3 shadow-lg dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/40 sm:rounded-[2rem] sm:p-6">
        <div class="mb-3 flex items-center justify-between gap-3 sm:mb-6">
          <div class="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200 sm:px-4 sm:py-2 sm:text-sm">
            {{ currentRound > 0 ? t('games.battleGame.roundLabel', { n: currentRound }) : '⚔️' }}
          </div>
          <BaseButton variant="ghost" size="sm" @click="skipToResult">
            {{ t('games.battleGame.skipToResult') }}
          </BaseButton>
        </div>

        <!-- Always side-by-side dinos with explosion in center -->
        <div class="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-6">
          <div class="text-center">
            <img
              :src="fighterA.images.card"
              :alt="dinoName(fighterA)"
              class="mx-auto w-full rounded-2xl object-cover shadow-xl transition-transform duration-300 sm:rounded-[2rem]"
              style="max-height: 220px; height: clamp(100px, 28vw, 220px);"
              :class="activeHit === 'a' ? 'animate-battle-hit' : ''"
            />
            <div class="mt-1.5 truncate text-xs font-black text-slate-900 dark:text-white sm:mt-4 sm:text-xl">{{ dinoName(fighterA) }}</div>
          </div>

          <div class="flex items-center justify-center pb-8 text-3xl sm:pb-10 sm:text-6xl">💥</div>

          <div class="text-center">
            <img
              :src="fighterB.images.card"
              :alt="dinoName(fighterB)"
              class="mx-auto w-full rounded-2xl object-cover shadow-xl transition-transform duration-300 sm:rounded-[2rem]"
              style="max-height: 220px; height: clamp(100px, 28vw, 220px);"
              :class="activeHit === 'b' ? 'animate-battle-hit' : ''"
            />
            <div class="mt-1.5 truncate text-xs font-black text-slate-900 dark:text-white sm:mt-4 sm:text-xl">{{ dinoName(fighterB) }}</div>
          </div>
        </div>
      </div>

      <!-- Battle log -->
      <div class="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:rounded-[2rem] sm:p-5">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div class="text-base font-black text-slate-900 dark:text-white">📜</div>
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ displayedLogs.length }}</div>
        </div>
        <div ref="logContainer" class="max-h-48 space-y-1.5 overflow-y-auto pr-1 sm:max-h-64">
          <div
            v-for="entry in displayedLogs"
            :key="entry.id"
            class="rounded-xl border px-3 py-2 text-xs leading-relaxed sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            :class="logClass(entry.kind)"
          >
            {{ entry.text }}
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="phase === 'result' && fighterA && fighterB && battleSummary && fighterStats.a && fighterStats.b" class="space-y-4 sm:space-y-6">
      <!-- Winner banner -->
      <div class="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 via-white to-orange-100 p-4 text-center shadow-xl dark:border-amber-900/50 dark:from-amber-950/40 dark:via-slate-950 dark:to-orange-950/40 sm:rounded-[2rem] sm:p-6">
        <div class="mb-3 text-5xl sm:text-6xl">🏆</div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white sm:text-4xl">
          {{ resultTitle }}
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:mt-3 sm:text-base">
          {{ resultTurnsText }}
        </p>
        <p v-if="timeoutText" class="mt-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 sm:mt-2 sm:text-sm">
          {{ timeoutText }}
        </p>
      </div>

      <!-- Result cards — always side-by-side -->
      <div class="grid grid-cols-2 gap-3 sm:gap-6">
        <div class="rounded-2xl border p-3 shadow-sm sm:rounded-[2rem] sm:p-5"
          :class="winnerSide === 'a'
            ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-700 dark:bg-emerald-950/20'
            : 'border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80'"
        >
          <img :src="fighterA.images.card" :alt="dinoName(fighterA)" class="mb-3 w-full rounded-xl object-cover sm:mb-4 sm:rounded-[1.5rem]" style="height: clamp(90px, 22vw, 192px);" />
          <div class="mb-2 flex items-center justify-between gap-1 sm:mb-4 sm:gap-3">
            <div class="truncate text-sm font-black text-slate-900 dark:text-white sm:text-2xl">{{ dinoName(fighterA) }}</div>
            <div class="shrink-0 text-xl sm:text-3xl">{{ winnerSide === 'a' ? '👑' : dinoEmoji(fighterA) }}</div>
          </div>
          <div class="mb-3 rounded-xl bg-slate-100 px-2 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:mb-4 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
            ❤️ {{ numberText(currentHp.a) }} · 💥 {{ numberText(damageDealt.a) }}
          </div>
          <div class="space-y-2">
            <div v-for="row in getStatRows(fighterStats.a)" :key="`result-a-${row.key}`">
              <div class="mb-0.5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span class="truncate">{{ row.label }}</span>
                <span class="shrink-0 pl-1">{{ row.value }}{{ row.suffix ?? '' }}</span>
              </div>
              <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div class="h-full rounded-full bg-gradient-to-r" :class="row.colorClass" :style="{ width: `${statPercent(row)}%` }" />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border p-3 shadow-sm sm:rounded-[2rem] sm:p-5"
          :class="winnerSide === 'b'
            ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-700 dark:bg-emerald-950/20'
            : 'border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80'"
        >
          <img :src="fighterB.images.card" :alt="dinoName(fighterB)" class="mb-3 w-full rounded-xl object-cover sm:mb-4 sm:rounded-[1.5rem]" style="height: clamp(90px, 22vw, 192px);" />
          <div class="mb-2 flex items-center justify-between gap-1 sm:mb-4 sm:gap-3">
            <div class="truncate text-sm font-black text-slate-900 dark:text-white sm:text-2xl">{{ dinoName(fighterB) }}</div>
            <div class="shrink-0 text-xl sm:text-3xl">{{ winnerSide === 'b' ? '👑' : dinoEmoji(fighterB) }}</div>
          </div>
          <div class="mb-3 rounded-xl bg-slate-100 px-2 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:mb-4 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
            ❤️ {{ numberText(currentHp.b) }} · 💥 {{ numberText(damageDealt.b) }}
          </div>
          <div class="space-y-2">
            <div v-for="row in getStatRows(fighterStats.b)" :key="`result-b-${row.key}`">
              <div class="mb-0.5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span class="truncate">{{ row.label }}</span>
                <span class="shrink-0 pl-1">{{ row.value }}{{ row.suffix ?? '' }}</span>
              </div>
              <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div class="h-full rounded-full bg-gradient-to-r" :class="row.colorClass" :style="{ width: `${statPercent(row)}%` }" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="grid gap-3 sm:grid-cols-3">
        <BaseButton size="lg" @click="battleAgain">
          {{ t('games.battleGame.battleAgain') }}
        </BaseButton>
        <BaseButton variant="ghost" size="lg" @click="newBattle">
          {{ t('games.battleGame.newBattle') }}
        </BaseButton>
        <BaseButton variant="ghost" size="lg" :to="localRoute({ name: 'games' })">
          {{ t('games.battleGame.backToGames') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes battle-hit {
  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-10px) rotate(-1deg);
  }
  50% {
    transform: translateX(8px) rotate(1deg);
  }
  75% {
    transform: translateX(-6px) rotate(-1deg);
  }
}

.animate-battle-hit {
  animation: battle-hit 0.45s ease;
}
</style>
