import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Daspletosaurus: Dinosaur = {
    id: 'daspletosaurus', slug: 'daspletosaurus', displayName: 'Daspletosaurus', name: 'Daspletosaurus',
    pronunciation: 'dass-PLEE-toh-SORE-us', nameMeaning: 'Frightful Lizard', genusName: 'Daspletosaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [77, 74],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.7, weightKg: 3000, speedKmh: 30 },
    images: img('daspletosaurus'),
    facts: [
      { label: 'Ancestry', value: 'T-Rex ancestor', icon: 'git-branch', description: 'A direct ancestor of T. rex — it shows how tyrannosaurs evolved growing bigger and more powerful.' },
      { label: 'Teeth', value: 'D-shaped', icon: 'triangle', description: 'Had D-shaped front teeth for scraping meat from bones — a signature tyrannosaur feature.' },
      { label: 'Hunting', value: 'Active predator', icon: 'target', description: 'Evidence shows it actively hunted and fought prey — not a scavenger.' },
      { label: 'Bite', value: 'Bone-crushing', icon: 'hammer', description: 'Already developing the powerful bone-crushing bite that made T. rex famous.' },
    ],
    description: 'The ancestor of terror. Daspletosaurus was the direct predecessor of T. rex — the prototype tyrannosaur. Slightly smaller but just as fierce, it shows the evolutionary path to the king.',
    longDescription: 'Daspletosaurus was a tyrannosaurid theropod that lived during the Campanian stage of the Late Cretaceous, roughly 77-74 million years ago. It represents a crucial transitional form in tyrannosaur evolution — more heavily built and powerful than earlier tyrannosaurs, but not yet reaching the extremes of T. rex. Its robust skull and powerful jaws already exhibited the bone-crushing adaptation that defines the lineage. Some paleontologists have proposed that Daspletosaurus represents an anagenetic lineage — a single evolving species line that eventually led directly to Tyrannosaurus rex through gradual transformation.',
    kidsDescription: 'Daspletosaurus is what T-Rex looked like BEFORE it became T-Rex! It was a bit smaller but getting there — like a T-Rex in training. It was working on growing bigger, stronger jaws, and becoming the ultimate dinosaur king!',
    childFriendlyText: 'Daspletosaurus was T-Rex\'s ancestor — like a younger, slightly smaller T-Rex that was learning how to be the king of the dinosaurs!',
    scientificSummary: 'Daspletosaurus torosus (Russell, 1970) is a tyrannosaurine tyrannosaurid from the Campanian of Alberta and Montana. Larger and more robust than contemporary albertosaurines, representing a derived tyrannosaurid bauplan with an expanded maxillary tooth count, incrassate (thickened) teeth with a characteristic D-shaped premaxillary cross-section, and a deep, broad snout. Proposed as a potential anagenetic link within a Tyrannosaurus-lineage chronospecies series. Pathologies on multiple specimens attest to violent predatory encounters with ceratopsids and hadrosaurs.',
    discoveries: [{ year: 1921, location: 'Alberta, Canada', discoveredBy: 'Charles M. Sternberg', note: 'First skull discovered in the Oldman Formation.' }],
    funFact: 'Daspletosaurus fossils show healed bite marks from other Daspletosaurus, suggesting they fought each other — possibly over territory or mates.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Tyrannosaurinae', genus: 'Daspletosaurus', species: 'D. torosus' },
    relatedDinosaurs: [{ id: 'tyrannosaurus-rex', relationship: 'Descendant' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [49.5, -112.0], specimenName: 'Oldman Formation' }, { country: 'USA', region: 'Montana', coordinates: [47.5, -110.5], specimenName: 'Two Medicine Formation' }],
    dangerLevel: 9, intelligence: 5,
  }
