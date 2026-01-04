'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Scl90SplashPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/scl90/serial');
    }
  }, [countdown, router]);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4 text-slate-900 dark:text-white">
          SCL-90
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          心理健康自评工具
        </p>
      </div>
    </main>
  );
}




