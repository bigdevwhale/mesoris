import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Theme } from '@/types/ui'

export const useUiStore = defineStore('ui', () => {
  const isMobileNavOpen = ref(false)
  const isSearchOpen = ref(false)
  const theme = ref<Theme>('dark')

  function openMobileNav() { isMobileNavOpen.value = true }
  function closeMobileNav() { isMobileNavOpen.value = false }
  function toggleMobileNav() { isMobileNavOpen.value = !isMobileNavOpen.value }

  function openSearch() { isSearchOpen.value = true }
  function closeSearch() { isSearchOpen.value = false }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { isMobileNavOpen, isSearchOpen, theme,
    openMobileNav, closeMobileNav, toggleMobileNav,
    openSearch, closeSearch, toggleTheme }
})
