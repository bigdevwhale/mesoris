/**
 * localStorage helpers for Dino Quest:
 * - dino-quest-dex-v1 — global DinoDex (Set of unlocked dino ids)
 * - dino-quest-settings-v1 — user settings (tutorial dismissed, etc)
 * - dino-quest-run-seed-v1 — last/current run seed (handled in engine)
 */

const DEX_KEY = 'dino-quest-dex-v1'
const SETTINGS_KEY = 'dino-quest-settings-v1'

export interface DinoQuestSettings {
  tutorialDismissed: boolean
  sfxEnabled: boolean
}

const DEFAULT_SETTINGS: DinoQuestSettings = {
  tutorialDismissed: false,
  sfxEnabled: true,
}

export function loadDex(): Set<string> {
  if (typeof localStorage === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(DEX_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

export function saveDex(set: Set<string>): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(DEX_KEY, JSON.stringify([...set]))
  } catch {
    /* quota exceeded — ignore */
  }
}

export function unlockDino(dinoId: string, dex: Set<string>): { dex: Set<string>; added: boolean } {
  if (dex.has(dinoId)) return { dex, added: false }
  const next = new Set(dex)
  next.add(dinoId)
  saveDex(next)
  return { dex: next, added: true }
}

export function loadSettings(): DinoQuestSettings {
  if (typeof localStorage === 'undefined') return { ...DEFAULT_SETTINGS }
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(s: DinoQuestSettings): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}
