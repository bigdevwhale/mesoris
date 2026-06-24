export type Era = 'triassic' | 'jurassic' | 'cretaceous'
export type Diet = 'carnivore' | 'herbivore' | 'omnivore'
export type SizeCategory = 'small' | 'medium' | 'large' | 'gigantic'
export type Habitat = 'forest' | 'plains' | 'swamp' | 'coastal' | 'desert' | 'ocean'
export type DinosaurCategory = 'carnivore' | 'herbivore' | 'omnivore' | 'flying-reptile' | 'marine-reptile'

export interface DinosaurDimensions {
  lengthMeters: number
  heightMeters: number
  weightKg: number
  speedKmh: number
}

export interface DinosaurImages {
  hero: string
  card: string
  gallery: string[]
  skeleton?: string
  /** Optional autoplay-muted loop video shown in the detail modal */
  video?: string
  /** Lightweight animated GIF used as a preview in grid cards. */
  previewGif?: string
}

export interface Discovery {
  year: number
  location: string
  discoveredBy: string
  note: string
}

export interface DinoFact {
  label: string
  value: string
  icon: string
  description: string
}

export interface Taxonomy {
  kingdom: string
  phylum: string
  clade: string
  order: string
  suborder: string
  family: string
  subfamily?: string
  genus: string
  species: string
}

export interface RelatedDinosaur {
  id: string
  relationship: string
}

export interface FossilLocation {
  country: string
  region: string
  coordinates: [number, number]
  specimenName?: string
}

export interface Dinosaur {
  id: string
  slug: string
  displayName: string
  name: string
  pronunciation: string
  nameMeaning: string
  genusName: string
  era: Era
  diet: Diet
  category: DinosaurCategory
  size: SizeCategory
  habitat: Habitat
  livedIn: string[]
  periodRangeMya: [number, number]
  dimensions: DinosaurDimensions
  images: DinosaurImages
  facts: DinoFact[]
  description: string
  longDescription: string
  kidsDescription: string
  childFriendlyText: string
  scientificSummary: string
  discoveries: Discovery[]
  funFact: string
  taxonomy: Taxonomy
  relatedDinosaurs: RelatedDinosaur[]
  fossilLocations: FossilLocation[]
  dangerLevel: number
  intelligence: number
  birdRelation?: string
}

export interface EraInfo {
  id: Era
  name: string
  nameRu: string
  nameEs: string
  nameDe: string
  nameFr: string
  nameIt: string
  nameJa: string
  nameZh: string
  nameKo: string
  nameKk: string
  nameHi: string
  rangeMya: [number, number]
  durationMillionYears: number
  description: string
  descriptionRu: string
  descriptionEs: string
  descriptionDe: string
  descriptionFr: string
  descriptionIt: string
  descriptionJa: string
  descriptionZh: string
  descriptionKo: string
  descriptionKk: string
  descriptionHi: string
  keyEvents: string[]
  keyEventsRu: string[]
  keyEventsEs: string[]
  keyEventsDe: string[]
  keyEventsFr: string[]
  keyEventsIt: string[]
  keyEventsJa: string[]
  keyEventsZh: string[]
  keyEventsKo: string[]
  keyEventsKk: string[]
  keyEventsHi: string[]
  climateDescription: string
  climateDescriptionRu: string
  climateDescriptionEs: string
  climateDescriptionDe: string
  climateDescriptionFr: string
  climateDescriptionIt: string
  climateDescriptionJa: string
  climateDescriptionZh: string
  climateDescriptionKo: string
  climateDescriptionKk: string
  climateDescriptionHi: string
  colorClass: string
  icon: string
  dinosaurs: string[]
}
