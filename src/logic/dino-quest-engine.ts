import type { Dinosaur, Diet, Era } from '@/types/dinosaur'
import { dinosaurs } from '@/data/dinosaurs'
import { mulberry32, valueNoise2D, shuffleSeeded, pickWeighted, intInRange } from './random'
import type { TrainerDinoEntry, TrainerId, TrainerRosterEntry } from '@/data/dino-quest-trainers'
import type {
  Battle,
  BattleLogEntry,
  BattleStats,
  Biome,
  Direction,
  Encounter,
  Inventory,
  ItemId,
  Poi,
  PoiData,
  PlayerDino,
  Quest,
  Tile,
  TileType,
  WildDino,
  World,
} from './dino-quest-types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const MAP_W = 80
export const MAP_H = 60
export const TILE_SIZE = 16

// ---------------------------------------------------------------------------
// Type effectiveness: attacker diet vs defender diet
// ---------------------------------------------------------------------------

export const TYPE_CHART: Record<Diet, Record<Diet, number>> = {
  carnivore: { herbivore: 1.5, omnivore: 1.0, carnivore: 0.8 },
  herbivore: { carnivore: 0.5, omnivore: 0.8, herbivore: 1.0 },
  omnivore:  { carnivore: 0.8, herbivore: 1.0, omnivore: 1.0 },
}

export function getTypeMultiplier(attacker: Dinosaur, defender: Dinosaur): number {
  return TYPE_CHART[attacker.diet]?.[defender.diet] ?? 1.0
}

const BIOME_BY_ELEVATION: Record<Biome, [number, number]> = {
  desert: [0.25, 0.4],
  plains: [0.4, 0.6],
  forest: [0.6, 0.78],
  swamp: [0.78, 0.92],
  volcanic: [0.92, 1.01],
  coastal: [0.0, 0.25],
}

const WALKABLE: Record<TileType, boolean> = {
  grass: true,
  'tall-grass': true,
  water: false,
  tree: false,
  sand: true,
  rock: false,
  lava: false,
  path: true,
  camp: true,
  ruins: true,
  nest: true,
  volcano: true,
  shop: true,
  trainer: true,
}

const ENCOUNTER_PCT: Record<TileType, number> = {
  grass: 0,
  'tall-grass': 0.12,
  water: 0,
  tree: 0,
  sand: 0.02,
  rock: 0,
  lava: 0,
  path: 0,
  camp: 0,
  ruins: 0,
  nest: 0.05,
  volcano: 0.18,
  shop: 0,
  trainer: 0,
}

const BIOME_TILE_VARIANT: Record<Biome, TileType> = {
  plains: 'grass',
  forest: 'tree',
  swamp: 'tree',
  desert: 'sand',
  coastal: 'sand',
  volcanic: 'rock',
}

// ---------------------------------------------------------------------------
// Seed & world creation
// ---------------------------------------------------------------------------

const RUN_SEED_KEY = 'dino-quest-run-seed-v1'

export function getRunSeed(): number {
  if (typeof localStorage === 'undefined') return Math.floor(Math.random() * 2 ** 31)
  const stored = localStorage.getItem(RUN_SEED_KEY)
  if (stored) {
    const n = Number(stored)
    if (Number.isFinite(n)) return n
  }
  return Math.floor(Math.random() * 2 ** 31)
}

export function setRunSeed(seed: number): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(RUN_SEED_KEY, String(seed))
}

/** Pick a random era, weighted toward middle (Jurassic). */
function pickEra(rng: () => number): Era {
  const eras: Era[] = ['triassic', 'jurassic', 'jurassic', 'cretaceous']
  return eras[Math.floor(rng() * eras.length)]
}

