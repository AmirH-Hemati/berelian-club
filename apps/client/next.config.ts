import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@repo/ui",
    "@repo/auth",
    "@repo/chat",
    "@repo/schema",
  ],
};

export default nextConfig;
