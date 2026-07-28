export default {
  name: 'Kentrosaurus',
  displayName: 'Kentrosaurio',
  pronunciation: 'ken-tro-SAU-rio',
  nameMeaning: '«Reptil con Punta»',
  description: 'El Kentrosaurus fue un estegosaurio del Jurasico Tardio de Africa. Mas pequeño que Stegosaurus, tenia placas solo en la mitad delantera, mientras que atras estaba armado con largas puas.',
  kidsDescription: 'Kentrosaurus era como Stegosaurus pero con PUAS en lugar de placas atras. Su cola era como un mangual medieval.',
  childFriendlyText: 'Kentrosaurio significa «Reptil con Punta». Tanzania, Africa. Plantas. 5 m. Placas delante y puas detras.',
  scientificSummary: 'Kentrosaurus aethiopicus (Hennig, 1915) es un estegosaurio del Jurasico Tardio de Tanzania. Formacion Tendaguru.',
  funFact: 'Cientos de huesos encontrados en Tanzania. Probablemente una manada entera murio junta durante una sequia.',
  facts: [
    { label: 'Defensa', value: 'Placas y puas', description: 'Doble proteccion' },
    { label: 'Cola', value: 'Puas largas', description: 'Puas oseas para defensa activa' },
    { label: 'Tamaño', value: '5 m', description: 'Estegosaurio relativamente pequeño' },
    { label: 'Ubicacion', value: 'Tanzania', description: 'Formacion Tendaguru' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Pariente cercano' },
    { id: 'brachiosaurus', relationship: 'Contemporaneo de Tendaguru' },
    { id: 'allosaurus', relationship: 'Analogo depredador' },
  ],
  discoveries: [
    { discoveredBy: 'Expedicion alemana de Tendaguru', note: 'Las grandes excavaciones recuperaron multiples esqueletos de los famosos yacimientos del Jurasico.' },
    { discoveredBy: 'Edwin Hennig', note: 'Hennig describio formalmente al Kentrosaurus y destaco su inusual disposicion de puas.' },
  ],
  fossilLocations: [
    { region: 'Tendaguru, Tanzania', specimenName: 'Formacion Tendaguru' },
  ],
}
