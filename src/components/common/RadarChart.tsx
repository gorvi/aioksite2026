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
    Label,
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

// 自定义标签渲染函数
const renderCustomLabel = (props: any) => {
    const { x, y, value, index } = props;
    
    // 如果没有值，不显示标签
    if (value === undefined || value === null) {
        return null;
    }
    
    return (
        <text
            x={x}
            y={y}
            dy={-10}
            textAnchor="middle"
            fill="#2563eb"
            fontSize="12"
            fontWeight="700"
        >
            {value.toFixed(2)}
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
                        label={renderCustomLabel}
                        dot={{ fill: '#2563eb', r: 4 }}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
