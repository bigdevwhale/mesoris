import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Riojasaurus: Dinosaur = {
  id: 'riojasaurus', slug: 'riojasaurus', displayName: 'Riojasaurus', name: 'Riojasaurus',
  pronunciation: 'ree-OH-hah-SOR-us', nameMeaning: 'La Rioja Lizard', genusName: 'Riojasaurus',
  era: 'triassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['South America'], periodRangeMya: [221, 210],
  dimensions: { lengthMeters: 11.0, heightMeters: 3.0, weightKg: 2000, speedKmh: 10 },
  images: img('riojasaurus'),
  facts: [
    { label: 'Size', value: 'Triassic giant', icon: 'maximize', description: 'At 11 metres, Riojasaurus was one of the largest dinosaurs of the entire Triassic period — a gentle giant in an age of small beginnings.' },
    { label: 'Posture', value: 'Obligate quadruped', icon: 'arrow-up', description: 'Unlike its smaller relatives, Riojasaurus was so heavy it walked on all four legs all the time — body mass drove its evolution toward permanent quadrupedalism.' },
    { label: 'Bones', value: 'Spongy vertebrae', icon: 'layers', description: 'Riojasaurus had hollow, spongy vertebrae to reduce weight — an early evolutionary solution to supporting a massive body, later perfected by true sauropods.' },
    { label: 'Relationship', value: 'Near-sauropod', icon: 'anchor', description: 'Riojasaurus sits close to the base of the sauropodomorph tree, making it a crucial link in understanding how the giant long-necked sauropods evolved.' },
  ],
  description: 'Riojasaurus incertus was a massive sauropodomorph from the Late Triassic of Argentina\'s La Rioja Province, living approximately 221 to 210 million years ago. One of the largest dinosaurs of the Triassic, it grew to 11 metres and was heavy enough to require permanent quadrupedal locomotion — a body plan that foreshadowed the immense sauropods of the Jurassic. Its hollow vertebrae, unusually advanced for the Triassic, demonstrate that nature was already experimenting with weight-saving structures in large dinosaurs long before sauropods perfected the design.',
  longDescription: 'Riojasaurus incertus (Bonaparte, 1969) is a large sauropodomorph prosauropod from the Norian–Rhaetian Los Colorados Formation of La Rioja Province, Argentina, dated to ~221–210 Ma. At approximately 11 metres and 2,000 kg, it is one of the largest known Triassic dinosaurs worldwide. Unlike smaller prosauropods such as Plateosaurus, Riojasaurus was obligately quadrupedal — its great mass prohibited effective bipedal locomotion. Vertebral anatomy reveals cancellous (spongy) bone in the centra — a feature that would become far more prominent in derived sauropods as a strategy for reducing skeletal mass while maintaining structural integrity. Riojasaurus had a long neck relative to body size, allowing it to browse on vegetation above ground level, prefiguring the feeding strategies of the giant Jurassic sauropods. Phylogenetic analyses place Riojasaurus as a basal member of the sauropodomorph clade, outside the true Sauropoda, making it an important transitional taxon in understanding the evolution of Mesozoic megaherbivores.',
  kidsDescription: 'Riojasaurus was a HUGE dinosaur from the Triassic of Argentina — 11 metres long and too heavy to walk on two legs! It was one of the first giant dinosaurs, and its hollow bones were already evolving to handle all that weight. A true Triassic titan!',
  childFriendlyText: 'Riojasaurus was one of the biggest dinosaurs of the Triassic — 11 metres long with hollow bones to carry its massive weight!',
  scientificSummary: 'Riojasaurus incertus (Bonaparte, 1969) is a basal sauropodomorph from the Norian Los Colorados Formation, La Rioja Province, Argentina (~221–210 Ma). At ~11 m and ~2,000 kg, it is one of the largest Triassic dinosaurs. Obligate quadrupedality and cancellous vertebral bone reflect early adaptations to extreme body mass. Phylogenetically placed as a non-sauropodan sauropodomorph, providing insight into the evolutionary transition toward the true Sauropoda.',
  discoveries: [
    { year: 1967, location: 'La Rioja Province, Argentina', discoveredBy: 'José Bonaparte', note: 'Numerous specimens found in the Los Colorados Formation; described formally by Bonaparte in 1969, making this one of the best-known Triassic sauropodomorphs.' },
  ],
  funFact: 'Riojasaurus had spongy, hollow vertebrae that looked almost like modern sauropod bones — except it evolved this feature completely independently, showing that large dinosaurs kept "reinventing" the same weight-saving trick over millions of years.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Riojasauridae', genus: 'Riojasaurus', species: 'R. incertus' },
  relatedDinosaurs: [
    { id: 'plateosaurus', relationship: 'Close sauropodomorph relative' },
    { id: 'eoraptor', relationship: 'Contemporary early dinosaur' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'La Rioja Province, Los Colorados Formation', coordinates: [-29.5, -67.5], specimenName: 'PVL 3808 — referred material, multiple individuals' },
  ],
  dangerLevel: 2, intelligence: 3,
}
