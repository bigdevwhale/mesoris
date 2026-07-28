export default {
  name: 'Camarasaurus',
  displayName: 'Camarasaurio',
  pronunciation: 'ca-ma-ra-SAU-rio',
  nameMeaning: '«Reptil de Camaras»',
  description: 'El Camarasaurus fue uno de los sauropodos mas comunes y exitosos del Jurasico Tardio de Norteamerica. Con un craneo corto y profundo, dientes grandes en forma de cuchara y 18 metros de largo, era el sauropodo mas abundante de la Formacion Morrison.',
  kidsDescription: 'Camarasaurus era uno de los dinosaurios MAS COMUNES de su tiempo. Con cabeza corta y dientes de cuchara, comia ramas enteras. ¡Era como la vaca del Jurasico!',
  childFriendlyText: 'Camarasaurio significa «Reptil de Camaras». Norteamerica. Plantas. 18 m. Sauropodo muy comun.',
  scientificSummary: 'Camarasaurus supremus (Cope, 1877) es un sauropodo camarasaurido del Jurasico Tardio. El sauropodo mas comun de la Formacion Morrison.',
  funFact: 'Su craneo tenia camaras de aire (huecos) que lo hacian mas ligero. De ahi su nombre. ¡Un dinosaurio con cabeza semihueca!',
  facts: [
    { label: 'Longitud', value: '18 m', description: 'Un sauropodo de tamaño medio-grande' },
    { label: 'Craneo', value: 'Camaras', description: 'Huesos con espacios aereos' },
    { label: 'Epoca', value: 'Jurasico Tardio', description: '~155 millones de anos' },
    { label: 'Abundancia', value: 'Muy comun', description: 'El sauropodo mas abundante' },
  ],
  relatedDinosaurs: [
    { id: 'brachiosaurus', relationship: 'Sauropodo macronario emparentado' },
    { id: 'diplodocus', relationship: 'Sauropodo diplodocido contemporaneo' },
    { id: 'apatosaurus', relationship: 'Diplodocido contemporaneo de la Formacion Morrison' },
  ],
  discoveries: [
    { year: 1877, location: 'Garden Park, Colorado, EE. UU.', discoveredBy: 'Edward Drinker Cope', note: 'Primeros especimenes descritos por Cope en 1877 en el apogeo de las Guerras de los Huesos; varias especies establecidas a partir de material de la Formacion Morrison.' },
    { year: 1925, location: 'Monumento Nacional de los Dinosaurios, Utah, EE. UU.', discoveredBy: 'Equipo del Museo Carnegie', note: 'Esqueletos parciales articulados notables, incluyendo famosos juveniles de "Camarasaurus lentus" que mostraron el rapido crecimiento de la especie.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Garden Park, Colorado (Formacion Morrison)', coordinates: [38.4, -105.1], specimenName: 'AMNH 5761 — material tipo' },
    { country: 'USA', region: 'Monumento Nacional de los Dinosaurios, Utah', coordinates: [40.43, -108.98], specimenName: 'CM 11338 — notable juvenil casi completo' },
    { country: 'USA', region: 'Como Bluff, Wyoming (Formacion Morrison)', coordinates: [41.8, -106.0], specimenName: 'Varios especimenes referidos' },
  ],
}
