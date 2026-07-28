export default {
  name: 'Deinonychus',
  displayName: 'Deinonychus',
  pronunciation: 'de-i-NO-ni-cus',
  nameMeaning: '"Artiglio terribile"',
  description: 'Il dinosauro che ha cambiato tutto. Deinonychus ha rivoluzionato la comprensione scientifica dei dinosauri — ha dimostrato che erano a sangue caldo, attivi e intelligenti. La sua scoperta ha inaugurato l\'era moderna della ricerca sui dinosauri.',
  kidsDescription: 'Questo dinosauro è un EROE DELLA SCIENZA! Quando i ricercatori hanno scoperto Deinonychus, hanno capito che i dinosauri non erano lenti e stupidi — erano veloci, furbi e formidabili! Aveva un grande artiglio affilato su ogni piede e cacciava in branco con i suoi amici. Ed era anche coperto di piume!',
  childFriendlyText: 'Deinonychus era un dinosauro furbo e veloce che ha cambiato il nostro modo di vedere TUTTI i dinosauri! Cacciava con gli amici e aveva un grande artiglio affilato.',
  scientificSummary: 'Deinonychus antirrhopus (Ostrom, 1969) è un teropode dromaeosauride della Formazione Cloverly (Aptiano-Albiano), Montana. Il taxon che ha più contribuito al Rinascimento dei Dinosauri — la sua descrizione ha fornito prove chiave per l\'endotermia dei teropodi, l\'ascendenza aviaria e la predazione attiva. Caratterizzato da un artiglio ungueale pedale II ipertrofico e iperestensibile (artiglio a falce), zigapofisi caudali interconnesse che formano un\'asta di irrigidimento dinamica e un volume endocranico ampliato che indica elevate capacità cognitive.',
  funFact: 'Deinonychus è il VERO dinosauro su cui sono basati i Velociraptor del film. La versione cinematografica ha le dimensioni di Deinonychus, non quelle di un tacchino come il vero Velociraptor.',
  facts: [
    { label: 'Artiglio', value: 'Falce di 12 cm', description: 'L\'ispirazione per la celebrità cinematografica di Velociraptor — un enorme artiglio retrattile di 12 cm.' },
    { label: 'Scoperta', value: 'Rivoluzionaria', description: 'La sua descrizione nel 1969 ha innescato il «Rinascimento dei Dinosauri» e ha cambiato per sempre la nostra visione dei dinosauri.' },
    { label: 'Piume', value: 'Probabilmente piumato', description: 'Le specie affini confermano le piume — a sangue caldo e simile agli uccelli.' },
    { label: 'Caccia', value: 'Cacciatore in branco', description: 'Diversi individui trovati vicino a fossili di Tenontosaurus — una prova solida di caccia in branco.' },
  ],
  relatedDinosaurs: [
    { id: 'velociraptor', relationship: 'Parente stretto' },
    { id: 'oviraptor', relationship: 'Contemporaneo' },
  ],
  discoveries: [
    { year: 1931, location: 'Montana, USA', discoveredBy: 'Barnum Brown', note: 'Primi fossili trovati ma non studiati fino a decenni dopo.' },
    { year: 1964, location: 'Montana, USA', discoveredBy: 'John Ostrom', note: 'La scoperta e l\'articolo del 1969 di Ostrom rivoluzionarono la scienza dei dinosauri.' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'Montana', coordinates: [45.5, -108.5], specimenName: 'Formazione Cloverly' },
  ],
}
