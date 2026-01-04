/**
 * ADHD 完整版测试结果计算工具
 * ASRS v1.1 (18题) + WURS-25 (25题)
 */

import type { AdhdTest } from '@/types';

interface AnswerData {
  questionId: number;
  questionNumber: number;
  stage: 'asrs' | 'wurs';
  dimension: 'attention' | 'execution' | 'hyperactivity';
  part?: 'A' | 'B';
  answer: 0 | 1 | 2 | 3 | 4;
  score: 0 | 1 | 2 | 3 | 4;
}

/**
 * 计算 ASRS Part A 阳性点
 * 
 * 算法说明（符合 ASRS v1.1 标准）：
 * - Q1-Q3: 选 2,3,4 (有时及以上) 计 1 点
 * - Q4-Q6: 选 3,4 (常常及以上) 计 1 点
 * - 阳性点总数 ≥ 4 提示现状极高风险
 */
function calculateAsrsPartAPositivePoints(answers: AnswerData[]): number {
  const partAAnswers = answers.filter(a => a.stage === 'asrs' && a.part === 'A');
  let positivePoints = 0;

  // Q1, Q2, Q3 (对应 questionId 1, 2, 3)
  for (let i = 1; i <= 3; i++) {
    const answer = partAAnswers.find(a => a.questionId === i);
    if (answer && answer.score >= 2) {
      positivePoints += 1;
    }
  }

  // Q4, Q5, Q6 (对应 questionId 4, 5, 6)
  for (let i = 4; i <= 6; i++) {
    const answer = partAAnswers.find(a => a.questionId === i);
    if (answer && answer.score >= 3) {
      positivePoints += 1;
    }
  }

  return positivePoints;
}

/**
 * 计算 ASRS 总分（0-72 分）
 * 
 * 算法说明：
 * - ASRS v1.1 共 18 题，每题 0-4 分
 * - 总分范围：0-72 分
 * - ≥ 24 分：症状表现与成人 ADHD 高度一致
 */
function calculateAsrsTotalScore(answers: AnswerData[]): number {
  const asrsAnswers = answers.filter(a => a.stage === 'asrs');
  return asrsAnswers.reduce((sum, answer) => sum + answer.score, 0);
}

/**
 * 计算 WURS 总分（0-100 分）
 * 
 * 算法说明：
 * - WURS-25 共 25 题，每题 0-4 分
 * - 总分范围：0-100 分
 * - ≥ 46 分：强临床判定线，提示童年期存在显著的 ADHD 发育轨迹
 */
function calculateWursTotalScore(answers: AnswerData[]): number {
  const wursAnswers = answers.filter(a => a.stage === 'wurs');
  return wursAnswers.reduce((sum, answer) => sum + answer.score, 0);
}

/**
 * 计算维度得分（平均分）
 * 
 * 算法说明：
 * - 存储平均分而非总分，便于不同维度间比较
 * - 排除 'other' 维度（WURS 中不直接映射到 ADHD 核心维度的题目）
 * - 返回平均分，保留2位小数
 */
function calculateDimensionScores(answers: AnswerData[]) {
  const dimensionTotals: Record<string, { total: number; count: number }> = {
    attention: { total: 0, count: 0 },
    execution: { total: 0, count: 0 },
    hyperactivity: { total: 0, count: 0 },
  };

  answers.forEach((answer) => {
    dimensionTotals[answer.dimension].total += answer.score;
    dimensionTotals[answer.dimension].count += 1;
  });

  return {
    attention: dimensionTotals.attention.count > 0
      ? Number((dimensionTotals.attention.total / dimensionTotals.attention.count).toFixed(2))
      : 0,
    execution: dimensionTotals.execution.count > 0
      ? Number((dimensionTotals.execution.total / dimensionTotals.execution.count).toFixed(2))
      : 0,
    hyperactivity: dimensionTotals.hyperactivity.count > 0
      ? Number((dimensionTotals.hyperactivity.total / dimensionTotals.hyperactivity.count).toFixed(2))
      : 0,
  };
}

/**
 * 判断维度标签
 * 
 * 算法说明：
 * - score 参数是平均分（0-4分）
 * - 阈值：< 1.5 偏低，1.5-2.5 中等，≥ 2.5 偏高
 */
function getDimensionLabel(score: number): '偏低' | '中等' | '偏高' {
  if (score < 1.5) return '偏低';
  if (score < 2.5) return '中等';
  return '偏高';
}

/**
 * 综合判定（根据 ASRS 和 WURS 分数）
 * 
 * 算法说明（符合 DSM-5 诊断准则）：
 * - 典型 ADHD: ASRS ≥24 且 WURS ≥46（跨周期发展）
 * - 后发/类 ADHD: ASRS ≥24 且 WURS <36（成年期压力或焦虑干扰）
 * - 代偿性成功: ASRS <17 且 WURS ≥46（代偿策略掩盖）
 * - 风险较低: ASRS <17 且 WURS <36（未达临床阈值）
 */
