import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Proceratosaurus: Dinosaur = {
  id: 'proceratosaurus', slug: 'proceratosaurus', displayName: 'Proceratosaurus', name: 'Proceratosaurus',
  pronunciation: 'proh-SEH-ra-toh-SOR-us', nameMeaning: 'Before Ceratosaurus', genusName: 'Proceratosaurus',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
  livedIn: ['Europe'], periodRangeMya: [167, 164],
  dimensions: { lengthMeters: 3.0, heightMeters: 0.9, weightKg: 100, speedKmh: 28 },
  images: img('proceratosaurus'),
  facts: [
    { label: 'Misnamed', value: 'Not before Ceratosaurus', icon: 'help-circle', description: 'Originally thought to be an ancestor of Ceratosaurus because of its nasal crest — but it\'s actually a tyrannosauroid!' },
    { label: 'Crest', value: 'Delicate nasal bump', icon: 'shield', description: 'A small bump-like crest on the snout, similar in form to the larger crest of Guanlong.' },
    { label: 'Origin', value: 'Gloucestershire', icon: 'map-pin', description: 'Found in a brick pit in Minchinhampton, Gloucestershire, England, in 1910.' },
    { label: 'Family', value: 'Early tyrannosauroid', icon: 'star', description: 'Belongs to Proceratosauridae — a basal family of tyrannosauroids including Guanlong and Kileskus.' },
  ],
  description: 'Proceratosaurus was a small, crested early tyrannosauroid from Middle Jurassic England — once thought to be related to Ceratosaurus, but now recognised as a humble ancestor of T. rex.',
  longDescription: 'Proceratosaurus bradleyi (Woodward, 1910) is a proceratosaurid tyrannosauroid from the Bathonian (Middle Jurassic) of Gloucestershire, England. The holotype is a partial skull discovered in 1910 in a brick pit in Minchinhampton. Originally interpreted as an ancestral member of Ceratosauria because of its small nasal crest — leading to its name "before Ceratosaurus" — it has since been reclassified as one of the earliest and most basal members of Tyrannosauroidea. Phylogenetically, it is closely related to Guanlong, Kileskus, and Sinotyrannus. The nasal crest of Proceratosaurus is small and ridge-like, far less elaborate than the dramatic crest of Guanlong, but it served a similar function — likely for display. The skull preserves a complete maxilla, premaxilla, dentary, and parts of the braincase, providing important information about the early evolution of the tyrannosauroid skull. Like other early tyrannosauroids, Proceratosaurus was a small, agile predator — a far cry from the giant T. rex that would come 100 million years later.',
  kidsDescription: 'Proceratosaurus means "Before Ceratosaurus" — but scientists got the name wrong! It was really an early T. rex relative, not a Ceratosaurus cousin. It had a little ridge on its nose and lived in Jurassic England!',
  childFriendlyText: 'Proceratosaurus was a small early ancestor of T. rex from England. It had a small bony bump on its nose and was once mistakenly thought to be related to Ceratosaurus.',
  scientificSummary: 'Proceratosaurus bradleyi (Woodward, 1910) is a proceratosaurid tyrannosauroid from the Bathonian (Middle Jurassic) of Gloucestershire, England. Originally described as a ceratosaur — now recognised as a basal tyrannosauroid. Diagnostic: small nasal crest, gracile skull. Close relative of Guanlong. Among the earliest known tyrannosauroids globally.',
  discoveries: [
    { year: 1910, location: 'Minchinhampton, Gloucestershire, England', discoveredBy: 'F. Lewis Bradley', note: 'Partial skull found in a brick pit; described by Arthur Smith Woodward.' },
  ],
  funFact: 'Proceratosaurus was named in 1910 to mean "before Ceratosaurus", because the little crest on its nose looked like that of Ceratosaurus. It took nearly 100 years for scientists to realise it actually had nothing to do with Ceratosaurus — it was an early tyrannosauroid!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Proceratosauridae', genus: 'Proceratosaurus', species: 'P. bradleyi' },
  relatedDinosaurs: [
    { id: 'guanlong', relationship: 'Crest-crested proceratosaurid cousin' },
    { id: 'dilophosaurus', relationship: 'Contemporaneous crested theropod' },
    { id: 'tyrannosaurus-rex', relationship: 'Distant descendant' },
  ],
  fossilLocations: [
    { country: 'United Kingdom', region: 'Minchinhampton, Gloucestershire', coordinates: [51.7, -2.2], specimenName: 'NHMUK PV R 4860 — holotype partial skull' },
  ],
  dangerLevel: 4, intelligence: 6, birdRelation: 'Proceratosaurus is a coelurosaur and a basal tyrannosauroid, sharing the bird-like features that characterise the wider theropod group.'
}
