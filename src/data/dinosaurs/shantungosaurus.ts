import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Shantungosaurus: Dinosaur = {
  id: 'shantungosaurus', slug: 'shantungosaurus', displayName: 'Shantungosaurus', name: 'Shantungosaurus',
  pronunciation: 'shan-TUNG-oh-SOR-us', nameMeaning: 'Shandong Lizard', genusName: 'Shantungosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'swamp',
  livedIn: ['Asia'], periodRangeMya: [73, 66],
  dimensions: { lengthMeters: 16.0, heightMeters: 4.5, weightKg: 16000, speedKmh: 18 },
  images: img('shantungosaurus'),
  facts: [
    { label: 'Size', value: 'Largest hadrosaur ever', icon: 'maximize', description: 'Shantungosaurus is the largest known hadrosaur — and one of the largest bipedal animals that ever lived — with some specimens suggesting lengths up to 16 metres and masses up to 16,000 kg.' },
    { label: 'Asia', value: 'Asian giant', icon: 'trophy', description: 'Among the largest land animals from Cretaceous Asia, Shantungosaurus was the dominant megaherbivore of Late Cretaceous Shandong, competing with titanosaur sauropods for the title of largest animal.' },
    { label: 'Teeth', value: 'Dental battery', icon: 'layers', description: 'Like all hadrosaurs, Shantungosaurus had a remarkable "dental battery" — hundreds of tightly packed teeth working together as an efficient grinding surface for processing tough vegetation.' },
    { label: 'No crest', value: 'Flat head', icon: 'minus', description: 'Despite its enormous size, Shantungosaurus had no bony crest — it belonged to the saurolophine hadrosaurs, which had flat or slightly ridged skulls rather than the elaborate crests of lambeosaurines.' },
  ],
  description: 'Shantungosaurus giganteus was the largest known hadrosaur dinosaur and one of the largest bipedal animals in Earth\'s history, reaching 16 metres and an estimated 16,000 kg. Found in Shandong Province, China, it was a crestless saurolophine hadrosaur with a flat, broad skull and hundreds of grinding teeth in its remarkable dental battery. At the end of the Cretaceous, Shantungosaurus was the dominant megaherbivore of eastern Asia, its immense herds a defining feature of the Late Cretaceous Chinese landscape before the asteroid impact 66 million years ago.',
  longDescription: 'Shantungosaurus giganteus (Hu, 1973) is a saurolophine hadrosaurid from the Maastrichtian (~73–66 Ma) Wangshi Group of Shandong Province, China. The type specimen — a composite skeleton assembled from multiple individuals — was displayed at the Institute of Vertebrate Palaeontology in Beijing and became one of the most impressive mounted dinosaur skeletons in Asia. At approximately 16 metres and 16,000 kg, Shantungosaurus is the largest hadrosaur known and one of the largest non-sauropodan dinosaurs. The skull was large and elongated with no bony crest, consistent with saurolophine hadrosaur anatomy. The dental battery comprised hundreds of closely packed, diamond-shaped teeth arranged in vertical families — as teeth wore out on the grinding surface, new teeth moved up from below, providing a continuous, self-renewing wear surface. The hindlimbs were proportionally massive to support the enormous body weight. Despite being bipedal-dominant, Shantungosaurus likely moved quadrupedally much of the time when foraging. Shantungosaurus coexisted with Tsintaosaurus, Sinoceratops, and the tyrannosaurid Zhuchengtyrannus in the same Shandong ecosystem. The Zhucheng area of Shandong Province has produced so many Late Cretaceous dinosaur fossils that it is known informally as "Dinosaur City".',
  kidsDescription: 'Shantungosaurus was the BIGGEST duck-billed dinosaur ever — 16 metres long and 16 tonnes! One of the largest animals to ever walk on two legs! It had NO crest (flat head) but hundreds of teeth forming a dental battery that kept grinding through tough plants. This Chinese giant dominated Cretaceous Asia right up until the asteroid hit!',
  childFriendlyText: 'Shantungosaurus was the world\'s largest hadrosaur — 16 metres and 16 tonnes — with hundreds of grinding teeth in its dental battery, dominating Late Cretaceous China.',
  scientificSummary: 'Shantungosaurus giganteus (Hu, 1973) is a saurolophine hadrosaurid from the Maastrichtian Wangshi Group (~73–66 Ma), Shandong Province, China. Largest known hadrosaur and one of the largest bipedal dinosaurs (~16 m, ~16,000 kg). Skull elongated, crestless (saurolophine grade). Dental battery: hundreds of closely packed replacement teeth. Composite mounted skeleton in Beijing is one of Asia\'s most impressive dinosaur displays. Contemporaneous with Tsintaosaurus and tyrannosaurid Zhuchengtyrannus.',
  discoveries: [
    { year: 1964, location: 'Zhucheng, Shandong Province, China', discoveredBy: 'Hu Chengzhi and colleagues', note: 'Extensive excavations in Shandong from the 1960s yielded enormous quantities of hadrosaur material; Hu formally described Shantungosaurus giganteus in 1973.' },
  ],
  funFact: 'The Zhucheng region of Shandong where Shantungosaurus was found is so packed with dinosaur fossils that construction workers frequently unearth bones. One quarry produced an estimated 7,600 individual dinosaur bones — a mass mortality event of catastrophic proportions at the end of the Cretaceous.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Saurolophinae', genus: 'Shantungosaurus', species: 'S. giganteus' },
  relatedDinosaurs: [
    { id: 'edmontosaurus', relationship: 'Close saurolophine relative from North America' },
    { id: 'parasaurolophus', relationship: 'Hadrosaur relative' },
    { id: 'tarbosaurus', relationship: 'Asian contemporary predator' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Zhucheng, Shandong Province (Wangshi Group)', coordinates: [35.99, 119.4], specimenName: 'IVPP V2659 — holotype and composite mounted skeleton' },
  ],
  dangerLevel: 3, intelligence: 4,
}
