'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scl90' | 'adhd' | 'city_personality'>('scl90');

  const knowledgeData = {
    scl90: {
      title: "关于 SCL-90 倾向自测",
      subtitle: "更全面地觉察内心的阴晴圆缺",
      description: "SCL-90 (Symptom Checklist-90) 是全球心理健康领域应用最广泛的自查工具之一。在我们的平台，它不是为了给出诊断，而是作为一面多面镜，帮助你从十个不同的观察视角，觉察近期身心状态的细微波动。",
      highlights: [
        { icon: "sentiment_satisfied", label: "生理感应", desc: "由于情绪波动引起的身体不适感" },
        { icon: "psychology", label: "思维特质", desc: "一些难以控制的重复念头或行为" },
        { icon: "mood_bad", label: "情绪起伏", desc: "内心对于压力与环境的即时响应" },
        { icon: "groups", label: "社交磁场", desc: "在人群中感受到的能量与舒适感" }
      ],
      usage: "适合感到压力较大、情绪波动、或想要进行周期性“心灵体检”的时刻。通过这些维度的观察，你可以更清晰地捕捉到那些被忽视的内心信号。"
    },
    adhd: {
      title: "关于 ADHD 行为特质",
      subtitle: "理解大脑独特的运作节奏",
      description: "ADHD（注意缺陷多动障碍）特质在成年人身上往往表现得更为隐蔽。它可能关联着你的创造力、直觉力，同时也伴随着专注力的挑战。这个测评旨在帮助你理解自己的行为模式，而非简单的判断。",
      highlights: [
        { icon: "target", label: "专注广度", desc: "注意力在任务间的跳转" },
        { icon: "bolt", label: "行动驱动", desc: "大脑对多巴胺的独特需求" },
        { icon: "speed", label: "执行特质", desc: "规划与启动任务的节奏" },
        { icon: "auto_stories", label: "思维跃动", desc: "天马行空的联想能力" }
      ],
      usage: "如果你常觉得'明明想做却动不起来'，或者生活总是在'极度专注'与'极度涣散'间切换，这份测评将为你提供一个新的理解坐标。"
    },
    city_personality: {
      title: "关于城市性格测试",
      subtitle: "发现你与城市的精神契合",
      description: "基于经典MBTI人格理论，通过36道精心设计的问题，探索你的性格特质与全国34个主要城市的匹配度。每座城市都有其独特的性格气质，找到与你最契合的那一个。",
      highlights: [
        { icon: "location_city", label: "城市匹配", desc: "34个省会城市的性格画像" },
        { icon: "psychology_alt", label: "MBTI理论", desc: "四个维度的科学性格分析" },
        { icon: "explore", label: "个性洞察", desc: "深度了解自己的性格特质" },
        { icon: "map", label: "生活指导", desc: "为人生选择提供新的视角" }
      ],
      usage: "无论你是在考虑城市发展，还是单纯想了解自己的性格特质，这个测试都能为你提供有趣且有价值的洞察。通过MBTI维度分析，发现最适合你的城市气质。"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - More Compact */}
        <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-400/10 blur-[80px] rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 tracking-wide">内心探索空间</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight tracking-tight">
              遇见未知的自己<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">探寻内心的平衡</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-8">
              基于经典心理工具，为您提供深度的自我探索视角。
            </p>
          </div>
        </section>

        {/* Test Selection Section - Prominent & Compact */}
        <section id="test-selection" className="pb-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* SCL-90 测试卡片 */}
              <Card className="p-0 overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-transparent dark:from-blue-900/10 dark:via-slate-900 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 text-[10px] font-bold uppercase">经典自测</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">SCL-90 倾向自测</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug mb-4 line-clamp-2">
                      多维度觉察当前的情绪与状态，帮助您更好地了解自己。
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">timer</span> 12min
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">quiz</span> 90题
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-50 dark:border-slate-700">
                    <Link href="/scl90/nickname">
                      <Button variant="primary" className="w-full rounded-xl font-bold py-5 shadow-md shadow-blue-500/10">
                        开启探索之旅
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* ADHD 测试卡片 */}
              <Card className="p-0 overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="p-6 bg-gradient-to-br from-indigo-50/50 via-white to-transparent dark:from-indigo-900/10 dark:via-slate-900 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">lightbulb</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 text-[10px] font-bold uppercase">专注特质</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">ADHD 特质自测</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug mb-4 line-clamp-2">
                      了解您在日常工作与学习中的专注特质与行动风格。
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">timer</span> 8min
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">quiz</span> 43题
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-50 dark:border-slate-700">
                    <Link href="/adhd/nickname">
                      <Button variant="primary" className="w-full rounded-xl font-bold py-5 shadow-md shadow-indigo-500/10 bg-indigo-600 hover:bg-indigo-700 border-indigo-600">
                        开启探索之旅
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* 城市性格测试卡片 */}
              <Card className="p-0 overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="p-6 bg-gradient-to-br from-purple-50/50 via-white to-transparent dark:from-purple-900/10 dark:via-slate-900 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">location_city</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 text-[10px] font-bold uppercase">城市匹配</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">城市性格测试</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug mb-4 line-clamp-2">
                      基于MBTI理论，发现你的性格与城市的完美契合。
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">timer</span> 15min
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="material-symbols-outlined text-sm">quiz</span> 36题
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-50 dark:border-slate-700">
                    <Link href="/city-personality/nickname">
                      <Button variant="primary" className="w-full rounded-xl font-bold py-5 shadow-md shadow-purple-500/10 bg-purple-600 hover:bg-purple-700 border-purple-600">
                        开启探索之旅
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* More Coming Soon - Inline & Quiet */}
            <div className="mt-8 text-center">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 inline-block px-4 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                更多自测维度持续更新：九型人格、压力感、内在色彩...
              </p>
            </div>
          </div>
        </section>

        {/* Knowledge Base Section - New */}
        <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">心灵百科</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">深度了解测评背后的科学逻辑与自我探索的意义</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              {/* Tabs Header */}
              <div className="flex border-b border-slate-100 dark:border-slate-700 p-1 bg-slate-50/80 dark:bg-slate-900/40">
                <button
                  onClick={() => setActiveTab('scl90')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'scl90'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  SCL-90 科普
                </button>
                <button
                  onClick={() => setActiveTab('adhd')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'adhd'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  ADHD 科普
                </button>
                <button
                  onClick={() => setActiveTab('city_personality')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'city_personality'
                    ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  城市性格 科普
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 mb-3">
                        {knowledgeData[activeTab].subtitle}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        {knowledgeData[activeTab].title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                        {knowledgeData[activeTab].description}
                      </p>

                      <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-blue-500 text-xl">info</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                            {knowledgeData[activeTab].usage}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-72 grid grid-cols-2 gap-3">
                      {knowledgeData[activeTab].highlights.map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700/30 text-center flex flex-col items-center justify-center group hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
                          <span className="material-symbols-outlined text-2xl text-slate-400 dark:text-slate-500 mb-2 group-hover:scale-110 group-hover:text-blue-500 transition-all">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{item.label}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle disclaimer below knowledge base */}
            <p className="mt-6 text-center text-[10px] text-slate-400 dark:text-slate-500">
              * 这里的科普信息仅供参考，不作为医学诊断建议。如有严重困扰，请咨询专业心理咨询机构或医疗机构。
            </p>
          </div>
        </section>

        {/* Simplified Info Grid */}
        <section className="py-16 bg-white dark:bg-slate-800/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">专业解析</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">基于经典模型，提供深度的非医疗参考视角。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">shield_person</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">隐私保护</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">加密存储，确保您的探索记录仅对自己可见。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">self_care</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">自我关怀</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">不作为诊断依据，旨在引导您更好地照料内心。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Area */}
        <section className="pb-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex flex-col gap-3 p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
                <span className="material-symbols-outlined text-xl">gavel</span>
                <span>专业声明</span>
              </div>
              <p className="text-rose-800 dark:text-rose-300 text-sm leading-relaxed">
                本平台提供的全过程评测及报告仅作为<strong className="mx-1 underline text-rose-700 dark:text-rose-400">自我探索与初步筛查</strong>使用。
                <br />
                测评结果深受个人主观状态影响，<strong className="font-bold">不具有任何法律及临床医疗诊断效力</strong>。
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Dev Tools (Fixed Bottom Left) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 left-6 z-50">
          <Link href="/dev/test">
            <Button variant="outline" size="sm" className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl border-red-500/20 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              <span className="material-symbols-outlined text-[16px] mr-1">bug_report</span>
              调试中心
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