/** Classify a tile by era + elevation + moisture. */
function classifyTile(era: Era, elev: number, moist: number): Tile {
  let biome: Biome
  if (elev < 0.25) biome = 'coastal'
  else if (era === 'triassic') {
    if (elev < 0.4) biome = 'desert'
    else if (elev > 0.78) biome = 'volcanic'
    else biome = 'plains'
  } else if (era === 'jurassic') {
    if (moist > 0.7) biome = 'swamp'
    else if (moist > 0.45) biome = 'forest'
    else if (elev < 0.4) biome = 'coastal'
    else biome = 'plains'
  } else {
    if (moist > 0.62) biome = 'forest'
    else if (elev > 0.85) biome = 'volcanic'
    else if (elev < 0.32) biome = 'coastal'
    else biome = 'plains'
  }

  const variant = BIOME_TILE_VARIANT[biome]
  return {
    type: variant,
    walkable: WALKABLE[variant],
    encounterPct: ENCOUNTER_PCT[variant],
    biome,
  }
}

// ---------------------------------------------------------------------------
// Map generation
// ---------------------------------------------------------------------------

export function generateTiles(seed: number, era: Era): Tile[][] {
  const elevNoise = valueNoise2D(seed ^ 0xa1)
  const moistNoise = valueNoise2D(seed ^ 0x5c)
  const tiles: Tile[][] = []
  for (let y = 0; y < MAP_H; y++) {
    const row: Tile[] = []
    for (let x = 0; x < MAP_W; x++) {
      const e = elevNoise(x, y, 3, 0.06)
      const m = moistNoise(x, y, 3, 0.07)
      row.push(classifyTile(era, e, m))
    }
    tiles.push(row)
  }
  return tiles
}

export function placePois(tiles: Tile[][], seed: number, era: Era, dinoMap: Map<string, Dinosaur>): Poi[] {
  const rng = mulberry32(seed ^ 0x71)
  const eras = dinosByEra(dinoMap, era)
  const pois: Poi[] = []

  /** Mutate a tile to be a POI tile (visible on the map) and record the POI. */
  const stamp = (
    x: number, y: number, kind: 'camp' | 'ruins' | 'nest' | 'shop' | 'trainer',
    data: PoiData = {},
  ): Poi => {
    const t = tiles[y][x]
    t.type = kind
    t.walkable = true
    t.encounterPct = 0
    return { kind, x, y, visited: false, data }
  }

  // 1 camp at the center-ish (always walkable)
  pois.push(stamp(Math.floor(MAP_W / 2), Math.floor(MAP_H / 2), 'camp'))

  // 1 shop somewhere in 30-70% band
  {
    const [x, y] = randomWalkableTile(tiles, rng, 0.3, 0.7, 0.3, 0.7)
    pois.push(stamp(x, y, 'shop'))
  }

  // 3 trainers (Normal / Legendary / Boss) — each at distinct walkable tiles
  const trainerIds: TrainerId[] = ['normal', 'legendary', 'boss']
  for (let i = 0; i < 3; i++) {
    const [x, y] = randomWalkableTile(tiles, rng, 0.2, 0.8, 0.2, 0.8)
    pois.push(stamp(x, y, 'trainer', { trainerId: trainerIds[i] }))
  }

  // 2-3 ruins at random walkable tiles
  for (let i = 0; i < 3; i++) {
    const [x, y] = randomWalkableTile(tiles, rng, 0.3, 0.7, 0.3, 0.7)
    const items: ItemId[] = ['potion', 'super-potion', 'ball', 'great-ball']
    pois.push(stamp(x, y, 'ruins', { itemId: items[Math.floor(rng() * items.length)] }))
  }

  // 2-3 nests with low-level dinos from this era
  for (let i = 0; i < 3; i++) {
    const [x, y] = randomWalkableTile(tiles, rng, 0.15, 0.85, 0.15, 0.85)
    const dinoId = eras[Math.floor(rng() * eras.length)]
    pois.push(stamp(x, y, 'nest', { dinoId }))
  }

  // 0-1 volcano in a volcanic tile
  if (rng() < 0.6) {
    let placed = false
    for (let tries = 0; tries < 40 && !placed; tries++) {
      const x = intInRange(rng, 5, MAP_W - 5)
      const y = intInRange(rng, 5, MAP_H - 5)
      const t = tiles[y][x]
      if (t.biome === 'volcanic') {
        t.type = 'volcano'
        t.walkable = true
        t.encounterPct = 0.18
        pois.push({ kind: 'volcano', x, y, visited: false, data: {} })
        placed = true
      }
    }
  }

  return pois
}

