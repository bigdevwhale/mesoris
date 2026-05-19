import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Torosaurus: Dinosaur = {
  id: 'torosaurus', slug: 'torosaurus', displayName: 'Torosaurus', name: 'Torosaurus',
  pronunciation: 'TOR-oh-SOR-us', nameMeaning: 'Perforated Lizard', genusName: 'Torosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [68, 66],
  dimensions: { lengthMeters: 9.0, heightMeters: 2.6, weightKg: 6000, speedKmh: 18 },
  images: img('torosaurus'),
  facts: [
    { label: 'Frill', value: 'Two large openings', icon: 'maximize', description: 'Torosaurus had the largest skull of any solid-frilled ceratopsid — and uniquely, its frill had two large oval openings (fenestrae), reducing weight while maintaining impressive visual size.' },
    { label: 'Controversy', value: 'The Triceratops debate', icon: 'lightbulb', description: 'In 2010, Jack Horner proposed that Torosaurus was simply a fully mature Triceratops — a controversial theory. Most current evidence suggests Torosaurus was a genuinely distinct genus.' },
    { label: 'Size', value: 'Enormous skull', icon: 'layers', description: 'The skull of Torosaurus was among the largest of any ceratopsid — up to 2.6 metres long including the frill — requiring a massively muscled neck to support it.' },
    { label: 'End-Cretaceous', value: 'Final days', icon: 'clock', description: 'Torosaurus lived right at the very end of the Cretaceous, 68 to 66 million years ago — one of the last ceratopsians to walk the Earth before the asteroid extinction.' },
  ],
  description: 'Torosaurus latus — "Perforated Lizard" — was a large chasmosaurine ceratopsid from the very end of the Cretaceous, distinguished by its enormous frill bearing two large oval openings (fenestrae). These openings reduced the weight of its massive skull while maintaining an impressive visual display. At 9 metres and 6,000 kg, Torosaurus was one of the largest ceratopsids ever. Its close resemblance to Triceratops — with which it coexisted — sparked a notorious debate about whether Torosaurus was actually a fully grown Triceratops.',
  longDescription: 'Torosaurus latus (Marsh, 1891) is a chasmosaurine ceratopsid from the Maastrichtian (~68–66 Ma) Lance and Hell Creek formations of Wyoming, South Dakota, Montana, and Utah. Named for its fenestrated (perforated) frill, Torosaurus differs from Triceratops in having a significantly longer frill with two large parietal fenestrae (openings), in contrast to Triceratops\'s shorter, solid frill. A 2010 study by Horner and Scanella proposed that Torosaurus represented the mature ontogenetic stage of Triceratops, arguing that the frill developed openings as the animal aged. This generated considerable scientific debate. Subsequent analyses of bone texture, skull histology, and specimen size-frequency distributions have largely supported the interpretation that Torosaurus was a distinct taxon, not a growth stage — noting that both "mature" Triceratops and Torosaurus specimens occur, and that not all Triceratops develop fenestrated frills. Torosaurus had two robust brow horns and a shorter nasal horn, with an enormous parietal-squamosal frill. Its body was massive, requiring powerful limbs. As one of the last ceratopsians before the end-Cretaceous extinction, Torosaurus represents the culmination of ceratopsid frill evolution.',
  kidsDescription: 'Torosaurus had the most SPECTACULAR frill of any dinosaur — enormous, with two big holes in it to reduce weight, but still looking amazing! Scientists ARGUED about whether it was just a grown-up Triceratops or its own species. Most evidence now says it\'s its own giant dinosaur. At 9 metres and 6 tonnes, it was one of the LAST ceratopsians before the asteroid hit!',
  childFriendlyText: 'Torosaurus had a massive perforated frill with two large openings, sparking a famous debate about whether it was a distinct species or a fully-grown Triceratops. Most evidence says: its own genus!',
  scientificSummary: 'Torosaurus latus (Marsh, 1891) is a chasmosaurine ceratopsid from the Maastrichtian Lance and Hell Creek formations (~68–66 Ma), western North America. Frill large and fenestrated (two parietal openings) — distinct from Triceratops solid frill. Synonymisation with Triceratops proposed (Horner & Scanella, 2010); largely rejected by subsequent analyses (Longrich & Field, 2012). Skull length ~2.6 m including frill. Body ~9 m, ~6,000 kg. Coexisted with Triceratops, Edmontosaurus, and Tyrannosaurus rex.',
  discoveries: [
    { year: 1891, location: 'Lance Formation, Wyoming, USA', discoveredBy: 'John Bell Hatcher', note: 'Material described by O.C. Marsh in 1891; multiple specimens subsequently found across the western USA in Lance and Hell Creek formations.' },
  ],
  funFact: 'Torosaurus and Triceratops lived in exactly the same places at the same time — making them the most closely competing large dinosaurs known. Whether they were the same species at different ages or true competitors has kept scientists arguing for decades, a controversy still not fully resolved.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Chasmosaurinae', genus: 'Torosaurus', species: 'T. latus' },
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Closest relative — once proposed as same species' },
    { id: 'styracosaurus', relationship: 'Ceratopsid relative' },
    { id: 'pentaceratops', relationship: 'Earlier chasmosaurine relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Niobrara County, Wyoming (Lance Formation)', coordinates: [43.0, -104.5], specimenName: 'YPM 1830 — holotype partial skull' },
    { country: 'USA', region: 'Harding County, South Dakota (Hell Creek Formation)', coordinates: [45.8, -102.5], specimenName: 'Referred skull specimens' },
  ],
  dangerLevel: 5, intelligence: 4,
}
