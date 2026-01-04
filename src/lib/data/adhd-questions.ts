/**
 * ADHD 测试题目数据（45题简化版）
 */

export interface AdhdQuestion {
  id: number;
  text: string;
  dimension: 'attention' | 'execution' | 'hyperactivity';
}

export const ADHD_QUESTIONS: AdhdQuestion[] = [
  // 注意力与专注力维度（1-15题）
  { id: 1, text: '在完成项目中最具挑战的部分之后，您在处理最后细节时是否感到困难？', dimension: 'attention' },
  { id: 2, text: '在完成需要组织规划的任务时，您是否时常难以将事情整理得井然有序？', dimension: 'attention' },
  { id: 3, text: '您是否时常难以记住约会、会议或应该做的事情？', dimension: 'attention' },
  { id: 4, text: '在处理枯燥或困难的项目时，您是否常常因为粗心而犯错？', dimension: 'attention' },
  { id: 5, text: '在进行单调或重复性的工作时，您是否时常难以长时间保持专注？', dimension: 'attention' },
  { id: 6, text: '当别人直接对您说话时，您是否常常表现得好像没在听？', dimension: 'attention' },
  { id: 7, text: '在家或在办公室，您是否时常乱放东西或难以找到需要的物品？', dimension: 'attention' },
  { id: 8, text: '您是否容易被周围的声音或活动干扰而分心？', dimension: 'attention' },
  { id: 9, text: '您是否时常感到难以集中注意力？', dimension: 'attention' },
  { id: 10, text: '您是否经常在阅读或听讲时走神？', dimension: 'attention' },
  { id: 11, text: '您是否容易忘记刚刚说过的话或要做的事？', dimension: 'attention' },
  { id: 12, text: '您是否在需要持续关注的任务中容易感到疲劳？', dimension: 'attention' },
  { id: 13, text: '您是否难以同时处理多个任务？', dimension: 'attention' },
  { id: 14, text: '您是否经常需要别人重复说明才能理解？', dimension: 'attention' },
  { id: 15, text: '您是否在需要仔细检查的工作中容易遗漏细节？', dimension: 'attention' },
  
  // 执行力与拖延维度（16-30题）
  { id: 16, text: '当面对一项需要大量思考的任务时，您是否常常回避或拖延开始？', dimension: 'execution' },
  { id: 17, text: '您是否经常拖延重要但不紧急的任务？', dimension: 'execution' },
  { id: 18, text: '您是否难以开始执行计划好的任务？', dimension: 'execution' },
  { id: 19, text: '您是否经常在任务进行到一半时就失去动力？', dimension: 'execution' },
  { id: 20, text: '您是否难以按照既定的时间表完成任务？', dimension: 'execution' },
  { id: 21, text: '您是否经常感到任务启动时心理阻力很大？', dimension: 'execution' },
  { id: 22, text: '您是否难以将想法转化为实际行动？', dimension: 'execution' },
  { id: 23, text: '您是否经常需要外部压力才能完成任务？', dimension: 'execution' },
  { id: 24, text: '您是否难以坚持完成长期目标？', dimension: 'execution' },
  { id: 25, text: '您是否经常因为拖延而错过截止日期？', dimension: 'execution' },
  { id: 26, text: '您是否难以制定并执行日常计划？', dimension: 'execution' },
  { id: 27, text: '您是否经常感到任务太多而不知从何开始？', dimension: 'execution' },
  { id: 28, text: '您是否难以保持对长期项目的持续关注？', dimension: 'execution' },
  { id: 29, text: '您是否经常在任务之间切换而难以完成？', dimension: 'execution' },
  { id: 30, text: '您是否难以建立并维持日常习惯？', dimension: 'execution' },
  
  // 多动/冲动与内在躁动维度（31-45题）
  { id: 31, text: '当您不得不长时间坐着时，您是否常常感到手脚动个不停或在座位上蠕动不安？', dimension: 'hyperactivity' },
  { id: 32, text: '您是否时常感到过度活跃，强迫自己不停做事，就像被马达驱动一样？', dimension: 'hyperactivity' },
  { id: 33, text: '在会议或其他应保持坐姿的场合，您是否常常擅自离席？', dimension: 'hyperactivity' },
  { id: 34, text: '您是否时常感到内心焦躁不安或静不下来？', dimension: 'hyperactivity' },
  { id: 35, text: '当您有独处时间时，您是否发现自己很难放松或平静下来？', dimension: 'hyperactivity' },
  { id: 36, text: '在社交场合中，您是否发现自己说话太多？', dimension: 'hyperactivity' },
  { id: 37, text: '当与人交谈时，您是否常常在别人还没讲完话前就插嘴或接话替对方把话讲完？', dimension: 'hyperactivity' },
  { id: 38, text: '在需要轮流等待的场合（如排队），您是否感到非常困难？', dimension: 'hyperactivity' },
  { id: 39, text: '您是否常常在别人忙碌时打断或干扰别人？', dimension: 'hyperactivity' },
  { id: 40, text: '您是否经常感到需要不停地活动？', dimension: 'hyperactivity' },
  { id: 41, text: '您是否难以安静地坐着或待在一个地方？', dimension: 'hyperactivity' },
  { id: 42, text: '您是否经常感到内心有强烈的冲动需要立即行动？', dimension: 'hyperactivity' },
  { id: 43, text: '您是否经常在不合适的场合说话或行动？', dimension: 'hyperactivity' },
  { id: 44, text: '您是否难以控制自己的冲动反应？', dimension: 'hyperactivity' },
  { id: 45, text: '您是否经常感到需要立即满足自己的需求？', dimension: 'hyperactivity' },
];

// 选项定义
export const ADHD_OPTIONS = [
  { value: 0, label: '从不' },
  { value: 1, label: '很少' },
  { value: 2, label: '有时' },
  { value: 3, label: '经常' },
  { value: 4, label: '总是' },
] as const;




