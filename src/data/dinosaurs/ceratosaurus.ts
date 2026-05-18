import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Ceratosaurus: Dinosaur = {
    id: 'ceratosaurus', slug: 'ceratosaurus', displayName: 'Ceratosaurus', name: 'Ceratosaurus',
    pronunciation: 'seh-RAT-oh-SORE-us', nameMeaning: 'Horned Lizard', genusName: 'Ceratosaurus',
    era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
    livedIn: ['North America', 'Europe', 'Africa'], periodRangeMya: [155, 150],
    dimensions: { lengthMeters: 7.0, heightMeters: 2.0, weightKg: 1000, speedKmh: 35 },
    images: img('ceratosaurus'),
    facts: [
      { label: 'Horn', value: 'Nasal blade', icon: 'triangle', description: 'A prominent blade-like nasal horn — possibly for display or intraspecific combat.' },
      { label: 'Armor', value: 'Osteoderms', icon: 'shield', description: 'Had a row of small bony plates down its back — unusual for a theropod.' },
      { label: 'Tail', value: 'Deep and flexible', icon: 'fish-tail', description: 'A crocodile-like deep tail that might have helped it swim.' },
      { label: 'Teeth', value: 'Extra-long', icon: 'swords', description: 'Exceptionally long, blade-like teeth — proportionally larger than most predators.' },
    ],
    description: 'The horned shadow of the Jurassic. Ceratosaurus was smaller than Allosaurus but more bizarre — with a blade-like horn on its nose, armored back, and an unusually deep tail. A unique predator that carved its own niche.',
    longDescription: 'Ceratosaurus was a medium-sized theropod that lived alongside the much larger Allosaurus in Late Jurassic North America. It may have avoided direct competition by occupying a different ecological niche — its deep, flexible tail and elongated teeth suggest it might have been partially aquatic, hunting fish and smaller prey in rivers and wetlands. Its most distinctive feature, a large blade-like nasal horn, was likely too fragile for combat and probably served as a display structure.',
    kidsDescription: 'Ceratosaurus was like a dinosaur with a rhino horn on its nose! But the horn was probably just for showing off, not fighting. It was smaller than Allosaurus and maybe liked swimming in rivers to catch fish!',
    childFriendlyText: 'Ceratosaurus had a cool horn on its nose and loved splashing in rivers to find food! It was a smaller, quirkier cousin of the bigger Jurassic hunters.',
    scientificSummary: 'Ceratosaurus nasicornis (Marsh, 1884) is a basal ceratosaurian theropod from the Kimmeridgian Morrison Formation. Distinguished by a prominent midline nasal horn core, parasagittal rows of dermal osteoderms, and proportionally hypertrophied maxillary dentition. Represents a phylogenetically conservative theropod lineage persisting among more derived contemporaries. Dental microwear and postcranial morphology suggest niche partitioning from sympatric Allosaurus via piscivory.',
    discoveries: [{ year: 1883, location: 'Colorado, USA', discoveredBy: 'Marshall P. Felch', note: 'First skeleton discovered in Garden Park.' }, { year: 2000, location: 'Portugal', discoveredBy: 'Octavio Mateus', note: 'European specimen confirmed the genus\' wide range.' }],
    funFact: 'Ceratosaurus appeared in the very first live-action dinosaur film in 1914 — D.W. Griffith\'s "Brute Force" — decades before Jurassic Park.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Ceratosauridae', genus: 'Ceratosaurus', species: 'C. nasicornis' },
    relatedDinosaurs: [{ id: 'allosaurus', relationship: 'Competitor' }, { id: 'carnotaurus', relationship: 'Distant relative' }],
    fossilLocations: [{ country: 'USA', region: 'Colorado', coordinates: [38.5, -105.0], specimenName: 'Morrison Formation' }, { country: 'Portugal', region: 'Lourinhã', coordinates: [39.3, -9.3] }],
    dangerLevel: 7, intelligence: 5,
  }
