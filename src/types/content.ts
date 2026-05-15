export interface ArticleSource {
  title: string
  url: string
  author?: string
  year: number
}

export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  category: 'extinction' | 'evolution' | 'discovery' | 'biology' | 'paleontology' | 'science'
  readingTimeMinutes: number
  image: string
  relatedDinosaurIds: string[]
  sources: ArticleSource[]
  kidsVersion: string
}

export interface MythVsFact {
  id: string
  myth: string
  fact: string
  category: string
  dinosaurId?: string
}

export interface QuizQuestion {
  id: string
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  correctIndex: number
  explanation: string
  dinosaurId?: string
}
