import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-sc',
});

export const metadata: Metadata = {
  title: {
    default: 'AIOK.SITE | 连接 AI 的无限可能 - 专业心理测试与 AI 效率工具',
    template: '%s | AIOK.SITE'
  },
  description: 'AIOK 专注于提供专业的心理测评（SCL-90、ADHD）与前沿的 AI 生产力工具。利用人工智能技术助您深度探索心灵空间，提升工作与创作效率。',
  keywords: ['心理测试', 'SCL-90', 'ADHD自测', 'AI工具', '生产力工具', '心灵探索', 'AIOK'],
  authors: [{ name: 'AIOK Team' }],
  creator: 'AIOK Team',
  publisher: 'AIOK.SITE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${notoSansSC.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}


