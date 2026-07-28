export default {
  name: 'Brontosaurus',
  displayName: 'Brontosaurus',
  pronunciation: 'bron-to-ZO-russ',
  nameMeaning: 'Lézard-tonnerre',
  description: 'Brontosaurus — le « Lézard-tonnerre » — est l\'un des dinosaures les plus emblématiques de tous les temps. Pendant des décennies, les scientifiques ont cru qu\'il était identique à Apatosaurus, mais en 2015, il a été rétabli en tant que genre distinct. Ce sauropode massif du Jurassique supérieur d\'Amérique du Nord mesurait plus de 22 mètres de long et pesait environ 15 tonnes. Son nom capture parfaitement l\'image d\'un animal si grand que ses pas faisaient trembler la terre.',
  kidsDescription: 'Brontosaurus est de retour ! Avant, les scientifiques disaient qu\'il n\'existait pas du tout — mais en 2015, ils ont découvert que c\'était VRAIMENT un dinosaure bien distinct ! Son nom signifie « Lézard-tonnerre » parce que ses pas résonnaient comme le tonnerre !',
  childFriendlyText: 'Brontosaurus signifie « Lézard-tonnerre ». C\'était un gigantesque dinosaure à long cou qui faisait trembler le sol en marchant.',
  scientificSummary: 'Brontosaurus excelsus (Marsh, 1879) est un sauropode diplodocidé de la formation Morrison du Jurassique supérieur d\'Amérique du Nord. Après plus d\'un siècle de synonymie avec Apatosaurus, le genre a été ressuscité en 2015 par une analyse phylogénétique complète qui a mis en évidence des différences robustes dans les vertèbres cervicales, le tronc et la ceinture pelvienne.',
  funFact: 'Brontosaurus a été « éteint » pendant presque un siècle — non pas en tant qu\'animal, mais en tant que nom ! De 1903 à 2015, les scientifiques disaient que Brontosaurus n\'était en fait qu\'un Apatosaurus. Puis une nouvelle étude l\'a ramené à la vie.',
  facts: [
    { label: 'Nom', value: 'Lézard-tonnerre', description: 'Nommé d\'après le bruit de tonnerre que ses pas gigantesques devaient produire.' },
    { label: 'Redécouverte', value: 'Rétabli en 2015', description: 'Considéré pendant des décennies comme identique à Apatosaurus, jusqu\'à ce qu\'une nouvelle étude le rétablisse comme genre valide en 2015.' },
    { label: 'Taille', value: '22 mètres', description: 'Un grand sauropode de constitution massive, plus lourd et plus trapu que son parent Apatosaurus.' },
    { label: 'Cou', value: 'Robuste et épais', description: 'Son cou était plus épais et plus musclé que celui de Diplodocus, indiquant des habitudes alimentaires différentes.' },
  ],
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: 'Parent diplodocidé très proche (autrefois considéré comme le même genre)' },
    { id: 'diplodocus', relationship: 'Parent diplodocidé proche' },
    { id: 'brachiosaurus', relationship: 'Sauropode contemporain' },
  ],
  discoveries: [
    { year: 1879, location: 'Formation de Morrison, Como Bluff, Wyoming, États-Unis', discoveredBy: 'O.C. Marsh', note: 'Nommé Brontosaurus excelsus par Marsh ; synonymisé avec Apatosaurus en 1903, mais réhabilité comme genre valide en 2015.' },
    { year: 2015, location: 'Article publié (collections multiples)', discoveredBy: 'Emanuel Tschopp, Octavio Mateus, Roger Benson', note: 'Une étude anatomique de référence portant sur 81 diplodocidés a rétabli Brontosaurus comme un genre valide distinct d\'Apatosaurus.' },
  ],
  fossilLocations: [
    { country: 'États-Unis', region: 'Como Bluff, Wyoming (formation de Morrison)', coordinates: [41.8, -106.0], specimenName: 'YPM 1980 — holotype de B. excelsus' },
    { country: 'États-Unis', region: 'Garden Park, Colorado (formation de Morrison)', coordinates: [38.4, -105.1], specimenName: 'AMNH 460 — grand spécimen référé' },
    { country: 'États-Unis', region: 'Bone Cabin Quarry, Wyoming (formation de Morrison)', coordinates: [41.79, -105.67], specimenName: 'Matériel de B. parvus' },
  ],
}
