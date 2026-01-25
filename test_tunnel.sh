#!/bin/bash

echo "🧪 测试SSH隧道状态"
echo "===================="

# 检查3307端口
if lsof -i :3307 >/dev/null 2>&1; then
    echo "✅ 隧道已建立 - 端口3307正在监听"
    echo ""
    echo "📊 端口详情:"
    lsof -i :3307 2>/dev/null
    echo ""
    
    # 测试数据库连接
    echo "🔍 测试数据库连接..."
    if command -v mysql >/dev/null 2>&1; then
        echo "尝试连接数据库..."
        timeout 5 mysql -h 127.0.0.1 -P 3307 -u many_ceshi --password=asdasd123 many_ceshi -e "SELECT 1 as test, NOW() as current_time;" 2>/dev/null && echo "✅ 数据库连接成功!" || echo "❌ 数据库连接失败"
    else
        echo "MySQL客户端未安装，跳过数据库测试"
    fi
    
    echo ""
    echo "🎯 现在可以测试MCP MySQL:"
    echo "  - 在Cursor中调用数据库工具"
    echo "  - 配置连接到 127.0.0.1:3307"
    
else
    echo "❌ 隧道未建立 - 端口3307未监听"
    echo ""
    echo "请运行: ./create_tunnel.sh"
    echo "或手动运行: ssh -L 3307:127.0.0.1:3306 root@106.54.60.14 -N"
fi