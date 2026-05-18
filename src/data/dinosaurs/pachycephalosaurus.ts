import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pachycephalosaurus: Dinosaur = {
    id: 'pachycephalosaurus', slug: 'pachycephalosaurus', displayName: 'Pachycephalosaurus', name: 'Pachycephalosaurus',
    pronunciation: 'PAK-ee-SEF-ah-lo-SORE-us', nameMeaning: 'Thick-headed Lizard', genusName: 'Pachycephalosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [68, 66],
    dimensions: { lengthMeters: 4.5, heightMeters: 1.6, weightKg: 450, speedKmh: 40 },
    images: img('pachycephalosaurus'),
    facts: [
      { label: 'Skull Dome', value: '25 cm thick', icon: 'shield', description: 'A massive solid bone dome on top of its head — up to 25 cm thick of solid bone.' },
      { label: 'Head-butting', value: 'Debated', icon: 'help-circle', description: 'May have head-butted like bighorn sheep — or the dome may have been just for display.' },
      { label: 'Teeth', value: 'Small and leaf-shaped', icon: 'leaf', description: 'Tiny teeth suggest it ate soft plants, fruits, and possibly insects.' },
    ],
    description: 'The bone-headed battering ram. Pachycephalosaurus had the thickest skull roof of any animal — a dome of solid bone 25 cm thick. Scientists still debate whether they actually head-butted.',
    longDescription: 'Pachycephalosaurus was the largest of the bone-headed dinosaurs, living at the very end of the Cretaceous alongside T. rex and Triceratops. Its most striking feature was the massive, 25-centimeter-thick dome of solid bone that capped its skull. The function of this dome remains controversial — some scientists envision head-to-head flank-butting competitions like modern bighorn sheep, while others argue the dome was used for species recognition and display, pointing out that the rounded surface would deflect rather than absorb impact.',
    kidsDescription: 'This dinosaur had a SUPER THICK HEAD — like wearing a crash helmet made of bone! Its skull roof was 25 centimeters of solid bone. Scientists think they might have bonked heads like mountain goats... but maybe they just showed off their cool domes instead!',
    childFriendlyText: 'Pachycephalosaurus had a giant bony bump on top of its head — like a built-in crash helmet! It might have bonked heads with other dinosaurs.',
    scientificSummary: 'Pachycephalosaurus wyomingensis (Brown & Schlaikjer, 1943) is a pachycephalosaurid marginocephalian from the Maastrichtian of North America. The largest pachycephalosaur, bearing a massively thickened frontoparietal dome exceeding 25 cm in depth. Histological analysis reveals a trabecular bone structure with rapidly deposited fibrolamellar tissue inconsistent with high-impact head-butting behavior, favoring species recognition or flank-butting hypotheses over direct cranial collisions.',
    discoveries: [{ year: 1931, location: 'Wyoming, USA', discoveredBy: 'Charles Gilmore', note: 'First skull dome discovered.' }],
    funFact: 'The first Pachycephalosaurus fossil found was just the skull dome — scientists thought it was a dinosaur kneecap!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Marginocephalia', family: 'Pachycephalosauridae', genus: 'Pachycephalosaurus', species: 'P. wyomingensis' },
    relatedDinosaurs: [{ id: 'tyrannosaurus-rex', relationship: 'Predator' }, { id: 'triceratops', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'USA', region: 'Wyoming', coordinates: [44.5, -105.0], specimenName: 'Lance Formation' }, { country: 'USA', region: 'Montana', coordinates: [47.5, -106.5] }],
    dangerLevel: 3, intelligence: 4,
  }
