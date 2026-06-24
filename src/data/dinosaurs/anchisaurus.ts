import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Anchisaurus: Dinosaur = {
  id: 'anchisaurus', slug: 'anchisaurus', displayName: 'Anchisaurus', name: 'Anchisaurus',
  pronunciation: 'AN-kih-SOR-us', nameMeaning: 'Near Lizard', genusName: 'Anchisaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'small', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [200, 188],
  dimensions: { lengthMeters: 2.1, heightMeters: 0.7, weightKg: 27, speedKmh: 20 },
  images: { ...img('anchisaurus'), video: '/videos/dinosaurs/anchisaurus/video.mp4' },
  facts: [
    { label: 'Discovery', value: '1818 find', icon: 'star', description: 'Anchisaurus bones were found in Connecticut in 1818 — among the very first dinosaur remains discovered in North America, though initially mistaken for human fossils.' },
    { label: 'Locomotion', value: 'Bi/quadrupedal', icon: 'arrow-up', description: 'Anchisaurus could walk on two legs or drop to all fours, making it one of the most versatile early dinosaurs in terms of movement.' },
    { label: 'Diet', value: 'Plant eater', icon: 'leaf', description: 'Leaf-shaped, serrated teeth allowed Anchisaurus to process tough plant matter including ferns and cycads that dominated Jurassic forests.' },
    { label: 'Size', value: '2.1 metres', icon: 'maximize', description: 'At just over 2 metres, Anchisaurus was a small prosauropod — a far cry from the enormous sauropods that would evolve from its lineage.' },
  ],
  description: 'Anchisaurus was a gracile early prosauropod from the border of the Late Triassic and Early Jurassic. Found in the Connecticut River Valley of the northeastern United States, it holds the distinction of being among the first dinosaurs ever discovered in North America. Lightly built and slender, it could shift between bipedal and quadrupedal postures, making it well-adapted to the dense forests of Early Jurassic eastern Laurasia. Its leaf-shaped teeth and flexible forelimbs suggest a diet of low-browsing vegetation.',
  longDescription: 'Anchisaurus polyzelus was a small, gracile prosauropod from the Early Jurassic of northeastern North America (~200–188 Ma), known from Connecticut and Massachusetts. Skeletal analysis reveals a facultatively bipedal animal capable of switching to quadrupedal locomotion, with forelimbs bearing a large thumb claw — likely useful in foraging and defence. Its heterodont, spatulate dentition is well-suited to herbivory on low-growing Jurassic flora such as ferns, cycads, and early gymnosperms. The bones of Anchisaurus were unearthed in Hartford, Connecticut in 1818, making it one of the earliest North American dinosaur fossils ever recorded — although they were initially classified as human remains. Phylogenetically, Anchisaurus sits within the prosauropod grade of basal sauropodomorphs, closely related to European forms like Plateosaurus, but representing one of the earliest dinosaurian colonists of the Laurasian landmass.',
  kidsDescription: 'Anchisaurus was a small dinosaur found in Connecticut — one of the FIRST dinosaurs ever found in North America! At just over 2 metres long, it could walk on two legs or use all four. Its name means "near lizard" and it lived in lush Jurassic forests eating plants.',
  childFriendlyText: 'Anchisaurus was a small plant-eating dinosaur from Connecticut. It walked on two legs or four, and is one of the first dinosaurs ever found in America!',
  scientificSummary: 'Anchisaurus polyzelus (Hitchcock, 1865) is a basal sauropodomorph prosauropod from the Early Jurassic Portland Formation, Connecticut and Massachusetts, USA. Dated to ~200–188 Ma (Hettangian–Sinemurian), it represents one of the earliest dinosaurs known from North America. Facultative bipedality is supported by fore- and hindlimb proportions. Dentition is spatulate with marginal serrations, indicating herbivory. First described material dates to 1818, predating formal recognition of Dinosauria by decades.',
  discoveries: [
    { year: 1818, location: 'Hartford County, Connecticut, USA', discoveredBy: 'Solomon Ellsworth Jr.', note: 'Bones found during well-digging; initially classified as human remains before formal dinosaur recognition.' },
    { year: 1885, location: 'Springfield, Massachusetts, USA', discoveredBy: 'O.C. Marsh', note: 'Marsh formally described and named Anchisaurus based on additional Connecticut Valley material.' },
  ],
  funFact: 'The first bones of Anchisaurus were found in 1818 while workers were digging a well in Connecticut — decades before the word "dinosaur" had even been invented. Scientists initially thought the fossils were human bones!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Anchisauridae', genus: 'Anchisaurus', species: 'A. polyzelus' },
  relatedDinosaurs: [
    { id: 'plateosaurus', relationship: 'Close sauropodomorph relative' },
    { id: 'eoraptor', relationship: 'Distant early dinosaur relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Hartford County, Connecticut', coordinates: [41.8, -72.7], specimenName: 'Portland Formation type specimen' },
    { country: 'USA', region: 'Hampden County, Massachusetts', coordinates: [42.1, -72.6], specimenName: 'Springfield quarry material' },
  ],
  dangerLevel: 2, intelligence: 4,
}
