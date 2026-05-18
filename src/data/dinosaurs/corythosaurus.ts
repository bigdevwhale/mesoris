import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Corythosaurus: Dinosaur = {
    id: 'corythosaurus', slug: 'corythosaurus', displayName: 'Corythosaurus', name: 'Corythosaurus',
    pronunciation: 'koh-RITH-oh-SORE-us', nameMeaning: 'Helmet Lizard', genusName: 'Corythosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [77, 75],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.0, weightKg: 3500, speedKmh: 35 },
    images: img('corythosaurus'),
    facts: [
      { label: 'Crest', value: 'Helmet-shaped', icon: 'shield', description: 'A tall, helmet-like hollow crest — like a Corinthian soldier\'s helmet made of bone.' },
      { label: 'Sound', value: 'Resonant calls', icon: 'music', description: 'The crest contained complex airways for producing loud, resonant calls.' },
      { label: 'Social', value: 'Herds', icon: 'users', description: 'Lived in big social groups — the duck-billed version of a wildebeest herd.' },
    ],
    description: 'The dinosaur with a Corinthian helmet. Corythosaurus had one of the most elegant crests of any hadrosaur — a tall, rounded hollow structure that looked like an ancient Greek warrior\'s helmet.',
    longDescription: 'Corythosaurus was a lambeosaurine hadrosaur that lived in the rich Campanian ecosystems of what is now Alberta. Its most distinctive feature was the large, helmet-shaped hollow crest, which housed complex nasal passages that acted as a resonance chamber for vocal communication. Like other hadrosaurs, Corythosaurus had a complex dental battery with hundreds of teeth for grinding tough vegetation. It was a large, social herbivore that likely migrated in herds across the coastal plains of the Western Interior Seaway.',
    kidsDescription: 'Picture a dinosaur wearing a fancy Greek helmet made of bone! That\'s Corythosaurus! The helmet was actually hollow inside, like a trombone. It could make loud, deep sounds to call to its friends across the forest!',
    childFriendlyText: 'Corythosaurus had a fancy helmet made of bone on its head! Inside it was hollow and it could make loud noises to talk to other dinosaurs.',
    scientificSummary: 'Corythosaurus casuarius (Brown, 1914) is a lambeosaurine hadrosaurid from the Campanian Dinosaur Park Formation, Alberta. Distinguished by a tall, laterally compressed hollow cranial crest with a complex looping nasal passage observable through CT tomography. Computed acoustic models indicate resonance properties optimized for species-specific vocalization in forested environments. Soft tissue impressions show a tail with a skin frill, one of the first such discoveries for hadrosaurs.',
    discoveries: [{ year: 1912, location: 'Alberta, Canada', discoveredBy: 'Barnum Brown', note: 'First complete skeleton discovered during an AMNH expedition.' }],
    funFact: 'A Corythosaurus specimen was lost when a WWI German ship sank the transport carrying it to England. It rests somewhere on the bottom of the Atlantic Ocean.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Lambeosaurinae', genus: 'Corythosaurus', species: 'C. casuarius' },
    relatedDinosaurs: [{ id: 'parasaurolophus', relationship: 'Close relative' }, { id: 'lambeosaurus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5], specimenName: 'Dinosaur Park Formation' }],
    dangerLevel: 2, intelligence: 5,
  }
