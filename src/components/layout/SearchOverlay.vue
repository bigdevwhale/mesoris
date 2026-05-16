<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { dinosaurs } from '@/data/dinosaurs'
import { useDinoTranslator } from '@/composables/useDinoTranslation'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const { translateDino } = useDinoTranslator()
const router = useRouter()
const query = ref('')
const inputRef = ref<HTMLInputElement>()
const panelRef = ref<HTMLElement | null>(null)

const results = ref<typeof dinosaurs>([])
const translatedResults = computed(() => results.value.map(translateDino))

watch(query, (q) => {
  if (!q.trim()) {
    results.value = []
    return
  }
  const lower = q.toLowerCase()
  results.value = dinosaurs.filter(d =>
    d.name.toLowerCase().includes(lower) ||
    d.description.toLowerCase().includes(lower) ||
    d.kidsDescription.toLowerCase().includes(lower) ||
    d.nameMeaning.toLowerCase().includes(lower)
  ).slice(0, 5)
})

function navigateTo(id: string) {
  emit('close')
  query.value = ''
  router.push(`/encyclopedia/${id}`)
}

function onKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return

  if (e.key === 'Escape') {
    emit('close')
    return
  }

  if (e.key === 'Tab') {
    const container = panelRef.value
    if (!container) return
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }
}

watch(() => props.isOpen, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''

  if (isOpen) {
    await nextTick()
    inputRef.value?.focus()
  } else {
    query.value = ''
    results.value = []
  }
})

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  if (props.isOpen) document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="emit('close')" />
        <div
          ref="panelRef"
          class="relative w-full max-w-lg mx-4 bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-modal)] overflow-hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="t('ui.header.search')"
        >
          <div class="flex items-center gap-3 px-5 py-4 border-b border-[var(--glass-border)]">
            <BaseIcon name="search" :size="18" class="text-[var(--color-text-tertiary)]" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              :placeholder="t('ui.search.placeholder', { count: 50 })"
              class="w-full bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] text-base outline-none"
            />
            <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs rounded bg-[var(--color-bg-overlay)] text-[var(--color-text-tertiary)]">ESC</kbd>
          </div>
          <!-- Visually-hidden live region for screen readers -->
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            class="sr-only"
          >
            <template v-if="query.trim() && results.length > 0">
              {{ t('ui.search.noResults') }}
            </template>
            <template v-else-if="query.trim() && results.length === 0">
              {{ t('ui.search.noResults') }} — "{{ query }}"
            </template>
          </div>
          <div v-if="results.length > 0" class="py-2">
            <button
              v-for="dino in translatedResults"
              :key="dino.id"
              class="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[rgba(212,164,58,0.06)] focus-visible:bg-[rgba(212,164,58,0.08)] transition-colors"
              @click="navigateTo(dino.id)"
            >
              <BaseLazyImage
                :src="dino.images.card"
                :alt="dino.name"
                aspect-ratio="1/1"
                class="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-bg-overlay)] overflow-hidden flex-shrink-0"
              />
              <div class="min-w-0">
                <div class="text-sm font-semibold text-[var(--color-text-primary)]">{{ dino.name }}</div>
                <div class="text-xs text-[var(--color-text-tertiary)] truncate">{{ t(`ui.encyclopedia.${dino.era}`) }} &middot; {{ t(`ui.encyclopedia.${dino.diet}`) }} &middot; {{ dino.nameMeaning }}</div>
              </div>
            </button>
          </div>
          <div v-else-if="query.trim()" class="px-5 py-8 text-center text-body-sm text-[var(--color-text-tertiary)]">
            {{ t('ui.search.noResults') }} — "{{ query }}"
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
