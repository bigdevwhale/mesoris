export default {
  name: 'Allosaurus',
  displayName: 'Alosaurio',
  pronunciation: 'a-lo-SAU-rio',
  nameMeaning: '«Reptil Diferente»',
  description: 'El Allosaurus fue el principal depredador del Jurasico Tardio en Norteamerica, mucho antes de que el T. rex apareciera. Con mas de 70 dientes afilados, garras de 25 centimetros y la capacidad de abrir la mandibula ampliamente, era un depredador formidable que cazaba los enormes sauropodos de la Formacion Morrison.',
  kidsDescription: 'Allosaurus era el cazador mas peligroso de su tiempo, ¡como un leon gigante de la era de los dinosaurios! Tenia dientes afilados en forma de cuchillo y garras ganchudas para agarrar a sus presas. Cazaba dinosaurios ENORMES varias veces mas grandes que el, ¡trabajando en equipo!',
  childFriendlyText: 'Alosaurio significa «Reptil Diferente». Vivia en Norteamerica. Comia carne. Media 9 metros de largo. Pesaba 2 toneladas.',
  scientificSummary: 'Allosaurus fragilis (Marsh, 1877) es un teropodo alosaurido del Jurasico Tardio. Es el dinosaurio carnivoro mas comun de la Formacion Morrison. Muestra evidencia de comportamiento gregario en multiples yacimientos.',
  funFact: 'Abria la mandibula como una serpiente — podia desencajarla para tragar enormes trozos de carne. ¡Los paleontologos han encontrado huesos de estegosaurio con marcas de dientes de Allosaurus!',
  facts: [
    { label: 'Dientes', value: '70+', description: 'Dientes aserrados como cuchillos de carne' },
    { label: 'Garras', value: '25 cm', description: 'Grandes garras curvas para agarrar presas' },
    { label: 'Comportamiento', value: 'Gregario', description: 'Evidencia de caza en grupo' },
    { label: 'Epoca', value: 'Jurasico Tardio', description: 'El principal depredador 90 millones de anos antes del T. rex' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Presa' },
    { id: 'diplodocus', relationship: 'Presa' },
    { id: 'ceratosaurus', relationship: 'Competidor' },
  ],
  discoveries: [
    { year: 1877, location: 'Colorado, EE. UU.', discoveredBy: 'Othniel Charles Marsh', note: 'Descrito por primera vez durante las Guerras de los Huesos.' },
    { year: 1991, location: 'Wyoming, EE. UU.', discoveredBy: 'Kirby Siber', note: '"Big Al" — uno de los esqueletos de terópodo más completos jamás encontrados.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Utah', coordinates: [39.0, -111.0], specimenName: 'Cantera de Cleveland-Lloyd' },
    { country: 'EE. UU.', region: 'Wyoming', coordinates: [43.0, -107.5] },
    { country: 'Portugal', region: 'Lourinhã', coordinates: [39.3, -9.3] },
  ],
}
