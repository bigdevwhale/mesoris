/**
 * useAutoplayGate — global "user has interacted with the page" signal.
 *
 * Chrome / Safari / Firefox all block autoplay of unmuted (and on desktop
 * even muted) media until the user has interacted with the document at
 * least once. We listen for the first such gesture and expose a reactive
 * `hasInteracted` flag. Components that need autoplay (e.g. DinoCardImage)
 * read this flag and only attempt `video.play()` once it is true.
 *
 * Implementation notes:
 *  - Module-level state is shared across all callers, so the first gesture
 *    anywhere on the page unlocks every instance.
 *  - The listeners are installed exactly once on first import and never
 *    removed (they're cheap passive listeners and outlive the session).
 *  - We don't need to track which element dispatched the event — any
 *    genuine user input counts.
 */
import { readonly, ref } from 'vue'

const hasInteracted = ref(false)
let installed = false

function markInteracted() {
  if (hasInteracted.value) return
  hasInteracted.value = true
  // Once unlocked, we can drop the listeners — passive perf win.
  window.removeEventListener('pointerdown', markInteracted, true)
  window.removeEventListener('keydown', markInteracted, true)
  window.removeEventListener('scroll', markInteracted, true)
  window.removeEventListener('touchstart', markInteracted, true)
  window.removeEventListener('wheel', markInteracted, true)
}

function install() {
  if (installed || typeof window === 'undefined') return
  installed = true
  // Use capture phase so we catch the event even if a child stops it later.
  const opts: AddEventListenerOptions = { capture: true, passive: true, once: true }
  window.addEventListener('pointerdown', markInteracted, opts)
  window.addEventListener('keydown', markInteracted, opts)
  window.addEventListener('scroll', markInteracted, opts)
  window.addEventListener('touchstart', markInteracted, opts)
  window.addEventListener('wheel', markInteracted, opts)
}

/** Read-only signal: becomes true after the user's first interaction. */
export function useAutoplayGate() {
  install()
  return { hasInteracted: readonly(hasInteracted) }
}
