export default {
  name: 'Brontosaurus',
  displayName: 'Brontosaurus',
  pronunciation: 'bron-to-ZÀ-u-rus',
  nameMeaning: 'Lucertola del tuono',
  description: 'Il Brontosaurus — la «Lucertola del tuono» — è uno dei dinosauri più iconici di tutti i tempi. Per decenni gli scienziati hanno creduto che fosse identico all\'Apatosaurus, ma nel 2015 è stato ripristinato come genere distinto. Questo sauropode massiccio del Giurassico superiore del Nord America misurava oltre 22 metri di lunghezza e pesava circa 15 tonnellate. Il suo nome cattura perfettamente l\'immagine di un animale così grande che i suoi passi facevano tremare la terra.',
  kidsDescription: 'Il Brontosaurus è tornato! Prima gli scienziati dicevano che non esisteva affatto — ma nel 2015 hanno scoperto che era VERAMENTE un dinosauro ben distinto! Il suo nome significa «Lucertola del tuono» perché i suoi passi risuonavano come il tuono!',
  childFriendlyText: 'Brontosaurus significa «Lucertola del tuono». Era un gigantesco dinosauro dal lungo collo che faceva tremare il suolo mentre camminava.',
  scientificSummary: 'Brontosaurus excelsus (Marsh, 1879) è un sauropode diplodocide della formazione Morrison del Giurassico superiore del Nord America. Dopo oltre un secolo di sinonimia con Apatosaurus, il genere è stato resuscitato nel 2015 da un\'analisi filogenetica completa che ha messo in evidenza differenze robuste nelle vertebre cervicali, nel tronco e nella cintura pelvica.',
  funFact: 'Il Brontosaurus è stato «estinto» per quasi un secolo — non come animale, ma come nome! Dal 1903 al 2015, gli scienziati dicevano che Brontosaurus era in realtà solo un Apatosaurus. Poi un nuovo studio lo ha riportato in vita.',
  facts: [
    { label: 'Nome', value: 'Lucertola del tuono', description: 'Chiamato così per il rumore di tuono che i suoi passi giganteschi dovevano produrre.' },
    { label: 'Riscoperta', value: 'Ripristinato nel 2015', description: 'Considerato per decenni identico all\'Apatosaurus, fino a quando un nuovo studio lo ha ripristinato come genere valido nel 2015.' },
    { label: 'Dimensioni', value: '22 metri', description: 'Un grande sauropode di costituzione massiccia, più pesante e tozzo del suo parente Apatosaurus.' },
    { label: 'Collo', value: 'Robusto e spesso', description: 'Il suo collo era più spesso e muscoloso di quello del Diplodocus, indicando abitudini alimentari diverse.' },
  ],
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: 'Parente diplodocide strettissimo (un tempo considerato lo stesso genere)' },
    { id: 'diplodocus', relationship: 'Parente diplodocide stretto' },
    { id: 'brachiosaurus', relationship: 'Sauropode contemporaneo' },
  ],
  discoveries: [
    { year: 1879, location: 'Formazione di Morrison, Como Bluff, Wyoming, Stati Uniti', discoveredBy: 'O.C. Marsh', note: 'Nominato Brontosaurus excelsus da Marsh; sinonimizzato con Apatosaurus nel 1903, ma riconsosciuto come genere valido nel 2015.' },
    { year: 2015, location: 'Articolo pubblicato (collezioni multiple)', discoveredBy: 'Emanuel Tschopp, Octavio Mateus, Roger Benson', note: 'Uno studio anatomico di riferimento su 81 diplodocidi ha ristabilito Brontosaurus come genere valido distinto da Apatosaurus.' },
  ],
  fossilLocations: [
    { country: 'Stati Uniti', region: 'Como Bluff, Wyoming (Formazione Morrison)', coordinates: [41.8, -106.0], specimenName: 'YPM 1980 — olotipo di B. excelsus' },
    { country: 'Stati Uniti', region: 'Garden Park, Colorado (Formazione Morrison)', coordinates: [38.4, -105.1], specimenName: 'AMNH 460 — grande esemplare riferito' },
    { country: 'Stati Uniti', region: 'Bone Cabin Quarry, Wyoming (Formazione Morrison)', coordinates: [41.79, -105.67], specimenName: 'Materiale di B. parvus' },
  ],
}
