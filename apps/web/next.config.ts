import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: [
    "@repo/ui",
    "@nextplate/api",
    "@nextplate/rpc",
    "@repo/eslint-config",
    "@repo/typescript-config",
    "@repo/database",
  ],
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "https://manjula.cloud/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "donext.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "donext-org.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "manjula2026.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
