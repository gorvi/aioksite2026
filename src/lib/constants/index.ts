/**
 * 常量定义
 */

// SCL-90 常量
export const SCL90_TOTAL_QUESTIONS = 90;
export const SCL90_DIMENSIONS = [
  'somatization', // 身体不适
  'obsessive_compulsive', // 反复想法与行为
  'interpersonal_sensitivity', // 人际敏感
  'depression', // 情绪低落
  'anxiety', // 紧张与不安
  'hostility', // 易怒与敌意
  'phobic_anxiety', // 恐惧与回避
  'paranoid_ideation', // 多疑与不信任
  'psychoticism', // 疏离与异常体验
] as const;

export const SCL90_SCORE_RANGES = {
  STABLE: { min: 0, max: 1.99 }, // 心理状态整体稳定
  PRESSURE: { min: 2.0, max: 2.99 }, // 存在一定心理压力
  OBVIOUS: { min: 3.0, max: 5.0 }, // 心理困扰较明显
} as const;

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




