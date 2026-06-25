import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Maiasaura: Dinosaur = {
    id: 'maiasaura', slug: 'maiasaura', displayName: 'Maiasaura', name: 'Maiasaura',
    pronunciation: 'MY-ah-SORE-ah', nameMeaning: 'Good Mother Lizard', genusName: 'Maiasaura',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [80, 75],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.3, weightKg: 3000, speedKmh: 35 },
    images: { ...img('maiasaura'), video: '/videos/dinosaurs/maiasaura/video.mp4' },
    facts: [
      { label: 'Parenting', value: 'First evidence', icon: 'baby', description: 'First dinosaur proven to care for its young — nests, eggs, and babies found together.' },
      { label: 'Colony', value: 'Mass nesting', icon: 'home', description: 'Nesting colonies covered acres — thousands of dinosaurs nested together like seabirds.' },
      { label: 'Babies', value: 'Altricial young', icon: 'egg', description: 'Babies couldn\'t walk well at first — parents brought food to the nest.' },
      { label: 'Growth', value: 'Rapid', icon: 'trending-up', description: 'Babies grew from 40 cm to adult size in just 7-8 years — incredibly fast.' },
    ],
    description: 'The dinosaur that proved dinosaurs were good parents. Maiasaura means "Good Mother Lizard" — it was the first dinosaur discovered with evidence of parental care, nesting colonies, and babies fed at the nest.',
    longDescription: 'Maiasaura revolutionized our understanding of dinosaur behavior. When Jack Horner discovered vast nesting colonies in Montana\'s Two Medicine Formation in 1978, it was the first clear evidence that some dinosaurs cared for their young for extended periods. The nests contained eggshell fragments trampled by baby feet, showing the young stayed in the nest after hatching, being fed by parents. Maiasaura nested in enormous colonies covering acres of ground, returning to the same sites year after year — much like modern seabird colonies. This discovery fundamentally changed perceptions of dinosaurs from lumbering, cold-blooded reptiles to complex, social, caring animals.',
    kidsDescription: 'Maiasaura was a SUPER MOM dinosaur! The best mom of the dinosaur world. It built nests for its babies, brought them food, and protected them until they were big enough. Whole families lived together in giant dinosaur neighborhoods with thousands of nests!',
    childFriendlyText: 'Maiasaura was the best dinosaur mom! It built nests, fed its babies, and protected them. Whole families lived together in big neighborhoods.',
    scientificSummary: 'Maiasaura peeblesorum (Horner & Makela, 1979) is a saurolophine hadrosaurid from the Campanian Two Medicine Formation, Montana. The first dinosaur taxon for which extended parental care was definitively demonstrated, based on the "Egg Mountain" nesting colony preserving nests, eggs, hatchlings, and juveniles of multiple ontogenetic stages in stratigraphic succession. Long-bone histological study reveals rapid growth reaching adult size in 7-8 years, with a sexually mature growth plateau. This discovery provided foundational evidence for the avian-like life history strategies of dinosaurs.',
    discoveries: [{ year: 1978, location: 'Montana, USA', discoveredBy: 'Jack Horner', note: 'The "Egg Mountain" nesting colony — revolutionised views on dinosaur behavior.' }],
    funFact: 'The Maiasaura discovery in 1978 was so important that Montana made it the official STATE DINOSAUR — the first state dinosaur in the US.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Saurolophinae', genus: 'Maiasaura', species: 'M. peeblesorum' },
    relatedDinosaurs: [{ id: 'edmontosaurus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'USA', region: 'Montana', coordinates: [48.0, -112.0], specimenName: 'Egg Mountain, Two Medicine Formation' }],
    dangerLevel: 1, intelligence: 5,
  }
