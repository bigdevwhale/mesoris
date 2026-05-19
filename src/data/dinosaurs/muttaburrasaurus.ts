import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Muttaburrasaurus: Dinosaur = {
  id: 'muttaburrasaurus', slug: 'muttaburrasaurus', displayName: 'Muttaburrasaurus', name: 'Muttaburrasaurus',
  pronunciation: 'MUT-ah-BUR-ah-SOR-us', nameMeaning: 'Muttaburra Lizard', genusName: 'Muttaburrasaurus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'large', habitat: 'plains',
  livedIn: ['Australia'], periodRangeMya: [112, 99],
  dimensions: { lengthMeters: 8.0, heightMeters: 2.5, weightKg: 2800, speedKmh: 22 },
  images: img('muttaburrasaurus'),
  facts: [
    { label: 'Crest', value: 'Hollow nasal crest', icon: 'feather', description: 'Muttaburrasaurus had a distinctive inflated, hollow crest over its snout, likely used for visual display or producing resonant calls — similar in function to Parasaurolophus\'s tube crest.' },
    { label: 'Australia', value: 'Australian icon', icon: 'star', description: 'One of the best-known Australian dinosaurs, Muttaburrasaurus has been found in Queensland and is so important it features on Australian postage stamps and education materials.' },
    { label: 'Teeth', value: 'Shearing teeth', icon: 'layers', description: 'Unlike most ornithopods, Muttaburrasaurus had shearing (scissor-like) teeth rather than grinding teeth, suggesting it may have eaten tough conifers or even some animal matter.' },
    { label: 'Isolation', value: 'Southern landmass', icon: 'anchor', description: 'Living in Early Cretaceous Australia when the continent was just beginning to separate from Antarctica, Muttaburrasaurus evolved in relative isolation — developing uniquely Australian characteristics.' },
  ],
  description: 'Muttaburrasaurus langdoni was a large, distinctive ornithopod from the Early Cretaceous of Australia, and one of the most recognisable Australian dinosaurs. Named after the Queensland town of Muttaburra where it was found, it grew to 8 metres and bore a unique inflated hollow crest over its snout — likely used for visual display or to amplify vocalisations. Its unusual shearing teeth differ from most ornithopods, suggesting a specialised diet. Muttaburrasaurus roamed a landscape that was still close to the South Pole, enduring cold, dark Cretaceous winters in high-latitude Australia.',
  longDescription: 'Muttaburrasaurus langdoni (Bartholomai & Molnar, 1981) is an ornithopod dinosaur from the Albian (~112–99 Ma) Mackunda Formation of Queensland, Australia. Australia in the Early Cretaceous lay at approximately 60–70°S latitude, meaning that Muttaburrasaurus would have experienced polar conditions including months of winter darkness — an unusual challenge for a large dinosaur. The most distinctive feature of the skull is a greatly inflated, hollow nasal region forming a prominent crest, analogous in function (if not in structure) to the crests of lambeosaurine hadrosaurs. The hollow nasal structure may have functioned in species recognition, sexual display, or low-frequency sound production. Dentition is unusual: instead of the battery of grinding cheek teeth typical of ornithopods, Muttaburrasaurus has sectorial (shearing) teeth suggesting a diet of tough conifers, cycads, or possibly invertebrates. Additional material attributed to the genus has been found in New South Wales. Phylogenetically, Muttaburrasaurus is placed as an iguanodontian ornithopod, though its precise position within the group is debated — it may represent a distinct Gondwanan lineage rather than a direct relative of Iguanodon.',
  kidsDescription: 'Muttaburrasaurus is one of AUSTRALIA\'s most famous dinosaurs! Named after the Queensland town where it was found, it had a cool hollow crest over its nose that it might have used to HONK at its friends! It lived near the South Pole and had to survive cold dark Cretaceous winters. A true Aussie dinosaur hero!',
  childFriendlyText: 'Muttaburrasaurus was Australia\'s famous 8-metre ornithopod with a hollow nasal crest, living near the South Pole in the cold Early Cretaceous forests of Queensland.',
  scientificSummary: 'Muttaburrasaurus langdoni (Bartholomai & Molnar, 1981) is an iguanodontian ornithopod from the Albian Mackunda Formation (~112–99 Ma), Queensland, Australia. Notable for inflated, hollow nasal crest (possible thermoregulatory, display, or acoustic function) and sectorial dentition (distinct from typical ornithopod grinding batteries). Palaeolatitude ~60–70°S implies polar ecology. Phylogenetic position within Iguanodontia is debated; possibly a distinct Gondwanan clade.',
  discoveries: [
    { year: 1963, location: 'Muttaburra, Queensland, Australia', discoveredBy: 'Doug Langdon', note: 'Nearly complete skeleton found by grazier Doug Langdon in 1963 on his property; formally described by Bartholomai and Molnar in 1981.' },
    { year: 1987, location: 'Lightning Ridge, New South Wales, Australia', discoveredBy: 'Paleontological team', note: 'Second specimen found at Lightning Ridge in opal-bearing sediment, providing additional anatomical data.' },
  ],
  funFact: 'Muttaburrasaurus lived so far south — near the South Pole — that it would have experienced months of complete darkness every winter. These dinosaurs evolved to cope with conditions that most large reptiles couldn\'t tolerate, showing just how adaptable dinosaurs were.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ornithopoda', family: 'Muttaburrasauridae', genus: 'Muttaburrasaurus', species: 'M. langdoni' },
  relatedDinosaurs: [
    { id: 'iguanodon', relationship: 'Close iguanodontian ornithopod relative' },
    { id: 'camptosaurus', relationship: 'Earlier ornithopod relative' },
  ],
  fossilLocations: [
    { country: 'Australia', region: 'Muttaburra, Barcaldine Region, Queensland (Mackunda Formation)', coordinates: [-22.6, 144.5], specimenName: 'QM F6140 — holotype near-complete skeleton' },
    { country: 'Australia', region: 'Lightning Ridge, New South Wales', coordinates: [-29.4, 147.98], specimenName: 'Partial skull and postcranial material' },
  ],
  dangerLevel: 2, intelligence: 4,
}
