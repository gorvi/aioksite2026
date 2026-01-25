'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import { CITY_PERSONALITY_QUESTIONS } from '@/lib/data/city-personality-questions';

type Answer = 'A' | 'B' | null;

interface AnswerData {
  questionId: number;
  questionNumber: number;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  answerOption: 'A' | 'B';
  score: 1 | 2;
}

export default function CityPersonalityQuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(new Array(36).fill(null));
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 检查是否有昵称
    const storedNickname = sessionStorage.getItem('city_personality_nickname');
    if (!storedNickname) {
      router.push('/city-personality/nickname');
      return;
    }
    setNickname(storedNickname);

    // 检查是否有保存的答题进度
    const savedAnswers = sessionStorage.getItem('city_personality_quiz_progress');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        if (Array.isArray(parsedAnswers) && parsedAnswers.length === 36) {
          setAnswers(parsedAnswers);
          // 找到第一个未回答的问题
          const firstUnanswered = parsedAnswers.findIndex(answer => answer === null);
          if (firstUnanswered !== -1) {
            setCurrentQuestion(firstUnanswered);
          }
        }
      } catch (error) {
        console.error('Failed to parse saved answers:', error);
      }
    }
  }, [router]);

  const handleAnswerSelect = (answer: 'A' | 'B') => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    // 保存答题进度
    sessionStorage.setItem('city_personality_quiz_progress', JSON.stringify(newAnswers));

    // 自动进入下一题（延迟一点时间显示选择效果）
    setTimeout(() => {
      if (currentQuestion < CITY_PERSONALITY_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 200);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < CITY_PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {
    // 检查是否所有题目都已回答
    const unansweredQuestions = answers
      .map((answer, index) => answer === null ? index + 1 : null)
      .filter(q => q !== null);

    if (unansweredQuestions.length > 0) {
      alert(`请先完成第 ${unansweredQuestions.join(', ')} 题`);
      // 跳转到第一个未回答的题目
      setCurrentQuestion(unansweredQuestions[0]! - 1);
      return;
    }

    // 转换答案格式
    const formattedAnswers: AnswerData[] = answers.map((answer, index) => {
      const question = CITY_PERSONALITY_QUESTIONS[index];
      const selectedOption = question.options.find(opt => opt.id === answer)!;
      
      return {
        questionId: question.id,
        questionNumber: index + 1,
        dimension: question.dimension,
        answerOption: answer as 'A' | 'B',
        score: selectedOption.score as 1 | 2
      };
    });

    // 存储答案数据
    sessionStorage.setItem('city_personality_answers', JSON.stringify(formattedAnswers));
    
    // 跳转到确认页面
    router.push('/city-personality/confirm');
  };

  const currentQuestionData = CITY_PERSONALITY_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / CITY_PERSONALITY_QUESTIONS.length) * 100;
  const answeredCount = answers.filter(answer => answer !== null).length;

  if (!currentQuestionData) {
    return <div>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                你好，{nickname}
              </span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                第 {currentQuestion + 1} 题 / 共 {CITY_PERSONALITY_QUESTIONS.length} 题
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                已完成 {answeredCount} 题
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(progress)}% 完成
              </span>
            </div>
          </div>

          {/* 问题卡片 */}
          <Card className="mb-8">
            <div className="p-8">
              {/* 维度标识 */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                  {currentQuestionData.dimension.replace('_', '/')} 维度
                </span>
              </div>

              {/* 题目 */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-relaxed">
                {currentQuestionData.text}
              </h2>

              {/* 选项 */}
              <div className="space-y-4">
                {currentQuestionData.options.map((option) => {
                  const isSelected = answers[currentQuestion] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-indigo-500 bg-indigo-500' 
                            : 'border-gray-300 dark:border-gray-500'
                        }`}>
                          <span className={`text-sm font-semibold ${
                            isSelected ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {option.id}
                          </span>
                        </div>
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* 导航按钮 */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6"
            >
              ← 上一题
            </Button>

            <div className="flex space-x-4">
              {currentQuestion < CITY_PERSONALITY_QUESTIONS.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === null}
                  className="px-6"
                >
                  下一题 →
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={answeredCount < CITY_PERSONALITY_QUESTIONS.length}
                  className="px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  完成测试 ✓
                </Button>
              )}
            </div>
          </div>

          {/* 题目导航 */}
          <Card className="mt-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">题目导航</h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                      index === currentQuestion
                        ? 'bg-indigo-500 text-white'
                        : answer !== null
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}