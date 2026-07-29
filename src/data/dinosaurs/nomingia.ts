import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nomingia: Dinosaur = {
  id: 'nomingia', slug: 'nomingia', displayName: 'Nomingia', name: 'Nomingia',
  pronunciation: 'nom-ING-ee-ah', nameMeaning: 'From the Nomingiin Gobi', genusName: 'Nomingia',
  era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'small', habitat: 'desert',
  livedIn: ['Asia'], periodRangeMya: [70, 66],
  dimensions: { lengthMeters: 1.7, heightMeters: 0.6, weightKg: 20, speedKmh: 30 },
  images: img('nomingia'),
  facts: [
    { label: 'Pygostyle', value: 'First non-avian pygostyle', icon: 'feather', description: 'Nomingia is the first non-avian dinosaur known to have possessed a pygostyle — the fused tail vertebrae that support the fan of tail feathers in modern birds — direct anatomical evidence of bird evolution.' },
    { label: 'Feathers', value: 'Tail feather fan', icon: 'star', description: 'The pygostyle of Nomingia indicates it carried a fan of tail feathers — most likely used for display, as seen in modern peacocks and turkeys — a stunning visual feature in this small Cretaceous dinosaur.' },
    { label: 'Intelligence', value: 'Smart oviraptorid', icon: 'brain', description: 'Oviraptorids like Nomingia had relatively large brains for their size, sharp vision, and complex social behaviours — among the most cognitively capable of all non-avian dinosaurs.' },
    { label: 'Gobi', value: 'Mongolia desert', icon: 'anchor', description: 'Found in the Nemegt Formation of Mongolia\'s Gobi Desert — one of the richest Late Cretaceous dinosaur sites in the world, also producing Tarbosaurus, Gallimimus, and Therizinosaurus.' },
  ],
  description: 'Nomingia gobiensis was a small feathered oviraptorid from the Late Cretaceous Gobi Desert of Mongolia, and holds the remarkable distinction of being the first non-avian dinosaur known to have a pygostyle — the fused tail bones that support the elaborate tail-feather fan of modern birds. This anatomical discovery, described in 2000, provided powerful direct evidence that non-avian dinosaurs were actively evolving bird-like features before the origin of flight itself. Nomingia\'s tail feather fan was almost certainly used for visual display — a peacock-like show of fitness in the Cretaceous Gobi.',
  longDescription: 'Nomingia gobiensis (Barsbold et al., 2000) is a caenagnathid oviraptorid maniraptoran from the Maastrichtian (~70–66 Ma) Nemegt Formation of the Gobi Desert, Mongolia. The holotype is a partial skeleton notably preserving the terminal tail vertebrae, which are fused into a pygostyle — the same structure that, in modern birds, anchors the rectrices (tail feathers) forming the fan tail. This was the first confirmed occurrence of a pygostyle in any non-avian dinosaur, representing a direct evolutionary precursor to the avian condition. The functional significance of the pygostyle in Nomingia is inferred to be feather fan support for display purposes, as feathers are not directly preserved but are indicated by the bone\'s morphology. The broader oviraptorid body plan — lightly built, bipedal, with a toothless beaked skull and large eyes — is consistent with an omnivorous diet including seeds, invertebrates, small vertebrates, and eggs. Oviraptorids are within Maniraptora, the theropod clade that includes birds, and Nomingia\'s pygostyle establishes that the evolutionary development of this critical avian anatomical structure predates the origin of Aves.',
  kidsDescription: 'Nomingia was a small feathered dinosaur from Mongolia with something AMAZING: it was the FIRST non-bird dinosaur ever found with a PYGOSTYLE — the exact same bone that holds a bird\'s tail feathers! Its fan of tail feathers was probably used for display like a peacock. Direct proof that birds evolved from dinosaurs, one bone at a time!',
  childFriendlyText: 'Nomingia was a small Mongolian oviraptorid with a pygostyle — the first non-avian dinosaur found with the bone that holds a bird\'s tail feathers — direct evidence of bird evolution.',
  scientificSummary: 'Nomingia gobiensis (Barsbold et al., 2000) is a caenagnathid oviraptorid maniraptoran from the Maastrichtian Nemegt Formation (~70–66 Ma), Gobi Desert, Mongolia. First non-avian dinosaur confirmed to possess a pygostyle (fused terminal caudal vertebrae). Pygostyle morphologically homologous to avian pygostyle, indicating tail-feather fan. Oviraptorid omnivore, lightly built (~1.7 m, ~20 kg). Maniraptorans are the sister clade of Avialae (birds); this specimen directly bridges avian and non-avian morphology.',
  discoveries: [
    { year: 2000, location: 'Nemegt Formation, Ömnögovi Province, Mongolia', discoveredBy: 'Rinchen Barsbold et al.', note: 'Described in 2000 by Barsbold and colleagues; the pygostyle immediately became a landmark piece of evidence in the dinosaur-to-bird evolutionary story.' },
  ],
  funFact: 'Nomingia had the same tail bone as a modern turkey — 70 million years before turkeys existed. The pygostyle is so characteristic of birds that finding one in a small Cretaceous dinosaur felt to scientists like finding a car key in a Viking burial: something was already being invented long before its famous users arrived.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Caenagnathidae', genus: 'Nomingia', species: 'N. gobiensis' },
  relatedDinosaurs: [
    { id: 'oviraptor', relationship: 'Close oviraptorid relative' },
    { id: 'velociraptor', relationship: 'Maniraptoran theropod relative' },
    { id: 'troodon', relationship: 'Small contemporary theropod' },
  ],
  fossilLocations: [
    { country: 'Mongolia', region: 'Ömnögovi Province, Nemegt Formation', coordinates: [43.5, 100.5], specimenName: 'GIN 100/119 — holotype partial skeleton with pygostyle' },
  ],
  dangerLevel: 3, intelligence: 7,
  birdRelation: '7 / 10',
}
