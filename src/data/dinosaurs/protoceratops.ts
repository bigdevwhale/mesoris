import type { Dinosaur } from '@/types/dinosaur'
import { img } from './img'

export const Protoceratops: Dinosaur = {
    id: 'protoceratops', slug: 'protoceratops', displayName: 'Protoceratops', name: 'Protoceratops',
    pronunciation: 'PRO-toe-SAIR-ah-tops', nameMeaning: 'First Horned Face', genusName: 'Protoceratops',
    era: 'cretaceous', diet: 'herbivore', category: 'herbivore', size: 'medium', habitat: 'desert',
    livedIn: ['Mongolia', 'China'], periodRangeMya: [75, 71],
    dimensions: { lengthMeters: 2.0, heightMeters: 0.7, weightKg: 180, speedKmh: 25 },
    images: { ...img('protoceratops'), video: '/videos/dinosaurs/protoceratops/video.mp4' },
    facts: [
      { label: 'Famous Fight', value: 'Fighting Dinosaurs', icon: 'swords', description: 'Fossilized locked in combat with a Velociraptor — the most dramatic fossil ever.' },
      { label: 'Eggs', value: 'First dino eggs', icon: 'egg', description: 'The first dinosaur eggs ever discovered belonged to Protoceratops.' },
      { label: 'Frill', value: 'Small but ornate', icon: 'shield', description: 'Had a modest frill compared to Triceratops — but it varied hugely between individuals.' },
    ],
    description: 'The most dramatic fossil ever found — a Protoceratops locked in eternal combat with a Velociraptor. This sheep-sized ceratopsian was the little cousin of Triceratops and the first dinosaur whose eggs were discovered.',
    longDescription: 'Protoceratops was a basal ceratopsian — an early relative of Triceratops without the giant horns. About the size of a sheep, it was one of the most common dinosaurs in Late Cretaceous Mongolia. Its frill varied enormously between individuals, likely used for display and species recognition. The "Fighting Dinosaurs" specimen — a Protoceratops and Velociraptor preserved mid-combat — is arguably the most famous fossil in the world, capturing a predator-prey interaction frozen in time for 74 million years.',
    kidsDescription: 'Protoceratops was a small, sheep-sized cousin of Triceratops. No big horns, but a cute frill. It\'s famous because of the COOLEST FOSSIL EVER — one Protoceratops was found forever fighting a Velociraptor! They were buried mid-battle in a sandstorm!',
    childFriendlyText: 'Protoceratops was a small, cute dinosaur with a frill. The coolest fossil ever shows one fighting a Velociraptor — frozen in battle forever!',
    scientificSummary: 'Protoceratops andrewsi (Granger & Gregory, 1923) is a protoceratopsid neoceratopsian from the Campanian Djadochta Formation, Mongolia. Among the most abundant dinosaurs known from Central Asia, exhibiting pronounced ontogenetic and individual variation in frill morphology. The "Fighting Dinosaurs" specimen (MPC-D 100/512) preserves a P. andrewsi and Velociraptor mongoliensis in direct combat posture — a taphonomic snapshot of predation behavior. Nests, eggs, and growth series document the complete ontogeny from embryo to adult.',
    discoveries: [{ year: 1923, location: 'Gobi Desert, Mongolia', discoveredBy: 'Roy Chapman Andrews', note: 'First Protoceratops and first dinosaur eggs discovered simultaneously.' }, { year: 1971, location: 'Mongolia', discoveredBy: 'Polish-Mongolian expedition', note: 'The "Fighting Dinosaurs" — Protoceratops vs Velociraptor.' }],
    funFact: 'The first Protoceratops fossils found in the Gobi Desert were thought to be the mythical griffin by ancient Scythian nomads — the beaked skull looks remarkably like a griffin\'s head.',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', clade: 'Dinosauria', order: 'Ornithischia', suborder: 'Ceratopsia', family: 'Protoceratopsidae', genus: 'Protoceratops', species: 'P. andrewsi' },
    relatedDinosaurs: [{ id: 'velociraptor', relationship: 'Predator' }, { id: 'triceratops', relationship: 'Distantly related' }],
    fossilLocations: [{ country: 'Mongolia', region: 'Gobi Desert', coordinates: [44.0, 103.0], specimenName: 'Djadochta Formation' }],
    dangerLevel: 2, intelligence: 3,
  }
