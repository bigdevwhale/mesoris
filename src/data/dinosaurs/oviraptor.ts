import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Oviraptor: Dinosaur = {
    id: 'oviraptor', slug: 'oviraptor', displayName: 'Oviraptor', name: 'Oviraptor',
    pronunciation: 'OH-vee-RAP-tor', nameMeaning: 'Egg Thief', genusName: 'Oviraptor',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'small', habitat: 'desert',
    livedIn: ['Mongolia'], periodRangeMya: [75, 71],
    dimensions: { lengthMeters: 1.6, heightMeters: 0.6, weightKg: 25, speedKmh: 45 },
    images: { ...img('oviraptor'), video: '/videos/dinosaurs/oviraptor/video.mp4' },
    facts: [
      { label: 'Name', value: 'Unfairly accused!', icon: 'scale', description: 'Named "egg thief" because it was found near eggs — but it was actually BROODING its own nest.' },
      { label: 'Beak', value: 'Toothless parrot-beak', icon: 'nut', description: 'A powerful beak for cracking hard food — nuts, seeds, shellfish, and possibly eggs.' },
      { label: 'Feathers', value: 'Full plumage', icon: 'feather', description: 'Covered in feathers with a fan of tail feathers — looked like a flamboyant ground bird.' },
      { label: 'Crest', value: 'Cassowary-like', icon: 'triangle', description: 'A tall, bony crest on its head like a modern cassowary — a living dinosaur.' },
    ],
    description: 'The most unfairly named dinosaur in history. Oviraptor means "egg thief" — but the first fossil was found protecting its OWN eggs, not stealing them. This beaked, feathered dinosaur was a devoted parent.',
    longDescription: 'Oviraptor is the victim of the worst PR disaster in paleontology. When Roy Chapman Andrews discovered it in 1923 near a nest of eggs, he assumed it was stealing Protoceratops eggs — hence the name "egg thief." Decades later, analysis of the eggs revealed they contained Oviraptor embryos — the dinosaur was brooding its own nest when it died, its arms spread protectively over the eggs. Oviraptor was a feathered, toothless, beaked dinosaur that looked remarkably like a modern cassowary. Its powerful beak suggests an omnivorous diet: seeds, nuts, mollusks, and possibly small vertebrates.',
    kidsDescription: 'Oviraptor got a TERRIBLE nickname! Scientists thought it stole eggs, so they called it "Egg Thief." But guess what? It was actually a GREAT parent, protecting its OWN babies! It was covered in feathers and had a cute toothless beak. The most wrongly accused dinosaur ever!',
    childFriendlyText: 'Oviraptor was named "egg thief" by mistake — it was actually protecting its own eggs! It had feathers, a beak, and was a great parent.',
    scientificSummary: 'Oviraptor philoceratops (Osborn, 1924) is an oviraptorid pennaraptoran theropod from the Campanian Djadochta Formation, Mongolia. Historically mischaracterized as an oviphagous predator, subsequent discoveries demonstrated the type specimen was brooding its own nest of elongatoolithid eggs — representing one of the earliest direct fossil evidences of avian-style parental care in non-avian theropods. Characterized by a toothless beak, a prominent midline cranial crest, and extensive pennaceous feather coverage including a rectricial fan. Omnivorous diet inferred from beak morphology and gastroliths.',
    discoveries: [{ year: 1923, location: 'Gobi Desert, Mongolia', discoveredBy: 'Roy Chapman Andrews', note: 'Found near a nest of eggs — misidentified as an egg thief for 70 years.' }, { year: 1993, location: 'Mongolia', discoveredBy: 'Mark Norell', note: 'Embryo discovery vindicated Oviraptor — it was brooding, not stealing.' }],
    funFact: 'The Oviraptor embryo discovery in 1993 was so dramatic that paleontologist Mark Norell called it "one of the most emotional moments of my career" — vindicating a dinosaur wrongly accused for 70 years.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Oviraptoridae', genus: 'Oviraptor', species: 'O. philoceratops' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Distant relative (maniraptoran)' }, { id: 'protoceratops', relationship: 'Lived alongside (not prey)' }],
    fossilLocations: [{ country: 'Mongolia', region: 'Gobi Desert', coordinates: [44.0, 103.0], specimenName: 'Djadochta Formation' }],
    dangerLevel: 2, intelligence: 7,
  }
