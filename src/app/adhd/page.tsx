'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdhdSplashPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/adhd/serial');
    }
  }, [countdown, router]);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4 text-slate-900 dark:text-white">
          ADHD 倾向自测
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          注意力与行为特征评估
        </p>
      </div>
    </main>
  );
}

