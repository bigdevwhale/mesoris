import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Wuerhosaurus: Dinosaur = {
  id: 'wuerhosaurus', slug: 'wuerhosaurus', displayName: 'Wuerhosaurus', name: 'Wuerhosaurus',
  pronunciation: 'WOO-er-ho-SOR-us', nameMeaning: 'Wuerho Lizard', genusName: 'Wuerhosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'forest',
  livedIn: ['China'], periodRangeMya: [130, 113],
  dimensions: { lengthMeters: 6.0, heightMeters: 2.5, weightKg: 2000, speedKmh: 9 },
  images: img('wuerhosaurus'),
  facts: [
    { label: 'Plates', value: 'Flat and round', icon: 'shield', description: 'Unlike the tall pointed plates of Stegosaurus, Wuerhosaurus had low, rounded, oval plates along its back.' },
    { label: 'Era', value: 'Last stegosaur', icon: 'clock', description: 'One of the last surviving stegosaurs, living well into the Early Cretaceous when most others had died out.' },
    { label: 'Habitat', value: 'Lakeside lowland', icon: 'map-pin', description: 'Lived along the shores of inland lakes in the Junggar Basin of northwestern China.' },
    { label: 'Tail', value: 'Four-spike thagomizer', icon: 'swords', description: 'A spiked thagomizer at the end of the tail, used for defence against predators.' },
  ],
  description: 'Wuerhosaurus was one of the last stegosaurs — a low-plated Chinese herbivore that survived into the Early Cretaceous long after its more famous relatives had vanished. Its broad, flat plates set it apart from the typical stegosaur silhouette.',
  longDescription: 'Wuerhosaurus homheni (Dong, 1973) is a stegosaurid from the Early Cretaceous (Valanginian–Barremian) Lianmuqin and Tugulu Group formations of the Junggar Basin, Xinjiang, China. It was one of the last stegosaurs in the world — most stegosaur diversity had already disappeared by the end of the Jurassic, but Wuerhosaurus survived into the Early Cretaceous. It is most distinctive for its plates, which were much lower and rounder than the tall triangular plates of its famous cousin Stegosaurus — suggesting a more horizontal, perhaps more flexible profile. Reaching about 6 metres, Wuerhosaurus was smaller than many other stegosaurs. The skull is poorly known, and its teeth suggest a low-browsing herbivore feeding on ferns, cycads, and horsetails. Wuerhosaurus was described from a partial skeleton, and at one point it was suggested that the genus might be synonymous with Stegosaurus, but most current analyses treat it as a distinct stegosaurid that was a relic of an earlier radiation. It lived alongside small theropods and sauropods in the lake-and-river floodplains of Cretaceous China.',
  kidsDescription: 'Wuerhosaurus was a Chinese plate-backed dinosaur — but its plates were FLAT and ROUND, not tall and pointy like Stegosaurus! It was one of the very last of its kind, hanging on in the Early Cretaceous when most other plate dinosaurs had disappeared.',
  childFriendlyText: 'Wuerhosaurus was a plate-backed dinosaur from China. Its plates were low and round, and it was one of the last stegosaurs to ever live.',
  scientificSummary: 'Wuerhosaurus homheni (Dong, 1973) is a stegosaurid from the Early Cretaceous Lianmuqin and Tugulu formations, Junggar Basin, China. Among the latest-surviving stegosaurs. Plates low, oval, and rounded — distinct from the tall plates of Stegosaurus. Tail bears four-spike thagomizer. Smaller than most stegosaurs (~6 m).',
  discoveries: [
    { year: 1973, location: 'Junggar Basin, Xinjiang, China', discoveredBy: 'Dong Zhiming', note: 'Partial postcranial skeleton described and named Wuerhosaurus homheni.' },
  ],
  funFact: 'Wuerhosaurus is sometimes nicknamed the "low-plated stegosaur" because its back looked so different from the typical plate-backed dinosaur — more like a low ridge than a row of upright fins!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Wuerhosaurus', species: 'W. homheni' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Famous relative with taller plates' },
    { id: 'kentrosaurus', relationship: 'Spike-armoured relative' },
    { id: 'tuojiangosaurus', relationship: 'Chinese stegosaur relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Junggar Basin, Xinjiang', coordinates: [44.0, 87.0], specimenName: 'IVPP V.4006 — holotype partial skeleton' },
  ],
  dangerLevel: 4, intelligence: 3,
}
