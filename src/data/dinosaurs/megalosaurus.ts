import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Megalosaurus: Dinosaur = {
    id: 'megalosaurus', slug: 'megalosaurus', displayName: 'Megalosaurus', name: 'Megalosaurus',
    pronunciation: 'MEG-ah-lo-SORE-us', nameMeaning: 'Great Lizard', genusName: 'Megalosaurus',
    era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'large', habitat: 'forest',
    livedIn: ['Europe'], periodRangeMya: [166, 166],
    dimensions: { lengthMeters: 9.0, heightMeters: 2.7, weightKg: 1500, speedKmh: 35 },
    images: img('megalosaurus'),
    facts: [
      { label: 'Legacy', value: 'FIRST dinosaur', icon: 'medal', description: 'The very first dinosaur ever scientifically named — in 1824, starting the entire field of dinosaur paleontology.' },
      { label: 'Jaw', value: 'Powerful bite', icon: 'bone', description: 'A massive lower jaw fragment was the first fossil — so big, scientists thought it was a giant human.' },
      { label: 'Appearance', value: 'Reconstructed wrong', icon: 'help-circle', description: 'Early reconstructions showed it as a giant lizard — we now know it walked on two legs.' },
      { label: 'Jurassic', value: 'Middle Jurassic', icon: 'clock', description: 'Lived in the Middle Jurassic of England — older than Allosaurus and T. rex.' },
    ],
    description: 'The dinosaur that started it all. Megalosaurus holds the honor of being the very first dinosaur ever scientifically named, in 1824. Before it, no one knew dinosaurs existed — this is fossil #1.',
    longDescription: 'Megalosaurus occupies a unique place in scientific history as the first dinosaur genus to be formally described. In 1824, William Buckland studied a massive jawbone fragment with serrated teeth found in Oxfordshire, England, and realized it belonged to a giant extinct reptile quite unlike anything alive today. The concept of "dinosaurs" didn\'t yet exist — that would come in 1842 when Richard Owen grouped Megalosaurus with Iguanodon and Hylaeosaurus as the original Dinosauria. Ironically, despite its historical importance, Megalosaurus remains poorly known from fragmentary remains.',
    kidsDescription: 'This is the FIRST dinosaur ever discovered! Before Megalosaurus, nobody in the world knew dinosaurs had ever existed. Someone found a giant jawbone in England and said "what IS this?!" — and that started everything!',
    childFriendlyText: 'Megalosaurus was the very first dinosaur ever named by scientists! It was found in England almost 200 years ago, before anyone knew dinosaurs existed.',
    scientificSummary: 'Megalosaurus bucklandii (Mantell, 1827; Buckland, 1824) is a basal tetanuran theropod from the Bathonian Stonesfield Slate, UK. Historically the first dinosaur genus formally described in scientific literature, predating Owen\'s Dinosauria concept. Material is fragmentary, predominantly comprising the lectotype dentary with characteristic laterally compressed, serrated teeth. Systematic position has been historically problematic but current consensus places it as a basal megalosauroid within Tetanurae.',
    discoveries: [{ year: 1815, location: 'Oxfordshire, UK', discoveredBy: 'Quarry workers', note: 'Giant bones found in Stonesfield quarry — later described by William Buckland in 1824.' }],
    funFact: 'When the first Megalosaurus jawbone was found, one scientist thought it belonged to a giant prehistoric human. Another thought it was a Roman war elephant!',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Megalosauridae', genus: 'Megalosaurus', species: 'M. bucklandii' },
    relatedDinosaurs: [{ id: 'allosaurus', relationship: 'Distant relative' }],
    fossilLocations: [{ country: 'UK', region: 'Oxfordshire', coordinates: [51.9, -1.5], specimenName: 'Stonesfield Slate' }],
    dangerLevel: 7, intelligence: 4,
  }
