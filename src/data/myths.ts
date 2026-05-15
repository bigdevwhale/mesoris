import type { MythVsFact } from '@/types/content'

export const myths: MythVsFact[] = [
  {
    id: 'myth-cavemen',
    myth: 'Cavemen and dinosaurs lived together.',
    fact: 'The last non-avian dinosaurs went extinct 66 million years before the first humans appeared. The Flintstones is pure fiction!',
    category: 'history',
  },
  {
    id: 'myth-trex-vision',
    myth: 'T. rex couldn\'t see you if you stood still.',
    fact: 'T. rex had excellent binocular vision — among the best of any dinosaur. Standing still would not have saved you.',
    category: 'biology',
    dinosaurId: 'tyrannosaurus-rex',
  },
  {
    id: 'myth-stegosaurus-brain',
    myth: 'Stegosaurus had a second brain in its rear end.',
    fact: 'The cavity in the hip area was likely a glycogen body — an energy storage organ found in modern birds. No second brain.',
    category: 'biology',
    dinosaurId: 'stegosaurus',
  },
  {
    id: 'myth-velociraptor-size',
    myth: 'Velociraptors were human-sized pack hunters like in Jurassic Park.',
    fact: 'Real Velociraptors were the size of turkeys. The movie "raptors" were based on Deinonychus, a much larger relative discovered later.',
    category: 'biology',
    dinosaurId: 'velociraptor',
  },
  {
    id: 'myth-dinosaurs-failure',
    myth: 'Dinosaurs were evolutionary failures that deserved to go extinct.',
    fact: 'Dinosaurs ruled the Earth for 165 million years. Modern humans have existed for about 300,000 years. Dinosaurs were incredibly successful.',
    category: 'evolution',
  },
  {
    id: 'myth-brontosaurus',
    myth: 'Brontosaurus never existed — it was just a misidentified Apatosaurus.',
    fact: 'A comprehensive 2015 study actually reinstated Brontosaurus as a valid, distinct genus. The dinosaur that "never existed" actually does exist!',
    category: 'history',
    dinosaurId: 'diplodocus',
  },
  {
    id: 'myth-dinosaurs-cold-blooded',
    myth: 'All dinosaurs were cold-blooded and sluggish like modern reptiles.',
    fact: 'Evidence suggests many dinosaurs were mesothermic or warm-blooded. Birds (which are dinosaurs) are fully warm-blooded.',
    category: 'biology',
  },
  {
    id: 'myth-all-extinct',
    myth: 'All dinosaurs went extinct 66 million years ago.',
    fact: 'One group of dinosaurs survived: birds. There are about 10,000 species of living dinosaurs (birds) today — more than the number of mammal species!',
    category: 'evolution',
  },
]
