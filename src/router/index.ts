import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

const SUPPORTED_LOCALES = ['en', 'ru', 'es', 'de', 'fr', 'it', 'ja', 'zh', 'ko', 'kk', 'hi'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

const DEFAULT_LOCALE: Locale = 'en'
const LOCALE_STORAGE_KEY = 'dino-locale'
const LOCALE_CHOSEN_KEY = 'dino-locale-chosen'

function detectBrowserLocale(): Locale {
  const nav = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ''
  const code = nav.toLowerCase().split('-')[0]
  return (SUPPORTED_LOCALES as readonly string[]).includes(code) ? (code as Locale) : DEFAULT_LOCALE
}

function getInitialLocale(): Locale {
  if (localStorage.getItem(LOCALE_CHOSEN_KEY) === '1') {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
      return saved as Locale
    }
  }
  return detectBrowserLocale()
}

function setLocaleCookie(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

// Regex to detect if path starts with a supported locale prefix: /en/... or /ru/...
const LOCALE_PREFIX_RE = /^\/(en|ru|es|de|fr|it|ja|zh|ko|kk|hi)(\/|$)/

const childRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: 'encyclopedia',
    name: 'encyclopedia',
    component: () => import('@/views/EncyclopediaView.vue'),
  },
  {
    path: 'encyclopedia/:id',
    name: 'encyclopedia-detail',
    component: () => import('@/views/EncyclopediaView.vue'),
  },
  {
    path: 'timeline',
    name: 'timeline',
    component: () => import('@/views/TimelineView.vue'),
  },
  {
    path: 'compare',
    name: 'compare',
    component: () => import('@/views/CompareView.vue'),
  },
  {
    path: 'games',
    name: 'games',
    component: () => import('@/views/GamesHubView.vue'),
  },
  {
    path: 'games/quiz',
    name: 'quiz',
    component: () => import('@/views/QuizView.vue'),
  },
  {
    path: 'games/puzzle',
    name: 'puzzle',
    component: () => import('@/views/PuzzleView.vue'),
  },
  {
    path: 'games/excavation',
    name: 'excavation',
    component: () => import('@/views/ExcavationView.vue'),
  },
  {
    path: 'games/memory',
    name: 'memory',
    component: () => import('@/views/MemoryView.vue'),
  },
  {
    path: 'games/personality',
    name: 'personality',
    component: () => import('@/views/PersonalityQuizView.vue'),
  },
  {
    path: 'games/runner',
    name: 'runner',
    component: () => import('@/views/RunnerView.vue'),
  },
  {
    path: 'games/tamagotchi',
    name: 'tamagotchi',
    component: () => import('@/views/TamagotchiView.vue'),
  },
  {
    path: 'games/battle',
    name: 'battle',
    component: () => import('@/views/BattleView.vue'),
  },
  {
    path: 'games/diet-detective',
    name: 'diet-detective',
    component: () => import('@/views/DietDetectiveView.vue'),
  },
  {
    path: 'games/dino-map',
    name: 'dino-map',
    component: () => import('@/views/DinoMapView.vue'),
  },
  {
    path: 'games/meteor-run',
    name: 'meteor-run',
    component: () => import('@/views/MeteorRunView.vue'),
  },
  {
    path: 'games/dino-duel',
    name: 'dino-duel',
    component: () => import('@/views/DinoDuelView.vue'),
  },
  {
    path: 'games/ptero-glide',
    name: 'ptero-glide',
    component: () => import('@/views/PteroGlideView.vue'),
  },
  {
    path: 'games/dino-match3',
    name: 'dino-match3',
    component: () => import('@/views/DinoMatch3View.vue'),
  },
  {
    path: 'science',
    name: 'science',
    component: () => import('@/views/ScienceView.vue'),
  },
  {
    path: 'science/:id',
    name: 'article',
    component: () => import('@/views/ArticleView.vue'),
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: ':pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/:locale',
    children: childRoutes,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  const match = to.path.match(LOCALE_PREFIX_RE)

  if (!match) {
    // No locale prefix — redirect to detected locale
    const locale = getInitialLocale()
    const rest = to.path === '/' ? '' : to.path
    return next(`/${locale}${rest}`)
  }

  const locale = match[1] as Locale
  setLocaleCookie(locale)
  next()
})

router.afterEach((to) => {
  const match = to.path.match(LOCALE_PREFIX_RE)
  const locale = (match ? match[1] : DEFAULT_LOCALE) as Locale
  setLocaleCookie(locale)
  document.title = getPageTitle(to)
})

