import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Liliensternus: Dinosaur = {
  id: 'liliensternus', slug: 'liliensternus', displayName: 'Liliensternus', name: 'Liliensternus',
  pronunciation: 'LIL-ee-en-STER-nus', nameMeaning: 'Lilienstern\'s [lizard]', genusName: 'Liliensternus',
  era: 'triassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'plains',
  livedIn: ['Europe'], periodRangeMya: [215, 200],
  dimensions: { lengthMeters: 5.1, heightMeters: 1.5, weightKg: 127, speedKmh: 32 },
  images: img('liliensternus'),
  facts: [
    { label: 'Size', value: 'Largest Triassic EU predator', icon: 'maximize', description: 'At over 5 metres, Liliensternus was among the largest predatory dinosaurs in Triassic Europe — a formidable apex hunter.' },
    { label: 'Build', value: 'Slender and swift', icon: 'zap', description: 'Its long legs, slim body, and flexible neck made Liliensternus a swift pursuit predator, capable of running down smaller prey.' },
    { label: 'Teeth', value: 'Serrated blades', icon: 'target', description: 'Blade-like, serrated teeth were ideal for slicing through flesh, marking Liliensternus as an active predator rather than a scavenger.' },
    { label: 'Relative', value: 'Coelophysoid', icon: 'layers', description: 'Liliensternus belongs to the coelophysoid theropods, the same lineage as the famous Coelophysis, showing a shared body plan across the Late Triassic world.' },
  ],
  description: 'Liliensternus was one of the largest predatory dinosaurs of the Late Triassic in Europe, prowling the subtropical flood-plains of what is now Germany roughly 215 to 200 million years ago. A slender, long-necked coelophysoid, it combined speed with predatory grace. Its elongated skull bore sharp, serrated teeth suited for hunting the prosauropods and smaller reptiles that shared its world. Liliensternus offers a snapshot of European theropod diversity before the great Triassic–Jurassic boundary extinction reshuffled the fauna.',
  longDescription: 'Liliensternus liliensterni is known from two partial skeletons recovered from the Norian–Rhaetian Trossingen Formation of Thuringia, Germany, dating to approximately 215–200 Ma. It is classified as a coelophysoid theropod — an early radiation of swift, lightly-built carnivores — and is the largest confirmed predatory dinosaur from Triassic Europe. At ~5.1 metres and approximately 127 kg, it would have been a dominant land predator in its ecosystem. The skull was relatively long and narrow, with blade-like, recurved teeth bearing fine denticles, well-adapted to seizing and slicing prey. Its slender limbs suggest a cursorial lifestyle suited for active pursuit. The genus was named in honour of Hugo Rühle von Lilienstern, who described the specimens in 1934. As a coelophysoid, Liliensternus shares many characters with Coelophysis from North America, suggesting a cosmopolitan distribution of this early theropod group across the Pangaean supercontinent during the Late Triassic.',
  kidsDescription: 'Liliensternus was a FAST and scary predator from the Late Triassic of Germany — the biggest meat-eating dinosaur in Triassic Europe! At over 5 metres long with a slim body and sharp teeth, it was built like a long-legged killing machine. A prehistoric European terror!',
  childFriendlyText: 'Liliensternus was the biggest meat-eater in Triassic Europe — over 5 metres long and very fast, with sharp blade-like teeth for hunting.',
  scientificSummary: 'Liliensternus liliensterni (von Huene, 1934) is a coelophysoid theropod from the Norian–Rhaetian Trossingen Formation of Thuringia, Germany (~215–200 Ma). The largest known Triassic theropod from Europe, at ~5.1 m length and ~127 kg. Cranial anatomy features elongate jaws with laterally compressed, serrated teeth. Postcranially exhibits long metatarsals consistent with cursoriality. Phylogenetically placed as a non-neotheropod coelophysoid, closely allied to Coelophysis and Procompsognathus.',
  discoveries: [
    { year: 1908, location: 'Trossingen, Baden-Württemberg, Germany', discoveredBy: 'Hugo Rühle von Lilienstern', note: 'Two partial skeletons recovered from the Trossingen Formation; described by von Huene and named in von Lilienstern\'s honour.' },
  ],
  funFact: 'Liliensternus lived in the same place and time as the giant prosauropod Plateosaurus — which was actually larger than it. Imagine a top predator that was outsized by some of the local plant-eaters!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Coelophysidae', genus: 'Liliensternus', species: 'L. liliensterni' },
  relatedDinosaurs: [
    { id: 'coelophysis', relationship: 'Close coelophysoid relative' },
    { id: 'herrerasaurus', relationship: 'Early theropod relative' },
    { id: 'dilophosaurus', relationship: 'Later coelophysoid descendant' },
  ],
  fossilLocations: [
    { country: 'Germany', region: 'Thuringia (Trossingen Formation)', coordinates: [48.07, 8.88], specimenName: 'MB.R. 2175 — primary holotype skeleton' },
  ],
  dangerLevel: 7, intelligence: 5,
  birdRelation: '2 / 10',
}
