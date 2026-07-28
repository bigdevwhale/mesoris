export default {
  name: 'Concavenator',
  displayName: 'Concavenator',
  pronunciation: 'CON-ka-ve-na-TOR',
  nameMeaning: '« Chasseur bossu de Cuenca »',
  description: 'Concavenator était un petit carcharodontosauridé bossu du Crétacé inférieur d\'Espagne, avec une paire distinctive de hautes épines vertébrales au-dessus des hanches et des structures semblables à des plumes sur les bras — des indices du chemin évolutif menant aux vraies plumes.',
  kidsDescription: 'Concavenator était un dinosaure BOSSU d\'Espagne ! Il avait deux hautes épines sur le dos qui formaient une grande bosse, et ses bras avaient de petits boutons où des plumes auraient pu pousser. Un prédateur très élégant !',
  childFriendlyText: 'Concavenator était un carnivore bossu d\'Espagne avec de hautes épines dorsales et des boutons sur les bras qui tenaient peut-être des plumes.',
  scientificSummary: 'Concavenator corcovatus (Ortega et al., 2010) est un carcharodontosauridé basal de la formation Calizas de La Huérguina (Barrémien), Las Hoyas, Espagne. Diagnostique : épines neurales pré- et postzygapophysaires allongées sur les vertèbres dorsales et sacrées formant une bosse/voile. Les papilles ulnaires soutiennent des structures tégumentaires de type tuyaux de plume.',
  funFact: 'Concavenator fut le premier dinosaure hors de la lignée des coelurosaures à montrer des boutons de type tuyau de plume sur ses bras — ce qui suggère que les précurseurs des plumes étaient bien plus répandus parmi les dinosaures qu\'on ne le pensait.',
  facts: [
    { label: 'Bosse', value: 'Deux tours épineuses', description: 'Une paire d\'épines vertébrales allongées au-dessus des hanches formait une haute bosse en forme de voile, unique chez les théropodes.' },
    { label: 'Tuyaux', value: 'Précurseurs de plumes', description: 'Des faisceaux denses sur le cubitus ancraient probablement des structures tégumentaires de type tuyau — un premier pas évolutif vers les plumes.' },
    { label: 'Famille', value: 'Carcharodontosauridé', description: 'Un petit carcharodontosauridé, groupe frère du géant Giganotosaurus et de Carcharodontosaurus.' },
    { label: 'Origine', value: 'Las Hoyas, Espagne', description: 'Trouvé sur le site de Las Hoyas, un milieu humide crétacé qui a livré une préservation de type lagerstätte.' },
  ],
  relatedDinosaurs: [
    { id: 'carcharodontosaurus', relationship: 'Parent carcharodontosauridé plus grand' },
    { id: 'giganotosaurus', relationship: 'Parent carcharodontosauridé plus grand' },
    { id: 'allosaurus', relationship: 'Cousin allosauroïde antérieur' },
  ],
  discoveries: [
    { year: 2003, location: 'Las Hoyas, Cuenca, Espagne', discoveredBy: 'José Luis Sanz et Fernando Escaso', note: 'Squelette articulé trouvé dans les calcaires laminés de la formation Calizas de La Huérguina.' },
  ],
  fossilLocations: [
    { country: 'Espagne', region: 'Las Hoyas, Cuenca', coordinates: [40.07, -1.85], specimenName: 'MCCM-LH 6666 — holotype, squelette articulé' },
  ],
}
