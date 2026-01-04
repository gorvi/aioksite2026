/**
 * ADHD 完整版测试题目数据
 * ASRS v1.1 (18题) + WURS-25 (25题)
 */

export interface AdhdFullQuestion {
  id: number;
  text: string;
  stage: 'asrs' | 'wurs';
  dimension: 'attention' | 'execution' | 'hyperactivity';
  part?: 'A' | 'B'; // ASRS 的 Part A 或 Part B
}

// ASRS v1.1 成年现状评估（18题）
export const ASRS_QUESTIONS: AdhdFullQuestion[] = [
  // Part A: 核心筛查项（1-6题）
  { id: 1, text: '在完成项目中最具挑战的部分之后，您在处理最后细节时是否感到困难？', stage: 'asrs', dimension: 'attention', part: 'A' },
  { id: 2, text: '在完成需要组织规划的任务时，您是否时常难以将事情整理得井然有序？', stage: 'asrs', dimension: 'attention', part: 'A' },
  { id: 3, text: '您是否时常难以记住约会、会议或应该做的事情？', stage: 'asrs', dimension: 'attention', part: 'A' },
  { id: 4, text: '当面对一项需要大量思考的任务时，您是否常常回避或拖延开始？', stage: 'asrs', dimension: 'execution', part: 'A' },
  { id: 5, text: '当您不得不长时间坐着时，您是否常常感到手脚动个不停或在座位上蠕动不安？', stage: 'asrs', dimension: 'hyperactivity', part: 'A' },
  { id: 6, text: '您是否时常感到过度活跃，强迫自己不停做事，就像被马达驱动一样？', stage: 'asrs', dimension: 'hyperactivity', part: 'A' },
  
  // Part B: 深度探测项（7-18题）
  { id: 7, text: '在处理枯燥或困难的项目时，您是否常常因为粗心而犯错？', stage: 'asrs', dimension: 'attention', part: 'B' },
  { id: 8, text: '在进行单调或重复性的工作时，您是否时常难以长时间保持专注？', stage: 'asrs', dimension: 'attention', part: 'B' },
  { id: 9, text: '当别人直接对您说话时，您是否常常表现得好像没在听？', stage: 'asrs', dimension: 'attention', part: 'B' },
  { id: 10, text: '在家或在办公室，您是否时常乱放东西或难以找到需要的物品？', stage: 'asrs', dimension: 'attention', part: 'B' },
  { id: 11, text: '您是否容易被周围的声音或活动干扰而分心？', stage: 'asrs', dimension: 'attention', part: 'B' },
  { id: 12, text: '在会议或其他应保持坐姿的场合，您是否常常擅自离席？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 13, text: '您是否时常感到内心焦躁不安或静不下来？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 14, text: '当您有独处时间时，您是否发现自己很难放松或平静下来？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 15, text: '在社交场合中，您是否发现自己说话太多？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 16, text: '当与人交谈时，您是否常常在别人还没讲完话前就插嘴或接话替对方把话讲完？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 17, text: '在需要轮流等待的场合（如排队），您是否感到非常困难？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
  { id: 18, text: '您是否常常在别人忙碌时打断或干扰别人？', stage: 'asrs', dimension: 'hyperactivity', part: 'B' },
];

// WURS-25 童年回溯评估（25题）
export const WURS_QUESTIONS: AdhdFullQuestion[] = [
  { id: 19, text: '注意力不集中，容易分心', stage: 'wurs', dimension: 'attention' },
  { id: 20, text: '感到焦虑，总爱担心', stage: 'wurs', dimension: 'attention' },
  { id: 21, text: '神经紧张，好动，坐不住', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 22, text: '爱做白日梦，不专心', stage: 'wurs', dimension: 'attention' },
  { id: 23, text: '脾气火爆，没耐心', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 24, text: '会大发脾气或闹情绪', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 25, text: '缺乏持久性，做事半途而废', stage: 'wurs', dimension: 'execution' },
  { id: 26, text: '固执，意志太强', stage: 'wurs', dimension: 'execution' },
  { id: 27, text: '感到忧郁、沮丧、不快乐', stage: 'wurs', dimension: 'attention' },
  { id: 28, text: '反抗父母，不服管教，顶嘴', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 29, text: '自卑，自我评价低', stage: 'wurs', dimension: 'attention' },
  { id: 30, text: '容易烦躁，易激惹', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 31, text: '情绪化，心情阴晴不定', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 32, text: '容易感到愤怒', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 33, text: '行为鲁莽冲动，不顾后果', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 34, text: '倾向于表现得幼稚、不成熟', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 35, text: '常有负罪感，容易后悔', stage: 'wurs', dimension: 'attention' },
  { id: 36, text: '容易失去自我控制', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 37, text: '倾向于理智不清或行为怪异', stage: 'wurs', dimension: 'attention' },
  { id: 38, text: '不受其他孩子欢迎，难以维持朋友关系', stage: 'wurs', dimension: 'execution' },
  { id: 39, text: '难以从他人角度思考问题', stage: 'wurs', dimension: 'execution' },
  { id: 40, text: '与权威（如校长、老师）发生冲突', stage: 'wurs', dimension: 'hyperactivity' },
  { id: 41, text: '学习成绩差，学习速度慢', stage: 'wurs', dimension: 'attention' },
  { id: 42, text: '在数学或数字计算方面有困难', stage: 'wurs', dimension: 'attention' },
  { id: 43, text: '感到自己没有发挥出应有的潜力', stage: 'wurs', dimension: 'execution' },
];

// 合并所有题目
export const ADHD_FULL_QUESTIONS: AdhdFullQuestion[] = [
  ...ASRS_QUESTIONS,
  ...WURS_QUESTIONS,
];

// 选项定义（ASRS 和 WURS 使用相同的选项）
export const ADHD_FULL_OPTIONS = [
  { value: 0, label: '从不' },
  { value: 1, label: '很少' },
  { value: 2, label: '有时' },
  { value: 3, label: '经常' },
  { value: 4, label: '总是' },
] as const;

// WURS 选项标签（略有不同，但计分相同）
export const WURS_OPTIONS = [
  { value: 0, label: '完全没有' },
  { value: 1, label: '偶尔/有一点' },
  { value: 2, label: '中等程度' },
  { value: 3, label: '相当明显' },
  { value: 4, label: '非常严重' },
] as const;



