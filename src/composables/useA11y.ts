import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useReducedMotion() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mq.matches

    const listener = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }
    mq.addEventListener('change', listener)
    onUnmounted(() => mq.removeEventListener('change', listener))
  })

  return { prefersReducedMotion }
}

export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!containerRef.value) return
    const container = containerRef.value

    function onKeydown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', onKeydown)
    onUnmounted(() => container.removeEventListener('keydown', onKeydown))
  })
}

export function useScreenReaderAnnounce() {
  let liveRegion: HTMLElement | null = null

  onMounted(() => {
    liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.classList.add('sr-only')
    document.body.appendChild(liveRegion)
  })

  onUnmounted(() => {
    liveRegion?.remove()
  })

  function announce(message: string) {
    if (liveRegion) {
      liveRegion.textContent = ''
      requestAnimationFrame(() => {
        if (liveRegion) liveRegion.textContent = message
      })
    }
  }

  return { announce }
}
