export default {
  name: 'Proceratosaurus',
  displayName: 'Proceratosaurus',
  pronunciation: 'pro-SE-ra-to-SAU-rus',
  nameMeaning: '"Prima di Ceratosaurus"',
  description: 'Proceratosaurus era un piccolo tirannosauroide primitivo crestato del Giurassico medio dell\'Inghilterra — un tempo creduto parente del Ceratosaurus, oggi riconosciuto come umile antenato del T. rex.',
  kidsDescription: 'Proceratosaurus significa "Prima di Ceratosaurus" — ma gli scienziati hanno sbagliato il nome! Era in realtà un parente primitivo del T. rex, non di Ceratosaurus. Aveva una piccola cresta sul muso e viveva nell\'Inghilterra giurassica!',
  childFriendlyText: 'Proceratosaurus era un piccolo antenato primitivo del T. rex, vissuto in Inghilterra. Aveva una piccola protuberanza ossea sul muso e un tempo fu erroneamente creduto parente del Ceratosaurus.',
  scientificSummary: 'Proceratosaurus bradleyi (Woodward, 1910) è un tirannosauroide proceratosauride del Bathoniano (Giurassico medio) del Gloucestershire, Inghilterra. Descritto originariamente come un ceratosauro — oggi riconosciuto come un tirannosauroide basale. Diagnostico: piccola cresta nasale, cranio gracile. Parente stretto di Guanlong. Tra i tirannosauroidi più antichi conosciuti al mondo.',
  funFact: 'Proceratosaurus fu chiamato così nel 1910 per indicare "prima di Ceratosaurus", perché la piccola cresta sul muso ricordava quella del Ceratosaurus. Ci vollero quasi 100 anni perché gli scienziati capissero che in realtà non c\'entrava nulla con Ceratosaurus — era un tirannosauroide primitivo!',
  facts: [
    { label: 'Mal chiamato', value: 'Non prima di Ceratosaurus', description: 'Inizialmente ritenuto un antenato di Ceratosaurus per via della sua cresta nasale — ma in realtà è un tirannosauroide!' },
    { label: 'Cresta', value: 'Piccolo bozzo nasale', description: 'Una piccola sporgenza a cresta sul muso, simile per forma alla più grande cresta del Guanlong.' },
    { label: 'Origine', value: 'Gloucestershire', description: 'Trovato nel 1910 in una cava di mattoni a Minchinhampton, nel Gloucestershire, Inghilterra.' },
    { label: 'Famiglia', value: 'Tirannosauroide primitivo', description: 'Appartiene ai Proceratosauridae, una famiglia basale di tirannosauroidi che comprende anche Guanlong e Kileskus.' },
  ],
  relatedDinosaurs: [
    { id: 'guanlong', relationship: 'Cugino proceratosauride dalla cresta' },
    { id: 'dilophosaurus', relationship: 'Teropode contemporaneo dalla cresta' },
    { id: 'tyrannosaurus-rex', relationship: 'Lontano discendente' },
  ],
  discoveries: [
    { year: 1910, location: 'Minchinhampton, Gloucestershire, England', discoveredBy: 'F. Lewis Bradley', note: 'Cranio parziale trovato in una cava di mattoni; descritto da Arthur Smith Woodward.' },
  ],
  fossilLocations: [
    { country: 'United Kingdom', region: 'Minchinhampton, Gloucestershire', coordinates: [51.7, -2.2], specimenName: 'NHMUK PV R 4860 — olotipo, cranio parziale' },
  ],
}
