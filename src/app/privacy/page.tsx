import PlaceholderPage from '@/components/common/PlaceholderPage';

export default function PrivacyPage() {
    return (
        <PlaceholderPage
            title="隐私条款"
            subtitle="Privacy Policy"
            content={
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                    <p>您的隐私对我们至关重要。AIOK 承诺极简的数据收集原则：</p>
                    <ul className="list-disc list-inside space-y-2 opacity-80">
                        <li>不收集您的真实姓名或身份敏感信息</li>
                        <li>测评数据仅限用于结果页展示</li>
                        <li>我们不会将您的个人数据转让给任何第三方</li>
                    </ul>
                    <p>如有关于隐私政策的疑问，请通过“联系作者”页面与我取得联系。</p>
                </div>
            }
        />
    );
}
