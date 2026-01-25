---
name: create-new-test-game
description: 快速参考已有测试游戏逻辑新增其他测试游戏。提供完整的创建步骤、文件结构、代码模式和参考示例。当需要创建新的测试游戏、心理测试、性格测试或类似的自测工具时使用此技能。
---

# 创建新测试游戏

基于现有测试游戏（ADHD、SCL-90、城市性格测试）的模式，快速创建新的测试游戏。

## 快速检查清单

创建新测试游戏时，按以下顺序完成：

```
任务进度：
- [ ] 1. 创建数据文件（题目、配置、常模等）
- [ ] 2. 创建计算器函数
- [ ] 3. 创建数据库表结构
- [ ] 4. 创建页面路由（首页、昵称、说明、答题、确认、结果）
- [ ] 5. 创建API路由（提交测试）
- [ ] 6. 更新类型定义
- [ ] 7. 测试完整流程
```

## 1. 数据文件结构

### 1.1 题目数据文件

**位置**: `src/lib/data/{test-name}-questions.ts`

**参考示例**:
- `src/lib/data/city-personality-questions.ts` - 二选一题目
- `src/lib/data/adhd-full-questions.ts` - 多阶段题目（ASRS + WURS）
- `src/lib/data/scl90-questions-standard.ts` - 标准量表题目

**基本结构**:
```typescript
export interface TestQuestion {
  id: number;
  dimension?: string; // 维度（如 'E_I', 'S_N' 等）
  text: string;
  options: {
    id: string; // 'A' | 'B' 或 0 | 1 | 2 | 3 | 4
    text: string;
    score?: number; // 选项对应的分数
  }[];
  stage?: string; // 阶段（如 'asrs', 'wurs'）
}

export const TEST_QUESTIONS: TestQuestion[] = [
  // 题目数组
];
```

### 1.2 配置/常模数据文件（如需要）

**位置**: `src/lib/data/{test-name}-norms.ts` 或 `{test-name}-config.ts`

**参考示例**:
- `src/lib/data/scl90-norms.ts` - 常模数据
- `src/lib/data/cities-config.ts` - 城市配置
- `src/lib/data/scl90-suggestions.ts` - 建议内容

## 2. 计算器函数

**位置**: `src/lib/utils/{test-name}-calculator.ts`

**参考示例**:
- `src/lib/utils/city-personality-calculator.ts` - MBTI计算和城市匹配
- `src/lib/utils/adhd-full-calculator.ts` - 多维度得分计算
- `src/lib/utils/scl90-calculator-standard.ts` - 因子得分计算

**基本结构**:
```typescript
// 答案接口
export interface TestAnswer {
  questionId: number;
  questionNumber: number;
  dimension?: string;
  answerOption: string | number;
  score: number;
}

// 计算结果接口
export interface TestResult {
  // 核心结果字段
  totalScore?: number;
  dimensionScores?: Record<string, number>;
  level?: string; // 倾向等级
  // 其他结果字段...
}

/**
 * 计算测试结果
 */
export const calculateTestResult = (answers: TestAnswer[]): TestResult => {
  // 计算逻辑
  return {
    // 返回结果
  };
};
```

## 3. 数据库表结构

**位置**: `docs/db/init.sql`

**参考表结构**:
- `scl90_tests` - 标准量表测试表
- `adhd_tests` - 多维度测试表
- `city_personality_tests` - 匹配类测试表

