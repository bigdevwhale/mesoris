import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Lambeosaurus: Dinosaur = {
    id: 'lambeosaurus', slug: 'lambeosaurus', displayName: 'Lambeosaurus', name: 'Lambeosaurus',
    pronunciation: 'LAM-bee-oh-SORE-us', nameMeaning: 'Lambe\'s Lizard', genusName: 'Lambeosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [76, 75],
    dimensions: { lengthMeters: 9.5, heightMeters: 2.5, weightKg: 4000, speedKmh: 32 },
    images: img('lambeosaurus'),
    facts: [
      { label: 'Crest', value: 'Hatchet-shaped', icon: 'triangle', description: 'A distinctive hatchet-shaped hollow crest — pointed forward, unique among hadrosaurs.' },
      { label: 'Size', value: 'Up to 15m', icon: 'maximize', description: 'Some specimens suggest it could reach 15 meters — among the largest hadrosaurs.' },
      { label: 'Senses', value: 'Keen hearing', icon: 'ear', description: 'Had excellent hearing — the crest helped amplify and direct sound for communication.' },
    ],
    description: 'The hatchet-crested giant. Lambeosaurus was one of the largest duck-billed hadrosaurs, with a distinctive forward-pointing hollow crest shaped like a hatchet — used for species recognition and loud calls.',
    longDescription: 'Lambeosaurus was a large lambeosaurine hadrosaur — the group that gives the subfamily its name. Its most distinctive feature was its hollow, hatchet-shaped cranial crest that pointed forward over the snout. Like its relatives Parasaurolophus and Corythosaurus, the crest was an acoustic resonator: the complex internal nasal passages looped through it, amplifying and modulating vocalizations. With its well-developed inner ear structure and enlarged cochlea, Lambeosaurus had exceptionally keen hearing among dinosaurs — it could both produce and detect species-specific calls across long distances in forested environments.',
    kidsDescription: 'Lambeosaurus is like the BIG brother of Parasaurolophus! It had a hollow crest shaped like a hatchet sticking forward from its head. It could make LOUD calls through the crest and had super-sharp hearing to hear its friends from far away. The ultimate dino communicator!',
    childFriendlyText: 'Lambeosaurus had a funny hatchet-shaped crest on its head. It used it to make loud calls and hear its dinosaur friends from far away.',
    scientificSummary: 'Lambeosaurus lambei (Parks, 1923) is the type genus of Lambeosaurinae, from the Campanian Dinosaur Park Formation, Alberta. Characterized by a prominent, anteriorly-directed hollow cranial crest with an enclosed, complexly looped nasal passage. Cochlear morphology indicates high auditory acuity, suggesting elaboration of species-specific acoustic communication. Ontogenetic crest development follows a predictable sequence: absent in juveniles, developing as a small bump in subadults, and fully elaborated in sexually mature adults.',
    discoveries: [{ year: 1889, location: 'Alberta, Canada', discoveredBy: 'Lawrence Lambe', note: 'First specimen discovered.' }, { year: 1923, location: 'Alberta, Canada', discoveredBy: 'William Parks', note: 'Complete crest-bearing skeleton named.' }],
    funFact: 'Lambeosaurus is one of the few dinosaurs where we can tell males from females — the crest shape and size differ between sexes, a rarity in the fossil record.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Lambeosaurinae', genus: 'Lambeosaurus', species: 'L. lambei' },
    relatedDinosaurs: [{ id: 'parasaurolophus', relationship: 'Close relative' }, { id: 'corythosaurus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5], specimenName: 'Dinosaur Park Formation' }],
    dangerLevel: 2, intelligence: 5,
  }
