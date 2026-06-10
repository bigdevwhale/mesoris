import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tyrannotitan: Dinosaur = {
  id: 'tyrannotitan', slug: 'tyrannotitan', displayName: 'Tyrannotitan', name: 'Tyrannotitan',
  pronunciation: 'tie-RAN-oh-TIE-tan', nameMeaning: 'Tyrant Titan', genusName: 'Tyrannotitan',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['South America'], periodRangeMya: [122, 112],
  dimensions: { lengthMeters: 12.0, heightMeters: 3.8, weightKg: 7000, speedKmh: 32 },
  images: img('tyrannotitan'),
  facts: [
    { label: 'Name', value: 'Tyrant Titan', icon: 'zap', description: 'Its name means "Tyrant Titan" — combining the T. rex prefix "tyrant" with the gigantic "titan", referring to its sheer scale.' },
    { label: 'Family', value: 'Carcharodontosaurid', icon: 'swords', description: 'A member of Carcharodontosauridae, the family of gigantic South American and African theropods that rivaled T. rex in size.' },
    { label: 'Teeth', value: 'Knife-edged', icon: 'triangle', description: 'Distinctive recurved, blade-like serrated teeth — perfect for slicing flesh from giant sauropod prey.' },
    { label: 'Range', value: 'Patagonia', icon: 'map-pin', description: 'Discovered in the Cerro Barcino Formation of Chubut Province, Patagonia, Argentina.' },
  ],
  description: 'Tyrannotitan was one of the largest predatory dinosaurs ever — a 12-metre carcharodontosaurid that hunted the giant titanosaurs of Cretaceous Patagonia. Its blade-like teeth earned it a place among the apex carnivores of Gondwana.',
  longDescription: 'Tyrannotitan chubutensis (Novas, de Valais, Vickers-Rich & Rich, 2005) is a carcharodontosaurid theropod from the Aptian-Albian Cerro Barcino Formation of Chubut Province, Patagonia, Argentina. Reaching an estimated 12 metres in length and weighing up to 7 tonnes, it was among the largest predatory dinosaurs of South America. Despite its great size, Tyrannotitan is known from partial skeletons including vertebrae, limb bones, and cranial fragments. Phylogenetically, it is a derived carcharodontosaurid, more closely related to Carcharodontosaurus and Giganotosaurus than to basal carcharodontosaurids like Concavenator. The teeth of Tyrannotitan are laterally compressed with well-developed serrations — adapted for slicing rather than crushing, suggesting a hunting style focused on bringing down large sauropod prey such as the contemporaneous Patagotitan and related titanosaurs. Tyrannotitan is named for the combined "tyrant" prefix and "titan" suffix, reflecting both its kinship with the great predatory theropods and its enormous size.',
  kidsDescription: 'Tyrannotitan means "TYRANT TITAN" — a giant meat-eater from Argentina! It had teeth like steak knives and was one of the biggest predators of South America, hunting dinosaurs the size of buses!',
  childFriendlyText: 'Tyrannotitan was a giant meat-eating dinosaur from Argentina. It had sharp serrated teeth and hunted huge long-necked dinosaurs.',
  scientificSummary: 'Tyrannotitan chubutensis (Novas et al., 2005) is a carcharodontosaurid from the Aptian-Albian Cerro Barcino Formation, Patagonia, Argentina. ~12 m in length. Teeth laterally compressed with prominent serrations. Phylogenetically a derived carcharodontosaurid, sister to Giganotosaurus. Coexisted with titanosaurs (Patagotitan) which likely formed its prey base.',
  discoveries: [
    { year: 2005, location: 'Cerro Barcino Formation, Chubut Province, Patagonia, Argentina', discoveredBy: 'Fernando Novas and team', note: 'Partial postcranial skeleton described and named Tyrannotitan chubutensis.' },
  ],
  funFact: 'Tyrannotitan is named for being a "tyrant titan" — a perfect name, because the only animals bigger than it in its ecosystem were the titanosaurs it hunted!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Carcharodontosauridae', subfamily: 'Carcharodontosaurinae', genus: 'Tyrannotitan', species: 'T. chubutensis' },
  relatedDinosaurs: [
    { id: 'giganotosaurus', relationship: 'Carcharodontosaurid relative' },
    { id: 'carcharodontosaurus', relationship: 'African carcharodontosaurid relative' },
    { id: 'concavenator', relationship: 'Basal carcharodontosaurid relative' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Cerro Barcino Formation, Chubut', coordinates: [-43.5, -68.5], specimenName: 'MPEF-PV 1156 — holotype partial skeleton' },
  ],
  dangerLevel: 10, intelligence: 5,
}
