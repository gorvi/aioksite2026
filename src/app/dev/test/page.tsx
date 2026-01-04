'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import { calculateScl90Result } from '@/lib/utils/scl90-calculator';
import { calculateAdhdFullResult } from '@/lib/utils/adhd-full-calculator';
import { SCL90_QUESTIONS } from '@/lib/data/scl90-questions';
import { ADHD_FULL_QUESTIONS } from '@/lib/data/adhd-full-questions';

/**
 * 开发测试工具页面
 * 用于快速生成随机测试结果，方便开发和测试
 */
export default function DevTestPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  // 生成随机 SCL-90 答案
  const generateScl90Answers = () => {
    const answers = SCL90_QUESTIONS.map((question, index) => {
      // 随机生成答案，但偏向于生成一些有意义的分布
      // 70% 概率选择 1-2（正常），30% 概率选择 3-5（需关注）
      const random = Math.random();
      let score: 1 | 2 | 3 | 4 | 5;
      
      if (random < 0.5) {
        score = 1; // 没有
      } else if (random < 0.7) {
        score = 2; // 很轻
      } else if (random < 0.85) {
        score = 3; // 中等
      } else if (random < 0.95) {
        score = 4; // 偏重
      } else {
        score = 5; // 严重
      }

      return {
        questionId: question.id,
        questionNumber: index + 1,
        dimension: question.dimension,
        answer: score as 1 | 2 | 3 | 4 | 5,
        score: score as 1 | 2 | 3 | 4 | 5,
      };
    });

    return answers;
  };


  // 生成随机 ADHD 完整版答案
  const generateAdhdFullAnswers = () => {
    return ADHD_FULL_QUESTIONS.map((question, index) => {
      const random = Math.random();
      let score: 0 | 1 | 2 | 3 | 4;
      
      if (random < 0.3) {
        score = 0;
      } else if (random < 0.5) {
        score = 1;
      } else if (random < 0.7) {
        score = 2;
      } else if (random < 0.85) {
        score = 3;
      } else {
        score = 4;
      }

      return {
        questionId: question.id,
        questionNumber: index + 1,
        stage: question.stage,
        dimension: question.dimension,
        part: question.part as 'A' | 'B' | undefined,
        answer: score,
        score: score,
      };
    });
  };

  const handleTestScl90 = () => {
    setIsGenerating(true);
    try {
      const answers = generateScl90Answers();
      const serialNumber = `DEV-${Date.now()}`;
      const nickname = `TestUser${Math.floor(Math.random() * 1000)}`;
      
      // 保存到 sessionStorage
      sessionStorage.setItem('scl90_test_result', JSON.stringify({
        answers,
        serialNumber,
      }));
      sessionStorage.setItem('scl90_nickname', nickname);
      
      // 跳转到结果页
      router.push('/scl90/result');
    } catch (error) {
      console.error('生成测试数据失败:', error);
      alert('生成测试数据失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };


  const handleTestAdhdFull = () => {
    setIsGenerating(true);
    try {
      const answers = generateAdhdFullAnswers();
      const serialNumber = `DEV-${Date.now()}`;
      const nickname = `TestUser${Math.floor(Math.random() * 1000)}`;
      
      // 保存到 sessionStorage
      sessionStorage.setItem('adhd_full_test_result', JSON.stringify({
        answers,
        serialNumber,
      }));
      sessionStorage.setItem('adhd_nickname', nickname);
      
      // 跳转到结果页
      router.push('/adhd/full/result');
    } catch (error) {
      console.error('生成测试数据失败:', error);
      alert('生成测试数据失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="开发测试工具" showBack backUrl="/tests" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* 警告提示 */}
            <Card className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-xl">warning</span>
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                    开发测试工具
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    此工具仅用于开发测试，将随机生成测试答案并直接跳转到结果页面。
                    请勿在生产环境使用。
                  </p>
                </div>
              </div>
            </Card>

            {/* 测试按钮 */}
            <div className="space-y-4">
              <Card>
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    SCL-90 测试
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    生成 90 题随机答案，直接查看结果
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleTestScl90}
                  disabled={isGenerating}
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">play_arrow</span>
                  {isGenerating ? '生成中...' : '一键测试 SCL-90'}
                </Button>
              </Card>

              <Card>
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    ADHD 完整版测试
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    生成 ASRS (18题) + WURS (25题) 随机答案，直接查看结果
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleTestAdhdFull}
                  disabled={isGenerating}
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">play_arrow</span>
                  {isGenerating ? '生成中...' : '一键测试 ADHD 完整版'}
                </Button>
              </Card>
            </div>

            {/* 说明 */}
            <Card className="mt-8 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                使用说明
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>点击按钮将随机生成测试答案</li>
                <li>答案分布：70% 正常范围，30% 需关注范围</li>
                <li>生成后会自动跳转到对应的结果页面</li>
                <li>测试数据会保存到 sessionStorage，刷新页面会丢失</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

