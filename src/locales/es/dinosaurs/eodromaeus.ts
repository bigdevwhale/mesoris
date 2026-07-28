export default {
  name: 'Eodromaeus',
  displayName: 'Eodromeo',
  pronunciation: 'e-o-DRO-me-o',
  nameMeaning: '«Corredor del Amanecer»',
  description: 'El Eodromaeus fue un pequeño dinosaurio carnivoro del Triasico Tardio de Sudamerica. Descubierto en el Valle de la Luna argentino, este depredador de 1,2 metros esta muy cerca del ancestro comun de todos los dinosaurios carnivoros.',
  kidsDescription: 'Eodromaeus significa «Corredor del Amanecer». Pequeño, ligero y RAPIDO, fue uno de los primeros dinosaurios carnivoros. ¡El pionero de los cazadores!',
  childFriendlyText: 'Eodromeo significa «Corredor del Amanecer». Argentina. Carne. 1,2 m. Primeros carnivoros.',
  scientificSummary: 'Eodromaeus murphi (Martinez et al., 2011) es un teropodo basal del Triasico Tardio. Proporciona datos sobre la evolucion temprana de los teropodos.',
  funFact: 'Vivia junto al Eoraptor en Argentina, mostrando que los carnivoros y herbivoros ya se habian separado al inicio de la era de los dinosaurios.',
  facts: [
    { label: 'Tamaño', value: '1,2 m', description: 'Pequeño, como un zorro' },
    { label: 'Edad', value: '~230 Ma', description: 'Triasico Tardio temprano' },
    { label: 'Velocidad', value: 'Alta', description: 'Construido para correr' },
    { label: 'Ubicacion', value: 'Argentina', description: 'Valle de la Luna' },
  ],
  relatedDinosaurs: [
    { id: 'eoraptor', relationship: 'Contemporáneo de la misma formación' },
    { id: 'herrerasaurus', relationship: 'Depredador contemporáneo de mayor tamaño' },
    { id: 'coelophysis', relationship: 'Pariente cercano posterior' },
  ],
  discoveries: [
    { year: 2011, location: 'Parque Provincial Ischigualasto, San Juan, Argentina', discoveredBy: 'Ricardo N. Martínez et al.', note: 'Esqueleto casi completo descrito en la revista Science; nombrado «murphi» en honor a James Murphy, un benefactor del museo.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Provincia de San Juan, Formación Ischigualasto', coordinates: [-30.0, -67.9], specimenName: 'PVSJ 562 — esqueleto holotipo casi completo' },
  ],
}
