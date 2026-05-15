<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

defineProps<{
  items: { title: string; content: string }[]
  multipleOpen?: boolean
}>()

const openIndexes = ref<Set<number>>(new Set())

function toggle(idx: number, multiple?: boolean) {
  if (openIndexes.value.has(idx)) {
    openIndexes.value.delete(idx)
  } else {
    if (!multiple) openIndexes.value.clear()
    openIndexes.value.add(idx)
  }
  openIndexes.value = new Set(openIndexes.value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="border border-[var(--glass-border)] rounded-[var(--radius-md)] overflow-hidden"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-5 py-4 text-left text-[var(--color-text-primary)] hover:bg-[rgba(212,164,58,0.04)] transition-colors"
        @click="toggle(idx, multipleOpen)"
      >
        <span class="font-semibold text-sm">{{ item.title }}</span>
        <BaseIcon
          name="chevron-down"
          :size="16"
          :class="['transition-transform duration-300 text-[var(--color-text-tertiary)]', openIndexes.has(idx) ? 'rotate-180' : '']"
        />
      </button>
      <Transition name="accordion">
        <div v-if="openIndexes.has(idx)" class="px-5 pb-4 text-body-md">
          {{ item.content }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
