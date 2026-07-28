export default {
  name: 'Stegosaurus',
  displayName: 'Estegosaurio',
  pronunciation: 'es-te-go-SAU-rio',
  nameMeaning: '«Reptil con Techo»',
  description: 'El Stegosaurus es uno de los dinosaurios mas reconocibles gracias a sus distintivas placas dorsales y su cola con puas. Vivio durante el Jurasico Tardio en Norteamerica. Era un herbivoro de movimiento lento con un cerebro del tamaño de una nuez. Sus placas dorsales probablemente servian para exhibicion y termorregulacion.',
  kidsDescription: 'Stegosaurus es facil de reconocer — ¡tiene grandes placas en la espalda y puas en la cola! Sus placas eran como paneles solares que lo ayudaban a calentarse. Su cerebro era muy pequeño (del tamaño de una nuez), ¡pero aun asi sobrevivio millones de años!',
  childFriendlyText: 'Estegosaurio significa «Reptil con Techo». Vivia en Norteamerica. Comia plantas. Media 9 metros de largo. Tenia placas en la espalda y cuatro puas en la cola.',
  scientificSummary: 'Stegosaurus stenops (Marsh, 1877) es un estegosaurio del Jurasico Tardio de la Formacion Morrison. Se debate la disposicion y funcion de sus placas dorsales. El mito de un «segundo cerebro» probablemente se refiere al cuerpo de glucogeno en la cadera.',
  funFact: 'Usaba la cola con puas como un garrote — ¡los paleontologos han encontrado huesos de Allosaurus con agujeros que encajan perfectamente con las puas de Stegosaurus!',
  facts: [
    { label: 'Placas', value: '~17', description: 'Grandes placas oseas en forma de diamante en dos filas alternadas' },
    { label: 'Cola con Puas', value: '4 puas', description: 'El «thagomizer» — una formidable arma defensiva' },
    { label: 'Tamaño del Cerebro', value: 'Tamano de nuez', description: 'Uno de los cerebros mas pequeños en relacion al cuerpo' },
    { label: 'Dieta', value: 'Plantas bajas', description: 'Probablemente pastaba musgos, helechos y cicas' },
  ],
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Depredador' },
    { id: 'diplodocus', relationship: 'Contemporáneo' },
  ],
  discoveries: [
    { discoveredBy: 'Othniel Charles Marsh', note: 'Primeros fósiles de Stegosaurus descritos de la Formación Morrison.' },
    { discoveredBy: 'Bob Simon', note: '"Sophie": el esqueleto de Stegosaurus más completo jamás encontrado.' },
  ],
  fossilLocations: [
    { region: 'Colorado', specimenName: 'Formación Morrison' },
    { region: 'Wyoming' },
  ],
}
