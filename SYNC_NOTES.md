# 远程服务器文件同步说明

## ✅ 已同步到本地的文件

### 1. `ecosystem.config.example.js` ✅ 新增
- **说明**：PM2 配置文件模板
- **用途**：生产环境部署时使用
- **操作**：需要复制为 `ecosystem.config.js` 并填入真实数据库密码
- **状态**：已加入 Git 仓库（模板文件，不含密码）

### 2. `ecosystem.config.js` ✅ 已创建（包含真实密码）
- **说明**：PM2 配置文件（含真实密码）
- **状态**：已加入 `.gitignore`，不会提交到 Git
- **注意**：此文件已在服务器上运行，本地仅作备份

### 3. `DEPLOYMENT.md` ✅ 新增
- **说明**：部署文档，包含完整的部署流程和故障排查
- **状态**：已加入 Git 仓库

### 4. `.gitignore` ✅ 已更新
- **变更**：添加了 `ecosystem.config.js` 忽略规则
- **原因**：避免提交包含敏感密码的配置文件

## 📋 未修改的文件（已确认与服务器一致）

- ✅ `src/lib/mysql.ts` - 环境变量名称正确（使用 `DB_*`）
- ✅ `package.json` - 已包含 `start:prod` 脚本
- ✅ `next.config.js` - 无需修改
- ✅ `.env` - 已在 `.gitignore` 中，不提交
- ✅ `.env.local` - 已在 `.gitignore` 中，不提交

## ⚠️ 重要提醒

### 环境变量命名
代码中使用的环境变量名为：
```
DB_HOST      ← 不是 MYSQL_HOST
DB_PORT      ← 不是 MYSQL_PORT
DB_USER      ← 不是 MYSQL_USER
DB_NAME      ← 不是 MYSQL_DATABASE
DB_PASSWORD  ← 不是 MYSQL_PASSWORD
```

### 下次提交前检查
```bash
# 确认敏感文件已被忽略
git status

# 应该看到：
# - ecosystem.config.example.js (可以提交)
# - DEPLOYMENT.md (可以提交)
# - SYNC_NOTES.md (可以提交)
# - .gitignore (已修改，可以提交)

# 不应该看到：
# - ecosystem.config.js (被 .gitignore 忽略)
# - .env 或 .env.local (被 .gitignore 忽略)
```

## 🚀 下次部署流程

### 在本地开发
1. 确保 `.env.local` 文件存在并配置正确（使用 `DB_*` 环境变量）
2. 正常开发和测试
3. 提交代码到 Git

### 部署到服务器
1. SSH 登录服务器：
   ```bash
   ssh root@106.54.60.14
   cd /www/wwwroot/aioksite2026
   ```

2. 拉取最新代码：
   ```bash
   git pull
   ```

3. 确认 `ecosystem.config.js` 存在且配置正确（包含真实密码）

4. 安装新依赖（如有）：
   ```bash
   npm install
   ```

5. 重新构建：
   ```bash
   npm run build
   ```

6. 重启应用：
   ```bash
   pm2 restart ecosystem.config.js --update-env
   ```

7. 验证：
   ```bash
   pm2 logs aioksite2026 --lines 20
   curl http://127.0.0.1:3006
   ```

## 📝 服务器上的文件位置

```
/www/wwwroot/aioksite2026/
├── ecosystem.config.js    ← 包含真实密码，已在运行
├── .env                   ← 备用配置（当前未使用）
├── .env.local             ← 备用配置（当前未使用）
└── (其他代码文件)
```

## ✅ 完成清单

- [x] 同步 `ecosystem.config.js` 到本地
- [x] 创建 `ecosystem.config.example.js` 模板
- [x] 更新 `.gitignore` 忽略敏感文件
- [x] 创建 `DEPLOYMENT.md` 部署文档
- [x] 创建 `SYNC_NOTES.md` 同步说明
- [x] 确认本地代码与服务器一致

## 🔒 安全建议

1. **不要提交密码**：`ecosystem.config.js` 已加入 `.gitignore`
2. **使用环境变量**：生产环境密码通过 PM2 配置管理
3. **定期更换密码**：建议定期更新数据库密码
4. **分离配置**：开发、测试、生产环境使用不同的配置文件

---

**最后更新**：2026-01-06  
**当前状态**：✅ 所有文件已同步完成，可以安全提交

