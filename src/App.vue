<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { useDinoOfDayStore } from '@/stores/useDinoOfDayStore'
import { useUiStore } from '@/stores/useUiStore'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SearchOverlay from '@/components/layout/SearchOverlay.vue'

const { t, locale } = useI18n()
const route = useRoute()
const dinoStore = useDinoOfDayStore()
const uiStore = useUiStore()

onMounted(() => {
  dinoStore.generateToday()
})

// Sync i18n locale with router locale param
watch(
  () => route.params.locale,
  (newLocale) => {
    if (newLocale && newLocale !== locale.value) {
      locale.value = newLocale as string
    }
  },
  { immediate: true },
)

function onEnter(el: Element, done: () => void) {
  gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', onComplete: done })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, { opacity: 0, y: -12, duration: 0.2, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <a href="#main-content" class="skip-to-content">{{ t('ui.header.skipToContent') }}</a>

  <AppHeader v-if="!uiStore.isImmersive" />

  <main id="main-content" :class="uiStore.isImmersive ? '' : 'pt-16 pb-16 md:pb-0'">
    <router-view v-slot="{ Component, route }">
      <transition
        mode="out-in"
        @enter="onEnter"
        @leave="onLeave"
      >
        <!-- Key by path-without-locale so changing only the language
             doesn't unmount the current view. The previous `:key="route.path"`
             caused Meteor Run (and other heavy game views) to render as a
             blank main block right after locale switch. -->
        <component :is="Component" :key="route.path.replace(/^\/[a-z]{2}/, '')" />
      </transition>
    </router-view>
  </main>

  <AppFooter v-if="!uiStore.isImmersive" />

  <SearchOverlay :is-open="uiStore.isSearchOpen" @close="uiStore.closeSearch()" />
</template>
