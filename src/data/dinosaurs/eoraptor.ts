import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Eoraptor: Dinosaur = {
    id: 'eoraptor', slug: 'eoraptor', displayName: 'Eoraptor', name: 'Eoraptor',
    pronunciation: 'EE-oh-RAP-tor', nameMeaning: 'Dawn Thief', genusName: 'Eoraptor',
    era: 'triassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
    livedIn: ['South America'], periodRangeMya: [231, 231],
    dimensions: { lengthMeters: 1.0, heightMeters: 0.3, weightKg: 10, speedKmh: 40 },
    images: img('eoraptor'),
    facts: [
      { label: 'Name', value: '"Dawn Thief"', icon: 'sunrise', description: 'Its name means "Dawn Thief" — a thief at the dawn of the Age of Dinosaurs.' },
      { label: 'Teeth', value: 'Mixed diet', icon: 'utensils', description: 'Had both serrated carnivore teeth AND leaf-shaped herbivore teeth — an ancient omnivore.' },
      { label: 'Size', value: 'Dog-sized', icon: 'ruler', description: 'Only 1 meter long — dinosaurs started small before evolving into giants.' },
    ],
    description: 'The dawn thief. Eoraptor was one of the earliest dinosaurs, living at the very beginning of the dinosaur age. Only a meter long — like a small dog — it was a humble start for what would become the most successful land vertebrates ever.',
    longDescription: 'Eoraptor is one of the earliest known dinosaurs, contemporaneous with Herrerasaurus in the Ischigualasto Formation of Argentina (~231 million years ago). Despite its name implying carnivory ("raptor" = thief), Eoraptor\'s heterodont dentition — mixing serrated, recurved anterior teeth with leaf-shaped posterior teeth — indicates an omnivorous or even largely herbivorous diet, making it one of the most basally-diverging members of the sauropodomorph lineage. At only 1 meter long and weighing roughly 10 kg, Eoraptor demonstrates that dinosaurs began as modest, gracile animals — the titans of later ages were an evolutionary afterthought, not the original blueprint.',
    kidsDescription: 'Eoraptor was a TINY dinosaur from the VERY beginning of dinosaurs — just 1 meter long, like a little dog! Its name means "Dawn Thief" because it lived at the dawn of dinosaur time. It had two kinds of teeth — sharp ones for meat AND flat ones for plants. A little omnivore pioneer!',
    childFriendlyText: 'Eoraptor was a tiny, dog-sized dinosaur from the very start of the dinosaur age. It had both sharp teeth and flat teeth for eating everything!',
    scientificSummary: 'Eoraptor lunensis (Sereno et al., 1993) is a basal sauropodomorph from the Carnian Ischigualasto Formation, Argentina. Among the earliest-known dinosaurs at ~231 Ma, contemporaneous with Herrerasaurus. Small body size (~1m, ~10 kg) represents the plesiomorphic dinosaurian condition. Heterodont dentition — with recurved, serrated premaxillary teeth transitioning to lanceolate, denticulate maxillary teeth — indicates omnivorous trophic ecology. Currently resolved as the basalmost member of Sauropodomorpha, establishing that the sauropod lineage (eventually the largest terrestrial animals) originated from small-bodied, generalist ancestors.',
    discoveries: [{ year: 1991, location: 'San Juan, Argentina', discoveredBy: 'Ricardo Martinez', note: 'Discovered in the same Valley of the Moon formation as Herrerasaurus.' }],
    funFact: 'Eoraptor was discovered in the SAME place as Herrerasaurus — Argentina\'s Valley of the Moon. For decades, the only known earliest dinosaurs all came from this one small valley in Argentina, making it one of the most important fossil sites on Earth.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: '', genus: 'Eoraptor', species: 'E. lunensis' },
    relatedDinosaurs: [{ id: 'herrerasaurus', relationship: 'Contemporary' }, { id: 'plateosaurus', relationship: 'Later descendant' }],
    fossilLocations: [{ country: 'Argentina', region: 'San Juan', coordinates: [-30.0, -68.0], specimenName: 'Valle de la Luna, Ischigualasto Formation' }],
    dangerLevel: 2, intelligence: 4,
  }
