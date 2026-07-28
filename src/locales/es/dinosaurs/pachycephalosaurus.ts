export default {
  name: 'Pachycephalosaurus',
  displayName: 'Paquicefalosaurio',
  pronunciation: 'pa-ki-ce-fa-lo-SAU-rio',
  nameMeaning: '«Reptil de Cabeza Gruesa»',
  description: 'El Pachycephalosaurus es famoso por su gruesa cupula osea en la cabeza, de hasta 25 cm de grosor. Vivia en el Cretacico Tardio de Norteamerica. Se cree que usaban sus cabezas abovedadas para darse cabezazos, como carneros modernos, durante combates rituales.',
  kidsDescription: '¡Pachycephalosaurus tenia una cabeza como un CASCO DE CONSTRUCCION! Su craneo era SUPERTRUPIDO — ¡25 cm de hueso solido! Probablemente chocaban sus cabezas como cabras montesas.',
  childFriendlyText: 'Paquicefalosaurio significa «Reptil de Cabeza Gruesa». Vivia en Norteamerica. Comia plantas. Tenia un craneo de 25 cm de grosor.',
  scientificSummary: 'Pachycephalosaurus wyomingensis (Brown y Schlaikjer, 1943) es un paquicefalosaurido del Cretacico Tardio. El mayor miembro del grupo.',
  funFact: 'Su cabeza era tan gruesa como una puerta de madera. Los cientificos debaten si realmente se daban cabezazos o solo era para exhibicion.',
  facts: [
    { label: 'Craneo', value: '25 cm grueso', description: 'Cupula osea solida, de las mas gruesas conocidas' },
    { label: 'Comportamiento', value: 'Cabezazos', description: 'Probable combate intraespecifico como carneros' },
    { label: 'Tamaño', value: '4,5 m', description: 'Postura bipeda, tamaño medio' },
    { label: 'Dieta', value: 'Herbivoro/omnivoro', description: 'Hojas, semillas, frutas y posiblemente insectos' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Depredador' },
    { id: 'triceratops', relationship: 'Contemporaneo' },
  ],
  discoveries: [
    { year: 1931, location: 'Wyoming, USA', discoveredBy: 'Charles Gilmore', note: 'Primera cupula craneal descubierta.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Wyoming', coordinates: [44.5, -105.0], specimenName: 'Formacion Lance' },
    { country: 'USA', region: 'Montana', coordinates: [47.5, -106.5] },
  ],
}
