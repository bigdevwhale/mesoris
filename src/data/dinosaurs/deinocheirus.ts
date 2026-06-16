import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Deinocheirus: Dinosaur = {
    id: 'deinocheirus', slug: 'deinocheirus', displayName: 'Deinocheirus', name: 'Deinocheirus',
    pronunciation: 'DINE-oh-KIRE-us', nameMeaning: 'Terrible Hands', genusName: 'Deinocheirus',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'large', habitat: 'swamp',
    livedIn: ['Mongolia'], periodRangeMya: [70, 69],
    dimensions: { lengthMeters: 11.0, heightMeters: 4.5, weightKg: 6500, speedKmh: 30 },
    images: img('deinocheirus'),
    facts: [
      { label: 'Arms', value: '2.4 m long', icon: 'sickle', description: 'Each arm was 2.4 meters long — longer than a tall person — ending in three huge, blunt claws.' },
      { label: 'Sail', value: 'Back hump', icon: 'triangle', description: 'Tall neural spines along its back formed a sail-like hump, possibly for display or fat storage.' },
      { label: 'Beak', value: 'Duck-like', icon: 'nut', description: 'A wide, toothless, duck-like bill for sweeping through water and clipping plants.' },
      { label: 'Diet', value: 'Omnivore', icon: 'utensils', description: 'Stomach contents show it ate plants, fish, and small animals — a true Cretaceous omnivore.' },
    ],
    description: 'The terrible hands. Deinocheirus was a giant, sail-backed, duck-billed ornithomimosaur famous for its enormous 2.4 m arms — the longest arms of any bipedal animal ever. A bizarre, slow-moving omnivore from the swamps of Cretaceous Mongolia.',
    longDescription: 'Deinocheirus mirificus is one of the most unusual large dinosaurs ever discovered. For nearly 50 years it was known only from a pair of massive 2.4-meter arms with enormous claws, found in the Gobi Desert in 1965. What could possibly belong to such a creature? The answer, when complete skeletons were finally unearthed in 2006 and 2013, was stranger than anyone expected: an 11-meter, 6.5-tonne ornithomimosaur with a duck-like bill, a tall sail-like hump on its back, wide hips, and an omnivorous diet confirmed by fossilized fish, gastroliths, and plant remains in its stomach. It is the largest known ornithomimosaur — a slow, swamp-dwelling giant of the Nemegt ecosystem.',
    kidsDescription: 'Deinocheirus means "TERRIBLE HANDS" — and they really were terrible! Each arm was LONGER than a tall grown-up, ending in huge claws. But the dinosaur was a gentle omnivore with a duck bill, a sail on its back, and a big round belly. The weirdest, most wonderful dino ever!',
    childFriendlyText: 'Deinocheirus was a giant dinosaur with arms longer than a person — that\'s why it\'s called "terrible hands"! It had a duck bill, a sail on its back, and ate everything.',
    scientificSummary: 'Deinocheirus mirificus (Osmólska & Roniewicz, 1970) is a large deinocheirid ornithomimosaur from the Maastrichtian Nemegt Formation of Mongolia. Reaching ~11 m in length and ~6.5 tonnes, it is the largest known ornithomimosaur and among the largest coelurosaurs. Diagnostic features include a transversely expanded, duck-like rhamphotheca, a hyperelongated rostrum, greatly enlarged neural spines forming a sail/hump, a pygostyle-like fused tail end, and extremely elongate forelimbs (~2.4 m) bearing three enormous recurved manual unguals. Stomach contents include fish vertebrae, gastroliths, and plant fragments, confirming an omnivorous diet. The postcranial pneumaticity and gastral basket suggest a semi-aquatic or shoreline foraging lifestyle.',
    discoveries: [
      { year: 1965, location: 'Gobi Desert, Mongolia', discoveredBy: 'Polish-Mongolian expedition (Zofia Kielan-Jaworowska)', note: 'First fossils found — only the giant arms and shoulder girdle. The body remained a mystery for nearly 50 years.' },
      { year: 2006, location: 'Altan Ula, Mongolia', discoveredBy: 'Korean-Mongolian expedition', note: 'A nearly complete specimen finally revealed the full body — it was totally unlike what anyone expected.' },
      { year: 2013, location: 'Nemegt Basin, Mongolia', discoveredBy: 'Belgian-Mongolian expedition', note: 'Additional specimen including a skull fragment and stomach contents confirming the omnivorous diet.' },
    ],
    funFact: 'For 50 years, scientists only had the giant arms of Deinocheirus. They thought it was a fearsome predator — but when the full body was finally found, it turned out to be a gentle, duck-billed omnivore with a sail on its back. The biggest plot twist in paleontology!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Deinocheiridae', genus: 'Deinocheirus', species: 'D. mirificus' },
    relatedDinosaurs: [
      { id: 'gallimimus', relationship: 'Ornithomimosaur cousin' },
      { id: 'ornithomimus', relationship: 'Ornithomimosaur relative' },
      { id: 'therizinosaurus', relationship: 'Coelurosaur relative' },
      { id: 'velociraptor', relationship: 'Distant theropod relative' },
    ],
    fossilLocations: [
      { country: 'Mongolia', region: 'Gobi Desert, Nemegt Basin', coordinates: [43.5, 101.0], specimenName: 'Nemegt Formation' },
    ],
    dangerLevel: 4, intelligence: 5,
  }
