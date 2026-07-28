export default {
  name: 'Diplodocus',
  displayName: 'Diplodoco',
  pronunciation: 'di-PLO-do-co',
  nameMeaning: '«Doble Viga»',
  description: 'El Diplodocus fue uno de los dinosaurios mas largos conocidos. Viviendo en el Jurasico Tardio de Norteamerica, este sauropodo de 27 metros de largo tenia una cola increiblemente larga, similar a un latigo, que podia haber producido estampidos supersonicos. Su cuerpo era relativamente ligero para su tamaño, y se alimentaba de helechos, cicas y coniferas.',
  kidsDescription: '¡Diplodocus era LARGUISIMO! Media 27 metros — ¡casi tan largo como una cancha de baloncesto! Su cola era tan larga como un latigo y podia agitarla muy rapido. Su cuello era tan largo que podia alcanzar arboles a lo lejos sin mover su enorme cuerpo.',
  childFriendlyText: 'Diplodoco significa «Doble Viga». Vivia en Norteamerica. Comia plantas. Media 27 metros de largo. Tenia una cola muy larga como un latigo.',
  scientificSummary: 'Diplodocus (Marsh, 1878) es un sauropodo diplodocido del Jurasico Tardio. Se distingue por su cola extremadamente larga y su craneo alargado con dientes en la parte frontal. Los dientes muestran un patron de reemplazo rapido.',
  funFact: 'Su cola era tan larga y flexible que los cientificos creen que podia restallarla como un latigo. ¡El estampido podria haber sido mas fuerte que el de un avion de combate!',
  facts: [
    { label: 'Longitud', value: '27 m', description: 'Uno de los dinosaurios mas largos jamas descubiertos' },
    { label: 'Cola', value: 'Como un latigo', description: 'Vertebras caudales extremadamente alargadas' },
    { label: 'Dieta', value: 'Plantas a baja altura', description: 'Su cuello era mas horizontal que vertical' },
    { label: 'Peso', value: '16 toneladas', description: 'Relativamente ligero para su enorme longitud' },
  ],
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: 'Pariente cercano' },
    { id: 'allosaurus', relationship: 'Depredador' },
    { id: 'brachiosaurus', relationship: 'Contemporaneo' },
  ],
  discoveries: [
    { year: 1877, location: 'Colorado, EE. UU.', discoveredBy: 'Samuel Wendell Williston', note: 'Primeros fosiles encontrados en Canon City.' },
    { year: 1899, location: 'Wyoming, EE. UU.', discoveredBy: 'Expedicion de la AMNH', note: 'Esqueleto mas completo en Sheep Creek.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Wyoming', coordinates: [43.0, -107.5], specimenName: 'Formacion Morrison' },
    { country: 'EE. UU.', region: 'Colorado', coordinates: [39.5, -105.0] },
  ],
}
