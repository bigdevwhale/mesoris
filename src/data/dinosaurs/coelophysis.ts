import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Coelophysis: Dinosaur = {
    id: 'coelophysis', slug: 'coelophysis', displayName: 'Coelophysis', name: 'Coelophysis',
    pronunciation: 'SEE-lo-FYE-sis', nameMeaning: 'Hollow Form', genusName: 'Coelophysis',
    era: 'triassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'desert',
    livedIn: ['North America'], periodRangeMya: [228, 201],
    dimensions: { lengthMeters: 3.0, heightMeters: 0.8, weightKg: 25, speedKmh: 45 },
    images: img('coelophysis'),
    facts: [
      { label: 'Age', value: 'Triassic pioneer', icon: 'clock', description: 'One of the earliest dinosaurs — lived over 220 million years ago, when dinosaurs were new.' },
      { label: 'Bones', value: 'Hollow', icon: 'feather', description: 'Its name means "hollow form" — its bones were hollow like a bird, making it light and fast.' },
      { label: 'Mass Grave', value: 'Hundreds at Ghost Ranch', icon: 'archive', description: 'Thousands of skeletons found at Ghost Ranch, New Mexico — a dinosaur graveyard.' },
      { label: 'Cannibalism', value: 'Debated', icon: 'skull', description: 'Small bones in stomach areas suggested cannibalism — but it may have been from fish, not babies.' },
    ],
    description: 'The dawn dinosaur. Coelophysis was one of the very first true dinosaurs, a slender, fast predator that hunted in the Triassic deserts over 220 million years ago. Its gracile, bird-like form was the blueprint for all theropods to come.',
    longDescription: 'Coelophysis is one of the earliest known true dinosaurs, living during the Late Triassic when dinosaurs were still establishing themselves as the dominant land animals. It was a slender, lightweight predator with hollow bones, a long neck, and a gracile build that foreshadowed the body plan of all later theropods. The extraordinary concentration of hundreds of well-preserved skeletons at Ghost Ranch, New Mexico provides rare insight into Triassic dinosaur behavior, growth, and population structure. It was among the first dinosaurs to evolve the avian-like features that would characterize the theropod lineage.',
    kidsDescription: 'Coelophysis was one of the VERY FIRST dinosaurs! It lived when dinosaurs were brand new, before T-Rex or Triceratops existed. It was skinny and fast, with hollow bones — like a bird. Scientists found hundreds of them together in the desert!',
    childFriendlyText: 'Coelophysis was one of the first dinosaurs ever! It was skinny and fast, lived in the desert, and had bones full of air like a bird.',
    scientificSummary: 'Coelophysis bauri (Cope, 1889) is a basal coelophysoid neotheropod from the Rhaetian-Norian Chinle Formation, New Mexico. Among the earliest well-known theropods, predicated at ~220 Ma. Characterized by a lightly-built, gracile bauplan with extensive axial pneumaticity, an elongated cervical series, and a furcula — one of the earliest appearances of the wishbone in the dinosaur lineage. The Ghost Ranch bonebed represents one of the largest monospecific theropod assemblages known, providing invaluable taphonomic and populational data.',
    discoveries: [{ year: 1881, location: 'New Mexico, USA', discoveredBy: 'David Baldwin', note: 'First specimen found in Triassic deposits.' }, { year: 1947, location: 'Ghost Ranch, New Mexico, USA', discoveredBy: 'Edwin Colbert', note: 'Massive bonebed with hundreds of complete skeletons discovered.' }],
    funFact: 'Coelophysis was one of the first dinosaurs in SPACE — a Coelophysis skull was taken aboard the Space Shuttle Endeavour in 1998.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Coelophysidae', genus: 'Coelophysis', species: 'C. bauri' },
    relatedDinosaurs: [{ id: 'herrerasaurus', relationship: 'Contemporary' }, { id: 'eoraptor', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'USA', region: 'New Mexico', coordinates: [36.3, -106.0], specimenName: 'Ghost Ranch, Chinle Formation' }],
    dangerLevel: 4, intelligence: 5,
  }
