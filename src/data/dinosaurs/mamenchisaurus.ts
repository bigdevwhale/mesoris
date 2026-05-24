import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Mamenchisaurus: Dinosaur = {
  id: 'mamenchisaurus', slug: 'mamenchisaurus', displayName: 'Mamenchisaurus', name: 'Mamenchisaurus',
  pronunciation: 'ma-MEN-chee-SOR-us', nameMeaning: 'Mamenxi Lizard', genusName: 'Mamenchisaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'forest',
  livedIn: ['Asia'], periodRangeMya: [162, 145],
  dimensions: { lengthMeters: 26.0, heightMeters: 7.0, weightKg: 30000, speedKmh: 12 },
  images: img('mamenchisaurus'),
  facts: [
    { label: 'Neck Record', value: 'Extremely long neck', icon: 'arrow-up', description: 'Some species of Mamenchisaurus had necks over 10 metres long, among the longest known in any dinosaur.' },
    { label: 'Vertebrae', value: 'Many neck bones', icon: 'ruler', description: 'It had an unusually high number of cervical vertebrae, extending feeding reach far beyond most sauropods.' },
    { label: 'Feeding', value: 'Wide browse range', icon: 'leaf', description: 'Its neck likely swept through broad arcs, allowing efficient feeding at multiple heights without moving much.' },
    { label: 'Region', value: 'Classic Chinese giant', icon: 'map-pin', description: 'Mamenchisaurus is one of the best-known giant dinosaurs from China\'s rich Late Jurassic fossil beds.' },
  ],
  description: 'Mamenchisaurus was a giant Chinese sauropod famous for its extraordinary neck length. It was a massive, slow-moving browser that dominated Jurassic floodplain ecosystems.',
  longDescription: 'Mamenchisaurus is a sauropod genus from the Late Jurassic of China, known from several species including M. constructus, M. hochuanensis, and M. sinocanadorum. Its defining feature is extreme cervical elongation produced by very long neck vertebrae and high cervical counts, resulting in neck proportions unparalleled in most other sauropods. Postcranial anatomy indicates a large-bodied, column-limbed herbivore adapted for high-volume plant processing and extensive feeding envelopes. Functional studies suggest the neck may have been held in variable postures, from subhorizontal sweeping to modest elevation, depending on species and context. Mamenchisaurus is central to understanding East Asian sauropod diversity and independent evolutionary experiments in gigantism and neck elongation.',
  kidsDescription: 'Mamenchisaurus had a neck so long it looked like a living crane! This giant plant-eater from China could munch leaves from far away without taking many steps.',
  childFriendlyText: 'Mamenchisaurus was a huge long-necked dinosaur from China. Its neck was one of the longest ever seen in dinosaurs!',
  scientificSummary: 'Mamenchisaurus (Young, 1954) is a mamenchisaurid/eusauropod-grade taxon from the Oxfordian–Tithonian of China (notably Sichuan). It is characterized by extreme cervical elongation, high cervical counts, pneumatic vertebrae, and large body size. The genus remains critical for interpreting sauropod neck biomechanics and Asian Jurassic sauropod phylogeny.',
  discoveries: [
    { year: 1952, location: 'Yibin area, Sichuan, China', discoveredBy: 'Field teams during road construction surveys', note: 'Initial remains recovered near Mamenxi Ferry, giving the genus its name.' },
    { year: 1954, location: 'Chinese Academy publication', discoveredBy: 'Yang Zhongjian (C.C. Young)', note: 'Formal description established Mamenchisaurus as a major Chinese sauropod genus.' },
  ],
  funFact: 'If you stood a very long-necked Mamenchisaurus beside a modern giraffe, its neck alone could be several giraffes long.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Mamenchisauridae', genus: 'Mamenchisaurus', species: 'M. constructus' },
  relatedDinosaurs: [
    { id: 'euhelopus', relationship: 'Asian long-necked sauropod often compared in neck evolution studies' },
    { id: 'diplodocus', relationship: 'Another extreme-neck sauropod with a different body plan' },
    { id: 'brachiosaurus', relationship: 'Large contemporary-type sauropod with taller forequarters' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Sichuan Province', coordinates: [29.2, 104.8], specimenName: 'Mamenxi/Yibin material' },
    { country: 'China', region: 'Chongqing area', coordinates: [29.56, 106.55], specimenName: 'M. hochuanensis specimens' },
  ],
  dangerLevel: 3, intelligence: 3,
}

