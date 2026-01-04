/**
 * SCL-90 测试结果计算工具
 */

import type { Scl90Test } from '@/types';
import { SCL90_SCORE_RANGES } from '@/lib/constants';
import { getScl90Level } from '@/lib/data/scl90-norms';

interface AnswerData {
  questionId: number;
  questionNumber: number;
  dimension: string;
  answer: 1 | 2 | 3 | 4 | 5;
  score: 1 | 2 | 3 | 4 | 5;
}

/**
 * 计算因子得分（各维度均分）
 * 
 * 算法说明：
 * - 符合标准 SCL-90 计分方法
 * - 各维度得分 = 该维度题目总分 ÷ 该维度题目数
 * - 使用均分便于不同维度间比较
 */
function calculateFactorScores(answers: AnswerData[]) {
  const dimensionScores: Record<string, { total: number; count: number }> = {};
  
  answers.forEach((answer) => {
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
 * - 原始总分 = 90题得分总和
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
  return Number((total / answers.length).toFixed(2));
}

/**
 * 统计需关注项目（得分 ≥ 2 的项目）
 * 
 * 算法说明：
 * - 得分 ≥ 2 的项目通常提示需要关注
 * - 这是 SCL-90 的常用分界点
 */
function calculateItemStatistics(answers: AnswerData[]) {
  const attentionThreshold = 2; // 需关注的分界点
  let attentionItemsCount = 0;
  let attentionItemsTotal = 0;
  let normalItemsCount = 0;

  answers.forEach((answer) => {
    if (answer.score >= attentionThreshold) {
      attentionItemsCount += 1;
      attentionItemsTotal += answer.score;
    } else {
      normalItemsCount += 1;
    }
  });

  const attentionItemsAverage = attentionItemsCount > 0
    ? Number((attentionItemsTotal / attentionItemsCount).toFixed(2))
    : 0;

  return {
    attentionItemsCount,      // 需关注项目数
    normalItemsCount,         // 正常项目数
    attentionItemsAverage,   // 需关注项目平均分
  };
}

/**
 * 判断总体状态
 * 
 * 算法说明：
 * - 阈值设置符合 SCL-90 标准分界点
 * - < 2.0：心理状态整体稳定
 * - 2.0-2.9：存在一定心理压力，建议关注
 * - ≥ 3.0：心理困扰较明显，建议关注自身状态
 */
function getOverallStatus(totalScore: number): 'stable' | 'pressure' | 'obvious' {
  if (totalScore < SCL90_SCORE_RANGES.STABLE.max) {
    return 'stable';
  } else if (totalScore < SCL90_SCORE_RANGES.PRESSURE.max) {
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
  const rawTotalScore = calculateRawTotalScore(answers);
  const totalScore = calculateTotalScore(answers);
  const factorScores = calculateFactorScores(answers);
  const overallStatus = getOverallStatus(totalScore);
  const itemStats = calculateItemStatistics(answers);

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
    attention_items_count: itemStats.attentionItemsCount,
    normal_items_count: itemStats.normalItemsCount,
    attention_items_average: itemStats.attentionItemsAverage,
    factor_levels: factorLevels as Scl90Test['factor_levels'],
    test_date: new Date().toISOString(),
  };
}


