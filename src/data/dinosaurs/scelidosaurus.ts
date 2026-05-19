import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Scelidosaurus: Dinosaur = {
  id: 'scelidosaurus', slug: 'scelidosaurus', displayName: 'Scelidosaurus', name: 'Scelidosaurus',
  pronunciation: 'ske-LY-doh-SOR-us', nameMeaning: 'Limb Lizard', genusName: 'Scelidosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'forest',
  livedIn: ['Europe'], periodRangeMya: [196, 183],
  dimensions: { lengthMeters: 4.0, heightMeters: 1.2, weightKg: 270, speedKmh: 12 },
  images: img('scelidosaurus'),
  facts: [
    { label: 'History', value: 'First complete UK skeleton', icon: 'star', description: 'Scelidosaurus provided the first complete dinosaur skeleton ever found in England, recovered from Dorset in the 1860s and described by the great Richard Owen.' },
    { label: 'Armour', value: 'Rows of scutes', icon: 'shield', description: 'Rows of bony scutes (osteoderms) ran along its back and flanks, providing passive armour against predators in Early Jurassic England.' },
    { label: 'Ancestry', value: 'Early thyreophoran', icon: 'layers', description: 'Scelidosaurus is one of the earliest members of Thyreophora — the armoured dinosaur lineage that would eventually produce Stegosaurus and Ankylosaurus.' },
    { label: 'Posture', value: 'Low browser', icon: 'leaf', description: 'Its low-slung body and small, leaf-shaped teeth made it an efficient browser of ground-level vegetation in Early Jurassic English forests.' },
  ],
  description: 'Scelidosaurus harrisonii was one of the earliest armoured dinosaurs, prowling the coastal forests of what is now Dorset, England, approximately 196 to 183 million years ago. It holds the distinction of yielding the first complete dinosaur skeleton ever found in England, described by the great Richard Owen in 1861. As an early thyreophoran, Scelidosaurus sat close to the common ancestor of both the plate-backed Stegosauridae and the heavily armoured Ankylosauria — making it a key animal for understanding the evolution of armoured dinosaurs.',
  longDescription: 'Scelidosaurus harrisonii (Owen, 1861) is a basal thyreophoran ornithischian from the Sinemurian–Pliensbachian (~196–183 Ma) Lower Lias of Charmouth, Dorset, England. The holotype was discovered by James Harrison around 1858 and represented the first complete articulated dinosaur skeleton known from the British Isles — a remarkable specimen that was critical to early understanding of dinosaur anatomy. Scelidosaurus was a low-slung, robust quadruped approximately 4 metres long, armoured with longitudinal rows of small bony scutes (osteoderms) embedded in the skin. The skull was relatively small with simple, leaf-shaped teeth suited for processing soft vegetation. Phylogenetically, Scelidosaurus is resolved as a basal thyreophoran, outside the Stegosauria+Ankylosauria clade but closely related to the common ancestor of both groups. This position makes it invaluable for reconstructing the anatomy of the first armoured dinosaurs before the lineage bifurcated into the plate-bearing stegosaurs and the heavily club-tailed ankylosaurs.',
  kidsDescription: 'Scelidosaurus was a TOUGH little armoured dinosaur from Early Jurassic England — and the first COMPLETE dinosaur skeleton ever found in Britain! It was covered in rows of bony armour plates along its back. The great scientist Richard Owen studied it, and it turns out to be the ancestor of BOTH Stegosaurus AND Ankylosaurus!',
  childFriendlyText: 'Scelidosaurus was an early armoured dinosaur from Dorset, England — the first complete dinosaur skeleton found in Britain, with rows of bony scutes for protection.',
  scientificSummary: 'Scelidosaurus harrisonii (Owen, 1861) is a basal thyreophoran ornithischian from the Sinemurian–Pliensbachian Lower Lias (~196–183 Ma), Charmouth, Dorset, England. First complete British dinosaur skeleton. Armoured with longitudinal osteoderms. Phylogenetically basal to Stegosauria + Ankylosauria, making it a key taxon for thyreophoran ancestral morphology. Quadrupedal with small leaf-shaped teeth indicating herbivory.',
  discoveries: [
    { year: 1858, location: 'Charmouth, Dorset, England', discoveredBy: 'James Harrison', note: 'Complete skeleton discovered; described by Richard Owen in 1861 in a landmark paper on early dinosaur anatomy.' },
  ],
  funFact: 'Richard Owen — the same scientist who coined the word "Dinosauria" in 1842 — was so impressed by the Scelidosaurus specimen that he described it in secret for years, keeping the remarkable complete skeleton from rival scientists while he prepared his description.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Thyreophora', family: 'Scelidosauridae', genus: 'Scelidosaurus', species: 'S. harrisonii' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Later thyreophoran descendant lineage' },
    { id: 'ankylosaurus', relationship: 'Later thyreophoran descendant lineage' },
    { id: 'euoplocephalus', relationship: 'Later ankylosaur relative' },
  ],
  fossilLocations: [
    { country: 'UK', region: 'Charmouth, Dorset, England (Lower Lias)', coordinates: [50.73, -2.9], specimenName: 'NHMUK PV R1111 — holotype nearly complete skeleton' },
  ],
  dangerLevel: 2, intelligence: 3,
}
