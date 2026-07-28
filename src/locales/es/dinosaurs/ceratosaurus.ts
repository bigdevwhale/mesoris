export default {
  name: 'Ceratosaurus',
  displayName: 'Ceratosaurio',
  pronunciation: 'ce-ra-to-SAU-rio',
  nameMeaning: '«Reptil con Cuerno»',
  description: 'El Ceratosaurus fue un depredador de tamaño medio que vivio durante el Jurasico Tardio. Con un cuerno nasal distintivo, cuatro dedos en las manos y placas oseas a lo largo de la espalda, era uno de los cazadores mas singulares de la Formacion Morrison.',
  kidsDescription: '¡Ceratosaurus tenia un cuerno en la nariz como un rinoceronte! Y placas oseas en la espalda como una armadura. Era mas pequeño que sus primos los alosaurios, ¡pero igual de peligroso!',
  childFriendlyText: 'Ceratosaurio significa «Reptil con Cuerno». Vivia en Norteamerica. Comia carne. Media 7 metros de largo. Tenia un cuerno en la nariz.',
  scientificSummary: 'Ceratosaurus nasicornis (Marsh, 1884) es un ceratosaurido del Jurasico Tardio. Se distingue por su cuerno nasal y su cuarto dedo funcional, una caracteristica primitiva entre los teropodos.',
  funFact: 'Era uno de los pocos dinosaurios carnivoros grandes que conservaba cuatro dedos en las manos en lugar de tres.',
  facts: [
    { label: 'Cuerno', value: 'Nasal', description: 'Un cuerno oseo en la nariz, probablemente para exhibicion' },
    { label: 'Dedos', value: '4', description: 'Conservaba el cuarto dedo, inusual para un teropodo' },
    { label: 'Placas', value: 'Osteodermos', description: 'Pequeñas placas oseas a lo largo de la espalda' },
    { label: 'Tamaño', value: '7 m', description: 'Un depredador de tamaño medio en su ecosistema' },
  ],
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Competidor' },
    { id: 'carnotaurus', relationship: 'Pariente lejano' },
  ],
  discoveries: [
    { year: 1883, location: 'Colorado, EE. UU.', discoveredBy: 'Marshall P. Felch', note: 'Primer esqueleto descubierto en Garden Park.' },
    { year: 2000, location: 'Portugal', discoveredBy: 'Octavio Mateus', note: 'El especimen europeo confirmo el amplio rango del genero.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Colorado', coordinates: [38.5, -105.0], specimenName: 'Formacion Morrison' },
    { country: 'Portugal', region: 'Lourinha', coordinates: [39.3, -9.3] },
  ],
}
