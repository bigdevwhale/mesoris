<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'ghost' | 'icon' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  to?: RouteLocationRaw
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconRight?: string
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const tag = computed(() => (props.to ? 'router-link' : 'button'))

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-amber)] disabled:opacity-40 disabled:cursor-not-allowed select-none'

  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  const variantMap = {
    primary: 'bg-[var(--color-brand-ember)] text-white hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] shadow-[var(--shadow-button)]',
    ghost: 'border border-current text-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.1)] hover:shadow-[0_0_20px_rgba(212,164,58,0.2)]',
    icon: 'w-11 h-11 p-0 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.1)]',
    danger: 'bg-[var(--color-error)] text-white hover:brightness-110',
  }

  return `${base} ${sizeMap[props.size]} ${variantMap[props.variant]}`
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="tag === 'button' ? type : undefined"
    :disabled="disabled || loading"
    :class="classes"
    @click="emit('click', $event)"
  >
    <BaseIcon v-if="loading" name="loader-circle" :size="size === 'sm' ? 14 : 18" class="animate-spin" />
    <BaseIcon v-else-if="icon && !iconRight" :name="icon" :size="size === 'sm' ? 14 : 18" class="shrink-0" />
    <span v-if="$slots.default" class="inline-flex items-center gap-2 whitespace-nowrap"><slot /></span>
    <BaseIcon v-if="iconRight && !loading" :name="iconRight" :size="size === 'sm' ? 14 : 18" class="shrink-0" />
  </component>
</template>
