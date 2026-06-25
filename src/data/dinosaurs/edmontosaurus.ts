import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Edmontosaurus: Dinosaur = {
    id: 'edmontosaurus', slug: 'edmontosaurus', displayName: 'Edmontosaurus', name: 'Edmontosaurus',
    pronunciation: 'ed-MON-toh-SORE-us', nameMeaning: 'Edmonton Lizard', genusName: 'Edmontosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [73, 66],
    dimensions: { lengthMeters: 13.0, heightMeters: 2.8, weightKg: 5000, speedKmh: 40 },
    images: { ...img('edmontosaurus'), video: '/videos/dinosaurs/edmontosaurus/video.mp4' },
    facts: [
      { label: 'Mummy', value: 'Skin preserved', icon: 'scroll', description: 'Several "mummy" specimens exist with skin and even stomach contents preserved.' },
      { label: 'Size', value: 'One of the largest', icon: 'maximize', description: 'Reached 13 meters — among the largest hadrosaurs and a primary T. rex prey.' },
      { label: 'Teeth', value: 'Dental powerhouse', icon: 'combine', description: 'Over 1,000 teeth arranged in a sophisticated grinding battery for eating tough plants.' },
      { label: 'Nose', value: 'Inflatable sac', icon: 'wind', description: 'May have had an inflatable nasal sac for visual and vocal display.' },
    ],
    description: 'The cattle of the Cretaceous. Edmontosaurus roamed in vast herds across the coastal plains, a primary food source for T. rex. Their "mummified" fossils — with skin and stomach contents — are among the most spectacular dinosaur discoveries ever.',
    longDescription: 'Edmontosaurus was one of the most widespread and abundant hadrosaurs of the Late Cretaceous, living across a vast range from Alaska to Colorado. It was among the last non-avian dinosaurs and a primary prey item for Tyrannosaurus rex. Several extraordinary "mummified" specimens preserve skin impressions, soft tissue outlines, and even stomach contents — showing that these dinosaurs ate conifer needles, seeds, and fruits. Its massive dental battery — with up to 1,000 teeth — made it one of the most efficient plant processors of the Mesozoic.',
    kidsDescription: 'Edmontosaurus was a GIANT duck-billed dinosaur. We know SO much about it because some fossils are "mummies" — with real skin and even its last meal still inside! It was the main food source for T-Rex. Imagine being so common you\'re everybody\'s dinner!',
    childFriendlyText: 'Edmontosaurus was a big, duck-faced plant-eater. We know what it looked like because some fossils still have skin — like dinosaur mummies!',
    scientificSummary: 'Edmontosaurus annectens (Marsh, 1892) is a saurolophine hadrosaurid from the Maastrichtian of western North America. One of the largest hadrosaurs reaching 13 m, it possessed a dental battery of approximately 1,200 teeth functioning in a continuous replacement system. Soft tissue preservation in multiple specimens ("Dakota", "Leonardo", "AMNH 5060") provides unprecedented insight into hadrosaur skin texture, limb musculature, and gastrointestinal contents including conifer remains and angiosperm fruits.',
    discoveries: [{ year: 1892, location: 'South Dakota, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First described.' }, { year: 1999, location: 'North Dakota, USA', discoveredBy: 'Tyler Lyson', note: '"Dakota" — one of the best-preserved dinosaur mummies.' }],
    funFact: 'The Edmontosaurus mummy "Dakota" is so well-preserved that CT scans revealed the exact texture of its skin — and showed that its back was covered in hexagonal scales like a turtle shell pattern.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Saurolophinae', genus: 'Edmontosaurus', species: 'E. annectens' },
    relatedDinosaurs: [{ id: 'tyrannosaurus-rex', relationship: 'Prey' }, { id: 'maiasaura', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'USA', region: 'South Dakota', coordinates: [44.5, -100.0], specimenName: 'Hell Creek Formation' }, { country: 'Canada', region: 'Alberta', coordinates: [53.5, -113.5] }],
    dangerLevel: 3, intelligence: 4,
  }
