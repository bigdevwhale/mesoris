export default {
  name: '重龙',
  displayName: '重龙',
  pronunciation: 'bā luó sàolóng',
  nameMeaning: '「沉重的蜥蜴」',
  description: '重龙是来自北美和非洲晚侏罗世的长颈梁龙科蜥脚类——与 Diplodocus 关系密切的近亲，颈部可能长达9米，是动物界最长的颈部之一。',
  kidsDescription: '重龙是长颈巨型恐龙，颈部长达9米——比一辆公共汽车还长！它是梁龙的近亲，生活在北美甚至非洲。它用长颈够到其他恐龙够不到的叶子！',
  childFriendlyText: '重龙是长颈恐龙，脖子长达9米。它生活在北美和非洲，是梁龙的近亲。',
  scientificSummary: 'Barosaurus lentus（Marsh, 1890）是来自美国莫里逊组（基默里奇期–提塘期，晚侏罗世）的一种梁龙科蜥脚类，并可能在坦桑尼亚滕达古鲁组也有相关材料。身长约25米；颈椎拉长，颈部可达9米。小头骨、钉状牙齿、鞭状尾巴。与 Diplodocus 和 Apatosaurus 同时代，但以其极端的颈部比例区分。',
  funFact: '美国自然历史博物馆著名的重龙骨架展示它用后肢站立起来抵御异特龙——这个姿态已成为恐龙插图的标志！',
  facts: [
    { label: '颈部', value: '超长', description: '拉长的颈椎组成动物界最长的颈部之一——可达9米。' },
    { label: '家族', value: '梁龙科', description: '梁龙科蜥脚类——和 Diplodocus、Apatosaurus 同科。' },
    { label: '尾巴', value: '鞭状', description: '长而细的鞭状尾巴，可能用于防御，甚至可能产生超音速声音。' },
    { label: '分布', value: '两个大陆', description: '发现于北美莫里逊组和坦桑尼亚滕达古鲁组。' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: '近亲梁龙科' },
    { id: 'apatosaurus', relationship: '近亲梁龙科' },
    { id: 'brontosaurus', relationship: '梁龙科亲戚' },
  ],
  discoveries: [
    { year: 1889, location: '美国怀俄明州科莫布拉夫', discoveredBy: 'O·C·马什', note: '"化石大战"期间马什的团队发现了部分骨骼。' },
    { year: 1907, location: '坦桑尼亚滕达古鲁', discoveredBy: '德国滕达古鲁考察队', note: '东非的梁龙科化石后被归入重龙。' },
  ],
  fossilLocations: [
    { country: '美国', region: '怀俄明州科莫布拉夫（莫里逊组）', coordinates: [41.8, -106.0], specimenName: 'YPM 429——正模标本部分骨骼' },
    { country: '坦桑尼亚', region: '滕达古鲁组', coordinates: [-10.2, 39.4], specimenName: '滕达古鲁梁龙科化石' },
  ],
}
