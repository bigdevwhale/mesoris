export default {
  name: 'Tenontosauro',
  displayName: 'Tenontosauro',
  pronunciation: 'te-non-to-sàu-ro',
  nameMeaning: '"Lucertola dai tendini"',
  description: 'Il Tenontosauro era un grande erbivoro ornitopode del Cretaceo inferiore del Nord America, noto soprattutto per la sua relazione drammatica con il dinosauro predatore Deinonychus. Diversi denti di Deinonychus sono stati trovati tra le ossa di Tenontosauro — una delle migliori prove fossili dirette di relazioni predatore-preda nel Mesozoico.',
  kidsDescription: 'Il Tenontosauro era un grande mangiatore di piante del Cretaceo inferiore del Nord America — e il pasto preferito del DEINONYCHUS! Gli scienziati hanno trovato denti di Deinonychus sparpagliati tra le ossa di Tenontosauro, provando che questi predatori attaccavano questi grandi erbivori. Il suo nome significa "Lucertola dai tendini" perché la sua coda era irrigidita da tendini duri. La preda definitiva!',
  childFriendlyText: 'Il Tenontosauro era un erbivoro di 8 metri del Cretaceo del Nord America, famoso soprattutto per essere stato cacciato dal Deinonychus — con denti di predatore persi trovati direttamente tra le sue ossa.',
  scientificSummary: 'Tenontosaurus tilletti (Ostrom, 1970) è un ornitopode iguanodontiano delle formazioni di Cloverly e Antlers (Aptiano–Albiano, ~115–108 Ma), ovest del Nord America. Il più abbondante grande erbivoro di questo periodo. I denti di Deinonychus associati costituiscono una prova diretta di interazione predatore-preda.',
  funFact: 'La scoperta congiunta di Tenontosauro e Deinonychus da parte di John Ostrom negli anni \'60 ha contribuito a innescare la "rinascita dei dinosauri" — ribaltando l\'idea che i dinosauri fossero lenti e a sangue freddo, e mostrando che erano cacciatori attivi e sociali.',
  facts: [
    { label: 'Preda', value: 'Bersaglio di Deinonychus', description: 'Il più famoso per la sua associazione con Deinonychus — diversi denti di Deinonychus trovati tra i resti di Tenontosauro.' },
    { label: 'Coda', value: 'Irrigidita da tendini', description: 'La coda era irrigidita da una rete complessa di tendini ossificati — da cui il nome "Lucertola dai tendini".' },
    { label: 'Dimensioni', value: 'Erbivoro di medie dimensioni', description: '8 metri e 1 tonnellata — troppo grande per la maggior parte dei piccoli predatori, ma preda per i Deinonychus che cacciavano in gruppo.' },
    { label: 'Abbondanza', value: 'Fossile comune', description: 'Uno dei dinosauri più frequentemente trovati dell\'Aptiano–Albiano del Nord America.' },
  ],
  relatedDinosaurs: [
    { id: 'deinonychus', relationship: 'Predatore principale (documentato da denti caduti)' },
    { id: 'iguanodon', relationship: 'Parente iguanodontiano più grande' },
    { id: 'camptosaurus', relationship: 'Parente ornitopode più antico' },
  ],
  discoveries: [
    { discoveredBy: 'John H. Ostrom', note: 'Ostrom descrisse Tenontosaurus nel 1970 da materiale del Cloverly; la stessa spedizione fornì gli ormai celebri esemplari di Deinonychus.' },
  ],
  fossilLocations: [
    { region: 'Contea di Wheatland, Montana (Formazione Cloverly)', specimenName: 'AMNH 3040 — olotipo, scheletro' },
    { region: 'Contea di Carter, Oklahoma (Formazione Antlers)', specimenName: 'Esemplari riferiti dell\'Oklahoma' },
  ],
}
