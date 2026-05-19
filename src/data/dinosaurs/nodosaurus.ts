import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nodosaurus: Dinosaur = {
  id: 'nodosaurus', slug: 'nodosaurus', displayName: 'Nodosaurus', name: 'Nodosaurus',
  pronunciation: 'NO-doh-SOR-us', nameMeaning: 'Node Lizard', genusName: 'Nodosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [108, 98],
  dimensions: { lengthMeters: 6.0, heightMeters: 1.5, weightKg: 1800, speedKmh: 10 },
  images: img('nodosaurus'),
  facts: [
    { label: 'Armour', value: 'No tail club', icon: 'shield', description: 'Unlike its relative Ankylosaurus, Nodosaurus had no tail club — it was a nodosaurid, relying entirely on its thick body armour of bony nodes and scutes for passive defence.' },
    { label: 'History', value: 'First ankylosaur named', icon: 'star', description: 'Nodosaurus was described by O.C. Marsh in 1889, making it one of the first ankylosaurian dinosaurs ever formally named, giving the family Nodosauridae its name.' },
    { label: 'Build', value: 'Tank-like', icon: 'layers', description: 'The body was broad and flat with rows of oval bony nodes (hence the name) embedded in tough skin — a passive armour system that made Nodosaurus extremely difficult to flip or bite through.' },
    { label: 'Habitat', value: 'Shallow seaway shore', icon: 'anchor', description: 'Nodosaurus lived alongside the shores of the Western Interior Seaway — the great inland sea that divided North America — sharing its world with marine reptiles just offshore.' },
  ],
  description: 'Nodosaurus textilis was a robust ankylosaur from the Early Cretaceous of North America, and one of the first of its kind ever formally named. Growing to 6 metres, it was covered in rows of oval bony nodes — the "nodes" that give both the genus and the family Nodosauridae their names. Unlike the better-known Ankylosaurus, Nodosaurus lacked a tail club, relying entirely on its passive body armour for defence. It roamed the coastal lowlands beside the Western Interior Seaway of North America approximately 108 to 98 million years ago.',
  longDescription: 'Nodosaurus textilis (Marsh, 1889) is a nodosaurid ankylosaur from the Albian–Cenomanian (~108–98 Ma) Mowry Shale and Thermopolis Formation of Wyoming, USA. It is one of the earliest-described ankylosaurians, with Marsh providing the initial description in 1889 from fragmentary material. As the type genus of Nodosauridae, it defines the family that includes the armoured dinosaurs with no tail club — in contrast to the club-tailed Ankylosauridae. The known material includes vertebrae, partial hip bones, and scattered osteoderms (bony plates), giving an incomplete but informative picture of its armour system. The osteoderms were oval to round bony nodes embedded in tough skin in a keeled pattern, providing broad, distributed protection without the concentration of mass at the tail end seen in ankylosaurids. Like other nodosaurids, Nodosaurus likely relied on its broad, flattened body posture — lowering itself to the ground and presenting the armoured dorsal surface to predators — as a primary defensive strategy. Its teeth were small and leaf-shaped, suitable for low-browsing herbivory on flowering plants, conifers, and ferns in the coastal floodplains flanking the Western Interior Seaway.',
  kidsDescription: 'Nodosaurus was an ARMOURED TANK of the Cretaceous — covered in rows of bony nodes (like armoured studs) from head to tail! Named for its bony bumps, it was the founding member of the Nodosauridae family. Unlike Ankylosaurus it had NO tail club — just pure defensive armour. One of the first ankylosaurs ever described by scientists!',
  childFriendlyText: 'Nodosaurus was a tank-like armoured dinosaur named for its bony node-studded armour, and one of the first ankylosaurs ever formally described. No tail club — just pure armour.',
  scientificSummary: 'Nodosaurus textilis (Marsh, 1889) is a nodosaurid ankylosaur from the Albian–Cenomanian Mowry Shale (~108–98 Ma), Wyoming, USA. Type genus of Nodosauridae. Distinguishable from Ankylosauridae by absence of tail club. Known from fragmentary material: vertebrae, partial pelvis, and osteoderms. Leaf-shaped teeth; low-browsing herbivore. Occupied coastal lowland habitat adjacent to Western Interior Seaway.',
  discoveries: [
    { year: 1889, location: 'Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Fragmentary material described by Marsh in 1889; provided the name that defines Nodosauridae, one of the two main ankylosaur families.' },
  ],
  funFact: 'Nodosaurus gave its name to the entire Nodosauridae family — which includes some of the most spectacular armoured dinosaurs ever found, including Borealopelta from Canada, which was preserved so perfectly that its skin colour could be determined from fossil pigments. All nodosaurids trace their family name to this fragmentary Wyoming dinosaur.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Thyreophora', family: 'Nodosauridae', genus: 'Nodosaurus', species: 'N. textilis' },
  relatedDinosaurs: [
    { id: 'ankylosaurus', relationship: 'Ankylosaur relative (different family, with tail club)' },
    { id: 'euoplocephalus', relationship: 'Club-tailed ankylosaur relative' },
    { id: 'stegosaurus', relationship: 'Thyreophoran relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Albany County, Wyoming (Mowry Shale)', coordinates: [41.7, -105.9], specimenName: 'YPM 1815 — holotype fragmentary material' },
  ],
  dangerLevel: 3, intelligence: 3,
}
