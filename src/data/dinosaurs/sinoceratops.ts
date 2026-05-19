import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Sinoceratops: Dinosaur = {
  id: 'sinoceratops', slug: 'sinoceratops', displayName: 'Sinoceratops', name: 'Sinoceratops',
  pronunciation: 'SY-no-SER-ah-tops', nameMeaning: 'Chinese Horned Face', genusName: 'Sinoceratops',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [73, 66],
  dimensions: { lengthMeters: 6.0, heightMeters: 2.0, weightKg: 2000, speedKmh: 20 },
  images: img('sinoceratops'),
  facts: [
    { label: 'China only', value: 'Only large Asian ceratopsid', icon: 'star', description: 'Sinoceratops is the only large ceratopsid dinosaur known from China — and one of very few from all of Asia — making it an exceptional find that expands our knowledge of ceratopsian distribution.' },
    { label: 'Horns', value: 'Unique forward-curved nose horn', icon: 'target', description: 'Sinoceratops had a large, slightly forward-curved nasal horn and small frill knobs, giving it a distinctive profile different from North American ceratopsids like Triceratops.' },
    { label: 'Jurassic World', value: 'Movie star', icon: 'trophy', description: 'Sinoceratops became famous worldwide after appearing in Jurassic World: Fallen Kingdom (2018) — bringing this obscure Chinese ceratopsid to global attention.' },
    { label: 'Frill', value: 'Bumpy frill rim', icon: 'layers', description: 'The frill of Sinoceratops is rimmed with rounded, knob-like epioccipitals — a different style from the spike-adorned frills of Styracosaurus or the smooth frills of Triceratops.' },
  ],
  description: 'Sinoceratops zhuchengensis was a large ceratopsid from the Late Cretaceous of Shandong Province, China — the only large ceratopsid known from anywhere in Asia. With a prominent nasal horn and a moderately sized frill edged with rounded knobs, it had a distinctive appearance different from its North American relatives. Living in the same Zhucheng ecosystem as the giant hadrosaur Shantungosaurus, Sinoceratops represents a remarkable relic of ceratopsid distribution: a large ceratopsid that somehow persisted in Asia while most of the lineage was flowering in North America.',
  longDescription: 'Sinoceratops zhuchengensis (Xu et al., 2010) is a ceratopsid ceratopsian from the Maastrichtian (~73–66 Ma) Wangshi Group of Zhucheng, Shandong Province, China. It is the only confirmed large ceratopsid from China and one of the very few from Asia as a whole (the other main Asian ceratopsids are typically small-bodied forms like Protoceratops and Psittacosaurus). At approximately 6 metres in length and 2,000 kg, Sinoceratops was a substantial animal. The skull bears a robust nasal horn projecting forward and upward, while the brow horns are small or absent. The parietal-squamosal frill is of moderate size and rimmed with knob-like epioccipital bones — a distinct morphology from the spike-studded frills of centrosaurine ceratopsids or the long, elaborate frills of chasmosaurines. Phylogenetically, Sinoceratops is resolved as a centrosaurine ceratopsid. Its presence in the Wangshi Group alongside Shantungosaurus hadrosaurs, Zhuchengtyrannus tyrannosaurid, and Tsintaosaurus hadrosaurs makes it part of one of the richest Late Cretaceous faunas known from Asia. Sinoceratops appeared in Jurassic World: Fallen Kingdom (2018), becoming one of the most publicly recognised Chinese dinosaurs.',
  kidsDescription: 'Sinoceratops was the ONLY large horned dinosaur ever found in China! With a prominent nose horn and a bumpy-rimmed frill, it was related to Triceratops but from the other side of the world. It became FAMOUS when it appeared in Jurassic World: Fallen Kingdom! Living alongside the giant Shantungosaurus hadrosaur, it was a key member of Late Cretaceous China\'s dinosaur world.',
  childFriendlyText: 'Sinoceratops was the only large ceratopsid from China — with a distinctive nose horn and bumpy frill rim — and became famous from its appearance in Jurassic World: Fallen Kingdom.',
  scientificSummary: 'Sinoceratops zhuchengensis (Xu et al., 2010) is a centrosaurine ceratopsid from the Maastrichtian Wangshi Group (~73–66 Ma), Zhucheng, Shandong, China. Only large ceratopsid from China; one of few Asian members of Ceratopsidae. Skull with robust nasal horn; brow horns vestigial; frill rimmed with knob-like epioccipitals. ~6 m length, ~2,000 kg. Contemporaneous with Shantungosaurus, Zhuchengtyrannus, and Tsintaosaurus in Shandong. Phylogenetically centrosaurine.',
  discoveries: [
    { year: 2008, location: 'Zhucheng, Shandong Province, China', discoveredBy: 'Xu Xing et al.', note: 'Described by Xu Xing and colleagues in 2010 from material found in Zhucheng; the finding extended the known range of large ceratopsids into Asia.' },
  ],
  funFact: 'While hundreds of ceratopsid species have been found in North America, Sinoceratops was isolated in China with no close neighbours — the last ceratopsid eastward outpost in a group that otherwise dominated North American Late Cretaceous ecosystems. It\'s as if one family of pandas survived in Europe while all the others stayed in Asia.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Centrosaurinae', genus: 'Sinoceratops', species: 'S. zhuchengensis' },
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Ceratopsid relative' },
    { id: 'protoceratops', relationship: 'Earlier Asian ceratopsian ancestor' },
    { id: 'psittacosaurus', relationship: 'Ancestral Asian ceratopsian' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Zhucheng, Shandong Province (Wangshi Group)', coordinates: [35.99, 119.4], specimenName: 'ZCDM V0010 — holotype partial skull' },
  ],
  dangerLevel: 4, intelligence: 4,
}
