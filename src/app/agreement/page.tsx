'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

function AgreementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('return') || '/';

  const handleReturn = () => {
    // 如果是从新标签页打开的（有 opener），尝试关闭窗口
    // 否则返回到来源页面
    if (window.opener && !window.opener.closed) {
      window.close();
    } else {
      // 使用 window.location 而不是 router.push，因为可能是在新标签页
      window.location.href = returnUrl;
    }
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <h1 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              个人心理健康敏感信息处理同意书
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-700 dark:text-slate-300">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  一、信息收集目的
                </h2>
                <p>
                  我们收集您的心理健康测试数据，仅用于为您提供心理状态筛查和自我了解服务。
                  这些信息将帮助我们为您生成个性化的测试结果报告。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  二、信息收集范围
                </h2>
                <p>我们可能收集以下信息：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>测试答题数据（题目答案、得分等）</li>
                  <li>测试结果数据（维度得分、总体评估等）</li>
                  <li>测试时间、序列号等必要信息</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  三、信息使用方式
                </h2>
                <p>我们承诺：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>仅将您的信息用于生成测试结果和提供相关服务</li>
                  <li>不会将您的信息用于商业推广或其他无关用途</li>
                  <li>不会未经您同意向第三方分享您的个人信息</li>
                  <li>测试记录仅保存一定期限（如 30 天），到期后自动删除</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  四、信息安全
                </h2>
                <p>
                  我们采用合理的技术手段和管理措施保护您的信息安全，防止信息泄露、丢失或滥用。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  五、您的权利
                </h2>
                <p>您有权：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>了解我们如何收集和使用您的信息</li>
                  <li>选择是否同意本同意书</li>
                  <li>要求删除您的测试记录（在保存期限内）</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  六、重要提示
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">请注意：</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>本测试结果<strong>仅供自我了解使用</strong>，不构成任何医学诊断、心理诊断或治疗建议</li>
                    <li>本平台不提供医疗诊断、治疗或咨询服务</li>
                    <li>如您感到持续不适，建议咨询医疗机构或心理健康从业者</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  七、同意确认
                </h2>
                <p>
                  点击&ldquo;我已阅读并同意&rdquo;即表示您已充分理解并同意本同意书的全部内容，
                  同意我们按照本同意书的规定收集、使用您的个人信息。
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={handleReturn}
              >
                返回
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function AgreementPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </main>
    }>
      <AgreementContent />
    </Suspense>
  );
}

