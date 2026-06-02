<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SeoHead from '@/components/layout/SeoHead.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

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

      <section>
        <h2 class="text-heading-md mb-3">{{ t('ui.about.contact.title') }}</h2>
        <p class="mb-3">{{ t('ui.about.contact.content') }}</p>
        <ul class="space-y-2">
          <li>
            <a href="mailto:marat.badykov.555@gmail.com" class="inline-flex items-center gap-2 text-[var(--color-brand-amber)] hover:underline">
              <BaseIcon name="mail" :size="16" /> marat.badykov.555@gmail.com
            </a>
          </li>
          <li>
            <a href="https://t.me/marat_badykov" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[var(--color-brand-amber)] hover:underline">
              <BaseIcon name="send" :size="16" /> @marat_badykov
            </a>
          </li>
          <li>
            <a href="https://x.com/Mesoris_com" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[var(--color-brand-amber)] hover:underline">
              <BaseIcon name="twitter" :size="16" /> @Mesoris_com
            </a>
          </li>
          <li>
            <a href="https://www.threads.com/@be_till_the_end" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[var(--color-brand-amber)] hover:underline">
              <BaseIcon name="at-sign" :size="16" /> @be_till_the_end
            </a>
          </li>
          <li>
            <a href="https://github.com/bigdevwhale/mesoris" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[var(--color-brand-amber)] hover:underline">
              <BaseIcon name="github" :size="16" /> github.com/bigdevwhale/mesoris
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
