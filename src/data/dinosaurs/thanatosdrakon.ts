import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Thanatosdrakon: Dinosaur = {
  id: 'thanatosdrakon', slug: 'thanatosdrakon', displayName: 'Thanatosdrakon', name: 'Thanatosdrakon',
  pronunciation: 'tha-NA-tos-DRA-kon', nameMeaning: 'Dragon of Death', genusName: 'Thanatosdrakon',
  era: 'cretaceous', diet: 'carnivore', category: 'flying-reptile', size: 'gigantic', habitat: 'coastal',
  livedIn: ['South America'], periodRangeMya: [100, 95],
  dimensions: { lengthMeters: 7.5, heightMeters: 5.0, weightKg: 200, speedKmh: 60 },
  images: img('thanatosdrakon'),
  facts: [
    { label: 'Name', value: 'Dragon of Death', icon: 'skull', description: 'Its name means "Dragon of Death" in Greek — reflecting the spectacularly preserved remains of this Cretaceous giant.' },
    { label: 'Wingspan', value: 'About 9 m', icon: 'plane', description: 'Estimated wingspan of around 9 metres — among the largest pterosaurs ever known, comparable to Quetzalcoatlus.' },
    { label: 'Family', value: 'Azhdarchid', icon: 'wind', description: 'A member of Azhdarchidae — the family of long-necked, long-jawed pterosaurs that includes Quetzalcoatlus and Hatzegopteryx.' },
    { label: 'Age', value: 'Mid-Cretaceous', icon: 'clock', description: 'Lived about 20 million years earlier than the famous Quetzalcoatlus — filling a gap in azhdarchid evolution.' },
  ],
  description: 'Thanatosdrakon — the "Dragon of Death" — was a huge azhdarchid pterosaur from the mid-Cretaceous of Argentina. With a wingspan near 9 metres, it stalked the floodplains of Gondwana long before the famous Quetzalcoatlus took to the skies.',
  longDescription: 'Thanatosdrakon amaru (Ortiz David, González Riga & Kellner, 2022) is an azhdarchid pterodactyloid pterosaur from the Cenomanian–Turonian (Upper Cretaceous) Plottier Formation of Mendoza Province, Argentina. The holotype consists of an articulated partial skeleton including a humerus, dorsal and sacral vertebrae, and parts of the wing, with a referred specimen providing additional axial and limb material. With an estimated wingspan of around 9 metres, Thanatosdrakon is one of the largest known pterosaurs, comparable in size to Quetzalcoatlus northropi. Phylogenetically, it is a derived azhdarchid. Like other azhdarchids, Thanatosdrakon was almost certainly a terrestrial stalker — walking on folded wings and snatching small prey in a heron-like manner — rather than a soaring seabird. Its discovery in South America is significant, as it represents one of the few giant azhdarchids known from Gondwana. The genus name, "Dragon of Death", was chosen to reflect both the imposing size of the animal and the excellent preservation of the type material. The Plottier Formation preserves a floodplain and lake environment of the Cretaceous interior of South America.',
  kidsDescription: 'Thanatosdrakon means "Dragon of DEATH" — a 9-metre flying reptile from Argentina! Even though it had huge wings, it probably walked around on the ground picking up small animals with its long beak, like a giant stork!',
  childFriendlyText: 'Thanatosdrakon was a giant flying reptile from Argentina. Its name means "Dragon of Death" because of its scary size — but it probably ate small animals like a giant stork.',
  scientificSummary: 'Thanatosdrakon amaru (Ortiz David et al., 2022) is an azhdarchid pterosaur from the Plottier Formation (Cenomanian–Turonian), Mendoza, Argentina. Estimated wingspan ~9 m. Holotype: articulated axial and appendicular skeleton. Among the largest known pterosaurs. Provides a mid-Cretaceous South American data point for understanding azhdarchid gigantism before Quetzalcoatlus.',
  discoveries: [
    { year: 2022, location: 'Plottier Formation, Mendoza, Argentina', discoveredBy: 'Leonardo Ortiz David and team', note: 'Articulated partial skeleton and referred material described and named.' },
  ],
  funFact: 'Thanatosdrakon\'s name was chosen to honour both the animal\'s terrifying size and the Argentine cultural symbolism of the "amaru" — a mythological winged serpent of the Andes!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Azhdarchidae', genus: 'Thanatosdrakon', species: 'T. amaru' },
  relatedDinosaurs: [
    { id: 'quetzalcoatlus', relationship: 'Giant azhdarchid relative' },
    { id: 'pteranodon', relationship: 'Smaller pterosaur relative' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Plottier Formation, Mendoza Province', coordinates: [-33.0, -69.5], specimenName: 'UNCUYO-LD 307 — holotype partial skeleton' },
  ],
  dangerLevel: 7, intelligence: 5,
}
