<script setup lang="ts">
withDefaults(defineProps<{
  name?: string
  mode?: 'out-in' | 'in-out' | 'default'
  duration?: number
}>(), {
  name: 'fade',
  mode: 'out-in',
  duration: 300,
})
</script>

<template>
  <Transition :name="name" :mode="mode">
    <slot />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
