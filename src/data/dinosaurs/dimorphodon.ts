import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Dimorphodon: Dinosaur = {
    id: 'dimorphodon', slug: 'dimorphodon', displayName: 'Dimorphodon', name: 'Dimorphodon',
    pronunciation: 'die-MOR-foh-don', nameMeaning: 'Two-Form Tooth', genusName: 'Dimorphodon',
    era: 'jurassic', diet: 'carnivore', category: 'flying-reptile', size: 'small', habitat: 'coastal',
    livedIn: ['Europe'], periodRangeMya: [195, 190],
    dimensions: { lengthMeters: 1.0, heightMeters: 0.3, weightKg: 2, speedKmh: 30 },
    images: img('dimorphodon'),
    facts: [
      { label: 'Teeth', value: 'Two types', icon: 'triangle', description: 'Two distinct types of teeth — long fangs at the front, smaller teeth in the back.' },
      { label: 'Skull', value: 'Puffin-like', icon: 'bird', description: 'An unusually deep, bulky skull — looks like a puffin with fangs and wings.' },
      { label: 'Age', value: 'Early Jurassic', icon: 'clock', description: 'One of the earliest pterosaurs — from a time when flying was brand-new technology.' },
    ],
    description: 'The puffin from hell. Dimorphodon was one of the earliest pterosaurs, with an unusually large, deep skull, two distinct types of fang-like teeth, and a body plan still figuring out how flying should work.',
    longDescription: 'Dimorphodon was an early pterosaur from the Early Jurassic, near the beginning of pterosaur evolution when flying reptiles were still experimenting with body plans. Its most striking feature is its skull — unusually tall and deep (not long and narrow like later pterosaurs), resembling a modern puffin\'s. The teeth are distinctly dimorphic (hence the name): long, slender fangs at the front for gripping, with smaller, needle-like teeth further back. Its relatively short wings and robust body suggest it flew more like a galloping bat than the graceful soarers that pterosaurs would later become — rapid, fluttering flight through the coastal forests of Jurassic England.',
    kidsDescription: 'Dimorphodon looked like a PUFFIN with fangs and bat wings! It had a big round head with two kinds of teeth — long scary fangs up front and tiny teeth in back. It was one of the first flying reptiles and hadn\'t quite figured out the best way to fly yet — it fluttered around like a bat!',
    childFriendlyText: 'Dimorphodon was like a flying puffin with fangs! It had a big head and two different kinds of teeth — long ones and short ones.',
    scientificSummary: 'Dimorphodon macronyx (Buckland, 1829) is a dimorphodontid early pterosaur from the Sinemurian Blue Lias Formation, UK. Among the earliest-diverging pterosaurs, characterized by a uniquely deep, box-like skull with two discrete tooth morphotypes: elongate, recurved anterior fangs and smaller, peg-like posterior teeth — functionally distinguishing prey capture from processing roles. The short, broad wings and robust build suggest a flutter-gliding flight style ancestral to the derived soaring flight of later pterodactyloids.',
    discoveries: [{ year: 1828, location: 'Dorset, UK', discoveredBy: 'Mary Anning', note: 'Discovered by the famous fossil hunter Mary Anning on the Jurassic Coast.' }],
    funFact: 'Dimorphodon was discovered by Mary Anning, the legendary fossil hunter who also discovered the first ichthyosaur and plesiosaur — one woman who almost single-handedly created the field of marine reptile paleontology.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Pterosauria', order: '', suborder: '', family: 'Dimorphodontidae', genus: 'Dimorphodon', species: 'D. macronyx' },
    relatedDinosaurs: [{ id: 'pterodactylus', relationship: 'More advanced descendant' }, { id: 'rhamphorhynchus', relationship: 'Contemporary' }],
    fossilLocations: [{ country: 'UK', region: 'Dorset', coordinates: [50.6, -2.9], specimenName: 'Blue Lias Formation, Jurassic Coast' }],
    dangerLevel: 2, intelligence: 3,
  }