function getTendencyLevel(
  asrsScore: number,
  wursScore: number
): 'low' | 'medium' | 'high' {
  // 典型 ADHD: ASRS ≥24 且 WURS ≥46
  if (asrsScore >= 24 && wursScore >= 46) {
    return 'high';
  }

  // 后发/类 ADHD: ASRS ≥24 且 WURS <36
  if (asrsScore >= 24 && wursScore < 36) {
    return 'high';
  }

  // 代偿性成功: ASRS <17 且 WURS ≥46
  if (asrsScore < 17 && wursScore >= 46) {
    return 'medium';
  }

  // 风险较低: ASRS <17 且 WURS <36
  if (asrsScore < 17 && wursScore < 36) {
    return 'low';
  }

  // 其他情况：中等风险
  return 'medium';
}

/**
 * 获取主要表现特征
 */
function getMainFeatures(
  asrsScore: number,
  wursScore: number,
  dimensionScores: { attention: number; execution: number; hyperactivity: number },
  dimensionLabels: { attention: string; execution: string; hyperactivity: string }
): string[] {
  const features: string[] = [];

  // 根据综合判定添加特征
  if (asrsScore >= 24 && wursScore >= 46) {
    features.push('注意力、执行力和行为特征在成年期和童年期都有明显表现');
    features.push('符合跨周期发展的神经特质模式');
  } else if (asrsScore >= 24 && wursScore < 36) {
    features.push('当前注意力受损显著，但童年背景相对较弱');
    features.push('可能需要排查成年期压力或焦虑等因素的影响');
  } else if (asrsScore < 17 && wursScore >= 46) {
    features.push('童年期特征明显，但当前表现相对不突出');
    features.push('可能通过代偿策略掩盖了部分特征');
  }

  // 根据维度得分添加特征
  const sorted = Object.entries(dimensionScores).sort((a, b) => b[1] - a[1]);
  const topDimension = sorted[0][0] as keyof typeof dimensionScores;

  if (dimensionLabels[topDimension] === '偏高' || dimensionLabels[topDimension] === '中等') {
    if (topDimension === 'attention') {
      features.push('容易分心，注意力容易被打断');
    } else if (topDimension === 'execution') {
      features.push('做事前心理阻力较大，容易拖延');
    } else if (topDimension === 'hyperactivity') {
      features.push('内心焦躁不安，难以平静');
    }
  }

  return features.slice(0, 3); // 最多3条
}

const SUGGESTION_POOLS = {
  highRisk: [
    '尝试"体外化大脑"策略：不要相信脑子，把所有待办事项、灵感和预约全部记录在日历和清单app中。',
    '建立"视觉化"环境：使用白板、便利贴将任务进度可视化，把需要用来工作的物品放在显眼位置。',
    '寻找一位"问责伙伴"：与朋友或同事结对，每天通过简短的信息互报进度，增加外部监督。',
    '利用"多巴胺菜单"：列出一份能让你快速感觉良好的健康活动清单（如听一首歌、深蹲10次），在能量低迷时使用。',
    '接受"不完美的时间管理"：如果计划被打乱，允许自己重新开始，而不是直接放弃这一天。'
  ],
  mediumRisk: [
    '关注当前的压力源：您现在的症状可能更多源于环境压力或情绪干扰，建议进行简单的正念冥想。',
    '优化睡眠与运动：规律的有氧运动（如慢跑、游泳）能显著增加大脑的多巴胺水平，改善当前状态。',
    '练习"单一任务处理"：强制自己在一个时间段内只打开一个网页标签或只做一件事，减少多任务切换的损耗。',
    '建立固定的"启动仪式"：比如泡一杯咖啡或整理桌面，告诉大脑"工作模式开始了"。'
  ],
  childhood: [
    '察觉"代偿性疲劳"：虽然您表现得很好，但可能付出了比常人更多的心理能量，允许自己适度"摆烂"充电。',
    '接纳内在的那个小孩：如果您感到童年的经历仍有影响，书写疗愈或与信任的朋友倾诉会很有帮助。',
    '复盘您的成功策略：回想一下以前您是如何克服困难的？那些非传统的策略（如最后期限冲刺）也许正是您的独特优势。'
  ],
  attention: [
    '番茄工作法变体：设定25分钟专注+5分钟休息，如果25分钟太长，从10分钟开始，重要的是"开始"的动作。',
    '减少感官干扰：工作时尝试佩戴降噪耳机或播放白噪音（如雨声、咖啡馆背景音）来屏蔽无关刺激。',
    '利用"身体双倍"（Body Doubling）：在有人陪伴的环境下（如图书馆或线上自习室）工作，他人的存在能提供无形的专注场。',
    '在手边放一个"分心记录本"：脑子里突然冒出无关想法时，记下来然后马上回到任务，不要被它带跑。'
  ],
  execution: [
    '5分钟起步法：面对不想做的大任务，告诉自己"只做5分钟"，通常一旦开始，阻力就会消失大半。',
    '任务切片：将"写论文"拆解为"打开文档"、"写标题"、"写第一段"等微小步骤，每完成一步给自己一个即时反馈（如打钩）。',
    '使用"倒计时"产生紧迫感：给自己设定一个稍显紧迫的截止时间（"我要在30分钟内搞定这个PPT草稿"）。',
    '减少决策阻力：前一天晚上准备好第二天要穿的衣服和要做的第一件事，避免早上消耗决策力。'
  ],
  hyperactivity: [
    '允许"微动"：思考时手里玩解压玩具（fidget toys）或转笔，这些微小的动作反而有助于大脑维持专注。',
    '站立办公或动态工作：如果坐不住，尝试站着工作，或者每工作45分钟就起来走动伸展一下。',
    '为冲动设置"减速带"：想买东西或说话时，深呼吸三次或数到10再行动。',
    '从事高强度运动：把过剩的精力在健身房或球场上释放掉，回家后大脑会更平静。'
  ],
  general: [
    '保持规律的作息时间：稳定的生物钟是情绪和认知的基石。',
    '简化环境：定期清理桌面和房间的杂物，整洁的物理空间有助于保持清晰的思维空间。',
    '练习自我慈悲：ADHD大脑经常遭受挫折感，对自己宽容一些，少一些自我批评。',
    '利用科技辅助：善用智能音箱、自动提醒等工具，把琐事交给机器。'
  ]
};

