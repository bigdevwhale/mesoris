import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Ornithomimus: Dinosaur = {
    id: 'ornithomimus', slug: 'ornithomimus', displayName: 'Ornithomimus', name: 'Ornithomimus',
    pronunciation: 'or-NITH-oh-MYE-muss', nameMeaning: 'Bird Mimic', genusName: 'Ornithomimus',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'medium', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [76, 66],
    dimensions: { lengthMeters: 4.0, heightMeters: 1.5, weightKg: 170, speedKmh: 65 },
    images: { ...img('ornithomimus'), video: '/videos/dinosaurs/ornithomimus/video.mp4' },
    facts: [
      { label: 'Speed', value: 'Up to 65 km/h', icon: 'zap', description: 'Among the fastest dinosaurs ever — the cheetah of the Cretaceous.' },
      { label: 'Feathers', value: 'Confirmed plumage', icon: 'feather', description: 'One of the first non-bird dinosaurs proven to have pennaceous feathers.' },
      { label: 'Name', value: '"Bird mimic"', icon: 'bird', description: 'Looks uncannily like a modern ostrich — same body shape, same lifestyle.' },
    ],
    description: 'The dinosaur that perfected the ostrich look — 65 million years before ostriches existed. Ornithomimus was a feathered speedster with a toothless beak, confirmed by direct fossil feather evidence.',
    longDescription: 'Ornithomimus is the namesake of the "ostrich-mimic" dinosaurs and one of the most important taxa for understanding dinosaur integument. Remarkably well-preserved specimens from Alberta preserve direct evidence of pennaceous feathers across the body and bare, scaly legs — the same pattern seen in modern ostriches. This demonstrates that feathered integument was not restricted to small or flying theropods but was present in large, ground-dwelling lineages as well. Its extremely elongated hindlimbs and light build made it one of the fastest dinosaurs.',
    kidsDescription: 'Ornithomimus was basically an OSTRICH with a long tail! It had fluffy feathers on its body, scaly legs, and a cute toothless beak. It was SUPER fast and ran across the plains gobbling up plants, bugs, and anything it could find!',
    childFriendlyText: 'Ornithomimus looked like a giant ostrich with a tail. It had fluffy feathers and could run really really fast!',
    scientificSummary: 'Ornithomimus edmontonicus (Sternberg, 1933) is an ornithomimid from the Maastrichtian of Alberta. Historically the first named ornithomimosaur. Exceptional specimens from the Horseshoe Canyon Formation preserve pennaceous feathers across the body and bare scaly hindlimbs — a distribution pattern identical to modern ratites and direct evidence for large-bodied theropod plumage. Longest tibiotarsus-to-femur ratio among ornithomimids indicates extreme cursorial specialization.',
    discoveries: [{ year: 1890, location: 'Colorado, USA', discoveredBy: 'Othniel Charles Marsh', note: 'First described during the Bone Wars.' }, { year: 2008, location: 'Alberta, Canada', discoveredBy: 'Francois Therrien', note: 'Feathered specimens discovered with preserved plumage.' }],
    funFact: 'The Ornithomimus feather discovery in 2008 was front-page news worldwide — it proved that big, ground-running dinosaurs also had feathers, not just tiny ones.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Ornithomimidae', genus: 'Ornithomimus', species: 'O. edmontonicus' },
    relatedDinosaurs: [{ id: 'gallimimus', relationship: 'Close relative' }, { id: 'struthiomimus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [51.5, -112.5], specimenName: 'Horseshoe Canyon Formation' }, { country: 'USA', region: 'Colorado', coordinates: [39.5, -105.0] }],
    dangerLevel: 1, intelligence: 5,
  }
