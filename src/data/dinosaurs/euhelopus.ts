import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Euhelopus: Dinosaur = {
  id: 'euhelopus', slug: 'euhelopus', displayName: 'Euhelopus', name: 'Euhelopus',
  pronunciation: 'yoo-HEE-loh-pus', nameMeaning: 'True Marsh Foot', genusName: 'Euhelopus',
  era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'swamp',
  livedIn: ['Asia'], periodRangeMya: [125, 110],
  dimensions: { lengthMeters: 15.0, heightMeters: 5.0, weightKg: 15000, speedKmh: 14 },
  images: img('euhelopus'),
  facts: [
    { label: 'Neck', value: 'Very long neck', icon: 'arrow-up', description: 'Euhelopus had an elongated cervical series that let it browse high and mid-level vegetation in Cretaceous wetlands.' },
    { label: 'Region', value: 'China giant', icon: 'map-pin', description: 'It was one of the first well-known large sauropods described from China, helping establish Asia\'s sauropod record.' },
    { label: 'Build', value: 'Column-like limbs', icon: 'shield', description: 'Its robust limbs and broad body supported a massive torso while moving across soft floodplain or marshy ground.' },
    { label: 'Age', value: 'Early Cretaceous', icon: 'clock', description: 'Euhelopus survived in Asian ecosystems after many classic Jurassic sauropod groups had declined elsewhere.' },
  ],
  description: 'Euhelopus was a large long-necked sauropod from Early Cretaceous China. Its anatomy suggests a powerful but relatively flexible giant adapted to wet lowland environments.',
  longDescription: 'Euhelopus zdanskyi is known from the Lower Cretaceous of China and has played a major historical role in debates about sauropod relationships in Asia. Originally described from partial but informative material, Euhelopus displays elongate cervical vertebrae, relatively gracile but weight-bearing limb bones, and a broad-bodied torso. Earlier studies often linked it to Mamenchisaurus-like forms, while modern phylogenetic analyses tend to place Euhelopus among somphospondylan/euhelopodid titanosauriform-grade sauropods. Its dentition and neck reach suggest generalized high browsing with possible vertical and sweeping feeding strategies. Euhelopus demonstrates that large-bodied sauropods remained ecologically significant in Early Cretaceous East Asia.',
  kidsDescription: 'Euhelopus was a huge plant-eater from ancient China with a super long neck for reaching leaves. It was like a moving crane that could munch plants from many heights!',
  childFriendlyText: 'Euhelopus was a giant long-necked dinosaur from China. It used its long neck to reach lots of plants in swampy forests.',
  scientificSummary: 'Euhelopus zdanskyi (Wiman, 1929) is an Early Cretaceous East Asian sauropod traditionally associated with Euhelopodidae and broadly within titanosauriform-grade somphospondylans. The taxon preserves elongate cervicals, dorsals, appendicular elements, and cranial information from referred material. It is significant for reconstructing Cretaceous sauropod biogeography in Asia.',
  discoveries: [
    { year: 1923, location: 'Shandong, China', discoveredBy: 'Otto Zdansky expedition', note: 'Collected original fossil material later used in formal description.' },
    { year: 1929, location: 'Uppsala publication', discoveredBy: 'Carl Wiman', note: 'Formally described Euhelopus zdanskyi and highlighted its unusual sauropod anatomy.' },
  ],
  funFact: 'For many decades, Euhelopus was one of the only major Chinese sauropods known in Western textbooks, making it a classic ambassador of Asian dinosaurs.',
  taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Sauropodomorpha', family: 'Euhelopodidae', genus: 'Euhelopus', species: 'E. zdanskyi' },
  relatedDinosaurs: [
    { id: 'mamenchisaurus', relationship: 'Another Asian long-necked sauropod often compared anatomically' },
    { id: 'brachiosaurus', relationship: 'Large high-browsing sauropod with different forelimb proportions' },
    { id: 'sauroposeidon', relationship: 'Later giant titanosauriform with extreme neck elongation' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Shandong Province', coordinates: [36.6, 118.0], specimenName: 'Original Euhelopus material' },
  ],
  dangerLevel: 3, intelligence: 3,
}

