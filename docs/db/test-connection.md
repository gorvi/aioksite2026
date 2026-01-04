# 数据库连接测试指南

## 一、测试前准备

### 1. 确认 MCP MySQL 配置
确保 MCP MySQL 服务器已正确配置并可用。

### 2. 准备测试脚本
创建测试脚本来验证数据库连接和表结构。

---

## 二、测试步骤

### 步骤 1: 测试数据库连接

使用 MCP MySQL 工具测试基本连接：

```typescript
// 测试连接示例（需要根据实际 MCP 接口调整）
// 这是一个概念示例，实际实现需要根据 MCP MySQL 的具体 API

async function testConnection() {
  try {
    // 执行简单查询测试连接
    const result = await mcpMySQL.query('SELECT 1 as test');
    console.log('✅ 数据库连接成功:', result);
    return true;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    return false;
  }
}
```

### 步骤 2: 检查数据库是否存在

```sql
-- 检查当前数据库
SHOW DATABASES;

-- 选择或创建数据库
CREATE DATABASE IF NOT EXISTS `ceshi_test` 
  DEFAULT CHARSET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `ceshi_test`;
```

### 步骤 3: 执行初始化脚本

执行 `docs/db/init.sql` 创建所有表：

```bash
# 方式1: 通过 MCP MySQL 执行 SQL 文件
# 需要根据 MCP 接口实现

# 方式2: 手动执行 SQL 语句
# 复制 init.sql 内容到 MySQL 客户端执行
```

### 步骤 4: 验证表结构

```sql
-- 检查所有表是否创建成功
SHOW TABLES;

-- 应该看到以下表：
-- serial_numbers
-- scl90_tests
-- scl90_answers
-- adhd_tests
-- adhd_answers

-- 检查表结构
DESCRIBE `serial_numbers`;
DESCRIBE `scl90_tests`;
DESCRIBE `scl90_answers`;
DESCRIBE `adhd_tests`;
DESCRIBE `adhd_answers`;
```

### 步骤 5: 测试基本 CRUD 操作

#### 5.1 测试插入数据

```sql
-- 插入测试序列号
INSERT INTO `serial_numbers` (`serial_number`, `status`) 
VALUES ('TEST-2026-001', 0);

-- 插入 SCL-90 测试记录（示例）
INSERT INTO `scl90_tests` (
  `serial_number`, 
  `total_score`, 
  `overall_status`, 
  `factor_scores`, 
  `test_date`
) VALUES (
  'TEST-2026-001',
  2.5,
  'pressure',
  '{"somatization": 2.5, "obsessive_compulsive": 2.3, "interpersonal_sensitivity": 2.1, "depression": 2.4, "anxiety": 2.2, "hostility": 2.0, "phobic_anxiety": 1.8, "paranoid_ideation": 2.1, "psychoticism": 1.9}',
  NOW()
);
```

#### 5.2 测试查询数据

```sql
-- 查询序列号
SELECT * FROM `serial_numbers` WHERE `serial_number` = 'TEST-2026-001';

-- 查询测试记录
SELECT * FROM `scl90_tests` WHERE `serial_number` = 'TEST-2026-001';

-- 查询 JSON 字段
SELECT 
  `id`,
  `total_score`,
  `overall_status`,
  JSON_EXTRACT(`factor_scores`, '$.somatization') as somatization_score
FROM `scl90_tests`
WHERE `serial_number` = 'TEST-2026-001';
```

#### 5.3 测试更新数据

```sql
-- 更新序列号状态
UPDATE `serial_numbers` 
SET `status` = 1, `used_at` = NOW() 
WHERE `serial_number` = 'TEST-2026-001';
```

#### 5.4 测试删除数据（软删除）

```sql
-- 软删除测试记录
UPDATE `scl90_tests` 
SET `deleted_at` = NOW() 
WHERE `id` = 1;
```

---

