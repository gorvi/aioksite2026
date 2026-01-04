import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
    try {
        const { testId, type, answers } = await request.json();

        if (!testId || !type || !answers) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        try {
            const table = type === 'adhd' ? 'adhd_tests' : 'scl90_tests';

            // 直接更新主表的 answers 字段，不再维护关联表
            await connection.query(
                `UPDATE ${table} SET 
         status = 'submitted', 
         answers = ?, 
         updated_at = NOW() 
         WHERE id = ?`,
                [JSON.stringify(answers), testId]
            );

            return NextResponse.json({ success: true });
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
