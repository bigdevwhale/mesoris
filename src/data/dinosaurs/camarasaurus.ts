import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Camarasaurus: Dinosaur = {
  id: 'camarasaurus', slug: 'camarasaurus', displayName: 'Camarasaurus', name: 'Camarasaurus',
  pronunciation: 'KAM-ah-rah-SOR-us', nameMeaning: 'Chambered Lizard', genusName: 'Camarasaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [161, 145],
  dimensions: { lengthMeters: 18.0, heightMeters: 5.0, weightKg: 20000, speedKmh: 12 },
  images: img('camarasaurus'),
  facts: [
    { label: 'Abundance', value: 'Most common Morrison sauropod', icon: 'users', description: 'Camarasaurus is the most frequently found sauropod in the Morrison Formation — hundreds of specimens are known, including complete skeletons at all growth stages, from hatchlings to adults.' },
    { label: 'Skull', value: 'Box-like head', icon: 'layers', description: 'Unlike the small-headed diplodocids, Camarasaurus had a large, box-shaped skull with robust, spoon-shaped teeth — better suited for tough vegetation than the peg-like teeth of Diplodocus.' },
    { label: 'Name', value: 'Chambered vertebrae', icon: 'minus', description: 'Its vertebrae were hollowed out with large chambers (camellate bone) to reduce weight while maintaining structural strength — essential for an animal this size.' },
    { label: 'Growth', value: 'Fast grower', icon: 'arrow-up', description: 'Bone histology indicates Camarasaurus grew rapidly and continuously, reaching adult size in 20–26 years — faster than many other sauropods of comparable size.' },
  ],
  description: 'Camarasaurus supremus was the most abundant large sauropod of the Jurassic Morrison Formation — the great dinosaur-bearing rock unit of the American West. Hundreds of specimens are known, making it the best-understood Jurassic sauropod in North America. At 18 metres and 20 tonnes, it was a formidable browser, distinguished by its box-like skull and spatulate teeth suited for tougher vegetation than the peg-toothed diplodocids with which it shared its world. Its chambered vertebrae give it both its name and its ability to carry such immense weight.',
  longDescription: 'Camarasaurus supremus (Cope, 1877) is a macronarian sauropod from the Late Jurassic Morrison Formation (~161–145 Ma) of North America. It is by far the most commonly discovered large sauropod in the Morrison, with specimens known from Wyoming, Colorado, Utah, New Mexico, and elsewhere. Complete growth series specimens, including nearly hatching-size juveniles through full adults, provide unparalleled data on sauropod ontogeny. The skull is distinctive among Morrison sauropods: large, boxy, and equipped with robust, spatulate (spoon-shaped) teeth designed for processing coarse vegetation, in contrast to the delicate peg teeth of diplodocids. The vertebral column bears large pleurocoels (hollow chambers) that reduce weight — the "chambered" feature that inspired the name. Bone histology studies reveal rapid, fibrolamellar growth throughout life, with growth rates slowing but not stopping at adulthood. Multiple Camarasaurus specimens have been found in close association, suggesting at least occasional gregarious behaviour. The genus divided its ecosystem with Diplodocus, Apatosaurus/Brontosaurus, and Brachiosaurus, likely through dietary partitioning of different plant types and heights.',
  kidsDescription: 'Camarasaurus was the MOST COMMON big dinosaur of Jurassic North America — hundreds of its fossils have been found! Unlike Diplodocus with its tiny teeth, Camarasaurus had a big boxy head with large teeth for chewing tough plants. Its backbone was full of hollow chambers to keep it light despite weighing 20 tonnes!',
  childFriendlyText: 'Camarasaurus was the most common large dinosaur in Jurassic North America, with a distinctive boxy skull and hollow-chambered vertebrae to carry its 20-tonne weight.',
  scientificSummary: 'Camarasaurus supremus (Cope, 1877) is a macronarian sauropod from the Kimmeridgian–Tithonian Morrison Formation, western North America (~161–145 Ma). Most abundant Morrison Formation sauropod; complete growth series known. Skull large, boxy; dentition spatulate, robust (macronarian grade). Vertebrae camellate (hollow-chambered). Bone histology indicates rapid, sustained growth. Contemporaneous with Diplodocus, Apatosaurus/Brontosaurus, Brachiosaurus; likely dietary partitioning.',
  discoveries: [
    { year: 1877, location: 'Garden Park, Colorado, USA', discoveredBy: 'Edward Drinker Cope', note: 'First specimens described by Cope in 1877 during the height of the Bone Wars; multiple species established from Morrison Formation material.' },
    { year: 1925, location: 'Dinosaur National Monument, Utah, USA', discoveredBy: 'Carnegie Museum team', note: 'Remarkable articulated partial skeletons recovered, including famous "Camarasaurus lentus" juveniles that showed the species grew rapidly.' },
  ],
  funFact: 'A perfectly preserved juvenile Camarasaurus skull has both baby teeth AND adult teeth partway through — caught in the act of tooth replacement. Scientists could examine exactly how these giants switched from juvenile to adult dentition, a glimpse of dinosaur childhood 150 million years in the making.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Camarasauridae', genus: 'Camarasaurus', species: 'C. supremus' },
  relatedDinosaurs: [
    { id: 'brachiosaurus', relationship: 'Macronarian sauropod relative' },
    { id: 'diplodocus', relationship: 'Contemporary diplodocid sauropod' },
    { id: 'apatosaurus', relationship: 'Contemporary Morrison Formation diplodocid' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Garden Park, Colorado (Morrison Formation)', coordinates: [38.4, -105.1], specimenName: 'AMNH 5761 — type specimen material' },
    { country: 'USA', region: 'Dinosaur National Monument, Utah', coordinates: [40.43, -108.98], specimenName: 'CM 11338 — remarkable near-complete juvenile' },
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'Multiple referred specimens' },
  ],
  dangerLevel: 3, intelligence: 3,
}
