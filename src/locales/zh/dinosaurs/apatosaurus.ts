export default {
  name: '迷惑龙',
  displayName: '迷惑龙',
  pronunciation: 'mí huò lóng',
  nameMeaning: '骗人的蜥蜴',
  description: '迷惑龙是侏罗纪晚期北美洲的一种长颈巨型蜥脚类恐龙。体长约23米，体重超过20吨，是当时最大的陆地动物之一。它曾经以更著名的名字"雷龙"为人所知，其鞭状尾巴长到可以产生超音速的爆裂声。它以庞大的兽群漫步于莫里森组，用木钉状的牙齿大量啃食植被。',
  kidsDescription: '迷惑龙是一种巨大的恐龙，拥有超长的脖子和鞭状的尾巴！它重达四头大象的重量，长度相当于一个篮球场。人们曾经都叫它"雷龙"——雷霆蜥蜴！',
  childFriendlyText: '迷惑龙是一种长着很长脖子和鞭状尾巴的巨型植食恐龙。它成群生活，长度几乎相当于三辆公交车。',
  scientificSummary: '阿贾克斯迷惑龙（Apatosaurus ajax, Marsh, 1877）是一种梁龙科的蜥脚类恐龙，发现于北美洲西部侏罗纪晚期（约1.52亿至1.45亿年前）的莫里森组。其特征包括粗壮的颈椎系列、深阔的胸腔和延长的鞭状尾巴。历史上曾与雷龙混淆，迷惑龙仍然是理解大型蜥脚类恐龙生物力学和古生态学的关键分类群。',
  funFact: '迷惑龙的尾巴又长又灵活，强力甩动时可以产生超音速的爆裂声——比喷气发动机还响亮！',
  facts: [
    { label: '颈部', value: '极长', description: '由15节延长的脊椎骨组成的粗壮颈部，让它能够够到树冠或低矮植被。' },
    { label: '尾巴', value: '鞭状', description: '一条极其修长而渐细的尾巴，可以像鞭子一样甩动来进行防御。' },
    { label: '体长', value: '23 米', description: '侏罗纪最大的蜥脚类恐龙之一，长约23米，体重超过20吨。' },
    { label: '混淆', value: '曾被称雷龙', description: '几十年来在科学上与雷龙混淆，如今被确认为独立的属。' },
  ],
  relatedDinosaurs: [
    { id: 'diplodocus', relationship: '近亲' },
    { id: 'allosaurus', relationship: '捕食者' },
    { id: 'brachiosaurus', relationship: '同时代蜥脚类' },
  ],
  discoveries: [
    { year: 1877, location: '美国科罗拉多州', discoveredBy: '奥塞内尔·查尔斯·马什', note: '在"化石大战"期间首次被描述。' },
    { year: 1895, location: '美国怀俄明州', discoveredBy: '美国自然历史博物馆考察', note: '最为完整的标本。' },
  ],
  fossilLocations: [
    { country: '美国', region: '怀俄明州', coordinates: [43.0, -107.5], specimenName: '莫里逊组' },
    { country: '美国', region: '科罗拉多州', coordinates: [39.5, -105.0] },
  ],
}
