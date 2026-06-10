import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Barosaurus: Dinosaur = {
  id: 'barosaurus', slug: 'barosaurus', displayName: 'Barosaurus', name: 'Barosaurus',
  pronunciation: 'BAH-roh-SOR-us', nameMeaning: 'Heavy Lizard', genusName: 'Barosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'plains',
  livedIn: ['North America', 'Africa'], periodRangeMya: [155, 145],
  dimensions: { lengthMeters: 25.0, heightMeters: 6.0, weightKg: 12000, speedKmh: 12 },
  images: img('barosaurus'),
  facts: [
    { label: 'Neck', value: 'Super long', icon: 'arrow-up', description: 'One of the longest necks of any animal — up to 9 metres — built from elongated cervical vertebrae.' },
    { label: 'Family', value: 'Diplodocid', icon: 'link', description: 'A diplodocid sauropod — the same family as Diplodocus and Apatosaurus.' },
    { label: 'Tail', value: 'Whip-like', icon: 'zap', description: 'A long, slender, whip-like tail that may have been used for defence and possibly even supersonic sound production.' },
    { label: 'Range', value: 'Two continents', icon: 'map-pin', description: 'Found in the Morrison Formation of North America and the Tendaguru Formation of Tanzania.' },
  ],
  description: 'Barosaurus was a long-necked diplodocid sauropod from Late Jurassic North America and Africa — a close cousin of Diplodocus with a neck that may have been 9 metres long, the longest in the animal kingdom.',
  longDescription: 'Barosaurus lentus (Marsh, 1890) is a diplodocid sauropod from the Late Jurassic (Kimmeridgian–Tithonian) Morrison Formation of the western United States, with closely related material from the Tendaguru Formation of Tanzania. Barosaurus is closely related to Diplodocus and Apatosaurus, but distinguished by its extraordinarily elongated cervical vertebrae — the neck could reach 9 metres in length. The whole animal was around 25 metres long and weighed up to 12 tonnes. Like other diplodocids, Barosaurus had a small skull with peg-like teeth restricted to the front of the jaws, a long whip-like tail, and columnar limbs. Its feeding strategy is debated: some researchers suggest high-browsing on tree canopies, while others argue for a low-sweeping posture similar to a vacuum cleaner. Recent biomechanical studies of its cervical vertebrae have shown that Barosaurus likely held its neck more vertically than once thought, giving it access to high vegetation. Tendaguru material (Barosaurus gracilis) shows that diplodocids were part of a global Late Jurassic fauna shared between North America and Gondwana.',
  kidsDescription: 'Barosaurus was a long-necked giant with a NINE-metre neck — longer than a bus! It was a cousin of Diplodocus that lived in North America and even in Africa. It used its long neck to reach leaves that other dinosaurs couldn\'t!',
  childFriendlyText: 'Barosaurus was a long-necked dinosaur with a 9-metre neck. It lived in North America and Africa and was a relative of Diplodocus.',
  scientificSummary: 'Barosaurus lentus (Marsh, 1890) is a diplodocid sauropod from the Kimmeridgian–Tithonian Morrison Formation, USA, with possible material from the Tendaguru Formation, Tanzania. ~25 m long; cervical vertebrae elongated to give a neck up to 9 m. Small skull, peg-like teeth, whip-like tail. Coeval with Diplodocus and Apatosaurus but distinguished by its extreme neck proportions.',
  discoveries: [
    { year: 1889, location: 'Como Bluff, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Partial skeleton found by Marsh\'s crews during the Bone Wars.' },
    { year: 1907, location: 'Tendaguru, Tanzania', discoveredBy: 'German Tendaguru Expedition', note: 'Diplodocid material from East Africa later referred to Barosaurus.' },
  ],
  funFact: 'A famous Barosaurus mount at the American Museum of Natural History shows the animal rearing up on its hind legs to defend itself against an Allosaurus — a pose that has become an icon of dinosaur illustrations!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Diplodocidae', genus: 'Barosaurus', species: 'B. lentus' },
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Close diplodocid relative' },
    { id: 'apatosaurus', relationship: 'Close diplodocid relative' },
    { id: 'brontosaurus', relationship: 'Diplodocid relative' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison Formation)', coordinates: [41.8, -106.0], specimenName: 'YPM 429 — holotype partial skeleton' },
    { country: 'Tanzania', region: 'Tendaguru Formation', coordinates: [-10.2, 39.4], specimenName: 'Tendaguru diplodocid material' },
  ],
  dangerLevel: 3, intelligence: 3,
}
