export default {
  name: 'Nomingia',
  displayName: 'Nomingia',
  pronunciation: 'no-MIN-gia',
  nameMeaning: '«De Nomingiin Gobi»',
  description: 'La Nomingia fue un pequeño dinosaurio ovirraptorosaurio del Cretacico Tardio de Mongolia. Con 1,7 metros y un abanico de plumas en la cola como las aves modernas, es uno de los dinosaurios mas avianos conocidos.',
  kidsDescription: 'Nomingia tenia un ABANICO de plumas en la cola, ¡como un pavo real! Un dinosaurio pequeño y elegante con estilo.',
  childFriendlyText: 'Nomingia significa «De Nomingiin Gobi». Mongolia. Omnivoro. 1,7 m. Abanico de plumas en la cola.',
  scientificSummary: 'Nomingia gobiensis (Barsbold et al., 2000) es un ovirraptorosaurio del Cretacico Tardio. Tenia pigostilo y abanico caudal como aves.',
  funFact: 'Tenia un pigostilo — el hueso de la cola donde se anclan las plumas de la cola en las aves. ¡Era un dinosaurio que ya tenia cola de pajaro!',
  facts: [
    { label: 'Cola', value: 'Abanico', description: 'Plumas en abanico como pavo real' },
    { label: 'Pigostilo', value: 'Presente', description: 'Hueso de cola como aves modernas' },
    { label: 'Tamaño', value: '1,7 m', description: 'Un dinosaurio pequeño' },
    { label: 'Epoca', value: 'Cretacico Tardio', description: '~70 millones de anos' },
  ],
  relatedDinosaurs: [
    { id: 'oviraptor', relationship: 'Pariente ovirraptoriano cercano' },
    { id: 'velociraptor', relationship: 'Pariente teropodo maniraptor' },
    { id: 'troodon', relationship: 'Teropodo pequeno contemporaneo' },
  ],
  discoveries: [
    { discoveredBy: 'Rinchen Barsbold y companeros', note: 'Descrito en 2000 por Barsbold y companeros; el pigostilo se convirtiese inmediatamente en una prueba clave en la historia evolutiva de dinosaurio a ave.' },
  ],
  fossilLocations: [
    { region: 'Provincia de Omnogovi, Formacion Nemegt, Mongolia', specimenName: 'GIN 100/119 — esqueleto parcial holotipo con pigostilo' },
  ],
}
