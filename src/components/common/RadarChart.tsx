'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
} from 'recharts';

interface RadarChartProps {
    data: Array<{
        subject: string;
        A: number;
        fullMark: number;
    }>;
    width?: number | string;
    height?: number;
    outerRadius?: string | number;
    color?: string;
}

export default function RadarChartComponent({
    data,
    width = '100%',
    height = 300,
    outerRadius = '70%',
    color = '#8884d8', // default purple-ish
}: RadarChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    
    // 确保数据中包含 fullMark，用于设定坐标轴范围
    const maxMark = data.length > 0 ? data[0].fullMark : 100;
    
    // 获取容器尺寸
    useEffect(() => {
        if (containerRef.current) {
            const updateDimensions = () => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    setDimensions({ width: rect.width, height: rect.height });
                }
            };
            
            updateDimensions();
            window.addEventListener('resize', updateDimensions);
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, []);
    
    // 计算标签位置
    const calculateLabelPositions = () => {
        if (!dimensions.width || !dimensions.height) return [];
        
        const cx = dimensions.width / 2;
        const cy = dimensions.height / 2;
        const RADIAN = Math.PI / 180;
        const dataLength = data.length;
        
        // 计算实际半径
        let radius = Math.min(cx, cy);
        if (typeof outerRadius === 'string' && outerRadius.includes('%')) {
            const percentage = parseInt(outerRadius) / 100;
            radius = radius * percentage;
        } else if (typeof outerRadius === 'number') {
            radius = outerRadius;
        }
        
        // 标签显示在外围，距离中心更远
        const labelRadius = radius + 35;
        
        return data.map((item, index) => {
            // 计算角度（从90度开始，逆时针）
            const angle = 90 - (360 / dataLength) * index;
            
            // 计算坐标
            const x = cx + labelRadius * Math.cos(angle * RADIAN);
            const y = cy - labelRadius * Math.sin(angle * RADIAN);
            
            // 根据角度决定文字对齐方式
            let textAlign: 'left' | 'center' | 'right' = 'center';
            if (angle > 85 && angle < 275) {
                textAlign = 'right';
            } else if (angle >= 275 || angle <= 85) {
                textAlign = 'left';
            }
            
            return {
                x,
                y,
                value: item.A,
                textAlign,
            };
        });
    };
    
    const labelPositions = calculateLabelPositions();

    return (
        <div 
            ref={containerRef}
            style={{ 
                width: typeof width === 'number' ? `${width}px` : width, 
                height: `${height}px`,
                position: 'relative'
            }} 
            className="mx-auto"
        >
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={outerRadius} 
                    data={data}
                >
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, maxMark]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="当前得分"
                        dataKey="A"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                        dot={{ fill: '#2563eb', r: 4 }}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
            
            {/* 叠加的分数标签 */}
            {labelPositions.map((pos, index) => (
                <div
                    key={`label-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        color: '#2563eb',
                        fontSize: '13px',
                        fontWeight: '700',
                        textAlign: pos.textAlign,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {pos.value.toFixed(2)}
                </div>
            ))}
        </div>
    );
}
