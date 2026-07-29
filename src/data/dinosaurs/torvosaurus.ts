import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Torvosaurus: Dinosaur = {
  id: 'torvosaurus', slug: 'torvosaurus', displayName: 'Torvosaurus', name: 'Torvosaurus',
  pronunciation: 'TOR-voh-SOR-us', nameMeaning: 'Savage Lizard', genusName: 'Torvosaurus',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'plains',
  livedIn: ['North America', 'Europe'], periodRangeMya: [155, 148],
  dimensions: { lengthMeters: 11.0, heightMeters: 3.0, weightKg: 2000, speedKmh: 25 },
  images: img('torvosaurus'),
  facts: [
    { label: 'Size', value: 'Largest Jurassic predator', icon: 'skull', description: 'Torvosaurus rivalled Allosaurus as the largest predatory dinosaur of the Jurassic, potentially reaching 11–12 metres — making it one of the biggest carnivores of its time.' },
    { label: 'Teeth', value: 'Massive serrated blades', icon: 'target', description: 'The jaws were lined with huge, blade-like teeth with serrated edges — designed for maximum cutting force against the massive sauropods that formed its prey.' },
    { label: 'Range', value: 'Transatlantic predator', icon: 'anchor', description: 'Torvosaurus has been found in both North America and Portugal — remarkable evidence that the Late Jurassic proto-Atlantic was still narrow enough for dinosaur populations to stay connected.' },
    { label: 'Rival', value: 'Competed with Allosaurus', icon: 'trophy', description: 'Torvosaurus and Allosaurus were the two apex predators of the Morrison Formation, likely competing for the same large sauropod prey in Late Jurassic North America.' },
  ],
  description: 'Torvosaurus tanneri — the "Savage Lizard" — was one of the largest predatory dinosaurs of the Jurassic period, rivalling Allosaurus as the apex carnivore of its time. Known from both North America and Portugal, it prowled the floodplains of the Late Jurassic 155 to 148 million years ago with massive jaws and blade-like serrated teeth capable of dismembering even the enormous sauropods of the Morrison Formation. Its transatlantic distribution demonstrates that the Late Jurassic world was still a connected world of giant predators.',
  longDescription: 'Torvosaurus tanneri (Galton & Jensen, 1979) is a megalosaurid theropod from the Late Jurassic Morrison Formation (~155–148 Ma) of North America, with a European species, T. gurneyi, known from the Lourinhã Formation of Portugal. At ~11 metres, it contended with Allosaurus as the largest Jurassic terrestrial predator. The skull was large and deep, with robust jaws bearing massive, laterally compressed teeth with well-developed mesial and distal serrations — ideal for processing the flesh and bone of large sauropods. As a megalosaurid, Torvosaurus belongs to a basal tetanuran lineage separate from Allosaurus (allosauroid) and T. rex (coelurosaur). The presence of very similar species on both sides of the nascent Atlantic Ocean (~155 Ma) suggests that at this time, shallow seaways or land connections still allowed faunal exchange between North America and Europe. A T. gurneyi embryo preserved within an egg was described from Portugal in 2013 — a remarkable glimpse into Jurassic predator reproduction. Torvosaurus was likely an ambush predator and may have scavenged opportunistically on sauropod carcasses in its floodplain environment.',
  kidsDescription: 'Torvosaurus was the "Savage Lizard" — one of the BIGGEST meat-eaters of the Jurassic! It fought with Allosaurus for the title of top predator in North America. Amazingly, the same dinosaur was also found in Portugal, proving that 155 million years ago, the Atlantic was still narrow enough for dinosaurs to cross. An absolute titan of the Jurassic!',
  childFriendlyText: 'Torvosaurus was a giant Jurassic predator found on BOTH sides of the Atlantic — in Colorado AND Portugal. One of the biggest carnivores of its time, rivalling Allosaurus.',
  scientificSummary: 'Torvosaurus tanneri (Galton & Jensen, 1979) is a megalosaurid tetanuran theropod from the Kimmeridgian–Tithonian Morrison Formation, USA (~155–148 Ma). European species T. gurneyi from the Lourinhã Formation, Portugal. Length ~11 m; mass ~2,000 kg. Large, deep skull with robust, blade-like serrated teeth. Megalosaurid affinity (basal Tetanurae), distinct from allosauroid lineage. Apex predator, coexisting and competing with Allosaurus in Morrison ecosystem.',
  discoveries: [
    { year: 1972, location: 'Dry Mesa Quarry, Colorado, USA', discoveredBy: 'James Jensen', note: 'Material first collected in 1972; formally described by Peter Galton and James Jensen in 1979 as Torvosaurus tanneri.' },
    { year: 2013, location: 'Lourinhã Formation, Portugal', discoveredBy: 'Octávio Mateus et al.', note: 'European species T. gurneyi described; embryos preserved in eggs also found, providing rare data on Jurassic theropod reproduction.' },
  ],
  funFact: 'A baby Torvosaurus embryo was found preserved inside a fossil egg in Portugal in 2013 — giving scientists an extraordinary glimpse at what one of the Jurassic\'s largest predators looked like before it even hatched.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Megalosauridae', genus: 'Torvosaurus', species: 'T. tanneri' },
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Contemporary apex predator competitor' },
    { id: 'megalosaurus', relationship: 'Close megalosaurid relative' },
    { id: 'ceratosaurus', relationship: 'Contemporary Morrison Formation predator' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Dry Mesa Quarry, Delta County, Colorado (Morrison Formation)', coordinates: [38.5, -108.5], specimenName: 'BYU 2002 — holotype partial skeleton' },
    { country: 'Portugal', region: 'Lourinhã Formation, Torres Vedras', coordinates: [39.1, -9.3], specimenName: 'ML 632 — T. gurneyi holotype; embryo material' },
  ],
  dangerLevel: 9, intelligence: 5,
  birdRelation: '2 / 10',
}
