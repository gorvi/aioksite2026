/**
 * 城市性格测试题目库（36题完整版）
 * 基于MBTI理论的4个维度：E/I, S/N, T/F, J/P
 * 每个维度9道题，共36题
 */

export interface CityPersonalityQuestion {
  id: number;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  text: string;
  options: {
    id: 'A' | 'B';
    text: string;
    score: 1 | 2; // A=1, B=2
  }[];
}

export const CITY_PERSONALITY_QUESTIONS: CityPersonalityQuestion[] = [
  // 维度1：E/I（外向/内向）- 9题
  {
    id: 1,
    dimension: 'E_I',
    text: '周末休息，你更想？',
    options: [
      { id: 'A', text: '宅家看书追剧', score: 1 }, // 内向
      { id: 'B', text: '约朋友探店聚餐', score: 2 } // 外向
    ]
  },
  {
    id: 2,
    dimension: 'E_I',
    text: '工作遇到瓶颈，你会？',
    options: [
      { id: 'A', text: '自己琢磨解决', score: 1 }, // 内向
      { id: 'B', text: '找同事讨论思路', score: 2 } // 外向
    ]
  },
  {
    id: 3,
    dimension: 'E_I',
    text: '旅行时，你喜欢？',
    options: [
      { id: 'A', text: '独自规划路线自由行', score: 1 }, // 内向
      { id: 'B', text: '跟朋友/旅行团结伴而行', score: 2 } // 外向
    ]
  },
  {
    id: 4,
    dimension: 'E_I',
    text: '参加陌生人聚会，你会？',
    options: [
      { id: 'A', text: '觉得尴尬想早点走', score: 1 }, // 内向
      { id: 'B', text: '主动搭话认识新朋友', score: 2 } // 外向
    ]
  },
  {
    id: 5,
    dimension: 'E_I',
    text: '获得成就感的方式，更倾向于？',
    options: [
      { id: 'A', text: '个人目标达成', score: 1 }, // 内向
      { id: 'B', text: '团队合作被认可', score: 2 } // 外向
    ]
  },
  {
    id: 6,
    dimension: 'E_I',
    text: '空闲时刷社交软件，你更爱？',
    options: [
      { id: 'A', text: '默默潜水看动态', score: 1 }, // 内向
      { id: 'B', text: '发朋友圈分享日常', score: 2 } // 外向
    ]
  },
  {
    id: 7,
    dimension: 'E_I',
    text: '遇到开心的事，你会？',
    options: [
      { id: 'A', text: '自己偷着乐', score: 1 }, // 内向
      { id: 'B', text: '立刻告诉身边人', score: 2 } // 外向
    ]
  },
  {
    id: 8,
    dimension: 'E_I',
    text: '选居住的房子，你偏爱？',
    options: [
      { id: 'A', text: '安静的郊区小户型', score: 1 }, // 内向
      { id: 'B', text: '热闹的市中心公寓', score: 2 } // 外向
    ]
  },
  {
    id: 9,
    dimension: 'E_I',
    text: '学习新技能，你喜欢？',
    options: [
      { id: 'A', text: '线上自学课程', score: 1 }, // 内向
      { id: 'B', text: '线下小班面授课', score: 2 } // 外向
    ]
  },

  // 维度2：S/N（实感/直觉）- 9题
  {
    id: 10,
    dimension: 'S_N',
    text: '做旅行攻略，你会重点关注？',
    options: [
      { id: 'A', text: '具体的交通、住宿、美食地址', score: 1 }, // 实感
      { id: 'B', text: '当地的文化故事、小众玩法', score: 2 } // 直觉
    ]
  },
  {
    id: 11,
    dimension: 'S_N',
    text: '选工作，你更看重？',
    options: [
      { id: 'A', text: '薪资、福利、稳定性', score: 1 }, // 实感
      { id: 'B', text: '发展前景、兴趣契合度', score: 2 } // 直觉
    ]
  },
  {
    id: 12,
    dimension: 'S_N',
    text: '逛街买衣服，你会？',
    options: [
      { id: 'A', text: '直奔目标款式试穿', score: 1 }, // 实感
      { id: 'B', text: '漫无目的地逛，看中再买', score: 2 } // 直觉
    ]
  },
  {
    id: 13,
    dimension: 'S_N',
    text: '听别人讲故事，你更关注？',
    options: [
      { id: 'A', text: '具体的细节和事实', score: 1 }, // 实感
      { id: 'B', text: '背后的逻辑和寓意', score: 2 } // 直觉
    ]
  },
  {
    id: 14,
    dimension: 'S_N',
    text: '规划未来，你倾向于？',
    options: [
      { id: 'A', text: '制定清晰的短期目标', score: 1 }, // 实感
      { id: 'B', text: '畅想长远的发展方向', score: 2 } // 直觉
    ]
  },
  {
    id: 15,
    dimension: 'S_N',
    text: '看电影，你更喜欢？',
    options: [
      { id: 'A', text: '剧情紧凑的现实主义题材', score: 1 }, // 实感
      { id: 'B', text: '充满想象的科幻/奇幻题材', score: 2 } // 直觉
    ]
  },
  {
    id: 16,
    dimension: 'S_N',
    text: '学习新知识，你习惯？',
    options: [
      { id: 'A', text: '从基础知识点逐步积累', score: 1 }, // 实感
      { id: 'B', text: '先抓核心框架，再补细节', score: 2 } // 直觉
    ]
  },
  {
    id: 17,
    dimension: 'S_N',
    text: '评价一座城市，你更在意？',
    options: [
      { id: 'A', text: '基础设施、物价、交通等实际条件', score: 1 }, // 实感
      { id: 'B', text: '城市氛围、文化底蕴、未来潜力', score: 2 } // 直觉
    ]
  },
  {
    id: 18,
    dimension: 'S_N',
    text: '解决问题时，你会？',
    options: [
      { id: 'A', text: '基于过往经验找办法', score: 1 }, // 实感
      { id: 'B', text: '尝试新的思路和角度', score: 2 } // 直觉
    ]
  },

  // 维度3：T/F（思考/情感）- 9题
  {
    id: 19,
    dimension: 'T_F',
    text: '选城市定居，你优先考虑？',
    options: [
      { id: 'A', text: '就业机会、发展空间', score: 1 }, // 思考
      { id: 'B', text: '生活舒适度、幸福感', score: 2 } // 情感
    ]
  },
  {
    id: 20,
    dimension: 'T_F',
    text: '和朋友因旅行目的地吵架，你会？',
    options: [
      { id: 'A', text: '理性分析利弊说服对方', score: 1 }, // 思考
      { id: 'B', text: '迁就对方的喜好', score: 2 } // 情感
    ]
  },
  {
    id: 21,
    dimension: 'T_F',
    text: '评价一份工作，你更看重？',
    options: [
      { id: 'A', text: '工作效率、晋升机制', score: 1 }, // 思考
      { id: 'B', text: '同事关系、团队氛围', score: 2 } // 情感
    ]
  },
  {
    id: 22,
    dimension: 'T_F',
    text: '遇到不公平的事，你会？',
    options: [
      { id: 'A', text: '据理力争维护权益', score: 1 }, // 思考
      { id: 'B', text: '考虑人情世故忍一忍', score: 2 } // 情感
    ]
  },
  {
    id: 23,
    dimension: 'T_F',
    text: '租房时，你会选？',
    options: [
      { id: 'A', text: '离公司近但价格高的', score: 1 }, // 思考
      { id: 'B', text: '价格低但通勤久，周边生活便利的', score: 2 } // 情感
    ]
  },
  {
    id: 24,
    dimension: 'T_F',
    text: '朋友找你吐槽职场烦恼，你会？',
    options: [
      { id: 'A', text: '帮TA分析问题给出解决方案', score: 1 }, // 思考
      { id: 'B', text: '耐心倾听共情安慰', score: 2 } // 情感
    ]
  },
  {
    id: 25,
    dimension: 'T_F',
    text: '选餐厅吃饭，你更在意？',
    options: [
      { id: 'A', text: '性价比、菜品口味', score: 1 }, // 思考
      { id: 'B', text: '环境氛围、服务态度', score: 2 } // 情感
    ]
  },
  {
    id: 26,
    dimension: 'T_F',
    text: '城市治理中，你更认可？',
    options: [
      { id: 'A', text: '高效严格的管理政策', score: 1 }, // 思考
      { id: 'B', text: '人性化、有温度的措施', score: 2 } // 情感
    ]
  },
  {
    id: 27,
    dimension: 'T_F',
    text: '换工作时，你会因为？',
    options: [
      { id: 'A', text: '薪资涨幅、职业发展', score: 1 }, // 思考
      { id: 'B', text: '舍不得同事、喜欢当前城市', score: 2 } // 情感
    ]
  },

  // 维度4：J/P（判断/感知）- 9题
  {
    id: 28,
    dimension: 'J_P',
    text: '旅行前，你会？',
    options: [
      { id: 'A', text: '提前一周订好机票酒店，规划每日行程', score: 1 }, // 判断
      { id: 'B', text: '只定出发时间，到当地随机应变', score: 2 } // 感知
    ]
  },
  {
    id: 29,
    dimension: 'J_P',
    text: '工作任务，你习惯？',
    options: [
      { id: 'A', text: '提前完成，避免拖延', score: 1 }, // 判断
      { id: 'B', text: '截止日前集中精力搞定', score: 2 } // 感知
    ]
  },
  {
    id: 30,
    dimension: 'J_P',
    text: '周末安排，你会？',
    options: [
      { id: 'A', text: '周五就规划好要做的事', score: 1 }, // 判断
      { id: 'B', text: '睡到自然醒，看心情决定', score: 2 } // 感知
    ]
  },
  {
    id: 31,
    dimension: 'J_P',
    text: '购物时，你更喜欢？',
    options: [
      { id: 'A', text: '列好清单，按需购买', score: 1 }, // 判断
      { id: 'B', text: '随便逛逛，看到喜欢就买', score: 2 } // 感知
    ]
  },
  {
    id: 32,
    dimension: 'J_P',
    text: '处理邮件，你会？',
    options: [
      { id: 'A', text: '及时回复，保持收件箱清洁', score: 1 }, // 判断
      { id: 'B', text: '积累一段时间统一处理', score: 2 } // 感知
    ]
  },
  {
    id: 33,
    dimension: 'J_P',
    text: '制定计划时，你倾向？',
    options: [
      { id: 'A', text: '详细的时间表和执行步骤', score: 1 }, // 判断
      { id: 'B', text: '大概方向，具体执行时再调整', score: 2 } // 感知
    ]
  },
  {
    id: 34,
    dimension: 'J_P',
    text: '面对变化，你会？',
    options: [
      { id: 'A', text: '需要时间适应，prefer稳定', score: 1 }, // 判断
      { id: 'B', text: '享受新鲜感，拥抱变化', score: 2 } // 感知
    ]
  },
  {
    id: 35,
    dimension: 'J_P',
    text: '整理房间，你会？',
    options: [
      { id: 'A', text: '定期整理，物品归类摆放', score: 1 }, // 判断
      { id: 'B', text: '用到再整理，随性安排', score: 2 } // 感知
    ]
  },
  {
    id: 36,
    dimension: 'J_P',
    text: '做决定时，你更倾向？',
    options: [
      { id: 'A', text: '快速决定，然后坚持执行', score: 1 }, // 判断
      { id: 'B', text: '保持开放，随时调整选择', score: 2 } // 感知
    ]
  }
];

// 题目总数验证
export const QUESTION_COUNT = CITY_PERSONALITY_QUESTIONS.length;
export const DIMENSIONS = ['E_I', 'S_N', 'T_F', 'J_P'] as const;

// 每个维度的题目数量（应该都是9题）
export const DIMENSION_QUESTION_COUNT = DIMENSIONS.reduce((acc, dimension) => {
  acc[dimension] = CITY_PERSONALITY_QUESTIONS.filter(q => q.dimension === dimension).length;
  return acc;
}, {} as Record<string, number>);