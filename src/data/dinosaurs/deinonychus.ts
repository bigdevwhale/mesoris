import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Deinonychus: Dinosaur = {
    id: 'deinonychus', slug: 'deinonychus', displayName: 'Deinonychus', name: 'Deinonychus',
    pronunciation: 'die-NON-ee-kuss', nameMeaning: 'Terrible Claw', genusName: 'Deinonychus',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [115, 108],
    dimensions: { lengthMeters: 3.4, heightMeters: 0.9, weightKg: 70, speedKmh: 40 },
    images: img('deinonychus'),
    facts: [
      { label: 'Claw', value: '12 cm sickle', icon: 'sickle', description: 'The inspiration for Velociraptor\'s movie fame — a huge 12 cm retractable claw.' },
      { label: 'Discovery', value: 'Revolutionized science', icon: 'lightbulb', description: 'Its 1969 description sparked the "dinosaur renaissance" — changing our view of dinosaurs forever.' },
      { label: 'Feathers', value: 'Likely feathered', icon: 'feather', description: 'Related species confirm it had feathers — warm-blooded and bird-like.' },
      { label: 'Hunting', value: 'Pack predator', icon: 'users', description: 'Multiple individuals found near Tenontosaurus fossils — strong evidence of pack hunting.' },
    ],
    description: 'The dinosaur that changed everything. Deinonychus revolutionized how scientists view dinosaurs — proving they were warm-blooded, active, and intelligent. Its discovery launched the modern age of dinosaur science.',
    longDescription: 'Deinonychus is one of the most scientifically significant dinosaur discoveries ever made. When John Ostrom described it in 1969, its bird-like anatomy — long arms, grasping hands, stiffened tail, and a massive sickle claw — provided the evidence that rekindled the theory that birds evolved from dinosaurs and that dinosaurs were active, warm-blooded animals. This sparked the "Dinosaur Renaissance," completely transforming paleontology. Multiple Deinonychus specimens have been found associated with the larger herbivore Tenontosaurus, providing compelling evidence of cooperative pack hunting.',
    kidsDescription: 'This dinosaur is a SCIENCE HERO! When scientists found Deinonychus, they realized dinosaurs weren\'t slow and dumb — they were fast, smart, and awesome! It had a big sharp claw on each foot and hunted in packs with its friends. It was covered in feathers too!',
    childFriendlyText: 'Deinonychus was a smart, speedy dinosaur that changed how we think about ALL dinosaurs! It hunted with friends and had a big sharp claw.',
    scientificSummary: 'Deinonychus antirrhopus (Ostrom, 1969) is a dromaeosaurid theropod from the Aptian-Albian Cloverly Formation, Montana. The taxon most responsible for the Dinosaur Renaissance, its description provided key evidence for theropod endothermy, avian origins, and active predation. Characterized by a hypertrophied, hyperextendible pedal ungual II (sickle claw), interlocking caudal zygapophyses producing a dynamic stiffening rod, and an enlarged endocranial volume indicating high cognitive capability.',
    discoveries: [{ year: 1931, location: 'Montana, USA', discoveredBy: 'Barnum Brown', note: 'First fossils found but not studied until decades later.' }, { year: 1964, location: 'Montana, USA', discoveredBy: 'John Ostrom', note: 'Ostrom\'s discovery and 1969 paper revolutionized dinosaur science.' }],
    funFact: 'Deinonychus is the REAL dinosaur the movie Velociraptors were based on. The movie version is Deinonychus-sized, not turkey-sized like real Velociraptor.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Dromaeosauridae', genus: 'Deinonychus', species: 'D. antirrhopus' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Close relative' }, { id: 'oviraptor', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'USA', region: 'Montana', coordinates: [45.5, -108.5], specimenName: 'Cloverly Formation' }],
    dangerLevel: 7, intelligence: 8,
  }
