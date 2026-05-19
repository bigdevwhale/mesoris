import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Brontosaurus: Dinosaur = {
  id: 'brontosaurus', slug: 'brontosaurus', displayName: 'Brontosaurus', name: 'Brontosaurus',
  pronunciation: 'BRON-toh-SOR-us', nameMeaning: 'Thunder Lizard', genusName: 'Brontosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [156, 146],
  dimensions: { lengthMeters: 22.0, heightMeters: 5.5, weightKg: 17000, speedKmh: 12 },
  images: img('brontosaurus'),
  facts: [
    { label: 'Comeback', value: 'Reinstated in 2015', icon: 'rotate-cw', description: 'For over a century, Brontosaurus was considered the same animal as Apatosaurus and "invalid". A landmark 2015 study proved it was a genuinely distinct genus — a remarkable scientific resurrection.' },
    { label: 'Size', value: '22 metres long', icon: 'maximize', description: 'At 22 metres and 17 tonnes, Brontosaurus was one of the largest animals to ever walk the Earth — its footsteps would have literally thundered across the Jurassic plains.' },
    { label: 'Name', value: 'Thunder Lizard', icon: 'zap', description: '"Brontosaurus" means "Thunder Lizard" — fitting for an animal so large that its footsteps may have produced earthquake-like vibrations felt by other animals miles away.' },
    { label: 'Neck', value: 'Long flexible neck', icon: 'arrow-up', description: 'Its extremely long neck allowed Brontosaurus to sweep through a wide arc of vegetation at ground level without moving its massive body — an efficient low-energy feeding strategy.' },
  ],
  description: 'Brontosaurus — the "Thunder Lizard" — is one of the most iconic dinosaurs ever, and one that has a remarkable scientific story. Named by O.C. Marsh in 1879 and celebrated for decades, it was declared synonymous with Apatosaurus in 1903 and effectively "erased". Then, in 2015, an exhaustive anatomical study reinstated Brontosaurus as a valid and distinct genus. At 22 metres and 17 tonnes, it was one of the largest animals ever to walk the Earth, roaming the Jurassic floodplains of North America 156 to 146 million years ago.',
  longDescription: 'Brontosaurus excelsus (Marsh, 1879) is a diplodocid sauropod from the Late Jurassic Morrison Formation of North America (~156–146 Ma), known from sites across Wyoming, Colorado, Utah, and Oklahoma. Marsh named the genus in 1879, but Elmer Riggs in 1903 synonymised it with Apatosaurus — a decision accepted for over a century. Emanuel Tschopp and colleagues\' landmark 2015 study, using rigorous phylogenetic analysis of 81 specimens and 477 anatomical characters, demonstrated that Brontosaurus differs from Apatosaurus in numerous skeletal features, including wider hips, different neck vertebrae proportions, and distinct cervical ribs. This reinstated Brontosaurus as a valid genus. Three species are now recognised: B. excelsus, B. parvus, and B. yahnahpin. Brontosaurus fed primarily on low-growing vegetation, sweeping its long neck in a horizontal arc to efficiently crop ferns and low conifers without moving its enormous body. Its tail may have been used as a "whip" capable of producing a supersonic crack for communication or defence.',
  kidsDescription: 'Brontosaurus — the THUNDER LIZARD — is one of the most famous dinosaurs ever! It was "deleted" by scientists in 1903 but officially CAME BACK in 2015 when a big study proved it was real after all! At 22 metres and 17 tonnes, its footsteps really did thunder. The greatest dinosaur comeback in history!',
  childFriendlyText: 'Brontosaurus is the famous "Thunder Lizard" that was declared not real, then came back in 2015! At 22 metres and 17 tonnes, this giant roamed Jurassic North America.',
  scientificSummary: 'Brontosaurus excelsus (Marsh, 1879) is a diplodocid sauropod from the Kimmeridgian–Tithonian Morrison Formation, western North America (~156–146 Ma). Synonymised with Apatosaurus (Riggs, 1903), then reinstated as valid by Tschopp et al. (2015) based on phylogenetic analysis of 477 characters across 81 specimens. Three species recognised: B. excelsus, B. parvus, B. yahnahpin. Length ~22 m, mass ~17,000 kg. Diplodocid with elongate cervical vertebrae, gracile limb bones, and whip-like tail.',
  discoveries: [
    { year: 1879, location: 'Morrison Formation, Como Bluff, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Named Brontosaurus excelsus by Marsh; synonymised with Apatosaurus in 1903 but formally reinstated as valid genus in 2015.' },
    { year: 2015, location: 'Published paper (multiple collections)', discoveredBy: 'Emanuel Tschopp, Octavio Mateus, Roger Benson', note: 'Landmark anatomical study of 81 diplodocid specimens reinstated Brontosaurus as a valid genus distinct from Apatosaurus.' },
  ],
  funFact: 'For 112 years, every "Brontosaurus" in every museum was technically mislabelled — it was officially called Apatosaurus. Millions of children grew up loving a dinosaur that science said didn\'t exist, until 2015 when scientists finally confirmed: Brontosaurus is real.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Diplodocidae', genus: 'Brontosaurus', species: 'B. excelsus' },
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: 'Very close diplodocid relative (once considered same genus)' },
    { id: 'diplodocus', relationship: 'Close diplodocid relative' },
    { id: 'brachiosaurus', relationship: 'Contemporary sauropod' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'YPM 1980 — holotype of B. excelsus' },
    { country: 'USA', region: 'Garden Park, Colorado (Morrison Formation)', coordinates: [38.4, -105.1], specimenName: 'AMNH 460 — referred large specimen' },
    { country: 'USA', region: 'Bone Cabin Quarry, Wyoming (Morrison Formation)', coordinates: [41.79, -105.67], specimenName: 'B. parvus material' },
  ],
  dangerLevel: 3, intelligence: 3,
}
