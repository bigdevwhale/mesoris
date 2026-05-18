import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Brachiosaurus: Dinosaur = {
    id: 'brachiosaurus',
    slug: 'brachiosaurus',
    displayName: 'Brachiosaurus',
    name: 'Brachiosaurus',
    pronunciation: 'BRACK-ee-oh-SORE-us',
    nameMeaning: 'Arm Lizard',
    genusName: 'Brachiosaurus',
    era: 'jurassic',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'gigantic',
    habitat: 'plains',
    livedIn: ['North America', 'Africa'],
    periodRangeMya: [154, 150],
    dimensions: { lengthMeters: 26.0, heightMeters: 13.0, weightKg: 56000, speedKmh: 20 },
    images: img('brachiosaurus'),
    facts: [
      { label: 'Neck', value: '9 meters', icon: 'arrow-up', description: 'A giraffe-like neck that could reach treetops 13 meters high — the height of a 4-story building.' },
      { label: 'Front Legs', value: 'Longer than hind', icon: 'move-up', description: 'Uniquely, its front legs were longer than its back legs — giving it that iconic sloping posture.' },
      { label: 'Heart', value: 'Massive pump', icon: 'heart', description: 'Needed an enormous heart to pump blood up that 9-meter neck to the brain.' },
      { label: 'Diet', value: '1 ton per day', icon: 'utensils-crossed', description: 'Ate about 1,000 kg of vegetation daily — leaves, ferns, and conifer branches.' },
    ],
    description: 'A gentle giant that towered over the Jurassic landscape. Brachiosaurus was so tall it could browse on treetops no other dinosaur could reach. It was one of the tallest animals ever to walk the Earth.',
    longDescription: 'Brachiosaurus was a sauropod dinosaur that lived during the Late Jurassic Period. Unlike most other sauropods, its front legs were longer than its hind legs, giving it a distinctive giraffe-like posture with the body sloping downward toward the tail. This adaptation allowed Brachiosaurus to reach vegetation up to 13 meters above the ground — higher than any other dinosaur in its ecosystem. Brachiosaurus likely traveled in herds, migrating across vast Jurassic floodplains in search of food.',
    kidsDescription: 'This dinosaur was a skyscraper on four legs! As tall as a 4-story building with a neck that could peek over treetops. Brachiosaurus ate leaves for breakfast, lunch, and dinner — a whole TON of them every single day!',
    childFriendlyText: 'Brachiosaurus was a super-tall, friendly giant with a very long neck. It ate leaves from the tallest trees and was bigger than a house!',
    scientificSummary: 'Brachiosaurus altithorax (Riggs, 1903) is a brachiosaurid sauropod from the Kimmeridgian of the Morrison Formation. Characterized by elongated forelimbs exceeding hindlimb length, producing a dorsally-sloping trunk. This unique bauplan enabled exploitation of exceptionally high-browsing niches. Cranial anatomy is poorly known; most reconstructions rely on the related Giraffatitan from Tanzania.',
    discoveries: [
      { year: 1900, location: 'Colorado, USA', discoveredBy: 'Elmer Riggs', note: 'First Brachiosaurus fossils found in the Morrison Formation.' },
      { year: 1909, location: 'Tanzania, Africa', discoveredBy: 'Werner Janensch', note: 'Major expedition uncovered nearly complete skeletons at Tendaguru.' },
    ],
    funFact: 'Brachiosaurus nostrils were on top of its head — early scientists thought it lived underwater and used them as a snorkel! We now know it lived entirely on land.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Brachiosauridae', genus: 'Brachiosaurus', species: 'B. altithorax' },
    relatedDinosaurs: [
      { id: 'diplodocus', relationship: 'Contemporary' },
      { id: 'allosaurus', relationship: 'Predator threat' },
      { id: 'apatosaurus', relationship: 'Contemporary' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Colorado', coordinates: [39.5, -105.0], specimenName: 'Morrison Formation' },
      { country: 'Tanzania', region: 'Tendaguru', coordinates: [-10.5, 39.5] },
    ],
    dangerLevel: 2,
    intelligence: 2,
  }
