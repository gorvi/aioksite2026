import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '城市性格测试 | AI心理健康倾向自测',
  description: '基于MBTI理论的城市性格匹配测试，通过36道精心设计的问题，帮你找到最适合的城市，发现你的性格与城市的完美契合。',
  keywords: 'MBTI测试,城市性格,性格测试,城市匹配,心理测试,个性分析',
}

export default function CityPersonalityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}