**基本模式**:
```sql
CREATE TABLE IF NOT EXISTS `{test_name}_tests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `serial_number` VARCHAR(64) NULL COMMENT '序列号',
  `nickname` VARCHAR(50) DEFAULT NULL COMMENT '用户昵称',
  
  -- 核心结果字段（根据测试类型调整）
  `total_score` DECIMAL(5,2) NULL COMMENT '总分',
  `level` VARCHAR(20) NOT NULL COMMENT '倾向等级',
  
  -- JSON存储详细结果（推荐模式）
  `dimension_scores` JSON NOT NULL COMMENT '维度得分（JSON格式）',
  `test_results` JSON NOT NULL COMMENT '完整测试结果（JSON格式）',
  
  -- 系统字段
  `test_date` DATETIME NOT NULL COMMENT '测试日期',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL COMMENT '软删除',
  
  -- 索引
  INDEX `idx_serial_number` (`serial_number`),
  INDEX `idx_test_date` (`test_date`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**答案表**（如需要单独存储）:
```sql
CREATE TABLE IF NOT EXISTS `{test_name}_answers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `test_id` INT UNSIGNED NOT NULL COMMENT '测试记录ID',
  `question_id` INT UNSIGNED NOT NULL COMMENT '题目ID',
  `answer` VARCHAR(10) NOT NULL COMMENT '答案',
  `score` INT UNSIGNED NOT NULL COMMENT '得分',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_test_id` (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 4. 页面路由结构

### 4.1 目录结构

```
src/app/{test-name}/
├── page.tsx                    # 首页/欢迎页
├── layout.tsx                  # 布局（如需要）
├── nickname/
│   └── page.tsx               # 昵称输入页
├── instructions/
│   └── page.tsx               # 测试说明页
├── quiz/
│   └── page.tsx               # 答题页
├── confirm/
│   └── page.tsx               # 提交确认页（可选）
├── result/
│   └── page.tsx               # 结果页
└── records/
    └── page.tsx                # 测试记录页（可选）
```

### 4.2 页面实现要点

**首页 (page.tsx)**:
- 参考: `src/app/city-personality/page.tsx`
- 包含：测试介绍、说明、开始按钮
- 使用 `Card`、`Button`、`Header` 等公共组件

**昵称页 (nickname/page.tsx)**:
- 参考: `src/app/city-personality/nickname/page.tsx`
- 使用 `NicknameInput` 组件
- 保存到 `sessionStorage`（如 `{test_name}_nickname`）

**说明页 (instructions/page.tsx)**:
- 参考: `src/app/adhd/full/instructions/page.tsx`
- 包含：测试规则、题目数量、预计时间、注意事项
- 必须包含合规声明和用户同意

**答题页 (quiz/page.tsx)**:
- 参考: `src/app/city-personality/quiz/page.tsx` 或 `src/app/adhd/full/quiz/page.tsx`
- 核心功能：
  - 题目展示（一屏一题）
  - 答案选择
  - 进度显示
  - 上一题/下一题导航
  - 本地存储答案（`sessionStorage`）
  - 恢复答题进度
- 完成所有题目后跳转到确认页或结果页

**确认页 (confirm/page.tsx)** - 可选:
- 参考: `src/app/adhd/full/confirm/page.tsx`
- 显示答题摘要，防止误提交

**结果页 (result/page.tsx)**:
- 参考: `src/app/city-personality/result/page.tsx`
- 核心功能：
  - 展示测试结果
  - 导出图片（使用 `exportAsImage`）
  - 分享功能（使用 `shareImage` 或自定义）
  - 包含 `Disclaimer` 组件
  - 使用 `CuteDecoration` 装饰
- 结果数据从 `sessionStorage` 读取

### 4.3 页面间数据传递

使用 `sessionStorage` 存储：
- 昵称: `{test_name}_nickname`
- 答题进度: `{test_name}_quiz_progress`
- 测试结果: `{test_name}_result`

## 5. API路由

### 5.1 提交测试API

**位置**: `src/app/api/test/submit/route.ts`

**参考现有实现**，添加新的测试类型处理：

```typescript
// 在现有的 switch 语句中添加新case
case 'city_personality':
  // 处理城市性格测试提交
  break;
case 'your_test_name':
  // 处理新测试提交
  break;
```

**提交数据格式**:
```typescript
{
  testType: 'your_test_name',
  nickname: string,
  answers: TestAnswer[],
  result: TestResult
}
```

**数据库操作**:
- 插入测试记录到 `{test_name}_tests` 表
- 如需要，插入答案到 `{test_name}_answers` 表
- 使用 `src/lib/db/mcp-mysql.ts` 进行数据库操作

## 6. 类型定义

**位置**: `src/types/index.ts`

添加新测试的类型定义：

```typescript
// 答案类型
export interface YourTestAnswer {
  questionId: number;
  questionNumber: number;
  dimension?: string;
  answerOption: string | number;
  score: number;
}

// 结果类型
export interface YourTestResult {
  // 结果字段
}

// 测试记录类型
export interface YourTestRecord {
  id: number;
  serialNumber?: string;
  nickname?: string;
  // 其他字段
}
```

## 7. 参考示例对比

### 简单测试（二选一题目）

参考: **城市性格测试**
- 题目类型: 二选一（A/B）
- 计算逻辑: 维度得分 → MBTI类型 → 城市匹配
- 页面流程: 首页 → 昵称 → 说明 → 答题 → 结果

### 标准量表测试（多选项）

参考: **SCL-90测试**
- 题目类型: 5选项（0-4分制）
- 计算逻辑: 因子得分计算
- 页面流程: 首页 → 序列号 → 说明 → 答题 → 确认 → 结果 → 记录

### 多阶段测试

参考: **ADHD完整版测试**
- 题目类型: 分阶段（ASRS 18题 + WURS 25题）
- 计算逻辑: 阶段得分 → 综合判断
- 页面流程: 首页 → 昵称 → 说明 → 答题（分阶段） → 确认 → 结果

## 8. 合规要求

所有测试必须遵守：

1. **免责声明**: 结果页必须包含 `Disclaimer` 组件
2. **用户同意**: 说明页必须包含同意勾选和同意书链接
3. **术语规范**:
   - 使用"倾向自测"而非"诊断"
   - 使用"需关注"而非"阳性"
   - 使用"医疗机构或心理健康从业者"而非"专业医生"
4. **同意书链接**: 指向 `/agreement` 页面，新标签页打开

## 9. 公共组件使用

确保使用项目统一的公共组件：

- `Button` - 按钮
- `Card` - 卡片
- `Header` - 导航栏
- `NicknameInput` - 昵称输入
- `Disclaimer` - 免责声明
- `CuteDecoration` - 装饰元素
- `LineChart` - 折线图（如需要）
- `RadarChart` - 雷达图（如需要）

## 10. 测试验证

完成开发后，验证：

- [ ] 所有页面正常显示
- [ ] 答题流程完整（包括恢复进度）
- [ ] 计算结果正确
- [ ] 数据正确保存到数据库
- [ ] 结果页导出图片正常
- [ ] 分享功能正常
- [ ] 合规要求满足（免责声明、用户同意）
- [ ] 移动端和桌面端响应式正常

## 快速参考命令

```bash
# 查看现有测试结构
ls -la src/app/{adhd|scl90|city-personality}/

# 查看数据文件
ls -la src/lib/data/*-questions.ts

# 查看计算器
ls -la src/lib/utils/*-calculator.ts

# 查看数据库表结构
grep "CREATE TABLE" docs/db/init.sql
```
