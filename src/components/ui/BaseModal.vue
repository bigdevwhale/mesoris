<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

const props = withDefaults(defineProps<{
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlay?: boolean
}>(), {
  size: 'md',
  closeOnOverlay: true,
})

const emit = defineEmits<{ close: [] }>()

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return }
  if (e.key === 'Tab') {
    const container = document.querySelector('[role="dialog"]')
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

watch(() => props.isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
  if (props.isOpen) document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown="onKeydown"
      >
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeOnOverlay && emit('close')"
        />
        <div
          :class="sizeMap[size]"
          class="relative w-full bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-modal)] overflow-y-auto max-h-[90vh]"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-center justify-between p-5 border-b border-[var(--glass-border)] sticky top-0 bg-[var(--color-bg-elevated)] z-10">
            <h2 v-if="title" class="text-heading-md">{{ title }}</h2>
            <span v-else />
            <BaseButton variant="icon" size="sm" @click="emit('close')" aria-label="Close">
              <BaseIcon name="x" :size="20" />
            </BaseButton>
          </div>
          <div class="p-5">
            <slot />
          </div>
          <div v-if="$slots.footer" class="p-5 border-t border-[var(--glass-border)] sticky bottom-0 bg-[var(--color-bg-elevated)]">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
