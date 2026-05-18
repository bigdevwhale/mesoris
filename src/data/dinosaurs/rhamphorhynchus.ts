import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Rhamphorhynchus: Dinosaur = {
    id: 'rhamphorhynchus', slug: 'rhamphorhynchus', displayName: 'Rhamphorhynchus', name: 'Rhamphorhynchus',
    pronunciation: 'RAM-foh-RINK-us', nameMeaning: 'Beak Snout', genusName: 'Rhamphorhynchus',
    era: 'jurassic', diet: 'carnivore', category: 'flying-reptile', size: 'small', habitat: 'coastal',
    livedIn: ['Europe'], periodRangeMya: [150, 148],
    dimensions: { lengthMeters: 1.3, heightMeters: 0.2, weightKg: 1.5, speedKmh: 45 },
    images: img('rhamphorhynchus'),
    facts: [
      { label: 'Tail', value: 'Diamond vane', icon: 'diamond', description: 'A long stiff tail tipped with a diamond-shaped vane — a built-in rudder for aerial steering.' },
      { label: 'Teeth', value: 'Needle-like', icon: 'triangle', description: 'Forward-pointing needle teeth for spearing fish — the Jurassic kingfisher.' },
      { label: 'Preservation', value: 'Exceptional', icon: 'scroll', description: 'Some of the best-preserved pterosaurs ever — with wing membranes and throat pouches visible.' },
    ],
    description: 'The Jurassic kingfisher with a diamond-studded tail. Rhamphorhynchus was a long-tailed pterosaur that darted over ancient seas spearing fish with needle teeth. Some fossils are so perfect we can see every detail of its wings, tail, and even throat pouch.',
    longDescription: 'Rhamphorhynchus is one of the best-known pterosaurs thanks to the extraordinary preservation of the Solnhofen limestone — fossils preserve soft tissue outlines of the wing membrane (cheiropatagium), a throat pouch (gular sac), and the iconic tail with its terminal diamond-shaped vane. This long, stiffened tail was a unique feature of early pterosaurs: it functioned as a dynamic flight stabilizer, allowing tight maneuvering during low-altitude hunting flights over water. Its forward-pointing needle teeth suggest it skimmed or snatched fish from the water surface — a Jurassic kingfisher writ large.',
    kidsDescription: 'Rhamphorhynchus was a super cool flying reptile with a long tail that had a DIAMOND shape at the end — like a kite tail for steering in the air! It flew over the ocean like a kingfisher bird, catching fish with needle-sharp teeth. We know SO much about it because the fossils are amazingly perfect!',
    childFriendlyText: 'Rhamphorhynchus had a long tail with a diamond shape at the end. It flew over the ocean catching fish with needle-sharp teeth!',
    scientificSummary: 'Rhamphorhynchus muensteri (Goldfuss, 1831) is a rhamphorhynchid basal pterosaur from the Tithonian Solnhofen Limestone, Germany. Characterized by an elongate, caudally-stiffened tail bearing a terminal rhomboidal soft tissue vane, forward-projecting needle-like teeth adapted for aerial piscivory, and one of the most complete pterosaur fossil records — preserving cheiropatagium, brachiopatagium, uropatagium, and a gular sac as soft tissue impressions. Growth series demonstrate positive allometry of the skull relative to body size through ontogeny.',
    discoveries: [{ year: 1830, location: 'Bavaria, Germany', discoveredBy: 'Georg August Goldfuss', note: 'First described from the Solnhofen quarries, alongside Archaeopteryx.' }],
    funFact: 'Some Rhamphorhynchus fossils preserve the contents of their throat pouches — showing they caught and momentarily stored fish in a pelican-like gullet before swallowing.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: '', suborder: '', family: 'Rhamphorhynchidae', genus: 'Rhamphorhynchus', species: 'R. muensteri' },
    relatedDinosaurs: [{ id: 'pterodactylus', relationship: 'Contemporary' }, { id: 'dimorphodon', relationship: 'Earlier relative' }],
    fossilLocations: [{ country: 'Germany', region: 'Bavaria', coordinates: [48.9, 11.0], specimenName: 'Solnhofen Limestone' }],
    dangerLevel: 1, intelligence: 4,
  }
