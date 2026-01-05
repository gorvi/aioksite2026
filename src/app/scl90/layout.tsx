import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SCL-90 症状自评量表',
    description: '全球应用最广泛的心理健康自评工具，从十个维度深度觉察您近期的身心状态。',
    keywords: ['SCL-90', '心理健康自评', '情绪评估', '心理筛查'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
