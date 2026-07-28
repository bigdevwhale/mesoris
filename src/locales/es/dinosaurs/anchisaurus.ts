export default {
  name: 'Anchisaurus',
  displayName: 'Anquisaurio',
  pronunciation: 'an-ki-SAU-rio',
  nameMeaning: '«Reptil Cercano»',
  description: 'El Anchisaurus fue un sauropodomorfo basal del Jurasico Temprano de Norteamerica. Con solo 2 metros de largo, fue uno de los primeros dinosaurios herbivoros en Norteamerica. Representa la transicion de pequeños bipedos a gigantes cuadrupedos.',
  kidsDescription: 'Anchisaurus era un dinosaurio pequeño que fue uno de los PRIMEROS en comer plantas en Norteamerica. Sus primos lejanos se convertirian en los sauropodos GIGANTES.',
  childFriendlyText: 'Anquisaurio significa «Reptil Cercano». Norteamerica. Plantas. 2,1 m. Dinosaurio temprano.',
  scientificSummary: 'Anchisaurus polyzelus (Hitchcock, 1865) es un sauropodomorfo basal del Jurasico Temprano. Importante para entender la evolucion de sauropodos.',
  funFact: 'Fue uno de los primeros dinosaurios descubiertos en Norteamerica, encontrado en Connecticut en 1818.',
  facts: [
    { label: 'Tamaño', value: '2,1 m', description: 'Pequeño, del tamaño de un pony' },
    { label: 'Epoca', value: 'Jurasico Temprano', description: '~190 millones de anos' },
    { label: 'Postura', value: 'Bipeda/cuadrupeda', description: 'Transicion entre dos y cuatro patas' },
    { label: 'Importancia', value: 'Evolutiva', description: 'Antepasado de los sauropodos gigantes' },
  ],
  relatedDinosaurs: [
    { id: 'plateosaurus', relationship: 'Pariente sauropodomorfo cercano' },
    { id: 'eoraptor', relationship: 'Pariente dinosaurio temprano lejano' },
  ],
  discoveries: [
    { year: 1818, location: 'Condado de Hartford, Connecticut, EE. UU.', discoveredBy: 'Solomon Ellsworth Jr.', note: 'Huesos encontrados al cavar un pozo; clasificados inicialmente como restos humanos antes del reconocimiento formal de los dinosaurios.' },
    { year: 1885, location: 'Springfield, Massachusetts, EE. UU.', discoveredBy: 'O.C. Marsh', note: 'Marsh describió formalmente y nombró a Anchisaurus basándose en material adicional del Valle del Connecticut.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Condado de Hartford, Connecticut', coordinates: [41.8, -72.7], specimenName: 'Espécimen tipo de la Formación Portland' },
    { country: 'EE. UU.', region: 'Condado de Hampden, Massachusetts', coordinates: [42.1, -72.6], specimenName: 'Material de cantera de Springfield' },
  ],
}
