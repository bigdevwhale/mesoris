import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Nanotyrannus: Dinosaur = {
    id: 'nanotyrannus', slug: 'nanotyrannus', displayName: 'Nanotyrannus', name: 'Nanotyrannus',
    pronunciation: 'NAN-oh-tih-RAN-us', nameMeaning: 'Dwarf Tyrant', genusName: 'Nanotyrannus',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [68, 67],
    dimensions: { lengthMeters: 5.0, heightMeters: 2.0, weightKg: 1000, speedKmh: 40 },
    images: { ...img('nanotyrannus'), video: '/videos/dinosaurs/nanotyrannus/video.mp4' },
    facts: [
      { label: 'Size', value: 'Pocket T-Rex', icon: 'ruler', description: 'At ~5 m long it was only a fraction of T. rex — but with the same terrifying proportions.' },
      { label: 'Controversy', value: 'Juvenile T. rex?', icon: 'help-circle', description: 'Some scientists think "Nanotyrannus" is actually a teenage Tyrannosaurus rex, not a separate genus.' },
      { label: 'Bite', value: 'Bone-crushing', icon: 'hammer', description: 'Despite its small size, it packed the powerful, bone-piercing bite of a tyrannosaurid.' },
      { label: 'Speed', value: '40+ km/h', icon: 'zap', description: 'Long, slim legs made it a fast, agile predator — quicker than its giant cousin T. rex.' },
    ],
    description: 'The dwarf tyrant. Nanotyrannus was a small, swift tyrannosaurid that may have been its own species — or simply a teenage Tyrannosaurus rex. Either way, it was a fast, sharp-toothed predator of the Late Cretaceous.',
    longDescription: 'Nanotyrannus lancensis is a small-bodied tyrannosaurid from the late Maastrichtian of North America, around 68-67 million years ago. Known primarily from the famous "Dueling Dinosaurs" specimen and the original Cleveland Museum skull, it combined classic tyrannosaurid features — robust skull, D-shaped premaxillary teeth, powerful bite — with a much smaller, more lightly built body. Whether it represents a distinct genus or simply an early ontogenetic stage of Tyrannosaurus rex remains one of paleontology\'s most heated debates, with histological analyses in recent years offering compelling evidence for and against both interpretations. Regardless, it was an agile, fast-running predator that occupied a different ecological niche from the giant adults of its time.',
    kidsDescription: 'Nanotyrannus is the DINOSAUR MYSTERY! Some scientists say it was its own small, speedy T-Rex cousin. Others say it was just a teenager T-Rex — like a kid version of the king! Either way, it had sharp teeth and could run really fast!',
    childFriendlyText: 'Nanotyrannus was a small, fast T-Rex cousin from the late Cretaceous. Scientists are still arguing about whether it was its own species or just a young T-Rex!',
    scientificSummary: 'Nanotyrannus lancensis (Gilmore, 1946; Bakker, Williams & Currie, 1988) is a small-bodied tyrannosaurid from the upper Maastrichtian Hell Creek Formation of Montana and the Lance Formation of Wyoming. Diagnosed by a long, gracile skull, incrassate premaxillary teeth with a D-shaped cross-section, and proportionally long distal hindlimb elements consistent with cursoriality. Its taxonomic validity is contested: recent histological analyses of the "Dueling Dinosaurs" specimen (2020) argue for distinct genus status, while other workers regard the holotype as a juvenile Tyrannosaurus rex. Phylogenetic analyses variably place it as a derived tyrannosaurine or as an ontomorph of T. rex.',
    discoveries: [
      { year: 1942, location: 'Carter County, Montana, USA', discoveredBy: 'Cleveland Museum expedition', note: 'First skull discovered in the Hell Creek Formation, originally thought to be a Gorgosaurus-like taxon.' },
      { year: 1988, location: 'Montana, USA', discoveredBy: 'Robert Bakker, Philip Currie & Michael Williams', note: 'Renamed Nanotyrannus after reanalysis of the Cleveland Museum skull.' },
      { year: 2006, location: 'Montana, USA', discoveredBy: 'Commercial fossil hunters', note: 'The famous "Dueling Dinosaurs" specimen, locked in combat with a Triceratops.' },
    ],
    funFact: 'The "Dueling Dinosaurs" fossil — a Nanotyrannus locked in combat with a Triceratops — was hidden in a basement for over a decade before finally going on display, and may hold the key to whether Nanotyrannus is really its own species.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Tyrannosauridae', subfamily: 'Tyrannosaurinae', genus: 'Nanotyrannus', species: 'N. lancensis' },
    relatedDinosaurs: [
      { id: 'tyrannosaurus-rex', relationship: 'Contested synonym / close relative' },
      { id: 'albertosaurus', relationship: 'Tyrannosaurid cousin' },
      { id: 'daspletosaurus', relationship: 'Tyrannosaurid cousin' },
      { id: 'gorgosaurus', relationship: 'Tyrannosaurid cousin' },
      { id: 'triceratops', relationship: 'Possible prey' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Montana', coordinates: [47.5, -106.5], specimenName: 'Hell Creek Formation' },
      { country: 'USA', region: 'Wyoming', coordinates: [43.9, -104.5], specimenName: 'Lance Formation' },
    ],
    dangerLevel: 8, intelligence: 6,
  }
