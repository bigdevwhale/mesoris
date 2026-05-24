import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Gorgosaurus: Dinosaur = {
  id: 'gorgosaurus', slug: 'gorgosaurus', displayName: 'Gorgosaurus', name: 'Gorgosaurus',
  pronunciation: 'GOR-go-SOR-us', nameMeaning: 'Fierce Lizard', genusName: 'Gorgosaurus',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [76, 75],
  dimensions: { lengthMeters: 8.8, heightMeters: 3.0, weightKg: 2500, speedKmh: 35 },
  images: img('gorgosaurus'),
  facts: [
    { label: 'Family', value: 'Tyrannosaurid', icon: 'shield', description: 'Gorgosaurus was an early true tyrannosaurid and a close relative of Albertosaurus and Tyrannosaurus.' },
    { label: 'Build', value: 'Slimmer hunter', icon: 'zap', description: 'Compared with later giant tyrannosaurs, it had a lighter frame and proportionally longer legs for speed.' },
    { label: 'Bite', value: 'Serrated teeth', icon: 'star', description: 'Its blade-like, bone-cracking teeth were adapted for tearing flesh from hadrosaurs and ceratopsians.' },
    { label: 'Predator Guild', value: 'Top hunter of Alberta', icon: 'map-pin', description: 'In Campanian floodplains of western Canada, Gorgosaurus was one of the dominant apex predators.' },
  ],
  description: 'Gorgosaurus was a fast, deep-skulled tyrannosaurid from Late Cretaceous Canada. It hunted large herbivores and represents an important stage in tyrannosaur evolution before the rise of T. rex.',
  longDescription: 'Gorgosaurus libratus is known primarily from the Dinosaur Park Formation of Alberta and is one of the best sampled tyrannosaurids, represented by numerous growth stages from juveniles to adults. It possessed a long, relatively low skull compared with later Tyrannosaurus, with robust jaws and strongly recurved, serrated teeth. Histological and morphometric studies suggest rapid growth during adolescence and ecological partitioning among age classes, with juveniles likely chasing smaller prey before transitioning to larger-bodied herbivores as adults. Gorgosaurus coexisted with centrosaurine ceratopsians and hadrosaurids in dynamic coastal plain ecosystems near the Western Interior Seaway. Its rich fossil record makes it central to understanding tyrannosaur ontogeny and biomechanics.',
  kidsDescription: 'Gorgosaurus was like a teenage cousin of T. rex — fast, fierce, and full of sharp teeth! It chased prey across Cretaceous plains in what is now Canada.',
  childFriendlyText: 'Gorgosaurus was a powerful meat-eater related to T. rex. It was a bit slimmer and probably faster than its giant later cousins.',
  scientificSummary: 'Gorgosaurus libratus (Lambe, 1914) is an albertosaurine tyrannosaurid from the Campanian Dinosaur Park Formation (~76–75 Ma) of Alberta, Canada. Multiple ontogenetic specimens reveal growth-related cranial and postcranial changes. It is a key taxon for tyrannosaurid systematics, biomechanics, and paleoecology in western Laramidia.',
  discoveries: [
    { year: 1913, location: 'Dinosaur Provincial Park, Alberta, Canada', discoveredBy: 'Charles H. Sternberg', note: 'Collected specimens that formed the basis for Lambe\'s description.' },
    { year: 1914, location: 'Geological Survey of Canada publication', discoveredBy: 'Lawrence Lambe', note: 'Formally named Gorgosaurus libratus and established it as a distinct tyrannosaurid.' },
  ],
  funFact: 'Some fossil beds preserve multiple Gorgosaurus individuals at different ages, giving scientists a rare look at how one predator changed as it grew up.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Albertosaurinae', genus: 'Gorgosaurus', species: 'G. libratus' },
  relatedDinosaurs: [
    { id: 'albertosaurus', relationship: 'Very close albertosaurine relative' },
    { id: 'daspletosaurus', relationship: 'Contemporary heavier-built tyrannosaurid' },
    { id: 'tyrannosaurus-rex', relationship: 'Later giant tyrannosaurid lineage' },
  ],
  fossilLocations: [
    { country: 'Canada', region: 'Dinosaur Provincial Park, Alberta', coordinates: [50.76, -111.49], specimenName: 'Dinosaur Park Formation skeletons' },
  ],
  dangerLevel: 8, intelligence: 6,
}

