export default {
  name: 'Pentaceratops',
  displayName: 'Pentaceratops',
  pronunciation: 'pen-ta-CE-ra-tops',
  nameMeaning: '«Cara de Cinco Cuernos»',
  description: 'El Pentaceratops fue un ceratopsido chasmosaurino del Cretacico Tardio de Norteamerica. A pesar de su nombre, tenia tres cuernos principales (como Triceratops) mas dos protuberancias en las mejillas. Su volante era uno de los mas grandes.',
  kidsDescription: 'Pentaceratops significa «cinco cuernos», aunque realmente tenia TRES cuernos grandes y dos pequeños. ¡Pero su VOLANTE era ENORME!',
  childFriendlyText: 'Pentaceratops significa «Cara de Cinco Cuernos». Norteamerica. Plantas. 8 m. Volante gigante.',
  scientificSummary: 'Pentaceratops sternbergii (Osborn, 1923) es un ceratopsido chasmosaurino. Uno de los volantes mas grandes del grupo.',
  funFact: 'Su volante era tan grande que es uno de los craneos mas largos de cualquier animal terrestre. ¡Casi 3 metros de largo!',
  facts: [
    { label: 'Volante', value: 'Gigante', description: 'Uno de los craneos mas largos conocidos' },
    { label: 'Cuernos', value: '3+2', description: 'Tres principales, dos menores en mejillas' },
    { label: 'Tamaño', value: '8 m', description: 'Un ceratopsido grande' },
    { label: 'Epoca', value: 'Cretacico Tardio', description: '~75 millones de anos' },
  ],
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Pariente ceratopsido posterior' },
    { id: 'styracosaurus', relationship: 'Pariente ceratopsido' },
    { id: 'protoceratops', relationship: 'Ceratopsiano ancestral' },
  ],
  discoveries: [
    { year: 1921, location: 'Condado de San Juan, Nuevo Mexico, USA', discoveredBy: 'Charles H. Sternberg', note: 'Descubierto por Sternberg y descrito por Henry Fairfield Osborn en 1923; nombrado sternbergii en honor a Sternberg.' },
    { year: 1975, location: 'Formacion Kirtland, Nuevo Mexico', discoveredBy: 'Expediciones del American Museum', note: 'Especimenes posteriores, incluido el notable craneo gigante NMMNH P-27083, revelaron la extension completa del volante y cimentaron el record de tamaño craneal.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Condado de San Juan, Nuevo Mexico (Formacion Kirtland)', coordinates: [36.7, -108.0], specimenName: 'AMNH 6325 — craneo holotipo; NMMNH P-27083 — record de craneo gigante' },
  ],
}
