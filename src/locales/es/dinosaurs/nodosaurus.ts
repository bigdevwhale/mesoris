export default {
  name: 'Nodosaurus',
  displayName: 'Nodosaurio',
  pronunciation: 'no-do-SAU-rio',
  nameMeaning: '«Reptil Nodulo«',
  description: 'El Nodosaurus fue un dinosaurio acorazado del Cretacico de Norteamerica. Sin el garrote caudal de los anquilosaurios, dependia puramente de su armadura de placas y puas para defensa. Un fosil canadiense preserva su armadura en 3D.',
  kidsDescription: 'Nodosaurus estaba CUBIERTO de armadura, pero sin el garrote en la cola. ¡Era una fortaleza andante que confiaba en su escudo!',
  childFriendlyText: 'Nodosaurio significa «Reptil Nodulo». Norteamerica. Plantas. 6 m. Armadura sin garrote.',
  scientificSummary: 'Nodosaurus textilis (Marsh, 1889) es un tireoforo nodosaurido. Sin garrote caudal como los anquilosauridos.',
  funFact: 'En 2011 encontraron un Nodosaurus fosilizado en 3D en Canada. ¡Parece una estatua de piedra, perfectamente conservado!',
  facts: [
    { label: 'Armadura', value: 'Placas y puas', description: 'Sin garrote caudal' },
    { label: 'Tamaño', value: '6 m', description: 'Un anquilosaurio de tamaño medio' },
    { label: 'Fosil', value: '3D', description: 'Especimen tridimensional en Canada' },
    { label: 'Defensa', value: 'Pasiva', description: 'Confiaba en su armadura' },
  ],
  relatedDinosaurs: [
    { id: 'ankylosaurus', relationship: 'Pariente anquilosaurio (familia diferente, con garrote caudal)' },
    { id: 'euoplocephalus', relationship: 'Pariente anquilosaurio de garrote caudal' },
    { id: 'stegosaurus', relationship: 'Pariente tireoforo' },
  ],
  discoveries: [
    { discoveredBy: 'O.C. Marsh', note: 'Material fragmentario descrito por Marsh en 1889; proporciono el nombre que define a los Nodosauridae, una de las dos grandes familias de anquilosaurios.' },
  ],
  fossilLocations: [
    { region: 'Condado de Albany, Wyoming (Mowry Shale), EE. UU.', specimenName: 'YPM 1815 — material holotipo fragmentario' },
  ],
}
