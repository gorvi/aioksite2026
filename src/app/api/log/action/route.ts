import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function POST(request: NextRequest) {
    try {
        const { actionType, testType, testId, nickname } = await request.json();

        if (!actionType || !testType) {
            return NextResponse.json(
                { success: false, message: 'Missing parameters' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        try {
            await connection.query(
                'INSERT INTO user_actions (action_type, test_type, test_id, nickname) VALUES (?, ?, ?, ?)',
                [actionType, testType, testId || null, nickname || null]
            );

            return NextResponse.json({ success: true });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Log action error:', error);
        // 即使失败也不要在前端报错，以免影响用户体验
        return NextResponse.json(
            { success: false, message: 'Log failed' },
            { status: 500 }
        );
    }
}
