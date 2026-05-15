import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  let initial: T = defaultValue

  if (stored !== null) {
    try {
      initial = JSON.parse(stored)
    } catch {
      initial = stored as unknown as T
    }
  }

  const value = ref<T>(initial) as Ref<T>

  watch(
    value,
    (newVal) => {
      if (newVal === null || newVal === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newVal))
      }
    },
    { deep: true }
  )

  return value
}
