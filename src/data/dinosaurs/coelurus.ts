import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Coelurus: Dinosaur = {
  id: 'coelurus', slug: 'coelurus', displayName: 'Coelurus', name: 'Coelurus',
  pronunciation: 'see-LURE-us', nameMeaning: 'Hollow Tail', genusName: 'Coelurus',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [157, 145],
  dimensions: { lengthMeters: 2.4, heightMeters: 0.9, weightKg: 20, speedKmh: 42 },
  images: img('coelurus'),
  facts: [
    { label: 'Lightweight', value: 'Hollow bones', icon: 'feather', description: 'Its name refers to hollow vertebrae, an adaptation that reduced weight and improved agility.' },
    { label: 'Speed', value: 'Fast runner', icon: 'zap', description: 'Long legs and a slim body suggest Coelurus could sprint quickly to catch small prey or avoid bigger hunters.' },
    { label: 'Diet', value: 'Small prey specialist', icon: 'fish', description: 'It likely fed on lizards, mammals, and juvenile dinosaurs using quick bites and grasping hands.' },
    { label: 'Ecosystem', value: 'Morrison co-hunter', icon: 'map-pin', description: 'Coelurus lived alongside giants like Allosaurus and Stegosaurus but occupied a much smaller predator niche.' },
  ],
  description: 'Coelurus was a small, speedy Jurassic theropod from North America. Its hollow bones and agile build made it a nimble predator in the shadow of much larger dinosaurs.',
  longDescription: 'Coelurus fragilis is based on Late Jurassic remains from the Morrison Formation and was among the early named small theropods from this famous ecosystem. The genus is historically important in theropod taxonomy, though fragmentary material and shifting classification have complicated its exact phylogenetic position. Morphology indicates a gracile-bodied, cursorial predator with elongated hindlimbs, lightly built vertebrae, and narrow jaws suited to small prey capture. Rather than competing directly with apex predators, Coelurus likely occupied a mesopredator role, hunting small vertebrates and scavenging opportunistically. Its pneumatic skeletal features contribute to broader discussions of weight-saving adaptations in coelurosaur-line theropods.',
  kidsDescription: 'Coelurus was a little speedster dinosaur with hollow bones, almost like a running bird-dino. It zipped around Jurassic plains catching tiny prey.',
  childFriendlyText: 'Coelurus was a small fast hunter with lightweight bones. It lived with giant dinosaurs but hunted much smaller animals.',
  scientificSummary: 'Coelurus fragilis (Marsh, 1879) is a small theropod from the Kimmeridgian–Tithonian Morrison Formation of Wyoming. Fragmentary but diagnostic material indicates a gracile coelurosaur-grade anatomy with pneumatic vertebrae and cursorial hindlimb proportions. It remains relevant to early coelurosaur systematics and Morrison trophic structure.',
  discoveries: [
    { year: 1879, location: 'Como Bluff, Wyoming, USA', discoveredBy: 'O.C. Marsh expedition crews', note: 'Type material described as Coelurus fragilis from Morrison strata.' },
    { year: 1980, location: 'Morrison reassessments', discoveredBy: 'Multiple theropod specialists', note: 'Reanalysis clarified the taxon\'s likely small coelurosaur affinities.' },
  ],
  funFact: 'Despite being far smaller than Allosaurus, Coelurus may have been one of the quickest hunters in the entire Morrison ecosystem.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Coeluridae', genus: 'Coelurus', species: 'C. fragilis' },
  relatedDinosaurs: [
    { id: 'compsognathus', relationship: 'Comparable small-bodied theropod niche' },
    { id: 'ornithomimus', relationship: 'Later fast-running coelurosaur with convergent cursorial traits' },
    { id: 'allosaurus', relationship: 'Large predator sharing the same formation' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'Coelurus fragilis type material' },
  ],
  dangerLevel: 4, intelligence: 5,
}

