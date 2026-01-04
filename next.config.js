/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 允许在生产环境构建时忽略 ESLint 错误，防止小的格式问题阻塞上线
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;




