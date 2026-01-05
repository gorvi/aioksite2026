import Link from 'next/link';

export default function PlaceholderPage({
    title,
    subtitle,
    content
}: {
    title: string;
    subtitle: string;
    content?: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#07090f] text-white flex flex-col selection:bg-indigo-500/30">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
            </div>

            <nav className="relative z-10 flex justify-between items-center px-6 py-8 sm:px-12">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <span className="font-black text-xl tracking-tighter italic">A</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">AIOK<span className="text-indigo-500">.SITE</span></span>
                </Link>
            </nav>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-20 text-center">
                <div className="max-w-3xl w-full">
                    <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">{title}</h1>
                    <p className="text-indigo-400 font-mono tracking-widest uppercase mb-12 opacity-80">{subtitle}</p>

                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 text-left mb-12 shadow-2xl">
                        {content || (
                            <div className="space-y-6 text-slate-300 leading-relaxed text-lg text-center">
                                <p>我们正在全力研发此模块，致力于为您提供极致的 AI 体验。</p>
                                <p>如有任何建议或商务合作需求，欢迎联系作者：</p>
                                <div className="inline-block px-8 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                                    <span className="text-slate-400 mr-2">微信：</span>
                                    <span className="text-indigo-400 font-bold text-xl">aioksite</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/">
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            返回首页
                        </button>
                    </Link>
                </div>
            </main>

            <footer className="relative z-10 px-8 py-12 border-t border-slate-900/50 flex flex-col items-center gap-4 text-slate-500 text-sm">
                <p>&copy; 2024 AIOK.SITE · 沪ICP备2024050729号-3</p>
            </footer>
        </div>
    );
}
