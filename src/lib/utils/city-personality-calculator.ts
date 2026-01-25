/**
 * 城市性格测试计算算法
 * 实现MBTI类型判断和城市匹配逻辑
 */

import { CITIES_CONFIG } from '@/lib/data/cities-config';
import { CITY_PERSONALITY_QUESTIONS } from '@/lib/data/city-personality-questions';

// 答案接口
export interface CityPersonalityAnswer {
  questionId: number;
  questionNumber: number;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  answerOption: 'A' | 'B';
  score: 1 | 2; // A=1, B=2
}

// 维度得分接口
export interface DimensionScores {
  E_I: number;  // 9-18分，9=内向，18=外向
  S_N: number;  // 9-18分，9=实感，18=直觉
  T_F: number;  // 9-18分，9=思考，18=情感
  J_P: number;  // 9-18分，9=判断，18=感知
}

// 计算结果接口
export interface CityPersonalityResult {
  // MBTI相关
  mbtiType: string;
  dimensionScores: DimensionScores;
  
  // 城市匹配
  matchedCity: string;
  matchPercentage: number;
  
  // 性格标签
  personalityTags: string[];
  
  // 详细信息（实时生成，不存数据库）
  cityDescription?: string;
  detailedAnalysis?: string;
  cityFeatures?: string[];
}

/**
 * 计算各维度得分
 */
export const calculateDimensionScores = (answers: CityPersonalityAnswer[]): DimensionScores => {
  const dimensionTotals: DimensionScores = {
    E_I: 0,
    S_N: 0,
    T_F: 0,
    J_P: 0
  };

  // 按维度分组计算得分
  answers.forEach(answer => {
    dimensionTotals[answer.dimension] += answer.score;
  });

  return dimensionTotals;
};

/**
 * 根据维度得分确定MBTI类型
 */
export const determineMBTI = (scores: DimensionScores): string => {
  let mbti = '';
  
  // E/I: 得分 <= 13.5 为内向(I)，> 13.5 为外向(E)
  mbti += scores.E_I > 13.5 ? 'E' : 'I';
  
  // S/N: 得分 <= 13.5 为实感(S)，> 13.5 为直觉(N)  
  mbti += scores.S_N > 13.5 ? 'N' : 'S';
  
  // T/F: 得分 <= 13.5 为思考(T)，> 13.5 为情感(F)
  mbti += scores.T_F > 13.5 ? 'F' : 'T';
  
  // J/P: 得分 <= 13.5 为判断(J)，> 13.5 为感知(P)
  mbti += scores.J_P > 13.5 ? 'P' : 'J';
  
  return mbti;
};

/**
 * 生成性格标签
 */
export const generatePersonalityTags = (scores: DimensionScores, mbtiType: string): string[] => {
  const tags: string[] = [];
  
  // 基于MBTI类型生成标签
  if (mbtiType.includes('E')) {
    tags.push('社交型');
  } else {
    tags.push('内敛型');
  }
  
  if (mbtiType.includes('S')) {
    tags.push('实用型');
  } else {
    tags.push('直觉型');
  }
  
  if (mbtiType.includes('T')) {
    tags.push('理性型');
  } else {
    tags.push('情感型');
  }
  
  if (mbtiType.includes('J')) {
    tags.push('计划型');
  } else {
    tags.push('随性型');
  }
  
  // 基于得分强度添加额外标签
  if (scores.E_I >= 16) tags.push('高社交');
  if (scores.E_I <= 11) tags.push('独处偏好');
  if (scores.S_N >= 16) tags.push('创意思维');
  if (scores.S_N <= 11) tags.push('务实导向');
  if (scores.T_F >= 16) tags.push('感性丰富');
  if (scores.T_F <= 11) tags.push('逻辑思维');
  if (scores.J_P >= 16) tags.push('灵活变通');
  if (scores.J_P <= 11) tags.push('条理清晰');
  
  return tags.slice(0, 4); // 最多返回4个标签
};

/**
 * 计算与城市的匹配度
 */
export const calculateCityMatch = (mbtiType: string, scores: DimensionScores, cityName: string): number => {
  const cityConfig = CITIES_CONFIG[cityName];
  if (!cityConfig) return 0;
  
  // 获取该MBTI类型与城市的基础匹配度
  const baseMatch = cityConfig.matchingThresholds[mbtiType] || 50;
  
  // 基于维度得分的微调
  let adjustment = 0;
  
  // 外向/内向调整
  if (mbtiType.includes('E') && cityConfig.tags.includes('社交型')) {
    adjustment += Math.min(5, (scores.E_I - 13.5) * 0.5);
  }
  if (mbtiType.includes('I') && cityConfig.tags.includes('宜居型')) {
    adjustment += Math.min(5, (13.5 - scores.E_I) * 0.5);
  }
  
  // 实感/直觉调整
  if (mbtiType.includes('N') && cityConfig.tags.includes('文艺型')) {
    adjustment += Math.min(5, (scores.S_N - 13.5) * 0.5);
  }
  if (mbtiType.includes('S') && cityConfig.tags.includes('务实型')) {
    adjustment += Math.min(5, (13.5 - scores.S_N) * 0.5);
  }
  
  // 思考/情感调整
  if (mbtiType.includes('F') && cityConfig.tags.includes('温润型')) {
    adjustment += Math.min(5, (scores.T_F - 13.5) * 0.5);
  }
  if (mbtiType.includes('T') && cityConfig.tags.includes('商贸型')) {
    adjustment += Math.min(5, (13.5 - scores.T_F) * 0.5);
  }
  
  // 判断/感知调整
  if (mbtiType.includes('P') && cityConfig.tags.includes('自由型')) {
    adjustment += Math.min(5, (scores.J_P - 13.5) * 0.5);
  }
  if (mbtiType.includes('J') && cityConfig.tags.includes('条理型')) {
    adjustment += Math.min(5, (13.5 - scores.J_P) * 0.5);
  }
  
  const finalMatch = Math.min(100, Math.max(0, baseMatch + adjustment));
  return Math.round(finalMatch);
};

