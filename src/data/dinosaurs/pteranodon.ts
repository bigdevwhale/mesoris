import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pteranodon: Dinosaur = {
    id: 'pteranodon',
    slug: 'pteranodon',
    displayName: 'Pteranodon',
    name: 'Pteranodon',
    pronunciation: 'ter-AN-oh-don',
    nameMeaning: 'Winged and Toothless',
    genusName: 'Pteranodon',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'flying-reptile',
    size: 'medium',
    habitat: 'coastal',
    livedIn: ['North America'],
    periodRangeMya: [86, 84],
    dimensions: { lengthMeters: 2.0, heightMeters: 1.8, weightKg: 25, speedKmh: 55 },
    images: img('pteranodon'),
    facts: [
      { label: 'Wingspan', value: '7 meters', icon: 'bird', description: 'A wingspan wider than a small plane — nearly the width of a tennis court.' },
      { label: 'Weight', value: 'Only 25 kg', icon: 'feather', description: 'Incredibly lightweight for its size — hollow bones like a modern bird.' },
      { label: 'Not a Dinosaur', value: 'Pterosaur', icon: 'help-circle', description: 'Actually a flying reptile (pterosaur), not technically a dinosaur — but lived alongside them.' },
      { label: 'Diet', value: 'Fish-eater', icon: 'fish', description: 'Soared over the Western Interior Seaway scooping up fish with its long beak.' },
    ],
    description: 'King of the prehistoric skies! Pteranodon soared above the Cretaceous seas on wings wider than a small airplane. It wasn\'t technically a dinosaur, but it ruled the skies while dinosaurs ruled the land.',
    longDescription: 'Pteranodon was a genus of large pterosaur that flew over the shallow seas of Late Cretaceous North America. With a wingspan reaching up to 7 meters, it was one of the largest flying animals ever. Unlike birds, Pteranodon\'s wings were formed by a membrane of skin and muscle stretching from an elongated fourth finger to its legs. Males had significantly larger crests than females — the first evidence of sexual dimorphism in pterosaurs.',
    kidsDescription: 'Look up in the sky — it\'s a bird, it\'s a plane, it\'s... Pteranodon! This flying wonder had wings wider than a minibus. It could fly for hours without flapping, gliding over the ocean like a paper airplane!',
    childFriendlyText: 'Pteranodon was a giant flying reptile with huge wings! It flew over the ocean catching fish and wasn\'t actually a dinosaur — it was a pterosaur!',
    scientificSummary: 'Pteranodon longiceps (Marsh, 1876) is a pteranodontid pterodactyloid pterosaur from the Coniacian-Santonian Niobrara Chalk, Kansas. Wingspans reaching 7m make it among the largest volant animals known. Exhibits pronounced sexual dimorphism in cranial crest size. Soaring specialist with high-aspect-ratio wings adapted for dynamic thermal soaring over the Western Interior Seaway. Toothless beak morphology indicates exclusive piscivory.',
    discoveries: [
      { year: 1870, location: 'Kansas, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First Pteranodon fossils found.' },
      { year: 1876, location: 'Kansas, USA', discoveredBy: 'S. W. Williston', note: 'Complete skull revealing the dramatic head crest.' },
    ],
    funFact: 'Pteranodon\'s skull crest was so large that when the first fossil was found, the discoverer thought it was part of a completely different animal.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Pteranodontidae', genus: 'Pteranodon', species: 'P. longiceps' },
    relatedDinosaurs: [
      { id: 'quetzalcoatlus', relationship: 'Larger relative' },
      { id: 'pterodactylus', relationship: 'Smaller relative' },
      { id: 'mosasaurus', relationship: 'Shared ecosystem' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Kansas', coordinates: [38.5, -98.5], specimenName: 'Niobrara Chalk' },
    ],
    dangerLevel: 2,
    intelligence: 5,
  }
