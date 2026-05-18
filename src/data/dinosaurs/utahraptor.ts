import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Utahraptor: Dinosaur = {
    id: 'utahraptor',
    slug: 'utahraptor',
    displayName: 'Utahraptor',
    name: 'Utahraptor',
    pronunciation: 'YOO-tah-RAP-tor',
    nameMeaning: 'Utah Plunderer',
    genusName: 'Utahraptor',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'large',
    habitat: 'desert',
    livedIn: ['North America'],
    periodRangeMya: [135, 130],
    dimensions: { lengthMeters: 6.5, heightMeters: 1.8, weightKg: 500, speedKmh: 40 },
    images: img('utahraptor'),
    facts: [
      { label: 'Claw', value: '24 cm sickle', icon: 'sickle', description: 'Its famous killing claw was far larger than the claws of Velociraptor or Deinonychus.' },
      { label: 'Size', value: 'Giant raptor', icon: 'maximize', description: 'Utahraptor was the biggest known dromaeosaur, with the body mass of a polar bear.' },
      { label: 'Feathers', value: 'Likely fluffy', icon: 'feather', description: 'As a close relative of feathered dromaeosaurs, it was almost certainly feathered despite its size.' },
      { label: 'Quarry', value: 'Group burial', icon: 'users', description: 'Several individuals were found together in sandstone, hinting at either social behavior or a shared disaster.' },
    ],
    description: 'The giant among raptors, Utahraptor took the sickle-clawed hunting design of smaller dromaeosaurs and scaled it up into a terrifying Cretaceous predator. It was fast, feathered, and armed like a living set of knives.',
    longDescription: 'Utahraptor lived in the Early Cretaceous of western North America, in landscapes of sandy river systems and seasonal drought. Compared with smaller dromaeosaurs, it had a more robust skull, stronger hindlimbs, and a much larger body, suggesting it could tackle prey too big for its more lightly built cousins. Its enlarged toe claw was probably used to slash, pin, and hold struggling animals while the jaws tore flesh. The discovery of multiple individuals in the same quarry has made Utahraptor especially fascinating, because it raises questions about whether some giant dromaeosaurs may have interacted socially, even if true pack hunting remains unproven.',
    kidsDescription: 'Imagine Velociraptor after a SUPER-SIZE upgrade — that is Utahraptor! It had giant feathered arms, a huge sickle claw on each foot, and was big enough to make other raptors look tiny.',
    childFriendlyText: 'Utahraptor was the biggest raptor ever found. It had feathers, sharp teeth, and giant curved claws on its feet.',
    scientificSummary: 'Utahraptor ostrommaysorum (Kirkland, Burge & Gaston, 1993) is a large dromaeosaurid from the Barremian Yellow Cat Member of the Cedar Mountain Formation, Utah. It combines classic dromaeosaurian traits — a hyperextendable pedal ungual II, grasping manus, and stiffened balancing tail — with a much larger and more robust postcranial skeleton than Deinonychus or Velociraptor. The taxon is central to understanding the upper body-size limit of dromaeosaurids and the evolution of predatory strategy within Paraves.',
    discoveries: [
      { year: 1975, location: 'Utah, USA', discoveredBy: 'Jim Jensen', note: 'Early remains were collected but not immediately recognized as a giant dromaeosaur.' },
      { year: 1993, location: 'Grand County, Utah, USA', discoveredBy: 'James Kirkland, Robert Gaston, and Donald Burge', note: 'The formal description revealed the largest known raptor dinosaur.' },
    ],
    funFact: 'Utahraptor was discovered just in time to influence Jurassic Park marketing, but it was too late to replace the movie\'s oversized \"Velociraptors.\"',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Dromaeosauridae', genus: 'Utahraptor', species: 'U. ostrommaysorum' },
    relatedDinosaurs: [
      { id: 'deinonychus', relationship: 'Close relative' },
      { id: 'velociraptor', relationship: 'Smaller cousin' },
      { id: 'acrocanthosaurus', relationship: 'Contemporary apex predator' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Utah', coordinates: [39.3, -109.3], specimenName: 'Yellow Cat Member, Cedar Mountain Formation' },
    ],
    dangerLevel: 8,
    intelligence: 7,
    birdRelation: 'Utahraptor was a dromaeosaur, part of the same close-to-birds branch as feathered raptors and early birds.'
}
