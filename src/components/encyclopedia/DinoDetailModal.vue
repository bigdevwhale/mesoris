<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModeStore } from '@/stores/useModeStore'
import type { Dinosaur } from '@/types/dinosaur'
import { useSpeechSynthesis } from '@/composables/useSpeechSynthesis'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DinoCardImage from '@/components/ui/DinoCardImage.vue'
import ModeSwitcher from '@/components/layout/ModeSwitcher.vue'

const props = defineProps<{
  isOpen: boolean
  dino: Dinosaur | null
}>()

const emit = defineEmits<{
  close: []
  addToCompare: [id: string]
}>()

const { t, locale } = useI18n()
const modeStore = useModeStore()
const { isSupported: ttsSupported, isSpeaking, speak, stop } = useSpeechSynthesis()

const ttsText = computed(() => {
  const d = props.dino
  if (!d) return ''
  const description = modeStore.isKidsMode ? d.kidsDescription : d.description
  const facts = d.facts.map((f, i) => `${t('ui.encyclopedia.ttsFact', { n: i + 1 })}. ${f.label}: ${f.value}. ${f.description}`).join('. ')
  const parts = [
    d.displayName,
    description,
    t('ui.encyclopedia.dimensionsText', { length: d.dimensions.lengthMeters, height: d.dimensions.heightMeters }),
    `${d.dimensions.weightKg.toLocaleString()} kg.`,
    t('ui.encyclopedia.speedText', { speed: d.dimensions.speedKmh }),
    facts,
    d.funFact,
  ]
  return parts.filter(Boolean).join('. ')
})

function toggleSpeech() {
  if (isSpeaking.value) {
    stop()
  } else {
    speak(ttsText.value, locale.value)
  }
}

watch(() => props.isOpen, (open) => {
  if (!open) stop()
})
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    :title="dino?.name"
    size="lg"
    @close="emit('close')"
  >
    <template v-if="dino">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div class="aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden mb-4">
            <DinoCardImage
              :dino="dino"
              variant="hero"
              aspect-ratio="4/3"
              :priority="true"
              class="w-full h-full"
            />
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(212,164,58,0.12)] text-[var(--color-brand-amber)]">{{ t(`ui.encyclopedia.${dino.era}`) }}</span>
            <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(232,93,44,0.1)] text-[var(--color-brand-ember)]">{{ t(`ui.encyclopedia.${dino.diet}`) }}</span>
            <span class="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(139,58,42,0.1)] text-[var(--color-brand-lava)]">{{ t(`ui.encyclopedia.${dino.size}`) }}</span>
          </div>
        </div>
        <div>
          <h3 class="text-heading-md mb-1">{{ dino.displayName }}</h3>
          <p class="text-body-sm text-[var(--color-text-tertiary)] mb-4 italic">{{ dino.pronunciation }}</p>

          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
              {{ modeStore.isKidsMode ? t('ui.header.kidsMode') : t('ui.header.adultsMode') }}
            </span>
            <div class="flex items-center gap-2">
              <button
                v-if="ttsSupported"
                type="button"
                :title="isSpeaking ? t('ui.encyclopedia.ttsStop') : t('ui.encyclopedia.ttsPlay')"
                :aria-label="isSpeaking ? t('ui.encyclopedia.ttsStop') : t('ui.encyclopedia.ttsPlay')"
                :aria-pressed="isSpeaking"
                class="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[rgba(212,164,58,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-amber)]"
                :class="isSpeaking ? 'text-[var(--color-brand-amber)]' : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-brand-amber)]'"
                @click="toggleSpeech"
              >
                <BaseIcon :name="isSpeaking ? 'volume-x' : 'volume-2'" :size="16" />
              </button>
              <ModeSwitcher />
            </div>
          </div>
          <p class="text-body-md mb-6">{{ modeStore.isKidsMode ? dino.kidsDescription : dino.description }}</p>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-3">
              <BaseIcon name="ruler" :size="16" class="text-[var(--color-text-tertiary)]" />
              <span class="text-sm text-[var(--color-text-secondary)]">
                {{ t('ui.encyclopedia.dimensionsText', { length: dino.dimensions.lengthMeters, height: dino.dimensions.heightMeters }) }}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <BaseIcon name="weight" :size="16" class="text-[var(--color-text-tertiary)]" />
              <span class="text-sm text-[var(--color-text-secondary)]">
                {{ dino.dimensions.weightKg.toLocaleString() }} kg
              </span>
            </div>
            <div class="flex items-center gap-3">
              <BaseIcon name="zap" :size="16" class="text-[var(--color-text-tertiary)]" />
              <span class="text-sm text-[var(--color-text-secondary)]">
                {{ t('ui.encyclopedia.speedText', { speed: dino.dimensions.speedKmh }) }}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <BaseIcon name="map-pin" :size="16" class="text-[var(--color-text-tertiary)]" />
              <span class="text-sm text-[var(--color-text-secondary)]">
                {{ dino.livedIn.map(loc => t(`ui.encyclopedia.locations.${loc}`, loc)).join(', ') }}
              </span>
            </div>
          </div>

          <div class="space-y-3 mb-6">
            <h4 class="text-sm font-semibold text-[var(--color-text-primary)] !mb-2">{{ t('ui.encyclopedia.keyFacts') }}</h4>
            <div v-for="fact in dino.facts" :key="fact.label" class="flex items-start gap-3">
              <BaseIcon :name="fact.icon" :size="16" class="text-[var(--color-brand-amber)] mt-0.5 shrink-0" />
              <div>
                <div class="text-sm font-medium text-[var(--color-text-primary)]">{{ fact.label }}: {{ fact.value }}</div>
                <div class="text-xs text-[var(--color-text-tertiary)]">{{ fact.description }}</div>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-[var(--radius-md)] bg-[rgba(212,164,58,0.06)] border border-[rgba(212,164,58,0.1)] mb-4">
            <div class="text-xs font-semibold text-[var(--color-brand-amber)] mb-1">{{ t('ui.encyclopedia.funFact') }}</div>
            <p class="text-sm text-[var(--color-text-secondary)]">{{ dino.funFact }}</p>
          </div>

          <BaseButton variant="ghost" size="sm" icon-right="arrow-right" @click="emit('addToCompare', dino.id)">
            {{ t('ui.encyclopedia.addToCompare') }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
