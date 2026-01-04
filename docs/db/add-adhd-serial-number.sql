-- 为 ADHD 测试表添加序列号字段（如果表已存在）
-- 如果表不存在，请直接使用 init.sql 创建

ALTER TABLE `adhd_tests` 
ADD COLUMN `serial_number` VARCHAR(64) NULL COMMENT '序列号' AFTER `id`,
ADD INDEX `idx_serial_number` (`serial_number`);




