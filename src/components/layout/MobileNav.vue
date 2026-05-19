<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import type { NavLink } from '@/types/ui'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
const { localRoute } = useLocale()

const links = computed<NavLink[]>(() => [
  { label: t('ui.nav.home'), to: localRoute({ name: 'home' }), icon: 'home' },
  { label: t('ui.nav.encyclopedia'), to: localRoute({ name: 'encyclopedia' }), icon: 'book-open' },
  { label: t('ui.nav.timeline'), to: localRoute({ name: 'timeline' }), icon: 'clock' },
  { label: t('ui.nav.compare'), to: localRoute({ name: 'compare' }), icon: 'scaling' },
  { label: t('ui.nav.games'), to: localRoute({ name: 'games' }), icon: 'gamepad-2' },
  { label: t('ui.nav.science'), to: localRoute({ name: 'science' }), icon: 'flask-conical' },
  { label: t('ui.nav.about'), to: localRoute({ name: 'about' }), icon: 'info' },
])

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

watch(() => props.isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="fixed inset-0 z-40 md:hidden">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')" />
        <nav
          class="absolute top-0 right-0 w-[280px] h-full bg-[var(--color-bg-elevated)] border-l border-[var(--glass-border)] shadow-[var(--shadow-modal)] flex flex-col pt-20 px-4 gap-1"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <router-link
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(212,164,58,0.06)] transition-colors"
            active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.1)]"
            exact-active-class="!text-[var(--color-brand-amber)] !bg-[rgba(212,164,58,0.1)]"
            @click="emit('close')"
          >
            <BaseIcon :name="link.icon" :size="18" />
            {{ link.label }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from nav,
.drawer-leave-to nav {
  transform: translateX(100%);
}
</style>
