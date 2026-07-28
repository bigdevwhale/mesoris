export default {
  name: 'Anchiornis',
  displayName: 'Anchiornis',
  pronunciation: 'AN-ki-OR-nis',
  nameMeaning: '«Casi ave»',
  description: 'Anchiornis fue un pequeño dinosaurio paraviano de cuatro alas del Jurásico de China, el primer dinosaurio mesozoico cuyos colores reales se reconstruyeron. Con alas rayadas de blanco y negro y una corona oxidada, parecía un pájaro carpintero del Jurásico.',
  kidsDescription: '¡Anchiornis era un dinosauro diminuto y emplumado, del tamaño de un gorrión, y fue el PRIMER dinosaurio del que conocemos los colores reales! Los científicos descubrieron que tenía alas rayadas de blanco y negro y una cabeza rojiza oxidada, ¡como un pájaro carpintero del Jurásico!',
  childFriendlyText: 'Anchiornis era un dinosaurio diminuto con alas blancas y negras y una cresta roja. ¡Fue el primer dinosaurio del que los científicos pudieron reconstruir los colores reales!',
  scientificSummary: 'Anchiornis huxleyi (Xu et al., 2009) es un terópodo paraviano de la Formación Tiaojishan (Oxfordiense), Liaoning, China. Cientos de especímenes conocidos. Diagnóstico: plumas pennáceas largas en miembros anteriores y posteriores; geometría de melanosomas reconstruida como alas con bandas blancas y negras y cresta oxidada, el primer dinosaurio mesozoico con coloración reconstruida con confianza.',
  funFact: 'El primer dinosaurio del que se publicó el "color real" fue Anchiornis, ¡y el resultado fue tan llamativo que el estudio apareció en portada de Nature en 2010! Desde entonces, esa tecnología se ha usado en decenas de otros dinosaurios emplumados.',
  facts: [
    { label: 'Color', value: 'Primer color conocido', description: 'El primer dinosaurio mesozoico del que se reconstruyeron los colores reales: alas blancas y negras con una corona oxidada.' },
    { label: 'Alas', value: 'Cuatro alas', description: 'Largas plumas pennáceas en brazos y piernas, un diseño corporal de cuatro alas como el de Microraptor.' },
    { label: 'Tamaño', value: 'Del tamaño de un gorrión', description: 'Diminuto, apenas más grande que un gorrión, con un peso de solo unos 200 gramos.' },
    { label: 'Planeo', value: 'Asistido por alas', description: 'No podía volar con fuerza, pero probablemente usaba sus alas para planar y controlar el cuerpo al saltar entre ramas.' },
  ],
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Primo paraviano de cuatro alas' },
    { id: 'archaeopteryx', relationship: 'Contemporáneo avialano temprano' },
    { id: 'troodon', relationship: 'Pariente troodóntido más grande' },
  ],
  discoveries: [
    { year: 2009, location: 'Formación Tiaojishan, Liaoning, China', discoveredBy: 'Xu Xing y equipo', note: 'Los especímenes fueron inicialmente nombrados y reconocidos como pequeños paravianos emplumados.' },
    { year: 2010, location: 'China', discoveredBy: 'Zhang Fucheng y equipo', note: 'La primera reconstrucción de la verdadera coloración de Anchiornis fue publicada en Nature.' },
  ],
  fossilLocations: [
    { country: 'China', region: 'Formación Tiaojishan, Liaoning', coordinates: [41.6, 120.7], specimenName: 'IVPP V14378 — material tipo, cientos de especímenes referidos' },
  ],
}
