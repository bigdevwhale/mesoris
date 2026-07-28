export default {
  name: 'Saurolophus',
  displayName: 'Saurolofo',
  pronunciation: 'sau-ro-LO-fo',
  nameMeaning: '«Cresta de Reptil»',
  description: 'El Saurolophus fue un hadrosaurio saurolofino del Cretacico Tardio. Con una cresta solida en la cabeza que apuntaba hacia atras, es uno de los pocos dinosaurios encontrados tanto en Norteamerica como en Asia.',
  kidsDescription: 'Saurolophus tenia una cresta que apuntaba hacia atras como un peinado engominado. ¡Y vivia en DOS continentes a la vez!',
  childFriendlyText: 'Saurolofo significa «Cresta de Reptil». Norteamerica y Asia. Plantas. 12 m. Cresta hacia atras.',
  scientificSummary: 'Saurolophus osborni (Brown, 1912) es un hadrosaurio saurolofino. Pocos dinosaurios con distribucion en Norteamerica y Asia.',
  funFact: 'Es uno de los pocos dinosaurios encontrados en dos continentes distintos. ¡Un verdadero viajero global de su epoca!',
  facts: [
    { label: 'Longitud', value: '12 m', description: 'Un saurolofino grande' },
    { label: 'Cresta', value: 'Atras', description: 'Cresta solida hacia atras' },
    { label: 'Distribucion', value: 'Norteamerica y Asia', description: 'Dos continentes' },
    { label: 'Epoca', value: 'Cretacico Tardio', description: '~70-66 millones de anos' },
  ],
  relatedDinosaurs: [
    { id: 'parasaurolophus', relationship: 'Pariente hadrosaurio — evolución convergente de la cresta' },
    { id: 'edmontosaurus', relationship: 'Pariente saurolophino cercano' },
    { id: 'corythosaurus', relationship: 'Hadrosaurio lambeosaurino con cresta' },
  ],
  discoveries: [
    { discoveredBy: 'Barnum Brown', note: 'S. osborni descrito por Brown en 1912 a partir de material de Alberta recolectado para el Museo Americano de Historia Natural.' },
    { discoveredBy: 'Expediciones soviético-mongolas', note: 'Especie asiática S. angustirostris descrita de la Formación Nemegt; más grande que la especie norteamericana.' },
  ],
  fossilLocations: [
    { region: 'Alberta (Formación Horseshoe Canyon)', specimenName: 'AMNH 5220 — holotipo, cráneo completo y esqueleto' },
    { region: 'Provincia de Ömnögovi (Formación Nemegt)', specimenName: 'S. angustirostris — grandes ejemplares asiáticos' },
  ],
}
