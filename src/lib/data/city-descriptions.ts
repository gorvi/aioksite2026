/**
 * 城市性格详细描述文案库
 * 为每个城市提供个性化的描述文案
 */

import { getCityMatchingReason } from './city-matching-reasons';

export interface CityDescription {
  welcome: string;      // 欢迎语
  lifestyle: string;    // 生活方式描述
  culture: string;      // 文化特色
  advantages: string;   // 优势特点
  suitable: string;     // 适合人群
  conclusion: string;   // 总结
  matchingReason: string; // 详细的匹配原因说明（结合性格标签和城市特点）
}

export const CITY_DESCRIPTIONS: Record<string, CityDescription> = {
  北京: {
    welcome: '恭喜你！你的天选之城是北京——这座承载着千年历史的政治文化中心。',
    lifestyle: '在北京，你将体验到大格局、快节奏的都市生活。这里机会与挑战并存，每一天都充满无限可能。',
    culture: '从紫禁城的雄伟壮丽到胡同里的烟火气息，从国家大剧院的高雅艺术到三里屯的时尚前沿，北京将满足你对文化底蕴的所有想象。',
    advantages: '作为政治中心，这里聚集了最优质的教育、医疗、文化资源。无论是事业发展还是个人成长，都能找到最佳的平台。',
    suitable: '你的性格特质决定了你适合在权力中心感受历史的厚重，在激烈竞争中实现人生价值。',
    conclusion: '北京不只是一座城市，更是一种人生态度——志存高远，脚踏实地。',
    matchingReason: getCityMatchingReason('北京')
  },

  上海: {
    welcome: '恭喜你！你的天选之城是上海——东方巴黎，国际大都市的典型代表。',
    lifestyle: '在上海，精致是生活的代名词。从外滩的万国建筑到陆家嘴的摩天大楼，从新天地的咖啡文化到法租界的梧桐叶影。',
    culture: '中西文化在这里完美融合，传统与现代在这里和谐共存。你将在这座城市中感受到真正的国际化视野。',
    advantages: '作为金融中心，上海提供了无数商业机会。时尚前沿的生活方式，让你始终走在潮流的最前端。',
    suitable: '你追求品质生活，注重外在形象，有着敏锐的商业嗅觉和国际化思维。',
    conclusion: '在上海，你不只是生活，而是在创造一种生活方式的艺术。',
    matchingReason: getCityMatchingReason('上海')
  },

  天津: {
    welcome: '恭喜你！你的天选之城是天津——北方的港口明珠，相声的故乡。',
    lifestyle: '在天津，生活节奏适中，既有大城市的便利，又保持着浓厚的市井文化。早晨的煎饼果子，晚上的相声茶馆。',
    culture: '从古文化街的传统工艺到意式风情区的异域建筑，从狗不理包子到麻花酥脆，天津用幽默和包容拥抱每一个人。',
    advantages: '作为重要港口城市，经济发达而房价相对适中。教育资源丰富，生活压力相对较小。',
    suitable: '你务实包容，有着天然的幽默感，既重视传统文化，又能接受新鲜事物。',
    conclusion: '天津让你在快节奏的现代生活中，依然能保持一份难得的从容和幽默。',
    matchingReason: getCityMatchingReason('天津')
  },

  重庆: {
    welcome: '恭喜你！你的天选之城是重庆——火辣辣的山城，夜生活的天堂。',
    lifestyle: '在重庆，热情如火是生活的主旋律。白天爬坡上坎感受立体城市的魅力，晚上华灯初上品味不夜城的繁华。',
    culture: '火锅文化让每顿饭都成为社交盛宴，川江文化培育出直爽豪迈的性格。这里的人情味浓得化不开。',
    advantages: '作为西部重要城市，发展机遇众多。美食天堂的称号绝非浪得虚名，生活成本适中，幸福指数很高。',
    suitable: '你性格直爽，热爱社交，享受热闹的氛围，重视友情和人际关系。',
    conclusion: '重庆教会你：生活就应该像火锅一样，热气腾腾，有滋有味！',
    matchingReason: getCityMatchingReason('重庆')
  },

  成都: {
    welcome: '恭喜你！你的天选之城是成都——天府之国的核心，巴适生活的代表。',
    lifestyle: '在成都，"巴适"不只是一句口头禅，更是一种生活哲学。上午在宽窄巷子品茶听戏，下午在春熙路购物休闲，晚上在九眼桥感受夜的魅力。',
    culture: '从杜甫草堂的诗意到武侯祠的历史，从大熊猫的可爱到川剧的精彩，成都用慢节奏诠释着生活的真谛。',
    advantages: '这里有着得天独厚的自然环境，丰富的美食文化，相对较低的生活成本，是宜居城市的典型代表。',
    suitable: '你追求工作生活平衡，重视生活品质，喜欢文艺范儿的生活方式，不愿意在高压环境中生活。',
    conclusion: '成都告诉你：生活不必太匆忙，慢下来才能感受到人生的美好。',
    matchingReason: getCityMatchingReason('成都')
  },

  杭州: {
    welcome: '恭喜你！你的天选之城是杭州——人间天堂，诗意生活的完美诠释。',
    lifestyle: '在杭州，每一天都充满诗意。清晨在西湖边晨练，上午在龙井村品茶，下午在文艺咖啡馆创作，晚上在音乐喷泉前漫步。',
    culture: '从白娘子的传说到苏东坡的诗词，从丝绸文化到茶道精髓，杭州将古典雅韵与现代科技完美融合。',
    advantages: '作为互联网之都，这里创新氛围浓厚，机会众多。优美的自然环境和良好的空气质量，让生活质量大大提升。',
    suitable: '你文艺清新，有品味有情调，既追求精神世界的丰富，又不缺乏现代生活的便利。',
    conclusion: '在杭州，你将过上真正的"诗和远方"的生活，在美景中成就最好的自己。',
    matchingReason: getCityMatchingReason('杭州')
  },

  广州: {
    welcome: '恭喜你！你的天选之城是广州——务实进取的商都，包容开放的羊城。',
    lifestyle: '在广州，务实是最大的智慧。清晨的一盅两件开启美好一天，繁忙的商贸活动体现城市活力，深夜的大排档展现人间烟火。',
    culture: '粤语文化的深厚底蕴，早茶文化的精致生活，商贸文化的开放包容，让广州成为最具人情味的国际化都市。',
    advantages: '作为千年商都，商业机会无处不在。包容的城市文化让每个追梦人都能找到属于自己的位置。',
    suitable: '你务实低调，既有进取心又重视生活品质，善于在激烈竞争中保持内心的平和。',
    conclusion: '广州用实际行动证明：真正的成功不在于张扬，而在于踏实做事，用心生活。',
    matchingReason: getCityMatchingReason('广州')
  },

  深圳: {
    welcome: '恭喜你！你的天选之城是深圳——年轻人的创业天堂，创新之都。',
    lifestyle: '在深圳，创新是永恒的主题。快节奏的工作环境激发无限潜能，国际化的城市氛围开阔全球视野。',
    culture: '移民城市的包容性让每个人都能快速融入，科技创新的基因让这座城市始终保持年轻活力。',
    advantages: '完善的产业链，丰富的就业机会，公平的竞争环境，让每一个有梦想的人都能在这里实现价值。',
    suitable: '你敢拼敢闯，适应能力强，追求效率和结果，在变化中寻找机遇。',
    conclusion: '深圳证明了：只要你足够努力，足够优秀，这座城市就会给你足够的回报。',
    matchingReason: getCityMatchingReason('深圳')
  },

  西安: {
    welcome: '恭喜你！你的天选之城是西安——千年古都，文化名城。',
    lifestyle: '在西安，历史与现代交相辉映。漫步在古城墙上感受厚重历史，穿行在回民街中品味传统美食。',
    culture: '十三朝古都的底蕴，丝绸之路的起点，从兵马俑的震撼到大雁塔的庄严，每一处都诉说着千年文明。',
    advantages: '教育资源丰富，文化氛围浓厚，生活成本适中。在这里既能感受历史文化的熏陶，又能享受现代生活的便利。',
    suitable: '你重视文化底蕴，喜欢历史传统，追求精神世界的丰富，工作生活平衡。',
    conclusion: '西安让你明白：一个人的格局，往往取决于他所处城市的文化厚度。',
    matchingReason: getCityMatchingReason('西安')
  },

  武汉: {
    welcome: '恭喜你！你的天选之城是武汉——九省通衢，江城明珠。',
    lifestyle: '在武汉，豪爽是生活的基调。长江汉江交汇处的壮阔，黄鹤楼上的诗意，户部巷里的美食，构成了这座城市独特的魅力。',
    culture: '楚文化的浪漫，江湖文化的豪迈，教育文化的深厚，让武汉成为中部地区最具活力的城市。',
    advantages: '地理位置优越，交通四通八达，高等教育资源全国领先，是中部崛起的重要引擎。',
    suitable: '你有着豪爽的性格，重视教育和文化，既能吃苦又能享受，适应能力强。',
    conclusion: '武汉告诉你：人生如江水，有时波澜壮阔，有时平静如镜，关键是要保持向前的勇气。',
    matchingReason: getCityMatchingReason('武汉')
  },

  南京: {
    welcome: '恭喜你！你的天选之城是南京——六朝古都，文化重镇。',
    lifestyle: '在南京，文雅是生活的标签。梧桐叶落的诗意，秦淮河畔的风情，中山陵的庄严，构成了这座城市独特的文化气质。',
    culture: '六朝古都的历史积淀，现代都市的发展活力，让南京在传统与现代间找到了完美平衡。',
    advantages: '教育资源丰富，文化底蕴深厚，长三角核心位置带来无限发展机遇。',
    suitable: '你有着深厚的文化素养，重视教育和知识，既能欣赏传统文化之美，又能拥抱现代生活的便利。',
    conclusion: '南京用六朝的底蕴告诉你：真正的优雅，来自于内心的文化积淀。',
    matchingReason: getCityMatchingReason('南京')
  },

  长沙: {
    welcome: '恭喜你！你的天选之城是长沙——娱乐之都，吃货天堂。',
    lifestyle: '在长沙，快乐是生活的主题。白天品尝地道湘菜，晚上感受火爆夜生活，这里的每一天都充满欢声笑语。',
    culture: '湖湘文化的深厚底蕴，娱乐产业的蓬勃发展，让长沙成为年轻人最喜爱的城市之一。',
    advantages: '房价相对合理，生活成本较低，娱乐资源丰富，是性价比极高的宜居城市。',
    suitable: '你热爱美食，喜欢娱乐，追求性价比，重视生活的快乐和轻松。',
    conclusion: '长沙证明了：生活的意义不在于赚多少钱，而在于过得多快乐！',
    matchingReason: getCityMatchingReason('长沙')
  },

  昆明: {
    welcome: '恭喜你！你的天选之城是昆明——四季如春的花都，彩云之南的明珠。',
    lifestyle: '在昆明，惬意是生活的常态。四季如春的气候，满城的鲜花绿植，让每一天都充满生机与活力。',
    culture: '多民族文化的交融，创造出独特的云南风情。从滇池的壮阔到西山的秀美，自然与文化在这里完美结合。',
    advantages: '宜人的气候条件，良好的生态环境，相对较低的生活压力，是理想的宜居城市。',
    suitable: '你追求宜居环境，喜欢自然风光，重视生活质量，不愿在高压环境中生活。',
    conclusion: '昆明用四季如春的温度告诉你：生活最美好的状态就是岁月静好，现世安稳。',
    matchingReason: getCityMatchingReason('昆明')
  },

  哈尔滨: {
    welcome: '恭喜你！你的天选之城是哈尔滨——冰雪之城，音乐之都。',
    lifestyle: '在哈尔滨，浪漫是生活的底色。冰雪节的梦幻，中央大街的异域风情，松花江畔的诗意，构成了这座城市独特的魅力。',
    culture: '俄式建筑的异域风情，冰雪文化的独特魅力，音乐传统的深厚底蕴，让哈尔滨充满艺术气息。',
    advantages: '独特的文化氛围，良好的教育环境，相对较低的生活成本，是追求艺术生活的理想之地。',
    suitable: '你有着浪漫的气质，喜欢艺术和音乐，能够欣赏独特的文化风情，追求精神世界的富足。',
    conclusion: '哈尔滨用冰雪的纯洁告诉你：最美的生活，就是在寒冷中保持心灵的温暖。',
    matchingReason: getCityMatchingReason('哈尔滨')
  },

  // 为了简化，我会为剩余城市提供简化版本的描述
  石家庄: {
    welcome: '恭喜你！你的天选之城是石家庄——踏实务实的交通枢纽。',
    lifestyle: '在石家庄，踏实是生活的根基。这里有着北方人的豪爽和务实精神。',
    culture: '深厚的历史文化底蕴与现代发展相结合，形成独特的城市气质。',
    advantages: '交通便利，发展潜力大，生活成本适中，是务实发展的好选择。',
    suitable: '你踏实稳重，重视实际，追求稳定而有潜力的发展环境。',
    conclusion: '石家庄告诉你：最好的成功，就是在稳中求进中实现人生价值。',
    matchingReason: getCityMatchingReason('石家庄')
  },

  太原: {
    welcome: '恭喜你！你的天选之城是太原——历史厚重的龙城。',
    lifestyle: '在太原，厚重是生活的特色。这座城市承载着深厚的历史文化底蕴。',
    culture: '三晋文化的传承，煤炭工业的发展历程，形成了独特的城市性格。',
    advantages: '历史文化资源丰富，能源工业发达，生活节奏适中。',
    suitable: '你重视传统文化，喜欢稳定的生活环境，有着深厚的文化底蕴。',
    conclusion: '太原用历史的厚重告诉你：真正的财富是文化的积淀。',
    matchingReason: getCityMatchingReason('太原')
  },

  沈阳: {
    welcome: '恭喜你！你的天选之城是沈阳——东北的工业明珠。',
    lifestyle: '在沈阳，豪迈是生活的风格。东北人的直爽和热情在这里体现得淋漓尽致。',
    culture: '满族文化的底蕴，工业文明的传承，形成了独特的城市文化。',
    advantages: '工业基础雄厚，人情味浓厚，生活成本相对较低。',
    suitable: '你性格豪迈直爽，重视人际关系，适合在工业氛围中发展。',
    conclusion: '沈阳告诉你：人生最重要的是真情实意，踏实做事。',
    matchingReason: getCityMatchingReason('沈阳')
  }

  // 可以继续为其他城市添加描述...
};

/**
 * 获取城市描述
 */
export const getCityDescription = (cityName: string): CityDescription | null => {
  return CITY_DESCRIPTIONS[cityName] || null;
};

/**
 * 生成完整的城市描述文案
 */
export const generateCityDescriptionText = (cityName: string): string => {
  const description = getCityDescription(cityName);
  if (!description) {
    return `${cityName}是一座充满魅力的城市，等待你去探索发现。`;
  }
  
  return [
    description.welcome,
    description.lifestyle,
    description.culture,
    description.advantages,
    description.suitable,
    description.conclusion
  ].join('\n\n');
};