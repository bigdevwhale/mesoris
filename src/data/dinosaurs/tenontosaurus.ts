import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Tenontosaurus: Dinosaur = {
  id: 'tenontosaurus', slug: 'tenontosaurus', displayName: 'Tenontosaurus', name: 'Tenontosaurus',
  pronunciation: 'ten-ON-toh-SOR-us', nameMeaning: 'Sinew Lizard', genusName: 'Tenontosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['North America'], periodRangeMya: [115, 108],
  dimensions: { lengthMeters: 8.0, heightMeters: 2.2, weightKg: 1000, speedKmh: 20 },
  images: img('tenontosaurus'),
  facts: [
    { label: 'Prey', value: 'Deinonychus target', icon: 'skull', description: 'Tenontosaurus is most famously associated with Deinonychus — multiple Deinonychus teeth have been found with Tenontosaurus remains, providing direct evidence of predator-prey relationships 115 million years ago.' },
    { label: 'Tail', value: 'Stiffened by tendons', icon: 'shield', description: 'The tail was stiffened by a complex network of ossified tendons — giving the animal its name "Sinew Lizard" — and making the tail a rigid counterbalance for bipedal running.' },
    { label: 'Size', value: 'Mid-tier herbivore', icon: 'maximize', description: 'At 8 metres and 1 tonne, Tenontosaurus was the dominant mid-size herbivore of the Cloverly Formation, too large for most small predators but prey for pack-hunting Deinonychus.' },
    { label: 'Abundance', value: 'Common fossil', icon: 'users', description: 'Tenontosaurus is one of the most commonly found dinosaurs from the Aptian–Albian of North America — its abundance reflects its ecological success as a widespread herbivore.' },
  ],
  description: 'Tenontosaurus tilletti was a large ornithopod herbivore from the Early Cretaceous of North America, best known for its dramatic relationship with the dromaeosaurid predator Deinonychus. Multiple Deinonychus teeth — shed during feeding — have been found among Tenontosaurus bones, providing some of the best direct fossil evidence of predator-prey interactions in the Mesozoic. At 8 metres with a stiffened, tendon-reinforced tail, Tenontosaurus was the dominant mid-tier herbivore of the Cloverly Formation ecosystem, and the most commonly found dinosaur in that ancient community.',
  longDescription: 'Tenontosaurus tilletti (Ostrom, 1970) is an iguanodontian ornithopod from the Aptian–Albian (~115–108 Ma) Cloverly and Antlers formations of Montana, Wyoming, Oklahoma, Texas, and other western states. It is one of the most commonly recovered dinosaurs from this time interval in North America. The tail was stiffened by an extensively ossified tendon system — a feature found in many ornithopods that stabilised the tail as a counterbalance for bipedal locomotion and possibly aided in defence. The skull bears a keratinous beak and cheek teeth with multiple wear facets, indicating an efficient plant processing system. The famous association of Tenontosaurus with Deinonychus — documented by John Ostrom when he described both genera in the 1960s and 1970s — provided key evidence for Deinonychus\'s intelligence and possible pack-hunting behaviour, since multiple individuals seemed to attack a single large prey animal. While "pack hunting" in dromaeosaurs is now debated (the aggregations may represent opportunistic feeding rather than cooperative hunting), the predator-prey association remains one of the most vivid Early Cretaceous ecological stories in palaeontology.',
  kidsDescription: 'Tenontosaurus was a big plant-eater from Early Cretaceous North America — and DEINONYCHUS\'s favourite meal! Scientists have found Deinonychus teeth scattered among Tenontosaurus bones, proving these predators attacked these big herbivores. Its name means "Sinew Lizard" because its tail was stiffened with hard tendons. The ultimate prey animal!',
  childFriendlyText: 'Tenontosaurus was a 8-metre herbivore from Cretaceous North America, most famous for being hunted by Deinonychus — with shed predator teeth found right among its bones.',
  scientificSummary: 'Tenontosaurus tilletti (Ostrom, 1970) is an iguanodontian ornithopod from the Aptian–Albian Cloverly and Antlers formations (~115–108 Ma), western North America. Most abundant large herbivore from this interval. Tail ossified with extensive tendon network (stiffened). Associated Deinonychus teeth constitute direct evidence of predator-prey interaction. Skull with keratinous beak and multi-cusped cheek teeth. Bipedal/facultatively quadrupedal; medium-large body size (~8 m, ~1,000 kg).',
  discoveries: [
    { year: 1965, location: 'Cloverly Formation, Montana, USA', discoveredBy: 'John H. Ostrom', note: 'Ostrom described Tenontosaurus in 1970 from Cloverly material; the same expedition that yielded the now-famous Deinonychus specimens.' },
  ],
  funFact: 'The discovery of Tenontosaurus and Deinonychus together by John Ostrom in the 1960s helped spark the "dinosaur renaissance" — overturning the idea of dinosaurs as slow and cold-blooded, and showing they were active, social predators. These two dinosaurs changed how we think about all dinosaurs.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Tenontosauridae', genus: 'Tenontosaurus', species: 'T. tilletti' },
  relatedDinosaurs: [
    { id: 'deinonychus', relationship: 'Primary predator (documented by shed teeth)' },
    { id: 'iguanodon', relationship: 'Larger iguanodontian relative' },
    { id: 'camptosaurus', relationship: 'Earlier ornithopod relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Wheatland County, Montana (Cloverly Formation)', coordinates: [46.5, -109.4], specimenName: 'AMNH 3040 — holotype skeleton' },
    { country: 'USA', region: 'Carter County, Oklahoma (Antlers Formation)', coordinates: [34.5, -97.2], specimenName: 'Oklahoma referred specimens' },
  ],
  dangerLevel: 2, intelligence: 4,
}
