<script setup lang="ts">
import { useHead } from '@vueuse/head'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  image?: string
  ogType?: string
  canonicalUrl?: string
}>(), {
  title: 'Dinosaurs — Interactive Prehistoric World',
  description: 'Explore the amazing world of dinosaurs. Interactive encyclopedia, games, comparisons, and science for kids and adults.',
  image: '/images/ui/og-image.webp',
  ogType: 'website',
})

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:type', content: props.ogType },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image },
  ],
  link: props.canonicalUrl
    ? [{ rel: 'canonical', href: props.canonicalUrl }]
    : [],
})
</script>

<template>
  <div style="display: none" />
</template>
