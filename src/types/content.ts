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
  titleRu: string
  summary: string
  summaryRu: string
  content: string
  contentRu: string
  category: 'extinction' | 'evolution' | 'discovery' | 'biology' | 'paleontology' | 'science'
  readingTimeMinutes: number
  image: string
  relatedDinosaurIds: string[]
  sources: ArticleSource[]
  kidsVersion: string
  kidsVersionRu: string
}

export interface MythVsFact {
  id: string
  myth: string
  mythRu: string
  fact: string
  factRu: string
  category: string
  dinosaurId?: string
}

export interface QuizQuestion {
  id: string
  question: string
  questionRu: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  optionsRu: string[]
  correctIndex: number
  explanation: string
  explanationRu: string
  dinosaurId?: string
}
