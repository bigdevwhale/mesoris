export type GameType = 'quiz' | 'puzzle' | 'excavation' | 'skeleton'

export interface GameDefinition {
  id: string
  type: GameType
  title: string
  titleRu: string
  description: string
  descriptionRu: string
  thumbnail?: string
  route: string
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
