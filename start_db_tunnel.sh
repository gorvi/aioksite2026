#!/bin/bash
echo "🔌 Starting SSH Tunnel to Database..."
echo "Target: root@106.54.60.14"
echo "Mapping: Local 3306 -> Remote 127.0.0.1:3306"
echo "---------------------------------------------"
echo "Please enter the server password if prompted."
echo ""
ssh -N -L 3306:127.0.0.1:3306 root@106.54.60.14
