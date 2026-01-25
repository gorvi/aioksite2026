-- 删除未使用的answers表
-- 这些表的数据都存储在tests表的JSON字段中，没有被查询使用

-- 删除城市性格测试答题记录表
DROP TABLE IF EXISTS `city_personality_answers`;

-- 删除ADHD答题记录表
DROP TABLE IF EXISTS `adhd_answers`;

-- 删除SCL-90答题记录表
DROP TABLE IF EXISTS `scl90_answers`;

-- 验证删除结果
SHOW TABLES LIKE '%_answers';
