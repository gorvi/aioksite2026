# 心理测试平台

一个包含 SCL-90 和 ADHD 倾向自测功能的测试网站。

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: MySQL (通过 MCP)

## 项目结构

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # 组件
│   │   ├── common/       # 通用组件
│   │   ├── scl90/        # SCL-90 专用组件
│   │   └── adhd/         # ADHD 专用组件
│   ├── lib/              # 工具函数
│   │   ├── db/           # 数据库操作
│   │   ├── utils/        # 工具函数
│   │   └── constants/    # 常量定义
│   ├── types/            # TypeScript 类型
│   ├── hooks/            # 自定义 Hooks
│   └── styles/           # 全局样式
├── docs/                 # 文档
└── ui/                   # UI 参考文件
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check
```

## 数据库

数据库表已创建完成，包括：
- `serial_numbers` - 序列号管理
- `scl90_tests` - SCL-90 测试记录
- `scl90_answers` - SCL-90 答题记录
- `adhd_tests` - ADHD 测试记录
- `adhd_answers` - ADHD 答题记录

## 开发规范

请参考 `.cursorrules` 文件中的项目开发规范。




