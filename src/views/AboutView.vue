<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, tm } = useI18n()

const sourceItems = computed(() => {
  const items = tm('ui.about.sources.items')
  return (Array.isArray(items) ? items : []) as string[]
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('ui.about.seoTitle')"
      :description="t('ui.about.seoDescription')"
    />
    <h1 class="text-display-lg mb-4">{{ t('ui.about.title') }}</h1>
    <p class="text-body-lg mb-10">{{ t('ui.about.description') }}</p>

    <div class="space-y-8 text-body-md">
      <section>
        <h2 class="text-heading-md mb-3">{{ t('ui.about.mission.title') }}</h2>
        <p>{{ t('ui.about.mission.content') }}</p>
      </section>

      <section>
        <h2 class="text-heading-md mb-3">{{ t('ui.about.sources.title') }}</h2>
        <p>{{ t('ui.about.sources.content') }}</p>
        <ul class="mt-3 space-y-2 list-disc pl-6">
          <li v-for="source in sourceItems" :key="source">{{ source }}</li>
        </ul>
      </section>

      <section class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6">
        <h2 class="text-heading-md mb-3">{{ t('ui.about.accessibility.title') }}</h2>
        <p>{{ t('ui.about.accessibility.content') }}</p>
      </section>
    </div>
  </div>
</template>
