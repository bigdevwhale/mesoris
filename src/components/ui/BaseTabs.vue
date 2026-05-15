<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string }[]
  modelValue: string
}>()

const emit = defineEmits<{ 'update:modelValue': [v: string] }>()
</script>

<template>
  <div class="flex gap-1 p-1 rounded-[var(--radius-lg)] bg-[var(--color-bg-overlay)]">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      :class="[
        'flex-1 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200',
        modelValue === tab.id
          ? 'bg-[var(--color-brand-amber)] text-black shadow-[0_2px_8px_rgba(212,164,58,0.3)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
      ]"
      @click="emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
