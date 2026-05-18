import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Argentinosaurus: Dinosaur = {
    id: 'argentinosaurus',
    slug: 'argentinosaurus',
    displayName: 'Argentinosaurus',
    name: 'Argentinosaurus',
    pronunciation: 'ar-jen-TEE-no-SORE-us',
    nameMeaning: 'Argentina Lizard',
    genusName: 'Argentinosaurus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'gigantic',
    habitat: 'plains',
    livedIn: ['South America'],
    periodRangeMya: [97, 94],
    dimensions: { lengthMeters: 33.0, heightMeters: 16.0, weightKg: 70000, speedKmh: 8 },
    images: img('argentinosaurus'),
    facts: [
      { label: 'Length', value: '33 meters', icon: 'trophy', description: 'Estimates place Argentinosaurus among the longest land animals ever discovered — longer than three cars parked end to end.' },
      { label: 'Weight', value: '70 tonnes', icon: 'layers', description: 'It may have weighed as much as a dozen large elephants, making every step shake the ground.' },
      { label: 'Vertebrae', value: 'Giant bones', icon: 'maximize', description: 'Its back vertebrae were so enormous that a single one could be taller than a person.' },
      { label: 'Rarity', value: 'Known from fragments', icon: 'medal', description: 'Scientists know it was gigantic even though the fossil material is incomplete — the preserved bones are that huge.' },
    ],
    description: 'One of the strongest contenders for the title of biggest dinosaur ever, Argentinosaurus was a colossal titanosaur that turned Cretaceous Patagonia into the kingdom of giants. Even its fragmentary skeleton hints at an animal almost too large to imagine.',
    longDescription: 'Argentinosaurus lived in Patagonia during the Late Cretaceous, where broad floodplains supported giant sauropods and equally giant predators. Although the known fossils are incomplete, the preserved vertebrae, limb elements, and body proportions indicate a titanosaur of extraordinary scale. It would have needed huge quantities of vegetation each day and likely moved steadily rather than quickly, using its immense size as its primary defense. Discoveries of massive carcharodontosaurid theropods in the same formation suggest that Argentinosaurus lived in an ecosystem where prey and predator alike pushed the upper limits of body size.',
    kidsDescription: 'Argentinosaurus was a walking skyscraper! This giant plant-eater may have been the biggest dinosaur EVER, with bones so huge that scientists could tell it was enormous even from only a few pieces.',
    childFriendlyText: 'Argentinosaurus may have been the biggest dinosaur of all. It was super long, super heavy, and ate mountains of plants!',
    scientificSummary: 'Argentinosaurus huinculensis (Bonaparte & Coria, 1993) is a gigantic lithostrotian titanosaur from the Cenomanian Huincul Formation of Neuquén Province, Argentina. Preserved dorsal vertebrae, sacral elements, and limb bones indicate a body size exceeding most other known sauropods, with mass estimates commonly ranging between 60 and 80 metric tonnes. The taxon is critical to studies of sauropod gigantism, biomechanical limits in terrestrial vertebrates, and Cretaceous South American megafaunal structure.',
    discoveries: [
      { year: 1987, location: 'Neuquén, Argentina', discoveredBy: 'Guillermo Heredia', note: 'A ranch worker first noticed the gigantic bones in the Huincul Formation.' },
      { year: 1993, location: 'Patagonia, Argentina', discoveredBy: 'José Bonaparte and Rodolfo Coria', note: 'The formal description established Argentinosaurus as one of the largest known titanosaurs.' },
    ],
    funFact: 'Some Argentinosaurus vertebrae were so large that paleontologists needed heavy equipment just to move them.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Titanosauridae', genus: 'Argentinosaurus', species: 'A. huinculensis' },
    relatedDinosaurs: [
      { id: 'giganotosaurus', relationship: 'Predator threat' },
      { id: 'apatosaurus', relationship: 'Distant sauropod cousin' },
      { id: 'sauroposeidon', relationship: 'Rival giant' },
    ],
    fossilLocations: [
      { country: 'Argentina', region: 'Neuquén', coordinates: [-38.7, -69.8], specimenName: 'Huincul Formation' },
    ],
    dangerLevel: 3,
    intelligence: 2,
}
