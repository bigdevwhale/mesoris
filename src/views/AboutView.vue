<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SeoHead from '@/components/layout/SeoHead.vue'

const { t, tm } = useI18n()

const sourceItems = computed(() => {
  const items = tm('ui.about.sources.items')
  return (Array.isArray(items) ? items : []) as string[]
})
</script>

<template>
  <div class="about-page">
    <SeoHead
      :title="t('ui.about.seoTitle')"
      :description="t('ui.about.seoDescription')"
    />

    <!-- ============ PAGE HEAD ============ -->
    <section class="page-head">
      <svg class="head-fossil" viewBox="0 0 200 200" fill="none" stroke-width="3" aria-hidden="true">
        <path d="M100 20c40 0 60 25 60 55 0 35-28 45-28 45s20-2 20 18-22 22-22 22" stroke-linecap="round"/>
        <path d="M100 20c-8 18-10 40-6 60M112 26c-4 16-4 34 2 52M124 36c-2 14 0 28 8 40M88 24c-10 16-14 36-12 56" stroke-linecap="round"/>
      </svg>
      <div class="wrap">
        <span class="hero-eyebrow">
          <span class="dot" aria-hidden="true"></span>
          {{ t('ui.nav.about') }}
        </span>
        <h1 class="display-title-page">{{ t('ui.about.title') }}</h1>
        <p class="page-lede">{{ t('ui.about.description') }}</p>
      </div>
    </section>

    <div class="wrap-narrow about-content">

      <!-- ============ MISSION ============ -->
      <section class="about-block" id="mission">
        <h2>{{ t('ui.about.mission.title') }}</h2>
        <p>{{ t('ui.about.mission.content') }}</p>
      </section>

      <div class="divider" aria-hidden="true"></div>

      <!-- ============ SOURCES ============ -->
      <section class="about-block" id="sources">
        <h2>{{ t('ui.about.sources.title') }}</h2>
        <p>{{ t('ui.about.sources.content') }}</p>
        <ul class="source-list">
          <li v-for="source in sourceItems" :key="source">
            <svg class="source-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ source }}</span>
          </li>
        </ul>
      </section>

      <div class="divider" aria-hidden="true"></div>

      <!-- ============ ACCESSIBILITY ============ -->
      <section class="about-block" id="accessibility">
        <div class="glass-elevated">
          <h2>
            <svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="5" r="2"/>
              <path d="M5 9l7 2 7-2M12 11v4M9 21l3-6 3 6"/>
            </svg>
            {{ t('ui.about.accessibility.title') }}
          </h2>
          <p>{{ t('ui.about.accessibility.content') }}</p>
        </div>
      </section>

      <div class="divider" aria-hidden="true"></div>

      <!-- ============ SUPPORT ============ -->
      <section class="about-block" id="support">
        <div class="support-card">
          <h2>{{ t('ui.about.support.title') }}</h2>
          <p>{{ t('ui.about.support.content') }}</p>
          <div class="support-ctas">
            <a
              class="btn btn-primary"
              href="https://boosty.to/mesoris"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('ui.about.support.boostyCta') }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.35-9.5-8.8C.8 8.6 2 5 5.3 4.2 7.4 3.7 9.6 4.6 12 7c2.4-2.4 4.6-3.3 6.7-2.8C22 5 23.2 8.6 21.5 12.2 19 16.65 12 21 12 21z"/>
              </svg>
            </a>
            <a
              class="btn btn-teal"
              href="https://www.paypal.com/paypalme/AyratBadykov"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('ui.about.support.paypalCta') }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 4h9a4 4 0 0 1 4 4.5c-.4 3.3-2.6 5-6 5H9.5L8 21H4L6 4z"/>
                <path d="M9.4 13.5H14c3 0 4.9-1.4 5.3-4.3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div class="divider" aria-hidden="true"></div>

      <!-- ============ CONTACT ============ -->
      <section class="about-block" id="contact">
        <h2>{{ t('ui.about.contact.title') }}</h2>
        <p>{{ t('ui.about.contact.content') }}</p>
        <ul class="contact-list">
          <li>
            <a href="mailto:marat.badykov.555@gmail.com">
              <span class="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">{{ t('ui.about.contact.emailLabel') }}</span>
                <span class="contact-value">marat.badykov.555@gmail.com</span>
              </span>
            </a>
          </li>
          <li>
            <a href="https://t.me/marat_badykov" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11.5l6 2M21 4l-4 17-8-6.5M21 4 9 13.5v4"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">{{ t('ui.about.contact.telegramLabel') }}</span>
                <span class="contact-value">@marat_badykov</span>
              </span>
            </a>
          </li>
          <li>
            <a href="https://x.com/Mesoris_com" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M20 4 4 20"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">{{ t('ui.about.contact.xLabel') }}</span>
                <span class="contact-value">@Mesoris_com</span>
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.threads.net/@be_till_the_end" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-5 0-8 3.2-8 9s3 9 8 9 7-2.6 7-6.2c0-3-1.8-4.6-4.6-4.6-2.3 0-3.7 1.2-3.7 2.9 0 1.4 1 2.3 2.6 2.3 1.8 0 2.9-1.2 3-3.3"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">{{ t('ui.about.contact.threadsLabel') }}</span>
                <span class="contact-value">@be_till_the_end</span>
              </span>
            </a>
          </li>
          <li>
            <a href="https://github.com/bigdevwhale/mesoris" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 18c-4-1.2-4-4.5-4-4.5.5-1.3 1.7-2 1.7-2-.3-1 0-2 .3-2.3 0 0 1-.3 3 1.1a10 10 0 0 1 5.3 0c2-1.4 3-1.1 3-1.1.3.3.6 1.3.3 2.3 0 0 1.2.7 1.7 2 0 0 0 3.3-4 4.5"/><path d="M9 18v2.3M15 18v2.3"/></svg>
              </span>
              <span class="contact-text">
                <span class="contact-label">{{ t('ui.about.contact.githubLabel') }}</span>
                <span class="contact-value">github.com/bigdevwhale/mesoris</span>
              </span>
            </a>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<style scoped>
