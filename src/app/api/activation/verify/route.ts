import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { calculateAdhdFullResult } from '@/lib/utils/adhd-full-calculator';
import { calculateScl90Result } from '@/lib/utils/scl90-calculator';

// 生成报告编号
const generateReportNumber = (): string => {
    const now = new Date();
    return now.toISOString().replace(/[-:T.]/g, '').slice(0, 17) +
        String(Math.floor(Math.random() * 100)).padStart(2, '0');
};

export async function POST(request: NextRequest) {
    try {
        const { code, testId, type } = await request.json();

        if (!code || !testId || !type) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数 (code, testId, type)' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // 1. 验证激活码
            const [codes] = await connection.query<RowDataPacket[]>(
                'SELECT id, status FROM serial_numbers WHERE serial_number = ? FOR UPDATE',
                [code]
            );

            if (codes.length === 0) {
                await connection.rollback();
                return NextResponse.json({ success: false, message: '激活码无效' }, { status: 400 });
            }

            if (codes[0].status === 1) {
                await connection.rollback();
                return NextResponse.json({ success: false, message: '激活码已被使用' }, { status: 400 });
            }

            const serialId = codes[0].id;

            // 2. 获取测试记录（直接从主表读取 JSON answers）
            const testTable = type === 'adhd' ? 'adhd_tests' : 'scl90_tests';
            const [tests] = await connection.query<RowDataPacket[]>(
                `SELECT id, answers, nickname FROM ${testTable} WHERE id = ?`,
                [testId]
            );

            if (tests.length === 0 || !tests[0].answers) {
                await connection.rollback();
                return NextResponse.json({ success: false, message: '未找到答题记录，请重新提交' }, { status: 400 });
            }

            const dbAnswers = tests[0].answers; // 自动解析 JSON
            const nickname = tests[0].nickname || 'Unknown';

            // 3. 计算结果
            let calculatedResult: any;
            let reportNumber = generateReportNumber();

            // 注意：dbAnswers 已经是 JSON 对象（submit 存的时候是 formattedAnswers 数组），直接传给 calculator
            // 前端传的格式已经是 calculator 需要的格式了
            if (type === 'adhd') {
                // @ts-ignore
                calculatedResult = calculateAdhdFullResult(dbAnswers, code);
            } else {
                // @ts-ignore
                calculatedResult = calculateScl90Result(dbAnswers, code);
            }

            // 4. 更新测试表状态和结果
            let updateSql = '';
            let updateParams: any[] = [];

            if (type === 'adhd') {
                updateSql = `UPDATE adhd_tests SET 
          status = 'completed',
          report_number = ?,
          serial_number = ?,
          test_date = NOW(),
          total_score = ?, 
          asrs_score = ?,
          wurs_score = ?,
          tendency_level = ?,
          dimension_scores = ?,
          dimension_labels = ?,
          main_features = ?,
          suggestions = ?
          WHERE id = ?`;

                updateParams = [
                    reportNumber,
                    code,
                    calculatedResult.total_score,
                    calculatedResult.asrs_score,
                    calculatedResult.wurs_score,
                    calculatedResult.tendency_level,
                    JSON.stringify(calculatedResult.dimension_scores),
                    JSON.stringify(calculatedResult.dimension_labels),
                    JSON.stringify(calculatedResult.main_features),
                    JSON.stringify(calculatedResult.suggestions),
                    testId
                ];
            } else {
                updateSql = `UPDATE scl90_tests SET 
          status = 'completed',
          report_number = ?,
          serial_number = ?,
          test_date = NOW(),
          raw_total_score = ?,
          total_score = ?,
          overall_status = ?,
          factor_scores = ?,
          factor_levels = ?,
          attention_items_count = ?,
          normal_items_count = ?,
          attention_items_average = ?
          WHERE id = ?`;

                updateParams = [
                    reportNumber,
                    code,
                    calculatedResult.raw_total_score,
                    calculatedResult.total_score,
                    calculatedResult.overall_status,
                    JSON.stringify(calculatedResult.factor_scores),
                    JSON.stringify(calculatedResult.factor_levels),
                    calculatedResult.attention_items_count,
                    calculatedResult.normal_items_count,
                    calculatedResult.attention_items_average,
                    testId
                ];
            }

            await connection.query(updateSql, updateParams);

            // 5. 更新激活码表
            await connection.query(
                'UPDATE serial_numbers SET status = 1, used_at = NOW(), used_by_test_type = ?, used_by_test_id = ?, used_by_nickname = ? WHERE id = ?',
                [type, testId, nickname, serialId]
            );

            await connection.commit();

            return NextResponse.json({
                success: true,
                data: {
                    ...calculatedResult,
                    report_number: reportNumber,
                    nickname
                }
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Verify and complete error:', error);
        return NextResponse.json(
            { success: false, message: '系统繁忙，请重试' },
            { status: 500 }
        );
    }
}
