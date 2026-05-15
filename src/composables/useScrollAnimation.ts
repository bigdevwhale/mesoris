import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useScrollAnimation(
  targetRef: Ref<HTMLElement | null>,
  options?: {
    animation?: gsap.TweenVars
    threshold?: number
    rootMargin?: string
  }
) {
  const isVisible = ref(false)
  const hasAnimated = ref(false)
  let observer: IntersectionObserver | null = null

  const defaultAnim: gsap.TweenVars = {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  }

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          isVisible.value = true
          hasAnimated.value = true

          const anim = { ...defaultAnim, ...options?.animation }
          gsap.fromTo(targetRef.value, anim, {
            opacity: 1,
            y: 0,
            duration: anim.duration || 0.8,
            ease: anim.ease || 'power3.out',
            delay: anim.delay || 0,
          })
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, hasAnimated }
}

export function useStaggerReveal(
  containerRef: Ref<HTMLElement | null>,
  childSelector: string,
  options?: {
    stagger?: number
    duration?: number
    y?: number
    threshold?: number
  }
) {
  let observer: IntersectionObserver | null = null
  let hasAnimated = false

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true

          const children = containerRef.value!.querySelectorAll(childSelector)
          gsap.fromTo(
            children,
            { opacity: 0, y: options?.y ?? 32 },
            {
              opacity: 1,
              y: 0,
              duration: options?.duration ?? 0.6,
              stagger: options?.stagger ?? 0.1,
              ease: 'power3.out',
            }
          )
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    )

    observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
