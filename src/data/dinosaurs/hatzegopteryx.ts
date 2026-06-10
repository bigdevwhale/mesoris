import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Hatzegopteryx: Dinosaur = {
  id: 'hatzegopteryx', slug: 'hatzegopteryx', displayName: 'Hatzegopteryx', name: 'Hatzegopteryx',
  pronunciation: 'HAT-zeh-GOP-ter-iks', nameMeaning: 'Hațeg Wing', genusName: 'Hatzegopteryx',
  era: 'cretaceous', diet: 'carnivore', category: 'flying-reptile', size: 'gigantic', habitat: 'coastal',
  livedIn: ['Europe'], periodRangeMya: [66, 66],
  dimensions: { lengthMeters: 10.0, heightMeters: 4.5, weightKg: 250, speedKmh: 60 },
  images: img('hatzegopteryx'),
  facts: [
    { label: 'Wingspan', value: '10–12 m', icon: 'plane', description: 'An estimated wingspan of 10–12 metres — possibly the largest pterosaur of all.' },
    { label: 'Skull', value: 'Sturdy and wide', icon: 'shield', description: 'A massive, robust skull 2.5–3 metres long — built with internal spongy struts to handle impact stress.' },
    { label: 'Neck', value: 'Compact', icon: 'link', description: 'A relatively short, massively built neck for an azhdarchid — adapted for tackling large prey.' },
    { label: 'Ecology', value: 'Apex of Hațeg Island', icon: 'crown', description: 'The apex predator of Hațeg Island (Romania) — hunting dinosaurs that lived alongside it, including small titanosaurs.' },
  ],
  description: 'Hatzegopteryx was a giant azhdarchid pterosaur and the apex predator of the Hațeg Island ecosystem in Late Cretaceous Romania. With a 2.5-metre sturdy skull, it hunted small dinosaurs — making it one of the few flying reptiles to dominate a terrestrial ecosystem.',
  longDescription: 'Hatzegopteryx thambema (Buffetaut, Grigorescu & Csiki, 2002) is an azhdarchid pterosaur from the Maastrichtian Densuș-Ciula Formation of the Hațeg Basin, Transylvania, Romania. It is known from fragmentary but highly diagnostic material including parts of the skull, the left humerus, and other postcranial elements. Hatzegopteryx is estimated to have had a wingspan of 10–12 metres — possibly making it the largest pterosaur ever, comparable to or slightly exceeding Quetzalcoatlus. Its skull was enormous — up to 2.5–3 metres long — and unusually wide and robust for an azhdarchid, with a unique internal structure of trabecular bone spongiosa that gave the skull both strength and lightness. The neck was relatively short and thick by azhdarchid standards, and the long bones of the wing show a similar spongy internal architecture — interpreted as a solution to the mechanical stresses of launching and flying at huge size. Crucially, the Hațeg Basin was an island in the Late Cretaceous, and Hatzegopteryx appears to have been the apex predator of that island — an unusual role for a pterosaur, made possible by the absence of large theropod dinosaurs. Hatzegopteryx likely preyed on the small dwarf titanosaurs (such as Magyarosaurus) and other small dinosaurs of Hațeg Island, stalking them like a giant ground-stalking heron.',
  kidsDescription: 'Hatzegopteryx was a HUGE pterosaur that lived on an island in Romania — and it was the TOP PREDATOR of that island! It had a 2.5-metre skull and probably hunted baby dinosaurs. A flying reptile that was the king of its island!',
  childFriendlyText: 'Hatzegopteryx was a giant flying reptile with a 2.5-metre skull. It was the top predator of the island where it lived and ate small dinosaurs!',
  scientificSummary: 'Hatzegopteryx thambema (Buffetaut et al., 2002) is an azhdarchid pterosaur from the Maastrichtian Densuș-Ciula Formation, Hațeg Basin, Romania. Wingspan estimated 10–12 m; skull up to 2.5–3 m. Unique trabecular internal bone structure gives the skull and wing bones unusual strength. The apex predator of Late Cretaceous Hațeg Island, where it preyed on dwarf dinosaurs such as the titanosaur Magyarosaurus.',
  discoveries: [
    { year: 2002, location: 'Hațeg Basin, Transylvania, Romania', discoveredBy: 'Dan Grigorescu and team', note: 'Skull fragments, humerus, and other material first described and named.' },
  ],
  funFact: 'Hatzegopteryx is the only known pterosaur that we can confidently call a predator of other dinosaurs. On its island, where most large predators were missing, this flying reptile took over the top of the food chain!',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Azhdarchidae', genus: 'Hatzegopteryx', species: 'H. thambema' },
  relatedDinosaurs: [
    { id: 'quetzalcoatlus', relationship: 'Giant azhdarchid relative' },
    { id: 'thanatosdrakon', relationship: 'Giant azhdarchid relative' },
    { id: 'pteranodon', relationship: 'Smaller pterosaur relative' },
  ],
  fossilLocations: [
    { country: 'Romania', region: 'Densuș-Ciula Formation, Hațeg Basin, Transylvania', coordinates: [45.6, 22.95], specimenName: 'BMNH R 3517 / holotype fragmentary material' },
  ],
  dangerLevel: 9, intelligence: 5,
}
