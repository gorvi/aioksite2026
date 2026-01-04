/**
 * MCP MySQL 数据库操作封装
 * 使用 MCP MySQL 工具进行数据库操作
 */

// MCP MySQL 查询结果类型
interface MCPMySQLResult {
  result?: unknown[];
  affectedRows?: number;
  error?: string;
}

/**
 * 执行 SQL 查询
 * 注意：在服务器端组件或 API 路由中使用
 * 客户端组件需要通过 API 路由调用
 */
export async function query(sql: string): Promise<MCPMySQLResult> {
  // 注意：MCP MySQL 工具只能在服务器端使用
  // 在客户端需要通过 API 路由调用
  // 这里提供一个占位实现，实际使用时需要在 API 路由中调用 MCP 工具
  throw new Error('query 方法需要在 API 路由中使用 MCP MySQL 工具');
}

/**
 * 执行 SQL 查询并返回单条记录
 */
export async function queryOne<T>(sql: string): Promise<T | null> {
  const result = await query(sql);
  if (result.result && Array.isArray(result.result) && result.result.length > 0) {
    return result.result[0] as T;
  }
  return null;
}

/**
 * 执行 SQL 查询并返回多条记录
 */
export async function queryMany<T>(sql: string): Promise<T[]> {
  const result = await query(sql);
  if (result.result && Array.isArray(result.result)) {
    return result.result as T[];
  }
  return [];
}

/**
 * 执行插入操作
 */
export async function insert(sql: string): Promise<number> {
  const result = await query(sql);
  return result.affectedRows || 0;
}

/**
 * 执行更新操作
 */
export async function update(sql: string): Promise<number> {
  const result = await query(sql);
  return result.affectedRows || 0;
}

/**
 * 执行删除操作
 */
export async function del(sql: string): Promise<number> {
  const result = await query(sql);
  return result.affectedRows || 0;
}

/**
 * 开始事务（如果 MCP MySQL 支持）
 */
export async function beginTransaction(): Promise<void> {
  await query('START TRANSACTION');
}

/**
 * 提交事务
 */
export async function commit(): Promise<void> {
  await query('COMMIT');
}

/**
 * 回滚事务
 */
export async function rollback(): Promise<void> {
  await query('ROLLBACK');
}

