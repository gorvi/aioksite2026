/**
 * 标准SCL-90测试题目（90题，9个因子 + 7个附加项）
 * 
 * 注意：
 * 1. 评分范围：0-4分（没有、很轻、中等、偏重、严重）
 * 2. 题目顺序按照标准SCL-90编号（1-90）
 * 3. 因子分配按照标准映射（题目打乱分布）
 * 4. 附加项：19, 44, 59, 60, 64, 66, 89（不计入因子分）
 */

import { getFactorByQuestionNumber } from './scl90-standard-mapping';

export interface Scl90Question {
  id: number;
  text: string;
  dimension: 'somatization' | 'obsessive_compulsive' | 'interpersonal_sensitivity' | 
    'depression' | 'anxiety' | 'hostility' | 'phobic_anxiety' | 'paranoid_ideation' | 
    'psychoticism' | 'additional';
}

/**
 * 标准SCL-90题目
 * 题目内容基于附件中的标准SCL-90症状自评量表
 */
export const SCL90_QUESTIONS: Scl90Question[] = [
  // 以下题目基于附件《SCL-90症状自评量表》
  // 1-90题按照标准顺序排列，因子分配已按标准映射
  
  { id: 1, text: '头痛', dimension: 'somatization' },
  { id: 2, text: '神经过敏，心中不踏实', dimension: 'anxiety' },
  { id: 3, text: '头脑中有不必要的想法或字句盘旋', dimension: 'obsessive_compulsive' },
  { id: 4, text: '头昏或昏倒', dimension: 'somatization' },
  { id: 5, text: '对异性的兴趣减退', dimension: 'depression' },
  { id: 6, text: '对旁人责备求全', dimension: 'interpersonal_sensitivity' },
  { id: 7, text: '感到别人能控制你的思想', dimension: 'psychoticism' },
  { id: 8, text: '责怪别人制造麻烦', dimension: 'paranoid_ideation' },
  { id: 9, text: '忘记性大', dimension: 'obsessive_compulsive' },
  { id: 10, text: '担心自己的衣饰整齐及仪态的端正', dimension: 'obsessive_compulsive' },
  
  { id: 11, text: '容易烦恼和激动', dimension: 'hostility' },
  { id: 12, text: '胸痛', dimension: 'somatization' },
  { id: 13, text: '害怕空旷的场所或街道', dimension: 'phobic_anxiety' },
  { id: 14, text: '感到自己的精力下降，活动减慢', dimension: 'depression' },
  { id: 15, text: '想结束自己的生命', dimension: 'depression' },
  { id: 16, text: '听到旁人听不到的声音', dimension: 'psychoticism' },
  { id: 17, text: '发抖', dimension: 'anxiety' },
  { id: 18, text: '感到大多数人都不可信任', dimension: 'paranoid_ideation' },
  { id: 19, text: '胃口不好', dimension: 'additional' },
  { id: 20, text: '容易哭泣', dimension: 'depression' },
  
  { id: 21, text: '同异性相处时感到害羞不自在', dimension: 'interpersonal_sensitivity' },
  { id: 22, text: '感到受骗，中了圈套或有人想抓您', dimension: 'depression' },
  { id: 23, text: '无缘无故地突然感到害怕', dimension: 'anxiety' },
  { id: 24, text: '自己不能控制地大发脾气', dimension: 'hostility' },
  { id: 25, text: '怕单独出门', dimension: 'phobic_anxiety' },
  { id: 26, text: '经常责怪自己', dimension: 'depression' },
  { id: 27, text: '腰痛', dimension: 'somatization' },
  { id: 28, text: '感到难以完成任务', dimension: 'obsessive_compulsive' },
  { id: 29, text: '感到孤独', dimension: 'depression' },
  { id: 30, text: '感到苦闷', dimension: 'depression' },
  
  { id: 31, text: '过分担忧', dimension: 'depression' },
  { id: 32, text: '对事物不感兴趣', dimension: 'depression' },
  { id: 33, text: '感到害怕', dimension: 'anxiety' },
  { id: 34, text: '我的感情容易受到伤害', dimension: 'interpersonal_sensitivity' },
  { id: 35, text: '旁人能知道您的私下想法', dimension: 'psychoticism' },
  { id: 36, text: '感到别人不理解您、不同情您', dimension: 'interpersonal_sensitivity' },
  { id: 37, text: '感到人们对您不友好，不喜欢您', dimension: 'interpersonal_sensitivity' },
  { id: 38, text: '做事必须做得很慢以保证做得正确', dimension: 'obsessive_compulsive' },
  { id: 39, text: '心跳得很厉害', dimension: 'anxiety' },
  { id: 40, text: '恶心或胃部不舒服', dimension: 'somatization' },
  
  { id: 41, text: '感到比不上他人', dimension: 'interpersonal_sensitivity' },
  { id: 42, text: '肌肉酸痛', dimension: 'somatization' },
  { id: 43, text: '感到有人在监视您、谈论您', dimension: 'paranoid_ideation' },
  { id: 44, text: '难以入睡', dimension: 'additional' },
  { id: 45, text: '做事必须反复检查', dimension: 'obsessive_compulsive' },
  { id: 46, text: '难以作出决定', dimension: 'obsessive_compulsive' },
  { id: 47, text: '怕乘电车、公共汽车、地铁或火车', dimension: 'phobic_anxiety' },
  { id: 48, text: '呼吸有困难', dimension: 'somatization' },
  { id: 49, text: '一阵阵发冷或发热', dimension: 'somatization' },
  { id: 50, text: '因为感到害怕而避开某些东西，场合或活动', dimension: 'phobic_anxiety' },
  
  { id: 51, text: '脑子变空了', dimension: 'obsessive_compulsive' },
  { id: 52, text: '身体发麻或刺痛', dimension: 'somatization' },
  { id: 53, text: '喉咙有梗塞感', dimension: 'somatization' },
  { id: 54, text: '感到对前途没有希望', dimension: 'depression' },
  { id: 55, text: '不能集中注意力', dimension: 'obsessive_compulsive' },
  { id: 56, text: '感到身体的某一部分较弱无力', dimension: 'somatization' },
  { id: 57, text: '感到紧张或容易紧张', dimension: 'anxiety' },
  { id: 58, text: '感到手或脚发沉', dimension: 'somatization' },
  { id: 59, text: '想到有关死亡的事', dimension: 'additional' },
  { id: 60, text: '吃得太多', dimension: 'additional' },
  
  { id: 61, text: '当别人看着您或谈论您时感到不自在', dimension: 'interpersonal_sensitivity' },
  { id: 62, text: '有一些不属于您自己的想法', dimension: 'psychoticism' },
  { id: 63, text: '有想打人或伤害他人的冲动', dimension: 'hostility' },
  { id: 64, text: '醒得太早', dimension: 'additional' },
  { id: 65, text: '必须反复洗手、点数目或触摸某些东西', dimension: 'obsessive_compulsive' },
  { id: 66, text: '睡得不稳不深', dimension: 'additional' },
  { id: 67, text: '有想摔坏或破坏东西的冲动', dimension: 'hostility' },
  { id: 68, text: '有一些别人没有的想法或念头', dimension: 'paranoid_ideation' },
  { id: 69, text: '感到对别人神经过敏', dimension: 'interpersonal_sensitivity' },
  { id: 70, text: '在商店或电影院等人多的地方感到不自在', dimension: 'phobic_anxiety' },
  
  { id: 71, text: '感到任何事情都很困难', dimension: 'depression' },
  { id: 72, text: '一阵阵恐惧或惊恐', dimension: 'anxiety' },
  { id: 73, text: '感到在公共场合吃东西很不舒服', dimension: 'interpersonal_sensitivity' },
  { id: 74, text: '经常与人争论', dimension: 'hostility' },
  { id: 75, text: '单独一人时神经很紧张', dimension: 'phobic_anxiety' },
  { id: 76, text: '别人对您的成绩没有作出恰当的评价', dimension: 'paranoid_ideation' },
  { id: 77, text: '即使和别人在一起也感到孤单', dimension: 'psychoticism' },
  { id: 78, text: '感到坐立不安心神不宁', dimension: 'anxiety' },
  { id: 79, text: '感到自己没有什么价值', dimension: 'depression' },
  { id: 80, text: '感到熟悉的东西变成陌生或不象是真的', dimension: 'anxiety' },
  
  { id: 81, text: '大叫或摔东西', dimension: 'hostility' },
  { id: 82, text: '害怕会在公共场合晕倒', dimension: 'phobic_anxiety' },
  { id: 83, text: '感到别人想占您的便宜', dimension: 'paranoid_ideation' },
  { id: 84, text: '为一些有关"性"的想法而很苦恼', dimension: 'psychoticism' },
  { id: 85, text: '认为应该因为自己的过错而受到惩罚', dimension: 'psychoticism' },
  { id: 86, text: '感到要赶快把事情做完', dimension: 'anxiety' },
  { id: 87, text: '感到自己的身体有严重问题', dimension: 'psychoticism' },
  { id: 88, text: '从未感到和其他人很亲近', dimension: 'psychoticism' },
  { id: 89, text: '感到自己有罪', dimension: 'additional' },
  { id: 90, text: '感到自己的脑子有毛病', dimension: 'psychoticism' },
];

