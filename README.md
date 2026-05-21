<p align="center">
  <span style="font-size: 96px;">🦖</span>
</p>

<h1 align="center">Dinosaurs</h1>
<p align="center">
  <b>Step into the Mesozoic.</b> A rich, interactive encyclopedia of prehistoric life — built to explore, compare, and play.
  <br>
  <a href="https://mesoris.com"><b>mesoris.com</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" alt="Status: Active">
  <img src="https://img.shields.io/badge/vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/typescript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/tailwind-4.x-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/i18n-6_languages-8B5CF6?style=flat-square" alt="6 languages">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License: MIT">
</p>

<br>

## What's Inside

<table>
  <tr>
    <td width="50%">
      <h3>Encyclopedia</h3>
      <p>Deep profiles for dozens of dinosaurs — diet, size, era, habitat, and fascinating facts. Every creature gets its own detailed page with rich visuals.</p>
    </td>
    <td width="50%">
      <h3>Timeline</h3>
      <p>Travel through the Triassic, Jurassic, and Cretaceous periods. See how life evolved across 180 million years.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>Compare Mode</h3>
      <p>Put two dinosaurs side by side. Compare mass, length, era, and more — who was the real apex predator?</p>
    </td>
    <td>
      <h3>Science Hub</h3>
      <p>Dig into articles on paleontology, fossil formation, extinction theories, and the latest discoveries. Includes myth-busting facts and kids-friendly versions.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>Quiz</h3>
      <p>Test your knowledge across 30 questions spanning three difficulty levels. Full multi-language support with explanations for every answer.</p>
    </td>
    <td>
      <h3>Puzzle</h3>
      <p>Assemble dinosaur images from shuffled pieces. Three difficulty levels to match your skill.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>Excavation</h3>
      <p>Uncover fossils buried beneath the dirt. Carefully brush away layers to reveal what's hidden — become a paleontologist.</p>
    </td>
    <td>
      <h3>Multi-Language Routing</h3>
      <p>Locale-prefixed URLs (<code>/en/...</code>, <code>/ru/...</code>, <code>/es/...</code>) with automatic browser language detection. Six languages across every corner of the app.</p>
    </td>
  </tr>
</table>

<br>

## i18n & Accessibility

- **6 languages:** English, Russian, Spanish, German, French, Italian — every dinosaur profile, article, quiz question, and game is fully translated
- Locale-prefixed routing with automatic browser language detection and manual switcher
- RTL-friendly layout engine
- Keyboard-navigable components
- Semantic HTML with ARIA labels
- Respects `prefers-reduced-motion` and `prefers-color-scheme`

<br>

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Vue 3 · Composition API · `<script setup>` |
| **Language** | TypeScript 5.7 (strict mode) |
| **Bundler** | Vite 6 |
| **Styling** | Tailwind CSS 4 · CSS custom properties · design tokens |
| **Routing** | Vue Router 4 (locale-prefixed routes) |
| **State** | Pinia 2 |
| **i18n** | vue-i18n 10 |
| **Animation** | GSAP · CSS keyframes |
| **Icons** | Lucide · custom SVG sprite |
| **Markdown** | marked · DOMPurify |
| **DX** | vue-tsc · hot reload · `@` path alias |

<br>

## Getting Started

```bash
# 1. Clone
git clone git@github.com:bigdevwhale/dinosaurs.git
cd dinosaurs

# 2. Install
npm install

# 3. Dev server (http://localhost:5173)
npm run dev

# 4. Production build
npm run build

# 5. Preview build locally
npm run preview
```

<br>

## Open CLAW Agent — Coming Soon

We're building an **Open CLAW agent** (Continuous Learning About the World) that will:

- Crawl paleontology news sources, academic journals, and museum announcements daily
- Filter, rank, and summarize the most significant discoveries
- Push fresh, curated stories directly into the app's **Science Hub** — so the encyclopedia stays alive and current

> *No more static data. The Mesozoic is still being uncovered — and the app will grow with it.*

<br>

## Project Structure

```
src/
├── assets/styles/       # Design tokens, typography, animations
├── components/
│   ├── encyclopedia/    # Dino-specific components
│   ├── layout/          # Shell, nav, footer, SEO, language switcher
│   └── ui/              # Generic design system
├── composables/         # useMediaQuery, useParallax, useScrollAnimation…
├── data/                # Dinosaur profiles, articles, quiz questions, myths, eras, games
├── i18n/                # i18n initialization
├── locales/             # en/ ru/ es/ de/ fr/ it/ translation files
├── router/              # Vue Router with locale-prefixed routes
├── stores/              # Pinia stores
├── types/               # TypeScript interfaces
└── views/               # Page-level components (15 views)
```

<br>

## License

MIT — explore, fork, learn, and build your own thing.


