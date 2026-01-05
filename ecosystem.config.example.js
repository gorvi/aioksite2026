// PM2 生态系统配置文件
// 复制此文件为 ecosystem.config.js 并填入实际的数据库配置

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
        DB_USER: 'your_database_user',      // 替换为实际的数据库用户名
        DB_NAME: 'your_database_name',      // 替换为实际的数据库名
        DB_PASSWORD: 'your_database_password' // 替换为实际的数据库密码
      }
    }
  ]
};

