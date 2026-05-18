import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nigersaurus: Dinosaur = {
    id: 'nigersaurus',
    slug: 'nigersaurus',
    displayName: 'Nigersaurus',
    name: 'Nigersaurus',
    pronunciation: 'NYE-jer-SORE-us',
    nameMeaning: 'Niger Lizard',
    genusName: 'Nigersaurus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'large',
    habitat: 'plains',
    livedIn: ['Africa'],
    periodRangeMya: [115, 105],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.5, weightKg: 4000, speedKmh: 12 },
    images: img('nigersaurus'),
    facts: [
      { label: 'Teeth', value: '500 replacement teeth', icon: 'award', description: 'Its jaws carried huge batteries of constantly replacing teeth arranged like a giant rake.' },
      { label: 'Mouth', value: 'Vacuum-cleaner snout', icon: 'maximize', description: 'The wide straight muzzle was perfect for cropping low plants close to the ground.' },
      { label: 'Feeding', value: 'Head-down grazer', icon: 'leaf', description: 'Computer models suggest it habitually held its head low, browsing soft vegetation near the soil.' },
      { label: 'Light skeleton', value: 'Air-filled bones', icon: 'layers', description: 'Even its delicate skull was full of openings and lightweight structures that reduced mass.' },
    ],
    description: 'Nigersaurus was one of the weirdest sauropods ever found: a long-necked plant-eater with a wide vacuum-cleaner mouth and one of the strangest dental systems in dinosaur history.',
    longDescription: 'From the Elrhaz Formation of Niger, Nigersaurus shows that sauropods were not all gigantic tree-browsers. This rebbachisaurid had a lightweight skull, an unusually broad square snout, and tooth batteries concentrated at the very front of the jaws, suggesting rapid cropping of low-growing plants. Its teeth wore down quickly and were replaced constantly, an ideal arrangement for processing abrasive vegetation near the ground. CT scanning of its skull has made Nigersaurus a famous example of how modern imaging can transform understanding of dinosaurs that once looked impossible to reconstruct.',
    kidsDescription: 'Nigersaurus had a mouth like a dinosaur lawnmower! It kept its head down, swept up plants close to the ground, and grew new teeth all the time.',
    childFriendlyText: 'Nigersaurus was a plant-eating dinosaur with a super-wide mouth and hundreds of teeth. It ate low plants like a prehistoric vacuum cleaner.',
    scientificSummary: 'Nigersaurus taqueti (Sereno et al., 1999) is a rebbachisaurid sauropod from the Aptian-Albian Elrhaz Formation of Niger. The genus is remarkable for a transversely expanded muzzle, tooth batteries localized rostrally, rapid dental replacement, extensive cranial pneumaticity, and habitual low-angle browsing. It is a classic example of extreme feeding specialization within Sauropodomorpha and a key taxon for understanding rebbachisaurid evolution in Gondwana.',
    discoveries: [
      { year: 1976, location: 'Niger', discoveredBy: 'Philippe Taquet', note: 'French expeditions first recovered material from the Sahara that later proved to belong to Nigersaurus.' },
      { year: 1997, location: 'Gadoufaoua, Niger', discoveredBy: 'Paul Sereno and team', note: 'New expeditions produced the skull material that revealed the dinosaur\'s bizarre feeding anatomy.' },
    ],
    funFact: 'Nigersaurus replaced its teeth incredibly fast — roughly every two weeks for some tooth positions.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Rebbachisauridae', genus: 'Nigersaurus', species: 'N. taqueti' },
    relatedDinosaurs: [
      { id: 'diplodocus', relationship: 'Distant diplodocoid cousin' },
      { id: 'suchomimus', relationship: 'Contemporary neighbor' },
      { id: 'sauroposeidon', relationship: 'Different sauropod feeding strategy' },
    ],
    fossilLocations: [
      { country: 'Niger', region: 'Gadoufaoua', coordinates: [17.4, 9.3], specimenName: 'Elrhaz Formation' },
    ],
    dangerLevel: 1,
    intelligence: 2,
}
