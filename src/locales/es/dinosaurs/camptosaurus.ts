export default {
  name: 'Camptosaurus',
  displayName: 'Camptosaurio',
  pronunciation: 'camp-to-SAU-rio',
  nameMeaning: '«Reptil Flexible»',
  description: 'El Camptosaurus fue un ornitopodo del Jurasico Tardio de Norteamerica. Con pico sin dientes delanteros y baterias dentales para triturar plantas, era un herbivoro agil de 7,5 metros que podia caminar en dos o cuatro patas.',
  kidsDescription: 'Camptosaurus era un dinosaurio-flexible. Caminaba en dos o cuatro patas segun necesitara. Con pico para cortar hojas. ¡El SUV de los dinosaurios!',
  childFriendlyText: 'Camptosaurio significa «Reptil Flexible». Norteamerica. Plantas. 7,5 m. Caminaba en 2 o 4 patas.',
  scientificSummary: 'Camptosaurus dispar (Marsh, 1879) es un ornitopodo camptosaurido del Jurasico Tardio. Pariente cercano de Iguanodon.',
  funFact: 'Sus patas traseras eran mucho mas largas que las delanteras. Podia pasar de cuadrupedo a bipedo en un instante.',
  facts: [
    { label: 'Tamaño', value: '7,5 m', description: 'Ornitopodo de tamaño medio' },
    { label: 'Postura', value: 'Flexible', description: 'Dos o cuatro patas' },
    { label: 'Epoca', value: 'Jurasico Tardio', description: '~155 millones de anos' },
    { label: 'Parientes', value: 'Iguanodon', description: 'Antecesor de los iguanodontidos' },
  ],
  relatedDinosaurs: [
    { id: 'iguanodon', relationship: 'Pariente cercano iguanodóntido' },
    { id: 'edmontosaurus', relationship: 'Línea posterior de hadrosáuridos descendientes' },
    { id: 'muttaburrasaurus', relationship: 'Pariente ornitópodo posterior' },
  ],
  discoveries: [
    { discoveredBy: 'O.C. Marsh', note: 'Múltiples especímenes recuperados durante las Guerras de los Huesos; Marsh describió el género en 1879.' },
  ],
  fossilLocations: [
    { region: 'Condado de Albany, Wyoming (Formación Morrison)', specimenName: 'YPM 1877 — material del holotipo' },
    { region: 'Monumento Nacional de los Dinosaurios, Utah', specimenName: 'Especímenes referidos de series de crecimiento' },
  ],
}
