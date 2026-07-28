export default {
  name: 'Edmontosaurus',
  displayName: 'Edmontosaurus',
  pronunciation: 'ed-mon-to-SAU-ro',
  nameMeaning: '"Lucertola di Edmonton"',
  description: 'Il bestiame del Cretaceo. Edmontosaurus percorreva le pianure costiere del Nord America in vaste mandrie ed era una fonte di cibo primaria per T. rex. I loro fossili «mummificati» — con pelle e contenuto stomacale — sono tra le più spettacolari scoperte di dinosauri mai fatte.',
  kidsDescription: 'Edmontosaurus era un ENORME dinosauro a becco d\'anatra. Ne sappiamo COSÌ TANTO su di lui perché alcuni fossili sono «mummie» — con la vera pelle e persino l\'ultimo pasto ancora dentro! Era il cibo principale di T-Rex. Immagina di essere così comune da essere la cena di tutti!',
  childFriendlyText: 'Edmontosaurus era un grande erbivoro dal muso a papera. Sappiamo che aspetto aveva perché alcuni fossili hanno ancora la pelle — come mummie di dinosauri!',
  scientificSummary: 'Edmontosaurus annectens (Marsh, 1892) è un adrosauro saurolofino del Maastrichtiano dell\'ovest del Nord America. Uno dei più grandi adrosauri, raggiungeva i 13 m, e possedeva una batteria dentaria di circa 1.200 denti funzionante in sistema di sostituzione continua. La conservazione dei tessuti molli in diversi esemplari («Dakota», «Leonardo», «AMNH 5060») fornisce una visione senza precedenti della texture cutanea degli adrosauri, della muscolatura degli arti e del contenuto gastrico.',
  funFact: 'La mummia di Edmontosaurus «Dakota» è così ben conservata che le scansioni CT hanno rivelato la texture esatta della sua pelle — la schiena era coperta di squame esagonali che ricordano un motivo a guscio di tartaruga.',
  facts: [
    { label: 'Mummia', value: 'Pelle conservata', description: 'Esistono diversi esemplari «mummificati» con pelle e persino contenuto stomacale conservati.' },
    { label: 'Dimensioni', value: 'Uno dei più grandi', description: 'Raggiungeva i 13 metri — tra i più grandi adrosauri e preda principale di T. rex.' },
    { label: 'Denti', value: 'Centrale di triturazione', description: 'Oltre 1.000 denti disposti in una batteria di triturazione sofisticata per masticare piante coriacee.' },
    { label: 'Naso', value: 'Sacca gonfiabile', description: 'Probabilmente possedeva una sacca nasale gonfiabile per la parata visiva e sonora.' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Preda' },
    { id: 'maiasaura', relationship: 'Parente stretto' },
  ],
  discoveries: [
    { year: 1892, location: 'Dakota del Sud, USA', discoveredBy: 'Othniel Charles Marsh', note: 'Descritto per la prima volta.' },
    { year: 1999, location: 'Dakota del Nord, USA', discoveredBy: 'Tyler Lyson', note: '«Dakota» — una delle mummie di dinosauro meglio conservate.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Dakota del Sud', coordinates: [44.5, -100.0], specimenName: 'Formazione Hell Creek' },
    { country: 'Canada', region: 'Alberta', coordinates: [53.5, -113.5] },
  ],
}
