import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Iguanodon: Dinosaur = {
    id: 'iguanodon', slug: 'iguanodon', displayName: 'Iguanodon', name: 'Iguanodon',
    pronunciation: 'ig-WAH-noh-don', nameMeaning: 'Iguana Tooth', genusName: 'Iguanodon',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
    livedIn: ['Europe', 'North America'], periodRangeMya: [140, 120],
    dimensions: { lengthMeters: 10.0, heightMeters: 2.7, weightKg: 3500, speedKmh: 25 },
    images: img('iguanodon'),
    facts: [
      { label: 'Thumb Spike', value: 'Built-in dagger', icon: 'crosshair', description: 'A massive conical thumb spike — a unique defensive weapon against predators.' },
      { label: 'Discovery', value: 'Second dinosaur ever', icon: 'clock', description: 'The second dinosaur ever named (1825), and the first herbivore discovered.' },
      { label: 'Posture', value: 'Corrected over time', icon: 'redo', description: 'Originally shown as a quadrupedal lizard — we now know it walked mostly on two legs.' },
      { label: 'Diet', value: 'Versatile plant-eater', icon: 'leaf', description: 'Could chew its food — a revolutionary adaptation for processing tough plants.' },
    ],
    description: 'The dinosaur with a secret weapon — a giant dagger-like thumb spike. Iguanodon was one of the first dinosaurs ever discovered, and its bizarre anatomy confused scientists for over a century.',
    longDescription: 'Iguanodon was one of the most successful and geographically widespread dinosaurs of the Early Cretaceous, found across Europe and North America. Historically, it is one of the most important dinosaurs in the history of paleontology — it was the second dinosaur ever named (after Megalosaurus) and the first herbivorous dinosaur discovered. Its most unusual feature, the large conical thumb spike, was initially mistaken for a horn on its nose by early reconstructions. Iguanodon\'s ability to chew its food using a complex dental battery made it a more efficient plant-eater than earlier dinosaurs and contributed to its success. It was likely both bipedal and quadrupedal, walking on two legs to run and using all four while browsing.',
    kidsDescription: 'Iguanodon had a SUPERHERO WEAPON — a giant sharp spike on each thumb! Like having a knife built into your hand! It was one of the first dinosaurs ever found by humans. Scientists put its thumb spike on its NOSE by mistake at first!',
    childFriendlyText: 'Iguanodon had a big sharp spike on each thumb — like a built-in pocket knife! It was one of the very first dinosaurs ever discovered by scientists.',
    scientificSummary: 'Iguanodon bernissartensis (Boulenger, 1881) is a styracosternan hadrosauriform ornithopod from the Barremian-Aptian of Europe. Historically the second dinosaur genus described. Characterized by a unique pollex ungual modified into a conical defensive spike, a complex dental battery enabling orthal grinding mastication, and a facultative bipedal-quadrupedal postural repertoire. The 1878 Bernissart (Belgium) coal mine discovery yielded 38 nearly complete individuals — the first large-scale articulated dinosaur find in history and the foundation of modern dinosaur exhibition.',
    discoveries: [{ year: 1822, location: 'Sussex, UK', discoveredBy: 'Gideon Mantell / Mary Ann Mantell', note: 'First teeth discovered, initially thought to be from a giant iguana.' }, { year: 1878, location: 'Bernissart, Belgium', discoveredBy: 'Coal miners', note: '38 complete skeletons found in a coal mine at 322 meters depth — an unprecedented discovery.' }],
    funFact: 'The Bernissart Iguanodon discovery in 1878 was so important that Belgium literally built a museum to house them — the Royal Belgian Institute of Natural Sciences.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Iguanodontidae', genus: 'Iguanodon', species: 'I. bernissartensis' },
    relatedDinosaurs: [{ id: 'megalosaurus', relationship: 'First dinos discovered' }, { id: 'maiasaura', relationship: 'Related lineage' }],
    fossilLocations: [{ country: 'Belgium', region: 'Bernissart', coordinates: [50.5, 3.6], specimenName: 'Sainte-Barbe Coal Mine' }, { country: 'UK', region: 'Sussex', coordinates: [51.0, -0.1] }],
    dangerLevel: 5, intelligence: 4,
  }
