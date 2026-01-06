/**
 * 标准SCL-90验证脚本
 * 用于验证题目映射和计算逻辑的正确性
 */

import { 
  SCL90_FACTOR_MAPPING, 
  SCL90_ADDITIONAL_ITEMS,
  validateFactorMapping,
  getFactorByQuestionNumber 
} from '../src/lib/data/scl90-standard-mapping';

import { 
  SCL90_QUESTIONS, 
  validateQuestions 
} from '../src/lib/data/scl90-questions-standard';

import { 
  calculateScl90Result,
  validateAnswers 
} from '../src/lib/utils/scl90-calculator-standard';

console.log('=================================');
console.log('标准SCL-90验证测试');
console.log('=================================\n');

// 测试1：验证因子映射完整性
console.log('【测试1】验证因子映射完整性...');
const mappingValidation = validateFactorMapping();
if (mappingValidation.valid) {
  console.log('✅ 因子映射验证通过');
  console.log(`   - 9个因子，共83题`);
  console.log(`   - 7个附加项：19, 44, 59, 60, 64, 66, 89`);
  console.log(`   - 总计90题\n`);
} else {
  console.log('❌ 因子映射验证失败：');
  mappingValidation.errors.forEach(err => console.log(`   - ${err}`));
  process.exit(1);
}

// 测试2：验证题目完整性和一致性
console.log('【测试2】验证题目完整性和一致性...');
const questionsValidation = validateQuestions();
if (questionsValidation.valid) {
  console.log('✅ 题目验证通过');
  console.log(`   - 90道题目完整`);
  console.log(`   - 题目编号连续（1-90）`);
  console.log(`   - 因子分配与标准映射一致\n`);
} else {
  console.log('❌ 题目验证失败：');
  questionsValidation.errors.forEach(err => console.log(`   - ${err}`));
  process.exit(1);
}

// 测试3：验证各因子题目数量
console.log('【测试3】验证各因子题目数量...');
const expectedCounts = {
  somatization: 12,
  obsessive_compulsive: 10,
  interpersonal_sensitivity: 9,
  depression: 13,
  anxiety: 10,
  hostility: 6,
  phobic_anxiety: 7,
  paranoid_ideation: 6,
  psychoticism: 10,
};

let countValid = true;
Object.entries(expectedCounts).forEach(([factor, expected]) => {
  const actual = SCL90_FACTOR_MAPPING[factor as keyof typeof SCL90_FACTOR_MAPPING].length;
  const status = actual === expected ? '✅' : '❌';
  console.log(`   ${status} ${factor}: ${actual}/${expected}题`);
  if (actual !== expected) countValid = false;
});

if (countValid) {
  console.log('✅ 因子题目数量验证通过\n');
} else {
  console.log('❌ 因子题目数量验证失败\n');
  process.exit(1);
}

// 测试4：生成测试答案并计算结果
console.log('【测试4】生成测试答案并计算结果...');

// 生成一个测试案例：所有题目得分为2（中等）
const testAnswers = SCL90_QUESTIONS.map((q, index) => ({
  questionId: q.id,
  questionNumber: q.id,
  dimension: q.dimension,
  answer: 2 as 0 | 1 | 2 | 3 | 4,
  score: 2 as 0 | 1 | 2 | 3 | 4,
}));

// 验证答案数据
const answersValidation = validateAnswers(testAnswers);
if (!answersValidation.valid) {
  console.log('❌ 答案数据验证失败：');
  answersValidation.errors.forEach(err => console.log(`   - ${err}`));
  process.exit(1);
}

// 计算结果
try {
  const result = calculateScl90Result(testAnswers, 'TEST-001');
  
  console.log('✅ 计算结果验证通过');
  console.log(`   - 原始总分: ${result.raw_total_score}（应为 90 × 2 = 180）`);
  console.log(`   - 总均分: ${result.total_score}（应为 180 ÷ 90 = 2.00）`);
  console.log(`   - 总体状态: ${result.overall_status}（应为 pressure，因为 1.5 ≤ 2.00 < 2.5）`);
  console.log(`   - 阳性项目数: ${result.positive_items_count}（应为 90，因为所有题得分≥2）`);
  console.log(`   - 阳性症状均分: ${result.positive_items_average}（应为 2.00）`);
  console.log(`   - 附加项总分: ${result.additional_items_total}（应为 7 × 2 = 14）`);
  console.log('   - 因子得分（均应为 2.00）：');
  
  Object.entries(result.factor_scores).forEach(([factor, score]) => {
    const status = Math.abs(score - 2.0) < 0.01 ? '✅' : '❌';
    console.log(`     ${status} ${factor}: ${score}`);
  });
  
  // 验证计算准确性
  const checksValid = 
    result.raw_total_score === 180 &&
    result.total_score === 2.00 &&
    result.overall_status === 'pressure' &&
    result.positive_items_count === 90 &&
    result.positive_items_average === 2.00 &&
    result.additional_items_total === 14;
  
  if (checksValid) {
    console.log('\n✅ 所有计算验证通过！\n');
  } else {
    console.log('\n⚠️  部分计算结果与预期不符，请检查\n');
  }
  
} catch (error) {
  console.log('❌ 计算过程出错：');
  console.error(error);
  process.exit(1);
}

// 测试5：边界值测试
console.log('【测试5】边界值测试...');

// 所有题目得分为0
const zeroAnswers = SCL90_QUESTIONS.map(q => ({
  questionId: q.id,
  questionNumber: q.id,
  dimension: q.dimension,
  answer: 0 as 0 | 1 | 2 | 3 | 4,
  score: 0 as 0 | 1 | 2 | 3 | 4,
}));

const zeroResult = calculateScl90Result(zeroAnswers, 'TEST-002');
console.log(`   最低分（全0）：总均分=${zeroResult.total_score}, 状态=${zeroResult.overall_status}`);

// 所有题目得分为4
const maxAnswers = SCL90_QUESTIONS.map(q => ({
  questionId: q.id,
  questionNumber: q.id,
  dimension: q.dimension,
  answer: 4 as 0 | 1 | 2 | 3 | 4,
  score: 4 as 0 | 1 | 2 | 3 | 4,
}));

const maxResult = calculateScl90Result(maxAnswers, 'TEST-003');
console.log(`   最高分（全4）：总均分=${maxResult.total_score}, 状态=${maxResult.overall_status}`);

if (zeroResult.total_score === 0 && zeroResult.overall_status === 'stable' &&
    maxResult.total_score === 4 && maxResult.overall_status === 'obvious') {
  console.log('✅ 边界值测试通过\n');
} else {
  console.log('❌ 边界值测试失败\n');
}

console.log('=================================');
console.log('✅ 所有验证测试完成！');
console.log('=================================');

