'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import NicknameInput from '@/components/common/NicknameInput';

export default function CityPersonalityNicknamePage() {
  const router = useRouter();

  const handleSubmit = (nickname: string) => {
    // 存储昵称到sessionStorage
    sessionStorage.setItem('city_personality_nickname', nickname);
    // 跳转到测试说明页面
    router.push('/city-personality/instructions');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header title="城市性格测试" showBack backUrl="/tests" />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <NicknameInput
              onSubmit={handleSubmit}
              onBack={handleBack}
              backUrl="/city-personality"
              subtitle="请输入您的昵称，开始探索最适合您的城市"
            />
          </div>
        </div>
      </main>
    </div>
  );
}