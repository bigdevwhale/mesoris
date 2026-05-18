import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Ichthyosaurus: Dinosaur = {
    id: 'ichthyosaurus', slug: 'ichthyosaurus', displayName: 'Ichthyosaurus', name: 'Ichthyosaurus',
    pronunciation: 'ICK-thee-oh-SORE-us', nameMeaning: 'Fish Lizard', genusName: 'Ichthyosaurus',
    era: 'jurassic', diet: 'carnivore', category: 'marine-reptile', size: 'medium', habitat: 'ocean',
    livedIn: ['Europe'], periodRangeMya: [201, 183],
    dimensions: { lengthMeters: 2.0, heightMeters: 0.4, weightKg: 100, speedKmh: 40 },
    images: img('ichthyosaurus'),
    facts: [
      { label: 'Look', value: 'Dolphin convergence', icon: 'fish', description: 'Looked exactly like a modern dolphin — the most perfect case of convergent evolution.' },
      { label: 'Eyes', value: 'Huge', icon: 'eye', description: 'The largest eyes of any vertebrate — up to 25 cm across for hunting in deep dark water.' },
      { label: 'Birth', value: 'Live birth', icon: 'baby', description: 'Gave birth to live young — fossils show babies emerging tail-first, just like modern whales.' },
      { label: 'Discovery', value: 'Anning\'s first', icon: 'medal', description: 'Mary Anning\'s first major discovery as a child — she found the skeleton at age 12.' },
    ],
    description: 'The dolphin before dolphins existed. Ichthyosaurus was so perfectly adapted to ocean life that it evolved the exact same body shape as dolphins — 180 million years before dolphins evolved. Mary Anning discovered it at age 12.',
    longDescription: 'Ichthyosaurus is the textbook example of convergent evolution — a reptile that evolved to look almost indistinguishable from modern dolphins. With a streamlined body, dolphin-like beak, dorsal fin (made of skin, not bone), and crescent-shaped tail, it was a high-speed pelagic hunter of squid and fish. Despite being a reptile, it gave birth to live young: extraordinary fossils from Germany and England preserve females with embryos inside, some in the process of tail-first birth — identical to modern cetaceans. Its enormous eyes — the largest relative to body size of any vertebrate — adapted it for deep-water hunting in low light conditions, making it one of the most formidable marine predators of the Early Jurassic.',
    kidsDescription: 'Ichthyosaurus looks EXACTLY like a dolphin, but it\'s a reptile, not a mammal! Nature invented the dolphin shape twice! It had the BIGGEST eyes ever — like giant dinner plates — to see in dark ocean depths. Mary Anning found the first one when she was just 12 years old!',
    childFriendlyText: 'Ichthyosaurus looked just like a dolphin but was actually a reptile! It had giant eyes and gave birth to live babies in the water.',
    scientificSummary: 'Ichthyosaurus communis (De la Beche & Conybeare, 1821) is the type genus of Ichthyosauria, from the Sinemurian Blue Lias Formation, UK. Exhibits the most derived aquatic body plan among Mesozoic reptiles: streamlined, fusiform body; thunniform caudal fin; dorsal hydrofoil; and a dolphin-like rostrum. Possessed the largest relative eye size of any vertebrate (orbital diameter up to 25 cm), indicating mesopelagic hunting capability. Numerous gravid specimens document obligate viviparity with cephalic presentation identical to modern odontocetes — one of the most striking cases of evolutionary convergence in the fossil record.',
    discoveries: [{ year: 1811, location: 'Lyme Regis, UK', discoveredBy: 'Mary Anning (age 12)', note: 'Mary and her brother Joseph found the skull — she later uncovered the entire skeleton.' }],
    funFact: 'Ichthyosaurus was the reason Mary Anning became a legendary fossil hunter. She found the skull at 12, then returned months later to excavate the entire 5-meter skeleton — all while barely a teenager.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Ichthyosauria', order: 'Ichthyopterygia', suborder: '', family: 'Ichthyosauridae', genus: 'Ichthyosaurus', species: 'I. communis' },
    relatedDinosaurs: [{ id: 'plesiosaurus', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'UK', region: 'Dorset', coordinates: [50.7, -2.9], specimenName: 'Blue Lias Formation' }],
    dangerLevel: 4, intelligence: 6,
  }
