#!/usr/bin/env python3
"""
生成激活码并创建SQL插入语句
用法：python3 scripts/generate-codes.py > scripts/insert-codes.sql
"""

import random
import string
from datetime import datetime

def generate_code(length=6):
    """生成指定长度的随机字母激活码（大写）"""
    return ''.join(random.choices(string.ascii_uppercase, k=length))

def generate_unique_codes(count=200, length=6):
    """生成指定数量的唯一激活码"""
    codes = set()
    max_attempts = count * 10  # 防止无限循环
    attempts = 0
    
    while len(codes) < count and attempts < max_attempts:
        code = generate_code(length)
        codes.add(code)
        attempts += 1
    
    if len(codes) < count:
        print(f"-- 警告：只生成了 {len(codes)} 个激活码（目标：{count}）")
    
    return sorted(list(codes))

def main():
    # 生成200个激活码
    codes = generate_unique_codes(200, 6)
    
    # 生成SQL
    print("-- 激活码批量插入脚本")
    print(f"-- 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"-- 激活码数量：{len(codes)}")
    print("-- 使用方法：mysql -h 127.0.0.1 -u many_ceshi -p many_ceshi < scripts/insert-codes.sql")
    print()
    print("-- 开始插入")
    print("INSERT INTO serial_numbers (serial_number, status) VALUES")
    
    # 生成插入语句
    for i, code in enumerate(codes):
        if i == len(codes) - 1:
            # 最后一个，不加逗号
            print(f"  ('{code}', 0);")
        else:
            print(f"  ('{code}', 0),")
    
    print()
    print("-- 显示最新插入的20个激活码")
    print("SELECT ")
    print("    serial_number as '激活码',")
    print("    CASE status ")
    print("        WHEN 0 THEN '未使用' ")
    print("        WHEN 1 THEN '已使用' ")
    print("    END as '状态',")
    print("    created_at as '创建时间'")
    print("FROM serial_numbers")
    print("ORDER BY created_at DESC")
    print("LIMIT 20;")
    print()
    print("-- 统计信息")
    print("SELECT ")
    print("    COUNT(*) as '总激活码数',")
    print("    SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as '未使用数',")
    print("    SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as '已使用数'")
    print("FROM serial_numbers;")

if __name__ == "__main__":
    main()

