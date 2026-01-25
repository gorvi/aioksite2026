'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Disclaimer from '@/components/common/Disclaimer';
import CuteDecoration from '@/components/common/CuteDecoration';
import { exportAsImage, shareImage } from '@/lib/utils/export-result';
import { logUserAction } from '@/lib/utils/log-action';
import { generateCityPersonalityShareImage, downloadShareImage, shareGeneratedImage } from '@/lib/utils/xiaohongshu-generator';
import { getCityDescription, generateCityDescriptionText } from '@/lib/data/city-descriptions';
import { getCityConfig } from '@/lib/data/cities-config';
import type { CityPersonalityResult } from '@/types';

interface ResultData extends CityPersonalityResult {
  nickname: string;
  testDate: string;
}

export default function CityPersonalityResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isGeneratingXhs, setIsGeneratingXhs] = useState(false);

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

    return `CP${year}${month}${day}${hour}${minute}${second}${millisecond}${random}`;
  };

  useEffect(() => {
    const resultData = sessionStorage.getItem('city_personality_result');
    if (!resultData) {
      router.push('/city-personality');
      return;
    }

    try {
      const parsedResult = JSON.parse(resultData);
      setResult(parsedResult);
      
      // 记录查看结果行为
      logUserAction('view_city_personality_result', {
        mbti_type: parsedResult.mbtiType,
        matched_city: parsedResult.matchedCity,
        match_percentage: parsedResult.matchPercentage
      });
    } catch (error) {
      console.error('Failed to parse result data:', error);
      router.push('/city-personality');
    }
  }, [router]);

  const handleExport = async () => {
    if (!result || isExporting) return;

    try {
      setIsExporting(true);
      
      await exportAsImage('result-card', `城市性格测试结果-${result.nickname}`);
      
      logUserAction('export_city_personality_result', {
        mbti_type: result.mbtiType,
        matched_city: result.matchedCity
      });
    } catch (error) {
      console.error('Export error:', error);
      alert('导出失败，请稍后重试');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!result || isSharing) return;

    try {
      setIsSharing(true);
      
      const success = await shareImage('result-card', `我的城市性格是${result.mbtiType}，最匹配${result.matchedCity}！快来测测你的城市性格吧～`);
      
      if (success) {
        logUserAction('share_city_personality_result', {
          mbti_type: result.mbtiType,
          matched_city: result.matchedCity
        });
      }
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleGenerateXhsImage = async () => {
    if (!result || isGeneratingXhs) return;

    try {
      setIsGeneratingXhs(true);
      
      const imageDataURL = await generateCityPersonalityShareImage(result, result.nickname);
      const success = await shareGeneratedImage(imageDataURL, `我的城市性格是${result.mbtiType}，最匹配${result.matchedCity}！快来测测你的城市性格吧～`);
      
      logUserAction('generate_xiaohongshu_share', {
        mbti_type: result.mbtiType,
        matched_city: result.matchedCity,
        shared: success
      });
      
      if (!success) {
        // 如果分享失败，提示用户图片已下载
        alert('小红书风格分享图已下载到本地！');
      }
    } catch (error) {
      console.error('Generate Xiaohongshu image error:', error);
      alert('生成分享图失败，请稍后重试');
    } finally {
      setIsGeneratingXhs(false);
    }
  };

  if (!result) {
    return <div>加载中...</div>;
  }

  const cityConfig = getCityConfig(result.matchedCity);
  const cityDescription = getCityDescription(result.matchedCity);
  const reportNumber = generateReportNumber();

  // MBTI类型解释
  const mbtiExplanation = {
    E: '外向型 - 喜欢与外界互动，从社交中获得能量',
    I: '内向型 - 喜欢独处思考，从内心获得能量',
    S: '实感型 - 注重具体事实和细节，务实导向',
    N: '直觉型 - 关注可能性和潜力，创新导向',
    T: '思考型 - 以逻辑和客观分析做决定',
    F: '情感型 - 考虑人际关系和价值观做决定',
    J: '判断型 - 喜欢有计划和条理的生活',
    P: '感知型 - 喜欢灵活和适应性的生活'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div id="result-card" className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            {/* 标题区域 */}
            <div className="text-center relative">
              <div className="inline-block relative">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  城市性格测试报告
                </h1>
                <CuteDecoration className="absolute -top-2 -right-8" />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  测试者：<span className="font-semibold">{result.nickname}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  报告编号：{reportNumber} | 测试时间：{new Date(result.testDate).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>

            {/* 核心结果 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">{cityConfig?.colorTheme ? '🏙️' : '🌟'}</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {result.matchedCity}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {cityConfig?.nickname && `${cityConfig.nickname} · `}你的命定城市
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {result.mbtiType}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        MBTI类型
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {result.matchPercentage}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        匹配度
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {cityConfig?.description || `${result.matchedCity}是最适合你的城市！`}
                </div>
              </div>
            </Card>

            {/* MBTI类型解析 */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="text-2xl mr-3">🧠</span>
                  你的性格类型：{result.mbtiType}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {result.mbtiType.split('').map((letter, index) => {
                    const key = letter as keyof typeof mbtiExplanation;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                          {letter}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {mbtiExplanation[key]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 性格标签 */}
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">你的性格标签：</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.personalityTags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 城市特色 */}
            {cityConfig && (
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">🏛️</span>
                    {result.matchedCity}的特色
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">城市标签：</h4>
                      <div className="flex flex-wrap gap-2">
                        {cityConfig.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">城市特征：</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {cityConfig.detailedFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 详细分析 */}
            {cityDescription && (
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    详细分析
                  </h3>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {generateCityDescriptionText(result.matchedCity)}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 维度得分 */}
            {result.dimensionScores && (
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    维度得分详情
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(result.dimensionScores).map(([dimension, score]) => {
                      const dimensionNames = {
                        'E_I': '外向/内向',
                        'S_N': '实感/直觉', 
                        'T_F': '思考/情感',
                        'J_P': '判断/感知'
                      };
                      const name = dimensionNames[dimension as keyof typeof dimensionNames];
                      const percentage = ((score - 9) / 9) * 100; // 9-18 转换为 0-100%
                      
                      return (
                        <div key={dimension} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {score}/18
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              isLoading={isExporting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              📸 下载报告图片
            </Button>
            
            <Button
              onClick={handleShare}
              disabled={isSharing}
              isLoading={isSharing}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              📤 分享结果
            </Button>
          </div>

          {/* 小红书风格分享 */}
          <div className="mt-4">
            <Button
              onClick={handleGenerateXhsImage}
              disabled={isGeneratingXhs}
              isLoading={isGeneratingXhs}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg"
              size="lg"
            >
              🌟 生成小红书风格分享图
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              专为社交媒体优化的精美分享图片
            </p>
          </div>

          {/* 重新测试 */}
          <div className="text-center mt-8">
            <Link href="/city-personality">
              <Button variant="outline" className="px-8">
                🔄 重新测试
              </Button>
            </Link>
          </div>

          {/* 其他测试推荐 */}
          <Card className="mt-8">
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                探索更多测试
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/scl90">
                  <Button variant="outline" size="sm">
                    SCL-90 心理健康自测
                  </Button>
                </Link>
                <Link href="/adhd">
                  <Button variant="outline" size="sm">
                    ADHD 倾向自测
                  </Button>
                </Link>
                <Link href="/tests">
                  <Button variant="outline" size="sm">
                    查看全部测试
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* 免责声明 */}
          <div className="mt-8">
            <Disclaimer />
          </div>
        </div>
      </main>
    </div>
  );
}