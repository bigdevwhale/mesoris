<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  label?: string
  error?: string
  disabled?: boolean
  iconLeft?: string
}>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [v: string]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-label text-[var(--color-text-secondary)]">{{ label }}</label>
    <div class="relative">
      <BaseIcon
        v-if="iconLeft"
        :name="iconLeft"
        :size="16"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none"
      />
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-[var(--radius-md)] bg-[var(--color-bg-overlay)] border text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors duration-200',
          'focus:outline-none focus:border-[var(--color-brand-amber)] focus:ring-1 focus:ring-[var(--color-brand-amber)]',
          error ? 'border-[var(--color-error)]' : 'border-[var(--glass-border)]',
          iconLeft ? 'pl-10 pr-3' : 'px-4',
          'py-2.5 text-sm',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </div>
    <span v-if="error" class="text-xs text-[var(--color-error)]">{{ error }}</span>
  </div>
</template>
