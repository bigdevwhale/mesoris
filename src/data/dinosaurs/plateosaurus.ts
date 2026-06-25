import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Plateosaurus: Dinosaur = {
    id: 'plateosaurus', slug: 'plateosaurus', displayName: 'Plateosaurus', name: 'Plateosaurus',
    pronunciation: 'PLAT-ee-oh-SORE-us', nameMeaning: 'Flat Lizard', genusName: 'Plateosaurus',
    era: 'triassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
    livedIn: ['Europe'], periodRangeMya: [214, 204],
    dimensions: { lengthMeters: 8.0, heightMeters: 2.2, weightKg: 4000, speedKmh: 15 },
    images: { ...img('plateosaurus'), video: '/videos/dinosaurs/plateosaurus/video.mp4' },
    facts: [
      { label: 'Ancestry', value: 'Sauropod ancestor', icon: 'git-branch', description: 'An early ancestor of the giant sauropods — the prototype for Brachiosaurus and Diplodocus.' },
      { label: 'Posture', value: 'Bipedal or quadrupedal', icon: 'redo', description: 'Could walk on two legs to reach high plants or drop to all fours for grazing.' },
      { label: 'Abundance', value: 'Very common', icon: 'archive', description: 'Over 100 skeletons found in Germany — one of the best-known Triassic dinosaurs.' },
      { label: 'Hands', value: 'Grasping thumb', icon: 'hand', description: 'A large thumb claw for grasping branches — not yet evolved into the weight-bearing pillar of sauropods.' },
    ],
    description: 'The grandfather of giants. Plateosaurus was the early ancestor of all sauropods — a versatile, adaptable herbivore that showed the first signs of the long-necked body plan that would later dwarf all other land animals.',
    longDescription: 'Plateosaurus is one of the most important dinosaurs for understanding sauropod evolution. It represents an early "prosauropod" — a transitional form between the small, bipedal ancestors of sauropods and the gigantic quadrupedal titans that followed. Its anatomy shows remarkable adaptability: it could walk on two or four legs, reach high into trees or graze low vegetation, and had a long neck that foreshadowed the extreme elongation of its descendants. The enormous number of Plateosaurus specimens from southern Germany — over 100 individuals — makes it one of the best-documented dinosaurs, providing rare insight into Triassic dinosaur biology, growth, and variation.',
    kidsDescription: 'Plateosaurus was the great-great-great-grandpa of ALL giant long-necked dinosaurs! It was the first to try out having a long neck. It could walk on two legs OR four legs — whatever was easier. It was like a Swiss Army knife dinosaur — ready for anything!',
    childFriendlyText: 'Plateosaurus was the ancestor of giant long-necked dinosaurs! It was the first one to grow a long neck and try living big.',
    scientificSummary: 'Plateosaurus engelhardti (Meyer, 1837) is a plateosaurid basal sauropodomorph from the Norian of central Europe. One of the earliest large-bodied dinosaurs (~8m), representing a critical transitional grade in sauropodomorph evolution. Exhibits a facultatively bipedal posture with a proportionally elongated neck, a robust pelvic girdle, and a manus retaining a well-developed grasping digit I — foreshadowing sauropod quadrupedality while retaining primitive bipedal capabilities. Growth series from over 100 specimens document high intraspecific variability and rapid growth rates approaching those of later sauropods.',
    discoveries: [{ year: 1834, location: 'Bavaria, Germany', discoveredBy: 'Johann Friedrich Engelhardt', note: 'First fossils discovered — among the earliest dinosaur finds in continental Europe.' }, { year: 1911, location: 'Trossingen, Germany', discoveredBy: 'Eberhard Fraas', note: 'Mass burial site with dozens of skeletons.' }],
    funFact: 'Over 100 Plateosaurus skeletons have been found in southern Germany — so many that you can see them in museums across Europe. It\'s one of the best-known dinosaurs in the world!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Plateosauridae', genus: 'Plateosaurus', species: 'P. engelhardti' },
    relatedDinosaurs: [{ id: 'brachiosaurus', relationship: 'Descendant' }, { id: 'diplodocus', relationship: 'Descendant' }],
    fossilLocations: [{ country: 'Germany', region: 'Trossingen', coordinates: [48.1, 8.8], specimenName: 'Knollenmergel Member' }, { country: 'Germany', region: 'Bavaria', coordinates: [49.5, 11.0] }],
    dangerLevel: 3, intelligence: 3,
  }
