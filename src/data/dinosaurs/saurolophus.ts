import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Saurolophus: Dinosaur = {
  id: 'saurolophus', slug: 'saurolophus', displayName: 'Saurolophus', name: 'Saurolophus',
  pronunciation: 'sor-OH-loh-fus', nameMeaning: 'Lizard Crest', genusName: 'Saurolophus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['North America', 'Asia'], periodRangeMya: [72, 66],
  dimensions: { lengthMeters: 12.0, heightMeters: 3.5, weightKg: 3000, speedKmh: 22 },
  images: img('saurolophus'),
  facts: [
    { label: 'Range', value: 'Two continents', icon: 'anchor', description: 'Saurolophus is known from both North America and Asia — a remarkable distribution that reveals a land bridge connection between the two continents in the Late Cretaceous.' },
    { label: 'Crest', value: 'Solid bone spike', icon: 'layers', description: 'Unlike the hollow crests of lambeosaurines, Saurolophus had a solid bony spike projecting from the back of the skull — attached to a possible fleshy nasal sac for visual and acoustic display.' },
    { label: 'Herd', value: 'Social herds', icon: 'users', description: 'Evidence from multiple co-occurring specimens and trackways suggests Saurolophus lived in large herds, migrating across Late Cretaceous floodplains in groups of dozens or hundreds.' },
    { label: 'Teeth', value: 'Dental battery', icon: 'leaf', description: 'Hundreds of self-renewing grinding teeth in a continuously replacing battery allowed Saurolophus to efficiently process tough conifer needles, flowering plants, and woody vegetation.' },
  ],
  description: 'Saurolophus osborni was a large saurolophine hadrosaur from the very end of the Cretaceous, known from both North America and Asia — one of the few dinosaur genera confirmed to have lived on two continents. Its distinctive solid bony crest, projecting from the back of the skull, was likely connected to an inflatable fleshy nasal sac used for display and communication. At 12 metres, Saurolophus was a dominant herd herbivore of the latest Cretaceous, its migrating herds forming a key part of the ecosystem just before the end-Cretaceous extinction.',
  longDescription: 'Saurolophus osborni (Brown, 1912) is a saurolophine hadrosaurid from the Maastrichtian (~72–66 Ma) Horseshoe Canyon Formation of Alberta, Canada, and an Asian species, S. angustirostris, from the Nemegt Formation of Mongolia. This trans-Pacific distribution is exceptional among non-avian dinosaurs, supporting the existence of a Cretaceous land corridor (proto-Beringia) connecting North America and Asia via what is now Alaska and Siberia. The genus-defining crest is a solid bony spike formed from the frontals and nasals, projecting posterodorsally from the top of the skull. Unlike the hollow lambeosaurine crests (which directly resonated vocalisations), the Saurolophus spike may have supported an inflatable nasal sac of soft tissue, functioning in visual display and possibly in producing low-frequency sounds. The skull is long and low with a broadly expanded ducktail-shaped snout. The dental battery comprised hundreds of tightly packed diamond-shaped teeth in multiple replacement rows. The North American S. osborni is smaller (~11–12 m) while the Asian S. angustirostris was larger (~12–15 m). Bone beds in Alberta suggest migratory herding behaviour in large groups.',
  kidsDescription: 'Saurolophus was a big hadrosaur found on BOTH sides of the world — in Canada AND Mongolia! This proves there was a land bridge between North America and Asia at the end of the Cretaceous. Its solid bony crest may have inflated like a balloon for display! At 12 metres, this herd animal grazed in huge groups right up until the asteroid hit.',
  childFriendlyText: 'Saurolophus is one of the few dinosaurs found on TWO continents — North America and Asia. Its solid bony crest may have supported an inflatable display sac. A herd giant of the Late Cretaceous.',
  scientificSummary: 'Saurolophus osborni (Brown, 1912) is a saurolophine hadrosaurid from the Maastrichtian Horseshoe Canyon Formation (~72–66 Ma), Alberta; Asian species S. angustirostris from Nemegt Formation, Mongolia. Trans-Pacific distribution implies Cretaceous Beringian land connection. Crest: solid bony spike (frontoparietal), possibly supporting soft-tissue nasal sac for display. Long, low cranium with duck-shaped snout; dental battery. North American specimens ~12 m; Asian S. angustirostris ~15 m.',
  discoveries: [
    { year: 1911, location: 'Horseshoe Canyon Formation, Alberta, Canada', discoveredBy: 'Barnum Brown', note: 'S. osborni described by Brown in 1912 from Alberta material collected for the American Museum of Natural History.' },
    { year: 1952, location: 'Nemegt Formation, Ömnögovi Province, Mongolia', discoveredBy: 'Soviet-Mongolian expeditions', note: 'Asian species S. angustirostris described from Nemegt Formation; larger than North American species.' },
  ],
  funFact: 'Saurolophus is one of the very few dinosaurs whose Asian and North American species are so similar they may have been the same migratory population — crossing the proto-Bering land bridge between continents, exactly as prehistoric human ancestors would do millions of years later.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Saurolophinae', genus: 'Saurolophus', species: 'S. osborni' },
  relatedDinosaurs: [
    { id: 'parasaurolophus', relationship: 'Hadrosaur relative — convergent crest evolution' },
    { id: 'edmontosaurus', relationship: 'Close saurolophine relative' },
    { id: 'corythosaurus', relationship: 'Crested lambeosaurine hadrosaur' },
  ],
  fossilLocations: [
    { country: 'Canada', region: 'Alberta (Horseshoe Canyon Formation)', coordinates: [51.4, -113.5], specimenName: 'AMNH 5220 — holotype complete skull and skeleton' },
    { country: 'Mongolia', region: 'Ömnögovi Province (Nemegt Formation)', coordinates: [43.5, 100.5], specimenName: 'S. angustirostris — large Asian specimens' },
  ],
  dangerLevel: 2, intelligence: 5,
}
