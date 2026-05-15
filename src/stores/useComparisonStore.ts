import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dinosaurs } from '@/data/dinosaurs'
import type { ComparisonStat, ComparisonResult } from '@/types/comparison'
import type { Dinosaur } from '@/types/dinosaur'

export const useComparisonStore = defineStore('comparison', () => {
  const dinoIdA = ref<string | null>(null)
  const dinoIdB = ref<string | null>(null)

  const dinosaurA = computed<Dinosaur | null>(() =>
    dinosaurs.find(d => d.id === dinoIdA.value) ?? null
  )
  const dinosaurB = computed<Dinosaur | null>(() =>
    dinosaurs.find(d => d.id === dinoIdB.value) ?? null
  )
  const bothSelected = computed(() => dinosaurA.value !== null && dinosaurB.value !== null)

  const comparisonResult = computed<ComparisonResult | null>(() => {
    const a = dinosaurA.value
    const b = dinosaurB.value
    if (!a || !b) return null

    function makeStat(label: string, aVal: number, bVal: number, unit: string, higher: boolean): ComparisonStat {
      const max = Math.max(aVal, bVal)
      return {
        label, valueA: aVal, valueB: bVal, unit, higherIsBetter: higher,
        percentageA: max > 0 ? (aVal / max) * 100 : 0,
        percentageB: max > 0 ? (bVal / max) * 100 : 0,
      }
    }

    const stats: ComparisonStat[] = [
      makeStat('Height', a.dimensions.heightMeters, b.dimensions.heightMeters, 'm', true),
      makeStat('Length', a.dimensions.lengthMeters, b.dimensions.lengthMeters, 'm', true),
      makeStat('Weight', a.dimensions.weightKg, b.dimensions.weightKg, 'kg', true),
      makeStat('Speed', a.dimensions.speedKmh, b.dimensions.speedKmh, 'km/h', true),
    ]

    return { dinosaurA: a, dinosaurB: b, stats }
  })

  function selectA(id: string) { dinoIdA.value = id }
  function selectB(id: string) { dinoIdB.value = id }
  function swap() { const tmp = dinoIdA.value; dinoIdA.value = dinoIdB.value; dinoIdB.value = tmp }
  function clear() { dinoIdA.value = null; dinoIdB.value = null }

  return { dinoIdA, dinoIdB, dinosaurA, dinosaurB, bothSelected, comparisonResult,
    selectA, selectB, swap, clear }
})
