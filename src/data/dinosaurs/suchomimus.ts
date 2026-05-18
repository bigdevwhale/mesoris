import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Suchomimus: Dinosaur = {
    id: 'suchomimus',
    slug: 'suchomimus',
    displayName: 'Suchomimus',
    name: 'Suchomimus',
    pronunciation: 'SOO-ko-MY-mus',
    nameMeaning: 'Crocodile Mimic',
    genusName: 'Suchomimus',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'large',
    habitat: 'coastal',
    livedIn: ['Africa'],
    periodRangeMya: [125, 112],
    dimensions: { lengthMeters: 11.0, heightMeters: 3.4, weightKg: 3800, speedKmh: 28 },
    images: img('suchomimus'),
    facts: [
      { label: 'Snout', value: 'Crocodile-like jaws', icon: 'fish', description: 'Its long narrow snout was packed with conical teeth ideal for catching slippery prey.' },
      { label: 'Claw', value: 'Huge thumb claw', icon: 'hand', description: 'Each hand carried an enlarged thumb claw that could hook prey or defend against attackers.' },
      { label: 'Diet', value: 'Mostly fish-eater', icon: 'anchor', description: 'Like modern gharials and crocodiles, it probably specialized in river prey but could eat meat of many kinds.' },
      { label: 'Back', value: 'Low spine ridge', icon: 'layers', description: 'Tall neural spines formed a shallow ridge or hump along the back, unlike the giant sail of Spinosaurus.' },
    ],
    description: 'Suchomimus was a long-snouted river hunter built like a crocodile on dinosaur legs. It patrolled Early Cretaceous waterways with toothy jaws, powerful arms, and a fishing specialist\'s face.',
    longDescription: 'Found in the deserts of Niger, Suchomimus reveals that spinosaurids were already highly specialized fish-eating predators long before the more extreme Spinosaurus evolved. Its skull was long, low, and lined with slender teeth that interlocked into an efficient trap for fish and other small prey. Strong forelimbs and enlarged thumb claws suggest it could also rake at carcasses or pin struggling animals. The environments of the Elrhaz Formation included rivers, floodplains, and seasonal drought, meaning Suchomimus may have switched between hunting in shallow water and scavenging or ambushing prey on land.',
    kidsDescription: 'Suchomimus looked like a dinosaur-crocodile mashup! It had a super long snout for grabbing fish and giant claws on its hands like built-in fishing hooks.',
    childFriendlyText: 'Suchomimus was a crocodile-faced dinosaur that loved catching fish. It had a long snout and giant claws on its hands.',
    scientificSummary: 'Suchomimus tenerensis (Sereno et al., 1998) is a baryonychine spinosaurid from the Aptian-Albian Elrhaz Formation of Niger. It is distinguished by a long rostrum with terminal rosette dentition, conical unserrated teeth, enlarged manual ungual I, and elongate dorsal neural spines producing a low axial ridge. The taxon is essential for reconstructing the stepwise evolution of spinosaurid cranial specialization and semiaquatic feeding behavior within Theropoda.',
    discoveries: [
      { year: 1997, location: 'Ténéré Desert, Niger', discoveredBy: 'Paul Sereno and team', note: 'A remarkably complete skeleton was discovered during a major Saharan expedition.' },
      { year: 1998, location: 'Niger', discoveredBy: 'Paul Sereno and colleagues', note: 'The formal description established Suchomimus as a giant baryonychine spinosaurid.' },
    ],
    funFact: 'Suchomimus means \"crocodile mimic,\" a perfect name for a dinosaur whose snout looked ready for a life of fishing.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Spinosauridae', subfamily: 'Baryonychinae', genus: 'Suchomimus', species: 'S. tenerensis' },
    relatedDinosaurs: [
      { id: 'baryonyx', relationship: 'Close relative' },
      { id: 'spinosaurus', relationship: 'Larger cousin' },
      { id: 'nigersaurus', relationship: 'Contemporary neighbor' },
    ],
    fossilLocations: [
      { country: 'Niger', region: 'Gadoufaoua', coordinates: [17.4, 9.3], specimenName: 'Elrhaz Formation' },
    ],
    dangerLevel: 8,
    intelligence: 5,
}
