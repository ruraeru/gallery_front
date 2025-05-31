import { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["fedev.kro.kr", "frontdev.kro.kr"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
