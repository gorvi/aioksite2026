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

// 城市性格测试相关
export interface CityPersonalityTest {
  id: number;
  serial_number: string;
  nickname?: string | null;
  report_number?: string | null;
  
  // 核心结果（存储到数据库）
  mbti_type: string; // MBTI类型，如：ENFP
  matched_city: string; // 匹配的城市名称
  match_percentage: number; // 匹配百分比（0-100）
  
  // 维度得分（用于统计分析）
  e_i_score: number; // 外向/内向得分（9-18）
  s_n_score: number; // 实感/直觉得分（9-18）
  t_f_score: number; // 思考/情感得分（9-18）
  j_p_score: number; // 判断/感知得分（9-18）
  
  test_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}export interface CityPersonalityAnswer {
  id: number;
  test_id: number;
  question_number: number; // 题目编号（1-36）
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P'; // MBTI维度
  answer_option: 'A' | 'B'; // 选择的选项
  score: 1 | 2; // 选项得分（A=1, B=2）
  created_at: string;
}

// 城市性格测试结果（包含实时生成的详细信息）
export interface CityPersonalityResult extends CityPersonalityTest {
  // 实时生成的详细信息（不存数据库）
  personality_tags: string[]; // 性格标签
  city_description?: string; // 城市描述
  detailed_analysis?: string; // 详细分析
  city_features?: string[]; // 城市特色
  dimension_scores?: {
    E_I: number;
    S_N: number;
    T_F: number;
    J_P: number;
  };
}

// 城市性格问题类型（用于前端显示）
export interface CityPersonalityQuestion {
  id: number;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  text: string;
  options: {
    id: 'A' | 'B';
    text: string;
    score: 1 | 2;
  }[];
}

// 城市配置类型
export interface CityConfig {
  id: string;
  name: string;
  nickname?: string;
  tags: string[];
  personalityTypes: string[];
  description: string;
  detailedFeatures: string[];
  matchingThresholds: {
    [mbtiType: string]: number;
  };
  colorTheme: {
    primary: string;
    secondary: string;
    accent?: string;
  };
}

// 城市描述类型
export interface CityDescription {
  welcome: string;
  lifestyle: string;
  culture: string;
  advantages: string;
  suitable: string;
  conclusion: string;
}

// 维度得分类型
export interface DimensionScores {
  E_I: number;  // 外向/内向得分
  S_N: number;  // 实感/直觉得分
  T_F: number;  // 思考/情感得分
  J_P: number;  // 判断/感知得分
}

// 测试提交数据类型
export interface CityPersonalitySubmitData {
  serial_number: string;
  nickname: string;
  answers: {
    questionId: number;
    questionNumber: number;
    dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
    answerOption: 'A' | 'B';
    score: 1 | 2;
  }[];
}
