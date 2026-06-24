import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Zhongyuansaurus: Dinosaur = {
  id: 'zhongyuansaurus', slug: 'zhongyuansaurus', displayName: 'Zhongyuansaurus', name: 'Zhongyuansaurus',
  pronunciation: 'JONG-ywan-SORE-us', nameMeaning: 'Zhongyuan Lizard', genusName: 'Zhongyuansaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'forest',
  livedIn: ['China'], periodRangeMya: [125, 100],
  dimensions: { lengthMeters: 4.5, heightMeters: 1.2, weightKg: 700, speedKmh: 8 },
  images: { ...img('zhongyuansaurus'), video: '/videos/dinosaurs/zhongyuansaurus/video.mp4' },
  facts: [
    { label: 'Origin', value: 'Henan, China', icon: 'map-pin', description: 'Described in 2009 by Lü Junchang and colleagues from the Mangchuan Formation of Henan Province, central China — a primitive ankylosaurid from the Early Cretaceous.' },
    { label: 'Phylogeny', value: 'Primitive ankylosaurid', icon: 'git-branch', description: 'A basal member of Ankylosauridae, closely related to Gobisaurus and Shamosaurus, helping to anchor the Asian origin of the club-tailed ankylosaurs.' },
    { label: 'Armor', value: 'Primitive shielding', icon: 'shield', description: 'Lacked the well-developed tail club of later ankylosaurids — its body armor of osteoderms and dermal plates represents a more ancestral defensive condition.' },
    { label: 'Size', value: 'About 4.5 m', icon: 'ruler', description: 'Estimated at roughly 4 to 5 metres in length and several hundred kilograms in mass — a medium-sized quadrupedal herbivore for its formation.' },
  ],
  description: 'A primitive ankylosaurid from the Early Cretaceous of Henan, China. Zhongyuansaurus was a medium-sized, armoured herbivore that lived roughly 125 million years ago in the forests and floodplains of central China. Closely related to Gobisaurus and Shamosaurus, it represents an early stage in the evolution of the heavily-armoured, club-tailed ankylosaurids that would dominate later in the Cretaceous.',
  longDescription: 'Zhongyuansaurus luoyangensis (Lü et al., 2009) is a basal ankylosaurid ankylosaur from the Early Cretaceous Mangchuan Formation of Henan Province, China. The holotype consists of a partial postcranial skeleton including dorsal and caudal vertebrae, ribs, scapula, humerus, ulna, femur, tibia, and osteoderms. Phylogenetic analyses consistently recover Zhongyuansaurus as a primitive ankylosaurid, positioned outside the more derived Ankylosaurinae (which includes Ankylosaurus and Euoplocephalus) but within Ankylosauridae, forming a clade with Gobisaurus and Shamosaurus that is significant for understanding the Asian origins and early radiation of club-tailed ankylosaurs. Notably, Zhongyuansaurus appears to lack the well-developed tail club seen in later ankylosaurids — though the distal caudal vertebrae are not fully preserved, the known osteoderms do not show the co-ossified knob typical of clubbed forms, suggesting a more ancestral defensive strategy reliant on body armour. As a low-browsing herbivore, it would have fed on ferns, cycadophytes, and conifers in the floodplain forests of Early Cretaceous central China, sharing its environment with other primitive ankylosaurs and the earliest hadrosauroids.',
  kidsDescription: 'Zhongyuansaurus was a chunky, armoured plant-eater from ancient China — about as long as a small car! It walked on four sturdy legs and had bony plates covering its back. It lived about 125 million years ago, way back in the Cretaceous period, and was an early cousin of the famous Ankylosaurus.',
  childFriendlyText: 'Zhongyuansaurus was a four-legged, armoured plant-eater from Early Cretaceous China — an early relative of Ankylosaurus that lived in what is now Henan Province.',
  scientificSummary: 'Zhongyuansaurus luoyangensis (Lü et al., 2009) is a basal ankylosaurid from the Early Cretaceous Mangchuan Formation of Henan Province, China. Known from a partial postcranial skeleton including vertebrae, limb bones, and osteoderms. Phylogenetically positioned as a primitive ankylosaurid, allied with Gobisaurus and Shamosaurus. Lacks a well-developed tail club, retaining a more ancestral defensive morphology. A low-browsing herbivore of Early Cretaceous central Chinese floodplain forests.',
  discoveries: [
    { year: 2009, location: 'Henan Province, China', discoveredBy: 'Lü Junchang et al.', note: 'Described from the Mangchuan Formation; a primitive ankylosaurid closely related to Gobisaurus and Shamosaurus.' },
  ],
  funFact: 'Zhongyuansaurus is one of the most primitive ankylosaurids ever found — it sits near the base of the family tree, just before ankylosaurids evolved the famous tail club that would later help Ankylosaurus fend off T. rex.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ankylosauria', family: 'Ankylosauridae', genus: 'Zhongyuansaurus', species: 'Z. luoyangensis' },
  relatedDinosaurs: [
    { id: 'ankylosaurus', relationship: 'Later ankylosaurid relative' },
    { id: 'euoplocephalus', relationship: 'Later ankylosaurid relative' },
    { id: 'nodosaurus', relationship: 'Ankylosaur relative (nodosaurid branch)' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Henan Province (Mangchuan Formation)', coordinates: [34.62, 113.0], specimenName: 'Mangchuan Formation, Early Cretaceous' },
  ],
  dangerLevel: 3,
  intelligence: 3,
}
