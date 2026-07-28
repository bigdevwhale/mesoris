export default {
  name: 'Barosaurus',
  displayName: 'Barosaurus',
  pronunciation: 'BA-ro-SO-rus',
  nameMeaning: '« Lézard lourd »',
  description: 'Barosaurus était un sauropode diplodocidé au long cou du Jurassique supérieur d\'Amérique du Nord et d\'Afrique — un proche cousin du Diplodocus avec un cou pouvant atteindre 9 mètres, le plus long du règne animal.',
  kidsDescription: 'Barosaurus était un géant au long cou avec un cou de NEUF mètres — plus long qu\'un bus ! C\'était un cousin du Diplodocus qui vivait en Amérique du Nord et même en Afrique. Il utilisait son long cou pour atteindre les feuilles que les autres dinosaures ne pouvaient pas !',
  childFriendlyText: 'Barosaurus était un dinosaure au long cou de 9 mètres. Il vivait en Amérique du Nord et en Afrique et était un proche du Diplodocus.',
  scientificSummary: 'Barosaurus lentus (Marsh, 1890) est un sauropode diplodocidé du Kimméridgien–Tithonien de la formation de Morrison, États-Unis, avec du matériel possible de la formation de Tendaguru, Tanzanie. ~25 m de long ; vertèbres cervicales allongées formant un cou pouvant atteindre 9 m. Petit crâne, dents en forme de chevilles, queue en forme de fouet. Contemporain de Diplodocus et Apatosaurus, mais distinct par les proportions extrêmes de son cou.',
  funFact: 'Un célèbre montage de Barosaurus au Musée américain d\'histoire naturelle montre l\'animal se dressant sur ses pattes arrière pour se défendre contre un Allosaurus — une pose devenue une icône de l\'iconographie des dinosaures !',
  facts: [
    { label: 'Cou', value: 'Très long', description: 'L\'un des cous les plus longs de tout le règne animal — jusqu\'à 9 mètres, formé de vertèbres cervicales allongées.' },
    { label: 'Famille', value: 'Diplodocidé', description: 'Un sauropode diplodocidé — de la même famille que Diplodocus et Apatosaurus.' },
    { label: 'Queue', value: 'En fouet', description: 'Une longue queue fine en forme de fouet, qui a pu servir à la défense et peut-être même à produire des sons supersoniques.' },
    { label: 'Aire', value: 'Deux continents', description: 'Trouvé dans la formation de Morrison en Amérique du Nord et dans la formation de Tendaguru en Tanzanie.' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Proche parent diplodocidé' },
    { id: 'apatosaurus', relationship: 'Proche parent diplodocidé' },
    { id: 'brontosaurus', relationship: 'Parent diplodocidé' },
  ],
  discoveries: [
    { year: 1889, location: 'Como Bluff, Wyoming, États-Unis', discoveredBy: 'O.C. Marsh', note: 'Squelette partiel découvert par les équipes de Marsh pendant les Guerres des Os.' },
    { year: 1907, location: 'Tendaguru, Tanzanie', discoveredBy: 'Expédition allemande de Tendaguru', note: 'Du matériel de diplodocidé d\'Afrique de l\'Est fut ensuite attribué à Barosaurus.' },
  ],
  fossilLocations: [
    { country: 'États-Unis', region: 'Como Bluff, Wyoming (formation de Morrison)', coordinates: [41.8, -106.0], specimenName: 'YPM 429 — squelette partiel holotype' },
    { country: 'Tanzanie', region: 'Formation de Tendaguru', coordinates: [-10.2, 39.4], specimenName: 'Matériel de diplodocidé de Tendaguru' },
  ],
}
