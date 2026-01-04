/**
 * 敏感词库
 * 用于昵称检测等场景
 */
export const SENSITIVE_WORDS = [
    // 政治相关
    '政府', '共产党', '中共', '法轮功', '主要领导人姓名',

    // 辱骂与攻击性词汇
    '傻逼', '傻B', '傻b', 'SB', 'sb', '智障', '脑残', '白痴', '弱智',
    '操你妈', '草泥马', 'CNM', 'cnm', '滚', '去死', '垃圾', '废物',
    '婊子', '荡妇', '妓女', '强奸', '乱伦', '畜生', '狗日',
    'fuck', 'FUCK', 'bitch', 'BITCH', 'shit', 'SHIT', 'asshole',
    'nigger', 'cunt', 'whore',

    // 色情低俗
    '色情', 'av', 'AV', '三级片', '各种生殖器名',

    // 其他违禁
    '毒品', '枪支', '恐怖分子'
];

/**
 * 检查文本是否包含敏感词
 * @param text 待检查文本
 * @returns 如果包含敏感词，返回 true
 */
export const containsSensitiveWords = (text: string): boolean => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return SENSITIVE_WORDS.some(word => lowerText.includes(word.toLowerCase()));
};
