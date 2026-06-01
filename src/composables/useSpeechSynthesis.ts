import { ref, onUnmounted } from 'vue'

const LOCALE_TO_LANG: Record<string, string> = {
  en: 'en-US',
  ru: 'ru-RU',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  kk: 'kk-KZ',
}

// Fallback chain for languages rarely supported by browser TTS
const LANG_FALLBACK: Record<string, string> = {
  'kk-KZ': 'ru-RU',
}

/** Polls until voices are available (handles Opera's delayed loading). */
function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const tryResolve = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) return voices
      return null
    }

    const immediate = tryResolve()
    if (immediate) { resolve(immediate); return }

    // voiceschanged fires in Chrome/Firefox; Opera may need polling
    const onChanged = () => {
      const v = tryResolve()
      if (v) { clearInterval(poll); resolve(v) }
    }
    window.speechSynthesis.addEventListener('voiceschanged', onChanged)

    // Fallback polling for Opera (fires up to 10 times over 2s)
    const poll = setInterval(() => {
      const v = tryResolve()
      if (v) {
        clearInterval(poll)
        window.speechSynthesis.removeEventListener('voiceschanged', onChanged)
        resolve(v)
      }
    }, 200)

    setTimeout(() => {
      clearInterval(poll)
      window.speechSynthesis.removeEventListener('voiceschanged', onChanged)
      resolve(window.speechSynthesis.getVoices())
    }, 2000)
  })
}

/** Score a voice by quality: Google online > Microsoft online > Google local > others. */
function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0
  if (v.name.includes('Google')) score += 10
  else if (v.name.includes('Microsoft')) score += 5
  else if (v.name.includes('Apple') || v.name.includes('Siri')) score += 4
  if (!v.localService) score += 3  // online/network voices sound better
  return score
}

/**
 * Pick the best voice for the given BCP-47 lang, with fallback chain.
 * Never picks a voice of a completely unrelated language.
 */
function pickVoice(voices: SpeechSynthesisVoice[], lang: string): { voice: SpeechSynthesisVoice | null; lang: string } {
  const tryLang = (target: string) => {
    const prefix = target.split('-')[0]
    const candidates = voices.filter(v => v.lang.startsWith(prefix))
    if (!candidates.length) return null
    const exact = candidates.filter(v => v.lang === target)
    const pool = exact.length ? exact : candidates
    return pool.reduce((best, v) => scoreVoice(v) >= scoreVoice(best) ? v : best)
  }

  const voice = tryLang(lang)
  if (voice) return { voice, lang }

  // Try fallback language if defined
  const fallbackLang = LANG_FALLBACK[lang]
  if (fallbackLang) {
    const fallbackVoice = tryLang(fallbackLang)
    if (fallbackVoice) return { voice: fallbackVoice, lang: fallbackLang }
  }

  return { voice: null, lang }
}

export function useSpeechSynthesis() {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const isSpeaking = ref(false)

  async function speak(text: string, locale = 'en') {
    if (!isSupported) return
    stop()

    const targetLang = LOCALE_TO_LANG[locale] ?? 'en-US'
    const voices = await getVoices()
    const { voice, lang } = pickVoice(voices, targetLang)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    if (voice) utterance.voice = voice
    utterance.rate = 0.95
    utterance.onstart = () => { isSpeaking.value = true }
    utterance.onend = () => { isSpeaking.value = false }
    utterance.onerror = () => { isSpeaking.value = false }

    window.speechSynthesis.speak(utterance)
  }

  function stop() {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    isSpeaking.value = false
  }

  onUnmounted(stop)

  return { isSupported, isSpeaking, speak, stop }
}
