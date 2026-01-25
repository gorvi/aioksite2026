'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import ActivationCodeModal from '@/components/common/ActivationCodeModal';
import { calculateCityPersonality } from '@/lib/utils/city-personality-calculator';
import { generateDetailedResult } from '@/lib/utils/city-personality-calculator';
import { CITY_PERSONALITY_QUESTIONS } from '@/lib/data/city-personality-questions';

interface AnswerData {
  questionId: number;
  questionNumber: number;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  answerOption: 'A' | 'B';
  score: 1 | 2;
}

export default function CityPersonalityConfirmPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);

  useEffect(() => {
    // 检查答题数据
    const savedAnswers = sessionStorage.getItem('city_personality_answers');
    const savedNickname = sessionStorage.getItem('city_personality_nickname');

    if (!savedAnswers || !savedNickname) {
      router.push('/city-personality');
      return;
    }

    try {
      const parsedAnswers = JSON.parse(savedAnswers);
      if (!Array.isArray(parsedAnswers) || parsedAnswers.length !== 36) {
        throw new Error('Invalid answers format');
      }
      setAnswers(parsedAnswers);
      setNickname(savedNickname);
    } catch (error) {
      console.error('Failed to parse saved data:', error);
      router.push('/city-personality');
    }
  }, [router]);

  const handleSubmitWithoutCode = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 计算测试结果
      const result = calculateCityPersonality(answers);
      const detailedResult = generateDetailedResult(result);

      // 存储结果到sessionStorage
      sessionStorage.setItem('city_personality_result', JSON.stringify({
        ...detailedResult,
        nickname,
        testDate: new Date().toISOString()
      }));

      // 清理答题数据
      sessionStorage.removeItem('city_personality_answers');
      sessionStorage.removeItem('city_personality_quiz_progress');

      // 跳转到结果页面
      router.push('/city-personality/result');
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitWithCode = async (serialNumber: string): Promise<boolean> => {
    try {
      setIsSubmitting(true);

      // 1. 验证激活码（不立即标记为已使用，等提交成功后再标记）
      const verifyRes = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: serialNumber, markAsUsed: false }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return false; // 激活码验证失败
      }

      // 2. 初始化测试记录
      const initRes = await fetch('/api/test/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nickname, 
          type: 'city_personality',
          serialNumber 
        }),
      });

      const initData = await initRes.json();
      if (!initData.success || !initData.data?.testId) {
        return false; // 初始化失败
      }

      const testId = initData.data.testId;

      // 3. 提交答案（包含激活码）
      const submitRes = await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          type: 'city_personality',
          answers,
          serialNumber
        }),
      });

      const submitData = await submitRes.json();
      if (!submitData.success) {
        return false; // 提交失败
      }

      // 4. 计算测试结果（用于前端显示）
      const result = calculateCityPersonality(answers);
      const detailedResult = generateDetailedResult(result);

      // 5. 存储结果到sessionStorage (包含激活码信息)
      sessionStorage.setItem('city_personality_result', JSON.stringify({
        ...detailedResult,
        nickname,
        serialNumber,
        testId,
        testDate: new Date().toISOString(),
        isPremium: true // 标记为付费版本
      }));

      // 6. 清理答题数据
      sessionStorage.removeItem('city_personality_answers');
      sessionStorage.removeItem('city_personality_quiz_progress');

      // 7. 关闭模态框
      setShowActivationModal(false);

      // 8. 跳转到结果页面
      router.push('/city-personality/result');
      
      return true; // 验证成功
    } catch (error) {
      console.error('Submit with code error:', error);
      return false; // 验证失败
    } finally {
      setIsSubmitting(false);
    }
  };

  // 按维度分组答案
  const answersByDimension = answers.reduce((acc, answer) => {
    if (!acc[answer.dimension]) {
      acc[answer.dimension] = [];
    }
    acc[answer.dimension].push(answer);
    return acc;
  }, {} as Record<string, AnswerData[]>);

  const dimensionNames = {
    'E_I': '外向/内向',
    'S_N': '实感/直觉',
    'T_F': '思考/情感',
    'J_P': '判断/感知'
  };

  if (answers.length === 0) {
    return <div>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              确认提交
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              你好，{nickname}！请确认你的答题结果，然后提交获取城市性格分析报告。
            </p>
          </div>

          {/* 答题统计 */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                答题统计
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(dimensionNames).map(([dimension, name]) => {
                  const dimensionAnswers = answersByDimension[dimension] || [];
                  const aCount = dimensionAnswers.filter(a => a.answerOption === 'A').length;
                  const bCount = dimensionAnswers.filter(a => a.answerOption === 'B').length;
                  
                  return (
                    <div key={dimension} className="text-center">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {name}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div>A选项：{aCount} 题</div>
                        <div>B选项：{bCount} 题</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-center">
                  <span className="text-green-800 dark:text-green-200 font-semibold">
                    ✓ 已完成全部 36 道题目
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 温馨提示 */}
          <Card className="mb-8 border-l-4 border-l-blue-400">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                💡 温馨提示
              </h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p>• 提交后将生成你的专属城市性格分析报告</p>
                <p>• 报告将包含MBTI性格类型、匹配城市、性格标签等详细信息</p>
                <p>• 支持下载报告图片，方便分享和保存</p>
                <p>• 如有激活码，可获得更详细的分析报告和额外功能</p>
              </div>
            </div>
          </Card>

          {/* 提交选项 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 普通提交 */}
            <Card>
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  免费版结果
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  获得基础的性格分析和城市匹配结果
                </p>
                <Button
                  onClick={handleSubmitWithoutCode}
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  免费查看结果
                </Button>
              </div>
            </Card>

            {/* 激活码提交 */}
            <Card className="border-indigo-200 dark:border-indigo-800">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                  完整版结果
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  使用激活码获得详细分析报告和专属功能
                </p>
                <Button
                  onClick={() => setShowActivationModal(true)}
                  variant="outline"
                  className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                  size="lg"
                >
                  输入激活码
                </Button>
              </div>
            </Card>
          </div>

          {/* 返回修改按钮 */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => router.push('/city-personality/quiz')}
              className="px-6"
            >
              ← 返回修改答案
            </Button>
          </div>
        </div>
      </main>

      {/* 激活码模态框 */}
      <ActivationCodeModal
        isOpen={showActivationModal}
        onClose={() => setShowActivationModal(false)}
        onVerify={handleSubmitWithCode}
      />
    </div>
  );
}