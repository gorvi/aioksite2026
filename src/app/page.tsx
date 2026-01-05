'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';



export default function PortalPage() {
    const products = [
        {
            id: 'tests',
            title: '心灵探索',
            subtitle: 'Psychological Insights',
            description: '基于 SCL-90、ADHD 等经典量表，利用 AI 提供深度行为觉察与心灵自省视角。',
            icon: 'psychology',
            color: 'from-blue-500 to-indigo-600',
            link: '/tests',
            status: 'active',
            tag: '热门'
        },
        {
            id: 'ai-tools',
            title: 'AI 效率工坊',
            subtitle: 'Smart Productivity',
            description: '集成最前沿的 AI 能力，助你处理复杂文档、创意写作及工作流自动化。',
            icon: 'bolt',
            color: 'from-amber-400 to-orange-600',
            link: '/smart-productivity',
            status: 'upcoming',
            tag: '即将上线'
        },
        {
            id: 'creative',
            title: '灵感实验室',
            subtitle: 'Creative Lab',
            description: '探索 AI 与艺术的边界，生成独特视角的创意内容与多媒体素材。',
            icon: 'palette',
            color: 'from-purple-500 to-pink-600',
            link: '/creative-lab',
            status: 'upcoming',
            tag: '开发中'
        }
    ];

    return (
        <div className="min-h-screen bg-[#07090f] text-white flex flex-col selection:bg-indigo-500/30">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full"></div>
            </div>

            <nav className="relative z-10 flex justify-between items-center px-6 py-8 sm:px-12">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="font-black text-xl tracking-tighter italic">A</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">AIOK<span className="text-indigo-500">.SITE</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link href="/" className="text-white">发现</Link>
                    <Link href="/about" className="hover:text-white transition-colors">关于</Link>
                </div>
            </nav>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-20">
                {/* Hero Section */}
                <div className="text-center mb-20 max-w-4xl">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                        AI-Powered Ecosystem
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                        连接 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI</span> 的无限可能
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        AIOK 致力于打造极致的 AI 生产力与自我探索工具箱，<br className="hidden sm:block" />
                        让前沿科技触手可及，赋能每一个独立个体。
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            {/* Card Wrapper */}
                            <div className={`h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col transition-all duration-500 hover:border-slate-700 hover:-translate-y-2 ${product.status === 'upcoming' ? 'opacity-70' : ''}`}>

                                {/* Product Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                    <span className="material-symbols-outlined text-3xl font-light">{product.icon}</span>
                                </div>

                                {/* Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${product.status === 'active' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'
                                        }`}>
                                        {product.tag}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
                                    <p className="text-xs text-indigo-400 font-mono tracking-wider uppercase opacity-60">{product.subtitle}</p>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                                    {product.description}
                                </p>

                                {product.status === 'active' ? (
                                    <Link href={product.link}>
                                        <div className="w-full bg-slate-100 text-slate-900 border border-white/50 hover:bg-white active:scale-[0.98] rounded-xl py-4 font-bold flex items-center justify-center gap-2 group-hover:gap-4 transition-all cursor-pointer shadow-lg shadow-white/5">
                                            进入应用
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={product.link}>
                                        <div className="w-full bg-slate-800/50 text-slate-500 border border-slate-700/50 hover:border-slate-600 transition-colors rounded-xl py-4 font-bold flex items-center justify-center cursor-pointer">
                                            敬请期待
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Outer Glow on Hover */}
                            <div className={`absolute -inset-px bg-gradient-to-br ${product.color} rounded-3xl opacity-0 blur-xl group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="relative z-10 px-8 py-12 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex items-center gap-2 border-r border-slate-800 pr-6">
                        <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">A</div>
                        <span className="font-medium">&copy; 2024-2026 AIOK.SITE</span>
                    </div>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                        沪ICP备2024050729号-3
                    </a>
                </div>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-white transition-colors">隐私条款</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">使用协议</Link>
                    <Link href="/about" className="hover:text-white transition-colors underline underline-offset-4 decoration-indigo-500/50">联系作者</Link>
                </div>
            </footer>
        </div>
    );
}
