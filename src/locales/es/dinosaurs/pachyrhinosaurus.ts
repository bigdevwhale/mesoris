export default {
  name: 'Pachyrhinosaurus',
  displayName: 'Paquirrinosaurio',
  pronunciation: 'pa-ki-rri-no-SAU-rio',
  nameMeaning: '«Reptil de Nariz Gruesa»',
  description: 'El Pachyrhinosaurus fue un ceratopsio inusual: en lugar de cuernos, tenia un grueso bulto oseo en la nariz. Vivia en el Cretacico Tardio de Norteamerica. Estos bultos quizas eran bases para estructuras de queratina.',
  kidsDescription: 'Pachyrhinosaurus era un dinosaurio con cuernos ¡pero sin cuernos! Tenia una almohadilla osea GIGANTE en la nariz. En vez de cornear, EMPUJABA a sus rivales.',
  childFriendlyText: 'Paquirrinosaurio significa «Nariz Gruesa». Vivia en Canada y Alaska. Comia plantas. Bulto oseo en lugar de cuernos.',
  scientificSummary: 'Pachyrhinosaurus canadensis (Sternberg, 1950) es un ceratopsido centrosaurino. Inusual por carecer de cuernos faciales.',
  funFact: '¡Vivia tan al norte como Alaska! Soportaba inviernos helados y meses de oscuridad, como los bueyes almizcleros.',
  facts: [
    { label: 'Jefe Nasal', value: 'Grueso bulto', description: 'Bulto oseo en lugar de cuerno nasal' },
    { label: 'Volante', value: 'Elaborado', description: 'Volante con ganchos y puas' },
    { label: 'Habitat', value: 'Artico', description: 'Soportaba climas frios del extremo norte' },
    { label: 'Tamaño', value: '8 m', description: 'Un ceratopsido de tamaño medio-grande' },
  ],
  relatedDinosaurs: [
    { id: 'styracosaurus', relationship: 'Pariente cercano' },
    { id: 'triceratops', relationship: 'Pariente' },
  ],
  discoveries: [
    { year: 1946, location: 'Alberta, Canada', discoveredBy: 'Charles M. Sternberg', note: 'Primer craneo descubierto.' },
    { year: 1970, location: 'Alberta, Canada', discoveredBy: 'Al Lakusta', note: 'Yacimiento masivo con cientos de individuos.' },
  ],
  fossilLocations: [
    { country: 'Canada', region: 'Alberta', coordinates: [55.0, -118.0], specimenName: 'Formacion Wapiti' },
    { country: 'USA', region: 'Alaska', coordinates: [69.0, -151.0], specimenName: 'Formacion Prince Creek' },
  ],
}
