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
  titleEs: string
  titleDe: string
  titleFr: string
  titleIt: string
  summary: string
  summaryRu: string
  summaryEs: string
  summaryDe: string
  summaryFr: string
  summaryIt: string
  content: string
  contentRu: string
  contentEs: string
  contentDe: string
  contentFr: string
  contentIt: string
  category: 'extinction' | 'evolution' | 'discovery' | 'biology' | 'paleontology' | 'science'
  categoryRu: string
  categoryEs: string
  categoryDe: string
  categoryFr: string
  categoryIt: string
  readingTimeMinutes: number
  image: string
  relatedDinosaurIds: string[]
  sources: ArticleSource[]
  kidsVersion: string
  kidsVersionRu: string
  kidsVersionEs: string
  kidsVersionDe: string
  kidsVersionFr: string
  kidsVersionIt: string
}

export interface MythVsFact {
  id: string
  myth: string
  mythRu: string
  mythEs: string
  mythDe: string
  mythFr: string
  mythIt: string
  fact: string
  factRu: string
  factEs: string
  factDe: string
  factFr: string
  factIt: string
  category: string
  dinosaurId?: string
}

export interface QuizQuestion {
  id: string
  question: string
  questionRu: string
  questionEs: string
  questionDe: string
  questionFr: string
  questionIt: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  optionsRu: string[]
  optionsEs: string[]
  optionsDe: string[]
  optionsFr: string[]
  optionsIt: string[]
  correctIndex: number
  explanation: string
  explanationRu: string
  explanationEs: string
  explanationDe: string
  explanationFr: string
  explanationIt: string
  dinosaurId?: string
}
