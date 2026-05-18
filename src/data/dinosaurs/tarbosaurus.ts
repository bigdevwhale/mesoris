import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tarbosaurus: Dinosaur = {
    id: 'tarbosaurus',
    slug: 'tarbosaurus',
    displayName: 'Tarbosaurus',
    name: 'Tarbosaurus',
    pronunciation: 'TAR-bo-SORE-us',
    nameMeaning: 'Alarming Lizard',
    genusName: 'Tarbosaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'gigantic',
    habitat: 'desert',
    livedIn: ['Asia'],
    periodRangeMya: [70, 68],
    dimensions: { lengthMeters: 10.5, heightMeters: 3.5, weightKg: 5000, speedKmh: 40 },
    images: img('tarbosaurus'),
    facts: [
      { label: 'Heritage', value: 'Asian tyrant king', icon: 'trophy', description: 'Tarbosaurus was the dominant tyrannosaur of Late Cretaceous Mongolia, filling the same role as T. rex in North America.' },
      { label: 'Skull', value: 'Deep and powerful', icon: 'skull', description: 'Its skull was heavily reinforced for massive bite forces and violent head-shaking attacks.' },
      { label: 'Arms', value: 'Very tiny', icon: 'minus', description: 'Like other tyrannosaurines, it had small two-fingered arms that were dwarfed by its giant head.' },
      { label: 'Niche', value: 'Nemegt apex predator', icon: 'trophy', description: 'It hunted large hadrosaurs and titanosaurs on river-fed floodplains in ancient Mongolia.' },
    ],
    description: 'Tarbosaurus was the Asian answer to Tyrannosaurus rex — a huge tyrant dinosaur with a deep skull, slicing teeth, and the confidence of an apex predator that had almost nothing to fear.',
    longDescription: 'Tarbosaurus lived in the Nemegt ecosystem of Mongolia, a wetter and richer environment than the older dune-dominated beds nearby. Its anatomy strongly resembles that of other tyrannosaurines, but it had a narrower skull and some distinct jaw features that may reflect slightly different feeding mechanics from T. rex. Fossils found with juvenile and subadult remains show that Tarbosaurus changed dramatically as it grew, likely shifting from quick smaller-prey hunting as a youngster to heavy-duty domination of big herbivores as an adult. It was the signature giant theropod of Late Cretaceous Asia and one of the most famous dinosaurs from the Gobi Desert.',
    kidsDescription: 'Think of Tarbosaurus as Mongolia\'s T. rex cousin — huge head, giant teeth, tiny arms, and a roar that would have cleared the whole neighborhood!',
    childFriendlyText: 'Tarbosaurus was a giant meat-eater from Mongolia. It looked a lot like T. rex and was one of Asia\'s top predators.',
    scientificSummary: 'Tarbosaurus bataar (Maleev, 1955) is a tyrannosaurine tyrannosaurid from the Maastrichtian Nemegt Formation of Mongolia. It possesses a deep yet relatively narrow skull, robust dentition, and a postcranial skeleton optimized for large-prey predation. Growth series demonstrate major ontogenetic shifts in cranial mechanics and ecology. Tarbosaurus is a key taxon for understanding tyrannosaurid biogeography, especially the diversification of tyrannosaurines across Asia and North America late in the Cretaceous.',
    discoveries: [
      { year: 1946, location: 'Mongolia', discoveredBy: 'Soviet-Mongolian expeditions', note: 'Early Gobi expeditions recovered important tyrannosaur material from the Nemegt Basin.' },
      { year: 1955, location: 'Nemegt, Mongolia', discoveredBy: 'Evgeny Maleev', note: 'Maleev formally named Tarbosaurus based on Mongolian fossils.' },
    ],
    funFact: 'For years Tarbosaurus was sometimes called an Asian Tyrannosaurus, but most paleontologists today recognize it as its own famous genus.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Tyrannosaurinae', genus: 'Tarbosaurus', species: 'T. bataar' },
    relatedDinosaurs: [
      { id: 'tyrannosaurus-rex', relationship: 'Close relative' },
      { id: 'velociraptor', relationship: 'Regional contemporary' },
      { id: 'oviraptor', relationship: 'Nemegt neighbor' },
    ],
    fossilLocations: [
      { country: 'Mongolia', region: 'Ömnögovi', coordinates: [43.5, 101.0], specimenName: 'Nemegt Formation' },
    ],
    dangerLevel: 10,
    intelligence: 6,
}
