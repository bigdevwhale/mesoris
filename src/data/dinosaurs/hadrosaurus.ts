import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Hadrosaurus: Dinosaur = {
  id: 'hadrosaurus', slug: 'hadrosaurus', displayName: 'Hadrosaurus', name: 'Hadrosaurus',
  pronunciation: 'HAD-roh-SOR-us', nameMeaning: 'Bulky Lizard', genusName: 'Hadrosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [83, 78],
  dimensions: { lengthMeters: 7.0, heightMeters: 2.5, weightKg: 2500, speedKmh: 30 },
  images: img('hadrosaurus'),
  facts: [
    { label: 'First', value: 'First hadrosaur', icon: 'medal', description: 'The very first hadrosaur ever discovered — its name literally means "hadrosaur" and gave the whole family its name.' },
    { label: 'State', value: 'New Jersey dinosaur', icon: 'flag', description: 'The official state dinosaur of New Jersey — a rare honour for a creature found in such an urban part of America.' },
    { label: 'Beak', value: 'Duck-like bill', icon: 'bird', description: 'A broad, toothless duck-like beak at the front, with a complex dental battery in the cheeks — efficient chewing.' },
    { label: 'Family', value: 'Duck-bill origin', icon: 'leaf', description: 'It gave its name to Hadrosauridae — the family of duck-billed dinosaurs that includes Edmontosaurus and Parasaurolophus.' },
  ],
  description: 'Hadrosaurus foulkii was the very first duck-billed dinosaur discovered — found in 1858 in New Jersey and named the state dinosaur. Its discovery sparked a wave of hadrosaur finds across North America and gave a whole family its name.',
  longDescription: 'Hadrosaurus foulkii (Leidy, 1858) is a hadrosauroid ornithopod from the Campanian of New Jersey, USA — discovered in 1858 in the Navesink Formation. It was the first hadrosaurid dinosaur known to science and gave the entire family Hadrosauridae its name. The skeleton — one of the most complete dinosaur skeletons known at the time — included most of the postcranium and parts of the skull. Hadrosaurus confirmed for the first time that some dinosaurs were bipedal-or-quadrupedal herbivores with a duck-bill-like rostrum, contributing significantly to the emerging understanding of dinosaur diversity. Hadrosaurus reached about 7–8 metres in length and 2–3 tonnes in weight, with a long tail, robust hindlimbs, and a complex dental battery in the cheeks. The original discovery triggered the "Bone Wars" era of dinosaur paleontology in North America, as Cope, Marsh, and others rushed to find more giant hadrosaurs across the western US. Hadrosaurus is the official state dinosaur of New Jersey.',
  kidsDescription: 'Hadrosaurus was the FIRST duck-billed dinosaur ever found! Scientists found it in New Jersey back in 1858 — and now it\'s the official state dinosaur. Its name gave all duck-billed dinosaurs their family name!',
  childFriendlyText: 'Hadrosaurus was the very first duck-billed dinosaur ever discovered. It was found in New Jersey, USA, and it\'s the state dinosaur of New Jersey!',
  scientificSummary: 'Hadrosaurus foulkii (Leidy, 1858) is a hadrosauroid ornithopod from the Campanian of New Jersey, USA. The first hadrosaurid described, and namesake of the family Hadrosauridae. ~7–8 m long, bipedal-or-quadrupedal herbivore with a duck-like beak and a dental battery. Found in the Niobrara-equivalent Navesink Formation. State dinosaur of New Jersey.',
  discoveries: [
    { year: 1858, location: 'Haddonfield, New Jersey, USA', discoveredBy: 'William Parker Foulke', note: 'A nearly complete skeleton uncovered during a marl pit excavation. Named by Joseph Leidy.' },
  ],
  funFact: 'In 1991, Hadrosaurus foulkii became the official state dinosaur of New Jersey — making it one of the only dinosaurs in the world with its own state honour!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', genus: 'Hadrosaurus', species: 'H. foulkii' },
  relatedDinosaurs: [
    { id: 'edmontosaurus', relationship: 'Later hadrosaurid relative' },
    { id: 'parasaurolophus', relationship: 'Crest-crested hadrosaurid cousin' },
    { id: 'iguanodon', relationship: 'Earlier ornithopod ancestor-grade' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Haddonfield, New Jersey', coordinates: [39.9, -75.04], specimenName: 'ANSP 10005 — holotype skeleton' },
  ],
  dangerLevel: 3, intelligence: 5,
}
