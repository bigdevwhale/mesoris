import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Therizinosaurus: Dinosaur = {
    id: 'therizinosaurus', slug: 'therizinosaurus', displayName: 'Therizinosaurus', name: 'Therizinosaurus',
    pronunciation: 'THAIR-ih-ZEEN-oh-SORE-us', nameMeaning: 'Scythe Lizard', genusName: 'Therizinosaurus',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'gigantic', habitat: 'forest',
    livedIn: ['Mongolia'], periodRangeMya: [70, 70],
    dimensions: { lengthMeters: 10.0, heightMeters: 5.0, weightKg: 5000, speedKmh: 25 },
    images: img('therizinosaurus'),
    facts: [
      { label: 'Claws', value: '1 meter long', icon: 'sickle', description: 'The LONGEST claws of any animal ever — three 1-meter scythe-like claws on each hand.' },
      { label: 'Diet', value: 'Mysterious plant-eater', icon: 'leaf', description: 'A theropod that became herbivorous — the ultimate evolutionary rebel.' },
      { label: 'Build', value: 'Pot-bellied', icon: 'maximize', description: 'A massive gut for fermenting plants, long neck, and tiny leaf-shaped teeth.' },
      { label: 'Relatives', value: 'From predator to vegan', icon: 'git-branch', description: 'Evolved from carnivorous theropods but became completely herbivorous — extremely rare.' },
    ],
    description: 'The ultimate evolutionary rebel — a theropod dinosaur that gave up meat and became a giant, pot-bellied, leaf-eating scythe monster. Therizinosaurus had the longest claws of any animal ever: 1 meter each.',
    longDescription: 'Therizinosaurus is perhaps the most bizarre dinosaur ever discovered. Evolved from theropod (meat-eating) ancestors, it became entirely herbivorous — an evolutionary reversal almost unique among dinosaurs. Its most stunning feature was its hands: each bore three enormous claws up to 1 meter in length, the longest claws of any known animal. Despite their terrifying appearance, these scythe-like claws were likely used to pull branches toward its mouth and for display. With a massive pot belly for fermenting tough vegetation, a long neck, and a small beaked head, Therizinosaurus was a true evolutionary oddity.',
    kidsDescription: 'Therizinosaurus is the WEIRDEST dinosaur ever! It was related to T-Rex but decided meat was boring — so it became a peaceful plant-eater! It had the BIGGEST CLAWS EVER — each one as long as a baseball bat! But it only used them to pull tree branches closer, like giant salad tongs!',
    childFriendlyText: 'Therizinosaurus had the biggest claws of any animal — as long as a baseball bat! But it only ate plants and was a gentle giant.',
    scientificSummary: 'Therizinosaurus cheloniformis (Maleev, 1954) is a therizinosaurid therizinosauroid theropod from the Maastrichtian Nemegt Formation, Mongolia. It is the largest known maniraptoran, distinguished by three enormously elongated manual unguals (up to 1m along the outer curve) — the largest claws of any known tetrapod. Phylogenetically nested within coelurosaurian theropods, it represents a rare case of secondary herbivory within Theropoda. Its massive abdomen accommodated extensive gut fermentation, convergent with sauropodomorph and ornithischian digestive strategies.',
    discoveries: [{ year: 1948, location: 'Gobi Desert, Mongolia', discoveredBy: 'Soviet-Mongolian expedition', note: 'First fossils — only the giant claws were found. Scientists initially thought they were turtle ribs!' }],
    funFact: 'When the first Therizinosaurus claws were discovered, scientists thought they belonged to a GIANT TURTLE. The claws were so bizarre nobody imagined they were from a dinosaur.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Therizinosauridae', genus: 'Therizinosaurus', species: 'T. cheloniformis' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Distant relative (maniraptoran)' }, { id: 'tyrannosaurus-rex', relationship: 'Distant relative (theropod)' }],
    fossilLocations: [{ country: 'Mongolia', region: 'Gobi Desert', coordinates: [43.5, 101.0], specimenName: 'Nemegt Formation' }],
    dangerLevel: 5, intelligence: 5,
  }
