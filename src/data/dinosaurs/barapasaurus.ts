import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Barapasaurus: Dinosaur = {
  id: 'barapasaurus', slug: 'barapasaurus', displayName: 'Barapasaurus', name: 'Barapasaurus',
  pronunciation: 'bah-RAH-pah-SOR-us', nameMeaning: 'Big Leg Lizard', genusName: 'Barapasaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['India'], periodRangeMya: [199, 189],
  dimensions: { lengthMeters: 14.0, heightMeters: 4.5, weightKg: 7000, speedKmh: 8 },
  images: img('barapasaurus'),
  facts: [
    { label: 'Name', value: 'Big-leg lizard', icon: 'footprints', description: 'Its name means "big leg lizard" — referring to the unusually massive femur bones found in its skeleton.' },
    { label: 'Origin', value: 'Oldest Indian sauropod', icon: 'map-pin', description: 'One of the oldest known sauropods, from the Early Jurassic of central India — a rare Gondwanan giant.' },
    { label: 'Skeleton', value: 'Mostly complete', icon: 'bone', description: 'Over 300 bones from at least six individuals were recovered, giving a nearly complete picture of its skeleton.' },
    { label: 'Significance', value: 'Sauropod origin', icon: 'star', description: 'A key taxon for understanding the early evolution of giant sauropods from their prosauropod ancestors.' },
  ],
  description: 'Barapasaurus was one of the earliest true giant sauropods — a long-necked plant-eater from Early Jurassic India. With massive femora and a partly recovered skeleton, it offers a rare glimpse into the dawn of the sauropod dynasty.',
  longDescription: 'Barapasaurus tagorei (Jain, Kutty, Roy-Chowdhury & Chatterjee, 1975) is a basal sauropod from the Early Jurassic (Sinemurian–Pliensbachian) of the Kota Formation, India. Its name means "big leg lizard" in a Hindi/Sanskrit combination, referring to the unusually robust femur, the largest single sauropod bone known from the Early Jurassic. Over 300 bones from at least six individuals have been recovered, providing one of the most complete sauropod skeletons from this period. Although it is one of the earliest sauropods, Barapasaurus already shows many features characteristic of later giants: columnar limbs, an elongated neck, and a small skull with spoon-shaped teeth. The teeth are intermediate between prosauropod leaf-shaped teeth and the more derived pencil-shaped sauropod dentition. Barapasaurus is critical for understanding the transition from prosauropod-grade basal sauropodomorphs to the later gigantic diplodocids, brachiosaurids, and titanosaurians. The Kota Formation deposits represent a rift-valley lake system, suggesting Barapasaurus inhabited semi-arid floodplains of the early Gondwanan landmass.',
  kidsDescription: 'Barapasaurus was a long-necked giant from ancient India — but it was one of the EARLIEST of its kind! It got its name "Big Leg Lizard" because its thighbones were HUGE. Even before the famous giants of the Jurassic, this fellow was already walking the Earth!',
  childFriendlyText: 'Barapasaurus was an early long-necked dinosaur from India. Its name means "Big Leg Lizard" because its thigh bones were super thick!',
  scientificSummary: 'Barapasaurus tagorei (Jain et al., 1975) is a basal sauropod from the Sinemurian-Pliensbachian Kota Formation, central India. Known from >300 bones representing at least 6 individuals — among the most complete Early Jurassic sauropods. Already shows columnar limbs and elongated neck. Dentition intermediate between prosauropod and later sauropod condition. Significant for understanding early sauropod evolution and Gondwanan biogeography.',
  discoveries: [
    { year: 1960, location: 'Kota Formation, Telangana/Andhra Pradesh, India', discoveredBy: 'Indian Statistical Institute team', note: 'Excavations recovered bones from at least six individuals at the site.' },
    { year: 1975, location: 'Kota Formation, India', discoveredBy: 'Sohan Lal Jain and colleagues', note: 'Formally described and named Barapasaurus tagorei.' },
  ],
  funFact: 'Barapasaurus was named in honor of Rabindranath Tagore, India\'s first Nobel laureate, who founded the Indian Statistical Institute — the same institution that led the fossil excavations!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Vulcanodontidae', genus: 'Barapasaurus', species: 'B. tagorei' },
  relatedDinosaurs: [
    { id: 'vulcanodon', relationship: 'Basal sauropod contemporary' },
    { id: 'brachiosaurus', relationship: 'Later sauropod descendant' },
    { id: 'plateosaurus', relationship: 'Prosauropod ancestor-grade relative' },
  ],
  fossilLocations: [
    { country: 'India', region: 'Kota Formation, Telangana', coordinates: [17.97, 79.5], specimenName: 'ISI R cast series, paratypes' },
  ],
  dangerLevel: 3, intelligence: 3,
}
