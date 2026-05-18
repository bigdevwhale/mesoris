import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Mosasaurus: Dinosaur = {
    id: 'mosasaurus',
    slug: 'mosasaurus',
    displayName: 'Mosasaurus',
    name: 'Mosasaurus',
    pronunciation: 'MOH-zah-SORE-us',
    nameMeaning: 'Meuse River Lizard',
    genusName: 'Mosasaurus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'marine-reptile',
    size: 'gigantic',
    habitat: 'ocean',
    livedIn: ['Worldwide Oceans'],
    periodRangeMya: [82, 66],
    dimensions: { lengthMeters: 17.0, heightMeters: 2.0, weightKg: 15000, speedKmh: 48 },
    images: img('mosasaurus'),
    facts: [
      { label: 'Size', value: '17 meters', icon: 'maximize', description: 'Longer than a city bus — the largest marine reptile ever discovered.' },
      { label: 'Bite', value: 'Double-hinged jaw', icon: 'unfold-vertical', description: 'A jaw that could expand like a snake\'s to swallow huge prey whole.' },
      { label: 'Tail', value: 'Shark-like', icon: 'fish', description: 'A powerful shark-like tail fin that propelled it at incredible speed.' },
      { label: 'Teeth', value: 'Cone-shaped', icon: 'cone', description: 'Huge conical teeth, perfectly evolved to grip and crush slippery prey.' },
    ],
    description: 'The real sea monster. Mosasaurus was the apex predator of the Cretaceous oceans — a giant marine reptile longer than a city bus. It was at the absolute top of the food chain in prehistoric seas.',
    longDescription: 'Mosasaurus was a large mosasaur, a group of extinct marine reptiles that dominated the oceans during the Late Cretaceous. Despite being marine, it breathed air and gave birth to live young in the water. Mosasaurus had a streamlined body with powerful flippers and a shark-like tail that made it an exceptionally fast swimmer. Its double-hinged jaw and flexible skull allowed it to swallow prey much larger than its head.',
    kidsDescription: 'Now THIS is a real sea monster! Mosasaurus was as long as two buses parked bumper to bumper. It ruled the ancient oceans, eating anything it wanted — sharks, giant fish, even other sea monsters!',
    childFriendlyText: 'Mosasaurus was the biggest, scariest sea monster ever! It swam super-fast and could eat almost anything with its giant stretchy mouth.',
    scientificSummary: 'Mosasaurus hoffmannii (Mantell, 1829) is a mosasaurine mosasaurid from the Maastrichtian of the Maastricht Formation, Netherlands. The type genus of Mosasauridae and among the largest marine squamates. Exhibits a thunniform body plan with a hypocercal caudal fin, paddle-like tetrapodal flippers, and intramandibular hinge enabling macrophageous predation on large-bodied prey including sharks, plesiosaurs, and smaller mosasaurs.',
    discoveries: [
      { year: 1764, location: 'Netherlands', discoveredBy: 'Local quarry workers', note: 'First giant prehistoric reptile ever discovered — decades before anyone knew about dinosaurs.' },
      { year: 1998, location: 'Angola', discoveredBy: 'Project PaleoAngola', note: 'Major discoveries along the southern African coast.' },
    ],
    funFact: 'The first Mosasaurus fossil was found in 1764 — before the word "dinosaur" even existed. It was one of the earliest clues that prehistoric giant animals once roamed.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Mosasauria', order: 'Squamata', suborder: '', family: 'Mosasauridae', subfamily: 'Mosasaurinae', genus: 'Mosasaurus', species: 'M. hoffmannii' },
    relatedDinosaurs: [
      { id: 'tylosaurus', relationship: 'Close relative' },
      { id: 'plesiosaurus', relationship: 'Competitor' },
    ],
    fossilLocations: [
      { country: 'Netherlands', region: 'Maastricht', coordinates: [50.85, 5.69], specimenName: 'Maastricht Formation' },
      { country: 'Angola', region: 'Benguela Basin', coordinates: [-12.5, 13.5] },
      { country: 'USA', region: 'Kansas', coordinates: [38.5, -98.5] },
    ],
    dangerLevel: 10,
    intelligence: 6,
  }
