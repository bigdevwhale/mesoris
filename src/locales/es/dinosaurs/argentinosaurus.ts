export default {
  name: 'Argentinosaurus',
  displayName: 'Argentinosaurio',
  pronunciation: 'ar-gen-ti-no-SAU-rio',
  nameMeaning: '«Reptil de Argentina»',
  description: 'El Argentinosaurus es posiblemente el animal terrestre mas pesado de todos los tiempos. Este sauropodo titanosaurio del Cretacico Tardio de Argentina alcanzaba 35 metros y 80 toneladas. Solo conocemos unas pocas vertebras, pero son tan enormes que asombran.',
  kidsDescription: '¡Argentinosaurus era GIGANTESCO! Tan largo como TRES autobuses y pesado como 15 elefantes. Una vertebra era mas alta que una persona.',
  childFriendlyText: 'Argentinosaurio significa «Reptil de Argentina». Vivia en Argentina. Plantas. 35 m. 80 toneladas. Animal enorme.',
  scientificSummary: 'Argentinosaurus huinculensis (Bonaparte y Coria, 1993) es un sauropodo titanosaurio. Uno de los dinosaurios mas grandes.',
  funFact: 'Solo tenemos unas pocas vertebras y huesos, pero son TAN ENORMES que sabemos que fue uno de los seres mas grandes que pisaron la Tierra.',
  facts: [
    { label: 'Longitud', value: '35 m', description: 'Uno de los dinosaurios mas largos' },
    { label: 'Peso', value: '~80 toneladas', description: 'Posiblemente el animal terrestre mas pesado' },
    { label: 'Dieta', value: 'Herbivoro', description: 'Cientos de kg de vegetacion al dia' },
    { label: 'Epoca', value: '97-94 Ma', description: 'Cretacico Tardio, Patagonia' },
  ],
  relatedDinosaurs: [
    { id: 'giganotosaurus', relationship: 'Amenaza de depredador' },
    { id: 'apatosaurus', relationship: 'Primo sauropodo lejano' },
    { id: 'sauroposeidon', relationship: 'Gigante rival' },
  ],
  discoveries: [
    { year: 1987, location: 'Neuquén, Argentina', discoveredBy: 'Guillermo Heredia', note: 'Un trabajador rural notó los enormes huesos en la Formación Huincul.' },
    { year: 1993, location: 'Patagonia, Argentina', discoveredBy: 'José Bonaparte y Rodolfo Coria', note: 'La descripción formal estableció al Argentinosaurus como uno de los titanosaurios más grandes conocidos.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Neuquén', coordinates: [-38.7, -69.8], specimenName: 'Formación Huincul' },
  ],
}
