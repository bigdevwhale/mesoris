<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

defineProps<{
  title: string
  description?: string
  icon?: string
  actionLabel?: string
  actionTo?: string
}>()

const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 rounded-full bg-[rgba(212,164,58,0.08)] flex items-center justify-center mb-4">
      <BaseIcon :name="icon || 'search'" :size="28" class="text-[var(--color-text-tertiary)]" />
    </div>
    <h3 class="text-heading-md mb-2">{{ title }}</h3>
    <p v-if="description" class="text-body-md max-w-sm mb-6">{{ description }}</p>
    <BaseButton
      v-if="actionLabel || actionTo"
      :to="actionTo"
      variant="ghost"
      size="sm"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </BaseButton>
  </div>
</template>
