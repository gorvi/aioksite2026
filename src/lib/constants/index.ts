/**
 * 常量定义
 */

// SCL-90 常量（标准版：0-4分制）
export const SCL90_TOTAL_QUESTIONS = 90;

// 标准SCL-90的9个因子
export const SCL90_DIMENSIONS = [
  'somatization',            // 躯体化
  'obsessive_compulsive',    // 强迫症状
  'interpersonal_sensitivity', // 人际关系敏感
  'depression',              // 抑郁
  'anxiety',                 // 焦虑
  'hostility',               // 敌对
  'phobic_anxiety',          // 恐怖
  'paranoid_ideation',       // 偏执
  'psychoticism',            // 精神病性
] as const;

// 标准SCL-90评分范围（0-4分制）
export const SCL90_SCORE_RANGES = {
  STABLE: { min: 0, max: 1.49 },      // 心理状态整体稳定
  PRESSURE: { min: 1.5, max: 2.49 },  // 存在一定心理压力
  OBVIOUS: { min: 2.5, max: 4.0 },    // 心理困扰较明显
} as const;

// 阳性症状阈值（标准SCL-90）
export const SCL90_POSITIVE_THRESHOLD = 2; // 得分≥2视为阳性症状

// 附加项数量
export const SCL90_ADDITIONAL_ITEMS_COUNT = 7; // 19, 44, 59, 60, 64, 66, 89

// ADHD 常量
export const ADHD_SIMPLE_TOTAL_QUESTIONS = 45;
export const ADHD_FULL_ASRS_QUESTIONS = 18;
export const ADHD_FULL_WURS_QUESTIONS = 25;
export const ADHD_FULL_TOTAL_QUESTIONS = ADHD_FULL_ASRS_QUESTIONS + ADHD_FULL_WURS_QUESTIONS;

export const ADHD_DIMENSIONS = [
  'attention', // 注意力与专注力
  'execution', // 执行力与拖延
  'hyperactivity', // 多动/冲动与内在躁动
] as const;

export const ADHD_TENDENCY_LEVELS = ['low', 'medium', 'high'] as const;
export const ADHD_DIMENSION_LABELS = ['偏低', '中等', '偏高'] as const;

// 记录保存期限（天）
export const RECORD_RETENTION_DAYS = 30;

// 序列号相关
export const SERIAL_NUMBER_STATUS = {
  UNUSED: 0,
  USED: 1,
} as const;




