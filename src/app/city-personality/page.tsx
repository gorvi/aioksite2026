'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import CuteDecoration from '@/components/common/CuteDecoration';

export default function CityPersonalityTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 主标题区域 */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                城市性格测试
              </h1>
              <CuteDecoration className="absolute -top-2 -right-8" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              基于MBTI理论，发现你的性格与城市的完美契合
            </p>
          </div>

          {/* 测试说明卡片 */}
          <Card className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="text-2xl mr-3">🏙️</span>
                测试说明
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-500 font-semibold">•</span>
                  <p><strong>测试内容：</strong>36道精心设计的性格问题，涵盖外向/内向、实感/直觉、思考/情感、判断/感知四个维度</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-500 font-semibold">•</span>
                  <p><strong>测试时长：</strong>约10-15分钟，请在安静的环境下完成</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-500 font-semibold">•</span>
                  <p><strong>测试结果：</strong>获得你的MBTI性格类型，匹配最适合的城市，并获得详细的性格分析报告</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-500 font-semibold">•</span>
                  <p><strong>城市范围：</strong>涵盖全国34个省会城市及直辖市，每个城市都有独特的性格特征</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 特色功能卡片 */}
          <Card className="mb-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="text-2xl mr-3">✨</span>
                测试特色
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">🧠</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">科学理论支撑</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">基于经典MBTI人格理论</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-sm">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">精准城市匹配</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">智能算法匹配最适合城市</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-sm">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">详细结果分析</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">多维度性格特征解读</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 text-sm">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">分享功能</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">生成专属结果图片分享</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 重要提示卡片 */}
          <Card className="mb-8 border-l-4 border-l-amber-400">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center">
                <span className="text-amber-500 mr-2">⚠️</span>
                重要提示
              </h3>
              <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                <p>• 本测试仅供自我了解和娱乐参考使用，不作为专业心理咨询或城市选择的唯一依据</p>
                <p>• 请根据第一直觉诚实回答问题，避免过度思考，这样结果会更准确</p>
                <p>• 城市匹配结果基于性格特征分析，实际城市选择还需考虑工作、家庭等多重因素</p>
                <p>• 如需专业的心理咨询或人生规划建议，请咨询相关专业机构或从业者</p>
              </div>
            </div>
          </Card>

          {/* 开始测试按钮 */}
          <div className="text-center">
            <Link href="/city-personality/nickname">
              <Button 
                size="lg" 
                className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                开始测试 🚀
              </Button>
            </Link>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              点击开始按钮即表示您同意我们的服务条款
            </p>
          </div>

          {/* 返回主页链接 */}
          <div className="text-center mt-8">
            <Link 
              href="/tests" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              ← 返回测试选择页
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}