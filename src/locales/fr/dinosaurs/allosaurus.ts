export default {
  name: 'Allosaurus',
  displayName: 'Allosaurus',
  pronunciation: 'a-lo-ZO-russ',
  nameMeaning: 'Lézard différent',
  description: 'Allosaurus était le superprédateur du Jurassique supérieur et le cauchemar des sauropodes géants. Avec un crâne massif rempli de dents en lame de scie, de puissantes mains à trois doigts aux griffes recourbées et un cou robuste prêt à frapper, ce théropode de 8,5 mètres de long était parfaitement adapté à la chasse de grandes proies. Les fossiles de la formation Morrison dans l\'Ouest nord-américain et au Portugal montrent qu\'Allosaurus fut l\'un des prédateurs les plus réussis du Mésozoïque.',
  kidsDescription: 'Allosaurus était le plus grand et le plus terrifiant carnivore du Jurassique ! Avec une gueule pleine de dents acérées, des mains griffues puissantes et un cou robuste, c\'était le chasseur ultime de son époque. Il chassait des sauropodes géants comme Diplodocus !',
  childFriendlyText: 'Allosaurus était le prédateur le plus terrifiant du Jurassique. Il chassait de grands dinosaures et avait des dents tranchantes comme des couteaux.',
  scientificSummary: 'Allosaurus fragilis (Marsh, 1877) est un théropode allosauridé de la formation Morrison du Jurassique supérieur (~155–145 Ma) dans l\'Ouest nord-américain et au Portugal. En tant que superprédateur de ses écosystèmes, c\'est l\'un des grands théropodes les mieux étudiés, avec des dizaines de spécimens allant du juvénile à l\'adulte.',
  funFact: 'Allosaurus avait une mâchoire extrêmement flexible — il pouvait ouvrir la gueule si grand qu\'il utilisait ses dents supérieures comme une hache pour frapper ses proies.',
  facts: [
    { label: 'Taille', value: '8,5 mètres', description: 'Un grand théropode du Jurassique supérieur qui chassait une grande variété de proies.' },
    { label: 'Mains', value: 'Trois doigts griffus', description: 'Des bras puissants avec trois doigts aux griffes acérées et recourbées pour saisir et retenir les proies.' },
    { label: 'Dents', value: 'En lame de scie', description: 'Des dents dentelées en forme de lame, parfaites pour trancher la chair.' },
    { label: 'Répartition', value: 'Amérique du Nord et Europe', description: 'Des fossiles découverts aux États-Unis et au Portugal, indiquant une vaste répartition.' },
  ],
  relatedDinosaurs: [
    { id: 'stegosaurus', relationship: 'Proie' },
    { id: 'diplodocus', relationship: 'Proie' },
    { id: 'ceratosaurus', relationship: 'Concurrent' },
  ],
  discoveries: [
    { year: 1877, location: 'Colorado, États-Unis', discoveredBy: 'Othniel Charles Marsh', note: 'Décrit pour la première fois pendant les Guerres des Os.' },
    { year: 1991, location: 'Wyoming, États-Unis', discoveredBy: 'Kirby Siber', note: '"Big Al" — l\'un des squelettes de théropode les plus complets jamais trouvés.' },
  ],
  fossilLocations: [
    { country: 'États-Unis', region: 'Utah', coordinates: [39.0, -111.0], specimenName: 'Carrière de Cleveland-Lloyd' },
    { country: 'États-Unis', region: 'Wyoming', coordinates: [43.0, -107.5] },
    { country: 'Portugal', region: 'Lourinhã', coordinates: [39.3, -9.3] },
  ],
}
