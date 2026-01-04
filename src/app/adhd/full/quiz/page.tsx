'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { ADHD_FULL_QUESTIONS, ASRS_QUESTIONS, WURS_QUESTIONS, ADHD_FULL_OPTIONS, WURS_OPTIONS } from '@/lib/data/adhd-full-questions';

type Answer = 0 | 1 | 2 | 3 | 4 | null;

export default function AdhdFullQuizPage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<'asrs' | 'wurs'>('asrs');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(new Array(ADHD_FULL_QUESTIONS.length).fill(null));

  // 获取当前阶段的题目
  const getCurrentStageQuestions = () => {
    return currentStage === 'asrs' ? ASRS_QUESTIONS : WURS_QUESTIONS;
  };

  const currentStageQuestions = getCurrentStageQuestions();
  const currentQuestion = currentStageQuestions[currentIndex];
  const currentAnswer = answers[currentQuestion.id - 1];
  
  // 计算进度
  const asrsProgress = ASRS_QUESTIONS.length > 0
    ? (answers.slice(0, ASRS_QUESTIONS.length).filter(a => a !== null).length / ASRS_QUESTIONS.length) * 100
    : 0;
  const wursProgress = WURS_QUESTIONS.length > 0
    ? (answers.slice(ASRS_QUESTIONS.length).filter(a => a !== null).length / WURS_QUESTIONS.length) * 100
    : 0;
  const totalProgress = (answers.filter(a => a !== null).length / ADHD_FULL_QUESTIONS.length) * 100;

  // 从本地存储恢复答案
  useEffect(() => {
    const saved = localStorage.getItem('adhd_full_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === ADHD_FULL_QUESTIONS.length) {
          setAnswers(parsed);
          
          // 检查是否需要跳转到最后一题（从确认页返回）
          const returnToLast = sessionStorage.getItem('adhd_full_return_to_last');
          if (returnToLast) {
            const lastIndex = parseInt(returnToLast, 10);
            if (!isNaN(lastIndex) && lastIndex >= 0 && lastIndex < ADHD_FULL_QUESTIONS.length) {
              const q = ADHD_FULL_QUESTIONS[lastIndex];
              setCurrentStage(q.stage);
              setCurrentIndex(q.stage === 'asrs' 
                ? ASRS_QUESTIONS.findIndex(aq => aq.id === q.id)
                : WURS_QUESTIONS.findIndex(wq => wq.id === q.id)
              );
              sessionStorage.removeItem('adhd_full_return_to_last');
              return;
            }
          }
          
          // 恢复当前阶段和索引
          // 先检查 ASRS 阶段是否有未答题的
          const firstUnansweredAsrs = parsed.findIndex((a: Answer, idx: number) => {
            const q = ADHD_FULL_QUESTIONS[idx];
            return a === null && q.stage === 'asrs';
          });
          
          if (firstUnansweredAsrs !== -1) {
            const q = ADHD_FULL_QUESTIONS[firstUnansweredAsrs];
            setCurrentStage('asrs');
            setCurrentIndex(ASRS_QUESTIONS.findIndex(aq => aq.id === q.id));
          } else {
            // ASRS 已完成，检查 WURS
            const asrsCompleted = parsed.slice(0, ASRS_QUESTIONS.length).every((a: Answer) => a !== null);
            if (asrsCompleted) {
              const firstUnansweredWurs = parsed.findIndex((a: Answer, idx: number) => {
                const q = ADHD_FULL_QUESTIONS[idx];
                return a === null && q.stage === 'wurs';
              });
              
              if (firstUnansweredWurs !== -1) {
                const q = ADHD_FULL_QUESTIONS[firstUnansweredWurs];
                setCurrentStage('wurs');
                setCurrentIndex(WURS_QUESTIONS.findIndex(wq => wq.id === q.id));
              } else {
                // 所有题目都已完成，默认显示 WURS 第一题
                setCurrentStage('wurs');
                setCurrentIndex(0);
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, []);

  // 保存答案到本地存储
  const saveAnswer = (questionId: number, answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = answer;
    setAnswers(newAnswers);
    localStorage.setItem('adhd_full_answers', JSON.stringify(newAnswers));
  };

  const handleAnswerSelect = (value: 0 | 1 | 2 | 3 | 4) => {
    saveAnswer(currentQuestion.id, value);
    
    // 自动进入下一题（延迟一点让用户看到选中效果）
    setTimeout(() => {
      if (currentIndex < currentStageQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // 当前阶段最后一题
        if (currentStage === 'asrs') {
          // ASRS 完成，切换到 WURS
          setCurrentStage('wurs');
          setCurrentIndex(0);
        } else {
          // WURS 完成，跳转到确认页
          router.push('/adhd/full/confirm');
        }
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentStage === 'wurs') {
      // WURS 第一题，返回 ASRS 最后一题
      setCurrentStage('asrs');
      setCurrentIndex(ASRS_QUESTIONS.length - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswer === null) {
      alert('请先选择答案');
      return;
    }
    if (currentIndex < currentStageQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 当前阶段最后一题
      if (currentStage === 'asrs') {
        // ASRS 完成，切换到 WURS
        setCurrentStage('wurs');
        setCurrentIndex(0);
      } else {
        // WURS 完成，跳转到确认页
        router.push('/adhd/full/confirm');
      }
    }
  };

  // 获取当前阶段的选项（WURS 使用不同的标签）
  const currentOptions = currentStage === 'wurs' ? WURS_OPTIONS : ADHD_FULL_OPTIONS;

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 阶段提示 */}
          <div className="mb-4 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-2">
              {currentStage === 'asrs' ? '成年现状评估 (ASRS)' : '童年回溯评估 (WURS)'}
            </div>
            {currentStage === 'asrs' && currentIndex === 5 && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                核心筛查项已完成，继续完成深度探测项
              </p>
            )}
            {currentStage === 'wurs' && currentIndex === 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                请回忆您在 8 到 12 岁期间的表现
              </p>
            )}
          </div>

          {/* 双重进度条 */}
          <div className="mb-8 space-y-2">
            {/* 阶段进度 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {currentStage === 'asrs' ? 'ASRS 进度' : 'WURS 进度'}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {currentStage === 'asrs' 
                    ? `${answers.slice(0, ASRS_QUESTIONS.length).filter(a => a !== null).length} / ${ASRS_QUESTIONS.length}`
                    : `${answers.slice(ASRS_QUESTIONS.length).filter(a => a !== null).length} / ${WURS_QUESTIONS.length}`
                  }
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentStage === 'asrs' ? asrsProgress : wursProgress}%` }}
                />
              </div>
            </div>
            
            {/* 总进度 */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  总进度
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {answers.filter(a => a !== null).length} / {ADHD_FULL_QUESTIONS.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-slate-400 dark:bg-slate-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* 题目区域 */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* 选项按钮 */}
            <div className="space-y-3">
              {currentOptions.map((option) => (
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
              disabled={currentIndex === 0 && currentStage === 'asrs'}
            >
              上一题
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentAnswer === null}
            >
              {currentIndex === currentStageQuestions.length - 1 && currentStage === 'wurs'
                ? '完成答题'
                : currentIndex === currentStageQuestions.length - 1 && currentStage === 'asrs'
                ? '进入童年回溯评估'
                : '下一题'
              }
            </Button>
          </div>

          {/* 提示文字 */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            {currentStage === 'asrs'
              ? '请根据过去 6 个月的真实情况选择最符合的选项'
              : '请回忆您在 8 到 12 岁期间的表现，选择最符合的选项'
            }
          </p>
        </div>
      </div>
    </main>
  );
}

