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

// SCL-90 相关（标准版：0-4分制）
export interface Scl90Test {
  id: number;
  serial_number: string;
  nickname?: string | null; // 用户昵称
  report_number?: string | null; // 报告编号
  raw_total_score?: number; // 原始总分（90题总分）
  total_score: number; // 总均分（总分÷90）
  overall_status: 'stable' | 'pressure' | 'obvious';
  factor_scores: {
    somatization: number;           // 躯体化
    obsessive_compulsive: number;   // 强迫症状
    interpersonal_sensitivity: number; // 人际关系敏感
    depression: number;              // 抑郁
    anxiety: number;                 // 焦虑
    hostility: number;               // 敌对
    phobic_anxiety: number;          // 恐怖
    paranoid_ideation: number;       // 偏执
    psychoticism: number;            // 精神病性
  };
  positive_items_count?: number;     // 阳性项目数（得分 ≥ 2）
  positive_items_average?: number;   // 阳性症状均分
  // 附加项相关（7项：19, 44, 59, 60, 64, 66, 89）
  additional_items_scores?: Record<number, number>; // 附加项各题得分
  additional_items_total?: number;   // 附加项总分
  additional_items_average?: number; // 附加项均分
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
  answer: 0 | 1 | 2 | 3 | 4;  // 标准SCL-90：0-4分
  score: 0 | 1 | 2 | 3 | 4;
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

