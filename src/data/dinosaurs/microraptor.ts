import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Microraptor: Dinosaur = {
    id: 'microraptor',
    slug: 'microraptor',
    displayName: 'Microraptor',
    name: 'Microraptor',
    pronunciation: 'MY-cro-RAP-tor',
    nameMeaning: 'Small Plunderer',
    genusName: 'Microraptor',
    era: 'cretaceous',
    diet: 'carnivore',
    category: 'carnivore',
    size: 'small',
    habitat: 'forest',
    livedIn: ['Asia'],
    periodRangeMya: [120, 114],
    dimensions: { lengthMeters: 0.8, heightMeters: 0.25, weightKg: 1, speedKmh: 25 },
    images: img('microraptor'),
    facts: [
      { label: 'Wings', value: 'Four-winged', icon: 'feather', description: 'Long feathers grew on both its arms and legs, making it one of the strangest aerodynamic dinosaurs ever found.' },
      { label: 'Size', value: 'Crow-sized', icon: 'star', description: 'Microraptor was tiny by dinosaur standards and could perch, glide, and pounce through forest canopies.' },
      { label: 'Color', value: 'Iridescent black', icon: 'award', description: 'Microscopic pigment structures suggest glossy, raven-like feathers that shimmered in sunlight.' },
      { label: 'Diet', value: 'Anything bite-sized', icon: 'fish', description: 'Fossils preserve fish, mammals, and birds in the gut, showing it was a versatile little predator.' },
    ],
    description: 'Microraptor was a tiny, feathered hunting dinosaur that looked like a crow crossed with a dragon kite. With wing feathers on both its arms and legs, it reveals how messy and fascinating the evolution of flight really was.',
    longDescription: 'Microraptor lived in the lush lake-and-forest ecosystems of Early Cretaceous Liaoning, China, where volcanic ash periodically buried animals in extraordinary detail. Its fossils preserve feathers, soft tissues, and even stomach contents, giving paleontologists a remarkable window into the lives of small paravian dinosaurs. The most striking feature is its four-winged arrangement: elongated flight feathers on the arms and hindlimbs that probably allowed controlled gliding between trees. Rather than being a direct bird, Microraptor represents an evolutionary experiment, showing that multiple aerodynamic body plans existed before modern bird flight became dominant.',
    kidsDescription: 'Microraptor was a mini dinosaur ninja with FOUR wings! It could glide from tree to tree and catch little animals, all while wearing shiny black feathers like a superhero cape.',
    childFriendlyText: 'Microraptor was a tiny feathered dinosaur with wings on its arms and legs. It probably glided through forests like a living paper airplane!',
    scientificSummary: 'Microraptor gui (Xu et al., 2003) is a microraptorine dromaeosaurid from the Aptian Jiufotang and Yixian formations of Liaoning, China. Exceptional preservation documents pennaceous feathers on the forelimbs and hindlimbs, asymmetrical vanes, and melanosome geometry consistent with iridescent plumage. Gut contents and skeletal proportions indicate an arboreal generalist predator. Microraptor is a cornerstone taxon in debates over the origins of avian flight, especially the aerodynamic feasibility of gliding versus flapping-first models.',
    discoveries: [
      { year: 2000, location: 'Liaoning, China', discoveredBy: 'Local fossil collectors', note: 'Exceptionally preserved specimens from the Jehol Biota revealed a small four-winged dinosaur.' },
      { year: 2003, location: 'China', discoveredBy: 'Xu Xing and colleagues', note: 'The formal description made Microraptor famous as one of the clearest non-avian feathered dinosaurs.' },
    ],
    funFact: 'Microraptor fossils are so well preserved that scientists have reconstructed not just its feathers, but even their original glossy color.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Dromaeosauridae', subfamily: 'Microraptorinae', genus: 'Microraptor', species: 'M. gui' },
    relatedDinosaurs: [
      { id: 'velociraptor', relationship: 'Distant dromaeosaur relative' },
      { id: 'troodon', relationship: 'Fellow bird-like theropod' },
      { id: 'psittacosaurus', relationship: 'Contemporary neighbor' },
    ],
    fossilLocations: [
      { country: 'China', region: 'Liaoning', coordinates: [41.6, 120.8], specimenName: 'Jiufotang Formation' },
    ],
    dangerLevel: 3,
    intelligence: 6,
    birdRelation: 'Microraptor was extremely close to birds and shows that winged, feathered dinosaurs were common before modern birds fully evolved.'
}
