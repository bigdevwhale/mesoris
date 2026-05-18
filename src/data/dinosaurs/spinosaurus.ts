import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Spinosaurus: Dinosaur = {
    id: 'spinosaurus',
    slug: 'spinosaurus',
    displayName: 'Spinosaurus',
    name: 'Spinosaurus',
    pronunciation: 'SPINE-oh-SORE-us',
    nameMeaning: 'Spine Lizard',
    genusName: 'Spinosaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'gigantic',
    habitat: 'swamp',
    livedIn: ['North Africa'],
    periodRangeMya: [99, 93],
    dimensions: { lengthMeters: 15.0, heightMeters: 5.5, weightKg: 7500, speedKmh: 25 },
    images: img('spinosaurus'),
    facts: [
      { label: 'Sail', value: '2 meters tall', icon: 'sailboat', description: 'A massive sail of skin stretched over 2-meter-long neural spines on its back.' },
      { label: 'Lifestyle', value: 'Semi-aquatic', icon: 'waves', description: 'The only known aquatic dinosaur — it swam and hunted giant fish in rivers.' },
      { label: 'Size', value: 'Larger than T-Rex', icon: 'maximize', description: 'At 15 meters long, it was the largest carnivorous dinosaur ever discovered.' },
      { label: 'Tail', value: 'Paddle-like', icon: 'fish-tail', description: 'Had a unique fin-like tail for powerful underwater propulsion.' },
    ],
    description: 'The largest predator ever to walk the Earth — and the only dinosaur that swam! Spinosaurus was a giant, sail-backed, fish-eating river monster that makes T. rex look average.',
    longDescription: 'Spinosaurus was a spinosaurid dinosaur that lived in North Africa during the Late Cretaceous. It is the largest known carnivorous dinosaur, exceeding Tyrannosaurus rex in length. Spinosaurus is unique among dinosaurs for its semi-aquatic lifestyle — it lived much like a modern crocodile, hunting giant fish and other aquatic prey in the ancient river systems of what is now the Sahara Desert.',
    kidsDescription: 'This dinosaur was a swimming SUPER-PREDATOR! Bigger than T-Rex, with a giant sail on its back like a pirate ship. Spinosaurus didn\'t just walk on land — it swam in rivers and caught fish the size of cars!',
    childFriendlyText: 'Spinosaurus had a giant sail on its back and loved to swim! It caught big fish in the water and was even bigger than T-Rex.',
    scientificSummary: 'Spinosaurus aegyptiacus (Stromer, 1915) is a spinosaurid theropod from the Cenomanian of North Africa. The largest known theropod dinosaur, displaying unique semi-aquatic adaptations: retracted nares, dense pachyostotic long bones, a laterally-compressed caudal fin for aquatic propulsion, and reduced hindlimb proportions. Isotopic analysis confirms a predominantly piscivorous diet, inhabiting vast Cretaceous river systems analogous to modern crocodilians.',
    discoveries: [
      { year: 1912, location: 'Egypt', discoveredBy: 'Ernst Stromer', note: 'First fossils found; later destroyed in WWII bombing of Munich.' },
      { year: 2014, location: 'Morocco', discoveredBy: 'Nizar Ibrahim', note: 'Major new discoveries confirmed the aquatic lifestyle theory.' },
    ],
    funFact: 'The original Spinosaurus fossils were destroyed by Allied bombing in World War II. For decades, scientists only had drawings and notes to study it.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Spinosauridae', subfamily: 'Spinosaurinae', genus: 'Spinosaurus', species: 'S. aegyptiacus' },
    relatedDinosaurs: [
      { id: 'baryonyx', relationship: 'Close relative' },
      { id: 'mosasaurus', relationship: 'Competitor (aquatic)' },
    ],
    fossilLocations: [
      { country: 'Morocco', region: 'Kem Kem Beds', coordinates: [30.5, -6.5] },
      { country: 'Egypt', region: 'Bahariya Formation', coordinates: [28.0, 29.0] },
    ],
    dangerLevel: 10,
    intelligence: 5,
  }
