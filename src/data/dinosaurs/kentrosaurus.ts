import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Kentrosaurus: Dinosaur = {
    id: 'kentrosaurus',
    slug: 'kentrosaurus',
    displayName: 'Kentrosaurus',
    name: 'Kentrosaurus',
    pronunciation: 'KEN-tro-SORE-us',
    nameMeaning: 'Pointed Lizard',
    genusName: 'Kentrosaurus',
    era: 'jurassic',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'medium',
    habitat: 'plains',
    livedIn: ['Africa'],
    periodRangeMya: [155, 150],
    dimensions: { lengthMeters: 5.0, heightMeters: 2.0, weightKg: 1200, speedKmh: 10 },
    images: img('kentrosaurus'),
    facts: [
      { label: 'Defense', value: 'Spikes over plates', icon: 'shield', description: 'Kentrosaurus had small plates up front but long spikes over its hips and tail for serious defense.' },
      { label: 'Tail', value: 'Thagomizer arsenal', icon: 'target', description: 'Its tail likely carried several dangerous spikes capable of injuring even large predators.' },
      { label: 'Relative', value: 'African stegosaur', icon: 'medal', description: 'It was a close cousin of Stegosaurus, showing that stegosaurs spread far beyond North America.' },
      { label: 'Back legs', value: 'Powerful hindquarters', icon: 'arrow-up', description: 'Its body was front-light and rear-heavy, helping it swing the tail like a spiked mace.' },
    ],
    description: 'Kentrosaurus was a smaller but extra-spiky stegosaur that traded giant plates for a whole arsenal of sharp tail and hip spikes. If Stegosaurus was a tank, Kentrosaurus was a porcupine on dinosaur steroids.',
    longDescription: 'Known from the famous Tendaguru beds of Tanzania, Kentrosaurus lived in a Jurassic ecosystem shared with giant sauropods and large predators. It belonged to the stegosaur lineage but differed from Stegosaurus in having a more extensive battery of spikes, especially along the rear half of the body. This arrangement may have made it especially effective at deterring attacks from theropods approaching from behind or the side. Kentrosaurus also helps paleontologists understand how stegosaurs diversified between continents, adapting the same basic body plan into different defensive styles.',
    kidsDescription: 'Kentrosaurus was like a walking cactus dinosaur! It had plates, spikes, and a tail full of sharp weapons that said, \"Do NOT bite me!\"',
    childFriendlyText: 'Kentrosaurus was a plant-eating dinosaur covered in spikes. It used its dangerous tail to protect itself from hungry predators.',
    scientificSummary: 'Kentrosaurus aethiopicus (Hennig, 1915) is a stegosaurid ornithischian from the Kimmeridgian-Tithonian Tendaguru Formation of Tanzania. It differs from Stegosaurus in the relative reduction of anterior plates and the hypertrophy of posterior spikes, as well as in hindlimb and pelvic proportions suggesting strong caudofemoral musculature. The genus is central to African dinosaur biogeography and to functional studies of stegosaur defense.',
    discoveries: [
      { year: 1909, location: 'Tendaguru, Tanzania', discoveredBy: 'German Tendaguru Expedition', note: 'Major excavations recovered multiple skeletons from the famous Jurassic beds.' },
      { year: 1915, location: 'Tanzania', discoveredBy: 'Edwin Hennig', note: 'Hennig formally described Kentrosaurus and highlighted its unusual spike arrangement.' },
    ],
    funFact: 'Kentrosaurus may have had more dangerous spikes than Stegosaurus, even though it was much smaller.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Kentrosaurus', species: 'K. aethiopicus' },
    relatedDinosaurs: [
      { id: 'stegosaurus', relationship: 'Close relative' },
      { id: 'brachiosaurus', relationship: 'Tendaguru contemporary' },
      { id: 'allosaurus', relationship: 'Predatory analogue' },
    ],
    fossilLocations: [
      { country: 'Tanzania', region: 'Tendaguru', coordinates: [-10.5, 39.3], specimenName: 'Tendaguru Formation' },
    ],
    dangerLevel: 4,
    intelligence: 2,
}
