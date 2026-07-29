import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Irritator: Dinosaur = {
  id: 'irritator', slug: 'irritator', displayName: 'Irritator', name: 'Irritator',
  pronunciation: 'ih-RIT-ay-tor', nameMeaning: 'The Irritator', genusName: 'Irritator',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'swamp',
  livedIn: ['South America'], periodRangeMya: [110, 100],
  dimensions: { lengthMeters: 8.0, heightMeters: 2.0, weightKg: 1000, speedKmh: 24 },
  images: img('irritator'),
  facts: [
    { label: 'Name', value: 'Named in frustration', icon: 'lightbulb', description: 'Irritator got its unusual name because the fossil skull was purchased already altered by commercial fossil dealers who had added plaster to make it look more complete — irritating the scientists who described it.' },
    { label: 'Snout', value: 'Long crocodile jaws', icon: 'target', description: 'Irritator had an extremely long, narrow snout lined with small conical teeth — perfectly adapted for snatching fish from shallow Cretaceous rivers and estuaries of ancient Brazil.' },
    { label: 'Spinosaurid', value: 'Brazilian spinosaurid', icon: 'layers', description: 'Irritator is a spinosaurid — closely related to the famous Spinosaurus — and represents the spinosaurid family in South America, showing the group\'s wide Gondwana distribution.' },
    { label: 'Pterosaur meal', value: 'Ate pterosaurs too', icon: 'feather', description: 'A pterosaur tooth embedded in a vertebra of Irritator suggests this spinosaurid occasionally attacked or scavenged pterosaurs — making it one of the few known predator-pterosaur interactions.' },
  ],
  description: 'Irritator challengeri earned its memorable name from the frustration of the palaeontologists who described it — the skull fossil had been doctored by commercial dealers. A Brazilian spinosaurid from the Early Cretaceous (~110 Ma) Santana Formation, Irritator had the long, narrow, fish-catching jaws typical of spinosaurids. At 8 metres, it was a significant predator of the ancient river systems of northeastern Brazil. Remarkably, a pterosaur tooth was found embedded in one of its vertebrae — circumstantial evidence of an aerial attack or scavenging encounter.',
  longDescription: 'Irritator challengeri (Martill et al., 1996) is a spinosaurid theropod from the Albian (~110–100 Ma) Santana Formation of Ceará State, northeastern Brazil. The holotype is a nearly complete skull purchased from commercial fossil dealers in Brazil. When examined, scientists discovered that the snout had been artificially extended with plaster to make it more impressive and saleable — the resulting frustration at needing to restore the original morphology directly inspired the name "Irritator". The skull is long and low with a prominent sagittal crest at the rear, and the jaws bear small, conical, unserrated teeth — characteristic of the fish-catching spinosaurid dental style. The nasal passage runs through a raised nasal crest along the top of the snout. Irritator is closely related to Angaturama limai (possibly the same animal) and is a member of the spinosaurid subfamily Spinosaurinae, along with the famous Spinosaurus of Africa and Baryonyx of Europe. A pterosaur tooth (attributed to Anhanguera) was found lodged in an Irritator vertebra, suggesting either a predatory or scavenging encounter between the two reptiles. The Santana Formation is famous for its extraordinary preservation of Early Cretaceous fish, pterosaurs, and spinosaurids in nodule concretions.',
  kidsDescription: 'Irritator has the BEST dinosaur name ever — named because scientists were IRRITATED when they found dealers had stuck plaster onto the skull to make it look more impressive! This Brazilian spinosaurid had long narrow fish-catching jaws and even has a pterosaur tooth stuck in its backbone — evidence it attacked flying reptiles! A true Cretaceous river predator.',
  childFriendlyText: 'Irritator is named because scientists were irritated by fossil dealers altering its skull! This Brazilian spinosaurid had long fish-catching jaws and even attacked pterosaurs.',
  scientificSummary: 'Irritator challengeri (Martill et al., 1996) is a spinosaurine spinosaurid from the Albian Santana Formation (~110–100 Ma), Ceará, Brazil. Skull elongate, low with sagittal crest; dentition conical, unserrated (fish-catching adaptation). Holotype skull artificially modified by dealers (prompting the name). Closely allied to Angaturama limai (possibly conspecific). Pterosaur tooth (Anhanguera sp.) embedded in referred vertebra — evidence of predatory or scavenging interaction. Gondwanan spinosaurid distribution.',
  discoveries: [
    { year: 1991, location: 'Santana Formation, Ceará State, Brazil', discoveredBy: 'Commercial dealers (exact discoverer unknown)', note: 'Skull purchased by dealers and modified; acquired by Staatliches Museum für Naturkunde Stuttgart; described by Martill, Cruickshank, Frey, and others in 1996.' },
  ],
  funFact: 'Irritator is one of the very few dinosaurs where we have direct fossil evidence of it interacting with another animal — a pterosaur tooth lodged in its backbone. Whether Irritator was hunting the pterosaur, being attacked by it, or scavenging its body, we can\'t be sure — but 110 million years later, the evidence of that encounter survives.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Spinosauridae', genus: 'Irritator', species: 'I. challengeri' },
  relatedDinosaurs: [
    { id: 'spinosaurus', relationship: 'Close spinosaurine relative' },
    { id: 'baryonyx', relationship: 'Close spinosaurid relative' },
    { id: 'suchomimus', relationship: 'African spinosaurid relative' },
  ],
  fossilLocations: [
    { country: 'Brazil', region: 'Ceará State, Santana Formation (Romualdo Member)', coordinates: [-7.0, -40.0], specimenName: 'SMNS 58022 — holotype near-complete skull' },
  ],
  dangerLevel: 7, intelligence: 5,
  birdRelation: '2 / 10',
}
