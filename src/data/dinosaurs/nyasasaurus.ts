import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nyasasaurus: Dinosaur = {
  id: 'nyasasaurus', slug: 'nyasasaurus', displayName: 'Nyasasaurus', name: 'Nyasasaurus',
  pronunciation: 'NYE-ah-sah-SOR-us', nameMeaning: 'Lake Nyasa Lizard', genusName: 'Nyasasaurus',
  era: 'triassic', diet: 'omnivore', category: 'omnivore', size: 'small', habitat: 'plains',
  livedIn: ['Africa'], periodRangeMya: [243, 235],
  dimensions: { lengthMeters: 2.0, heightMeters: 0.7, weightKg: 30, speedKmh: 20 },
  images: img('nyasasaurus'),
  facts: [
    { label: 'Age', value: 'Oldest dinosaur?', icon: 'clock', description: 'If correctly identified as a dinosaur, Nyasasaurus would be 10–15 million years older than any other known dinosaur, pushing dinosaur origins back to ~243 million years ago.' },
    { label: 'Evidence', value: 'Arm & vertebrae', icon: 'minus', description: 'Known from just a humerus (upper arm bone) and several vertebrae — enough to identify dinosaur-like features, but not enough to be completely certain of its classification.' },
    { label: 'Bone growth', value: 'Rapid growth', icon: 'arrow-up', description: 'Bone histology reveals rapid, sustained growth rates characteristic of dinosaurs — a key feature that separates them from the slower-growing reptiles of the time.' },
    { label: 'Tanzania', value: 'Middle Triassic', icon: 'anchor', description: 'Found in the Middle Triassic Manda Formation of Tanzania, an era when the first dinosaur-like animals were still emerging from a reptile-dominated world.' },
  ],
  description: 'Nyasasaurus parringtoni may be the oldest dinosaur — or the closest non-dinosaur relative — ever found. Discovered in Tanzania in the 1930s but not formally described until 2013, this enigmatic animal lived approximately 243 million years ago during the Middle Triassic. Known from just a single arm bone and several vertebrae, Nyasasaurus exhibits bone tissue growth patterns consistent with early dinosaurs. If its assignment to Dinosauria holds, it pushes the origin of the entire dinosaur lineage back by 10–15 million years.',
  longDescription: 'Nyasasaurus parringtoni (Barrett et al., 2013) is an enigmatic archosaur from the Middle Triassic (~243 Ma) Manda Formation of the Ruhuhu Basin, Tanzania. Specimens include a partial humerus and five vertebrae, collected by Rex Parrington in the 1930s but only formally described eight decades later. The humerus bears a prominent deltopectoral crest and a bone structure consistent with a dinosaur or very close dinosaurian relative. Vertebral bone histology reveals fibro-lamellar tissue — a hallmark of the rapid, sustained growth found in true dinosaurs — rather than the slow, cyclically deposited bone of typical Triassic reptiles. If Nyasasaurus is a true dinosaur, it predates the classic Carnian (231 Ma) dinosaur fauna of Argentina (Eoraptor, Herrerasaurus, Pisanosaurus) by approximately 10–15 million years, suggesting dinosaurs originated during the Anisian–Ladinian stages of the Middle Triassic. Alternatively, it may represent a closely related dinosauriform (a near-dinosaur), in which case it still significantly constrains the timing of dinosaur origins.',
  kidsDescription: 'Nyasasaurus might be the OLDEST dinosaur ever discovered — 243 million years old! Scientists found only a few bones in Tanzania, Africa, but those bones show fast growth rates like a real dinosaur. If it really is a dinosaur, it changes everything we know about when dinosaurs first appeared!',
  childFriendlyText: 'Nyasasaurus might be the oldest dinosaur ever found — 243 million years old from Tanzania, Africa! Known from just a few bones, it could rewrite dinosaur history.',
  scientificSummary: 'Nyasasaurus parringtoni (Barrett et al., 2013) is a putative early dinosaur or dinosauriform archosaur from the Anisian–Ladinian Manda Formation (~243 Ma), Ruhuhu Basin, Tanzania. Known from humerus and five vertebrae; bone histology shows fibro-lamellar growth tissue consistent with Dinosauria. If dinosaurian, extends the clade\'s record by ~10–15 Ma relative to the Argentine Carnian fauna. Alternatively resolved as a silesaurid-grade dinosauriform. Classification remains contentious pending additional material.',
  discoveries: [
    { year: 1934, location: 'Ruhuhu Basin, Tanzania', discoveredBy: 'Rex Parrington', note: 'Bones collected in the 1930s but not formally described until 2013 by Sterling Nesbitt and colleagues.' },
    { year: 2013, location: 'Natural History Museum, London', discoveredBy: 'Sterling Nesbitt et al.', note: 'Formal description published in Biology Letters identified the material as potentially the world\'s oldest dinosaur.' },
  ],
  funFact: 'Nyasasaurus was collected in the 1930s and sat in museum drawers for nearly 80 years before anyone realised it might be the oldest dinosaur ever found. The most important fossil can be hiding in a drawer for decades!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Archosauria', order: 'Saurischia', suborder: 'incertae sedis', family: 'incertae sedis', genus: 'Nyasasaurus', species: 'N. parringtoni' },
  relatedDinosaurs: [
    { id: 'eoraptor', relationship: 'Later Argentine early dinosaur' },
    { id: 'herrerasaurus', relationship: 'Later early dinosaur' },
  ],
  fossilLocations: [
    { country: 'Tanzania', region: 'Ruhuhu Basin, Manda Formation, Ruvuma Region', coordinates: [-10.5, 34.9], specimenName: 'NHMUK PV R6856 — holotype humerus and vertebrae' },
  ],
  dangerLevel: 3, intelligence: 4,
}
