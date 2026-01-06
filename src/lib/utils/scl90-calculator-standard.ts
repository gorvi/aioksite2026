/**
 * 标准SCL-90测试结果计算工具
 * 
 * 算法说明：
 * 1. 评分范围：0-4分（没有、很轻、中等、偏重、严重）
 * 2. 因子分 = 组成该因子的各项目总分 ÷ 组成该因子的项目数
 * 3. 总分 = 90个项目总分
 * 4. 总均分 = 总分 ÷ 90
 * 5. 附加项（7项）单独统计，不计入因子分
 */

import type { Scl90Test } from '@/types';
import { SCL90_FACTOR_MAPPING, SCL90_ADDITIONAL_ITEMS } from '@/lib/data/scl90-standard-mapping';
import { getScl90Level } from '@/lib/data/scl90-norms';

interface AnswerData {
  questionId: number;
  questionNumber: number;
  dimension: string;
  answer: 0 | 1 | 2 | 3 | 4;  // 标准评分：0-4
  score: 0 | 1 | 2 | 3 | 4;
}

/**
 * 计算因子得分（各维度均分）
 * 
 * 算法说明：
 * - 符合标准 SCL-90 计分方法
 * - 各维度得分 = 该维度题目总分 ÷ 该维度题目数
 * - 附加项不计入因子分
 */
function calculateFactorScores(answers: AnswerData[]) {
  const dimensionScores: Record<string, { total: number; count: number }> = {};
  
  answers.forEach((answer) => {
    // 跳过附加项
    if (answer.dimension === 'additional') {
      return;
    }
    
    if (!dimensionScores[answer.dimension]) {
      dimensionScores[answer.dimension] = { total: 0, count: 0 };
    }
    dimensionScores[answer.dimension].total += answer.score;
    dimensionScores[answer.dimension].count += 1;
  });

  const factorScores: Record<string, number> = {};
  Object.keys(dimensionScores).forEach((dimension) => {
    const { total, count } = dimensionScores[dimension];
    factorScores[dimension] = Number((total / count).toFixed(2));
  });

  return factorScores;
}

/**
 * 计算原始总分
 * 
 * 算法说明：
 * - 原始总分 = 90题得分总和（包括附加项）
 * - 符合标准 SCL-90 计分方法
 */
function calculateRawTotalScore(answers: AnswerData[]): number {
  return answers.reduce((sum, answer) => sum + answer.score, 0);
}

/**
 * 计算总均分
 * 
 * 算法说明：
 * - 总均分 = 90题总分 ÷ 90
 * - 符合标准 SCL-90 计分方法
 */
function calculateTotalScore(answers: AnswerData[]): number {
  const total = calculateRawTotalScore(answers);
  return Number((total / 90).toFixed(2));
}

/**
 * 统计阳性项目（得分 ≥ 2 的项目）
 * 
 * 算法说明：
 * - 阳性症状：得分 ≥ 2 的项目
 * - 阳性项目数：反映症状范围
 * - 阳性症状均分：反映症状严重程度
 */
function calculatePositiveItems(answers: AnswerData[]) {
  const positiveThreshold = 2; // 阳性症状阈值
  let positiveItemsCount = 0;
  let positiveItemsTotal = 0;

  answers.forEach((answer) => {
    if (answer.score >= positiveThreshold) {
      positiveItemsCount += 1;
      positiveItemsTotal += answer.score;
    }
  });

  const positiveItemsAverage = positiveItemsCount > 0
    ? Number((positiveItemsTotal / positiveItemsCount).toFixed(2))
    : 0;

  return {
    positiveItemsCount,      // 阳性项目数
    positiveItemsAverage,    // 阳性症状均分
  };
}

/**
 * 统计附加项
 * 
 * 附加项（7项）：19, 44, 59, 60, 64, 66, 89
 * - 19: 胃口不好
 * - 44: 难以入睡
 * - 59: 想到有关死亡的事
 * - 60: 吃得太多
 * - 64: 醒得太早
 * - 66: 睡得不稳不深
 * - 89: 感到自己有罪
 */
function calculateAdditionalItems(answers: AnswerData[]) {
  const additionalAnswers = answers.filter(a => a.dimension === 'additional');
  const additionalScores: Record<number, number> = {};
  
  additionalAnswers.forEach(answer => {
    additionalScores[answer.questionNumber] = answer.score;
  });
  
  return {
    additionalScores,
    additionalTotal: additionalAnswers.reduce((sum, a) => sum + a.score, 0),
    additionalAverage: additionalAnswers.length > 0 
      ? Number((additionalAnswers.reduce((sum, a) => sum + a.score, 0) / additionalAnswers.length).toFixed(2))
      : 0,
  };
}

