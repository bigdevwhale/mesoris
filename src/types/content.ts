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
  titleJa: string
  titleZh: string
  titleKo: string
  titleKk: string
  titleHi: string
  summary: string
  summaryRu: string
  summaryEs: string
  summaryDe: string
  summaryFr: string
  summaryIt: string
  summaryJa: string
  summaryZh: string
  summaryKo: string
  summaryKk: string
  summaryHi: string
  content: string
  contentRu: string
  contentEs: string
  contentDe: string
  contentFr: string
  contentIt: string
  contentJa: string
  contentZh: string
  contentKo: string
  contentKk: string
  contentHi: string
  category: 'extinction' | 'evolution' | 'discovery' | 'biology' | 'paleontology' | 'science'
  categoryRu: string
  categoryEs: string
  categoryDe: string
  categoryFr: string
  categoryIt: string
  categoryJa: string
  categoryZh: string
  categoryKo: string
  categoryKk: string
  categoryHi: string
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
  kidsVersionJa: string
  kidsVersionZh: string
  kidsVersionKo: string
  kidsVersionKk: string
  kidsVersionHi: string
}

export interface MythVsFact {
  id: string
  myth: string
  mythRu: string
  mythEs: string
  mythDe: string
  mythFr: string
  mythIt: string
  mythJa: string
  mythZh: string
  mythKo: string
  mythKk: string
  mythHi: string
  fact: string
  factRu: string
  factEs: string
  factDe: string
  factFr: string
  factIt: string
  factJa: string
  factZh: string
  factKo: string
  factKk: string
  factHi: string
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
  questionJa: string
  questionZh: string
  questionKo: string
  questionKk: string
  questionHi: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  optionsRu: string[]
  optionsEs: string[]
  optionsDe: string[]
  optionsFr: string[]
  optionsIt: string[]
  optionsJa: string[]
  optionsZh: string[]
  optionsKo: string[]
  optionsKk: string[]
  optionsHi: string[]
  correctIndex: number
  explanation: string
  explanationRu: string
  explanationEs: string
  explanationDe: string
  explanationFr: string
  explanationIt: string
  explanationJa: string
  explanationZh: string
  explanationKo: string
  explanationKk: string
  explanationHi: string
  dinosaurId?: string
}
