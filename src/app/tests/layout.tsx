import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '专业心理测试列表',
    description: '包含 SCL-90 症状自评量表、ADHD 成人多动症自测及更多专业心理健康测评工具，利用 AI 提供更深度的报告解读。',
    keywords: ['心理健康', '测评工具', 'SCL-90', 'ADHD量表', '在线测评'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
