'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { SCL90_QUESTIONS, SCL90_OPTIONS, type Scl90Question } from '@/lib/data/scl90-questions';
import { SCL90_TOTAL_QUESTIONS } from '@/lib/constants';

type Answer = 1 | 2 | 3 | 4 | 5 | null;

export default function Scl90QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(new Array(SCL90_TOTAL_QUESTIONS).fill(null));

  const currentQuestion = SCL90_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentIndex];
  const progress = ((currentIndex + 1) / SCL90_TOTAL_QUESTIONS) * 100;

  // 从本地存储恢复答案
  useEffect(() => {
    const saved = localStorage.getItem('scl90_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === SCL90_TOTAL_QUESTIONS) {
          setAnswers(parsed);
        }
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }

    // 检查是否需要跳转到最后一题（从确认页返回）
    const returnToLast = sessionStorage.getItem('scl90_return_to_last');
    if (returnToLast) {
      const lastIndex = parseInt(returnToLast, 10);
      if (!isNaN(lastIndex) && lastIndex >= 0 && lastIndex < SCL90_TOTAL_QUESTIONS) {
        setCurrentIndex(lastIndex);
      }
      // 清除标记
      sessionStorage.removeItem('scl90_return_to_last');
    }
  }, []);

  // 保存答案到本地存储
  const saveAnswer = (index: number, answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
    localStorage.setItem('scl90_answers', JSON.stringify(newAnswers));
  };

  const handleAnswerSelect = (value: 1 | 2 | 3 | 4 | 5) => {
    saveAnswer(currentIndex, value);
    
    // 自动进入下一题
    setTimeout(() => {
      if (currentIndex < SCL90_TOTAL_QUESTIONS - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // 最后一题，跳转到确认页
        router.push('/scl90/confirm');
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswer === null) {
      alert('请先选择答案');
      return;
    }
    if (currentIndex < SCL90_TOTAL_QUESTIONS - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/scl90/confirm');
    }
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                第 {currentIndex + 1} 题 / 共 {SCL90_TOTAL_QUESTIONS} 题
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 题目区域 */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* 选项按钮 */}
            <div className="space-y-3">
              {SCL90_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                    currentAnswer === option.value
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              上一题
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentAnswer === null}
            >
              {currentIndex === SCL90_TOTAL_QUESTIONS - 1 ? '完成答题' : '下一题'}
            </Button>
          </div>

          {/* 提示文字 */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            请根据最近一周的真实情况选择最符合的选项
          </p>
        </div>
      </div>
    </main>
  );
}


