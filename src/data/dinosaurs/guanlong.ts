import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Guanlong: Dinosaur = {
  id: 'guanlong', slug: 'guanlong', displayName: 'Guanlong', name: 'Guanlong',
  pronunciation: 'GWAHN-long', nameMeaning: 'Crown Dragon', genusName: 'Guanlong',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [160, 160],
  dimensions: { lengthMeters: 3.0, heightMeters: 1.0, weightKg: 125, speedKmh: 30 },
  images: img('guanlong'),
  facts: [
    { label: 'Name', value: 'Crown dragon', icon: 'crown', description: 'Guanlong means "Crown Dragon" in Mandarin — referring to the delicate, ornamental crest on its head.' },
    { label: 'Crest', value: 'Thin bony crest', icon: 'shield', description: 'A thin, delicate bony crest running along the top of the skull — likely used for display.' },
    { label: 'Family', value: 'Early tyrannosauroid', icon: 'star', description: 'One of the earliest and most primitive tyrannosauroids known — a tiny ancestor of T. rex.' },
    { label: 'Age', value: 'Pre-dated T. rex', icon: 'clock', description: 'Lived about 90 million years before T. rex — the tiny forerunner of the tyrant king.' },
  ],
  description: 'Guanlong was a tiny, crested ancestor of Tyrannosaurus rex — a delicate, fox-sized predator from Jurassic China wearing a thin ornamental crown of bone. The humble beginning of the tyrannosaur lineage.',
  longDescription: 'Guanlong wucaii (Xu, Clark, Forster, Norell, Erickson, Eberth, Jia & Zhao, 2006) is a proceratosaurid tyrannosauroid theropod from the Late Jurassic (Oxfordian) Shishugou Formation of Xinjiang, western China. Reaching only 3 metres in length and weighing around 125 kg, Guanlong was a small-bodied, agile predator that lived about 90 million years before the famous Tyrannosaurus rex. Its most striking feature is a thin, hollow, delicate bony crest running along the midline of the skull from the snout to above the eyes — likely too fragile to serve as a weapon, and almost certainly used for visual display and species recognition. Guanlong is one of the earliest and most basal tyrannosauroids known, providing crucial evidence for the early evolution of the lineage that would later produce T. rex. Anatomically, it already shows some features later characteristic of tyrannosaurids: an enlarged head, a small three-fingered hand, and long hindlimbs — but it also retains more basal features such as long arms. Guanlong\'s discovery in 2006 dramatically changed our understanding of tyrannosauroid origins, pushing them back to the Late Jurassic and showing that even T. rex\'s ancestors started small and fancy.',
  kidsDescription: 'Guanlong means "CROWN DRAGON" — it was a tiny, fox-sized T. rex ancestor with a delicate crest on its head! Imagine a T. rex that could fit on your couch, wearing a little crown!',
  childFriendlyText: 'Guanlong was a small early ancestor of T. rex from China. It had a thin bony crest on its head and lived 90 million years before T. rex!',
  scientificSummary: 'Guanlong wucaii (Xu et al., 2006) is a proceratosaurid tyrannosauroid from the Oxfordian Shishugou Formation, Xinjiang, China. ~3 m long, 125 kg. Diagnostic thin, hollow cranial crest. Among the earliest and most basal tyrannosauroids known, providing a critical data point for the deep origin of the lineage that later produced Tyrannosaurus rex.',
  discoveries: [
    { year: 2002, location: 'Shishugou Formation, Xinjiang, China', discoveredBy: 'Xu Xing and team', note: 'Two well-preserved skeletons collected by a joint Chinese-American expedition.' },
  ],
  funFact: 'Guanlong was found by the same Chinese-American team that discovered Guanlong\'s famous cousin — the four-winged Anchiornis — showing how extraordinarily rich the Jurassic beds of China really are!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Proceratosauridae', genus: 'Guanlong', species: 'G. wucaii' },
  relatedDinosaurs: [
    { id: 'proceratosaurus', relationship: 'Crest-crested proceratosaurid cousin' },
    { id: 'tyrannosaurus-rex', relationship: 'Distant descendant' },
    { id: 'dilophosaurus', relationship: 'Contemporaneous crested theropod' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Shishugou Formation, Xinjiang', coordinates: [43.5, 88.5], specimenName: 'IVPP V14531 — holotype articulated skeleton' },
  ],
  dangerLevel: 4, intelligence: 6, birdRelation: 'As a coelurosaur and tyrannosauroid, Guanlong is a distant relative of birds, sharing with them hollow bones, a three-fingered hand, and other theropod traits.'
}
