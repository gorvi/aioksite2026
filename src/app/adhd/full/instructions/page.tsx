'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Disclaimer from '@/components/common/Disclaimer';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import { logUserAction } from '@/lib/utils/log-action';

export default function AdhdFullInstructionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = (checked: boolean) => {
    setAgreed(checked);
    if (checked) {
      logUserAction({
        actionType: 'agree_protocol',
        testType: 'adhd',
        testId: sessionStorage.getItem('adhd_test_id'),
        nickname: sessionStorage.getItem('adhd_nickname')
      });
    }
  };

  const handleStart = () => {
    logUserAction({
      actionType: 'start_quiz',
      testType: 'adhd',
      testId: sessionStorage.getItem('adhd_test_id'),
      nickname: sessionStorage.getItem('adhd_nickname')
    });
    router.push('/adhd/full/quiz');
  };

  const handleBack = () => {
    logUserAction({
      actionType: 'go_back',
      testType: 'adhd',
      testId: sessionStorage.getItem('adhd_test_id'),
      nickname: sessionStorage.getItem('adhd_nickname')
    });
    router.push('/adhd/nickname');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="ADHD 倾向自测" showBack backUrl="/adhd/nickname" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto">
            <Card className="border-slate-100 dark:border-slate-800 p-6 sm:p-8">
              <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight text-center">
                测试说明
              </h1>

              {/* 说明内容 - 紧凑布局 */}
              <div className="space-y-4 mb-8">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      测试构成与规则
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    本测试共 <strong className="text-slate-900 dark:text-slate-100">43 道题目</strong>，预计用时 <strong className="text-slate-900 dark:text-slate-100">8-12 分钟</strong>。
                  </p>
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">第一部分 (ASRS)</strong>：请根据<strong className="text-slate-800 dark:text-slate-200">过去 6 个月</strong>的真实表现作答。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">第二部分 (WURS)</strong>：请回忆您在<strong className="text-slate-800 dark:text-slate-200">8 到 12 岁期间</strong>的行为特征。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">•</span>
                      <span>题目没有对错之分，请按第一直觉选择最符合您的选项。</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-800/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-indigo-600 text-xl">tips_and_updates</span>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">答题建议</h2>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>找一个安静、不被打扰的环境，预留约 10 分钟时间。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>不要过度思考题目，请根据第一直觉选择最贴切的描述。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>诚实面对内心，这份报告仅为您个人深度探索提供。</span>
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
                      href={`/agreement?return=${encodeURIComponent('/adhd/full/instructions')}`}
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

              {/* 操作按钮 */}
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

