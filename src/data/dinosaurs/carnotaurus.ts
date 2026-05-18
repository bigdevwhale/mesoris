import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Carnotaurus: Dinosaur = {
    id: 'carnotaurus', slug: 'carnotaurus', displayName: 'Carnotaurus', name: 'Carnotaurus',
    pronunciation: 'KAR-no-TORE-us', nameMeaning: 'Meat-eating Bull', genusName: 'Carnotaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'plains',
    livedIn: ['South America'], periodRangeMya: [72, 69],
    dimensions: { lengthMeters: 8.0, heightMeters: 2.5, weightKg: 2000, speedKmh: 50 },
    images: img('carnotaurus'),
    facts: [
      { label: 'Horns', value: 'Bull-like', icon: 'triangle', description: 'Two thick horns above the eyes — unique among theropods, like a prehistoric bull.' },
      { label: 'Speed', value: '50 km/h', icon: 'zap', description: 'One of the fastest large predators ever — built like a cheetah.' },
      { label: 'Arms', value: 'Tiny vestigial', icon: 'minus', description: 'Even smaller than T. rex arms — essentially useless, with no claws.' },
      { label: 'Skin', value: 'Fossilized impressions', icon: 'layers', description: 'One of the few dinosaurs with preserved skin impressions — covered in pebbly scales.' },
    ],
    description: 'The bull-horned speed demon. Carnotaurus was a bizarre predator with two thick horns, tiny useless arms, and a body built for incredible speed. It looked like a demonic bull crossed with a cheetah.',
    longDescription: 'Carnotaurus was a large abelisaurid theropod from the Late Cretaceous of Argentina. It is one of the most distinctive predatory dinosaurs known, with its pair of thick, forward-facing horns above the eyes, an extremely deep skull, and remarkably reduced forelimbs — even smaller proportionally than those of Tyrannosaurus. Its long, powerful hindlimbs and streamlined body suggest it was one of the fastest large theropods, capable of chasing down prey across the open floodplains of ancient Patagonia.',
    kidsDescription: 'This dinosaur was like a bull with sharp teeth! It had two big horns on its head and could run super fast — as fast as a race car in a city. But its arms were SO tiny and silly — even tinier than T-Rex arms!',
    childFriendlyText: 'Carnotaurus had cool bull horns and could run really fast! Even though it looked scary, its arms were tiny and funny.',
    scientificSummary: 'Carnotaurus sastrei (Bonaparte, 1985) is a carnotaurine abelisaurid from the Maastrichtian La Colonia Formation, Argentina. Distinguished by hypertrophied frontal horns, an extremely kinetic skull with a mandibular hinge, and extreme forelimb reduction with an immobile elbow. Skin impressions reveal a non-overlapping tuberculate scale pattern. Its cursorial limb proportions — with the longest femur-to-tibia ratio of any large theropod — indicate exceptional speed capabilities.',
    discoveries: [{ year: 1984, location: 'Chubut, Argentina', discoveredBy: 'Jose Bonaparte', note: 'Single nearly complete skeleton with skin impressions — an incredibly rare find.' }],
    funFact: 'Carnotaurus is the only large theropod for which we have extensive skin impressions. Its skin was covered in small, pebbly scales that didn\'t overlap — unlike modern reptiles.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Abelisauridae', genus: 'Carnotaurus', species: 'C. sastrei' },
    relatedDinosaurs: [{ id: 'ceratosaurus', relationship: 'Relative' }, { id: 'tyrannosaurus-rex', relationship: 'Convergent role' }],
    fossilLocations: [{ country: 'Argentina', region: 'Chubut', coordinates: [-43.3, -65.1], specimenName: 'La Colonia Formation' }],
    dangerLevel: 8, intelligence: 5,
  }
