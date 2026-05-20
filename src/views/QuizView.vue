<script setup lang="ts">
import { ref, computed } from 'vue'
import { quizQuestions } from '@/data/quiz-questions'
import { useGameStore } from '@/stores/useGameStore'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, locale } = useI18n()
const { localRoute } = useLocale()
const gameStore = useGameStore()

const TOTAL_QUESTIONS = 10

function shuffleIndices(length: number): number[] {
  return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5)
}

const selectedQuestions = ref(quizQuestions.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS))
const shuffleOrders = ref(selectedQuestions.value.map(q => shuffleIndices(q.options.length)))
const currentIdx = ref(0)
const selectedAnswer = ref<number | null>(null)
const answers = ref<number[]>([])
const showResult = ref(false)
const gameComplete = ref(false)

const currentQ = computed(() => selectedQuestions.value[currentIdx.value])
const currentShuffleOrder = computed(() => shuffleOrders.value[currentIdx.value])
const currentCorrectIndex = computed(() => currentShuffleOrder.value.indexOf(currentQ.value?.correctIndex ?? 0))
const score = computed(() => answers.value.filter((a, i) => {
  const order = shuffleOrders.value[i]
  const originalCorrect = selectedQuestions.value[i].correctIndex
  return a === order.indexOf(originalCorrect)
}).length)
const isLast = computed(() => currentIdx.value === TOTAL_QUESTIONS - 1)
const isCorrect = computed(() => selectedAnswer.value === currentCorrectIndex.value)

const currentQuestion = computed(() => {
  if (!currentQ.value) return ''
  if (locale.value === 'it') return currentQ.value.questionIt
  if (locale.value === 'fr') return currentQ.value.questionFr
  if (locale.value === 'de') return currentQ.value.questionDe
  if (locale.value === 'es') return currentQ.value.questionEs
  if (locale.value === 'ru') return currentQ.value.questionRu
  return currentQ.value.question
})
const currentOptions = computed(() => {
  if (!currentQ.value) return []
  const order = currentShuffleOrder.value
  let opts: string[]
  if (locale.value === 'it') opts = currentQ.value.optionsIt
  else if (locale.value === 'fr') opts = currentQ.value.optionsFr
  else if (locale.value === 'de') opts = currentQ.value.optionsDe
  else if (locale.value === 'es') opts = currentQ.value.optionsEs
  else if (locale.value === 'ru') opts = currentQ.value.optionsRu
  else opts = currentQ.value.options
  return order.map(i => opts[i])
})
const currentExplanation = computed(() => {
  if (!currentQ.value) return ''
  if (locale.value === 'it') return currentQ.value.explanationIt
  if (locale.value === 'fr') return currentQ.value.explanationFr
  if (locale.value === 'de') return currentQ.value.explanationDe
  if (locale.value === 'es') return currentQ.value.explanationEs
  if (locale.value === 'ru') return currentQ.value.explanationRu
  return currentQ.value.explanation
})

function select(idx: number) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = idx
  answers.value.push(idx)
}

function next() {
  if (isLast.value) {
    gameComplete.value = true
    gameStore.recordGameCompletion('quiz', score.value)
  } else {
    currentIdx.value++
    selectedAnswer.value = null
  }
}

