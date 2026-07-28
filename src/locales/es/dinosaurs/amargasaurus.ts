export default {
  name: 'Amargasaurus',
  displayName: 'Amargasaurio',
  pronunciation: 'a-mar-ga-SAU-rio',
  nameMeaning: '«Reptil de La Amarga»',
  description: 'El Amargasaurus fue un sauropodo unico con dos filas de espinas extremadamente largas en el cuello, formando una doble vela. Vivia en el Cretacico Temprano de Sudamerica. Era pequeño para un sauropodo — solo 10 metros.',
  kidsDescription: '¡Amargasaurus tenia dos VELAS en el cuello! Como aletas oseas. Un sauropodo pequeño con el PEINADO mas espectacular.',
  childFriendlyText: 'Amargasaurio significa «Reptil de La Amarga». Argentina. Plantas. 10 m. Dos grandes velas en el cuello.',
  scientificSummary: 'Amargasaurus cazaui (Salgado y Bonaparte, 1991) es un sauropodo dicreosaurido. Espinas cervicales extremadamente alargadas.',
  funFact: 'Sus espinas del cuello eran como palos de escoba. Se debate si eran velas o cuernos como de antilope.',
  facts: [
    { label: 'Espinas', value: 'Doble fila', description: 'Espinas larguisimas en el cuello' },
    { label: 'Tamaño', value: '10 m', description: 'Pequeño para un sauropodo' },
    { label: 'Epoca', value: '130 Ma', description: 'Cretacico Temprano, Patagonia' },
    { label: 'Familia', value: 'Dicreosaurido', description: 'Grupo raro de sauropodos' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Primo diplodocoide lejano' },
    { id: 'argentinosaurus', relationship: 'Gigante sudamericano posterior' },
    { id: 'carnotaurus', relationship: 'Depredador regional posterior' },
  ],
  discoveries: [
    { year: 1984, location: 'Neuquén, Argentina', discoveredBy: 'Guillermo Rougier', note: 'El espécimen tipo fue descubierto en la Formación La Amarga de la Patagonia.' },
    { year: 1991, location: 'Argentina', discoveredBy: 'Leonardo Salgado y José Bonaparte', note: 'La descripción formal destacó las extraordinarias espinas cervicales del dinosaurio.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Neuquén', coordinates: [-38.6, -70.2], specimenName: 'Formación La Amarga' },
  ],
}
