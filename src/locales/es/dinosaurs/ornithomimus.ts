export default {
  name: 'Ornithomimus',
  displayName: 'Ornitomimo',
  pronunciation: 'or-ni-to-MI-mo',
  nameMeaning: '«Imitador de Ave»',
  description: 'El Ornithomimus era un dinosaurio parecido a un avestruz moderno. Con patas largas para la velocidad, pico sin dientes y brazos largos, vivio en el Cretacico Tardio de Norteamerica. Fue de los primeros dinosaurios con evidencia de plumas en todas las etapas de vida.',
  kidsDescription: '¡Ornithomimus era como un avestruz con brazos largos y cola de reptil! Muy veloz. Ahora sabemos que tenia PLUMAS — ¡como un pajaro gigante que no volaba!',
  childFriendlyText: 'Ornitomimo significa «Imitador de Ave». Vivia en Norteamerica. Comia plantas y bichos. Media 4 m. Muy rapido y con plumas.',
  scientificSummary: 'Ornithomimus velox (Marsh, 1890) es un ornitomimido del Cretacico Tardio. Fosiles recientes preservan plumas filamentosas.',
  funFact: 'Los fosiles canadienses de Ornithomimus conservan plumas reales fosilizadas, demostrando que incluso los dinosaurios no voladores tenian plumaje.',
  facts: [
    { label: 'Plumas', value: 'Confirmado', description: 'Evidencia fosil de plumas en todo el cuerpo' },
    { label: 'Velocidad', value: '~50 km/h', description: 'Extremidades largas para correr' },
    { label: 'Pico', value: 'Sin dientes', description: 'Pico queratinoso como las aves modernas' },
    { label: 'Tamaño', value: '4 m', description: 'Del tamaño de un avestruz grande' },
  ],
  relatedDinosaurs: [
    { id: 'gallimimus', relationship: 'Pariente cercano' },
    { id: 'struthiomimus', relationship: 'Pariente cercano' },
  ],
  discoveries: [
    { discoveredBy: 'Othniel Charles Marsh', note: 'Descrito por primera vez durante las Guerras de los Huesos.' },
    { discoveredBy: 'Francois Therrien', note: 'Ejemplares con plumas descubiertos con plumaje preservado.' },
  ],
  fossilLocations: [
    { region: 'Alberta', specimenName: 'Formación Horseshoe Canyon' },
    { region: 'Colorado', specimenName: '' },
  ],
}
