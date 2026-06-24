import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Amargasaurus: Dinosaur = {
    id: 'amargasaurus',
    slug: 'amargasaurus',
    displayName: 'Amargasaurus',
    name: 'Amargasaurus',
    pronunciation: 'ah-MAR-gah-SORE-us',
    nameMeaning: 'La Amarga Lizard',
    genusName: 'Amargasaurus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'large',
    habitat: 'plains',
    livedIn: ['South America'],
    periodRangeMya: [129, 122],
    dimensions: { lengthMeters: 10.0, heightMeters: 3.3, weightKg: 2600, speedKmh: 15 },
    images: { ...img('amargasaurus'), video: '/videos/dinosaurs/amargasaurus/video.mp4' },
    facts: [
      { label: 'Neck spines', value: 'Up to 60 cm', icon: 'triangle', description: 'Its neck vertebrae carried paired spines so tall they may have supported a display structure or defensive keratin sheath.' },
      { label: 'Sauropod', value: 'Compact giant', icon: 'maximize', description: 'Unlike massive titanosaurs, Amargasaurus was a relatively short-necked sauropod built low and sturdy.' },
      { label: 'Family', value: 'Dicraeosaurid', icon: 'medal', description: 'It belonged to a rare branch of sauropods famous for shorter necks and unusual vertebral spines.' },
      { label: 'Home', value: 'Patagonian floodplains', icon: 'star', description: 'It lived in Early Cretaceous Patagonia among rivers, conifers, and other bizarre South American dinosaurs.' },
    ],
    description: 'Amargasaurus looked like a dragon designed by nature itself: a sturdy plant-eater with a double row of towering neck spines unlike anything on Earth today. It proves that even among sauropods, evolution could get wonderfully weird.',
    longDescription: 'Amargasaurus was a dicraeosaurid sauropod from Patagonia whose most famous feature is the paired elongate neural spines running along the neck and front of the back. Paleontologists still debate exactly what these spines supported. They may have formed a narrow sail, carried thick horn sheaths, or served mostly as visual display structures. Unlike the ultra-long-necked giants of later Cretaceous South America, Amargasaurus had a relatively compact body plan, making it a useful comparison point for understanding the ecological diversity of sauropods. It probably browsed at low to medium heights and relied on herd behavior, size, and perhaps its spine display to discourage predators.',
    kidsDescription: 'Amargasaurus was a spiky-necked plant-eater that looked like a dinosaur dragon! It had long spikes running in two rows down its neck, making it one of the coolest-looking sauropods ever found.',
    childFriendlyText: 'Amargasaurus was a plant-eating dinosaur with amazing spikes on its neck. It looked like a gentle dragon from ancient Patagonia.',
    scientificSummary: 'Amargasaurus cazaui (Salgado & Bonaparte, 1991) is a dicraeosaurid sauropod from the Barremian-Aptian La Amarga Formation of Neuquén Basin, Argentina. It is diagnosed by extreme elongation of the cervical and anterior dorsal neural spines, a shortened neck relative to diplodocids, and a robust axial skeleton characteristic of Dicraeosauridae. The taxon is important for reconstructing sauropod display evolution, niche partitioning among South American herbivores, and the biogeographic history of basal diplodocoids in Gondwana.',
    discoveries: [
      { year: 1984, location: 'Neuquén, Argentina', discoveredBy: 'Guillermo Rougier', note: 'The type specimen was discovered in the La Amarga Formation of Patagonia.' },
      { year: 1991, location: 'Argentina', discoveredBy: 'Leonardo Salgado and José Bonaparte', note: 'The formal description highlighted the dinosaur\'s extraordinary neck spines.' },
    ],
    funFact: 'No one is completely sure what Amargasaurus did with its huge neck spines — they may have made it look even more spectacular than the skeleton suggests.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Dicraeosauridae', genus: 'Amargasaurus', species: 'A. cazaui' },
    relatedDinosaurs: [
      { id: 'diplodocus', relationship: 'Distant diplodocoid cousin' },
      { id: 'argentinosaurus', relationship: 'Later South American giant' },
      { id: 'carnotaurus', relationship: 'Later regional predator' },
    ],
    fossilLocations: [
      { country: 'Argentina', region: 'Neuquén', coordinates: [-38.6, -70.2], specimenName: 'La Amarga Formation' },
    ],
    dangerLevel: 2,
    intelligence: 2,
}
