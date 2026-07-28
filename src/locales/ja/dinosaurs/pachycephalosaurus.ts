export default {
  name: 'パキケファロサウルス',
  displayName: 'パキケファロサウルス',
  pronunciation: 'パキケファロサウルス',
  nameMeaning: '"分厚い頭のトカゲ"',
  description: 'パキケファロサウルスは動物界で文字通り最も分厚い頭骨を持つ恐竜です。最大25センチメートルの厚さの巨大な緻密骨のドームが頭頂部を覆っていました。科学者たちはこのドームがムフロンのような頭突きに使われたのか、それともむしろディスプレイのためだったのか、今も活発に議論しています。白亜紀の最末期に生息し、ティラノサウルス・レックスやトリケラトプスと世界を共有していました。',
  kidsDescription: 'この恐竜は頭がすごく分厚かったんだ — 骨のヘルメットをかぶっているみたいに！頭のてっぺんの骨は25センチも分厚かったんだよ。科学者はアイベックスのように頭突きをしていたかも...それともピカピカのドームを見せびらかしていただけかも！',
  childFriendlyText: 'パキケファロサウルスは頭のてっぺんに巨大な骨のコブがあったよ — 内蔵のヘルメットみたいに！他の恐竜と頭突きをしていたかもしれないんだ。',
  scientificSummary: 'Pachycephalosaurus wyomingensis (Brown & Schlaikjer, 1943) は北アメリカのマーストリヒチアン期のパキケファロサウルス科周飾頭類。最大のパキケファロサウルス類で、25cmを超える巨大に肥厚した前頭−頭頂骨ドームを持つ。組織学的分析は、頭同士の本当の格闘よりも、むしろ種内認知か側面打撃を示唆する。',
  funFact: 'パキケファロサウルスの最初に見つかった化石は頭のドームだけでした。科学者はそれを恐竜の膝蓋骨だと勘違いしました！',
  facts: [
    { label: '頭のドーム', value: '厚さ25cm', description: '頭骨天井にある巨大な緻密骨のドーム。' },
    { label: '頭突き', value: '議論あり', description: 'ムフロンのような頭突きの可能性 — あるいは単なるディスプレイ。' },
    { label: '歯', value: '小さく葉の形', description: '小さな歯 — 柔らかい植物、果実、おそらく昆虫を食べていた。' },
    { label: '体長', value: '4.5メートル', description: '二足歩行の草食動物、体重はウマほど。' },
  ],
  relatedDinosaurs: [
    { id: 'tyrannosaurus-rex', relationship: '捕食者' },
    { id: 'triceratops', relationship: '同時代種' },
  ],
  discoveries: [
    { year: 1931, location: 'アメリカ・ワイオミング州', discoveredBy: 'チャールズ・ギルモア', note: '最初の頭骨ドームが発見された。' },
  ],
  fossilLocations: [
    { country: 'USA', region: 'ワイオミング州', coordinates: [44.5, -105.0], specimenName: 'ランス累層' },
    { country: 'USA', region: 'モンタナ州', coordinates: [47.5, -106.5] },
  ],
}