/**
 * 判断总体状态
 * 
 * 算法说明：
 * - 基于总均分判断
 * - < 1.5：心理状态整体稳定
 * - 1.5-2.5：存在一定心理压力，建议关注
 * - ≥ 2.5：心理困扰较明显，建议寻求专业支持
 * 
 * 注意：标准SCL-90的阈值通常为2.0，但考虑到0-4分制，
 * 我们调整为：稳定<1.5，压力1.5-2.5，明显≥2.5
 */
function getOverallStatus(totalScore: number): 'stable' | 'pressure' | 'obvious' {
  if (totalScore < 1.5) {
    return 'stable';
  } else if (totalScore < 2.5) {
    return 'pressure';
  } else {
    return 'obvious';
  }
}

/**
 * 计算测试结果
 */
export function calculateScl90Result(
  answers: AnswerData[],
  serialNumber: string
): Omit<Scl90Test, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  // 验证答案数量
  if (answers.length !== 90) {
    throw new Error(`答案数量不正确: ${answers.length}/90`);
  }
  
  const rawTotalScore = calculateRawTotalScore(answers);
  const totalScore = calculateTotalScore(answers);
  const factorScores = calculateFactorScores(answers);
  const overallStatus = getOverallStatus(totalScore);
  const positiveItems = calculatePositiveItems(answers);
  const additionalItems = calculateAdditionalItems(answers);

  // 确保所有9个维度都有得分
  const allDimensions = [
    'somatization',
    'obsessive_compulsive',
    'interpersonal_sensitivity',
    'depression',
    'anxiety',
    'hostility',
    'phobic_anxiety',
    'paranoid_ideation',
    'psychoticism',
  ];

  const completeFactorScores: Record<string, number> = {};
  allDimensions.forEach((dim) => {
    completeFactorScores[dim] = factorScores[dim] || 0;
  });

  // 计算各维度的分级（基于常模数据）
  const factorLevels: Record<string, 'light' | 'moderate' | 'severe' | 'extremelySevere'> = {};
  allDimensions.forEach((dim) => {
    const score = completeFactorScores[dim];
    if (score > 0) {
      factorLevels[dim] = getScl90Level(score);
    }
  });

  return {
    serial_number: serialNumber,
    raw_total_score: rawTotalScore,
    total_score: totalScore,
    overall_status: overallStatus,
    factor_scores: completeFactorScores as Scl90Test['factor_scores'],
    positive_items_count: positiveItems.positiveItemsCount,
    positive_items_average: positiveItems.positiveItemsAverage,
    additional_items_scores: additionalItems.additionalScores,
    additional_items_total: additionalItems.additionalTotal,
    additional_items_average: additionalItems.additionalAverage,
    factor_levels: factorLevels as Scl90Test['factor_levels'],
    test_date: new Date().toISOString(),
  };
}

/**
 * 验证答案数据
 */
export function validateAnswers(answers: AnswerData[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 检查数量
  if (answers.length !== 90) {
    errors.push(`答案数量不正确: ${answers.length}/90`);
  }
  
  // 检查题号连续性
  const questionNumbers = answers.map(a => a.questionNumber).sort((a, b) => a - b);
  for (let i = 1; i <= 90; i++) {
    if (!questionNumbers.includes(i)) {
      errors.push(`缺少题号${i}的答案`);
    }
  }
  
  // 检查评分范围
  answers.forEach(answer => {
    if (answer.score < 0 || answer.score > 4) {
      errors.push(`题号${answer.questionNumber}的评分超出范围: ${answer.score}`);
    }
  });
  
  // 检查因子分配
  answers.forEach(answer => {
    const expectedFactor = getFactorByQuestionNumber(answer.questionNumber);
    if (answer.dimension !== expectedFactor) {
      errors.push(`题号${answer.questionNumber}的因子分配不正确`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function getFactorByQuestionNumber(questionNumber: number): string {
  for (const [factor, questions] of Object.entries(SCL90_FACTOR_MAPPING)) {
    if ((questions as readonly number[]).includes(questionNumber)) {
      return factor;
    }
  }
  
  if ((SCL90_ADDITIONAL_ITEMS as readonly number[]).includes(questionNumber)) {
    return 'additional';
  }
  
  return 'unknown';
}

