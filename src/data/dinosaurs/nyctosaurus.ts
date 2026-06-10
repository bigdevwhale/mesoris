import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nyctosaurus: Dinosaur = {
  id: 'nyctosaurus', slug: 'nyctosaurus', displayName: 'Nyctosaurus', name: 'Nyctosaurus',
  pronunciation: 'nik-toh-SOR-us', nameMeaning: 'Night Lizard', genusName: 'Nyctosaurus',
  era: 'cretaceous', diet: 'carnivore', category: 'flying-reptile', size: 'medium', habitat: 'coastal',
  livedIn: ['North America'], periodRangeMya: [85, 84],
  dimensions: { lengthMeters: 1.2, heightMeters: 0.8, weightKg: 2, speedKmh: 50 },
  images: img('nyctosaurus'),
  facts: [
    { label: 'Crest', value: 'Massive antler-crest', icon: 'crown', description: 'A spectacular giant crest with two prong-like branches — by far the largest display structure of any known pterosaur.' },
    { label: 'Tail', value: 'Vestigial', icon: 'minus', description: 'Had a tiny stub for a tail — a radical evolutionary departure from the long-tailed pterosaurs of earlier eras.' },
    { label: 'Wings', value: 'Narrow and long', icon: 'wind', description: 'Long, narrow wings adapted for dynamic soaring over the Western Interior Seaway — like a Cretaceous albatross.' },
    { label: 'Flight', value: 'Aerial fisherman', icon: 'fish', description: 'Soared over the Cretaceous sea and dipped its toothless beak to scoop up fish.' },
  ],
  description: 'Nyctosaurus was a short-tailed, antler-crested pterosaur from the Cretaceous seas of North America — a graceful soarer that carried the most dramatic headgear ever worn by a flying animal.',
  longDescription: 'Nyctosaurus gracilis (Marsh, 1876) is a nyctosaurid pterodactyloid pterosaur from the Coniacian–Santonian Niobrara Chalk of Kansas, USA. Nyctosaurids were a highly specialised lineage of pterodactyloid pterosaurs that, like pteranodontids, lost their teeth and shortened their tails — but took a unique evolutionary path. The most spectacular feature of Nyctosaurus is the enormous cranial crest, which in some species is bifurcated into two antler-like prongs. The crest lacks bony struts and was likely supported in life by a keratinous extension. It is the largest display structure known in any pterosaur, and the function remains debated — most likely sexual display and species recognition, given its high cost and likely aerodynamic penalty. Nyctosaurus was well adapted for soaring: long, narrow wings, a reduced tail, and lightweight hollow bones. With an estimated wingspan of around 2 metres for typical individuals, and almost no tail to weigh it down, Nyctosaurus was probably one of the most efficient fliers of the Cretaceous skies, skimming the Western Interior Seaway and plucking fish from the surface with its toothless, hooked beak.',
  kidsDescription: 'Nyctosaurus was a pterosaur that looked like it was wearing a GIANT HAT with two antlers! It was a fast, graceful flier that swooped over the ocean catching fish, and it had almost no tail at all!',
  childFriendlyText: 'Nyctosaurus was a flying reptile with a huge two-pronged crest on its head and almost no tail. It soared over the ocean catching fish.',
  scientificSummary: 'Nyctosaurus gracilis (Marsh, 1876) is a nyctosaurid pterodactyloid pterosaur from the Niobrara Chalk, Kansas. Diagnostic: enlarged, often bifurcated cranial crest; reduced tail; toothless jaws. Wingspan ~2 m. Soaring piscivore adapted for long flights over the Western Interior Seaway. The bifurcated crest, when present, is the largest display structure known in any pterosaur.',
  discoveries: [
    { year: 1876, location: 'Niobrara Chalk, Kansas, USA', discoveredBy: 'O.C. Marsh', note: 'First Nyctosaurus described from the chalk deposits of Kansas.' },
  ],
  funFact: 'Nyctosaurus is the only known pterosaur where the crest is taller than the rest of the body in some specimens — the animal was literally topped with a giant, antler-shaped display structure!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Nyctosauridae', genus: 'Nyctosaurus', species: 'N. gracilis' },
  relatedDinosaurs: [
    { id: 'pteranodon', relationship: 'Contemporary pteranodontid relative' },
    { id: 'dimorphodon', relationship: 'Earlier basal pterosaur' },
    { id: 'quetzalcoatlus', relationship: 'Distant azhdarchid relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Niobrara Chalk, Kansas', coordinates: [38.7, -98.5], specimenName: 'Niobrara Chalk type material' },
  ],
  dangerLevel: 2, intelligence: 4,
}