function randomWalkableTile(
  tiles: Tile[][],
  rng: () => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
): [number, number] {
  const taken = new Set<string>(['camp', 'volcano', 'shop', 'trainer', 'ruins', 'nest'])
  for (let tries = 0; tries < 60; tries++) {
    const x = intInRange(rng, Math.floor(MAP_W * xMin), Math.floor(MAP_W * xMax))
    const y = intInRange(rng, Math.floor(MAP_H * yMin), Math.floor(MAP_H * yMax))
    if (tiles[y][x].walkable && !taken.has(tiles[y][x].type)) {
      return [x, y]
    }
  }
  return [Math.floor(MAP_W / 2), Math.floor(MAP_H / 2)]
}

function dinosByEra(map: Map<string, Dinosaur>, era: Era): string[] {
  const out: string[] = []
  for (const d of map.values()) if (d.era === era) out.push(d.id)
  return out
}

// ---------------------------------------------------------------------------
// Tile mutation helpers
// ---------------------------------------------------------------------------

/** Sprinkle 5% tall-grass into grass/forest tiles; ensures ~3-4 visible encounters. */
function sprinkleTallGrass(tiles: Tile[][], rng: () => number): void {
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const t = tiles[y][x]
      if ((t.type === 'grass' || t.type === 'tree') && rng() < 0.18) {
        // Only convert grass variant of forest/plains (not in the deep forest interiors)
        if (t.biome === 'plains' || (t.biome === 'forest' && rng() < 0.4)) {
          t.type = 'tall-grass'
          t.walkable = true
          t.encounterPct = 0.12
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Quest generation
// ---------------------------------------------------------------------------

const QUEST_KEYS: Record<Quest['kind'], string[]> = {
  catch: ['quest.catch_any', 'quest.catch_carnivore', 'quest.catch_herbivore'],
  defeat: ['quest.defeat_any', 'quest.defeat_3'],
  reach: ['quest.reach_edge', 'quest.reach_camp'],
  discover: ['quest.discover_volcano', 'quest.discover_ruins'],
}

function questTextKey(kind: Quest['kind'], rng: () => number): string {
  const pool = QUEST_KEYS[kind]
  return pool[Math.floor(rng() * pool.length)]
}

export function generateQuests(rng: () => number): Quest[] {
  const kinds: Quest['kind'][] = ['catch', 'defeat', 'reach', 'discover']
  const picked: Quest[] = []
  for (let i = 0; i < 3; i++) {
    const kind = kinds[Math.floor(rng() * kinds.length)]
    const target = kind === 'defeat' ? 3 : 1
    picked.push({
      id: `q_${i}_${Math.floor(rng() * 1e6)}`,
      kind,
      descriptionKey: questTextKey(kind, rng),
      target,
      progress: 0,
      rewardItem: kind === 'catch' ? 'ball' : kind === 'defeat' ? 'super-potion' : 'potion',
      completed: false,
    })
  }
  return picked
}

// ---------------------------------------------------------------------------
// World factory
// ---------------------------------------------------------------------------

export function buildDinosaurMap(): Map<string, Dinosaur> {
  const m = new Map<string, Dinosaur>()
  for (const d of dinosaurs) m.set(d.id, d)
  return m
}

export function createWorld(seed?: number, dinoMap?: Map<string, Dinosaur>): World {
  const map = dinoMap ?? buildDinosaurMap()
  const actualSeed = seed ?? getRunSeed()
  const rng = mulberry32(actualSeed)
  const era = pickEra(rng)

  const tiles = generateTiles(actualSeed, era)
  sprinkleTallGrass(tiles, rng)
  const pois = placePois(tiles, actualSeed, era, map)
  const startPoi = pois.find((p) => p.kind === 'camp')!
  const starter = pickStarterDino(era, map, rng)
  const party: PlayerDino[] = [makePlayerDino(starter, 5, map)]
  const quests = generateQuests(rng)
  const inventory: Inventory = {
    items: { potion: 3 },
    balls: 5,
  }

  setRunSeed(actualSeed)
  return {
    seed: actualSeed,
    width: MAP_W,
    height: MAP_H,
    era,
    tiles,
    pois,
    player: {
      x: startPoi.x,
      y: startPoi.y,
      dir: 'down',
      steps: 0,
      party,
      inventory,
      coins: 0,
    },
    quests,
    activeQuestIds: quests.map((q) => q.id),
    stepsTaken: 0,
    resultReason: null,
  }
}

function pickStarterDino(era: Era, map: Map<string, Dinosaur>, rng: () => number): Dinosaur {
  const ids = dinosByEra(map, era)
  // Prefer small/medium carnivore (feels like starter)
  const candidates = ids
    .map((id) => map.get(id)!)
    .filter((d) => d.size === 'small' || d.size === 'medium')
  const pool = candidates.length > 0 ? candidates : ids.map((id) => map.get(id)!)
  return pool[Math.floor(rng() * pool.length)]
}

// ---------------------------------------------------------------------------
// Battle stats
// ---------------------------------------------------------------------------

export function computeBattleStats(dino: Dinosaur, level: number): BattleStats {
  const factor = 1 + (level - 1) * 0.08
  const hp = Math.min(999, Math.round((dino.dimensions.weightKg * 0.05 + dino.dangerLevel * 50 + 100) * factor))
  const attack = Math.min(180, Math.round((dino.dangerLevel * 8 + dino.dimensions.weightKg * 0.003 + dino.dimensions.lengthMeters * 4) * factor))
  const defense = Math.min(100, Math.round((dino.dimensions.weightKg * 0.002 + dino.dimensions.heightMeters * 6) * (1 + (level - 1) * 0.05)))
  const speed = Math.min(120, Math.round(dino.dimensions.speedKmh * (1 + (level - 1) * 0.03)))
  const dodgePct = Math.min(40, Math.round(dino.dimensions.speedKmh * 0.4 + dino.intelligence * 2))
  return { hp, attack, defense, speed, dodgePct }
}

export function makePlayerDino(dino: Dinosaur, level: number, map: Map<string, Dinosaur>): PlayerDino {
  const stats = computeBattleStats(dino, level)
  return {
    dinoId: dino.id,
    level,
    xp: 0,
    hp: stats.hp,
    maxHp: stats.hp,
    stats,
    evolutionStage: 0,
    isPlayerLeader: true,
  }
}

// ---------------------------------------------------------------------------
// Movement & encounters
// ---------------------------------------------------------------------------

export interface StepResult {
  world: World
  encounter?: Encounter
  poi?: Poi
}

export function tryStep(world: World, dir: Direction, rng: () => number): StepResult {
  const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0
  const dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0
  const nx = world.player.x + dx
  const ny = world.player.y + dy
  const out: World = world

  if (nx < 0 || ny < 0 || nx >= world.width || ny >= world.height) return { world: out }
  const tile = world.tiles[ny][nx]
  if (!tile.walkable) return { world: out }

  // Move
  out.player = { ...world.player, x: nx, y: ny, dir, steps: world.player.steps + 1 }
  out.stepsTaken += 1

  // Step on a POI?
  const poi = out.pois.find((p) => p.x === nx && p.y === ny && !p.visited)
  if (poi) {
    return { world: out, poi }
  }

  // Random encounter?
  if (tile.encounterPct > 0 && rng() < tile.encounterPct) {
    const encounter = selectWildEncounter(out, rng)
    return { world: out, encounter }
  }

  return { world: out }
}

export function selectWildEncounter(world: World, rng: () => number): Encounter {
  const era = world.era
  const map = buildDinosaurMap()
  const ids = dinosByEra(map, era)
  const leaderLevel = world.player.party[0]?.level ?? 5
  // Weight: small dinos are common, gigantic are rare
  const weights = ids.map((id) => {
    const d = map.get(id)!
    if (d.size === 'small') return 3
    if (d.size === 'medium') return 2
    if (d.size === 'large') return 1
    return 0.3
  })
  const dinoId = pickWeighted(ids, weights, rng)
  const level = Math.max(1, Math.min(leaderLevel + 5, leaderLevel + intInRange(rng, -2, 3)))
  return { dinoId, level, wild: true }
}

// ---------------------------------------------------------------------------
// Battle
// ---------------------------------------------------------------------------

export function startBattle(world: World, encounter: Encounter, roster?: TrainerRosterEntry): Battle {
  const map = buildDinosaurMap()
  const wildDino = map.get(encounter.dinoId)!
  const wildStats = computeBattleStats(wildDino, encounter.level)
  const leader = world.player.party[0]
  const coinReward = roster ? trainerCoinReward(roster, encounter.level) : 0
  return {
    player: { ...leader },
    wild: {
      dinoId: encounter.dinoId,
      level: encounter.level,
      hp: wildStats.hp,
      maxHp: wildStats.hp,
      stats: wildStats,
    },
    turn: 1,
    log: [],
    result: 'ongoing',
    playerDefending: false,
    wildDefending: false,
    specialCooldown: 0,
    lastHit: null,
    wildSkipped: false,
    coinReward,
    roster,
  }
}

/**
 * Coin reward for defeating a trainer. Scales with trainer tier and opponent level.
 *  - normal:    10 + level
 *  - legendary: 25 + level * 2
 *  - boss:      80 + level * 3
 */
export function trainerCoinReward(roster: TrainerRosterEntry, wildLevel: number): number {
  switch (roster.id) {
    case 'normal':    return 10 + wildLevel
    case 'legendary': return 25 + wildLevel * 2
    case 'boss':      return 80 + wildLevel * 3
  }
}

function pushLog(b: Battle, entry: BattleLogEntry): void {
  b.log = [...b.log, entry]
}

function rollDamage(
  att: BattleStats,
  def: BattleStats,
  defBonus: number,
  rng: () => number,
  mult = 1,
): { dmg: number; crit: boolean; missed: boolean } {
  if (rng() * 100 < Math.min(60, def.dodgePct)) {
    return { dmg: 0, crit: false, missed: true }
  }
  const base = att.attack - Math.floor(def.defense * defBonus)
  const jitter = intInRange(rng, -8, 15)
  const raw = Math.max(1, base + jitter)
  const scaled = Math.max(1, Math.round(raw * mult))
  const crit = rng() < 0.15
  return { dmg: crit ? Math.round(scaled * 1.8) : scaled, crit, missed: false }
}

export type BattleAction = 'attack' | 'defend' | 'special' | 'run' | 'catch' | 'useItem'
/** ballQuality: catch=1..2 (ball tier), useItem=1..3 (potion/super-potion/revive) */

export function executeTurn(battle: Battle, action: BattleAction, ballQuality: 1 | 2 | 3, rng: () => number, t: (key: string, params?: Record<string, string | number>) => string): Battle {
  const b: Battle = {
    ...battle,
    log: [...battle.log],
    player: { ...battle.player },
    wild: { ...battle.wild },
    wildSkipped: false,
  }
  if (b.result !== 'ongoing') return b

  // Player action
  if (action === 'attack') {
    const map = buildDinosaurMap()
    const attacker = map.get(b.player.dinoId)
    const defender = map.get(b.wild.dinoId)
    const mult = attacker && defender ? getTypeMultiplier(attacker, defender) : 1
    const r = rollDamage(b.player.stats, b.wild.stats, b.wildDefending ? 1.5 : 1, rng, mult)
    b.lastHit = { target: 'wild', dmg: r.dmg, crit: r.crit, mult, missed: r.missed, tick: b.turn }
    if (r.missed) {
      pushLog(b, { textKey: 'battle.miss', tone: 'warn' })
    } else {
      b.wild.hp = Math.max(0, b.wild.hp - r.dmg)
      pushLog(b, {
        textKey: r.crit ? 'battle.crit' : 'battle.hit',
        params: { dmg: r.dmg },
        tone: r.crit ? 'celebrate' : 'info',
      })
    }
  } else if (action === 'defend') {
    b.playerDefending = true
    pushLog(b, { textKey: 'battle.defend', tone: 'info' })
  } else if (action === 'special') {
    if (b.specialCooldown > 0) {
      pushLog(b, { textKey: 'battle.specialCooldown', tone: 'warn' })
    } else {
      // Effect depends on player's dino diet/category
      const map = buildDinosaurMap()
      const playerDino = map.get(b.player.dinoId)
      if (playerDino?.category === 'flying-reptile') {
        b.wild.hp = Math.max(0, b.wild.hp - Math.round(b.player.stats.attack * 1.2))
        pushLog(b, { textKey: 'battle.specialAerialStrike', tone: 'success' })
      } else if (playerDino?.category === 'marine-reptile') {
        b.wild.hp = Math.max(0, b.wild.hp - Math.round(b.player.stats.attack * 1.15))
        pushLog(b, { textKey: 'battle.specialCrushingGrip', tone: 'success' })
      } else if (playerDino?.diet === 'carnivore') {
        b.wild.hp = Math.max(0, b.wild.hp - Math.round(b.player.stats.attack * 1.2))
        pushLog(b, { textKey: 'battle.specialSavageBite', tone: 'success' })
      } else {
        b.player.hp = Math.min(b.player.maxHp, b.player.hp + Math.round(b.player.maxHp * 0.25))
        pushLog(b, { textKey: 'battle.specialShieldStance', tone: 'success' })
      }
      b.specialCooldown = 3
    }
  } else if (action === 'run') {
    b.result = 'run'
    pushLog(b, { textKey: 'battle.run', tone: 'info' })
    return b
  } else if (action === 'catch') {
    const ratio = b.wild.hp / b.wild.maxHp
    const lvlDiff = b.player.level - b.wild.level
    const chance = Math.max(5, Math.min(95, ballQuality * 30 - ratio * 40 + lvlDiff * 2))
    const success = rng() * 100 < chance
    pushLog(b, {
      textKey: success ? 'battle.catchSuccess' : 'battle.catchFail',
      params: { pct: Math.round(chance) },
      tone: success ? 'celebrate' : 'warn',
    })
    if (success) {
      b.result = 'catch'
      return b
    }
  } else if (action === 'useItem') {
    // ballQuality 1=potion, 2=super-potion, 3=revive
    const itemKey = ballQuality === 1 ? 'items.potion'
                  : ballQuality === 2 ? 'items.super-potion'
                  : 'items.revive'
    const itemName = t(`games.dinoQuest.${itemKey}`)
    if (ballQuality === 3) {
      // Revive: works from 0 HP up to maxHp
      b.player.hp = b.player.maxHp
    } else {
      const heal = ballQuality === 2 ? 60 : 25
      b.player.hp = Math.min(b.player.maxHp, b.player.hp + heal)
    }
    b.wildSkipped = true
    b.lastHit = { target: 'player', dmg: 0, crit: false, mult: 1, missed: false, tick: b.turn }
    pushLog(b, {
      textKey: 'battle.usedItem',
      params: { item: itemName },
      tone: 'success',
    })
  }

  // Check wild defeated
  if (b.wild.hp <= 0) {
    b.result = 'win'
    pushLog(b, { textKey: 'battle.win', tone: 'celebrate' })
    return b
  }

  // Wild turn (skipped if player used an item this turn)
  if (b.specialCooldown > 0) b.specialCooldown -= 1
  if (!b.wildSkipped) {
    const wr = rollDamage(b.wild.stats, b.player.stats, b.playerDefending ? 1.5 : 1, rng)
    b.lastHit = { target: 'player', dmg: wr.dmg, crit: wr.crit, mult: 1, missed: wr.missed, tick: b.turn }
    if (wr.missed) {
      pushLog(b, { textKey: 'battle.wildMiss', tone: 'info' })
    } else {
      b.player.hp = Math.max(0, b.player.hp - wr.dmg)
      pushLog(b, {
        textKey: wr.crit ? 'battle.wildCrit' : 'battle.wildHit',
        params: { dmg: wr.dmg },
        tone: wr.crit ? 'danger' : 'warn',
      })
    }
  }

  if (b.player.hp <= 0) {
    b.result = 'lose'
    pushLog(b, { textKey: 'battle.lose', tone: 'danger' })
    return b
  }

  // Reset defending flags
  b.playerDefending = false
  b.wildDefending = false
  b.turn += 1
  return b
}

// ---------------------------------------------------------------------------
// XP, level-up, evolution
// ---------------------------------------------------------------------------

const XP_PER_LEVEL = (level: number) => Math.round(20 * Math.pow(level, 1.4))

export function xpForLevelUp(dino: PlayerDino): number {
  return XP_PER_LEVEL(dino.level)
}

export function gainXp(dino: PlayerDino, xp: number): { dino: PlayerDino; leveled: boolean; evoPending: boolean } {
  let cur: PlayerDino = { ...dino, xp: dino.xp + xp }
  let leveled = false
  let evoPending = false
  while (cur.xp >= xpForLevelUp(cur)) {
    cur = { ...cur, xp: cur.xp - xpForLevelUp(cur), level: cur.level + 1 }
    const fresh = computeBattleStatsById(cur.dinoId, cur.level)
    cur = { ...cur, stats: fresh, maxHp: fresh.hp, hp: Math.min(cur.hp + Math.round(fresh.hp * 0.2), fresh.hp) }
    leveled = true
    if (cur.level === 16 || cur.level === 32) evoPending = true
  }
  return { dino: cur, leveled, evoPending }
}

function computeBattleStatsById(id: string, level: number): BattleStats {
  const map = buildDinosaurMap()
  const d = map.get(id)
  if (!d) return { hp: 50, attack: 10, defense: 5, speed: 10, dodgePct: 5 }
  return computeBattleStats(d, level)
}

export function getEvolutionOptions(dinoId: string, map?: Map<string, Dinosaur>): { id: string; name: string }[] {
  const m = map ?? buildDinosaurMap()
  const cur = m.get(dinoId)
  if (!cur) return []
  const okRelationships = new Set(['Ancestor', 'Descendant', 'Close relative'])
  const options: { id: string; name: string }[] = []
  for (const r of cur.relatedDinosaurs) {
    if (!okRelationships.has(r.relationship)) continue
    const cand = m.get(r.id)
    if (!cand || cand.era !== cur.era) continue
    if (options.find((o) => o.id === cand.id)) continue
    options.push({ id: cand.id, name: cand.displayName })
    if (options.length >= 3) break
  }
  // Fallback: if no related, allow +1 evolution stage of the same dino
  if (options.length === 0) options.push({ id: cur.id, name: `${cur.displayName} (mature)` })
  return options
}

export function evolve(dino: PlayerDino, chosenId: string, map?: Map<string, Dinosaur>): PlayerDino {
  const m = map ?? buildDinosaurMap()
  const cur = m.get(dino.dinoId)
  if (!cur) return dino
  if (dino.level < 16) return dino
  const next = m.get(chosenId) ?? cur
  const stats = computeBattleStats(next, dino.level)
  return {
    ...dino,
    dinoId: next.id,
    stats,
    maxHp: stats.hp,
    hp: Math.min(dino.hp, stats.hp),
    evolutionStage: dino.evolutionStage + 1,
  }
}

// ---------------------------------------------------------------------------
// Inventory helpers
// ---------------------------------------------------------------------------

export function addItem(inv: Inventory, item: ItemId, count = 1): Inventory {
  if (item === 'ball' || item === 'great-ball') {
    return { ...inv, balls: inv.balls + count }
  }
  return {
    ...inv,
    items: { ...inv.items, [item]: (inv.items[item] ?? 0) + count },
  }
}

export function useItem(inv: Inventory, item: ItemId): Inventory {
  if (item === 'ball' || item === 'great-ball') {
    if (inv.balls <= 0) return inv
    return { ...inv, balls: inv.balls - 1 }
  }
  const cur = inv.items[item] ?? 0
  if (cur <= 0) return inv
  return { ...inv, items: { ...inv.items, [item]: cur - 1 } }
}

export function usePotionOnDino(dino: PlayerDino, item: ItemId): PlayerDino {
  const heal = item === 'super-potion' ? 60 : item === 'potion' ? 25 : item === 'revive' ? dino.maxHp : 0
  if (heal === 0) return dino
  return { ...dino, hp: Math.min(dino.maxHp, dino.hp + heal) }
}

// ---------------------------------------------------------------------------
// Quest progress
// ---------------------------------------------------------------------------

export function updateQuestProgress(world: World, kind: Quest['kind'], amount = 1): World {
  let changed = false
  const quests = world.quests.map((q) => {
    if (q.completed) return q
    if (q.kind !== kind) return q
    const newProgress = Math.min(q.target, q.progress + amount)
    const completed = newProgress >= q.target
    changed = true
    return { ...q, progress: newProgress, completed }
  })
  if (!changed) return world
  return { ...world, quests }
}

// ---------------------------------------------------------------------------
// POI interactions
// ---------------------------------------------------------------------------

export function interactPoi(world: World, poi: Poi): World {
  if (poi.visited) return world
  const updatedPois = world.pois.map((p) => (p.x === poi.x && p.y === poi.y ? { ...p, visited: true } : p))
  let updated: World = { ...world, pois: updatedPois }

  if (poi.kind === 'camp') {
    // Heal party
    const party = world.player.party.map((d) => ({ ...d, hp: d.maxHp }))
    updated = {
      ...updated,
      player: { ...world.player, party },
    }
  } else if (poi.kind === 'ruins' && poi.data.itemId) {
    updated = {
      ...updated,
      player: { ...world.player, inventory: addItem(world.player.inventory, poi.data.itemId) },
    }
  } else if (poi.kind === 'nest' && poi.data.dinoId) {
    // Auto-catch: build encounter and immediately convert to party member
    const map = buildDinosaurMap()
    const dino = map.get(poi.data.dinoId)
    if (dino) {
      const level = Math.max(1, world.player.party[0].level - 2)
      const newDino = makePlayerDino(dino, level, map)
      const party = [...world.player.party, newDino].slice(0, 6)
      updated = {
        ...updated,
        player: { ...world.player, party },
      }
    }
  }
  // shop: no engine effect — ShopPanel mutates inventory/coins directly via world prop
  // trainer: no engine effect — handleTrainerAccept reads roster and starts battle;
  //          after battle, interactPoi marks it visited
  return updated
}

// ---------------------------------------------------------------------------
// Catch to party
// ---------------------------------------------------------------------------

export function catchToParty(world: World, battle: Battle): World {
  const map = buildDinosaurMap()
  const dino = map.get(battle.wild.dinoId)
  if (!dino) return world
  const newDino = makePlayerDino(dino, battle.wild.level, map)
  newDino.isPlayerLeader = world.player.party.length === 0
  return {
    ...world,
    player: { ...world.player, party: [...world.player.party, newDino].slice(0, 6) },
  }
}

// ---------------------------------------------------------------------------
// Apply battle result back to world
// ---------------------------------------------------------------------------

export function applyBattleResult(world: World, battle: Battle, t: (key: string, params?: Record<string, string | number>) => string): { world: World; unlockedDex: string[] } {
  if (battle.result === 'run' || battle.result === 'lose') {
    return { world: { ...world, player: { ...world.player, party: [{ ...world.player.party[0], hp: Math.max(1, world.player.party[0].hp) }] } }, unlockedDex: [] }
  }
  const unlockedDex: string[] = [battle.wild.dinoId]
  let newParty = [...world.player.party]
  let leader = { ...newParty[0] }
  if (battle.result === 'win') {
    const xpGained = battle.wild.level * 4
    const { dino } = gainXp(leader, xpGained)
    leader = dino
    newParty[0] = leader
    // Coin reward: explicit (trainer) or fallback for wild wins
    const coinDelta = battle.coinReward || (5 + battle.wild.level)
    return {
      world: {
        ...world,
        player: {
          ...world.player,
          party: newParty,
          coins: world.player.coins + coinDelta,
        },
      },
      unlockedDex,
    }
  }
  if (battle.result === 'catch') {
    newParty = catchToParty(world, battle).player.party
    return {
      world: {
        ...world,
        player: {
          ...world.player,
          party: newParty,
          coins: world.player.coins + 2,
        },
      },
      unlockedDex,
    }
  }
  return { world, unlockedDex }
}
