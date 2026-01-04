/**
 * SCL-90 常模数据
 * 
 * 数据来源说明：
 * 本常模数据基于多个学术研究文献整理，包括：
 * - 中国成人群体常模数据
 * - 不同地区、不同人群的研究结果
 * 
 * 注意：
 * - 常模数据可能因地区、年龄、性别等因素而有所不同
 * - 本数据仅供参考，实际应用建议使用针对目标人群的常模数据
 * - 使用时应注明数据来源和适用人群
 */

export interface Scl90Norm {
  dimension: string;
  mean: number;        // 均值
  stdDev: number;      // 标准差
  sampleSize?: number; // 样本量（如果有）
  population?: string; // 适用人群
  reference?: string;  // 数据来源
}

export interface Scl90LevelThresholds {
  light: { max: number };           // 轻：< max
  moderate: { min: number; max: number };  // 中：min - max
  severe: { min: number; max: number };     // 重：min - max
  extremelySevere: { min: number };  // 极重：>= min
}

/**
 * SCL-90 各维度常模数据（中国成人群体）
 * 
 * 基于多个学术研究文献整理
 * 均值 ± 标准差
 */
export const SCL90_NORMS: Record<string, Scl90Norm> = {
  somatization: {
    dimension: 'somatization',
    mean: 1.37,
    stdDev: 0.48,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  obsessive_compulsive: {
    dimension: 'obsessive_compulsive',
    mean: 1.62,
    stdDev: 0.58,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  interpersonal_sensitivity: {
    dimension: 'interpersonal_sensitivity',
    mean: 1.65,
    stdDev: 0.51,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  depression: {
    dimension: 'depression',
    mean: 1.50,
    stdDev: 0.59,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  anxiety: {
    dimension: 'anxiety',
    mean: 1.39,
    stdDev: 0.43,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  hostility: {
    dimension: 'hostility',
    mean: 1.48,
    stdDev: 0.56,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  phobic_anxiety: {
    dimension: 'phobic_anxiety',
    mean: 1.23,
    stdDev: 0.41,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  paranoid_ideation: {
    dimension: 'paranoid_ideation',
    mean: 1.43,
    stdDev: 0.57,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
  psychoticism: {
    dimension: 'psychoticism',
    mean: 1.29,
    stdDev: 0.42,
    population: '中国成人',
    reference: '基于多个学术研究文献整理',
  },
};

/**
 * SCL-90 总体常模数据
 */
export const SCL90_TOTAL_NORM = {
  totalScore: {
    mean: 1.44,
    stdDev: 0.43,
    population: '中国成人',
  },
  rawTotalScore: {
    mean: 129.96,
    stdDev: 38.76,
    population: '中国成人',
  },
  positiveItems: {
    mean: 24.92,
    stdDev: 18.41,
    population: '中国成人',
  },
  negativeItems: {
    mean: 65.08,
    stdDev: 18.33,
    population: '中国成人',
  },
  positiveItemsAverage: {
    mean: 2.60,
    stdDev: 0.59,
    population: '中国成人',
  },
};

/**
 * SCL-90 分级标准（基于常模数据）
 * 
 * 分级标准：
 * - 轻：< 2.0（低于均值+1个标准差）
 * - 中：2.0 - 2.9（均值+1个标准差 到 均值+2个标准差）
 * - 重：3.0 - 3.9（均值+2个标准差 到 均值+3个标准差）
 * - 极重：≥ 4.0（高于均值+3个标准差）
 * 
 * 注意：这是基于经验值的分级，实际分级可能因常模数据不同而有所差异
 */
export const SCL90_LEVEL_THRESHOLDS: Scl90LevelThresholds = {
  light: { max: 2.0 },
  moderate: { min: 2.0, max: 2.9 },
  severe: { min: 3.0, max: 3.9 },
  extremelySevere: { min: 4.0 },
};

/**
 * 根据得分获取分级
 */
export function getScl90Level(score: number): 'light' | 'moderate' | 'severe' | 'extremelySevere' {
  if (score < SCL90_LEVEL_THRESHOLDS.light.max) {
    return 'light';
  } else if (score >= SCL90_LEVEL_THRESHOLDS.moderate.min && score < SCL90_LEVEL_THRESHOLDS.moderate.max) {
    return 'moderate';
  } else if (score >= SCL90_LEVEL_THRESHOLDS.severe.min && score < SCL90_LEVEL_THRESHOLDS.severe.max) {
    return 'severe';
  } else {
    return 'extremelySevere';
  }
}

/**
 * 分级标签（中文）
 */
export const SCL90_LEVEL_LABELS = {
  light: '轻',
  moderate: '中',
  severe: '重',
  extremelySevere: '极重',
};

/**
 * 计算Z分数（标准分数）
 * Z = (得分 - 均值) / 标准差
 */
export function calculateZScore(score: number, dimension: string): number {
  const norm = SCL90_NORMS[dimension];
  if (!norm) return 0;
  return Number(((score - norm.mean) / norm.stdDev).toFixed(2));
}

/**
 * 计算百分位数（基于Z分数）
 * 使用标准正态分布表近似
 */
export function calculatePercentile(zScore: number): number {
  // 简化的百分位数计算（基于标准正态分布）
  // 实际应用中可以使用更精确的算法
  if (zScore <= -2) return 2.3;
  if (zScore <= -1.5) return 6.7;
  if (zScore <= -1) return 15.9;
  if (zScore <= -0.5) return 30.9;
  if (zScore <= 0) return 50;
  if (zScore <= 0.5) return 69.1;
  if (zScore <= 1) return 84.1;
  if (zScore <= 1.5) return 93.3;
  if (zScore <= 2) return 97.7;
  return 99.9;
}



