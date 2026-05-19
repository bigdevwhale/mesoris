import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Diabloceratops: Dinosaur = {
  id: 'diabloceratops', slug: 'diabloceratops', displayName: 'Diabloceratops', name: 'Diabloceratops',
  pronunciation: 'dee-AB-loh-SER-ah-tops', nameMeaning: 'Devil Horned Face', genusName: 'Diabloceratops',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['North America'], periodRangeMya: [79, 75],
  dimensions: { lengthMeters: 5.5, heightMeters: 1.8, weightKg: 1400, speedKmh: 20 },
  images: img('diabloceratops'),
  facts: [
    { label: 'Name', value: 'Devil horns', icon: 'target', description: 'Named for the pair of long, curved horn-like projections from the top of its frill that sweep outward like devil horns — one of the most dramatically named ceratopsians.' },
    { label: 'Primitive', value: 'Ancient centrosaurine', icon: 'layers', description: 'Diabloceratops is a relatively primitive centrosaurine, helping scientists understand the early evolution of the centrosaurine ceratopsid family before it diversified into the many horned forms of the late Campanian.' },
    { label: 'Utah', value: 'Wahweap Formation', icon: 'anchor', description: 'Found in the Campanian Wahweap Formation of Utah, Diabloceratops is part of a rich southern Laramidian fauna that was distinct from the northern fauna where Styracosaurus and Albertaceratops lived.' },
    { label: 'Horns', value: 'Frill horns plus nose horn', icon: 'shield', description: 'In addition to the signature curved frill spines, Diabloceratops had a nasal horn and small brow horns — a combination that gave it one of the most elaborate head decorations of any early centrosaurine.' },
  ],
  description: 'Diabloceratops eatoni — "Devil Horned Face" — was a medium-sized centrosaurine ceratopsid from the Late Cretaceous Wahweap Formation of Utah, living approximately 79 to 75 million years ago. Its most striking feature was a pair of long, outward-curving horn-like projections from the top of its frill — evocative of devil horns, as its name suggests. As a relatively primitive centrosaurine, Diabloceratops provides key information about the early diversification of the centrosaurid family before the explosion of elaborate-horned forms in the late Campanian of North America.',
  longDescription: 'Diabloceratops eatoni (Kirkland & DeBlieux, 2010) is a centrosaurine ceratopsid from the Campanian (~79–75 Ma) Wahweap Formation of Garfield County, Utah, USA. Described from a partial skull, Diabloceratops is one of the oldest known centrosaurine ceratopsids, providing morphological data on the ancestral centrosaurine condition before the clade\'s later Campanian diversification into Styracosaurus, Pachyrhinosaurus, Coronosaurus, and others. The skull bears a relatively short, curved nasal horn, small supraorbital (brow) horn cores, and a moderate-sized frill. The signature feature is a pair of long, laterally curving, posteriorly directed epoccipital (frill-edge) projections at the top corners of the frill — creating the "devil horn" appearance. The frill also bore smaller epoccipitals along its lower margins. Diabloceratops lived in the southern Laramidian fauna province — the southern portion of the North American landmass — which was ecologically and faunally distinct from the northern fauna province where most classically known ceratopsids lived. The Wahweap Formation has produced an increasingly diverse dinosaur fauna including hadrosaurs, ankylosaurs, and small theropods alongside Diabloceratops, reflecting a rich Campanian southern ecosystem.',
  kidsDescription: 'Diabloceratops was the DEVIL dinosaur — named for the long curved horns sweeping out of its frill that looked exactly like devil horns! It was an early ceratopsid from Utah, one of the ancestors of all the elaborate-horned dinosaurs like Styracosaurus. At 5.5 metres with a nose horn AND devil-frill spines, it was one of the most dramatically-styled ceratopsians ever discovered!',
  childFriendlyText: 'Diabloceratops was the "Devil Horned Face" — named for its dramatic curved frill spines resembling devil horns. An early centrosaurine ceratopsid from Utah, ancestor to later elaborate-horned forms.',
  scientificSummary: 'Diabloceratops eatoni (Kirkland & DeBlieux, 2010) is a centrosaurine ceratopsid from the Campanian Wahweap Formation (~79–75 Ma), Garfield County, Utah. One of the oldest known centrosaurines; provides data on ancestral centrosaurine morphology. Skull with curved nasal horn, small brow horns, and diagnostic curved epoccipital frill projections ("devil horns"). Southern Laramidian fauna province. Contemporaneous with early Campanian hadrosaurs and tyrannosaurids.',
  discoveries: [
    { year: 2002, location: 'Wahweap Formation, Garfield County, Utah, USA', discoveredBy: 'James Kirkland and Donald DeBlieux', note: 'Partial skull collected by Utah Museum of Natural History team; formally described by Kirkland and DeBlieux in 2010.' },
  ],
  funFact: 'Diabloceratops is one of the oldest large ceratopsids known — and finding it in the southern US helped scientists realise that ceratopsid diversification happened in both northern and southern parts of Laramidia simultaneously, like two separate evolutionary laboratories running the same experiment.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Centrosaurinae', genus: 'Diabloceratops', species: 'D. eatoni' },
  relatedDinosaurs: [
    { id: 'styracosaurus', relationship: 'Later centrosaurine relative' },
    { id: 'triceratops', relationship: 'Later ceratopsid relative' },
    { id: 'protoceratops', relationship: 'Ancestral ceratopsian relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Garfield County, Utah (Wahweap Formation)', coordinates: [37.5, -111.5], specimenName: 'UMNH VP 16699 — holotype partial skull' },
  ],
  dangerLevel: 4, intelligence: 4,
}
