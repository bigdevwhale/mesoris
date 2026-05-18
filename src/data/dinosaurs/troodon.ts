import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Troodon: Dinosaur = {
    id: 'troodon', slug: 'troodon', displayName: 'Troodon', name: 'Troodon',
    pronunciation: 'TROH-oh-don', nameMeaning: 'Wounding Tooth', genusName: 'Troodon',
    era: 'cretaceous', diet: 'omnivore', category: 'omnivore', size: 'small', habitat: 'forest',
    livedIn: ['North America'], periodRangeMya: [76, 66],
    dimensions: { lengthMeters: 2.4, heightMeters: 0.9, weightKg: 50, speedKmh: 45 },
    images: img('troodon'),
    facts: [
      { label: 'Brain', value: 'Smartest dinosaur', icon: 'brain', description: 'The highest brain-to-body ratio of any dinosaur — possibly as smart as a modern opossum.' },
      { label: 'Eyes', value: 'Huge, forward-facing', icon: 'eye', description: 'Enormous eyes with binocular vision — likely nocturnal, hunting at night.' },
      { label: 'Teeth', value: 'Serrated but varied', icon: 'triangle', description: 'Teeth suggest a mixed diet — small prey, eggs, and possibly plant material.' },
      { label: 'Hands', value: 'Partially opposable', icon: 'hand', description: 'A semi-opposable thumb — could grasp objects with surprising dexterity.' },
    ],
    description: 'The brainiest dinosaur that could have evolved into something like us. Troodon had the largest brain relative to its body of any dinosaur and huge night-vision eyes. If the asteroid hadn\'t hit, this is the dinosaur that might have developed true intelligence.',
    longDescription: 'Troodon holds the distinction of having the highest encephalization quotient (brain-to-body ratio) of any known non-avian dinosaur — comparable to some modern birds and mammals. Its exceptionally large orbits suggest it was nocturnal, hunting small prey in the darkness of the ancient Arctic and temperate forests. Its varied, serrated teeth indicate an omnivorous diet, and its grasping hands with a partially opposable thumb gave it fine manipulation ability. This combination of intelligence, sensory acuity, dietary flexibility, and manual dexterity has led some paleontologists — most famously Dale Russell — to speculate about a "dinosauroid" evolutionary path toward human-like intelligence.',
    kidsDescription: 'Troodon was the SMARTEST dinosaur! It had the biggest brain for its body size — like a genius of the dinosaur world. It had GIANT eyes for seeing in the dark and could use its hands almost like we do. Scientists think that if dinosaurs hadn\'t gone extinct, Troodon might have become super-smart!',
    childFriendlyText: 'Troodon was the brainiest dinosaur ever! It had huge eyes to see in the dark and could use its hands almost like people do.',
    scientificSummary: 'Troodon formosus (Leidy, 1856) is a troodontid paravian theropod from the Campanian-Maastrichtian of North America. Among the first North American dinosaurs described. Holds the highest encephalization quotient (EQ) of any non-avian dinosaur (~5.8), approaching avian-grade cognition. Characterized by hypertrophied orbits suggesting nocturnality, asymmetric serrations on recurved teeth, a retractable pedal digit II (convergent with dromaeosaurids), and an exceptionally derived endocranial anatomy with expanded optic lobes and cerebellum. Diet inferred as opportunistic omnivory based on heterogeneous tooth microwear.',
    discoveries: [{ year: 1855, location: 'Montana, USA', discoveredBy: 'Ferdinand Hayden', note: 'Single tooth discovered — one of the earliest North American dinosaur finds.' }],
    funFact: 'A scientist once built a life-sized model of a "Dinosauroid" — what Troodon might have evolved into if it had survived — a humanoid, reptilian creature. It\'s one of the most thought-provoking (and creepy) thought experiments in paleontology.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Saurischia', suborder: 'Theropoda', family: 'Troodontidae', genus: 'Troodon', species: 'T. formosus' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Distant relative (paravian)' }, { id: 'deinonychus', relationship: 'Related group' }],
    fossilLocations: [{ country: 'USA', region: 'Montana', coordinates: [47.5, -106.5], specimenName: 'Judith River Formation' }, { country: 'Canada', region: 'Alberta', coordinates: [50.8, -111.5] }],
    dangerLevel: 4, intelligence: 10,
  }
