export default {
  name: 'Pachycephalosaurus',
  displayName: 'Pachycephalosaurus',
  pronunciation: 'PA-ki-ze-FA-lo-SAU-rus',
  nameMeaning: 'Dickkopfeidechse',
  description: 'Pachycephalosaurus ist der Dinosaurier mit dem buchstablich dicksten Schadel der Tierwelt. Eine massive Kuppel aus massivem Knochen — bis zu 25 Zentimeter dick — kronte seinen Kopf. Ob diese Kuppel fur Kopfstobe wie bei Dickhornschafen oder eher zur Schaustellung diente, wird unter Wissenschaftlern noch immer heia diskutiert. Er lebte ganz am Ende der Kreidezeit und teilte seine Welt mit Tyrannosaurus rex und Triceratops.',
  kidsDescription: 'Dieser Dinosaurier hatte einen SUPERTHICKEN KOPF — als hatte er einen Schutzhelm aus Knochen getragen! Sein Schadeldach war 25 Zentimeter massiver Knochen. Wissenschaftler glauben, sie konnten Kopfe zusammengestoEen haben wie Steinbocke ... aber vielleicht zeigten sie auch einfach nur ihre coolen Kuppeln her!',
  childFriendlyText: 'Pachycephalosaurus hatte eine riesige Knochenbeule auf dem Kopf — wie ein eingebauter Schutzhelm! Er hat vielleicht mit anderen Dinosauriern Kopfe zusammengestoEen.',
  scientificSummary: 'Pachycephalosaurus wyomingensis (Brown & Schlaikjer, 1943) ist ein pachycephalosaurider Marginocephalia aus dem Maastrichtium Nordamerikas. Der grobte Pachycephalosaurier mit einer uber 25 cm dicken Frontoparietalkuppel. Histologische Analysen deuten eher auf Arten-Erkennung oder FlankenstobEn als auf direktes Kopframmen hin.',
  funFact: 'Das erste gefundene Pachycephalosaurus-Fossil war nur die Schadelkuppel — Wissenschaftler hielten sie fur eine Dinosaurier-Kniescheibe!',
  facts: [
    { label: 'Schadelkuppel', value: '25 cm dick', description: 'Eine massive Kuppel aus kompaktem Knochen auf dem Schadeldach.' },
    { label: 'KopfstobEn', value: 'Umstritten', description: 'Eventuell KopfstobE wie bei Dickhornschafen — oder nur Schaustellung.' },
    { label: 'Zahne', value: 'Klein und blattformig', description: 'Winzige Zahne — ernahrte sich von weichen Pflanzen, Fruchten und eventuell Insekten.' },
    { label: 'Groae', value: '4,5 Meter', description: 'Zweibeiniger Pflanzenfresser, etwa so schwer wie ein Pferd.' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Rauber' },
    { id: 'triceratops', relationship: 'Zeitgenosse' },
  ],
  discoveries: [
    { year: 1931, location: 'Wyoming, USA', discoveredBy: 'Charles Gilmore', note: 'Erste Schadelkuppel entdeckt.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Wyoming', coordinates: [44.5, -105.0], specimenName: 'Lance-Formation' },
    { country: 'USA', region: 'Montana', coordinates: [47.5, -106.5] },
  ],
}
