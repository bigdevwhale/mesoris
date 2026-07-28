export default {
  name: 'Plesiosaurus',
  displayName: 'Plesiosaurio',
  pronunciation: 'ple-sio-SAU-rio',
  nameMeaning: '«Cercano a Reptil»',
  description: 'El Plesiosaurus fue el reptil marino tipo del grupo. Viviendo en el Jurasico Temprano de Europa, tenia cuello largo, cuerpo ancho y cuatro aletas para nadar. Se alimentaba de peces y calamares.',
  kidsDescription: '¡Plesiosaurus nadaba como una tortuga con cuatro remos! Su cuello largo se movia como una serpiente persiguiendo pececitos.',
  childFriendlyText: 'Plesiosaurio significa «Cercano a Reptil». Vivia en mares ingleses. Comia peces. Cuello largo y 4 aletas.',
  scientificSummary: 'Plesiosaurus dolichodeirus (Conybeare, 1824) es un plesiosaurio del Jurasico Temprano. Genero tipo de Plesiosauria.',
  funFact: 'La primera persona que encontro uno penso que era una serpiente con caparazon de tortuga.',
  facts: [
    { label: 'Cuello', value: 'Largo', description: '30-40 vertebras cervicales' },
    { label: 'Aletas', value: '4', description: 'Cuatro aletas para propulsion' },
    { label: 'Epoca', value: '200 Ma', description: 'Jurasico Temprano' },
    { label: 'Longitud', value: '3,5 m', description: 'Tamaño modesto' },
  ],
  relatedDinosaurs: [
    { id: 'elasmosaurus', relationship: 'Descendiente mucho mayor' },
    { id: 'ichthyosaurus', relationship: 'Contemporaneo' },
  ],
  discoveries: [
    { year: 1823, location: 'Lyme Regis, Reino Unido', discoveredBy: 'Mary Anning', note: 'Primer esqueleto articulado descubierto en la Costa Jurásica — una sensación científica.' },
  ],
  fossilLocations: [
    { country: 'Reino Unido', region: 'Dorset', coordinates: [50.7, -2.9], specimenName: 'Formacion Blue Lias, Costa Jurásica' },
  ],
}
