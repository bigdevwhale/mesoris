export default {
  name: 'Ceratosaurus',
  displayName: 'Ceratosaurus',
  pronunciation: 'ze-RA-to-SAU-rus',
  nameMeaning: 'Gehörnte Echse',
  description: 'Ceratosaurus war ein markanter mittelgroßer Theropode aus dem oberen Jura mit einem charakteristischen Nasenhorn, knöchernen Leisten über den Augen und einer Reihe kleiner Osteoderme auf dem Rücken. Er jagte in den Überschwemmungsebenen des Morrison-Formation neben dem größeren Allosaurus und hatte sich eine eigene ökologische Nische geschaffen. Sein tiefer, flexibler Schädel und seine langen klingenartigen Zähne machen ihn zu einem faszinierenden mittelgroßen Raubtier.',
  kidsDescription: 'Ceratosaurus hatte ein großes Horn auf der Nase — wie ein Dinosaurier-Nashorn! Er war ein schneller Jäger, der neben dem riesigen Allosaurus lebte, aber seine eigene Art zu jagen hatte.',
  childFriendlyText: 'Ceratosaurus war ein gehörnter Fleischfresser mit einem Nasenhorn. Er lebte im Jura und war ein schlanker, schneller Jäger.',
  scientificSummary: 'Ceratosaurus nasicornis (Marsh, 1884) ist ein ceratosaurider Theropode aus der oberjurassischen Morrison-Formation (~153–145 Mio. Jahre) im Westen Nordamerikas und in Portugal. Er zeichnet sich durch ein prominentes medianes Nasenhorn, paarige knöcherne Tränenleisten und eine Reihe dorsaler Osteoderme aus. Phylogenetisch stellt er eine basale Radiation der Ceratosaurier dar, einer Gruppe, die von der Trias bis zur späten Kreidezeit überlebte.',
  funFact: 'Ceratosaurus hatte einen extrem tiefen, flexiblen Kiefer. Zusammen mit seinen extrem langen Zähnen erlaubte ihm dies, Beute zu packen und tödliche Bisse zuzufügen, ähnlich wie moderne Warane.',
  facts: [
    { label: 'Horn', value: 'Nasenhorn', description: 'Ein prominentes Horn auf der Nase, dessen genaue Funktion unbekannt ist — möglicherweise zum Display oder für innerartliche Kämpfe.' },
    { label: 'Augenleisten', value: 'Knöcherne Wülste', description: 'Zwei knöcherne Leisten über den Augen gaben dem Schädel ein wildes, drachenartiges Aussehen.' },
    { label: 'Osteoderme', value: 'Rückenpanzer', description: 'Anders als die meisten großen Theropoden hatte Ceratosaurus kleine Knochenplatten entlang des Rückens.' },
    { label: 'Größe', value: '6 Meter lang', description: 'Ein mittelgroßer Theropode, der neben dem größeren und häufigeren Allosaurus lebte.' },
  ],
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Konkurrent' },
    { id: 'carnotaurus', relationship: 'Entfernter Verwandter' },
  ],
  discoveries: [
    { year: 1883, location: 'Colorado, USA', discoveredBy: 'Marshall P. Felch', note: 'Erstes Skelett in Garden Park entdeckt.' },
    { year: 2000, location: 'Portugal', discoveredBy: 'Octavio Mateus', note: 'Das europäische Exemplar bestätigte die weite Verbreitung der Gattung.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Colorado', coordinates: [38.5, -105.0], specimenName: 'Morrison-Formation' },
    { country: 'Portugal', region: 'Lourinhã', coordinates: [39.3, -9.3] },
  ],
}
