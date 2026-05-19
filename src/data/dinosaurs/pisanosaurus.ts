import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pisanosaurus: Dinosaur = {
  id: 'pisanosaurus', slug: 'pisanosaurus', displayName: 'Pisanosaurus', name: 'Pisanosaurus',
  pronunciation: 'pee-SAH-no-SOR-us', nameMeaning: 'Pisano\'s Lizard', genusName: 'Pisanosaurus',
  era: 'triassic', diet: 'herbivore', category: 'herbivore', size: 'small', habitat: 'plains',
  livedIn: ['South America'], periodRangeMya: [228, 218],
  dimensions: { lengthMeters: 1.0, heightMeters: 0.3, weightKg: 2.7, speedKmh: 18 },
  images: img('pisanosaurus'),
  facts: [
    { label: 'Classification', value: 'Earliest ornithischian?', icon: 'layers', description: 'Pisanosaurus may be the oldest known ornithischian dinosaur — the group that includes Triceratops, Stegosaurus, and hadrosaurs — pushing this lineage back to ~228 million years ago.' },
    { label: 'Evidence', value: 'Fragmentary remains', icon: 'minus', description: 'Known from only a partial skeleton including jaw fragments, vertebrae, and limb bones, making its exact placement in dinosaur evolution hotly debated.' },
    { label: 'Size', value: 'Tiny pioneer', icon: 'maximize', description: 'At just 1 metre long and under 3 kg, Pisanosaurus was a tiny animal — one of the smallest known Triassic dinosaurs.' },
    { label: 'Habitat', value: 'Ischigualasto', icon: 'anchor', description: 'Lived in the Ischigualasto Formation alongside Eoraptor and Herrerasaurus — one of the world\'s most important early dinosaur fossil beds.' },
  ],
  description: 'Pisanosaurus mertii is among the most enigmatic of all early dinosaurs. Found in the Late Triassic Ischigualasto Formation of Argentina — the same remarkable deposit that yielded Eoraptor and Herrerasaurus — it is considered by many palaeontologists to be the earliest known ornithischian dinosaur. If this placement holds, Pisanosaurus pushes the origins of the great ornithischian lineage (which would later include Triceratops, Stegosaurus, and the hadrosaurs) back to approximately 228 million years ago. Its fragmentary nature, however, keeps its exact identity debated.',
  longDescription: 'Pisanosaurus mertii (Casamiquela, 1967) is known from a single, fragmentary specimen from the Ischigualasto Formation (Carnian, ~228–218 Ma) of San Juan Province, Argentina. The preserved material includes partial jaw fragments with distinctive leaf-shaped teeth, several vertebrae, partial forelimb bones, and fragmentary hindlimb elements. The jaw morphology — with closely packed, inset teeth and a predentary-like anterior region — has been interpreted as consistent with ornithischian affinity, leading most researchers to regard Pisanosaurus as the earliest known member of Ornithischia. However, a 2017 study proposed that it might not be a dinosaur at all, but rather a silesaurid dinosauriform — a close dinosaur relative that independently evolved similar dental features. At just ~1 metre length and under 3 kg, Pisanosaurus was one of the smallest animals in its ecosystem, likely feeding on low-growing ferns and seed ferns while avoiding predators like Herrerasaurus and Eoraptor.',
  kidsDescription: 'Pisanosaurus might have been the VERY FIRST ornithischian dinosaur — the group that later evolved into giants like Triceratops and Stegosaurus! Tiny at just 1 metre long, it lived in Argentina alongside Eoraptor 228 million years ago. Scientists still argue about exactly what kind of animal it was!',
  childFriendlyText: 'Pisanosaurus was a tiny plant-eating dinosaur from Argentina, and may be the oldest ancestor of Triceratops and Stegosaurus!',
  scientificSummary: 'Pisanosaurus mertii (Casamiquela, 1967) is a fragmentarily known, small-bodied dinosauriform from the Carnian Ischigualasto Formation, San Juan, Argentina (~228–218 Ma). Traditionally considered the earliest ornithischian based on inset, leaf-shaped dentition and possible predentary. Reanalysis (Agnolín & Rozadilla, 2017) suggests possible silesaurid affinity. Classification remains contested; if ornithischian, it substantially predates other confirmed members of the clade.',
  discoveries: [
    { year: 1962, location: 'Ischigualasto, San Juan Province, Argentina', discoveredBy: 'Galileo J. Scaglia', note: 'Single fragmentary specimen collected; formally described by Rodolfo Casamiquela in 1967.' },
  ],
  funFact: 'Pisanosaurus was found in the same layer of rock as Eoraptor and Herrerasaurus — meaning that 228 million years ago, in a single valley in Argentina, both the very earliest carnivorous dinosaurs AND possibly the very first ornithischian dinosaurs were living side by side.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Genasauria', family: 'Pisanosauridae', genus: 'Pisanosaurus', species: 'P. mertii' },
  relatedDinosaurs: [
    { id: 'eoraptor', relationship: 'Contemporary from same formation' },
    { id: 'herrerasaurus', relationship: 'Contemporary predator from same formation' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'San Juan Province, Ischigualasto Formation', coordinates: [-30.0, -67.9], specimenName: 'PULR 08 — holotype partial skeleton' },
  ],
  dangerLevel: 1, intelligence: 3,
}
