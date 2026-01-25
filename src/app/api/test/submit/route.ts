import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { calculateCityPersonality } from '@/lib/utils/city-personality-calculator';

export async function POST(request: NextRequest) {
    try {
        const { testId, type, answers, serialNumber } = await request.json();

        if (!testId || !type || !answers) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            if (type === 'city_personality') {
                // 城市性格测试特殊处理：计算结果并存储JSON
                const result = calculateCityPersonality(answers);
                
                // 更新主表（如果提供了激活码，也更新 serial_number）
                const updateFields = serialNumber 
                    ? `mbti_type = ?, matched_city = ?, match_percentage = ?,
                       dimension_scores = ?, personality_tags = ?, test_results = ?,
                       serial_number = ?, test_date = NOW(), updated_at = NOW()`
                    : `mbti_type = ?, matched_city = ?, match_percentage = ?,
                       dimension_scores = ?, personality_tags = ?, test_results = ?,
                       test_date = NOW(), updated_at = NOW()`;
                
                const updateParams = serialNumber
                    ? [
                        result.mbtiType, 
                        result.matchedCity, 
                        result.matchPercentage,
                        JSON.stringify(result.dimensionScores), 
                        JSON.stringify(result.personalityTags),
                        JSON.stringify(result),
                        serialNumber,
                        testId
                    ]
                    : [
                        result.mbtiType, 
                        result.matchedCity, 
                        result.matchPercentage,
                        JSON.stringify(result.dimensionScores), 
                        JSON.stringify(result.personalityTags),
                        JSON.stringify(result), 
                        testId
                    ];
                
                await connection.query(
                    `UPDATE city_personality_tests SET ${updateFields} WHERE id = ?`,
                    updateParams
                );

                // 如果提供了激活码，标记为已使用
                if (serialNumber) {
                    const [serialRows] = await connection.query<RowDataPacket[]>(
                        'SELECT id FROM serial_numbers WHERE serial_number = ? FOR UPDATE',
                        [serialNumber]
                    );
                    
                    if (serialRows.length > 0) {
                        await connection.query(
                            'UPDATE serial_numbers SET status = 1, used_at = NOW(), used_by_test_type = ?, used_by_test_id = ? WHERE id = ?',
                            [type, testId, serialRows[0].id]
                        );
                    }
                }

                await connection.commit();

                return NextResponse.json({ 
                    success: true, 
                    data: result 
                });
            } else {
                // SCL90 和 ADHD 测试的原有逻辑
                const table = type === 'adhd' ? 'adhd_tests' : 'scl90_tests';

                await connection.query(
                    `UPDATE ${table} SET 
                     status = 'submitted', 
                     answers = ?, 
                     updated_at = NOW() 
                     WHERE id = ?`,
                    [JSON.stringify(answers), testId]
                );

                await connection.commit();
                return NextResponse.json({ success: true });
            }
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Test submit error:', error);
        return NextResponse.json(
            { success: false, message: '提交失败' },
            { status: 500 }
        );
    }
}
