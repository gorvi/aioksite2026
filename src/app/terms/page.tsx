import PlaceholderPage from '@/components/common/PlaceholderPage';

export default function TermsPage() {
    return (
        <PlaceholderPage
            title="使用协议"
            subtitle="Terms of Service"
            content={
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                    <p>欢迎使用 AIOK.SITE。在使用本平台服务前，请悉知：</p>
                    <ul className="list-disc list-inside space-y-2 opacity-80">
                        <li>测试结果由算法基于经典量表生成，仅供自我探索参考</li>
                        <li>本平台不提供任何医疗诊断意见</li>
                        <li>我们保留根据运营需要更新服务内容的权利</li>
                    </ul>
                    <p>如需进一步了解协议详情，请参阅“联系作者”页面。</p>
                </div>
            }
        />
    );
}
