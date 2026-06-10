import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Qianzhousaurus: Dinosaur = {
  id: 'qianzhousaurus', slug: 'qianzhousaurus', displayName: 'Qianzhousaurus', name: 'Qianzhousaurus',
  pronunciation: 'chee-AN-zoo-SOR-us', nameMeaning: 'Lizard from Qianzhou', genusName: 'Qianzhousaurus',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [72, 66],
  dimensions: { lengthMeters: 7.5, heightMeters: 2.5, weightKg: 1000, speedKmh: 35 },
  images: img('qianzhousaurus'),
  facts: [
    { label: 'Nickname', value: 'Pinocchio rex', icon: 'star', description: 'Long-snouted tyrannosaur nicknamed "Pinocchio rex" by the press — the name stuck and the fossil is now famous worldwide.' },
    { label: 'Snout', value: 'Very long and slender', icon: 'arrow-up', description: 'A dramatically elongated, low skull — much longer and shallower than the deep, bone-crushing skull of T. rex.' },
    { label: 'Family', value: 'Alioramini', icon: 'swords', description: 'Belongs to a small branch of long-snouted tyrannosaurids called Alioramini — distinct from the giant crushing tyrannosaurines.' },
    { label: 'Discovered', value: '2014 find', icon: 'clock', description: 'Formally described in 2014 from Ganzhou, southern China — a remarkable Late Cretaceous discovery.' },
  ],
  description: 'Nicknamed "Pinocchio rex" by the press, Qianzhousaurus is a long-snouted tyrannosaurid from Late Cretaceous China — a lean, swift cousin of T. rex that hunted in a very different style than the bone-crushing giant.',
  longDescription: 'Qianzhousaurus sinensis (Lü, Pu, Yi, Xu, Wei, Liu & Chang, 2014) is an alioramin tyrannosaurid from the Maastrichtian Nanxiong Formation of Ganzhou, Jiangxi Province, southern China. The holotype is a nearly complete skull and partial skeleton. Its most distinctive feature is the long, low, narrow snout — strikingly different from the tall, deep, bone-crushing skull of Tyrannosaurus. The body was slender and lightly built for a tyrannosaur, suggesting a faster, more agile predator that may have hunted smaller, swifter prey such as small ornithischians and young sauropods. Alioramins — including Alioramus from Mongolia and Qianzhousaurus from China — represent a separate evolutionary radiation of long-snouted tyrannosaurids. The discovery was so unusual that the popular media quickly dubbed it "Pinocchio rex" because of its elongated snout. Despite its modest size (~7–8 m, ~750 kg), Qianzhousaurus was still a fearsome predator, and its existence shows that the tyrannosaurid family was far more ecologically diverse than T. rex alone would suggest.',
  kidsDescription: 'Qianzhousaurus is the dinosaur with a LONG NOSE — nicknamed "Pinocchio rex"! While T. rex had a deep skull for crushing bones, this one had a slim snout for grabbing quick little prey. Imagine a T. rex that ran like a roadrunner!',
  childFriendlyText: 'Qianzhousaurus was a long-snouted tyrannosaur from China, nicknamed "Pinocchio rex". It was slimmer and faster than T. rex.',
  scientificSummary: 'Qianzhousaurus sinensis (Lü et al., 2014) is an alioramin tyrannosaurid from the Maastrichtian Nanxiong Formation, Ganzhou, Jiangxi, China. Diagnostic elongated, low, narrow snout. Slender build, ~7.5 m long. Phylogenetically within the long-snouted alioramin radiation alongside Alioramus altai. Important for understanding ecological partitioning among latest Cretaceous tyrannosaurids of Asia.',
  discoveries: [
    { year: 2010, location: 'Ganzhou, Jiangxi Province, China', discoveredBy: 'Construction workers; later collected by Lü Junchang and team', note: 'Nearly complete skull and partial skeleton — the most complete alioramin yet found.' },
  ],
  funFact: 'When the "Pinocchio rex" paper was published in 2014, the nickname went viral around the world. The discoverers kept the scientific name Qianzhousaurus — but the cute nickname stuck forever!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Tyrannosaurinae', genus: 'Qianzhousaurus', species: 'Q. sinensis' },
  relatedDinosaurs: [
    { id: 'tarbosaurus', relationship: 'Asian tyrannosaurid relative' },
    { id: 'albertosaurus', relationship: 'Earlier tyrannosaurid' },
    { id: 'tyrannosaurus-rex', relationship: 'Distant cousin' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Nanxiong Formation, Ganzhou, Jiangxi', coordinates: [25.85, 114.95], specimenName: 'GMFPI-PV-001 — holotype skull and skeleton' },
  ],
  dangerLevel: 8, intelligence: 6,
  birdRelation: 'Like all tyrannosaurids, Qianzhousaurus was a coelurosaur and a distant relative of birds, sharing with them an articulated jaw, a wishbone, and a three-fingered hand.'
}
