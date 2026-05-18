import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Acrocanthosaurus: Dinosaur = {
    id: 'acrocanthosaurus',
    slug: 'acrocanthosaurus',
    displayName: 'Acrocanthosaurus',
    name: 'Acrocanthosaurus',
    pronunciation: 'ACK-row-CAN-tho-SORE-us',
    nameMeaning: 'High-Spined Lizard',
    genusName: 'Acrocanthosaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'gigantic',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [116, 110],
    dimensions: { lengthMeters: 11.5, heightMeters: 4.0, weightKg: 6200, speedKmh: 30 },
    images: img('acrocanthosaurus'),
    facts: [
      { label: 'Spines', value: 'Tall back ridge', icon: 'layers', description: 'Long neural spines over the neck, back, and hips formed a dramatic ridge or low sail.' },
      { label: 'Size', value: '11.5 meters', icon: 'maximize', description: 'It was the top predator of Early Cretaceous North America before tyrannosaurs took over.' },
      { label: 'Arms', value: 'Strong graspers', icon: 'hand', description: 'Unlike tyrannosaurs, Acrocanthosaurus had powerful three-fingered arms useful for seizing prey.' },
      { label: 'Tracks', value: 'Possible giant footprints', icon: 'target', description: 'Some huge Early Cretaceous trackways may have been made by Acrocanthosaurus stalking sauropods.' },
    ],
    description: 'Acrocanthosaurus was a towering North American hunter with a dramatic high-spined back and the jaws of a giant allosaur cousin. Before T. rex, this was the continent\'s nightmare predator.',
    longDescription: 'Acrocanthosaurus roamed the Early Cretaceous landscapes of what are now Oklahoma, Texas, and surrounding regions, sharing its world with sauropods, iguanodontians, and smaller theropods. It belonged to Carcharodontosauridae, the same broader group as Giganotosaurus and Carcharodontosaurus, meaning North America once had shark-toothed giant predators too. Its tall neural spines may have anchored strong back muscles, supported a low display structure, or both. With a massive skull, powerful neck, and well-developed forelimbs, Acrocanthosaurus was well equipped to attack large prey, including the enormous sauropods of its ecosystem.',
    kidsDescription: 'Acrocanthosaurus had a huge head, strong arms, and a row of tall spines along its back like a built-in dinosaur mohawk. It was one of North America\'s biggest meat-eaters long before T. rex showed up.',
    childFriendlyText: 'Acrocanthosaurus was a giant predator with tall back spines and strong clawed arms. It hunted huge plant-eaters in Early Cretaceous North America.',
    scientificSummary: 'Acrocanthosaurus atokensis (Stovall & Langston, 1950) is a carcharodontosaurid allosauroid from the Aptian-Albian Antlers and Twin Mountains formations of North America. It is diagnosed by elongate neural spines, a deep laterally compressed skull, and robust forelimbs retaining three functional digits. The species documents the persistence of large allosauroid apex predators in North America well into the Early Cretaceous, prior to tyrannosaurid ecological dominance.',
    discoveries: [
      { year: 1940, location: 'Oklahoma, USA', discoveredBy: 'J. Willis Stovall and colleagues', note: 'Major remains from the Antlers Formation revealed a previously unknown giant predator.' },
      { year: 1950, location: 'Oklahoma, USA', discoveredBy: 'J. Willis Stovall and Wann Langston Jr.', note: 'The formal description introduced Acrocanthosaurus to science.' },
    ],
    funFact: 'Acrocanthosaurus may have left some of the giant theropod trackways found beside sauropod footprints in Texas.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Carcharodontosauridae', genus: 'Acrocanthosaurus', species: 'A. atokensis' },
    relatedDinosaurs: [
      { id: 'carcharodontosaurus', relationship: 'Close relative' },
      { id: 'sauroposeidon', relationship: 'Contemporary giant prey' },
      { id: 'deinonychus', relationship: 'Smaller contemporary predator' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Oklahoma', coordinates: [34.4, -96.0], specimenName: 'Antlers Formation' },
      { country: 'USA', region: 'Texas', coordinates: [32.9, -97.4], specimenName: 'Twin Mountains Formation' },
    ],
    dangerLevel: 9,
    intelligence: 6,
}
