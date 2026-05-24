import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Monolophosaurus: Dinosaur = {
  id: 'monolophosaurus', slug: 'monolophosaurus', displayName: 'Monolophosaurus', name: 'Monolophosaurus',
  pronunciation: 'MON-oh-LOAF-oh-SOR-us', nameMeaning: 'Single-Crested Lizard', genusName: 'Monolophosaurus',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [166, 161],
  dimensions: { lengthMeters: 5.5, heightMeters: 2.0, weightKg: 500, speedKmh: 35 },
  images: img('monolophosaurus'),
  facts: [
    { label: 'Crest', value: 'Single head crest', icon: 'star', description: 'Monolophosaurus had one prominent bony crest running along the top of its skull, likely for display.' },
    { label: 'Rarity', value: 'Complete skull', icon: 'award', description: 'Its well-preserved skull gave paleontologists unusually detailed information for a mid-Jurassic theropod.' },
    { label: 'Habitat', value: 'Wet environments', icon: 'droplets', description: 'It lived in humid, river-rich ecosystems of Jurassic northwestern China.' },
    { label: 'Role', value: 'Mid-sized predator', icon: 'zap', description: 'Monolophosaurus likely hunted small to medium animals and scavenged when opportunities appeared.' },
  ],
  description: 'Monolophosaurus was a crested Jurassic predator from China. It combined a lightly built hunting body with a striking skull ornament, making it one of Asia\'s most recognizable medium-large theropods.',
  longDescription: 'Monolophosaurus jiangi is known from the Middle Jurassic Shishugou Formation of Xinjiang, China. The genus is notable for a relatively complete skeleton and especially a well-preserved skull bearing a median nasolacrimal crest extending along the snout and frontal region. Phylogenetically, Monolophosaurus has been placed near the base of Tetanurae or among megalosauroid-adjacent lineages depending on dataset and character weighting, reflecting its mosaic anatomy. Sedimentological context indicates deposition in fluvial to lacustrine settings under seasonally wet conditions. As a medium-to-large carnivore in its ecosystem, Monolophosaurus likely targeted smaller vertebrates and juvenile herbivores, contributing to a diverse Jurassic predator guild in East Asia.',
  kidsDescription: 'Monolophosaurus had a cool head crest like a dinosaur mohawk! It was a fast Jurassic hunter from China that looked dramatic even before it started chasing prey.',
  childFriendlyText: 'Monolophosaurus was a meat-eating dinosaur with one big crest on its head. It hunted in Jurassic river and forest environments.',
  scientificSummary: 'Monolophosaurus jiangi (Zhao & Currie, 1993) is a Middle Jurassic theropod from the Shishugou Formation, Xinjiang. It is characterized by a distinctive median cranial crest, elongate maxilla, and tetanuran-grade postcranial traits. The taxon is important for resolving early tetanuran diversification in Asia.',
  discoveries: [
    { year: 1984, location: 'Junggar Basin, Xinjiang, China', discoveredBy: 'Xinjiang field crews', note: 'Initial remains recovered from Shishugou deposits.' },
    { year: 1993, location: 'Scientific description', discoveredBy: 'Zhao Xijin and Philip Currie', note: 'Formal naming highlighted the unique single crest and detailed skull anatomy.' },
  ],
  funFact: 'Its original field nickname was tied to old film references, but the official name celebrates the dramatic one-crest skull.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Monolophosauridae', genus: 'Monolophosaurus', species: 'M. jiangi' },
  relatedDinosaurs: [
    { id: 'megalosaurus', relationship: 'Comparable early tetanuran-grade carnivore' },
    { id: 'allosaurus', relationship: 'Later larger tetanuran predator' },
    { id: 'yangchuanosaurus', relationship: 'Another Chinese Jurassic theropod predator' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Shishugou Formation, Xinjiang', coordinates: [44.2, 88.3], specimenName: 'Holotype and associated skeleton material' },
  ],
  dangerLevel: 7, intelligence: 5,
}

