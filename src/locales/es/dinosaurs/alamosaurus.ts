export default {
  name: 'Alamosaurus',
  displayName: 'Alamosaurio',
  pronunciation: 'a-la-mo-SAU-rio',
  nameMeaning: '«Reptil del Alamo»',
  description: 'El Alamosaurus fue un titanosaurio gigante del Cretacico Tardio de Norteamerica. Con 30 metros, fue uno de los ultimos sauropodos en existir y el unico titanosaurio conocido de Norteamerica. Vivio hasta la extincion del Cretacico.',
  kidsDescription: 'Alamosaurus fue uno de los ULTIMOS sauropodos. ¡30 metros de gigante que vio caer el meteorito! El ultimo de su especie en Norteamerica.',
  childFriendlyText: 'Alamosaurio significa «Reptil del Alamo». Norteamerica. Plantas. 30 m. De los ultimos sauropodos.',
  scientificSummary: 'Alamosaurus sanjuanensis (Gilmore, 1922) es un sauropodo titanosaurio. Unico titanosaurio de Norteamerica. Vivio hasta el limite K/Pg.',
  funFact: 'Este gigante vivio hasta el MISMO FINAL de la era de los dinosaurios. Probablemente fue testigo del impacto del meteorito.',
  facts: [
    { label: 'Longitud', value: '30 m', description: 'Un titanosaurio enorme' },
    { label: 'Epoca', value: '66 Ma', description: 'Limite Cretacico-Paleogeno' },
    { label: 'Estatus', value: 'Ultimo', description: 'De los ultimos sauropodos' },
    { label: 'Importancia', value: 'Unico', description: 'Unico titanosaurio norteamericano' },
  ],
  relatedDinosaurs: [
    { id: 'argentinosaurus', relationship: 'Titanosaurio pariente sudamericano' },
    { id: 'sauroposeidon', relationship: 'Sauropodo gigante norteamericano anterior' },
    { id: 'diplodocus', relationship: 'Sauropodo norteamericano anterior (familia diferente)' },
  ],
  discoveries: [
    { year: 1921, location: 'Condado de San Juan, Nuevo México, EE. UU.', discoveredBy: 'Charles W. Gilmore', note: 'El material inicial fue recolectado y descrito por Gilmore en 1922 en Nuevo México; posteriormente se hallaron especímenes mucho mayores en Texas.' },
    { year: 2003, location: 'Parque Nacional Big Bend, Texas, EE. UU.', discoveredBy: 'Thomas Lehman y Kenneth Carpenter', note: 'Enormes vértebras y huesos de extremidades de Texas revisaron al alza las estimaciones de tamaño, sugiriendo que Alamosaurus rivalizaba con los mayores titanosaurios sudamericanos.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Condado de San Juan, Nuevo México (Formación Ojo Alamo)', coordinates: [36.5, -108.2], specimenName: 'USNM 10487 — vértebras y miembro anterior holotipo' },
    { country: 'EE. UU.', region: 'Condado de Brewster, Texas, Big Bend (Formación Javelina)', coordinates: [29.3, -103.2], specimenName: 'Enormes especímenes de Texas que indican tamaño máximo' },
  ],
}
