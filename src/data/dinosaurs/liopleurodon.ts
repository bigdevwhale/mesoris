import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Liopleurodon: Dinosaur = {
    id: 'liopleurodon',
    slug: 'liopleurodon',
    displayName: 'Liopleurodon',
    name: 'Liopleurodon',
    pronunciation: 'LY-oh-PLOOR-oh-don',
    nameMeaning: 'Smooth-Sided Teeth',
    genusName: 'Liopleurodon',
    era: 'jurassic',
    diet: 'carnivore',
    category: 'marine-reptile',
    size: 'large',
    habitat: 'ocean',
    livedIn: ['Europe'],
    periodRangeMya: [166, 155],
    dimensions: { lengthMeters: 7.0, heightMeters: 1.5, weightKg: 1700, speedKmh: 35 },
    images: { ...img('liopleurodon'), video: '/videos/dinosaurs/liopleurodon/video.mp4' },
    facts: [
      { label: 'Predator', value: 'Short-necked pliosaur', icon: 'anchor', description: 'Liopleurodon belonged to the pliosaur branch of plesiosaurs — big-headed ambush hunters with powerful flippers.' },
      { label: 'Skull', value: 'About 1.5 meters', icon: 'skull', description: 'Its skull was huge for its body size, packed with conical teeth for seizing fish and marine reptiles.' },
      { label: 'Myth', value: 'Not 25 meters', icon: 'lightbulb', description: 'Television once made Liopleurodon famous as a sea monster over 20 meters long, but real evidence suggests a much smaller animal.' },
      { label: 'Swimming', value: 'Four-flipper propulsion', icon: 'zap', description: 'Like other plesiosaurs, it flew underwater using all four flippers in coordinated strokes.' },
    ],
    description: 'Liopleurodon was a muscular Jurassic marine predator — not the impossible giant of TV documentaries, but a very real and very dangerous pliosaur built for ambush in warm shallow seas.',
    longDescription: 'Liopleurodon patrolled the seas that covered parts of Europe during the Middle to Late Jurassic. Unlike long-necked plesiosaurs that relied more on stealth and reach, Liopleurodon had a short neck, enlarged head, and powerful jaws suited to grabbing and subduing sizeable prey. Recent estimates suggest it was formidable without being absurdly gigantic, probably comparable in size to a large modern killer whale. Because the fossil record is dominated by skull and jaw elements, Liopleurodon also serves as a cautionary tale in paleontology: popular reconstructions can grow far beyond what the bones actually support.',
    kidsDescription: 'Liopleurodon was a fast sea hunter with a giant head and four flippers like underwater wings. It wasn\'t the giant movie monster people once imagined — but it was still a super scary ocean predator!',
    childFriendlyText: 'Liopleurodon was a strong swimming reptile with a big head and sharp teeth. It hunted in Jurassic seas using all four flippers.',
    scientificSummary: 'Liopleurodon ferox (Sauvage, 1873) is a pliosaurid plesiosaur from the Callovian-Oxfordian marine deposits of England and France. It is characterized by robust conical dentition, a relatively short cervical series, and a broad skull adapted for macrophagous predation. Although historically exaggerated in popular media, current evidence supports Liopleurodon as a medium-to-large pliosaur rather than an extreme supergiant, making it important in discussions of scaling and ecological partitioning among Jurassic marine reptiles.',
    discoveries: [
      { year: 1873, location: 'Boulogne-sur-Mer, France', discoveredBy: 'Henri-Émile Sauvage', note: 'Teeth and jaw material formed the basis for naming Liopleurodon.' },
      { year: 1877, location: 'England', discoveredBy: 'Numerous collectors and museums', note: 'Oxford Clay material from Britain later helped paleontologists understand the animal more completely.' },
    ],
    funFact: 'Liopleurodon became world-famous after Walking with Dinosaurs exaggerated its size — a reminder that real paleontology is usually cooler than the myth.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Sauropterygia', order: 'Plesiosauria', suborder: 'Pliosauroidea', family: 'Pliosauridae', genus: 'Liopleurodon', species: 'L. ferox' },
    relatedDinosaurs: [
      { id: 'kronosaurus', relationship: 'Later pliosaur analogue' },
      { id: 'plesiosaurus', relationship: 'Distant plesiosaur relative' },
      { id: 'ichthyosaurus', relationship: 'Marine contemporary type' },
    ],
    fossilLocations: [
      { country: 'France', region: 'Pas-de-Calais', coordinates: [50.7, 1.6], specimenName: 'Callovian marine deposits' },
      { country: 'United Kingdom', region: 'Oxfordshire', coordinates: [51.8, -1.3], specimenName: 'Oxford Clay Formation' },
    ],
    dangerLevel: 8,
    intelligence: 4,
}
