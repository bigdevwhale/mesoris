export default {
  name: 'Acrocanthosaurus',
  displayName: 'Acrocantosaurio',
  pronunciation: 'a-cro-can-to-SAU-rio',
  nameMeaning: '«Reptil de Espinas Altas»',
  description: 'El Acrocanthosaurus fue un enorme teropodo del Cretacico Temprano de Norteamerica. Sus altas espinas neurales formaban una vela o joroba a lo largo de la espalda. Con 11,5 metros, fue el maximo depredador antes de los tiranosaurios.',
  kidsDescription: 'Acrocanthosaurus era un cazador ENORME con cresta alta en la espalda, ¡como un camello con dientes de tiburon! Goberno antes que el T. rex.',
  childFriendlyText: 'Acrocantosaurio significa «Reptil de Espinas Altas». Norteamerica. Carne. 11,5 m. Vela alta en la espalda.',
  scientificSummary: 'Acrocanthosaurus atokensis (Stovall y Langston, 1950) es un carcarodontosaurido. Espinas neurales formando cresta prominente.',
  funFact: 'Sus espinas formaban una joroba como de camello. Se debate si era vela de piel o joroba muscular.',
  facts: [
    { label: 'Espinas', value: 'Altas', description: 'Espinas neurales larguisimas' },
    { label: 'Tamaño', value: '11,5 m', description: 'Uno de los mayores de su epoca' },
    { label: 'Brazos', value: 'Fuertes', description: 'Tres dedos para agarrar presas' },
    { label: 'Epoca', value: '116-110 Ma', description: 'Antes de los tiranosaurios' },
  ],
  relatedDinosaurs: [
    { id: 'carcharodontosaurus', relationship: 'Pariente cercano' },
    { id: 'sauroposeidon', relationship: 'Presa gigante contemporánea' },
    { id: 'deinonychus', relationship: 'Depredador contemporáneo más pequeño' },
  ],
  discoveries: [
    { year: 1940, location: 'Oklahoma, EE. UU.', discoveredBy: 'J. Willis Stovall y colegas', note: 'Restos importantes de la Formación Antlers revelaron un depredador gigante previamente desconocido.' },
    { year: 1950, location: 'Oklahoma, EE. UU.', discoveredBy: 'J. Willis Stovall y Wann Langston Jr.', note: 'La descripción formal dio a conocer al Acrocanthosaurus en la ciencia.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Oklahoma', coordinates: [34.4, -96.0], specimenName: 'Formación Antlers' },
    { country: 'EE. UU.', region: 'Texas', coordinates: [32.9, -97.4], specimenName: 'Formación Twin Mountains' },
  ],
}
