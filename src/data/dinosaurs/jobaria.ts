import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Jobaria: Dinosaur = {
  id: 'jobaria', slug: 'jobaria', displayName: 'Jobaria', name: 'Jobaria',
  pronunciation: 'jo-BAR-ee-ah', nameMeaning: 'Jobar (Tuareg mythical creature)', genusName: 'Jobaria',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'forest',
  livedIn: ['Africa'], periodRangeMya: [167, 161],
  dimensions: { lengthMeters: 18.0, heightMeters: 5.0, weightKg: 22000, speedKmh: 12 },
  images: img('jobaria'),
  facts: [
    { label: 'Discovery', value: '95% complete', icon: 'star', description: 'The Jobaria skeleton recovered by Paul Sereno\'s team was approximately 95% complete — extraordinarily rare for a large sauropod, giving scientists an unusually detailed picture of its anatomy.' },
    { label: 'Rearing', value: 'Could rear up', icon: 'arrow-up', description: 'Analysis of the spine and limbs suggests Jobaria could rear up on its hind legs to reach high vegetation — a posture supported by its relatively short, flexible neck.' },
    { label: 'Primitive', value: 'Ancient features', icon: 'layers', description: 'Jobaria retained surprisingly primitive anatomical features despite its relatively young geological age — its skeleton would not look out of place in the Early Jurassic, 50 million years earlier.' },
    { label: 'Name', value: 'Tuareg mythology', icon: 'anchor', description: 'Named after "Jobar", a large mythical creature from the oral traditions of the Tuareg people of the Sahara, honoring local cultural heritage.' },
  ],
  description: 'Jobaria tiguidensis was a large, primitive sauropod from the Middle Jurassic of Niger, Africa, named after a Tuareg mythical creature. At approximately 18 metres, it was a genuine giant, yet its anatomy was surprisingly primitive — retaining features more typical of Early Jurassic sauropods. Known from an exceptionally complete skeleton representing multiple individuals, Jobaria provides detailed insights into African Jurassic sauropod evolution. Evidence suggests it could rear up on its hind legs to browse high vegetation, despite its massive size.',
  longDescription: 'Jobaria tiguidensis (Sereno et al., 1999) is a sauropod dinosaur from the Bathonian–Callovian (~167–161 Ma) Tiourarén Formation of the Agadez Region, Niger. The type specimen was recovered as part of a spectacular field operation by Paul Sereno and colleagues in 1997, yielding approximately 95% of the skeleton — one of the most complete large sauropod specimens ever found. Jobaria is notable for its retention of plesiomorphic (primitive) features: the teeth are spatulate and unserrated, the vertebrae lack the complex pneumatic cavities found in more derived sauropods, and the limb proportions are relatively robust. Phylogenetically, Jobaria is variously resolved as a non-neosauropodan sauropod or a basal neosauropod. Its relatively short, flexible neck and strong hindlimbs support the hypothesis that it could occasionally rear up on its back legs to access vegetation 8–10 metres above ground — a behaviour potentially important in a semi-arid Jurassic African environment. Multiple individuals, including juveniles, were recovered together, hinting at possible herding behaviour.',
  kidsDescription: 'Jobaria was a HUGE plant-eating dinosaur from the Sahara Desert of Niger, Africa! Named after a Tuareg mythical beast, it was 18 metres long and could REAR UP on its back legs to eat high leaves. Scientists found nearly its whole skeleton — a rare treat! A Jurassic African giant.',
  childFriendlyText: 'Jobaria was a massive 18-metre plant-eater from Niger, named after a Tuareg mythical creature. It could rear up on its hind legs to reach high leaves!',
  scientificSummary: 'Jobaria tiguidensis (Sereno et al., 1999) is a basal or non-neosauropodan sauropod from the Bathonian–Callovian Tiourarén Formation, Agadez, Niger (~167–161 Ma). Near-complete skeleton (~95%) recovered. Exhibits primitive sauropod features: spatulate unserrated teeth, simple pneumatic vertebrae. Postcranial proportions suggest possible facultative bipedal rearing. Phylogenetic placement debated; resolved as basal neosauropod or non-neosauropodan in different analyses.',
  discoveries: [
    { year: 1997, location: 'Agadez Region, Niger', discoveredBy: 'Paul Sereno et al.', note: 'Spectacular recovery of ~95% complete skeleton during a major Sahara expedition; formally described in Science in 1999.' },
  ],
  funFact: 'When Paul Sereno\'s team found Jobaria, they also found bones from multiple individuals together — young and old. This suggests that like modern elephants, Jobaria may have travelled in family groups across the ancient Jurassic Africa.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Jobariidae', genus: 'Jobaria', species: 'J. tiguidensis' },
  relatedDinosaurs: [
    { id: 'brachiosaurus', relationship: 'Later neosauropodan relative' },
    { id: 'diplodocus', relationship: 'Contemporary sauropod relative' },
    { id: 'nigersaurus', relationship: 'African contemporary' },
  ],
  fossilLocations: [
    { country: 'Niger', region: 'Agadez Region, Tiourarén Formation', coordinates: [17.5, 8.0], specimenName: 'MNN TIG3 — near-complete holotype' },
  ],
  dangerLevel: 3, intelligence: 3,
}
