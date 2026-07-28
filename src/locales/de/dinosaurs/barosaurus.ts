export default {
  name: 'Barosaurus',
  displayName: 'Barosaurus',
  pronunciation: 'BA-ro-SOR-us',
  nameMeaning: '«Schwere Echse»',
  description: 'Barosaurus war ein langhalsiger Diplodocidae-Sauropode aus dem Oberjura Nordamerikas und Afrikas — ein enger Vetter des Diplodocus mit einem bis zu 9 Meter langen Hals, dem längsten im Tierreich.',
  kidsDescription: 'Barosaurus war ein langhalsiger Riese mit einem NEUN-Meter-Hals — länger als ein Bus! Er war ein Vetter des Diplodocus, lebte in Nordamerika und sogar in Afrika und nutzte seinen langen Hals, um Blätter zu erreichen, die andere Dinosaurier nicht erreichten!',
  childFriendlyText: 'Barosaurus war ein langhalsiger Dinosaurier mit einem 9-Meter-Hals. Er lebte in Nordamerika und Afrika und war ein Verwandter des Diplodocus.',
  scientificSummary: 'Barosaurus lentus (Marsh, 1890) ist ein Diplodocidae-Sauropode aus dem Kimmeridgium–Tithonium der Morrison-Formation, USA, mit möglichem Material aus der Tendaguru-Formation, Tansania. ~25 m lang; verlängerte Halswirbel ergeben einen bis zu 9 m langen Hals. Kleiner Schädel, zapfenförmige Zähne, peitschenartiger Schwanz. Zeitgenosse von Diplodocus und Apatosaurus, aber durch die extremen Halsproportionen unterschieden.',
  funFact: 'Ein berühmtes Barosaurus-Skelett im American Museum of Natural History zeigt das Tier, wie es sich auf die Hinterbeine stellt, um sich gegen einen Allosaurus zu verteidigen — eine Pose, die zur Ikone der Dinosaurier-Illustrationen wurde!',
  facts: [
    { label: 'Hals', value: 'Überlang', description: 'Einer der längsten Hälse aller Tiere — bis zu 9 Meter, gebildet aus verlängerten Halswirbeln.' },
    { label: 'Familie', value: 'Diplodocidae', description: 'Ein Diplodocidae-Sauropode — aus derselben Familie wie Diplodocus und Apatosaurus.' },
    { label: 'Schwanz', value: 'Peitschenartig', description: 'Ein langer, dünner, peitschenartiger Schwanz, der zur Verteidigung und möglicherweise sogar zur Erzeugung von Überschallgeräuschen gedient haben könnte.' },
    { label: 'Verbreitung', value: 'Zwei Kontinente', description: 'Gefunden in der Morrison-Formation in Nordamerika und in der Tendaguru-Formation in Tansania.' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: 'Naher Diplodocid-Verwandter' },
    { id: 'apatosaurus', relationship: 'Naher Diplodocid-Verwandter' },
    { id: 'brontosaurus', relationship: 'Diplodocid-Verwandter' },
  ],
  discoveries: [
    { year: 1889, location: 'Como Bluff, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Teilskelett von Marshs Teams während der Bone Wars entdeckt.' },
    { year: 1907, location: 'Tendaguru, Tansania', discoveredBy: 'Deutsche Tendaguru-Expedition', note: 'Diplodociden-Material aus Ostafrika wurde später Barosaurus zugeordnet.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison-Formation)', coordinates: [41.8, -106.0], specimenName: 'YPM 429 — Holotyp-Teilskelett' },
    { country: 'Tansania', region: 'Tendaguru-Formation', coordinates: [-10.2, 39.4], specimenName: 'Tendaguru-Diplodociden-Material' },
  ],
}
