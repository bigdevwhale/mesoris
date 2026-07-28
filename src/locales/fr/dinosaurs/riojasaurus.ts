export default {
  name: 'Riojasaurus',
  displayName: 'Riojasaurus',
  pronunciation: 'ri-o-kha-SAUR-us',
  nameMeaning: '« Lézard de La Rioja »',
  description: 'Riojasaurus fut l\'un des premiers dinosaures herbivores vraiment grands, vivant à la fin du Trias en Amérique du Sud. Avec 11 mètres de long et un corps massif, il fut l\'un des premiers sauropodomorphes à atteindre des dimensions imposantes.',
  kidsDescription: 'Riojasaurus fut l\'un des PREMIERS dinosaures GÉANTS mangeurs de plantes. Avec 11 mètres, il était déjà énorme alors que la plupart des dinosaures étaient encore petits !',
  childFriendlyText: 'Riojasaurus signifie « lézard de La Rioja ». Argentine. Herbivore. 11 m. L\'un des premiers grands dinosaures.',
  scientificSummary: 'Riojasaurus incertus (Bonaparte, 1969) est un dinosaure sauropodomorphe du Trias supérieur. L\'un des premiers à atteindre une grande taille corporelle.',
  funFact: 'Il fut l\'un des premiers dinosaures à montrer que le gigantisme était possible. Ses os présentaient déjà des adaptations pour supporter un poids énorme.',
  facts: [
    { label: 'Longueur', value: '11 m', description: 'Grand pour l\'époque du Trias' },
    { label: 'Époque', value: 'Trias supérieur', description: '~220 millions d\'années' },
    { label: 'Site', value: 'Argentine', description: 'Nord-ouest de l\'Argentine' },
    { label: 'Poids', value: '~2 tonnes', description: 'Lourd pour son époque' },
  ],
  relatedDinosaurs: [
    { id: 'plateosaurus', relationship: 'Proche parent sauropodomorphe' },
    { id: 'eoraptor', relationship: 'Dinosaure primitif contemporain' },
  ],
  discoveries: [
    { year: 1967, location: 'La Rioja Province, Argentina', discoveredBy: 'José Bonaparte', note: 'De nombreux spécimens ont été trouvés dans la formation de Los Colorados ; décrit formellement par Bonaparte en 1969, ce qui en fait l\'un des sauropodomorphes triasiques les mieux connus.' },
  ],
  fossilLocations: [
    { country: 'Argentina', region: 'Province de La Rioja, Formation de Los Colorados', coordinates: [-29.5, -67.5], specimenName: 'PVL 3808 — matériel rapporté, plusieurs individus' },
  ],
}
