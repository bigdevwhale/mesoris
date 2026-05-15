<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

defineProps<{
  title?: string
  message?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 rounded-full bg-[rgba(196,56,45,0.08)] flex items-center justify-center mb-4">
      <BaseIcon name="triangle-alert" :size="28" class="text-[var(--color-error)]" />
    </div>
    <h3 class="text-heading-md mb-2">{{ title || 'Something went wrong' }}</h3>
    <p v-if="message" class="text-body-md max-w-sm mb-6">{{ message }}</p>
    <BaseButton variant="ghost" size="sm" @click="emit('retry')">Try again</BaseButton>
  </div>
</template>
