import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Parasaurolophus: Dinosaur = {
    id: 'parasaurolophus',
    slug: 'parasaurolophus',
    displayName: 'Parasaurolophus',
    name: 'Parasaurolophus',
    pronunciation: 'PAIR-ah-sore-ALL-oh-fuss',
    nameMeaning: 'Near Crested Lizard',
    genusName: 'Parasaurolophus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'large',
    habitat: 'forest',
    livedIn: ['North America'],
    periodRangeMya: [76, 73],
    dimensions: { lengthMeters: 10.0, heightMeters: 2.8, weightKg: 4000, speedKmh: 35 },
    images: img('parasaurolophus'),
    facts: [
      { label: 'Crest', value: '1.8 meters', icon: 'megaphone', description: 'A long, hollow tube crest — like a built-in musical instrument for making sounds.' },
      { label: 'Sound', value: 'Low frequencies', icon: 'music', description: 'Could produce distinctive low-frequency calls — each individual might have had a unique voice.' },
      { label: 'Social', value: 'Large herds', icon: 'users', description: 'Lived in large herds and was likely a highly social animal.' },
      { label: 'Teeth', value: 'Hundreds', icon: 'combine', description: 'Had hundreds of tightly packed teeth in a complex grinding battery.' },
    ],
    description: 'The dinosaur with the world\'s most incredible hairdo! Parasaurolophus had a spectacular hollow crest on its head — up to 1.8 meters long — that worked like a trombone to make sounds.',
    longDescription: 'Parasaurolophus was a hadrosaurid (duck-billed dinosaur) that lived during the Late Cretaceous. Its most extraordinary feature was the elongated hollow bony crest extending from the back of its skull. The crest contained complex nasal passages that looped through it, functioning as a resonance chamber. Scientists have created models and produced sounds — revealing deep, resonant calls.',
    kidsDescription: 'This dinosaur had the FUNNIEST head! A giant hollow tube sticking way out the back of its head, curved like a trombone. Scientists think it could blow air through it to make deep, fog-horn sounds!',
    childFriendlyText: 'Parasaurolophus had a long, hollow tube on its head like a musical instrument. It could make loud honking sounds to talk to its friends!',
    scientificSummary: 'Parasaurolophus walkeri (Parks, 1922) is a lambeosaurine hadrosaurid from the Campanian of Alberta. Distinguished by an elongate, posterodorsally-directed hollow cranial crest housing complex convoluted nasal passages. Computed tomography and acoustic modeling demonstrate the crest functions as a resonance chamber producing species-specific low-frequency vocalizations in the 30-60 Hz range.',
    discoveries: [
      { year: 1920, location: 'Alberta, Canada', discoveredBy: 'William Parks', note: 'First skull discovered.' },
      { year: 1999, location: 'New Mexico, USA', discoveredBy: 'Thomas Williamson', note: 'Very well-preserved skull.' },
    ],
    funFact: 'Scientists used CT scans to recreate the sound Parasaurolophus made — a deep, resonating bellow that could travel for miles.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Lambeosaurinae', genus: 'Parasaurolophus', species: 'P. walkeri' },
    relatedDinosaurs: [
      { id: 'corythosaurus', relationship: 'Relative' },
      { id: 'lambeosaurus', relationship: 'Close relative' },
    ],
    fossilLocations: [
      { country: 'Canada', region: 'Alberta', coordinates: [54.5, -113.0], specimenName: 'Dinosaur Park Formation' },
      { country: 'USA', region: 'New Mexico', coordinates: [36.0, -107.5] },
    ],
    dangerLevel: 3,
    intelligence: 5,
  }
