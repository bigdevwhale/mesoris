import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Othnielosaurus: Dinosaur = {
  id: 'othnielosaurus', slug: 'othnielosaurus', displayName: 'Othnielosaurus', name: 'Othnielosaurus',
  pronunciation: 'oth-NEE-lee-oh-SOR-us', nameMeaning: 'Othniel\'s Lizard', genusName: 'Othnielosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'small', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [156, 148],
  dimensions: { lengthMeters: 2.2, heightMeters: 0.8, weightKg: 18, speedKmh: 40 },
  images: img('othnielosaurus'),
  facts: [
    { label: 'Agile Herbivore', value: 'Quick biped', icon: 'zap', description: 'Othnielosaurus had long hindlimbs and a light frame, helping it run quickly away from predators.' },
    { label: 'Size', value: 'Dog-sized', icon: 'maximize', description: 'It was a small ornithischian, roughly the size of a medium dog but with a long balancing tail.' },
    { label: 'Diet', value: 'Low vegetation', icon: 'leaf', description: 'Its beak and cheek teeth were suited for nibbling ferns and other soft Jurassic ground plants.' },
    { label: 'History', value: 'Taxonomic reshuffle', icon: 'rotate-cw', description: 'Material once assigned to Nanosaurus/Othnielia was later revised, with Othnielosaurus used for distinct remains.' },
  ],
  description: 'Othnielosaurus was a small, nimble Jurassic plant eater from the Morrison ecosystem. It survived through speed, alertness, and group behavior rather than armor or size.',
  longDescription: 'Othnielosaurus consors is a small neornithischian dinosaur described from Morrison Formation material in the western United States. Its taxonomic history is complex, with specimens historically shuffled among Nanosaurus, Othnielia, and related names. Current usage emphasizes a lightly built, bipedal herbivore with elongate hindlimbs, a narrow skull, and dental morphology suited to low browsing. In ecosystems dominated by giant sauropods and major theropods, Othnielosaurus likely occupied edge habitats and understory vegetation zones, feeding selectively on soft plant material. Although less famous than giant contemporaries, it helps reconstruct the small-bodied herbivore diversity that supported Jurassic food webs.',
  kidsDescription: 'Othnielosaurus was a tiny plant-eating dinosaur that relied on speed, not armor. Think of it as a quick-footed Jurassic salad-snacker!',
  childFriendlyText: 'Othnielosaurus was a small fast herbivore from Jurassic North America. It ran on two legs and ate low plants.',
  scientificSummary: 'Othnielosaurus consors (Galton, 2007; based on Morrison material) represents a small-bodied neornithischian from the Late Jurassic of western North America. Morphology indicates a gracile bipedal herbivore with cursorial hindlimbs and generalized ornithischian dentition. The taxon remains relevant to resolving small ornithischian diversity in the Morrison Formation.',
  discoveries: [
    { year: 1877, location: 'Como Bluff, Wyoming, USA', discoveredBy: 'Marsh collecting crews', note: 'Small ornithischian material recovered during major Morrison excavations.' },
    { year: 2007, location: 'Taxonomic revision', discoveredBy: 'Peter Galton', note: 'Reassessment separated Othnielosaurus from other historical small ornithischian assignments.' },
  ],
  funFact: 'Small dinosaurs like Othnielosaurus were once overshadowed by giants, but modern studies show they were crucial parts of Jurassic ecosystems.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Neornithischia', family: 'Othnielosauridae', genus: 'Othnielosaurus', species: 'O. consors' },
  relatedDinosaurs: [
    { id: 'dryosaurus', relationship: 'Larger ornithopod-grade herbivore from similar habitats' },
    { id: 'hypsilophodon', relationship: 'Comparable small agile herbivorous ornithischian' },
    { id: 'camptosaurus', relationship: 'Contemporary larger browsing ornithopod' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'Referred Othnielosaurus material' },
  ],
  dangerLevel: 2, intelligence: 5,
}

