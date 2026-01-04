import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { success: false, message: '请输入激活码' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // 1. 查询激活码是否有效且未使用
            // 注意：使用 FOR UPDATE 锁定行，防止并发问题
            const [rows] = await connection.query<RowDataPacket[]>(
                'SELECT id, status FROM serial_numbers WHERE serial_number = ? FOR UPDATE',
                [code]
            );

            if (rows.length === 0) {
                await connection.rollback();
                return NextResponse.json(
                    { success: false, message: '激活码无效' },
                    { status: 400 }
                );
            }

            const serial = rows[0];

            if (serial.status === 1) { // 假设 1 表示已使用
                await connection.rollback();
                return NextResponse.json(
                    { success: false, message: '激活码已被使用' },
                    { status: 400 }
                );
            }

            // 2. 标记为已使用
            await connection.query(
                'UPDATE serial_numbers SET status = 1, used_at = NOW() WHERE id = ?',
                [serial.id]
            );

            await connection.commit();

            return NextResponse.json({
                success: true,
                message: '验证成功',
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Verify code error:', error);
        return NextResponse.json(
            { success: false, message: '验证失败，请稍后重试' },
            { status: 500 }
        );
    }
}
