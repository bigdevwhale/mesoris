export default {
  name: 'Torvosaurus',
  displayName: 'Torvosaurio',
  pronunciation: 'tor-vo-SAU-rio',
  nameMeaning: '«Reptil Salvaje»',
  description: 'El Torvosaurus fue uno de los carnivoros mas grandes del Jurasico Tardio. Con 11 metros de largo y dientes de 15 cm, rivalizaba con Allosaurus como superdepredador en Norteamerica y Europa. Sus brazos eran inusualmente grandes y fuertes.',
  kidsDescription: 'Torvosaurus era un cazador SALVAJE. ¡Rival del Allosaurus! Mas grande que un T. rex joven, con dientes larguisimos y brazos fuertes.',
  childFriendlyText: 'Torvosaurio significa «Reptil Salvaje». Norteamerica y Europa. Carne. 11 m. Superdepredador.',
  scientificSummary: 'Torvosaurus tanneri (Galton y Jensen, 1979) es un teropodo megalosaurido. Uno de los mayores teropodos del Jurasico.',
  funFact: 'Era tan grande que probablemente podia cazar sauropodos jovenes. Sus dientes de 15 cm son de los mas grandes de cualquier teropodo jurasico.',
  facts: [
    { label: 'Longitud', value: '11 m', description: 'Uno de los mayores del Jurasico' },
    { label: 'Dientes', value: '15 cm', description: 'Dientes enormes para un teropodo jurasico' },
    { label: 'Brazos', value: 'Poderosos', description: 'Brazos grandes y fuertes para sujetar' },
    { label: 'Rango', value: 'Norteamerica y Europa', description: 'En dos continentes' },
  ],
  relatedDinosaurs: [
    { id: 'allosaurus', relationship: 'Competidor depredador ápice contemporáneo' },
    { id: 'megalosaurus', relationship: 'Pariente megalosáurido cercano' },
    { id: 'ceratosaurus', relationship: 'Depredador contemporáneo de la Formación Morrison' },
  ],
  discoveries: [
    { discoveredBy: 'James Jensen', note: 'Material recolectado por primera vez en 1972; descrito formalmente por Peter Galton y James Jensen en 1979 como Torvosaurus tanneri.' },
    { discoveredBy: 'Octávio Mateus et al.', note: 'Se describió la especie europea T. gurneyi; también se encontraron embriones conservados en huevos, proporcionando datos raros sobre la reproducción de terópodos del Jurásico.' },
  ],
  fossilLocations: [
    { region: 'Dry Mesa Quarry, Condado de Delta, Colorado (Formación Morrison)', specimenName: 'BYU 2002 — esqueleto parcial holotipo' },
    { region: 'Formación Lourinhã, Torres Vedras', specimenName: 'ML 632 — holotipo de T. gurneyi; material embrionario' },
  ],
}
