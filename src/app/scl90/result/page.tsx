'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Disclaimer from '@/components/common/Disclaimer';
import Header from '@/components/common/Header';
import { calculateScl90Result } from '@/lib/utils/scl90-calculator';
import { SCL90_DIMENSION_NAMES } from '@/lib/data/scl90-questions';
import { SCL90_NORMS, SCL90_LEVEL_LABELS, SCL90_TOTAL_NORM } from '@/lib/data/scl90-norms';
import { SCL90_SUGGESTIONS, GENERAL_WELLBEING_SUGGESTIONS } from '@/lib/data/scl90-suggestions';
import { exportAsImage, shareImage } from '@/lib/utils/export-result';
import { logUserAction } from '@/lib/utils/log-action';
import RadarChartComponent from '@/components/common/RadarChart';
import type { Scl90Test } from '@/types';

export default function Scl90ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<Omit<Scl90Test, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const generateReportNumber = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0');
    const random = String(Math.floor(Math.random() * 100)).padStart(2, '0');

    return `${year}${month}${day}${hour}${minute}${second}${millisecond}${random}`;
  };

  useEffect(() => {
    const testData = sessionStorage.getItem('scl90_test_result');
    if (!testData) {
      router.push('/scl90');
      return;
    }

    try {
      const { answers, serialNumber } = JSON.parse(testData);
      const nickname = sessionStorage.getItem('scl90_nickname') || '';
      const reportNumber = generateReportNumber();

      const calculatedResult = calculateScl90Result(answers, serialNumber);

      const resultWithMeta = {
        ...calculatedResult,
        nickname: nickname || null,
        report_number: reportNumber,
      };

      setResult(resultWithMeta);
    } catch (error) {
      console.error('Failed to calculate result:', error);
      router.push('/scl90');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
        <Header title="SCL-90 心理测评" showBack backUrl="/tests" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">正在生成您的专属报告...</p>
          </div>
        </main>
      </div>
    );
  }

  const statusLabels = {
    stable: '心理状态整体稳定',
    pressure: '存在一定心理压力',
    obvious: '心理困扰较明显',
  };

  const statusDescriptions = {
    stable: '您的各项指标基本正常，情绪状态平稳。请继续保持良好的生活方式。',
    pressure: '您最近可能感受到了一些压力，某些指标略显波动。建议适当调节心情，注意休息。',
    obvious: '您的测试结果显示部分维度得分较高，可能这阵子比较辛苦。建议密切关注自己的状态，必要时寻求专业支持。',
  };

  const statusIcons = {
    stable: '😊',
    pressure: '😐',
    obvious: '😟',
  };

  const handleDownload = async () => {
    if (!result) return;

    logUserAction({
      actionType: 'download_result',
      testType: 'scl90',
      testId: sessionStorage.getItem('scl90_test_id'),
      nickname: result.nickname
    });

    setIsExporting(true);
    try {
      const filename = `SCL-90心理测评报告_${new Date(result.test_date).toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`;
      await exportAsImage('result-card', filename);
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  const handleShare = async () => {
    if (!result) return;

    logUserAction({
      actionType: 'share_result',
      testType: 'scl90',
      testId: sessionStorage.getItem('scl90_test_id'),
      nickname: result.nickname
    });

    setIsSharing(true);
    try {
      const shareText = `我的 SCL-90 心理测评：总分 ${result.raw_total_score || 0} 分 | ${statusLabels[result.overall_status]}`;
      await shareImage('result-card', 'SCL-90 心理测评报告', shareText);
    } catch (error) {
      console.error('分享失败:', error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  const radarData = Object.entries(result.factor_scores).map(([key, score]) => ({
    subject: SCL90_DIMENSION_NAMES[key as keyof typeof SCL90_DIMENSION_NAMES],
    A: score,
    fullMark: 4,  // 标准SCL-90：0-4分制
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header title="SCL-90 心理测评" showBack backUrl="/tests" />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* 可导出的结果卡片区域 */}
            <div id="result-card" className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

              {/* 顶部装饰条 */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

              {/* 报告头部 */}
              <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-b border-blue-100 dark:border-slate-600">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-4">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    SCL-90 心理健康自测报告
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-blue-600 dark:text-blue-400">👤</span>
                      <span className="font-medium">{result.nickname || '匿名用户'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-blue-600 dark:text-blue-400">📅</span>
                      <span className="font-mono">{new Date(result.test_date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    {result.report_number && (
                      <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="text-blue-600 dark:text-blue-400">🔖</span>
                        <span className="font-mono text-xs">NO.{result.report_number}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 主要内容区 */}
              <div className="p-8 space-y-8">

                {/* 整体评估卡片 - 大而醒目 */}
                <div className={`relative overflow-hidden rounded-2xl p-8 text-center ${result.overall_status === 'stable' ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800' :
                  result.overall_status === 'pressure' ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800' :
                    'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800'
                  }`}>
                  <div className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none">
                    {statusIcons[result.overall_status]}
                  </div>
                  <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 backdrop-blur-sm">
                      整体评估
                    </div>
                    <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${result.overall_status === 'stable' ? 'text-green-700 dark:text-green-300' :
                      result.overall_status === 'pressure' ? 'text-yellow-700 dark:text-yellow-300' :
                        'text-red-700 dark:text-red-300'
                      }`}>
                      {statusLabels[result.overall_status]}
                    </h2>
                    <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                      {statusDescriptions[result.overall_status]}
                    </p>
                  </div>
                </div>

                {/* 关键数据展示 - 2列紧凑布局 */}
                <div className="grid grid-cols-2 gap-3">
                  {/* 总分 - 仪表盘样式 */}
                  <div className="col-span-2">
                    <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-xl overflow-hidden">
                      {/* 背景装饰 */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      
                      <div className="relative z-10">
                        <div className="text-blue-100 text-xs font-medium mb-3 flex items-center gap-1">
                          <span>总分</span>
                        </div>
                        
                        {/* 仪表盘主体 */}
                        <div className="flex items-center justify-between">
                          {/* 左侧：半圆仪表盘 */}
                          <div className="relative w-32 h-20">
                            {/* 背景半圆 */}
                            <svg viewBox="0 0 120 60" className="w-full h-full">
                              {/* 背景轨道 */}
                              <path
                                d="M 10 55 A 50 50 0 0 1 110 55"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="12"
                                strokeLinecap="round"
                              />
                              {/* 进度弧 */}
                              <path
                                d="M 10 55 A 50 50 0 0 1 110 55"
                                fill="none"
                                stroke="white"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${((result.raw_total_score || 0) / 360) * 157} 157`}
                                className="transition-all duration-1000"
                              />
                              {/* 指针三角形 */}
                              <g transform={`rotate(${-90 + ((result.raw_total_score || 0) / 360) * 180} 60 55)`}>
                                <polygon
                                  points="60,30 58,55 62,55"
                                  fill="white"
                                  opacity="0.9"
                                />
                              </g>
                            </svg>
                            {/* 中心数值 */}
                            <div className="absolute inset-0 flex items-end justify-center pb-1">
                              <div className="text-center">
                                <div className="text-2xl font-bold leading-none">{result.raw_total_score || 0}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 右侧：分数说明 */}
                          <div className="flex-1 ml-4">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-4xl font-bold">{result.raw_total_score || 0}</span>
                              <span className="text-blue-200 text-sm">/ 360 分</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-blue-100">
                              <span className="px-2 py-0.5 bg-white/20 rounded">0-4 分制</span>
                              <span>90题×4分</span>
                            </div>
                          </div>
                          
                          {/* 装饰图标 */}
                          <div className="text-5xl opacity-10 absolute right-4 top-4">📊</div>
                        </div>
                        
                        {/* 健康水平文字 */}
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="text-xs text-blue-100">
                            心理健康水平：
                            <span className="ml-1 font-semibold text-white">
                              {result.overall_status === 'stable' ? '良好' : 
                               result.overall_status === 'pressure' ? '一般' : '需关注'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 总均分 */}
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-purple-100 text-xs font-medium mb-1">总均分</div>
                        <div className="text-3xl font-bold">{result.total_score.toFixed(2)}</div>
                      </div>
                      <div className="text-3xl opacity-20">📈</div>
                    </div>
                    <div className="text-purple-200 text-xs">0-4 分制</div>
                  </div>

                  {/* 阳性项目 */}
                  <div className={`rounded-xl p-4 text-white shadow-lg ${(result.positive_items_count || 0) > 43
                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                    : 'bg-gradient-to-br from-green-500 to-teal-600'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-white/90 text-xs font-medium mb-1">阳性项目</div>
                        <div className="text-3xl font-bold">{result.positive_items_count || 0}</div>
                      </div>
                      <div className="text-3xl opacity-20">{(result.positive_items_count || 0) > 43 ? '⚠️' : '✅'}</div>
                    </div>
                    <div className="text-white/80 text-xs">/ 90 题</div>
                  </div>
                </div>

                {/* 雷达图 */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    心理维度分布图
                  </h3>
                  <div className="h-96 flex items-center justify-center">
                    <RadarChartComponent
                      data={radarData}
                      height={384}
                    />
                  </div>
                  <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                    蓝色区域越大，表示该维度的困扰程度越高
                  </p>
                </Card>

                {/* 因子得分列表 */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🧩</span>
                    各项因子得分
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(result.factor_scores).map(([key, score]) => {
                      const dimensionName = SCL90_DIMENSION_NAMES[key as keyof typeof SCL90_DIMENSION_NAMES];
                      // 标准SCL-90阈值（0-4分制）：<2.0正常，2.0-2.5轻度，≥2.5明显
                      const isHigh = score >= 2.5;
                      const isModerate = score >= 2.0 && score < 2.5;

                      return (
                        <div key={key} className={`p-3 rounded-xl border-l-4 ${isHigh ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                          isModerate ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                            'bg-green-50 dark:bg-green-900/20 border-green-500'
                          }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 dark:text-white">{dimensionName}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-2xl font-bold ${isHigh ? 'text-red-600 dark:text-red-400' :
                                isModerate ? 'text-yellow-600 dark:text-yellow-400' :
                                  'text-green-600 dark:text-green-400'
                                }`}>
                                {score.toFixed(2)}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${isHigh ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' :
                                isModerate ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                  'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                }`}>
                                {isHigh ? '明显' : isModerate ? '轻度' : '正常'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* 改善建议 */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border border-blue-100 dark:border-slate-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  专业建议
                </h3>
                <div className="space-y-4">
                  {(() => {
                    const highFactors = Object.entries(result.factor_scores)
                      .filter(([_, score]) => score >= 2.0)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3);

                    if (highFactors.length === 0) {
                      const randomGeneralSuggestions = [...GENERAL_WELLBEING_SUGGESTIONS]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4);

                      return (
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl">
                          <h4 className="font-bold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                            <span className="text-xl">🎉</span>
                            您的状态非常棒！
                          </h4>
                          <ul className="space-y-2">
                            {randomGeneralSuggestions.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    return (
                      <>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          针对您当前得分较高的维度，为您定制了以下专属建议：
                        </p>
                        {highFactors.map(([key, score]) => {
                          const factorSuggestions = SCL90_SUGGESTIONS[key] || [];
                          const randomFactorSuggestions = [...factorSuggestions]
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3);

                          return (
                            <div key={key} className="bg-white dark:bg-slate-800 p-5 rounded-xl border-l-4 border-blue-500">
                              <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                                {SCL90_DIMENSION_NAMES[key as keyof typeof SCL90_DIMENSION_NAMES]}
                                <span className="text-sm font-normal text-slate-500 ml-2">
                                  (得分: {score.toFixed(2)})
                                </span>
                              </h4>
                              <ul className="space-y-2">
                                {randomFactorSuggestions.map((suggestion, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              </Card>

              {/* 温馨提示 */}
              <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💝</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">温馨提示</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      测试结果反映的是您当前的心理状态切片，可能会随着环境、生活事件而波动。
                      如果某些指标偏高，不要过于惊慌，这也许是身心在提醒您&quot;需要休息&quot;或&quot;需要关注&quot;的信号。
                    </p>
                  </div>
                </div>
              </Card>

              {/* 免责声明 */}
              <Disclaimer />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-2 min-w-[200px] shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleDownload}
                disabled={isExporting}
              >
                <span className="text-xl">📥</span>
                {isExporting ? '生成中...' : '保存报告'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center gap-2 min-w-[200px] shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleShare}
                disabled={isSharing}
              >
                <span className="text-xl">📤</span>
                分享结果
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                onClick={() => {
                  logUserAction({
                    actionType: 'retake_test',
                    testType: 'scl90',
                    testId: sessionStorage.getItem('scl90_test_id'),
                    nickname: result.nickname
                  });
                  router.push('/scl90/serial');
                }}
              >
                重新测试
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                onClick={() => {
                  logUserAction({
                    actionType: 'back_to_home',
                    testType: 'scl90',
                    testId: sessionStorage.getItem('scl90_test_id'),
                    nickname: result.nickname
                  });
                  router.push('/tests');
                }}
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
