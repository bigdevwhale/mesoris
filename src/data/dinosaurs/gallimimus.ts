import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Gallimimus: Dinosaur = {
    id: 'gallimimus', slug: 'gallimimus', displayName: 'Gallimimus', name: 'Gallimimus',
    pronunciation: 'GAL-ih-MYE-muss', nameMeaning: 'Chicken Mimic', genusName: 'Gallimimus',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'medium', habitat: 'plains',
    livedIn: ['Mongolia'], periodRangeMya: [70, 70],
    dimensions: { lengthMeters: 6.0, heightMeters: 1.9, weightKg: 450, speedKmh: 60 },
    images: img('gallimimus'),
    facts: [
      { label: 'Speed', value: '60+ km/h', icon: 'zap', description: 'One of the fastest dinosaurs — built like an ostrich, ran like a cheetah.' },
      { label: 'Beak', value: 'Toothless', icon: 'nut', description: 'A flat, toothless beak for filtering small organisms from mud and water.' },
      { label: 'Neck', value: 'Long and flexible', icon: 'move', description: 'An ostrich-like long neck for scanning the landscape for danger and food.' },
      { label: 'Diet', value: 'Opportunistic', icon: 'utensils', description: 'Ate plants, small animals, and insects — a garbage disposal with legs.' },
    ],
    description: 'The ostrich of the Cretaceous. Gallimimus was the speed demon of the dinosaur world — a toothless, long-legged runner that could outrun almost anything. It was an opportunistic omnivore, eating whatever it could catch or find.',
    longDescription: 'Gallimimus was the largest known ornithomimid — the "ostrich-mimic" dinosaurs. With long, slender legs, a toothless beak, and a lightly-built body, it was exquisitely adapted for speed, possibly reaching 60 km/h or more. Its flat beak and the presence of gastroliths (stomach stones) suggest it fed by straining small organisms, seeds, and plant matter through comb-like structures in its mouth — similar to modern ducks, but on a much larger scale. Living in the semi-arid Nemegt floodplains of Mongolia, it was an opportunistic feeder, taking advantage of whatever food was available.',
    kidsDescription: 'Gallimimus was the SUPER-SPEEDER dinosaur! It looked just like a giant ostrich with no wings. It could run as fast as a car on the highway! It ate everything — plants, bugs, little animals — never picky, always hungry. The ultimate fast-food dinosaur!',
    childFriendlyText: 'Gallimimus looked like a giant ostrich and could run super fast — faster than a race car! It ate everything and was never picky.',
    scientificSummary: 'Gallimimus bullatus (Osmolska, Roniewicz & Barsbold, 1972) is a gallimimine ornithomimid from the Maastrichtian Nemegt Formation, Mongolia. The largest ornithomimosaur at ~6m, exhibiting extreme hindlimb elongation (tibia-to-femur ratio >1.3) indicative of exceptional cursoriality. Toothless, keratinous rhamphotheca with comb-like lamellar structures suggests filter-feeding behavior convergent with modern anseriform birds. Gastroliths preserved in situ indicate herbivorous-omnivorous diet. Gregarious behavior inferred from monodominant bonebeds.',
    discoveries: [{ year: 1963, location: 'Gobi Desert, Mongolia', discoveredBy: 'Polish-Mongolian expedition', note: 'First specimens discovered in the Nemegt Basin.' }],
    funFact: 'Gallimimus was one of the stars of the original Jurassic Park movie — the flock of running Gallimimus fleeing the T. rex is one of cinema\'s most iconic dinosaur scenes.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Ornithomimidae', genus: 'Gallimimus', species: 'G. bullatus' },
    relatedDinosaurs: [{ id: 'ornithomimus', relationship: 'Close relative' }, { id: 'struthiomimus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Mongolia', region: 'Gobi Desert', coordinates: [43.5, 101.0], specimenName: 'Nemegt Formation' }],
    dangerLevel: 1, intelligence: 5,
  }
