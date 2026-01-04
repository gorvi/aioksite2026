'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import NicknameInput from '@/components/common/NicknameInput';
import { logUserAction } from '@/lib/utils/log-action';

export default function AdhdNicknamePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (nickname: string) => {
    setIsLoading(true);
    try {
      // 1. 初始化测试
      const res = await fetch('/api/test/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, type: 'adhd' }),
      });
      const data = await res.json();

      if (!data.success) {
        alert('初始化失败，请重试');
        setIsLoading(false);
        return;
      }

      // 2. 保存信息到 session
      sessionStorage.setItem('adhd_nickname', nickname);
      sessionStorage.setItem('adhd_test_id', data.data.testId);

      // 记录行为: 输入昵称
      logUserAction({
        actionType: 'enter_nickname',
        testType: 'adhd',
        testId: data.data.testId,
        nickname: nickname
      });

      // 3. 跳转
      router.push('/adhd/full/instructions');
    } catch (error) {
      console.error('Init error:', error);
      alert('系统繁忙，请重试');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="ADHD 倾向自测" showBack backUrl="/tests" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <NicknameInput
              onSubmit={handleSubmit}
              onBack={() => {
                logUserAction({
                  actionType: 'go_back',
                  testType: 'adhd',
                  nickname: 'anonymous_visitor' // 还没输入昵称
                });
                router.push('/tests');
              }}
              backUrl="/tests"
              subtitle="请输入您的昵称（3-15位字母或字母+数字，不能是纯数字）"
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

