'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

export default function Scl90RecordsPage() {
  // TODO: 从数据库获取历史记录
  const records: Array<{
    id: number;
    test_date: string;
    total_score: number;
    overall_status: string;
  }> = [];

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
              测评记录
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              记录仅保存 30 天
            </p>
          </div>

          {records.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  暂无测试记录
                </p>
                <Link href="/scl90/serial">
                  <Button variant="primary">开始测试</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <Card key={record.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        {new Date(record.test_date).toLocaleDateString('zh-CN')}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        总均分：{record.total_score} | 状态：{record.overall_status}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}




