/**
 * SCL-90 测试题目数据（90题，9个维度）
 */

export interface Scl90Question {
  id: number;
  text: string;
  dimension: 'somatization' | 'obsessive_compulsive' | 'interpersonal_sensitivity' | 'depression' | 'anxiety' | 'hostility' | 'phobic_anxiety' | 'paranoid_ideation' | 'psychoticism';
}

export const SCL90_QUESTIONS: Scl90Question[] = [
  // 身体不适相关（1-12题）
  { id: 1, text: '你是否感到头部不适或头痛？', dimension: 'somatization' },
  { id: 2, text: '你是否有胸闷、心口不舒服的感觉？', dimension: 'somatization' },
  { id: 3, text: '你是否感到胃部不适或消化不良？', dimension: 'somatization' },
  { id: 4, text: '你是否感到身体乏力、容易疲惫？', dimension: 'somatization' },
  { id: 5, text: '你是否感到肌肉酸痛或身体紧绷？', dimension: 'somatization' },
  { id: 6, text: '你是否出现恶心或想呕吐的感觉？', dimension: 'somatization' },
  { id: 7, text: '你是否感到呼吸不顺或气短？', dimension: 'somatization' },
  { id: 8, text: '你是否经常感到头晕或站立不稳？', dimension: 'somatization' },
  { id: 9, text: '你是否感到身体某些部位疼痛却说不出原因？', dimension: 'somatization' },
  { id: 10, text: '你是否觉得身体状态明显不如以前？', dimension: 'somatization' },
  { id: 11, text: '你是否对身体的小变化特别敏感？', dimension: 'somatization' },
  { id: 12, text: '你是否担心自己的身体健康状况？', dimension: 'somatization' },
  
  // 反复想法与行为（13-22题）
  { id: 13, text: '你是否反复想到一些不想去想的事情？', dimension: 'obsessive_compulsive' },
  { id: 14, text: '你是否难以控制自己不断检查某些事情？', dimension: 'obsessive_compulsive' },
  { id: 15, text: '你是否反复回想已经发生过的小事？', dimension: 'obsessive_compulsive' },
  { id: 16, text: '你是否觉得某些想法在脑中停不下来？', dimension: 'obsessive_compulsive' },
  { id: 17, text: '你是否需要按特定顺序做事才安心？', dimension: 'obsessive_compulsive' },
  { id: 18, text: '你是否因为反复确认而耽误时间？', dimension: 'obsessive_compulsive' },
  { id: 19, text: '你是否难以摆脱一些重复的行为习惯？', dimension: 'obsessive_compulsive' },
  { id: 20, text: '你是否因想法反复而感到烦躁？', dimension: 'obsessive_compulsive' },
  { id: 21, text: '你是否觉得自己想得太多？', dimension: 'obsessive_compulsive' },
  { id: 22, text: '你是否明知没必要却仍反复去做？', dimension: 'obsessive_compulsive' },
  
  // 人际敏感感受（23-32题）
  { id: 23, text: '你是否容易因为他人的态度而感到不舒服？', dimension: 'interpersonal_sensitivity' },
  { id: 24, text: '你是否担心别人如何评价你？', dimension: 'interpersonal_sensitivity' },
  { id: 25, text: '你是否在人际交往中感到紧张？', dimension: 'interpersonal_sensitivity' },
  { id: 26, text: '你是否觉得自己不如别人？', dimension: 'interpersonal_sensitivity' },
  { id: 27, text: '你是否害怕在他人面前出错？', dimension: 'interpersonal_sensitivity' },
  { id: 28, text: '你是否对批评特别敏感？', dimension: 'interpersonal_sensitivity' },
  { id: 29, text: '你是否感到被忽视或不被理解？', dimension: 'interpersonal_sensitivity' },
  { id: 30, text: '你是否在人多的场合感到不自在？', dimension: 'interpersonal_sensitivity' },
  { id: 31, text: '你是否担心被拒绝或否定？', dimension: 'interpersonal_sensitivity' },
  { id: 32, text: '你是否因人际关系而感到压力？', dimension: 'interpersonal_sensitivity' },
  
  // 情绪低落体验（33-45题）
  { id: 33, text: '你是否感到情绪低落或心情不好？', dimension: 'depression' },
  { id: 34, text: '你是否对原本感兴趣的事情提不起劲？', dimension: 'depression' },
  { id: 35, text: '你是否感到做什么都很累？', dimension: 'depression' },
  { id: 36, text: '你是否感到对未来缺乏期待？', dimension: 'depression' },
  { id: 37, text: '你是否容易感到悲伤或失落？', dimension: 'depression' },
  { id: 38, text: '你是否觉得生活缺少意义？', dimension: 'depression' },
  { id: 39, text: '你是否经常想独处、不想说话？', dimension: 'depression' },
  { id: 40, text: '你是否感到情绪压抑？', dimension: 'depression' },
  { id: 41, text: '你是否对自己感到失望？', dimension: 'depression' },
  { id: 42, text: '你是否觉得每天过得很艰难？', dimension: 'depression' },
  { id: 43, text: '你是否感到情绪难以振作？', dimension: 'depression' },
  { id: 44, text: '你是否容易流泪或情绪波动大？', dimension: 'depression' },
  { id: 45, text: '你是否觉得快乐的时刻变少了？', dimension: 'depression' },
  
  // 紧张与不安感受（46-55题）
  { id: 46, text: '你是否感到紧张或坐立不安？', dimension: 'anxiety' },
  { id: 47, text: '你是否容易感到担心？', dimension: 'anxiety' },
  { id: 48, text: '你是否感到内心难以平静？', dimension: 'anxiety' },
  { id: 49, text: '你是否在没有明显原因时感到害怕？', dimension: 'anxiety' },
  { id: 50, text: '你是否感到手心出汗或心跳加快？', dimension: 'anxiety' },
  { id: 51, text: '你是否容易被小事吓到？', dimension: 'anxiety' },
  { id: 52, text: '你是否担心事情会变糟？', dimension: 'anxiety' },
  { id: 53, text: '你是否感到压力很大？', dimension: 'anxiety' },
  { id: 54, text: '你是否感到焦虑影响了生活？', dimension: 'anxiety' },
  { id: 55, text: '你是否难以放松下来？', dimension: 'anxiety' },
  
  // 易怒与敌意（56-61题）
  { id: 56, text: '你是否容易发脾气？', dimension: 'hostility' },
  { id: 57, text: '你是否对他人感到不耐烦？', dimension: 'hostility' },
  { id: 58, text: '你是否容易因小事生气？', dimension: 'hostility' },
  { id: 59, text: '你是否有想与人争吵的冲动？', dimension: 'hostility' },
  { id: 60, text: '你是否感到内心有压抑的怒气？', dimension: 'hostility' },
  { id: 61, text: '你是否事后后悔自己的情绪反应？', dimension: 'hostility' },
  
  // 恐惧与回避（62-68题）
  { id: 62, text: '你是否害怕某些场合或情境？', dimension: 'phobic_anxiety' },
  { id: 63, text: '你是否因害怕而回避某些事情？', dimension: 'phobic_anxiety' },
  { id: 64, text: '你是否对突发情况感到恐慌？', dimension: 'phobic_anxiety' },
  { id: 65, text: '你是否害怕独自面对问题？', dimension: 'phobic_anxiety' },
  { id: 66, text: '你是否因恐惧而影响日常安排？', dimension: 'phobic_anxiety' },
  { id: 67, text: '你是否担心失去控制？', dimension: 'phobic_anxiety' },
  { id: 68, text: '你是否感到恐惧来得突然？', dimension: 'phobic_anxiety' },
  
  // 多疑与不信任（69-75题）
  { id: 69, text: '你是否容易怀疑他人的动机？', dimension: 'paranoid_ideation' },
  { id: 70, text: '你是否觉得别人对你不够友好？', dimension: 'paranoid_ideation' },
  { id: 71, text: '你是否担心被他人利用？', dimension: 'paranoid_ideation' },
  { id: 72, text: '你是否觉得他人对你有所隐瞒？', dimension: 'paranoid_ideation' },
  { id: 73, text: '你是否对周围环境保持高度警惕？', dimension: 'paranoid_ideation' },
  { id: 74, text: '你是否觉得自己经常被针对？', dimension: 'paranoid_ideation' },
  { id: 75, text: '你是否难以完全信任别人？', dimension: 'paranoid_ideation' },
  
  // 疏离与异常体验（76-90题）
  { id: 76, text: '你是否感到与他人有距离感？', dimension: 'psychoticism' },
  { id: 77, text: '你是否觉得自己与周围格格不入？', dimension: 'psychoticism' },
  { id: 78, text: '你是否感到孤独？', dimension: 'psychoticism' },
  { id: 79, text: '你是否觉得思维有时变得混乱？', dimension: 'psychoticism' },
  { id: 80, text: '你是否觉得难以集中注意力？', dimension: 'psychoticism' },
  { id: 81, text: '你是否感到现实感变弱？', dimension: 'psychoticism' },
  { id: 82, text: '你是否觉得表达想法变得困难？', dimension: 'psychoticism' },
  { id: 83, text: '你是否感到情感变得迟钝？', dimension: 'psychoticism' },
  { id: 84, text: '你是否觉得自己被隔离在外？', dimension: 'psychoticism' },
  { id: 85, text: '你是否觉得想法与以往不同？', dimension: 'psychoticism' },
  { id: 86, text: '你是否觉得难以与人建立连接？', dimension: 'psychoticism' },
  { id: 87, text: '你是否感到内心空虚？', dimension: 'psychoticism' },
  { id: 88, text: '你是否觉得自己不被理解？', dimension: 'psychoticism' },
  { id: 89, text: '你是否感到精神状态不稳定？', dimension: 'psychoticism' },
  { id: 90, text: '你是否觉得自己需要更多心理支持？', dimension: 'psychoticism' },
];

// 选项定义
export const SCL90_OPTIONS = [
  { value: 1, label: '没有' },
  { value: 2, label: '很轻' },
  { value: 3, label: '中等' },
  { value: 4, label: '偏重' },
  { value: 5, label: '严重' },
] as const;

// 维度中文名称
export const SCL90_DIMENSION_NAMES = {
  somatization: '身体不适',
  obsessive_compulsive: '反复想法与行为',
  interpersonal_sensitivity: '人际敏感',
  depression: '情绪低落',
  anxiety: '紧张与不安',
  hostility: '易怒与敌意',
  phobic_anxiety: '恐惧与回避',
  paranoid_ideation: '多疑与不信任',
  psychoticism: '疏离与异常体验',
} as const;




