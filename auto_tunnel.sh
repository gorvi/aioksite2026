#!/bin/bash

echo "🔄 自动建立SSH隧道"

# 尝试使用sshpass（如果有的话）
if command -v sshpass >/dev/null 2>&1; then
    echo "使用sshpass建立隧道..."
    sshpass -p "ASDasd..12345" ssh -o StrictHostKeyChecking=no -f -N -L 3307:127.0.0.1:3306 root@106.54.60.14
    if [ $? -eq 0 ]; then
        echo "✅ 隧道建立成功"
        exit 0
    fi
fi

# 尝试expect方式
echo "尝试expect方式..."
expect -c "
    spawn ssh -o StrictHostKeyChecking=no -f -N -L 3307:127.0.0.1:3306 root@106.54.60.14
    expect {
        \"password:\" {
            send \"ASDasd..12345\\r\"
            expect eof
        }
        \"(yes/no\" {
            send \"yes\\r\"
            expect \"password:\"
            send \"ASDasd..12345\\r\"
            expect eof
        }
        timeout {
            puts \"timeout\"
            exit 1
        }
    }
"

echo "检查隧道状态..."
sleep 2
if lsof -i :3307 >/dev/null 2>&1; then
    echo "✅ 隧道建立成功!"
    lsof -i :3307
else
    echo "❌ 隧道建立失败"
fi