import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dravidosaurus: Dinosaur = {
  id: 'dravidosaurus', slug: 'dravidosaurus', displayName: 'Dravidosaurus', name: 'Dravidosaurus',
  pronunciation: 'dra-VID-oh-SOR-us', nameMeaning: 'Dravidian Lizard', genusName: 'Dravidosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'coastal',
  livedIn: ['Asia'], periodRangeMya: [85, 72],
  dimensions: { lengthMeters: 3.0, heightMeters: 1.0, weightKg: 500, speedKmh: 10 },
  images: img('dravidosaurus'),
  facts: [
    { label: 'Mystery', value: 'Stegosaur or plesiosaur?', icon: 'lightbulb', description: 'Dravidosaurus was initially described as a stegosaur, but later analysis suggested its "plates" may belong to a plesiosaur — making its true identity one of palaeontology\'s ongoing debates.' },
    { label: 'Age', value: 'Last stegosaur?', icon: 'clock', description: 'If correctly identified as a stegosaur, Dravidosaurus would be one of the last surviving members of the group — existing 80+ million years after most stegosaurs went extinct.' },
    { label: 'India', value: 'Gondwana survivor', icon: 'anchor', description: 'Found in the Late Cretaceous of India — when the subcontinent was an island moving toward Asia — making it part of the fascinating "island fauna" story of Late Cretaceous India.' },
    { label: 'Controversy', value: 'Highly debated', icon: 'layers', description: 'The fragmentary material of Dravidosaurus makes definitive classification nearly impossible. Scientists continue to debate whether it represents a true stegosaur or misidentified plesiosaur material.' },
  ],
  description: 'Dravidosaurus blanfordi is one of the most controversial dinosaurs ever described. Found in the Late Cretaceous (~85–72 Ma) of Tamil Nadu, India, it was initially described as a stegosaur — which would make it one of the very last members of that group, surviving tens of millions of years after stegosaurs went extinct elsewhere. However, a re-examination suggested the distinctive plates might belong to a plesiosaur. The fragmentary nature of the material leaves its identity genuinely unresolved — a tantalising mystery from India\'s ancient island ecosystem.',
  longDescription: 'Dravidosaurus blanfordi (Yadagiri & Ayyasami, 1979) is an enigmatic reptile from the Late Cretaceous Trichinopoly Group (Coniacian–Maastrichtian, ~85–72 Ma) of Tamil Nadu, India. The holotype consists of fragmentary skull elements, partial vertebrae, and several plate-like structures. When first described, the plates were interpreted as dorsal armour of a stegosaur — which would make Dravidosaurus a remarkable Late Cretaceous relict, as stegosaurs were otherwise extinct by the mid-Jurassic in most parts of the world. A 1991 study by Chatterjee and Rudra proposed that the plates and associated material actually belonged to a plesiosaur, specifically the flat, paddle-like ribs and bones of a marine reptile that had been mixed with non-marine elements. This interpretation, if correct, would invalidate Dravidosaurus as a dinosaur entirely. Given that Late Cretaceous India was an isolated island drifting toward Asia, and that plesiosaurs inhabited the surrounding Tethys Sea, both interpretations have paleogeographic support. The question remains contentious, and Dravidosaurus stands as a reminder of how incomplete fossil material can frustrate even expert interpretation.',
  kidsDescription: 'Dravidosaurus is one of palaeontology\'s great mysteries — nobody is sure if it\'s a stegosaur OR a plesiosaur! Found in India, the few bones and "plates" left scientists confused: were they stegosaur back plates or plesiosaur ribs from the sea? If it IS a stegosaur, it would be the very LAST one to ever live. A true dinosaur detective puzzle!',
  childFriendlyText: 'Dravidosaurus is one of palaeontology\'s great debates — was it one of the last stegosaurs in Late Cretaceous India, or was it actually a plesiosaur? Nobody is certain!',
  scientificSummary: 'Dravidosaurus blanfordi (Yadagiri & Ayyasami, 1979) is a fragmentary reptile from the Late Cretaceous Trichinopoly Group (~85–72 Ma), Tamil Nadu, India. Originally described as a stegosaur (which would constitute a remarkable Cretaceous survival); reinterpreted by Chatterjee & Rudra (1991) as possible plesiosaur material. Classification remains highly uncertain due to fragmentary nature. Paleogeographic context: India was an island continent in the Late Cretaceous, surrounded by Tethys Sea plesiosaurs.',
  discoveries: [
    { year: 1979, location: 'Trichinopoly, Tamil Nadu, India', discoveredBy: 'P. Yadagiri and K. Ayyasami', note: 'Fragmentary material described as a stegosaur by Yadagiri and Ayyasami in 1979; subsequently reinterpreted as possible plesiosaur material by Chatterjee and Rudra (1991).' },
  ],
  funFact: 'If Dravidosaurus really is a stegosaur, it would have been alive at the SAME TIME as Tyrannosaurus rex — that\'s how long after other stegosaurs it appears in the fossil record. It would be like finding a living mammoth in today\'s world.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Thyreophora', family: 'Stegosauridae', genus: 'Dravidosaurus', species: 'D. blanfordi' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Possible stegosaurid relative' },
    { id: 'kentrosaurus', relationship: 'Possible stegosaurid relative' },
  ],
  fossilLocations: [
    { country: 'India', region: 'Tiruchirappalli (Trichinopoly), Tamil Nadu (Trichinopoly Group)', coordinates: [10.79, 78.7], specimenName: 'GSI SR PAL 1 — holotype fragmentary material' },
  ],
  dangerLevel: 2, intelligence: 3,
}
