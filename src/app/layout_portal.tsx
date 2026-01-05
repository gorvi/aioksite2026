import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AIOK.SITE - 探索 AI 赋能的无限世界',
    description: 'AIOK 门户首页：集成 SCL-90 心理测评、ADHD 深度觉察以及 AI 效率工坊、灵感实验室等前沿模块，助力个人成长与数字化生活。',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
