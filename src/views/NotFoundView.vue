<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SeoHead from '@/components/layout/SeoHead.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <SeoHead
      title="Page Not Found — Dinosaurs"
      description="This page doesn't exist or went extinct. Navigate back to the interactive dinosaur encyclopedia and games."
    />
    <div class="text-8xl mb-6">🦴</div>
    <h1 class="text-display-lg mb-4">404</h1>
    <p class="text-body-lg mb-2">This fossil hasn't been discovered yet.</p>
    <p class="text-body-md text-[var(--color-text-secondary)] mb-8">The page you're looking for doesn't exist — or went extinct 66 million years ago.</p>
    <BaseButton to="/" variant="primary" icon="home">Back to Home</BaseButton>
  </div>
</template>
