<script setup lang="ts">
withDefaults(defineProps<{
  transitionName?: string
}>(), {
  transitionName: 'fade',
})
</script>

<template>
  <div class="min-h-screen pt-16">
    <slot />
  </div>
</template>
