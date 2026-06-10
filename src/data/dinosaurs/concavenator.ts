import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Concavenator: Dinosaur = {
  id: 'concavenator', slug: 'concavenator', displayName: 'Concavenator', name: 'Concavenator',
  pronunciation: 'CON-kah-veh-NAY-tor', nameMeaning: 'Hunchback Hunter from Cuenca', genusName: 'Concavenator',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'medium', habitat: 'coastal',
  livedIn: ['Europe'], periodRangeMya: [130, 125],
  dimensions: { lengthMeters: 6.0, heightMeters: 2.0, weightKg: 1000, speedKmh: 30 },
  images: img('concavenator'),
  facts: [
    { label: 'Hump', value: 'Two-towered hump', icon: 'mountain', description: 'A pair of elongated vertebral spines over the hips formed a tall, sail-like hump — unique among theropods.' },
    { label: 'Quills', value: 'Feather precursors', icon: 'feather', description: 'Tight bundles on the forearm ulna likely anchored quill-like integumentary structures — an early evolutionary step toward feathers.' },
    { label: 'Family', value: 'Carcharodontosaurid', icon: 'swords', description: 'A small carcharodontosaurid — a sister group to the giant Giganotosaurus and Carcharodontosaurus.' },
    { label: 'Origin', value: 'Las Hoyas, Spain', icon: 'map-pin', description: 'Found in the Las Hoyas fossil site, a Cretaceous wetland that produced remarkable lagerstätte-quality preservation.' },
  ],
  description: 'Concavenator was a small, hump-backed carcharodontosaurid from Early Cretaceous Spain, with a distinctive pair of tall vertebral spines over its hips and quill-like structures on its arms — hints of the evolutionary path toward feathers.',
  longDescription: 'Concavenator corcovatus (Ortega, Escaso & Sanz, 2010) is a basal carcharodontosaurid theropod from the Barremian (Lower Cretaceous) Calizas de La Huérguina Formation at Las Hoyas, Cuenca, Spain. It is known from a single articulated skeleton. The animal was small for a carcharodontosaurid — about 6 metres — but the most striking feature is a strongly elongated pair of neural spines on the dorsal and sacral vertebrae over the hips, forming a sail or hump-like structure. The function of this hump remains debated: thermoregulation, fat storage (like a camel), display, or species recognition. Of even greater evolutionary interest are small bumps on the ulna that closely resemble the quill knobs seen in modern birds, providing some of the earliest direct evidence of feather-like integument in a non-coelurosaurian theropod. Phylogenetically, Concavenator sits near the base of Carcharodontosauridae, the family that includes Giganotosaurus, Carcharodontosaurus, and Mapusaurus.',
  kidsDescription: 'Concavenator was a HUMPBACKED dinosaur from Spain! It had two tall spines on its back that made a big hump, and its arms had little bumps where feathers might have grown. A very stylish predator!',
  childFriendlyText: 'Concavenator was a hump-backed meat-eater from Spain. It had a sail-like hump on its back and bumps on its arms that may have held feathers!',
  scientificSummary: 'Concavenator corcovatus (Ortega et al., 2010) is a basal carcharodontosaurid from the Barremian Calizas de La Huérguina Formation, Las Hoyas, Spain. Diagnostic: elongate pre- and postzygapophyseal neural spines on dorsal and sacral vertebrae forming a sail/hump. Ulnar papilli remigiales support presence of quill-like integumentary structures. Sister group to more derived carcharodontosaurids including Giganotosaurus and Carcharodontosaurus.',
  discoveries: [
    { year: 2003, location: 'Las Hoyas, Cuenca, Spain', discoveredBy: 'José Luis Sanz and Fernando Escaso', note: 'Articulated skeleton found in laminated limestones of the Calizas de La Huérguina Formation.' },
  ],
  funFact: 'Concavenator was the first dinosaur found outside the coelurosaur lineage to show quill-like bumps on its arms — meaning the precursors of feathers may have been far more widespread among dinosaurs than once thought.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Carcharodontosauridae', genus: 'Concavenator', species: 'C. corcovatus' },
  relatedDinosaurs: [
    { id: 'carcharodontosaurus', relationship: 'Larger carcharodontosaurid relative' },
    { id: 'giganotosaurus', relationship: 'Larger carcharodontosaurid relative' },
    { id: 'allosaurus', relationship: 'Earlier allosauroid cousin' },
  ],
  fossilLocations: [
    { country: 'Spain', region: 'Las Hoyas, Cuenca', coordinates: [40.07, -1.85], specimenName: 'MCCM-LH 6666 — holotype articulated skeleton' },
  ],
  dangerLevel: 7, intelligence: 5,
}
