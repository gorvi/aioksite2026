'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Disclaimer from '@/components/common/Disclaimer';
import { calculateAdhdFullResult } from '@/lib/utils/adhd-full-calculator';
import { exportAsImage, shareImage } from '@/lib/utils/export-result';
import { logUserAction } from '@/lib/utils/log-action';
import CuteDecoration from '@/components/common/CuteDecoration';
import Header from '@/components/common/Header';
import RadarChartComponent from '@/components/common/RadarChart';
import type { AdhdTest } from '@/types';

export default function AdhdFullResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<Omit<AdhdTest, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // 随机可爱 emoji（使用 useState 确保每次页面加载时固定）
  const [randomEmoji] = useState(() => {
    const cuteEmojis = ['✨', '🌟', '💫', '⭐', '🎉', '💖', '🌸', '🌈', '🦋', '☁️', '🚀', '💡'];
    return cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
  });

  // 生成报告编号：年月日时分秒毫秒+2位随机数
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
    // 从 sessionStorage 获取答案数据
    const testData = sessionStorage.getItem('adhd_full_test_result');
    if (!testData) {
      router.push('/adhd');
      return;
    }

    try {
      const { answers, serialNumber } = JSON.parse(testData);
      const nickname = sessionStorage.getItem('adhd_nickname') || '';
      const reportNumber = generateReportNumber();

      const calculatedResult = calculateAdhdFullResult(answers, serialNumber);

      // 添加昵称和报告编号
      const resultWithMeta = {
        ...calculatedResult,
        nickname: nickname || null,
        report_number: reportNumber,
      };

      setResult(resultWithMeta);
    } catch (error) {
      console.error('Failed to calculate result:', error);
      router.push('/adhd');
    }
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </main>
    );
  }

  const tendencyLabels = {
    low: '低',
    medium: '中',
    high: '高',
  };

  const handleDownload = async () => {
    if (!result) return;

    // 记录行为
    logUserAction({
      actionType: 'download_result',
      testType: 'adhd',
      testId: sessionStorage.getItem('adhd_test_id'),
      nickname: result.nickname
    });

    setIsExporting(true);
    try {
      const filename = `ADHD完整版测评结果_${new Date(result.test_date).toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`;
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

    // 记录行为
    logUserAction({
      actionType: 'share_result',
      testType: 'adhd',
      testId: sessionStorage.getItem('adhd_test_id'),
      nickname: result.nickname
    });

    setIsSharing(true);
    try {
      const shareText = `我的 ADHD 倾向自测结果（完整版）：${tendencyLabels[result.tendency_level as keyof typeof tendencyLabels]}等倾向 ✨`;
      await shareImage('result-card', 'ADHD 完整版测评结果', shareText);
    } catch (error) {
      console.error('分享失败:', error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  // 判断综合判定类型
  const getAssessmentType = () => {
    if (!result.asrs_score || !result.wurs_score) return null;

    if (result.asrs_score >= 24 && result.wurs_score >= 46) {
      return {
        type: 'typical',
        title: '典型特征模式',
        description: '你的测试结果显示，注意力、执行力和行为特征在成年期和童年期都有明显表现，符合跨周期发展的特征模式。',
      };
    } else if (result.asrs_score >= 24 && result.wurs_score < 36) {
      return {
        type: 'late_onset',
        title: '后发/类特征模式',
        description: '当前注意力表现显著，但童年背景相对较弱。可能需要关注成年期压力或焦虑等因素的影响。',
      };
    } else if (result.asrs_score < 17 && result.wurs_score >= 46) {
      return {
        type: 'compensated',
        title: '代偿性模式',
        description: '童年期特征明显，但当前表现相对不突出。可能通过代偿策略掩盖了部分特征，但背后可能存在心理内耗。',
      };
    } else {
      return {
        type: 'low_risk',
        title: '表现较低',
        description: '未达阈值，表现可能由临时性环境因素引起。',
      };
    }
  };

  const assessmentType = getAssessmentType();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header title="ADHD 倾向测评" showBack backUrl="/tests" />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 可导出的结果卡片区域 */}
            <div id="result-card" className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

              {/* 顶部装饰条 */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>

              {/* 报告头部 */}
              <div className="px-8 py-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-b border-indigo-100 dark:border-slate-600">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-4">
                    <span className="text-3xl">🧩</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    ADHD 深度行为觉察报告
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-indigo-600 dark:text-indigo-400">👤</span>
                      <span className="font-medium">{result.nickname || '匿名用户'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-indigo-600 dark:text-indigo-400">📅</span>
                      <span className="font-mono">{new Date(result.test_date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    {result.report_number && (
                      <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="text-indigo-600 dark:text-indigo-400">🔖</span>
                        <span className="font-mono text-xs">NO.{result.report_number}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 主要内容区 */}
              <div className="p-8 space-y-8">

                {/* 综合测评结论 - SCL-90 风格的大卡片 */}
                {assessmentType && (
                  <div className={`relative overflow-hidden rounded-2xl p-8 text-center border-2 transition-all ${assessmentType.type === 'typical' ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800' :
                    assessmentType.type === 'low_risk' ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' :
                      'bg-gradient-to-br from-yellow-50 to-indigo-50 dark:from-yellow-900/20 dark:to-indigo-900/20 border-yellow-200 dark:border-yellow-800'
                    }`}>
                    <div className="relative z-10">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">探索观察</span>
                        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${assessmentType.type === 'typical' ? 'text-red-700 dark:text-red-300' :
                          assessmentType.type === 'low_risk' ? 'text-green-700 dark:text-green-300' :
                            'text-yellow-700 dark:text-yellow-300'
                          }`}>
                          {assessmentType.title}
                        </h2>
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {assessmentType.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* 核心数据展示 - SCL-90 风格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ASRS 核心量表 */}
                  {/* ASRS 评分条已经在仪表盘区域展示，这里保持与之前设计一致 */}
                </div>

                {/* 仪表盘区域：分数与雷达图 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 relative z-10">
                  {/* 左侧：核心指标卡片 */}
                  <Card className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        多维特征透视
                      </h3>

                      <div className="space-y-4">
                        {/* ASRS 评分条 */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">当前行为风格回顾</span>
                            <div className="text-right">
                              <span className={`text-xl font-bold ${result.asrs_score >= 24 ? 'text-red-500' :
                                result.asrs_score >= 17 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {result.asrs_score}
                              </span>
                              <span className="text-xs text-slate-400"> / 72</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${result.asrs_score >= 24 ? 'bg-red-500' :
                              result.asrs_score >= 17 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} style={{ width: `${(result.asrs_score / 72) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.asrs_score >= 24 ? '特征表现较为显著' : result.asrs_score >= 17 ? '存在一定相关特征' : '暂未发现典型特征'}
                          </p>
                        </div>

                        {/* WURS 评分条 */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">早期成长特质回溯</span>
                            <div className="text-right">
                              <span className={`text-xl font-bold ${result.wurs_score >= 46 ? 'text-red-500' :
                                result.wurs_score >= 36 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                {result.wurs_score}
                              </span>
                              <span className="text-xs text-slate-400"> / 100</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${result.wurs_score >= 46 ? 'bg-red-500' :
                              result.wurs_score >= 36 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} style={{ width: `${(result.wurs_score / 100) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {result.wurs_score >= 46 ? '早期特征表现显著' : result.wurs_score >= 36 ? '早期存在一定特征' : '早期特征表现不明显'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 右侧：多维雷达图 */}
                  <Card className="p-4 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <span className="text-xl">🧭</span>
                      特质平衡分布
                    </h3>
                    <div className="flex-1 flex items-center justify-center py-4">
                      <RadarChartComponent
                        data={[
                          { subject: '注意力', A: result.dimension_scores.attention, fullMark: 4 },
                          { subject: '执行力', A: result.dimension_scores.execution, fullMark: 4 },
                          { subject: '多动/冲动', A: result.dimension_scores.hyperactivity, fullMark: 4 },
                        ]}
                        height={280}
                      />
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="text-2xl">📌</span>
                      各维度细分观察
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { label: '注意力维度', score: result.dimension_scores.attention, status: result.dimension_labels.attention, icon: '🧠', color: 'blue' },
                        { label: '执行力维度', score: result.dimension_scores.execution, status: result.dimension_labels.execution, icon: '⏱️', color: 'indigo' },
                        { label: '多动/冲动维度', score: result.dimension_scores.hyperactivity, status: result.dimension_labels.hyperactivity, icon: '⚡', color: 'purple' }
                      ].map((dim, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border-l-4 bg-slate-50 dark:bg-slate-800 ${dim.status === '偏高' ? 'border-red-500' :
                          dim.status === '中等' ? 'border-yellow-500' : 'border-green-500'
                          }`}>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{dim.icon}</span>
                              <span className="font-bold text-slate-800 dark:text-slate-100">{dim.label}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-black text-slate-900 dark:text-white">{dim.score.toFixed(1)}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${dim.status === '偏高' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300' :
                                dim.status === '中等' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300' :
                                  'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300'
                                }`}>
                                {dim.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* 成长探索建议 - SCL-90 风格的高亮区域 */}
                {result.suggestions.length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border border-indigo-100 dark:border-slate-600 shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      成长探索建议
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-3 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center text-sm shadow-sm">
                            {index + 1}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* 温馨寄语 */}
                <Card className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-100 dark:border-teal-800">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">💝</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">给自己的寄语</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "每个人都有独特的大脑运作模式。这些分数不是评判优劣的标签，而是帮助你理解自己的地图。接纳真实的自己，找到适合自己的节奏，就是最好的生活方式。"
                      </p>
                    </div>
                  </div>
                </Card>

                {/* 免责声明 */}
                <Disclaimer />
              </div>
            </div>

            {/* 操作操作区域 */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" className="flex items-center justify-center gap-2 min-w-[200px] shadow-xl shadow-indigo-500/20" onClick={handleDownload} disabled={isExporting}>
                  <span className="text-xl">📥</span>
                  {isExporting ? '生成报告中...' : '下载报告图片'}
                </Button>
                <Button variant="outline" size="lg" className="flex items-center justify-center gap-2 min-w-[200px] shadow-lg bg-white dark:bg-slate-800" onClick={handleShare} disabled={isSharing}>
                  <span className="text-xl">📤</span>
                  {isSharing ? '正在重定向...' : '分享测量结果'}
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => router.push('/adhd/full/quiz')}>重新测试</Button>
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => router.push('/tests')}>返回首页</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
