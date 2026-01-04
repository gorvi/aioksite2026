/**
 * ADHD 测试结果计算工具
 */

import type { AdhdTest } from '@/types';

interface AnswerData {
  questionId: number;
  questionNumber: number;
  dimension: 'attention' | 'execution' | 'hyperactivity';
  answer: 0 | 1 | 2 | 3 | 4;
  score: 0 | 1 | 2 | 3 | 4;
}

/**
 * 计算维度得分（返回平均分，保留2位小数）
 * 
 * 算法说明：
 * - 存储平均分而非总分，与 SCL-90 保持一致
 * - 便于不同维度间比较和理解
 * - 每个维度题目数：15题
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

  // 返回平均分（保留2位小数）
  return {
    attention: Number((dimensionTotals.attention.total / dimensionTotals.attention.count).toFixed(2)),
    execution: Number((dimensionTotals.execution.total / dimensionTotals.execution.count).toFixed(2)),
    hyperactivity: Number((dimensionTotals.hyperactivity.total / dimensionTotals.hyperactivity.count).toFixed(2)),
  };
}

/**
 * 判断维度标签
 * 
 * 算法说明：
 * - score 参数是平均分（0-4分）
 * - 阈值：< 1.5 偏低，1.5-2.5 中等，≥ 2.5 偏高
 * - 注意：这些阈值是经验值，简化版45题不是标准量表
 */
function getDimensionLabel(score: number): '偏低' | '中等' | '偏高' {
  if (score < 1.5) return '偏低';
  if (score < 2.5) return '中等';
  return '偏高';
}

/**
 * 判断总体倾向等级
 * 
 * 算法说明：
 * - 直接计算三个维度平均分的平均值
 * - 由于每个维度题目数相同（15题），三个维度平均分的平均值 = 总平均分
 * - 阈值：< 1.5 低，1.5-2.5 中，≥ 2.5 高
 * 
 * 注意：这些阈值是经验值，简化版45题不是标准量表，没有官方阈值
 */
function getTendencyLevel(
  attentionScore: number,  // 平均分
  executionScore: number,  // 平均分
  hyperactivityScore: number  // 平均分
): 'low' | 'medium' | 'high' {
  // 直接计算三个维度平均分的平均值（等价于总平均分）
  const totalAverage = (attentionScore + executionScore + hyperactivityScore) / 3;

  if (totalAverage < 1.5) return 'low';
  if (totalAverage < 2.5) return 'medium';
  return 'high';
}

/**
 * 获取主要表现特征
 * 注意：dimensionScores 现在是平均分
 */
function getMainFeatures(
  dimensionScores: { attention: number; execution: number; hyperactivity: number },
  dimensionLabels: { attention: string; execution: string; hyperactivity: string }
): string[] {
  const features: string[] = [];
  
  // 找出得分最高的维度（按平均分排序）
  const sorted = Object.entries(dimensionScores).sort((a, b) => b[1] - a[1]);
  const topDimension = sorted[0][0] as keyof typeof dimensionScores;
  
  if (dimensionLabels[topDimension] === '偏高' || dimensionLabels[topDimension] === '中等') {
    if (topDimension === 'attention') {
      features.push('容易分心，注意力容易被打断');
      features.push('难以长时间保持专注');
    } else if (topDimension === 'execution') {
      features.push('做事前心理阻力较大，容易拖延');
      features.push('难以启动和持续执行任务');
    } else if (topDimension === 'hyperactivity') {
      features.push('内心焦躁不安，难以平静');
      features.push('容易冲动，难以控制行为');
    }
  }

  // 如果第二个维度也较高，添加相关特征
  if (sorted.length > 1 && sorted[1][1] > sorted[0][1] * 0.8) {
    const secondDimension = sorted[1][0] as keyof typeof dimensionScores;
    if (secondDimension === 'attention' && !features.some(f => f.includes('注意力'))) {
      features.push('脑中想法较多，切换频繁');
    }
  }

  return features.slice(0, 3); // 最多3条
}

/**
 * 获取建议
 */
function getSuggestions(
  dimensionLabels: { attention: string; execution: string; hyperactivity: string }
): string[] {
  const suggestions: string[] = [];

  if (dimensionLabels.attention === '偏高' || dimensionLabels.attention === '中等') {
    suggestions.push('尝试将任务拆分为更小、更明确的步骤');
    suggestions.push('使用提醒、清单等外部工具减轻记忆负担');
  }

  if (dimensionLabels.execution === '偏高' || dimensionLabels.execution === '中等') {
    suggestions.push('在专注任务前，为自己预留一个"启动缓冲时间"');
    suggestions.push('设定明确的时间节点和奖励机制');
  }

  if (dimensionLabels.hyperactivity === '偏高' || dimensionLabels.hyperactivity === '中等') {
    suggestions.push('尝试定期进行放松练习，如深呼吸或冥想');
    suggestions.push('在需要等待的场合，准备一些可以分散注意力的活动');
  }

  // 如果没有特定建议，提供通用建议
  if (suggestions.length === 0) {
    suggestions.push('保持规律的作息时间');
    suggestions.push('为自己创造安静、无干扰的工作环境');
  }

  return suggestions.slice(0, 3); // 最多3条
}

/**
 * 计算测试结果
 */
export function calculateAdhdResult(answers: AnswerData[]): Omit<AdhdTest, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  const dimensionScores = calculateDimensionScores(answers);
  
  const dimensionLabels = {
    attention: getDimensionLabel(dimensionScores.attention),
    execution: getDimensionLabel(dimensionScores.execution),
    hyperactivity: getDimensionLabel(dimensionScores.hyperactivity),
  };

  const tendencyLevel = getTendencyLevel(
    dimensionScores.attention,
    dimensionScores.execution,
    dimensionScores.hyperactivity
  );

  const mainFeatures = getMainFeatures(dimensionScores, dimensionLabels);
  const suggestions = getSuggestions(dimensionLabels);

  return {
    test_type: 'simple',
    total_score: null,
    asrs_score: null,
    wurs_score: null,
    tendency_level: tendencyLevel,
    dimension_scores: dimensionScores,
    dimension_labels: dimensionLabels,
    main_features: mainFeatures,
    suggestions,
    test_date: new Date().toISOString(),
  };
}


