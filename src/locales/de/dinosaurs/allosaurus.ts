export default {
  name: 'Allosaurus',
  displayName: 'Allosaurus',
  pronunciation: 'AL-lo-SAU-rus',
  nameMeaning: 'Andersartige Echse',
  description: 'Allosaurus war der Spitzenprädator der späten Jurazeit und der Albtraum der riesigen Sauropoden. Mit einem massiven Schädel voller sägezahnartiger Zähne, kräftigen dreifingrigen Händen mit gebogenen Klauen und einem kräftigen Hals, der zum Hieb ausholte, war dieser 8,5 Meter lange Theropode perfekt an die Jagd auf große Beute angepasst. Fossilien aus dem Morrison-Formation im Westen Nordamerikas und in Portugal zeigen, dass Allosaurus einer der erfolgreichsten Raubtiere des Mesozoikums war.',
  kidsDescription: 'Allosaurus war der größte und furchteinflößendste Fleischfresser der Jurazeit! Mit einem Mund voller scharfer Zähne, starken Klauenhänden und einem kräftigen Hals war er der ultimative Jäger seiner Zeit. Er jagte riesige Sauropoden wie Diplodocus!',
  childFriendlyText: 'Allosaurus war das furchteinflößendste Raubtier des Jura. Er jagte große Dinosaurier und hatte messerscharfe Zähne.',
  scientificSummary: 'Allosaurus fragilis (Marsh, 1877) ist ein allosaurider Theropode aus der oberjurassischen Morrison-Formation (~155–145 Mio. Jahre) im Westen Nordamerikas und in Portugal. Als Spitzenprädator seiner Ökosysteme gehört er zu den am besten untersuchten großen Theropoden, mit Dutzenden von Exemplaren, die vom Jungtier bis zum Erwachsenen reichen.',
  funFact: 'Allosaurus hatte einen extrem flexiblen Kiefer — er konnte sein Maul so weit öffnen, dass er mit den oberen Zähnen wie mit einer Axt auf seine Beute einhacken konnte.',
  facts: [
    { label: 'Größe', value: '8,5 Meter', description: 'Ein großer Theropode der späten Jurazeit, der eine breite Palette von Beutetieren jagte.' },
    { label: 'Hände', value: 'Drei Finger mit Klauen', description: 'Kräftige Arme mit drei Fingern und scharfen gebogenen Klauen zum Ergreifen und Festhalten von Beute.' },
    { label: 'Zähne', value: 'Sägezahnartig', description: 'Gezackte, klingenartige Zähne, perfekt zum Durchtrennen von Fleisch.' },
    { label: 'Verbreitung', value: 'Nordamerika und Europa', description: 'Fossilien in den USA und Portugal gefunden, was eine weite Verbreitung zeigt.' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Beute' },
    { id: 'diplodocus', relationship: 'Beute' },
    { id: 'ceratosaurus', relationship: 'Konkurrent' },
  ],
  discoveries: [
    { year: 1877, location: 'Colorado, USA', discoveredBy: 'Othniel Charles Marsh', note: 'Erstmals während der Bone Wars beschrieben.' },
    { year: 1991, location: 'Wyoming, USA', discoveredBy: 'Kirby Siber', note: '"Big Al" — eines der vollständigsten Theropodenskelette.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Utah', coordinates: [39.0, -111.0], specimenName: 'Cleveland-Lloyd-Steinbruch' },
    { country: 'USA', region: 'Wyoming', coordinates: [43.0, -107.5] },
    { country: 'Portugal', region: 'Lourinhã', coordinates: [39.3, -9.3] },
  ],
}
