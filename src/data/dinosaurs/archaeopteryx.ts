import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Archaeopteryx: Dinosaur = {
  id: 'archaeopteryx', slug: 'archaeopteryx', displayName: 'Archaeopteryx', name: 'Archaeopteryx',
  pronunciation: 'AR-kee-OP-ter-iks', nameMeaning: 'Ancient Wing', genusName: 'Archaeopteryx',
  era: 'jurassic', diet: 'carnivore', category: 'carnivore', size: 'small', habitat: 'forest',
  livedIn: ['Europe'], periodRangeMya: [151, 148],
  dimensions: { lengthMeters: 0.5, heightMeters: 0.25, weightKg: 1, speedKmh: 18 },
  images: { ...img('archaeopteryx'), video: '/videos/dinosaurs/archaeopteryx/video.mp4' },
  facts: [
    { label: 'Bridge Fossil', value: 'Dino + bird traits', icon: 'feather', description: 'Archaeopteryx preserved both classic theropod features like teeth and a long bony tail, and bird-like wing feathers, making it a key transition fossil.' },
    { label: 'Famous Discovery', value: '1861 specimen', icon: 'star', description: 'Its first skeleton was announced just two years after Darwin published On the Origin of Species, quickly becoming an icon of evolution.' },
    { label: 'Flight Style', value: 'Short bursts', icon: 'wind', description: 'Most studies suggest Archaeopteryx could launch and flap over short distances rather than sustain long modern-bird style flight.' },
    { label: 'Size', value: 'Raven-sized', icon: 'maximize', description: 'At about half a metre long and roughly 1 kilogram, Archaeopteryx was a small feathered predator in Late Jurassic island forests.' },
  ],
  description: 'Archaeopteryx is one of the most famous fossils in science because it sits near the dinosaur-bird transition. It combined sharp teeth, clawed fingers, and a long tail with asymmetrical flight feathers and wings.',
  longDescription: 'Archaeopteryx lithographica comes from the Late Jurassic Solnhofen Limestone of Bavaria, Germany, dated to about 151–148 million years ago. Fine-grained lagoonal limestones preserved exquisite details of feathers, soft tissue impressions, and skeletal anatomy. Archaeopteryx had clear theropod dinosaur traits — including teeth, a long bony tail, unfused hand bones, and a hyperextensible second toe — alongside avian traits such as pennaceous wing feathers and a furcula. Biomechanical analyses indicate limited powered flight or strong wing-assisted leaping and gliding between perches in coastal island habitats. Its importance lies less in being a direct ancestor of all birds and more in documenting the mosaic evolution of avian characters within maniraptoran theropods.',
  kidsDescription: 'Archaeopteryx looked like a tiny dinosaur with real wings! It had feathers like a bird, but also teeth and a long tail like a little raptor. It is one of the coolest "in-between" fossils ever found.',
  childFriendlyText: 'Archaeopteryx was a small feathered dinosaur that could probably flap and glide. It had wings, but also teeth and a long tail!',
  scientificSummary: 'Archaeopteryx lithographica (Meyer, 1861) is an avialan/paravian theropod from the Tithonian Solnhofen deposits of Bavaria. Specimens preserve asymmetric remiges, furcula, gastralia, dentition, manual claws, and elongate caudal vertebrae. It represents a pivotal taxon in understanding acquisition of avian flight-related characters among non-avian theropods.',
  discoveries: [
    { year: 1861, location: 'Solnhofen Limestone, Bavaria, Germany', discoveredBy: 'Quarry workers; described by Hermann von Meyer', note: 'First skeletal Archaeopteryx specimen formally described and linked to avian evolution.' },
    { year: 1877, location: 'Blumenberg near Eichstätt, Germany', discoveredBy: 'Jakob Niemeyer quarry', note: 'The Berlin specimen preserved an exceptional skull and feather impressions, becoming the classic museum example.' },
  ],
  funFact: 'Archaeopteryx became world-famous so quickly that casts were studied in schools and museums across Europe before many other major dinosaurs were even named.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Archaeopterygidae', genus: 'Archaeopteryx', species: 'A. lithographica' },
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Fellow feathered paravian with aerodynamic adaptations' },
    { id: 'troodon', relationship: 'Bird-like theropod with advanced sensory anatomy' },
    { id: 'velociraptor', relationship: 'Later dromaeosaur relative within maniraptoran theropods' },
  ],
  fossilLocations: [
    { country: 'Germany', region: 'Solnhofen, Bavaria', coordinates: [48.9, 10.99], specimenName: 'London specimen (BMNH 37001)' },
    { country: 'Germany', region: 'Eichstätt, Bavaria', coordinates: [48.89, 11.18], specimenName: 'Berlin specimen (HMN 1880)' },
  ],
  dangerLevel: 3, intelligence: 6, birdRelation: '10 / 10'
}

