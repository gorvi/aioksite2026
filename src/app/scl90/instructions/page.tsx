'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Disclaimer from '@/components/common/Disclaimer';
import Header from '@/components/common/Header';
import { logUserAction } from '@/lib/utils/log-action';

export default function Scl90InstructionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = (checked: boolean) => {
    setAgreed(checked);
    if (checked) {
      logUserAction({
        actionType: 'agree_protocol',
        testType: 'scl90',
        testId: sessionStorage.getItem('scl90_test_id'),
        nickname: sessionStorage.getItem('scl90_nickname')
      });
    }
  };

  const handleStart = () => {
    logUserAction({
      actionType: 'start_quiz',
      testType: 'scl90',
      testId: sessionStorage.getItem('scl90_test_id'),
      nickname: sessionStorage.getItem('scl90_nickname')
    });
    router.push('/scl90/quiz');
  };

  const handleBack = () => {
    logUserAction({
      actionType: 'go_back',
      testType: 'scl90',
      testId: sessionStorage.getItem('scl90_test_id'),
      nickname: sessionStorage.getItem('scl90_nickname')
    });
    router.push('/scl90/nickname');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="SCL-90 倾向自测" showBack backUrl="/scl90/nickname" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-slate-100 dark:border-slate-800">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-4xl">description</span>
                </div>
                <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">
                  测评说明
                </h1>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                    测试内容
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    本量表共 <strong className="text-slate-900 dark:text-slate-100">90 题</strong>，涵盖 9 个心理维度，预计需要 <strong className="text-slate-900 dark:text-slate-100">10-15 分钟</strong>完成。
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">quiz</span>
                    作答方式
                  </h2>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                      <span>请根据<strong className="text-slate-900 dark:text-slate-100">最近一周</strong>的真实情况作答</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                      <span>每题有 5 个选项：没有、很轻、中等、偏重、严重</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                      <span>选择最符合您实际情况的选项</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* 合规同意区 */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => handleAgree(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary border-slate-300 rounded focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    我已阅读并同意
                    <Link
                      href={`/agreement?return=${encodeURIComponent('/scl90/instructions')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      《个人心理健康敏感信息处理同意书》
                    </Link>
                  </span>
                </label>
              </div>

              {/* 免责声明 */}
              <Disclaimer className="mb-8" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex-1"
                  disabled={!agreed}
                  onClick={handleStart}
                >
                  开始答题
                  <span className="material-symbols-outlined text-[20px] ml-2">arrow_forward</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleBack}
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">arrow_back</span>
                  返回
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

