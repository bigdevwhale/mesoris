export default {
  name: 'Albertosaurus',
  displayName: 'Albertosaurio',
  pronunciation: 'al-ber-to-SAU-rio',
  nameMeaning: '«Reptil de Alberta»',
  description: 'El Albertosaurus fue un tiranosaurido del Cretacico Tardio de Norteamerica. Mas pequeño que T. rex pero igual de peligroso. Se han encontrado casi 30 individuos juntos, sugiriendo comportamiento gregario.',
  kidsDescription: 'Albertosaurus era primo del T. rex, mas pequeño pero igual de feroz. Cazaba en manadas familiares por bosques canadienses.',
  childFriendlyText: 'Albertosaurio significa «Reptil de Alberta». Canada. Carne. 9 m. Tiranosaurido que cazaba en grupo.',
  scientificSummary: 'Albertosaurus sarcophagus (Osborn, 1905) es un tiranosaurido albertosaurino. Yacimiento de Dry Island con 26 individuos.',
  funFact: '¡26 Albertosaurus de todas las edades juntos! Es la mejor evidencia de tiranosaurios viviendo en grupos familiares.',
  facts: [
    { label: 'Tamaño', value: '9 m', description: '75% del T. rex' },
    { label: 'Comportamiento', value: 'Gregario', description: 'Grupos familiares de caza' },
    { label: 'Epoca', value: '71-68 Ma', description: 'Poco antes del T. rex' },
    { label: 'Ubicacion', value: 'Alberta, Canada', description: 'Tiranosaurido dominante regional' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Pariente cercano más grande' },
    { id: 'daspletosaurus', relationship: 'Otro tiranosáurido' },
    { id: 'pachyrhinosaurus', relationship: 'Posible presa' },
  ],
  discoveries: [
    { year: 1884, location: 'Río Red Deer, Alberta, Canadá', discoveredBy: 'Joseph Burr Tyrrell', note: 'El primer material craneal fue encontrado durante una expedición del Servicio Geológico.' },
    { year: 1910, location: 'Alberta, Canadá', discoveredBy: 'Barnum Brown', note: 'Brown descubrió el famoso yacimiento masivo de huesos que transformó la comprensión de la especie.' },
  ],
  fossilLocations: [
    { country: 'Canadá', region: 'Alberta', coordinates: [51.9, -112.9], specimenName: 'Formación Horseshoe Canyon' },
  ],
}
