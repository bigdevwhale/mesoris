export default {
  name: 'Tarbosaurus',
  displayName: 'Tarbosaurio',
  pronunciation: 'tar-bo-SAU-rio',
  nameMeaning: '«Reptil del Terror»',
  description: 'El Tarbosaurus fue el equivalente asiatico del T. rex. Viviendo en el Cretacico Tardio de Mongolia, era un tiranosaurido masivo de 12 metros. Tan cercano al T. rex que algunos lo consideran la misma especie.',
  kidsDescription: 'Tarbosaurus era el T. REX DE ASIA. Igual de grande y feroz, al otro lado del mundo. Dos reyes tiranos en continentes distintos.',
  childFriendlyText: 'Tarbosaurio significa «Reptil del Terror». Mongolia. Carne. 12 m. Primo asiatico del T. rex.',
  scientificSummary: 'Tarbosaurus bataar (Maleev, 1955) es un tiranosaurido del Cretacico Tardio de Mongolia. Muy cercano a Tyrannosaurus rex.',
  funFact: 'Si Tarbosaurus y T. rex se encontraran, serian casi indistinguibles. El debate sobre si son generos diferentes continua.',
  facts: [
    { label: 'Longitud', value: '12 m', description: 'Igual de grande que el T. rex' },
    { label: 'Ubicacion', value: 'Mongolia', description: 'Depredador principal del Cretacico asiatico' },
    { label: 'Mandibula', value: 'Profunda', description: 'Craneo mas estrecho pero igual de poderoso' },
    { label: 'Especimenes', value: 'Numerosos', description: 'Tiranosaurio asiatico mejor conocido' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Pariente cercano' },
    { id: 'velociraptor', relationship: 'Contemporáneo regional' },
    { id: 'oviraptor', relationship: 'Vecino de Nemegt' },
  ],
  discoveries: [
    { discoveredBy: 'Expediciones soviético-mongolas', note: 'Las primeras expediciones al Gobi recuperaron importante material de tiranosaurio de la Cuenca de Nemegt.' },
    { discoveredBy: 'Evgeny Maleev', note: 'Maleev nombró formalmente a Tarbosaurus basándose en fósiles mongoles.' },
  ],
  fossilLocations: [
    { region: 'Ömnögovi', specimenName: 'Formación Nemegt' },
  ],
}
