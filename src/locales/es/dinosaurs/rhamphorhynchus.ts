export default {
  name: 'Rhamphorhynchus',
  displayName: 'Ranforrinco',
  pronunciation: 'ram-fo-RIN-co',
  nameMeaning: '«Hocico de Pico»',
  description: 'El Rhamphorhynchus fue un pterosaurio de cola larga del Jurasico Tardio de Europa. Con dientes afilados, cola con diamante terminal y mandibulas amplias, sobrevolaba mares antiguos pescando en vuelo.',
  kidsDescription: 'Rhamphorhynchus tenia una COLA LARGA con un rombo en la punta, ¡como una cometa! Sus dientes apuntaban hacia adelante como agujas. Atrapaba peces planeando sobre las olas.',
  childFriendlyText: 'Ranforrinco significa «Hocico de Pico». Vivia en Alemania. Comia peces. Cola larga con diamante. Reptil volador.',
  scientificSummary: 'Rhamphorhynchus muensteri (Goldfuss, 1831) es un pterosaurio ranforrinquido del Jurasico Tardio. Numerosos fosiles de Solnhofen.',
  funFact: 'Los fosiles de Solnhofen muestran las membranas de las alas con TODO detalle. ¡Podemos ver cada fibra del ala!',
  facts: [
    { label: 'Cola', value: 'Con diamante', description: 'Cola larga y rigida con veleta terminal' },
    { label: 'Dientes', value: 'Proyectados', description: 'Dientes entrelazados para pescar' },
    { label: 'Envergadura', value: '1,8 m', description: 'Un pterosaurio de tamaño medio' },
    { label: 'Edad', value: '150 Ma', description: 'Jurasico Tardio, Solnhofen' },
  ],
  relatedDinosaurs: [
    { id: 'pterodactylus', relationship: 'Contemporáneo' },
    { id: 'dimorphodon', relationship: 'Pariente más antiguo' },
  ],
  discoveries: [
    { year: 1830, location: 'Bavaria, Germany', discoveredBy: 'Georg August Goldfuss', note: 'Descrito por primera vez en las canteras de Solnhofen, junto con Archaeopteryx.' },
  ],
  fossilLocations: [
    { country: 'Germany', region: 'Calizas de Solnhofen, Baviera', coordinates: [48.9, 11.0], specimenName: 'Calizas de Solnhofen, material tipo' },
  ],
}
