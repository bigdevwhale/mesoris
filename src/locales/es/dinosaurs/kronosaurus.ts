export default {
  name: 'Kronosaurus',
  displayName: 'Kronosaurio',
  pronunciation: 'kro-no-SAU-rio',
  nameMeaning: '«Reptil de Cronos»',
  description: 'El Kronosaurus fue uno de los mayores pliosaurios del Cretacico Temprano. Con cabeza de 2,5 metros y dientes enormes, era superdepredador de los mares prehistoricos. No era dinosaurio, sino reptil marino.',
  kidsDescription: '¡Kronosaurus era un MONSTRUO MARINO! Su cabeza media 2,5 metros — ¡mas larga que una cama! Trituraba todo con sus dientes gigantes.',
  childFriendlyText: 'Kronosaurio significa «Reptil de Cronos». Vivia en mares de Australia. Cabeza de 2,5 m. Reptil marino.',
  scientificSummary: 'Kronosaurus queenslandicus (Longman, 1924) es un pliosaurido del Cretacico Temprano. Craneo de 2,5 metros.',
  funFact: 'Su craneo era como un coche pequeño y sus dientes como platanos. Trituraba tortugas como galletas.',
  facts: [
    { label: 'Craneo', value: '2,5 m', description: 'Uno de los mayores craneos marinos' },
    { label: 'Dientes', value: 'Gigantes', description: 'Dientes conicos como platanos' },
    { label: 'Epoca', value: '120 Ma', description: 'Cretacico Temprano' },
    { label: 'Clasificacion', value: 'Pliosaurio', description: 'Reptil marino, no dinosaurio' },
  ],
  relatedDinosaurs: [
    { id: 'elasmosaurus', relationship: 'Pariente lejano' },
    { id: 'tylosaurus', relationship: 'Rival ecologico (anterior)' },
  ],
  discoveries: [
    { discoveredBy: 'Andrew Crombie', note: 'Primera mandibula parcial hallada en el outback de Queensland.' },
    { discoveredBy: 'Albert Heber Longman', note: 'Ejemplar mas completo descubierto cerca de Hughenden.' },
  ],
  fossilLocations: [
    { region: 'Queensland, Australia', specimenName: 'Formacion Toolebuc' },
  ],
}
