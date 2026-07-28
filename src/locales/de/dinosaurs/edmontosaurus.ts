export default {
  name: 'Edmontosaurus',
  displayName: 'Edmontosaurus',
  pronunciation: 'ed-MON-to-SAU-rus',
  nameMeaning: '«Edmonton-Echse»',
  description: 'Das Vieh der Kreidezeit. Edmontosaurus zog in riesigen Herden über die Küstenebenen Nordamerikas und war eine Hauptnahrungsquelle für T. rex. Ihre „mumifizierten" Fossilien — mit Haut und Mageninhalt — gehören zu den spektakulärsten Dinosaurierfunden überhaupt.',
  kidsDescription: 'Edmontosaurus war ein RIESIGER Entenschnabel-Dinosaurier. Wir wissen SO viel über ihn, weil einige Fossilien „Mumien" sind — mit echter Haut und sogar der letzten Mahlzeit noch drin! Es war die Hauptnahrung für T-Rex. Stell dir vor, du bist so verbreitet, dass du das Abendessen von allen bist!',
  childFriendlyText: 'Edmontosaurus war ein großer Pflanzenfresser mit Entengesicht. Wir wissen, wie er aussah, weil einige Fossilien noch Haut haben — wie Dino-Mumien!',
  scientificSummary: 'Edmontosaurus annectens (Marsh, 1892) ist ein saurolophiner Hadrosaurier aus dem Maastrichtium des westlichen Nordamerikas. Einer der größten Hadrosaurier mit bis zu 13 m; besaß eine Zahnbatterie mit etwa 1.200 Zähnen in einem kontinuierlichen Ersatzsystem. Weichteilerhaltung bei mehreren Exemplaren („Dakota", „Leonardo", „AMNH 5060") liefert beispiellose Einblicke in Hadrosaurier-Hauttextur, Gliedmaßenmuskulatur und Mageninhalt.',
  funFact: 'Die Edmontosaurus-Mumie „Dakota" ist so gut erhalten, dass CT-Scans die exakte Textur ihrer Haut zeigten — ihr Rücken war mit sechseckigen Schuppen bedeckt, wie ein Schildkrötenpanzer.',
  facts: [
    { label: 'Mumie', value: 'Haut erhalten', description: 'Mehrere „Mumien"-Exemplare existieren mit Haut und sogar erhaltenem Mageninhalt.' },
    { label: 'Größe', value: 'Einer der größten', description: 'Erreichte 13 Meter — unter den größten Hadrosauriern und Hauptbeute von T. rex.' },
    { label: 'Zähne', value: 'Kau-Kraftwerk', description: 'Über 1.000 Zähne in einer ausgeklügelten Mahlbatterie zum Zermahlen zäher Pflanzen.' },
    { label: 'Nase', value: 'Aufblasbarer Sack', description: 'Hatte möglicherweise einen aufblasbaren Nasensack für visuelle und akustische Zurschaustellung.' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: 'Beute' },
    { id: 'maiasaura', relationship: 'Enger Verwandter' },
  ],
  discoveries: [
    { year: 1892, location: 'South Dakota, USA', discoveredBy: 'Othniel Charles Marsh', note: 'Erstmals beschrieben.' },
    { year: 1999, location: 'North Dakota, USA', discoveredBy: 'Tyler Lyson', note: '„Dakota" — eines der am besten erhaltenen Dinosaurier-Mumien-Exemplare.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'South Dakota', coordinates: [44.5, -100.0], specimenName: 'Hell-Creek-Formation' },
    { country: 'Kanada', region: 'Alberta', coordinates: [53.5, -113.5] },
  ],
}
