import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Giganotosaurus: Dinosaur = {
    id: 'giganotosaurus', slug: 'giganotosaurus', displayName: 'Giganotosaurus', name: 'Giganotosaurus',
    pronunciation: 'JIG-ah-NOTE-oh-SORE-us', nameMeaning: 'Giant Southern Lizard', genusName: 'Giganotosaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'gigantic', habitat: 'plains',
    livedIn: ['South America'], periodRangeMya: [99, 97],
    dimensions: { lengthMeters: 13.5, heightMeters: 4.2, weightKg: 8500, speedKmh: 40 },
    images: img('giganotosaurus'),
    facts: [
      { label: 'Size', value: 'Larger than T-Rex', icon: 'maximize', description: 'One of the few theropods that exceeded T. rex in length and possibly mass.' },
      { label: 'Skull', value: '1.6 meters', icon: 'skull', description: 'A massive, narrow skull longer than T. rex\'s — over 1.6 meters.' },
      { label: 'Prey', value: 'Giant sauropods', icon: 'swords', description: 'Hunted Argentinosaurus — the largest land animals ever — likely in packs.' },
      { label: 'Brain', value: 'Small for size', icon: 'brain', description: 'Had a smaller brain relative to body size than T. rex, suggesting different hunting strategies.' },
    ],
    description: 'Bigger than T. rex and built to hunt the largest animals ever. Giganotosaurus was the apex predator of Cretaceous South America, bringing down gargantuan sauropods in coordinated packs.',
    longDescription: 'Giganotosaurus was one of the largest terrestrial carnivores ever to exist, rivaling and potentially exceeding Tyrannosaurus rex in size. Living in what is now Argentina during the early Late Cretaceous, it shared its ecosystem with colossal sauropods like Argentinosaurus. Its skull, while slightly longer than T. rex\'s, was narrower and housed a proportionally smaller brain. Its teeth were blade-like, optimized for slicing flesh rather than crushing bone — suggesting it attacked large prey with repeated slashing strikes, possibly hunting in coordinated groups.',
    kidsDescription: 'This dinosaur was even BIGGER than T-Rex! Imagine T-Rex\'s bigger cousin from South America. Giganotosaurus was SO big it could hunt the biggest dinosaurs ever — giant long-necks as tall as buildings. It worked in a team with other Giganotosauruses, like a wolf pack!',
    childFriendlyText: 'Giganotosaurus was one of the biggest meat-eating dinosaurs ever — even bigger than T-Rex! It lived in South America and hunted with friends.',
    scientificSummary: 'Giganotosaurus carolinii (Coria & Salgado, 1995) is a giganotosaurine carcharodontosaurid from the Cenomanian Candeleros Formation, Argentina. Among the largest known theropods, exceeding 13 meters in total length. Characterized by a hyperelongated but mediolaterally narrow skull, ziphodont (blade-like) marginal dentition adapted for defleshing strikes on massive prey, and proportionally expanded femoral circumference indicating superior cursoriality relative to tyrannosaurids. Co-occurs with the colossal titanosaur Argentinosaurus.',
    discoveries: [{ year: 1993, location: 'Neuquen, Argentina', discoveredBy: 'Ruben Carolini', note: 'Nearly complete skeleton found by an amateur fossil hunter.' }],
    funFact: 'Giganotosaurus had a brain the size and shape of a banana — small for its body. It relied more on brute power than smarts.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Carcharodontosauridae', genus: 'Giganotosaurus', species: 'G. carolinii' },
    relatedDinosaurs: [{ id: 'tyrannosaurus-rex', relationship: 'Size rival' }, { id: 'spinosaurus', relationship: 'Size rival' }],
    fossilLocations: [{ country: 'Argentina', region: 'Neuquen', coordinates: [-39.0, -68.5], specimenName: 'Candeleros Formation' }],
    dangerLevel: 10, intelligence: 4,
  }
