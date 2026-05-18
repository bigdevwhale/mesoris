import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Quetzalcoatlus: Dinosaur = {
    id: 'quetzalcoatlus', slug: 'quetzalcoatlus', displayName: 'Quetzalcoatlus', name: 'Quetzalcoatlus',
    pronunciation: 'KWET-zal-coe-AT-luss', nameMeaning: 'Feathered Serpent God', genusName: 'Quetzalcoatlus',
    era: 'cretaceous', diet: 'carnivore', category: 'flying-reptile', size: 'gigantic', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [68, 66],
    dimensions: { lengthMeters: 6.0, heightMeters: 5.0, weightKg: 250, speedKmh: 80 },
    images: img('quetzalcoatlus'),
    facts: [
      { label: 'Wingspan', value: '11 meters', icon: 'plane', description: 'The largest flying animal ever — wingspan of a small airplane (11m), tall as a giraffe.' },
      { label: 'Hunting', value: 'Terrestrial stalker', icon: 'footprints', description: 'Hunted on the ground like a giant stork — not a soaring seabird as once thought.' },
      { label: 'Name', value: 'Aztec god', icon: 'feather', description: 'Named after Quetzalcoatl, the feathered serpent god of Aztec mythology.' },
      { label: 'Launch', value: 'Quad launch', icon: 'move-up', description: 'Launched into the air using all four limbs — a unique pterosaur takeoff method.' },
    ],
    description: 'The dragon of Texas. Quetzalcoatlus was the largest flying animal ever to exist — as tall as a giraffe, with the wingspan of a small airplane. It was named after the Aztec feathered serpent god, and it lived up to its mythological name.',
    longDescription: 'Quetzalcoatlus is one of the most extraordinary animals ever to have lived. With an estimated wingspan of 10-11 meters, it was the largest known flying organism in Earth\'s history. Recent research overturned the traditional view of pterosaurs as seabird-like soarers — Quetzalcoatlus was a terrestrial stalker, using its enormous beak to probe and snatch small prey on the ground like a gigantic stork or heron. Its ability to fly despite being the height of a giraffe was made possible by extremely lightweight, pneumatized bones and a unique quadrupedal launch — springing into the air using all four limbs, a takeoff mechanism impossible for birds.',
    kidsDescription: 'Quetzalcoatlus was a REAL DRAGON — the biggest thing that ever flew! It stood as tall as a giraffe and its wings stretched wider than a school bus. But instead of breathing fire, it walked around on the ground catching little animals with its giant beak. Imagine a giraffe with wings!',
    childFriendlyText: 'Quetzalcoatlus was the biggest flying animal ever — tall as a giraffe with wings as wide as an airplane! It flew over the dinosaurs.',
    scientificSummary: 'Quetzalcoatlus northropi (Lawson, 1975) is an azhdarchid pterodactyloid pterosaur from the Maastrichtian Javelina Formation, Texas. The largest volant animal known, with an estimated 10-11m wingspan and a standing height exceeding 5m. Formerly interpreted as a vulture-like thermal soarer, current evidence indicates a terrestrial-stalking ecology convergent with large ciconiiform birds. Quadrupedal launch kinematics, enabled by the disproportionately enlarged forelimbs and the vaulted pectoral girdle, provide the only viable mass-specific takeoff mechanism for an animal of this scale.',
    discoveries: [{ year: 1971, location: 'Texas, USA', discoveredBy: 'Douglas Lawson', note: 'Giant wing bone discovered in Big Bend National Park — initially mistaken for a dinosaur.' }],
    funFact: 'Quetzalcoatlus was so big that for 20 years after its discovery, many scientists refused to believe it could fly. It took the discovery of the quad-launch mechanism in 2010 to finally convince everyone.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Azhdarchidae', genus: 'Quetzalcoatlus', species: 'Q. northropi' },
    relatedDinosaurs: [{ id: 'pteranodon', relationship: 'Smaller relative' }],
    fossilLocations: [{ country: 'USA', region: 'Texas', coordinates: [29.3, -103.2], specimenName: 'Javelina Formation, Big Bend NP' }],
    dangerLevel: 6, intelligence: 5,
  }
