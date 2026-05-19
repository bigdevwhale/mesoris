import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Alamosaurus: Dinosaur = {
  id: 'alamosaurus', slug: 'alamosaurus', displayName: 'Alamosaurus', name: 'Alamosaurus',
  pronunciation: 'AL-ah-mo-SOR-us', nameMeaning: 'Alamo Lizard', genusName: 'Alamosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [73, 66],
  dimensions: { lengthMeters: 30.0, heightMeters: 7.0, weightKg: 73000, speedKmh: 10 },
  images: img('alamosaurus'),
  facts: [
    { label: 'Size', value: 'Among the largest ever', icon: 'maximize', description: 'Recent size estimates place Alamosaurus among the very largest dinosaurs that ever lived — comparable to Argentinosaurus — with some specimens suggesting lengths up to 30 metres and masses up to 73,000 kg.' },
    { label: 'Immigration', value: 'South American migrant', icon: 'anchor', description: 'Alamosaurus migrated into North America from South America via Central America — its presence shows the Great American Biotic Interchange beginning in the Cretaceous, long before most such exchanges.' },
    { label: 'Coexistence', value: 'Lived with T. rex', icon: 'skull', description: 'Alamosaurus coexisted with Tyrannosaurus rex in the same Late Cretaceous ecosystems — the only sauropod known to have shared its world with T. rex in North America.' },
    { label: 'Titanosaur', value: 'Armoured sauropod', icon: 'shield', description: 'As a titanosaur, Alamosaurus had small bony osteoderms embedded in its skin — a unique feature among sauropods that provided limited but real armour protection.' },
  ],
  description: 'Alamosaurus sanjuanensis was a colossal titanosaur sauropod from the very end of the Cretaceous of southwestern North America — and one of the largest animals that ever walked the Earth. As a titanosaur, its ancestors came from South America, and Alamosaurus migrated north through Central America to colonise North America in the Maastrichtian. It shared its world with Tyrannosaurus rex — the only sauropod on the same continent as that famous predator. Recent estimates suggest it reached 30 metres and 73 tonnes, rivalling Argentinosaurus.',
  longDescription: 'Alamosaurus sanjuanensis (Gilmore, 1922) is a titanosaurian sauropod from the Maastrichtian (~73–66 Ma) Javelina, El Picacho, and North Horn formations of Texas, New Mexico, and Utah. It is the only sauropod from North America east of the Rocky Mountains that survives into the very end of the Cretaceous. Its arrival in North America reflects a titanosaur dispersal event from South America through the Central American volcanic arc, beginning around 73–70 Ma — an early instance of the faunal exchange between North and South America that would accelerate in the Pliocene. Revised size estimates based on large vertebrae and limb bones from Texas place Alamosaurus among the largest dinosaurs globally, with some specimens suggesting a body mass of 60,000–73,000 kg and total length of 28–30 metres. As a titanosaur, Alamosaurus possessed small dermal osteoderms (bony skin armour) of varying sizes, embedded in the skin like cobblestones — a derived titanosaur feature. The remarkable ecological situation of a giant sauropod coexisting with T. rex in the same ecosystem (Hell Creek/Lance/Javelina biomes) makes Alamosaurus unique among late-surviving sauropods. Tyrannosaurus rex almost certainly was too small to prey on a fully grown Alamosaurus but may have targeted juveniles.',
  kidsDescription: 'Alamosaurus was one of the BIGGEST dinosaurs EVER — maybe up to 30 metres long and 73 TONNES! It came to North America from South America and somehow lived in the SAME PLACE as Tyrannosaurus rex! Imagine T. rex trying to attack something 10 times its own weight. As a titanosaur, it even had bony armour in its skin. The giant that outlived most sauropods!',
  childFriendlyText: 'Alamosaurus was one of the biggest dinosaurs ever — 30 metres, 73 tonnes — and the only North American sauropod that lived alongside T. rex, having migrated from South America.',
  scientificSummary: 'Alamosaurus sanjuanensis (Gilmore, 1922) is a titanosaurian sauropod from the Maastrichtian Javelina, El Picacho, and North Horn formations (~73–66 Ma), Texas/New Mexico/Utah, USA. Largest North American dinosaur; revised estimates ~28–30 m, ~60,000–73,000 kg. Dermal osteoderms present (titanosaur synapomorphy). South American immigrant taxon, reflecting early Great American Biotic Interchange. Coexisted with Tyrannosaurus rex in the same Maastrichtian ecosystems.',
  discoveries: [
    { year: 1921, location: 'San Juan County, New Mexico, USA', discoveredBy: 'Charles W. Gilmore', note: 'Initial material collected and described by Gilmore in 1922 from New Mexico; subsequently much larger specimens found in Texas.' },
    { year: 2003, location: 'Big Bend National Park, Texas, USA', discoveredBy: 'Thomas Lehman and Kenneth Carpenter', note: 'Enormous vertebrae and limb bones from Texas revised size estimates dramatically upward, suggesting Alamosaurus rivalled the largest South American titanosaurs.' },
  ],
  funFact: 'When T. rex stood next to a full-grown Alamosaurus, the sauropod\'s ankle was at about eye level for the theropod. T. rex, despite being the most famous predator of all time, could not realistically have attacked a healthy adult Alamosaurus — the size difference was just too extreme.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Saltasauridae', genus: 'Alamosaurus', species: 'A. sanjuanensis' },
  relatedDinosaurs: [
    { id: 'argentinosaurus', relationship: 'South American titanosaur relative' },
    { id: 'sauroposeidon', relationship: 'Earlier North American giant sauropod' },
    { id: 'diplodocus', relationship: 'Earlier North American sauropod (different family)' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'San Juan County, New Mexico (Ojo Alamo Formation)', coordinates: [36.5, -108.2], specimenName: 'USNM 10487 — holotype vertebrae and forelimb' },
    { country: 'USA', region: 'Brewster County, Texas, Big Bend (Javelina Formation)', coordinates: [29.3, -103.2], specimenName: 'Enormous Texas specimens indicating maximum size' },
  ],
  dangerLevel: 3, intelligence: 3,
}
