export default {
  name: 'Ankylosaurus',
  displayName: 'Anquilosaurio',
  pronunciation: 'an-ki-lo-SAU-rio',
  nameMeaning: '«Reptil Fusionado»',
  description: 'El Ankylosaurus era como un tanque viviente — uno de los dinosaurios mas blindados que jamas existieron. Vivia en el Cretacico Tardio de Norteamerica. Su cuerpo estaba cubierto de gruesas placas oseas y osteodermos, y empuñaba un pesado garrote en la cola que podia romper los huesos de los depredadores.',
  kidsDescription: '¡Ankylosaurus era una fortaleza andante! Estaba cubierto de armadura de arriba abajo, como un tanque. Y en el extremo de su cola tenia un garrote de hueso gigante que podia GOLPEAR a los depredadores. ¡Incluso el T. rex se lo pensaria dos veces antes de meterse con esta fortaleza viviente!',
  childFriendlyText: 'Anquilosaurio significa «Reptil Fusionado». Vivia en Norteamerica. Comia plantas. Estaba cubierto de armadura. Su cola tenia un garrote oseo.',
  scientificSummary: 'Ankylosaurus magniventris (Brown, 1908) es un tireoforo anquilosaurido del Cretacico Tardio. Es el anquilosaurio mas grande conocido. La osteodermia cubria todo el cuerpo, y el garrote caudal probablemente era un arma defensiva.',
  funFact: 'Su garrote caudal pesaba tanto como una persona adulta y podia romper huesos de un solo golpe. ¡Los paleontologos han encontrado huesos de T. rex rotos que probablemente fueron causados por garrotes de anquilosaurio!',
  facts: [
    { label: 'Armadura', value: 'Osteodermos gruesos', description: 'Placas oseas fusionadas que cubrian todo el cuerpo' },
    { label: 'Garrote Caudal', value: 'Hasta 30 kg', description: 'Capaz de romper huesos de teropodos' },
    { label: 'Tamaño', value: '8 m', description: 'Tan largo como dos coches' },
    { label: 'Defensa', value: 'Pasiva-Activa', description: 'La armadura lo protegia; el garrote era su ataque' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Depredador' },
    { id: 'euoplocephalus', relationship: 'Pariente cercano' },
  ],
  discoveries: [
    { year: 1906, location: 'Montana, EE. UU.', discoveredBy: 'Barnum Brown', note: 'Los primeros fósiles de Ankylosaurus se encontraron en la Formación Hell Creek.' },
    { year: 1910, location: 'Alberta, Canadá', discoveredBy: 'Peter C. Kaisen', note: 'El espécimen más completo jamás recuperado.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Montana', coordinates: [47.5, -106.5], specimenName: 'Hell Creek' },
    { country: 'Canadá', region: 'Alberta', coordinates: [54.5, -113.0] },
  ],
}
