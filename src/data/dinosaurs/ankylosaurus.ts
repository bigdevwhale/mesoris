import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Ankylosaurus: Dinosaur = {
    id: 'ankylosaurus',
    slug: 'ankylosaurus',
    displayName: 'Ankylosaurus',
    name: 'Ankylosaurus',
    pronunciation: 'an-KILE-oh-SORE-us',
    nameMeaning: 'Fused Lizard',
    genusName: 'Ankylosaurus',
    era: 'cretaceous',
    diet: 'herbivore',
    category: 'herbivore',
    size: 'large',
    habitat: 'forest',
    livedIn: ['North America'],
    periodRangeMya: [68, 66],
    dimensions: { lengthMeters: 8.0, heightMeters: 1.7, weightKg: 6000, speedKmh: 10 },
    images: { ...img('ankylosaurus'), video: '/videos/dinosaurs/ankylosaurus/video.mp4' },
    facts: [
      { label: 'Armor', value: 'Bony plates', icon: 'shield-check', description: 'Thick bony plates and knobs covered its back — like a living tank.' },
      { label: 'Tail Club', value: '50 kg', icon: 'hammer', description: 'A massive bony club at the end of its tail — strong enough to shatter T. rex bones.' },
      { label: 'Eyelids', value: 'Armored', icon: 'eye', description: 'Even its eyelids had bony armor — there was no weak spot on this dinosaur.' },
      { label: 'Diet', value: 'Low vegetation', icon: 'leaf', description: 'Ate ferns and low-growing plants with its small, leaf-shaped teeth.' },
    ],
    description: 'The tank of the dinosaur world. Ankylosaurus was covered head-to-tail in thick bony armor and wielded a massive tail club. Even a hungry T. rex would think twice before attacking this walking fortress.',
    longDescription: 'Ankylosaurus was among the last non-avian dinosaurs, living right up until the K-Pg extinction 66 million years ago. It was the largest ankylosaurid, reaching up to 8 meters in length and covered in thick, bony osteoderms embedded in its skin. The legendary tail club — formed from fused, enlarged osteoderms at the end of its stiffened tail — could be swung with devastating force at predators.',
    kidsDescription: 'Imagine a dinosaur that\'s basically a walking tank! Ankylosaurus was covered in super-tough bony armor from its nose to its toes. And the coolest part? A giant club at the end of its tail!',
    childFriendlyText: 'Ankylosaurus was like a walking army tank! It had tough armor all over its body and a giant club on its tail for protection.',
    scientificSummary: 'Ankylosaurus magniventris (Brown, 1908) is an ankylosaurine ankylosaurid from the Maastrichtian of North America. The largest ankylosaurid known, exceeding 8m total length. Osteoderm armature covers virtually all dorsal and lateral surfaces. The terminal tail club — formed by co-ossified distal caudal vertebrae and enlarged osteoderms — represents a functionally optimized kinetic weapon capable of delivering catastrophic impact forces to predator limb bones.',
    discoveries: [
      { year: 1906, location: 'Montana, USA', discoveredBy: 'Barnum Brown', note: 'First Ankylosaurus fossils found in Hell Creek Formation.' },
      { year: 1910, location: 'Alberta, Canada', discoveredBy: 'Peter C. Kaisen', note: 'Most complete specimen ever recovered.' },
    ],
    funFact: 'Ankylosaurus had a unique, complex nasal system — scientists think it might have made loud, low-frequency sounds to communicate.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ankylosauria', family: 'Ankylosauridae', subfamily: 'Ankylosaurinae', genus: 'Ankylosaurus', species: 'A. magniventris' },
    relatedDinosaurs: [
      { id: 'tyrannosaurus-rex', relationship: 'Predator' },
      { id: 'euoplocephalus', relationship: 'Close relative' },
    ],
    fossilLocations: [
      { country: 'USA', region: 'Montana', coordinates: [47.5, -106.5], specimenName: 'Hell Creek' },
      { country: 'Canada', region: 'Alberta', coordinates: [54.5, -113.0] },
    ],
    dangerLevel: 7,
    intelligence: 3,
  }
