<script setup lang="ts">
import { ref } from 'vue'
import { articles } from '@/data/articles'
import { myths } from '@/data/myths'
import { useModeStore } from '@/stores/useModeStore'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseAccordion from '@/components/ui/BaseAccordion.vue'
import BaseLazyImage from '@/components/ui/BaseLazyImage.vue'
import SeoHead from '@/components/layout/SeoHead.vue'

const modeStore = useModeStore()

const flippedCards = ref<Set<string>>(new Set())

function toggleCard(id: string) {
  if (flippedCards.value.has(id)) {
    flippedCards.value.delete(id)
  } else {
    flippedCards.value.add(id)
  }
}

const explainers = [
  { title: 'Как образуются окаменелости?', content: 'Когда динозавр погибал, его тело должно было быть быстро засыпано песком или илом. На протяжении миллионов лет минералы из подземных вод постепенно замещали органический материал в костях, превращая их в камень. Этот крайне редкий процесс сохранил форму костей до наших дней.' },
  { title: 'Как мы знаем, как выглядели динозавры?', content: 'Учёные восстанавливают внешний вид динозавров по ископаемым данным: структуре костей, отпечаткам кожи, следам перьев и даже сохранившимся пигментам цвета (меланосомам) в некоторых уникальных находках. Они также сравнивают с современными родственниками — птицами и крокодилами.' },
  { title: 'Почему динозавры вымерли?', content: 'Около 66 миллионов лет назад вблизи современной Мексики в Землю врезался астероид диаметром 10 километров. Удар вызвал глобальные пожары, мегацунами и «ударную зиму», перекрывшую солнечный свет на долгие годы. В сочетании с мощными вулканическими извержениями в Индии это привело к вымиранию около 75% всех видов.' },
  { title: 'Птицы — это правда динозавры?', content: 'Да! Птицы — прямые потомки теропод. Они пережили массовое вымирание на рубеже мела и палеогена 66 миллионов лет назад. Куры, голуби и орлы — буквально современные динозавры: они разделяют сотни скелетных признаков, генов перьев и поведенческих черт со своими доисторическими предками.' },
  { title: 'Как учёные определяют поведение динозавров?', content: 'Следы, гнёзда, следы укусов, скопления костей и анатомия помогают палеонтологам делать выводы о социальном поведении, способе охоты и родительской заботе. Учёные всегда разграничивают прямые доказательства и обоснованные предположения.' },
  { title: 'Почему у некоторых динозавров были перья?', content: 'Перья, вероятно, возникли первоначально для теплоизоляции и демонстрации задолго до появления полёта. У некоторых видов они впоследствии стали полезны для высиживания яиц, ухаживания и в конечном счёте — для машущего полёта у предков птиц.' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <SeoHead
      title="Научный центр — исследования динозавров и мифы"
      description="Читайте научные статьи о динозаврах, развенчивайте распространённые мифы с помощью доказательств и изучайте простые объяснения сложных тем палеонтологии."
    />
    <h1 class="text-display-lg mb-4">Научный центр</h1>
    <p class="text-body-lg mb-10">Настоящая наука — доступным языком. Мифы развенчаны с доказательствами. Для любознательных умов любого возраста.</p>

    <!-- Articles -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Статьи</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="article in articles"
          :key="article.id"
          :to="`/science/${article.id}`"
          class="group bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
          <div class="aspect-[2/1] overflow-hidden">
            <BaseLazyImage
              :src="article.image"
              :alt="article.title"
              :srcset="`${article.image} 960w`"
              sizes="(max-width: 1024px) 100vw, 33vw"
              class="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5">
            <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[rgba(45,122,140,0.12)] text-[var(--color-info)]">{{ article.category }}</span>
            <h3 class="text-heading-md mt-2 mb-2">{{ article.titleRu }}</h3>
            <p class="text-body-sm mb-3">{{ article.summaryRu }}</p>
            <div class="flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <span>{{ article.readingTimeMinutes }} мин чтения</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Myths vs Facts -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Мифы и факты</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="myth in myths"
          :key="myth.id"
          class="myth-card"
        >
          <button
            type="button"
            class="myth-inner w-full text-left"
            :class="{ flipped: flippedCards.has(myth.id) }"
            :aria-pressed="flippedCards.has(myth.id)"
            :aria-label="`${flippedCards.has(myth.id) ? 'Факт: ' + myth.factRu : 'Миф: ' + myth.mythRu} — нажмите, чтобы ${flippedCards.has(myth.id) ? 'показать миф' : 'узнать факт'}`"
            @click="toggleCard(myth.id)"
          >
            <div class="myth-front bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3">
              <span class="text-2xl shrink-0" aria-hidden="true">❓</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-error)] mb-1">МИФ</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ myth.mythRu }}</p>
                <p class="text-xs text-[var(--color-text-tertiary)] mt-2">Нажмите, чтобы узнать факт →</p>
              </div>
            </div>
            <div class="myth-back bg-[rgba(61,140,64,0.08)] border border-[rgba(61,140,64,0.2)] rounded-[var(--radius-lg)] p-5 flex items-start gap-3" aria-hidden="true">
              <span class="text-2xl shrink-0">✅</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-success)] mb-1">ФАКТ</div>
                <p class="text-sm text-[var(--color-text-primary)]">{{ myth.factRu }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Explainers -->
    <section class="mb-16">
      <h2 class="text-display-md mb-6">Простые объяснения</h2>
      <div class="max-w-2xl">
        <BaseAccordion :items="explainers" />
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-display-md mb-6">Учебные пути</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-amber)] mb-2">Для детей</div>
          <p class="text-body-md">Короткие, увлекательные объяснения с яркими иллюстрациями, интересными фактами и развенчанием мифов в игровой форме.</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-teal)] mb-2">Для любознательных взрослых</div>
          <p class="text-body-md">Более глубокий контекст, заметки о неопределённостях и основанные на доказательствах объяснения без упрощения науки.</p>
        </div>
        <div class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-5">
          <div class="text-label text-[var(--color-brand-ember)] mb-2">Для классов</div>
          <p class="text-body-md">Структурированные темы, которые можно использовать как вводную часть урока, темы для обсуждения или материал для повторения.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.myth-card {
  perspective: 900px;
  min-height: 7rem;
}

.myth-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 7rem;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.myth-inner.flipped {
  transform: rotateY(180deg);
}

.myth-front,
.myth-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.myth-back {
  transform: rotateY(180deg);
}
</style>
