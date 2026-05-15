<script setup lang="ts">
import { ref, computed } from 'vue'
import { quizQuestions } from '@/data/quiz-questions'
import { useGameStore } from '@/stores/useGameStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseConfetti from '@/components/ui/BaseConfetti.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const gameStore = useGameStore()

const TOTAL_QUESTIONS = 10
const selectedQuestions = ref(quizQuestions.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS))
const currentIdx = ref(0)
const selectedAnswer = ref<number | null>(null)
const answers = ref<number[]>([])
const showResult = ref(false)
const gameComplete = ref(false)

const currentQ = computed(() => selectedQuestions.value[currentIdx.value])
const score = computed(() => answers.value.filter((a, i) => a === selectedQuestions.value[i].correctIndex).length)
const isLast = computed(() => currentIdx.value === TOTAL_QUESTIONS - 1)
const isCorrect = computed(() => selectedAnswer.value === currentQ.value?.correctIndex)

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
      <router-link to="/games" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <BaseIcon name="arrow-left" :size="16" />
        <span class="text-sm">Back to Games</span>
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
          {{ currentQ.difficulty }}
        </span>
      </div>

      <!-- Question -->
      <h2 class="text-heading-lg mb-6">{{ currentQ.question }}</h2>

      <!-- Options -->
      <div class="space-y-3 mb-8">
        <button
          v-for="(option, idx) in currentQ.options"
          :key="idx"
          type="button"
          :disabled="selectedAnswer !== null"
          :class="[
            'w-full text-left px-5 py-4 rounded-[var(--radius-md)] border text-sm transition-all duration-200',
            selectedAnswer === null
              ? 'border-[var(--glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-amber)] hover:bg-[rgba(212,164,58,0.06)]'
              : '',
            selectedAnswer !== null && idx === currentQ.correctIndex
              ? 'border-[var(--color-success)] bg-[rgba(61,140,64,0.1)] text-[var(--color-success)]'
              : '',
            selectedAnswer !== null && idx === selectedAnswer && idx !== currentQ.correctIndex
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
            {{ isCorrect ? 'Correct!' : 'Incorrect' }}
          </span>
        </div>
        <p class="text-body-sm ml-6">{{ currentQ.explanation }}</p>
      </div>

      <BaseButton :variant="selectedAnswer !== null ? 'primary' : 'ghost'" :disabled="selectedAnswer === null" size="md" @click="next" class="w-full">
        {{ isLast ? 'See Results' : 'Next Question' }}
      </BaseButton>
    </template>

    <!-- Results -->
    <div v-if="gameComplete" class="text-center">
      <BaseConfetti />
      <div class="text-6xl mb-6 animate-celebration-pop">
        {{ score >= 8 ? '🏆' : score >= 5 ? '🦖' : '📚' }}
      </div>
      <h2 class="text-display-md mb-2">
        {{ score >= 8 ? 'Amazing!' : score >= 5 ? 'Good job!' : 'Keep learning!' }}
      </h2>
      <p class="text-body-lg mb-2">
        You scored <span class="text-[var(--color-brand-amber)] font-bold">{{ score }}</span> out of {{ TOTAL_QUESTIONS }}
      </p>
      <p class="text-body-md text-[var(--color-text-secondary)] mb-8">
        {{ score >= 9 ? 'You\'re a true paleontologist! 🦴' : score >= 6 ? 'Nice work! You know your dinosaurs.' : 'Try again — you\'ll get better each time!' }}
      </p>

      <BaseProgressBar :value="score" :max="TOTAL_QUESTIONS" :show-value="true" label="Score" color="var(--color-brand-amber)" size="md" class="mb-8" />

      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="restart">Play Again</BaseButton>
        <BaseButton variant="ghost" to="/games">Back to Games</BaseButton>
      </div>
    </div>
  </div>
</template>
