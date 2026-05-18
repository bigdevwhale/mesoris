import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Apatosaurus: Dinosaur = {
    id: 'apatosaurus', slug: 'apatosaurus', displayName: 'Apatosaurus', name: 'Apatosaurus',
    pronunciation: 'ah-PAT-oh-SORE-us', nameMeaning: 'Deceptive Lizard', genusName: 'Apatosaurus',
    era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [154, 150],
    dimensions: { lengthMeters: 23.0, heightMeters: 4.5, weightKg: 20000, speedKmh: 18 },
    images: img('apatosaurus'),
    facts: [
      { label: 'Neck Whip', value: 'Sonic cracks', icon: 'whip', description: 'Could swing its neck like a bullwhip — creating supersonic cracks as a defense or display.' },
      { label: 'Name Mix-up', value: 'Brontosaurus debate', icon: 'help-circle', description: 'For over 100 years, people called it Brontosaurus. The name was officially brought back in 2015.' },
      { label: 'Growth', value: 'Fast grower', icon: 'trending-up', description: 'Grew from a 5 kg hatchling to 20 tons in about 10 years — one of the fastest growth rates known.' },
      { label: 'Tail', value: 'Thunder whip', icon: 'zap', description: 'Its tail tip could break the sound barrier — possibly creating a thunderous noise for communication.' },
    ],
    description: 'The thunder lizard (literally!). Apatosaurus — beloved for generations as "Brontosaurus" — was a colossal Jurassic sauropod whose whip-like tail cracked louder than thunder.',
    longDescription: 'Apatosaurus is one of the most famous sauropods, though for most of its history it was known by the more popular name Brontosaurus. First described by Othniel Charles Marsh in 1877, it lived in the Morrison Formation alongside Diplodocus, Stegosaurus, and Allosaurus. Though slightly shorter than Diplodocus, Apatosaurus was much more robust — with a heavier build, thicker neck, and massively-constructed vertebrae. Its tail could be lashed at supersonic speeds, creating thunderous sounds. The 2015 resurrection of the Brontosaurus genus sparked debate, but most researchers still consider it an Apatosaurus species.',
    kidsDescription: 'You probably know it as BRONTOSAURUS! That name means "thunder lizard" — because it was so big, the ground SHOOK when it walked. Its tail could crack super-fast like a whip. Baby Apatosaurus grew from the size of a cat to bigger than a bus in just 10 years!',
    childFriendlyText: 'Apatosaurus — or Brontosaurus — was a giant, gentle plant-eater. It made the ground shake when it walked and could snap its tail like a giant whip!',
    scientificSummary: 'Apatosaurus ajax (Marsh, 1877) is an apatosaurine diplodocid sauropod from the Kimmeridgian Morrison Formation. More robustly constructed than the contemporary Diplodocus, with a stockier cervical series and thicker limb elements. Histological analysis reveals rapid ontogenetic growth rates exceeding 5 kg/day during adolescence. Caudal vertebrae morphology suggests the distal tail could be cracked at supersonic velocities exceeding 200 m/s. The generic name Brontosaurus was synonymized with Apatosaurus in 1903 but resurrected as a distinct genus in a 2015 comprehensive diplodocid revision (Tschopp et al.).',
    discoveries: [{ year: 1877, location: 'Colorado, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First described during the Bone Wars.' }, { year: 1895, location: 'Wyoming, USA', discoveredBy: 'AMNH expedition', note: 'Most complete specimen.' }],
    funFact: 'Apatosaurus replaced its teeth incredibly fast — each tooth was replaced every 30-60 days, like a conveyor belt of fresh teeth.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Diplodocidae', subfamily: 'Apatosaurinae', genus: 'Apatosaurus', species: 'A. ajax' },
    relatedDinosaurs: [{ id: 'diplodocus', relationship: 'Close relative' }, { id: 'allosaurus', relationship: 'Predator' }, { id: 'brachiosaurus', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'USA', region: 'Wyoming', coordinates: [43.0, -107.5], specimenName: 'Morrison Formation' }, { country: 'USA', region: 'Colorado', coordinates: [39.5, -105.0] }],
    dangerLevel: 4, intelligence: 2,
  }
