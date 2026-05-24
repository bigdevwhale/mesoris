import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dryptosaurus: Dinosaur = {
  id: 'dryptosaurus', slug: 'dryptosaurus', displayName: 'Dryptosaurus', name: 'Dryptosaurus',
  pronunciation: 'DRIP-toh-SOR-us', nameMeaning: 'Tearing Lizard', genusName: 'Dryptosaurus',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'coastal',
  livedIn: ['North America'], periodRangeMya: [68, 66],
  dimensions: { lengthMeters: 7.5, heightMeters: 2.6, weightKg: 1500, speedKmh: 34 },
  images: img('dryptosaurus'),
  facts: [
    { label: 'Historic Name', value: 'First US tyrannosauroid', icon: 'star', description: 'Dryptosaurus was one of the earliest large theropods named in North America and later recognized as a tyrannosauroid.' },
    { label: 'Arms', value: 'Longer forelimbs', icon: 'ruler', description: 'Compared with T. rex, it had proportionally longer and stronger arms ending in big grasping claws.' },
    { label: 'Environment', value: 'Coastal plain hunter', icon: 'waves', description: 'It lived on humid eastern coastal lowlands near the Western Interior seaway margin.' },
    { label: 'Art Legacy', value: 'Classic painting icon', icon: 'image', description: 'The 1897 painting "Leaping Laelaps" made Dryptosaurus one of the first dinosaurs depicted as active and dynamic.' },
  ],
  description: 'Dryptosaurus was a late-surviving eastern North American tyrannosauroid with long arms and powerful jaws. It represents a distinct predator lineage outside western T. rex-dominated ecosystems.',
  longDescription: 'Dryptosaurus aquilunguis is known from the Maastrichtian Navesink Formation of New Jersey and was originally named Laelaps before a nomenclatural conflict prompted renaming. Anatomical evidence places it among derived tyrannosauroids but outside Tyrannosauridae, highlighting regional differences between Appalachian and Laramidian dinosaur faunas during the Late Cretaceous. Its forelimbs were relatively elongate and robust, with large manual claws suggesting greater forelimb contribution to prey handling than in later giant tyrannosaurids. Depositional context indicates coastal to shallow marine influence, where carcass transport and reworking complicate taphonomy. Even with fragmentary remains, Dryptosaurus is crucial for reconstructing eastern North American predator evolution near the end-Cretaceous extinction.',
  kidsDescription: 'Dryptosaurus was a fierce hunter with big teeth and surprisingly strong arms. It lived in ancient New Jersey and became famous in one of the world\'s first dinosaur action paintings!',
  childFriendlyText: 'Dryptosaurus was a meat-eating dinosaur from eastern North America. It had strong jaws and longer arms than T. rex.',
  scientificSummary: 'Dryptosaurus aquilunguis (Cope, 1866) is a Maastrichtian tyrannosauroid from the Navesink Formation, New Jersey. Initially described as Laelaps, the genus was renamed due to preoccupation. Postcranial and cranial remains indicate a large-bodied non-tyrannosaurid tyrannosauroid with comparatively elongate forelimbs. It is a key Appalachian theropod taxon.',
  discoveries: [
    { year: 1866, location: 'Barnsboro, New Jersey, USA', discoveredBy: 'Quarry workers; described by Edward Drinker Cope', note: 'Originally named Laelaps aquilunguis from Cretaceous coastal deposits.' },
    { year: 1877, location: 'Taxonomic revision', discoveredBy: 'Othniel Charles Marsh', note: 'Renamed to Dryptosaurus after the name Laelaps was found to be preoccupied.' },
  ],
  funFact: 'Before T. rex became a superstar, Dryptosaurus helped teach scientists and the public that giant dinosaurs were active predators, not sluggish swamp monsters.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Dryptosauridae', genus: 'Dryptosaurus', species: 'D. aquilunguis' },
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Later giant tyrannosaurid relative' },
    { id: 'albertosaurus', relationship: 'More derived tyrannosaurid from western North America' },
    { id: 'gorgosaurus', relationship: 'Another Campanian-Maastrichtian tyrannosauroid lineage' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Navesink Formation, New Jersey', coordinates: [39.82, -75.13], specimenName: 'Holotype-associated material' },
  ],
  dangerLevel: 8, intelligence: 6,
}

