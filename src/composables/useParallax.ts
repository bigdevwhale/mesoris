import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.05) {
  const offsetX = ref(0)
  const offsetY = ref(0)
  let ticking = false
  let animationId: number | null = null

  function onMouseMove(e: MouseEvent) {
    if (ticking) return
    ticking = true

    animationId = requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      offsetX.value = (e.clientX - centerX) * speed
      offsetY.value = (e.clientY - centerY) * speed
      ticking = false
    })
  }

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    window.addEventListener('mousemove', onMouseMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (animationId) cancelAnimationFrame(animationId)
  })

  return { offsetX, offsetY }
}

export function useScrollParallax(speed = 0.3) {
  const offset = ref(0)
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true

    requestAnimationFrame(() => {
      offset.value = window.scrollY * speed
      ticking = false
    })
  }

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { offset }
}
