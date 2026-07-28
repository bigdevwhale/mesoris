export default {
  name: 'Ankylosaurus',
  displayName: 'Ankylosaurus',
  pronunciation: 'an-ki-lo-ZO-russ',
  nameMeaning: 'Lézard fusionné',
  description: 'Ankylosaurus était un blindé vivant sur quatre pattes — un herbivore cuirassé armé d\'une massue osseuse massive à l\'extrémité de la queue. Tout son dos était couvert d\'épaisses plaques osseuses appelées ostéodermes, incrustées dans la peau et formant une armure quasiment impénétrable. Même ses paupières étaient blindées ! Ce dinosaure de la fin du Crétacé parcourait l\'Amérique du Nord et était pratiquement immunisé contre les attaques de prédateurs — un véritable bunker ambulant.',
  kidsDescription: 'Ankylosaurus était un char d\'assaut ambulant ! Tout son corps était recouvert de plaques osseuses et il avait une ÉNORME massue osseuse au bout de la queue qu\'il pouvait balancer comme un marteau géant contre les prédateurs. Même ses paupières étaient cuirassées !',
  childFriendlyText: 'Ankylosaurus était un herbivore cuirassé avec une grosse massue osseuse au bout de la queue. Il était couvert de la tête à la queue et T. rex pouvait à peine le blesser !',
  scientificSummary: 'Ankylosaurus magniventris (Brown, 1908) est un ankylosaurien ankylosauriné des formations de Hell Creek et de Lance du Crétacé supérieur (~68–66 Ma) dans l\'Ouest nord-américain. Il représente l\'un des plus grands dinosaures ankylosauridés connus, avec des ostéodermes dorsaux disposés en larges bandes transversales et une massue caudale terminale proéminente formée par des ostéodermes fusionnés et élargis.',
  funFact: 'La massue caudale d\'Ankylosaurus pouvait frapper avec assez de force pour briser les os des pattes d\'un T. rex. Un coup bien placé aurait fait boiter définitivement un agresseur.',
  facts: [
    { label: 'Massue caudale', value: 'Marteau osseux', description: 'Une massue osseuse massive à l\'extrémité de la queue pouvait être balancée avec une force dévastatrice contre les prédateurs.' },
    { label: 'Armure', value: 'Peau cuirassée', description: 'D\'épaisses plaques osseuses (ostéodermes) couvraient le dos, le cou et la tête, formant une armure quasi impénétrable.' },
    { label: 'Taille', value: '6,5 mètres', description: 'Aussi grand qu\'un bus, mais de constitution extrêmement basse et large, pesant environ 6 tonnes.' },
    { label: 'Défense', value: 'Pratiquement immunisé', description: 'Si lourdement blindé que même un T. rex aurait eu du mal à le retourner pour atteindre son ventre vulnérable.' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Prédateur' },
    { id: 'euoplocephalus', relationship: 'Proche parent' },
  ],
  discoveries: [
    { year: 1906, location: 'Montana, États-Unis', discoveredBy: 'Barnum Brown', note: 'Les premiers fossiles d\'Ankylosaurus furent découverts dans la formation de Hell Creek.' },
    { year: 1910, location: 'Alberta, Canada', discoveredBy: 'Peter C. Kaisen', note: 'Le spécimen le plus complet jamais récupéré.' },
  ],
  fossilLocations: [
    { country: 'États-Unis', region: 'Montana', coordinates: [47.5, -106.5], specimenName: 'Hell Creek' },
    { country: 'Canada', region: 'Alberta', coordinates: [54.5, -113.0] },
  ],
}
