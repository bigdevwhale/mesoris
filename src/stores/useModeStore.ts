import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Mode } from '@/types/ui'

export const useModeStore = defineStore('mode', () => {
  const stored = localStorage.getItem('dino-mode') as Mode | null
  const mode = ref<Mode>(stored === 'adults' ? 'adults' : 'kids')

  const isKidsMode = computed(() => mode.value === 'kids')
  const isAdultsMode = computed(() => mode.value === 'adults')

  function setMode(newMode: Mode) {
    mode.value = newMode
    localStorage.setItem('dino-mode', newMode)
    document.documentElement.setAttribute('data-mode', newMode)
  }

  function toggleMode() {
    setMode(isKidsMode.value ? 'adults' : 'kids')
  }

  // Apply on init
  document.documentElement.setAttribute('data-mode', mode.value)

  return { mode, isKidsMode, isAdultsMode, setMode, toggleMode }
})
