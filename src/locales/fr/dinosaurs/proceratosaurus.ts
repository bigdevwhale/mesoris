export default {
  name: 'Proceratosaurus',
  displayName: 'Proceratosaurus',
  pronunciation: 'pro-SE-ra-to-SO-rus',
  nameMeaning: '« Avant Ceratosaurus »',
  description: 'Proceratosaurus était un petit tyrannosaure primitif à crête du Jurassique moyen d\'Angleterre — longtemps considéré comme un parent de Ceratosaurus, il est aujourd\'hui reconnu comme un humble ancêtre de T. rex.',
  kidsDescription: 'Proceratosaurus signifie "Avant Ceratosaurus" — mais les scientifiques se sont trompés ! C\'était en réalité un parent primitif de T. rex, pas de Ceratosaurus. Il avait une petite crête sur le museau et vivait dans l\'Angleterre du Jurassique !',
  childFriendlyText: 'Proceratosaurus était un petit ancêtre primitif de T. rex venu d\'Angleterre. Il avait une petite bosse osseuse sur le museau et fut un temps considéré à tort comme un parent de Ceratosaurus.',
  scientificSummary: 'Proceratosaurus bradleyi (Woodward, 1910) est un tyrannosaure proceratosauridé du Bathonien (Jurassique moyen) du Gloucestershire, Angleterre. Décrit à l\'origine comme un cératosaure — il est aujourd\'hui reconnu comme un tyrannosaure basal. Diagnostique : petite crête nasale, crâne gracile. Proche parent de Guanlong. Parmi les plus anciens tyrannosauroidés connus au monde.',
  funFact: 'Proceratosaurus a été nommé en 1910 pour signifier "avant Ceratosaurus", car la petite crête de son museau rappelait celle de Ceratosaurus. Il a fallu près de 100 ans aux scientifiques pour réaliser qu\'il n\'avait en réalité rien à voir avec Ceratosaurus — c\'était un tyrannosaure primitif !',
  facts: [
    { label: 'Mal nommé', value: 'Pas avant Ceratosaurus', description: 'Longtemps cru ancêtre de Ceratosaurus à cause de sa crête nasale — il s\'agit en fait d\'un tyrannosaure !' },
    { label: 'Crête', value: 'Petite bosse nasale', description: 'Une petite crête en forme de bourrelet sur le museau, semblable par sa forme à la plus grande crête de Guanlong.' },
    { label: 'Origine', value: 'Gloucestershire', description: 'Trouvé en 1910 dans une briqueterie à Minchinhampton, dans le Gloucestershire, en Angleterre.' },
    { label: 'Famille', value: 'Tyrannosaure primitif', description: 'Appartient aux Proceratosauridae — une famille basale de tyrannosauroidés qui inclut Guanlong et Kileskus.' },
  ],
  relatedDinosaurs: [
    { id: 'guanlong', relationship: 'Cousin proceratosauridé à crête' },
    { id: 'dilophosaurus', relationship: 'Théropode contemporain à crête' },
    { id: 'tyrannosaurus-rex', relationship: 'Descendant éloigné' },
  ],
  discoveries: [
    { year: 1910, location: 'Minchinhampton, Gloucestershire, England', discoveredBy: 'F. Lewis Bradley', note: 'Crâne partiel trouvé dans une briqueterie ; décrit par Arthur Smith Woodward.' },
  ],
  fossilLocations: [
    { country: 'United Kingdom', region: 'Minchinhampton, Gloucestershire', coordinates: [51.7, -2.2], specimenName: 'NHMUK PV R 4860 — holotype, crâne partiel' },
  ],
}
