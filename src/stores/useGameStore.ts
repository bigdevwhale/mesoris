import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameProgress, AchievementId, Achievement } from '@/types/game'

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Complete any game', icon: 'footprints' },
  { id: 'paleontologist', title: 'Paleontologist', description: 'Complete all 4 games', icon: 'pickaxe' },
  { id: 'perfect-score', title: 'Perfect Score', description: 'Get 100% on the Quiz', icon: 'trophy' },
  { id: 'speed-digger', title: 'Speed Digger', description: 'Complete Excavation in under 60 seconds', icon: 'timer' },
  { id: 'bone-master', title: 'Bone Master', description: 'Build the skeleton with 0 mistakes', icon: 'bone' },
]

function loadProgress(): Record<string, GameProgress> {
  try {
    const raw = localStorage.getItem('dino-game-progress')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export const useGameStore = defineStore('game', () => {
  const progress = ref<Record<string, GameProgress>>(loadProgress())
  const unlockedAchievements = ref<AchievementId[]>([])

  const quizScore = computed(() => progress.value['quiz']?.bestScore ?? 0)
  const quizCompleted = computed(() => progress.value['quiz']?.completed ?? false)
  const totalScore = computed(() =>
    Object.values(progress.value).reduce((sum, p) => sum + (p.bestScore || 0), 0)
  )
  const completedCount = computed(() =>
    Object.values(progress.value).filter(p => p.completed).length
  )
  const completionPercentage = computed(() => Math.round((completedCount.value / 4) * 100))

  function saveProgress() {
    localStorage.setItem('dino-game-progress', JSON.stringify(progress.value))
  }

  function recordGameCompletion(gameId: string, score: number) {
    const existing = progress.value[gameId]
    progress.value[gameId] = {
      completed: true,
      bestScore: Math.max(score, existing?.bestScore ?? 0),
      playedCount: (existing?.playedCount ?? 0) + 1,
    }
    saveProgress()
    checkAchievements(gameId, score)
  }

  function checkAchievements(gameId: string, score: number) {
    const unlock = (id: AchievementId) => {
      if (!unlockedAchievements.value.includes(id)) {
        unlockedAchievements.value.push(id)
      }
    }

    unlock('first-steps')

    if (completedCount.value >= 4) unlock('paleontologist')
    if (gameId === 'quiz' && score === 10) unlock('perfect-score')
    if (gameId === 'excavation' && score >= 100) unlock('speed-digger')
    if (gameId === 'skeleton' && score >= 100) unlock('bone-master')
  }

  function resetProgress() {
    progress.value = {}
    unlockedAchievements.value = []
    saveProgress()
  }

  function getAchievement(id: AchievementId): Achievement | undefined {
    return ACHIEVEMENTS.find(a => a.id === id)
  }

  return {
    progress, unlockedAchievements, quizScore, quizCompleted, totalScore,
    completedCount, completionPercentage,
    recordGameCompletion, resetProgress, getAchievement,
  }
})
