import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Sauroposeidon: Dinosaur = {
    id: 'sauroposeidon',
    slug: 'sauroposeidon',
    displayName: 'Sauroposeidon',
    name: 'Sauroposeidon',
    pronunciation: 'SORE-oh-poh-SY-don',
    nameMeaning: 'Earth-Shaker Lizard God',
    genusName: 'Sauroposeidon',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'gigantic',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [113, 110],
    dimensions: { lengthMeters: 30.0, heightMeters: 17.0, weightKg: 50000, speedKmh: 12 },
    images: img('sauroposeidon'),
    facts: [
      { label: 'Height', value: '17 meters tall', icon: 'arrow-up', description: 'Sauroposeidon may have been the tallest dinosaur ever, able to browse far above most other herbivores.' },
      { label: 'Neck', value: 'Enormous vertebrae', icon: 'maximize', description: 'Its neck bones were gigantic, elongated, and riddled with air spaces to save weight.' },
      { label: 'Family', value: 'Brachiosaur giant', icon: 'trophy', description: 'It belonged to the same broad high-browsing group as Brachiosaurus, but lived much later.' },
      { label: 'Survivor', value: 'Late brachiosaurid', icon: 'clock', description: 'Sauroposeidon shows that colossal brachiosaur-like sauropods survived in North America into the Early Cretaceous.' },
    ],
    description: 'Sauroposeidon was a sky-high titan with one of the tallest browsing reaches of any land animal in history. Its name means earth-shaker, and that feels appropriate for a dinosaur this monumental.',
    longDescription: 'Known mainly from a series of spectacularly elongated neck vertebrae, Sauroposeidon was a brachiosaurid-style sauropod that carried its head far above the ground, probably feeding on foliage inaccessible to most other herbivores. The vertebrae are extensively pneumatized, filled with air spaces that reduced the mass of the enormous neck without sacrificing strength. Living in Early Cretaceous North America, it shared its world with Acrocanthosaurus and other large dinosaurs, demonstrating that giant sauropods remained major ecological players even after the Jurassic heyday of giants like Brachiosaurus and Diplodocus.',
    kidsDescription: 'Sauroposeidon was so tall it could have looked into a fourth-floor window! This giant plant-eater had a super long neck and may have been the tallest dinosaur of all time.',
    childFriendlyText: 'Sauroposeidon was one of the tallest dinosaurs ever. It used its huge neck to reach leaves high up in the trees.',
    scientificSummary: 'Sauroposeidon proteles (Wedel, Cifelli & Sanders, 2000) is a brachiosaurid macronarian sauropod from the Aptian-Albian Antlers Formation of Oklahoma and correlative North American units. It is based on extremely elongate, highly pneumatic cervical vertebrae that imply one of the tallest browsing envelopes known for any dinosaur. Sauroposeidon is critical to studies of sauropod respiratory adaptation, vertebral lightening, and the persistence of giant macronarian herbivores into the Early Cretaceous.',
    discoveries: [
      { year: 1994, location: 'Oklahoma, USA', discoveredBy: 'Richard Cifelli and team', note: 'The giant neck vertebrae were initially mistaken for fossilized tree trunks before preparation.' },
      { year: 2000, location: 'Oklahoma, USA', discoveredBy: 'Mathew Wedel, Richard Cifelli, and R. Kent Sanders', note: 'The formal description identified one of the tallest dinosaurs ever found.' },
    ],
    funFact: 'The neck bones of Sauroposeidon are so elongated that each one seems almost impossibly stretched, like nature was trying to invent a dinosaur giraffe skyscraper.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Brachiosauridae', genus: 'Sauroposeidon', species: 'S. proteles' },
    relatedDinosaurs: [
      { id: 'brachiosaurus', relationship: 'Close relative' },
      { id: 'acrocanthosaurus', relationship: 'Predator threat' },
      { id: 'argentinosaurus', relationship: 'Rival giant' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Oklahoma', coordinates: [34.7, -98.5], specimenName: 'Antlers Formation' },
    ],
    dangerLevel: 3,
    intelligence: 2,
}