## 三、使用 MCP MySQL 进行测试

### 方式 1: 通过 MCP 工具直接执行 SQL

如果 MCP MySQL 提供了直接执行 SQL 的接口，可以：

1. 执行 `init.sql` 创建表
2. 执行测试 SQL 验证功能

### 方式 2: 创建测试脚本

创建 TypeScript 测试脚本（需要根据实际 MCP 接口调整）：

```typescript
// scripts/test-db.ts
// 这是一个概念示例，需要根据实际 MCP MySQL API 调整

import { mcpMySQL } from '../src/lib/db/mcp-mysql';

async function testDatabase() {
  console.log('开始测试数据库连接...\n');

  // 1. 测试连接
  try {
    const result = await mcpMySQL.query('SELECT 1 as test');
    console.log('✅ 数据库连接成功');
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
    return;
  }

  // 2. 检查表是否存在
  try {
    const tables = await mcpMySQL.query('SHOW TABLES');
    console.log('✅ 表检查成功，当前表数量:', tables.length);
  } catch (error) {
    console.error('❌ 表检查失败:', error);
    return;
  }

  // 3. 测试插入
  try {
    await mcpMySQL.query(`
      INSERT INTO serial_numbers (serial_number, status) 
      VALUES ('TEST-2026-001', 0)
    `);
    console.log('✅ 插入测试成功');
  } catch (error) {
    console.error('❌ 插入测试失败:', error);
  }

  // 4. 测试查询
  try {
    const result = await mcpMySQL.query(`
      SELECT * FROM serial_numbers 
      WHERE serial_number = 'TEST-2026-001'
    `);
    console.log('✅ 查询测试成功，结果:', result);
  } catch (error) {
    console.error('❌ 查询测试失败:', error);
  }

  // 5. 测试更新
  try {
    await mcpMySQL.query(`
      UPDATE serial_numbers 
      SET status = 1, used_at = NOW() 
      WHERE serial_number = 'TEST-2026-001'
    `);
    console.log('✅ 更新测试成功');
  } catch (error) {
    console.error('❌ 更新测试失败:', error);
  }

  // 6. 清理测试数据
  try {
    await mcpMySQL.query(`
      DELETE FROM serial_numbers 
      WHERE serial_number = 'TEST-2026-001'
    `);
    console.log('✅ 清理测试数据成功');
  } catch (error) {
    console.error('❌ 清理测试数据失败:', error);
  }

  console.log('\n数据库测试完成！');
}

testDatabase();
```

---

## 四、常见问题排查

### 问题 1: 连接失败
- 检查 MCP MySQL 服务器是否运行
- 检查连接配置是否正确
- 检查网络连接

### 问题 2: 表创建失败
- 检查数据库权限
- 检查 SQL 语法是否正确
- 检查表是否已存在（使用 `CREATE TABLE IF NOT EXISTS`）

### 问题 3: JSON 字段问题
- 确保 MySQL 版本 >= 5.7
- 检查 JSON 格式是否正确
- 使用 `JSON_VALID()` 验证 JSON 数据

### 问题 4: 外键约束问题
- 确保先创建主表（tests），再创建从表（answers）
- 检查外键引用的表是否存在
- 检查数据类型是否匹配

---

## 五、测试检查清单

- [ ] 数据库连接成功
- [ ] 所有表创建成功
- [ ] 表结构正确（字段、类型、索引）
- [ ] 插入数据成功
- [ ] 查询数据成功
- [ ] 更新数据成功
- [ ] 软删除功能正常
- [ ] JSON 字段读写正常
- [ ] 外键约束正常
- [ ] 索引生效（查询性能）

---

## 六、下一步

测试通过后，可以：
1. 创建数据库操作工具函数（`src/lib/db/`）
2. 实现序列号验证逻辑
3. 实现测试记录保存逻辑
4. 实现结果计算逻辑

---

最后更新时间：2026-01-01











