<script setup lang="ts">
import SeoHead from '@/components/layout/SeoHead.vue'
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <SeoHead
      title="About — Dinosaurs Educational Website"
      description="Learn about the Dinosaurs educational project, built with Vue 3 and modern web technologies. Our mission is making science education beautiful and accessible."
    />
    <h1 class="text-display-lg mb-4">About This Project</h1>
    <p class="text-body-lg mb-10">A premium educational website about dinosaurs, built with modern web technologies and a passion for science education.</p>

    <div class="space-y-8 text-body-md">
      <section>
        <h2 class="text-heading-md mb-3">Our Mission</h2>
        <p>We believe that science education should be beautiful, engaging, and accessible to everyone — regardless of age. This project brings paleontology to life through interactive tools, games, and beautifully presented scientific information.</p>
      </section>

      <section>
        <h2 class="text-heading-md mb-3">Technology</h2>
        <p>Built with Vue 3, TypeScript, and Tailwind CSS. Features include Pinia state management, Vue Router for navigation, GSAP for animations, and Three.js for 3D dinosaur models.</p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="px-3 py-1 text-xs rounded-full bg-[rgba(212,164,58,0.1)] text-[var(--color-brand-amber)]">Vue 3</span>
          <span class="px-3 py-1 text-xs rounded-full bg-[rgba(212,164,58,0.1)] text-[var(--color-brand-amber)]">TypeScript</span>
          <span class="px-3 py-1 text-xs rounded-full bg-[rgba(212,164,58,0.1)] text-[var(--color-brand-amber)]">Tailwind CSS</span>
          <span class="px-3 py-1 text-xs rounded-full bg-[rgba(212,164,58,0.1)] text-[var(--color-brand-amber)]">GSAP</span>
          <span class="px-3 py-1 text-xs rounded-full bg-[rgba(212,164,58,0.1)] text-[var(--color-brand-amber)]">Three.js</span>
        </div>
      </section>

      <section>
        <h2 class="text-heading-md mb-3">Data Sources</h2>
        <p>All dinosaur data is compiled from peer-reviewed paleontology research and verified against resources from:</p>
        <ul class="mt-3 space-y-2 list-disc pl-6">
          <li>Natural History Museum (London)</li>
          <li>American Museum of Natural History</li>
          <li>Smithsonian National Museum of Natural History</li>
          <li>University of California Museum of Paleontology</li>
        </ul>
      </section>

      <section class="bg-[var(--color-bg-elevated)] border border-[var(--glass-border)] rounded-[var(--radius-xl)] p-6">
        <h2 class="text-heading-md mb-3">Accessibility</h2>
        <p>This site is built with accessibility as a core principle: keyboard navigation, screen reader support, focus indicators, and reduced motion preferences are respected throughout. All interactive elements meet WCAG 2.1 AA standards.</p>
      </section>
    </div>
  </div>
</template>
