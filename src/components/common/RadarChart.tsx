'use client';

import React from 'react';
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

// 自定义标签组件，显示分数
const CustomLabel = (props: any) => {
    const { cx, cy, textAnchor, value, index, payload } = props;
    
    // 计算标签位置（在数据点外侧）
    const RADIAN = Math.PI / 180;
    const angle = props.angle || 0;
    const radius = props.outerRadius || 0;
    
    // 调整半径，让标签稍微远离数据点
    const labelRadius = radius + 15;
    const x = cx + labelRadius * Math.cos(-angle * RADIAN);
    const y = cy + labelRadius * Math.sin(-angle * RADIAN);
    
    return (
        <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            fill="#2563eb"
            fontSize="12"
            fontWeight="bold"
        >
            {value?.toFixed(2)}
        </text>
    );
};

export default function RadarChartComponent({
    data,
    width = '100%',
    height = 300,
    outerRadius = '70%',
    color = '#8884d8', // default purple-ish
}: RadarChartProps) {
    // 确保数据中包含 fullMark，用于设定坐标轴范围
    const maxMark = data.length > 0 ? data[0].fullMark : 100;

    return (
        <div style={{ width: typeof width === 'number' ? `${width}px` : width, height: `${height}px` }} className="mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={data}>
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
                        stroke="#2563eb" // primary blue
                        strokeWidth={2}
                        fill="#3b82f6" // blue-500
                        fillOpacity={0.4}
                        label={<CustomLabel />}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
