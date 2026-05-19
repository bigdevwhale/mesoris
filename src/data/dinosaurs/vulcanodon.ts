import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Vulcanodon: Dinosaur = {
  id: 'vulcanodon', slug: 'vulcanodon', displayName: 'Vulcanodon', name: 'Vulcanodon',
  pronunciation: 'vul-KAN-oh-don', nameMeaning: 'Volcano Tooth', genusName: 'Vulcanodon',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['Africa'], periodRangeMya: [200, 180],
  dimensions: { lengthMeters: 6.5, heightMeters: 2.0, weightKg: 4000, speedKmh: 12 },
  images: img('vulcanodon'),
  facts: [
    { label: 'Name', value: 'Volcano Tooth', icon: 'layers', description: 'Named "Volcano Tooth" because the fossils were found sandwiched between two layers of volcanic rock in Zimbabwe — a remarkable geological setting that helped date the specimen precisely.' },
    { label: 'Transition', value: 'Prosauropod to sauropod link', icon: 'arrow-up', description: 'Vulcanodon is a crucial transitional taxon linking the earlier prosauropods (like Plateosaurus) with true sauropods — showing the evolutionary steps toward the giant long-necked dinosaurs.' },
    { label: 'Africa', value: 'Earliest African sauropod', icon: 'anchor', description: 'Vulcanodon is among the earliest known sauropods from Africa, helping scientists map the spread of sauropod dinosaurs across Pangaea in the Early Jurassic.' },
    { label: 'Build', value: 'Stocky body', icon: 'maximize', description: 'Its robust, pillar-like limbs and stocky build show the transition from the more gracile prosauropod body plan toward the weight-bearing architecture of true sauropods.' },
  ],
  description: 'Vulcanodon karibaensis was a stocky early sauropod from the Early Jurassic of Zimbabwe, sandwiched between volcanic rock layers that give it both its name and a precise geological age. At approximately 6.5 metres, it was not yet the giant of later sauropods, but its anatomy represents a critical evolutionary bridge — linking the earlier prosauropods like Plateosaurus to the true sauropods that would later dominate Jurassic landscapes. The robust, pillar-like limb bones show the skeleton beginning to adapt to enormous body weight.',
  longDescription: 'Vulcanodon karibaensis (Raath, 1972) is a basal sauropod or eusauropod from the Early Jurassic (~200–180 Ma) Vulcanodon Beds of Zimbabwe, sandwiched between basalt layers associated with the Karoo large igneous province. The geological context allows a relatively precise age estimate. Vulcanodon was about 6.5 metres long with an estimated mass of ~4,000 kg. Its limb bones are robustly built with a circular cross-section, approaching the pillar-like morphology of derived sauropods. Interestingly, the known material included what appeared to be blade-like teeth near the skeleton, but these may belong to a theropod that scavenged or was buried nearby — Vulcanodon itself had no preserved teeth, making dietary inference indirect. Phylogenetically, Vulcanodon is placed either as a basal eusauropod or as a non-eusauropodan sauropod, making it pivotal for understanding the acquisition of derived sauropod features. The discovery is significant because Africa was still part of the southern supercontinent Gondwana in the Early Jurassic, and Vulcanodon demonstrates early sauropod diversification on this landmass.',
  kidsDescription: 'Vulcanodon was an EARLY sauropod from Zimbabwe — named "Volcano Tooth" because it was found between layers of volcanic rock! It was a bridge between small plant-eaters like Plateosaurus and the giant sauropods like Brachiosaurus. A key piece of the dinosaur evolution puzzle from Africa!',
  childFriendlyText: 'Vulcanodon was an early African sauropod found between volcanic rock layers in Zimbabwe, named "Volcano Tooth" — a key link between early plant-eaters and giant sauropods.',
  scientificSummary: 'Vulcanodon karibaensis (Raath, 1972) is a basal sauropod from the Early Jurassic (~200–180 Ma) Vulcanodon Beds, Zimbabwe, stratigraphically constrained between Karoo basalt flows. Postcranially robust with circular-cross-section limb bones approaching eusauropodan morphology. No diagnostic cranial or dental material known. Phylogenetically placed as basal eusauropod or non-eusauropodan sauropod; critical for understanding early sauropod dispersion across Gondwana.',
  discoveries: [
    { year: 1969, location: 'Lake Kariba region, Zimbabwe', discoveredBy: 'Michael Raath', note: 'Partial skeleton discovered between basalt layers; formally described by Raath in 1972, providing one of Africa\'s earliest known sauropods.' },
  ],
  funFact: 'When Vulcanodon was first found, some of the teeth discovered near it were mistakenly thought to be its own — making it look like a predatory dinosaur! Later analysis showed the teeth belonged to a theropod that had scavenged the Vulcanodon carcass, a "crime scene" 200 million years old.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Vulcanodontidae', genus: 'Vulcanodon', species: 'V. karibaensis' },
  relatedDinosaurs: [
    { id: 'plateosaurus', relationship: 'Earlier prosauropod ancestor lineage' },
    { id: 'brachiosaurus', relationship: 'Later derived sauropod relative' },
  ],
  fossilLocations: [
    { country: 'Zimbabwe', region: 'Mashonaland West, Vulcanodon Beds, Lake Kariba area', coordinates: [-17.0, 28.0], specimenName: 'QG 24 — holotype partial skeleton' },
  ],
  dangerLevel: 2, intelligence: 3,
}
