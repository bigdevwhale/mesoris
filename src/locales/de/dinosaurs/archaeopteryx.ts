export default {
  name: 'Archaeopteryx',
  displayName: 'Archaeopteryx',
  pronunciation: 'ar-che-OP-te-riks',
  nameMeaning: '«Urzeitflügel»',
  description: 'Archaeopteryx ist eines der berühmtesten Fossilien der Wissenschaft, weil er genau am Übergang zwischen Dinosaurier und Vogel steht. Er vereinte scharfe Zähne, klauenbewehrte Finger und einen langen Schwanz mit asymmetrischen Schwungfedern und echten Flügeln.',
  kidsDescription: 'Archaeopteryx sah aus wie ein winziger Dinosaurier mit echten Flügeln! Er hatte Federn wie ein Vogel, aber auch Zähne und einen langen Schwanz wie ein kleiner Raptor. Eines der coolsten „Dazwischen“-Fossilien, die je gefunden wurden.',
  childFriendlyText: 'Archaeopteryx war ein kleiner gefiederter Dinosaurier, der wahrscheinlich flattern und gleiten konnte. Er hatte Flügel, aber auch Zähne und einen langen Schwanz!',
  scientificSummary: 'Archaeopteryx lithographica (Meyer, 1861) ist ein avialaner/paravianer Theropode aus den tithonischen Solnhofener Ablagerungen Bayerns. Die Exemplare bewahren asymmetrische Remiges, Furcula, Gastralia, Bezahnung, Handklauen und verlängerte Schwanzwirbel. Es handelt sich um ein zentrales Taxon für das Verständnis des Erwerbs vogelartiger Flugmerkmale bei nicht-avialen Theropoden.',
  funFact: 'Archaeopteryx wurde so schnell weltberühmt, dass Abgüsse in Schulen und Museen in ganz Europa untersucht wurden, lange bevor viele andere große Dinosaurier überhaupt einen Namen hatten.',
  facts: [
    { label: 'Brückenfossil', value: 'Dino + Vogel', description: 'Archaeopteryx bewahrte klassische Theropodenmerkmale wie Zähne und einen langen Knochenschwanz, zusammen mit vogelähnlichen Schwungfedern, was ihn zu einem Schlüssel-Übergangsfossil macht.' },
    { label: 'Berühmter Fund', value: 'Exemplar von 1861', description: 'Sein erstes Skelett wurde nur zwei Jahre nach Darwins Veröffentlichung von „Über die Entstehung der Arten“ bekannt — und schnell eine Ikone der Evolution.' },
    { label: 'Flugstil', value: 'Kurze Stöße', description: 'Die meisten Studien deuten darauf hin, dass er starten und kurze Strecken flattern konnte, statt langen modernen Vogelflug durchzuhalten.' },
    { label: 'Größe', value: 'Rabengroß', description: 'Mit etwa einem halben Meter Länge und rund einem Kilogramm war er ein kleiner gefiederter Räuber in den Inselwäldern des späten Jura.' },
  ],
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Mit Federn bedeckter Paravier-Verwandter mit aerodynamischen Anpassungen' },
    { id: 'troodon', relationship: 'Vogelähnlicher Theropode mit fortgeschrittener Sinnesanatomie' },
    { id: 'velociraptor', relationship: 'Späterer Dromaeosaurier-Verwandter innerhalb der Maniraptoren' },
  ],
  discoveries: [
    { year: 1861, location: 'Solnhofen-Kalkstein, Bayern, Deutschland', discoveredBy: 'Steinbrucharbeiter; beschrieben von Hermann von Meyer', note: 'Erstes Skelett-Exemplar von Archaeopteryx wurde formal beschrieben und mit der Evolution der Vögel verknüpft.' },
    { year: 1877, location: 'Blumenberg bei Eichstätt, Deutschland', discoveredBy: 'Steinbruch von Jakob Niemeyer', note: 'Das Berliner Exemplar bewahrte einen außergewöhnlichen Schädel und Federabdrücke und wurde zum klassischen Museumsexemplar.' },
  ],
  fossilLocations: [
    { country: 'Deutschland', region: 'Solnhofen, Bayern', coordinates: [48.9, 10.99], specimenName: 'Londoner Exemplar (BMNH 37001)' },
    { country: 'Deutschland', region: 'Eichstätt, Bayern', coordinates: [48.89, 11.18], specimenName: 'Berliner Exemplar (HMN 1880)' },
  ],
}
