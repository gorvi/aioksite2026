'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Disclaimer from '@/components/common/Disclaimer';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';

export default function CityPersonalityInstructionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = (checked: boolean) => {
    setAgreed(checked);
  };

  const handleStart = () => {
    router.push('/city-personality/quiz');
  };

  const handleBack = () => {
    router.push('/city-personality/nickname');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="城市性格测试" showBack backUrl="/city-personality/nickname" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-slate-100 dark:border-slate-800">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-purple-600 text-4xl">location_city</span>
                </div>
                <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">
                  测试说明
                </h1>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-xl">info</span>
                    测试内容
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    本测试基于 <strong className="text-slate-900 dark:text-slate-100">MBTI 理论</strong>，共 <strong className="text-slate-900 dark:text-slate-100">36 题</strong>，
                    涵盖四个核心维度，预计需要 <strong className="text-slate-900 dark:text-slate-100">5-8 分钟</strong>完成。
                    测试完成后，系统将为您匹配最适合的城市。
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-xl">quiz</span>
                    测试维度
                  </h2>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-purple-600 text-lg mt-0.5">check_circle</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">外向/内向 (E/I)</strong>：能量来源与社交偏好</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-purple-600 text-lg mt-0.5">check_circle</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">实感/直觉 (S/N)</strong>：信息收集与处理方式</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-purple-600 text-lg mt-0.5">check_circle</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">思考/情感 (T/F)</strong>：决策制定的依据</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-purple-600 text-lg mt-0.5">check_circle</span>
                      <span><strong className="text-slate-900 dark:text-slate-100">判断/感知 (J/P)</strong>：生活方式与节奏偏好</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-purple-50/30 dark:bg-purple-900/10 border border-purple-100/50 dark:border-purple-800/30">
                  <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-xl">tips_and_updates</span>
                    答题建议
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>请根据您的<strong className="text-slate-900 dark:text-slate-100">真实偏好</strong>作答，而不是您认为"正确"的答案。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>每题都是二选一，请选择更符合您性格特点的选项。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>不要过度思考，凭第一直觉选择通常更准确。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>测试结果将为您推荐最匹配的中国城市及其特色。</span>
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
                    className="mt-1 w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-2 focus:ring-purple-600/20 transition-all"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    我已阅读并同意
                    <Link
                      href={`/agreement?return=${encodeURIComponent('/city-personality/instructions')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline ml-1 font-medium"
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
                  className="w-full flex-1 bg-purple-600 hover:bg-purple-700 border-purple-600"
                  disabled={!agreed}
                  onClick={handleStart}
                >
                  开始测试
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