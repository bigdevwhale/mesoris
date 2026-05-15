import { ref, onMounted, onUnmounted } from 'vue'

export function useMediaQuery(query: string) {
  const matches = ref(false)

  onMounted(() => {
    const mq = window.matchMedia(query)
    matches.value = mq.matches

    const listener = (e: MediaQueryListEvent) => {
      matches.value = e.matches
    }
    mq.addEventListener('change', listener)
    onUnmounted(() => mq.removeEventListener('change', listener))
  })

  return { matches }
}
