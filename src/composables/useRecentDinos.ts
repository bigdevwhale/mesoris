import { dinosaurs } from '@/data/dinosaurs'

const STORAGE_KEY = 'recentDinos'
const TTL_MS = 60 * 60 * 1000 // 1 hour

interface Entry {
  id: string
  ts: number
}

function load(): Entry[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const now = Date.now()
    const entries: Entry[] = JSON.parse(raw)
    return entries.filter(e => now - e.ts < TTL_MS)
  } catch {
    return []
  }
}

function save(entries: Entry[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useRecentDinos() {
  function pickRandomDino() {
    let recent = load()
    const now = Date.now()

    // Remove expired entries
    const fresh = recent.filter(e => now - e.ts < TTL_MS)
    if (fresh.length !== recent.length) {
      recent = fresh
      save(recent)
    }

    const usedIds = new Set(recent.map(e => e.id))

    // If all dinos used, reset
    if (usedIds.size >= dinosaurs.length) {
      recent = []
      usedIds.clear()
      save([])
    }

    // Pick from unused
    const pool = dinosaurs.filter(d => !usedIds.has(d.id))
    const dino = pool[Math.floor(Math.random() * pool.length)]

    recent.push({ id: dino.id, ts: now })
    save(recent)

    return dino
  }

  return { pickRandomDino }
}
