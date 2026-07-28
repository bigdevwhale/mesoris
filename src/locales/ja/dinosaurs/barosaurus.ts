export default {
  name: 'バロサウルス',
  displayName: 'バロサウルス',
  pronunciation: 'バロサウルス',
  nameMeaning: '「重いトカゲ」',
  description: 'バロサウルスは、ジュラ紀後期の北米とアフリカに生息した長い首を持つディプロドクス科の竜脚類です。最大9メートルにもなる首は、動物界で最長クラスの長さでした。',
  kidsDescription: 'バロサウルスは9メートルにもなる超ロングネックを持つ恐竜で、バスより長い首をしていました！ディプロドクスの親戚で、北米やアフリカにも生息していました。',
  childFriendlyText: 'バロサウルスは北米とアフリカに生息した、長い首の恐竜です。ディプロドクスの仲間で、9メートルにもなる首を持っていました。',
  scientificSummary: 'Barosaurus lentus（Marsh, 1890）は、米国モリソン累層（キンメリッジ期〜チトニアン、ジュラ紀後期）から産出したディプロドクス科の竜脚類で、タンザニアのテンタグル累層の関連資料もあります。全長約25メートル、頸椎が伸長し首は最大9メートルに達しました。小型頭骨、釘状の歯、長い鞭のような尾を持ち、ティタノサウルス類へと続く系統の重要な構成要素です。',
  funFact: 'ニューヨークのアメリカ自然史博物館のバロサウルス骨格は、後肢で立ち上がりアロサウルスから身を守る姿で展示されており、恐竜イラストレーションのアイコンとなっています！',
  facts: [
    { label: '首', value: '超ロング', description: '最長9メートルに達する頸椎で構成された、動物界でも最長の首の一つです。' },
    { label: '分類', value: 'ディプロドクス科', description: 'ディプロドクスやアパトサウルスと同じ科の竜脚類です。' },
    { label: '尾', value: '鞭のような尾', description: '細く長い鞭のような尾は、防御や音を出すのに使われた可能性があります。' },
    { label: '分布', value: '二つの大陸', description: '北米モリソン累層とタンザニア・テンタグル累層の両方から見つかっています。' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: '近縁のディプロドクス科' },
    { id: 'apatosaurus', relationship: '近縁のディプロドクス科' },
    { id: 'brontosaurus', relationship: 'ディプロドクス科の親戚' },
  ],
  discoveries: [
    { year: 1889, location: 'アメリカ合衆国ワイオミング州コモブラフ', discoveredBy: 'O・C・マーシュ', note: 'ボーンワーズ（骨戦争）中にマーシュのチームにより部分骨格が発見された。' },
    { year: 1907, location: 'タンザニア・テンダグル', discoveredBy: 'ドイツ・テンダグル探検隊', note: '東アフリカのディプロドクス科化石が後にバロサウルスに分類された。' },
  ],
  fossilLocations: [
    { country: 'アメリカ合衆国', region: 'ワイオミング州コモブラフ（モリソン累層）', coordinates: [41.8, -106.0], specimenName: 'YPM 429 — ホロタイプ部分骨格' },
    { country: 'タンザニア', region: 'テンダグル累層', coordinates: [-10.2, 39.4], specimenName: 'テンダグルのディプロドクス科化石' },
  ],
}
