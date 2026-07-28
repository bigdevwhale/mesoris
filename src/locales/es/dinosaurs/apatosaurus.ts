export default {
  name: 'Apatosaurus',
  displayName: 'Apatosaurio',
  pronunciation: 'a-pa-to-SAU-rio',
  nameMeaning: '«Reptil Engañoso»',
  description: 'El Apatosaurus fue un enorme sauropodo que vivio durante el Jurasico Tardio en Norteamerica. Con un cuerpo pesado y un cuello relativamente grueso, era uno de los animales terrestres mas masivos. Durante muchos anos se le conocio popularmente como «Brontosaurio», aunque Apatosaurus es el nombre cientifico correcto.',
  kidsDescription: 'Apatosaurus era un gigante gentil con un cuello larguisimo. Caminaba en cuatro patas como un elefante, ¡pero pesaba 10 veces mas! Su cuello en forma de latigo podia alcanzar las ramas mas altas. Durante mucho tiempo, la gente lo llamo Brontosaurio.',
  childFriendlyText: 'Apatosaurio significa «Reptil Engañoso». Vivia en Norteamerica. Comia plantas. Media 23 metros de largo. Pesaba 30 toneladas.',
  scientificSummary: 'Apatosaurus ajax (Marsh, 1877) es un sauropodo diplodocido del Jurasico Tardio. Historicamente confundido con Brontosaurus. Las vertebras cervicales muestran una construccion mas robusta que Diplodocus.',
  funFact: '¡Los bebes de Apatosaurus crecian a un ritmo increible! Empezaban del tamaño de un gato y en solo 10 anos se convertian en gigantes de 20 metros.',
  facts: [
    { label: 'Longitud', value: '23 m', description: 'Mas largo que tres autobuses en fila' },
    { label: 'Cuello', value: '6 m', description: 'Robusto y flexible, con 15 vertebras' },
    { label: 'Esperanza de Vida', value: '100+ anos', description: 'Posiblemente uno de los dinosaurios mas longevos' },
    { label: 'Confusion Historica', value: 'Brontosaurio', description: 'Popularmente llamado Brontosaurio durante un siglo' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Pariente cercano' },
    { id: 'allosaurus', relationship: 'Depredador' },
    { id: 'brachiosaurus', relationship: 'Contemporáneo' },
  ],
  discoveries: [
    { year: 1877, location: 'Colorado, EE. UU.', discoveredBy: 'Othniel Charles Marsh', note: 'Descrito por primera vez durante las Guerras de los Huesos.' },
    { year: 1895, location: 'Wyoming, EE. UU.', discoveredBy: 'Expedición del AMNH', note: 'Espécimen más completo.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Wyoming', coordinates: [43.0, -107.5], specimenName: 'Formación Morrison' },
    { country: 'EE. UU.', region: 'Colorado', coordinates: [39.5, -105.0] },
  ],
}
