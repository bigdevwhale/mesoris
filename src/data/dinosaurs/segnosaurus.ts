import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Segnosaurus: Dinosaur = {
  id: 'segnosaurus', slug: 'segnosaurus', displayName: 'Segnosaurus', name: 'Segnosaurus',
  pronunciation: 'SEG-no-SOR-us', nameMeaning: 'Slow Lizard', genusName: 'Segnosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'swamp',
  livedIn: ['Asia'], periodRangeMya: [100, 86],
  dimensions: { lengthMeters: 7.0, heightMeters: 2.0, weightKg: 1700, speedKmh: 14 },
  images: img('segnosaurus'),
  facts: [
    { label: 'Mystery', value: 'Confusing anatomy', icon: 'lightbulb', description: 'When first found, Segnosaurus was so bizarre that scientists argued for years about what kind of dinosaur it was — its combination of features seemed impossible in one animal.' },
    { label: 'Therizinosaur', value: 'Plant-eating theropod', icon: 'leaf', description: 'Segnosaurus belongs to Therizinosauria — a group of theropods (traditionally meat-eaters) that evolved to become herbivores, with broad pot-bellied bodies and leaf-shaped teeth.' },
    { label: 'Claws', value: 'Large curved claws', icon: 'feather', description: 'Unlike its relative Therizinosaurus, Segnosaurus had shorter, stout claws — possibly used for digging termite mounds, raking branches, or defence rather than slashing.' },
    { label: 'Pelvis', value: 'Backward-pointing pubis', icon: 'layers', description: 'Uniquely among saurischian theropods, therizinosaurs like Segnosaurus evolved a reversed, bird-like pubis — an adaptation that allowed a larger gut to process plant material.' },
  ],
  description: 'Segnosaurus galbinensis was a bizarre herbivorous theropod from the Late Cretaceous Gobi Desert of Mongolia — a member of the enigmatic therizinosaurs, a group of meat-eating dinosaurs that reinvented themselves as plant-eaters. Growing to 7 metres, it had a pot-bellied body, broad hips, a reversed pelvis, and blunt claws on its forelimbs. When first discovered, scientists were so confused by its contradictory anatomy that it was initially described as a partially aquatic fish-eater. It was eventually recognised as a plant-eating theropod, crucial for decoding the strange therizinosaur family.',
  longDescription: 'Segnosaurus galbinensis (Perle, 1979) is a therizinosaur theropod from the Cenomanian–Santonian (~100–86 Ma) Bayan Shireh Formation of Mongolia. When first described, it was placed in a newly created family (Segnosauridae) and its systematic position was highly contentious — early interpretations suggested semi-aquatic habits or prosauropod affinity. The discovery of Beipiaosaurus in China in 1999, preserved with feathers, and continued phylogenetic work eventually confirmed therizinosaurs as derived maniraptoran theropods within the coelurosaur clade — relatives of dromaeosaurs and birds, but herbivorous. Segnosaurus had a relatively small head with simple, leaf-shaped teeth suited for processing plant material, a distinctly pot-bellied torso housing a large fermentation gut, broad forelimbs with large but less extreme claws than Therizinosaurus, and a four-toed foot — unusual among theropods. The reversed pubis (opisthopubic pelvis) created space for an enormous digestive system, convergently paralleling the anatomy of ornithischian herbivores. Segnosaurus is among the earlier-described therizinosaurs, making it important for understanding the group\'s evolutionary history.',
  kidsDescription: 'Segnosaurus was one of the WEIRDEST dinosaurs — a meat-eating dinosaur that BECAME a plant-eater! Scientists were so confused by its strange anatomy when they found it that they argued for years about what it was. Its pot-belly, reversed hip bones, and leaf-shaped teeth all worked together to digest huge amounts of plants. A true evolutionary mystery solved!',
  childFriendlyText: 'Segnosaurus was a plant-eating theropod with a pot belly and reversed hip bones — one of the most anatomically bizarre dinosaurs ever found in Mongolia.',
  scientificSummary: 'Segnosaurus galbinensis (Perle, 1979) is a therizinosaur maniraptoran theropod from the Cenomanian–Santonian Bayan Shireh Formation (~100–86 Ma), Mongolia. Herbivorous coelurosaur with leaf-shaped dentition, opisthopubic pelvis (convergent with ornithischia), broad forelimbs with large manual unguals. Initially misclassified; confirmed as maniraptoran therizinosaur via phylogenetic analysis. Important taxon for understanding therizinosaur evolution and the secondary herbivory trend in theropods.',
  discoveries: [
    { year: 1979, location: 'Bayan Shireh Formation, Gobi Desert, Mongolia', discoveredBy: 'Altangerel Perle', note: 'Described by Perle in 1979; original classification was uncertain, but subsequent work placed it firmly in Therizinosauria.' },
  ],
  funFact: 'Therizinosaurs like Segnosaurus are the "pandas of the dinosaur world" — descended from predatory meat-eaters, they completely abandoned carnivory and became dedicated plant-eaters, evolving an entirely new body plan to handle the dietary switch.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Segnosauridae', genus: 'Segnosaurus', species: 'S. galbinensis' },
  relatedDinosaurs: [
    { id: 'therizinosaurus', relationship: 'Close therizinosaur relative' },
    { id: 'oviraptor', relationship: 'Contemporaneous Mongolian theropod' },
  ],
  fossilLocations: [
    { country: 'Mongolia', region: 'Dornogovi Province, Bayan Shireh Formation', coordinates: [44.0, 108.5], specimenName: 'IGM 100/80 — holotype partial skeleton' },
  ],
  dangerLevel: 4, intelligence: 4,
  birdRelation: 'Therizinosaurs are maniraptorans — the same broad group as birds — making Segnosaurus one of the closest non-avian relatives of modern birds despite its herbivorous lifestyle.',
}
