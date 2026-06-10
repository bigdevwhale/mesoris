import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Anchiornis: Dinosaur = {
  id: 'anchiornis', slug: 'anchiornis', displayName: 'Anchiornis', name: 'Anchiornis',
  pronunciation: 'AN-kee-OR-nis', nameMeaning: 'Near Bird', genusName: 'Anchiornis',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
  livedIn: ['China'], periodRangeMya: [161, 160],
  dimensions: { lengthMeters: 0.4, heightMeters: 0.18, weightKg: 0.2, speedKmh: 25 },
  images: img('anchiornis'),
  facts: [
    { label: 'Color', value: 'First known color', icon: 'award', description: 'The first Mesozoic dinosaur for which true colors were reconstructed — black and white wings with a rusty crown.' },
    { label: 'Wings', value: 'Four-winged', icon: 'feather', description: 'Long pennaceous feathers on both arms and legs — a four-winged body plan like Microraptor.' },
    { label: 'Size', value: 'Sparrow-sized', icon: 'ruler', description: 'Tiny — barely bigger than a sparrow, weighing only about 200 grams.' },
    { label: 'Glide', value: 'Wing-assisted', icon: 'wind', description: 'Could not fly strongly, but likely used its wings to glide and control its body as it jumped between branches.' },
  ],
  description: 'Anchiornis was a tiny four-winged paravian dinosaur from Jurassic China — the first Mesozoic dinosaur whose true colors were reconstructed. With black-and-white striped wings and a rusty crown, it looked like a Jurassic woodpecker.',
  longDescription: 'Anchiornis huxleyi (Xu, Zhao, Hu, Li, Wang, Guo, Zhang, Zhou & Xu, 2009) is a small troodontid-like paravian theropod from the Oxfordian (Late Jurassic) Tiaojishan Formation of Liaoning, China. It is known from hundreds of exceptionally preserved specimens, making it one of the best-represented small theropods in the fossil record. Anchiornis is famous as the first Mesozoic dinosaur for which melanosome geometry was used to reconstruct plumage coloration — the body was largely dark grey, the wings were boldly patterned with black and white bands, and a rusty-reddish crest of feathers adorned the head. These reconstructions have been repeatedly refined. Anatomically, Anchiornis had long pennaceous feathers on both the forelimbs and hindlimbs — a four-winged body plan similar to Microraptor — although the feather morphology was less aerodynamically specialised. Phylogenetically, Anchiornis sits near the base of Paraves, close to the origin of birds. The exquisite preservation in the Tiaojishan Formation allows scientists to study feather development, soft tissue anatomy, and even the chemical composition of fossilised pigments — making Anchiornis one of the most important dinosaurs for understanding the dinosaur-to-bird transition.',
  kidsDescription: 'Anchiornis was a tiny feathered dinosaur — about the size of a sparrow — and the FIRST dinosaur we know the real colours of! Scientists figured out it had black and white striped wings and a rusty red head, like a Jurassic woodpecker!',
  childFriendlyText: 'Anchiornis was a tiny dinosaur with black-and-white wings and a red crest. It was the first dinosaur whose real colours scientists could figure out!',
  scientificSummary: 'Anchiornis huxleyi (Xu et al., 2009) is a paravian theropod from the Oxfordian Tiaojishan Formation, Liaoning, China. Hundreds of specimens known. Diagnostic: long pennaceous feathers on forelimbs and hindlimbs; melanosome geometry reconstructable as black-and-white banded wings with a rusty crest — the first Mesozoic dinosaur with confidently reconstructed coloration. Phylogenetically near the base of Paraves, important for understanding the origin of birds and four-winged flight experiments.',
  discoveries: [
    { year: 2009, location: 'Tiaojishan Formation, Liaoning, China', discoveredBy: 'Xu Xing and team', note: 'Specimens initially named and recognised as small feathered paravians.' },
    { year: 2010, location: 'China', discoveredBy: 'Zhang Fucheng and team', note: 'First reconstruction of Anchiornis true coloration published in Nature.' },
  ],
  funFact: 'The first published "true colour" dinosaur was Anchiornis — and the result was so striking that the study made the cover of Nature in 2010. Since then, the technology has been used on dozens of other feathered dinosaurs!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Anchiornithidae', genus: 'Anchiornis', species: 'A. huxleyi' },
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Four-winged paravian cousin' },
    { id: 'archaeopteryx', relationship: 'Early avialan contemporary' },
    { id: 'troodon', relationship: 'Larger troodontid relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Tiaojishan Formation, Liaoning', coordinates: [41.6, 120.7], specimenName: 'IVPP V14378 — type material, hundreds of referred specimens' },
  ],
  dangerLevel: 2, intelligence: 6, birdRelation: 'Anchiornis is one of the closest non-avian relatives of birds, and its fossil feathers have provided the first direct evidence of Mesozoic dinosaur coloration.'
}
