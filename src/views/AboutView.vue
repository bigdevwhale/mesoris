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

      <section class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6 relative overflow-hidden">
        <!-- Subtle decorative glow -->
        <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-brand-ember)]/10 blur-3xl pointer-events-none" />
        <div class="relative">
          <div class="flex items-center gap-2 mb-3">
            <BaseIcon name="heart" :size="20" class="text-[var(--color-brand-ember)]" />
            <h2 class="text-heading-md">{{ t('ui.about.support.title') }}</h2>
          </div>
          <p class="mb-5">{{ t('ui.about.support.content') }}</p>
          <div class="flex flex-wrap gap-3">
            <a
              href="https://boosty.to/mesoris"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[rgba(255,90,60,0.35)] bg-[rgba(255,90,60,0.1)] hover:bg-[rgba(255,90,60,0.18)] hover:border-[rgba(255,90,60,0.5)] text-sm font-semibold transition-all duration-200"
            >
              <BaseIcon name="heart" :size="16" class="text-[var(--color-brand-ember)]" />
              <span>{{ t('ui.about.support.boostyCta') }}</span>
              <BaseIcon name="external-link" :size="14" class="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-brand-ember)] transition-colors" />
            </a>
            <a
              href="https://www.paypal.com/paypalme/AyratBadykov"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] hover:bg-[rgba(59,130,246,0.18)] hover:border-[rgba(59,130,246,0.5)] text-sm font-semibold transition-all duration-200"
            >
              <BaseIcon name="external-link" :size="16" class="text-[#3b82f6]" />
              <span>{{ t('ui.about.support.paypalCta') }}</span>
            </a>
          </div>
        </div>
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
