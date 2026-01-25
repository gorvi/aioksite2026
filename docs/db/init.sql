-- 数据库初始化脚本
-- 创建所有表结构

-- 1. 序列号管理表
CREATE TABLE IF NOT EXISTS `serial_numbers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  `serial_number` VARCHAR(64) NOT NULL UNIQUE COMMENT '序列号',
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '状态：0-未使用，1-已使用',
  `used_at` DATETIME NULL COMMENT '使用时间',
  `expires_at` DATETIME NULL COMMENT '过期时间（可选）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_serial_number` (`serial_number`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='序列号管理表';

-- 2. SCL-90 测试记录表
CREATE TABLE IF NOT EXISTS `scl90_tests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  `serial_number` VARCHAR(64) NOT NULL COMMENT '序列号',
  `total_score` DECIMAL(5,2) NOT NULL COMMENT '总均分（90题总分/90）',
  `overall_status` VARCHAR(20) NOT NULL COMMENT '总体状态：stable-稳定，pressure-有压力，obvious-较明显',
  `factor_scores` JSON NOT NULL COMMENT '9个因子得分（JSON格式）',
  `test_date` DATETIME NOT NULL COMMENT '测试日期',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` DATETIME NULL COMMENT '删除时间（软删除，用于限时保存）',
  INDEX `idx_serial_number` (`serial_number`),
  INDEX `idx_test_date` (`test_date`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='SCL-90测试记录表';

-- 3. ADHD 测试记录表
CREATE TABLE IF NOT EXISTS `adhd_tests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  `serial_number` VARCHAR(64) NULL COMMENT '序列号',
  `test_type` VARCHAR(20) NOT NULL DEFAULT 'simple' COMMENT '测试类型：simple-45题简化版，full-18+25题完整版',
  `total_score` INT UNSIGNED NULL COMMENT '总分（仅完整版使用）',
  `asrs_score` INT UNSIGNED NULL COMMENT 'ASRS总分（0-72，仅完整版使用）',
  `wurs_score` INT UNSIGNED NULL COMMENT 'WURS总分（0-100，仅完整版使用）',
  `tendency_level` VARCHAR(10) NOT NULL COMMENT '倾向等级：low-低，medium-中，high-高',
  `dimension_scores` JSON NOT NULL COMMENT '3个维度得分（JSON格式）',
  `dimension_labels` JSON NOT NULL COMMENT '3个维度标签（JSON格式）',
  `main_features` JSON NOT NULL COMMENT '主要表现特征（JSON格式，最多3条）',
  `suggestions` JSON NOT NULL COMMENT '建议内容（JSON格式，2-3条）',
  `test_date` DATETIME NOT NULL COMMENT '测试日期',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` DATETIME NULL COMMENT '删除时间（软删除，用于限时保存）',
  INDEX `idx_serial_number` (`serial_number`),
  INDEX `idx_test_date` (`test_date`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ADHD测试记录表';

-- 4. 城市性格测试记录表（采用JSON存储，参考ADHD测试模式）
CREATE TABLE IF NOT EXISTS `city_personality_tests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  `serial_number` VARCHAR(64) NULL COMMENT '序列号',
  `nickname` VARCHAR(50) DEFAULT NULL COMMENT '用户昵称',
  
  -- 核心结果字段
  `mbti_type` VARCHAR(4) NOT NULL COMMENT 'MBTI性格类型（如：ENFP）',
  `matched_city` VARCHAR(20) NOT NULL COMMENT '匹配城市名称',
  `match_percentage` TINYINT UNSIGNED NOT NULL COMMENT '匹配百分比（0-100）',
  
  -- JSON存储详细结果（参考adhd_tests表结构）
  `dimension_scores` JSON NOT NULL COMMENT '4个维度得分（JSON格式）',
  `personality_tags` JSON NOT NULL COMMENT '性格标签（JSON格式）',
  `test_results` JSON NOT NULL COMMENT '完整测试结果（JSON格式）',
  
  -- 系统字段
  `test_date` DATETIME NOT NULL COMMENT '测试日期',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` DATETIME NULL COMMENT '删除时间（软删除，用于限时保存）',
  
  -- 索引
  INDEX `idx_serial_number` (`serial_number`),
  INDEX `idx_mbti_type` (`mbti_type`),
  INDEX `idx_matched_city` (`matched_city`),
  INDEX `idx_test_date` (`test_date`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市性格测试记录表';

-- 插入测试数据（可选）
-- 插入一个测试序列号
INSERT INTO `serial_numbers` (`serial_number`, `status`) 
VALUES ('TEST-2026-001', 0)
ON DUPLICATE KEY UPDATE `serial_number` = `serial_number`;








