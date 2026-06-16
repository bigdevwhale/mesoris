<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useGameStore } from '@/stores/useGameStore'
import {
  personalityQuestions,
  computePersonalityResult,
  type DinosaurPersonality,
  type PersonalityQuestion,
} from '@/data/personality-quiz'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

const TOTAL = personalityQuestions.length

function shuffleIndices(length: number): number[] {
  return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5)
}

function generateShuffleOrders(): number[][] {
  return personalityQuestions.map(q => shuffleIndices(q.options.length))
}

type Phase = 'intro' | 'quiz' | 'result'
const phase = ref<Phase>('intro')
const currentIdx = ref(0)
const answers = ref<number[][]>([])
const shuffleOrders = ref<number[][]>(generateShuffleOrders())
const result = ref<DinosaurPersonality | null>(null)

const currentQ = computed<PersonalityQuestion>(() => personalityQuestions[currentIdx.value])
const currentShuffleOrder = computed(() => shuffleOrders.value[currentIdx.value])

function localizedQuestion(q: PersonalityQuestion): string {
  if (locale.value === 'hi') return q.questionHi
  if (locale.value === 'kk') return q.questionKk
  if (locale.value === 'ko') return q.questionKo
  if (locale.value === 'zh') return q.questionZh
  if (locale.value === 'ja') return q.questionJa
  if (locale.value === 'ru') return q.questionRu
  if (locale.value === 'es') return q.questionEs
  if (locale.value === 'de') return q.questionDe
  if (locale.value === 'fr') return q.questionFr
  if (locale.value === 'it') return q.questionIt
  return q.question
}

function localizedOption(q: PersonalityQuestion, idx: number): string {
  const opt = q.options[idx]
  if (!opt) return ''
  if (locale.value === 'hi') return opt.textHi
  if (locale.value === 'kk') return opt.textKk
  if (locale.value === 'ko') return opt.textKo
  if (locale.value === 'zh') return opt.textZh
  if (locale.value === 'ja') return opt.textJa
  if (locale.value === 'ru') return opt.textRu
  if (locale.value === 'es') return opt.textEs
  if (locale.value === 'de') return opt.textDe
  if (locale.value === 'fr') return opt.textFr
  if (locale.value === 'it') return opt.textIt
  return opt.text
}

function localizedTitle(d: DinosaurPersonality): string {
  if (locale.value === 'hi') return d.titleHi
  if (locale.value === 'kk') return d.titleKk
  if (locale.value === 'ko') return d.titleKo
  if (locale.value === 'zh') return d.titleZh
  if (locale.value === 'ja') return d.titleJa
  if (locale.value === 'ru') return d.titleRu
  if (locale.value === 'es') return d.titleEs
  if (locale.value === 'de') return d.titleDe
  if (locale.value === 'fr') return d.titleFr
  if (locale.value === 'it') return d.titleIt
  return d.title
}

function localizedDescription(d: DinosaurPersonality): string {
  if (locale.value === 'hi') return d.descriptionHi
  if (locale.value === 'kk') return d.descriptionKk
  if (locale.value === 'ko') return d.descriptionKo
  if (locale.value === 'zh') return d.descriptionZh
  if (locale.value === 'ja') return d.descriptionJa
  if (locale.value === 'ru') return d.descriptionRu
  if (locale.value === 'es') return d.descriptionEs
  if (locale.value === 'de') return d.descriptionDe
  if (locale.value === 'fr') return d.descriptionFr
  if (locale.value === 'it') return d.descriptionIt
  return d.description
}

function localizedFunFact(d: DinosaurPersonality): string {
  if (locale.value === 'hi') return d.funFactHi
  if (locale.value === 'kk') return d.funFactKk
  if (locale.value === 'ko') return d.funFactKo
  if (locale.value === 'zh') return d.funFactZh
  if (locale.value === 'ja') return d.funFactJa
  if (locale.value === 'ru') return d.funFactRu
  if (locale.value === 'es') return d.funFactEs
  if (locale.value === 'de') return d.funFactDe
  if (locale.value === 'fr') return d.funFactFr
  if (locale.value === 'it') return d.funFactIt
  return d.funFact
}

function localizedName(d: DinosaurPersonality): string {
  if (locale.value === 'hi') return d.nameHi
  if (locale.value === 'kk') return d.nameKk
  if (locale.value === 'ko') return d.nameKo
  if (locale.value === 'zh') return d.nameZh
  if (locale.value === 'ja') return d.nameJa
  if (locale.value === 'ru') return d.nameRu
  if (locale.value === 'es') return d.nameEs
  if (locale.value === 'de') return d.nameDe
  if (locale.value === 'fr') return d.nameFr
  if (locale.value === 'it') return d.nameIt
  return d.name
}

