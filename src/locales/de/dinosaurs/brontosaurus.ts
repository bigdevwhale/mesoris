export default {
  name: 'Brontosaurus',
  displayName: 'Brontosaurus',
  pronunciation: 'BRON-to-SAU-rus',
  nameMeaning: 'Donnerechse',
  description: 'Brontosaurus — die "Donnerechse" — ist einer der kultigsten Dinosaurier aller Zeiten. Jahrzehntelang glaubten Wissenschaftler, er sei mit Apatosaurus identisch, doch 2015 wurde er als eigenständige Gattung wieder anerkannt. Dieser massive Sauropode aus dem oberen Jura Nordamerikas war über 22 Meter lang und wog etwa 15 Tonnen. Sein Name fängt perfekt das Bild eines so großen Tieres ein, dass seine Schritte die Erde erzittern ließen.',
  kidsDescription: 'Brontosaurus lebt wieder! Früher sagten Wissenschaftler, es gäbe ihn gar nicht — aber 2015 fanden sie heraus, dass er DOCH ein echter eigener Dinosaurier ist! Sein Name bedeutet "Donnerechse", weil seine Schritte wie Donner klangen!',
  childFriendlyText: 'Brontosaurus bedeutet "Donnerechse". Er war ein gigantischer Langhals-Dinosaurier, der den Boden beim Gehen zum Beben brachte.',
  scientificSummary: 'Brontosaurus excelsus (Marsh, 1879) ist ein diplodocider Sauropode aus der oberjurassischen Morrison-Formation Nordamerikas. Nach über einem Jahrhundert der Synonymie mit Apatosaurus wurde die Gattung 2015 durch eine umfassende phylogenetische Analyse wiederbelebt, die robuste Unterschiede in Halswirbeln, Rumpf und Beckengürtel aufzeigte.',
  funFact: 'Brontosaurus war fast ein ganzes Jahrhundert lang "ausgestorben" — nicht als Tier, sondern als Name! Von 1903 bis 2015 sagten Wissenschaftler, Brontosaurus sei eigentlich nur ein Apatosaurus. Dann brachte eine neue Studie ihn zurück.',
  facts: [
    { label: 'Name', value: 'Donnerechse', description: 'Benannt nach dem donnernden Geräusch, das seine gewaltigen Schritte verursacht haben müssen.' },
    { label: 'Wiederentdeckung', value: '2015 zurückgebracht', description: 'Jahrzehntelang für identisch mit Apatosaurus gehalten, bis eine neue Studie ihn 2015 als gültige Gattung wiederbelebte.' },
    { label: 'Größe', value: '22 Meter', description: 'Ein großer Sauropode mit massivem Körperbau, schwerer und bulliger als sein Verwandter Apatosaurus.' },
    { label: 'Hals', value: 'Robust und dick', description: 'Sein Hals war dicker und muskulöser als der des Diplodocus, was auf andere Fressgewohnheiten hindeutet.' },
  ],
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: 'Sehr naher Diplodocid-Verwandter (zeitweise als gleiche Gattung betrachtet)' },
    { id: 'diplodocus', relationship: 'Naher Diplodocid-Verwandter' },
    { id: 'brachiosaurus', relationship: 'Zeitgenössischer Sauropode' },
  ],
  discoveries: [
    { year: 1879, location: 'Morrison-Formation, Como Bluff, Wyoming, USA', discoveredBy: 'O.C. Marsh', note: 'Als Brontosaurus excelsus von Marsh benannt; 1903 mit Apatosaurus synonymisiert, aber 2015 als eigenständige Gattung rehabilitiert.' },
    { year: 2015, location: 'Veröffentlichter Artikel (mehrere Sammlungen)', discoveredBy: 'Emanuel Tschopp, Octavio Mateus, Roger Benson', note: 'Eine wegweisende anatomische Studie an 81 Diplodociden rehabilitierte Brontosaurus als eigenständige Gattung, getrennt von Apatosaurus.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Como Bluff, Wyoming (Morrison-Formation)', coordinates: [41.8, -106.0], specimenName: 'YPM 1980 — Holotyp von B. excelsus' },
    { country: 'USA', region: 'Garden Park, Colorado (Morrison-Formation)', coordinates: [38.4, -105.1], specimenName: 'AMNH 460 — zugewiesenes großes Exemplar' },
    { country: 'USA', region: 'Bone Cabin Quarry, Wyoming (Morrison-Formation)', coordinates: [41.79, -105.67], specimenName: 'Material von B. parvus' },
  ],
}
