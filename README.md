# 心理测试平台

一个专业的心理健康自测平台，提供SCL-90和ADHD倾向自测功能，帮助用户了解自己的心理状态。

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-4479A1)](https://www.mysql.com/)

## ✨ 功能特性

### 🧠 心理测评
- **SCL-90 心理症状自评量表** - 90题专业心理健康评估
- **ADHD 注意力缺陷多动症自测** - 基于ASRS v1.1和WURS-25的综合评估
- **智能评分算法** - 专业的统计分析和结果解读

### 📊 结果分析
- **可视化图表** - 使用Recharts展示因子得分分布
- **详细报告** - 包含总体状态、各项指标分析和建议
- **图片导出** - 高质量结果图片，与页面显示完全一致

### 🎨 用户体验
- **响应式设计** - 完美适配移动端和PC端
- **暗色模式** - 护眼的深色主题
- **动画效果** - 流畅的交互体验
- **无障碍支持** - 符合Web可访问性标准

### 🔐 隐私保护
- **匿名测试** - 支持昵称方式进行测试
- **数据安全** - 完整的免责声明和隐私保护
- **本地优先** - 敏感数据处理透明化

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- MySQL 8.0+

### 1. 克隆项目
```bash
git clone <repository-url>
cd frontend
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
创建 `.env.local` 文件：
```env
# 数据库配置
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
```

### 4. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用。

## 🗄️ 数据库连接

### 远程数据库连接
项目支持通过SSH隧道连接远程数据库：

```bash
# 自动建立SSH隧道（推荐）
./auto_tunnel.sh

# 检查隧道状态
./test_tunnel.sh
```

### 数据库表结构
- `serial_numbers` - 序列号管理 (201条记录)
- `scl90_tests` - SCL-90测试记录 (4条记录)
- `scl90_answers` - SCL-90答题记录
- `adhd_tests` - ADHD测试记录 (3条记录)
- `adhd_answers` - ADHD答题记录
- `user_actions` - 用户行为日志

### MCP MySQL配置
项目使用MCP MySQL工具进行数据库操作，配置文件：`.cursor/mcp.json`

## 📁 项目结构

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── scl90/               # SCL-90 测试页面
│   │   ├── adhd/                # ADHD 测试页面
│   │   └── api/                 # API 路由
│   ├── components/              # React 组件
│   │   ├── common/              # 通用组件
│   │   │   ├── LineChart.tsx    # 统一折线图组件
│   │   │   ├── NicknameInput.tsx# 昵称输入组件
│   │   │   └── ...
│   │   ├── scl90/               # SCL-90 专用组件
│   │   └── adhd/                # ADHD 专用组件
│   ├── lib/                     # 工具函数库
│   │   ├── db/                  # 数据库操作
│   │   ├── utils/               # 工具函数
│   │   │   └── export-result.ts # 结果导出功能
│   │   └── constants/           # 常量定义
│   ├── types/                   # TypeScript 类型定义
│   ├── hooks/                   # 自定义 React Hooks
│   └── styles/                  # 全局样式
├── docs/                        # 项目文档
├── scripts/                     # 脚本文件
├── auto_tunnel.sh              # SSH隧道自动建立
├── test_tunnel.sh              # 隧道状态检查
└── README_SCRIPTS.md           # 脚本使用说明
```

## 🛠️ 开发命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 类型检查
npm run type-check

# 代码格式化
npm run lint

# 启动生产服务器
npm start
```

## 🚀 部署

### 生产环境部署
1. **服务器配置** - 详见 `DEPLOYMENT.md`
2. **环境变量** - 使用 `ecosystem.config.js` 管理
3. **进程管理** - 通过PM2管理应用进程
4. **自动部署** - GitHub Actions自动化部署

### 宝塔面板部署
项目通过PM2管理，不使用宝塔的Node项目管理功能。

## 📋 开发规范

### 代码风格
- **常量命名**: `SCL90_TOTAL_QUESTIONS` (全大写下划线)
- **函数命名**: `calculateScl90Result` (小驼峰)
- **组件命名**: `LineChartComponent` (大驼峰)

### 组件复用
- **折线图**: 统一使用 `LineChartComponent`
- **昵称输入**: 统一使用 `NicknameInput`
- **按钮样式**: 统一使用 `Button` 组件

### 合规要求
- **免责声明**: 所有测试结果页面必须包含
- **术语规范**: 使用"仅供自我了解"而非"专业诊断"
- **用户同意**: 测试前必须获得用户明确同意

详细规范请参考 `.cursorrules` 文件。

## 🔧 故障排查

### 数据库连接问题
```bash
# 检查SSH隧道状态
./test_tunnel.sh

# 重新建立隧道
./auto_tunnel.sh

# 检查MCP MySQL连接
# 在Cursor中使用MCP工具测试
```

### 导出功能问题
- 确保元素有正确的 `id="result-card"`
- 检查浏览器控制台是否有错误
- 验证 `html2canvas` 库是否正确加载

### 样式问题
- 检查Tailwind CSS配置
- 确认暗色模式类名正确应用
- 验证响应式断点设置

## 📄 许可证

本项目仅供学习和研究使用。

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📞 支持

如有问题，请查看：
- 📖 [项目文档](./docs/)
- 🔧 [脚本说明](./README_SCRIPTS.md)
- 🚀 [部署指南](./DEPLOYMENT.md)

---

**⚠️ 免责声明**: 本平台提供的测评结果仅供参考，不能替代专业的心理健康诊断。如有需要，请咨询专业的心理健康从业者。




