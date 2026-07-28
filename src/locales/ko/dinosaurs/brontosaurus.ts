export default {
  name: '브론토사우루스',
  displayName: '브론토사우루스',
  pronunciation: '브론토사우루스',
  nameMeaning: '천둥 도마뱀',
  description: '브론토사우루스——"천둥 도마뱀"——은 역사상 가장 상징적인 공룡 중 하나입니다. 수십 년 동안 과학자들은 아파토사우루스와 동일하다고 생각했지만, 2015년에 독립된 속으로 부활했습니다. 북아메리카의 쥐라기 후기에 서식한 이 거대한 용각류는 몸길이 22미터 이상, 체중 약 15톤에 달했습니다. 그 이름은 한 걸음마다 대지를 뒤흔들 정도로 거대했던 동물의 이미지를 완벽하게 포착하고 있습니다.',
  kidsDescription: '브론토사우루스가 돌아왔어요! 예전에는 과학자들이 "그런 공룡은 없어"라고 말했답니다——그런데 2015년에, 정말로 독립된 공룡이었다는 것이 밝혀졌어요! 이름은 "천둥 도마뱀"이라는 뜻으로, 그 발소리가 천둥처럼 울렸기 때문이에요.',
  childFriendlyText: '브론토사우루스는 "천둥 도마뱀"이라는 뜻입니다. 걸을 때 땅을 뒤흔드는, 거대한 목 긴 공룡이었습니다.',
  scientificSummary: 'Brontosaurus excelsus(Marsh, 1879)는 북아메리카의 쥐라기 후기 모리슨층에서 산출되는 디플로도쿠스과의 용각류입니다. 아파토사우루스와의 1세기 이상에 걸친 시노님 관계 후, 2015년의 포괄적인 계통 분석을 통해 경추, 체간, 골반대의 강건한 차이가 강조되어 이 속이 부활했습니다.',
  funFact: '브론토사우루스는 거의 한 세기 동안 "멸종"해 있었습니다. 동물로서가 아니라, 이름으로서요! 1903년부터 2015년까지 과학자들은 브론토사우루스는 그저 아파토사우루스일 뿐이라고 말했습니다. 그 후 새로운 연구가 그것을 되살려낸 것입니다.',
  facts: [
    { label: '이름', value: '천둥 도마뱀', description: '그 거대한 발소리가 만들어낸 천둥 같은 소리에 연유하여 명명되었습니다.' },
    { label: '재발견', value: '2015년에 부활', description: '수십 년간 아파토사우루스와 동일시되었으나, 2015년의 새로운 연구로 유효한 속으로 부활했습니다.' },
    { label: '크기', value: '22m', description: '탄탄한 체격의 대형 용각류로, 근연인 아파토사우루스보다 무겁고 튼튼했습니다.' },
    { label: '목', value: '튼튼하고 굵음', description: '목은 디플로도쿠스보다 굵고 근육질이어서, 다른 섭식 습관을 나타냅니다.' },
  ],
  relatedDinosaurs: [
    { id: 'apatosaurus', relationship: '매우 가까운 디플로도쿠스과 친척(한때 같은 속으로 간주됨)' },
    { id: 'diplodocus', relationship: '근연 디플로도쿠스과 친척' },
    { id: 'brachiosaurus', relationship: '동시대 용각류' },
  ],
  discoveries: [
    { year: 1879, location: '미국 와이오밍주 코모 블러프(모리슨층)', discoveredBy: 'O.C. 마쉬', note: '마쉬가 Brontosaurus excelsus로 명명; 1903년에 아파토사우루스와 동일시되었으나 2015년에 유효한 속으로 복원되었습니다.' },
    { year: 2015, location: '학술 논문(여러 컬렉션)', discoveredBy: '에마누엘 촙, 옥타비오 마테우스, 로저 벤슨', note: '81점의 디플로도쿠스과 표본을 분석한 획기적인 해부학 연구가 브론토사우루스를 아파토사우루스와 구별되는 유효한 속으로 재확립했습니다.' },
  ],
  fossilLocations: [
    { country: '미국', region: '와이오밍주 코모 블러프(모리슨층)', coordinates: [41.8, -106.0], specimenName: 'YPM 1980 — B. excelsus 모식표본' },
    { country: '미국', region: '콜로라도주 가든 파크(모리슨층)', coordinates: [38.4, -105.1], specimenName: 'AMNH 460 — 참조된 대형 표본' },
    { country: '미국', region: '와이오밍주 본 캐빈 채석장(모리슨층)', coordinates: [41.79, -105.67], specimenName: 'B. parvus 화석' },
  ],
}
