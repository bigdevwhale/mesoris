import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Welcome to the Prehistoric World | Dinosaurs' },
  },
  {
    path: '/encyclopedia',
    name: 'encyclopedia',
    component: () => import('@/views/EncyclopediaView.vue'),
    meta: { title: 'Dinosaur Encyclopedia | Dinosaurs' },
  },
  {
    path: '/encyclopedia/:id',
    name: 'encyclopedia-detail',
    component: () => import('@/views/EncyclopediaView.vue'),
    meta: { title: 'Dinosaur Details | Dinosaurs' },
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('@/views/TimelineView.vue'),
    meta: { title: 'Prehistoric Timeline | Dinosaurs' },
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import('@/views/CompareView.vue'),
    meta: { title: 'Compare Dinosaurs | Dinosaurs' },
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('@/views/GamesHubView.vue'),
    meta: { title: 'Dinosaur Games | Dinosaurs' },
  },
  {
    path: '/games/quiz',
    name: 'quiz',
    component: () => import('@/views/QuizView.vue'),
    meta: { title: 'Dinosaur Quiz | Dinosaurs' },
  },
  {
    path: '/games/puzzle',
    name: 'puzzle',
    component: () => import('@/views/PuzzleView.vue'),
    meta: { title: 'Dinosaur Puzzle | Dinosaurs' },
  },
  {
    path: '/games/excavation',
    name: 'excavation',
    component: () => import('@/views/ExcavationView.vue'),
    meta: { title: 'Fossil Excavation | Dinosaurs' },
  },
  {
    path: '/science',
    name: 'science',
    component: () => import('@/views/ScienceView.vue'),
    meta: { title: 'Science Center | Dinosaurs' },
  },
  {
    path: '/science/:id',
    name: 'article',
    component: () => import('@/views/ArticleView.vue'),
    meta: { title: 'Science Article | Dinosaurs' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About | Dinosaurs' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found | Dinosaurs' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? 'Dinosaurs — Interactive Prehistoric World'
})

export default router
