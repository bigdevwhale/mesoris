export default {
  name: 'Camarasaurus',
  displayName: 'Camarasaurus',
  pronunciation: 'ka-ma-ra-ZO-russ',
  nameMeaning: 'Lézard à chambres',
  description: 'Camarasaurus était le sauropode le plus commun du Jurassique supérieur d\'Amérique du Nord et la « Coccinelle » du monde des sauropodes — pas le plus grand, mais extrêmement répandu et remarquablement réussi. Son visage caractéristique en forme de boîte et ses dents en forme de cuillère étaient parfaitement adaptés à la végétation grossière. Contrairement à beaucoup d\'autres sauropodes, son crâne avait de grandes ouvertures (chambres) qui réduisaient le poids — d\'où son nom de « lézard à chambres ».',
  kidsDescription: 'Camarasaurus était le dinosaure à long cou le plus commun du Jurassique ! Il avait une tête en forme de boîte et des dents en forme de cuillères. Son visage était plutôt rigolo, mais c\'était l\'un des herbivores les plus prospères de son époque !',
  childFriendlyText: 'Camarasaurus était un herbivore à long cou très commun, au curieux visage en forme de boîte et aux dents en cuillère. La « Coccinelle » des sauropodes !',
  scientificSummary: 'Camarasaurus supremus (Cope, 1877) est un sauropode macronaire de la formation Morrison du Jurassique supérieur (~155–145 Ma) d\'Amérique du Nord. C\'est le sauropode le plus abondant de la formation, avec des squelettes complets allant du juvénile à l\'adulte. Les caractéristiques diagnostiques comprennent un crâne court et haut avec de grandes fenêtres temporales et nasales, des dents robustes en forme de cuillère et des vertèbres cervicales comparativement plus courtes.',
  funFact: 'Camarasaurus est le sauropode le plus fréquemment trouvé dans la formation Morrison — des troupeaux entiers ont été ensevelis ensemble, ce qui suggère qu\'ils vivaient en grands groupes sociaux et se déplaçaient ensemble.',
  facts: [
    { label: 'Abondance', value: 'Sauropode le plus commun', description: 'Le grand sauropode le plus nombreux de la formation Morrison — des troupeaux entiers ont été trouvés ensemble.' },
    { label: 'Crâne', value: 'En forme de boîte', description: 'Un crâne court et haut avec de grandes chambres (fenêtres) qui l\'allégeaient sans compromettre sa solidité.' },
    { label: 'Dents', value: 'En forme de cuillère', description: 'Des dents robustes en forme de cuillère, mieux adaptées au matériel végétal grossier que les dents en piquet d\'autres sauropodes.' },
    { label: 'Taille', value: '15 mètres de long', description: 'Pas le plus long des sauropodes, mais l\'un des plus lourds et des plus robustes de son époque.' },
  ],
  relatedDinosaurs: [
    { id: 'brachiosaurus', relationship: 'Parent sauropode macronaire' },
    { id: 'diplodocus', relationship: 'Sauropode diplodocidé contemporain' },
    { id: 'apatosaurus', relationship: 'Diplodocidé contemporain de la formation Morrison' },
  ],
  discoveries: [
    { year: 1877, location: 'Garden Park, Colorado, États-Unis', discoveredBy: 'Edward Drinker Cope', note: 'Premiers spécimens décrits par Cope en 1877, au plus fort des guerres des os ; plusieurs espèces établies à partir du matériel de la formation Morrison.' },
    { year: 1925, location: 'Dinosaur National Monument, Utah, États-Unis', discoveredBy: 'Équipe du Carnegie Museum', note: 'Squelettes partiels articulés remarquables, dont les célèbres juvéniles de « Camarasaurus lentus » qui ont montré la croissance rapide de l\'espèce.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Garden Park, Colorado (formation Morrison)', coordinates: [38.4, -105.1], specimenName: 'AMNH 5761 — matériel type' },
    { country: 'USA', region: 'Dinosaur National Monument, Utah', coordinates: [40.43, -108.98], specimenName: 'CM 11338 — remarquable juvénile quasi complet' },
    { country: 'USA', region: 'Como Bluff, Wyoming (formation Morrison)', coordinates: [41.8, -106.0], specimenName: 'Plusieurs spécimens référés' },
  ],
}
