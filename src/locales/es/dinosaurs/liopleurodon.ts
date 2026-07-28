export default {
  name: 'Liopleurodon',
  displayName: 'Liopleurodonte',
  pronunciation: 'lio-pleu-ro-DON-te',
  nameMeaning: '«Diente de Lado Liso»',
  description: 'El Liopleurodon fue un pliosaurio del Jurasico Medio con mandibulas enormes y dientes formidables. Aunque la television lo exagero a 25 metros, la realidad (6-7 metros) no es menos impresionante.',
  kidsDescription: 'Liopleurodon era un gran depredador marino con mandibulas de cocodrilo. La tele lo hizo GIGANTESCO, ¡pero en realidad media 7 metros!',
  childFriendlyText: 'Liopleurodonte significa «Diente Liso». Mares europeos. Peces y reptiles. 7 m. Reptil marino.',
  scientificSummary: 'Liopleurodon ferox (Sauvage, 1873) es un pliosaurido del Jurasico Medio. Sobreestimado en documentales.',
  funFact: 'La BBC lo mostro como monstruo de 25 metros. Los paleontologos se enfadaron. En realidad media 7 m.',
  facts: [
    { label: 'Longitud', value: '7 m', description: 'Grande, pero no 25 m' },
    { label: 'Dieta', value: 'Carnivoro marino', description: 'Peces, calamares y reptiles' },
    { label: 'Epoca', value: '166 Ma', description: 'Jurasico Medio' },
    { label: 'Fama', value: 'Exagerado', description: 'La television lo agrando' },
  ],
  relatedDinosaurs: [
    { id: 'kronosaurus', relationship: 'Análogo pliosaurio posterior' },
    { id: 'plesiosaurus', relationship: 'Pariente plesiosaurio distante' },
    { id: 'ichthyosaurus', relationship: 'Contemporáneo marino' },
  ],
  discoveries: [
    { discoveredBy: 'Henri-Émile Sauvage', note: 'Dientes y material mandibular formaron la base para nombrar a Liopleurodon.' },
    { discoveredBy: 'Numerosos coleccionistas y museos', note: 'Material de Oxford Clay de Gran Bretaña ayudó más tarde a los paleontólogos a entender mejor al animal.' },
  ],
  fossilLocations: [
    { region: 'Pas-de-Calais', specimenName: 'Depósitos marinos del Calloviense' },
    { region: 'Oxfordshire', specimenName: 'Formación Oxford Clay' },
  ],
}
