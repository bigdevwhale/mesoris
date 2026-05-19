import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Scutellosaurus: Dinosaur = {
  id: 'scutellosaurus', slug: 'scutellosaurus', displayName: 'Scutellosaurus', name: 'Scutellosaurus',
  pronunciation: 'skoo-TEL-oh-SOR-us', nameMeaning: 'Little Shield Lizard', genusName: 'Scutellosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'small', habitat: 'desert',
  livedIn: ['North America'], periodRangeMya: [196, 183],
  dimensions: { lengthMeters: 1.2, heightMeters: 0.4, weightKg: 10, speedKmh: 20 },
  images: img('scutellosaurus'),
  facts: [
    { label: 'Armour', value: '300+ osteoderms', icon: 'shield', description: 'Scutellosaurus was covered with over 300 small bony skin scutes (osteoderms) — an extraordinary density of armour for an animal barely 1.2 metres long.' },
    { label: 'Ancestry', value: 'Earliest thyreophoran', icon: 'layers', description: 'Scutellosaurus is the earliest confirmed thyreophoran dinosaur — the founding member of the entire armoured dinosaur lineage that culminated in Stegosaurus and Ankylosaurus.' },
    { label: 'Tail', value: 'Very long tail', icon: 'arrow-up', description: 'Its tail was disproportionately long — nearly half its total body length — providing balance when running on two legs and counterweighting the heavy armoured torso.' },
    { label: 'Arizona', value: 'Kayenta Formation', icon: 'anchor', description: 'Found in the Kayenta Formation of Arizona — an Early Jurassic desert environment that also produced the early theropod Dilophosaurus, showing a diverse Early Jurassic North American ecosystem.' },
  ],
  description: 'Scutellosaurus lawleri was a tiny but remarkable animal — the earliest known thyreophoran dinosaur, ancestor to Stegosaurus and Ankylosaurus. Living in the desert environment of what is now Arizona approximately 196 to 183 million years ago, it was covered with more than 300 small bony scutes embedded in its skin, providing exceptional protection despite its small size. Its unusually long tail balanced its armoured body while running on two legs. Scutellosaurus represents the humble origin of the entire armoured dinosaur lineage.',
  longDescription: 'Scutellosaurus lawleri (Colbert, 1981) is a basal thyreophoran ornithischian from the Early Jurassic Kayenta Formation (~196–183 Ma) of Coconino County, Arizona, USA. The smallest confirmed thyreophoran, at ~1.2 metres and ~10 kg, Scutellosaurus was covered with over 300 osteoderms (bony skin scutes) of varying size — an exceptional armament for an animal of its size, and the earliest manifestation of the defensive body plan that would define the thyreophoran lineage. The hindlimbs were proportionally longer than the forelimbs, indicating habitual bipedality, but the tail was remarkably elongated (making up ~60% of total body length) to counterbalance the armoured, front-heavy torso during bipedal locomotion. The Kayenta Formation where Scutellosaurus was found was an arid, seasonally dry environment with river channels — an ecology shared with the early theropod Dilophosaurus and prosauropod-grade animals. Phylogenetically, Scutellosaurus is the sister taxon to all other thyreophorans, meaning that all subsequent armoured dinosaurs — from Scelidosaurus to Ankylosaurs — had ancestors that looked something like this small, quick, shield-skinned creature.',
  kidsDescription: 'Scutellosaurus was a TINY dinosaur covered in more than 300 bony skin plates — the earliest ancestor of ALL armoured dinosaurs! Only 1.2 metres long and living in Arizona\'s deserts, it had such a heavy armoured front that it needed a super-long tail for balance when running on two legs. The first "knight" of the dinosaur world!',
  childFriendlyText: 'Scutellosaurus was the tiniest armoured dinosaur — only 1.2 m, covered in 300+ bony scutes — and the earliest ancestor of Stegosaurus and Ankylosaurus.',
  scientificSummary: 'Scutellosaurus lawleri (Colbert, 1981) is the most basal thyreophoran ornithischian, from the Hettangian–Sinemurian Kayenta Formation (~196–183 Ma), Coconino County, Arizona, USA. Smallest confirmed thyreophoran (~1.2 m, ~10 kg). Integumentary armour: 300+ heterogeneous osteoderms. Elongated tail (~60% body length) provides bipedal counterbalance to armoured torso. Phylogenetically sister to all other Thyreophora; earliest member of the clade ancestral to Stegosauria and Ankylosauria.',
  discoveries: [
    { year: 1981, location: 'Kayenta Formation, Arizona, USA', discoveredBy: 'Edwin H. Colbert', note: 'Described by Colbert in 1981 from the Kayenta Formation; important as the earliest known thyreophoran.' },
  ],
  funFact: 'Scutellosaurus was so small — barely bigger than a chicken — that each of its 300+ bony armour plates was no bigger than a fingernail. Yet this tiny creature was the great-great-great-many-times-removed ancestor of the 6-tonne Ankylosaurus.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Thyreophora', family: 'Scutellosauridae', genus: 'Scutellosaurus', species: 'S. lawleri' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Much later thyreophoran descendant' },
    { id: 'ankylosaurus', relationship: 'Much later thyreophoran descendant' },
    { id: 'scelidosaurus', relationship: 'Closely related early thyreophoran' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Coconino County, Arizona (Kayenta Formation)', coordinates: [36.5, -111.5], specimenName: 'UCMP 129015 — holotype partial skeleton' },
  ],
  dangerLevel: 1, intelligence: 3,
}
