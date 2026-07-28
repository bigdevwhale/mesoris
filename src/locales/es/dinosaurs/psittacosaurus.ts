export default {
  name: 'Psittacosaurus',
  displayName: 'Psitacosaurio',
  pronunciation: 'si-ta-co-SAU-rio',
  nameMeaning: '«Reptil Loro»',
  description: 'El Psittacosaurus fue un pequeño ceratopsio del Cretacico Temprano de Asia, del tamaño de un perro. Con pico de loro, cerdas en la cola y contrasombreado, es uno de los dinosaurios mejor conocidos.',
  kidsDescription: 'Psittacosaurus tenia pico de LORO. Del tamaño de un perro, con pelos raros en la cola. Sabemos su color: marron oscuro arriba y claro abajo.',
  childFriendlyText: 'Psitacosaurio significa «Reptil Loro». China. Plantas. 2 m. Pico de loro y cerdas en la cola.',
  scientificSummary: 'Psittacosaurus mongoliensis (Osborn, 1923) es un ceratopsio psitacosaurido. Melanosomas preservados muestran contrasombreado.',
  funFact: 'Sabemos su color, patrones, incluso cerdas de la cola. ¡Parecia un ciervo con pico de loro!',
  facts: [
    { label: 'Pico', value: 'Como loro', description: 'Curvado y fuerte para cortar plantas' },
    { label: 'Color', value: 'Contrasombreado', description: 'Marron arriba, claro el vientre' },
    { label: 'Cola', value: 'Cerdas', description: 'Filamentos como pincel' },
    { label: 'Tamaño', value: '2 m', description: 'Del tamaño de un perro grande' },
  ],
  relatedDinosaurs: [
    { id: 'protoceratops', relationship: 'Ceratopsio posterior emparentado' },
    { id: 'triceratops', relationship: 'Descendiente lejano con cuernos' },
    { id: 'microraptor', relationship: 'Vecino asiático contemporáneo' },
  ],
  discoveries: [
    { year: 1922, location: 'Mongolia', discoveredBy: 'Henry Fairfield Osborn', note: 'Osborn nombró el género a partir de los primeros hallazgos asiáticos y lo reconoció como un dinosaurio con cuernos primitivo.' },
    { year: 2000, location: 'Liaoning, China', discoveredBy: 'Chinese paleontological teams', note: 'Espectaculares nuevos fósiles preservaron piel, cerdas e incluso posibles grupos de juveniles.' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Liaoning', coordinates: [41.9, 121.7], specimenName: 'Formación Yixian' },
    { country: 'Mongolia', region: 'Ömnögovi', coordinates: [44.5, 108.5], specimenName: 'Capas del Cretácico Temprano' },
  ],
}
