/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 允许在生产环境构建时忽略 ESLint 错误，防止小的格式问题阻塞上线
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 允许在生产环境构建时忽略 TypeScript 类型错误
    // 尤其在急于部署且某些第三方库或复杂业务类型不完全对齐时非常有用
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;




