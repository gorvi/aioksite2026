'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { ADHD_FULL_QUESTIONS, ASRS_QUESTIONS, WURS_QUESTIONS } from '@/lib/data/adhd-full-questions';
import ActivationCodeModal from '@/components/common/ActivationCodeModal';

export default function AdhdFullConfirmPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);

  useEffect(() => {
    // 检查是否有答案
    const answers = localStorage.getItem('adhd_full_answers');
    if (!answers) {
      router.push('/adhd/full/quiz');
      return;
    }

    const parsed = JSON.parse(answers);
    // 检查是否所有题目都已作答
    const allAnswered = parsed.every((a: number | null) => a !== null);
    if (!allAnswered) {
      router.push('/adhd/full/quiz');
      return;
    }

    setHasAnswers(true);
  }, [router]);

  const handleConfirm = async () => {
    const testId = sessionStorage.getItem('adhd_test_id');
    if (!testId) {
      alert('会话已过期，请重新开始测试');
      router.push('/adhd/nickname');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. 提交答案到后台
      const answersData = JSON.parse(localStorage.getItem('adhd_full_answers') || '[]');
      const formattedAnswers = answersData.map((answer: number, index: number) => {
        const question = ADHD_FULL_QUESTIONS[index];
        return {
          questionId: question.id,
          questionNumber: index + 1,
          stage: question.stage,
          dimension: question.dimension,
          part: question.part,
          answer: answer as 0 | 1 | 2 | 3 | 4,
          score: answer as 0 | 1 | 2 | 3 | 4,
        };
      });

      const res = await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          type: 'adhd',
          answers: formattedAnswers
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || '提交失败');
      }

      // 2. 提交成功，显示激活码弹窗
      setShowActivationModal(true);
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerifyCode = async (code: string): Promise<boolean> => {
    const testId = sessionStorage.getItem('adhd_test_id');
    if (!testId) return false;

    try {
      const res = await fetch('/api/activation/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          testId,
          type: 'adhd'
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return false;
      }

      // 验证成功，保存完整结果并跳转
      sessionStorage.setItem('adhd_full_test_result', JSON.stringify({
        ...data.data,
        // formatted answers structure isn't inherently returned by verify, 
        // but result page might need it if it re-calculates locally?
        // Wait, result page READS from this session storage.
        // My result page logic (Step 539 view) reads: { answers, serialNumber }.
        // And then CALCULATES locally: calculateAdhdFullResult(answers, serialNumber).
        // 
        // My verify API returns the CALCULATED result (`total_score`, etc.)
        // SO I need to UPDATE the result page to use the SERVER returned data instead of calculating it again!
        // This is a CRITICAL change.
        // 
        // HOWEVER, to keep it compatible with existing result page without rewriting it entirely RIGHT NOW:
        // I can reconstruct the 'answers' array from local storage (it's still there) and save it.
        // BUT my verify API already calculated it. It's cleaner to just use the server result.
        // 
        // Let's modify RESULT page logic later or now? 
        // If I don't modify Result page, it will try to calc again.
        // It needs `answers`. I have them in localStorage.
        answers: JSON.parse(localStorage.getItem('adhd_full_answers') || '[]').map((a: number, i: number) => {
          const q = ADHD_FULL_QUESTIONS[i];
          return {
            questionId: q.id,
            questionNumber: i + 1,
            stage: q.stage,
            dimension: q.dimension,
            part: q.part,
            answer: a,
            score: a
          };
        }), // Re-construct for client-side compatibility
        serialNumber: code
      }));

      // 也保存服务端返回的计算结果，供以后的优化使用
      sessionStorage.setItem('adhd_server_result', JSON.stringify(data.data));

      // 清除本地存储
      localStorage.removeItem('adhd_full_answers');

      router.push('/adhd/full/result');
      return true;
    } catch (err) {
      console.error('Verification error:', err);
      return false;
    }
  };

  // Remove the old performSubmit since we merged it into onVerifyCode logic somewhat
  // No, actually onVerifyCode does the final steps.
  // We can remove performSubmit.


  if (!hasAnswers) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                确认提交
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                是否确认提交本次完整版测试？
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                提交后将无法修改答案
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : '确认提交'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  // 保存最后一题的索引，让答题页跳转到最后一题
                  sessionStorage.setItem('adhd_full_return_to_last', String(ADHD_FULL_QUESTIONS.length - 1));
                  router.push('/adhd/full/quiz');
                }}
              >
                返回修改
              </Button>
            </div>
          </Card>

          <ActivationCodeModal
            isOpen={showActivationModal}
            onClose={() => setShowActivationModal(false)}
            onVerify={onVerifyCode}
          />
        </div>
      </div>
    </main>
  );
}

