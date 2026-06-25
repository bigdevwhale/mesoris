import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Camptosaurus: Dinosaur = {
  id: 'camptosaurus', slug: 'camptosaurus', displayName: 'Camptosaurus', name: 'Camptosaurus',
  pronunciation: 'KAMP-toh-SOR-us', nameMeaning: 'Flexible Lizard', genusName: 'Camptosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [155, 145],
  dimensions: { lengthMeters: 7.5, heightMeters: 2.0, weightKg: 875, speedKmh: 22 },
  images: { ...img('camptosaurus'), video: '/videos/dinosaurs/camptosaurus/video.mp4' },
  facts: [
    { label: 'Locomotion', value: 'Biped or quadruped', icon: 'arrow-up', description: 'Camptosaurus could switch between running on two legs and ambling on all four — a versatile strategy that gave it both speed for escape and stability while feeding.' },
    { label: 'Beak', value: 'Horny beak', icon: 'leaf', description: 'A horny, toothless beak at the front of the snout was used to crop vegetation, while cheek teeth processed the food further back in the jaws — an efficient herbivore system.' },
    { label: 'Ancestry', value: 'Hadrosaur ancestor', icon: 'layers', description: 'Camptosaurus is an important early member of the ornithopod lineage, sitting on the evolutionary path that would eventually lead to the highly successful hadrosaurs of the Cretaceous.' },
    { label: 'Morrison', value: 'Morrison ecosystem', icon: 'users', description: 'Camptosaurus lived alongside sauropods, stegosaurs, and predators like Allosaurus in the Morrison Formation — a richly diverse Jurassic ecosystem in western North America.' },
  ],
  description: 'Camptosaurus dispar was a medium-to-large ornithopod herbivore from the Late Jurassic Morrison Formation, flexibly navigating between bipedal and quadrupedal locomotion — as its name "Flexible Lizard" suggests. Growing to 7.5 metres, it occupied the middle herbivore niche in the Morrison ecosystem alongside the giant sauropods. Its strong beak and cheek teeth processed a wide range of vegetation. As an early ornithopod, Camptosaurus represents an important evolutionary step toward the highly successful hadrosaurs that would dominate Cretaceous landscapes.',
  longDescription: 'Camptosaurus dispar (Marsh, 1879) is a derived ornithopod from the Kimmeridgian–Tithonian Morrison Formation (~155–145 Ma) of western North America. Known from numerous specimens representing different growth stages, it was a medium-large herbivore at ~7.5 metres. The hindlimbs were more robust than the forelimbs, supporting primary bipedality, but the forelimbs were broad with hoof-like unguals, allowing comfortable quadrupedal stance while feeding. The skull bears a toothless, keratinous beak at the front, transitioning to closely packed cheek teeth suitable for grinding fibrous vegetation. Camptosaurus occupied the middle herbivore tier in the Morrison ecosystem — larger than small ornithopods but far smaller than the sauropod giants it shared its world with. Phylogenetically, Camptosaurus is a stem iguanodontian, closely related to the lineage leading to Iguanodon and the hadrosaurs. Its well-ossified wrist bones suggest a degree of weight-bearing on the front limbs, and trackways attributed to camptosaurid-grade ornithopods confirm regular quadrupedal walking phases.',
  kidsDescription: 'Camptosaurus was a smart medium-sized herbivore from Jurassic North America that could switch between two legs and four! Named "Flexible Lizard", it had a horny beak and cheek teeth to munch through tough plants. It lived alongside T. rex\'s ancestor Allosaurus — and was fast enough to escape! An ancestor of the mighty hadrosaurs.',
  childFriendlyText: 'Camptosaurus was the "Flexible Lizard" of Jurassic North America — switching between two and four legs, with a horny beak and teeth for processing tough vegetation.',
  scientificSummary: 'Camptosaurus dispar (Marsh, 1879) is a stem iguanodontian ornithopod from the Kimmeridgian–Tithonian Morrison Formation, western North America (~155–145 Ma). Facultatively quadrupedal; hindlimb-dominated locomotion with broad, hoof-ungual forelimbs. Cranial anatomy: edentulous premaxilla (beak), closely packed maxillary/dentary teeth. Phylogenetically placed as a derived iguanodontian close to the Iguanodon + hadrosaur lineage. Morrison Formation mid-tier herbivore.',
  discoveries: [
    { year: 1879, location: 'Morrison Formation, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Multiple specimens recovered during the Bone Wars era; Marsh described the genus in 1879.' },
  ],
  funFact: 'Camptosaurus was so widespread in the Morrison Formation that its name was used for nearly 100 years as a "wastebasket taxon" — any medium ornithopod that scientists couldn\'t quite classify elsewhere got labelled a Camptosaurus. Modern analysis has sorted out many of these mix-ups.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Camptosauridae', genus: 'Camptosaurus', species: 'C. dispar' },
  relatedDinosaurs: [
    { id: 'iguanodon', relationship: 'Close iguanodontian relative' },
    { id: 'edmontosaurus', relationship: 'Later hadrosaur descendant lineage' },
    { id: 'muttaburrasaurus', relationship: 'Later ornithopod relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Albany County, Wyoming (Morrison Formation)', coordinates: [41.5, -105.7], specimenName: 'YPM 1877 — holotype material' },
    { country: 'USA', region: 'Dinosaur National Monument, Utah', coordinates: [40.43, -108.98], specimenName: 'Referred growth series specimens' },
  ],
  dangerLevel: 2, intelligence: 4,
}
