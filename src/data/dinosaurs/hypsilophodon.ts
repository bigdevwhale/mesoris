import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Hypsilophodon: Dinosaur = {
  id: 'hypsilophodon', slug: 'hypsilophodon', displayName: 'Hypsilophodon', name: 'Hypsilophodon',
  pronunciation: 'HIP-sih-LOF-oh-don', nameMeaning: 'High-ridged Tooth', genusName: 'Hypsilophodon',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'small', habitat: 'forest',
  livedIn: ['Europe'], periodRangeMya: [130, 125],
  dimensions: { lengthMeters: 2.0, heightMeters: 0.6, weightKg: 20, speedKmh: 35 },
  images: img('hypsilophodon'),
  facts: [
    { label: 'Speed', value: 'Fast runner', icon: 'zap', description: 'With its long, slender legs and lightweight build, Hypsilophodon was one of the fastest small dinosaurs — estimated at 35 km/h — relying on speed as its primary defence against predators.' },
    { label: 'Myth', value: 'Not a tree-climber!', icon: 'lightbulb', description: 'For 70 years, Hypsilophodon was falsely depicted as a tree-climber, like a dinosaurian kangaroo. A 1974 study definitively disproved this — it was firmly a ground-dweller.' },
    { label: 'Self-sharpening teeth', value: 'Enamel on one side', icon: 'layers', description: 'Hypsilophodon had ridged cheek teeth with enamel on only one side — meaning they self-sharpened as the softer dentine wore away, keeping them perpetually razor-edged.' },
    { label: 'Isle of Wight', value: 'Wealden Formation', icon: 'anchor', description: 'Most Hypsilophodon fossils come from a single remarkable bone bed on the Isle of Wight — containing remains of over 20 individuals, hinting at a possible herding or schooling behaviour.' },
  ],
  description: 'Hypsilophodon foxii was a small, swift ornithopod from the Early Cretaceous Wealden Formation of the Isle of Wight, England. Despite its modest 2-metre length, it was a highly successful animal, known from over 20 individuals — one of the best-represented small dinosaurs from England. For 70 years it was wrongly depicted as a tree-climbing, branch-gripping dinosaur; a 1974 study by Peter Galton definitively showed it was a fast, ground-running herbivore. Its self-sharpening ridged teeth and bipedal speed made it a model of early Cretaceous small herbivore efficiency.',
  longDescription: 'Hypsilophodon foxii (Huxley, 1869) is an ornithopod dinosaur from the Barremian (~130–125 Ma) Wessex Formation (Wealden Group) of the Isle of Wight, England. Over 20 individuals are known, making it one of the best-documented small Cretaceous dinosaurs from Europe. The animal was fully bipedal, with long, slender hindlimbs and short forelimbs — not suited for tree-climbing, as was claimed by T.H. Huxley in 1882 based on the mistaken observation that the first toe was reversed (like a perching bird). This "arboreal Hypsilophodon" image persisted in popular literature until Peter Galton\'s 1974 osteological study demonstrated conclusively that the first toe was not reversed and that all skeletal proportions pointed to a cursorial ground-dweller. Dental anatomy is distinctive: the cheek teeth are ridged (hence "high-ridged tooth") with enamel on only one face, creating a self-sharpening cutting edge as the softer dentine wears away. Estimates suggest Hypsilophodon could sprint at approximately 35 km/h — likely its primary defence against Early Cretaceous predators like Neovenator. The large number of individuals preserved together in the Isle of Wight bone bed suggests possible gregarious behaviour.',
  kidsDescription: 'Hypsilophodon was a speedy small dinosaur from the Isle of Wight — and for 70 years everyone WRONGLY thought it climbed trees! A scientist finally proved in 1974 that it was actually a super-fast ground runner. Its teeth were SELF-SHARPENING — enamel on one side meant they naturally stayed sharp! Speed was this little Cretaceous runner\'s superpower.',
  childFriendlyText: 'Hypsilophodon was a speedy little English dinosaur with self-sharpening teeth, wrongly thought to be a tree-climber for 70 years. It was actually one of the fastest small dinosaurs!',
  scientificSummary: 'Hypsilophodon foxii (Huxley, 1869) is a basal ornithopod from the Barremian Wessex Formation (~130–125 Ma), Isle of Wight, England. >20 individuals known. Fully cursorial bipedal; arboreal hypothesis (Huxley, 1882) disproved by Galton (1974). Dentition: ridged, self-sharpening cheek teeth with unilateral enamel. Estimated speed ~35 km/h. Possible gregarious behaviour inferred from bone-bed aggregation.',
  discoveries: [
    { year: 1849, location: 'Cowleaze Chine, Isle of Wight, England', discoveredBy: 'William Fox', note: 'Initial specimens discovered; Rev. William Fox collected key material and the species was named in his honour.' },
    { year: 1869, location: 'Isle of Wight, England', discoveredBy: 'T.H. Huxley', note: 'Formally described by Huxley in 1869; Huxley erroneously suggested arboreal habits in 1882.' },
  ],
  funFact: 'Hypsilophodon was depicted as a tree-climbing dinosaur in books, models, and museums for 70 YEARS — a completely wrong reconstruction that became one of palaeontology\'s most famous errors. The "dinosaur kangaroo" image stuck around until 1974.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hypsilophodontidae', genus: 'Hypsilophodon', species: 'H. foxii' },
  relatedDinosaurs: [
    { id: 'iguanodon', relationship: 'Larger ornithopod contemporary and relative' },
    { id: 'deinonychus', relationship: 'Contemporaneous predator' },
  ],
  fossilLocations: [
    { country: 'UK', region: 'Isle of Wight, Wessex Formation (Wealden Group)', coordinates: [50.65, -1.3], specimenName: 'NHMUK PV R192 — holotype; bone bed with 20+ individuals' },
  ],
  dangerLevel: 1, intelligence: 5,
}
