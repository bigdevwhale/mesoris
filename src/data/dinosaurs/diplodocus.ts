import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Diplodocus: Dinosaur = {
    id: 'diplodocus',
    slug: 'diplodocus',
    displayName: 'Diplodocus',
    name: 'Diplodocus',
    pronunciation: 'dip-LOD-oh-kuss',
    nameMeaning: 'Double Beam',
    genusName: 'Diplodocus',
    era: 'jurassic',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'gigantic',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [154, 150],
    dimensions: { lengthMeters: 27.0, heightMeters: 5.0, weightKg: 15000, speedKmh: 18 },
    images: img('diplodocus'),
    facts: [
      { label: 'Length', value: '27 meters', icon: 'ruler', description: 'One of the longest dinosaurs ever — nearly the length of a basketball court.' },
      { label: 'Tail', value: 'Whip-like', icon: 'whip', description: 'An extremely long, thin tail that could crack like a whip — possibly supersonic.' },
      { label: 'Teeth', value: 'Pencil-like', icon: 'pencil', description: 'Had long, slender teeth for stripping leaves from branches.' },
      { label: 'Nostrils', value: 'On top of head', icon: 'nose', description: 'A single nasal opening on top of its skull — scientists debated its purpose for decades.' },
    ],
    description: 'The longest of the long-necked dinosaurs. Diplodocus stretched nearly the length of a tennis court and whipped its tail faster than the speed of sound. A gentle giant of the Jurassic plains.',
    longDescription: 'Diplodocus was a sauropod dinosaur that lived in the Late Jurassic of North America. With a length of up to 27 meters, it was one of the longest dinosaurs known from complete skeletons. Its body was relatively lightweight for its size due to a network of air sacs in its bones — similar to modern birds. Diplodocus used its long, pencil-shaped teeth to strip leaves off branches, which it then swallowed whole.',
    kidsDescription: 'Diplodocus was looooooong — longer than a school bus with another school bus attached! Its neck was like a giant vacuum cleaner hose, reaching faraway trees for tasty leaves. And its tail could crack like a whip so fast it made a sonic BOOM!',
    childFriendlyText: 'Diplodocus had a super-long neck and an even longer tail! It could swing its tail so fast it made a big cracking sound.',
    scientificSummary: 'Diplodocus carnegii (Hatcher, 1901) is a diplodocid sauropod from the Kimmeridgian of the Morrison Formation. Characterized by an extraordinarily elongated cervical series, a whip-like caudal terminus potentially capable of supersonic motion, and a highly pneumatic axial skeleton housing an avian-like unidirectional airflow system. Its peg-like dentition is restricted to the anterior jaws, functioning as a branch-stripping mechanism.',
    discoveries: [
      { year: 1877, location: 'Colorado, USA', discoveredBy: 'Samuel Wendell Williston', note: 'First fossils found in Canon City.' },
      { year: 1899, location: 'Wyoming, USA', discoveredBy: 'AMNH expedition', note: 'Most complete skeleton at Sheep Creek.' },
    ],
    funFact: 'Diplodocus could crack its tail like a whip at over 1,200 km/h — faster than the speed of sound, creating a sonic boom.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Diplodocidae', genus: 'Diplodocus', species: 'D. carnegii' },
    relatedDinosaurs: [
      { id: 'apatosaurus', relationship: 'Close relative' },
      { id: 'allosaurus', relationship: 'Predator' },
      { id: 'brachiosaurus', relationship: 'Contemporary' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Wyoming', coordinates: [43.0, -107.5], specimenName: 'Morrison Formation' },
      { country: 'USA', region: 'Colorado', coordinates: [39.5, -105.0] },
    ],
    dangerLevel: 3,
    intelligence: 2,
  }
