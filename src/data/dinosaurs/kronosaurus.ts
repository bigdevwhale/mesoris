import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Kronosaurus: Dinosaur = {
    id: 'kronosaurus', slug: 'kronosaurus', displayName: 'Kronosaurus', name: 'Kronosaurus',
    pronunciation: 'KROH-no-SORE-us', nameMeaning: 'Kronos Lizard', genusName: 'Kronosaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'marine-reptile', size: 'gigantic', habitat: 'ocean',
    livedIn: ['Australia', 'South America'], periodRangeMya: [125, 99],
    dimensions: { lengthMeters: 10.0, heightMeters: 1.5, weightKg: 11000, speedKmh: 30 },
    images: img('kronosaurus'),
    facts: [
      { label: 'Skull', value: '2.7 meters', icon: 'skull', description: 'One of the largest skulls of any marine reptile — 2.7 meters of bone and teeth.' },
      { label: 'Teeth', value: 'Banana-sized', icon: 'triangle', description: '12 cm conical teeth — each one larger than a tyrannosaur tooth.' },
      { label: 'Bite', value: 'Pliosaur power', icon: 'zap', description: 'A short-necked pliosaur with crushing bite force — ambushed prey with devastating strikes.' },
    ],
    description: 'Kronos lives. Named after the cannibal titan who devoured the Greek gods, Kronosaurus was a short-necked pliosaur with a 2.7-meter skull and banana-sized teeth — the ultimate ambush predator of Cretaceous Australia.',
    longDescription: 'Kronosaurus was among the largest pliosaurs — the short-necked, massive-skulled branch of the plesiosaur family. While its long-necked relatives like Elasmosaurus used stealth, Kronosaurus used brute force: a skull up to 2.7 meters long packed with enormous conical teeth up to 12 cm in length. It was an ambush predator, using short bursts of incredible acceleration powered by its four muscular flippers to close on prey before delivering a devastating bite. Named after the Greek Titan Kronos who devoured his own children, Kronosaurus was the apex predator of the Early Cretaceous Eromanga Sea, the inland ocean that covered much of Australia.',
    kidsDescription: 'Kronosaurus is named after a MONSTER from Greek mythology — Kronos, the titan who ATE HIS OWN KIDS! This sea monster had a head bigger than a car and teeth the size of bananas. It was a short-neck brute that smashed into its prey like a torpedo!',
    childFriendlyText: 'Kronosaurus had a head bigger than a car and teeth like giant bananas! It was an underwater monster that smashed into its prey.',
    scientificSummary: 'Kronosaurus queenslandicus (Longman, 1924) is a brachauchenine pliosaurid from the Albian Toolebuc Formation, Queensland, Australia. Among the largest pliosaurids with a mandible exceeding 2.7m, bearing hypertrophied caniniform teeth (crown height >12 cm). Pliosaurids represent the short-necked, macrophagous branch of Plesiosauria, characterized by hyper-elongate skulls with reinforced sutural contacts enabling high-bite-force predation. Kronosaurus was the apex predator of the Cretaceous Eromanga Sea, an epicontinental marine basin covering the eastern Australian craton.',
    discoveries: [{ year: 1899, location: 'Queensland, Australia', discoveredBy: 'Andrew Crombie', note: 'First partial jaw found in the Queensland outback.' }, { year: 1929, location: 'Queensland, Australia', discoveredBy: 'Albert Heber Longman', note: 'More complete specimen discovered near Hughenden.' }],
    funFact: 'The Harvard Museum has a mounted Kronosaurus skeleton measuring 12.8 meters — but it turns out they accidentally added too many vertebrae during reconstruction. The real Kronosaurus was still a terrifying 10 meters.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Sauropterygia', order: 'Plesiosauria', suborder: 'Pliosauroidea', family: 'Pliosauridae', genus: 'Kronosaurus', species: 'K. queenslandicus' },
    relatedDinosaurs: [{ id: 'elasmosaurus', relationship: 'Distantly related' }, { id: 'tylosaurus', relationship: 'Ecological rival (earlier)' }],
    fossilLocations: [{ country: 'Australia', region: 'Queensland', coordinates: [-20.5, 144.0], specimenName: 'Toolebuc Formation' }],
    dangerLevel: 10, intelligence: 4,
  }
