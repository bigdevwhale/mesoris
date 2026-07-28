export default {
  name: 'Jobaria',
  displayName: 'Jobaria',
  pronunciation: 'yo-BA-ria',
  nameMeaning: '«Criatura Mitica Jobar»',
  description: 'La Jobaria fue un gran sauropodo del Jurasico Medio de Africa. Con 18 metros de largo, era uno de los sauropodos mas primitivos que aun conservaban dientes espatulados simples, a diferencia de sus parientes mas avanzados.',
  kidsDescription: 'Jobaria era un sauropodo grande y primitivo de Africa. ¡Su nombre viene de una criatura mitica local! Tenia un cuello largo y comia arboles enteros.',
  childFriendlyText: 'Jobaria era un sauropodo africano. 18 m. Plantas. Jurasico Medio. Niger, Africa.',
  scientificSummary: 'Jobaria tiguidensis (Sereno et al., 1999) es un sauropodo primitivo del Jurasico Medio de Niger. Conserva caracteristicas dentales primitivas.',
  funFact: '¡Su esqueleto estaba tan completo que los paleontologos pudieron montarlo en posicion de carrera, como si galopara!',
  facts: [
    { label: 'Longitud', value: '18 m', description: 'Un gran sauropodo primitivo' },
    { label: 'Epoca', value: 'Jurasico Medio', description: '~167 millones de anos' },
    { label: 'Ubicacion', value: 'Niger, Africa', description: 'Desierto del Sahara' },
    { label: 'Dieta', value: 'Herbivoro', description: 'Dientes espatulados para hojas' },
  ],
  relatedDinosaurs: [
    { id: 'brachiosaurus', relationship: 'Pariente neosauropodo posterior' },
    { id: 'diplodocus', relationship: 'Pariente sauropodo contemporaneo' },
    { id: 'nigersaurus', relationship: 'Contemporaneo africano' },
  ],
  discoveries: [
    { discoveredBy: 'Paul Sereno y equipo', note: 'Espectacular recuperacion de un esqueleto casi completo (~95%) durante una gran expedicion en el Sahara; descrito formalmente en Science en 1999.' },
  ],
  fossilLocations: [
    { region: 'Region de Agadez, Formacion Tiouraren', specimenName: 'MNN TIG3 — holotipo casi completo' },
  ],
}