function restart() {
  selectedQuestions.value = quizQuestions.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS)
  shuffleOrders.value = selectedQuestions.value.map(q => shuffleIndices(q.options.length))
  currentIdx.value = 0
  selectedAnswer.value = null
  answers.value = []
  showResult.value = false
  gameComplete.value = false
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <SeoHead
      title="Dinosaur Quiz — Test Your Knowledge"
      description="Answer 10 random dinosaur trivia questions across easy, medium, and hard difficulties. How much do you really know about dinosaurs?"
    />
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <router-link :to="localRoute({ name: 'games' })" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">{{ t('ui.games.backToGames') }}</span>
      </router-link>
      <div v-if="!gameComplete" class="text-sm text-[var(--color-text-tertiary)]">
        {{ currentIdx + 1 }} / {{ TOTAL_QUESTIONS }}
      </div>
    </div>

    <!-- Game -->
    <template v-if="!gameComplete && currentQ">
      <BaseProgressBar :value="currentIdx" :max="TOTAL_QUESTIONS" size="sm" class="mb-8" color="var(--color-brand-amber)" />

      <!-- Difficulty badge -->
      <div class="mb-4">
        <span
          class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
          :class="{
            'bg-[rgba(61,140,64,0.15)] text-[var(--color-success)]': currentQ.difficulty === 'easy',
            'bg-[rgba(212,148,44,0.15)] text-[var(--color-warning)]': currentQ.difficulty === 'medium',
            'bg-[rgba(196,56,45,0.15)] text-[var(--color-error)]': currentQ.difficulty === 'hard',
          }"
        >
          {{ t('games.difficulty.' + currentQ.difficulty) }}
        </span>
      </div>

      <!-- Question -->
      <h2 class="text-heading-lg pb-6">{{ currentQuestion }}</h2>

      <!-- Options -->
      <div class="space-y-3 mb-8">
        <button
          v-for="(option, idx) in currentOptions"
          :key="idx"
          type="button"
          :disabled="selectedAnswer !== null"
          :class="[
            'w-full text-left px-5 py-4 rounded-[var(--radius-md)] border text-sm transition-all duration-200',
            selectedAnswer === null
              ? 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.06)]'
              : '',
            selectedAnswer !== null && idx === currentCorrectIndex
              ? 'border-[var(--color-success)] bg-[rgba(61,140,64,0.1)] text-[var(--color-success)]'
              : '',
            selectedAnswer !== null && idx === selectedAnswer && idx !== currentCorrectIndex
              ? 'border-[var(--color-error)] bg-[rgba(196,56,45,0.1)] text-[var(--color-error)]'
              : '',
          ]"
          @click="select(idx)"
        >
          <span class="font-semibold">{{ 'ABCD'[idx] }}.</span> {{ option }}
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="selectedAnswer !== null" class="mb-6 p-4 rounded-[var(--radius-md)] border" :class="isCorrect ? 'bg-[rgba(61,140,64,0.08)] border-[rgba(61,140,64,0.2)]' : 'bg-[rgba(196,56,45,0.08)] border-[rgba(196,56,45,0.2)]'">
        <div class="flex items-center gap-2 mb-1">
          <BaseIcon :name="isCorrect ? 'check-circle' : 'x-circle'" :size="16" :class="isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'" />
          <span class="text-sm font-semibold" :class="isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'">
            {{ isCorrect ? t('games.quizGame.correct') : t('games.quizGame.incorrect') }}
          </span>
        </div>
        <p class="text-body-sm ml-6">{{ currentExplanation }}</p>
      </div>

      <BaseButton :variant="selectedAnswer !== null ? 'primary' : 'ghost'" :disabled="selectedAnswer === null" size="md" @click="next" class="w-full">
        {{ isLast ? t('games.quizGame.seeResults') : t('games.quizGame.next') }}
      </BaseButton>
    </template>

    <!-- Results -->
    <div v-if="gameComplete" class="text-center">
      <BaseConfetti />
      <div class="text-6xl mb-6 animate-celebration-pop">
        {{ score >= 8 ? '🏆' : score >= 5 ? '🦖' : '📚' }}
      </div>
      <h2 class="text-display-md mb-2">
        {{ score >= 8 ? t('games.quizGame.amazing') : score >= 5 ? t('games.quizGame.goodJob') : t('games.quizGame.keepLearning') }}
      </h2>
      <p class="text-body-lg mb-2">
        {{ t('games.quizGame.resultsDesc', { score, total: TOTAL_QUESTIONS }) }}
      </p>
      <p class="text-body-md text-[var(--color-text-secondary)] mb-8">
        {{ score >= 9 ? t('games.quizGame.paleontologistMsg') : score >= 6 ? t('games.quizGame.niceWorkMsg') : t('games.quizGame.tryHarderMsg') }}
      </p>

      <BaseProgressBar :value="score" :max="TOTAL_QUESTIONS" :show-value="true" label="Score" color="var(--color-brand-amber)" size="md" class="mb-8" />

      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">{{ t('games.quizGame.playAgain') }}</BaseButton>
        <BaseButton variant="ghost" to="/games">{{ t('ui.games.backToGames') }}</BaseButton>
      </div>
    </div>
  </div>
</template>
