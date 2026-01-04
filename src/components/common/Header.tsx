'use client';

import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backUrl?: string;
}

export default function Header({ title, showBack = false, backUrl = '/' }: HeaderProps) {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/tests" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="bg-primary/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                {title || '心理测试平台'}
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {showBack && (
              <Link
                href={backUrl}
                className="text-slate-500 hover:text-primary dark:text-slate-400 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                <span className="hidden sm:inline">返回</span>
              </Link>
            )}
            <Link
              href="/tests"
              className="text-slate-500 hover:text-primary dark:text-slate-400 transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span className="hidden sm:inline">首页</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}



