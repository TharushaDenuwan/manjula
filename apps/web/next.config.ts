import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/ui",
    "@nextplate/api",
    "@nextplate/rpc",
    "@repo/eslint-config",
    "@repo/typescript-config",
    "@repo/database",
  ],
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
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
