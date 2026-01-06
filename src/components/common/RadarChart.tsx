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

// 自定义标签渲染函数 - 在外围显示分数
const renderCustomLabel = (props: any) => {
    const { cx, cy, value, index, payload } = props;
    
    // 如果没有值，不显示标签
    if (value === undefined || value === null) {
        return null;
    }
    
    // 计算数据点数量
    const dataLength = props.dataLength || 10;
    
    // 计算角度（从90度开始，逆时针）
    const RADIAN = Math.PI / 180;
    const angle = 90 - (360 / dataLength) * index;
    
    // 半径 - 使用较大的值让分数显示在外围
    const radius = 120; // 固定半径，确保在外围
    
    // 计算坐标
    const x = cx + radius * Math.cos(angle * RADIAN);
    const y = cy - radius * Math.sin(angle * RADIAN);
    
    // 根据角度决定文字对齐方式
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    if (angle > 90 && angle < 270) {
        textAnchor = 'end';
    } else if (angle >= 270 || angle <= 90) {
        textAnchor = 'start';
    }
    
    return (
        <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            fill="#2563eb"
            fontSize="13"
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

    // 创建包装函数，传递数据长度
    const labelRenderer = (props: any) => {
        return renderCustomLabel({ ...props, dataLength: data.length });
    };

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
                        label={labelRenderer}
                        dot={{ fill: '#2563eb', r: 4 }}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
