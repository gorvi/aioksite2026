/**
 * 通用类型定义
 */

// API 响应格式
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// 序列号相关
export interface SerialNumber {
  id: number;
  serial_number: string;
  status: 0 | 1; // 0-未使用，1-已使用
  used_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

// SCL-90 相关
export interface Scl90Test {
  id: number;
  serial_number: string;
  nickname?: string | null; // 用户昵称
  report_number?: string | null; // 报告编号
  raw_total_score?: number; // 原始总分（90题总分）
  total_score: number; // 总均分
  overall_status: 'stable' | 'pressure' | 'obvious';
  factor_scores: {
    somatization: number;
    obsessive_compulsive: number;
    interpersonal_sensitivity: number;
    depression: number;
    anxiety: number;
    hostility: number;
    phobic_anxiety: number;
    paranoid_ideation: number;
    psychoticism: number;
  };
  attention_items_count?: number; // 需关注项目数（得分 ≥ 2）
  normal_items_count?: number; // 正常项目数（得分 < 2）
  attention_items_average?: number; // 需关注项目平均分
  // 常模数据相关（可选）
  factor_levels?: {
    somatization?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    obsessive_compulsive?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    interpersonal_sensitivity?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    depression?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    anxiety?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    hostility?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    phobic_anxiety?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    paranoid_ideation?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
    psychoticism?: 'light' | 'moderate' | 'severe' | 'extremelySevere';
  };
  test_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Scl90Answer {
  id: number;
  test_id: number;
  question_number: number;
  dimension: string;
  answer: 1 | 2 | 3 | 4 | 5;
  score: 1 | 2 | 3 | 4 | 5;
  created_at: string;
}

// ADHD 相关
export interface AdhdTest {
  id: number;
  serial_number?: string | null;
  nickname?: string | null; // 用户昵称
  report_number?: string | null; // 报告编号
  test_type: 'simple' | 'full';
  total_score: number | null;
  asrs_score: number | null;
  wurs_score: number | null;
  tendency_level: 'low' | 'medium' | 'high';
  dimension_scores: {
    attention: number;
    execution: number;
    hyperactivity: number;
  };
  dimension_labels: {
    attention: '偏低' | '中等' | '偏高';
    execution: '偏低' | '中等' | '偏高';
    hyperactivity: '偏低' | '中等' | '偏高';
  };
  main_features: string[];
  suggestions: string[];
  test_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AdhdAnswer {
  id: number;
  test_id: number;
  question_number: number;
  dimension: 'attention' | 'execution' | 'hyperactivity';
  stage: 'asrs' | 'wurs' | null;
  answer: 0 | 1 | 2 | 3 | 4;
  score: 0 | 1 | 2 | 3 | 4;
  created_at: string;
}

