import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Compsognathus: Dinosaur = {
    id: 'compsognathus', slug: 'compsognathus', displayName: 'Compsognathus', name: 'Compsognathus',
    pronunciation: 'komp-SOG-nah-thuss', nameMeaning: 'Elegant Jaw', genusName: 'Compsognathus',
    era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'coastal',
    livedIn: ['Europe'], periodRangeMya: [150, 150],
    dimensions: { lengthMeters: 1.0, heightMeters: 0.3, weightKg: 3, speedKmh: 60 },
    images: img('compsognathus'),
    facts: [
      { label: 'Size', value: 'Chicken-sized', icon: 'ruler', description: 'One of the smallest known dinosaurs — about the size of a chicken.' },
      { label: 'Speed', value: 'Incredibly fast', icon: 'zap', description: 'Long legs and a light body made it one of the fastest dinosaurs — up to 60 km/h.' },
      { label: 'Diet', value: 'Lizards', icon: 'bug', description: 'A fossil specimen was found with a whole lizard in its stomach.' },
      { label: 'Significance', value: 'Bird connection', icon: 'link', description: 'Its bird-like skeleton was key evidence in the early debate about bird-dinosaur evolution.' },
    ],
    description: 'The tiniest terror. Compsognathus was no bigger than a chicken but was a fierce, lightning-fast hunter. One of the smallest known dinosaurs, it scampered along Jurassic beaches chasing lizards.',
    longDescription: 'Compsognathus was a diminutive coelurosaurian theropod from the Late Jurassic of Europe. Only two specimens are known — one from Germany and one from France — but they are among the most complete dinosaur fossils ever found. At roughly one meter in length and weighing only a few kilograms, Compsognathus was one of the smallest known non-avian dinosaurs. Its long, slender hindlimbs indicate remarkable speed, and stomach contents show it preyed on small lizards. Historically, it played an important role in early discussions of dinosaur-bird relationships.',
    kidsDescription: 'The smallest, cutest dinosaur! Compsognathus was about the size of a chicken and could run SUPER fast on its long skinny legs. It chased lizards on sunny Jurassic beaches. Even though it was tiny, it was a fierce little hunter!',
    childFriendlyText: 'Compsognathus was a tiny dinosaur — as small as a chicken! It ran really fast and caught little lizards for dinner on the beach.',
    scientificSummary: 'Compsognathus longipes (Wagner, 1859) is a basal coelurosaurian theropod from the Tithonian Solnhofen Limestone, Germany. Among the smallest non-avian dinosaurs at approximately 1 meter total length and 3 kg body mass. Historically significant as an early comparative anchor for Archaeopteryx in the bird-dinosaur debate. Its extremely gracile hindlimb proportions and avian-like tarsometatarsus reflect exceptional cursoriality among theropods.',
    discoveries: [{ year: 1859, location: 'Bavaria, Germany', discoveredBy: 'Joseph Oberndorfer', note: 'First specimen found in Solnhofen limestone, same deposits as Archaeopteryx.' }],
    funFact: 'Compsognathus lived in the same place and time as Archaeopteryx, the first bird. For a while, scientists confused fossils of the two — they look very similar!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Compsognathidae', genus: 'Compsognathus', species: 'C. longipes' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Distant relative' }],
    fossilLocations: [{ country: 'Germany', region: 'Bavaria', coordinates: [48.8, 11.0], specimenName: 'Solnhofen Limestone' }, { country: 'France', region: 'Provence', coordinates: [43.5, 6.5] }],
    dangerLevel: 1, intelligence: 7,
  }
