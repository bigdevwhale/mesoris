<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <SeoHead
      :title="t('ui.notFound.seoTitle')"
      :description="t('ui.notFound.seoDescription')"
    />
    <div class="text-8xl mb-6">🦴</div>
    <h1 class="text-display-lg mb-4">404</h1>
    <p class="text-body-lg mb-2">This fossil hasn't been discovered yet.</p>
    <p class="text-body-md text-[var(--color-text-secondary)] mb-8">The page you're looking for doesn't exist — or went extinct 66 million years ago.</p>
    <BaseButton to="/" variant="primary" icon="home">Back to Home</BaseButton>
  </div>
</template>
