'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { SCL90_QUESTIONS } from '@/lib/data/scl90-questions';
import { SCL90_TOTAL_QUESTIONS } from '@/lib/constants';
import ActivationCodeModal from '@/components/common/ActivationCodeModal';

export default function Scl90ConfirmPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);

  useEffect(() => {
    // 检查是否有答案
    const answers = localStorage.getItem('scl90_answers');
    if (!answers) {
      router.push('/scl90/quiz');
      return;
    }
    setHasAnswers(true);
  }, [router]);

  const handleConfirm = async () => {
    const testId = sessionStorage.getItem('scl90_test_id');
    if (!testId) {
      alert('会话已过期，请重新开始测试');
      router.push('/scl90/nickname');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. 提交答案到后台
      const answersData = JSON.parse(localStorage.getItem('scl90_answers') || '[]');
      const formattedAnswers = answersData.map((answer: number, index: number) => ({
        questionId: index + 1,
        questionNumber: index + 1,
        dimension: SCL90_QUESTIONS[index].dimension,
        answer: answer as 0 | 1 | 2 | 3 | 4,  // 标准SCL-90：0-4分制
        score: answer as 0 | 1 | 2 | 3 | 4,
      }));

      const res = await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          type: 'scl90',
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
    const testId = sessionStorage.getItem('scl90_test_id');
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
          type: 'scl90'
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return false;
      }

      // 验证成功
      // 为了兼容现有 Result 页的前端计算逻辑，我们需要构造它需要的数据结构
      sessionStorage.setItem('scl90_test_result', JSON.stringify({
        answers: JSON.parse(localStorage.getItem('scl90_answers') || '[]').map((a: number, i: number) => ({
          questionId: i + 1,
          questionNumber: i + 1,
          dimension: SCL90_QUESTIONS[i].dimension,
          answer: a,
          score: a
        })),
        serialNumber: code
      }));

      // 清除本地存储
      localStorage.removeItem('scl90_answers');

      router.push('/scl90/result');
      return true;
    } catch (err) {
      console.error('Verification error:', err);
      return false;
    }
  };


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
                是否确认提交本次测评？
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
                  sessionStorage.setItem('scl90_return_to_last', String(SCL90_TOTAL_QUESTIONS - 1));
                  router.push('/scl90/quiz');
                }}
              >
                返回修改
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <ActivationCodeModal
        isOpen={showActivationModal}
        onClose={() => setShowActivationModal(false)}
        onVerify={onVerifyCode}
      />
    </main>
  );
}

