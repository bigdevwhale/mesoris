import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pentaceratops: Dinosaur = {
  id: 'pentaceratops', slug: 'pentaceratops', displayName: 'Pentaceratops', name: 'Pentaceratops',
  pronunciation: 'PEN-tah-SER-ah-tops', nameMeaning: 'Five-horned Face', genusName: 'Pentaceratops',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [76, 73],
  dimensions: { lengthMeters: 8.0, heightMeters: 2.5, weightKg: 5500, speedKmh: 18 },
  images: img('pentaceratops'),
  facts: [
    { label: 'Skull', value: 'Largest skull ever', icon: 'maximize', description: 'Pentaceratops held the record for the largest skull of any known land animal — over 3 metres long — with its enormous frill making up more than half the total skull length.' },
    { label: 'Horns', value: 'Five "horns"', icon: 'target', description: 'The "five horns" of Pentaceratops: two brow horns, one nasal horn, and two pointed cheekbones (squamosal horns) that projected outward — though technically only three were true horns.' },
    { label: 'Frill', value: 'Elaborate neck shield', icon: 'shield', description: 'The enormous frill was richly supplied with blood vessels and was likely brightly coloured in life — used for species recognition, display, and possibly thermoregulation.' },
    { label: 'New Mexico', value: 'Kirtland Formation', icon: 'anchor', description: 'Found in the Kirtland Formation of New Mexico — a Late Cretaceous unit that has produced a rich fauna including hadrosaurs, ankylosaurs, and tyrannosaurids alongside Pentaceratops.' },
  ],
  description: 'Pentaceratops sternbergii — "Five-horned Face" — was a large chasmosaurine ceratopsid from the Late Cretaceous of New Mexico, notable for possessing the largest skull of any known land animal. Its enormous frill, adorned with scalloped edges and richly vascularised for display or thermoregulation, extended over 3 metres from snout tip to frill edge. Despite its name implying five horns, only three were true bony horns — two prominent brow horns and a nasal horn — while the two "cheek horns" were actually enlarged pointed cheekbones.',
  longDescription: 'Pentaceratops sternbergii (Osborn, 1923) is a chasmosaurine ceratopsid from the Campanian (~76–73 Ma) Kirtland Formation of San Juan County, New Mexico, USA. Named for its five apparent "horns" — actually comprising two robust supraorbital brow horns, one nasal horn, and two laterally projecting epijugal (cheekbone) processes — the genus is most remarkable for its extraordinary skull size. A referred specimen (NMMNH P-27083) preserves a skull over 3 metres in length, representing the largest skull known from any land animal in Earth\'s history. The frill is enormously expanded and bears scalloped epoccipital bones along its posterior margin. Blood vessel impressions in the frill bone indicate extensive vascularisation, suggesting the frill was bright and conspicuously coloured in life for intraspecific display and species recognition. The rest of the body was robust but proportionally smaller than the skull, at approximately 8 metres total length and 5,500 kg. The Kirtland Formation ecosystem also included the hadrosaur Kritosaurus, the ankylosaur Nodocephalosaurus, and tyrannosaur remains, providing context for Pentaceratops\'s role as a large, defensively equipped herbivore.',
  kidsDescription: 'Pentaceratops had the BIGGEST skull of any land animal EVER — over 3 metres long! Its massive frill alone is bigger than most doors! Despite the name "Five-horned Face", it only had 3 TRUE horns — the other two were pointy cheekbones. This New Mexico giant\'s enormous colourful frill was used for display and showing off to mates. The ultimate headgear of the dinosaur world!',
  childFriendlyText: 'Pentaceratops had the largest skull of any land animal ever — over 3 metres! Three real horns plus giant pointed cheekbones gave it a spectacular five-horned appearance in Late Cretaceous New Mexico.',
  scientificSummary: 'Pentaceratops sternbergii (Osborn, 1923) is a chasmosaurine ceratopsid from the Campanian Kirtland Formation (~76–73 Ma), New Mexico, USA. Skull length >3 m (NMMNH P-27083) — largest known among land animals. True horn count: 2 supraorbital + 1 nasal (3 true horns); 2 epijugal projections (cheekbones). Frill extensively vascularised; epoccipital margin sculpted. Body ~8 m, ~5,500 kg. Kirtland Formation ecosystem includes hadrosaurs, ankylosaurs, and tyrannosaurs.',
  discoveries: [
    { year: 1921, location: 'San Juan County, New Mexico, USA', discoveredBy: 'Charles H. Sternberg', note: 'Discovered by Sternberg and described by Henry Fairfield Osborn in 1923; named sternbergii in honour of Sternberg.' },
    { year: 1975, location: 'Kirtland Formation, New Mexico', discoveredBy: 'American Museum expeditions', note: 'Subsequent specimens, including the remarkable giant skull NMMNH P-27083, revealed the full extent of the frill and cemented the skull-size record.' },
  ],
  funFact: 'The skull of Pentaceratops was so enormous that a full-grown human could comfortably curl up inside the frill opening — it was like wearing a building on your head. The frill was larger than a king-size mattress.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Chasmosaurinae', genus: 'Pentaceratops', species: 'P. sternbergii' },
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Later ceratopsid relative' },
    { id: 'styracosaurus', relationship: 'Ceratopsid relative' },
    { id: 'protoceratops', relationship: 'Ancestral ceratopsian' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'San Juan County, New Mexico (Kirtland Formation)', coordinates: [36.7, -108.0], specimenName: 'AMNH 6325 — holotype skull; NMMNH P-27083 — giant skull record' },
  ],
  dangerLevel: 5, intelligence: 4,
}