function startQuiz() {
  currentIdx.value = 0
  answers.value = []
  shuffleOrders.value = generateShuffleOrders()
  result.value = null
  phase.value = 'quiz'
}

function selectOption(displayIdx: number) {
  // Map display index back to the original option index
  const originalIdx = currentShuffleOrder.value[displayIdx]
  answers.value.push([originalIdx])

  if (currentIdx.value < TOTAL - 1) {
    currentIdx.value++
  } else {
    result.value = computePersonalityResult(answers.value, personalityQuestions)
    gameStore.recordGameCompletion('personality', 100)
    phase.value = 'result'
  }
}

function restart() {
  phase.value = 'intro'
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <SeoHead
      :title="t('games.personalityGame.title')"
      :description="t('games.personalityGame.description')"
    />

    <!-- Back link -->
    <div class="mb-8">
      <router-link
        :to="localRoute({ name: 'games' })"
        class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors w-fit"
      >
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('games.personalityGame.backToGames') }}</span>
      </router-link>
    </div>

    <!-- INTRO -->
    <div v-if="phase === 'intro'" class="text-center">
      <div class="text-8xl mb-6 animate-celebration-pop">🦖</div>
      <h1 class="text-display-md mb-4">{{ t('games.personalityGame.title') }}</h1>
      <p class="text-body-lg text-[var(--color-text-secondary)] mb-10 max-w-md mx-auto">
        {{ t('games.personalityGame.description') }}
      </p>
      <BaseButton variant="primary" size="lg" @click="startQuiz">
        {{ t('games.personalityGame.start') }}
      </BaseButton>
    </div>

    <!-- QUIZ -->
    <template v-if="phase === 'quiz' && currentQ">
      <!-- Progress -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm text-[var(--color-text-tertiary)]">
          {{ t('games.personalityGame.question', { current: currentIdx + 1, total: TOTAL }) }}
        </span>
      </div>
      <BaseProgressBar
        :value="currentIdx"
        :max="TOTAL"
        size="sm"
        class="mb-8"
        color="var(--color-brand-amber)"
      />

      <!-- Question -->
      <h2 class="text-heading-lg pb-8">{{ localizedQuestion(currentQ) }}</h2>

      <!-- Options -->
      <div class="space-y-3">
        <button
          v-for="(displayIdx, btnIdx) in currentShuffleOrder"
          :key="displayIdx"
          type="button"
          class="w-full text-left px-5 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--color-bg-elevated)] text-sm transition-all duration-200 hover:border-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.06)] hover:-translate-y-0.5 active:translate-y-0"
          @click="selectOption(btnIdx)"
        >
          <span class="font-semibold text-[var(--color-brand-amber)]">{{ 'ABCD'[btnIdx] }}.</span>
          <span class="ml-2 text-[var(--color-text-primary)]">{{ localizedOption(currentQ, displayIdx) }}</span>
        </button>
      </div>
    </template>

    <!-- RESULT -->
    <div v-if="phase === 'result' && result" class="text-center">
      <BaseConfetti />

      <!-- Dino image card -->
      <div
        class="relative overflow-hidden rounded-[var(--radius-xl)] mx-auto mb-8 shadow-[var(--shadow-card-hover)] animate-celebration-pop"
        style="max-width: 340px; aspect-ratio: 4/3;"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br"
          :class="result.colorClass"
        />
        <img
          :src="`/images/dinosaurs/${result.imageSlug}/card.webp`"
          :alt="result.name"
          loading="eager"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <p class="text-body-lg text-[var(--color-text-secondary)] mb-1">
        {{ t('games.personalityGame.yourResult') }}
      </p>
      <h2 class="text-display-md mb-1">{{ localizedName(result) }}</h2>
      <p class="text-heading-md text-[var(--color-brand-amber)] mb-6">{{ localizedTitle(result) }}</p>

      <p class="text-body-lg text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
        {{ localizedDescription(result) }}
      </p>

      <!-- Fun fact -->
      <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-md)] p-5 mb-8 text-left max-w-lg mx-auto">
        <div class="flex items-center gap-2 mb-2">
          <BaseIcon name="lightbulb" :size="16" class="text-[var(--color-brand-amber)]" />
          <span class="text-sm font-semibold text-[var(--color-brand-amber)]">
            {{ t('games.personalityGame.funFact') }}
          </span>
        </div>
        <p class="text-body-sm">{{ localizedFunFact(result) }}</p>
      </div>

      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">
          {{ t('games.personalityGame.playAgain') }}
        </BaseButton>
        <BaseButton variant="ghost" :to="localRoute({ name: 'games' })">
          {{ t('games.personalityGame.backToGames') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
