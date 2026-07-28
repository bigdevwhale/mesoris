export default {
  name: 'Charonosaurus',
  displayName: 'Carontosaurio',
  pronunciation: 'ca-ron-to-SAU-rio',
  nameMeaning: '«Reptil de Caronte»',
  description: 'El Charonosaurus fue un hadrosaurio lambeosaurino del Cretacico Tardio de China. Con 13 metros y una cresta grande, era uno de los dinosaurios pico de pato mas grandes de Asia.',
  kidsDescription: 'Charonosaurus tenia nombre de barquero del inframundo griego. ¡Pero era un gigante pacifico con cresta elegante que comia plantas!',
  childFriendlyText: 'Carontosaurio significa «Reptil de Caronte». China. Plantas. 13 m. Hadrosaurio crestado gigante.',
  scientificSummary: 'Charonosaurus jiayinensis (Godefroit et al., 2000) es un hadrosaurio lambeosaurino del Cretacico Tardio. Pariente cercano de Parasaurolophus.',
  funFact: 'Era como un Parasaurolophus pero MAS GRANDE. Su cresta probablemente producia sonidos aun mas profundos.',
  facts: [
    { label: 'Longitud', value: '13 m', description: 'Un lambeosaurino muy grande' },
    { label: 'Cresta', value: 'Similar a Parasaurolophus', description: 'Cresta tubular grande' },
    { label: 'Epoca', value: 'Cretacico Tardio', description: '~66 millones de anos' },
    { label: 'Ubicacion', value: 'Noreste de China', description: 'Provincia de Heilongjiang' },
  ],
  relatedDinosaurs: [
    { id: 'parasaurolophus', relationship: 'Pariente conocido mas cercano — cresta casi identica' },
    { id: 'corythosaurus', relationship: 'Pariente hadrosaurio lambeosaurino' },
    { id: 'lambeosaurus', relationship: 'Pariente hadrosaurio lambeosaurino' },
  ],
  discoveries: [
    { year: 2000, location: 'Jiayin, Provincia de Heilongjiang, China', discoveredBy: 'Pascal Godefroit et al.', note: 'Descrito en 2000 por Godefroit y compania a partir de material recolectado cerca del rio Amur; nombrado por el mitologico Caronte debido a la ubicacion en la frontera del rio.' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Distrito de Jiayin, Provincia de Heilongjiang (Formacion Yuliangze)', coordinates: [48.8, 130.4], specimenName: 'IVPP V12735 — holotipo, craneo parcial y esqueleto' },
  ],
}
