import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.7.7",
        port: "5000",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "jobsin.naimulhassan.me",
      },
    ],
  },
};

export default nextConfig;
