import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@repo/ui",
    "@repo/auth",
    "@repo/chat",
    "@repo/schema",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/img/products/**",
      },
    ],
  },
};

export default nextConfig;