.about-page { min-height: 100vh; }

/* Local type/space tokens — the rest map to global tokens.css */
.about-page {
  --text-display: clamp(2.75rem, 9vw, 4.75rem);
  --text-h2: clamp(1.4rem, 3.6vw, 1.85rem);
  --text-caption: 0.8125rem;
  --space-section: clamp(3rem, 8vw, 5rem);
  --wrap: 1160px;
  --wrap-narrow: 840px;
}

.wrap { width: min(var(--wrap), 100% - 2.5rem); margin-inline: auto; }
.wrap-narrow { width: min(var(--wrap-narrow), 100% - 2.5rem); margin-inline: auto; }

/* ============ PAGE HEAD ============ */
.page-head {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding-block: clamp(3.5rem, 10vw, 5.5rem) clamp(2.5rem, 6vw, 3.5rem);
  background:
    radial-gradient(70% 60% at 20% 0%, rgba(45, 138, 123, 0.14) 0%, transparent 55%),
    radial-gradient(70% 60% at 82% 15%, rgba(212, 164, 58, 0.14) 0%, transparent 55%),
    linear-gradient(180deg, var(--color-bg-deep) 0%, var(--color-bg-base) 100%);
}
.page-head::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: radial-gradient(rgba(212, 164, 58, 0.1) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(60% 60% at 50% 30%, black, transparent 75%);
  mask-image: radial-gradient(60% 60% at 50% 30%, black, transparent 75%);
}
.head-fossil {
  position: absolute;
  top: -30px;
  right: -20px;
  width: 220px;
  opacity: 0.06;
  stroke: var(--fossil-stroke);
  pointer-events: none;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: var(--eyebrow-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.95rem 0.35rem 0.6rem;
  font-size: var(--text-caption);
  color: var(--color-brand-sand);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-bottom: 1.4rem;
  position: relative;
  z-index: 1;
}
.hero-eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-ember);
  box-shadow: 0 0 10px var(--color-brand-ember);
  animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.display-title-page {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.1;
  background: linear-gradient(160deg, var(--title-from) 25%, var(--title-amber) 70%, var(--title-ember) 108%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 6px 30px rgba(212, 164, 58, 0.16));
}
.page-lede {
  position: relative;
  z-index: 1;
  margin: 1rem auto 0;
  max-width: 46ch;
  color: var(--color-text-secondary);
  font-size: clamp(1.02rem, 2.2vw, 1.2rem);
  text-wrap: pretty;
}

