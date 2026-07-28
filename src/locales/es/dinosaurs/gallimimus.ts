export default {
  name: 'Gallimimus',
  displayName: 'Galimimo',
  pronunciation: 'ga-li-MI-mo',
  nameMeaning: '«Imitador de Gallina»',
  description: 'El Gallimimus fue uno de los dinosaurios mas grandes parecidos a avestruces. Viviendo en el Cretacico Tardio de Mongolia, probablemente era omnivoro, usando su velocidad para atrapar pequeños animales y su pico para comer plantas.',
  kidsDescription: '¡Gallimimus parecia un AVESTRUZ GIGANTE! Con patas largas, podia correr tan rapido como un coche. Sin dientes, solo un pico. Comia de todo.',
  childFriendlyText: 'Galimimo significa «Imitador de Gallina». Vivia en Mongolia. Comia plantas y animales. Media 6 metros. Era rapidisimo.',
  scientificSummary: 'Gallimimus bullatus (Osmolska et al., 1972) es un ornitomimido del Cretacico Tardio. Es uno de los ornitomimosaurios mas grandes conocidos.',
  funFact: 'Era uno de los dinosaurios mas rapidos — ¡a la misma velocidad que un coche en zona escolar!',
  facts: [
    { label: 'Velocidad', value: '~60 km/h', description: 'Uno de los dinosaurios mas rapidos conocidos' },
    { label: 'Dieta', value: 'Omnivoro', description: 'Plantas, pequeños animales y huevos' },
    { label: 'Apariencia', value: 'Como avestruz', description: 'Cuello largo y pico sin dientes' },
    { label: 'Tamaño', value: '6 m', description: 'Del tamaño de un caballo grande' },
  ],
  relatedDinosaurs: [
    { id: 'ornithomimus', relationship: 'Pariente cercano' },
    { id: 'struthiomimus', relationship: 'Pariente cercano' },
  ],
  discoveries: [
    { discoveredBy: 'Expedición polaco-mongola', note: 'Primeros especímenes descubiertos en la cuenca de Nemegt.' },
  ],
  fossilLocations: [
    { region: 'Desierto de Gobi', specimenName: 'Formación Nemegt' },
  ],
}
