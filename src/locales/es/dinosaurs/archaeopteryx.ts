export default {
  name: 'Archaeopteryx',
  displayName: 'Archaeopteryx',
  pronunciation: 'ar-ke-o-PTE-riks',
  nameMeaning: '«Ala Antigua»',
  description: 'Archaeopteryx es uno de los fósiles más famosos de la ciencia porque se sitúa cerca de la transición dinosaurio-pájaro. Combinaba dientes afilados, dedos con garras y una larga cola con plumas asimétricas de vuelo y verdaderas alas.',
  kidsDescription: '¡Archaeopteryx parecía un dinosaurio diminuto con alas de verdad! Tenía plumas como un pájaro, pero también dientes y una larga cola, como un pequeño raptor. Es uno de los fósiles "intermedios" más sorprendentes jamás encontrados.',
  childFriendlyText: 'Archaeopteryx fue un pequeño dinosaurio emplumado que probablemente aleteaba y planeaba. ¡Tenía alas, pero también dientes y una larga cola!',
  scientificSummary: 'Archaeopteryx lithographica (Meyer, 1861) es un terópodo avialano del Tithoniano de Solnhofen (Baviera, Alemania), de hace unos 151–148 millones de años. Conserva una mezcla de rasgos avianos y terópodos: plumas asimétricas, furcula, dientes, garras manuales y una larga cola ósea.',
  funFact: 'El Archaeopteryx se hizo famoso tan rápido que sus réplicas se estudiaban en escuelas y museos de toda Europa antes de que muchos otros dinosaurios importantes fueran siquiera nombrados.',
  facts: [
    { label: 'Fósil puente', value: 'Dino + pájaro', description: 'Archaeopteryx conservaba rasgos terópodos clásicos como dientes y cola ósea, junto a plumas de vuelo, lo que lo convierte en un fósil puente clave.' },
    { label: 'Hallazgo famoso', value: 'Ejemplar de 1861', description: 'Su primer esqueleto se anunció solo dos años después de que Darwin publicara El origen de las especies, y se convirtió en un icono de la evolución.' },
    { label: 'Vuelo', value: 'Ráfagas cortas', description: 'La mayoría de los estudios sugiere que podía lanzarse y aletear distancias cortas, más que sostener un vuelo largo al estilo de las aves modernas.' },
    { label: 'Tamaño', value: 'Como un cuervo', description: 'Con medio metro de largo y alrededor de 1 kilogramo, era un pequeño depredador emplumado de los bosques insulares del Jurásico Tardío.' },
  ],
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Pariente paraviano emplumado con adaptaciones aerodinámicas' },
    { id: 'troodon', relationship: 'Terópodo aviano con anatomía sensorial avanzada' },
    { id: 'velociraptor', relationship: 'Pariente dromeosáurido posterior dentro de los terópodos maniraptores' },
  ],
  discoveries: [
    { year: 1861, location: 'Caliza de Solnhofen, Baviera, Alemania', discoveredBy: 'Trabajadores de cantera; descrito por Hermann von Meyer', note: 'Primer espécimen esquelético de Archaeopteryx formalmente descrito y vinculado a la evolución aviar.' },
    { year: 1877, location: 'Blumenberg, cerca de Eichstätt, Alemania', discoveredBy: 'Cantera de Jakob Niemeyer', note: 'El espécimen de Berlín preservó un cráneo excepcional e impresiones de plumas, convirtiéndose en el ejemplo museístico clásico.' },
  ],
  fossilLocations: [
    { country: 'Alemania', region: 'Solnhofen, Baviera', coordinates: [48.9, 10.99], specimenName: 'Espécimen de Londres (BMNH 37001)' },
    { country: 'Alemania', region: 'Eichstätt, Baviera', coordinates: [48.89, 11.18], specimenName: 'Espécimen de Berlín (HMN 1880)' },
  ],
}
