export default {
  name: 'Torosaurus',
  displayName: 'Torosaurio',
  pronunciation: 'to-ro-SAU-rio',
  nameMeaning: '«Reptil Perforado»',
  description: 'El Torosaurus fue un ceratopsido del Cretacico Tardio de Norteamerica. Con un volante enorme con dos grandes aberturas, algunos cientificos creen que podria ser la forma adulta del Triceratops, aunque el debate continua.',
  kidsDescription: 'Torosaurus tenia un volante ENORME con dos AGUJEROS gigantes. ¡Como ventanas en su corona! ¿Era un Triceratops viejo? Los cientificos aun lo debaten.',
  childFriendlyText: 'Torosaurio significa «Reptil Perforado». Norteamerica. Plantas. 9 m. Volante con agujeros.',
  scientificSummary: 'Torosaurus latus (Marsh, 1891) es un ceratopsido. El debate sobre si es Triceratops adulto continua.',
  funFact: 'El debate Torosaurus=Triceratops es uno de los mas candentes en paleontologia. ¿Son dos dinosaurios o solo un Triceratops muy mayor?',
  facts: [
    { label: 'Volante', value: 'Perforado', description: 'Grandes aberturas en el volante' },
    { label: 'Debate', value: 'Activo', description: '¿Es un Triceratops adulto?' },
    { label: 'Tamaño', value: '9 m', description: 'Similar a Triceratops' },
    { label: 'Epoca', value: 'Cretacico Tardio', description: '~68-66 millones de anos' },
  ],
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Pariente más cercano: alguna vez propuesto como la misma especie' },
    { id: 'styracosaurus', relationship: 'Pariente ceratópsido' },
    { id: 'pentaceratops', relationship: 'Pariente chasmosaurino más temprano' },
  ],
  discoveries: [
    { discoveredBy: 'John Bell Hatcher', note: 'Material descrito por O.C. Marsh en 1891; posteriormente se encontraron múltiples especímenes por el oeste de EE. UU. en las formaciones Lance y Hell Creek.' },
  ],
  fossilLocations: [
    { region: 'Condado de Niobrara, Wyoming (Formación Lance)', specimenName: 'YPM 1830 — holotipo, cráneo parcial' },
    { region: 'Condado de Harding, Dakota del Sur (Formación Hell Creek)', specimenName: 'Cráneos referidos' },
  ],
}
