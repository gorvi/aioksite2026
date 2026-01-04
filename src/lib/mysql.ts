import mysql from 'mysql2/promise';

// 创建数据库连接池
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

console.log('Initializing MySQL Pool with:', {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: dbConfig.database,
});

const pool = mysql.createPool({
    ...dbConfig,
    password: process.env.DB_PASSWORD,
});

export default pool;
