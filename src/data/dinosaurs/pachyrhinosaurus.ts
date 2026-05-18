import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pachyrhinosaurus: Dinosaur = {
    id: 'pachyrhinosaurus', slug: 'pachyrhinosaurus', displayName: 'Pachyrhinosaurus', name: 'Pachyrhinosaurus',
    pronunciation: 'PAK-ee-RYE-no-SORE-us', nameMeaning: 'Thick-nosed Lizard', genusName: 'Pachyrhinosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [73, 69],
    dimensions: { lengthMeters: 8.0, heightMeters: 2.2, weightKg: 4000, speedKmh: 30 },
    images: img('pachyrhinosaurus'),
    facts: [
      { label: 'Boss', value: 'Thick bony pad', icon: 'shield', description: 'Instead of a nose horn, it had a massive, boss-like bony pad — like a battering ram.' },
      { label: 'Horns', value: 'Frill spikes', icon: 'swords', description: 'Horns grew from the frill, not the brow — a reversed arrangement from Triceratops.' },
      { label: 'Bonebed', value: 'Mass herds', icon: 'users', description: 'Known from massive bonebeds — lived in enormous herds of thousands.' },
    ],
    description: 'The ceratopsian that traded its nose horn for a battering ram. Pachyrhinosaurus had a massive, boss-like bony pad on its nose instead of a horn — a unique adaptation among horned dinosaurs.',
    longDescription: 'Pachyrhinosaurus was one of the most unusual ceratopsids, notable for what it lacked — the classic brow and nose horns. Instead, the nasal area bore a massive, roughened bony boss (a "pachyostotic pad"), which may have supported a keratinous sheath and functioned as a battering ram in shoving contests. Paired horns curved from the back of the frill. Known from massive monodominant bonebeds in Alberta and Alaska, Pachyrhinosaurus lived in enormous herds — some containing thousands of individuals — that migrated across the Arctic and sub-Arctic coastal plains.',
    kidsDescription: 'Pachyrhinosaurus was a FUNNY-looking horned dinosaur. Instead of a nose horn, it had a huge bony bump — like it was wearing a helmet! When they fought, they probably pushed each other with their big nose bumps. They lived in mega-herds of THOUSANDS of dinosaurs!',
    childFriendlyText: 'Pachyrhinosaurus had a big bony bump on its nose instead of a horn. It lived in huge herds with thousands of friends!',
    scientificSummary: 'Pachyrhinosaurus lakustai (Currie, Langston & Tanke, 2008) is a centrosaurine ceratopsid from the Campanian Wapiti Formation, Alberta. Distinguished by the absence of a nasal horn core, replaced by a massive, thickened nasal boss formed by the co-ossified nasals and prefrontals. Paired supraorbital horn cores are absent; instead, large epiparietal horns arise from the posterior frill margin. Monodominant bonebeds indicate gregarious herd behavior on a scale exceeding most other known dinosaur taxa.',
    discoveries: [{ year: 1946, location: 'Alberta, Canada', discoveredBy: 'Charles M. Sternberg', note: 'First skull discovered.' }, { year: 1970, location: 'Alberta, Canada', discoveredBy: 'Al Lakusta', note: 'Massive bonebed with hundreds of individuals.' }],
    funFact: 'Pachyrhinosaurus lived as far north as Alaska — they survived months of winter darkness above the Arctic Circle, proving dinosaurs could thrive in extreme conditions.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Centrosaurinae', genus: 'Pachyrhinosaurus', species: 'P. lakustai' },
    relatedDinosaurs: [{ id: 'styracosaurus', relationship: 'Close relative' }, { id: 'triceratops', relationship: 'Relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [55.0, -118.0], specimenName: 'Wapiti Formation' }, { country: 'USA', region: 'Alaska', coordinates: [69.0, -151.0], specimenName: 'Prince Creek Formation' }],
    dangerLevel: 6, intelligence: 4,
  }
