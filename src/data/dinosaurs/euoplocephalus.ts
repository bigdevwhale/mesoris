import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Euoplocephalus: Dinosaur = {
    id: 'euoplocephalus', slug: 'euoplocephalus', displayName: 'Euoplocephalus', name: 'Euoplocephalus',
    pronunciation: 'YOU-oh-plo-SEF-ah-lus', nameMeaning: 'Well-armored Head', genusName: 'Euoplocephalus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [76, 70],
    dimensions: { lengthMeters: 6.0, heightMeters: 1.5, weightKg: 2500, speedKmh: 10 },
    images: img('euoplocephalus'),
    facts: [
      { label: 'Armor', value: 'Complete coverage', icon: 'shield-check', description: 'Even its EYELIDS were armored — the most completely protected dinosaur ever.' },
      { label: 'Tail Club', value: 'Kinetic weapon', icon: 'hammer', description: 'A powerful bony tail club that could be swung with devastating force.' },
      { label: 'Nose', value: 'Complex airways', icon: 'nose', description: 'A labyrinth of nasal passages — possibly for cooling the brain or making sounds.' },
    ],
    description: 'The most thoroughly armored dinosaur ever discovered. Euoplocephalus was so completely covered in bony plates that even its eyelids were reinforced — the ultimate defensive dinosaur.',
    longDescription: 'Euoplocephalus was one of the most heavily armored ankylosaurids of the Late Cretaceous. Its name, meaning "well-armored head," refers to the extraordinary degree of osteoderm coverage — bony plates covered almost every surface, including hinged upper and lower eyelid armor plates that could close like a shutter to protect the eyes. The nasal cavity formed a labyrinthine maze of passages whose function remains debated: thermoregulation for the brain, enhanced olfaction, or a resonance chamber for species-specific vocalizations.',
    kidsDescription: 'Euoplocephalus was the most protected dinosaur EVER. It was covered in armor EVERYWHERE — even its eyelids had little bony shields! When it closed its eyes, it was like closing armored shutters. Add the wrecking-ball tail club and you\'ve got the safest dinosaur that ever lived!',
    childFriendlyText: 'Euoplocephalus was covered in bony armor from head to tail — even its eyelids! It also had a big club on its tail for protection.',
    scientificSummary: 'Euoplocephalus tutus (Lambe, 1902) is an ankylosaurine ankylosaurid from the Campanian of Alberta. Its osteoderm arrangement includes fused cervical half-rings, a mosaic of dorsal osteoderms, and the most complete cranial armor coverage known — including hinged, bony palpebral elements (armored eyelids). The complex, extensively looped nasal cavity represents one of the most derived respiratory-nasal morphologies among dinosaurs. Tail club morphology demonstrates high kinetic energy delivery optimized for predator-deterring strikes.',
    discoveries: [{ year: 1897, location: 'Alberta, Canada', discoveredBy: 'Lawrence Lambe', note: 'First specimen described from the Belly River Group.' }],
    funFact: 'Euoplocephalus had a unique hinged lower eyelid made of bone — when closed, it completely protected the eye from attack, like a medieval knight\'s visor.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ankylosauria', family: 'Ankylosauridae', subfamily: 'Ankylosaurinae', genus: 'Euoplocephalus', species: 'E. tutus' },
    relatedDinosaurs: [{ id: 'ankylosaurus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5], specimenName: 'Dinosaur Park Formation' }],
    dangerLevel: 6, intelligence: 3,
  }
