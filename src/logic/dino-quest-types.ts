import type { Dinosaur, Era } from '@/types/dinosaur'
import type { TrainerRosterEntry } from '@/data/dino-quest-trainers'

// ---------------------------------------------------------------------------
// World / map
// ---------------------------------------------------------------------------

export type Biome = 'plains' | 'forest' | 'swamp' | 'desert' | 'coastal' | 'volcanic'

export type TileType =
  | 'grass'
  | 'tall-grass'
  | 'water'
  | 'tree'
  | 'sand'
  | 'rock'
  | 'lava'
  | 'path'
  | 'camp'
  | 'ruins'
  | 'nest'
  | 'volcano'
  | 'shop'
  | 'trainer'

export type Direction = 'up' | 'down' | 'left' | 'right'
export type Phase =
  | 'intro'
  | 'explore'
  | 'encounter'
  | 'battle'
  | 'poi'
  | 'menu'
  | 'result'

export type PoiKind = 'camp' | 'ruins' | 'nest' | 'volcano' | 'shop' | 'trainer'

export interface Tile {
  type: TileType
  walkable: boolean
  encounterPct: number
  biome: Biome
}

export interface Poi {
  kind: PoiKind
  x: number
  y: number
  visited: boolean
  data: PoiData
}

export interface PoiData {
  dinoId?: string
  itemId?: ItemId
  questId?: string
  trainerId?: string
}

// ---------------------------------------------------------------------------
// Player & party
// ---------------------------------------------------------------------------

export interface BattleStats {
  hp: number
  attack: number
  defense: number
  speed: number
  dodgePct: number
}

export interface PlayerDino {
  dinoId: string
  nickname?: string
  level: number
  xp: number
  hp: number
  maxHp: number
  stats: BattleStats
  evolutionStage: number
  isPlayerLeader: boolean
}

export interface PlayerState {
  x: number
  y: number
  dir: Direction
  steps: number
  party: PlayerDino[]
  inventory: Inventory
  coins: number
}

// ---------------------------------------------------------------------------
// Inventory & items
// ---------------------------------------------------------------------------

export type ItemId = 'potion' | 'super-potion' | 'revive' | 'ball' | 'great-ball'

export interface Inventory {
  items: Partial<Record<ItemId, number>>
  balls: number
}

// ---------------------------------------------------------------------------
// Quests
// ---------------------------------------------------------------------------

export type QuestKind = 'catch' | 'defeat' | 'reach' | 'discover'

export interface Quest {
  id: string
  kind: QuestKind
  descriptionKey: string
  target: number
  progress: number
  rewardItem?: ItemId
  completed: boolean
}

// ---------------------------------------------------------------------------
// World
// ---------------------------------------------------------------------------

export interface World {
  seed: number
  width: number
  height: number
  era: Era
  tiles: Tile[][]
  pois: Poi[]
  player: PlayerState
  quests: Quest[]
  stepsTaken: number
  activeQuestIds: string[]
  resultReason: 'abandoned' | 'caught' | 'defeated' | null
}

// ---------------------------------------------------------------------------
// Battle
// ---------------------------------------------------------------------------

export interface Encounter {
  dinoId: string
  level: number
  wild: true
}

export interface BattleLogEntry {
  textKey: string
  params?: Record<string, string | number>
  tone: 'info' | 'success' | 'warn' | 'danger' | 'celebrate'
}

export interface WildDino {
  dinoId: string
  level: number
  hp: number
  maxHp: number
  stats: BattleStats
}

export type BattleResult = 'ongoing' | 'win' | 'lose' | 'catch' | 'run'

export interface LastHit {
  target: 'wild' | 'player'
  dmg: number
  crit: boolean
  mult: number
  missed: boolean
  tick: number
}

export interface Battle {
  player: PlayerDino
  wild: WildDino
  turn: number
  log: BattleLogEntry[]
  result: BattleResult
  playerDefending: boolean
  wildDefending: boolean
  specialCooldown: number
  lastHit: LastHit | null
  /** when player uses an item, wild skips its turn */
  wildSkipped: boolean
  /** coins awarded for winning (trainer battles); 0 for wild */
  coinReward: number
  /** trainer roster if this is a trainer battle; undefined for wild */
  roster?: TrainerRosterEntry
}

// ---------------------------------------------------------------------------
// Dinosaur lookup helper
// ---------------------------------------------------------------------------

export type DinosaurMap = Map<string, Dinosaur>
