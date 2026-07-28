export default {
  name: 'Eoraptor',
  displayName: 'Eoraptor',
  pronunciation: 'e-o-RAP-tor',
  nameMeaning: '«Ladron del Amanecer»',
  description: 'El Eoraptor fue uno de los dinosaurios mas antiguos conocidos, viviendo en el Triasico Tardio de Sudamerica hace 231 millones de anos. Era pequeño — del tamaño de un perro — bipedo y probablemente omnivoro. Representa al ancestro comun de todos los dinosaurios.',
  kidsDescription: '¡Eoraptor fue uno de los PRIMERISIMOS dinosaurios! Del tamaño de un perro, correteaba por Argentina hace 230 millones de anos. ¡Los dinosaurios apenas empezaban!',
  childFriendlyText: 'Eoraptor significa «Ladron del Amanecer». Vivia en Argentina. Comia de todo. 1,7 m. Uno de los primeros dinosaurios.',
  scientificSummary: 'Eoraptor lunensis (Sereno et al., 1993) es uno de los dinosaurios mas tempranos. Posicion basal cerca de la divergencia saurisquia.',
  funFact: 'Los cientificos no saben si era ancestro de carnivoros o herbivoros. Representa cuando ambos grupos apenas se separaban.',
  facts: [
    { label: 'Edad', value: '231 Ma', description: 'Uno de los dinosaurios mas antiguos' },
    { label: 'Tamaño', value: '1,7 m', description: 'Del tamaño de un perro mediano' },
    { label: 'Dieta', value: 'Omnivoro', description: 'Plantas, insectos y pequeños vertebrados' },
    { label: 'Importancia', value: 'Evolutiva', description: 'Cercano al ancestro de todos los dinosaurios' },
  ],
  relatedDinosaurs: [
    { id: 'herrerasaurus', relationship: 'Contemporáneo' },
    { id: 'plateosaurus', relationship: 'Descendiente posterior' },
  ],
  discoveries: [
    { year: 1991, location: 'San Juan, Argentina', discoveredBy: 'Ricardo Martínez', note: 'Descubierto en la misma formación del Valle de la Luna que Herrerasaurus.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'San Juan', coordinates: [-30.0, -68.0], specimenName: 'Valle de la Luna, Formación Ischigualasto' },
  ],
}
