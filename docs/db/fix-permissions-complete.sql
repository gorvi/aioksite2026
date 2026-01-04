-- MySQL 权限修复脚本（完整版 - 解决 phpMyAdmin 访问问题）
-- 用于修复 many_ceshi 用户的权限问题
-- 兼容 MySQL 5.7 和 8.0+

-- ============================================
-- 方案 1: 完整权限修复（推荐用于开发环境）
-- ============================================

-- 创建用户（如果不存在）- localhost
CREATE USER IF NOT EXISTS 'many_ceshi'@'localhost' IDENTIFIED BY 'asdasd123';

-- 创建用户（如果不存在）- 远程访问
CREATE USER IF NOT EXISTS 'many_ceshi'@'%' IDENTIFIED BY 'asdasd123';

-- 授予对 many_ceshi 数据库的所有权限
GRANT ALL PRIVILEGES ON `many_ceshi`.* TO 'many_ceshi'@'localhost';
GRANT ALL PRIVILEGES ON `many_ceshi`.* TO 'many_ceshi'@'%';

-- phpMyAdmin 需要访问系统表来检查用户类型和显示信息
-- 授予对 mysql 系统数据库的必要只读权限
GRANT SELECT ON `mysql`.`user` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`user` TO 'many_ceshi'@'%';
GRANT SELECT ON `mysql`.`db` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`db` TO 'many_ceshi'@'%';
GRANT SELECT ON `mysql`.`tables_priv` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`tables_priv` TO 'many_ceshi'@'%';
GRANT SELECT ON `mysql`.`columns_priv` TO 'many_ceshi'@'localhost';
GRANT SELECT ON `mysql`.`columns_priv` TO 'many_ceshi'@'%';

-- phpMyAdmin 需要 REPLICATION CLIENT 权限来显示服务器状态
-- 授予 REPLICATION CLIENT 权限（用于查看服务器状态，相对安全）
GRANT REPLICATION CLIENT ON *.* TO 'many_ceshi'@'localhost';
GRANT REPLICATION CLIENT ON *.* TO 'many_ceshi'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- ============================================
-- 验证权限
-- ============================================
SHOW GRANTS FOR 'many_ceshi'@'localhost';
SHOW GRANTS FOR 'many_ceshi'@'%';

-- ============================================
-- 方案 2: 如果方案 1 还不够，使用管理员用户
-- ============================================
-- 创建一个专门用于 phpMyAdmin 的管理员用户
-- CREATE USER IF NOT EXISTS 'admin_ceshi'@'localhost' IDENTIFIED BY 'your_secure_password';
-- GRANT ALL PRIVILEGES ON *.* TO 'admin_ceshi'@'localhost' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;
-- 然后在 phpMyAdmin 中使用 admin_ceshi 用户登录

