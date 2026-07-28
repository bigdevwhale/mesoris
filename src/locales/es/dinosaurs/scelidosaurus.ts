export default {
  name: 'Scelidosaurus',
  displayName: 'Esquelidosaurio',
  pronunciation: 'es-que-li-do-SAU-rio',
  nameMeaning: '«Reptil Extremidad»',
  description: 'El Scelidosaurus fue un dinosaurio acorazado temprano del Jurasico Temprano de Europa. Con placas oseas en la espalda y un cuerpo robusto de 4 metros, es uno de los tireoforos mas primitivos y mejor conocidos, ancestro de estegosaurios y anquilosaurios.',
  kidsDescription: 'Scelidosaurus fue uno de los PRIMEROS dinosaurios con armadura. Placas oseas en la espalda y cuerpo rechoncho. ¡El abuelo de Stegosaurus y Ankylosaurus!',
  childFriendlyText: 'Esquelidosaurio significa «Reptil Extremidad». Inglaterra. Plantas. 4 m. Dinosaurio acorazado primitivo.',
  scientificSummary: 'Scelidosaurus harrisonii (Owen, 1861) es un tireoforo basal del Jurasico Temprano. Clave para entender la evolucion de la armadura.',
  funFact: 'Es uno de los dinosaurios completos mas antiguos jamas encontrados. ¡Sus fosiles estan tan bien preservados que podemos ver cada placa!',
  facts: [
    { label: 'Armadura', value: 'Osteodermos', description: 'Placas oseas primitivas en la espalda' },
    { label: 'Tamaño', value: '4 m', description: 'Cuerpo robusto y bajo' },
    { label: 'Epoca', value: 'Jurasico Temprano', description: '~195 millones de anos' },
    { label: 'Ubicacion', value: 'Inglaterra', description: 'Costa Jurasica, Dorset' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Línea descendiente tireófora posterior' },
    { id: 'ankylosaurus', relationship: 'Línea descendiente tireófora posterior' },
    { id: 'euoplocephalus', relationship: 'Pariente anquilosaurio posterior' },
  ],
  discoveries: [
    { discoveredBy: 'James Harrison', note: 'Esqueleto completo descubierto; descrito por Richard Owen en 1861 en un artículo clave sobre la anatomía temprana de los dinosaurios.' },
  ],
  fossilLocations: [
    { region: 'Charmouth, Dorset, Inglaterra (Lias Inferior)', specimenName: 'NHMUK PV R1111 — holotipo, esqueleto casi completo' },
  ],
}
