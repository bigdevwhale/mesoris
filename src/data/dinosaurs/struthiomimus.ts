import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Struthiomimus: Dinosaur = {
    id: 'struthiomimus', slug: 'struthiomimus', displayName: 'Struthiomimus', name: 'Struthiomimus',
    pronunciation: 'STROO-thee-oh-MYE-muss', nameMeaning: 'Ostrich Mimic', genusName: 'Struthiomimus',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'medium', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [76, 74],
    dimensions: { lengthMeters: 4.3, heightMeters: 1.4, weightKg: 150, speedKmh: 60 },
    images: img('struthiomimus'),
    facts: [
      { label: 'Build', value: 'Pure ostrich', icon: 'bird', description: 'The most ostrich-like of all dinosaurs — even its scientific name means "ostrich mimic."' },
      { label: 'Hands', value: 'Three-fingered grabbers', icon: 'hand', description: 'Long, slender hands for hooking branches and grabbing small prey.' },
      { label: 'Diet', value: 'True omnivore', icon: 'utensils', description: 'Ate everything — plants, eggs, insects, and small vertebrates.' },
    ],
    description: 'The ultimate ostrich mimic. Struthiomimus was so ostrich-like that its name literally means "ostrich mimic." Long legs, toothless beak, flexible neck, and opportunistic appetite — the blueprint for modern flightless birds.',
    longDescription: 'Struthiomimus was the ornithomimid that most precisely converged on the modern ostrich body plan. Its name, directly from the ostrich genus Struthio, reflects this remarkable evolutionary convergence — same long legs, same flexible neck, same toothless beak, same lifestyle. Its hands were proportionally longer and more dexterous than related ornithomimids, with slender hooked fingers that could grasp branches and snatch small animals. Its varied, non-specialized diet — from plants and fruits to eggs and small vertebrates — made it one of the most adaptable dinosaurs in the Campanian ecosystem.',
    kidsDescription: 'Struthiomimus is SO much like an ostrich that scientists literally named it "Ostrich Mimic." If you saw one today, you\'d just think it was a funny-looking ostrich with a tail! It could run super fast and used its long fingers to pick berries and catch lizards.',
    childFriendlyText: 'Struthiomimus looked exactly like a modern ostrich! It ran fast everywhere and ate everything — the ultimate speedy dinosaur.',
    scientificSummary: 'Struthiomimus altus (Lambe, 1902) is a struthiomimine ornithomimid from the Campanian Dinosaur Park Formation, Alberta. The most anatomically ratite-like of all dinosaurs, named directly for the ostrich genus Struthio. Characterized by a proportionally elongate manus with hooked unguals, a slender, highly kinetic skull with a keratinous tomium, and extreme hindlimb proportions exceeding all other ornithomimids in metacarpal and metatarsal elongation. Omnivorous feeding ecology inferred from beak and ungual morphology.',
    discoveries: [{ year: 1901, location: 'Alberta, Canada', discoveredBy: 'Lawrence Lambe', note: 'First specimen found in the Belly River Group.' }],
    funFact: 'Struthiomimus was one of the first dinosaurs to be mounted in a realistic, two-legged running pose — the 1916 AMNH mount revolutionized how museums displayed dinosaurs.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Ornithomimidae', genus: 'Struthiomimus', species: 'S. altus' },
    relatedDinosaurs: [{ id: 'gallimimus', relationship: 'Close relative' }, { id: 'ornithomimus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5], specimenName: 'Dinosaur Park Formation' }],
    dangerLevel: 1, intelligence: 5,
  }
