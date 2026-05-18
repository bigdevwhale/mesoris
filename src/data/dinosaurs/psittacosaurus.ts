import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Psittacosaurus: Dinosaur = {
    id: 'psittacosaurus',
    slug: 'psittacosaurus',
    displayName: 'Psittacosaurus',
    name: 'Psittacosaurus',
    pronunciation: 'sit-ACK-oh-SORE-us',
    nameMeaning: 'Parrot Lizard',
    genusName: 'Psittacosaurus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'small',
    habitat: 'forest',
    livedIn: ['Asia'],
    periodRangeMya: [126, 101],
    dimensions: { lengthMeters: 2.0, heightMeters: 0.7, weightKg: 20, speedKmh: 35 },
    images: img('psittacosaurus'),
    facts: [
      { label: 'Beak', value: 'Parrot-like', icon: 'leaf', description: 'Its short deep beak was perfect for clipping tough plants, seeds, and possibly nuts.' },
      { label: 'Fossils', value: 'Hundreds found', icon: 'trophy', description: 'Psittacosaurus is one of the most common dinosaur fossils, giving scientists an amazing life-history sample.' },
      { label: 'Tail', value: 'Bristle quills', icon: 'feather', description: 'Some specimens preserve stiff bristles on the tail — a rare kind of dinosaur body covering.' },
      { label: 'Growth', value: 'Baby-to-adult record', icon: 'baby', description: 'Scientists know juveniles, adults, and even brooding behavior from the huge number of fossils.' },
    ],
    description: 'Small, beaked, and incredibly abundant, Psittacosaurus is the everyday superstar of Early Cretaceous paleontology. It was a primitive ceratopsian that helps scientists understand how horned dinosaurs began.',
    longDescription: 'Psittacosaurus lived across large parts of Asia and adapted so successfully that multiple species evolved over millions of years. Unlike later horned giants such as Triceratops, it lacked a big frill and facial horns, but its strong parrot-like beak and compact body made it an efficient small herbivore. Some fossils preserve skin, color patterns, tail bristles, and groups of juveniles, making Psittacosaurus one of the richest sources of information about dinosaur growth, social life, and appearance. It is especially valuable because it captures an early stage in ceratopsian evolution before the group became dominated by huge, horned quadrupeds.',
    kidsDescription: 'Psittacosaurus was a little beaked dinosaur with a parrot face and a bristly tail! Scientists find so many fossils of it that they can study babies, grown-ups, and even what color it may have been.',
    childFriendlyText: 'Psittacosaurus was a small plant-eater with a parrot-like beak. It is one of the best-known dinosaurs because so many fossils have been found.',
    scientificSummary: 'Psittacosaurus lujiatunensis (Zhou et al., 2006) represents one of several species within Psittacosaurus, a basal ceratopsian genus abundant in the Early Cretaceous of Asia. Psittacosaurus is characterized by a deep rostral beak, relatively short frill, bipedal to facultatively quadrupedal locomotion, and in some specimens, preserved integumentary bristles on the tail. Exceptional specimens from Liaoning preserve pigmentation and ontogenetic series, making the genus fundamental to studies of ceratopsian origins, dinosaur coloration, and developmental biology.',
    discoveries: [
      { year: 1922, location: 'Mongolia', discoveredBy: 'Henry Fairfield Osborn', note: 'Osborn named the genus from early Asian discoveries and recognized it as a primitive horned dinosaur.' },
      { year: 2000, location: 'Liaoning, China', discoveredBy: 'Chinese paleontological teams', note: 'Spectacular new fossils preserved skin, bristles, and even possible juvenile groupings.' },
    ],
    funFact: 'One famous Psittacosaurus fossil preserves color patterns so well that scientists reconstructed it as a countershaded dinosaur with camouflage.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Psittacosauridae', genus: 'Psittacosaurus', species: 'P. lujiatunensis' },
    relatedDinosaurs: [
      { id: 'protoceratops', relationship: 'Later ceratopsian relative' },
      { id: 'triceratops', relationship: 'Distant horned descendant relative' },
      { id: 'microraptor', relationship: 'Contemporary Asian neighbor' },
    ],
    fossilLocations: [
      { country: 'China', region: 'Liaoning', coordinates: [41.9, 121.7], specimenName: 'Yixian Formation' },
      { country: 'Mongolia', region: 'Ömnögovi', coordinates: [44.5, 108.5], specimenName: 'Early Cretaceous beds' },
    ],
    dangerLevel: 2,
    intelligence: 4,
}
