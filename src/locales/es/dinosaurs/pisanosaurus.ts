export default {
  name: 'Pisanosaurus',
  displayName: 'Pisanosaurio',
  pronunciation: 'pi-sa-no-SAU-rio',
  nameMeaning: '«Reptil de Pisano»',
  description: 'El Pisanosaurus fue uno de los dinosaurios ornitisquios mas antiguos conocidos. Viviendo en el Triasico Tardio de Sudamerica, era un pequeño herbivoro de solo 1 metro de largo. Representa el inicio de la linea evolutiva que llevaria a Triceratops e Iguanodon.',
  kidsDescription: 'Pisanosaurus era DIMINUTO — ¡solo 1 metro de largo! Pero fue uno de los PRIMEROS dinosaurios con pico para cortar plantas. ¡El tatarabuelo de Triceratops!',
  childFriendlyText: 'Pisanosaurio significa «Reptil de Pisano». Argentina. Plantas. 1 m. Dinosaurio muy antiguo.',
  scientificSummary: 'Pisanosaurus mertii (Casamiquela, 1967) es uno de los ornitisquios mas antiguos conocidos del Triasico Tardio. Su clasificacion exacta se debate.',
  funFact: 'Es tan antiguo que los paleontologos discuten si realmente es un ornitisquio o algo mas primitivo todavia.',
  facts: [
    { label: 'Tamaño', value: '1 m', description: 'Diminuto, como un gato grande' },
    { label: 'Edad', value: '~228 Ma', description: 'Uno de los ornitisquios mas antiguos' },
    { label: 'Ubicacion', value: 'Argentina', description: 'Sudamerica, Triasico Tardio' },
    { label: 'Importancia', value: 'Ancestral', description: 'Origen de los dinosaurios con pico' },
  ],
  relatedDinosaurs: [
    { id: 'eoraptor', relationship: 'Contemporaneo de la misma formacion' },
    { id: 'herrerasaurus', relationship: 'Depredador contemporaneo de la misma formacion' },
  ],
  discoveries: [
    { year: 1962, location: 'Ischigualasto, Provincia de San Juan, Argentina', discoveredBy: 'Galileo J. Scaglia', note: 'Unico especimen fragmentario recolectado; descrito formalmente por Rodolfo Casamiquela en 1967.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Provincia de San Juan, Formacion Ischigualasto', coordinates: [-30.0, -67.9], specimenName: 'PULR 08 — esqueleto parcial holotipo' },
  ],
}
