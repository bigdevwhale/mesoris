import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Adratiklit: Dinosaur = {
  id: 'adratiklit', slug: 'adratiklit', displayName: 'Adratiklit', name: 'Adratiklit',
  pronunciation: 'ah-drah-tee-KLIT', nameMeaning: 'Mountain Lizard from Adras', genusName: 'Adratiklit',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'plains',
  livedIn: ['Africa'], periodRangeMya: [168, 164],
  dimensions: { lengthMeters: 5.5, heightMeters: 1.8, weightKg: 1500, speedKmh: 10 },
  images: { ...img('adratiklit'), video: '/videos/dinosaurs/adratiklit/video.mp4' },
  facts: [
    { label: 'Oldest', value: 'Oldest known stegosaur', icon: 'clock', description: 'The oldest definitive stegosaur ever found — pushing the origin of the group back to the Middle Jurassic.' },
    { label: 'Origin', value: 'Morocco', icon: 'map-pin', description: 'Discovered in the Middle Atlas Mountains of Morocco — the first stegosaur ever named from North Africa.' },
    { label: 'Hemisphere', value: 'Southern stegosaur', icon: 'globe', description: 'One of the few stegosaurs from Gondwana — most are from the northern continents.' },
    { label: 'Family', value: 'Stegosaur ancestor', icon: 'shield', description: 'Represents an early branch of Stegosauria, helping scientists understand the family\'s ancient origins.' },
  ],
  description: 'Adratiklit is the oldest known stegosaur in the world — a plate-backed herbivore from Middle Jurassic Morocco that pushed the origin of the stegosaur family back into the depths of the Jurassic.',
  longDescription: 'Adratiklit boulahfa (Maidment, Raven, Ouarhache & Barrett, 2019) is a stegosaur from the Bathonian–Callovian (Middle Jurassic) El Mers Group of the Middle Atlas Mountains, Boulahfa, Morocco. Described in 2019 by Susannah Maidment and colleagues, Adratiklit is the oldest definitive stegosaur known — predating other stegosaurs by several million years and pushing the origin of the group deep into the Middle Jurassic. It is also the first stegosaur ever named from North Africa, and one of very few from the southern continents (Gondwana) — most stegosaurs are known from Laurasia (Europe, North America, Asia). Adratiklit is known from vertebrae (cervical, dorsal, and caudal) and a partial femur. The genus name combines "Adras" — a local Berber word for the region — with the Greek "klitos" (chosen to echo the "stegos" of Stegosaurus). The species name honours the local community of Boulahfa. The discovery has major implications for stegosaur biogeography: it suggests that the group may have originated in Gondwana before dispersing to Laurasia, rather than the other way around.',
  kidsDescription: 'Adratiklit is the OLDEST plate-backed dinosaur ever found — a stegosaur from Morocco that lived 165 million years ago! It\'s helping scientists figure out where stegosaurs came from in the first place!',
  childFriendlyText: 'Adratiklit is the oldest known stegosaur, discovered in Morocco. It lived 165 million years ago and helps scientists understand where stegosaurs came from.',
  scientificSummary: 'Adratiklit boulahfa (Maidment et al., 2019) is a stegosaur from the Bathonian-Callovian El Mers Group, Middle Atlas Mountains, Morocco. Oldest definitive stegosaur known, and the first stegosaur named from North Africa. Cervical, dorsal, and caudal vertebrae plus a partial femur. Significant for stegosaur biogeography and origin.',
  discoveries: [
    { year: 2019, location: 'Boulahfa, Middle Atlas Mountains, Morocco', discoveredBy: 'Susannah Maidment and team', note: 'Vertebrae and partial femur described and named Adratiklit boulahfa.' },
  ],
  funFact: 'Adratiklit was discovered by a team led by Susannah Maidment, one of the world\'s leading stegosaur experts — and she named it partly after the local Berber word for the mountains where it was found!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Adratiklit', species: 'A. boulahfa' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Famous later relative' },
    { id: 'loricatosaurus', relationship: 'European stegosaur relative' },
    { id: 'dacentrurus', relationship: 'European stegosaur' },
  ],
  fossilLocations: [
    { country: 'Morocco', region: 'El Mers Group, Middle Atlas Mountains, Boulahfa', coordinates: [32.85, -5.5], specimenName: 'NHMUK PV R 37166 — holotype vertebrae' },
  ],
  dangerLevel: 3, intelligence: 3,
}
