import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dacentrurus: Dinosaur = {
  id: 'dacentrurus', slug: 'dacentrurus', displayName: 'Dacentrurus', name: 'Dacentrurus',
  pronunciation: 'da-SEN-trur-us', nameMeaning: 'Very Pointed Tail', genusName: 'Dacentrurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['Europe'], periodRangeMya: [154, 150],
  dimensions: { lengthMeters: 7.0, heightMeters: 2.0, weightKg: 2500, speedKmh: 8 },
  images: img('dacentrurus'),
  facts: [
    { label: 'Name', value: 'Very pointed tail', icon: 'swords', description: 'Its name means "very pointed tail" — referring to the long, dangerous spike at the tip of its tail.' },
    { label: 'Era', value: 'One of first stegosaurs', icon: 'clock', description: 'One of the earliest and largest stegosaurs known from Europe — among the first to appear in the Jurassic.' },
    { label: 'Plates', value: 'Wide and flat', icon: 'shield', description: 'Had a long row of wide, flat, triangular plates running down its back and hips.' },
    { label: 'Origin', value: 'England and France', icon: 'map-pin', description: 'Found in the Kimmeridge Clay of Dorset, England, and in the Jurassic of France and Portugal.' },
  ],
  description: 'Dacentrurus was one of the largest and earliest stegosaurs in Europe — a plate-backed herbivore with a wickedly spiked tail and broad, flat plates running down its back. The first substantial stegosaur ever found.',
  longDescription: 'Dacentrurus armatus (Owen, 1875) is one of the best-known European stegosaurs, from the Kimmeridgian (Late Jurassic) of England, France, Portugal, and possibly Spain. Originally described by Richard Owen in 1875 under the name Omosaurus, the genus was renamed Dacentrurus in 1902 by Frederic Augustus Lucas. The name "Dacentrurus" means "very pointed tail", referring to the prominent spikes on its thagomizer. Dacentrurus reached about 7 metres in length and was among the largest stegosaurs of its time. The plates were wide, flat, and triangular, with alternating rows along the back and hips. The tail bore long, robust spikes that could inflict serious damage on predators. The original Kimmeridge Clay material is fragmentary but extensive, including a near-complete type specimen — one of the best historical stegosaur finds. Dacentrurus is significant as one of the largest Jurassic stegosaurs of Europe and as an indicator that the group was already a major component of Late Jurassic European faunas.',
  kidsDescription: 'Dacentrurus was a huge plate-backed dinosaur from Europe — its name means "VERY POINTED TAIL" because of the long spikes on its tail! It was one of the biggest stegosaurs ever to roam the continent!',
  childFriendlyText: 'Dacentrurus was a large European stegosaur with wide flat plates and a spiked tail. Its name means "very pointed tail"!',
  scientificSummary: 'Dacentrurus armatus (Owen, 1875; Lucas, 1902) is a stegosaurid from the Kimmeridgian (Late Jurassic) of England, France, and Portugal. Originally Omosaurus. ~7 m long. Diagnostic: wide flat dorsal plates; long, robust thagomizer spikes. Among the largest European stegosaurs and one of the earliest substantial stegosaur finds.',
  discoveries: [
    { year: 1875, location: 'Kimmeridge Clay, Dorset, England', discoveredBy: 'Richard Owen', note: 'Originally named Omosaurus; later renamed Dacentrurus.' },
    { year: 1902, location: 'United Kingdom and France', discoveredBy: 'Various', note: 'Renamed Dacentrurus by F.A. Lucas; additional material described.' },
  ],
  funFact: 'Dacentrurus was originally named "Omosaurus" in 1875, but that name had already been used for a different reptile — so scientists had to rename it Dacentrurus in 1902, and the older name has been completely forgotten!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Dacentrurus', species: 'D. armatus' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Famous later relative' },
    { id: 'loricatosaurus', relationship: 'European stegosaur cousin' },
    { id: 'kentrosaurus', relationship: 'African stegosaur cousin' },
  ],
  fossilLocations: [
    { country: 'United Kingdom', region: 'Kimmeridge, Dorset', coordinates: [50.6, -2.1], specimenName: 'NHMUK holotype material' },
    { country: 'France', region: 'Jurassic of France', coordinates: [46.5, 2.0], specimenName: 'Various French specimens' },
  ],
  dangerLevel: 5, intelligence: 3,
}
