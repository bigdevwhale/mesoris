export default {
  name: 'Scélidosaure',
  displayName: 'Scélidosaure',
  pronunciation: 'ské-li-do-ZOR',
  nameMeaning: '« Lézard à membres »',
  description: 'Scélidosaure était un dinosaure cuirassé primitif du Jurassique inférieur européen. Avec des plaques osseuses sur le dos et un corps robuste de 4 mètres de long, c\'est l\'un des thyréophores les plus primitifs et les mieux connus — l\'ancêtre à la fois des stégosaures et des ankylosaures.',
  kidsDescription: 'Scélidosaure fut l\'un des PREMIERS dinosaures avec une armure. Des plaques osseuses sur le dos et un corps trapu. Le grand-père du Stégosaure ET de l\'Ankylosaure !',
  childFriendlyText: 'Scélidosaure signifie « lézard à membres ». Angleterre. Herbivore. 4 m. Un dinosaure cuirassé primitif.',
  scientificSummary: 'Scelidosaurus harrisonii (Owen, 1861) est un thyréophore basal du Jurassique inférieur. Un taxon clé pour comprendre l\'évolution du blindage chez les dinosaures.',
  funFact: 'C\'est l\'un des plus anciens dinosaures complets jamais découverts. Ses fossiles sont si bien conservés qu\'on peut distinguer chaque plaque d\'armure !',
  facts: [
    { label: 'Blindage', value: 'Ostéodermes', description: 'Plaques osseuses primitives sur le dos' },
    { label: 'Taille', value: '4 m', description: 'Corps robuste et surbaissé' },
    { label: 'Époque', value: 'Jurassique inférieur', description: '~195 millions d\'années' },
    { label: 'Site', value: 'Angleterre', description: 'Jurassic Coast, Dorset' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Lignée descendante thyréophore plus tardive' },
    { id: 'ankylosaurus', relationship: 'Lignée descendante thyréophore plus tardive' },
    { id: 'euoplocephalus', relationship: 'Parent ankylosaure plus tardif' },
  ],
  discoveries: [
    { discoveredBy: 'James Harrison', note: 'Squelette complet découvert ; décrit par Richard Owen en 1861 dans un article fondateur sur l\'anatomie précoce des dinosaures.' },
  ],
  fossilLocations: [
    { region: 'Charmouth, Dorset, Angleterre (Lias inférieur)', specimenName: 'NHMUK PV R1111 — holotype, squelette quasi complet' },
  ],
}
