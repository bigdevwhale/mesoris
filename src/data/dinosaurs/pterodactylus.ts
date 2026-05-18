import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Pterodactylus: Dinosaur = {
    id: 'pterodactylus', slug: 'pterodactylus', displayName: 'Pterodactylus', name: 'Pterodactylus',
    pronunciation: 'TAIR-oh-DAK-til-us', nameMeaning: 'Winged Finger', genusName: 'Pterodactylus',
    era: 'jurassic', diet: 'carnivore', category: 'flying-reptile', size: 'small', habitat: 'coastal',
    livedIn: ['Europe', 'Africa'], periodRangeMya: [150, 148],
    dimensions: { lengthMeters: 1.0, heightMeters: 0.25, weightKg: 2, speedKmh: 40 },
    images: img('pterodactylus'),
    facts: [
      { label: 'Discovery', value: 'First pterosaur', icon: 'medal', description: 'The first pterosaur ever discovered, in 1784 — 40 years before the first dinosaur.' },
      { label: 'Size', value: 'Pigeon-sized', icon: 'ruler', description: 'Much smaller than most people imagine — only about the size of a pigeon.' },
      { label: 'Teeth', value: '90+ teeth', icon: 'triangle', description: 'Over 90 sharp, interlocking teeth for catching fish and insects.' },
    ],
    description: 'The very first pterosaur ever known to science — discovered 40 years before dinosaurs! Pterodactylus was a pigeon-sized flying reptile with 90+ needle teeth, perfectly adapted for snapping up fish and bugs.',
    longDescription: 'Pterodactylus holds a special place in the history of paleontology — it was the first pterosaur ever discovered, collected from the famous Solnhofen limestone quarries of Bavaria in 1784, decades before anyone understood what dinosaurs were. For nearly a century, all other pterosaurs discovered were lumped into Pterodactylus, making it a notorious "wastebasket taxon." The true Pterodactylus was relatively small — about the size of a modern pigeon — with a short skull, 90+ sharp teeth, and a modest body that made it an agile, insect-and-fish catching flyer over the Jurassic lagoons.',
    kidsDescription: 'Pterodactylus was the FIRST ever discovered flying reptile — found way back in 1784! It was only as big as a pigeon, which surprises people who think all prehistoric creatures were huge. It had over 90 tiny sharp teeth and caught bugs and fish on the fly!',
    childFriendlyText: 'Pterodactylus was the first flying reptile ever discovered by humans! It was small like a pigeon and caught bugs as it flew over the water.',
    scientificSummary: 'Pterodactylus antiquus (Collini, 1784) is a pterodactylid pterosaur from the Tithonian Solnhofen Limestone, Germany. The first pterosaur ever discovered, predating the first dinosaur description by 40 years. Relatively small body size (~1m wingspan) with a shallow, elongate skull bearing 90+ conical teeth. Known from exceptionally preserved specimens showing soft tissue outlines of the wing membrane, foot webbing, and a keratinous beak tip. Long regarded as a wastebasket taxon; taxonomic revision restricted the genus to its type species.',
    discoveries: [{ year: 1784, location: 'Bavaria, Germany', discoveredBy: 'Cosimo Alessandro Collini', note: 'First pterosaur fossil ever discovered — Collini thought it was an aquatic creature.' }],
    funFact: 'When the first Pterodactylus fossil was discovered in 1784, the scientist thought it was a swimming marine animal. The idea of flying reptiles was so radical that it took another 17 years before Georges Cuvier correctly identified it as a flying creature.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: 'Pterodactyloidea', suborder: '', family: 'Pterodactylidae', genus: 'Pterodactylus', species: 'P. antiquus' },
    relatedDinosaurs: [{ id: 'pteranodon', relationship: 'Larger descendant' }, { id: 'dimorphodon', relationship: 'Earlier relative' }],
    fossilLocations: [{ country: 'Germany', region: 'Bavaria', coordinates: [48.9, 11.0], specimenName: 'Solnhofen Limestone' }],
    dangerLevel: 1, intelligence: 4,
  }
