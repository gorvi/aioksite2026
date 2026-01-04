/**
 * 记录用户行为
 */
export async function logUserAction(params: {
    actionType: string;
    testType: 'adhd' | 'scl90';
    testId?: string | number | null;
    nickname?: string | null;
}) {
    try {
        // 使用 fetch 发送请求，也就是 fire-and-forget，不等待结果
        fetch('/api/log/action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).catch(err => console.error('Log action fetch error:', err));
    } catch (error) {
        console.error('Log action error:', error);
    }
}
