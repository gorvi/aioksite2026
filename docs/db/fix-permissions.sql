-- MySQL 权限修复脚本
-- 用于修复 many_ceshi 用户的权限问题
-- 兼容 MySQL 5.7 和 8.0+

-- 方案 1: 提升 many_ceshi 用户权限（推荐用于开发环境）
-- MySQL 8.0+ 语法：先创建用户（如果不存在），然后授予权限

-- 创建用户（如果不存在）- localhost
CREATE USER IF NOT EXISTS 'many_ceshi'@'localhost' IDENTIFIED BY 'asdasd123';

-- 创建用户（如果不存在）- 远程访问
CREATE USER IF NOT EXISTS 'many_ceshi'@'%' IDENTIFIED BY 'asdasd123';

-- 授予权限 - localhost
GRANT ALL PRIVILEGES ON `many_ceshi`.* TO 'many_ceshi'@'localhost';

-- 授予权限 - 远程访问
GRANT ALL PRIVILEGES ON `many_ceshi`.* TO 'many_ceshi'@'%';

-- phpMyAdmin 需要访问系统表来检查用户类型
-- 授予对 mysql.user 表的 SELECT 权限（phpMyAdmin 必需）
GRANT SELECT ON `mysql`.`user` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`user` TO 'many_ceshi'@'%';
GRANT SELECT ON `mysql`.`db` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`db` TO 'many_ceshi'@'%';

-- phpMyAdmin 需要 REPLICATION CLIENT 权限来显示服务器状态
-- 授予 REPLICATION CLIENT 权限（用于查看服务器状态，相对安全）
GRANT REPLICATION CLIENT ON *.* TO 'many_ceshi'@'localhost';
GRANT REPLICATION CLIENT ON *.* TO 'many_ceshi'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 方案 2: 如果需要 phpMyAdmin 完全访问（仅开发环境）
-- 注意：这会授予更多权限，生产环境请谨慎使用
-- 如果方案 1 的 ALL PRIVILEGES 不够，可以使用以下更详细的权限列表：
-- 
-- CREATE USER IF NOT EXISTS 'many_ceshi'@'localhost' IDENTIFIED BY 'asdasd123';
-- CREATE USER IF NOT EXISTS 'many_ceshi'@'%' IDENTIFIED BY 'asdasd123';
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, 
--       CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, CREATE VIEW, 
--       SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER 
--       ON `many_ceshi`.* TO 'many_ceshi'@'localhost';
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, 
--       CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, CREATE VIEW, 
--       SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER 
--       ON `many_ceshi`.* TO 'many_ceshi'@'%';
-- FLUSH PRIVILEGES;

-- 方案 3: 创建新的管理员用户（用于 phpMyAdmin 管理）
-- 创建一个专门用于 phpMyAdmin 的管理员用户
-- CREATE USER IF NOT EXISTS 'admin_ceshi'@'localhost' IDENTIFIED BY 'your_secure_password';
-- GRANT ALL PRIVILEGES ON *.* TO 'admin_ceshi'@'localhost' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

-- 验证权限
-- 查看用户权限
SHOW GRANTS FOR 'many_ceshi'@'localhost';
SHOW GRANTS FOR 'many_ceshi'@'%';

