/**
 * 标准SCL-90因子映射
 * 基于附件中的标准SCL-90量表
 */

// 各因子包含的题号（基于附件）
export const SCL90_FACTOR_MAPPING = {
  // 1. 躯体化（Somatization）- 12项
  somatization: [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],
  
  // 2. 强迫症状（Obsessive-Compulsive）- 10项
  obsessive_compulsive: [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
  
  // 3. 人际关系敏感（Interpersonal Sensitivity）- 9项
  interpersonal_sensitivity: [6, 21, 34, 36, 37, 41, 61, 69, 73],
  
  // 4. 抑郁（Depression）- 13项
  depression: [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
  
  // 5. 焦虑（Anxiety）- 10项
  anxiety: [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
  
  // 6. 敌对（Hostility）- 6项
  hostility: [11, 24, 63, 67, 74, 81],
  
  // 7. 恐怖（Phobic Anxiety）- 7项
  phobic_anxiety: [13, 25, 47, 50, 70, 75, 82],
  
  // 8. 偏执（Paranoid Ideation）- 6项
  paranoid_ideation: [8, 18, 43, 68, 76, 83],
  
  // 9. 精神病性（Psychoticism）- 10项
  psychoticism: [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
} as const;

// 附加项（不计入任何因子分，单独评估）- 7项
export const SCL90_ADDITIONAL_ITEMS = [19, 44, 59, 60, 64, 66, 89] as const;

// 根据题号获取对应的因子
export function getFactorByQuestionNumber(questionNumber: number): string | 'additional' {
  for (const [factor, questions] of Object.entries(SCL90_FACTOR_MAPPING)) {
    if ((questions as readonly number[]).includes(questionNumber)) {
      return factor;
    }
  }
  
  if ((SCL90_ADDITIONAL_ITEMS as readonly number[]).includes(questionNumber)) {
    return 'additional';
  }
  
  throw new Error(`Invalid question number: ${questionNumber}`);
}

// 验证因子映射完整性
export function validateFactorMapping(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const allMappedQuestions = new Set<number>();
  
  // 收集所有已映射的题号
  Object.values(SCL90_FACTOR_MAPPING).forEach(questions => {
    questions.forEach(q => allMappedQuestions.add(q));
  });
  
  SCL90_ADDITIONAL_ITEMS.forEach(q => allMappedQuestions.add(q));
  
  // 检查是否恰好90题
  if (allMappedQuestions.size !== 90) {
    errors.push(`题目数量不正确: ${allMappedQuestions.size}/90`);
  }
  
  // 检查是否有重复
  const totalCount = Object.values(SCL90_FACTOR_MAPPING)
    .reduce((sum, arr) => sum + arr.length, 0) + SCL90_ADDITIONAL_ITEMS.length;
  
  if (totalCount !== allMappedQuestions.size) {
    errors.push('存在重复的题号');
  }
  
  // 检查是否覆盖1-90
  for (let i = 1; i <= 90; i++) {
    if (!allMappedQuestions.has(i)) {
      errors.push(`缺少题号: ${i}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// 各因子题目数量（用于计算均分）
export const SCL90_FACTOR_ITEM_COUNTS = {
  somatization: 12,
  obsessive_compulsive: 10,
  interpersonal_sensitivity: 9,
  depression: 13,
  anxiety: 10,
  hostility: 6,
  phobic_anxiety: 7,
  paranoid_ideation: 6,
  psychoticism: 10,
} as const;

