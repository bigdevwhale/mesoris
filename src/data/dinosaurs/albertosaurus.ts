import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Albertosaurus: Dinosaur = {
    id: 'albertosaurus',
    slug: 'albertosaurus',
    displayName: 'Albertosaurus',
    name: 'Albertosaurus',
    pronunciation: 'al-BER-toe-SORE-us',
    nameMeaning: 'Alberta Lizard',
    genusName: 'Albertosaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'large',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [71, 68],
    dimensions: { lengthMeters: 9.0, heightMeters: 3.2, weightKg: 2500, speedKmh: 45 },
    images: img('albertosaurus'),
    facts: [
      { label: 'Bonebed', value: '20+ individuals', icon: 'users', description: 'A famous Alberta bonebed preserves many animals together, suggesting social behavior or at least group feeding.' },
      { label: 'Build', value: 'Lighter tyrannosaur', icon: 'zap', description: 'Albertosaurus was slimmer and likely faster than the heavier, later Tyrannosaurus rex.' },
      { label: 'Teeth', value: 'Dozens of blades', icon: 'skull', description: 'Its jaws held thick, serrated teeth designed to puncture flesh and rip chunks from prey.' },
      { label: 'Growth', value: 'Teenage speed burst', icon: 'arrow-up', description: 'Growth studies show juveniles matured quickly, turning into powerful predators in just a few years.' },
    ],
    description: 'Albertosaurus was the sleek sprinter of the tyrannosaur family — a long-legged predator from ancient Canada that combined tyrant-dinosaur jaws with a lighter, faster frame.',
    longDescription: 'Living in the river plains of Late Cretaceous Alberta, Albertosaurus occupied the role of top predator several million years before Tyrannosaurus rex appeared farther south. It had the deep skull and crushing neck musculature typical of tyrannosaurs, but its overall build was more gracile, with proportionally longer lower legs that suggest good running ability. The famous Dry Island bonebed, where many individuals were found together, has fueled ideas that albertosaurs may have tolerated each other in groups or gathered around carcasses. Histological studies of their bones have also made Albertosaurus one of the best-understood tyrannosaurs for growth and life-history research.',
    kidsDescription: 'Albertosaurus was like a speedy Canadian cousin of T. rex! It had a huge head, lots of sharp teeth, and may have hung out with other Albertosaurus dinosaurs in a whole predator gang.',
    childFriendlyText: 'Albertosaurus was a fast tyrannosaur from Canada. It was smaller than T. rex but still a very scary hunter.',
    scientificSummary: 'Albertosaurus sarcophagus (Osborn, 1905) is an albertosaurine tyrannosaurid from the Maastrichtian Horseshoe Canyon Formation of Alberta, Canada. It is characterized by a lightly built cranial skeleton, elongate distal hindlimbs, and reduced but functional tyrannosaurid forelimbs. The Dry Island bonebed and extensive growth-ring sampling have made Albertosaurus a model taxon for tyrannosaur population structure, ontogeny, and predator biomechanics.',
    discoveries: [
      { year: 1884, location: 'Red Deer River, Alberta, Canada', discoveredBy: 'Joseph Burr Tyrrell', note: 'The first skull material was found during a Geological Survey expedition.' },
      { year: 1910, location: 'Alberta, Canada', discoveredBy: 'Barnum Brown', note: 'Brown discovered the famous mass bonebed that transformed understanding of the species.' },
    ],
    funFact: 'Because of its long legs, Albertosaurus may have been one of the fastest large tyrannosaurs ever to live.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Albertosaurinae', genus: 'Albertosaurus', species: 'A. sarcophagus' },
    relatedDinosaurs: [
      { id: 'tyrannosaurus-rex', relationship: 'Larger close relative' },
      { id: 'daspletosaurus', relationship: 'Fellow tyrannosaurid' },
      { id: 'pachyrhinosaurus', relationship: 'Potential prey' },
    ],
    fossilLocations: [
      { country: 'Canada', region: 'Alberta', coordinates: [51.9, -112.9], specimenName: 'Horseshoe Canyon Formation' },
    ],
    dangerLevel: 9,
    intelligence: 6,
}
