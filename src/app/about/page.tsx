import PlaceholderPage from '@/components/common/PlaceholderPage';

export default function AboutPage() {
    return (
        <PlaceholderPage
            title="关于我们"
            subtitle="About AIOK"
            content={
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                    <p>AIOK 专注于探索人工智能在个人成长和效率提升方面的应用。</p>
                    <p>我们相信每一位个体都能通过 AI 的赋能，拥有更深刻的自我认知和更高效的创作能力。</p>
                    <p>联系方式：</p>
                    <div className="inline-block px-8 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl w-full text-center">
                        <span className="text-slate-400 mr-2">微信：</span>
                        <span className="text-indigo-400 font-bold text-xl">aioksite</span>
                    </div>
                </div>
            }
        />
    );
}