function getRandomItems(pool: string[], count: number): string[] {
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
}

function getSuggestions(
  asrsScore: number,
  wursScore: number,
  dimensionLabels: { attention: string; execution: string; hyperactivity: string }
): string[] {
  const suggestions: string[] = [];

  // 1. 根据综合判定添加建议 (随机取 1 条)
  if (asrsScore >= 24 && wursScore >= 46) {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.highRisk, 1));
  } else if (asrsScore >= 24 && wursScore < 36) {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.mediumRisk, 1));
  } else if (asrsScore < 17 && wursScore >= 46) {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.childhood, 1));
  }

  // 2. 根据维度添加建议 (每个高分维度随机取 1 条)
  if (dimensionLabels.attention === '偏高' || dimensionLabels.attention === '中等') {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.attention, 1));
  }

  if (dimensionLabels.execution === '偏高' || dimensionLabels.execution === '中等') {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.execution, 1));
  }

  if (dimensionLabels.hyperactivity === '偏高' || dimensionLabels.hyperactivity === '中等') {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.hyperactivity, 1));
  }

  // 3. 补足通用建议
  // 如果建议少于 3 条，用通用建议补足；如果还是少，就少给点也无所谓，但通常会有
  if (suggestions.length < 3) {
    suggestions.push(...getRandomItems(SUGGESTION_POOLS.general, 3 - suggestions.length));
  }

  // 4. 再次打乱顺序并限制总数
  return getRandomItems(suggestions, 3);
}

/**
 * 计算完整版测试结果
 */
export function calculateAdhdFullResult(
  answers: AnswerData[],
  serialNumber?: string
): Omit<AdhdTest, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  // 计算 ASRS 相关分数
  const asrsTotalScore = calculateAsrsTotalScore(answers);
  const asrsPartAPositivePoints = calculateAsrsPartAPositivePoints(answers);

  // 计算 WURS 相关分数
  const wursTotalScore = calculateWursTotalScore(answers);

  // 计算维度得分
  const dimensionScores = calculateDimensionScores(answers);

  // 计算维度标签
  const dimensionLabels = {
    attention: getDimensionLabel(dimensionScores.attention),
    execution: getDimensionLabel(dimensionScores.execution),
    hyperactivity: getDimensionLabel(dimensionScores.hyperactivity),
  };

  // 综合判定
  const tendencyLevel = getTendencyLevel(asrsTotalScore, wursTotalScore);

  // 获取主要表现特征和建议
  const mainFeatures = getMainFeatures(
    asrsTotalScore,
    wursTotalScore,
    dimensionScores,
    dimensionLabels
  );
  const suggestions = getSuggestions(asrsTotalScore, wursTotalScore, dimensionLabels);

  // 计算总平均分（用于显示）
  const totalAverage = answers.length > 0
    ? Number((answers.reduce((sum, a) => sum + a.score, 0) / answers.length).toFixed(2))
    : 0;

  return {
    serial_number: serialNumber || null,
    test_type: 'full',
    total_score: totalAverage,
    asrs_score: asrsTotalScore,
    wurs_score: wursTotalScore,
    tendency_level: tendencyLevel,
    dimension_scores: dimensionScores,
    dimension_labels: dimensionLabels,
    main_features: mainFeatures,
    suggestions,
    test_date: new Date().toISOString(),
  };
}

