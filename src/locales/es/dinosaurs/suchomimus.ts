export default {
  name: 'Suchomimus',
  displayName: 'Sucomimo',
  pronunciation: 'su-co-MI-mo',
  nameMeaning: '«Imitador de Cocodrilo»',
  description: 'El Suchomimus fue un espinosaurido del Cretacico Temprano de Africa. Con hocico largo como cocodrilo, dientes conicos y vela baja, era un pescador especializado.',
  kidsDescription: 'Suchomimus parecia un COCODRILO GIGANTE. Vadeaba en rios atrapando peces. Con una vela baja en la espalda.',
  childFriendlyText: 'Sucomimo significa «Imitador de Cocodrilo». Niger, Africa. Peces. 11 m. Hocico de cocodrilo.',
  scientificSummary: 'Suchomimus tenerensis (Sereno et al., 1998) es un espinosaurido del Cretacico Temprano. Estrechamente relacionado con Baryonyx.',
  funFact: 'Su craneo era casi identico al de un gavial, el cocodrilo pescador de la India.',
  facts: [
    { label: 'Hocico', value: 'Como gavial', description: 'Largo y estrecho para peces' },
    { label: 'Vela', value: 'Baja', description: 'Menos prominente que Spinosaurus' },
    { label: 'Tamaño', value: '11 m', description: 'Un gran espinosaurido' },
    { label: 'Dieta', value: 'Piscivora', description: 'Peces de agua dulce' },
  ],
  relatedDinosaurs: [
    { id: 'baryonyx', relationship: 'Pariente cercano' },
    { id: 'spinosaurus', relationship: 'Primo mayor' },
    { id: 'nigersaurus', relationship: 'Vecino contemporáneo' },
  ],
  discoveries: [
    { discoveredBy: 'Paul Sereno y equipo', note: 'Se descubrió un esqueleto notablemente completo durante una gran expedición sahariana.' },
    { discoveredBy: 'Paul Sereno y colegas', note: 'La descripción formal estableció a Suchomimus como un espinosáurido barionicino gigante.' },
  ],
  fossilLocations: [
    { region: 'Gadoufaoua', specimenName: 'Formación Elrhaz' },
  ],
}
