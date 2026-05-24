import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Saurophaganax: Dinosaur = {
  id: 'saurophaganax', slug: 'saurophaganax', displayName: 'Saurophaganax', name: 'Saurophaganax',
  pronunciation: 'SOR-oh-FAG-uh-naks', nameMeaning: 'Lord of Lizard-Eaters', genusName: 'Saurophaganax',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [155, 145],
  dimensions: { lengthMeters: 11.0, heightMeters: 3.6, weightKg: 3800, speedKmh: 30 },
  images: img('saurophaganax'),
  facts: [
    { label: 'Name', value: 'Lizard-eater lord', icon: 'crown', description: 'Its dramatic name reflects its role as one of the largest known top predators in Late Jurassic North America.' },
    { label: 'Scale', value: 'Allosaur giant', icon: 'maximize', description: 'Saurophaganax was among the biggest allosauroid predators, larger than many typical Allosaurus individuals.' },
    { label: 'Weaponry', value: 'Serrated teeth', icon: 'star', description: 'Long, blade-like teeth and powerful jaws were well suited to slicing flesh from huge sauropod prey.' },
    { label: 'Debate', value: 'Distinct or Allosaurus?', icon: 'help-circle', description: 'Some studies treat Saurophaganax as a separate genus, while others consider it a very large species of Allosaurus.' },
  ],
  description: 'Saurophaganax was a massive Late Jurassic predator from the Morrison ecosystem, famous for its size and taxonomic debate. It likely hunted or scavenged giant sauropods and stegosaurs.',
  longDescription: 'Saurophaganax maximus is based on large allosauroid remains from the upper Morrison Formation of Oklahoma, USA. Diagnostic vertebral features and proportional differences were used to distinguish it from Allosaurus, though its exact status remains debated. Regardless of nomenclature, the material represents one of the largest predatory theropods in the Late Jurassic of North America. It inhabited semiarid floodplain systems with seasonal rivers, where giant sauropods and stegosaurs provided substantial prey biomass. Functional morphology indicates a powerful but laterally slicing bite strategy similar to allosaurids, likely combining active predation with opportunistic scavenging. Saurophaganax remains a flagship taxon in discussions of Late Jurassic trophic structure and theropod diversity.',
  kidsDescription: 'Saurophaganax had one of the most metal dinosaur names ever: "lord of lizard-eaters"! This giant hunter was a heavyweight predator in the Jurassic world.',
  childFriendlyText: 'Saurophaganax was a huge meat-eating dinosaur related to Allosaurus. It was one of the biggest predators in Jurassic North America.',
  scientificSummary: 'Saurophaganax maximus (Chure, 1995) derives from upper Morrison allosauroid material in Oklahoma. Proposed diagnostic characters include enlarged neural arch and vertebral traits relative to Allosaurus fragilis, though synonymy remains debated. Estimated body length approaches ~10.5–11 m. The taxon is relevant to allosauroid taxonomy and Late Jurassic apex predator ecology.',
  discoveries: [
    { year: 1931, location: 'Kenton, Cimarron County, Oklahoma, USA', discoveredBy: 'J.W. Stovall-led teams', note: 'Large theropod remains recovered from Morrison strata.' },
    { year: 1995, location: 'Formal publication', discoveredBy: 'Daniel Chure', note: 'Material named Saurophaganax maximus and argued to be distinct from Allosaurus.' },
  ],
  funFact: 'Oklahoma named Saurophaganax as its official state dinosaur, making this giant hunter a regional icon.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Allosauridae', genus: 'Saurophaganax', species: 'S. maximus' },
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Very close allosaurid relative; sometimes considered the same genus' },
    { id: 'torvosaurus', relationship: 'Another giant Jurassic predator in North America' },
    { id: 'stegosaurus', relationship: 'Potential prey and contemporary herbivore' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Cimarron County, Oklahoma (Morrison Formation)', coordinates: [36.9, -102.9], specimenName: 'Saurophaganax maximus type material' },
  ],
  dangerLevel: 9, intelligence: 5,
}

