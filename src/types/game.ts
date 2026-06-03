import type { RouteLocationRaw } from 'vue-router'

export type GameType = 'quiz' | 'puzzle' | 'excavation' | 'skeleton' | 'memory' | 'runner' | 'personality' | 'tamagotchi' | 'battle' | 'diet-detective'

export interface GameDefinition {
  id: string
  type: GameType
  title: string
  titleRu: string
  titleEs: string
  titleDe: string
  titleFr: string
  titleIt: string
  titleJa: string
  titleZh: string
  titleKo: string
  titleKk?: string
  description: string
  descriptionRu: string
  descriptionEs: string
  descriptionDe: string
  descriptionFr: string
  descriptionIt: string
  descriptionJa: string
  descriptionZh: string
  descriptionKo: string
  descriptionKk?: string
  thumbnail?: string
  route: RouteLocationRaw
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
  colorClass: string
}

export interface GameProgress {
  completed: boolean
  bestScore: number
  playedCount: number
}

export type AchievementId =
  | 'first-steps'
  | 'paleontologist'
  | 'perfect-score'
  | 'speed-digger'
  | 'bone-master'

export interface Achievement {
  id: AchievementId
  title: string
  description: string
  icon: string
}
