import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Neovenator: Dinosaur = {
  id: 'neovenator', slug: 'neovenator', displayName: 'Neovenator', name: 'Neovenator',
  pronunciation: 'NEE-oh-VEN-ah-tor', nameMeaning: 'New Hunter', genusName: 'Neovenator',
  era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'coastal',
  livedIn: ['Europe'], periodRangeMya: [130, 125],
  dimensions: { lengthMeters: 7.6, heightMeters: 2.0, weightKg: 1000, speedKmh: 28 },
  images: img('neovenator'),
  facts: [
    { label: 'Europe', value: 'Best UK large theropod', icon: 'star', description: 'Neovenator is the best-known large theropod from the Cretaceous of England, providing crucial data on European allosauroid evolution that was poorly understood before its discovery.' },
    { label: 'Sense organs', value: 'Pressure sensors', icon: 'brain', description: 'Tiny pits in the snout bones of Neovenator are similar to pressure-sensing pits in crocodilian skulls — suggesting it may have had enhanced facial sensitivity, possibly for detecting movement or water pressure.' },
    { label: 'Isle of Wight', value: 'Wessex Formation hunter', icon: 'anchor', description: 'Found on the Isle of Wight in the Wessex Formation — the same fossil-rich unit that preserved Iguanodon, Hypsilophodon, and Baryonyx — giving a vivid picture of Early Cretaceous European predator diversity.' },
    { label: 'Allosauroid', value: 'Carcharodontosaur ancestor?', icon: 'layers', description: 'Neovenator is closely related to the massive Carcharodontosauridae, suggesting Europe played an important role in the origin or dispersal of these giant predators.' },
  ],
  description: 'Neovenator salerii — the "New Hunter" — is Europe\'s best-known large theropod from the Early Cretaceous, found on the Isle of Wight in the Wessex Formation. An allosauroid closely related to the massive carcharodontosaurids, Neovenator gives crucial insight into how large theropods diversified in Early Cretaceous Europe. At 7.6 metres, it was the apex predator of its ecosystem, hunting Iguanodon and other large herbivores. Tiny sensory pits in its snout bones suggest it possessed heightened facial sensitivity — a surprisingly sophisticated feature for a Cretaceous predator.',
  longDescription: 'Neovenator salerii (Hutt et al., 1996) is an allosauroid theropod from the Barremian (~130–125 Ma) Wessex Formation of the Isle of Wight, England. Known from approximately 70% of the skeleton including a nearly complete skull, it is the most completely known large Cretaceous theropod from the British Isles. The skull is long and low, with large fenestrae (skull openings) reducing weight, and the jaws bore blade-like, serrated teeth well-suited for slicing through large prey. A striking feature described in subsequent studies is the presence of numerous tiny foramina (small holes) on the snout bones of the skull, comparable to the pressure-sensitive pit organs found on crocodilian skulls — suggesting possible similar sensory capabilities. Phylogenetically, Neovenator is placed within or closely allied to Megaraptora or basal Neovenatoridae, a group that includes Megaraptor from Argentina and represents a distinct allosauroid lineage. Some analyses recover Neovenator as a close relative or early representative of Carcharodontosauridae — the family of giant predators including Carcharodontosaurus and Giganotosaurus. The Wessex Formation ecosystem where Neovenator lived included Iguanodon, Hypsilophodon, Baryonyx, and the titanosauriform sauropod Sauroposeidon, providing the prey base for this apex predator.',
  kidsDescription: 'Neovenator was the "New Hunter" — Britain\'s BEST big predatory dinosaur from the Cretaceous! Found on the Isle of Wight, it was the top predator that hunted Iguanodon. Its snout had tiny pit-holes similar to a crocodile\'s face sensors, suggesting it could detect vibrations and pressure! A super-hunter with a sophisticated sense of touch. Europe\'s finest large Cretaceous carnivore.',
  childFriendlyText: 'Neovenator was England\'s best-known large Cretaceous predator — found on the Isle of Wight — with possible crocodile-like pressure sensors in its snout for enhanced hunting ability.',
  scientificSummary: 'Neovenator salerii (Hutt et al., 1996) is an allosauroid theropod from the Barremian Wessex Formation (~130–125 Ma), Isle of Wight, England. ~70% of skeleton known. Skull long and low with serrated blade teeth. Snout foramina suggest possible mechanosensory (pressure-detecting) function. Phylogenetically placed as basal neovenatorid allosauroid, allied to Carcharodontosauridae. Apex predator of Wessex Formation ecosystem (contemporaneous with Iguanodon, Baryonyx).',
  discoveries: [
    { year: 1978, location: 'Brighstone Bay, Isle of Wight, England', discoveredBy: 'Amateur collectors (Isle of Wight fossil collectors)', note: 'Initial material found in 1978 by amateur collectors; subsequent excavations by Hutt and colleagues yielded substantial material; formally described in 1996.' },
  ],
  funFact: 'Neovenator\'s snout has tiny pit holes almost identical to those found on crocodile skulls today — organs that crocodiles use to sense water pressure and movement. If Neovenator had similar sensors, it may have been able to hunt by feeling vibrations through its face, like a crocodile waiting at a watering hole.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Neovenatoridae', genus: 'Neovenator', species: 'N. salerii' },
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Allosauroid relative' },
    { id: 'acrocanthosaurus', relationship: 'Neovenatorid relative' },
    { id: 'carcharodontosaurus', relationship: 'Related large allosauroid' },
  ],
  fossilLocations: [
    { country: 'UK', region: 'Brighstone Bay, Isle of Wight (Wessex Formation)', coordinates: [50.63, -1.42], specimenName: 'MIWG.6348 — holotype ~70% complete skeleton' },
  ],
  dangerLevel: 8, intelligence: 5,
  birdRelation: 'As an allosauroid theropod, Neovenator belongs to the broad theropod lineage from which birds eventually evolved, though allosauroids themselves are not on the direct avian line.',
}
