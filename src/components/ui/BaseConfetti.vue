<script setup lang="ts">
// Emits particles on mount for celebration moments
import { onMounted, ref } from 'vue'

const particles = ref<{ id: number; x: number; color: string; delay: number; size: number }[]>([])

onMounted(() => {
  const colors = ['#d4a43a', '#e85d2c', '#4a7c3f', '#2d8a7b', '#c4a87c', '#f0c040']
  for (let i = 0; i < 40; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 4,
    })
  }
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
    <div
      v-for="p in particles"
      :key="p.id"
      class="absolute top-0 rounded-full animate-[particle-float_2s_ease-out_forwards]"
      :style="{
        left: `${p.x}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        backgroundColor: p.color,
        animationDelay: `${p.delay}s`,
        '--tx': `${(Math.random() - 0.5) * 200}px`,
        '--ty': `${-(Math.random() * 400 + 200)}px`,
      }"
    />
  </div>
</template>
