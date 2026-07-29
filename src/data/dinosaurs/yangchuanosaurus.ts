import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Yangchuanosaurus: Dinosaur = {
  id: 'yangchuanosaurus', slug: 'yangchuanosaurus', displayName: 'Yangchuanosaurus', name: 'Yangchuanosaurus',
  pronunciation: 'yang-CHWON-oh-SOR-us', nameMeaning: 'Yongchuan Lizard', genusName: 'Yangchuanosaurus',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [163, 145],
  dimensions: { lengthMeters: 11.0, heightMeters: 3.2, weightKg: 2300, speedKmh: 25 },
  images: img('yangchuanosaurus'),
  facts: [
    { label: 'Predator', value: 'Top of Jurassic China', icon: 'skull', description: 'Yangchuanosaurus was the apex predator of the Shangshaximiao Formation, dominating the ecosystem of what is now Sichuan Province, China.' },
    { label: 'Skull', value: 'Bony crests', icon: 'layers', description: 'The skull bore small bony protuberances and ridges above the snout and eyes, a feature unique among its relatives and possibly used for visual display.' },
    { label: 'Prey', value: 'Giant sauropods', icon: 'target', description: 'Its likely prey included large sauropods like Shunosaurus and Omeisaurus — enormous plant-eaters that it would have ambushed or hunted cooperatively.' },
    { label: 'Relative', value: 'Sinraptorid', icon: 'anchor', description: 'Yangchuanosaurus belongs to Sinraptoridae — an Asian group of allosauroid theropods that paralleled the evolution of Allosaurus in North America.' },
  ],
  description: 'Yangchuanosaurus shangyouensis was the undisputed apex predator of Jurassic China, prowling the lush subtropical forests of what is now Sichuan Province approximately 163 to 145 million years ago. A large sinraptorid allosauroid, it grew to 11 metres and bore a distinctive skull decorated with small bony ridges and protuberances. Contemporaneous with the giant sauropods Shunosaurus and Omeisaurus, Yangchuanosaurus was the Chinese equivalent of North America\'s Allosaurus, dominating its ecosystem through size and predatory power.',
  longDescription: 'Yangchuanosaurus shangyouensis (Dong et al., 1978) is a sinraptorid metatetanuran theropod from the Late Jurassic Shangshaximiao Formation of Yongchuan, Sichuan Province, China, dating to ~163–145 Ma. Two species are recognised: Y. shangyouensis and the slightly larger Y. magnus. As the largest known predatory dinosaur from Jurassic Asia, Yangchuanosaurus occupied the apex predator niche in a rich ecosystem that included multiple large sauropod species, the stegosaur Tuojiangosaurus, and the ornithopod Xiaosaurus. Its skull is large and deep, bearing small nasal and orbital crests likely used for intraspecific display; the jaws were lined with blade-like, laterally compressed serrated teeth. Sinraptoridae — the family to which Yangchuanosaurus belongs — is an Asian endemic radiation of allosauroids that evolved independently from, but in parallel with, Allosaurus in North America, demonstrating convergent predatory morphology across the Late Jurassic supercontinent.',
  kidsDescription: 'Yangchuanosaurus was the king of Jurassic China — an 11-metre predator that hunted giant sauropods! Its skull had cool bony ridges and crests. It lived in Sichuan Province and was China\'s answer to Allosaurus, ruling the top of the food chain 163 million years ago.',
  childFriendlyText: 'Yangchuanosaurus was the biggest predator in Jurassic China — 11 metres long with a skull decorated with bony ridges, hunting giant long-necked dinosaurs.',
  scientificSummary: 'Yangchuanosaurus shangyouensis (Dong et al., 1978) is a sinraptorid allosauroid from the Oxfordian–Tithonian Shangshaximiao Formation, Yongchuan, Sichuan, China (~163–145 Ma). Largest Jurassic theropod from Asia. Skull ornamented with nasal and lacrimal bony crests. Phylogenetically placed within Sinraptoridae (Allosauroidea), closely related to Sinraptor dongi. Occupied apex predator guild alongside giant Shangshaximiao sauropods.',
  discoveries: [
    { year: 1977, location: 'Yongchuan, Sichuan Province, China', discoveredBy: 'Dong Zhiming, Chang Yoichi, Li Xuanmin, Zhou Shiwu', note: 'Holotype nearly complete skull and partial skeleton discovered during construction work; described by Dong et al. in 1978.' },
    { year: 1983, location: 'Dashanpu Quarry, Zigong, Sichuan, China', discoveredBy: 'Dong Zhiming', note: 'Second species, Y. magnus, described from Dashanpu material — slightly larger and more completely known.' },
  ],
  funFact: 'Yangchuanosaurus lived alongside some of the most complete sauropod dinosaurs ever found in China. The Dashanpu Quarry where its relatives were discovered is so rich in dinosaur fossils that it became the site of a dedicated Dinosaur Museum — the Zigong Dinosaur Museum, one of the world\'s best.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Sinraptoridae', genus: 'Yangchuanosaurus', species: 'Y. shangyouensis' },
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Allosauroid relative from North America' },
    { id: 'ceratosaurus', relationship: 'Contemporary ceratosaurid' },
    { id: 'torvosaurus', relationship: 'Large Jurassic predator relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Yongchuan, Sichuan Province (Shangshaximiao Formation)', coordinates: [29.35, 105.93], specimenName: 'CV 00215 — holotype skull and skeleton' },
    { country: 'China', region: 'Zigong, Sichuan Province (Dashanpu Formation)', coordinates: [29.36, 104.77], specimenName: 'Y. magnus material — Zigong Dinosaur Museum' },
  ],
  dangerLevel: 9, intelligence: 5,
  birdRelation: '2 / 10',
}
