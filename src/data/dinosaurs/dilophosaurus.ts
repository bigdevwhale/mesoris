import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dilophosaurus: Dinosaur = {
    id: 'dilophosaurus',
    slug: 'dilophosaurus',
    displayName: 'Dilophosaurus',
    name: 'Dilophosaurus',
    pronunciation: 'dy-LOFF-oh-SORE-us',
    nameMeaning: 'Two-Crested Lizard',
    genusName: 'Dilophosaurus',
    era: 'jurassic',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'large',
    habitat: 'plains',
    livedIn: ['North America'],
    periodRangeMya: [193, 183],
    dimensions: { lengthMeters: 7.0, heightMeters: 1.9, weightKg: 400, speedKmh: 35 },
    images: { ...img('dilophosaurus'), video: '/videos/dinosaurs/dilophosaurus/video.mp4' },
    facts: [
      { label: 'Crests', value: 'Twin skull crests', icon: 'triangle', description: 'Two thin bony crests ran along the top of its skull, probably used for display rather than combat.' },
      { label: 'Size', value: '7 meters', icon: 'maximize', description: 'Much bigger than the movie version — a true early Jurassic apex predator about as long as a bus.' },
      { label: 'Bite', value: 'No venom evidence', icon: 'lightbulb', description: 'There is no scientific evidence that Dilophosaurus spat venom or wore a neck frill; those are movie inventions.' },
      { label: 'Age', value: 'Early Jurassic hunter', icon: 'clock', description: 'It hunted only a few million years after dinosaurs first became dominant on land.' },
    ],
    description: 'The real Jurassic Park celebrity was an agile early predator with elegant double crests, long arms, and a lightly built body made for speed. The real Dilophosaurus was far larger than its fictional counterpart and one of the top hunters of Early Jurassic North America.',
    longDescription: 'Dilophosaurus lived in what is now Arizona during the Early Jurassic, when river channels and seasonal floodplains crossed a warm landscape full of conifers and ferns. Its body was long and lightly built, with powerful legs, grasping hands, and a skull topped by paired crests that likely played a role in species recognition or courtship display. Unlike later giant theropods, Dilophosaurus belonged to a much earlier stage in theropod evolution, making it especially important for understanding how large carnivorous dinosaurs developed their classic body plan. Bite marks, trackways, and skeletal anatomy suggest it was an active hunter that probably targeted medium-sized prey and scavenged when given the opportunity.',
    kidsDescription: 'Dilophosaurus had TWO fancy head crests like built-in dinosaur mohawks! In movies it spits venom, but real scientists say nope — the real animal was a bigger, faster meat-eater that chased prey across muddy Jurassic riverbanks.',
    childFriendlyText: 'Dilophosaurus was a fast hunter with two cool head crests. The real one did not spit venom, but it was still a very impressive predator!',
    scientificSummary: 'Dilophosaurus wetherilli (Welles, 1970) is a large neotheropod from the Sinemurian-Pliensbachian Kayenta Formation of Arizona. It preserves a transitional theropod bauplan combining an elongated lightly constructed skull, paired parasagittal cranial crests, and robust forelimbs with a relatively gracile hindlimb apparatus. Pathologies and tooth morphology indicate active predation and occasional scavenging. As one of the earliest large-bodied theropods, Dilophosaurus is central to reconstructing early Jurassic predator evolution.',
    discoveries: [
      { year: 1940, location: 'Navajo Nation, Arizona, USA', discoveredBy: 'Sam Welles', note: 'The first skeleton was excavated from the Kayenta Formation during a University of California expedition.' },
      { year: 1964, location: 'Arizona, USA', discoveredBy: 'Sam Welles', note: 'A better specimen showed the distinctive paired crests clearly and led to the name Dilophosaurus.' },
    ],
    funFact: 'For decades, millions of people knew Dilophosaurus from Jurassic Park — but the movie invented its venom-spitting attack and folding neck frill.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Dilophosauridae', genus: 'Dilophosaurus', species: 'D. wetherilli' },
    relatedDinosaurs: [
      { id: 'coelophysis', relationship: 'Earlier theropod relative' },
      { id: 'ceratosaurus', relationship: 'Later crested theropod counterpart' },
      { id: 'allosaurus', relationship: 'Successor apex predator' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Arizona', coordinates: [36.7, -111.3], specimenName: 'Kayenta Formation' },
    ],
    dangerLevel: 7,
    intelligence: 5,
    birdRelation: 'Dilophosaurus was an early theropod on the broader branch that eventually gave rise to birds, but it lived long before truly bird-like feathered dinosaurs evolved.'
}
