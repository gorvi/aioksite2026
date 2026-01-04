import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
    try {
        const { nickname, type } = await request.json(); // type: 'adhd' | 'scl90'

        if (!nickname || !type) {
            return NextResponse.json(
                { success: false, message: '缺少必要参数' },
                { status: 400 }
            );
        }

        const table = type === 'adhd' ? 'adhd_tests' : 'scl90_tests';
        const connection = await pool.getConnection();

        try {
            const [result] = await connection.query<ResultSetHeader>(
                `INSERT INTO ${table} (nickname, status, created_at) VALUES (?, 'started', NOW())`,
                [nickname]
            );

            return NextResponse.json({
                success: true,
                data: {
                    testId: result.insertId,
                    type
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Test init error:', error);
        return NextResponse.json(
            { success: false, message: '初始化失败' },
            { status: 500 }
        );
    }
}
