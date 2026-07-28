export default {
  name: 'Archaeopteryx',
  displayName: 'Archaeopteryx',
  pronunciation: 'ar-ke-op-TE-riks',
  nameMeaning: '"Ala antica"',
  description: 'Archaeopteryx è uno dei fossili più famosi della scienza perché si colloca vicino alla transizione tra dino e uccello. Combinava denti affilati, dita artigliate e una lunga coda con piume di volo asimmetriche e vere ali.',
  kidsDescription: 'Archaeopteryx sembrava un minuscolo dinosauro con ali vere! Aveva piume come un uccello, ma anche denti e una lunga coda, come un piccolo rapace. Uno dei fossili "intermedi" più incredibili mai trovati.',
  childFriendlyText: 'Archaeopteryx era un piccolo dinosauro piumato che probabilmente sbatteva le ali e planava. Aveva ali, ma anche denti e una lunga coda!',
  scientificSummary: 'Archaeopteryx lithographica (Meyer, 1861) è un teropode avialano/paraviano del Titoniano dei calcari di Solnhofen in Baviera, datato a circa 151–148 milioni di anni. Conserva una combinazione di tratti aviani e teropodi: remiganti asimmetriche, furcula, denti, artigli manuali e lunghe vertebre caudali.',
  funFact: 'Archaeopteryx divenne famoso così in fretta che i suoi calchi vennero studiati in scuole e musei di tutta Europa prima ancora che molti altri grandi dinosauri venissero nominati.',
  facts: [
    { label: 'Fossile ponte', value: 'Dino + uccello', description: 'Archaeopteryx conservava tratti classici dei teropodi come denti e coda ossea lunga, insieme a piume di volo piumate, rendendolo un fossile di transizione chiave.' },
    { label: 'Scoperta celebre', value: 'Esemplare del 1861', description: 'Il suo primo scheletro fu annunciato solo due anni dopo la pubblicazione de L\'Origine delle specie di Darwin, diventando rapidamente un\'icona dell\'evoluzione.' },
    { label: 'Stile di volo', value: 'Brevi scatti', description: 'La maggior parte degli studi suggerisce che potesse lanciarsi e sbattere le ali su brevi distanze, più che sostenere un volo lungo in stile uccello moderno.' },
    { label: 'Dimensioni', value: 'Come un corvo', description: 'Lungo circa mezzo metro e con un peso di circa 1 chilogrammo, era un piccolo predatore piumato nelle foreste insulari del Giurassico superiore.' },
  ],
  relatedDinosaurs: [
    { id: 'microraptor', relationship: 'Paraviano piumato affine con adattamenti aerodinamici' },
    { id: 'troodon', relationship: 'Teropode simile a uccello con anatomia sensoriale avanzata' },
    { id: 'velociraptor', relationship: 'Parente dromeosauride più tardo tra i teropodi maniraptori' },
  ],
  discoveries: [
    { year: 1861, location: 'Calcare di Solnhofen, Baviera, Germania', discoveredBy: 'Lavoratori delle cave; descritto da Hermann von Meyer', note: 'Primo esemplare scheletrico di Archaeopteryx formalmente descritto e collegato all\'evoluzione aviaria.' },
    { year: 1877, location: 'Blumenberg vicino a Eichstätt, Germania', discoveredBy: 'Cave di Jakob Niemeyer', note: 'L\'esemplare di Berlino conservava un cranio eccezionale e impronte di piume, diventando il classico esempio museale.' },
  ],
  fossilLocations: [
    { country: 'Germania', region: 'Solnhofen, Baviera', coordinates: [48.9, 10.99], specimenName: 'Esemplare di Londra (BMNH 37001)' },
    { country: 'Germania', region: 'Eichstätt, Baviera', coordinates: [48.89, 11.18], specimenName: 'Esemplare di Berlino (HMN 1880)' },
  ],
}
