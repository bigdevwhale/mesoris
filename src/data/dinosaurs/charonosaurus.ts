import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Charonosaurus: Dinosaur = {
  id: 'charonosaurus', slug: 'charonosaurus', displayName: 'Charonosaurus', name: 'Charonosaurus',
  pronunciation: 'kah-RON-oh-SOR-us', nameMeaning: 'Charon\'s Lizard', genusName: 'Charonosaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'swamp',
  livedIn: ['Asia'], periodRangeMya: [70, 65],
  dimensions: { lengthMeters: 13.0, heightMeters: 3.5, weightKg: 4000, speedKmh: 20 },
  images: img('charonosaurus'),
  facts: [
    { label: 'Name', value: 'Charon the ferryman', icon: 'anchor', description: 'Named after Charon, the ferryman of the dead in Greek mythology, because the fossils were found near the Amur River — which forms the border between China and Russia, like a river dividing two worlds.' },
    { label: 'Crest', value: 'Parasaurolophus-like', icon: 'feather', description: 'Charonosaurus had a long, hollow backward-pointing crest nearly identical to that of Parasaurolophus — despite living on a different continent, showing remarkable convergent evolution.' },
    { label: 'Herd', value: 'Group behaviour', icon: 'users', description: 'Multiple individuals of Charonosaurus have been found together in the Amur River region, suggesting these were herd animals that migrated across the ancient landscapes of northeast China.' },
    { label: 'Sound', value: 'Resonant calls', icon: 'star', description: 'The hollow tube of the crest functioned like a trombone — amplifying and resonating calls produced by the nasal passages, creating deep, distinctive sounds for communication.' },
  ],
  description: 'Charonosaurus jiayinensis was a large lambeosaurine hadrosaur from the very end of the Cretaceous in northeastern China, named after Charon — the Greek mythological ferryman of the dead — because its fossils were found near the Amur River border between China and Russia. At 13 metres, it bore a long hollow backward-pointing crest remarkably similar to that of Parasaurolophus from North America, despite living on the other side of the world. The parallel evolution of this complex sound-producing structure on two separate continents is one of palaeontology\'s striking examples of convergent evolution.',
  longDescription: 'Charonosaurus jiayinensis (Godefroit et al., 2000) is a lambeosaurine hadrosaurid from the Maastrichtian (~70–65 Ma) Yuliangze Formation of Heilongjiang Province, northeastern China, found near the Jiayin district on the Amur River. Multiple individuals — including juveniles — are known, suggesting gregarious habits. The crest morphology parallels that of North American Parasaurolophus very closely: a long, tubular, hollow structure projecting posteriorly from the skull, formed from modified nasal bones. This crest functioned as a resonating chamber — air breathed through the nasal passages was routed through the crest tubes before reaching the lungs, amplifying and modifying the frequency of vocalisations. The nearly identical crests in Parasaurolophus (North America) and Charonosaurus (Asia) represent convergent evolution driven by the same selective pressure: effective long-range communication in herding animals. Phylogenetically, Charonosaurus is most closely allied to Parasaurolophus, suggesting an Asian origin for this lineage or dispersal across the Bering land connection. The Amur River region of China has produced numerous Late Cretaceous dinosaurs, making this one of the most productive late-age dinosaur sites in Asia.',
  kidsDescription: 'Charonosaurus was a huge Chinese hadrosaur named after Charon the mythological ferryman! It had a long hollow crest almost IDENTICAL to Parasaurolophus — even though they lived on opposite sides of the world! The crest worked like a trombone, making deep booming calls. Found near the Amur River where China meets Russia, this giant herd animal roamed right up to the end of the dinosaur age.',
  childFriendlyText: 'Charonosaurus was a 13-metre Chinese hadrosaur with a trombone-like hollow crest for deep booming calls — amazingly similar to Parasaurolophus from North America!',
  scientificSummary: 'Charonosaurus jiayinensis (Godefroit et al., 2000) is a lambeosaurine hadrosaurid from the Maastrichtian Yuliangze Formation (~70–65 Ma), Heilongjiang Province, China. 13 m length; tubular, posteriorly-projecting hollow nasal crest convergent with Parasaurolophus. Multiple individuals recovered; likely gregarious. Crest acoustic function confirmed by internal tube anatomy. Phylogenetically most closely related to Parasaurolophus; may indicate Asian origin for this hadrosaur clade.',
  discoveries: [
    { year: 2000, location: 'Jiayin, Heilongjiang Province, China', discoveredBy: 'Pascal Godefroit et al.', note: 'Described in 2000 by Godefroit and colleagues from material collected near the Amur River; named for mythological Charon due to the river border setting.' },
  ],
  funFact: 'Charonosaurus and Parasaurolophus evolved nearly identical hollow crests on opposite sides of the world — independently solving the same communication problem in the same way. It\'s as if two human civilisations on different continents both invented the same musical instrument, without ever meeting.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Hadrosauridae', subfamily: 'Lambeosaurinae', genus: 'Charonosaurus', species: 'C. jiayinensis' },
  relatedDinosaurs: [
    { id: 'parasaurolophus', relationship: 'Closest known relative — nearly identical crest' },
    { id: 'corythosaurus', relationship: 'Lambeosaurine hadrosaur relative' },
    { id: 'lambeosaurus', relationship: 'Lambeosaurine hadrosaur relative' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Jiayin District, Heilongjiang Province (Yuliangze Formation)', coordinates: [48.8, 130.4], specimenName: 'IVPP V12735 — holotype partial skull and skeleton' },
  ],
  dangerLevel: 2, intelligence: 5,
}
