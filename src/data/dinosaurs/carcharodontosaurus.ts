import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Carcharodontosaurus: Dinosaur = {
    id: 'carcharodontosaurus',
    slug: 'carcharodontosaurus',
    displayName: 'Carcharodontosaurus',
    name: 'Carcharodontosaurus',
    pronunciation: 'kar-KAR-oh-DON-toe-SORE-us',
    nameMeaning: 'Shark-Toothed Lizard',
    genusName: 'Carcharodontosaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'gigantic',
    habitat: 'coastal',
    livedIn: ['Africa'],
    periodRangeMya: [100, 94],
    dimensions: { lengthMeters: 12.5, heightMeters: 4.0, weightKg: 7500, speedKmh: 32 },
    images: img('carcharodontosaurus'),
    facts: [
      { label: 'Teeth', value: 'Shark-like blades', icon: 'triangle', description: 'Its serrated teeth were named for their resemblance to great white shark teeth — perfect for slicing flesh.' },
      { label: 'Skull', value: '1.6 meters', icon: 'skull', description: 'The skull was longer than that of most tyrannosaurs, built for huge slashing bites.' },
      { label: 'Size', value: '12+ meters', icon: 'maximize', description: 'It ranked among the biggest predatory dinosaurs on Earth and dominated North African ecosystems.' },
      { label: 'Rivalry', value: 'Shared Africa with giants', icon: 'target', description: 'It lived in a world of oversized hunters, including spinosaurids and giant croc-line reptiles.' },
    ],
    description: 'A giant predator with teeth like steak knives, Carcharodontosaurus ruled Cretaceous North Africa as one of the biggest meat-eating dinosaurs ever discovered. Its name means shark-toothed lizard, and its jaws lived up to the title.',
    longDescription: 'Carcharodontosaurus was a carcharodontosaurid theropod from northern Africa, living in a hot region crossed by river systems and coastal plains. With its long skull, laterally compressed serrated teeth, and powerful neck muscles, it was built to deliver deep slicing bites rather than the bone-crushing bite of a tyrannosaur. It probably hunted large herbivorous dinosaurs and may have scavenged opportunistically as well. The genus is also a dramatic example of paleontology rediscovery: important early fossils were destroyed during World War II, and only later Moroccan material allowed scientists to reconstruct this spectacular predator in detail again.',
    kidsDescription: 'Carcharodontosaurus had a HUGE head and teeth like giant shark knives! It was one of Africa\'s biggest dinosaur hunters and looked like a monster built entirely out of jaws, muscles, and attitude.',
    childFriendlyText: 'Carcharodontosaurus was a giant African predator with sharp slicing teeth and a very big head.',
    scientificSummary: 'Carcharodontosaurus saharicus (Depéret & Savornin, 1925) is a carcharodontosaurine allosauroid from the Cenomanian of North Africa, especially the Kem Kem Group of Morocco and correlative deposits. It is diagnosed by a long low skull, ziphodont dentition with fine serrations, extensive cranial pneumaticity, and postcranial traits consistent with large-bodied active predation. The taxon is phylogenetically close to Giganotosaurus and Acrocanthosaurus, representing the peak of carcharodontosaurid evolution prior to the rise of tyrannosaurids as dominant northern apex predators.',
    discoveries: [
      { year: 1924, location: 'Algeria', discoveredBy: 'Charles Depéret and J. Savornin', note: 'The original material established the shark-toothed giant from North Africa.' },
      { year: 1995, location: 'Morocco', discoveredBy: 'Paul Sereno', note: 'New skull material helped scientists redescribe the animal after the original fossils were lost.' },
    ],
    funFact: 'The first major Carcharodontosaurus fossils were destroyed in Munich during World War II, so the dinosaur had to be rediscovered almost from scratch.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Carcharodontosauridae', subfamily: 'Carcharodontosaurinae', genus: 'Carcharodontosaurus', species: 'C. saharicus' },
    relatedDinosaurs: [
      { id: 'giganotosaurus', relationship: 'Close relative' },
      { id: 'spinosaurus', relationship: 'Contemporary competitor' },
      { id: 'acrocanthosaurus', relationship: 'North American relative' },
    ],
    fossilLocations: [
      { country: 'Morocco', region: 'Kem Kem Beds', coordinates: [30.8, -4.9], specimenName: 'Kem Kem Group' },
      { country: 'Algeria', region: 'Tegama', coordinates: [27.9, 8.5], specimenName: 'Continental Intercalaire' },
    ],
    dangerLevel: 10,
    intelligence: 6,
}
