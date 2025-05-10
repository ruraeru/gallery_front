/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000", // 로컬 개발 서버
    "https://localhost:3000", // HTTPS 로컬
    "http://127.0.0.1:3000", // 로컬 IP
    "https://127.0.0.1:3000", // HTTPS 로컬 IP
    "http://172.30.1.59:3000", // 모바일 IP (예시)
    "https://172.30.1.59:3000", // HTTPS 모바일 IP
    "https://frontdev.kro.kr", // 외부 도메인
    "http://frontdev.kro.kr", // HTTP 버전 (필요 시)
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
