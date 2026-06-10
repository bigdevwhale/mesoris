import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Zarafasaura: Dinosaur = {
  id: 'zarafasaura', slug: 'zarafasaura', displayName: 'Zarafasaura', name: 'Zarafasaura',
  pronunciation: 'zah-RAH-fah-SOR-ah', nameMeaning: 'Zarafa Lizard', genusName: 'Zarafasaura',
  era: 'cretaceous', diet: 'carnivore', category: 'marine-reptile', size: 'medium', habitat: 'ocean',
  livedIn: ['Africa'], periodRangeMya: [72, 66],
  dimensions: { lengthMeters: 5.0, heightMeters: 0.7, weightKg: 800, speedKmh: 18 },
  images: img('zarafasaura'),
  facts: [
    { label: 'Name', value: 'Zarafa lizard', icon: 'star', description: 'Named after the Moroccan town of Zarafa and the local Berber word for "giraffe" — a nod to its very long neck.' },
    { label: 'Group', value: 'Elasmosaurid', icon: 'arrow-up', description: 'A long-necked elasmosaurid plesiosaur — related to the famous Elasmosaurus of North America.' },
    { label: 'Origin', value: 'Morocco', icon: 'map-pin', description: 'Discovered in the phosphates of the Oulad Abdoun Basin in Morocco — a Cretaceous marine treasury.' },
    { label: 'Neck', value: 'Very long', icon: 'arrow-up', description: 'A long neck with over 50 cervical vertebrae, used to ambush schools of fish.' },
  ],
  description: 'Zarafasaura was a long-necked elasmosaurid plesiosaur from the Late Cretaceous seas of Morocco — a graceful swimmer with a long giraffe-like neck and the body of a small whale.',
  longDescription: 'Zarafasaura oceanis (Vincent, Bardet, Suberbiola, Bouya, Amaghzaz & Meslouh, 2011) is a small elasmosaurid plesiosaur from the Maastrichtian (Upper Cretaceous) of the Oulad Abdoun Basin, Morocco. Known from a partial skull, cervical vertebrae, and other postcranial elements, Zarafasaura is one of several plesiosaurs discovered in the Moroccan phosphate beds — a globally important Late Cretaceous marine fossil site. The genus name combines "Zarafa" (the name of a Moroccan locality) with the Greek "saura" (lizard); the species name oceanis refers to its marine lifestyle. Zarafasaura\'s neck contains many cervical vertebrae, characteristic of the long-necked elasmosaurid body plan. Like other elasmosaurids, it likely used its long neck to stealthily approach schools of fish in the Cretaceous seaway covering North Africa. The Moroccan phosphates were deposited in a shallow epicontinental sea connected to the Atlantic and Tethys, and the fauna is dominated by plesiosaurs, mosasaurs, sea turtles, and sharks. Zarafasaura is one of the smaller elasmosaurids, reaching perhaps 5–6 metres — modest compared to giant elasmosaurids like Elasmosaurus.',
  kidsDescription: 'Zarafasaura was a long-necked sea reptile from the Late Cretaceous — a cousin of the famous Elasmosaurus but smaller, with a long giraffe-like neck for sneaking up on fish! It was found in Morocco!',
  childFriendlyText: 'Zarafasaura was a long-necked plesiosaur from Morocco. It had a long neck like a sea-serpent and lived in the Late Cretaceous ocean.',
  scientificSummary: 'Zarafasaura oceanis (Vincent et al., 2011) is an elasmosaurid plesiosaur from the Maastrichtian phosphates of the Oulad Abdoun Basin, Morocco. Small-bodied (~5 m). Long-necked plesiosaur with numerous cervical vertebrae, characteristic of elasmosaurid ambush feeding ecology. One of several plesiosaurs from the Moroccan phosphate deposits.',
  discoveries: [
    { year: 2011, location: 'Oulad Abdoun Basin, Morocco', discoveredBy: 'Peggy Vincent and team', note: 'Partial skull and cervical vertebrae described and named.' },
  ],
  funFact: 'The name "Zarafasaura" was given because the fossil was found near a Moroccan locality called "Zarafa" — which also happens to mean "giraffe" in the local language, a perfect name for a long-necked plesiosaur!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Sauropterygia', order: 'Plesiosauria', suborder: '', family: 'Elasmosauridae', genus: 'Zarafasaura', species: 'Z. oceanis' },
  relatedDinosaurs: [
    { id: 'elasmosaurus', relationship: 'Larger elasmosaurid cousin' },
    { id: 'plesiosaurus', relationship: 'Long-necked plesiosaur relative' },
    { id: 'mosasaurus', relationship: 'Contemporary marine predator' },
  ],
  fossilLocations: [
    { country: 'Morocco', region: 'Oulad Abdoun Basin', coordinates: [33.0, -6.8], specimenName: 'OCP DEK/GE 307 — holotype partial skull and vertebrae' },
  ],
  dangerLevel: 5, intelligence: 4,
}
