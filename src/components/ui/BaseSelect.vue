<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { label: string; value: string }[]
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [v: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-label text-[var(--color-text-secondary)]">{{ label }}</label>
    <select
      :value="modelValue"
      class="w-full rounded-[var(--radius-md)] bg-[var(--color-bg-overlay)] border border-[var(--glass-border)] text-[var(--color-text-primary)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-brand-amber)] focus:ring-1 focus:ring-[var(--color-brand-amber)] transition-colors appearance-none cursor-pointer bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px]"
      style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%239a9685%22 stroke-width=%222%22><path d=%22m4 6 4 4 4-4%22/></svg>')"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled class="bg-[var(--color-bg-overlay)]">{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        class="bg-[var(--color-bg-overlay)] text-[var(--color-text-primary)]"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
