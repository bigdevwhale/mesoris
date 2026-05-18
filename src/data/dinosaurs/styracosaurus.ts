import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Styracosaurus: Dinosaur = {
    id: 'styracosaurus', slug: 'styracosaurus', displayName: 'Styracosaurus', name: 'Styracosaurus',
    pronunciation: 'sty-RAK-oh-SORE-us', nameMeaning: 'Spiked Lizard', genusName: 'Styracosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
    livedIn: ['North America'], periodRangeMya: [76, 74],
    dimensions: { lengthMeters: 5.5, heightMeters: 1.8, weightKg: 2700, speedKmh: 32 },
    images: img('styracosaurus'),
    facts: [
      { label: 'Spikes', value: '6 giant spikes', icon: 'swords', description: 'Six massive spikes radiating from the frill — the most spectacular display of any ceratopsian.' },
      { label: 'Nose Horn', value: 'Up to 60 cm', icon: 'triangle', description: 'A single massive horn on the nose — longer and thicker than Triceratops\'.' },
      { label: 'Frill Openings', value: 'Fenestrae', icon: 'circle', description: 'Large holes (fenestrae) in the frill made it lighter while maintaining its intimidating silhouette.' },
    ],
    description: 'The most spectacularly ornamented horned dinosaur. Styracosaurus had six massive spikes radiating from its frill and a giant nose horn — looking like a demonic crown of thorns.',
    longDescription: 'Styracosaurus was a centrosaurine ceratopsid known for having the most extravagant cranial ornamentation of any dinosaur. Its frill bore six enormous spikes — some reaching 60 cm — that radiated outward like a crown. Combined with a massive nasal horn and smaller cheek horns, Styracosaurus was visually overwhelming. Unlike Triceratops\' solid frill, Styracosaurus had large openings (fenestrae), creating a lighter but dramatically spike-studded silhouette. This extreme ornamentation likely served primarily for species recognition and sexual display rather than defense.',
    kidsDescription: 'Styracosaurus was the SPIKIEST dinosaur ever! Instead of three horns like Triceratops, it had a whole CROWN of giant spikes around its head. It looked like it was wearing a spiky metal crown — the punk rock king of dinosaurs!',
    childFriendlyText: 'Styracosaurus had a crown of giant spikes around its head — it was the spikiest, most awesome-looking horned dinosaur ever!',
    scientificSummary: 'Styracosaurus albertensis (Lambe, 1913) is a centrosaurine ceratopsid from the Campanian Dinosaur Park Formation, Alberta. Distinguished by extreme development of the parietosquamosal frill ornamentation, bearing 4-6 hypertrophied epiparietal spikes (up to 60 cm) along with smaller episquamosal processes. The robust nasal horn core, fenestrated frill architecture, and diagnostic spike arrangement distinguish it from all other ceratopsids. Cranial ontogeny demonstrates progressive spike elongation and frill fenestra expansion throughout growth.',
    discoveries: [{ year: 1913, location: 'Alberta, Canada', discoveredBy: 'Charles M. Sternberg', note: 'First skull discovered.' }],
    funFact: 'The name Styracosaurus comes from the Greek "styrax" meaning "spike at the butt end of a spear shaft" — the most badass dinosaur etymology ever.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Ceratopsidae', subfamily: 'Centrosaurinae', genus: 'Styracosaurus', species: 'S. albertensis' },
    relatedDinosaurs: [{ id: 'triceratops', relationship: 'Relative' }, { id: 'pachyrhinosaurus', relationship: 'Close relative' }],
    fossilLocations: [{ country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5], specimenName: 'Dinosaur Park Formation' }],
    dangerLevel: 6, intelligence: 4,
  }
