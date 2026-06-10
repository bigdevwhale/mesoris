import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Loricatosaurus: Dinosaur = {
  id: 'loricatosaurus', slug: 'loricatosaurus', displayName: 'Loricatosaurus', name: 'Loricatosaurus',
  pronunciation: 'lo-rih-KAT-oh-SOR-us', nameMeaning: 'Armoured Lizard', genusName: 'Loricatosaurus',
  era: 'jurassic', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'plains',
  livedIn: ['Europe', 'Africa'], periodRangeMya: [165, 161],
  dimensions: { lengthMeters: 5.0, heightMeters: 2.0, weightKg: 1000, speedKmh: 10 },
  images: img('loricatosaurus'),
  facts: [
    { label: 'Plates', value: 'Tall and narrow', icon: 'shield', description: 'Carried tall, narrow, pointed plates along the back and a thagomizer of spikes on the tail.' },
    { label: 'Range', value: 'Europe and Africa', icon: 'map-pin', description: 'One of the few stegosaurs known from both European and African fossil sites — showing a wide Jurassic distribution.' },
    { label: 'Reborn', value: 'Once Lexovisaurus', icon: 'rotate-cw', description: 'Originally described as a species of Lexovisaurus; later recognised as a distinct European genus.' },
    { label: 'Habitat', value: 'Coastal lowlands', icon: 'wave', description: 'Lived in coastal and floodplain environments of Middle Jurassic Europe and North Africa.' },
  ],
  description: 'Loricatosaurus was a medium-sized stegosaur from Middle Jurassic Europe and Africa — a plate-backed herbivore that helped show how widely stegosaurs spread across Laurasia and Gondwana in the Jurassic.',
  longDescription: 'Loricatosaurus priscus (Nopcsa, 1911) is a stegosaurid from the Callovian (Middle Jurassic) of England, France, and possibly North Africa. It was originally described as Lexovisaurus priscus by Franz Nopcsa, based on material from England — but later split as a distinct genus by Maidment and colleagues. The name "Loricatosaurus" was proposed by Maidment et al. (2008) and means "armoured lizard", referring to its osteoderm armour. Loricatosaurus reached about 5 metres in length, smaller than its famous cousin Stegosaurus, and had tall, narrow, pointed dorsal plates and a thagomizer of tail spikes. Loricatosaurus is significant for its biogeography: stegosaur remains from both Europe and North Africa suggest a wide Jurassic distribution that may have crossed the Tethys seaway when sea levels were lower. Stegosaurs may have had a single widespread Laurasian range before becoming restricted to Asia in the Cretaceous.',
  kidsDescription: 'Loricatosaurus was a medium-sized plate-backed dinosaur that lived in both ENGLAND and AFRICA back in the Jurassic! It had tall pointy plates on its back and spikes on its tail — like a smaller European cousin of Stegosaurus!',
  childFriendlyText: 'Loricatosaurus was a medium-sized stegosaur with tall plates on its back. It lived in Europe and Africa during the Middle Jurassic.',
  scientificSummary: 'Loricatosaurus priscus (Nopcsa, 1911; Maidment et al., 2008) is a stegosaurid from the Callovian (Middle Jurassic) of England, France, and possibly North Africa. ~5 m long. Originally described as Lexovisaurus priscus; reclassified as Loricatosaurus. Tall narrow dorsal plates and a thagomizer of tail spikes. Important for understanding stegosaur distribution across Laurasia and Gondwana.',
  discoveries: [
    { year: 1911, location: 'England and France', discoveredBy: 'Franz Nopcsa', note: 'Original material described as Lexovisaurus priscus.' },
    { year: 2008, location: 'United Kingdom and France', discoveredBy: 'Susannah Maidment and team', note: 'Re-erected as the distinct genus Loricatosaurus, with referral of African material.' },
  ],
  funFact: 'Loricatosaurus was re-named in 2008, more than 90 years after its original description! Scientists decided the European fossils were different enough from Lexovisaurus to deserve a new name, and "Loricatosaurus" — Latin for "armoured lizard" — was born!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Stegosauria', family: 'Stegosauridae', genus: 'Loricatosaurus', species: 'L. priscus' },
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Famous relative' },
    { id: 'kentrosaurus', relationship: 'African stegosaur cousin' },
    { id: 'dacentrurus', relationship: 'European stegosaur relative' },
  ],
  fossilLocations: [
    { country: 'United Kingdom', region: 'England', coordinates: [52.0, -1.0], specimenName: 'NHMUK holotype material' },
  ],
  dangerLevel: 4, intelligence: 3,
}
