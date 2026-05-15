import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Era, Diet, SizeCategory } from '@/types/dinosaur'
import { dinosaurs } from '@/data/dinosaurs'

export type SortOption = 'name-asc' | 'name-desc' | 'era-asc' | 'size-desc'

export const useEncyclopediaStore = defineStore('encyclopedia', () => {
  const eraFilters = ref<Era[]>([])
  const dietFilters = ref<Diet[]>([])
  const sizeFilters = ref<SizeCategory[]>([])
  const searchQuery = ref('')
  const sortBy = ref<SortOption>('name-asc')
  const currentPage = ref(1)
  const itemsPerPage = 8
  const selectedDinoId = ref<string | null>(null)
  const isModalOpen = ref(false)

  const hasActiveFilters = computed(() =>
    eraFilters.value.length > 0 || dietFilters.value.length > 0 || sizeFilters.value.length > 0
  )

  const filteredDinosaurs = computed(() => {
    let result = [...dinosaurs]

    if (eraFilters.value.length > 0) {
      result = result.filter(d => eraFilters.value.includes(d.era))
    }
    if (dietFilters.value.length > 0) {
      result = result.filter(d => dietFilters.value.includes(d.diet))
    }
    if (sizeFilters.value.length > 0) {
      result = result.filter(d => sizeFilters.value.includes(d.size))
    }

    const query = searchQuery.value.toLowerCase().trim()
    if (query) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.era.toLowerCase().includes(query) ||
        d.diet.toLowerCase().includes(query) ||
        d.habitat.toLowerCase().includes(query)
      )
    }

    switch (sortBy.value) {
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break
      case 'era-asc': result.sort((a, b) => a.periodRangeMya[0] - b.periodRangeMya[0]); break
      case 'size-desc': result.sort((a, b) => b.dimensions.weightKg - a.dimensions.weightKg); break
    }

    return result
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredDinosaurs.value.length / itemsPerPage)))

  const paginatedDinosaurs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredDinosaurs.value.slice(start, start + itemsPerPage)
  })

  function toggleEraFilter(era: Era) {
    const idx = eraFilters.value.indexOf(era)
    if (idx >= 0) eraFilters.value.splice(idx, 1)
    else eraFilters.value.push(era)
    currentPage.value = 1
  }

  function toggleDietFilter(diet: Diet) {
    const idx = dietFilters.value.indexOf(diet)
    if (idx >= 0) dietFilters.value.splice(idx, 1)
    else dietFilters.value.push(diet)
    currentPage.value = 1
  }

  function toggleSizeFilter(size: SizeCategory) {
    const idx = sizeFilters.value.indexOf(size)
    if (idx >= 0) sizeFilters.value.splice(idx, 1)
    else sizeFilters.value.push(size)
    currentPage.value = 1
  }

  function clearFilters() {
    eraFilters.value = []
    dietFilters.value = []
    sizeFilters.value = []
    searchQuery.value = ''
    currentPage.value = 1
  }

  function setSearch(query: string) {
    searchQuery.value = query
    currentPage.value = 1
  }

  function setSort(sort: SortOption) {
    sortBy.value = sort
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  function openDetail(id: string) {
    selectedDinoId.value = id
    isModalOpen.value = true
  }

  function closeDetail() {
    isModalOpen.value = false
    selectedDinoId.value = null
  }

  return {
    eraFilters, dietFilters, sizeFilters, searchQuery, sortBy, currentPage,
    itemsPerPage, selectedDinoId, isModalOpen,
    hasActiveFilters, filteredDinosaurs, totalPages, paginatedDinosaurs,
    toggleEraFilter, toggleDietFilter, toggleSizeFilter, clearFilters,
    setSearch, setSort, setPage, openDetail, closeDetail,
  }
})
