import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dinosaurs } from '@/data/dinosaurs'

export const useDinoOfDayStore = defineStore('dinoOfDay', () => {
  const todayDinoId = ref<string>('')
  const lastGenerated = ref<string>('')

  const dinosaurOfTheDay = computed(() =>
    dinosaurs.find(d => d.id === todayDinoId.value) ?? dinosaurs[0]
  )

  function generateToday() {
    const today = new Date().toISOString().split('T')[0]

    if (lastGenerated.value === today && todayDinoId.value) return

    // Deterministic rotation based on date
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    )
    const index = dayOfYear % dinosaurs.length
    todayDinoId.value = dinosaurs[index].id
    lastGenerated.value = today

    localStorage.setItem('dino-of-day-id', todayDinoId.value)
    localStorage.setItem('dino-of-day-date', today)
  }

  // Restore from localStorage on init
  const savedDate = localStorage.getItem('dino-of-day-date')
  const savedId = localStorage.getItem('dino-of-day-id')
  if (savedId && savedDate) {
    todayDinoId.value = savedId
    lastGenerated.value = savedDate
  }

  return { todayDinoId, lastGenerated, dinosaurOfTheDay, generateToday }
})
