import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Elasmosaurus: Dinosaur = {
    id: 'elasmosaurus', slug: 'elasmosaurus', displayName: 'Elasmosaurus', name: 'Elasmosaurus',
    pronunciation: 'eh-LAZ-moh-SORE-us', nameMeaning: 'Thin-plate Lizard', genusName: 'Elasmosaurus',
    era: 'cretaceous', diet: 'carnivore', category: 'marine-reptile', size: 'large', habitat: 'ocean',
    livedIn: ['North America'], periodRangeMya: [80, 80],
    dimensions: { lengthMeters: 14.0, heightMeters: 1.5, weightKg: 2000, speedKmh: 25 },
    images: { ...img('elasmosaurus'), video: '/videos/dinosaurs/elasmosaurus/video.mp4' },
    facts: [
      { label: 'Neck', value: 'Half its body', icon: 'ruler', description: 'Its neck was 7 meters — half its total length — with an incredible 72 vertebrae.' },
      { label: 'Head', value: 'Tiny', icon: 'minus', description: 'Had a surprisingly tiny head at the end of its enormous neck — like a snake.' },
      { label: 'Error', value: 'Head-on-wrong-end', icon: 'help-circle', description: 'First mounted with the head on the WRONG END — a famous paleontology blunder.' },
    ],
    description: 'The sea serpent so confusing that scientists put its head on its tail. Elasmosaurus had the most extreme neck in the animal kingdom — 7 meters long, half its entire body length, with a record-smashing 72 vertebrae.',
    longDescription: 'Elasmosaurus holds the record for the most extreme neck elongation in any known animal, with 72 cervical vertebrae (by comparison, most mammals have 7 neck vertebrae, period). Its 7-meter neck comprised more than half of its 14-meter total body length. The famous 1868 reconstruction by Edward Drinker Cope attached the skull to the tail, sparking the "Bone Wars" feud when Othniel Charles Marsh publicly humiliated Cope by pointing out the error. Elasmosaurus likely swam near the surface, using its impossibly long neck to ambush schools of fish and squid before its large body could be detected.',
    kidsDescription: 'Elasmosaurus was the SNAKE-NECK sea monster! Its neck was SO long — longer than a giraffe\'s, half its whole body. A famous scientist once put its head on the WRONG END by mistake! It used its super-long neck to sneak up on fish — by the time the fish saw the body, CHOMP!',
    childFriendlyText: 'Elasmosaurus had the longest neck of any creature ever — longer than a giraffe! It lived in the ocean and snuck up on fish with its sneaky long neck.',
    scientificSummary: 'Elasmosaurus platyurus (Cope, 1868) is a basal elasmosaurid plesiosaur from the Campanian Pierre Shale, Kansas. Exhibits the most extreme cervical hyperelongation in Tetrapoda: 72 cervical vertebrae comprising approximately 50% of total body length (7m of 14m). The neck supported a proportionally tiny skull with interlocking procumbent teeth for fish capture. Historically notable: Cope\'s erroneous cranial-caudal reconstruction sparked the Marsh-Cope "Bone Wars." Hydrodynamic models suggest the neck functioned as a stealth ambush mechanism, allowing the small head to reach prey schools before the body\'s hydrodynamic wake could alert the prey.',
    discoveries: [{ year: 1867, location: 'Kansas, USA', discoveredBy: 'Theophilus Turner', note: 'Discovered from the Western Interior Seaway chalk deposits.' }],
    funFact: 'The "head on the wrong end" blunder by Cope is one of the most legendary mistakes in science. Marsh used it to humiliate his rival so thoroughly that the embarrassment partly drove the "Bone Wars" — the most vicious, destructive rivalry in scientific history.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Sauropterygia', order: 'Plesiosauria', suborder: '', family: 'Elasmosauridae', genus: 'Elasmosaurus', species: 'E. platyurus' },
    relatedDinosaurs: [{ id: 'plesiosaurus', relationship: 'Ancestor' }],
    fossilLocations: [{ country: 'USA', region: 'Kansas', coordinates: [38.5, -100.5], specimenName: 'Pierre Shale' }],
    dangerLevel: 6, intelligence: 4,
  }
