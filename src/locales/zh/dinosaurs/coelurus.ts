export default {
  name: '虚骨龙',
  displayName: '虚骨龙',
  pronunciation: 'xū gǔ lóng',
  nameMeaning: '中空的尾巴',
  description: '虚骨龙是北美晚侏罗世的一种小型敏捷兽脚类恐龙。它骨骼轻巧、四肢修长，在巨型恐龙云集的莫里森生态系统中占据着快速小型猎手的生态位。',
  kidsDescription: '虚骨龙就像侏罗纪里的短跑选手！它不是最大的猎手，却非常轻盈灵活，能飞快地追逐蜥蜴、哺乳动物和其他小动物。',
  childFriendlyText: '虚骨龙是一种小型、跑得很快的食肉恐龙，靠轻巧的骨骼和长腿来捕猎。',
  scientificSummary: '虚骨龙（Coelurus fragilis，Marsh，1879）发现于美国怀俄明州莫里森组的启莫里阶至提通阶地层。已知材料虽然零散，但清楚显示其具有气腔化椎骨、纤细骨架和适于奔跑的后肢比例，是研究早期虚骨龙类演化和莫里森食物网结构的重要属。',
  funFact: '虽然虚骨龙生活在异特龙身边，但它并不和巨型捕食者正面竞争，而是凭速度专门捕食更小的猎物。',
  facts: [
    { label: '骨骼', value: '中空轻巧', description: '名称指向其中空的椎骨，这种减重结构让身体更加敏捷。' },
    { label: '速度', value: '快速奔跑者', description: '细长的后腿让它可以高速追击小型猎物，或躲开更大的捕食者。' },
    { label: '食性', value: '小型猎物专家', description: '它大概捕食蜥蜴、早期哺乳动物以及其他动物的幼体。' },
    { label: '生态位', value: '莫里森小猎手', description: '在与异特龙、剑龙共存的环境中，它占据了较小型肉食者的位置。' },
  ],
  relatedDinosaurs: [
    { id: 'compsognathus', relationship: '相似的小型兽脚类生态位' },
    { id: 'ornithomimus', relationship: '具有趋同奔跑特征的后期迅捷虚骨龙类' },
    { id: 'allosaurus', relationship: '同地层的大型捕食者' },
  ],
  discoveries: [
    { year: 1879, location: '美国怀俄明州科莫布拉夫', discoveredBy: 'O.C. 马什考察队', note: '莫里森地层中描述为 Coelurus fragilis 的模式标本。' },
    { year: 1980, location: '莫里森组再评估', discoveredBy: '多位兽脚类专家', note: '重新分析阐明了该分类群可能属于小型虚骨龙类。' },
  ],
  fossilLocations: [
    { country: '美国', region: '怀俄明州科莫布拉夫（莫里森组）', coordinates: [41.8, -106.0], specimenName: 'Coelurus fragilis 模式标本' },
  ],
}
