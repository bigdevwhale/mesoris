import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Theme } from '@/types/ui'

const STORAGE_KEY = 'dino-theme'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch (e) {
    /* localStorage unavailable */
  }
  // No explicit choice yet — honour the OS preference. Default to dark
  // (the site's canonical look) unless the user explicitly prefers light.
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  return 'dark'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(getInitialTheme())

  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  function applyTheme(value: Theme) {
    document.documentElement.setAttribute('data-theme', value)
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch (e) {
      /* localStorage unavailable */
    }
    applyTheme(newTheme)
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  // Apply on init so the attribute matches the resolved value even if the
  // FOUC script in index.html and this store disagree (e.g. cleared storage).
  applyTheme(theme.value)

  return { theme, isDark, isLight, setTheme, toggleTheme }
})