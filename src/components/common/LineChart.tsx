'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export interface LineChartDataPoint {
  name: string;
  score: number;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  yAxisLabel?: string;
  yAxisDomain?: [number, number];
  height?: number;
  showThreshold?: boolean;
  thresholdValue?: number;
  thresholdLabel?: string;
}

/**
 * 公共折线图组件
 * 统一的样式和布局，适用于各种测试结果展示
 */
export default function LineChartComponent({
  data,
  yAxisLabel = '得分',
  yAxisDomain = [0, 5],
  height = 320,
  showThreshold = true,
  thresholdValue = 2.0,
  thresholdLabel = '得分 ≥ 2.0 通常提示需关注',
}: LineChartProps) {
  return (
    <div className="mt-4 px-2 -mx-2">
      <div className={`h-${height} w-full`} style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 40, right: 10, left: 10, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              style={{ fontSize: '11px' }}
              angle={-45}
              textAnchor="end"
              height={50}
              interval={0}
              tickMargin={5}
            />
            <YAxis 
              domain={yAxisDomain}
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              width={40}
              label={{ value: yAxisLabel, angle: 0, position: 'top', style: { fontSize: '12px', textAnchor: 'middle' }, offset: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number | string | undefined) => {
                if (value === undefined) return ['', ''];
                const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                if (isNaN(numValue)) return ['', ''];
                return [`${numValue.toFixed(2)}`, '得分'];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#13b6ec" 
              strokeWidth={3}
              dot={{ fill: '#13b6ec', r: 5 }}
              activeDot={{ r: 7 }}
            >
              <LabelList
                dataKey="score"
                position="top"
                content={(props: any) => {
                  const { x, y, value } = props;
                  if (x === undefined || y === undefined || value === undefined) return null;
                  const numX = typeof x === 'number' ? x : parseFloat(x as string);
                  const numY = typeof y === 'number' ? y : parseFloat(y as string);
                  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                  if (isNaN(numX) || isNaN(numY) || isNaN(numValue)) return null;
                  return (
                    <g transform={`translate(${numX},${numY - 10})`}>
                      <text
                        x={0}
                        y={0}
                        dy={-5}
                        fill="#64748b"
                        fontSize={11}
                        textAnchor="middle"
                        transform={`rotate(-45, 0, 0)`}
                        style={{ fontWeight: 500 }}
                      >
                        {numValue.toFixed(2)}
                      </text>
                    </g>
                  );
                }}
              />
            </Line>
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

