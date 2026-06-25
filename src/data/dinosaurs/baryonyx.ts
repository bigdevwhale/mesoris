import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Baryonyx: Dinosaur = {
    id: 'baryonyx', slug: 'baryonyx', displayName: 'Baryonyx', name: 'Baryonyx',
    pronunciation: 'BAIR-ee-ON-icks', nameMeaning: 'Heavy Claw', genusName: 'Baryonyx',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'swamp',
    livedIn: ['Europe'], periodRangeMya: [130, 125],
    dimensions: { lengthMeters: 10.0, heightMeters: 2.5, weightKg: 2000, speedKmh: 30 },
    images: { ...img('baryonyx'), video: '/videos/dinosaurs/baryonyx/video.mp4' },
    facts: [
      { label: 'Giant Claw', value: '31 cm', icon: 'sickle', description: 'A massive 31 cm thumb claw — one of the largest claws of any dinosaur — for hooking fish.' },
      { label: 'Diet', value: 'Fish-eater', icon: 'fish', description: 'Stomach contents found with fish scales — the first definitive evidence of a dinosaur\'s diet.' },
      { label: 'Snout', value: 'Crocodile-like', icon: 'crocodile', description: 'An elongated, narrow snout with cone-shaped teeth — perfect for catching slippery prey.' },
      { label: 'Discovery', value: 'Clay pit find', icon: 'pickaxe', description: 'Discovered in a Surrey clay pit by an amateur — the most complete theropod skeleton in the UK.' },
    ],
    description: 'The heavy-clawed fisher. Baryonyx was a crocodile-mimic dinosaur that waded through Cretaceous rivers hooking giant fish with its massive thumb claw. The first dinosaur whose last meal was preserved in its belly.',
    longDescription: 'Baryonyx was a spinosaurid theropod discovered in 1983 in a clay pit in Surrey, England. Its discovery was a sensation — it was the most complete theropod skeleton ever found in the UK, and its stomach region contained acid-etched fish scales and bones, providing the first direct evidence of a dinosaur\'s diet. Its crocodile-like skull, cone-shaped teeth, and enormous thumb claw marked it as a specialized fish-eater, likely wading and heron-like fishing in the ancient rivers and lakes of Early Cretaceous Britain.',
    kidsDescription: 'Baryonyx was a FISHERMAN dinosaur! It had a giant 30 cm claw — longer than your school ruler — for scooping fish out of rivers. Scientists even found fish scales in its tummy, so they know exactly what it ate for its last meal!',
    childFriendlyText: 'Baryonyx loved fishing! It had a big claw for catching fish and a long snout like a crocodile. We know what it ate because of its fossilized tummy!',
    scientificSummary: 'Baryonyx walkeri (Charig & Milner, 1986) is a baryonychine spinosaurid from the Barremian Weald Clay Formation, UK. First spinosaurid known from relatively complete remains, exhibiting a characteristic elongate rostrum with a terminal rosette, conical marginal dentition, and a massively enlarged manual ungual I. Holotype preserves fish scales (Lepidotes) as gastric contents — the first direct dietary evidence for any theropod. Phylogenetically resolves as sister to Suchomimus within Baryonychinae.',
    discoveries: [{ year: 1983, location: 'Surrey, UK', discoveredBy: 'William Walker', note: 'Amateur fossil hunter found the giant claw in a clay pit.' }],
    funFact: 'Baryonyx was discovered because an amateur fossil hunter saw a giant claw sticking out of a clay pit. He thought it was a dinosaur tooth at first!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Spinosauridae', subfamily: 'Baryonychinae', genus: 'Baryonyx', species: 'B. walkeri' },
    relatedDinosaurs: [{ id: 'spinosaurus', relationship: 'Close relative' }, { id: 'suchomimus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'UK', region: 'Surrey', coordinates: [51.2, -0.5], specimenName: 'Weald Clay Formation' }],
    dangerLevel: 6, intelligence: 5,
  }
