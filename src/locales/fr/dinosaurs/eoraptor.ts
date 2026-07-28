export default {
  name: 'Eoraptor',
  displayName: 'Éoraptor',
  pronunciation: 'é-o-rap-TOR',
  nameMeaning: '« Voleur de l\'aube »',
  description: 'Le voleur de l\'aube. L\'Éoraptor était l\'un des tout premiers dinosaures, vivant au tout début de l\'ère des dinosaures. Long d\'un mètre seulement — comme un petit chien — ce fut un début modeste pour ce qui allait devenir les vertébrés terrestres les plus réussis de tous les temps.',
  kidsDescription: 'L\'Éoraptor était un dinosaure TOUT PETIT du TOUT début des dinosaures — seulement 1 mètre de long, comme un petit chien ! Son nom signifie « Voleur de l\'Aube » parce qu\'il vivait à l\'aurore du temps des dinosaures. Il avait deux sortes de dents — des pointues pour la viande ET des plates pour les plantes. Un petit pionnier omnivore !',
  childFriendlyText: 'L\'Éoraptor était un minuscule dinosaure de la taille d\'un chien, du tout premier début de l\'ère des dinosaures. Il avait à la fois des dents pointues et des dents plates pour tout manger !',
  scientificSummary: 'Eoraptor lunensis (Sereno et al., 1993) est un sauropodomorphe basal de la formation d\'Ischigualasto (Carnien), Argentine. L\'un des plus anciens dinosaures connus à ~231 Ma. La petite taille corporelle (~1 m, ~10 kg) représente la condition plésiomorphe des dinosaures. La dentition hétérodonte — avec des dents prémaxillaires recourbées et dentelées, passant à des dents maxillaires lancéolées — indique un régime omnivore.',
  funFact: 'L\'Éoraptor a été découvert au MÊME endroit que l\'Herrérasaure — la Vallée de la Lune en Argentine. Pendant des décennies, les seuls dinosaures primitifs connus provenaient tous de cette petite vallée, ce qui en fait l\'un des sites fossilifères les plus importants de la Terre.',
  facts: [
    { label: 'Nom', value: '« Voleur de l\'Aube »', description: 'Son nom signifie « Voleur de l\'Aube » — un voleur à l\'aurore de l\'ère des dinosaures.' },
    { label: 'Dents', value: 'Régime mixte', description: 'Avait à la fois des dents dentelées de carnivore et des dents en forme de feuille d\'herbivore — un ancien omnivore.' },
    { label: 'Taille', value: 'Taille d\'un chien', description: 'Seulement 1 mètre de long — les dinosaures ont commencé petits avant d\'évoluer en géants.' },
    { label: 'Site', value: 'Vallée de la Lune', description: 'Découvert dans la Vallée de la Lune en Argentine — l\'un des sites fossilifères les plus importants du monde.' },
  ],
  relatedDinosaurs: [
    { id: 'herrerasaurus', relationship: 'Contemporain' },
    { id: 'plateosaurus', relationship: 'Descendant ultérieur' },
  ],
  discoveries: [
    { year: 1991, location: 'San Juan, Argentine', discoveredBy: 'Ricardo Martínez', note: 'Découvert dans la même formation de la Vallée de la Lune qu\'Herrerasaurus.' },
  ],
  fossilLocations: [
    { country: 'Argentine', region: 'San Juan', coordinates: [-30.0, -68.0], specimenName: 'Vallée de la Lune, formation d\'Ischigualasto' },
  ],
}
