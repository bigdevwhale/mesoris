import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Stegosaurus: Dinosaur = {
    id: 'stegosaurus',
    slug: 'stegosaurus',
    displayName: 'Stegosaurus',
    name: 'Stegosaurus',
    pronunciation: 'STEG-oh-SORE-us',
    nameMeaning: 'Roof Lizard',
    genusName: 'Stegosaurus',
    era: 'jurassic',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'large',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [155, 150],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.7, weightKg: 3500, speedKmh: 10 },
    images: { ...img('stegosaurus'), video: '/videos/dinosaurs/stegosaurus/video.mp4' },
    facts: [
      { label: 'Plates', value: '17 plates', icon: 'layers', description: 'Large, diamond-shaped bony plates along its back — likely for display and temperature control.' },
      { label: 'Tail Spikes', value: '4 spikes', icon: 'swords', description: 'A deadly weapon called a "thagomizer" — each spike up to 1 meter long.' },
      { label: 'Brain', value: 'Walnut-sized', icon: 'brain', description: 'Had one of the smallest brain-to-body ratios of any dinosaur.' },
      { label: 'Second Brain', value: 'Just a myth!', icon: 'help-circle', description: 'Scientists once thought it had a second brain in its hips — turns out it was just a glycogen body.' },
    ],
    description: 'The armored tank with a walnut-sized brain. Stegosaurus is instantly recognizable by its row of large bony plates and deadly spiked tail. It was a peaceful plant-eater that could defend itself fiercely.',
    longDescription: 'Stegosaurus was a herbivorous dinosaur that lived during the Late Jurassic Period in what is now western North America. Its most striking features were the alternating rows of large, kite-shaped bony plates along its back and the four sharp spikes at the tip of its tail. The plates were likely used for display, species recognition, and thermoregulation — acting as natural radiators to regulate body temperature.',
    kidsDescription: 'This dinosaur looks like it\'s wearing a spiky armor suit! It had big flat plates standing up on its back — like a row of giant shields. And at the end of its tail? FOUR huge sharp spikes to whack any dinosaur that tried to attack it!',
    childFriendlyText: 'Stegosaurus had cool diamond-shaped plates on its back and four sharp spikes on its tail. Its brain was tiny — about the size of a walnut!',
    scientificSummary: 'Stegosaurus stenops (Marsh, 1877) is a stegosaurid thyreophoran from the Kimmeridgian of the Morrison Formation. Characterized by alternating parasagittal rows of hypertrophied osteoderms (plates) and a terminal tail spike array (thagomizer). Plate histology reveals extensive vascularization consistent with thermoregulatory and display functions rather than primary defense. Its encephalization quotient is among the lowest measured for any dinosaur.',
    discoveries: [
      { year: 1877, location: 'Colorado, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First Stegosaurus fossils described from the Morrison Formation.' },
      { year: 2003, location: 'Wyoming, USA', discoveredBy: 'Bob Simon', note: '"Sophie" — the most complete Stegosaurus skeleton ever found.' },
    ],
    funFact: 'Stegosaurus lived so long before T. rex that there is MORE time between Stegosaurus and T. rex (80 million years) than between T. rex and humans (66 million years).',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Stegosaurus', species: 'S. stenops' },
    relatedDinosaurs: [
      { id: 'allosaurus', relationship: 'Predator' },
      { id: 'diplodocus', relationship: 'Contemporary' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Colorado', coordinates: [39.5, -105.0], specimenName: 'Morrison Formation' },
      { country: 'USA', region: 'Wyoming', coordinates: [43.0, -107.5] },
    ],
    dangerLevel: 5,
    intelligence: 2,
  }
