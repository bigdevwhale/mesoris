export default {
  name: 'Rhamphorhynchus',
  displayName: 'Rhamphorhynchus',
  pronunciation: 'ram-fo-RINK-us',
  nameMeaning: '« Museau en bec »',
  description: 'Rhamphorhynchus était un ptérosaure à longue queue de la fin du Jurassique européen. Avec des dents en forme d\'aiguilles, une longue queue terminée par une pointe en losange et des fossiles parfaitement conservés du calcaire de Solnhofen, c\'est l\'un des ptérosaures les mieux connus.',
  kidsDescription: 'Rhamphorhynchus avait une LONGUE QUEUE avec un losange au bout, comme un cerf-volant ! Ses dents pointaient vers l\'avant comme des aiguilles. Il attrapait des poissons en glissant au-dessus des vagues.',
  childFriendlyText: 'Rhamphorhynchus signifie « museau en bec ». Il vivait en Allemagne. Mangeait des poissons. Longue queue avec losange. Un ptérosaure.',
  scientificSummary: 'Rhamphorhynchus muensteri (Goldfuss, 1831) est un ptérosaure rhamphorhynchidé du Jurassique supérieur. Nombreux fossiles du calcaire de Solnhofen.',
  funFact: 'Les fossiles de Solnhofen montrent les membranes alaires dans CHAQUE détail. On peut voir chaque fibre des ailes !',
  facts: [
    { label: 'Queue', value: 'Avec losange', description: 'Longue queue rigide avec une palette terminale en forme de losange' },
    { label: 'Dents', value: 'En aiguilles', description: 'Dents imbriquées pour attraper les poissons' },
    { label: 'Envergure', value: '1,8 m', description: 'Un ptérosaure de taille moyenne' },
    { label: 'Âge', value: '150 millions d\'années', description: 'Jurassique supérieur, Solnhofen' },
  ],
  relatedDinosaurs: [
    { id: 'pterodactylus', relationship: 'Contemporain' },
    { id: 'dimorphodon', relationship: 'Parent plus ancien' },
  ],
  discoveries: [
    { year: 1830, location: 'Bavaria, Germany', discoveredBy: 'Georg August Goldfuss', note: 'Décrit pour la première fois dans les carrières de Solnhofen, aux côtés d\'Archaeopteryx.' },
  ],
  fossilLocations: [
    { country: 'Germany', region: 'Calcaire de Solnhofen, Bavière', coordinates: [48.9, 11.0], specimenName: 'Calcaire de Solnhofen, matériel type' },
  ],
}