const PAGE_TITLES: Record<string, Record<string, string>> = {
  en: {
    base: 'Mesoris',
    home: 'Welcome to the Prehistoric World',
    encyclopedia: 'Dinosaur Encyclopedia',
    'encyclopedia-detail': 'Dinosaur Details',
    timeline: 'Prehistoric Timeline',
    compare: 'Compare Dinosaurs',
    games: 'Dinosaur Games',
    quiz: 'Dinosaur Quiz',
    puzzle: 'Dinosaur Puzzle',
    excavation: 'Fossil Excavation',
    memory: 'Memory Match',
    runner: 'Dino Runner',
    personality: 'Which Dino Are You?',
    tamagotchi: 'Dino Tamagotchi',
    battle: 'Dino Battle Simulator',
    'diet-detective': 'Diet Detective',
    'dino-map': 'Dino Map',
    'meteor-run': 'Meteor Run',
    'dino-duel': 'Who Is Greater?',
    'ptero-glide': 'Ptero Glide',
    'dino-match3': 'Dino Match-3',
    science: 'Science Center',
    article: 'Science Article',
    about: 'About',
    'not-found': 'Page Not Found',
    fallback: 'Interactive Prehistoric World',
  },
  ru: {
    base: 'Динозавры',
    home: 'Добро пожаловать в доисторический мир',
    encyclopedia: 'Энциклопедия динозавров',
    'encyclopedia-detail': 'Динозавр',
    timeline: 'Хронология жизни',
    compare: 'Сравнение динозавров',
    games: 'Игры с динозаврами',
    quiz: 'Викторина о динозаврах',
    puzzle: 'Пазл с динозаврами',
    excavation: 'Раскопки окаменелостей',
    memory: 'Найди пару',
    runner: 'Бег динозавра',
    personality: 'Какой ты динозавр?',
    tamagotchi: 'Тамагочи с динозавром',
    battle: 'Симулятор битв динозавров',
    'diet-detective': 'Детектив диеты',
    'dino-map': 'Карта динозавров',
    'meteor-run': 'Метеорит: Беги!',
    'dino-duel': 'Кто больше?',
    'ptero-glide': 'Полёт птеродактиля',
    'dino-match3': 'Три в ряд: динозавры',
    science: 'Научный центр',
    article: 'Научная статья',
    about: 'О проекте',
    'not-found': 'Страница не найдена',
    fallback: 'Интерактивный доисторический мир',
  },
  es: {
    base: 'Dinosaurios',
    home: 'Bienvenido al Mundo Prehistorico',
    encyclopedia: 'Enciclopedia de Dinosaurios',
    'encyclopedia-detail': 'Detalles del Dinosaurio',
    timeline: 'Linea de Tiempo Prehistorica',
    compare: 'Comparar Dinosaurios',
    games: 'Juegos de Dinosaurios',
    quiz: 'Quiz de Dinosaurios',
    puzzle: 'Rompecabezas de Dinosaurios',
    excavation: 'Excavacion de Fosiles',
    memory: 'Memoria',
    runner: 'Carrera del Dinosaurio',
    personality: '¿Qué Dinosaurio Eres?',
    tamagotchi: 'Dino Tamagotchi',
    battle: 'Simulador de Batalla de Dinosaurios',
    'diet-detective': 'Detective de Dietas',
    'dino-map': 'Mapa de Dinosaurios',
    'meteor-run': '¡Huye del Meteorito!',
    'dino-duel': '¿Quién es más grande?',
    'ptero-glide': 'Vuelo del pterodáctilo',
    'dino-match3': 'Dino Match-3',
    science: 'Centro de Ciencias',
    article: 'Articulo Cientifico',
    about: 'Acerca de',
    'not-found': 'Pagina No Encontrada',
    fallback: 'Mundo Prehistorico Interactivo',
  },
  de: {
    base: 'Dinosaurier',
    home: 'Willkommen in der Urzeit',
    encyclopedia: 'Dinosaurier-Enzyklopadie',
    'encyclopedia-detail': 'Dinosaurier-Details',
    timeline: 'Prahistorische Zeitleiste',
    compare: 'Dinosaurier Vergleichen',
    games: 'Dinosaurier-Spiele',
    quiz: 'Dinosaurier-Quiz',
    puzzle: 'Dinosaurier-Puzzle',
    excavation: 'Fossilienausgrabung',
    memory: 'Dino-Memo',
    runner: 'Dino-Lauf',
    personality: 'Welcher Dino Bist Du?',
    tamagotchi: 'Dino Tamagotchi',
    battle: 'Dino Kampf-Simulator',
    'diet-detective': 'Dino-Detektiv',
    'dino-map': 'Dino-Karte',
    'meteor-run': 'Meteor-Run',
    'dino-duel': 'Wer ist größer?',
    'ptero-glide': 'Pterodaktylus-Gleitflug',
    'dino-match3': 'Dino-3er-Reihe',
    science: 'Wissenschaftszentrum',
    article: 'Wissenschaftlicher Artikel',
    about: 'Uber uns',
    'not-found': 'Seite nicht gefunden',
    fallback: 'Interaktive prahistorische Welt',
  },
  fr: {
    base: 'Dinosaures',
    home: 'Bienvenue dans le Monde Prehistorique',
    encyclopedia: 'Encyclopedie des Dinosaures',
    'encyclopedia-detail': 'Details du Dinosaure',
    timeline: 'Chronologie Prehistorique',
    compare: 'Comparer les Dinosaures',
    games: 'Jeux de Dinosaures',
    quiz: 'Quiz sur les Dinosaures',
    puzzle: 'Puzzle de Dinosaures',
    excavation: 'Fouille de Fossiles',
    memory: 'Memory Dinosaures',
    runner: 'Course du Dinosaure',
    personality: 'Quel Dinosaure Es-Tu ?',
    tamagotchi: 'Dino Tamagotchi',
    battle: 'Simulateur de Combat de Dinosaures',
    'diet-detective': 'Détective des Régimes',
    'dino-map': 'Carte des Dinosaures',
    'meteor-run': 'Fuis le Météore !',
    'dino-duel': 'Qui est le plus grand ?',
    'ptero-glide': 'Vol du ptérodactyle',
    'dino-match3': 'Dino Match-3',
    science: 'Centre Scientifique',
    article: 'Article Scientifique',
    about: 'A propos',
    'not-found': 'Page Introuvable',
    fallback: 'Monde Prehistorique Interactif',
  },
  it: {
    base: 'Dinosauri',
    home: 'Benvenuti nel Mondo Preistorico',
    encyclopedia: 'Enciclopedia dei Dinosauri',
    'encyclopedia-detail': 'Dettagli del Dinosauro',
    timeline: 'Cronologia Preistorica',
    compare: 'Confronta i Dinosauri',
    games: 'Giochi di Dinosauri',
    quiz: 'Quiz sui Dinosauri',
    puzzle: 'Puzzle di Dinosauri',
    excavation: 'Scavo di Fossili',
    memory: 'Memory Dinosauri',
    runner: 'Corsa del Dinosauro',
    personality: 'Che Dinosauro Sei?',
    tamagotchi: 'Dino Tamagotchi',
    battle: 'Simulatore di Battaglia Dinosauri',
    'diet-detective': 'Detective delle Diete',
    'dino-map': 'Mappa dei Dinosauri',
    'meteor-run': 'Fuga dalla Meteora!',
    'dino-duel': 'Chi è il più grande?',
    'ptero-glide': 'Volo dello pterodattilo',
    'dino-match3': 'Dino Match-3',
    science: 'Centro Scientifico',
    article: 'Articolo Scientifico',
    about: 'Informazioni',
    'not-found': 'Pagina Non Trovata',
    fallback: 'Mondo Preistorico Interattivo',
  },
  ja: {
    base: '恐竜',
    home: '先史時代の世界へようこそ',
    encyclopedia: '恐竜図鑑',
    'encyclopedia-detail': '恐竜の詳細',
    timeline: '先史時代の年表',
    compare: '恐竜を比較',
    games: '恐竜ゲーム',
    quiz: '恐竜クイズ',
    puzzle: '恐竜パズル',
    excavation: '化石発掘',
    memory: '恐竜メモリー',
    runner: '恐竜ランナー',
    personality: 'あなたはどの恐竜？',
    tamagotchi: '恐竜タマゴッチ',
    battle: '恐竜バトルシミュレーター',
    'diet-detective': '食事探偵',
    'dino-map': '恐竜マップ',
    'meteor-run': 'メテオラン',
    'dino-duel': 'どっちが大きい？',
    'ptero-glide': 'プテロダクティルスの滑空',
    'dino-match3': '恐竜マッチ3',
    science: '科学センター',
    article: '科学記事',
    about: '概要',
    'not-found': 'ページが見つかりません',
    fallback: 'インタラクティブ先史時代の世界',
  },
  zh: {
    base: '恐龙',
    home: '欢迎来到史前世界',
    encyclopedia: '恐龙百科全书',
    'encyclopedia-detail': '恐龙详情',
    timeline: '史前时间线',
    compare: '比较恐龙',
    games: '恐龙游戏',
    quiz: '恐龙测验',
    puzzle: '恐龙拼图',
    excavation: '化石挖掘',
    memory: '恐龙记忆配对',
    runner: '恐龙跑酷',
    personality: '你是哪种恐龙？',
    tamagotchi: '恐龙宠物',
    battle: '恐龙战斗模拟器',
    'diet-detective': '饮食侦探',
    'dino-map': '恐龙地图',
    'meteor-run': '陨石快跑',
    'dino-duel': '谁更大？',
    'ptero-glide': '翼龙滑翔',
    'dino-match3': '恐龙消消乐',
    science: '科学中心',
    article: '科学文章',
    about: '关于',
    'not-found': '页面未找到',
    fallback: '互动史前世界',
  },
  ko: {
    base: '공룡',
    home: '선사 시대 세계에 오신 것을 환영합니다',
    encyclopedia: '공룡 백과사전',
    'encyclopedia-detail': '공룡 상세 정보',
    timeline: '선사 시대 연대표',
    compare: '공룡 비교',
    games: '공룡 게임',
    quiz: '공룡 퀴즈',
    puzzle: '공룡 퍼즐',
    excavation: '화석 발굴',
    memory: '공룡 기억력 게임',
    runner: '공룡 러너',
    personality: '당신은 어떤 공룡인가요?',
    tamagotchi: '공룡 다마고치',
    battle: '공룡 배틀 시뮬레이터',
    'diet-detective': '식성 탐정',
    'dino-map': '공룡 지도',
    'meteor-run': '메테오 런',
    'dino-duel': '누가 더 클까?',
    'ptero-glide': '프테로닥틸 글라이드',
    'dino-match3': '공룡 매치3',
    science: '과학 센터',
    article: '과학 기사',
    about: '소개',
    'not-found': '페이지를 찾을 수 없습니다',
    fallback: '인터랙티브 선사 시대 세계',
  },
  kk: {
    base: 'Динозаврлар',
    home: 'Тарихқа дейінгі әлемге қош келдіңіз',
    encyclopedia: 'Динозаврлар энциклопедиясы',
    'encyclopedia-detail': 'Динозавр туралы мәлімет',
    timeline: 'Тарихқа дейінгі уақыт шкаласы',
    compare: 'Динозаврларды салыстыру',
    games: 'Динозавр ойындары',
    quiz: 'Динозавр викторинасы',
    puzzle: 'Динозавр пазлы',
    excavation: 'Қазба жұмыстары',
    memory: 'Динозавр жады ойыны',
    runner: 'Динозавр жүгіруші',
    personality: 'Сіз қандай динозаврсыз?',
    tamagotchi: 'Дино Тамагочи',
    battle: 'Динозавр шайқас симуляторы',
    'diet-detective': 'Диета детективі',
    'dino-map': 'Динозавр картасы',
    'meteor-run': 'Метеориттен қаш!',
    'dino-duel': 'Кім үлкен?',
    'ptero-glide': 'Птеродактиль ұшуы',
    'dino-match3': 'Динозавр-3-қатар',
    science: 'Ғылым орталығы',
    article: 'Ғылыми мақала',
    about: 'Біз туралы',
    'not-found': 'Бет табылмады',
    fallback: 'Интерактивті тарихқа дейінгі әлем',
  },
  hi: {
    base: 'डायनासोर',
    home: 'प्रागैतिहासिक दुनिया में आपका स्वागत है',
    encyclopedia: 'डायनासोर विश्वकोश',
    'encyclopedia-detail': 'डायनासोर विवरण',
    timeline: 'प्रागैतिहासिक कालक्रम',
    compare: 'डायनासोर तुलना',
    games: 'डायनासोर खेल',
    quiz: 'डायनासोर प्रश्नोत्तरी',
    puzzle: 'डायनासोर पज़ल',
    excavation: 'जीवाश्म उत्खनन',
    memory: 'स्मृति मिलान',
    runner: 'डायनासोर धावक',
    personality: 'आप कौन से डायनासोर हैं?',
    tamagotchi: 'डायनासोर तमागोची',
    battle: 'डायनासोर युद्ध सिम्युलेटर',
    'diet-detective': 'आहार जासूस',
    'dino-map': 'डायनासोर मानचित्र',
    'meteor-run': 'उल्का से भागो!',
    'dino-duel': 'कौन है बड़ा?',
    'ptero-glide': 'टेरोडैक्टाइल की उड़ान',
    'dino-match3': 'डायनासोर मैच-3',
    science: 'विज्ञान केंद्र',
    article: 'विज्ञान लेख',
    about: 'परिचय',
    'not-found': 'पृष्ठ नहीं मिला',
    fallback: 'इंटरैक्टिव प्रागैतिहासिक दुनिया',
  },
}

function getPageTitle(to: RouteLocationNormalized): string {
  const match = to.path.match(LOCALE_PREFIX_RE)
  const locale = match ? match[1] : 'en'
  const titles = PAGE_TITLES[locale] ?? PAGE_TITLES.en
  const name = to.name as string
  const pageTitle = titles[name]
  return pageTitle ? `${pageTitle} | ${titles.base}` : `${titles.base} — ${titles.fallback}`
}

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale }
export default router
