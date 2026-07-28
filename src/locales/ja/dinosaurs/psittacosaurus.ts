export default {
  name: 'プシッタコサウルス',
  displayName: 'プシッタコサウルス',
  pronunciation: 'プシッタコサウルス',
  nameMeaning: '"オウムのトカゲ"',
  description: '小さくてくちばしを持ち、信じられないほど豊富に見つかるプシッタコサウルスは、白亜紀前期の日々のスーパースターです。深いオウムのようなくちばし、剛毛のような尾のフィラメント、二足歩行姿勢を持つこの基底的角竜類は、アジアで最も成功した恐竜の一つでした。皮膚、色彩パターン、保存された幼体の群れを含む数百の化石が、成長、社会生活、外見に関する最も豊富な情報源の一つとなっています。',
  kidsDescription: 'プシッタコサウルスはオウムみたいなくちばしと頭に剛毛のしっぽがついた小さな恐竜だったよ！科学者はあまりにたくさん化石を見つけたから、赤ちゃんも大人も、どんな色だったかまで研究できるんだ。オウムが生まれるずっと前からいた、オウム恐竜だったんだ！',
  childFriendlyText: 'プシッタコサウルスはオウムのくちばしをした小さな草食恐竜だったよ。あまりにたくさん化石があるから、一番よくわかっている恐竜の一つなんだ。',
  scientificSummary: 'Psittacosaurus lujiatunensis (Zhou et al., 2006) はアジアの白亜紀前期の基底的角竜類恐竜。深い吻部のくちばし、短い襟飾り、一部の標本では尾に保存された皮膚の剛毛が特徴。遼寧省の例外的な標本は色素沈着と完全な発達系列を示す。',
  funFact: 'ある有名なプシッタコサウルスの化石は色彩パターンが非常に良好に保存されているため、科学者はそれをカウンターシェーディングの迷彩色恐竜として復元しました。実物の体色がわかっている数少ない恐竜の一つです。',
  facts: [
    { label: 'くちばし', value: 'オウムに似ている', description: '硬い植物、種子、おそらく木の実を切り裂くのに最適。' },
    { label: '化石', value: '数百体発見', description: '最も一般的な恐竜の一つ — 例外的なデータベースを提供。' },
    { label: '尾', value: '硬い剛毛', description: '一部の標本は尾に硬い剛毛を示す — 稀な皮膚構造。' },
    { label: '体長', value: '2メートル', description: '大型犬ほどの大きさ、二足歩行姿勢。' },
  ],
  relatedDinosaurs: [
    { id: 'protoceratops', relationship: 'より後の角竜類' },
    { id: 'triceratops', relationship: '遠い角を持つ子孫' },
    { id: 'microraptor', relationship: '同時代のアジアの隣人' },
  ],
  discoveries: [
    { year: 1922, location: 'Mongolia', discoveredBy: 'Henry Fairfield Osborn', note: 'オズボンが初期のアジアでの発見に基づき属に命名し、原始的な角竜類と認めた。' },
    { year: 2000, location: 'Liaoning, China', discoveredBy: 'Chinese paleontological teams', note: '新たな化石は皮膚、剛毛、幼体群まで保存していた。' },
  ],
  fossilLocations: [
    { country: 'China', region: '遼寧省', coordinates: [41.9, 121.7], specimenName: '義県層' },
    { country: 'Mongolia', region: 'オムノゴヴィ', coordinates: [44.5, 108.5], specimenName: '前期白亜紀の地層' },
  ],
}