/* ============ ABOUT CONTENT ============ */
.about-content { padding-block: var(--space-section); }
.about-block { padding-block: clamp(2.5rem, 6vw, 3.75rem); }
.about-block:first-child { padding-top: 0; }
.about-block h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 1rem;
  text-wrap: balance;
}
.about-block > p {
  color: var(--color-text-secondary);
  text-wrap: pretty;
}
.divider { height: 1px; background: var(--glass-border); }

/* ── SOURCES LIST ─────────────────────────────────────── */
.source-list {
  list-style: none;
  display: grid;
  gap: 0.7rem;
  margin-top: 1.5rem;
  padding: 0;
}
.source-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.1rem;
  font-size: 0.95rem;
  color: var(--color-text-primary);
}
.source-check {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 0.1rem;
  color: var(--color-brand-amber);
}

/* ── ACCESSIBILITY (elevated glass card) ─────────────────── */
.glass-elevated {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.75rem, 5vw, 2.75rem);
}
.glass-elevated h2 {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.glass-elevated .a11y-icon {
  flex: none;
  width: 26px;
  height: 26px;
  color: var(--color-brand-teal);
}

/* ── SUPPORT (highlighted glass card, ember glow) ───────── */
.support-card {
  position: relative;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(232, 93, 44, 0.28);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: clamp(1.75rem, 5vw, 2.75rem);
}
.support-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 90% at 100% 0%, rgba(232, 93, 44, 0.22) 0%, transparent 55%);
}
.support-card > * { position: relative; }
.support-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.6rem;
}

/* ── BUTTONS ────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0.85rem 1.7rem;
  border-radius: var(--radius-full);
  transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.btn:active { transform: translateY(1px); }
.btn-primary {
  background: linear-gradient(135deg, var(--color-brand-ember) 0%, #c74518 100%);
  color: #fff5ec;
  box-shadow: var(--shadow-button);
}
.btn-primary:hover {
  box-shadow: 0 4px 24px rgba(232, 93, 44, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}
.btn-teal {
  background: linear-gradient(135deg, var(--color-brand-teal) 0%, #226e61 100%);
  color: #eafbf6;
  box-shadow: 0 2px 12px rgba(45, 138, 123, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.btn-teal:hover {
  box-shadow: 0 4px 24px rgba(45, 138, 123, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transform: translateY(-2px);
}

/* ── CONTACT LIST ────────────────────────────────────────── */
.contact-list {
  list-style: none;
  display: grid;
  gap: 0.7rem;
  margin-top: 1.5rem;
  padding: 0;
}
.contact-list a {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  text-decoration: none;
  background: var(--color-bg-elevated);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.1rem;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease;
}
.contact-list a:hover {
  transform: translateY(-2px);
  border-color: rgba(212, 164, 58, 0.35);
  box-shadow: var(--shadow-card);
}
.contact-icon {
  flex: none;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: rgba(212, 164, 58, 0.14);
  color: var(--color-brand-amber);
}
.contact-icon svg { width: 19px; height: 19px; }
.contact-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.contact-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.contact-value {
  color: var(--color-text-primary);
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}

/* ============ MOTION SAFETY ============ */
@media (prefers-reduced-motion: reduce) {
  .hero-eyebrow .dot { animation: none; }
  .btn, .contact-list a { transition: none; }
}

/* ============ LIGHT THEME OVERRIDES ============ */
:deep(html[data-theme='light']) .head-fossil { opacity: 0.08; }
:deep(html[data-theme='light']) .contact-icon { background: rgba(168, 118, 31, 0.14); }
</style>