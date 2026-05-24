import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dryosaurus: Dinosaur = {
  id: 'dryosaurus', slug: 'dryosaurus', displayName: 'Dryosaurus', name: 'Dryosaurus',
  pronunciation: 'DRY-oh-SOR-us', nameMeaning: 'Oak Lizard', genusName: 'Dryosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'forest',
  livedIn: ['North America', 'Africa'], periodRangeMya: [157, 145],
  dimensions: { lengthMeters: 3.3, heightMeters: 1.2, weightKg: 90, speedKmh: 45 },
  images: img('dryosaurus'),
  facts: [
    { label: 'Speed', value: 'Built to sprint', icon: 'zap', description: 'Long lower legs and a balancing tail made Dryosaurus a very fast runner, ideal for escaping Jurassic predators.' },
    { label: 'Body Plan', value: 'Light and agile', icon: 'maximize', description: 'It had a narrow skull, long hindlimbs, and a slim torso — classic features of a nimble ornithopod browser.' },
    { label: 'Teeth', value: 'Leaf-cropping beak', icon: 'leaf', description: 'Its beak and cheek teeth were adapted for clipping and processing low vegetation in woodland floodplains.' },
    { label: 'Range', value: 'Two continents', icon: 'map-pin', description: 'Fossils from North America and East Africa show that close dryosaurid relatives were widespread in Late Jurassic ecosystems.' },
  ],
  description: 'Dryosaurus was a lightweight, fleet-footed plant eater that darted through Jurassic woodlands. Rather than relying on armor or horns, it survived with alert senses and speed.',
  longDescription: 'Dryosaurus altus was described from the Morrison Formation of western North America and is one of the best-known small ornithopods of the Late Jurassic. Closely related forms in Tanzania (historically referred to Dryosaurus) indicate a broad dryosaurid radiation across Laurasia and Gondwana. The animal had large orbits, a lightly built skull, and elongate hindlimbs with compact forelimbs, suggesting primarily bipedal locomotion and rapid acceleration. Dental microwear and jaw mechanics indicate feeding on soft to moderately tough vegetation, likely including ferns, horsetails, and young shoots. In predator-rich habitats shared with Allosaurus and Ceratosaurus, Dryosaurus likely depended on vigilance, group behavior, and sprinting escape strategies.',
  kidsDescription: 'Dryosaurus was like the speedy soccer player of the Jurassic! It was a small plant-eater with long legs that could run very fast to dodge hungry meat-eaters.',
  childFriendlyText: 'Dryosaurus was a fast, slim plant-eating dinosaur that escaped danger by running quickly through Jurassic forests.',
  scientificSummary: 'Dryosaurus altus (Marsh, 1878) is a dryosaurid ornithopod from the Kimmeridgian–Tithonian Morrison Formation. Cranial and postcranial anatomy indicate a small-bodied, primarily bipedal herbivore with cursorial hindlimbs. Dryosaurid material from the Tendaguru beds demonstrates close Gondwanan relatives. Dryosaurus is important for understanding early ornithopod locomotor evolution.',
  discoveries: [
    { year: 1878, location: 'Morrison Formation, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Marsh named Dryosaurus based on lightly built ornithopod remains.' },
    { year: 1910, location: 'Tendaguru, Tanzania', discoveredBy: 'German Tendaguru Expedition', note: 'Dryosaurid fossils from East Africa expanded understanding of the group\'s global distribution.' },
  ],
  funFact: 'Dryosaurus had very large eye sockets for its skull size, suggesting sharp vision that helped it spot danger quickly.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Dryosauridae', genus: 'Dryosaurus', species: 'D. altus' },
  relatedDinosaurs: [
    { id: 'camptosaurus', relationship: 'Larger ornithopod relative from similar habitats' },
    { id: 'iguanodon', relationship: 'Later and more derived ornithopod lineage' },
    { id: 'allosaurus', relationship: 'Major contemporary predator' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'Dryosaurus altus material' },
    { country: 'Tanzania', region: 'Tendaguru Formation', coordinates: [-10.2, 39.4], specimenName: 'Dryosaurid referred remains' },
  ],
  dangerLevel: 2, intelligence: 5,
}

