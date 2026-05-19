import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

const SUPPORTED_LOCALES = ['en', 'ru', 'es', 'de', 'fr', 'it'] as const
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
const LOCALE_PREFIX_RE = /^\/(en|ru|es|de|fr|it)(\/|$)/

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
    science: 'Centro Scientifico',
    article: 'Articolo Scientifico',
    about: 'Informazioni',
    'not-found': 'Pagina Non Trovata',
    fallback: 'Mondo Preistorico Interattivo',
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
