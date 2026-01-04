-- 为 SCL-90 测试记录表添加统计字段
-- 注意：使用"需关注项目"而非"阳性项目"，符合合规要求

ALTER TABLE `scl90_tests` 
ADD COLUMN IF NOT EXISTS `raw_total_score` INT UNSIGNED NULL COMMENT '原始总分（90题总分）' AFTER `serial_number`,
ADD COLUMN IF NOT EXISTS `attention_items_count` TINYINT UNSIGNED NULL COMMENT '需关注项目数（得分≥2的项目）' AFTER `factor_scores`,
ADD COLUMN IF NOT EXISTS `normal_items_count` TINYINT UNSIGNED NULL COMMENT '正常项目数（得分<2的项目）' AFTER `attention_items_count`,
ADD COLUMN IF NOT EXISTS `attention_items_average` DECIMAL(5,2) NULL COMMENT '需关注项目平均分' AFTER `normal_items_count`;



