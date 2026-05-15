import type { Dinosaur } from './dinosaur'

export interface ComparisonStat {
  label: string
  valueA: number
  valueB: number
  unit: string
  higherIsBetter: boolean
  percentageA: number
  percentageB: number
}

export interface ComparisonResult {
  dinosaurA: Dinosaur
  dinosaurB: Dinosaur
  stats: ComparisonStat[]
}
