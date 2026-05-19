import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tuojiangosaurus: Dinosaur = {
  id: 'tuojiangosaurus', slug: 'tuojiangosaurus', displayName: 'Tuojiangosaurus', name: 'Tuojiangosaurus',
  pronunciation: 'too-HWANG-oh-SOR-us', nameMeaning: 'Tuo River Lizard', genusName: 'Tuojiangosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [163, 145],
  dimensions: { lengthMeters: 7.0, heightMeters: 2.1, weightKg: 2800, speedKmh: 12 },
  images: img('tuojiangosaurus'),
  facts: [
    { label: 'Plates', value: '15 pairs of plates', icon: 'layers', description: 'Tuojiangosaurus bore approximately 15 pairs of bony plates and spikes along its back and tail — more pairs than the famous Stegosaurus, giving it an imposing profile.' },
    { label: 'Thagomizer', value: 'Four tail spikes', icon: 'shield', description: 'The tail ended in four long spikes — the "thagomizer" — a lethal defensive weapon capable of inflicting serious wounds on predators like Yangchuanosaurus.' },
    { label: 'Brain', value: 'Small brain', icon: 'brain', description: 'Like all stegosaurs, Tuojiangosaurus had a very small brain relative to its body — roughly the size of a walnut for a nearly 3-tonne animal.' },
    { label: 'China', value: 'Best-known Chinese stegosaur', icon: 'star', description: 'Tuojiangosaurus is the best-known and most completely described stegosaur from China, known from two partial skeletons from Sichuan Province.' },
  ],
  description: 'Tuojiangosaurus multispinus was the premier stegosaur of Jurassic China, bearing 15 pairs of bony plates and spikes running the length of its back, and a formidable four-spiked tail weapon. Contemporary with the apex predator Yangchuanosaurus, it relied on its armament and large size for defence. Known from two partial skeletons from Sichuan Province, it is the best-documented Chinese stegosaur. Its anatomy closely parallels the better-known Stegosaurus of North America, illustrating how stegosaurs evolved similar body plans across the Late Jurassic world.',
  longDescription: 'Tuojiangosaurus multispinus (Dong et al., 1977) is a stegosaurid thyreophoran from the Late Jurassic Shangshaximiao Formation of Zigong, Sichuan Province, China (~163–145 Ma). Two partial skeletons are known, making it one of the better-preserved Chinese stegosaurs. The distinctive dorsal armour consists of approximately 15 pairs of alternating plates and spines, with the largest plates located over the hips. The tail terminates in four elongate spikes — the thagomizer — which provided active defence against contemporaneous predators such as Yangchuanosaurus. Unlike the somewhat larger North American Stegosaurus, Tuojiangosaurus had more numerous but generally narrower dorsal plates. Feeding mechanics suggest a low-browsing herbivore targeting ferns, cycads, and low-growing conifers. The small brain cavity and large gut suggest a slow-moving, energy-efficient herbivore rather than an active animal. Stegosauria as a clade had a Near-global distribution in the Late Jurassic, and Tuojiangosaurus\'s similarity to forms in North America and Africa demonstrates the evolutionary conservatism of the stegosaur body plan across different continents.',
  kidsDescription: 'Tuojiangosaurus was the best Chinese stegosaur — with 15 pairs of bony plates along its back and FOUR deadly tail spikes! It lived in Sichuan Province alongside the giant predator Yangchuanosaurus. Like its cousin Stegosaurus, it had a tiny brain but a great armoured body for defence.',
  childFriendlyText: 'Tuojiangosaurus was China\'s best-known stegosaur — with 15 pairs of plates along its back and four dangerous tail spikes for defence!',
  scientificSummary: 'Tuojiangosaurus multispinus (Dong et al., 1977) is a stegosaurid from the Oxfordian–Tithonian Shangshaximiao Formation, Zigong, Sichuan, China (~163–145 Ma). Two partial skeletons known. Dorsal armour comprises ~15 plate/spine pairs; tail bears four thagomizer spikes. Contemporaneous with sinraptorid predator Yangchuanosaurus. Phylogenetically resolved as a derived stegosaurid within Stegosauria.',
  discoveries: [
    { year: 1977, location: 'Zigong, Sichuan Province, China', discoveredBy: 'Dong Zhiming, Tang Zilu, Zhou Shiwu', note: 'Two partial skeletons recovered from the Shangshaximiao Formation, described in 1977; one specimen now displayed at Zigong Dinosaur Museum.' },
  ],
  funFact: 'Tuojiangosaurus and Stegosaurus never met — they lived on different sides of the world — but they evolved nearly identical body plans independently. This convergent evolution shows how effective the "armoured plate" design was as a herbivore strategy in the Late Jurassic.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Thyreophora', family: 'Stegosauridae', genus: 'Tuojiangosaurus', species: 'T. multispinus' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Close North American stegosaurid relative' },
    { id: 'kentrosaurus', relationship: 'African stegosaurid relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Zigong, Sichuan Province (Shangshaximiao Formation)', coordinates: [29.36, 104.77], specimenName: 'CV 209 — primary skeleton, Zigong Dinosaur Museum' },
  ],
  dangerLevel: 4, intelligence: 3,
}
