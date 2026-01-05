# 部署说明

## 远程服务器修改的文件

### 1. `ecosystem.config.js` ✅ 已同步
PM2 进程管理配置文件，包含环境变量配置。

**重要**：此文件包含数据库密码，请谨慎管理。建议：
- 提交时使用占位符
- 或将此文件加入 `.gitignore`
- 生产环境通过 PM2 secrets 或环境变量管理

### 2. 环境变量配置

代码中使用的环境变量名（`src/lib/mysql.ts`）：
- `DB_HOST` - 数据库主机地址
- `DB_PORT` - 数据库端口
- `DB_USER` - 数据库用户名
- `DB_NAME` - 数据库名称
- `DB_PASSWORD` - 数据库密码

⚠️ **注意**：不是 `MYSQL_*`，而是 `DB_*`！

#### 本地开发环境
创建 `.env.local` 文件（已在 `.gitignore` 中）：
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
```

#### 生产环境
使用 PM2 配置文件 `ecosystem.config.js` 中的 `env` 字段。

### 3. 部署命令

生产环境启动：
```bash
pm2 start ecosystem.config.js
pm2 save
```

重启应用：
```bash
pm2 restart ecosystem.config.js --update-env
```

查看日志：
```bash
pm2 logs aioksite2026
```

## 检查清单

提交代码前确认：
- [ ] `src/lib/mysql.ts` 使用 `DB_*` 环境变量 ✅
- [ ] `.gitignore` 包含 `.env` 和 `.env*.local` ✅
- [ ] `ecosystem.config.js` 已创建 ✅
- [ ] 敏感信息已移除或使用占位符

## 下次部署

1. 本地开发完成后提交代码
2. 服务器上拉取最新代码：
   ```bash
   cd /www/wwwroot/aioksite2026
   git pull
   ```
3. 安装依赖（如有新增）：
   ```bash
   npm install
   ```
4. 重新构建：
   ```bash
   npm run build
   ```
5. 重启应用：
   ```bash
   pm2 restart ecosystem.config.js --update-env
   ```

## 宝塔面板说明

### 为什么宝塔显示"未启动"？
应用通过 **PM2** 管理，不是通过宝塔的 Node 项目管理。两者是独立的系统：
- ✅ **PM2**：正在使用，应用运行正常
- ❌ **宝塔 Node 管理**：未使用，显示"未启动"是正常的

### 注意事项
- ⚠️ **不要在宝塔中启动项目**，会和 PM2 冲突
- 如果需要管理应用，使用 PM2 命令：`pm2 list`, `pm2 restart`, `pm2 logs`
- 可以保留宝塔配置不启动，或者删除宝塔的 Node 项目配置

## 故障排查

### 数据库连接失败
检查环境变量是否正确加载：
```bash
pm2 logs aioksite2026 --lines 50 | grep "Initializing"
```

应该看到：
```
Initializing MySQL Pool with: { host: '127.0.0.1', port: 3306, user: 'many_ceshi', database: 'many_ceshi' }
```

如果显示 `undefined`，说明环境变量未加载，需要重启并更新环境变量：
```bash
pm2 restart ecosystem.config.js --update-env
```

### 端口占用
应用应该运行在 3006 端口（`package.json` 中的 `start:prod` 脚本）。

检查端口：
```bash
lsof -i :3006
```

### PM2 进程崩溃
查看错误日志：
```bash
pm2 logs aioksite2026 --err --lines 50
```

