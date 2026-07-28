export default {
  name: 'Barosaurus',
  displayName: 'Barosaurus',
  pronunciation: 'BA-ro-SOR-us',
  nameMeaning: '«Lagarto pesado»',
  description: 'Barosaurus fue un saurópodo diplodócido de cuello largo del Jurásico Tardío de Norteamérica y África, un pariente cercano del Diplodocus con un cuello que pudo medir hasta 9 metros, el más largo del reino animal.',
  kidsDescription: '¡Barosaurus fue un gigante de cuello largo con un cuello de NUEVE metros, más largo que un autobús! Era primo del Diplodocus, vivió en Norteamérica e incluso en África, y usaba su largo cuello para alcanzar hojas que otros dinosaurios no podían.',
  childFriendlyText: 'Barosaurus fue un dinosaurio de cuello largo de 9 metros. Vivió en Norteamérica y África y era pariente del Diplodocus.',
  scientificSummary: 'Barosaurus lentus (Marsh, 1890) es un saurópodo diplodócido del Kimmeridgiense–Titónico de la Formación Morrison, EE. UU., con posible material de la Formación Tendaguru, Tanzania. ~25 m de longitud; vértebras cervicales alargadas que dan un cuello de hasta 9 m. Cráneo pequeño, dientes en forma de clavo, cola en forma de látigo. Coetáneo de Diplodocus y Apatosaurus, pero distinguido por las proporciones extremas de su cuello.',
  funFact: 'Un famoso montaje de Barosaurus en el Museo Americano de Historia Natural muestra al animal levantándose sobre sus patas traseras para defenderse de un Allosaurus, ¡una pose que se ha convertido en un icono de las ilustraciones de dinosaurios!',
  facts: [
    { label: 'Cuello', value: 'Súper largo', description: 'Uno de los cuellos más largos de cualquier animal, hasta 9 metros, construido a partir de vértebras cervicales alargadas.' },
    { label: 'Familia', value: 'Diplodócido', description: 'Un saurópodo diplodócido, de la misma familia que Diplodocus y Apatosaurus.' },
    { label: 'Cola', value: 'Como látigo', description: 'Una cola larga, delgada y flexible que pudo usarse para la defensa e incluso, posiblemente, para producir sonido supersónico.' },
    { label: 'Distribución', value: 'Dos continentes', description: 'Hallado en la Formación Morrison de Norteamérica y en la Formación Tendaguru de Tanzania.' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Pariente diplodócido cercano' },
    { id: 'apatosaurus', relationship: 'Pariente diplodócido cercano' },
    { id: 'brontosaurus', relationship: 'Pariente diplodócido' },
  ],
  discoveries: [
    { year: 1889, location: 'Como Bluff, Wyoming, EE. UU.', discoveredBy: 'O.C. Marsh', note: 'Esqueleto parcial encontrado por los equipos de Marsh durante las Guerras de los Huesos.' },
    { year: 1907, location: 'Tendaguru, Tanzania', discoveredBy: 'Expedición alemana de Tendaguru', note: 'Material de diplodócido del África oriental fue luego referido a Barosaurus.' },
  ],
  fossilLocations: [
    { country: 'EE. UU.', region: 'Como Bluff, Wyoming (Formación Morrison)', coordinates: [41.8, -106.0], specimenName: 'YPM 429 — esqueleto parcial holotipo' },
    { country: 'Tanzania', region: 'Formación Tendaguru', coordinates: [-10.2, 39.4], specimenName: 'Material de diplodócido de Tendaguru' },
  ],
}
