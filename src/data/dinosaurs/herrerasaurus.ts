import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Herrerasaurus: Dinosaur = {
    id: 'herrerasaurus', slug: 'herrerasaurus', displayName: 'Herrerasaurus', name: 'Herrerasaurus',
    pronunciation: 'heh-RARE-ah-SORE-us', nameMeaning: 'Herrera\'s Lizard', genusName: 'Herrerasaurus',
    era: 'triassic', diet: 'carnivore', category: 'carnivore', size: 'medium', habitat: 'forest',
    livedIn: ['South America'], periodRangeMya: [231, 231],
    dimensions: { lengthMeters: 4.0, heightMeters: 1.1, weightKg: 350, speedKmh: 40 },
    images: img('herrerasaurus'),
    facts: [
      { label: 'Age', value: 'One of the first', icon: 'clock', description: 'One of the earliest true dinosaurs — 231 million years old, from the dawn of dinosaurs.' },
      { label: 'Anatomy', value: 'Primitive predator', icon: 'git-branch', description: 'A basal dinosaur with features so primitive scientists debate if it\'s a true dinosaur.' },
      { label: 'Jaw', value: 'Flexible hinge', icon: 'unfold-vertical', description: 'Had a unique sliding jaw joint — an early innovation for swallowing large prey.' },
    ],
    description: 'One of the very FIRST dinosaurs. Herrerasaurus lived at the literal dawn of the dinosaurs, 231 million years ago, when the dinosaur lineage was just beginning. Its anatomy is so primitive that some scientists still debate whether it qualifies as a true dinosaur.',
    longDescription: 'Herrerasaurus is one of the most important dinosaurs for understanding the origin of the entire dinosaur group. Dating to the Carnian stage of the Late Triassic (~231 million years ago), it is among the earliest dinosaurs known from complete remains. Its anatomy is transitional: it has dinosaur features (an open acetabulum, an elongate pubis) but retains primitive archosaur characteristics that make its exact phylogenetic position debated — some analyses place it within Dinosauria, others just outside as a dinosauriform. Regardless, it represents what the earliest predatory dinosaurs looked like: a medium-sized, fast, bipedal hunter with a flexible jaw that could swallow surprisingly large prey.',
    kidsDescription: 'Herrerasaurus was one of the VERY FIRST dinosaurs EVER! It lived way back at the beginning, 231 million years ago — when dinosaurs were brand new and still figuring things out. It was a fast hunter with a special jaw that could stretch open to swallow big chunks of food!',
    childFriendlyText: 'Herrerasaurus was one of the first dinosaurs ever to live on Earth! It was a fast hunter from the very beginning of dinosaur time.',
    scientificSummary: 'Herrerasaurus ischigualastensis (Reig, 1963) is a basal dinosauriform from the Carnian Ischigualasto Formation, Argentina. Dated to ~231 Ma, representing one of the earliest-diverging members of the dinosaur total group. Exhibits a mixture of plesiomorphic archosaurian features (acetabular morphology, crurotarsal ankle) with dinosaurian synapomorphies (inturned femoral head, elongate pubis). Its intramandibular sliding joint represents an early craniokinetic innovation for processing large prey items — a trait that would become elaborated in later theropods. Phylogenetic position remains debated as Dinosauria or its immediate sister group within Dinosauriformes.',
    discoveries: [{ year: 1958, location: 'San Juan, Argentina', discoveredBy: 'Victorino Herrera', note: 'First specimen found by a local goatherd in the Valley of the Moon.' }],
    funFact: 'Herrerasaurus was found in Argentina\'s "Valley of the Moon" (Valle de la Luna) — one of the most important Triassic fossil sites in the world, producing dozens of the earliest dinosaurs.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria (disputed)', order: 'Saurischia', suborder: '', family: 'Herrerasauridae', genus: 'Herrerasaurus', species: 'H. ischigualastensis' },
    relatedDinosaurs: [{ id: 'eoraptor', relationship: 'Contemporary' }, { id: 'coelophysis', relationship: 'Slightly later contemporary' }],
    fossilLocations: [{ country: 'Argentina', region: 'San Juan', coordinates: [-30.0, -68.0], specimenName: 'Valle de la Luna, Ischigualasto Formation' }],
    dangerLevel: 7, intelligence: 4,
  }
