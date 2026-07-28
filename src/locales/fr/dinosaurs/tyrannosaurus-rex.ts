export default {
  name: 'Tyrannosaure Rex',
  displayName: 'Tyrannosaure Rex',
  pronunciation: 'ti-ra-no-ZOR rex',
  nameMeaning: '« Roi des lézards tyrans »',
  description: 'Le dinosaure le plus célèbre de tous les temps. Un prédateur massif qui régnait sur l\'Amérique du Nord à la toute fin de l\'ère des dinosaures. Son nom signifie « Roi des Lézards Tyrans » — et il était à la hauteur.',
  kidsDescription: 'Voici le ROI des dinosaures ! Le T-Rex était aussi grand qu\'une girafe, aussi lourd qu\'un éléphant, et avait des dents de la taille d\'une banane. Sa morsure était si puissante qu\'elle pouvait écraser une voiture ! Mais voici un secret : ses bras étaient tout petits — plus courts que les tiens !',
  childFriendlyText: 'Le T-Rex était le roi des dinosaures ! Il avait une grosse tête, des dents pointues et un rugissement puissant. Mais ses bras étaient tout petits et rigolos !',
  scientificSummary: 'Tyrannosaurus rex (Osborn, 1905) est un théropode tyrannosauridé du Crétacé supérieur (Maastrichtien) de Laramidia. Il représente le plus grand hypercarnivore terrestre connu avec des forces de morsure estimées dépassant 57 000 N. Les analyses phylogénétiques le placent dans les Tyrannosaurinae, groupe frère de Tarbosaurus.',
  funFact: 'Le T. rex a vécu plus près dans le temps des humains (66 millions d\'années) que du Stégosaure (80 millions d\'années plus tôt).',
  facts: [
    { label: 'Force de morsure', value: '57 000 newtons', description: 'La morsure la plus puissante de tous les animaux terrestres — assez pour écraser une voiture.' },
    { label: 'Dents', value: '60 dents', description: 'Chaque dent avait la taille d\'une banane, dentelée comme un couteau à steak.' },
    { label: 'Cerveau', value: 'Très développé', description: 'Excellente vision et odorat — pouvait repérer ses proies à des kilomètres.' },
    { label: 'Bras', value: 'Minuscules mais puissants', description: 'Seulement 1 mètre de long mais pouvaient soulever 200 kg — restent un mystère pour les scientifiques.' },
  ],
  relatedDinosaurs: [
    { id: 'triceratops', relationship: 'Proie' },
    { id: 'edmontosaurus', relationship: 'Proie' },
    { id: 'daspletosaurus', relationship: 'Ancêtre' },
    { id: 'giganotosaurus', relationship: 'Évolution convergente' },
  ],
  discoveries: [
    { discoveredBy: 'Barnum Brown', note: 'Premier squelette partiel découvert dans la formation de Hell Creek.' },
    { discoveredBy: 'Susan Hendrickson', note: '«Sue» — le squelette de T. rex le plus complet jamais trouvé, plus de 90 % intact.' },
  ],
  fossilLocations: [
    { region: 'Montana', specimenName: 'Formation de Hell Creek' },
    { region: 'Dakota du Sud', specimenName: 'Sue' },
    { region: 'Wyoming', specimenName: 'Formation de Lance' },
  ],
}
