export default {
  name: 'Pterodactylus',
  displayName: 'Pterodactilo',
  pronunciation: 'te-ro-DAC-ti-lo',
  nameMeaning: '«Dedo Alado»',
  description: 'El Pterodactylus fue uno de los primeros pterosaurios descubiertos. Viviendo en el Jurasico Tardio de Europa, era un reptil volador pequeño con envergadura de un metro. Sus alas estaban soportadas por un cuarto dedo alargado.',
  kidsDescription: 'Pterodactylus era un volador pequeño del tamaño de un pajaro grande. Con alas de piel como un murcielago, ¡pero hechas con su dedo gigante! Volaba sobre lagos buscando pececitos.',
  childFriendlyText: 'Pterodactilo significa «Dedo Alado». Vivia en Alemania. Comia peces pequeños. Envergadura de 1 m.',
  scientificSummary: 'Pterodactylus antiquus (von Sommerring, 1812) es un pterosaurio pterodactilido del Jurasico Tardio. Es el primer pterosaurio descrito.',
  funFact: 'Cuando se descubrio, algunos cientificos pensaron que era un animal nadador y que sus alas eran aletas.',
  facts: [
    { label: 'Envergadura', value: '1 m', description: 'Pequeño, del tamaño de un pajaro grande' },
    { label: 'Dedo', value: '4to alargado', description: 'El cuarto dedo soportaba toda el ala' },
    { label: 'Edad', value: '150 Ma', description: 'Jurasico Tardio, Solnhofen' },
    { label: 'Dieta', value: 'Peces pequenos', description: 'Se alimentaba en lagos y mares someros' },
  ],
  relatedDinosaurs: [
    { id: 'pteranodon', relationship: 'Descendiente más grande' },
    { id: 'dimorphodon', relationship: 'Pariente más antiguo' },
  ],
  discoveries: [
    { year: 1784, location: 'Bavaria, Germany', discoveredBy: 'Cosimo Alessandro Collini', note: 'Primer fósil de pterosaurio jamás descubierto: Collini pensó que era un animal acuático.' },
  ],
  fossilLocations: [
    { country: 'Germany', region: 'Baviera', coordinates: [48.9, 11.0], specimenName: 'Calizas de Solnhofen' },
  ],
}
