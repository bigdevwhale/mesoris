import type { GameDefinition } from '@/types/game'

export const games: GameDefinition[] = [
  {
    id: 'quiz',
    type: 'quiz',
    title: 'Dino Quiz',
    description: 'Test your dinosaur knowledge! Answer questions about prehistoric creatures and earn points.',
    route: '/games/quiz',
    difficulty: 'easy',
    icon: 'brain',
    colorClass: 'from-amber-500 to-orange-600',
  },
  {
    id: 'puzzle',
    type: 'puzzle',
    title: 'Dino Puzzle',
    description: 'Piece together beautiful dinosaur illustrations. Train your spatial thinking and memory.',
    route: '/games/puzzle',
    difficulty: 'medium',
    icon: 'puzzle',
    colorClass: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'excavation',
    type: 'excavation',
    title: 'Fossil Excavation',
    description: 'Become a paleontologist! Brush away sand to reveal a hidden fossil buried for millions of years.',
    route: '/games/excavation',
    difficulty: 'easy',
    icon: 'brush',
    colorClass: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'skeleton',
    type: 'skeleton',
    title: 'Build a Skeleton',
    description: 'Assemble a dinosaur skeleton bone by bone. Learn anatomy while putting the pieces together.',
    route: '/games/skeleton',
    difficulty: 'hard',
    icon: 'bone',
    colorClass: 'from-stone-400 to-stone-600',
  },
]