// 选项定义（标准SCL-90：0-4分制）
export const SCL90_OPTIONS = [
  { value: 0, label: '没有' },
  { value: 1, label: '很轻' },
  { value: 2, label: '中等' },
  { value: 3, label: '偏重' },
  { value: 4, label: '严重' },
] as const;

// 维度中文名称
export const SCL90_DIMENSION_NAMES = {
  somatization: '躯体化',
  obsessive_compulsive: '强迫症状',
  interpersonal_sensitivity: '人际关系敏感',
  depression: '抑郁',
  anxiety: '焦虑',
  hostility: '敌对',
  phobic_anxiety: '恐怖',
  paranoid_ideation: '偏执',
  psychoticism: '精神病性',
  additional: '附加项',
} as const;

// 验证题目完整性
export function validateQuestions(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 检查题目数量
  if (SCL90_QUESTIONS.length !== 90) {
    errors.push(`题目数量错误: ${SCL90_QUESTIONS.length}/90`);
  }
  
  // 检查编号连续性
  const ids = SCL90_QUESTIONS.map(q => q.id).sort((a, b) => a - b);
  for (let i = 1; i <= 90; i++) {
    if (!ids.includes(i)) {
      errors.push(`缺少题号: ${i}`);
    }
  }
  
  // 检查因子分配与标准映射一致性
  SCL90_QUESTIONS.forEach(q => {
    const expectedFactor = getFactorByQuestionNumber(q.id);
    if (q.dimension !== expectedFactor) {
      errors.push(`题号${q.id}的因子分配不正确: ${q.dimension} (应为 ${expectedFactor})`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