/**
 * 找到最佳匹配城市
 */
export const findBestMatchCity = (mbtiType: string, scores: DimensionScores): { city: string; percentage: number } => {
  let bestCity = '成都'; // 默认城市
  let bestMatch = 0;
  
  // 计算与所有城市的匹配度
  Object.keys(CITIES_CONFIG).forEach(cityName => {
    const matchPercentage = calculateCityMatch(mbtiType, scores, cityName);
    if (matchPercentage > bestMatch) {
      bestMatch = matchPercentage;
      bestCity = cityName;
    }
  });
  
  return {
    city: bestCity,
    percentage: bestMatch
  };
};

/**
 * 主计算函数：处理答案并返回完整结果
 */
export const calculateCityPersonality = (answers: CityPersonalityAnswer[]): CityPersonalityResult => {
  // 1. 验证答案数量
  if (answers.length !== 36) {
    throw new Error(`答案数量错误：期望36题，实际${answers.length}题`);
  }
  
  // 2. 计算维度得分
  const dimensionScores = calculateDimensionScores(answers);
  
  // 3. 确定MBTI类型
  const mbtiType = determineMBTI(dimensionScores);
  
  // 4. 找到最佳匹配城市
  const { city, percentage } = findBestMatchCity(mbtiType, dimensionScores);
  
  // 5. 生成性格标签
  const personalityTags = generatePersonalityTags(dimensionScores, mbtiType);
  
  return {
    mbtiType,
    dimensionScores,
    matchedCity: city,
    matchPercentage: percentage,
    personalityTags
  };
};

/**
 * 生成详细结果（用于结果页面展示，不存数据库）
 */
export const generateDetailedResult = (basicResult: CityPersonalityResult): CityPersonalityResult => {
  const cityConfig = CITIES_CONFIG[basicResult.matchedCity];
  
  return {
    ...basicResult,
    cityDescription: cityConfig?.description || '',
    detailedAnalysis: generateDetailedAnalysis(basicResult),
    cityFeatures: cityConfig?.detailedFeatures || []
  };
};

/**
 * 生成详细分析文案
 */
const generateDetailedAnalysis = (result: CityPersonalityResult): string => {
  const { mbtiType, matchedCity, matchPercentage } = result;
  const cityConfig = CITIES_CONFIG[matchedCity];
  
  let analysis = `你的MBTI类型是${mbtiType}，与${matchedCity}的匹配度高达${matchPercentage}%！\n\n`;
  
  // 基于MBTI类型添加个性化分析
  if (mbtiType.includes('E')) {
    analysis += `作为外向型人格，你喜欢与人交流互动，`;
  } else {
    analysis += `作为内向型人格，你更喜欢独处思考，`;
  }
  
  if (mbtiType.includes('S')) {
    analysis += `注重实际和细节，`;
  } else {
    analysis += `富有想象力和创新思维，`;
  }
  
  if (mbtiType.includes('T')) {
    analysis += `以逻辑和理性作为决策依据，`;
  } else {
    analysis += `重视情感和人际关系，`;
  }
  
  if (mbtiType.includes('J')) {
    analysis += `喜欢有条理的生活方式。`;
  } else {
    analysis += `享受灵活变通的生活节奏。`;
  }
  
  analysis += `\n\n${matchedCity}正好能满足你的这些特质需求：${cityConfig?.tags.join('、') || ''}。`;
  
  return analysis;
};

/**
 * 验证答案格式
 */
export const validateAnswers = (answers: CityPersonalityAnswer[]): boolean => {
  if (answers.length !== 36) return false;
  
  // 检查每个维度都有9道题
  const dimensionCounts = { E_I: 0, S_N: 0, T_F: 0, J_P: 0 };
  
  for (const answer of answers) {
    if (!['E_I', 'S_N', 'T_F', 'J_P'].includes(answer.dimension)) return false;
    if (!['A', 'B'].includes(answer.answerOption)) return false;
    if (![1, 2].includes(answer.score)) return false;
    
    dimensionCounts[answer.dimension]++;
  }
  
  return Object.values(dimensionCounts).every(count => count === 9);
};