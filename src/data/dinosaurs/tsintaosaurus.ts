import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tsintaosaurus: Dinosaur = {
  id: 'tsintaosaurus', slug: 'tsintaosaurus', displayName: 'Tsintaosaurus', name: 'Tsintaosaurus',
  pronunciation: 'CHING-dow-SOR-us', nameMeaning: 'Qingdao Lizard', genusName: 'Tsintaosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'swamp',
  livedIn: ['Asia'], periodRangeMya: [84, 71],
  dimensions: { lengthMeters: 10.0, heightMeters: 3.0, weightKg: 4000, speedKmh: 20 },
  images: img('tsintaosaurus'),
  facts: [
    { label: 'Crest', value: 'Unicorn dinosaur', icon: 'star', description: 'Nicknamed the "unicorn dinosaur", Tsintaosaurus had a hollow spike projecting forward and upward from its skull — but the exact shape of this crest was debated for decades due to poor initial preservation.' },
    { label: 'Debate', value: '50+ year debate', icon: 'lightbulb', description: 'When first described, scientists argued whether the crest pointed forward or backward, or even if it was a real crest at all. Modern material finally confirmed it as a genuine, prominent crest.' },
    { label: 'Acoustics', value: 'Sound resonator', icon: 'feather', description: 'Like other crested hadrosaurs, the hollow structure of Tsintaosaurus\'s crest likely amplified vocalisations, helping herd members recognise each other at long distances.' },
    { label: 'China', value: 'Shandong Province', icon: 'anchor', description: 'Found in Shandong Province, China, Tsintaosaurus is one of several remarkable dinosaurs from this fossil-rich region that has produced some of the largest dinosaurs in Asia.' },
  ],
  description: 'Tsintaosaurus spinorhinus — the "unicorn dinosaur" — was a hadrosaur from the Late Cretaceous of Shandong Province, China, notable for its distinctive hollow spike-like crest projecting forward from the skull. For over 50 years after its description, the exact orientation and shape of the crest was disputed among scientists — some thought it pointed forward, others backward, some even thought the spike was a fake. Modern material resolved the debate: the crest was real, prominent, and hollow. At 10 metres, it was one of the larger crested hadrosaurs of Late Cretaceous Asia.',
  longDescription: 'Tsintaosaurus spinorhinus (Young, 1958) is a lambeosaurine hadrosaurid from the Late Cretaceous (~84–71 Ma) Wangshi Group of Shandong Province, China. Described by C.C. Young in 1958, the initial material was imperfectly preserved, leading to decades of debate about the crest morphology. Young originally reconstructed a tall, forward-pointing, blade-like hollow spike — which earned the animal its "unicorn dinosaur" nickname. A study in 1990 argued the spike was positioned differently or absent (possibly an artefact). The discovery and description of more complete specimens from Shandong in subsequent years has confirmed that the crest was real: a tall, hollow, somewhat laterally compressed structure projecting forward and upward from the frontals and nasals, somewhat like a hollow forward-leaning horn. This crest, as in all lambeosaurines, was connected to the nasal passages and functioned as a resonating chamber for vocalisations. Tsintaosaurus grew to approximately 10 metres and an estimated 4,000 kg. Shandong Province (historically romanised as "Shantung") is a prolific dinosaur locality, also yielding the enormous hadrosaur Shantungosaurus, the ceratopsid Sinoceratops, and other Late Cretaceous taxa.',
  kidsDescription: 'Tsintaosaurus was the "Unicorn Dinosaur" from China with a hollow spike on its head! For 50 years scientists argued whether the crest was real or facing the wrong way — now we know it was REAL and pointed forward like a unicorn horn! It used the hollow spike to make resonant calls. A mystery dinosaur that kept palaeontologists guessing for half a century!',
  childFriendlyText: 'Tsintaosaurus was the "unicorn dinosaur" from China — with a real hollow forward-pointing spike on its head that it used to make booming resonant calls in the Cretaceous swamps.',
  scientificSummary: 'Tsintaosaurus spinorhinus (Young, 1958) is a lambeosaurine hadrosaurid from the Late Cretaceous (~84–71 Ma) Wangshi Group, Shandong Province, China. Distinctive crest: tall, hollow, anteriorly projecting, formed from modified frontals and nasals. Crest morphology debated for 50+ years; confirmed by additional specimens. ~10 m length; ~4,000 kg. Crest connected to nasal passages for acoustic function. Contemporaneous with Shantungosaurus and Sinoceratops in Shandong.',
  discoveries: [
    { year: 1950, location: 'Shandong Province, China', discoveredBy: 'C.C. Young', note: 'Described by Young in 1958; imperfect preservation led to decades of debate about crest morphology, which was not resolved until better material was found.' },
  ],
  funFact: 'Tsintaosaurus may be one of the most argued-about dinosaurs in history — scientists spent over 50 years unable to agree on what its most distinctive feature (the crest) even looked like. It took new, better-preserved specimens to finally settle the unicorn debate.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Lambeosaurinae', genus: 'Tsintaosaurus', species: 'T. spinorhinus' },
  relatedDinosaurs: [
    { id: 'parasaurolophus', relationship: 'Lambeosaurine hadrosaur relative' },
    { id: 'corythosaurus', relationship: 'Crested hadrosaur relative' },
    { id: 'edmontosaurus', relationship: 'Hadrosaur relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Zhucheng, Shandong Province (Wangshi Group)', coordinates: [36.0, 119.4], specimenName: 'IVPP V725 — holotype skull with crest' },
  ],
  dangerLevel: 2, intelligence: 4,
}
