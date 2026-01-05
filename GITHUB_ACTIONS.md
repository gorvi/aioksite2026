# GitHub Actions 配置说明

## ✅ 已更新的内容

### 主要变更

1. **PM2 启动方式**
   - ❌ 旧方式：`pm2 start node_modules/next/dist/bin/next`
   - ✅ 新方式：`pm2 restart ecosystem.config.js --update-env`

2. **环境变量管理**
   - 通过 `ecosystem.config.js` 管理所有环境变量
   - 包含数据库配置（`DB_HOST`, `DB_USER`, `DB_NAME`, `DB_PASSWORD`）

3. **自动检查**
   - 部署时自动检查 `ecosystem.config.js` 是否存在
   - 如不存在会从 `ecosystem.config.example.js` 创建并终止部署

## ⚠️ 重要：首次部署前的准备

### 步骤 1：配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets（Settings → Secrets and variables → Actions）：

```
SERVER_IP=106.54.60.14
SERVER_USER=root
SERVER_PASSWORD=ASDasd..12345
```

### 步骤 2：确保服务器上有 ecosystem.config.js

**此文件不在 Git 中**（已在 `.gitignore`），需要手动在服务器上配置。

检查是否存在：
```bash
ssh root@106.54.60.14
cd /www/wwwroot/aioksite2026
ls -la ecosystem.config.js
```

如果不存在：
```bash
# 从示例创建
cp ecosystem.config.example.js ecosystem.config.js

# 编辑配置（填入真实数据库密码）
vi ecosystem.config.js
```

内容应该类似：
```javascript
module.exports = {
  apps: [
    {
      name: 'aioksite2026',
      script: 'npm',
      args: 'run start:prod',
      env: {
        NODE_ENV: 'production',
        DB_HOST: '127.0.0.1',
        DB_PORT: '3306',
        DB_USER: 'many_ceshi',
        DB_NAME: 'many_ceshi',
        DB_PASSWORD: 'asdasd123'  // 真实密码
      }
    }
  ]
};
```

## 🚀 部署流程

### 自动部署

推送代码到 `main` 分支时自动触发：
```bash
git add .
git commit -m "your commit message"
git push origin main
```

### 手动触发

在 GitHub 仓库页面：
1. 进入 "Actions" 标签
2. 选择 "Deploy to Tencent Cloud"
3. 点击 "Run workflow"

## 📋 部署步骤详解

GitHub Actions 会自动执行以下步骤：

1. **拉取代码**
   ```bash
   git fetch --all
   git reset --hard origin/main
   ```

2. **安装依赖**
   ```bash
   npm install --production=false
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **重启应用**
   ```bash
   pm2 restart ecosystem.config.js --update-env
   pm2 save
   ```

5. **清理 Nginx 缓存**
   ```bash
   rm -rf /www/server/nginx/proxy_cache_dir/*
   /etc/init.d/nginx restart
   ```

## ⚙️ 环境变量说明

### 代码中使用的环境变量

```javascript
// src/lib/mysql.ts
process.env.DB_HOST      // 数据库主机
process.env.DB_PORT      // 数据库端口
process.env.DB_USER      // 数据库用户名
process.env.DB_NAME      // 数据库名称
process.env.DB_PASSWORD  // 数据库密码
```

### 配置位置

- **生产环境**：`ecosystem.config.js`（服务器上）
- **开发环境**：`.env.local`（本地，不提交）
- **示例文件**：`ecosystem.config.example.js`（Git 中）

## 🔍 故障排查

### 部署失败：找不到 ecosystem.config.js

**错误信息**：
```
⚠️  ecosystem.config.js not found, creating from example...
❌ Please configure database credentials in ecosystem.config.js
```

**解决方法**：
1. SSH 登录服务器
2. 复制示例文件：`cp ecosystem.config.example.js ecosystem.config.js`
3. 编辑配置文件，填入真实数据库密码
4. 重新触发部署

### PM2 重启失败

**检查 PM2 状态**：
```bash
ssh root@106.54.60.14
pm2 list
pm2 logs aioksite2026 --lines 50
```

**常见问题**：
- 端口 3006 被占用：`lsof -i :3006` 查看占用进程
- 环境变量未加载：检查 `ecosystem.config.js` 配置
- 构建失败：查看 Actions 日志中的 build 步骤

### 数据库连接失败

**检查日志**：
```bash
pm2 logs aioksite2026 | grep -i "mysql\|database\|error"
```

**应该看到**：
```
Initializing MySQL Pool with: { host: '127.0.0.1', port: 3306, user: 'many_ceshi', database: 'many_ceshi' }
```

**如果显示 undefined**：
- 环境变量未正确加载
- 重启并更新环境变量：`pm2 restart ecosystem.config.js --update-env`

## 📝 与 PM2 的配合

### PM2 命令

```bash
# 查看状态
pm2 list

# 查看日志
pm2 logs aioksite2026

# 手动重启
pm2 restart aioksite2026

# 重启并更新环境变量
pm2 restart ecosystem.config.js --update-env

# 停止应用
pm2 stop aioksite2026

# 删除应用
pm2 delete aioksite2026
```

### 查看部署日志

在 GitHub 仓库的 Actions 标签中查看详细的部署日志。

## 🔐 安全建议

1. **不要提交密码**
   - `ecosystem.config.js` 已在 `.gitignore` 中
   - 只提交 `ecosystem.config.example.js` 示例文件

2. **GitHub Secrets**
   - 使用 GitHub Secrets 存储服务器密码
   - 不要在代码中硬编码

3. **定期更新**
   - 定期更新服务器密码和数据库密码
   - 更新后同步到服务器的 `ecosystem.config.js`

## ✅ 检查清单

部署前确认：
- [ ] GitHub Secrets 已配置（SERVER_IP, SERVER_USER, SERVER_PASSWORD）
- [ ] 服务器上存在 `ecosystem.config.js` 且配置正确
- [ ] PM2 正在运行（`pm2 list` 显示 online）
- [ ] 数据库连接正常
- [ ] Nginx 反向代理配置正确

---

**最后更新**：2026-01-06  
**当前版本**：使用 PM2 + ecosystem.config.js 部署方式

