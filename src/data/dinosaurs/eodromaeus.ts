import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Eodromaeus: Dinosaur = {
  id: 'eodromaeus', slug: 'eodromaeus', displayName: 'Eodromaeus', name: 'Eodromaeus',
  pronunciation: 'EE-oh-DROM-ee-us', nameMeaning: 'Dawn Runner', genusName: 'Eodromaeus',
  era: 'triassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'plains',
  livedIn: ['South America'], periodRangeMya: [231, 225],
  dimensions: { lengthMeters: 1.2, heightMeters: 0.4, weightKg: 5, speedKmh: 28 },
  images: img('eodromaeus'),
  facts: [
    { label: 'Name', value: 'Dawn Runner', icon: 'zap', description: '"Dawn Runner" — Eodromaeus was named for its position at the very dawn of theropod evolution, running at the beginning of the lineage that would produce T. rex and Velociraptor.' },
    { label: 'Teeth', value: 'Recurved blades', icon: 'target', description: 'Sharp, recurved, serrated teeth mark Eodromaeus as a dedicated carnivore — unusual because many early dinosaurs of the same time were omnivores or herbivores.' },
    { label: 'Coexistence', value: 'Same formation as Eoraptor', icon: 'users', description: 'Eodromaeus and Eoraptor lived in the same Ischigualasto Formation in Argentina, showing that both theropod and sauropodomorph lineages diverged very early.' },
    { label: 'Evolution', value: 'Theropod ancestor', icon: 'layers', description: 'Eodromaeus is one of the most basal theropods known, helping scientists map the primitive body plan from which all later meat-eating dinosaurs descended.' },
  ],
  description: 'Eodromaeus murphi was a small, swift early theropod from the Ischigualasto Formation of Argentina, dating to approximately 231 million years ago. Living in the same ancient floodplain environment as Eoraptor, it represents an independent lineage — the theropods — at the very start of its long evolutionary journey. Despite being only 1.2 metres long, Eodromaeus was a dedicated carnivore with sharp, recurved serrated teeth, making it one of the earliest specialist predators in dinosaur evolution. It foreshadowed the body plan of all later meat-eating dinosaurs.',
  longDescription: 'Eodromaeus murphi (Martinez et al., 2011) was described from remarkably complete material recovered from the Carnian Ischigualasto Formation of San Juan Province, Argentina (~231 Ma). This formation is famously rich in early dinosaur diversity, also yielding Eoraptor and Herrerasaurus. Eodromaeus was a gracile, cursorial predator approximately 1.2 metres long and ~5 kg in mass. Its skull bears sharp, laterally compressed, serrated teeth, consistent with an active predator of insects and small vertebrates. The postcranial skeleton is lightly built with elongate hind limbs suggesting good running ability. Phylogenetically, Eodromaeus is resolved as one of the most basal members of Theropoda — possibly the earliest known dedicated theropod carnivore — making it essential for understanding the primitive theropod body plan before the great diversification of this lineage in the Jurassic and Cretaceous. Its name, "dawn runner", captures its significance: it sat at the very dawn of the lineage that would ultimately produce Allosaurus, Spinosaurus, Velociraptor, and Tyrannosaurus.',
  kidsDescription: 'Eodromaeus was the "Dawn Runner" — one of the VERY FIRST meat-eating dinosaurs! Tiny at just 1.2 metres, this speedy little predator from Argentina lived 231 million years ago alongside Eoraptor. Its sharp, serrated teeth made it a fierce hunter despite its small size. The grandfather of T. rex!',
  childFriendlyText: 'Eodromaeus was one of the first meat-eating dinosaurs — the "Dawn Runner" from Argentina. Tiny but fierce, it had sharp teeth and was an ancestor of T. rex!',
  scientificSummary: 'Eodromaeus murphi (Martinez et al., 2011) is a basal theropod dinosaur from the Carnian Ischigualasto Formation, San Juan, Argentina (~231 Ma). Among the most basally-placed theropods known, it provides morphological data on the ancestral theropod body plan. Skull bears recurved, serrated, laterally compressed teeth (ziphodont); postcranium shows cursorial adaptations. Described from near-complete material including skull, vertebral column, and limb elements. Coexists with Eoraptor and Herrerasaurus in the same stratigraphic unit.',
  discoveries: [
    { year: 2011, location: 'Ischigualasto Provincial Park, San Juan, Argentina', discoveredBy: 'Ricardo N. Martínez et al.', note: 'Near-complete skeleton described in Science magazine; named "murphi" in honour of James Murphy, a museum supporter.' },
  ],
  funFact: 'Eodromaeus and Eoraptor lived at the same time in the same valley but represent two completely different dinosaur lineages — theropods and sauropodomorphs — showing that the great split in dinosaur evolution had already occurred 231 million years ago.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'incertae sedis', genus: 'Eodromaeus', species: 'E. murphi' },
  relatedDinosaurs: [
    { id: 'eoraptor', relationship: 'Contemporary from same formation' },
    { id: 'herrerasaurus', relationship: 'Larger contemporary predator' },
    { id: 'coelophysis', relationship: 'Close later relative' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'San Juan Province, Ischigualasto Formation', coordinates: [-30.0, -67.9], specimenName: 'PVSJ 562 — nearly complete holotype skeleton' },
  ],
  dangerLevel: 4, intelligence: 5,
  birdRelation: '2 / 10',
}
