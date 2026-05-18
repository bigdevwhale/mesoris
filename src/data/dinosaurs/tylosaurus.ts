import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tylosaurus: Dinosaur = {
    id: 'tylosaurus', slug: 'tylosaurus', displayName: 'Tylosaurus', name: 'Tylosaurus',
    pronunciation: 'TYE-lo-SORE-us', nameMeaning: 'Knob Lizard', genusName: 'Tylosaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'marine-reptile', size: 'gigantic', habitat: 'ocean',
    livedIn: ['North America'], periodRangeMya: [86, 75],
    dimensions: { lengthMeters: 14.0, heightMeters: 2.0, weightKg: 10000, speedKmh: 45 },
    images: img('tylosaurus'),
    facts: [
      { label: 'Snout', value: 'Bony ram', icon: 'triangle', description: 'A hard, bony projection on the tip of its snout — may have been used to ram prey.' },
      { label: 'Diet', value: 'Hypercarnivore', icon: 'fish', description: 'Ate everything — sharks, fish, diving birds, other mosasaurs, and plesiosaurs.' },
      { label: 'Dominance', value: 'Apex predator', icon: 'trophy', description: 'The undisputed apex predator of the Western Interior Seaway — nothing hunted it.' },
    ],
    description: 'The apex predator of the Cretaceous oceans. Tylosaurus was the mosasaur that ruled North America\'s ancient inland sea — eating everything from sharks to other mosasaurs. A 14-meter nightmare with a bony battering ram snout.',
    longDescription: 'Tylosaurus was the dominant mosasaur of the Western Interior Seaway — the vast epicontinental sea that split North America in two during the Late Cretaceous. Reaching up to 14 meters, it was one of the largest mosasaurs and the undisputed apex predator of its ecosystem. Stomach contents from well-preserved specimens reveal an extraordinary dietary range: fish, sharks, seabirds (like Hesperornis), plesiosaurs, and smaller mosasaurs — including juveniles of its own species. Its most distinctive feature was a bony, cartilaginous projection on the tip of its snout — a "ramming beak" that may have been used to stun or injure large prey before biting.',
    kidsDescription: 'Tylosaurus was the MEANEST sea monster in the ocean! It was 14 meters of pure predator. It ate EVERYTHING — sharks, diving birds, other sea monsters, even smaller Tylosauruses! It had a bony battering ram on the end of its nose, like a built-in weapon for head-butting its dinner!',
    childFriendlyText: 'Tylosaurus was the king of the ocean! It ate everything and had a hard bony nose — like a battering ram for smashing its prey!',
    scientificSummary: 'Tylosaurus proriger (Cope, 1869) is a tylosaurine mosasaurid from the Santonian-Campanian Niobrara Chalk, Kansas. The largest mosasaur of the Western Interior Seaway, reaching 14m total length. The premaxilla bears a distinctive, elongated edentulous rostrum — a cartilaginous-bony process not found in any other mosasaur, proposed to function as a stunning ram in prey capture. Stomach contents from multiple specimens document a hypercarnivorous, trophically apex diet: actinopterygian fish, lamniform sharks, hesperornithiform birds, polycotylid plesiosaurs, and smaller conspecific mosasaurs.',
    discoveries: [{ year: 1868, location: 'Kansas, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First described during the Bone Wars from the Kansas chalk beds.' }],
    funFact: 'Tylosaurus stomach contents have been found preserved in extraordinary detail — one specimen had a 2-meter-long fish, a seabird, AND a smaller mosasaur in its belly, the ultimate prehistoric turducken.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Mosasauria', order: 'Squamata', suborder: '', family: 'Mosasauridae', subfamily: 'Tylosaurinae', genus: 'Tylosaurus', species: 'T. proriger' },
    relatedDinosaurs: [{ id: 'mosasaurus', relationship: 'Close relative' }, { id: 'plesiosaurus', relationship: 'Prey' }],
    fossilLocations: [{ country: 'USA', region: 'Kansas', coordinates: [38.8, -98.5], specimenName: 'Niobrara Chalk, Smoky Hill' }],
    dangerLevel: 10, intelligence: 6,
  }
