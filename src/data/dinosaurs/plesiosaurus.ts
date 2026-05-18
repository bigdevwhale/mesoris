import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Plesiosaurus: Dinosaur = {
    id: 'plesiosaurus', slug: 'plesiosaurus', displayName: 'Plesiosaurus', name: 'Plesiosaurus',
    pronunciation: 'PLEE-zee-oh-SORE-us', nameMeaning: 'Near Lizard', genusName: 'Plesiosaurus',
    era: 'jurassic', diet: 'carnivore', category: 'marine-reptile', size: 'medium', habitat: 'ocean',
    livedIn: ['Europe'], periodRangeMya: [201, 183],
    dimensions: { lengthMeters: 3.5, heightMeters: 0.6, weightKg: 450, speedKmh: 20 },
    images: img('plesiosaurus'),
    facts: [
      { label: 'Neck', value: '40+ vertebrae', icon: 'arrow-up', description: 'An impossibly long neck with over 40 vertebrae — more than most dinosaurs had in their entire spine.' },
      { label: 'Flippers', value: 'Four equal paddles', icon: 'rotate-cw', description: 'Swam with four large paddle-like flippers — like underwater flying.' },
      { label: 'Discovery', value: 'Anning\'s triumph', icon: 'medal', description: 'Mary Anning\'s 1823 discovery — one of the first prehistoric reptiles ever known.' },
    ],
    description: 'The original sea serpent. Plesiosaurus was the first long-necked marine reptile discovered — Mary Anning\'s 1823 find that stunned the world and inspired legends of the Loch Ness Monster. It "flew" underwater with four paddle-like flippers.',
    longDescription: 'Plesiosaurus was the type genus of the plesiosaurs — the long-necked marine reptiles that dominated Mesozoic seas for over 150 million years. Discovered by Mary Anning in the Early Jurassic Blue Lias deposits of Lyme Regis, England, it was one of the first prehistoric reptiles known to science and caused a sensation in Victorian Britain. Its anatomy was so unusual — a long flexible neck with over 40 cervical vertebrae, a short barrel-shaped body, four paddle-like flippers of roughly equal size, and a short tail — that early scientists struggled to conceive how such an animal could swim. Modern research suggests the four flippers operated like hydrofoils in an "underwater flight" motion, similar to modern sea turtles but with double the propulsion surfaces.',
    kidsDescription: 'Plesiosaurus is what people think of when they imagine the LOCH NESS MONSTER! Long snakey neck, fat body, four big flippers — it\'s exactly that shape! Mary Anning found the first one in England and people couldn\'t believe their eyes. It swam by "flying" underwater with its four flippers, like a seal with wings!',
    childFriendlyText: 'Plesiosaurus had a super long neck and four big flippers. It looks just like the Loch Ness Monster — maybe that\'s where the legend comes from!',
    scientificSummary: 'Plesiosaurus dolichodeirus (Conybeare, 1824) is the type genus of Plesiosauria, from the Sinemurian Blue Lias Formation, UK. Characterized by an extremely elongated neck composed of 40+ cervical vertebrae with associated ribs, a short, deep trunk, four similarly-sized hyperphalangic paddles, and a short tail. The functional morphology of the four-flipper swimming system represents a unique locomotor solution among tetrapods — "underwater flight" via coordinated hydrofoil motion with no modern analog. Discovered by Mary Anning, it was among the foundational taxa of vertebrate paleontology.',
    discoveries: [{ year: 1823, location: 'Lyme Regis, UK', discoveredBy: 'Mary Anning', note: 'First articulated skeleton discovered on the Jurassic Coast — a scientific sensation.' }],
    funFact: 'Plesiosaurus was so weird when first discovered that British scientists literally thought someone had glued together parts of different animals — until Mary Anning found a complete skeleton.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Sauropterygia', order: 'Plesiosauria', suborder: '', family: 'Plesiosauridae', genus: 'Plesiosaurus', species: 'P. dolichodeirus' },
    relatedDinosaurs: [{ id: 'elasmosaurus', relationship: 'Much larger descendant' }, { id: 'ichthyosaurus', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'UK', region: 'Dorset', coordinates: [50.7, -2.9], specimenName: 'Blue Lias Formation, Jurassic Coast' }],
    dangerLevel: 5, intelligence: 4,
  }
