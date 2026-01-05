import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ADHD 成人特质自测',
    description: '通过 ASRS 等专业量表，帮助您了解大脑独特的运作节奏，探索注意力与多动特质。',
    keywords: ['ADHD自测', '成人多动症', '注意力缺陷', '专注力评估'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
